import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Preloader from '@/components/Preloader'

export const metadata: Metadata = {
  title: 'Portfolio | High Contrast Tattoo Artist',
  description: 'Minimalist high-contrast tattoo artistry. Explore the portfolio and book your session.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Preloader />
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
