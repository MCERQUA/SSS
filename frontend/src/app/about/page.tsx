import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { HeroSection, CTASection } from '@/components/sections';

export const metadata: Metadata = {
  title: 'About Us - Sweat Shop Swag | NFC Technology & Custom Decals',
  description: 'Learn about Sweat Shop Swag, your trusted partner for NFC-enabled merchandise and UV DTF decals. Transforming businesses with innovative smart merchandise solutions.',
  keywords: 'about sweat shop swag, NFC technology, custom decals, smart merchandise, promotional products, screen printing',
  openGraph: {
    title: 'About Sweat Shop Swag - Smart Merchandise Experts',
    description: 'Discover how we transform businesses with cutting-edge NFC technology and durable UV DTF decals.',
    url: 'https://sweatshopswag.com/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection variant="about" />
        <CTASection variant="contact" />
      </main>
      <Footer />
    </>
  );
}