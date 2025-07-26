'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { useModal } from '@/contexts/ModalContext';
import { cn } from '@/lib/utils';

/**
 * HeroSection Component for Sweat Shop Swag
 * 
 * Modern hero section with multiple variants for different pages
 * Features gradient backgrounds, animations, and responsive design
 * 
 * @component
 * @example
 * <HeroSection variant="nfc-technology" />
 * <HeroSection variant="contact" title="Custom Title" />
 */

export interface HeroSectionProps {
  /** Hero variant for different pages/purposes */
  variant?: 'home' | 'nfc-technology' | 'decals' | 'about' | 'contact' | 'blog';
  /** Custom title (overrides default) */
  title?: string;
  /** Custom subtitle/description */
  subtitle?: string;
  /** Primary CTA button text */
  primaryCTA?: string;
  /** Primary CTA button link */
  primaryCTAHref?: string;
  /** Secondary CTA button text */
  secondaryCTA?: string;
  /** Secondary CTA button link */
  secondaryCTAHref?: string;
  /** Hide CTA buttons */
  hideCTAs?: boolean;
  /** Custom background image URL */
  backgroundImage?: string;
  /** Custom CSS classes */
  className?: string;
}

// Hero content configurations
const heroConfigs = {
  home: {
    title: "Transform Your Business with a Tap!",
    subtitle: "Unlock the Power of Smart Merchandise with cutting-edge NFC and QR code integrated apparel. Make your brand's reach expand with every tap!",
    primaryCTA: "Get Started",
    primaryCTAHref: "/contact",
    secondaryCTA: "Learn More",
    secondaryCTAHref: "/about",
    background: "bg-gradient-to-br from-red-600 via-red-700 to-black"
  },
  'nfc-technology': {
    title: "👕 Wearable Tech Revolution 👕",
    subtitle: "Your team's uniform is no longer just clothing. It's a gateway! Our NFC-enabled apparel allows customers to connect instantly with just a tap.",
    primaryCTA: "Order NFC Items",
    primaryCTAHref: "/contact",
    secondaryCTA: "See Examples",
    secondaryCTAHref: "/about",
    background: "bg-gradient-to-br from-black via-gray-900 to-red-900"
  },
  decals: {
    title: "🎨 Vibrant Colors That Last 🎨",
    subtitle: "Say goodbye to faded decals! Our UV DTF Decals are built for life - dishwasher-safe, weather-resistant, and incredibly vibrant.",
    primaryCTA: "Order Custom Decals",
    primaryCTAHref: "/contact",
    secondaryCTA: "View Gallery",
    secondaryCTAHref: "/about",
    background: "bg-gradient-to-br from-red-600 via-red-500 to-red-700"
  },
  about: {
    title: "About Sweat Shop Swag",
    subtitle: "Pioneering the future of interactive merchandise with cutting-edge NFC technology and premium UV DTF decals.",
    primaryCTA: "Get In Touch",
    primaryCTAHref: "/contact",
    secondaryCTA: "Our Services",
    secondaryCTAHref: "/",
    background: "bg-gradient-to-br from-gray-900 via-red-900 to-black"
  },
  contact: {
    title: "Ready to Transform Your Business?",
    subtitle: "Let's create smart, interactive merchandise that drives real engagement and grows your brand.",
    primaryCTA: "Get Quote",
    primaryCTAHref: "#contact-form",
    secondaryCTA: "Call Us",
    secondaryCTAHref: "tel:+16476991930",
    background: "bg-gradient-to-br from-red-700 via-black to-red-800"
  },
  blog: {
    title: "Insights & Updates",
    subtitle: "Stay informed about the latest trends in NFC technology, smart merchandise, and interactive marketing solutions.",
    primaryCTA: "Latest Posts",
    primaryCTAHref: "#blog-posts",
    secondaryCTA: "Subscribe",
    secondaryCTAHref: "/contact",
    background: "bg-gradient-to-br from-black via-gray-800 to-red-900"
  }
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  variant = 'home',
  title,
  subtitle,
  primaryCTA,
  primaryCTAHref,
  secondaryCTA,
  secondaryCTAHref,
  hideCTAs = false,
  backgroundImage,
  className
}) => {
  const { openModal } = useModal();
  const config = heroConfigs[variant];
  
  const heroTitle = title || config.title;
  const heroSubtitle = subtitle || config.subtitle;
  const heroPrimaryCTA = primaryCTA || config.primaryCTA;
  const heroPrimaryCTAHref = primaryCTAHref || config.primaryCTAHref;
  const heroSecondaryCTA = secondaryCTA || config.secondaryCTA;
  const heroSecondaryCTAHref = secondaryCTAHref || config.secondaryCTAHref;

  return (
    <section 
      className={cn(
        "relative min-h-screen flex items-center justify-center text-white overflow-hidden",
        config.background,
        className
      )}
      style={backgroundImage ? { 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      } : undefined}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-red-400 rounded-full opacity-10 animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-white rounded-full opacity-5 animate-ping" style={{ animationDuration: '4s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-black/20" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          
          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="inline-block animate-fade-in-up">
              {heroTitle}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" 
             style={{ animationDelay: '0.2s' }}>
            {heroSubtitle}
          </p>

          {/* CTA Buttons */}
          {!hideCTAs && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" 
                 style={{ animationDelay: '0.4s' }}>
              <Button
                variant="primary"
                size="xl"
                className="shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                onClick={() => {
                  // Handle quote modal for "Get Quote" buttons
                  if (heroPrimaryCTA?.toLowerCase().includes('quote')) {
                    openModal('quote');
                  } else if (heroPrimaryCTAHref?.startsWith('#')) {
                    document.querySelector(heroPrimaryCTAHref)?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = heroPrimaryCTAHref || '/contact';
                  }
                }}
              >
                {heroPrimaryCTA}
              </Button>
              
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-black shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => {
                  if (heroSecondaryCTAHref?.startsWith('#')) {
                    document.querySelector(heroSecondaryCTAHref)?.scrollIntoView({ behavior: 'smooth' });
                  } else if (heroSecondaryCTAHref?.startsWith('tel:')) {
                    window.location.href = heroSecondaryCTAHref;
                  } else {
                    window.location.href = heroSecondaryCTAHref || '/about';
                  }
                }}
              >
                {heroSecondaryCTA}
              </Button>
            </div>
          )}

          {/* Feature Highlights (for home variant) */}
          {variant === 'home' && (
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up" 
                 style={{ animationDelay: '0.6s' }}>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">NFC Technology</h3>
                <p className="text-gray-300">Tap-enabled merchandise for instant customer engagement</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">🎨</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">UV DTF Decals</h3>
                <p className="text-gray-300">Durable, vibrant decals that withstand any condition</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Custom Solutions</h3>
                <p className="text-gray-300">Tailored to fit your brand identity and business needs</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};