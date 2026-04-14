'use client';

import { motion } from 'framer-motion';

const services = [
  {
    title: "Cinematic Production",
    desc: "High-end visual storytelling and commercial film production focusing on aesthetic pacing and bold visuals."
  },
  {
    title: "Brand Architecture",
    desc: "We build uncompromising digital identities, rigorous design systems, and cohesive brand narratives."
  },
  {
    title: "Digital Experiences",
    desc: "Kinetic, tactile, and highly interactive web platforms that defy standard templated approaches."
  }
];

export function Services() {
  return (
    <>
      <section className="h-auto md:h-screen shrink-0 w-full md:w-[80vw] flex flex-col justify-center px-6 md:px-32 py-24 md:py-0 bg-[var(--color-surface-container-high)] border-l border-[var(--outline-variant)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 w-full">
          <div>
            <span className="font-label text-[var(--text-label-md)] tracking-[0.05em] uppercase text-[var(--color-primary)] mb-6 block">
              [ Expertise ]
            </span>
            <h2 className="font-display font-bold uppercase tracking-[-0.02em] text-[3.5rem] md:text-[5rem] leading-[0.9] text-[var(--color-on-surface)]">
              Disruptive <br /> Systems
            </h2>
            <p className="mt-8 font-body text-[1.1rem] leading-relaxed max-w-sm text-[var(--color-on-surface)] opacity-80">
              We don't just build websites. We architect structural digital experiences that break conventional patterns and demand attention.
            </p>
          </div>
          <div className="mt-12">
            <a href="#" className="inline-block font-label tracking-[0.05em] uppercase text-[var(--text-label-md)] bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] px-8 py-4 hover:-translate-y-[2px] transition-transform duration-300">
              [ LET'S TALK ]
            </a>
          </div>
        </div>
      </section>

      {/* Services tiles horizontally scrolling */}
      {services.map((svc, i) => (
        <section key={i} className="h-screen shrink-0 flex items-center pr-12 md:pr-24">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`w-[80vw] md:w-[35vw] bg-[var(--color-surface-container-low)] p-10 md:p-16 hover:-translate-y-2 hover:bg-[var(--color-surface-container-high)] transition-all duration-500 border-none group skew-elem origin-bottom ${i % 2 !== 0 ? 'mt-[-20vh]' : 'mt-[20vh]'}`}
          >
            <div className="font-label text-[10px] tracking-[0.05em] uppercase text-[var(--color-on-surface)] opacity-40 mb-6 font-bold">
              0{i + 1}
            </div>
            <h3 className="font-display font-bold text-[2rem] md:text-[3rem] uppercase tracking-[-0.02em] text-[var(--color-primary)] mb-4">
              {svc.title}
            </h3>
            <p className="font-body text-base md:text-lg text-[var(--color-on-surface)] opacity-70">
              {svc.desc}
            </p>
          </motion.div>
        </section>
      ))}
    </>
  );
}
