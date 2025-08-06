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
    <section id="features" className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeText}>Powerful Features</span>
          </div>
          <h2 className={styles.title}>
            Everything you need to manage
            <span className={styles.highlight}> healthcare operations</span>
          </h2>
          <p className={styles.subtitle}>
            Our comprehensive platform provides all the tools healthcare providers need 
            to deliver exceptional patient care while maintaining the highest security standards.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div 
              key={feature.id} 
              className={styles.featureCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <span className={styles.icon}>{feature.icon}</span>
                </div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
              </div>
              <p className={styles.cardDescription}>{feature.description}</p>
              <ul className={styles.benefitsList}>
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className={styles.benefit}>
                    <span className={styles.checkIcon}>✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className={styles.cardFooter}>
                <button className={styles.learnMoreButton}>
                  Learn More
                  <span className={styles.buttonArrow}>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Healthcare Facilities</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>1M+</div>
              <div className={styles.statLabel}>Patient Records</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>99.99%</div>
              <div className={styles.statLabel}>System Uptime</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;