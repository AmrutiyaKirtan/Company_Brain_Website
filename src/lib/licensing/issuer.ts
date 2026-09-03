import crypto from 'crypto';
import { firebaseDb } from '../firebase/admin';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function generateLicenseKey(): string {
  const getBlock = () => {
    let block = '';
    const bytes = crypto.randomBytes(4);
    for (let i = 0; i < 4; i++) {
      block += ALPHABET[bytes[i] % ALPHABET.length];
    }
    return block;
  };
  return `CB-${getBlock()}-${getBlock()}-${getBlock()}`;
}

export type PlanTier = 'solo' | 'max' | 'test' | 'enterprise';

export interface LicenseRecord {
  email: string;
  plan_tier: PlanTier;
  status: 'active' | 'expired' | 'revoked';
  created_at: string;
  expires_at: string | null;
  bound_machine_id: string | null;
  seat_limit: number;
  bound_machines: Record<string, unknown>;
  license_key?: string;
}

export async function issueLicenseKey(
  email: string,
  tier: PlanTier = 'solo',
  seats: number = 1
): Promise<LicenseRecord> {
  const licensesRef = firebaseDb.ref('licenses');
  let key = '';
  let attempts = 0;

  while (attempts < 10) {
    const candidate = generateLicenseKey();
    const snapshot = await licensesRef.child(candidate).once('value');
    if (!snapshot.exists()) {
      key = candidate;
      break;
    }
    attempts++;
  }

  if (!key) throw new Error('Could not generate unique license key after 10 attempts');

  const now = new Date();
  // Solo & Test are perpetual (null). Max is monthly (now + 30 days).
  const expiresAt =
    tier === 'max'
      ? new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString()
      : null;

  const licenseData: LicenseRecord = {
    email: email.trim().toLowerCase(),
    plan_tier: tier,
    status: 'active',
    created_at: now.toISOString(),
    expires_at: expiresAt,
    bound_machine_id: null,
    seat_limit: seats,
    bound_machines: {},
  };

  await licensesRef.child(key).set(licenseData);
  return { ...licenseData, license_key: key };
}
