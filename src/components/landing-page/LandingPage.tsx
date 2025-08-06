import React from 'react';
import HeroSection from './components/HeroSection/HeroSection';
import FeaturesSection from './components/FeaturesSection/FeaturesSection';
import CallToActionSection from './components/CallToActionSection/CallToActionSection';
import styles from './LandingPage.module.scss';

const LandingPage: React.FC = () => {
  return (
    <div className={styles.landingPage}>
      <HeroSection />
      <FeaturesSection />
      <CallToActionSection />
    </div>
  );
};

export default LandingPage;