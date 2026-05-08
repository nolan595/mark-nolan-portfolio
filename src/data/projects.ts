import type { Project } from '@/src/types/project';

export const projects: Project[] = [
  {
    slug: 'hunch',
    index: '01',
    title: 'Hunch',
    tagline: 'Business site for Hunch, free-to-play provider for global sportsbook operator Superbet.',
    description:
      "Marketing site for Hunch, the in-house free-to-play provider building prediction and streak games for global sportsbook operator Superbet. Covers product, team, and regional reach across six markets.",
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Netlify'],
    liveUrl: 'https://home.playhunch.io/',
    image: '/images/projects/hunch.webp',
    imageAlt: 'Hunch — screenshot',
    featured: true,
  },
  {
    slug: 'clontarf-proshop',
    index: '02',
    title: 'Clontarf Paradise Golf',
    tagline: 'Modern pro shop site for Clontarf Golf Club. Products, vouchers, and lesson bookings.',
    description:
      "A clean, premium-feeling site for a Dublin golf club's pro shop. Browse products, buy gift vouchers, and book 1:1 lessons with a PGA professional. Built to feel welcoming to both members and visitors.",
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Cloudinary', 'Netlify'],
    liveUrl: 'https://clontarfproshop.com/',
    image: '/images/projects/clontarf-proshop.webp',
    imageAlt: 'Clontarf Paradise Golf — screenshot',
    featured: true,
  },
  {
    slug: 'oconnor-cars',
    index: '03',
    title: "O'Connor Cars",
    tagline: 'Local site for a family-run VW/Audi specialist garage in Finglas, Dublin.',
    description:
      'Service listings, NCT pre-check guide, opening hours, and contact details for a North Dublin garage. Built to feel trustworthy and local. Clear info architecture, easy to find a phone number.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Netlify'],
    liveUrl: 'https://oconnor-cars.netlify.app/',
    image: '/images/projects/oconnor-cars.webp',
    imageAlt: "O'Connor Cars — screenshot",
    featured: true,
  },
  {
    slug: 'eoin-obrien-golf',
    index: '04',
    title: "Eoin O'Brien Golf",
    tagline: 'Personal coaching site for the PGA Head Professional at Clontarf Golf Club, with a built-in SumUp payment system for voucher purchases.',
    description:
      "Bookings, vouchers, and about content for a private golf coach offering 1:1 lessons, video analysis, and on-course sessions. Built-in SumUp payment system for voucher purchases, with YouCanBookMe for scheduling.",
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'SumUp', 'Netlify'],
    liveUrl: 'https://eoinobriengolf.com/',
    image: '/images/projects/eoin-obrien-golf.webp',
    imageAlt: "Eoin O'Brien Golf — screenshot",
    featured: true,
  },
  {
    slug: 'percy-french-troubadours',
    index: '05',
    title: 'Percy French Troubadours',
    tagline: 'Site for an Irish charity choir performing the songs and poems of Percy French.',
    description:
      'Editorial-style site celebrating the work of an Irish heritage choir that has raised significant funds for charity. Includes about, audience reviews, charity impact counter, and booking enquiries.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Netlify'],
    liveUrl: 'https://percyfrenchtroubadours.com/',
    image: '/images/projects/percy-french-troubadours.webp',
    imageAlt: 'Percy French Troubadours — screenshot',
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured !== false);
