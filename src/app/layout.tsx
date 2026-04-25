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

const SITE_URL = 'https://studio74.film';
const SITE_NAME = 'Studio 74';
const SITE_DESCRIPTION =
  'Studio 74 is a cinematic production house based in Freetown, Sierra Leone — specializing in TV commercials, wedding films, documentaries, and brand storytelling for clients including BBC, Al Jazeera, UNICEF, and the World Bank.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Studio 74 — Cinematic Production House | Freetown, Sierra Leone',
    template: '%s | Studio 74',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Studio 74',
    'video production Sierra Leone',
    'cinematography Freetown',
    'wedding films Sierra Leone',
    'TV commercial production',
    'documentary filmmaking',
    'brand storytelling Africa',
    'cinematic production house',
    'corporate video production',
    'music video production',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Studio 74 — Cinematic Production House | Freetown',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Studio 74 — Cinematic Production House',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio 74 — Cinematic Production House',
    description: SITE_DESCRIPTION,
    images: ['/opengraph-image.png'],
    creator: '@studio74film',
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: 'entertainment',
  verification: {
    google: 'pDjLHp8u2M2z0MMDfl0zo6VKxBx62-VYlfEY5FADq3Y',
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
      description: SITE_DESCRIPTION,
      foundingDate: '2026',
      foundingLocation: {
        '@type': 'Place',
        name: 'Freetown, Sierra Leone',
      },
      sameAs: [
        'https://www.instagram.com/studio74film',
        'https://www.youtube.com/@studio74film',
        'https://vimeo.com/studio74',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'slstudio74sl@gmail.com',
        contactType: 'customer service',
        availableLanguage: ['English'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { '@id': `${SITE_URL}/#organization` },
      description: SITE_DESCRIPTION,
      inLanguage: 'en',
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: 'Studio 74 — Cinematic Production House | Freetown, Sierra Leone',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      description: SITE_DESCRIPTION,
      inLanguage: 'en',
    },
  ],
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
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Preloader />
        <ViewportGrid />
        <NoiseOverlay />
        <CustomCursor />

        {children}
      </body>
    </html>
  );
}
