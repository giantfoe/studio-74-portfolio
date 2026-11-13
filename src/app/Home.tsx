'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type Lenis from 'lenis';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Hero } from "@/components/sections/Hero";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { Services } from "@/components/sections/Services";

const WeddingPackages = dynamic(() => import("@/components/sections/WeddingPackages").then((mod) => mod.WeddingPackages));
const NewsletterArchive = dynamic(() => import("@/components/sections/NewsletterArchive").then((mod) => mod.NewsletterArchive));
const Footer = dynamic(() => import("@/components/sections/Footer").then((mod) => mod.Footer));
const PlaylistModal = dynamic(() => import("@/components/ui/PlaylistModal").then((mod) => mod.PlaylistModal), { ssr: false });

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const refreshRef = useRef<(() => void) | null>(null);

  const [activePlaylist, setActivePlaylist] = useState<number | null>(null);

  const handleOpenPlaylist = useCallback((id: number) => {
    setActivePlaylist(id);
    // Pause Lenis so background doesn't scroll
    lenisRef.current?.stop();
  }, []);

  const handleClosePlaylist = useCallback(() => {
    const triggerId = activePlaylist !== null ? `project-trigger-${activePlaylist}` : null;
    setActivePlaylist(null);
    // Resume Lenis
    lenisRef.current?.start();
    if (triggerId) {
      setTimeout(() => {
        const trigger = document.getElementById(triggerId);
        trigger?.focus();
      }, 50);
    }
  }, [activePlaylist]);

  const handleScrollToTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  const refreshScroll = useCallback(() => {
    refreshRef.current?.();
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
    let cleanup: (() => void) | undefined;
    let version = 0;

    async function syncScroll() {
      const currentVersion = ++version;
      cleanup?.();
      cleanup = undefined;
      if (!media.matches) return;

      const [{ default: gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('lenis'),
      ]);
      const container = containerRef.current;
      const scrollWrapper = scrollWrapperRef.current;
      if (currentVersion !== version || !container || !scrollWrapper) return;

      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ smoothWheel: true });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      lenisRef.current = lenis;

      container.setAttribute('data-horizontal', '');
      const context = gsap.context(() => {
        const getScrollWidth = () => Math.max(scrollWrapper.scrollWidth - window.innerWidth, 0);
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${getScrollWidth()}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const skew = Math.max(-10, Math.min(self.getVelocity() / 350, 10));
              gsap.to('.skew-elem', {
                skewX: -skew,
                ease: 'power3.out',
                duration: 0.6,
                overwrite: 'auto',
              });
            },
          },
        });
        timeline.to(scrollWrapper, { x: () => -getScrollWidth(), ease: 'none' }, 0);
        timeline.to('.parallax-bg', { x: () => -getScrollWidth() * 0.6, ease: 'none' }, 0);
        timeline.to('.portfolio-img', { xPercent: 15, ease: 'none' }, 0);
      }, container);
      refreshRef.current = () => ScrollTrigger.refresh();

      cleanup = () => {
        gsap.ticker.remove(tick);
        context.revert();
        lenis.destroy();
        lenisRef.current = null;
        refreshRef.current = null;
        container.removeAttribute('data-horizontal');
      };
      ScrollTrigger.refresh();
    }

    const update = () => { void syncScroll().catch(console.error); };
    update();
    media.addEventListener('change', update);
    return () => {
      version++;
      media.removeEventListener('change', update);
      cleanup?.();
    };
  }, []);

  return (
    <main className="w-full bg-[var(--color-surface)] text-[var(--color-on-surface)] transition-colors duration-200">

      {/* Persistent Brand Logo */}
      <button
        onClick={handleScrollToTop}
        aria-label="Studio 74 - scroll to top"
        className="fixed top-6 left-6 md:top-10 md:left-12 z-50 cursor-pointer hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-sm"
      >
        <Image src="/studio74-logo.webp" alt="" width={192} height={192} unoptimized loading="eager" className="h-8 md:h-16 w-auto select-none" />
      </button>

      <div
        ref={containerRef}
        className="studio-home min-h-screen w-full relative overflow-x-clip"
      >
        {/* Deep Background Parallax Layer */}
        <div aria-hidden="true" className="absolute top-1/2 left-0 -translate-y-1/2 z-0 pointer-events-none whitespace-nowrap opacity-[0.03] flex items-center parallax-bg text-[var(--color-on-surface)] hidden md:flex">
            <span className="font-display font-bold text-[30vw] tracking-[0.05em] uppercase leading-none mix-blend-exclusion">
                STUDIO 74 // CINEMATIC VISIONS // MOTION PICTURE // 2026 // VISUAL STORYTELLING // STUDIO 74 // KINETIC CURATOR // WEDDING FILMS
            </span>
        </div>

        {/* Horizon Tracking Line */}
        <div className="absolute top-[50vh] left-0 w-full h-[1px] z-0 pointer-events-none hidden md:block border-t border-dashed border-[var(--outline-variant)] opacity-20" />

        {/* Ambient Gradient Mesh */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 overflow-hidden mix-blend-multiply hidden md:block">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-primary-container)] blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] rounded-full bg-[var(--color-primary-container)] blur-[150px]" />
        </div>

        <div
          ref={scrollWrapperRef}
          className="studio-scroll flex flex-col h-auto w-full flex-nowrap items-center z-10 relative overflow-visible"
        >
          <Hero />

          <PortfolioGrid onOpenPlaylist={handleOpenPlaylist} />

          <Services />

          <WeddingPackages onUnlock={refreshScroll} />

          <NewsletterArchive />

          <Footer />
        </div>
      </div>

      {/* Playlist Modal — rendered OUTSIDE the GSAP container so fixed positioning works */}
      <PlaylistModal
        isOpen={activePlaylist !== null}
        playlistId={activePlaylist}
        onClose={handleClosePlaylist}
      />
    </main>
  );
}
