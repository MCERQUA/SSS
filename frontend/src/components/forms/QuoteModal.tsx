'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from '@/contexts/ModalContext';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/**
 * QuoteModal Component for Sweat Shop Swag
 * 
 * Modal popup quote form with Netlify integration
 * Features modern design, smooth animations, and mobile responsive layout
 * Supports pre-filled data from context
 * 
 * @component
 * @example
 * // Modal opens via context - no direct usage needed
 * const { openModal } = useModal();
 * openModal('quote', { serviceType: 'nfc-apparel', quantity: 50 });
 */

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceType: string;
  projectType: string;
  quantity: string;
  budget: string;
  timeline: string;
  message: string;
}

export const QuoteModal: React.FC = () => {
  const { modal, closeModal, isModalOpen } = useModal();
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: '',
    projectType: '',
    quantity: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<QuoteFormData>>({});

  // Pre-fill form data when modal opens with data
  useEffect(() => {
    if (modal.isOpen && modal.type === 'quote' && modal.data) {
      const { serviceType, productName, quantity, message } = modal.data;
      
      setFormData(prev => ({
        ...prev,
        serviceType: serviceType || prev.serviceType,
        quantity: quantity ? quantity.toString() : prev.quantity,
        message: message || (productName ? `I'm interested in: ${productName}` : prev.message)
      }));
    }
  }, [modal]);

  // Reset form when modal closes
  useEffect(() => {
    if (!modal.isOpen) {
      setIsSuccess(false);
      setErrors({});
      // Reset form data after animation completes
      setTimeout(() => {
        setFormData({
          name: '', email: '', phone: '', company: '',
          serviceType: '', projectType: '', quantity: '',
          budget: '', timeline: '', message: ''
        });
      }, 300);
    }
  }, [modal.isOpen]);

  // Validation
  const validateForm = (): boolean => {
    const newErrors: Partial<QuoteFormData> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.serviceType) newErrors.serviceType = 'Please select a service type';
    if (!formData.message.trim()) newErrors.message = 'Project description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Create form data for Netlify
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('form-name', 'sweatshopswag-quote-modal');
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSubmit.append(key, value);
      });

      const response = await fetch('/', {
        method: 'POST',
        body: formDataToSubmit
      });
      
      if (response.ok) {
        setIsSuccess(true);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof QuoteFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!isModalOpen('quote')) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop with blur effect */}
      <div 
        className={cn(
          "absolute inset-0 transition-all duration-300",
          "bg-black/60 backdrop-blur-sm",
          modal.isOpen ? "opacity-100" : "opacity-0"
        )}
      />
      
      {/* Modal Container */}
      <div 
        className={cn(
          "relative w-full max-w-2xl max-h-[90vh] overflow-y-auto",
          "bg-white rounded-2xl shadow-2xl",
          "transform transition-all duration-300",
          modal.isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        {/* Hidden form for Netlify detection */}
        <form name="sweatshopswag-quote-modal" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="tel" name="phone" />
          <input type="text" name="company" />
          <input type="text" name="serviceType" />
          <input type="text" name="projectType" />
          <input type="text" name="quantity" />
          <input type="text" name="budget" />
          <input type="text" name="timeline" />
          <textarea name="message"></textarea>
        </form>

        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl">
          <button 
            onClick={closeModal}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="pr-10">
            <h2 className="text-2xl font-bold mb-2">Get Your Custom Quote</h2>
            <p className="text-red-100">
              Tell us about your project and we&apos;ll provide a personalized quote for NFC merchandise or UV DTF decals.
            </p>
          </div>
        </div>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Quote Request Sent!</h3>
            <p className="text-gray-700 mb-6">
              We&apos;ve received your quote request and will get back to you within 24 hours with a detailed proposal.
            </p>
            <div className="space-y-3">
              <Button 
                variant="primary" 
                onClick={() => setIsSuccess(false)}
                className="mr-3"
              >
                Send Another Quote
              </Button>
              <Button 
                variant="outline" 
                onClick={closeModal}
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
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

                <div>
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

                <div>
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

                <div>
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
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  >
                    <option value="">Select project type</option>
                    <option value="promotional">Promotional Materials</option>
                    <option value="merchandise">Company Merchandise</option>
                    <option value="event">Event Swag</option>
                    <option value="retail">Retail Products</option>
                    <option value="custom">Custom Project</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Quantity
                  </label>
                  <select
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  >
                    <option value="">Select quantity range</option>
                    <option value="1-25">1-25 pieces</option>
                    <option value="26-50">26-50 pieces</option>
                    <option value="51-100">51-100 pieces</option>
                    <option value="101-250">101-250 pieces</option>
                    <option value="251-500">251-500 pieces</option>
                    <option value="500+">500+ pieces</option>
                  </select>
                </div>

                <div>
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeline
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                >
                  <option value="">Select your timeline</option>
                  <option value="asap">ASAP (Rush order)</option>
                  <option value="1-week">Within 1 week</option>
                  <option value="2-weeks">Within 2 weeks</option>
                  <option value="1-month">Within 1 month</option>
                  <option value="flexible">Flexible timeline</option>
                </select>
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description *
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-y",
                    errors.message ? "border-red-500" : "border-gray-300"
                  )}
                  placeholder="Please describe your project, including design requirements, NFC functionality needed, quantity details, and any special considerations..."
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth={true}
                  loading={isSubmitting}
                  className="font-semibold"
                >
                  {isSubmitting ? 'Sending Quote Request...' : 'Get My Custom Quote'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={closeModal}
                  className="sm:w-auto"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default QuoteModal;