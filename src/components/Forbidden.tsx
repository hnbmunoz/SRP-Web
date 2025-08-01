import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Forbidden.module.scss';

const Forbidden: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [statusMessage, setStatusMessage] = useState('Access Denied - Authentication Required');

  // Cycling status messages
  useEffect(() => {
    const messages = [
      'Access Denied - Authentication Required',
      'Checking User Permissions...',
      'Verifying Security Credentials...',
      'Please Sign In to Continue',
      'Contact Administrator if Issue Persists'
    ];

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setStatusMessage(messages[messageIndex]);
    }, 3000);

    return () => clearInterval(messageInterval);
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleLogin = () => {
    // Navigate to login page or trigger login modal
    navigate('/login');
  };


  const currentPath = location.pathname;

  return (
    <div className={styles.forbiddenContainer}>
      {/* Illustration/Icon */}
      <div className={styles.illustration}>
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
            fill="#DC3545"
            opacity="0.3"
          />
          <path
            d="M15.73 3L3 15.73c-.55.55-.55 1.45 0 2s1.45.55 2 0L17.73 5c.55-.55.55-1.45 0-2s-1.45-.55-2 0z"
            fill="#DC3545"
          />
          <path
            d="M5 3.27L3.27 5 12 13.73 20.73 5 19 3.27 12 10.27 5 3.27z"
            fill="#DC3545"
          />
        </svg>
      </div>

      {/* Error Code */}
      <h1 className={styles.errorCode}>403</h1>

      {/* Title and Description */}
      <h2 className={styles.title}>Access Forbidden</h2>
      <p className={styles.subtitle}>
        You don't have permission to access this resource. This could be due to insufficient privileges or authentication requirements.
        {currentPath && (
          <>
            <br />
            <strong>Requested path:</strong> <code>{currentPath}</code>
          </>
        )}
      </p>

      {/* Status Message */}
      <div className={styles.statusMessage}>
        <div className={styles.statusIndicator}>
          <div className={styles.statusDot}></div>
          <div className={styles.statusDot}></div>
          <div className={styles.statusDot}></div>
        </div>
        <p className={styles.statusText}>{statusMessage}</p>
      </div>

      {/* Action Buttons */}
      <div className={styles.buttonGroup}>
        <button onClick={handleLogin} className={styles.primaryButton}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H5V21H19V9Z"/>
          </svg>
          Sign In
        </button>
        <button onClick={handleGoHome} className={styles.secondaryButton}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          Go Home
        </button>
        <button onClick={handleGoBack} className={styles.tertiaryButton}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Go Back
        </button>
      </div>

      {/* Help Text */}
      <div className={styles.helpText}>
        <strong>Need access?</strong> If you believe you should have access to this resource, please contact your administrator or try signing in with appropriate credentials. Common causes include expired sessions or insufficient user permissions.
      </div>

      {/* Additional Info */}
      <div className={styles.infoBox}>
        <h3>Possible Solutions:</h3>
        <ul>
          <li>Sign in with an authorized account</li>
          <li>Contact your system administrator</li>
          <li>Check if your session has expired</li>
          <li>Verify you have the required permissions</li>
        </ul>
      </div>
    </div>
  );
};

export default Forbidden;