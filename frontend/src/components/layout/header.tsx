'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import GlitchText from '@/components/ui/GlitchText';
import { CartIcon } from '@/components/cart/CartIcon';
import { useModal } from '@/contexts/ModalContext';
import { cn } from '@/lib/utils';

/**
 * Header Component for Sweat Shop Swag
 * 
 * Modern responsive navigation with red/black theme
 * Features smooth animations, mobile menu, and scroll effects
 * 
 * @component
 * @example
 * <Header />
 */

interface NavItem {
  label: string;
  href: string;
  description?: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openModal } = useModal();

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-black/95 backdrop-blur-md shadow-lg border-b border-red-600" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="block">
              <div style={{
                '--after-shadow': '-2px 0 #ef4444',
                '--before-shadow': '2px 0 #dc2626'
              } as React.CSSProperties}>
                <GlitchText 
                  speed={1.2}
                  enableShadows={true}
                  enableOnHover={false}
                  className="!text-lg !font-bold !text-white !m-0"
                >
                  Sweat Shop Swag
                </GlitchText>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-all duration-300 group",
                  pathname === item.href
                    ? "text-red-400"
                    : "text-white hover:text-red-400"
                )}
              >
                {item.label}
                <span 
                  className={cn(
                    "absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                    pathname === item.href
                      ? "bg-red-400 w-full"
                      : "bg-red-400"
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* CTA Button & Cart & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <Button 
                variant="primary" 
                size="sm"
                className="shadow-lg hover:shadow-xl"
                onClick={() => openModal('quote')}
              >
                Get Quote
              </Button>
            </div>

            {/* Cart Icon */}
            <CartIcon isScrolled={isScrolled} />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors text-white hover:bg-white/10"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span 
                  className={cn(
                    "w-5 h-0.5 transition-all duration-300 bg-white",
                    isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  )} 
                />
                <span 
                  className={cn(
                    "w-5 h-0.5 my-1 transition-all duration-300 bg-white",
                    isMobileMenuOpen ? "opacity-0" : ""
                  )} 
                />
                <span 
                  className={cn(
                    "w-5 h-0.5 transition-all duration-300 bg-white",
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  )} 
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isMobileMenuOpen ? "max-h-80 pb-6" : "max-h-0"
          )}
        >
          <nav className="flex flex-col space-y-4 pt-4 border-t border-red-600">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                  pathname === item.href
                    ? "bg-red-600 text-white"
                    : "text-white hover:bg-white/10"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4">
              <Button 
                variant="primary" 
                size="md"
                fullWidth={true}
                onClick={() => openModal('quote')}
              >
                Get Quote
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}