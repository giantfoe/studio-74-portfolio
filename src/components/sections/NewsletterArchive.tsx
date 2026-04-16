'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NewsletterReader, Letter } from '../ui/NewsletterReader';

const letters: Letter[] = [
  {
    volume: "Vol 01",
    title: "Cinematic Pacing",
    excerpt: "Exploring the emotional arch of the edit. Why the spaces between the cuts define the final narrative structure.",
    content: (
      <>
        <p>
          In the editing suite, the most powerful tool is often silence. The spaces we choose to leave unfilled—the quiet breaths, the lingering eye contact, the ambient room tone—these elements build the emotional arch of the scene far more than a rapid-fire sequence ever could.
        </p>
        <h3 className="text-2xl font-display font-bold uppercase mt-8 mb-4">The Rhythm of Emotion</h3>
        <p>
          Cinematic pacing requires an acute understanding of human rhythm. When crafting a wedding film or a high-end documentary, the objective isn't merely to show what happened, but to replicate how it felt. Accelerating the cut builds tension; holding on a seemingly static frame forces empathy.
        </p>
        <p>
          We rely heavily on what we call "negative space" in the timeline. Letting an audio track ring out into nothingness before introducing the next piece of dialogue establishes dominance in the frame. It tells the viewer: pay attention, what comes next matters.
        </p>
        <blockquote className="border-l-4 border-[var(--color-primary)] pl-6 italic opacity-90 my-8">
          "The cut is not a separation of images, but a collision of emotions."
        </blockquote>
        <p>
          Mastering the timeline means mastering the audience's heartbeat. That is the true essence of editorial pacing.
        </p>
      </>
    )
  },
  {
    volume: "Vol 02",
    title: "Architecture of Light",
    excerpt: "How negative fill and high-contrast ratios build prestige cinematic framing in documentary settings.",
    content: (
      <>
        <p>
          A properly framed shot does not start with what you expose to the light, but rather what you plunge into the shadows.
        </p>
        <h3 className="text-2xl font-display font-bold uppercase mt-8 mb-4">Controlling the Uncontrollable</h3>
        <p>
          In run-and-gun documentary environments—particularly complex live events and wedding ceremonies—controlling light seems impossible. However, the architecture of natural light is highly predictable if you know how to leverage negative space. 
        </p>
        <p>
          By introducing negative fill (large black flags or natural environmental occlusions) to the shadow side of the subject's face, we create dimension. Flat lighting communicates information; contrast ratio communicates drama.
        </p>
        <p>
          Our studio specifically employs high-contrast cinematic framing to elevate mundane spaces into theatrical sets. We don’t just record reality; we sculpt it through shadows.
        </p>
      </>
    )
  },
  {
    volume: "Vol 03",
    title: "Unseen Details",
    excerpt: "Capturing the periphery. A look into why off-camera B-roll often holds the most profound emotional weight.",
    content: (
      <>
        <p>
          The main event is almost never where the true story is happening. The bride walking down the aisle is beautiful, but the groom’s father quietly weeping in the second row is where the humanity lies.
        </p>
        <h3 className="text-2xl font-display font-bold uppercase mt-8 mb-4">The Power of the Periphery</h3>
        <p>
          We train our cinematographers to always have one eye off the action. True documentary storytelling demands capturing the unseen details: hands trembling before a speech, wind moving through the venue's architecture, a subtle exchange of glances off-stage.
        </p>
        <p>
          These peripheral B-roll shots provide the thematic glue for our films. When woven together in the edit, they form a visceral, tactile environment that the viewer can almost feel. Focus on the details, and the narrative will reveal itself.
        </p>
      </>
    )
  }
];

export function NewsletterArchive() {
  const [activeLetter, setActiveLetter] = useState<Letter | null>(null);
  return (
    <section className="h-auto md:h-screen shrink-0 w-full md:w-auto flex flex-col justify-center px-6 md:px-32 py-24 md:py-0 bg-[var(--color-surface)] border-l border-[var(--outline-variant)]">
      <div className="flex flex-col md:flex-row gap-12 md:gap-32 w-full md:w-max h-full md:items-center">
        
        {/* Intro Block */}
        <div className="w-full md:w-[400px] shrink-0">
          <span className="font-label text-[var(--text-label-md)] tracking-[0.05em] uppercase text-[var(--color-primary)] mb-6 block">
            [ The Archive ]
          </span>
          <h2 className="font-display font-bold uppercase tracking-[-0.02em] text-[3.5rem] md:text-[5rem] leading-[0.9] text-[var(--color-on-surface)]">
            Curated <br /> Letters
          </h2>
          <p className="mt-8 font-body text-[1.1rem] leading-relaxed text-[var(--color-on-surface)] opacity-80 mb-10">
            Read past issues of our studio journal. We dissect our cinematic methodology, technical approach, and narrative philosophy.
          </p>
        </div>

        {/* Letters Grid Map */}
        <div className="flex flex-col md:flex-row gap-6 w-full md:w-max">
          {letters.map((letter, i) => (
            <motion.button 
              key={i}
              onClick={() => setActiveLetter(letter)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group block w-full md:w-[350px] shrink-0 bg-[var(--color-surface-container-low)] border border-transparent hover:border-[var(--color-primary)] transition-all duration-500 overflow-hidden relative skew-elem origin-bottom px-8 py-10 flex flex-col justify-between h-[350px] md:h-[450px] text-left cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10">
                <span className="font-label text-[10px] tracking-[0.1em] uppercase text-[var(--color-on-surface)] py-2 border border-[var(--outline-variant)] px-4 mb-8 inline-block backdrop-blur-sm group-hover:border-[var(--color-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-500">
                  {letter.volume}
                </span>
                <h3 className="font-display font-bold text-[2rem] md:text-[2.5rem] leading-[0.9] tracking-[-0.02em] uppercase mb-6 group-hover:text-[var(--color-primary)] transition-colors duration-500">
                  {letter.title}
                </h3>
                <p className="font-body text-[1rem] md:text-[1.1rem] opacity-60 leading-relaxed font-light group-hover:opacity-80 transition-opacity duration-500">
                  {letter.excerpt}
                </p>
              </div>

              <div className="relative z-10 font-label text-[10px] tracking-[0.1em] uppercase text-[var(--color-on-surface)] block border-t border-[var(--outline-variant)] pt-6 mt-8 opacity-50 group-hover:opacity-100 transition-opacity">
                <span className="flex items-center justify-between">
                  <span>Read Issue</span>
                  <span className="text-[14px]">→</span>
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeLetter && (
          <NewsletterReader 
            letter={activeLetter} 
            onClose={() => setActiveLetter(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
