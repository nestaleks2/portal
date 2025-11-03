import React from 'react';

const About = () => {
  const features = [
    {
      icon: '🔒',
      title: 'Privacy & Security',
      description: 'Advanced encryption and security measures protect your data and content with industry-leading privacy standards.'
    },
    {
      icon: '💰',
      title: 'Fair Revenue Share',
      description: 'Creators keep 80% of their earnings with transparent pricing and fast, reliable payment processing.'
    },
    {
      icon: '🚀',
      title: 'Global Reach',
      description: 'Connect with audiences worldwide through our international platform with multi-language support.'
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Detailed insights and analytics help creators understand their audience and optimize content performance.'
    },
    {
      icon: '🎯',
      title: 'Smart Discovery',
      description: 'AI-powered recommendation system helps fans discover new creators and content they love.'
    },
    {
      icon: '📱',
      title: 'Mobile Optimized',
      description: 'Seamless experience across all devices with our responsive design and mobile applications.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Creators' },
    { number: '2M+', label: 'Registered Users' },
    { number: '150+', label: 'Countries' },
    { number: '99.9%', label: 'Uptime' }
  ];

  const teamValues = [
    {
      title: 'Creator First',
      description: 'We prioritize the success and well-being of content creators, providing them with the tools and support they need to thrive.'
    },
    {
      title: 'Innovation',
      description: 'We continuously evolve our platform with cutting-edge technology to enhance user experience and stay ahead of industry trends.'
    },
    {
      title: 'Community',
      description: 'We foster a supportive, inclusive community where creativity flourishes and meaningful connections are made.'
    },
    {
      title: 'Transparency',
      description: 'We maintain clear, honest communication about our policies, pricing, and business practices with all stakeholders.'
    }
  ];

  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-content">
            <h1>About Our Platform</h1>
            <p className="hero-subtitle">
              Empowering creators and connecting communities through innovative technology and unwavering commitment to excellence.
            </p>
            <div className="hero-description">
              <p>
                We're revolutionizing the creator economy by building a platform that puts creators first. 
                Our mission is to provide the tools, technology, and support needed for content creators 
                to build sustainable careers while maintaining creative freedom and connecting authentically 
                with their audiences.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="about-stats">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="premium-stat-item">
                <div className="premium-stat-number">{stat.number}</div>
                <div className="premium-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="about-features">
          <div className="section-header">
            <h2>Why Choose Our Platform</h2>
            <p>We've built our platform with creators and fans in mind, focusing on the features that matter most.</p>
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
        </section>

        {/* Values Section */}
        <section className="about-values">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do and every decision we make.</p>
          </div>
          <div className="values-grid">
            {teamValues.map((value, index) => (
              <div key={index} className="value-card">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Statement */}
        <section className="about-mission">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <div className="mission-text">
              <p>
                To democratize content creation and empower individuals to monetize their creativity, 
                talents, and expertise while building meaningful relationships with their audiences.
              </p>
              <p>
                We believe everyone has something valuable to share, and our platform exists to make 
                that sharing both rewarding and sustainable. By combining cutting-edge technology with 
                human-centered design, we're creating the future of the creator economy.
              </p>
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="about-company">
          <div className="company-grid">
            <div className="company-info">
              <h2>About the Company</h2>
              <div className="company-details">
                <div className="detail-item">
                  <strong>Founded:</strong> 2024
                </div>
                <div className="detail-item">
                  <strong>Headquarters:</strong> Global (Remote-First)
                </div>
                <div className="detail-item">
                  <strong>Team Size:</strong> 50+ Professionals
                </div>
                <div className="detail-item">
                  <strong>Funding:</strong> Series A
                </div>
              </div>
              <p className="company-description">
                We're a fast-growing technology company focused on building the next generation 
                of creator economy platforms. Our diverse, global team brings together expertise 
                in technology, design, content creation, and community building.
              </p>
            </div>
            <div className="company-image">
              <div className="image-placeholder">
                <span>🏢</span>
                <p>Building the Future Together</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="about-cta">
          <div className="cta-content">
            <h2>Ready to Join Our Community?</h2>
            <p>Whether you're a creator looking to monetize your content or a fan seeking unique experiences, we're here for you.</p>
            <div className="cta-buttons">
              <button className="btn-primary">Start Creating</button>
              <button className="btn-secondary">Explore Content</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;