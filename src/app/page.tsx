'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Hero } from "@/components/sections/Hero";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { Services } from "@/components/sections/Services";
import { WeddingPackages } from "@/components/sections/WeddingPackages";
import { NewsletterArchive } from "@/components/sections/NewsletterArchive";
import { Footer } from "@/components/sections/Footer";
import { PlaylistModal } from "@/components/ui/PlaylistModal";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const [activePlaylist, setActivePlaylist] = useState<number | null>(null);

  const handleOpenPlaylist = useCallback((id: number) => {
    setActivePlaylist(id);
    // Pause Lenis so background doesn't scroll
    lenisRef.current?.stop();
  }, []);

  const handleClosePlaylist = useCallback(() => {
    setActivePlaylist(null);
    // Resume Lenis
    lenisRef.current?.start();
  }, []);

  const handleScrollToTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let lenis: Lenis | null = null;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    // Only hijack scroll natively on Desktop. Mobile needs pure native physics for keyboard/inputs.
    if (!isMobile) {
      lenis = new Lenis({
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis?.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      // Store ref so modal can pause/resume it
      lenisRef.current = lenis;
    }

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const scrollWrapper = scrollWrapperRef.current;
      if (!scrollWrapper) return;

      // Mobile: Vertical flow (do nothing to wrapper, clear any pinned x transforms)
      mm.add("(max-width: 767px)", () => {
        gsap.set(scrollWrapper, { clearProps: "all" });
        return () => {};
      });

      // Desktop: Horizontal Scroll
      mm.add("(min-width: 768px)", () => {
        const getScrollWidth = () => Math.max(scrollWrapper.scrollWidth - window.innerWidth, 0);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${getScrollWidth()}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const velocity = self.getVelocity();
              let skewAmount = velocity / 350; 
              skewAmount = Math.max(Math.min(skewAmount, 10), -10);
              
              gsap.to('.skew-elem', {
                skewX: -skewAmount,
                ease: 'power3.out',
                duration: 0.6,
                overwrite: 'auto'
              });
            }
          }
        });

        tl.to(scrollWrapper, {
          x: () => -getScrollWidth(),
          ease: 'none',
        }, 0);

        // Deep Background Parallax Layer
        tl.to('.parallax-bg', {
          x: () => -getScrollWidth() * 0.6,
          ease: 'none',
        }, 0);

        // Grid Component Inner Parallax Backgrounds
        tl.to('.portfolio-img', {
          xPercent: 15,
          ease: 'none',
        }, 0);

        return () => {
          tl.kill();
          gsap.killTweensOf('.skew-elem');
        };
      });
    }, containerRef);

    return () => {
      mm.revert();
      ctx.revert();
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <main className="w-full bg-[var(--color-surface)] text-[var(--color-on-surface)] transition-colors duration-200">
      
      {/* Persistent Brand Logo */}
      <button 
        onClick={handleScrollToTop}
        className="fixed top-6 left-6 md:top-10 md:left-12 z-50 cursor-pointer hover:opacity-70 transition-opacity"
      >
        <img src="/logo.png" alt="Studio 74" className="h-8 md:h-16 w-auto select-none" />
      </button>

      <div 
        ref={containerRef} 
        className="min-h-screen md:h-screen w-full relative overflow-x-clip md:overflow-hidden"
      >
        {/* Deep Background Parallax Layer */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 z-0 pointer-events-none whitespace-nowrap opacity-[0.03] flex items-center parallax-bg text-[var(--color-on-surface)] hidden md:flex">
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
          className="flex flex-col md:flex-row h-auto md:h-full w-full md:w-max flex-nowrap items-center md:will-change-transform z-10 relative overflow-visible"
        >
          <Hero />
          
          <PortfolioGrid onOpenPlaylist={handleOpenPlaylist} />
          
          <Services />

          <WeddingPackages onUnlock={() => ScrollTrigger.refresh()} />

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
