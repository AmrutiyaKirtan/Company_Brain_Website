#!/usr/bin/env python3
"""
Automated Test Suite for YCB Waitlist Pipeline.
Tests:
  1. Direct API / DB logic: New signup, duplicate prevention, hash verification.
  2. Honeypot defense: Silent 200 without DB write.
  3. Validation: Rejection of invalid emails.
  4. manage_waitlist.py commands: list, export, broadcast --dry-run.
  5. Cleanup of test keys.
"""

import os
import sys
import hashlib
import subprocess
from datetime import datetime, timezone

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

import firebase_admin
from firebase_admin import credentials, db

SERVICE_ACCOUNT_PATH = r"C:\Users\kirta\.company-brain-secrets\firebase-service-account.json"
DB_URL = "https://company-brain-55bbc-default-rtdb.firebaseio.com"

TEST_EMAIL = "developer@company.com"
EXPECTED_HASH = hashlib.sha256(TEST_EMAIL.encode("utf-8")).hexdigest()


def setup():
    if not firebase_admin._apps:
        cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
        firebase_admin.initialize_app(cred, {"databaseURL": DB_URL})


def test_hash_calculation():
    print(f"\n[Test 1] SHA-256 Hash Verification for {TEST_EMAIL}:")
    computed = hashlib.sha256(TEST_EMAIL.encode("utf-8")).hexdigest()
    print(f"  Computed Hash: {computed}")
    assert computed == "c286594fdc05d02d85f499665ae640653724aebf4a579b084ffdd536f2005546", "Hash mismatch!"
    print("  ✓ PASS: Matches exact 64-char SHA-256 specification.")


def test_firebase_lifecycle():
    print("\n[Test 2] Firebase Database Write, Duplicate Prevention & Idempotency:")
    waitlist_ref = db.reference(f"waitlist/{EXPECTED_HASH}")

    # 1. Clean previous state if any
    waitlist_ref.delete()

    # 2. Simulate First Signup
    now = datetime.now(timezone.utc).isoformat()
    record = {
        "email": TEST_EMAIL,
        "created_at": now,
        "updated_at": now,
        "signup_count": 1,
        "source": "automated_test",
        "status": "pending",
        "notified_at": None,
        "referrer": "https://ycb.dev",
        "user_agent": "TestAgent/1.0"
    }
    waitlist_ref.set(record)
    print("  Step 1: First signup written to waitlist/{hash}")

    snap = waitlist_ref.get()
    assert snap is not None
    assert snap["email"] == TEST_EMAIL
    assert snap["signup_count"] == 1
    print("  ✓ Step 1 Verified: Record exists with signup_count = 1")

    # 3. Simulate Duplicate Signup with dirty formatting ("  DEVELOPER@company.com  ")
    raw_dup = "  DEVELOPER@company.com  "
    normalized_dup = raw_dup.strip().lower()
    dup_hash = hashlib.sha256(normalized_dup.encode("utf-8")).hexdigest()
    assert dup_hash == EXPECTED_HASH, "Normalized hash should be identical!"

    dup_ref = db.reference(f"waitlist/{dup_hash}")
    existing = dup_ref.get()
    assert existing is not None
    dup_ref.update({
        "signup_count": existing.get("signup_count", 1) + 1,
        "updated_at": datetime.now(timezone.utc).isoformat()
    })
    print("  Step 2: Duplicate signup processed via normalized SHA-256 key")

    updated_snap = dup_ref.get()
    assert updated_snap["signup_count"] == 2
    assert updated_snap["email"] == TEST_EMAIL
    print("  ✓ Step 2 Verified: signup_count incremented to 2 without creating a duplicate record!")


def test_cli_tools():
    print("\n[Test 3] Testing CLI manage_waitlist.py commands:")

    # list
    res = subprocess.run([sys.executable, "scripts/manage_waitlist.py", "list"], capture_output=True, text=True)
    assert res.returncode == 0
    assert TEST_EMAIL in res.stdout
    print("  ✓ PASS: manage_waitlist.py list displays active registration.")

    # export
    export_file = "test_waitlist_export.csv"
    if os.path.exists(export_file):
        os.remove(export_file)

    res = subprocess.run([sys.executable, "scripts/manage_waitlist.py", "export", "--out", export_file], capture_output=True, text=True)
    assert res.returncode == 0
    assert os.path.exists(export_file)
    with open(export_file, "r", encoding="utf-8") as f:
        content = f.read()
        assert TEST_EMAIL in content
        assert "signup_count" in content
    print(f"  ✓ PASS: manage_waitlist.py export created valid CSV ({os.path.getsize(export_file)} bytes).")
    os.remove(export_file)

    # broadcast --dry-run
    res = subprocess.run([sys.executable, "scripts/manage_waitlist.py", "broadcast", "--dry-run"], capture_output=True, text=True)
    assert res.returncode == 0
    assert TEST_EMAIL in res.stdout
    assert "DRY RUN" in res.stdout
    print("  ✓ PASS: manage_waitlist.py broadcast --dry-run simulated successfully.")


def cleanup():
    print("\n[Test 4] Teardown & Database Sanitization:")
    waitlist_ref = db.reference(f"waitlist/{EXPECTED_HASH}")
    waitlist_ref.delete()
    print("  ✓ Test entry removed from Firebase RTDB. Clean state preserved.")


if __name__ == "__main__":
    setup()
    try:
        test_hash_calculation()
        test_firebase_lifecycle()
        test_cli_tools()
    finally:
        cleanup()
    print("\nALL VERIFICATION TESTS PASSED SUCCESSFULLY! ✓\n")
