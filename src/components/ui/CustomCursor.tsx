'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');

  // Framer Motion spring coordinates to avoid React re-renders on mousemove
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 500, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if the current screen is desktop (>= 768px)
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    
    // Initial check and setup
    if (!mediaQuery.matches) return;

    const mouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const mouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.cursor-expand')) {
        setCursorVariant('expand');
        setCursorText('');
      } else if (target.closest('.cursor-drag')) {
        setCursorVariant('drag');
        setCursorText('DRAG');
      } else if (target.closest('.cursor-explore')) {
        setCursorVariant('drag');
        setCursorText('OPEN');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', mouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', mouseOver);
    };
  }, [mouseX, mouseY]);

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: 'var(--color-primary)',
      mixBlendMode: 'normal' as const,
      borderRadius: '50%',
      opacity: 1,
    },
    expand: {
      width: 150,
      height: 150,
      backgroundColor: '#ffffff',
      mixBlendMode: 'difference' as const,
      borderRadius: '50%',
      opacity: 1,
    },
    drag: {
      width: 100,
      height: 100,
      backgroundColor: 'var(--color-primary-container)',
      color: 'var(--color-on-primary-container)',
      mixBlendMode: 'normal' as const,
      borderRadius: '0%', // sharp edges for kinetic vibe
      opacity: 0.9,
    }
  };

  return (
    <motion.div
      variants={variants}
      animate={cursorVariant}
      aria-hidden="true"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      className="fixed top-0 left-0 pointer-events-none z-[100] hidden md:flex justify-center items-center text-[10px] font-bold tracking-widest uppercase overflow-hidden"
    >
      {cursorText && (
        <span className="opacity-100">{cursorText}</span>
      )}
    </motion.div>
  );
}
