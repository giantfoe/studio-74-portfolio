'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Hero } from "@/components/sections/Hero";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { Services } from "@/components/sections/Services";
import { WeddingPackages } from "@/components/sections/WeddingPackages";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis({
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

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

        return () => {
          tl.kill();
          gsap.killTweensOf('.skew-elem');
        };
      });
    }, containerRef);

    return () => {
      mm.revert();
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <main className="w-full bg-[var(--color-surface)] text-[var(--color-on-surface)] transition-colors duration-200">
      
      {/* Persistent Brand Logo */}
      <div className="fixed top-6 left-6 md:top-10 md:left-12 z-50 pointer-events-none">
        <img src="/logo.png" alt="Studio 74" className="h-6 md:h-8 w-auto mix-blend-difference invert opacity-90 select-none" />
      </div>

      <div 
        ref={containerRef} 
        className="min-h-screen md:h-screen w-full relative overflow-hidden"
      >
        {/* Deep Background Parallax Layer */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 z-0 pointer-events-none whitespace-nowrap opacity-[0.03] flex items-center parallax-bg text-[var(--color-on-surface)] hidden md:flex">
            <span className="font-display font-bold text-[30vw] tracking-[0.05em] uppercase leading-none mix-blend-exclusion">
                STUDIO 74 // KINETIC CURATOR // ARCHITECTURE // 2026 // ENGINEERING // STUDIO 74 // KINETIC CURATOR // SYSTEM OF SYSTEMS
            </span>
        </div>

        {/* Horizon Tracking Line */}
        <div className="absolute top-[50vh] left-0 w-full h-[1px] z-0 pointer-events-none hidden md:block border-t border-dashed border-[var(--outline-variant)] opacity-20" />

        <div 
          ref={scrollWrapperRef} 
          className="flex flex-col md:flex-row h-auto md:h-full w-full md:w-max flex-nowrap items-center will-change-transform z-10 relative overflow-hidden md:overflow-visible"
        >
          <Hero />
          
          <PortfolioGrid />
          
          <Services />

          <WeddingPackages onUnlock={() => ScrollTrigger.refresh()} />

          <Footer />
        </div>
      </div>
    </main>
  );
}
