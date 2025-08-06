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
    <section className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textSection}>
            <div className={styles.badge}>
              <span className={styles.badgeText}>Ready to Get Started?</span>
            </div>
            <h2 className={styles.title}>
              Transform your healthcare
              <span className={styles.highlight}> operations today</span>
            </h2>
            <p className={styles.subtitle}>
              Join thousands of healthcare providers who trust MedPortal to manage 
              their operations securely and efficiently. Start your free trial today.
            </p>
            
            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>30-day free trial</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>No credit card required</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>24/7 support included</span>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button 
                className={styles.primaryButton}
                onClick={handleGetStarted}
              >
                Start Free Trial
                <span className={styles.buttonIcon}>→</span>
              </button>
              <button 
                className={styles.secondaryButton}
                onClick={handleScheduleDemo}
              >
                Schedule Demo
              </button>
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <h3 className={styles.formTitle}>Get Early Access</h3>
                <p className={styles.formSubtitle}>
                  Be the first to know about new features and updates
                </p>
              </div>
              
              <form className={styles.emailForm} onSubmit={handleEmailSubmit}>
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className={styles.emailInput}
                    required
                    disabled={isSubmitting}
                  />
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isSubmitting || !email.trim()}
                  >
                    {isSubmitting ? (
                      <span className={styles.spinner}></span>
                    ) : (
                      'Get Access'
                    )}
                  </button>
                </div>
                <p className={styles.disclaimer}>
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>

              <div className={styles.socialProof}>
                <div className={styles.testimonial}>
                  <div className={styles.quote}>
                    "MedPortal has revolutionized how we manage patient care. 
                    The security and ease of use are unmatched."
                  </div>
                  <div className={styles.author}>
                    <div className={styles.authorAvatar}>👨‍⚕️</div>
                    <div className={styles.authorInfo}>
                      <div className={styles.authorName}>Dr. Sarah Johnson</div>
                      <div className={styles.authorTitle}>Chief Medical Officer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.trustIndicators}>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>🔒</span>
            <span className={styles.trustText}>HIPAA Compliant</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>🏆</span>
            <span className={styles.trustText}>SOC 2 Certified</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>🌟</span>
            <span className={styles.trustText}>99.9% Uptime SLA</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>🚀</span>
            <span className={styles.trustText}>Enterprise Ready</span>
          </div>
        </div>
      </div>
      
      <div className={styles.backgroundElements}>
        <div className={styles.gradient1}></div>
        <div className={styles.gradient2}></div>
        <div className={styles.pattern}></div>
      </div>
    </section>
  );
};

export default CallToActionSection;