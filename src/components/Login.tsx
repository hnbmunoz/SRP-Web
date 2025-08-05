import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import LoadingOverlay from './custom-component/Loading';
import LoadingDemo from './LoadingDemo';

interface LoginProps {}

interface FormErrors {
  username?: string;
  password?: string;
}

const Login: React.FC<LoginProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ username: boolean; password: boolean }>({
    username: false,
    password: false
  });
  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  // Form validation
  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case 'username':
        if (!value.trim()) return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        if (!/^(?=[^@]*@[^@]*$)[a-zA-Z0-9._@-]+$/.test(value)) 
          return 'Username contains invalid characters';
        
        return undefined;
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return 'Password must contain uppercase, lowercase, and number';
        }
        return undefined;
      default:
        return undefined;
    }
  };

  // Real-time validation
  useEffect(() => {
    const newErrors: FormErrors = {};
    
    if (touched.username) {
      const usernameError = validateField('username', username);
      if (usernameError) newErrors.username = usernameError;
    }
    
    if (touched.password) {
      const passwordError = validateField('password', password);
      if (passwordError) newErrors.password = passwordError;
    }
    
    setErrors(newErrors);
  }, [username, password, touched]);

  const handleInputChange = (field: string, value: string) => {
    if (field === 'username') {
      setUsername(value);
    } else if (field === 'password') {
      setPassword(value);
    }
  };

  const handleInputBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleInputFocus = (field: string) => {
    // Clear error when user starts typing again
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const isFormValid = () => {
    const usernameError = validateField('username', username);
    const passwordError = validateField('password', password);
    return !usernameError && !passwordError && username && password;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched for validation
    setTouched({ username: true, password: true });
    
    if (!isFormValid()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Store remember me preference
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('username', username);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('username');
      }
      
      setToken('medical_app_token');
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Load remembered username
  useEffect(() => {
    const remembered = localStorage.getItem('rememberMe');
    const savedUsername = localStorage.getItem('username');
    
    if (remembered === 'true' && savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  const getInputClassName = (field: string) => {
    const hasError = errors[field as keyof FormErrors];
    const hasValue = field === 'username' ? username : password;
    const isValid = !hasError && hasValue && touched[field as keyof typeof touched];
    
    return `${styles.input} ${hasError ? styles.error : ''} ${isValid ? styles.success : ''}`;
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.header}>
            <div className={styles.logo}></div>
            <h1 className={styles.title}>MedPortal</h1>
            <p className={styles.subtitle}>Secure Healthcare Management System</p>
          </div>

          <form className={styles.form} onSubmit={handleLogin} noValidate>
            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.label}>
                Username or Email
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  onBlur={() => handleInputBlur('username')}
                  onFocus={() => handleInputFocus('username')}
                  className={getInputClassName('username')}
                  placeholder="Enter your username"
                  autoComplete="username"
                  aria-describedby={errors.username ? 'username-error' : undefined}
                  aria-invalid={!!errors.username}
                />
                <span className={styles.inputIcon}>👤</span>
              </div>
              {errors.username && (
                <div 
                  id="username-error" 
                  className={`${styles.errorMessage} ${styles.show}`}
                  role="alert"
                >
                  {errors.username}
                </div>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  onBlur={() => handleInputBlur('password')}
                  onFocus={() => handleInputFocus('password')}
                  className={getInputClassName('password')}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  aria-invalid={!!errors.password}
                />
                <span className={styles.inputIcon}>🔒</span>
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={0}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && (
                <div 
                  id="password-error" 
                  className={`${styles.errorMessage} ${styles.show}`}
                  role="alert"
                >
                  {errors.password}
                </div>
              )}
            </div>

            <div className={styles.rememberForgot}>
              <label className={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  aria-describedby="remember-me-desc"
                />
                <div className={styles.checkbox}></div>
                <span id="remember-me-desc">Remember me</span>
              </label>
              <a 
                href="#forgot-password" 
                className={styles.forgotLink}
                onClick={(e) => {
                  e.preventDefault();
                  alert('Password reset functionality would be implemented here');
                }}
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className={styles.loginButton}
              disabled={isLoading || !isFormValid()}
              aria-describedby="login-button-desc"
            >
              {isLoading && <span className={styles.loadingSpinner}></span>}
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
            <div id="login-button-desc" className="sr-only">
              {isLoading ? 'Please wait while we sign you in' : 'Click to sign in to your account'}
            </div>
          </form>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Don't have an account?{' '}
              <a 
                href="#signup" 
                className={styles.signupLink}
                onClick={(e) => {
                  e.preventDefault();
                  alert('Registration functionality would be implemented here');
                }}
              >
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
      {isLoading && <LoadingOverlay />}
    </>
  );
};

export default Login;