'use client';

import { useState, useEffect } from 'react';

// Read the preference synchronously so the initial render value is correct.
// Avoids a flash where GSAP animations start before the useEffect fires and
// sets the preference to true for reduced-motion users.
function getInitialPreference(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialPreference);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Re-sync in case the value changed between server render and hydration
    setPrefersReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}
