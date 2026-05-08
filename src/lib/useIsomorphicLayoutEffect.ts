import { useEffect, useLayoutEffect } from 'react';

// useLayoutEffect on client, useEffect on server — prevents SSR mismatch warnings
// when GSAP and other DOM-touching code runs inside layout effects
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
