import React from 'react';
import HeroSection from './components/HeroSection/HeroSection';
import FeaturesSection from './components/FeaturesSection/FeaturesSection';
import CallToActionSection from './components/CallToActionSection/CallToActionSection';
import styles from './LandingPage.module.scss';

const LandingPage: React.FC = () => {
  return (
    <main className={styles.landingPage} role="main">
      <HeroSection />
      <FeaturesSection />
      <CallToActionSection />
    </main>
  );
};

export default LandingPage;