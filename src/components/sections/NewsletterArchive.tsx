'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { journalArticles } from '@/data/journal';

export function NewsletterArchive() {
  return (
    <section className="h-auto md:h-screen shrink-0 w-full md:w-auto flex flex-col justify-center px-6 md:px-32 py-24 md:py-0 bg-[var(--color-surface)] border-l border-[var(--outline-variant)]">
      <div className="flex flex-col md:flex-row gap-12 md:gap-32 w-full md:w-max h-full md:items-center">
        
        {/* Intro Block */}
        <div className="w-full md:w-[400px] shrink-0">
          <span className="font-label text-[var(--text-label-md)] tracking-[0.05em] uppercase text-[var(--color-primary)] mb-6 block">
            [ Frames & Truth ]
          </span>
          <h2 className="font-display font-bold uppercase tracking-[-0.02em] text-[3.5rem] md:text-[5rem] leading-[0.9] text-[var(--color-on-surface)]">
            Studio <br /> Journal
          </h2>
          <p className="mt-8 font-body text-[1.1rem] leading-relaxed text-[var(--color-on-surface)] opacity-80 mb-10">
            Where story meets intention. Honest reflections on the craft of visual storytelling — from the field, the edit suite, and everything in between.
          </p>
        </div>

        {/* Letters Grid Map */}
        <div className="flex flex-col md:flex-row gap-6 w-full md:w-max">
          {journalArticles.map((article, i) => (
            <motion.div 
              key={article.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <Link
                href={`/journal/${article.slug}`}
                className="group block w-full md:w-[350px] shrink-0 bg-[var(--color-surface-container-low)] border border-transparent hover:border-[var(--color-primary)] transition-all duration-500 overflow-hidden relative skew-elem origin-bottom px-8 py-10 flex flex-col justify-between h-[350px] md:h-[450px] text-left cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative z-10">
                  <span className="font-label text-[10px] tracking-[0.1em] uppercase text-[var(--color-on-surface)] py-2 border border-[var(--outline-variant)] px-4 mb-8 inline-block backdrop-blur-sm group-hover:border-[var(--color-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-500">
                    {article.volume}
                  </span>
                  <h3 className="font-display font-bold text-[2rem] md:text-[2.5rem] leading-[0.9] tracking-[-0.02em] uppercase mb-6 group-hover:text-[var(--color-primary)] transition-colors duration-500">
                    {article.title}
                  </h3>
                  <p className="font-body text-[1rem] md:text-[1.1rem] opacity-60 leading-relaxed font-light group-hover:opacity-80 transition-opacity duration-500">
                    {article.excerpt}
                  </p>
                </div>

                <div className="relative z-10 font-label text-[10px] tracking-[0.1em] uppercase text-[var(--color-on-surface)] block border-t border-[var(--outline-variant)] pt-6 mt-8 opacity-50 group-hover:opacity-100 transition-opacity">
                  <span className="flex items-center justify-between">
                    <span>Read Issue</span>
                    <span className="text-[14px]">→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
