'use client';

import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { siteConfig } from '@/src/config/site';

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md border-b border-[var(--color-border)] bg-[var(--color-bg)]/80'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 xl:px-20 h-14 flex items-center justify-between">
        <a
          href="#hero"
          className="font-display text-sm font-medium text-[var(--color-text-primary)] tracking-wide hover:text-[var(--color-accent)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-4 rounded-sm"
        >
          {siteConfig.name}
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
