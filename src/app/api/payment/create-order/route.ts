import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { firebaseDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { email, phone } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return NextResponse.json({ error: 'Razorpay keys not configured' }, { status: 500 });
    }

    const razorpay = new Razorpay({ key_id, key_secret });

    // ₹299 -> 29900 paise
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
