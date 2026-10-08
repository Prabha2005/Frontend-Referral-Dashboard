import os
import sqlite3
from decimal import Decimal
from pathlib import Path
from datetime import datetime, timedelta, timezone

import jwt
from pwdlib import PasswordHash
from fastapi.responses import JSONResponse
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables
load_dotenv(Path(__file__).parent / ".env")
load_dotenv()

# Configurable CORS origins: localhost for development + comma-separated FRONTEND_ORIGINS
default_origins = ["http://localhost:3000", "http://127.0.0.1:3000"]
env_origins = [
    origin.strip()
    for origin in os.environ.get("FRONTEND_ORIGINS", "").split(",")
    if origin.strip()
]
allowed_origins = list(dict.fromkeys(default_origins + env_origins))

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/api/health")
def api_health_check():
    return {"status": "ok"}


class LoginRequest(BaseModel):
    email: str
    password: str


JWT_SECRET = os.environ.get("JWT_SECRET", "c9bfe072ef6e276d08dcaa0e959ce56fabf72ac86bf23ade4b02fe8e24a7000e")
DEMO_EMAIL = os.environ.get("DEMO_EMAIL", "demo1@gmail.com")
DEMO_PASSWORD = os.environ.get("DEMO_PASSWORD", "Demo@pa1")

password_hasher = PasswordHash.recommended()
demo_password_hash = password_hasher.hash(DEMO_PASSWORD)

DB_PATH = Path(os.environ.get("DATABASE_PATH", str(Path(__file__).parent / "referrals.db")))


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def ensure_schema(conn: sqlite3.Connection):
    """Ensures all required tables and columns exist."""
    conn.execute("""
        CREATE TABLE IF NOT EXISTS referrals (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            serviceName TEXT NOT NULL,
            date TEXT NOT NULL,
            profit REAL NOT NULL,
            is_synthetic INTEGER DEFAULT 0
        )
    """)

    # Check if is_synthetic column exists, if not add it
    columns = [row[1] for row in conn.execute("PRAGMA table_info(referrals)").fetchall()]
    if "is_synthetic" not in columns:
        conn.execute("ALTER TABLE referrals ADD COLUMN is_synthetic INTEGER DEFAULT 0")

    conn.execute("""
        CREATE TABLE IF NOT EXISTS referral_financials (
            referral_id TEXT UNIQUE PRIMARY KEY,
            original_amount_cents INTEGER NOT NULL,
            discount_amount_cents INTEGER NOT NULL,
            gross_commission_cents INTEGER NOT NULL,
            commission_discount_cents INTEGER NOT NULL,
            is_active INTEGER NOT NULL DEFAULT 1,
            FOREIGN KEY (referral_id) REFERENCES referrals (id)
        )
    """)

    conn.execute("""
        CREATE TABLE IF NOT EXISTS payouts (
            id TEXT PRIMARY KEY,
            amount_cents INTEGER NOT NULL,
            status TEXT NOT NULL,
            paid_at TEXT
        )
    """)

    conn.execute("""
        CREATE TABLE IF NOT EXISTS referral_settings (
            id INTEGER PRIMARY KEY,
            link TEXT NOT NULL,
            code TEXT NOT NULL
        )
    """)


def init_db():
    """
    Initializes database tables on application startup.
    Uses insert-only logic (INSERT OR IGNORE) to preserve existing records and edits.
    Never wipes or resets data.
    """
    conn = get_db_connection()
    try:
        with conn:
            ensure_schema(conn)

            # Insert-only for referral sharing settings
            conn.execute("""
                INSERT OR IGNORE INTO referral_settings (id, link, code)
                VALUES (1, 'https://gobusiness.com/?referral=ABCXYZ', 'ABCXYZ')
            """)

            # Insert-only for referrals (preserves existing rows and edits)
            from seed import ALL_INITIAL_REFERRALS, SAMPLE_PAYOUTS, generate_sample_financials
            conn.executemany("""
                INSERT OR IGNORE INTO referrals (id, name, serviceName, date, profit, is_synthetic)
                VALUES (?, ?, ?, ?, ?, ?)
            """, ALL_INITIAL_REFERRALS)

            # Seed sample financials only when missing
            existing_referrals = conn.execute("SELECT id, name, serviceName, date, profit FROM referrals").fetchall()
            financials_records = generate_sample_financials(existing_referrals)
            conn.executemany("""
                INSERT OR IGNORE INTO referral_financials (
                    referral_id,
                    original_amount_cents,
                    discount_amount_cents,
                    gross_commission_cents,
                    commission_discount_cents,
                    is_active
                )
                VALUES (?, ?, ?, ?, ?, ?)
            """, financials_records)

            # Seed sample payouts
            conn.executemany("""
                INSERT OR IGNORE INTO payouts (id, amount_cents, status, paid_at)
                VALUES (?, ?, ?, ?)
            """, SAMPLE_PAYOUTS)
    finally:
        conn.close()


