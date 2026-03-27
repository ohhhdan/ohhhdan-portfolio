import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Dan Winter | Learning Experience Designer',
  description:
    'Full-stack learning experience designer with 15+ years in L&D and customer education. Specializing in SCORM, Articulate 360, and AI-powered learning.',
  openGraph: {
    title: 'Dan Winter | Learning Experience Designer',
    description:
      'Full-stack learning experience designer with 15+ years in L&D and customer education.',
    type: 'website',
    url: 'https://ohhhdan.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dan Winter | Learning Experience Designer',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
