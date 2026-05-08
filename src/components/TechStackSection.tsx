'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/src/lib/useIsomorphicLayoutEffect';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { groupedStack } from '@/src/data/stack';
import type { StackCategory } from '@/src/types/stack';

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_ORDER: StackCategory[] = [
  'Frameworks & Languages',
  'Styling & Design',
  'Database & ORM',
  'Cloud & Deploy',
];

export function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const groupsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const grouped = groupedStack();

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

      if (groupsRef.current) {
        const groups = groupsRef.current.querySelectorAll('[data-group]');
        groups.forEach((group) => {
          const badges = group.querySelectorAll('[data-badge]');
          badges.forEach((badge, i) => {
            gsap.fromTo(
              badge,
              { x: -12, opacity: 0 },
              {
                x: 0, opacity: 1, duration: 0.4, ease: 'power2.out',
                delay: i * 0.05,
                scrollTrigger: { trigger: group, start: 'top 85%', once: true },
              }
            );
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="stack"
      ref={sectionRef}
      aria-label="Tech Stack"
      className="py-16 md:py-20 xl:py-32 border-t border-[var(--color-border)]"
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 xl:px-20">
        {/* Section heading */}
        <div
          ref={headingRef}
          style={prefersReducedMotion ? {} : { opacity: 0 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-5 h-[2px] bg-[var(--color-accent)]" aria-hidden="true" />
            <span className="font-body text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-[0.15em]">
              Stack
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-[var(--color-text-primary)] leading-[1.25] tracking-[-0.02em] mb-0">
            Built with.
          </h2>
        </div>

        {/* Grouped badges */}
        <div ref={groupsRef} className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 xl:gap-12 mt-12 md:mt-16">
          {CATEGORY_ORDER.map((cat) => {
            const items = grouped[cat];
            if (!items || items.length === 0) return null;
            return (
              <div key={cat} data-group="">
                <span className="block font-body text-xs font-medium text-[var(--color-accent)] uppercase tracking-[0.12em] mb-4">
                  {cat}
                </span>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item.label}
                      data-badge=""
                      className="font-body text-sm font-medium px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:shadow-sm transition-all duration-200 cursor-default"
                      style={prefersReducedMotion ? {} : { opacity: 0 }}
                    >
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-right font-body text-sm text-[var(--color-text-tertiary)] italic">
          and many more...
        </p>
      </div>
    </section>
  );
}
