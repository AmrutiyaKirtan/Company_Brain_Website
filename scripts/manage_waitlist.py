#!/usr/bin/env python3
"""
Internal admin script for managing YCB Waitlist signups.

CAPABILITIES:
  1. View waitlist metrics & recent signups:
     python scripts/manage_waitlist.py list

  2. Export signups to CSV:
     python scripts/manage_waitlist.py export --out waitlist_export.csv

  3. Dry-run early access notification (tests Resend payload without sending):
     python scripts/manage_waitlist.py broadcast --dry-run

  4. Send early access announcement to pending signups via Resend:
     python scripts/manage_waitlist.py broadcast --subject "Your YCB Early Access is Ready"

REQUIREMENTS:
  - firebase-admin Python package installed: pip install firebase-admin
  - Service account JSON at C:\\Users\\kirta\\.company-brain-secrets\\firebase-service-account.json (or via --service-account)
  - RESEND_API_KEY environment variable (or in .env.local) for broadcasting
"""

import os
import sys
import csv
import json
import argparse
import urllib.request
import urllib.error
from datetime import datetime, timezone

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

try:
    import firebase_admin
    from firebase_admin import credentials, db
except ImportError:
    print("Error: firebase-admin is not installed. Run: pip install firebase-admin")
    sys.exit(1)

DEFAULT_SERVICE_ACCOUNT_PATH = r"C:\Users\kirta\.company-brain-secrets\firebase-service-account.json"
DEFAULT_DB_URL = "https://company-brain-55bbc-default-rtdb.firebaseio.com"


def load_env_local():
    """Attempt to read RESEND_API_KEY from .env.local if not already in os.environ."""
    env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env.local")
    if os.path.exists(env_path):
        try:
            with open(env_path, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        k, v = line.split("=", 1)
                        k = k.strip()
                        v = v.strip().strip('"').strip("'")
                        if k not in os.environ:
                            os.environ[k] = v
        except Exception:
            pass


def init_firebase(service_account_path: str, database_url: str):
    """Initialize Firebase Admin SDK."""
    if not os.path.exists(service_account_path):
        raise FileNotFoundError(
            f"Firebase service account not found at: {service_account_path}\n"
            "Set via --service-account or FIREBASE_SERVICE_ACCOUNT_PATH."
        )

    if not firebase_admin._apps:
        cred = credentials.Certificate(service_account_path)
        firebase_admin.initialize_app(cred, {"databaseURL": database_url})


def get_all_waitlist_records() -> dict:
    """Fetch all waitlist records from Firebase RTDB."""
    ref = db.reference("waitlist")
    data = ref.get()
    return data or {}


def cmd_list(args):
    """Print waitlist statistics and latest signups."""
    records = get_all_waitlist_records()
    total = len(records)
    
    pending = [r for r in records.values() if r.get("status") == "pending" or not r.get("notified_at")]
    notified = [r for r in records.values() if r.get("notified_at")]

    print("\n" + "=" * 60)
    print("  YCB WAITLIST SUMMARY")
    print("=" * 60)
    print(f"  Total Registrations:  {total}")
    print(f"  Pending Notification: {len(pending)}")
    print(f"  Already Notified:     {len(notified)}")
    print("=" * 60)

    if not records:
        print("  No waitlist signups recorded yet.\n")
        return

    # Sort descending by created_at
    sorted_items = sorted(
        records.items(),
        key=lambda x: x[1].get("created_at", ""),
        reverse=True
    )

    print(f"\n  Latest Signups (Showing top {min(20, total)} of {total}):\n")
    print(f"  {'Email':<32} {'Created At':<22} {'Count':<6} {'Status':<10}")
    print("  " + "-" * 72)
    for hash_key, rec in sorted_items[:20]:
        email = rec.get("email", "")[:30]
        created = rec.get("created_at", "")[:19]
        count = str(rec.get("signup_count", 1))
        status = rec.get("status", "pending")
        print(f"  {email:<32} {created:<22} {count:<6} {status:<10}")
    print("\n")


def cmd_export(args):
    """Export waitlist records to a CSV file."""
    records = get_all_waitlist_records()
    if not records:
        print("No waitlist records found to export.")
        return

    out_file = args.out or "waitlist_export.csv"

    # Sort ascending by created_at for historical view
    sorted_items = sorted(records.items(), key=lambda x: x[1].get("created_at", ""))

    fieldnames = [
        "email",
        "created_at",
        "updated_at",
        "signup_count",
        "status",
        "notified_at",
        "source",
        "referrer"
    ]

    with open(out_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        for _, rec in sorted_items:
            writer.writerow(rec)

    print(f"\nSuccessfully exported {len(sorted_items)} records to: {os.path.abspath(out_file)}\n")


def send_resend_email(api_key: str, from_email: str, to_email: str, subject: str, html_body: str):
    """Send an email via Resend REST API."""
    url = "https://api.resend.com/emails"
    payload = {
        "from": from_email,
        "to": [to_email],
        "subject": subject,
        "html": html_body,
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "User-Agent": "YCB-Waitlist-Admin/1.0",
        },
        method="POST"
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))