init_db()


@app.post("/api/auth/signin")
def signin(credentials: LoginRequest):
    password_valid = password_hasher.verify(
        credentials.password,
        demo_password_hash
    )
    if credentials.email != DEMO_EMAIL or not password_valid:
        return JSONResponse(
            status_code=401,
            content={
                "status": "error",
                "message": "Invalid email or password"
            }
        )
    token = jwt.encode(
        {
            "sub": DEMO_EMAIL,
            "exp": datetime.now(timezone.utc) + timedelta(hours=1)
        },
        JWT_SECRET,
        algorithm="HS256"
    )

    return {
        "status": "success",
        "message": "Login successful",
        "data": {
            "token": token
        }
    }


bearer_auth = HTTPBearer(auto_error=False)


def verify_token(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_auth)
):
    unauthorized = HTTPException(
        status_code=401,
        detail="Invalid or expired token",
        headers={"WWW-Authenticate": "Bearer"}
    )

    if credentials is None:
        raise unauthorized

    try:
        payload = jwt.decode(
            credentials.credentials,
            JWT_SECRET,
            algorithms=["HS256"],
            options={"require": ["exp", "sub"]}
        )
    except jwt.InvalidTokenError:
        raise unauthorized

    if payload.get("sub") != DEMO_EMAIL:
        raise unauthorized

    return payload["sub"]


