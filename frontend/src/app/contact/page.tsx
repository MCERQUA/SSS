import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { HeroSection, ContactSection } from '@/components/sections';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us - Sweat Shop Swag | Get Custom Quote',
  description: 'Ready to transform your business with NFC merchandise and UV DTF decals? Contact Sweat Shop Swag today for a custom quote and consultation.',
  keywords: 'contact sweat shop swag, get quote, NFC merchandise quote, custom decals quote, promotional products contact',
  openGraph: {
    title: 'Contact Sweat Shop Swag - Get Custom Quote',
    description: 'Ready to transform your business with smart merchandise? Get in touch for a custom quote.',
    url: 'https://sweatshopswag.com/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection variant="contact" />
        
        {/* Contact Form Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <ContactForm variant="quote" />
            </div>
          </div>
        </section>
        
        {/* Contact Info Section */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}