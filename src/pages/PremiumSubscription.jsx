import React, { useState } from 'react';

const PremiumSubscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly'); // monthly or annual

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

  const getPlans = () => {
    const monthlyPlans = [
      {
        name: 'Essential',
        price: '$9.99',
        period: '/month',
        originalPrice: null,
        description: 'Perfect for exploring premium content',
        popular: false,
        features: ['Basic exclusive content', 'Limited messaging', 'Mobile app access']
      },
      {
        name: 'Pro',
        price: '$19.99',
        period: '/month',
        originalPrice: null,
        description: 'Most popular choice for active users',
        popular: true,
        features: ['All exclusive content', 'Unlimited messaging', 'Behind the scenes', 'Early access', 'Ad-free experience']
      },
      {
        name: 'Premium',
        price: '$39.99',
        period: '/month',
        originalPrice: null,
        description: 'Complete access with all premium features',
        popular: false,
        features: ['Everything in Pro', 'Custom content requests', 'Priority support', 'Exclusive events', 'Creator collaboration opportunities']
      }
    ];

    const annualPlans = [
      {
        name: 'Essential',
        price: '$79.99',
        period: '/year',
        originalPrice: '$119.88',
        description: 'Perfect for exploring premium content',
        popular: false,
        features: ['Basic exclusive content', 'Limited messaging', 'Mobile app access']
      },
      {
        name: 'Pro',
        price: '$159.99',
        period: '/year',
        originalPrice: '$239.88',
        description: 'Most popular choice for active users',
        popular: true,
        features: ['All exclusive content', 'Unlimited messaging', 'Behind the scenes', 'Early access', 'Ad-free experience']
      },
      {
        name: 'Premium',
        price: '$319.99',
        period: '/year',
        originalPrice: '$479.88',
        description: 'Complete access with all premium features',
        popular: false,
        features: ['Everything in Pro', 'Custom content requests', 'Priority support', 'Exclusive events', 'Creator collaboration opportunities']
      }
    ];

    return billingCycle === 'monthly' ? monthlyPlans : annualPlans;
  };

  const plans = getPlans();

  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
    alert(`Subscribing to ${plan.name} plan (${billingCycle}) - This is a demo`);
  };

  const getSavings = (originalPrice, currentPrice) => {
    if (!originalPrice) return null;
    const original = parseFloat(originalPrice.replace('$', ''));
    const current = parseFloat(currentPrice.replace('$', ''));
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="premium-page">
      <div className="premium-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Unlock Premium Access</h1>
            <p>Join thousands of users enjoying exclusive content and premium features</p>
            <div className="platform-stats">
              <div className="stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Premium Creators</span>
              </div>
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Exclusive Posts</span>
              </div>
              <div className="stat">
                <span className="stat-number">4.8★</span>
                <span className="stat-label">User Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="premium-features">
        <div className="container">
          <h2>What You'll Get with Premium</h2>
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
      </div>

      <div className="content-preview">
        <div className="container">
          <h2>Preview Exclusive Content</h2>
          <div className="preview-grid">
            <div className="preview-item">
              <img src="https://images.unsplash.com/photo-1494790108755-2616c9ef2fe8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Exclusive content" />
              <div className="preview-overlay">
                <span className="lock-icon">🔒</span>
                <p>Premium photoshoot content</p>
              </div>
            </div>
            <div className="preview-item">
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Behind the scenes" />
              <div className="preview-overlay">
                <span className="lock-icon">🔒</span>
                <p>Behind the scenes content</p>
              </div>
            </div>
            <div className="preview-item">
              <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Exclusive videos" />
              <div className="preview-overlay">
                <span className="lock-icon">🔒</span>
                <p>Exclusive video content</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="premium-pricing">
        <div className="container">
          <h2>Choose Your Plan</h2>
          
          <div className="billing-toggle">
            <div className="toggle-container">
              <button 
                className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
              <button 
                className={`toggle-btn ${billingCycle === 'annual' ? 'active' : ''}`}
                onClick={() => setBillingCycle('annual')}
              >
                Annual
                <span className="save-badge">Save up to 33%</span>
              </button>
            </div>
          </div>

          <div className="pricing-grid">
            {plans.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <h3>{plan.name}</h3>
                <div className="price">
                  <span className="price-amount">{plan.price}</span>
                  <span className="price-period">{plan.period}</span>
                </div>
                {plan.originalPrice && (
                  <div className="price-savings">
                    <span className="original-price">{plan.originalPrice}</span>
                    <span className="savings">Save {getSavings(plan.originalPrice, plan.price)}%</span>
                  </div>
                )}
                <p className="plan-description">{plan.description}</p>
                <ul className="plan-features">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex}>{feature}</li>
                  ))}
                </ul>
                <button 
                  className="btn-premium"
                  onClick={() => handleSubscribe(plan)}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="premium-testimonials">
        <div className="container">
          <h2>What Our Users Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial">
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
            <div className="testimonial">
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
            <div className="testimonial">
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
      </div>

      <div className="subscription-benefits">
        <div className="container">
          <h2>Why Choose Premium?</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <span className="benefit-icon">💝</span>
              <h3>Unlimited Access</h3>
              <p>Access thousands of premium creators and exclusive content across all categories</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">👥</span>
              <h3>Creator Community</h3>
              <p>Connect directly with creators through messaging and participate in exclusive events</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🎯</span>
              <h3>Support Creators</h3>
              <p>Your subscription directly supports content creators and helps them produce better content</p>
            </div>
          </div>
        </div>
      </div>

      <div className="premium-faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Can I cancel my subscription anytime?</h4>
              <p>Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period.</p>
            </div>
            <div className="faq-item">
              <h4>What payment methods do you accept?</h4>
              <p>We accept all major credit cards, PayPal, and other secure payment methods. All payments are processed securely.</p>
            </div>
            <div className="faq-item">
              <h4>Is there a free trial available?</h4>
              <p>Yes! New users get a 7-day free trial to experience all premium features before committing to a subscription.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="premium-cta">
        <div className="container">
          <h2>Ready to Go Premium?</h2>
          <p>Join our exclusive community and unlock unlimited access to premium content</p>
          <button className="btn-premium-large" onClick={() => handleSubscribe(plans[1])}>
            Start Your Free Trial
          </button>
          <p className="cta-note">7-day free trial • Cancel anytime • Secure payment • Instant access</p>
        </div>
      </div>
    </div>
  );
};

export default PremiumSubscription;