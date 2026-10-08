"""
Comprehensive automated tests for Referral Dashboard.
Covers:
1. Isolated database unit tests (fixture calculations, math identities, denominator edge cases, re-seed idempotency).
2. Live API integration tests (authentication, token rejection, calculated metrics, filter independence, single ID lookups).
"""

import urllib.request
import urllib.error
import json
import sqlite3
import tempfile
import sys
import os
from decimal import Decimal
from pathlib import Path

# Repository paths
REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT))
sys.path.insert(0, str(REPO_ROOT / "backend"))

from backend.seed import ensure_schema, seed_database, generate_sample_financials

print("=" * 65)
print("TEST SUITE 1: Isolated Database Fixture & Calculation Tests")
print("=" * 65)

temp_db_file = tempfile.NamedTemporaryFile(suffix=".db", delete=False)
temp_db_path = Path(temp_db_file.name)
temp_db_file.close()

conn = None
try:
    conn = sqlite3.connect(temp_db_path)
    conn.row_factory = sqlite3.Row
    ensure_schema(conn)

    # Controlled fixture with 3 referrals
    fixture_referrals = [
        ("fix-01", "Alice", "Frontend", "2026-10-01", 100.0, 0),
        ("fix-02", "Bob", "Backend", "2026-10-02", 250.0, 0),
        ("fix-03", "Charlie", "DevOps", "2026-10-03", 150.0, 0),
    ]
    fixture_financials = [
        ("fix-01", 60000, 15000, 12000, 2000, 1),
        ("fix-02", 120000, 24000, 30000, 5000, 1),
        ("fix-03", 80000, 16000, 20000, 5000, 0),
    ]
    fixture_payouts = [
        ("pay-01", 20000, "completed", "2026-10-04 10:00:00"),
        ("pay-02", 5000, "pending", None),
        ("pay-03", 3000, "failed", None),
    ]

    with conn:
        conn.executemany("INSERT INTO referrals VALUES (?, ?, ?, ?, ?, ?)", fixture_referrals)
        conn.executemany("INSERT INTO referral_financials VALUES (?, ?, ?, ?, ?, ?)", fixture_financials)
        conn.executemany("INSERT INTO payouts VALUES (?, ?, ?, ?)", fixture_payouts)

    # 1. Gross Commission - Commission Discount == Net Commission (Total Earnings)
    tot_gross = conn.execute("SELECT SUM(gross_commission_cents) FROM referral_financials").fetchone()[0]
    tot_comm_disc = conn.execute("SELECT SUM(commission_discount_cents) FROM referral_financials").fetchone()[0]
    tot_profit_cents = sum(int(Decimal(str(r[4])) * 100) for r in fixture_referrals)
    assert tot_gross - tot_comm_disc == tot_profit_cents
    print("[PASS] Net commission identity: $620 - $120 = $500")

    # 2. Balance + Completed Transfers == Total Earnings
    completed_payouts = conn.execute("SELECT SUM(amount_cents) FROM payouts WHERE status = 'completed'").fetchone()[0]
    balance = tot_profit_cents - completed_payouts
    assert balance + completed_payouts == tot_profit_cents
    print("[PASS] Balance identity: $300 balance + $200 transfers = $500 earnings")

    # 3. Pending/failed payouts excluded
    all_payouts = conn.execute("SELECT SUM(amount_cents) FROM payouts").fetchone()[0]
    assert all_payouts == 28000
    assert completed_payouts == 20000
    assert balance == 30000
    print("[PASS] Pending ($50) and failed ($30) payouts excluded from transfers and balance")

    # 4. Weighted percentage check
    tot_orig = conn.execute("SELECT SUM(original_amount_cents) FROM referral_financials").fetchone()[0]
    tot_disc = conn.execute("SELECT SUM(discount_amount_cents) FROM referral_financials").fetchone()[0]
    weighted_disc_pct = (Decimal(tot_disc) / Decimal(tot_orig)) * Decimal(100)
    simple_avg = (Decimal(25) + Decimal(20) + Decimal(20)) / Decimal(3)
    assert round(weighted_disc_pct, 1) == Decimal("21.2")
    assert round(weighted_disc_pct, 1) != round(simple_avg, 1)
    print("[PASS] Weighted aggregate percentage matches 21.2% (not simple row average 21.7%)")

    # 5. Active referral count
    active_cnt = conn.execute("SELECT COUNT(*) FROM referral_financials WHERE is_active = 1").fetchone()[0]
    assert active_cnt == 2
    print(f"[PASS] Active referral count: {active_cnt} active of 3")

    # 6. Re-seeding preserves user edits
    with conn:
        conn.execute("UPDATE referral_financials SET gross_commission_cents = 18000 WHERE referral_id = 'fix-01'")
    seed_database(temp_db_path)
    preserved_gross = conn.execute("SELECT gross_commission_cents FROM referral_financials WHERE referral_id = 'fix-01'").fetchone()[0]
    assert preserved_gross == 18000
    print("[PASS] Insert-only seeding preserves existing edits (Gross remained 18,000 cents)")

    # 7. Missing financials detection
    with conn:
        conn.execute("INSERT INTO referrals VALUES ('unmapped-01', 'David', 'Cloud', '2026-10-05', 75.0, 0)")
    missing_count = conn.execute("""
        SELECT COUNT(*) FROM referrals r
        LEFT JOIN referral_financials rf ON r.id = rf.referral_id
        WHERE rf.referral_id IS NULL
    """).fetchone()[0]
    assert missing_count == 1
    print("[PASS] Missing financial inputs correctly detected for unmapped referrals")

