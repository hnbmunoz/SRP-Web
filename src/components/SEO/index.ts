export { default as SEOHead } from './SEOHead';
export type { SEOProps } from './SEOHead';

// Export common structured data schemas for reuse
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MedPortal",
  "url": "https://medportal.com",
  "logo": "https://medportal.com/medical-logo.svg",
  "description": "Comprehensive healthcare management system providing HIPAA compliant patient records, appointment scheduling, telemedicine, and analytics for healthcare providers.",
  "foundingDate": "2024",
  "industry": "Healthcare Technology",
  "serviceType": "Healthcare Management Software",
  "areaServed": "Global",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-800-MEDPORTAL",
    "contactType": "Customer Service",
    "availableLanguage": ["English", "Spanish"],
    "hoursAvailable": "Mo-Fr 09:00-17:00"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US",
    "addressRegion": "CA",
    "addressLocality": "San Francisco"
  },
  "sameAs": [
    "https://twitter.com/medportal",
    "https://linkedin.com/company/medportal",
    "https://facebook.com/medportal"
  ]
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "MedPortal Healthcare Management System",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "description": "Comprehensive healthcare management platform for medical practices",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free trial available"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1250",
    "bestRating": "5",
    "worstRating": "1"
  },
  "featureList": [
    "HIPAA Compliant Patient Records",
    "Appointment Scheduling",
    "Telemedicine Integration",
    "Medical Analytics",
    "Billing Management"
  ]
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is MedPortal HIPAA compliant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, MedPortal is fully HIPAA compliant with enterprise-grade security, encryption, and access controls to protect patient health information."
      }
    },
    {
      "@type": "Question",
      "name": "What features does MedPortal include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MedPortal includes patient record management, appointment scheduling, telemedicine capabilities, billing integration, analytics dashboard, and mobile access."
      }
    },
    {
      "@type": "Question",
      "name": "How secure is patient data in MedPortal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MedPortal uses enterprise-grade encryption, secure data centers, regular security audits, and follows all HIPAA compliance requirements to ensure maximum data security."
      }
    },
    {
      "@type": "Question",
      "name": "Can MedPortal integrate with existing systems?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, MedPortal offers comprehensive API integration capabilities and can connect with most existing healthcare systems, EHRs, and practice management software."
      }
    }
  ]
};