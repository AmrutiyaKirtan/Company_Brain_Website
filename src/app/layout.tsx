import type { Metadata } from 'next';
import { Space_Grotesk, IBM_Plex_Mono, DM_Sans } from 'next/font/google';
import Script from 'next/script';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import CustomCursor from '@/components/CustomCursor';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'YCB (Your Company Brain) | Local-First AI Knowledge Engine',
  description:
    'YCB (Your Company Brain) connects to 38 tools across Slack, Notion, GitHub, and Docs, extracting structured procedure cards for AI agents entirely offline with zero data leakage.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} ${dmSans.variable} antialiased`}
    >
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </head>
      <body className="min-h-screen bg-paper text-ink">
        <ScrollProgressBar />
        <Nav />
        <main>{children}</main>
        <Footer />
        <CustomCursor />
      </body>
    </html>
  );
}
