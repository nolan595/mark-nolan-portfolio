'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '@/src/types/project';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Alternate layout: odd index → image left, even → image right
  const imageRight = index % 2 !== 0;

  const imageVariants = {
    default: { scale: 1 },
    hovered: { scale: prefersReducedMotion ? 1 : 1.04 },
  };

  return (
    <motion.div
      ref={cardRef}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={hovered ? 'hovered' : 'default'}
      className="relative group"
    >
      <div
        className={`flex flex-col xl:flex-row ${imageRight ? 'xl:flex-row-reverse' : ''} gap-8 xl:gap-12 items-start xl:items-center`}
      >
        {/* Image */}
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title} live site`}
          data-cursor-image=""
          className="relative block w-full xl:w-[55%] shrink-0 rounded-xl overflow-hidden focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-4"
          style={{
            boxShadow: hovered
              ? 'var(--shadow-lg)'
              : 'var(--shadow-md)',
            transition: 'box-shadow 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {/* Accent sweep border — grows upward from the bottom edge */}
          <span
            className="absolute left-0 bottom-0 w-[2px] bg-[var(--color-accent)] z-10 pointer-events-none"
            style={{
              height: hovered && !prefersReducedMotion ? '100%' : '0%',
              transition: 'height 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            aria-hidden="true"
          />

          <div className="aspect-[16/10] relative overflow-hidden bg-[var(--color-surface-2)]">
            <motion.div
              variants={imageVariants}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full h-full"
            >
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                className="object-cover object-left-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 700px"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </motion.div>
          </div>
        </a>

        {/* Content */}
        <div className="flex flex-col gap-4 xl:gap-5 xl:flex-1">
          <div className="flex items-center justify-between">
            <span
              className="font-body text-xs font-semibold text-[var(--color-accent)] tracking-[0.05em] transition-all duration-300"
              style={{
                fontSize: hovered && !prefersReducedMotion ? '0.875rem' : '0.75rem',
              }}
            >
              {project.index}
            </span>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} — opens in new tab`}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-4"
            >
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div>
            <h3 className="font-body text-xl font-semibold text-[var(--color-text-primary)] mb-2 leading-[1.3] tracking-[-0.01em]">
              {project.title}
            </h3>
            <p className="font-body text-base text-[var(--color-text-secondary)] leading-[1.625]">
              {project.tagline}
            </p>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="font-body text-xs font-medium px-3 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] bg-transparent"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
