export type TechTag =
  | 'Next.js'
  | 'React'
  | 'TypeScript'
  | 'JavaScript'
  | 'Tailwind CSS'
  | 'Node.js'
  | 'PostgreSQL'
  | 'Prisma'
  | 'AWS'
  | 'Netlify'
  | string;

export interface Project {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  tech: TechTag[];
  liveUrl: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
}
