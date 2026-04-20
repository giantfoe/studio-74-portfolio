'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
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
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      width: 12,
      height: 12,
      backgroundColor: 'var(--color-primary)',
      mixBlendMode: 'normal' as any,
      borderRadius: '50%',
      opacity: 1,
    },
    expand: {
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      width: 150,
      height: 150,
      backgroundColor: '#ffffff',
      mixBlendMode: 'difference' as any,
      borderRadius: '50%',
      opacity: 1,
    },
    drag: {
      x: mousePosition.x - 50,
      y: mousePosition.y - 50,
      width: 100,
      height: 100,
      backgroundColor: 'var(--color-primary-container)',
      color: 'var(--color-on-primary-container)',
      mixBlendMode: 'normal' as any,
      borderRadius: '0%', // sharp edges for kinetic vibe
      opacity: 0.9,
    }
  };

  return (
    <motion.div
      variants={variants}
      animate={cursorVariant}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      className="fixed top-0 left-0 pointer-events-none z-[100] hidden md:flex justify-center items-center text-[10px] font-bold tracking-widest uppercase overflow-hidden"
    >
      {cursorText && (
        <span className="opacity-100">{cursorText}</span>
      )}
    </motion.div>
  );
}
