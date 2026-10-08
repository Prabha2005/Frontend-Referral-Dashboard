"""
Explicit, repeatable demo-seeding script for Referral Dashboard dataset.

Features:
- Insert-only seeding (INSERT OR IGNORE) that preserves all edits to existing records
- 52 predefined sample person records (ref-001 to ref-052)
- referral_financials table storing financial inputs in integer cents
- payouts table storing sample bank transfers (completed, pending, failed)
- Zero data deletion or reset
"""

import os
import sqlite3
from decimal import Decimal
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv(Path(__file__).parent / ".env")
load_dotenv()

DB_PATH = Path(os.environ.get("DATABASE_PATH", str(Path(__file__).parent / "referrals.db")))

# 10 Visible reference records from reference screenshot (ordered newest first)
VISIBLE_REFERRALS = [
    ("ref-001", "Geeta", "Frontend", "2013-07-29", 259300.0, 0),
    ("ref-002", "Vinod", "Graphics", "2013-06-16", 176900.0, 0),
    ("ref-003", "Rekha", "HR", "2013-05-08", 88400.0, 0),
    ("ref-004", "Ashok", "B2B", "2013-04-20", 147500.0, 0),
    ("ref-005", "Sonal", "PM", "2013-03-14", 302100.0, 0),
    ("ref-006", "Mohit", "QA", "2013-02-26", 113800.0, 0),
    ("ref-007", "Anjali", "DevOps", "2013-01-12", 158700.0, 0),
    ("ref-008", "Srinivas", "Frontend", "2012-12-02", 372000.0, 0),
    ("ref-009", "Harish", "Frontend", "2012-11-05", 241200.0, 0),
    ("ref-010", "Moumita", "HR", "2012-10-13", 132000.0, 0),
]

# 40 Explicitly synthetic demo records
SYNTHETIC_REFERRALS = [
    ("ref-011", "Rohan", "DevOps", "2012-09-28", 185000.0, 1),
    ("ref-012", "Kavita", "Backend", "2012-09-14", 210000.0, 1),
    ("ref-013", "Vikram", "Fullstack", "2012-08-30", 315000.0, 1),
    ("ref-014", "Pooja", "UI/UX", "2012-08-12", 142000.0, 1),
    ("ref-015", "Suresh", "Frontend", "2012-07-25", 198000.0, 1),
    ("ref-016", "Neha", "QA", "2012-07-09", 115000.0, 1),
    ("ref-017", "Deepak", "Cloud Hosting", "2012-06-21", 275000.0, 1),
    ("ref-018", "Swati", "HR", "2012-06-03", 92000.0, 1),
    ("ref-019", "Manoj", "Graphics", "2012-05-18", 164000.0, 1),
    ("ref-020", "Divya", "PM", "2012-05-01", 289000.0, 1),
    ("ref-021", "Rahul", "B2B", "2012-04-15", 138000.0, 1),
    ("ref-022", "Meera", "Frontend", "2012-03-29", 225000.0, 1),
    ("ref-023", "Rajesh", "Backend", "2012-03-11", 260000.0, 1),
    ("ref-024", "Sunita", "DevOps", "2012-02-24", 172000.0, 1),
    ("ref-025", "Amit", "Cloud Hosting", "2012-02-06", 310000.0, 1),
    ("ref-026", "Ritu", "QA", "2012-01-19", 108000.0, 1),
    ("ref-027", "Sanjay", "UI/UX", "2012-01-02", 154000.0, 1),
    ("ref-028", "Preeti", "HR", "2011-12-15", 85000.0, 1),
    ("ref-029", "Ajay", "Fullstack", "2011-11-28", 295000.0, 1),
    ("ref-030", "Shalini", "Frontend", "2011-11-10", 230000.0, 1),
    ("ref-031", "Kiran", "Graphics", "2011-10-22", 168000.0, 1),
    ("ref-032", "Naveen", "PM", "2011-10-05", 278000.0, 1),
    ("ref-033", "Bhavna", "B2B", "2011-09-17", 145000.0, 1),
    ("ref-034", "Girish", "DevOps", "2011-08-30", 182000.0, 1),
    ("ref-035", "Alka", "Backend", "2011-08-12", 248000.0, 1),
    ("ref-036", "Manish", "QA", "2011-07-25", 120000.0, 1),
    ("ref-037", "Tara", "UI/UX", "2011-07-07", 139000.0, 1),
    ("ref-038", "Vijay", "Frontend", "2011-06-19", 215000.0, 1),
    ("ref-039", "Sandhya", "Cloud Hosting", "2011-06-01", 325000.0, 1),
    ("ref-040", "Pradeep", "HR", "2011-05-14", 94000.0, 1),
    ("ref-041", "Kavita R", "Graphics", "2011-04-26", 159000.0, 1),
    ("ref-042", "Nitin", "PM", "2011-04-08", 298000.0, 1),
    ("ref-043", "Archana", "Fullstack", "2011-03-21", 285000.0, 1),
    ("ref-044", "Gaurav", "DevOps", "2011-03-03", 191000.0, 1),
    ("ref-045", "Simran", "B2B", "2011-02-14", 152000.0, 1),
    ("ref-046", "Vivek", "Backend", "2011-01-27", 265000.0, 1),
    ("ref-047", "Pallavi", "QA", "2011-01-09", 112000.0, 1),
    ("ref-048", "Chetan", "Frontend", "2010-12-20", 205000.0, 1),
    ("ref-049", "Monica", "UI/UX", "2010-12-02", 148000.0, 1),
    ("ref-050", "Dinesh", "Cloud Hosting", "2010-11-15", 340000.0, 1),
]

