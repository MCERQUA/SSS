import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';

interface CTAButton {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  external?: boolean;
}

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttons?: CTAButton[];
  variant?: 'default' | 'gradient' | 'minimal' | 'contact' | 'urgent';
  theme?: 'red-black' | 'dark' | 'light';
  className?: string;
}

const defaultButtons: CTAButton[] = [
  {
    text: 'Get Custom Quote',
    href: '/contact',
    variant: 'primary',
  },
  {
    text: 'View Products',
    href: '/products',
    variant: 'outline',
  }
];

/**
 * CTASection Component
 * 
 * A flexible call-to-action section with multiple variants and themes.
 * Features modern animations, gradient backgrounds, and customizable buttons.
 * 
 * @param title - Main CTA title
 * @param subtitle - Optional subtitle text
 * @param description - Additional description text
 * @param buttons - Array of CTA buttons
 * @param variant - Visual style variant
 * @param theme - Color theme
 * @param className - Additional CSS classes
 * 
 * Usage:
 * ```tsx
 * <CTASection />
 * <CTASection variant="gradient" theme="red-black" />
 * <CTASection variant="contact" title="Ready to Transform Your Business?" />
 * ```
 */
export const CTASection: React.FC<CTASectionProps> = ({
  title,
  subtitle,
  description,
  buttons = defaultButtons,
  variant = 'default',
  theme = 'red-black',
  className = "",
}) => {
  // Set default content based on variant
  const getDefaultContent = () => {
    switch (variant) {
      case 'contact':
        return {
          title: title || 'Ready to Transform Your Business?',
          subtitle: subtitle || 'Get Started Today',
          description: description || 'Contact us for a custom quote and discover how NFC technology and UV DTF decals can revolutionize your brand presence.',
          buttons: buttons.length > 0 ? buttons : [
            { text: 'Get Custom Quote', href: '/contact', variant: 'primary' as const },
            { text: 'Call Now', href: 'tel:+16476991930', variant: 'outline' as const }
          ]
        };
      case 'urgent':
        return {
          title: title || 'Limited Time Offer!',
          subtitle: subtitle || 'Act Now',
          description: description || 'Transform your merchandise with cutting-edge NFC technology. Special pricing available for new customers.',
          buttons: buttons.length > 0 ? buttons : [
            { text: 'Claim Offer', href: '/contact', variant: 'accent' as const },
            { text: 'Learn More', href: '/about', variant: 'outline' as const }
          ]
        };
      case 'minimal':
        return {
          title: title || 'Smart Merchandise Solutions',
          subtitle: subtitle,
          description: description,
          buttons: buttons.length > 0 ? buttons : [
            { text: 'Explore Services', href: '/products', variant: 'primary' as const }
          ]
        };
      default:
        return {
          title: title || 'Transform Your Brand with Smart Merchandise',
          subtitle: subtitle || 'NFC Technology & UV DTF Decals',
          description: description || 'Make your brand reach expand with every tap. Professional quality merchandise that connects your customers to your digital presence.',
          buttons: buttons
        };
    }
  };

  const content = getDefaultContent();

  // Theme-based styling
  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return {
          bg: 'bg-gray-900',
          text: 'text-white',
          subtitle: 'text-gray-300',
          description: 'text-gray-400',
        };
      case 'light':
        return {
          bg: 'bg-gray-50',
          text: 'text-black',
          subtitle: 'text-gray-700',
          description: 'text-gray-600',
        };
      default: // red-black
        return {
          bg: 'bg-black',
          text: 'text-white',
          subtitle: 'text-red-400',
          description: 'text-gray-300',
        };
    }
  };

  // Variant-based styling
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-r from-red-600 via-red-700 to-black';
      case 'minimal':
        return theme === 'light' ? 'bg-white' : 'bg-gray-900';
      case 'urgent':
        return 'bg-gradient-to-r from-yellow-500 via-red-600 to-black relative overflow-hidden';
      default:
        return getThemeClasses().bg;
    }
  };

  const themeClasses = getThemeClasses();
  const variantBg = getVariantClasses();

  return (
    <section className={`py-16 md:py-24 ${variantBg} ${themeClasses.text} relative ${className}`}>
      {/* Urgent variant animation */}
      {variant === 'urgent' && (
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-red-500/20 to-black/20 animate-pulse"></div>
      )}
      
      {/* Gradient variant overlay */}
      {variant === 'gradient' && (
        <div className="absolute inset-0 bg-black/20"></div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {content.subtitle && (
            <p className={`text-lg font-semibold mb-4 ${themeClasses.subtitle} ${variant === 'urgent' ? 'animate-bounce' : ''}`}>
              {content.subtitle}
            </p>
          )}
          
          <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${themeClasses.text}`}>
            {content.title}
          </h2>
          
          {content.description && (
            <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${themeClasses.description}`}>
              {content.description}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {content.buttons.map((button, index) => (
              button.external ? (
                <a
                  key={index}
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button 
                    variant={button.variant || 'primary'}
                    size="lg"
                    className="min-w-[150px] transform hover:scale-105 transition-all duration-300"
                  >
                    {button.text}
                  </Button>
                </a>
              ) : (
                <Link key={index} href={button.href} className="inline-block">
                  <Button 
                    variant={button.variant || 'primary'}
                    size="lg"
                    className="min-w-[150px] transform hover:scale-105 transition-all duration-300"
                  >
                    {button.text}
                  </Button>
                </Link>
              )
            ))}
          </div>
          
          {variant === 'contact' && (
            <div className="mt-8 pt-8 border-t border-gray-700">
              <p className={`text-sm ${themeClasses.description}`}>
                📞 Call us directly: <a href="tel:+16476991930" className="text-red-400 hover:text-red-300 transition-colors">+1 (647) 699-1930</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;