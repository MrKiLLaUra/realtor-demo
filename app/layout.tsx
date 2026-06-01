import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChatWidget from '@/components/ChatWidget'
import DemoGuard from '@/components/DemoGuard'
import CookieNotice from '@/components/CookieNotice'

export const metadata: Metadata = {
  title: { default: 'Limen Properties — Demo by Limen Studios', template: '%s | Limen Properties (Demo)' },
  description: 'A fictional boutique estate-agency website — a demonstration of the kind of property site Limen Studios builds. Not a real estate agency.',

  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://demo.limenstudios.com'),
  applicationName: 'Limen Properties (Demo)',
  openGraph: {
    type: 'website',
    siteName: 'Limen Properties (Demo)',
    images: [{ url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  // Demonstration site — keep it out of search indexes entirely.
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
        <DemoGuard />
        <CookieNotice />
      </body>
    </html>
  )
}
