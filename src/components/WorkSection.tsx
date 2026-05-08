'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/src/lib/useIsomorphicLayoutEffect';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { ProjectCard } from './ProjectCard';
import { featuredProjects } from '@/src/data/projects';

gsap.registerPlugin(ScrollTrigger);

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 80%', once: true },
          }
        );
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('[data-card]');
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
              delay: i * 0.15,
              scrollTrigger: { trigger: card, start: 'top 80%', once: true },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="work"
      ref={sectionRef}
      aria-label="Selected Work"
      className="py-16 md:py-20 xl:py-32 border-t border-[var(--color-border)]"
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 xl:px-20">
        {/* Section header */}
        <div
          ref={headingRef}
          className="flex items-end justify-between mb-12 md:mb-16 xl:mb-20"
          style={prefersReducedMotion ? {} : { opacity: 0 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-5 h-[2px] bg-[var(--color-accent)]" aria-hidden="true" />
              <span className="font-body text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-[0.15em]">
                Selected Work
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--color-text-primary)] leading-[1.25] tracking-[-0.02em]">
              Things I&apos;ve built.
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="flex flex-col gap-16 md:gap-20 xl:gap-24">
          {featuredProjects.map((project, i) => (
            <div key={project.slug} data-card="">
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
