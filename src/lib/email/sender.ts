/**
 * Shared server-side Resend email client.
 * NEVER import this in client components — server-only.
 *
 * Required env vars:
 *   RESEND_API_KEY        — your Resend API key (re_...)
 *   RESEND_FROM_EMAIL     — optional sender address (default: onboarding@resend.dev for testing)
 *   NOTIFY_EMAIL          — destination inbox for owner notifications (yourcompanybrain.business@gmail.com)
 */

import { Resend } from 'resend';

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      'RESEND_API_KEY is not set. Add it to your environment variables or .env.local file.'
    );
  }
  return new Resend(apiKey);
}

/** The verified sender address — use your own domain once verified in Resend. */
export function getFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
}

/** The owner notification inbox — never sent to frontend. */
export function getNotifyEmail(): string {
  return process.env.NOTIFY_EMAIL || 'yourcompanybrain.business@gmail.com';
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Sends a transactional email via Resend.
 * Returns { success: true } or { success: false, error: string }.
 * Never throws — callers can fire-and-forget safely.
 */
export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResendClient();
    const result = await resend.emails.send({
      from: getFromEmail(),
      to: options.to,
      subject: options.subject,
      html: options.html,
      ...(options.replyTo ? { reply_to: options.replyTo } : {}),
    });

    if (result.error) {
      console.error('[Resend] Email send error:', result.error);
      return { success: false, error: result.error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('[Resend] Unexpected error:', err?.message || err);
    return { success: false, error: err?.message || 'Unknown email error' };
  }
}

/**
 * Sends an owner notification email (fire-and-forget safe).
 * A failed notification NEVER propagates to the caller.
 */
export async function sendOwnerNotification(subject: string, html: string): Promise<void> {
  const notifyEmail = getNotifyEmail();
  const result = await sendEmail({ to: notifyEmail, subject, html });
  if (!result.success) {
    console.error(`[Resend] Owner notification to ${notifyEmail} failed: ${result.error}`);
  }
}
