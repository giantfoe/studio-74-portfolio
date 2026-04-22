'use client';

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Play } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { projects } from "@/components/sections/PortfolioGrid";

interface VideoItem {
  videoId: string;
  title: string;
  thumbnail: string;
  published: string;
}

interface PlaylistModalProps {
  isOpen: boolean;
  playlistId: number | null;
  onClose: () => void;
}

export function PlaylistModal({ isOpen, playlistId, onClose }: PlaylistModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Find the active project from the projects data
  const activeProject = playlistId !== null ? projects.find(p => p.id === playlistId) : null;

  // Fetch playlist videos when modal opens
  useEffect(() => {
    if (!isOpen || !activeProject?.playlistId || (activeProject.platform !== 'youtube' && activeProject.platform !== 'vimeo-collection')) {
      setVideos([]);
      setActiveVideoId(null);
      return;
    }

    setLoading(true);
    const endpoint = activeProject.platform === 'youtube' 
        ? `/api/playlist/${activeProject.playlistId}`
        : `/api/vimeo/${activeProject.playlistId}`;

    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        setVideos(data.videos || []);
        // Set the first video as active for the main player
        if (data.videos?.length > 0) {
          setActiveVideoId(data.videos[0].videoId);
        }
      })
      .catch(() => setVideos([]))
      .finally(() => setLoading(false));
  }, [isOpen, activeProject?.playlistId, activeProject?.platform]);

  // Lock body scroll when modal is open, restore on close
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Reset modal scroll to top when a new playlist opens
  useEffect(() => {
    if (isOpen && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isOpen, playlistId]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleVideoSelect = useCallback((videoId: string) => {
    setActiveVideoId(videoId);
    // Scroll back to top to see the main player
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const isVimeo = activeProject?.platform === 'vimeo-collection';
  const isVimeoVideo = activeProject?.platform === 'vimeo-video';
  const hasNoPlaylist = !activeProject?.playlistId;

  const modalContent = (
    <AnimatePresence>
      {isOpen && activeProject && (
        <motion.div
          key="playlist-modal"
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-0 z-[9999] bg-[var(--color-surface)]"
          style={{ isolation: 'isolate' }}
        >
          {/* Scrollable inner container */}
          <div
            ref={scrollContainerRef}
            className="absolute inset-0 overflow-y-auto overflow-x-hidden text-[var(--color-on-surface)]"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Sticky Navigation Bar */}
            <div className="sticky top-0 left-0 w-full p-6 md:p-12 z-50 flex justify-between items-center bg-gradient-to-b from-[var(--color-surface)] via-[var(--color-surface)]/80 to-transparent">
              <button
                onClick={onClose}
                className="flex items-center gap-4 hover:opacity-70 transition-opacity font-label uppercase tracking-[0.1em] text-[12px] cursor-pointer text-[var(--color-on-surface)]"
              >
                <ArrowLeft size={16} />
                <span>Back to Portfolio</span>
              </button>
              {videos.length > 0 && (
                <span className="font-label text-[10px] tracking-[0.1em] uppercase opacity-40">
                  {videos.length} {videos.length === 1 ? 'video' : 'videos'}
                </span>
              )}
            </div>

            <main className="pb-24 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
              {/* Header */}
              <div className="mb-12 md:mb-20">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-label text-[10px] md:text-[12px] tracking-[0.1em] text-[var(--color-primary)] uppercase font-bold">
                    {activeProject.category}
                  </span>
                  <span className="w-8 h-[1px] bg-[var(--color-on-surface)] opacity-20" />
                  <span className="font-label text-[10px] md:text-[12px] tracking-[0.1em] uppercase opacity-40">
                    {activeProject.platform === 'youtube' ? 'YouTube Playlist' : activeProject.platform === 'vimeo-video' ? 'Vimeo Video' : 'Vimeo Collection'}
                  </span>
                </div>
                <h1 className="font-display text-[3rem] md:text-[6rem] font-bold leading-[0.85] tracking-[-0.02em] uppercase">
                  {activeProject.title}
                </h1>
              </div>

              {/* ── Playlist & Collections ── */}
              {(activeProject.platform === 'youtube' || activeProject.platform === 'vimeo-collection') && activeProject.playlistId && (
                <>
                  {/* Main Featured Player */}
                  <section className="mb-12 w-full">
                    <div className="relative w-full aspect-video bg-black/30 overflow-hidden rounded-sm">
                      <iframe
                        key={activeVideoId} // Force re-render when video changes
                        className="absolute inset-0 w-full h-full"
                        src={activeVideoId 
                          ? (activeProject.platform === 'youtube' 
                              ? `https://www.youtube.com/embed/${activeVideoId}?autoplay=0&rel=0&modestbranding=1` 
                              : `https://player.vimeo.com/video/${activeVideoId}?color=ffffff&title=0&byline=0&portrait=0`)
                          : (activeProject.platform === 'youtube'
                              ? `https://www.youtube.com/embed/videoseries?list=${activeProject.playlistId}&rel=0&modestbranding=1`
                              : `https://player.vimeo.com/video/${activeProject.playlistId.split(',')[0]}?color=ffffff&title=0&byline=0&portrait=0`)
                        }
                        title={`${activeProject.title} player`}
                        frameBorder="0"
                        allow={activeProject.platform === 'youtube' ? "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" : "autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"}
                        allowFullScreen
                      ></iframe>
                    </div>
                    {/* Now Playing Info */}
                    {activeVideoId && videos.length > 0 && (
                      <div className="mt-6 flex flex-col md:flex-row justify-between md:items-end border-b border-[var(--color-on-surface)]/10 pb-6 gap-3">
                        <div>
                          <span className="font-label text-[10px] tracking-[0.1em] uppercase text-[var(--color-primary)] mb-2 block">NOW PLAYING</span>
                          <h2 className="font-display text-[1.25rem] md:text-[1.75rem] font-bold uppercase tracking-[-0.02em]">
                            {videos.find(v => v.videoId === activeVideoId)?.title || 'Untitled'}
                          </h2>
                        </div>
                        <div className="text-[12px] font-label tracking-[0.05em] uppercase opacity-50">
                          {String(videos.findIndex(v => v.videoId === activeVideoId) + 1).padStart(2, '0')} / {String(videos.length).padStart(2, '0')}
                        </div>
                      </div>
                    )}
                  </section>

                  {/* Loading State */}
                  {loading && (
                    <div className="flex items-center gap-4 py-16">
                      <div className="w-4 h-4 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
                      <span className="font-label text-[12px] tracking-[0.1em] uppercase opacity-50">Loading playlist...</span>
                    </div>
                  )}

                  {/* All Videos Grid */}
                  {!loading && videos.length > 0 && (
                    <section className="mt-8">
                      <h3 className="font-label text-[14px] tracking-[0.1em] uppercase mb-12 flex items-center gap-4">
                        <span className="w-8 h-[1px] bg-[var(--color-on-surface)] opacity-30" />
                        All Videos
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {videos.map((video, index) => {
                          const isActive = video.videoId === activeVideoId;
                          return (
                            <button
                              key={video.videoId}
                              onClick={() => handleVideoSelect(video.videoId)}
                              className={`group text-left cursor-pointer transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                            >
                              {/* Thumbnail */}
                              <div className={`relative aspect-video overflow-hidden bg-black/20 mb-4 rounded-sm ${isActive ? 'ring-2 ring-[var(--color-primary)]' : ''}`}>
                                <img
                                  src={video.thumbnail}
                                  alt={video.title}
                                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isActive ? '' : 'grayscale group-hover:grayscale-0'}`}
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-40' : 'opacity-70 group-hover:opacity-40'}`} />
                                
                                {/* Play icon overlay */}
                                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isActive ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                                    <Play size={20} className="text-white ml-0.5" fill="white" />
                                  </div>
                                </div>

                                {/* Now Playing Badge */}
                                {isActive && (
                                  <div className="absolute top-3 left-3 flex items-center gap-2 bg-[var(--color-primary)] px-3 py-1 rounded-sm">
                                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    <span className="font-label text-[9px] tracking-[0.08em] uppercase text-white font-bold">Playing</span>
                                  </div>
                                )}
                              </div>

                              {/* Video Info */}
                              <div className="flex items-start gap-4">
                                <span className="font-label text-[10px] tracking-[0.1em] text-[var(--color-primary)] font-bold mt-1 shrink-0">
                                  {String(index + 1).padStart(2, '0')}
                                </span>
                                <div>
                                  <h4 className={`font-display text-[1rem] md:text-[1.1rem] font-bold uppercase tracking-[-0.01em] transition-colors duration-300 leading-tight ${isActive ? 'text-[var(--color-primary)]' : 'group-hover:text-[var(--color-primary)]'}`}>
                                    {video.title}
                                  </h4>
                                  {video.published && (
                                    <span className="font-label text-[9px] tracking-[0.05em] uppercase opacity-30 mt-1 block">
                                      {new Date(video.published).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  )}
                </>
              )}

              {/* ── Vimeo Folder ── */}
              {isVimeo && activeProject.playlistId && (
                <section className="w-full">
                  <div className="relative w-full aspect-video bg-black/30 overflow-hidden rounded-sm group">
                    <img 
                      src={activeProject.thumbnail}
                      alt={activeProject.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    <a 
                      href={`https://vimeo.com/user/153018021/folder/${activeProject.playlistId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10"
                    >
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/60 flex items-center justify-center backdrop-blur-sm bg-white/10 group-hover:bg-white/20 group-hover:border-white transition-all duration-500 group-hover:scale-110">
                        <ExternalLink size={28} className="text-white" />
                      </div>
                      <span className="font-label text-[12px] md:text-[14px] tracking-[0.15em] uppercase text-white/80 group-hover:text-white transition-colors">
                        View on Vimeo
                      </span>
                    </a>
                  </div>
                  <div className="mt-8 border-b border-[var(--color-on-surface)]/10 pb-8">
                    <span className="font-label text-[10px] tracking-[0.1em] uppercase text-[var(--color-primary)] block">
                      This collection is hosted on Vimeo — click above to explore
                    </span>
                  </div>
                </section>
              )}

              {/* ── Vimeo Single Video ── */}
              {isVimeoVideo && activeProject.playlistId && (
                <section className="w-full">
                  <div className="relative w-full aspect-video bg-black/30 overflow-hidden rounded-sm group">
                    <iframe 
                      src={`https://player.vimeo.com/video/${activeProject.playlistId}?color=ffffff&title=0&byline=0&portrait=0`}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                      allowFullScreen
                    ></iframe>
                  </div>
                </section>
              )}

              {/* ── Coming Soon ── */}
              {hasNoPlaylist && (
                <section className="w-full">
                  <div className="relative w-full aspect-video bg-black/10 overflow-hidden rounded-sm flex items-center justify-center">
                    <img 
                      src={activeProject.thumbnail}
                      alt={activeProject.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
                    />
                    <div className="absolute inset-0 bg-[var(--color-surface)]/80" />
                    <div className="relative z-10 text-center">
                      <h3 className="font-display text-[2rem] md:text-[3rem] font-bold uppercase tracking-[-0.02em] mb-4 opacity-30">
                        Coming Soon
                      </h3>
                      <p className="font-label text-[12px] tracking-[0.1em] uppercase opacity-40">
                        This collection is being curated
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </main>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof window === 'undefined') return null;
  return createPortal(modalContent, document.body);
}
