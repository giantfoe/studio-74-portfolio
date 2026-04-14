'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Preloader() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // 2.5 second duration to hit 74 rapid-fire
    const duration = 2000;
    const intervalTime = duration / 74;
    
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setCounter(current);
      if (current >= 74) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{ delay: 2.8, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      className="fixed inset-0 z-[100] bg-[var(--color-primary)] flex justify-center items-center pointer-events-none"
    >
      <div className="font-display font-bold text-[var(--color-surface)] text-[30vw] md:text-[25vw] leading-none overflow-hidden h-fit px-8">
        <motion.div
           initial={{ y: "110%" }}
           animate={{ y: "0%" }}
           transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        >
          {counter.toString().padStart(2, '0')}
        </motion.div>
      </div>
    </motion.div>
  );
}
