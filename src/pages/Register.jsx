import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/AuthForms.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const passwordRequirements = [
    { text: 'At least 8 characters', valid: formData.password.length >= 8 },
    { text: 'Contains uppercase letter', valid: /[A-Z]/.test(formData.password) },
    { text: 'Contains lowercase letter', valid: /[a-z]/.test(formData.password) },
    { text: 'Contains number', valid: /\d/.test(formData.password) }
  ];

  const getPasswordStrength = () => {
    const validRequirements = passwordRequirements.filter(req => req.valid).length;
    if (validRequirements === 0) return { strength: 'none', color: 'transparent' };
    if (validRequirements <= 1) return { strength: 'weak', color: '#ff4757' };
    if (validRequirements <= 2) return { strength: 'fair', color: '#ffa502' };
    if (validRequirements <= 3) return { strength: 'good', color: '#2ed573' };
    return { strength: 'strong', color: '#5f27cd' };
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (passwordRequirements.filter(req => req.valid).length < 4) {
      newErrors.password = 'Password must meet all requirements';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Registration successful! Please check your email to verify your account. (This is a demo)');
      // In real app: redirect to verification page or login
    }, 1500);
  };

  const handleSocialRegister = (provider) => {
    alert(`Register with ${provider} (This is a demo)`);
  };

  const strengthInfo = getPasswordStrength();

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Create Your Account</h1>
            <p>Join our community of creators and subscribers</p>
          </div>

          <div className="social-login">
            <button 
              type="button" 
              className="social-btn google"
              onClick={() => handleSocialRegister('Google')}
            >
              <span className="social-icon">G</span>
              Continue with Google
            </button>
            <button 
              type="button" 
              className="social-btn facebook"
              onClick={() => handleSocialRegister('Facebook')}
            >
              <span className="social-icon">f</span>
              Continue with Facebook
            </button>
          </div>

          <div className="divider">
            <span>or</span>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoFocus
                autoComplete="email"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div 
                      className="strength-fill" 
                      style={{ 
                        width: `${(passwordRequirements.filter(req => req.valid).length / 4) * 100}%`,
                        backgroundColor: strengthInfo.color
                      }}
                    />
                  </div>
                  <span className="strength-text">{strengthInfo.strength}</span>
                </div>
              )}
              
              {formData.password && (
                <div className="password-requirements">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className={`requirement ${req.valid ? 'valid' : 'invalid'}`}>
                      <span className="requirement-icon">{req.valid ? '✓' : '×'}</span>
                      {req.text}
                    </div>
                  ))}
                </div>
              )}
              
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>

            <div className="form-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                I agree to the{' '}
                <Link to="/terms" className="auth-link">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="auth-link">Privacy Policy</Link>
              </label>
              {errors.termsAccepted && <span className="error-text">{errors.termsAccepted}</span>}
            </div>

            <button 
              type="submit" 
              className={`btn-primary auth-submit ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
            <p style={{ marginTop: '1rem' }}>
              <Link to="/" className="auth-link">
                ← Back to Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;