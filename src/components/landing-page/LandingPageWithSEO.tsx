import React from 'react';
import { SEOHead, organizationSchema, softwareApplicationSchema, faqSchema } from '../SEO';
import HeroSection from './components/HeroSection/HeroSection';
import FeaturesSection from './components/FeaturesSection/FeaturesSection';
import CallToActionSection from './components/CallToActionSection/CallToActionSection';
import styles from './LandingPage.module.scss';

interface LandingPageProps {
  variant?: 'default' | 'software' | 'healthcare' | 'demo';
}

const LandingPageWithSEO: React.FC<LandingPageProps> = ({ variant = 'default' }) => {
  // SEO content variations based on landing page variant
  const seoContent = {
    default: {
      title: "MedPortal - Secure Healthcare Management System | HIPAA Compliant",
      description: "Transform your medical practice with MedPortal's secure, HIPAA-compliant healthcare management system. Manage patients, appointments, and records efficiently with 99.9% uptime.",
      keywords: "healthcare management system, medical software, HIPAA compliant, patient records, appointment scheduling, telemedicine, medical analytics, healthcare providers, electronic health records, EHR",
      canonicalUrl: "https://medportal.com",
      structuredData: [organizationSchema, softwareApplicationSchema, faqSchema]
    },
    software: {
      title: "Healthcare Management Software | Medical Practice Solutions | MedPortal",
      description: "Comprehensive healthcare management software for medical practices. HIPAA compliant patient records, scheduling, billing, and telemedicine in one secure platform.",
      keywords: "healthcare management software, medical practice software, clinic management system, healthcare technology, medical software solutions, practice management",
      canonicalUrl: "https://medportal.com/healthcare-software",
      structuredData: [organizationSchema, softwareApplicationSchema]
    },
    healthcare: {
      title: "Healthcare Provider Solutions | Medical Practice Management | MedPortal",
      description: "Streamline healthcare operations with MedPortal's comprehensive medical management platform. Trusted by 10,000+ healthcare providers worldwide.",
      keywords: "healthcare provider solutions, medical practice management, healthcare operations, medical workflow, healthcare efficiency, provider software",
      canonicalUrl: "https://medportal.com/healthcare-providers",
      structuredData: [organizationSchema, softwareApplicationSchema]
    },
    demo: {
      title: "MedPortal Demo - See Healthcare Management System in Action",
      description: "Experience MedPortal's healthcare management system with our interactive demo. See how we help medical practices improve efficiency and patient care.",
      keywords: "healthcare software demo, medical software trial, practice management demo, healthcare system preview, medical software demonstration",
      canonicalUrl: "https://medportal.com/demo",
      structuredData: [organizationSchema, softwareApplicationSchema]
    }
  };

  const currentSEO = seoContent[variant];

  // Enhanced structured data with combined schemas
  const combinedStructuredData = {
    "@context": "https://schema.org",
    "@graph": currentSEO.structuredData
  };

  return (
    <>
      <SEOHead
        title={currentSEO.title}
        description={currentSEO.description}
        keywords={currentSEO.keywords}
        canonicalUrl={currentSEO.canonicalUrl}
        ogImage="https://medportal.com/images/og-landing-page.jpg"
        ogImageAlt="MedPortal healthcare management system dashboard showing patient records, appointment scheduling, and medical analytics"
        twitterImage="https://medportal.com/images/twitter-landing-page.jpg"
        structuredData={combinedStructuredData}
      />
      
      <main className={styles.landingPage} role="main">
        {/* Enhanced semantic structure with proper headings */}
        <header>
          <HeroSection />
        </header>
        
        <section id="features" aria-labelledby="features-heading">
          <FeaturesSection />
        </section>
        
        <section id="cta" aria-labelledby="cta-heading">
          <CallToActionSection />
        </section>
        
        {/* FAQ Section for better SEO */}
        <section id="faq" aria-labelledby="faq-heading" className={styles.faqSection}>
          <div className={styles.container}>
            <header>
              <h2 id="faq-heading" className={styles.sectionTitle}>
                Frequently Asked Questions
              </h2>
              <p className={styles.sectionSubtitle}>
                Get answers to common questions about MedPortal's healthcare management system
              </p>
            </header>
            
            <div className={styles.faqGrid}>
              <article className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>Is MedPortal HIPAA compliant?</h3>
                <p className={styles.faqAnswer}>
                  Yes, MedPortal is fully HIPAA compliant with enterprise-grade security, 
                  encryption, and access controls to protect patient health information. 
                  We undergo regular security audits and maintain strict compliance standards.
                </p>
              </article>
              
              <article className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>What features does MedPortal include?</h3>
                <p className={styles.faqAnswer}>
                  MedPortal includes patient record management, appointment scheduling, 
                  telemedicine capabilities, billing integration, analytics dashboard, 
                  mobile access, and comprehensive reporting tools.
                </p>
              </article>
              
              <article className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>How secure is patient data in MedPortal?</h3>
                <p className={styles.faqAnswer}>
                  MedPortal uses enterprise-grade encryption, secure data centers, 
                  regular security audits, and follows all HIPAA compliance requirements 
                  to ensure maximum data security with 99.9% uptime guarantee.
                </p>
              </article>
              
              <article className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>Can MedPortal integrate with existing systems?</h3>
                <p className={styles.faqAnswer}>
                  Yes, MedPortal offers comprehensive API integration capabilities and 
                  can connect with most existing healthcare systems, EHRs, and practice 
                  management software for seamless workflow integration.
                </p>
              </article>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section for social proof and SEO */}
        <section id="testimonials" aria-labelledby="testimonials-heading" className={styles.testimonialsSection}>
          <div className={styles.container}>
            <header>
              <h2 id="testimonials-heading" className={styles.sectionTitle}>
                Trusted by Healthcare Professionals
              </h2>
              <p className={styles.sectionSubtitle}>
                See what medical professionals say about MedPortal
              </p>
            </header>
            
            <div className={styles.testimonialsGrid}>
              <blockquote className={styles.testimonial}>
                <p className={styles.testimonialText}>
                  "MedPortal has transformed our practice efficiency. The HIPAA-compliant 
                  system gives us peace of mind while the intuitive interface saves us hours daily."
                </p>
                <footer className={styles.testimonialAuthor}>
                  <cite>Dr. Sarah Johnson, Family Medicine</cite>
                </footer>
              </blockquote>
              
              <blockquote className={styles.testimonial}>
                <p className={styles.testimonialText}>
                  "The appointment scheduling and patient management features are outstanding. 
                  Our patient satisfaction has increased significantly since implementing MedPortal."
                </p>
                <footer className={styles.testimonialAuthor}>
                  <cite>Dr. Michael Chen, Internal Medicine</cite>
                </footer>
              </blockquote>
              
              <blockquote className={styles.testimonial}>
                <p className={styles.testimonialText}>
                  "As a healthcare administrator, I appreciate the comprehensive analytics 
                  and reporting. MedPortal helps us make data-driven decisions for better patient care."
                </p>
                <footer className={styles.testimonialAuthor}>
                  <cite>Lisa Rodriguez, Healthcare Administrator</cite>
                </footer>
              </blockquote>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default LandingPageWithSEO;