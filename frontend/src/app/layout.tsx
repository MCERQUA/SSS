import type { Metadata } from 'next'
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from '@/contexts/CartContext'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Sweat Shop Swag - Transform Your Business with Smart Merchandise',
  description: 'Cutting-edge NFC and QR code integrated merchandise. Make your brand reach expand with every tap! UV DTF decals that last.',
  keywords: 'NFC merchandise, smart apparel, UV DTF decals, promotional products, custom merchandise, interactive marketing',
  authors: [{ name: 'Sweat Shop Swag' }],
  creator: 'Sweat Shop Swag',
  publisher: 'Sweat Shop Swag',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sweatshopswag.com',
    title: 'Sweat Shop Swag - Smart Merchandise Solutions',
    description: 'Transform your business with NFC-enabled merchandise and premium UV DTF decals.',
    siteName: 'Sweat Shop Swag',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sweat Shop Swag - Smart Merchandise Solutions',
    description: 'Transform your business with NFC-enabled merchandise and premium UV DTF decals.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}