import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { firebaseDb } from '@/lib/firebase/admin';
import { issueLicenseKey } from '@/lib/licensing/issuer';

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_secret) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // 1. Verify HMAC signature
    const generated = crypto
      .createHmac('sha256', key_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // 2. Fetch order
    const orderRef = firebaseDb.ref(`orders/${razorpay_order_id}`);
    const snapshot = await orderRef.once('value');
    if (!snapshot.exists()) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const orderData = snapshot.val();

    // Idempotency: return existing key if already issued
    if (orderData.status === 'completed' && orderData.license_key) {
      return NextResponse.json({
        success: true,
        license_key: orderData.license_key,
        email: orderData.email,
        plan_tier: orderData.tier,
      });
    }

    // 3. Issue Max tier key with 30 days validity
    const license = await issueLicenseKey(orderData.email, 'max', 1);

    await orderRef.update({
      status: 'completed',
      license_key: license.license_key,
      payment_id: razorpay_payment_id,
      completed_at: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      license_key: license.license_key,
      email: license.email,
      plan_tier: license.plan_tier,
      expires_at: license.expires_at,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Verification failed' }, { status: 500 });
  }
}
