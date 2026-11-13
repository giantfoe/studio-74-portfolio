import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { journalArticles, getArticleBySlug } from '@/data/journal';
import { SITE_URL, SITE_NAME, SOCIAL_IMAGE } from '@/data/site';
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
      siteName: SITE_NAME,
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: SOCIAL_IMAGE,
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
      images: [SOCIAL_IMAGE],
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
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/studio74-logo.webp`,
      },
    },
    datePublished: article.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/journal/${article.slug}`,
    },
    image: `${SITE_URL}${SOCIAL_IMAGE}`,
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
