import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { issueLicenseKey, PlanTier } from '@/lib/licensing/issuer';
import { firebaseDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

export async function POST(req: NextRequest) {
  try {
    // --- IP Rate Limiting (5 free license requests per minute) ---
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const clientIp = (forwardedFor ? forwardedFor.split(',')[0].trim() : realIp) || '127.0.0.1';
    const ipHash = crypto.createHash('sha256').update(clientIp).digest('hex').slice(0, 16);
    const rateLimitRef = firebaseDb.ref(`rate_limits/issue_free/${ipHash}`);
    const rateLimitSnap = await rateLimitRef.once('value');
    const now = Date.now();
    if (rateLimitSnap.exists()) {
      const rateData = rateLimitSnap.val();
      if (now < rateData.reset_at) {
        if (rateData.count >= MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
            { error: 'Too many license requests. Please wait a minute before trying again.' },
            { status: 429 }
          );
        }
        await rateLimitRef.update({ count: (rateData.count || 0) + 1 });
      } else {
        await rateLimitRef.set({ count: 1, reset_at: now + RATE_LIMIT_WINDOW_MS });
      }
    } else {
      await rateLimitRef.set({ count: 1, reset_at: now + RATE_LIMIT_WINDOW_MS });
    }

    const { email, tier } = await req.json();
    const cleanEmail = email?.trim().toLowerCase();

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    const isMaxFree = process.env.NEXT_PUBLIC_MAX_FREE !== 'false';
    let selectedTier: PlanTier = 'solo';
    if (tier === 'test') {
      selectedTier = 'test';
    } else if (tier === 'max' && isMaxFree) {
      selectedTier = 'max';
    }

    const license = await issueLicenseKey(cleanEmail, selectedTier, 1);

    return NextResponse.json({
      success: true,
      license_key: license.license_key,
      email: license.email,
      plan_tier: license.plan_tier,
      expires_at: license.expires_at,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
