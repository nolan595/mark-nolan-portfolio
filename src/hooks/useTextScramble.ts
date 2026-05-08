'use client';

import { useState, useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const SWAPS_PER_LETTER = 6;
const LETTER_DURATION = 400; // ms per letter
const STAGGER_OVERLAP = 0.3; // next letter starts at 30% of current letter's duration

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export function useTextScramble(text: string, enabled: boolean, onComplete?: () => void) {
  const [displayed, setDisplayed] = useState<string[]>(() => text.split(''));
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!enabled) {
      setDisplayed(text.split(''));
      onCompleteRef.current?.();
      return;
    }

    const chars = text.split('');
    const resolved = new Array(chars.length).fill(false);
    startTimeRef.current = null;

    const tick = (now: number) => {
      if (startTimeRef.current === null) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;

      const next = chars.map((char, i) => {
        // Space and special chars resolve immediately
        if (char === ' ' || char === "'") return char;

        // Stagger start: each letter begins LETTER_DURATION * (1 - STAGGER_OVERLAP) * i ms after the first
        const letterStart = LETTER_DURATION * (1 - STAGGER_OVERLAP) * i;
        const letterElapsed = elapsed - letterStart;

        if (letterElapsed < 0) {
          // Not started yet — show placeholder
          return randomChar();
        }

        if (letterElapsed >= LETTER_DURATION) {
          resolved[i] = true;
          return char;
        }

        // In-progress — swap through random chars
        const swapInterval = LETTER_DURATION / SWAPS_PER_LETTER;
        const swapsDone = Math.floor(letterElapsed / swapInterval);
        if (swapsDone >= SWAPS_PER_LETTER - 1) return char;
        return randomChar();
      });

      setDisplayed(next);

      if (resolved.every((r, i) => r || chars[i] === ' ' || chars[i] === "'")) {
        setDisplayed(chars);
        onCompleteRef.current?.();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [text, enabled]);

  return displayed;
}
