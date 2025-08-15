import React from 'react';
import styles from './FeaturesSection.module.scss';

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  benefits: string[];
}

const features: Feature[] = [
  {
    id: 'patient-management',
    icon: '👥',
    title: 'Patient Management',
    description: 'Comprehensive patient record management with secure data storage and easy access.',
    benefits: ['Digital health records', 'Patient history tracking', 'Secure data encryption']
  },
  {
    id: 'appointment-scheduling',
    icon: '📅',
    title: 'Smart Scheduling',
    description: 'Intelligent appointment scheduling system with automated reminders and calendar integration.',
    benefits: ['Automated reminders', 'Calendar sync', 'Resource optimization']
  },
  {
    id: 'analytics-reporting',
    icon: '📊',
    title: 'Analytics & Reporting',
    description: 'Advanced analytics and reporting tools to track performance and improve patient outcomes.',
    benefits: ['Real-time dashboards', 'Custom reports', 'Performance metrics']
  },
  {
    id: 'telemedicine',
    icon: '💻',
    title: 'Telemedicine',
    description: 'Secure video consultations and remote patient monitoring capabilities.',
    benefits: ['HD video calls', 'Screen sharing', 'Remote monitoring']
  },
  {
    id: 'billing-insurance',
    icon: '💳',
    title: 'Billing & Insurance',
    description: 'Streamlined billing processes with insurance claim management and payment tracking.',
    benefits: ['Automated billing', 'Insurance integration', 'Payment tracking']
  },
  {
    id: 'compliance-security',
    icon: '🔒',
    title: 'HIPAA Compliance',
    description: 'Enterprise-grade security with full HIPAA compliance and data protection.',
    benefits: ['HIPAA compliant', 'Data encryption', 'Audit trails']
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className={styles.features} aria-labelledby="features-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeText}>Powerful Features</span>
          </div>
          <h2 id="features-title" className={styles.title}>
            Everything you need to manage
            <span className={styles.highlight}> healthcare operations</span>
          </h2>
          <p className={styles.subtitle}>
            Our comprehensive platform provides all the tools healthcare providers need
            to deliver exceptional patient care while maintaining the highest security standards.
          </p>
        </header>

        <div className={styles.featuresGrid} role="list" aria-label="Healthcare management features">
          {features.map((feature, index) => (
            <article
              key={feature.id}
              className={styles.featureCard}
              style={{ animationDelay: `${index * 0.1}s` }}
              role="listitem"
              aria-labelledby={`feature-${feature.id}-title`}
            >
              <header className={styles.cardHeader}>
                <div className={styles.iconWrapper} role="img" aria-label={`${feature.title} feature icon`}>
                  <span className={styles.icon} aria-hidden="true">{feature.icon}</span>
                </div>
                <h3 id={`feature-${feature.id}-title`} className={styles.cardTitle}>{feature.title}</h3>
              </header>
              <p className={styles.cardDescription}>{feature.description}</p>
              <ul className={styles.benefitsList} aria-label={`${feature.title} benefits`}>
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className={styles.benefit}>
                    <span className={styles.checkIcon} aria-hidden="true">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <footer className={styles.cardFooter}>
                <button
                  className={styles.learnMoreButton}
                  aria-label={`Learn more about ${feature.title}`}
                >
                  Learn More
                  <span className={styles.buttonArrow} aria-hidden="true">→</span>
                </button>
              </footer>
            </article>
          ))}
        </div>

        <aside className={styles.statsSection} aria-labelledby="stats-title">
          <h3 id="stats-title" className="sr-only">Platform Statistics</h3>
          <div className={styles.statsGrid} role="list" aria-label="Key platform metrics">
            <div className={styles.statItem} role="listitem">
              <div className={styles.statNumber} aria-label="500 plus">500+</div>
              <div className={styles.statLabel}>Healthcare Facilities</div>
            </div>
            <div className={styles.statItem} role="listitem">
              <div className={styles.statNumber} aria-label="1 million plus">1M+</div>
              <div className={styles.statLabel}>Patient Records</div>
            </div>
            <div className={styles.statItem} role="listitem">
              <div className={styles.statNumber} aria-label="99.99 percent">99.99%</div>
              <div className={styles.statLabel}>System Uptime</div>
            </div>
            <div className={styles.statItem} role="listitem">
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Support Available</div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default FeaturesSection;