@app.get("/api/referrals")
def get_referrals(
    id: str | None = None,
    search: str = "",
    sort: str = "desc",
    current_user: str = Depends(verify_token)
):
    conn = get_db_connection()
    try:
        # 1. ALWAYS calculate overall measures across the complete dataset in SQLite
        # Search, sorting, and ID filters affect table rows only, never overall totals.

        # A. Referrals base aggregates
        referrals_cursor = conn.execute("SELECT id, profit FROM referrals")
        referrals_rows = referrals_cursor.fetchall()
        total_count = len(referrals_rows)
        
        # Calculate net earned commission using Decimal
        total_profit_cents = sum(int(Decimal(str(row["profit"])) * 100) for row in referrals_rows)
        formatted_total_earnings = f"${Decimal(total_profit_cents) / Decimal(100):,.2f}"

        # B. Check if any referral lacks financial inputs in referral_financials
        missing_financials_count = conn.execute("""
            SELECT COUNT(*) FROM referrals r
            LEFT JOIN referral_financials rf ON r.id = rf.referral_id
            WHERE rf.referral_id IS NULL
        """).fetchone()[0]
        has_complete_financials = (missing_financials_count == 0)

        # C. Completed payouts for Total Bank Transfer and Total Balance
        completed_payouts_cents = conn.execute("""
            SELECT COALESCE(SUM(amount_cents), 0) FROM payouts WHERE status = 'completed'
        """).fetchone()[0]
        formatted_bank_transfer = f"${Decimal(completed_payouts_cents) / Decimal(100):,.2f}"

        # Total Balance = total net earned commission - completed payouts
        balance_cents = total_profit_cents - completed_payouts_cents
        formatted_balance = f"${Decimal(balance_cents) / Decimal(100):,.2f}"

        # D. Financial aggregates (if complete financials exist)
        if has_complete_financials:
            fin_stats = conn.execute("""
                SELECT
                    COALESCE(SUM(original_amount_cents), 0) AS total_original_cents,
                    COALESCE(SUM(discount_amount_cents), 0) AS total_discount_cents,
                    COALESCE(SUM(gross_commission_cents), 0) AS total_gross_comm_cents,
                    COALESCE(SUM(commission_discount_cents), 0) AS total_comm_disc_cents,
                    COALESCE(SUM(is_active), 0) AS total_active_count
                FROM referral_financials
            """).fetchone()

            total_original_cents = Decimal(fin_stats["total_original_cents"])
            total_discount_cents = Decimal(fin_stats["total_discount_cents"])
            total_gross_comm_cents = Decimal(fin_stats["total_gross_comm_cents"])
            total_comm_disc_cents = Decimal(fin_stats["total_comm_disc_cents"])
            active_count = fin_stats["total_active_count"]

            # Discount Percentage = total discount / total original amount * 100 (0% if zero denominator)
            if total_original_cents > 0:
                discount_pct = (total_discount_cents / total_original_cents) * Decimal(100)
                formatted_discount_pct = f"{discount_pct:.1f}%"
            else:
                formatted_discount_pct = "0.0%"

            # Commission Discount = total commission discount / total gross commission * 100 (0% if zero denominator)
            if total_gross_comm_cents > 0:
                comm_disc_pct = (total_comm_disc_cents / total_gross_comm_cents) * Decimal(100)
                formatted_comm_disc_pct = f"{comm_disc_pct:.1f}%"
            else:
                formatted_comm_disc_pct = "0.0%"

            formatted_discount_amount = f"${total_discount_cents / Decimal(100):,.2f}"
            formatted_gross_commission = f"${total_gross_comm_cents / Decimal(100):,.2f}"
            formatted_active_referrals = str(active_count)
        else:
            # Rule: If a custom referral lacks financial inputs, return N/A for dependent measures
            formatted_discount_pct = "N/A"
            formatted_discount_amount = "N/A"
            formatted_gross_commission = "N/A"
            formatted_comm_disc_pct = "N/A"
            formatted_active_referrals = "N/A"

        # E. Derive service description dynamically from stored distinct service names
        services_cursor = conn.execute(
            "SELECT DISTINCT serviceName FROM referrals WHERE serviceName IS NOT NULL AND TRIM(serviceName) != '' ORDER BY serviceName"
        )
        distinct_services = [row["serviceName"] for row in services_cursor.fetchall()]
        service_desc = ", ".join(distinct_services) if distinct_services else "N/A"

        # Overview 8 Metrics
        metrics_list = [
            {"id": 1, "label": "Total Balance", "value": formatted_balance},
            {"id": 2, "label": "Discount Percentage", "value": formatted_discount_pct},
            {"id": 3, "label": "Total Referral", "value": str(total_count)},
            {"id": 4, "label": "Discount Amount", "value": formatted_discount_amount},
            {"id": 5, "label": "Commission Amount", "value": formatted_gross_commission},
            {"id": 6, "label": "Total Earning", "value": formatted_total_earnings},
            {"id": 7, "label": "Commission Discount", "value": formatted_comm_disc_pct},
            {"id": 8, "label": "Total Bank Transfer", "value": formatted_bank_transfer},
        ]

        # Service Summary
        service_summary = {
            "service": service_desc,
            "yourReferrals": str(total_count),
            "activeReferrals": formatted_active_referrals,
            "totalRefEarnings": formatted_total_earnings
        }

        # Referral Sharing Link & Code
        settings_cursor = conn.execute("SELECT link, code FROM referral_settings WHERE id = 1")
        settings_row = settings_cursor.fetchone()
        referral_share = {
            "link": settings_row["link"] if settings_row else "https://gobusiness.com/?referral=ABCXYZ",
            "code": settings_row["code"] if settings_row else "ABCXYZ"
        }

        # 2. Query Referrals (ID Lookup, Search, Sort) affecting returned rows only
        query = "SELECT id, name, serviceName, date, profit FROM referrals"
        conditions = []
        params = []

        if id is not None:
            conditions.append("id = ?")
            params.append(id)

        search_text = search.strip().lower()
        if search_text:
            conditions.append("(LOWER(name) LIKE ? OR LOWER(serviceName) LIKE ?)")
            search_param = f"%{search_text}%"
            params.extend([search_param, search_param])

        if conditions:
            query += " WHERE " + " AND ".join(conditions)

        sort_order = "ASC" if sort.lower() == "asc" else "DESC"
        query += f" ORDER BY date {sort_order}"

        cursor = conn.execute(query, params)
        rows = cursor.fetchall()

        results = [
            {
                "id": row["id"],
                "name": row["name"],
                "serviceName": row["serviceName"],
                "date": row["date"],
                "profit": row["profit"]
            }
            for row in rows
        ]

        return {
            "status": "success",
            "data": {
                "metrics": metrics_list,
                "serviceSummary": service_summary,
                "referral": referral_share,
                "referrals": results
            }
        }
    finally:
        conn.close()