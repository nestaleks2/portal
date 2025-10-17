import React from 'react';
import premiumBanner from '../img/premium_subscribe.png';

const PremiumSubscription = () => {

  const features = [
    {
      icon: '🔒',
      title: 'Exclusive Content',
      description: 'Access premium photos and videos from top creators on the platform'
    },
    {
      icon: '💬',
      title: 'Direct Messaging',
      description: 'Private chat access with your favorite creators and unlimited conversations'
    },
    {
      icon: '📸',
      title: 'Behind the Scenes',
      description: 'Exclusive behind-the-scenes content from photoshoots and creator daily life'
    },
    {
      icon: '🎥',
      title: 'Premium Videos',
      description: 'High-quality video content including tutorials, live streams, and personal messages'
    },
    {
      icon: '⚡',
      title: 'Early Access',
      description: 'Be the first to see new content before it becomes available to other users'
    },
    {
      icon: '🎁',
      title: 'Special Perks',
      description: 'Monthly surprises, custom content requests, and exclusive creator events'
    },
    {
      icon: '📱',
      title: 'Mobile App Access',
      description: 'Full access to our premium mobile app with offline viewing capabilities'
    },
    {
      icon: '🎯',
      title: 'Ad-Free Experience',
      description: 'Enjoy all content without advertisements and distractions'
    }
  ];

  const premiumPlan = {
    name: 'Premium Access',
    price: '$19.99',
    period: '/month',
    description: 'Unlock all premium features and exclusive content',
    features: [
      'All exclusive content access',
      'Unlimited direct messaging',
      'Behind the scenes content', 
      'Premium videos and tutorials',
      'Early access to new content',
      'Special perks and surprises',
      'Mobile app access',
      'Ad-free experience'
    ]
  };

  const handleSubscribe = () => {
    alert('Subscribing to Premium Access - This is a demo');
  };

  return (
    <div className="premium-page">
      <section className="about-hero premium-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Unlock Premium Access</h1>
            <p className="hero-subtitle">
              Join thousands of users enjoying exclusive content and premium features
            </p>
            <div className="hero-description">
              <p>
                Experience the platform like never before with unlimited access to premium creators, 
                exclusive content, and features designed to enhance your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-stats premium-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Premium Creators</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Exclusive Posts</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.8★</div>
              <div className="stat-label">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-features premium-features">
        <div className="container">
          <div className="section-header">
            <h2>What You'll Get with Premium</h2>
            <p>Unlock exclusive features and content that enhance your experience on our platform.</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-preview">
        <div className="container">
          <div className="section-header">
            <h2>Preview Exclusive Content</h2>
            <p>Get a glimpse of the premium content waiting for you inside.</p>
          </div>
          <div className="preview-grid">
            <div className="preview-item">
              <img src={premiumBanner} alt="Premium subscription" />
              <div className="preview-overlay">
                <span className="lock-icon">🔒</span>
                <p>Premium subscription content</p>
              </div>
            </div>
            <div className="preview-item">
              <img src={premiumBanner} alt="Premium features" />
              <div className="preview-overlay">
                <span className="lock-icon">🔒</span>
                <p>Exclusive premium features</p>
              </div>
            </div>
            <div className="preview-item">
              <img src={premiumBanner} alt="Premium access" />
              <div className="preview-overlay">
                <span className="lock-icon">🔒</span>
                <p>Full premium access</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-pricing">
        <div className="container">
          <div className="section-header">
            <h2>Premium Subscription</h2>
            <p>One simple plan with everything you need for the ultimate experience.</p>
          </div>
          
          <div className="single-plan-container">
            <div className="pricing-card featured">
              <div className="popular-badge">Best Value</div>
              <h3>{premiumPlan.name}</h3>
              <div className="price">
                <span className="price-amount">{premiumPlan.price}</span>
                <span className="price-period">{premiumPlan.period}</span>
              </div>
              <p className="plan-description">{premiumPlan.description}</p>
              <ul className="plan-features">
                {premiumPlan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button 
                className="btn-primary"
                onClick={handleSubscribe}
              >
                Get Premium Access
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-testimonials">
        <div className="container">
          <div className="section-header">
            <h2>What Our Users Say</h2>
            <p>Hear from our community about their premium experience.</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial feature-card">
              <div className="testimonial-content">
                <p>"The exclusive content and direct access to creators is incredible. This platform has completely changed how I discover and engage with content."</p>
                <div className="testimonial-author">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="James" />
                  <div>
                    <h4>James Wilson</h4>
                    <span>Premium User for 8 months</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial feature-card">
              <div className="testimonial-content">
                <p>"Being able to chat directly with creators and access behind-the-scenes content is worth every penny. The platform keeps getting better!"</p>
                <div className="testimonial-author">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Alex" />
                  <div>
                    <h4>Alex Thompson</h4>
                    <span>Pro Subscriber</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial feature-card">
              <div className="testimonial-content">
                <p>"The quality and variety of exclusive content is amazing. I love getting early access to new posts and the ad-free experience."</p>
                <div className="testimonial-author">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Mike" />
                  <div>
                    <h4>Mike Rodriguez</h4>
                    <span>Annual Subscriber</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values subscription-benefits">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Premium?</h2>
            <p>Discover the benefits that make our premium membership exceptional.</p>
          </div>
          <div className="values-grid benefits-grid">
            <div className="value-card benefit-item">
              <span className="benefit-icon">💝</span>
              <h3>Unlimited Access</h3>
              <p>Access thousands of premium creators and exclusive content across all categories</p>
            </div>
            <div className="value-card benefit-item">
              <span className="benefit-icon">👥</span>
              <h3>Creator Community</h3>
              <p>Connect directly with creators through messaging and participate in exclusive events</p>
            </div>
            <div className="value-card benefit-item">
              <span className="benefit-icon">🎯</span>
              <h3>Support Creators</h3>
              <p>Your subscription directly supports content creators and helps them produce better content</p>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-faq">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions about our premium membership.</p>
          </div>
          <div className="faq-grid features-grid">
            <div className="faq-item feature-card">
              <h4>Can I cancel my subscription anytime?</h4>
              <p>Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period.</p>
            </div>
            <div className="faq-item feature-card">
              <h4>What payment methods do you accept?</h4>
              <p>We accept all major credit cards, PayPal, and other secure payment methods. All payments are processed securely.</p>
            </div>
            <div className="faq-item feature-card">
              <h4>Is there a free trial available?</h4>
              <p>Yes! New users get a 7-day free trial to experience all premium features before committing to a subscription.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-mission premium-cta">
        <div className="container">
          <div className="mission-content">
            <h2>Ready to Go Premium?</h2>
            <div className="mission-text">
              <p>Join our exclusive community and unlock unlimited access to premium content</p>
            </div>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={handleSubscribe}>
                Start Your Free Trial
              </button>
            </div>
            <p className="cta-note">7-day free trial • Cancel anytime • Secure payment • Instant access</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PremiumSubscription;