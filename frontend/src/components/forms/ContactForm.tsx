'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

/**
 * ContactForm Component for Sweat Shop Swag
 * 
 * Netlify-enabled contact form with modern design and validation
 * Supports quote requests and general inquiries
 * 
 * @component
 * @example
 * <ContactForm variant="contact" />
 * <ContactForm variant="quote" title="Get Custom Quote" />
 */

export interface ContactFormProps {
  /** Form variant for different use cases */
  variant?: 'contact' | 'quote' | 'newsletter';
  /** Custom form title */
  title?: string;
  /** Custom description */
  description?: string;
  /** Hide title and description */
  minimal?: boolean;
  /** Custom CSS classes */
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  serviceType: string;
  budget: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  variant = 'contact',
  title,
  description,
  minimal = false,
  className
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    serviceType: '',
    budget: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Form configuration based on variant
  const formConfig = {
    contact: {
      title: title || 'Get In Touch',
      description: description || 'Ready to transform your business with smart merchandise? Contact us today!',
      submitText: 'Send Message',
      fields: ['name', 'email', 'phone', 'company', 'message']
    },
    quote: {
      title: title || 'Get Custom Quote',
      description: description || 'Tell us about your project and get a personalized quote for NFC merchandise or UV DTF decals.',
      submitText: 'Request Quote',
      fields: ['name', 'email', 'phone', 'company', 'serviceType', 'budget', 'message']
    },
    newsletter: {
      title: title || 'Stay Updated',
      description: description || 'Get the latest updates on NFC technology and smart merchandise trends.',
      submitText: 'Subscribe',
      fields: ['name', 'email']
    }
  };

  const config = formConfig[variant];

  // Validation
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (variant === 'quote') {
      if (!formData.serviceType) newErrors.serviceType = 'Please select a service type';
      if (!formData.message.trim()) newErrors.message = 'Project description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Netlify form submission
      const formElement = e.target as HTMLFormElement;
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(formElement) as any).toString()
      });
      
      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          name: '', email: '', phone: '', company: '', 
          message: '', serviceType: '', budget: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSuccess) {
    return (
      <Card variant="primary" className={cn("text-center", className)}>
        <CardContent className="p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            We&apos;ve received your {variant === 'quote' ? 'quote request' : 'message'} and will get back to you within 24 hours.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setIsSuccess(false)}
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="default" className={cn("", className)}>
      {!minimal && (
        <CardHeader>
          <CardTitle className="text-center">{config.title}</CardTitle>
          <p className="text-gray-600 text-center">{config.description}</p>
        </CardHeader>
      )}
      
      <CardContent>
        <form 
          name={`sweatshopswag-${variant}`}
          method="POST" 
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Netlify form detection */}
          <input type="hidden" name="form-name" value={`sweatshopswag-${variant}`} />
          <input type="hidden" name="bot-field" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            {config.fields.includes('name') && (
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors",
                    errors.name ? "border-red-500" : "border-gray-300"
                  )}
                  placeholder="Your full name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
            )}

            {/* Email Field */}
            {config.fields.includes('email') && (
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors",
                    errors.email ? "border-red-500" : "border-gray-300"
                  )}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            )}

            {/* Phone Field */}
            {config.fields.includes('phone') && (
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="+1 (647) 699-1930"
                />
              </div>
            )}

            {/* Company Field */}
            {config.fields.includes('company') && (
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="Your company name"
                />
              </div>
            )}

            {/* Service Type Field (Quote only) */}
            {config.fields.includes('serviceType') && (
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type *
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors",
                    errors.serviceType ? "border-red-500" : "border-gray-300"
                  )}
                >
                  <option value="">Select a service</option>
                  <option value="nfc-apparel">NFC-Enabled Apparel</option>
                  <option value="uv-dtf-decals">UV DTF Decals</option>
                  <option value="both">Both Services</option>
                  <option value="consultation">Consultation Only</option>
                </select>
                {errors.serviceType && <p className="mt-1 text-sm text-red-600">{errors.serviceType}</p>}
              </div>
            )}

            {/* Budget Field (Quote only) */}
            {config.fields.includes('budget') && (
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                >
                  <option value="">Select budget range</option>
                  <option value="under-500">Under $500</option>
                  <option value="500-1000">$500 - $1,000</option>
                  <option value="1000-2500">$1,000 - $2,500</option>
                  <option value="2500-5000">$2,500 - $5,000</option>
                  <option value="over-5000">Over $5,000</option>
                </select>
              </div>
            )}
          </div>

          {/* Message Field */}
          {config.fields.includes('message') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {variant === 'quote' ? 'Project Description *' : 'Message'}
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-y",
                  errors.message ? "border-red-500" : "border-gray-300"
                )}
                placeholder={variant === 'quote' 
                  ? "Tell us about your project, quantity needed, timeline, and any specific requirements..."
                  : "Your message here..."
                }
              />
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth={true}
              loading={isSubmitting}
              className="font-semibold"
            >
              {config.submitText}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};