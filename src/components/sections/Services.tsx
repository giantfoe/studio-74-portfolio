'use client';

import { useState } from 'react';
import { CollaboratorShowcase } from '../ui/CollaboratorShowcase';
import { BookingModal } from '../ui/BookingModal';

const partners = [
  { name: "Al Jazeera", logo: "/aljazeera.jpg" },
  { name: "DW", logo: "/DW.jpg" },
  { name: "World Bank Group", logo: "/worldbank.jpg" },
  { name: "United Bank for Africa", logo: "/UBA.jpg" },
  { name: "UNICEF", logo: "/uniceflogo.png" },
  { name: "UNOPS", logo: "/UNOPS.jpg" },
  { name: "Guinness", logo: "/guinness.jpg" },
  { name: "BBC Media Action", logo: "/bbc-media-action.jpg" },
];

export function Services() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <section className="h-auto md:h-screen shrink-0 w-full md:w-[80vw] flex flex-col justify-center px-6 md:px-32 py-24 md:py-0 bg-[var(--color-surface-container-high)] border-l border-[var(--outline-variant)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 w-full">
          <div>
            <span className="font-label text-[var(--text-label-md)] tracking-[0.05em] uppercase text-[var(--color-primary)] mb-6 block">
              [ Work with Us ]
            </span>
            <h2 className="font-display font-bold uppercase tracking-[-0.02em] text-[3.5rem] md:text-[5rem] leading-[0.9] text-[var(--color-on-surface)]">
              Book our <br /> studio space
            </h2>
            <p className="mt-8 font-body text-[1.1rem] leading-relaxed max-w-sm text-[var(--color-on-surface)] opacity-80">
              We partner with visionary brands, agencies, and global networks to produce uncompromising cinematic narratives.
            </p>
          </div>
          <div className="mt-12 md:mt-0 flex flex-col md:justify-end md:items-end">
            <div className="max-w-sm md:text-right">
               <span className="font-label text-[var(--text-label-md)] tracking-[0.05em] uppercase text-[var(--color-on-surface)] opacity-50 mb-4 block">
                [ Studio Access ]
              </span>
              <p className="font-body text-[1rem] leading-relaxed text-[var(--color-on-surface)] opacity-80 mb-6">
                Join our roster of premium partners. Secure your production dates or schedule an initial consultation.
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

      {/* Collaborator Showcase — Two-column list with hover logo preview */}
      <section className="h-auto md:h-screen shrink-0 w-full md:w-[70vw] relative bg-[var(--color-surface-container-high)] border-l border-[var(--outline-variant)]">
        <CollaboratorShowcase collaborators={partners} />
      </section>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </>
  );
}
