'use client';

import { useEffect, useRef, useState } from 'react';

type CursorState = 'default' | 'link' | 'image';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>('default');
  const posRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Only active on devices that support precise pointer (mouse/trackpad).
    // Using pointer: fine rather than a width check — touch-capable tablets at
    // ≥768px would otherwise lose their native cursor.
    if (!window.matchMedia('(pointer: fine)').matches) return;

    document.body.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      const target = e.target as HTMLElement;
      const isImage = target.closest('[data-cursor-image]') !== null;
      const isLink = target.closest('a, button') !== null;

      if (isImage) setState('image');
      else if (isLink) setState('link');
      else setState('default');
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.body.style.cursor = '';
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const ringSize = state === 'link' ? 32 : state === 'image' ? 48 : 8;
  const isRing = state === 'link' || state === 'image';

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="hidden md:block fixed top-0 left-0 pointer-events-none z-[9998]"
      style={{
        willChange: 'transform',
        // translate(-50%, -50%) centres the cursor element on the pointer
        transform: 'translate(-100px, -100px)',
        marginLeft: `-${ringSize / 2}px`,
        marginTop: `-${ringSize / 2}px`,
      }}
    >
      {state === 'image' ? (
        <div
          className="flex items-center justify-center font-body text-xs font-medium rounded-full px-3 py-1.5 whitespace-nowrap"
          style={{
            background: 'rgba(17,16,16,0.75)',
            color: '#F0EDE8',
            backdropFilter: 'blur(4px)',
            transition: 'all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          View →
        </div>
      ) : (
        <div
          style={{
            width: `${ringSize}px`,
            height: `${ringSize}px`,
            borderRadius: '50%',
            background: isRing ? 'transparent' : 'var(--color-text-primary)',
            border: isRing ? '2px solid var(--color-accent)' : 'none',
            opacity: isRing ? 1 : 0.5,
            transition: 'all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
      )}
    </div>
  );
}
