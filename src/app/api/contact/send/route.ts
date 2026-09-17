import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, sendOwnerNotification, getNotifyEmail } from '@/lib/email/sender';

export const dynamic = 'force-dynamic';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, message } = body;

    // --- Validation ---
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email address is required.' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail.length > 254 || !EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    const cleanName = (typeof name === 'string' ? name.trim() : '').slice(0, 128) || 'Anonymous';
    const cleanMessage = (typeof message === 'string' ? message.trim() : '').slice(0, 4000);

    const notifyEmail = getNotifyEmail(); // server-side only — never reaches client

    // --- Owner notification email ---
    const ownerHtml = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#14100c;">
        <h2 style="font-size:20px;font-weight:700;margin-bottom:16px;">📬 New Demo / Contact Request — YCB</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr style="border-bottom:1px solid #e5dfd5;">
            <td style="padding:10px 8px;font-weight:600;color:#555;width:30%;">From Name</td>
            <td style="padding:10px 8px;">${escHtml(cleanName)}</td>
          </tr>
          <tr style="border-bottom:1px solid #e5dfd5;">
            <td style="padding:10px 8px;font-weight:600;color:#555;">From Email</td>
            <td style="padding:10px 8px;"><a href="mailto:${escHtml(normalizedEmail)}">${escHtml(normalizedEmail)}</a></td>
          </tr>
          <tr style="border-bottom:1px solid #e5dfd5;">
            <td style="padding:10px 8px;font-weight:600;color:#555;">Message</td>
            <td style="padding:10px 8px;white-space:pre-wrap;">${cleanMessage ? escHtml(cleanMessage) : '<em style="color:#999">No message provided</em>'}</td>
          </tr>
          <tr>
            <td style="padding:10px 8px;font-weight:600;color:#555;">Submitted At</td>
            <td style="padding:10px 8px;">${new Date().toISOString()}</td>
          </tr>
        </table>
        <hr style="border:none;border-top:1px solid #e5dfd5;margin:24px 0 12px 0;"/>
        <p style="font-size:12px;color:#aaa;">YCB (Your Company Brain) · Contact form submission</p>
      </div>
    `;

    const ownerResult = await sendEmail({
      to: notifyEmail,
      subject: `📬 New YCB demo request from ${cleanName} <${normalizedEmail}>`,
      html: ownerHtml,
      replyTo: normalizedEmail,
    });

    if (!ownerResult.success) {
      console.error('[Contact] Failed to send owner notification:', ownerResult.error);
      // We still return success to the user only if RESEND is misconfigured at the key level.
      // For any other real failure we surface the error.
      if (ownerResult.error?.includes('API key') || ownerResult.error?.includes('RESEND_API_KEY')) {
        return NextResponse.json(
          { error: 'Email service is not configured. Please try again later or email us directly.' },
          { status: 500 }
        );
      }
    }

    // --- Auto-reply to the sender (best-effort, non-blocking) ---
    const autoReplyHtml = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#14100c;">
        <h2 style="font-size:20px;font-weight:700;margin-bottom:8px;">Thanks for reaching out, ${escHtml(cleanName)}!</h2>
        <p style="font-size:15px;line-height:1.6;color:#333;margin-bottom:16px;">
          We received your message and will get back to you within <strong>4 hours</strong> to schedule your YCB walkthrough.
        </p>
        ${cleanMessage ? `
        <div style="padding:14px 16px;background:#f7f5f0;border-radius:10px;border:1px solid #e5dfd5;margin-bottom:20px;">
          <p style="font-size:13px;color:#555;font-weight:600;margin:0 0 6px 0;">Your message:</p>
          <p style="font-size:14px;color:#333;white-space:pre-wrap;margin:0;">${escHtml(cleanMessage)}</p>
        </div>` : ''}
        <p style="font-size:14px;color:#555;">While you wait, try the self-serve CLI:</p>
        <pre style="background:#14100c;color:#fff;padding:12px 16px;border-radius:8px;font-size:13px;">pip install company-brain &amp;&amp; ycb init</pre>
        <hr style="border:none;border-top:1px solid #e5dfd5;margin:24px 0 12px 0;"/>
        <p style="font-size:12px;color:#aaa;">YCB (Your Company Brain) · 100% Offline · Zero Cloud Leaks</p>
      </div>
    `;

    // Fire-and-forget — don't let auto-reply failure block the response
    sendEmail({
      to: normalizedEmail,
      subject: 'We got your YCB demo request ✓',
      html: autoReplyHtml,
    }).catch((e) => console.error('[Contact] Auto-reply failed (non-critical):', e));

    return NextResponse.json({
      success: true,
      message: "Thanks! We'll email you within 4 hours to coordinate your demo.",
    });
  } catch (error: any) {
    console.error('[Contact] Unexpected error:', error);
    return NextResponse.json(
      { error: error?.message || 'Unable to send message. Please try again.' },
      { status: 500 }
    );
  }
}

/** Minimal HTML escape — prevents XSS in email content */
function escHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
