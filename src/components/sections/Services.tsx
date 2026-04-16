'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookingModal } from '../ui/BookingModal';

const services = [
  {
    title: "Films",
    desc: "Shorts and feature-length productions engineered with compelling narrative structures and rigorous cinematic technique."
  },
  {
    title: "Documentaries",
    desc: "Raw, prestige storytelling that captures reality through a bold, observational, and high-end editorial lens."
  },
  {
    title: "Wedding Cinema",
    desc: "Timeless, high-end documentary filmmaking that transforms your wedding day into a stunning cinematic masterpiece."
  },
  {
    title: "Technical Consultancy",
    desc: "High-level advisory and architectural planning for complex audio-visual setups and studio broadcast environments."
  },
  {
    title: "Live Events",
    desc: "Dynamic, scalable coverage packages designed to meticulously document corporate and high-profile social gatherings."
  },
  {
    title: "Live Recordings",
    desc: "Professional multi-cam setups engineered for concerts, live performances, and studio sessions with uncompromising fidelity."
  },
  {
    title: "Original Podcasts",
    desc: "Serial audio and visual content production crafted to elevate brand authority through engaging, high-retention formats."
  }
];

export function Services() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <section className="h-auto md:h-screen shrink-0 w-full md:w-[80vw] flex flex-col justify-center px-6 md:px-32 py-24 md:py-0 bg-[var(--color-surface-container-high)] border-l border-[var(--outline-variant)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 w-full">
          <div>
            <span className="font-label text-[var(--text-label-md)] tracking-[0.05em] uppercase text-[var(--color-primary)] mb-6 block">
              [ Expertise ]
            </span>
            <h2 className="font-display font-bold uppercase tracking-[-0.02em] text-[3.5rem] md:text-[5rem] leading-[0.9] text-[var(--color-on-surface)]">
              Visual <br /> Narratives
            </h2>
            <p className="mt-8 font-body text-[1.1rem] leading-relaxed max-w-sm text-[var(--color-on-surface)] opacity-80">
              We don't just record events. We document human emotion through high-end cinematic production and editorial storytelling.
            </p>
          </div>
          <div className="mt-12 md:mt-0 flex flex-col md:justify-end md:items-end">
            <div className="max-w-sm md:text-right">
               <span className="font-label text-[var(--text-label-md)] tracking-[0.05em] uppercase text-[var(--color-on-surface)] opacity-50 mb-4 block">
                [ Studio Access ]
              </span>
              <p className="font-body text-[1rem] leading-relaxed text-[var(--color-on-surface)] opacity-80 mb-6">
                Secure your production dates or schedule an initial narrative consultation with our creative directors.
              </p>
              <button 
                onClick={(e) => { e.preventDefault(); setIsBookingOpen(true); }}
                className="inline-block font-label tracking-[0.1em] font-bold uppercase text-[12px] bg-black text-white px-10 py-5 hover:bg-[var(--color-primary)] transition-colors duration-500"
              >
                Book The Studio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services tiles vertically scrolling on mobile, horizontally on md */}
      {services.map((svc, i) => (
        <section key={i} className="h-auto md:h-screen shrink-0 flex items-center pr-0 md:pr-24 relative z-10 hover:z-20 px-6 md:px-0 py-8 md:py-0 w-full md:w-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className={`w-full md:w-[35vw] bg-transparent md:bg-[var(--color-surface-container-low)] p-6 md:p-16 transition-all duration-500 group md:skew-elem origin-bottom border-none ${i % 2 !== 0 ? 'md:-mt-[20vh] mt-0' : 'md:mt-[20vh] mt-0'}`}
          >
            <div className="font-label text-[10px] tracking-[0.05em] uppercase text-[var(--color-on-surface)] opacity-40 mb-6 font-bold flex items-center gap-4">
              <span>0{i + 1}</span>
              <span className="w-12 h-[1px] bg-[var(--color-on-surface)] opacity-20 block md:hidden" />
            </div>
            <h3 className="font-display font-bold text-[10vw] sm:text-[2.2rem] md:text-[3rem] uppercase tracking-[-0.02em] text-[var(--color-primary)] mb-6 leading-[0.9] break-keep">
              {svc.title}
            </h3>
            <p className="font-body text-[1.125rem] md:text-lg text-[var(--color-on-surface)] opacity-70 leading-relaxed max-w-sm">
              {svc.desc}
            </p>
          </motion.div>
        </section>
      ))}

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </>
  );
}
