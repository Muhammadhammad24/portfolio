import type { Metadata } from 'next'
// Only load weights actually used in the UI — cuts font CSS payload by ~60%
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'
import '@fontsource/space-grotesk/latin-400.css'
import '@fontsource/space-grotesk/latin-500.css'
import '@fontsource/space-grotesk/latin-700.css'
import '@fontsource/syne/latin-600.css'
import '@fontsource/syne/latin-700.css'
import '@fontsource/syne/latin-800.css'
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/jetbrains-mono/latin-500.css'
import './globals.css'

const BASE_URL = 'https://muhammadhammad.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Muhammad Hammad — IT Infrastructure & Security Engineer',
  description: 'IT Specialist with 6+ years in cloud infrastructure, network engineering, cybersecurity and automation. Based in Germany, open to opportunities worldwide.',
  keywords: ['IT Specialist', 'System Administration', 'Cloud Infrastructure', 'Azure', 'Network Engineering', 'Germany', 'DevSecOps', 'Cybersecurity'],
  authors: [{ name: 'Muhammad Hammad', url: BASE_URL }],
  creator: 'Muhammad Hammad',
  robots: { index: true, follow: true },
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: 'Muhammad Hammad — IT Infrastructure & Security Engineer',
    description: 'IT Specialist with 6+ years in cloud infrastructure, network engineering, cybersecurity and automation. Based in Germany.',
    url: BASE_URL,
    siteName: 'Muhammad Hammad Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/photo_hammad.jpg',
        width: 1200,
        height: 630,
        alt: 'Muhammad Hammad — IT Infrastructure & Security Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Hammad — IT Infrastructure & Security Engineer',
    description: 'IT Specialist with 6+ years in cloud infrastructure, network engineering, cybersecurity and automation.',
    images: ['/photo_hammad.jpg'],
    creator: '@mhammad24',
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' }],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#000027" />
        <meta name="msapplication-TileColor" content="#0a0f1e" />
        <link rel="canonical" href={BASE_URL} />
      </head>
      <body className="antialiased overflow-x-hidden" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        {children}
      </body>
    </html>
  )
}
