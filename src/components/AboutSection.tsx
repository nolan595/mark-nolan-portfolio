'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/src/lib/useIsomorphicLayoutEffect';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { ShapeAboutDot } from './AbstractShapes';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="About"
      className="relative py-16 md:py-20 xl:py-32 overflow-hidden"
    >
      <div className="absolute top-8 right-8 md:right-12 pointer-events-none select-none">
        <ShapeAboutDot />
      </div>

      <div
        ref={contentRef}
        className="max-w-[1280px] mx-auto px-5 md:px-10 xl:px-20"
        style={prefersReducedMotion ? {} : { opacity: 0 }}
      >
        <div className="md:grid md:grid-cols-12 md:gap-8 xl:gap-10 items-start relative">
          {/* Watermark number */}
          <span
            className="hidden md:block absolute -top-4 right-0 font-display text-[clamp(6rem,14vw,10rem)] leading-none text-[var(--color-surface-2)] select-none pointer-events-none"
            aria-hidden="true"
          >
            01
          </span>

          {/* Bio */}
          <div className="md:col-span-7 lg:col-span-6">
            <span className="block w-8 h-[2px] bg-[var(--color-accent)] opacity-40 mb-5" aria-hidden="true" />
            <h2 className="font-display text-3xl md:text-4xl text-[var(--color-text-primary)] mb-6 leading-[1.25] tracking-[-0.02em]">
              About Me.
            </h2>
            <p className="font-body text-lg text-[var(--color-text-secondary)] leading-[1.625]">
              I&apos;m a CTO and product-focused software developer with a background in computer
              science and scalable backend systems.
            </p>
            <p className="font-body text-lg text-[var(--color-text-secondary)] leading-[1.625] mt-5">
              At Hunch, I lead the technology behind free-to-play products for global sportsbook
              operator Superbet. My work involves architecture, product strategy, development, and
              delivery. Strong focus on building products that feel fast, polished, and intuitive to use.
            </p>

            {/* AWS Certifications */}
            <div className="mt-8">
              <span className="block font-body text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-[0.15em] mb-4">
                AWS Certifications
              </span>
              <div className="flex flex-wrap gap-3">

                {/* Earned — Cloud Practitioner */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)]">
                  <div className="w-8 h-8 rounded-lg bg-[#FF9900] flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M20 4L36 12V28L20 36L4 28V12L20 4Z" fill="white" fillOpacity="0.9"/>
                      <path d="M14 20L18 24L26 16" stroke="#FF9900" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-[var(--color-text-primary)] leading-none mb-0.5">Cloud Practitioner</p>
                    <p className="font-body text-xs text-[var(--color-text-tertiary)]">CLF-C02 · Earned</p>
                  </div>
                </div>

                {/* In progress — Solutions Architect */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface-2)] opacity-60">
                  <div className="w-8 h-8 rounded-lg border-2 border-[#FF9900] border-dashed flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M20 4L36 12V28L20 36L4 28V12L20 4Z" stroke="#FF9900" strokeWidth="2.5" fill="none"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-[var(--color-text-primary)] leading-none mb-0.5">Solutions Architect</p>
                    <p className="font-body text-xs text-[var(--color-text-tertiary)]">SAA-C03 · In progress</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
