import React from 'react';

interface ContactInfo {
  icon: string;
  title: string;
  content: string | React.ReactNode;
}

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  contactInfo?: ContactInfo[];
  className?: string;
}

const defaultContactInfo: ContactInfo[] = [
  {
    icon: '📍',
    title: 'Location',
    content: (
      <>
        91 Peelar Road<br />
        Concord, Ontario<br />
        Canada
      </>
    ),
  },
  {
    icon: '📞',
    title: 'Phone',
    content: (
      <a href="tel:+16476991930" className="hover:text-red-600 transition-colors">
        +1 (647) 699-1930
      </a>
    ),
  },
  {
    icon: '⏰',
    title: 'Hours',
    content: (
      <>
        Monday - Friday<br />
        9:00 AM - 5:00 PM EST
      </>
    ),
  },
];

/**
 * ContactSection Component
 * 
 * A reusable component for displaying contact information in a grid layout.
 * Features modern design with animated icons and hover effects.
 * 
 * @param title - Section title (default: "Get In Touch")
 * @param subtitle - Optional subtitle text
 * @param contactInfo - Array of contact information items
 * @param className - Additional CSS classes
 * 
 * Usage:
 * ```tsx
 * <ContactSection />
 * <ContactSection title="Contact Us" subtitle="We'd love to hear from you" />
 * ```
 */
export const ContactSection: React.FC<ContactSectionProps> = ({
  title = "Get In Touch",
  subtitle,
  contactInfo = defaultContactInfo,
  className = "",
}) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            {title}
          </h2>
          
          {subtitle && (
            <p className="text-lg text-gray-600 mb-8">
              {subtitle}
            </p>
          )}
          
          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-700 transition-colors duration-300">
                  <span className="text-white font-bold text-xl">
                    {info.icon}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">
                  {info.title}
                </h3>
                <div className="text-gray-600">
                  {info.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;