import { motion } from 'framer-motion';

export function Footer() {
  return (
    <section className="h-[80vh] md:h-screen w-full md:w-screen shrink-0 flex flex-col justify-between px-6 md:px-24 py-12 md:py-24 bg-black text-white relative overflow-hidden border-l border-white/20">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-luminosity grayscale pointer-events-none" />
      
      {/* Top Meta Info */}
      <div className="flex justify-between items-start w-full relative z-10">
        <div className="font-label text-[10px] md:text-[12px] tracking-[0.1em] uppercase opacity-50">
          [ End of Exhibition ]
        </div>
        <div className="text-right flex flex-col gap-2 font-label text-[10px] md:text-[12px] tracking-[0.1em] uppercase opacity-50">
          <span>FREETOWN|GLOBAL</span>
          <span>EST. 2026</span>
        </div>
      </div>

      {/* Massive Typographic Centerpiece */}
      <div className="w-full relative z-10 flex flex-col items-center justify-center my-auto">
        <h1 className="font-display text-[15vw] leading-[0.8] tracking-[-0.03em] font-bold text-center uppercase whitespace-nowrap mb-6 mix-blend-difference opacity-90 skew-elem origin-bottom">
          Stay Tuned
        </h1>
        <p className="font-body text-[1.2rem] md:text-[1.5rem] tracking-wide text-center uppercase max-w-2xl opacity-60 mix-blend-difference mb-16">
          The relentless pursuit of structural beauty. Await the next collection.
        </p>
        
        <a 
          href="mailto:contact@studio74.com"
          className="group relative px-12 py-6 bg-white text-black hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-500 overflow-hidden flex items-center justify-center cursor-pointer"
        >
          <span className="font-label text-[12px] tracking-[0.2em] uppercase relative z-10 font-bold block transition-transform duration-500 group-hover:-translate-y-[60px] whitespace-nowrap">
            Start A Project
          </span>
          <span className="font-label text-[12px] tracking-[0.2em] uppercase absolute inset-0 flex items-center justify-center z-10 font-bold translate-y-[60px] transition-transform duration-500 group-hover:translate-y-0 whitespace-nowrap">
            Click to Inquire
          </span>
        </a>
      </div>

      {/* Bottom Legal / Links */}
      <div className="flex flex-col md:flex-row justify-between items-end w-full relative z-10 pt-12 border-t border-white/20">
        <div className="font-display font-bold text-[2rem] tracking-[-0.02em] uppercase">
          Studio 74®
        </div>
        
        <div className="flex gap-12 font-label text-[10px] md:text-[12px] tracking-[0.1em] uppercase">
          <a href="#" className="hover:text-[var(--color-primary)] transition-colors opacity-80 hover:opacity-100">Instagram</a>
          <a href="#" className="hover:text-[var(--color-primary)] transition-colors opacity-80 hover:opacity-100">X (Twitter)</a>
          <a href="#" className="hover:text-[var(--color-primary)] transition-colors opacity-80 hover:opacity-100">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
