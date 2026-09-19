import type { Metadata } from 'next'
import { DESCRIPTION, NAME, ROLE, SITE_URL } from './site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${NAME} — ${ROLE}`,
  description: DESCRIPTION,
  keywords: ['IT Specialist', 'System Administration', 'Cloud Infrastructure', 'Azure', 'Network Engineering', 'Germany'],
  authors: [{ name: NAME, url: SITE_URL }],
  alternates: { canonical: '/' },
  openGraph: {
    title: `${NAME} — ${ROLE}`,
    description: DESCRIPTION,
    url: '/',
    siteName: NAME,
    locale: 'en_US',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${NAME} — ${ROLE}`,
    description: DESCRIPTION,
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' }],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: NAME,
  jobTitle: ROLE,
  url: SITE_URL,
  image: `${SITE_URL}/photo_hammad.jpg`,
  address: { '@type': 'PostalAddress', addressLocality: 'Göttingen', addressCountry: 'DE' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Georg-August-Universität Göttingen' },
    { '@type': 'CollegeOrUniversity', name: 'University of Karachi' },
  ],
  sameAs: ['https://github.com/Muhammadhammad24', 'https://www.linkedin.com/in/mhammad24/'],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#000027" />
        <meta name="msapplication-TileColor" content="#0a0f1e" />
      </head>
      <body className="antialiased overflow-x-hidden" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <script
          type="application/ld+json"
          // Structured data so search engines can show a person card.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <div className="scanline" />
        {children}
      </body>
    </html>
  )
}
