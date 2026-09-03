import { NextRequest, NextResponse } from 'next/server';
import { issueLicenseKey, PlanTier } from '@/lib/licensing/issuer';

export async function POST(req: NextRequest) {
  try {
    const { email, tier } = await req.json();
    const cleanEmail = email?.trim().toLowerCase();

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    const selectedTier: PlanTier = tier === 'test' ? 'test' : 'solo';
    const license = await issueLicenseKey(cleanEmail, selectedTier, 1);

    return NextResponse.json({
      success: true,
      license_key: license.license_key,
      email: license.email,
      plan_tier: license.plan_tier,
      expires_at: null,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
