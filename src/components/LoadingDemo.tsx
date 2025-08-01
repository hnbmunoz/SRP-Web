import React, { useState, useEffect } from 'react';
import LoadingOverlay from './custom-component/Loading';

const LoadingDemo: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Initializing Medical Dashboard...');

  useEffect(() => {
    const messages = [
      'Initializing Medical Dashboard...',
      'Loading Patient Records...',
      'Connecting to Medical Database...',
      'Preparing Healthcare Interface...',
      'Almost Ready...'
    ];

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingMessage(messages[messageIndex]);
    }, 2000);

    // Auto-hide loading after 10 seconds for demo
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(loadingTimeout);
    };
  }, []);

  const toggleLoading = () => {
    setIsLoading(!isLoading);
    if (!isLoading) {
      setLoadingMessage('Initializing Medical Dashboard...');
    }
  };

  return (
    <div style={{ 
      padding: '2rem', 
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #f7f9fa 0%, #e8f4f8 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ 
        color: '#007BBA', 
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        Medical Dashboard Loading Screen Demo
      </h1>
      
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 123, 186, 0.1)',
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
          This demo showcases the enhanced medical-themed loading screen with:
        </p>
        <ul style={{ 
          textAlign: 'left', 
          color: '#2E2E2E',
          marginBottom: '2rem'
        }}>
          <li>Animated medical logo with stethoscope design</li>
          <li>Pulsing rings animation</li>
          <li>Bouncing dots spinner</li>
          <li>Gradient text effects</li>
          <li>Shimmer overlay animation</li>
          <li>Medical theme colors integration</li>
        </ul>
        
        <button
          onClick={toggleLoading}
          style={{
            background: 'linear-gradient(135deg, #007BBA 0%, #38B2AC 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {isLoading ? 'Hide Loading Screen' : 'Show Loading Screen'}
        </button>
      </div>

      <LoadingOverlay 
        message={loadingMessage}
        isVisible={isLoading}
      />
    </div>
  );
};

export default LoadingDemo;