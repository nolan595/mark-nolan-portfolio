'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';

// Hero ring — partial circle arc (270deg)
export function ShapeHeroRing({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const tl = gsap.timeline({ delay: 0, repeat: -1, yoyo: true });
    tl.to(ref.current, {
      x: 18,
      y: -12,
      duration: 11,
      ease: 'power1.inOut',
    });

    return () => { tl.kill(); };
  }, [prefersReducedMotion]);

  return (
    <svg
      ref={ref}
      width="480"
      height="480"
      viewBox="0 0 480 480"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* 270deg arc — gap at bottom-right */}
      <path
        d="M 240 40 A 200 200 0 1 1 440 240"
        stroke="var(--color-shape-a)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
        id="shape-hero-ring-path"
      />
    </svg>
  );
}

// Hero rect — rotated rectangle
export function ShapeHeroRect({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const tl = gsap.timeline({ delay: 3, repeat: -1, yoyo: true });
    tl.to(ref.current, {
      x: -10,
      rotation: 18,
      duration: 8,
      ease: 'power1.inOut',
      transformOrigin: '50% 50%',
    });

    return () => { tl.kill(); };
  }, [prefersReducedMotion]);

  return (
    <svg
      ref={ref}
      width="120"
      height="300"
      viewBox="0 0 120 300"
      fill="none"
      className={className}
      aria-hidden="true"
      style={{ transform: 'rotate(15deg)' }}
    >
      <rect
        x="10"
        y="10"
        width="100"
        height="280"
        rx="4"
        fill="var(--color-shape-b)"
        opacity="0.45"
      />
    </svg>
  );
}

// About dot — solid circle
export function ShapeAboutDot({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const tl = gsap.timeline({ delay: 7, repeat: -1, yoyo: true });
    tl.to(ref.current, {
      x: 8,
      y: 10,
      duration: 14,
      ease: 'power1.inOut',
    });

    return () => { tl.kill(); };
  }, [prefersReducedMotion]);

  return (
    <svg
      ref={ref}
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="30" fill="var(--color-shape-a)" opacity="0.25" />
    </svg>
  );
}

// Footer cross — plus/cross
export function ShapeFooterCross({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const tl = gsap.timeline({ delay: 1.5, repeat: -1 });
    tl.to(ref.current, {
      rotation: 360,
      duration: 20,
      ease: 'none',
      transformOrigin: '50% 50%',
    });

    return () => { tl.kill(); };
  }, [prefersReducedMotion]);

  return (
    <svg
      ref={ref}
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <line x1="40" y1="8" x2="40" y2="72" stroke="var(--color-shape-b)" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="40" x2="72" y2="40" stroke="var(--color-shape-b)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
