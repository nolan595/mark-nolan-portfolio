export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[var(--color-accent)] focus:text-[var(--color-accent-fg)] focus:rounded focus:font-body focus:text-sm focus:font-semibold focus:outline-none"
    >
      Skip to content
    </a>
  );
}
