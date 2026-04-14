import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { Preloader } from '@/components/ui/Preloader';
import { ViewportGrid } from '@/components/ui/ViewportGrid';

import { Playfair_Display } from 'next/font/google';

const aeonik = localFont({
  src: [
    {
      path: '../../public/fonts/fonnts.com-Aeonik-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/fonnts.com-Aeonik-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-aeonik'
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Studio 74 - Kinetic Editorial',
  description: 'The Kinetic Curator - Studio 74 Brand Experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${aeonik.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        <Preloader />
        <ViewportGrid />
        <NoiseOverlay />
        <CustomCursor />

        {children}
      </body>
    </html>
  );
}
