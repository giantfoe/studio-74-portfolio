import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projectSlugs, projects } from '@/data/projects';
import { SITE_NAME, SITE_URL, SOCIAL_IMAGE, STUDIO_EMAIL } from '@/data/site';

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((id) => ({ id }));
}

async function getProject(params: Props['params']) {
  const { id } = await params;
  const project = projects.find(({ slug }) => slug === id);
  if (!project) notFound();

  return project;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params);
  const url = `${SITE_URL}/playlist/${project.slug}`;
  const title = `${project.heading} | ${SITE_NAME}`;
  const image = project.featured ? project.thumbnail : SOCIAL_IMAGE;

  return {
    title: project.heading,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      url,
      title,
      description: project.description,
      images: [{ url: image, alt: project.featured?.title ?? SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.description,
      images: [image],
    },
  };
}

export default async function PlaylistPage({ params }: Props) {
  const project = await getProject(params);
  const { featured, playlistId } = project;

  return (
    <main className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-16 md:py-20">
      <Link href="/#work" className="font-label text-sm underline underline-offset-4">
        ← Back to the Studio 74 portfolio
      </Link>

      <header className="mb-10 mt-12 max-w-3xl">
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          {project.heading}
        </h1>
        <p className="mt-6 text-lg leading-relaxed">{project.description}</p>
        <p className="mt-4 leading-relaxed">{project.detail}</p>
      </header>

      {featured && (
        <section className="mb-14 max-w-4xl" aria-labelledby="featured-title">
          <h2 id="featured-title" className="font-display text-2xl font-bold md:text-3xl">
            {featured.title}
          </h2>
          <p className="mt-3">{featured.description}</p>
          {featured.embedUrl ? (
            <iframe
              src={featured.embedUrl}
              className="mt-5 aspect-video w-full bg-black"
              title={featured.title}
              loading="lazy"
              allow="encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <a href={featured.url} className="relative mt-5 block aspect-video bg-black">
              <Image
                src={project.thumbnail}
                alt={`Watch ${featured.title} on Vimeo`}
                fill
                sizes="(max-width: 920px) 100vw, 896px"
                className="object-cover"
              />
            </a>
          )}
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            <a href={featured.url} className="underline underline-offset-4">
              Watch on {featured.embedUrl ? 'YouTube' : 'Vimeo'} · {featured.publisher}
            </a>
            {playlistId && (
              <a href={`https://www.youtube.com/playlist?list=${playlistId}`} className="underline underline-offset-4">
                View the full playlist
              </a>
            )}
          </div>
        </section>
      )}

      <a
        href={`mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(project.title + ' inquiry')}`}
        className="inline-block bg-black px-6 py-4 text-sm font-bold text-white hover:bg-[var(--color-primary)]"
      >
        Discuss a project with Studio 74
      </a>

      <nav aria-label="Explore the Studio 74 portfolio" className="mt-16 border-t border-black/20 pt-6">
        <h2 className="font-display text-xl font-bold">More from the portfolio</h2>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          {projects.filter(({ id }) => id !== project.id).map(({ slug, title }) => (
            <li key={slug}>
              <Link href={`/playlist/${slug}`} prefetch={false} className="underline underline-offset-4">
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
