import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeroSection.module.scss';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/');
  };

  const handleLearnMore = () => {
    // Smooth scroll to features section
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.container}>
        <div className={styles.content}>
          <header className={styles.textContent}>
            <div className={styles.badge}>
              <span className={styles.badgeText}>Trusted Healthcare Platform</span>
            </div>
            <h1 id="hero-title" className={styles.title}>
              Secure Healthcare
              <span className={styles.highlight}> Management System</span>
            </h1>
            <p className={styles.subtitle}>
              Streamline your healthcare operations with our comprehensive medical portal.
              Manage patient records, appointments, and medical data with enterprise-grade security.
            </p>
            <nav className={styles.buttonGroup} aria-label="Primary actions">
              <button
                className={styles.primaryButton}
                onClick={handleGetStarted}
                aria-label="Get started with MedPortal healthcare management system"
              >
                Get Started
                <span className={styles.buttonIcon} aria-hidden="true">→</span>
              </button>
              <button
                className={styles.secondaryButton}
                onClick={handleLearnMore}
                aria-label="Learn more about our features"
              >
                Learn More
              </button>
            </nav>
            <aside className={styles.stats} aria-label="Key statistics">
              <div className={styles.stat}>
                <span className={styles.statNumber} aria-label="10,000 plus">10K+</span>
                <span className={styles.statLabel}>Healthcare Providers</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber} aria-label="99.9 percent">99.9%</span>
                <span className={styles.statLabel}>Uptime</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>HIPAA</span>
                <span className={styles.statLabel}>Compliant</span>
              </div>
            </aside>
          </header>
          <div className={styles.visualContent}>
            <figure className={styles.heroImage} aria-label="Healthcare management dashboard preview">
              <div className={styles.medicalIcon} role="img" aria-label="Medical cross and checkmark icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" opacity="0.7"/>
                </svg>
              </div>
              <div className={styles.floatingCard} role="img" aria-label="Sample patient dashboard showing 95% health score">
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon} aria-hidden="true">📊</div>
                  <span>Patient Dashboard</span>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.progressBar} role="progressbar" aria-valuenow={95} aria-valuemin={0} aria-valuemax={100} aria-label="Health score progress">
                    <div className={styles.progress}></div>
                  </div>
                  <span className={styles.cardText}>Health Score: 95%</span>
                </div>
              </div>
            </figure>
          </div>
        </div>
      </div>
      <div className={styles.backgroundElements} aria-hidden="true">
        <div className={styles.gradient1}></div>
        <div className={styles.gradient2}></div>
        <div className={styles.dots}></div>
      </div>
    </section>
  );
};

export default HeroSection;