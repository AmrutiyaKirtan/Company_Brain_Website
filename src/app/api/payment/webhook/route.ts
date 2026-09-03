import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { firebaseDb } from '@/lib/firebase/admin';
import { issueLicenseKey } from '@/lib/licensing/issuer';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature || !secret) {
      return NextResponse.json({ error: 'Signature missing' }, { status: 400 });
    }

    const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
    if (expected !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    // Initial payment captured or order paid
    if (event.event === 'order.paid' || event.event === 'payment.captured') {
      const payment = event.payload?.payment?.entity;
      const order_id = payment?.order_id;
      if (order_id) {
        const orderRef = firebaseDb.ref(`orders/${order_id}`);
        const snap = await orderRef.once('value');
        if (snap.exists()) {
          const order = snap.val();
          if (order.status !== 'completed') {
            const license = await issueLicenseKey(order.email, 'max', 1);
            await orderRef.update({
              status: 'completed',
              license_key: license.license_key,
              payment_id: payment.id,
              completed_at: new Date().toISOString(),
            });
          }
        }
      }
    }

    // Monthly subscription recurring renewal
    if (event.event === 'subscription.charged') {
      const subscription = event.payload?.subscription?.entity;
      const customerEmail = subscription?.customer_email || subscription?.notes?.email;
      if (customerEmail) {
        const query = await firebaseDb
          .ref('licenses')
          .orderByChild('email')
          .equalTo(customerEmail.toLowerCase())
          .once('value');

        if (query.exists()) {
          query.forEach((child: any) => {
            const license = child.val();
            if (license.plan_tier === 'max') {
              const currentExp = license.expires_at ? new Date(license.expires_at) : new Date();
              const base = currentExp > new Date() ? currentExp : new Date();
              const newExp = new Date(base.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
              child.ref.update({ expires_at: newExp, status: 'active' });
            }
          });
        }
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Webhook processing failed' }, { status: 500 });
  }
}
