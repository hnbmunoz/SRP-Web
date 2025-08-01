import React from 'react';
import styles from './LoadingOverlay.module.scss';

interface LoadingOverlayProps {
  message?: string;
  isVisible?: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = "Loading...",
  isVisible = true
}) => {
  if (!isVisible) return null;

  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingContent}>
        <div className={styles.logoContainer}>
          <div className={styles.medicalLogo}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="80" height="80">
              <defs>
                <linearGradient id="medicalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:"#40E0D0", stopOpacity:1}} />
                  <stop offset="50%" style={{stopColor:"#48BB78", stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:"#38A169", stopOpacity:1}} />
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
                </filter>
              </defs>
              
              <circle cx="32" cy="32" r="30" fill="url(#medicalGradient)" filter="url(#shadow)"/>
              
              <path d="M20 15 Q15 20 15 25 Q15 35 25 40 Q30 42 35 40 Q45 35 45 25 Q45 20 40 15"
                    stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
              
              <circle cx="20" cy="15" r="3" fill="white"/>
              <circle cx="40" cy="15" r="3" fill="white"/>
              
              <circle cx="30" cy="45" r="8" fill="white" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
              <circle cx="30" cy="45" r="5" fill="none" stroke="url(#medicalGradient)" strokeWidth="2"/>
              
              <path d="M30 37 Q30 40 30 42" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              
              <g transform="translate(30,45)">
                <rect x="-1.5" y="-4" width="3" height="8" fill="url(#medicalGradient)" rx="1"/>
                <rect x="-4" y="-1.5" width="8" height="3" fill="url(#medicalGradient)" rx="1"/>
              </g>
            </svg>
          </div>
          <div className={styles.pulseRings}>
            <div className={styles.pulseRing}></div>
            <div className={styles.pulseRing}></div>
            <div className={styles.pulseRing}></div>
          </div>
        </div>
        
        <div className={styles.loadingSpinner}>
          <div className={styles.spinnerDot}></div>
          <div className={styles.spinnerDot}></div>
          <div className={styles.spinnerDot}></div>
        </div>
        
        <h2 className={styles.loadingText}>{message}</h2>
        <p className={styles.loadingSubtext}>Please wait while we prepare your medical dashboard</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;