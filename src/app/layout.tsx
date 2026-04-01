import type { Metadata } from 'next';
import { DM_Sans, Barlow_Condensed } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const display = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dan Winter | Learning Experience Designer',
  description:
    'Full-stack learning experience designer with 15+ years in L&D and customer education—interactive curriculum, Articulate 360, and AI-enabled learning.',
  metadataBase: new URL('https://www.ohhhdan.com'),
  openGraph: {
    title: 'Dan Winter | Learning Experience Designer',
    description: 'Portfolio and professional background in learning design, development, and customer education.',
    type: 'website',
    url: 'https://www.ohhhdan.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${display.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
