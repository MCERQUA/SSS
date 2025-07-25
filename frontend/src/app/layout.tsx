import { Inter } from "next/font/google"
import { MedusaProvider } from "@/lib/medusa/medusa-provider"
import { CartProvider } from "@/lib/medusa/cart-context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductAssistant } from "@/components/ai/product-assistant"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MedusaProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <ProductAssistant />
          </CartProvider>
        </MedusaProvider>
      </body>
    </html>
  )
}