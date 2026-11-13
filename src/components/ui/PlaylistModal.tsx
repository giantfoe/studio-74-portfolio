'use client';

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { projects } from "@/data/projects";

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
  const modalRef = useRef<HTMLDivElement>(null);
  const [playlist, setPlaylist] = useState<{
    id: string;
    videos: VideoItem[];
    activeVideoId: string | null;
  } | null>(null);

  const activeProject = projects.find((project) => project.id === playlistId);
  const youtubePlaylistId = activeProject?.playlistId;
  const activePlaylist = playlist?.id === youtubePlaylistId ? playlist : null;
  const videos = activePlaylist?.videos ?? [];
  const activeVideoId = activePlaylist?.activeVideoId ?? null;
  const loading = !activePlaylist;

  useEffect(() => {
    if (!isOpen || !youtubePlaylistId) return;

    const request = new AbortController();
    fetch(`/api/playlist/${youtubePlaylistId}`, { signal: request.signal })
      .then((response) => response.ok ? response.json() : { videos: [] })
      .then((data: { videos?: VideoItem[] }) => {
        if (request.signal.aborted) return;
        const nextVideos = data.videos ?? [];
        setPlaylist({ id: youtubePlaylistId, videos: nextVideos, activeVideoId: nextVideos[0]?.videoId ?? null });
      })
      .catch(() => {
        if (request.signal.aborted) return;
        setPlaylist({ id: youtubePlaylistId, videos: [], activeVideoId: null });
      });

    return () => request.abort();
  }, [isOpen, youtubePlaylistId]);

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

  // Focus trap and initial focus management
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      const modalElement = modalRef.current;
      if (!modalElement) return;

      const focusableSelectors = 'button, [href], input, select, textarea, [tabindex="0"], iframe';
      const focusableElements = modalElement.querySelectorAll(focusableSelectors);
      
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const modalElement = modalRef.current;
      if (!modalElement) return;

      const focusableSelectors = 'button, [href], input, select, textarea, [tabindex="0"], iframe';
      const elements = modalElement.querySelectorAll(focusableSelectors);
      if (elements.length === 0) return;

      const first = elements[0] as HTMLElement;
      const last = elements[elements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleVideoSelect = useCallback((videoId: string) => {
    setPlaylist((current) => current && { ...current, activeVideoId: videoId });
    // Scroll back to top to see the main player
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const modalContent = (
    <AnimatePresence>
      {isOpen && activeProject?.playlistId && (
        <motion.div
          ref={modalRef}
          key="playlist-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="playlist-modal-title"
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
                className="flex items-center gap-4 hover:opacity-70 transition-opacity font-label uppercase tracking-[0.1em] text-[12px] cursor-pointer text-[var(--color-on-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-sm p-1"
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
                    YouTube Playlist
                  </span>
                </div>
                <h1 id="playlist-modal-title" className="font-display text-[3rem] md:text-[6rem] font-bold leading-[0.85] tracking-[-0.02em] uppercase">
                  {activeProject.title}
                </h1>
              </div>

              {/* Main Featured Player */}
              <section className="mb-12 w-full">
                <div className="relative w-full aspect-video bg-black/30 overflow-hidden rounded-sm">
                  <iframe
                    key={activeVideoId} // Force re-render when video changes
                    className="absolute inset-0 w-full h-full"
                    src={activeVideoId
                      ? `https://www.youtube-nocookie.com/embed/${activeVideoId}`
                      : `https://www.youtube-nocookie.com/embed/videoseries?list=${activeProject.playlistId}`
                    }
                    title={`${activeProject.title} player`}
                    allow="encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                  ></iframe>
                </div>
                <a className="mt-4 inline-block underline underline-offset-4" href={`/playlist/${activeProject.slug}`}>
                  View or share this collection
                </a>
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
                          className={`group text-left cursor-pointer transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-sm p-1`}
                        >
                          {/* Thumbnail */}
                          <div className={`relative aspect-video overflow-hidden bg-black/20 mb-4 rounded-sm ${isActive ? 'ring-2 ring-[var(--color-primary)]' : ''}`}>
                            <Image
                              src={video.thumbnail}
                              alt={video.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className={`absolute object-cover transition-all duration-700 ${isActive ? '' : 'grayscale group-hover:grayscale-0'}`}
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
            </main>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof window === 'undefined') return null;
  return createPortal(modalContent, document.body);
}
