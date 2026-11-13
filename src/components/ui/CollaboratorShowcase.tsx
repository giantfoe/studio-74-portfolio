'use client';

import { motion, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useState, type PointerEvent } from 'react';
import { createPortal } from 'react-dom';

interface Collaborator {
  name: string;
  logo: string;
}

interface CollaboratorShowcaseProps {
  collaborators: Collaborator[];
}

export function CollaboratorShowcase({ collaborators }: CollaboratorShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const x = useSpring(0, { stiffness: 150, damping: 25 });
  const y = useSpring(0, { stiffness: 150, damping: 25 });
  const activeCollaborator = hoveredIndex === null ? null : collaborators[hoveredIndex];

  function handlePointerEnter(event: PointerEvent, index: number) {
    if (event.pointerType !== 'mouse') return;

    x.jump(event.clientX + 24);
    y.jump(event.clientY - 80);
    setHoveredIndex(index);
  }

  function handlePointerMove(event: PointerEvent) {
    if (hoveredIndex === null || event.pointerType !== 'mouse') return;

    x.set(event.clientX + 24);
    y.set(event.clientY - 80);
  }

  // Split into two columns
  const midpoint = Math.ceil(collaborators.length / 2);
  const leftColumn = collaborators.slice(0, midpoint);
  const rightColumn = collaborators.slice(midpoint);

  const renderRow = (collab: Collaborator, globalIndex: number) => (
    <div
      key={collab.name}
      role="listitem"
      className="group cursor-default"
      onPointerEnter={(event) => handlePointerEnter(event, globalIndex)}
      onPointerLeave={() => setHoveredIndex(null)}
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
      {activeCollaborator && createPortal(
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed top-0 left-0 z-[99999] overflow-hidden rounded-sm shadow-xl"
          style={{ x, y }}
        >
          <div className="relative h-[140px] w-[200px] border border-black/10 bg-[var(--color-surface-container-lowest)]">
            <div className="absolute inset-6">
              <Image
                src={activeCollaborator.logo}
                alt=""
                fill
                sizes="152px"
                loading="eager"
                className="object-contain"
              />
            </div>
          </div>
        </motion.div>,
        document.body
      )}

      <div
        onPointerMove={handlePointerMove}
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
          [ Clients ]
        </span>

        {/* Two-Column List with Center Divider */}
        <div className="flex flex-col md:flex-row w-full gap-0">
          {/* Left Column */}
          <div className="flex-1" role="list" aria-label="Collaborators column 1">
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
          <div className="flex-1" role="list" aria-label="Collaborators column 2">
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
