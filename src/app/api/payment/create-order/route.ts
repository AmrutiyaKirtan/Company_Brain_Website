import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { firebaseDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

export async function POST(req: NextRequest) {
  try {
    // --- IP Rate Limiting (3 order creation requests per minute) ---
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const clientIp = (forwardedFor ? forwardedFor.split(',')[0].trim() : realIp) || '127.0.0.1';
    const ipHash = crypto.createHash('sha256').update(clientIp).digest('hex').slice(0, 16);
    const rateLimitRef = firebaseDb.ref(`rate_limits/create_order/${ipHash}`);
    const rateLimitSnap = await rateLimitRef.once('value');
    const now = Date.now();
    if (rateLimitSnap.exists()) {
      const rateData = rateLimitSnap.val();
      if (now < rateData.reset_at) {
        if (rateData.count >= MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
            { error: 'Too many payment attempts. Please wait a minute before trying again.' },
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

    const { email, phone } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    // NOTE: NEXT_PUBLIC_RAZORPAY_KEY_ID is intentionally public.
    // Razorpay's client SDK requires the key_id on the frontend to initialise the checkout.
    // Only RAZORPAY_KEY_SECRET must remain server-side.
    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return NextResponse.json({ error: 'Razorpay keys not configured' }, { status: 500 });
    }

    const razorpay = new Razorpay({ key_id, key_secret });

    // ₹299/mo -> 29900 paise
    const amount = 29900;
    const currency = 'INR';

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: `rcpt_${Date.now().toString().slice(-8)}`,
      notes: { email, phone: phone || '', tier: 'max', billing: 'monthly' },
    });

    await firebaseDb.ref(`orders/${order.id}`).set({
      order_id: order.id,
      email: email.trim().toLowerCase(),
      phone: phone || null,
      tier: 'max',
      amount,
      currency,
      status: 'created',
      license_key: null,
      payment_id: null,
      created_at: new Date().toISOString(),
      completed_at: null,
    });

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Order creation failed' }, { status: 500 });
  }
}
