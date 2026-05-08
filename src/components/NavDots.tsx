'use client';

import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

export function NavDots() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            aria-current={isActive ? 'true' : undefined}
            className="flex items-center gap-2 group"
          >
            <span
              className="text-xs font-body font-medium text-[var(--color-text-secondary)] transition-[opacity,transform] duration-200"
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'translateX(0)' : 'translateX(8px)',
              }}
            >
              {label}
            </span>
            <span
              className="block rounded-full transition-all bg-[var(--color-accent)] border border-[var(--color-accent)]"
              style={{
                width: isActive ? '20px' : '6px',
                height: '6px',
                borderRadius: isActive ? '3px' : '50%',
                opacity: isActive ? 1 : 0.35,
                transitionDuration: '300ms',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            />
          </a>
        );
      })}
    </nav>
  );
}
