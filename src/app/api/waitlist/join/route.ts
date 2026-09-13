import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { firebaseDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

interface WaitlistEntry {
  email: string;
  created_at: string;
  updated_at: string;
  signup_count: number;
  source: string;
  status: 'pending' | 'invited' | 'active';
  notified_at: string | null;
  referrer: string | null;
  user_agent: string | null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, ycb_company_website, source, referrer } = body;

    // 1. Honeypot check: If the hidden bot field is filled, silently return 200
    if (ycb_company_website) {
      return NextResponse.json({
        success: true,
        already_joined: false,
        message: "You're on the list! We'll notify you as soon as early access opens.",
      });
    }

    // 2. Email validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email address is required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail.length > 254 || !EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // 3. Persistent Firebase-backed IP rate limiter (survives Vercel cold starts)
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const clientIp = (forwardedFor ? forwardedFor.split(',')[0].trim() : realIp) || '127.0.0.1';
    const ipHash = crypto.createHash('sha256').update(clientIp).digest('hex').slice(0, 16);

    const rateLimitRef = firebaseDb.ref(`rate_limits/waitlist/${ipHash}`);
    const rateLimitSnap = await rateLimitRef.once('value');
    const now = Date.now();

    if (rateLimitSnap.exists()) {
      const rateData = rateLimitSnap.val();
      if (now < rateData.reset_at) {
        if (rateData.count >= MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
            { error: 'Too many requests from this device. Please wait a minute before trying again.' },
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

    // 4. SHA-256 Hash for idempotent keying
    const emailHash = crypto.createHash('sha256').update(normalizedEmail).digest('hex');
    const waitlistRef = firebaseDb.ref(`waitlist/${emailHash}`);
    const waitlistSnap = await waitlistRef.once('value');

    const timestamp = new Date().toISOString();

    if (waitlistSnap.exists()) {
      // Returning user - update timestamp & counter, no duplicate record
      const existing = waitlistSnap.val() as WaitlistEntry;
      const newCount = (existing.signup_count || 1) + 1;

      await waitlistRef.update({
        updated_at: timestamp,
        signup_count: newCount,
      });

      return NextResponse.json({
        success: true,
        already_joined: true,
        email: normalizedEmail,
        created_at: existing.created_at,
        signup_count: newCount,
        message: "You're already on the waitlist! We'll reach out as soon as your batch is ready.",
      });
    }

    // 5. New signup entry
    const newEntry: WaitlistEntry = {
      email: normalizedEmail,
      created_at: timestamp,
      updated_at: timestamp,
      signup_count: 1,
      source: typeof source === 'string' && source ? source.slice(0, 64) : 'website_waitlist',
      status: 'pending',
      notified_at: null,
      referrer: typeof referrer === 'string' && referrer ? referrer.slice(0, 256) : null,
      user_agent: req.headers.get('user-agent')?.slice(0, 256) || null,
    };

    await waitlistRef.set(newEntry);

    return NextResponse.json({
      success: true,
      already_joined: false,
      email: normalizedEmail,
      created_at: timestamp,
      signup_count: 1,
      message: "You're confirmed for early access! We'll email you the moment early access opens.",
    });
  } catch (error: any) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { error: error?.message || 'Unable to join waitlist. Please try again later.' },
      { status: 500 }
    );
  }
}
