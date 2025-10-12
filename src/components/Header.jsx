import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 160; // Approximate header height
      const isMobile = window.innerWidth < 1024;
      setIsScrolled(window.scrollY > headerHeight || isMobile);
    };

    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
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
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-top">
          <div className="container">
            <div className="nav-brand">
              <h1>MODELS</h1>
            </div>
          </div>
        </div>
        <nav className="navbar">
          <div className="container">
            <div className="nav-content">
              <div className="nav-menu">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/models" className="nav-link">Models</Link>
                <Link to="#" className="nav-link">About</Link>
                <Link to="/support" className="nav-link">Support</Link>
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
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </button>
              </div>
              <button 
                className="mobile-menu-toggle"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            </div>
          </div>
        </nav>
        <nav className={`navbar-sticky ${isScrolled ? 'visible' : ''}`}>
          <div className="container">
            <div className="nav-content">
              <div className="nav-brand-sticky">
                <h2>MODELS</h2>
              </div>
              <div className="nav-menu">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/models" className="nav-link">Models</Link>
                <Link to="#" className="nav-link">About</Link>
                <Link to="/support" className="nav-link">Support</Link>
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
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </button>
              </div>
              <button 
                className="mobile-menu-toggle"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <div className="mobile-nav-links">
              <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>Home</Link>
              <Link to="/models" className="mobile-nav-link" onClick={closeMobileMenu}>Models</Link>
              <Link to="#" className="mobile-nav-link" onClick={closeMobileMenu}>About</Link>
              <Link to="/support" className="mobile-nav-link" onClick={closeMobileMenu}>Support</Link>
            </div>
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
              <button 
                className="mobile-btn mobile-btn-dashboard" 
                onClick={() => {
                  navigate('/dashboard');
                  closeMobileMenu();
                }}
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;