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
      <header className="header__root">
        <div className="header__top">
          <div className="container">
            <div className="nav-brand">
              <Link to="/" className="header__logo-link">
                <img src={logo} alt="X-Models" className="header__logo" />
              </Link>
            </div>
          </div>
        </div>
        <nav className="header__navbar">
          <div className="container">
            <div className="header__nav-content">
              <div className="header__nav-menu">
                <Link to="/" className="header__nav-link">Home</Link>
                <Link to="/models" className="header__nav-link">Models</Link>
                <Link to="/subscriptions" className="header__nav-link">Subscriptions</Link>
                <Link to="/messages" className="header__nav-link">Messages</Link>
              </div>
              <div className="header__nav-actions">
                <button 
                  className="header__btn-login"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </button>
                <button 
                  className="header__btn-register"
                  onClick={() => navigate('/register')}
                >
                  Sign Up
                </button>
                <button 
                  className="header__btn-dashboard" 
                  onClick={() => navigate('/dashboard-creator')}
                >
                  Creator Dashboard
                </button>
                <button 
                  className="header__btn-dashboard" 
                  onClick={() => navigate('/dashboard-viewer')}
                >
                  Viewer Dashboard
                </button>
              </div>
              <button 
                className={`header__mobile-menu-button ${isMobileMenuOpen ? 'header__mobile-menu-button--active' : ''}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <span className="header__mobile-menu-button-bar"></span>
                <span className="header__mobile-menu-button-bar"></span>
                <span className="header__mobile-menu-button-bar"></span>
              </button>
            </div>
          </div>
        </nav>
        <nav className={`header__navbar--sticky ${isScrolled ? 'header__navbar--visible' : ''}`}>
          <div className="container">
            <div className="header__nav-content">
              <div className="header__nav-brand-sticky">
                <Link to="/" className="header__logo-link">
                  <img src={logo} alt="X-Models" className="header__logo--sticky" />
                </Link>
              </div>
              <div className="header__nav-menu">
                <Link to="/" className="header__nav-link">Home</Link>
                <Link to="/models" className="header__nav-link">Models</Link>
                <Link to="/subscriptions" className="header__nav-link">Subscriptions</Link>
                <Link to="/messages" className="header__nav-link">Messages</Link>
              </div>
              <div className="header__nav-actions">
                <button 
                  className="header__btn-login"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </button>
                <button 
                  className="header__btn-register"
                  onClick={() => navigate('/register')}
                >
                  Sign Up
                </button>
                <button 
                  className="header__btn-dashboard" 
                  onClick={() => navigate('/dashboard-creator')}
                >
                  Creator Dashboard
                </button>
                <button 
                  className="header__btn-dashboard" 
                  onClick={() => navigate('/dashboard-viewer')}
                >
                  Viewer Dashboard
                </button>
              </div>
              <button 
                className={`header__mobile-menu-button ${isMobileMenuOpen ? 'header__mobile-menu-button--active' : ''}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <span className="header__mobile-menu-button-bar"></span>
                <span className="header__mobile-menu-button-bar"></span>
                <span className="header__mobile-menu-button-bar"></span>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div 
          className={`header__mobile-menu-overlay ${isMobileMenuOpen ? 'header__mobile-menu-overlay--active' : ''}`}
          onClick={closeMobileMenu}
        />

        {/* Mobile Menu */}
        <div className={`header__mobile-menu ${isMobileMenuOpen ? 'header__mobile-menu--active' : ''}`}>
          <div className="header__mobile-menu-content">
            <div className="header__mobile-menu-header">
              <Link to="/" className="header__logo-link" onClick={closeMobileMenu}>
                <img src={logo} alt="X-Models" className="header__mobile-logo" />
              </Link>
              <button 
                className="header__mobile-menu-close"
                onClick={closeMobileMenu}
                aria-label="Close mobile menu"
              >
                ×
              </button>
            </div>
            
            <div className="header__mobile-nav-section">
              <h3 className="header__mobile-nav-title">Navigation</h3>
              <nav className="header__mobile-nav-links">
                <Link to="/" className="header__mobile-nav-link" onClick={closeMobileMenu}>
                  <span className="header__mobile-nav-icon">🏠</span>
                  Home
                </Link>
                <Link to="/models" className="header__mobile-nav-link" onClick={closeMobileMenu}>
                  <span className="header__mobile-nav-icon">👥</span>
                  Models
                </Link>
                <Link to="/subscriptions" className="header__mobile-nav-link" onClick={closeMobileMenu}>
                  <span className="header__mobile-nav-icon">⭐</span>
                  Subscriptions
                </Link>
                <Link to="/messages" className="header__mobile-nav-link" onClick={closeMobileMenu}>
                  <span className="header__mobile-nav-icon">💬</span>
                  Messages
                </Link>
              </nav>
            </div>

            <div className="header__mobile-auth-section">
              <h3 className="header__mobile-nav-title">Account</h3>
              <div className="header__mobile-nav-actions">
                <button 
                  className="header__mobile-btn header__mobile-btn--login"
                  onClick={() => {
                    navigate('/login');
                    closeMobileMenu();
                  }}
                >
                  Sign In
                </button>
                <button 
                  className="header__mobile-btn header__mobile-btn--register"
                  onClick={() => {
                    navigate('/register');
                    closeMobileMenu();
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>

            <div className="header__mobile-dashboard-section">
              <h3 className="header__mobile-nav-title">Dashboard</h3>
              <div className="header__mobile-nav-actions">
                <button 
                  className="header__mobile-btn header__mobile-btn--dashboard header__mobile-btn--creator" 
                  onClick={() => {
                    navigate('/dashboard-creator');
                    closeMobileMenu();
                  }}
                >
                  Creator Dashboard
                </button>
                <button 
                  className="header__mobile-btn header__mobile-btn--dashboard header__mobile-btn--viewer" 
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