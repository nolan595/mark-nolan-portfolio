'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { useTextScramble } from '@/src/hooks/useTextScramble';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { useIsomorphicLayoutEffect } from '@/src/lib/useIsomorphicLayoutEffect';
import { ShapeHeroRing, ShapeHeroRect } from './AbstractShapes';

gsap.registerPlugin(ScrollTrigger);

function ScrambleWord({ word, enabled, delay }: { word: string; enabled: boolean; delay: number }) {
  const [started, setStarted] = useState(false);
  const chars = useTextScramble(word, started && enabled);

  useEffect(() => {
    if (!enabled) {
      setStarted(true);
      return;
    }
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [enabled, delay]);

  return (
    <span aria-label={word}>
      {chars.map((ch, i) => (
        <span key={i} aria-hidden="true" className="inline-block">
          {ch}
        </span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const nolanRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLButtonElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const profileFloatRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Page-load entrance stagger
  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion) {
      setEntranceDone(true);
      setTaglineVisible(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (rectRef.current) {
        tl.fromTo(rectRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
          0.15
        );
      }

      if (markRef.current) {
        tl.fromTo(markRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
          0.3
        );
      }

      if (nolanRef.current) {
        tl.fromTo(nolanRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
          0.45
        );
      }

      if (taglineRef.current) {
        tl.fromTo(taglineRef.current,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
            onStart: () => setTaglineVisible(true) },
          0.6
        );
      }

      // Profile image rises up alongside tagline
      if (profileRef.current) {
        tl.fromTo(profileRef.current,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          0.5
        );
      }

      if (ringRef.current) {
        const path = ringRef.current.querySelector('#shape-hero-ring-path') as SVGPathElement | null;
        if (path) {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 0.6 });
          tl.to(path,
            { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out' },
            0.75
          );
        }
      }

      if (scrollCueRef.current) {
        tl.fromTo(scrollCueRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: 'power2.out',
            onComplete: () => setEntranceDone(true) },
          0.9
        );
      }

      // Gentle float loop on profile image
      if (profileFloatRef.current) {
        gsap.to(profileFloatRef.current, {
          y: -12,
          duration: 3.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 1.2,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Parallax on scroll
  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024;
    const multiplier = isMobile ? 0 : isTablet ? 0.5 : 1;

    if (multiplier === 0) return;

    const ctx = gsap.context(() => {
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          y: () => ScrollTrigger.maxScroll(window) * 0.3 * multiplier,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      }

      if (rectRef.current) {
        gsap.to(rectRef.current, {
          y: () => ScrollTrigger.maxScroll(window) * 0.2 * multiplier,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      }

      if (nameRef.current) {
        gsap.to(nameRef.current, {
          y: () => ScrollTrigger.maxScroll(window) * 0.05 * multiplier,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      }

      // Profile parallaxes slightly slower than the text
      if (profileRef.current) {
        gsap.to(profileRef.current, {
          y: () => ScrollTrigger.maxScroll(window) * 0.08 * multiplier,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!entranceDone) return;
    const onScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [entranceDone]);

  function handleScrollCue() {
    const about = document.getElementById('about');
    about?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label="Hero"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
    >
      {/* Decorative shapes — repositioned to frame the two-column layout */}
      <div
        ref={rectRef}
        className="absolute left-[-20px] top-[15%] md:left-[3%] pointer-events-none select-none"
        style={{ opacity: 0 }}
      >
        <ShapeHeroRect />
      </div>

      <div
        ref={ringRef}
        className="absolute right-[8%] bottom-[12%] pointer-events-none select-none"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <ShapeHeroRing />
      </div>

      {/* Extra accent dot — top right */}
      <div
        className="absolute top-[18%] right-[14%] w-3 h-3 rounded-full bg-[var(--color-accent)] opacity-60 pointer-events-none"
        aria-hidden="true"
      />
      {/* Extra accent dot — mid left */}
      <div
        className="absolute top-[65%] left-[8%] w-2 h-2 rounded-full bg-[var(--color-accent)] opacity-40 pointer-events-none"
        aria-hidden="true"
      />
      {/* Thin horizontal rule accent */}
      <div
        className="absolute top-[78%] right-[20%] w-16 h-[1px] bg-[var(--color-accent)] opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      {/* Two-column content */}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-5 md:px-10 xl:px-20 pt-32 pb-24 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-8">

        {/* Left — name + tagline */}
        <div className="flex-1 min-w-0">
          <h1
            ref={nameRef}
            className="font-display text-[clamp(3.75rem,10vw,6rem)] leading-[1.0] tracking-[-0.04em] text-[var(--color-text-primary)] mb-6 lg:mb-8"
          >
            <span
              ref={markRef}
              className="block"
              style={prefersReducedMotion ? {} : { opacity: 0 }}
            >
              <ScrambleWord word="Mark" enabled={!prefersReducedMotion} delay={300} />
            </span>
            <span
              ref={nolanRef}
              className="block"
              style={prefersReducedMotion ? {} : { opacity: 0 }}
            >
              <ScrambleWord word="Nolan" enabled={!prefersReducedMotion} delay={450} />
            </span>
          </h1>

          <p
            ref={taglineRef}
            className="font-body text-lg md:text-xl text-[var(--color-text-secondary)] max-w-[38ch]"
            style={prefersReducedMotion ? {} : { opacity: 0 }}
          >
            CTO at Hunch. CS background, backend roots. Creating fast, worthwhile products end to end.
          </p>
        </div>

        {/* Right — profile image */}
        <div
          ref={profileRef}
          className="hidden lg:flex shrink-0 items-center justify-center"
          style={prefersReducedMotion ? {} : { opacity: 0 }}
          aria-hidden="true"
        >
          <div ref={profileFloatRef} className="relative">
            {/* Decorative ring behind image */}
            <div className="absolute inset-[-16px] rounded-full border border-[var(--color-accent)] opacity-25" />
            <div className="absolute inset-[-32px] rounded-full border border-[var(--color-border)] opacity-40" />

            {/* Profile image — circular crop */}
            <div className="relative w-[260px] h-[260px] xl:w-[300px] xl:h-[300px] rounded-full overflow-hidden bg-[var(--color-surface-2)] ring-1 ring-[var(--color-border)]">
              <Image
                src="/images/profile.png"
                alt="Mark Nolan"
                fill
                className="object-cover object-top"
                priority
                sizes="300px"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        ref={scrollCueRef}
        onClick={handleScrollCue}
        aria-label="Scroll to content"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-4 rounded"
        style={{
          opacity: prefersReducedMotion ? 1 : 0,
          transition: `opacity 400ms ease, color 200ms ease, transform 400ms ease`,
          transform: scrolled ? 'translateX(-50%) translateY(10px)' : 'translateX(-50%) translateY(0)',
          pointerEvents: scrolled ? 'none' : 'auto',
        }}
      >
        <ChevronDown
          size={20}
          className="animate-bounce"
          style={{ animationDuration: '1.5s' }}
        />
      </button>
    </section>
  );
}
