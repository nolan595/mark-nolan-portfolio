'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useIsomorphicLayoutEffect } from '@/src/lib/useIsomorphicLayoutEffect';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { siteConfig } from '@/src/config/site';
import { ShapeFooterCross } from './AbstractShapes';

gsap.registerPlugin(ScrollTrigger);

export function ContactFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 80%', once: true },
          }
        );
      }
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 24, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.2,
            scrollTrigger: { trigger: ctaRef.current, start: 'top 85%', once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const buttonVariants = {
    rest: { scale: 1, boxShadow: 'var(--shadow-sm)' },
    hover: { scale: prefersReducedMotion ? 1 : 1.02, boxShadow: 'var(--shadow-md)' },
    tap: { scale: prefersReducedMotion ? 1 : 0.98 },
  };

  return (
    <footer
      id="contact"
      ref={sectionRef}
      aria-label="Contact"
      className="relative py-16 md:py-20 xl:py-32 border-t border-[var(--color-border)] overflow-hidden"
    >
      {/* Decorative cross */}
      <div className="absolute bottom-16 right-16 pointer-events-none select-none opacity-60">
        <ShapeFooterCross />
      </div>

      <div className="max-w-[1280px] mx-auto px-5 md:px-10 xl:px-20 text-center">
        {/* Section label */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="w-5 h-[2px] bg-[var(--color-accent)]" aria-hidden="true" />
          <span className="font-body text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-[0.15em]">
            Contact
          </span>
          <span className="w-5 h-[2px] bg-[var(--color-accent)]" aria-hidden="true" />
        </div>

        {/* Closing headline */}
        <div
          ref={headingRef}
          style={prefersReducedMotion ? {} : { opacity: 0 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-[var(--color-text-primary)] leading-[1.2] tracking-[-0.03em] mb-4 max-w-[16ch] mx-auto">
            Need something{' '}
            <em className="not-italic italic text-[var(--color-accent)]">built?</em>
          </h2>
          <p className="font-body text-base md:text-lg text-[var(--color-text-secondary)] mb-12 md:mb-14 max-w-[40ch] mx-auto">
            Open to freelance projects. Reach out below.
          </p>
        </div>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={prefersReducedMotion ? {} : { opacity: 0 }}
        >
          <motion.a
            href={siteConfig.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2.5 h-12 px-6 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-fg)] font-body text-sm font-semibold focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-4"
            aria-label="Connect on LinkedIn"
          >
            <ExternalLink size={16} />
            LinkedIn
          </motion.a>

          <a
            href={`mailto:${siteConfig.email}?subject=Portfolio%20enquiry`}
            aria-label="Send Mark an email"
            className="group inline-flex items-center gap-1 h-12 px-2 font-body text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-4 rounded"
          >
            <span className="relative">
              {siteConfig.email}
              <span
                className="absolute bottom-0 left-0 h-[1px] bg-[var(--color-accent)] w-0 group-hover:w-full transition-[width] duration-300 ease-out"
                aria-hidden="true"
              />
            </span>
          </a>
        </div>

        {/* Copyright */}
        <p className="font-body text-xs text-[var(--color-text-tertiary)] mt-16 md:mt-20">
          &copy; {new Date().getFullYear()} Mark Nolan
        </p>
      </div>
    </footer>
  );
}
