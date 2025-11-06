import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Footer.css';

const Footer = () => {
  return (
    <footer className="footer__root">
      <div className="footer__content">
        <div className="footer__section">
          <h3>MODELS</h3>
          <p>Professional platform for models</p>
        </div>
        <div className="footer__section">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/models">Models</Link></li>
            <li><Link to="/subscriptions">Subscriptions</Link></li>
            <li><Link to="/messages">Messages</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/support">Support</Link></li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>Contact</h4>
          <p>Email: info@models.com</p>
          <p>Phone: +7 (555) 123-45-67</p>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; 2024 Models Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;