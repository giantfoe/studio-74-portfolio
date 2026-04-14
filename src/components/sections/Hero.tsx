'use client';

import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="h-screen w-full md:w-screen shrink-0 flex flex-col justify-center px-6 md:px-24 relative overflow-hidden bg-[var(--color-surface)]">
      {/* Abstract Structural Background Graphic */}
      <div className="absolute inset-0 z-0 flex items-center justify-center mix-blend-difference opacity-50 pointer-events-none">
        <motion.span 
          initial={{ opacity: 0, scale: 0.8, x: 200 }}
          animate={{ opacity: 0.5, scale: 1, x: 0 }}
          transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1], delay: 2.8 }}
          className="font-display font-bold text-[var(--color-surface-container-low)] text-[60vw] md:text-[20vw] leading-none select-none"
        >
          74
        </motion.span>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col mt-[10vh]">
        <motion.h1 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 3.2 } }
          }}
          className="font-display font-bold uppercase tracking-[-0.02em] leading-[0.8] mb-0 mix-blend-difference"
        >
          <span className="block text-[15vw] md:text-[10vw] lg:text-[9rem] text-[var(--color-on-surface)] overflow-hidden py-2 whitespace-nowrap">
            {"STUDIO".split("").map((char, index) => (
              <motion.span 
                key={`s1-${index}`} 
                variants={{
                  hidden: { y: "115%", scaleY: 1.5, rotateZ: 5, opacity: 0, filter: "blur(10px)" },
                  visible: { y: "0%", scaleY: 1, rotateZ: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 1.4, ease: [0.19, 1, 0.22, 1] } }
                }}
                className="inline-block whitespace-pre"
              >
                {char}
              </motion.span>
            ))}
          </span>
          <span className="block text-[15vw] md:text-[10vw] lg:text-[9rem] text-[var(--color-primary)] ml-[5%] md:ml-[10%] overflow-hidden py-2 whitespace-nowrap">
            {"SEVENTY".split("").map((char, index) => (
              <motion.span 
                key={`s2-${index}`} 
                variants={{
                  hidden: { y: "115%", scaleY: 1.5, rotateZ: 5, opacity: 0, filter: "blur(10px)" },
                  visible: { y: "0%", scaleY: 1, rotateZ: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 1.4, ease: [0.19, 1, 0.22, 1] } }
                }}
                className="inline-block whitespace-pre"
              >
                {char}
              </motion.span>
            ))}
          </span>
          <span className="block text-[15vw] md:text-[10vw] lg:text-[9rem] text-[var(--color-primary)] ml-[10%] md:ml-[20%] overflow-hidden py-2 whitespace-nowrap">
            {"FOUR".split("").map((char, index) => (
              <motion.span 
                key={`s3-${index}`} 
                variants={{
                  hidden: { y: "115%", scaleY: 1.5, rotateZ: 5, opacity: 0, filter: "blur(10px)" },
                  visible: { y: "0%", scaleY: 1, rotateZ: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 1.4, ease: [0.19, 1, 0.22, 1] } }
                }}
                className="inline-block whitespace-pre"
              >
                {char}
              </motion.span>
            ))}
          </span>
        </motion.h1>
        
        {/* Kinetic Overlay Description Box */}
        <motion.div 
          initial={{ opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
          animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
          transition={{ delay: 4.5, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="mt-[2rem] md:mt-[4rem] ml-0 md:ml-auto w-[90%] md:w-[50%] lg:w-[40%] relative z-20"
        >
          <div className="kinetic-overlay p-8 md:p-12 border-none">
            <p className="font-body font-bold text-[var(--text-title-lg)] md:text-[1.5rem] leading-snug text-[var(--color-on-surface)] mix-blend-exclusion text-white">
              Architecting uncompromising aesthetic systems. Cinematic precision engineered through kinetic digital architecture.
            </p>
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator - micro typography strictly aligned */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.8, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-12 lg:left-24 flex flex-col gap-2 z-20 font-label tracking-[0.05em] uppercase text-[var(--text-label-md)] text-[var(--color-on-surface)]"
      >
        <span className="opacity-50">[ SCROLL TO EXPLORE ]</span>
        <span className="w-[1px] h-12 bg-[var(--color-on-surface)] opacity-30 mt-2 block" />
      </motion.div>
    </section>
  );
}
