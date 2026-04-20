'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export interface Letter {
  volume: string;
  title: string;
  excerpt: string;
  content: React.ReactNode;
}

interface NewsletterReaderProps {
  letter: Letter | null;
  onClose: () => void;
}

export function NewsletterReader({ letter, onClose }: NewsletterReaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!letter || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex w-screen h-screen">
      
      {/* Background Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
      />

      {/* Reader Panel (Full Screen) */}
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className="absolute inset-0 w-full h-full bg-[var(--color-surface)] flex flex-col z-10"
      >
        
        {/* Sticky Header */}
        <div className="shrink-0 flex justify-between items-center p-6 md:px-12 md:py-8 border-b border-[var(--outline-variant)] bg-[var(--color-surface)]/80 backdrop-blur-md z-20 sticky top-0">
          <button 
            onClick={onClose}
            className="text-[var(--color-on-surface)] opacity-50 hover:opacity-100 hover:text-[var(--color-primary)] font-label tracking-widest text-[12px] uppercase transition-colors"
          >
            [ Close Reader ]
          </button>
          <div className="font-label text-[10px] tracking-[0.1em] uppercase text-[var(--color-primary)] border border-[var(--color-primary)] px-3 py-1">
            {letter.volume}
          </div>
        </div>

        {/* Scrollable Content */}
        <div data-lenis-prevent="true" className="flex-1 overflow-y-auto px-6 py-12 md:px-16 md:py-20 custom-scrollbar flex justify-center">
          <div className="w-full max-w-4xl">
            <h1 className="font-display font-bold text-[3rem] md:text-[6rem] leading-[0.9] tracking-[-0.02em] uppercase text-[var(--color-on-surface)] mb-8">
              {letter.title}
            </h1>
            
            <div className="w-24 h-[2px] bg-[var(--color-primary)] mb-12" />

            {/* Typography prose block */}
            <div className="font-body text-[1.1rem] md:text-[1.35rem] leading-[1.8] text-[var(--color-on-surface)] opacity-80 font-light flex flex-col gap-8 pb-32 max-w-3xl">
              {letter.content}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
