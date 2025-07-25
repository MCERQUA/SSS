import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { HeroSection, CTASection } from '@/components/sections';
import { ProductsGrid } from '@/components/products/ProductsGrid';

export const metadata: Metadata = {
  title: 'Products - Sweat Shop Swag | Smart Merchandise & Custom Solutions',
  description: 'Browse our collection of NFC-enabled apparel, UV DTF decals, and custom merchandise solutions. Standard products available for immediate purchase.',
  keywords: 'sweat shop swag products, NFC apparel, UV DTF decals, custom merchandise, promotional products',
  openGraph: {
    title: 'Sweat Shop Swag Products - Smart Merchandise Solutions',
    description: 'Browse NFC apparel, UV DTF decals, and custom merchandise. Standard products and custom quotes available.',
    url: 'https://sweatshopswag.com/products',
    type: 'website',
  },
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <HeroSection 
          variant="about"
          title="Our Products & Services"
          subtitle="Choose from our standard merchandise or request a custom quote for your unique project"
        />
        <div className="container mx-auto px-4 py-16 bg-white rounded-t-3xl -mt-12 relative z-10 shadow-xl">
          <ProductsGrid />
        </div>
        <CTASection variant="minimal" theme="light" />
      </main>
      <Footer />
    </>
  );
}