# Restored Priya and Arun under unused stable IDs
RESTORED_REFERRALS = [
    ("ref-051", "Priya", "Web Development", "2026-10-08", 250.0, 0),
    ("ref-052", "Arun", "Cloud Hosting", "2026-10-07", 150.0, 0),
]

ALL_INITIAL_REFERRALS = VISIBLE_REFERRALS + SYNTHETIC_REFERRALS + RESTORED_REFERRALS

# Reference demo referral link & code
REFERRAL_SETTINGS = (1, "https://gobusiness.com/?referral=ABCXYZ", "ABCXYZ")

# Sample payouts with stable IDs: completed, pending, failed
SAMPLE_PAYOUTS = [
    ("payout-001", 250000000, "completed", "2026-08-15 10:00:00"),  # $2,500,000.00
    ("payout-002", 150000000, "completed", "2026-09-01 14:30:00"),  # $1,500,000.00
    ("payout-003", 200000000, "completed", "2026-09-20 09:15:00"),  # $2,000,000.00
    ("payout-004", 75000000, "pending", None),                      # $750,000.00 (excluded from transfers)
    ("payout-005", 50000000, "failed", None),                       # $500,000.00 (excluded from transfers)
]


def generate_sample_financials(referrals_list):
    """
    Generates varied sample financial records for referrals ensuring:
    - gross_commission_cents - commission_discount_cents == profit_cents
    - discount_amount_cents <= original_amount_cents
    - commission_discount_cents <= gross_commission_cents
    - is_active is 0 or 1
    """
    financials = []
    for idx, (ref_id, name, service, date, profit, *rest) in enumerate(referrals_list, start=1):
        profit_cents = int(Decimal(str(profit)) * 100)
        
        # Commission discount rate between 10% and 24%
        rate = 10 + (idx % 15)
        comm_discount_cents = (profit_cents * rate) // 100
        gross_commission_cents = profit_cents + comm_discount_cents
        
        # Sale original amount between 4x and 8x gross commission
        mult = 4 + (idx % 5)
        orig_amount_cents = gross_commission_cents * mult
        
        # Customer promotional discount between 15% and 30%
        disc_rate = 15 + (idx % 16)
        disc_amount_cents = (orig_amount_cents * disc_rate) // 100
        
        # Active status (42 active, 10 inactive)
        is_active = 1 if (idx % 5 != 0) else 0
        
        financials.append((
            ref_id,
            orig_amount_cents,
            disc_amount_cents,
            gross_commission_cents,
            comm_discount_cents,
            is_active
        ))
    return financials


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


def seed_database(db_path: Path = DB_PATH):
    """
    Seeds the SQLite database using insert-only semantics (INSERT OR IGNORE).
    Preserves all existing records and any user edits.
    Never overwrites or deletes data.
    """
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    try:
        with conn:
            ensure_schema(conn)

            # Insert-only referral sharing settings
            conn.execute("""
                INSERT OR IGNORE INTO referral_settings (id, link, code)
                VALUES (?, ?, ?)
            """, REFERRAL_SETTINGS)

            # Insert-only for all referrals
            conn.executemany("""
                INSERT OR IGNORE INTO referrals (id, name, serviceName, date, profit, is_synthetic)
                VALUES (?, ?, ?, ?, ?, ?)
            """, ALL_INITIAL_REFERRALS)

            # Generate and insert sample financials for referrals
            # Reads current referrals in database to ensure financials match actual profits
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

            # Insert-only sample payouts
            conn.executemany("""
                INSERT OR IGNORE INTO payouts (id, amount_cents, status, paid_at)
                VALUES (?, ?, ?, ?)
            """, SAMPLE_PAYOUTS)

        # Print summary
        total_referrals = conn.execute("SELECT COUNT(*) FROM referrals").fetchone()[0]
        financials_count = conn.execute("SELECT COUNT(*) FROM referral_financials").fetchone()[0]
        payouts_count = conn.execute("SELECT COUNT(*) FROM payouts").fetchone()[0]
        active_count = conn.execute("SELECT COUNT(*) FROM referral_financials WHERE is_active = 1").fetchone()[0]
        total_profit = conn.execute("SELECT COALESCE(SUM(profit), 0) FROM referrals").fetchone()[0]

        print(f"Database seeded successfully at {db_path}")
        print(f"- Total referrals: {total_referrals}")
        print(f"- Referral financials records: {financials_count} (Active: {active_count})")
        print(f"- Payouts records: {payouts_count}")
        print(f"- Total Net Earned Commission: ${total_profit:,.2f}")
    finally:
        conn.close()


if __name__ == "__main__":
    seed_database()
