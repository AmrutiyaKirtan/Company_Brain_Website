import type { Metadata } from 'next';
import { Space_Grotesk, IBM_Plex_Mono, DM_Sans } from 'next/font/google';
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
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Company Brain | Local-First AI Knowledge Engine',
  description:
    'Company Brain reads through your Slack, docs, and code, and uses a local AI model to extract structured knowledge. It works automatically, continuously, and entirely offline. Nothing leaves your servers.',
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
      <body className="min-h-screen">
        <ScrollProgressBar />
        <Nav />
        <main>{children}</main>
        <Footer />
        <CustomCursor />
      </body>
    </html>
  );
}
