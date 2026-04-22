"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// In a real application, you would fetch the YouTube playlist items using the YouTube Data API:
// GET https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId={id}&key={YOUR_API_KEY}
// For the purpose of the design, we are mocking the returned videos.

const MOCK_PLAYLIST_VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "Cinematic Reel 2026", thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop" },
  { id: "M7lc1UVf-VE", title: "Behind the Scenes - Vogue Edit", thumbnail: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop" },
  { id: "pU8-7BX9Knj", title: "Festival Coverage Preview", thumbnail: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1974&auto=format&fit=crop" },
  { id: "tAGnKpE4NCI", title: "Commercial Work - Nike", thumbnail: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?q=80&w=1974&auto=format&fit=crop" },
];

export default function PlaylistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  // We use the first video as the featured video.
  const featuredVideo = MOCK_PLAYLIST_VIDEOS[0];
  const otherVideos = MOCK_PLAYLIST_VIDEOS.slice(1);

  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-on-surface)]">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-12 z-50 flex justify-between items-center bg-gradient-to-b from-[var(--color-surface)] to-transparent">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-4 text-white hover:opacity-70 transition-opacity font-label uppercase tracking-[0.1em] text-[12px] mix-blend-difference"
        >
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </button>
      </nav>

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <span className="font-label text-[12px] tracking-[0.1em] text-[var(--color-primary)] uppercase font-bold block mb-4">
            [ Playlist Collection ]
          </span>
          <h1 className="font-display text-[3rem] md:text-[5rem] font-bold leading-[0.9] tracking-[-0.02em] uppercase">
            Curated <br />
            <span className="font-serif italic font-normal tracking-normal text-[1em]">Selection</span>
          </h1>
        </div>

        {/* Featured Video Player */}
        <section className="mb-24 w-full">
          <div className="relative w-full aspect-video bg-black/50 overflow-hidden">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${featuredVideo.id}?autoplay=0&rel=0&modestbranding=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="mt-8 flex justify-between items-end border-b border-[var(--color-on-surface)]/20 pb-8">
            <div>
              <span className="font-label text-[10px] tracking-[0.1em] uppercase text-[var(--color-primary)] mb-2 block">NOW PLAYING</span>
              <h2 className="font-display text-[2rem] font-bold uppercase tracking-[-0.02em]">{featuredVideo.title}</h2>
            </div>
            <div className="text-[12px] font-label tracking-[0.05em] uppercase opacity-50">
              01 / {MOCK_PLAYLIST_VIDEOS.length < 10 ? `0${MOCK_PLAYLIST_VIDEOS.length}` : MOCK_PLAYLIST_VIDEOS.length}
            </div>
          </div>
        </section>

        {/* Playlist Grid */}
        <section>
          <h3 className="font-label text-[14px] tracking-[0.1em] uppercase mb-12 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[var(--color-on-surface)] opacity-30" />
            Up Next
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {otherVideos.map((video, index) => (
              <div key={video.id} className="group cursor-pointer">
                {/* Embed container for the small cards */}
                <div className="relative aspect-video overflow-hidden bg-black/20 mb-6">
                  {/* Instead of another iframe directly, we could show the thumbnail and play on click, 
                      or just embed an iframe. To keep performance high, we'll embed the iframe, but 
                      a custom thumbnail approach is also valid. */}
                  <iframe
                    className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100"
                    src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-label text-[10px] tracking-[0.1em] uppercase text-[var(--color-primary)] mb-2 block font-bold transition-opacity duration-300">
                      0{index + 2}
                    </span>
                    <h4 className="font-display text-[1.25rem] font-bold uppercase tracking-[-0.02em] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                      {video.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
