import React, { useState } from 'react';
import '../styles/pages/BecomeCreator.css';

const BecomeCreator = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: 'Create Your Profile',
      description: 'Build a compelling profile that showcases your unique style and personality',
      details: [
        'Choose professional profile photos',
        'Write an engaging bio',
        'Add your measurements and stats',
        'Specify your modeling categories'
      ]
    },
    {
      number: 2,
      title: 'Build Your Portfolio',
      description: 'Upload high-quality photos and videos that demonstrate your range',
      details: [
        'Include variety in poses and styles',
        'Show different moods and expressions',
        'Add both professional and candid shots',
        'Include videos to show movement and personality'
      ]
    },
    {
      number: 3,
      title: 'Set Your Rates',
      description: 'Price your services competitively based on your experience and market',
      details: [
        'Research market rates in your area',
        'Consider your experience level',
        'Set different rates for different types of work',
        'Be flexible but know your worth'
      ]
    },
    {
      number: 4,
      title: 'Start Networking',
      description: 'Connect with photographers, agencies, and other professionals',
      details: [
        'Attend local modeling events',
        'Collaborate with photographers for portfolio building',
        'Join modeling communities online',
        'Build relationships with agencies'
      ]
    }
  ];

  const tips = [
    {
      icon: '📸',
      title: 'Invest in Quality Photos',
      description: 'Professional photos are your most important investment. They\'re often the first thing clients see.'
    },
    {
      icon: '💪',
      title: 'Stay in Shape',
      description: 'Maintain a healthy lifestyle and fitness routine. Your body is your tool in this industry.'
    },
    {
      icon: '🎭',
      title: 'Practice Posing',
      description: 'Spend time practicing different poses and expressions. Versatility is key to success.'
    },
    {
      icon: '📱',
      title: 'Stay Active Online',
      description: 'Maintain an active social media presence and engage with your audience regularly.'
    },
    {
      icon: '🤝',
      title: 'Be Professional',
      description: 'Always be punctual, prepared, and professional. Your reputation is everything.'
    },
    {
      icon: '📚',
      title: 'Keep Learning',
      description: 'Stay updated with industry trends and continuously improve your skills.'
    }
  ];

  const requirements = [
    'Age 18-35 (varies by category)',
    'Height requirements vary by niche',
    'Professional attitude and reliability',
    'Willingness to travel when required',
    'Good communication skills',
    'Basic understanding of posing and movement'
  ];

  return (
    <div className="become-creator-page">
      <div className="creator-hero">
        <div className="container">
          <h1>How to Become a Creator</h1>
          <p>Transform your passion into a profitable modeling career</p>
          <div className="hero-features">
            <div className="feature">
              <span>🚀</span>
              <span>Start Earning</span>
            </div>
            <div className="feature">
              <span>🌟</span>
              <span>Build Your Brand</span>
            </div>
            <div className="feature">
              <span>💼</span>
              <span>Work Flexible</span>
            </div>
          </div>
        </div>
      </div>

      <div className="creator-requirements">
        <div className="container">
          <h2>Basic Requirements</h2>
          <div className="requirements-grid">
            {requirements.map((requirement, index) => (
              <div key={index} className="requirement-item">
                <span className="requirement-check">✓</span>
                <span>{requirement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="creator-steps">
        <div className="container">
          <h2>Getting Started in 4 Steps</h2>
          <div className="steps-navigation">
            {steps.map((step) => (
              <button
                key={step.number}
                className={`step-btn ${activeStep === step.number ? 'active' : ''}`}
                onClick={() => setActiveStep(step.number)}
              >
                <span className="step-number">{step.number}</span>
                <span className="step-title">{step.title}</span>
              </button>
            ))}
          </div>
          
          <div className="step-content">
            {steps.map((step) => (
              activeStep === step.number && (
                <div key={step.number} className="step-details">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <ul>
                    {step.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      <div className="creator-tips">
        <div className="container">
          <h2>Pro Tips for Success</h2>
          <div className="tips-grid">
            {tips.map((tip, index) => (
              <div key={index} className="tip-card">
                <div className="tip-icon">{tip.icon}</div>
                <h3>{tip.title}</h3>
                <p>{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="creator-earning">
        <div className="container">
          <h2>Earning Potential</h2>
          <div className="earning-grid">
            <div className="earning-card">
              <h3>Beginner</h3>
              <div className="earning-amount">$500-1,500</div>
              <div className="earning-period">per month</div>
              <ul>
                <li>Part-time shoots</li>
                <li>Local projects</li>
                <li>Portfolio building</li>
                <li>Social media content</li>
              </ul>
            </div>
            <div className="earning-card featured">
              <h3>Experienced</h3>
              <div className="earning-amount">$2,000-5,000</div>
              <div className="earning-period">per month</div>
              <ul>
                <li>Regular clients</li>
                <li>Brand partnerships</li>
                <li>Fashion shows</li>
                <li>Commercial campaigns</li>
              </ul>
            </div>
            <div className="earning-card">
              <h3>Professional</h3>
              <div className="earning-amount">$5,000+</div>
              <div className="earning-period">per month</div>
              <ul>
                <li>High-end campaigns</li>
                <li>International work</li>
                <li>Celebrity collaborations</li>
                <li>Exclusive contracts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="creator-success-stories">
        <div className="container">
          <h2>Success Stories</h2>
          <div className="stories-grid">
            <div className="story">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Jessica" />
              <div className="story-content">
                <h3>Jessica Miller</h3>
                <p>"Started as a part-time creator and now work with major fashion brands. The platform gave me the exposure I needed!"</p>
                <div className="story-stats">
                  <span>2 years active</span>
                  <span>150+ shoots</span>
                  <span>$8K/month average</span>
                </div>
              </div>
            </div>
            <div className="story">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="David" />
              <div className="story-content">
                <h3>David Thompson</h3>
                <p>"Transitioned from retail to full-time modeling. The flexibility and income potential changed my life completely."</p>
                <div className="story-stats">
                  <span>18 months active</span>
                  <span>200+ clients</span>
                  <span>$6K/month average</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="creator-cta">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join our community of successful creators and start building your modeling career today</p>
          <button className="btn-creator-large">Create Your Profile Now</button>
          <p className="cta-note">Free to start • No hidden fees • Support every step of the way</p>
        </div>
      </div>
    </div>
  );
};

export default BecomeCreator;