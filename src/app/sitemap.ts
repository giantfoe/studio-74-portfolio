import type { MetadataRoute } from 'next';
import { journalArticles } from '@/data/journal';
import { projectSlugs } from '@/data/projects';
import { SITE_URL } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/` },
    ...projectSlugs.map((slug) => ({ url: `${SITE_URL}/playlist/${slug}` })),
    ...journalArticles.map((article) => ({
      url: `${SITE_URL}/journal/${article.slug}`,
      lastModified: article.date,
    })),
  ];
}
