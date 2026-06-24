import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Muhammad Hammad',
  description: '6+ years IT professional specializing in system administration, cloud infrastructure, network engineering, and intelligent automation. Based in Germany.',
  keywords: ['IT Engineer', 'System Administration', 'Cloud Infrastructure', 'Azure', 'Network Engineering', 'Germany', 'DevSecOps'],
  authors: [{ name: 'Muhammad Hammad' }],
  openGraph: {
    title: 'Muhammad Hammad',
    description: 'IT Infrastructure & Security Engineer | Cloud & Infrastructure Specialist | Germany',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'auto' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#050a05" />
        <meta name="msapplication-TileColor" content="#050a05" />
      </head>
      <body className="antialiased bg-[#050a05] text-white overflow-x-hidden">
        <div className="scanline" />
        {children}
      </body>
    </html>
  )
}
