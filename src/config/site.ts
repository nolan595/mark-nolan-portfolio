export const siteConfig = {
  name: 'Mark Nolan',
  title: 'Mark Nolan',
  description:
    'CTO at Hunch, building F2P games for Europe\'s biggest sportsbooks. ' +
    'CS background, backend roots, full-stack in practice.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://marknolan.dev',
  email: process.env.NEXT_PUBLIC_EMAIL ?? 'markjnolan00@gmail.com',
  linkedIn: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? 'https://www.linkedin.com/in/mark-nolan-6158001ba/',
  ogImage: '/og-image.png',
} as const;

export type SiteConfig = typeof siteConfig;
