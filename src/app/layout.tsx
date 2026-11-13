import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { ViewportGrid } from '@/components/ui/ViewportGrid';

import { Playfair_Display } from 'next/font/google';
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, SOCIAL_IMAGE, STUDIO_EMAIL } from '@/data/site';

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | Studio 74',
  },
  description: SITE_DESCRIPTION,
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
    url: '/',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Studio 74 logo and Freetown, Sierra Leone',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SOCIAL_IMAGE],
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
      alternateName: 'Studio74',
      url: `${SITE_URL}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/studio74-logo.webp`,
        width: 192,
        height: 192,
      },
      description: SITE_DESCRIPTION,
      legalName: 'Studio 74(SL) Limited',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Freetown',
        addressCountry: 'SL',
      },
      sameAs: [
        'https://www.instagram.com/studio74film',
        'https://www.youtube.com/@studio74film',
        'https://vimeo.com/studio74',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: STUDIO_EMAIL,
        contactType: 'customer service',
        availableLanguage: ['English'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      publisher: { '@id': `${SITE_URL}/#organization` },
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

        <ViewportGrid />
        <NoiseOverlay />
        <CustomCursor />

        {children}
      </body>
    </html>
  );
}