def cmd_broadcast(args):
    """Broadcast early access notification to unnotified waitlist subscribers."""
    load_env_local()
    api_key = os.environ.get("RESEND_API_KEY")

    records = get_all_waitlist_records()
    pending = [
        (h, r) for h, r in records.items()
        if (r.get("status") == "pending" or not r.get("notified_at"))
    ]

    if not pending:
        print("\nNo pending subscribers to notify! All waitlist signups have already been notified.\n")
        return

    subject = args.subject or "Your YCB (Your Company Brain) Early Access is Live"
    from_email = os.environ.get("RESEND_FROM_EMAIL", "YCB Team <onboarding@resend.dev>")

    html_template = """
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #14100c;">
      <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">Your YCB Early Access is Ready</h2>
      <p style="font-size: 15px; line-height: 1.6; color: #333;">
        Thank you for joining the waitlist. We're excited to open up early access to 
        <strong>Your Company Brain (YCB)</strong> — the 100% offline knowledge synthesis engine for local AI agents.
      </p>
      <div style="margin: 24px 0; padding: 18px; background-color: #f7f5f0; border-radius: 12px; border: 1px solid #e5dfd5;">
        <h4 style="margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Getting Started in 2 Minutes:</h4>
        <pre style="background: #14100c; color: #fff; padding: 12px; border-radius: 8px; font-size: 13px; overflow-x: auto;">pip install company-brain
ycb sync --all
ycb --ask "What is our deployment architecture?"</pre>
      </div>
      <p style="font-size: 15px; line-height: 1.6; color: #333;">
        Generate your self-serve license key at any time on the website:
      </p>
      <p style="margin: 24px 0;">
        <a href="https://company-brain.vercel.app/#pricing" style="background-color: #14100c; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
          Get Your Free License Key &rarr;
        </a>
      </p>
      <hr style="border: none; border-top: 1px solid #e5dfd5; margin: 32px 0 16px 0;" />
      <p style="font-size: 12px; color: #888;">
        YCB &bull; 100% Local Inference &bull; Zero External Data Transmission
      </p>
    </div>
    """

    print("\n" + "=" * 60)
    print("  BROADCAST EARLY ACCESS NOTIFICATIONS")
    print("=" * 60)
    print(f"  Target Recipients: {len(pending)}")
    print(f"  From Email:        {from_email}")
    print(f"  Subject:           {subject}")
    print(f"  Mode:              {'DRY RUN (Simulated)' if args.dry_run else 'LIVE PRODUCTION'}")
    print("=" * 60)

    if args.dry_run:
        print("\n  [DRY RUN PREVIEW] Recipients to be notified:")
        for h, r in pending[:10]:
            print(f"   - {r.get('email')}")
        if len(pending) > 10:
            print(f"   ... and {len(pending) - 10} more.")
        print("\n  Dry run complete. No emails were sent, no database entries modified.\n")
        return

    if not api_key:
        print("\nError: RESEND_API_KEY is not set in environment or .env.local.")
        print("Please provide an API key to send live emails.")
        sys.exit(1)

    # Confirmation safeguard
    confirm = input(f"\nAre you sure you want to send emails to {len(pending)} recipients? (yes/no): ").strip().lower()
    if confirm not in ("yes", "y"):
        print("Aborted by user.")
        return

    success_count = 0
    now_iso = datetime.now(timezone.utc).isoformat()

    for hash_key, rec in pending:
        target_email = rec.get("email")
        print(f"Sending to {target_email}...", end=" ", flush=True)
        try:
            send_resend_email(api_key, from_email, target_email, subject, html_template)
            # Mark notified in Firebase RTDB
            db.reference(f"waitlist/{hash_key}").update({
                "status": "invited",
                "notified_at": now_iso
            })
            print("OK")
            success_count += 1
        except urllib.error.HTTPError as e:
            err_content = e.read().decode("utf-8")
            print(f"FAILED (HTTP {e.code}): {err_content}")
        except Exception as e:
            print(f"FAILED: {e}")

    print(f"\nBroadcast completed: {success_count}/{len(pending)} emails successfully sent.\n")


def main():
    parser = argparse.ArgumentParser(description="YCB Waitlist Administration Tool")
    parser.add_argument(
        "--service-account",
        default=os.environ.get("FIREBASE_SERVICE_ACCOUNT_PATH", DEFAULT_SERVICE_ACCOUNT_PATH),
        help="Path to Firebase service account JSON key file."
    )
    parser.add_argument(
        "--db-url",
        default=os.environ.get("FIREBASE_DATABASE_URL", DEFAULT_DB_URL),
        help="Firebase Realtime Database URL."
    )

    subparsers = parser.add_subparsers(dest="command", help="Available subcommands")

    # list
    subparsers.add_parser("list", help="List waitlist signups and summary metrics")

    # export
    export_p = subparsers.add_parser("export", help="Export waitlist to a CSV file")
    export_p.add_argument("--out", help="Output CSV filepath (default: waitlist_export.csv)")

    # broadcast
    broadcast_p = subparsers.add_parser("broadcast", help="Broadcast early access email to pending signups")
    broadcast_p.add_argument("--subject", help="Custom email subject line")
    broadcast_p.add_argument("--dry-run", action="store_true", help="Simulate broadcast without sending emails")

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(1)

    init_firebase(args.service_account, args.db_url)

    if args.command == "list":
        cmd_list(args)
    elif args.command == "export":
        cmd_export(args)
    elif args.command == "broadcast":
        cmd_broadcast(args)


if __name__ == "__main__":
    main()
