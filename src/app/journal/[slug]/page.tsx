import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { journalArticles, getArticleBySlug, SITE_URL } from '@/data/journal';
import { JournalPage } from './JournalPage';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return journalArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  const articleUrl = `${SITE_URL}/journal/${article.slug}`;

  return {
    title: `${article.title} — Frames & Truth`,
    description: article.excerpt,
    authors: [{ name: article.author }],
    openGraph: {
      type: 'article',
      title: `${article.title} — Frames & Truth`,
      description: article.excerpt,
      url: articleUrl,
      siteName: 'Studio 74',
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: `${article.title} — Frames & Truth by Studio 74`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} — Frames & Truth`,
      description: article.excerpt,
      images: ['/opengraph-image.png'],
      creator: '@studio74film',
    },
    alternates: {
      canonical: articleUrl,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // JSON-LD structured data for the article
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Studio 74',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished: article.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/journal/${article.slug}`,
    },
    image: `${SITE_URL}/opengraph-image.png`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JournalPage article={article} />
    </>
  );
}
