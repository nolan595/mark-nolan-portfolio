import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Instrument_Serif, DM_Sans } from 'next/font/google';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Mark Nolan',
    template: '%s | Mark Nolan',
  },
  description:
    'Mark Nolan is CTO at Hunch, building F2P games for Europe\'s biggest sportsbooks. ' +
    'CS background, backend roots, full-stack in practice. Portfolio of web projects built with craft and motion.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://marknolan.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Mark Nolan',
    title: 'Mark Nolan',
    description:
      'CTO at Hunch. CS background, backend roots, full-stack in practice. Web projects built with craft and motion.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mark Nolan',
        type: 'image/png',
      },
    ],
    locale: 'en_IE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mark Nolan',
    description: 'CTO at Hunch. CS background, backend roots, full-stack in practice.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${dmSans.variable}`}
    >
      <head />
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
