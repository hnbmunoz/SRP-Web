import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [countdown, setCountdown] = useState(10);
  const [isAutoRedirect, setIsAutoRedirect] = useState(true);

  // Auto-redirect countdown
  useEffect(() => {
    if (!isAutoRedirect) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, isAutoRedirect]);

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

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // In a real app, you might search through your routes or content
      // For now, we'll just redirect to home with a search parameter
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const stopAutoRedirect = () => {
    setIsAutoRedirect(false);
  };

  const currentPath = location.pathname;

  return (
    <div className={styles.notFoundContainer}>
      {/* Illustration/Icon */}
      <div className={styles.illustration}>
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            fill="#007BBA"
            opacity="0.3"
          />
          <path
            d="M12 7c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1V8c0-.55.45-1 1-1zm0 8c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"
            fill="#007BBA"
          />
        </svg>
      </div>

      {/* Error Code */}
      <h1 className={styles.errorCode}>404</h1>

      {/* Title and Description */}
      <h2 className={styles.title}>Oops! Page Not Found</h2>
      <p className={styles.subtitle}>
        The page you're looking for doesn't exist or has been moved.
        {currentPath && (
          <>
            <br />
            <strong>Requested path:</strong> <code>{currentPath}</code>
          </>
        )}
      </p>

      {/* Auto-redirect notice */}
      {isAutoRedirect && (
        <div className={styles.helpText}>
          <strong>Auto-redirecting to home in {countdown} seconds...</strong>
          <br />
          <button 
            onClick={stopAutoRedirect}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#007BBA', 
              textDecoration: 'underline', 
              cursor: 'pointer',
              fontSize: '0.9rem',
              marginTop: '0.5rem'
            }}
          >
            Cancel auto-redirect
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className={styles.buttonGroup}>
        <button onClick={handleGoHome} className={styles.primaryButton}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          Go Home
        </button>
        <button onClick={handleGoBack} className={styles.secondaryButton}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Go Back
        </button>
      </div>

      {/* Search Section */}
      <div className={styles.searchContainer}>
        <h3 style={{ color: '#2E2E2E', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
          Looking for something specific?
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
          <input
            type="text"
            placeholder="Search for pages or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className={styles.searchInput}
          />
          <button onClick={handleSearch} className={styles.searchButton}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Help Text */}
      <div className={styles.helpText}>
        <strong>Need help?</strong> If you believe this is an error, please contact support or try refreshing the page.
        Common solutions include checking the URL for typos or navigating back to the homepage.
      </div>
    </div>
  );
};

export default NotFound;