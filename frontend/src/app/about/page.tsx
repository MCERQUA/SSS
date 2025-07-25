import { Metadata } from 'next';

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Sweat Shop Swag
            </h1>
            <p className="text-xl md:text-2xl text-red-100">
              Pioneering the future of interactive merchandise with cutting-edge NFC technology
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">
                  Our Story
                </h2>
                <p className="text-gray-700 mb-4">
                  Located in the heart of Concord, Ontario, Sweat Shop Swag is revolutionizing 
                  how businesses connect with their customers through innovative merchandise solutions.
                </p>
                <p className="text-gray-700 mb-4">
                  We specialize in NFC-enabled apparel and high-quality UV DTF decals that transform 
                  ordinary promotional items into powerful interactive marketing tools.
                </p>
                <p className="text-gray-700">
                  Our mission is simple: help your business stand out in a crowded marketplace 
                  with smart, tech-forward merchandise that drives real engagement.
                </p>
              </div>
              <div className="bg-red-600 text-white p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    Cutting-edge NFC technology
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    Durable, weather-resistant decals
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    Custom solutions for every industry
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    Expert design and consultation
                  </li>
                </ul>
              </div>
            </div>

            {/* Services Overview */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-red-600">
                <h3 className="text-2xl font-bold text-black mb-4">
                  NFC Technology
                </h3>
                <p className="text-gray-700">
                  Transform your team uniforms into interactive gateways. With a simple tap, 
                  customers can leave reviews, save contact details, or visit your website.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-black">
                <h3 className="text-2xl font-bold text-black mb-4">
                  UV DTF Decals
                </h3>
                <p className="text-gray-700">
                  Premium quality decals that withstand harsh weather, dishwasher cycles, 
                  and maintain vibrant colors for years of professional brand representation.
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-black text-white p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-red-200 mb-6">
                Located at 91 Peelar Road, Concord, Ontario
              </p>
              <a 
                href="/contact" 
                className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}