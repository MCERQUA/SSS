import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { HeroSection } from '@/components/sections';
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
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-black mb-8">
                Get In Touch
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">📍</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Location</h3>
                  <p className="text-gray-600">
                    91 Peelar Road<br />
                    Concord, Ontario<br />
                    Canada
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">📞</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Phone</h3>
                  <p className="text-gray-600">
                    <a href="tel:+16476991930" className="hover:text-red-600">
                      +1 (647) 699-1930
                    </a>
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">⏰</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday<br />
                    9:00 AM - 5:00 PM EST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}