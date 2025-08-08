import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/authStore';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Signup.module.scss';
import LoadingOverlay from './custom-component/Loading';

interface SignupProps {}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

interface FormTouched {
  name: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
  terms: boolean;
}

const Signup: React.FC<SignupProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    terms: false
  });

  const { register, isLoading, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Password strength calculation
  const calculatePasswordStrength = (password: string): { score: number; label: string; color: string } => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    const strengthMap = {
      0: { label: 'Very Weak', color: '#e74c3c' },
      1: { label: 'Weak', color: '#e67e22' },
      2: { label: 'Fair', color: '#f39c12' },
      3: { label: 'Good', color: '#27ae60' },
      4: { label: 'Strong', color: '#2ecc71' },
      5: { label: 'Very Strong', color: '#16a085' }
    };

    return { score, ...strengthMap[score as keyof typeof strengthMap] };
  };

  // Form validation
  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'Name can only contain letters and spaces';
        return undefined;
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return 'Please enter a valid email address';
        return undefined;
      
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
        if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
        if (!/(?=.*[0-9])/.test(value)) return 'Password must contain at least one number';
        return undefined;
      
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return undefined;
      
      case 'terms':
        if (!acceptTerms) return 'You must accept the terms and conditions';
        return undefined;
      
      default:
        return undefined;
    }
  };

  // Real-time validation
  useEffect(() => {
    const newErrors: FormErrors = {};
    
    Object.keys(touched).forEach(field => {
      if (touched[field as keyof FormTouched]) {
        if (field === 'terms') {
          const error = validateField(field, '');
          if (error) newErrors[field as keyof FormErrors] = error;
        } else {
          const value = formData[field as keyof typeof formData];
          const error = validateField(field, value);
          if (error) newErrors[field as keyof FormErrors] = error;
        }
      }
    });
    
    setErrors(newErrors);
  }, [formData, acceptTerms, touched]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInputBlur = (field: keyof FormTouched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleInputFocus = (field: string) => {
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const isFormValid = () => {
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const passwordError = validateField('password', formData.password);
    const confirmPasswordError = validateField('confirmPassword', formData.confirmPassword);
    const termsError = validateField('terms', '');
    
    return !nameError && !emailError && !passwordError && !confirmPasswordError && !termsError &&
           formData.name && formData.email && formData.password && formData.confirmPassword && acceptTerms;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    clearError();
    
    // Validate all fields
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const passwordError = validateField('password', formData.password);
    const confirmPasswordError = validateField('confirmPassword', formData.confirmPassword);
    const termsError = validateField('terms', '');
    
    if (nameError || emailError || passwordError || confirmPasswordError || termsError) {
      setErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        terms: termsError
      });
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        terms: true
      });
      return;
    }

    try {
      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password
      });
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const getInputClassName = (field: keyof typeof formData) => {
    const hasError = errors[field];
    const hasValue = formData[field];
    const isValid = !hasError && hasValue && touched[field];
    
    return `${styles.input} ${hasError ? styles.error : ''} ${isValid ? styles.success : ''}`;
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  return (
    <>
      <div className={styles.signupContainer}>
        <div className={styles.signupCard}>
          <div className={styles.header}>
            <div className={styles.logo}></div>
            <h1 className={styles.title}>Join MedPortal</h1>
            <p className={styles.subtitle}>Create your secure healthcare account</p>
          </div>

          <form className={styles.form} onSubmit={handleSignup} noValidate>
            {/* Full Name Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Full Name
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onBlur={() => handleInputBlur('name')}
                  onFocus={() => handleInputFocus('name')}
                  className={getInputClassName('name')}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  aria-invalid={!!errors.name}
                />
                <span className={styles.inputIcon}>👤</span>
              </div>
              {errors.name && (
                <div 
                  id="name-error" 
                  className={`${styles.errorMessage} ${styles.show}`}
                  role="alert"
                >
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => handleInputBlur('email')}
                  onFocus={() => handleInputFocus('email')}
                  className={getInputClassName('email')}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  aria-invalid={!!errors.email}
                />
                <span className={styles.inputIcon}>📧</span>
              </div>
              {errors.email && (
                <div 
                  id="email-error" 
                  className={`${styles.errorMessage} ${styles.show}`}
                  role="alert"
                >
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  onBlur={() => handleInputBlur('password')}
                  onFocus={() => handleInputFocus('password')}
                  className={getInputClassName('password')}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  aria-describedby={errors.password ? 'password-error' : 'password-strength'}
                  aria-invalid={!!errors.password}
                />
                <span className={styles.inputIcon}>🔒</span>
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={0}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div id="password-strength" className={styles.passwordStrength}>
                  <div className={styles.strengthBar}>
                    <div 
                      className={styles.strengthFill}
                      style={{ 
                        width: `${(passwordStrength.score / 5) * 100}%`,
                        backgroundColor: passwordStrength.color
                      }}
                    ></div>
                  </div>
                  <span 
                    className={styles.strengthLabel}
                    style={{ color: passwordStrength.color }}
                  >
                    {passwordStrength.label}
                  </span>
                </div>
              )}
              
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

            {/* Confirm Password Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  onBlur={() => handleInputBlur('confirmPassword')}
                  onFocus={() => handleInputFocus('confirmPassword')}
                  className={getInputClassName('confirmPassword')}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                  aria-invalid={!!errors.confirmPassword}
                />
                <span className={styles.inputIcon}>🔐</span>
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  tabIndex={0}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.confirmPassword && (
                <div 
                  id="confirm-password-error" 
                  className={`${styles.errorMessage} ${styles.show}`}
                  role="alert"
                >
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className={styles.termsSection}>
              <label className={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked);
                    setTouched(prev => ({ ...prev, terms: true }));
                  }}
                  aria-describedby="terms-desc"
                />
                <div className={styles.checkbox}></div>
                <span id="terms-desc" className={styles.termsText}>
                  I agree to the{' '}
                  <a 
                    href="#terms" 
                    className={styles.termsLink}
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Terms and Conditions would be displayed here');
                    }}
                  >
                    Terms and Conditions
                  </a>
                  {' '}and{' '}
                  <a 
                    href="#privacy" 
                    className={styles.termsLink}
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Privacy Policy would be displayed here');
                    }}
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.terms && (
                <div className={`${styles.errorMessage} ${styles.show}`} role="alert">
                  {errors.terms}
                </div>
              )}
            </div>

            {/* Display authentication error */}
            {error && (
              <div className={styles.authError} role="alert">
                <span className={styles.errorIcon}>⚠️</span>
                {error}
                <button
                  type="button"
                  className={styles.errorClose}
                  onClick={clearError}
                  aria-label="Dismiss error"
                >
                  ×
                </button>
              </div>
            )}

            <button
              type="submit"
              className={styles.signupButton}
              disabled={isLoading || !isFormValid()}
              aria-describedby="signup-button-desc"
            >
              {isLoading && <span className={styles.loadingSpinner}></span>}
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
            <div id="signup-button-desc" className="sr-only">
              {isLoading ? 'Please wait while we create your account' : 'Click to create your account'}
            </div>

          </form>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Already have an account?{' '}
              <Link to="/login" className={styles.loginLink}>
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
      {isLoading && <LoadingOverlay />}
    </>
  );
};

export default Signup;