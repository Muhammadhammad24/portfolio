import type { Metadata } from 'next'
// IBM Plex, self-hosted so nothing blocks the first paint. Plex was drawn for
// engineering and technical documentation, and its sans and mono are one
// family — which matters on a page that sets every measured figure in mono
// next to the prose that explains it.
import '@fontsource/ibm-plex-sans/latin-400.css'
import '@fontsource/ibm-plex-sans/latin-500.css'
import '@fontsource/ibm-plex-sans/latin-600.css'
import '@fontsource/ibm-plex-sans/latin-700.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import '@fontsource/ibm-plex-mono/latin-600.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Muhammad Hammad — IT Infrastructure Engineer',
  description: 'IT Infrastructure Engineer in Germany. Azure and AWS, Windows and Linux servers, enterprise networking, Zero Trust security and the automation that keeps it all quiet.',
  keywords: ['IT Infrastructure Engineer', 'System Administration', 'Azure', 'AWS', 'Active Directory', 'Intune', 'Network Engineering', 'Zero Trust', 'Germany'],
  authors: [{ name: 'Muhammad Hammad' }],
  openGraph: {
    title: 'Muhammad Hammad — IT Infrastructure Engineer',
    description: 'IT Infrastructure Engineer in Germany: cloud, networks, servers and the endpoints people actually sit in front of.',
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
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
      </head>
      <body className="antialiased overflow-x-hidden" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        {children}
      </body>
    </html>
  )
}
