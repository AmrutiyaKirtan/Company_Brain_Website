import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Waitlist',
  description:
    'Request early access to Your Company Brain. Run the local-first knowledge engine across your codebase, Notion, Slack, and Google Docs.',
  alternates: {
    canonical: 'https://yourcompanybrain.vercel.app/waitlist',
  },
  openGraph: {
    title: 'Waitlist | Your Company Brain',
    description:
      'Request early access to Your Company Brain. Run the local-first knowledge engine across your codebase, Notion, Slack, and Google Docs.',
    url: 'https://yourcompanybrain.vercel.app/waitlist',
    siteName: 'Your Company Brain',
    locale: 'en_US',
    type: 'website',
  },
};

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
