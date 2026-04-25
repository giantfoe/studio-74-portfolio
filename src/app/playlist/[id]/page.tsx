import type { Metadata } from 'next';
import PlaylistClient from './PlaylistClient';

// Dynamic metadata for each playlist — gives each page a unique title/description in search results
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  // Map known playlist IDs to descriptive metadata
  const playlistMeta: Record<string, { title: string; description: string }> = {
    'tv-commercials': {
      title: 'TV Commercials',
      description:
        'Watch Studio 74\'s cinematic TV commercial portfolio — brand films produced for leading organizations across Africa and beyond.',
    },
    'wedding-films': {
      title: 'Wedding Films',
      description:
        'Cinematic wedding films by Studio 74. Timeless love stories captured in Freetown, Sierra Leone and destination locations.',
    },
    documentaries: {
      title: 'Documentaries',
      description:
        'Documentary filmmaking by Studio 74 — partnering with BBC, Al Jazeera, UNICEF, and the World Bank on impactful stories.',
    },
    'music-videos': {
      title: 'Music Videos',
      description:
        'Music video production by Studio 74. Bold visuals and cinematic direction for artists across West Africa.',
    },
  };

  const meta = playlistMeta[id] || {
    title: `Playlist — ${id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}`,
    description: `Explore this curated video collection by Studio 74 — Freetown's premier cinematic production house.`,
  };

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: `${meta.title} | Studio 74`,
      description: meta.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${meta.title} | Studio 74`,
      description: meta.description,
    },
  };
}

export default function PlaylistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <PlaylistClient params={params} />;
}
