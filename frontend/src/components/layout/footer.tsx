'use client';

import React from 'react';
import Link from 'next/link';
import { useModal } from '@/contexts/ModalContext';

interface FooterProps {
  className?: string;
  theme?: 'dark' | 'light';
  showSocial?: boolean;
}

/**
 * Footer Component
 * 
 * A comprehensive site footer with company information, navigation links,
 * and social media links. Supports dark and light themes.
 * 
 * @param className - Additional CSS classes
 * @param theme - Color theme ('dark' | 'light')
 * @param showSocial - Whether to display social media links
 * 
 * Usage:
 * ```tsx
 * <Footer />
 * <Footer theme="light" showSocial={false} />
 * ```
 */
export function Footer({
  className = "",
  theme = 'dark',
  showSocial = true,
}: FooterProps) {
  const { openModal } = useModal();
  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-black' : 'bg-gray-100';
  const textClass = isDark ? 'text-white' : 'text-black';
  const secondaryTextClass = isDark ? 'text-gray-300' : 'text-gray-600';
  const borderClass = isDark ? 'border-gray-800' : 'border-gray-200';

  return (
    <footer className={`${bgClass} ${textClass} ${className}`}>
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <h3 className="text-2xl font-bold text-red-600">
                Sweat Shop Swag
              </h3>
            </Link>
            <p className={`${secondaryTextClass} mb-4 max-w-md`}>
              Transform your business with cutting-edge NFC technology and premium UV DTF decals. 
              Smart merchandise that makes your brand reach expand with every tap.
            </p>
            <div className={`${secondaryTextClass} space-y-1`}>
              <p>📍 91 Peelar Road, Concord, Ontario, Canada</p>
              <p>
                📞{' '}
                <a 
                  href="tel:+16476991930" 
                  className="hover:text-red-600 transition-colors"
                >
                  +1 (647) 699-1930
                </a>
              </p>
              <p>⏰ Monday - Friday, 9:00 AM - 5:00 PM EST</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/nfc" className={`${secondaryTextClass} hover:text-red-600 transition-colors`}>
                  NFC Merchandise
                </Link>
              </li>
              <li>
                <Link href="/services/decals" className={`${secondaryTextClass} hover:text-red-600 transition-colors`}>
                  UV DTF Decals
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => openModal('quote')}
                  className={`${secondaryTextClass} hover:text-red-600 transition-colors cursor-pointer`}
                >
                  Custom Quotes
                </button>
              </li>
              <li>
                <Link href="/services/printing" className={`${secondaryTextClass} hover:text-red-600 transition-colors`}>
                  Screen Printing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className={`${secondaryTextClass} hover:text-red-600 transition-colors`}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className={`${secondaryTextClass} hover:text-red-600 transition-colors`}>
                  Products
                </Link>
              </li>
              <li>
                <Link href="/blog" className={`${secondaryTextClass} hover:text-red-600 transition-colors`}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className={`${secondaryTextClass} hover:text-red-600 transition-colors`}>
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className={`${secondaryTextClass} hover:text-red-600 transition-colors`}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className={`${secondaryTextClass} hover:text-red-600 transition-colors`}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className={`${secondaryTextClass} hover:text-red-600 transition-colors`}>
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className={`${secondaryTextClass} hover:text-red-600 transition-colors`}>
                  Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & CTA */}
        {showSocial && (
          <div className={`border-t ${borderClass} mt-8 pt-8`}>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h5 className="font-semibold mb-2">Follow Us</h5>
                <div className="flex space-x-4">
                  <a href="#" className={`${secondaryTextClass} hover:text-red-600 transition-colors text-2xl`} aria-label="Facebook">
                    📘
                  </a>
                  <a href="#" className={`${secondaryTextClass} hover:text-red-600 transition-colors text-2xl`} aria-label="Instagram">
                    📷
                  </a>
                  <a href="#" className={`${secondaryTextClass} hover:text-red-600 transition-colors text-2xl`} aria-label="LinkedIn">
                    💼
                  </a>
                  <a href="#" className={`${secondaryTextClass} hover:text-red-600 transition-colors text-2xl`} aria-label="Twitter">
                    🐦
                  </a>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <p className={`${secondaryTextClass} text-sm`}>
                  Ready to transform your business?
                </p>
                <button
                  onClick={() => openModal('quote')}
                  className="inline-block mt-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold cursor-pointer"
                >
                  Get Custom Quote
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className={`border-t ${borderClass} mt-8 pt-6 text-center`}>
          <p className={`${secondaryTextClass} text-sm`}>
            © {new Date().getFullYear()} Sweat Shop Swag. All rights reserved. |{' '}
            <Link href="/privacy" className="hover:text-red-600 transition-colors">
              Privacy Policy
            </Link>{' '}
            |{' '}
            <Link href="/terms" className="hover:text-red-600 transition-colors">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}