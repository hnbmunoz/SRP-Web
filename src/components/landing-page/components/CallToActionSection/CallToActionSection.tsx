import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CallToActionSection.module.scss';

const CallToActionSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, just show success and redirect
    alert('Thank you for your interest! Redirecting to login...');
    navigate('/');
    
    setIsSubmitting(false);
  };

  const handleGetStarted = () => {
    navigate('/');
  };

  const handleScheduleDemo = () => {
    // In a real app, this would open a calendar booking system
    alert('Demo scheduling would be implemented here');
  };

  return (
    <section className={styles.cta} aria-labelledby="cta-title">
      <div className={styles.container}>
        <div className={styles.content}>
          <header className={styles.textSection}>
            <div className={styles.badge}>
              <span className={styles.badgeText}>Ready to Get Started?</span>
            </div>
            <h2 id="cta-title" className={styles.title}>
              Transform your healthcare
              <span className={styles.highlight}> operations today</span>
            </h2>
            <p className={styles.subtitle}>
              Join thousands of healthcare providers who trust MedPortal to manage
              their operations securely and efficiently. Start your free trial today.
            </p>
            
            <ul className={styles.features} aria-label="Trial benefits">
              <li className={styles.feature}>
                <span className={styles.featureIcon} aria-hidden="true">✓</span>
                <span>30-day free trial</span>
              </li>
              <li className={styles.feature}>
                <span className={styles.featureIcon} aria-hidden="true">✓</span>
                <span>No credit card required</span>
              </li>
              <li className={styles.feature}>
                <span className={styles.featureIcon} aria-hidden="true">✓</span>
                <span>24/7 support included</span>
              </li>
            </ul>

            <nav className={styles.actionButtons} aria-label="Call to action buttons">
              <button
                className={styles.primaryButton}
                onClick={handleGetStarted}
                aria-label="Start your free trial with MedPortal"
              >
                Start Free Trial
                <span className={styles.buttonIcon} aria-hidden="true">→</span>
              </button>
              <button
                className={styles.secondaryButton}
                onClick={handleScheduleDemo}
                aria-label="Schedule a product demonstration"
              >
                Schedule Demo
              </button>
            </nav>
          </header>

          <aside className={styles.formSection} aria-labelledby="early-access-title">
            <div className={styles.formCard}>
              <header className={styles.formHeader}>
                <h3 id="early-access-title" className={styles.formTitle}>Get Early Access</h3>
                <p className={styles.formSubtitle}>
                  Be the first to know about new features and updates
                </p>
              </header>
              
              <form
                className={styles.emailForm}
                onSubmit={handleEmailSubmit}
                aria-labelledby="early-access-title"
              >
                <div className={styles.inputGroup}>
                  <label htmlFor="email-signup" className="sr-only">
                    Email address for early access signup
                  </label>
                  <input
                    id="email-signup"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className={styles.emailInput}
                    required
                    disabled={isSubmitting}
                    aria-describedby="email-disclaimer"
                  />
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting || !email.trim()}
                    aria-label={isSubmitting ? "Submitting email signup" : "Submit email for early access"}
                  >
                    {isSubmitting ? (
                      <span className={styles.spinner} aria-label="Loading"></span>
                    ) : (
                      'Get Access'
                    )}
                  </button>
                </div>
                <p id="email-disclaimer" className={styles.disclaimer}>
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>

              <div className={styles.socialProof}>
                <figure className={styles.testimonial}>
                  <blockquote className={styles.quote}>
                    "MedPortal has revolutionized how we manage patient care.
                    The security and ease of use are unmatched."
                  </blockquote>
                  <figcaption className={styles.author}>
                    <div className={styles.authorAvatar} role="img" aria-label="Doctor avatar">👨‍⚕️</div>
                    <div className={styles.authorInfo}>
                      <cite className={styles.authorName}>Dr. Sarah Johnson</cite>
                      <div className={styles.authorTitle}>Chief Medical Officer</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
          </aside>
        </div>

        <footer className={styles.trustIndicators} aria-label="Security and compliance certifications">
          <div className={styles.trustItem} role="img" aria-label="HIPAA Compliant certification">
            <span className={styles.trustIcon} aria-hidden="true">🔒</span>
            <span className={styles.trustText}>HIPAA Compliant</span>
          </div>
          <div className={styles.trustItem} role="img" aria-label="SOC 2 Certified">
            <span className={styles.trustIcon} aria-hidden="true">🏆</span>
            <span className={styles.trustText}>SOC 2 Certified</span>
          </div>
          <div className={styles.trustItem} role="img" aria-label="99.9% Uptime Service Level Agreement">
            <span className={styles.trustIcon} aria-hidden="true">🌟</span>
            <span className={styles.trustText}>99.9% Uptime SLA</span>
          </div>
          <div className={styles.trustItem} role="img" aria-label="Enterprise Ready solution">
            <span className={styles.trustIcon} aria-hidden="true">🚀</span>
            <span className={styles.trustText}>Enterprise Ready</span>
          </div>
        </footer>
      </div>
      
      <div className={styles.backgroundElements} aria-hidden="true">
        <div className={styles.gradient1}></div>
        <div className={styles.gradient2}></div>
        <div className={styles.pattern}></div>
      </div>
    </section>
  );
};

export default CallToActionSection;