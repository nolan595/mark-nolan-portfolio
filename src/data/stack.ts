import type { StackItem, StackCategory } from '@/src/types/stack';

export const stack: StackItem[] = [
  { label: 'Next.js',     category: 'Frameworks & Languages', inMarquee: true },
  { label: 'Node.js',     category: 'Frameworks & Languages', inMarquee: true },
  { label: 'TypeScript',  category: 'Frameworks & Languages', inMarquee: true },
  { label: 'Python',      category: 'Frameworks & Languages', inMarquee: true },
  { label: 'Django',      category: 'Frameworks & Languages', inMarquee: true },
  { label: 'Tailwind CSS', category: 'Styling & Design', inMarquee: true },
  { label: 'PostgreSQL',  category: 'Database & ORM', inMarquee: true },
  { label: 'Prisma',      category: 'Database & ORM', inMarquee: true },
  { label: 'AWS',         category: 'Cloud & Deploy', inMarquee: true },
  { label: 'Netlify',     category: 'Cloud & Deploy', inMarquee: true },
  { label: 'Figma',       category: 'Styling & Design', inMarquee: true },
];

export function groupedStack(): Record<StackCategory, StackItem[]> {
  return stack.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<StackCategory, StackItem[]>);
}

export const marqueeItems = stack.filter((s) => s.inMarquee !== false);