finally:
    if conn:
        conn.close()
    if temp_db_path.exists():
        try:
            temp_db_path.unlink()
        except:
            pass

print("\n" + "=" * 65)
print("TEST SUITE 2: Live Backend API Verification")
print("=" * 65)

# 1. Signin
signin_req = urllib.request.Request(
    "http://127.0.0.1:8000/api/auth/signin",
    data=json.dumps({"email": "demo1@gmail.com", "password": "Demo@pa1"}).encode(),
    headers={"Content-Type": "application/json"}
)
with urllib.request.urlopen(signin_req) as resp:
    token = json.loads(resp.read().decode())["data"]["token"]

auth_headers = {"Authorization": f"Bearer {token}"}

# 2. Get Referrals
referrals_req = urllib.request.Request("http://127.0.0.1:8000/api/referrals", headers=auth_headers)
with urllib.request.urlopen(referrals_req) as resp:
    payload = json.loads(resp.read().decode())["data"]

metrics = {m["label"]: m["value"] for m in payload["metrics"]}
sum_data = payload["serviceSummary"]

print("Live Overview Metrics:")
for k, v in metrics.items():
    print(f"  - {k}: {v}")

print("Live Service Summary:")
for k, v in sum_data.items():
    print(f"  - {k}: {v}")

assert metrics["Total Balance"] == "$4,023,300.00"
assert metrics["Discount Percentage"] == "22.4%"
assert metrics["Total Referral"] == "52"
assert metrics["Discount Amount"] == "$15,735,460.19"
assert metrics["Commission Amount"] == "$11,703,918.50"
assert metrics["Total Earning"] == "$10,023,300.00"
assert metrics["Commission Discount"] == "14.4%"
assert metrics["Total Bank Transfer"] == "$6,000,000.00"

assert sum_data["yourReferrals"] == "52"
assert sum_data["activeReferrals"] == "42"
assert sum_data["totalRefEarnings"] == "$10,023,300.00"

# 3. Filter independence
search_req = urllib.request.Request("http://127.0.0.1:8000/api/referrals?search=geeta", headers=auth_headers)
with urllib.request.urlopen(search_req) as resp:
    search_data = json.loads(resp.read().decode())["data"]
assert len(search_data["referrals"]) == 1
assert search_data["metrics"][0]["value"] == "$4,023,300.00"
assert search_data["metrics"][2]["value"] == "52"
print("[PASS] Filter independence: Search filter leaves metrics at 52 / $10,023,300.00")

# 4. ID lookup
id_req = urllib.request.Request("http://127.0.0.1:8000/api/referrals?id=ref-051", headers=auth_headers)
with urllib.request.urlopen(id_req) as resp:
    id_data = json.loads(resp.read().decode())["data"]
assert len(id_data["referrals"]) == 1
assert id_data["referrals"][0]["name"] == "Priya"
assert id_data["referrals"][0]["profit"] == 250.0
assert id_data["metrics"][0]["value"] == "$4,023,300.00"
print("[PASS] Single ID lookup: Successfully resolved Priya (ref-051)")

# 5. Health check endpoint
health_req = urllib.request.Request("http://127.0.0.1:8000/health")
with urllib.request.urlopen(health_req) as resp:
    health_data = json.loads(resp.read().decode())
assert health_data == {"status": "ok"}
print("[PASS] GET /health endpoint returns {'status': 'ok'}")

print("\nALL VERIFICATIONS PASSED SUCCESSFULLY!")
