'use client';

import type React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface Collaborator {
  name: string;
  logo: string;
}

interface CollaboratorShowcaseProps {
  collaborators: Collaborator[];
}

/**
 * Floating logo that follows the cursor.
 * Rendered via portal to document.body so GSAP transforms don't interfere.
 */
function FloatingLogo({
  collaborators,
  hoveredIndex,
  smoothPos,
  isVisible,
}: {
  collaborators: Collaborator[];
  hoveredIndex: number | null;
  smoothPos: { x: number; y: number };
  isVisible: boolean;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="pointer-events-none overflow-hidden rounded-sm shadow-xl"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 99999,
        transform: `translate3d(${smoothPos.x + 24}px, ${smoothPos.y - 80}px, 0)`,
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? '1' : '0.85',
        transition:
          'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform',
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          width: 200,
          height: 140,
          backgroundColor: 'var(--color-surface-container-lowest)',
          border: '1px solid rgba(26, 26, 24, 0.1)',
        }}
      >
        {collaborators.map((collab, index) => (
          <img
            key={collab.name}
            src={collab.logo}
            alt={collab.name}
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              padding: 24,
              opacity: hoveredIndex === index ? 1 : 0,
              transform: hoveredIndex === index ? 'scale(1)' : 'scale(1.15)',
              filter: hoveredIndex === index ? 'none' : 'blur(10px)',
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out, filter 0.5s ease-out',
            }}
          />
        ))}
      </div>
    </div>,
    document.body
  );
}

export function CollaboratorShowcase({ collaborators }: CollaboratorShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  // Smooth animation loop
  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      setSmoothPos((prev) => ({
        x: lerp(prev.x, targetRef.current.x, 0.12),
        y: lerp(prev.y, targetRef.current.y, 0.12),
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    targetRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index);
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    setIsVisible(false);
  }, []);

  // Split into two columns
  const midpoint = Math.ceil(collaborators.length / 2);
  const leftColumn = collaborators.slice(0, midpoint);
  const rightColumn = collaborators.slice(midpoint);

  const renderRow = (collab: Collaborator, globalIndex: number) => (
    <div
      key={collab.name}
      className="group cursor-default"
      onMouseEnter={() => handleMouseEnter(globalIndex)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative py-5 md:py-6 transition-all duration-300 ease-out">
        {/* Hover highlight */}
        <div
          className="absolute inset-0 -mx-3 px-3 rounded-sm transition-all duration-300 ease-out"
          style={{
            backgroundColor:
              hoveredIndex === globalIndex
                ? 'color-mix(in srgb, var(--color-primary-container) 40%, transparent)'
                : 'transparent',
            opacity: hoveredIndex === globalIndex ? 1 : 0,
          }}
        />

        <div className="relative flex items-center">
          <h3
            className="font-display font-bold uppercase tracking-[-0.01em] text-[1.4rem] md:text-[2rem] leading-none transition-all duration-300"
            style={{
              color:
                hoveredIndex === globalIndex
                  ? 'var(--color-primary)'
                  : 'var(--color-on-surface)',
            }}
          >
            <span className="relative">
              {collab.name}
              <span
                className="absolute left-0 -bottom-1 h-[2px] transition-all duration-300 ease-out"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  width: hoveredIndex === globalIndex ? '100%' : '0%',
                }}
              />
            </span>
          </h3>
        </div>
      </div>
      <div
        className="w-full h-[1px]"
        style={{ backgroundColor: 'var(--color-on-surface)', opacity: 0.15 }}
      />
    </div>
  );

  return (
    <>
      {/* Portal-rendered floating logo — lives outside GSAP transforms */}
      <FloatingLogo
        collaborators={collaborators}
        hoveredIndex={hoveredIndex}
        smoothPos={smoothPos}
        isVisible={isVisible}
      />

      {/* Main content */}
      <div
        onMouseMove={handleMouseMove}
        className="relative w-full h-full flex flex-col justify-center px-8 md:px-20"
      >
        {/* Section Label */}
        <span
          className="font-label tracking-[0.05em] uppercase mb-10 block"
          style={{
            fontSize: 'var(--text-label-md)',
            color: 'var(--color-primary)',
          }}
        >
          [ Collaborators ]
        </span>

        {/* Two-Column List with Center Divider */}
        <div className="flex flex-col md:flex-row w-full gap-0">
          {/* Left Column */}
          <div className="flex-1">
            <div
              className="w-full h-[1px]"
              style={{ backgroundColor: 'var(--color-on-surface)', opacity: 0.15 }}
            />
            {leftColumn.map((collab, index) => renderRow(collab, index))}
          </div>

          {/* Center Divider */}
          <div
            className="hidden md:block w-[1px] mx-10 self-stretch"
            style={{ backgroundColor: 'var(--color-on-surface)', opacity: 0.15 }}
          />

          {/* Right Column */}
          <div className="flex-1">
            <div
              className="w-full h-[1px]"
              style={{ backgroundColor: 'var(--color-on-surface)', opacity: 0.15 }}
            />
            {rightColumn.map((collab, index) => renderRow(collab, midpoint + index))}
          </div>
        </div>
      </div>
    </>
  );
}
