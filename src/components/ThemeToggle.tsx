'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    // Clean up any orphaned overlay if the component unmounts mid-transition
    return () => {
      overlayRef.current?.remove();
      overlayRef.current = null;
    };
  }, []);

  function handleToggle() {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';

    if (prefersReducedMotion || !buttonRef.current) {
      setTheme(next);
      return;
    }

    // Clip-path circle reveal from button position
    const btn = buttonRef.current;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: none;
      background-color: ${next === 'dark' ? '#111010' : '#F5F2ED'};
      clip-path: circle(0% at ${cx}px ${cy}px);
      transition: clip-path 600ms cubic-bezier(0.87, 0, 0.13, 1);
    `;
    document.body.appendChild(overlay);
    overlayRef.current = overlay;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.style.clipPath = `circle(150% at ${cx}px ${cy}px)`;
      });
    });

    const onEnd = () => {
      setTheme(next);
      overlay.remove();
      overlayRef.current = null;
    };

    overlay.addEventListener('transitionend', onEnd, { once: true });
  }

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="w-9 h-9 flex items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4"
      />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="w-9 h-9 flex items-center justify-center rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-4"
    >
      <span
        className="transition-[opacity,transform] duration-200"
        style={{ opacity: isDark ? 1 : 0, transform: isDark ? 'rotate(0deg)' : 'rotate(-90deg)', position: 'absolute' }}
        aria-hidden
      >
        <Sun size={18} />
      </span>
      <span
        className="transition-[opacity,transform] duration-200"
        style={{ opacity: isDark ? 0 : 1, transform: isDark ? 'rotate(90deg)' : 'rotate(0deg)', position: 'absolute' }}
        aria-hidden
      >
        <Moon size={18} />
      </span>
    </button>
  );
}
