import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo.png';
import '../styles/components/Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 160; // Approximate header height
      const isMobile = window.innerWidth <= 1280;
      setIsScrolled(window.scrollY > headerHeight || isMobile);
    };

    const handleResize = () => {
      const isMobile = window.innerWidth <= 1280;
      if (isMobile) {
        setIsScrolled(true);
      } else {
        const headerHeight = 160;
        setIsScrolled(window.scrollY > headerHeight);
      }
    };

    handleResize(); // Check on mount
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    
    // Prevent body scroll when mobile menu is open
    if (newState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Clean up body overflow on component unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <header className="header">
        <div className="header-top">
          <div className="container">
            <div className="nav-brand">
              <img src={logo} alt="X-Models" className="logo" />
            </div>
          </div>
        </div>
        <nav className="navbar">
          <div className="container">
            <div className="nav-content">
              <div className="nav-menu">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/models" className="nav-link">Models</Link>
                <Link to="/subscriptions" className="nav-link">Subscriptions</Link>
                <Link to="/messages" className="nav-link">Messages</Link>
              </div>
              <div className="nav-actions">
                <button 
                  className="btn-login"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </button>
                <button 
                  className="btn-register"
                  onClick={() => navigate('/register')}
                >
                  Sign Up
                </button>
                <button 
                  className="btn-dashboard" 
                  onClick={() => navigate('/dashboard-creator')}
                >
                  Creator Dashboard
                </button>
                <button 
                  className="btn-dashboard" 
                  onClick={() => navigate('/dashboard-viewer')}
                >
                  Viewer Dashboard
                </button>
              </div>
              <button 
                className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </nav>
        <nav className={`navbar-sticky ${isScrolled ? 'visible' : ''}`}>
          <div className="container">
            <div className="nav-content">
              <div className="nav-brand-sticky">
                <img src={logo} alt="X-Models" className="logo-sticky" />
              </div>
              <div className="nav-menu">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/models" className="nav-link">Models</Link>
                <Link to="/subscriptions" className="nav-link">Subscriptions</Link>
                <Link to="/messages" className="nav-link">Messages</Link>
              </div>
              <div className="nav-actions">
                <button 
                  className="btn-login"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </button>
                <button 
                  className="btn-register"
                  onClick={() => navigate('/register')}
                >
                  Sign Up
                </button>
                <button 
                  className="btn-dashboard" 
                  onClick={() => navigate('/dashboard-creator')}
                >
                  Creator Dashboard
                </button>
                <button 
                  className="btn-dashboard" 
                  onClick={() => navigate('/dashboard-viewer')}
                >
                  Viewer Dashboard
                </button>
              </div>
              <button 
                className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div 
          className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={closeMobileMenu}
        />

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <div className="mobile-menu-header">
              <img src={logo} alt="X-Models" className="mobile-logo" />
              <button 
                className="mobile-menu-close"
                onClick={closeMobileMenu}
                aria-label="Close mobile menu"
              >
                ×
              </button>
            </div>
            
            <div className="mobile-nav-section">
              <h3 className="mobile-nav-title">Navigation</h3>
              <nav className="mobile-nav-links">
                <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
                  <span className="mobile-nav-icon">🏠</span>
                  Home
                </Link>
                <Link to="/models" className="mobile-nav-link" onClick={closeMobileMenu}>
                  <span className="mobile-nav-icon">👥</span>
                  Models
                </Link>
                <Link to="/subscriptions" className="mobile-nav-link" onClick={closeMobileMenu}>
                  <span className="mobile-nav-icon">⭐</span>
                  Subscriptions
                </Link>
                <Link to="/messages" className="mobile-nav-link" onClick={closeMobileMenu}>
                  <span className="mobile-nav-icon">💬</span>
                  Messages
                </Link>
              </nav>
            </div>

            <div className="mobile-auth-section">
              <h3 className="mobile-nav-title">Account</h3>
              <div className="mobile-nav-actions">
                <button 
                  className="mobile-btn mobile-btn-login"
                  onClick={() => {
                    navigate('/login');
                    closeMobileMenu();
                  }}
                >
                  Sign In
                </button>
                <button 
                  className="mobile-btn mobile-btn-register"
                  onClick={() => {
                    navigate('/register');
                    closeMobileMenu();
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>

            <div className="mobile-dashboard-section">
              <h3 className="mobile-nav-title">Dashboard</h3>
              <div className="mobile-nav-actions">
                <button 
                  className="mobile-btn mobile-btn-dashboard creator" 
                  onClick={() => {
                    navigate('/dashboard-creator');
                    closeMobileMenu();
                  }}
                >
                  Creator Dashboard
                </button>
                <button 
                  className="mobile-btn mobile-btn-dashboard viewer" 
                  onClick={() => {
                    navigate('/dashboard-viewer');
                    closeMobileMenu();
                  }}
                >
                  Viewer Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;