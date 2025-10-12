import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>MODELS</h3>
          <p>Professional platform for models</p>
        </div>
        <div className="footer-section">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Models</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@models.com</p>
          <p>Phone: +7 (555) 123-45-67</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Models Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;