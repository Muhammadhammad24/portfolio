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

export const metadata: Metadata = {
  title: 'Muhammad Hammad',
  description: 'IT Specialist — Cloud, Security & Infrastructure',
  keywords: ['IT Specialist', 'System Administration', 'Cloud Infrastructure', 'Azure', 'Network Engineering', 'Germany'],
  authors: [{ name: 'Muhammad Hammad' }],
  openGraph: {
    title: 'Muhammad Hammad',
    description: 'IT Specialist — Cloud, Security & Infrastructure',
    type: 'website',
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
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#000027" />
        <meta name="msapplication-TileColor" content="#0a0f1e" />
      </head>
      <body className="antialiased overflow-x-hidden" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <div className="scanline" />
        {children}
      </body>
    </html>
  )
}
