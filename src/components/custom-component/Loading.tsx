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
      {/* <div className={styles.loadingContent}> */}
        <div className={styles.loadingIcon}></div>
        <h2 className={styles.loadingText}>{message}</h2>
      {/* </div> */}
    </div>
  );
};

export default LoadingOverlay;