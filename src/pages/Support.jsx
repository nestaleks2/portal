import React, { useState } from 'react';

const Support = () => {
  const [activeSection, setActiveSection] = useState('all-users');
  const [openTopics, setOpenTopics] = useState({});
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleTopic = (topicId) => {
    setOpenTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const toggleQuestion = (questionId) => {
    setOpenQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const supportData = {
    'all-users': {
      title: 'For all Users',
      topics: [
        {
          id: 'account-basics',
          title: 'Account & Registration',
          questions: [
            {
              id: 'create-account',
              question: 'How do I create an account?',
              answer: 'To create an account, click the "Sign Up" button on the homepage, enter your email address, create a secure password, and verify your email. You must be 18 or older to register.'
            },
            {
              id: 'verify-account',
              question: 'Why do I need to verify my account?',
              answer: 'Account verification ensures the safety and security of our platform. It helps prevent fraud, protects your identity, and ensures compliance with legal requirements.'
            },
            {
              id: 'forgot-password',
              question: 'I forgot my password. How can I reset it?',
              answer: 'Click "Forgot Password" on the login page, enter your email address, and follow the instructions in the reset email. Make sure to check your spam folder if you don\'t see the email.'
            },
            {
              id: 'change-email',
              question: 'Can I change my email address?',
              answer: 'Yes, you can change your email address in your account settings. Go to Settings > Account > Email Address and follow the verification process for your new email.'
            },
            {
              id: 'delete-account',
              question: 'How do I delete my account?',
              answer: 'To delete your account, go to Settings > Account > Delete Account. Please note that this action is permanent and cannot be undone. All your data will be permanently removed.'
            }
          ]
        },
        {
          id: 'privacy-safety',
          title: 'Privacy & Safety',
          questions: [
            {
              id: 'data-privacy',
              question: 'How is my personal data protected?',
              answer: 'We use industry-standard encryption and security measures to protect your personal data. Your information is never shared with third parties without your consent, and we comply with all applicable privacy laws.'
            },
            {
              id: 'block-user',
              question: 'How do I block or report a user?',
              answer: 'To block a user, go to their profile and click the "Block" button. To report inappropriate behavior, click "Report" and select the appropriate reason. Our moderation team will review all reports promptly.'
            },
            {
              id: 'content-removal',
              question: 'How do I report inappropriate content?',
              answer: 'Click the "Report" button on any content that violates our community guidelines. Provide details about the violation and our content moderation team will review it within 24 hours.'
            },
            {
              id: 'privacy-settings',
              question: 'How can I control my privacy settings?',
              answer: 'Go to Settings > Privacy to control who can see your profile, send you messages, and interact with your content. You can also set your account to private to approve followers manually.'
            },
            {
              id: 'two-factor',
              question: 'How do I enable two-factor authentication?',
              answer: 'Enable 2FA in Settings > Security > Two-Factor Authentication. You can use an authenticator app or SMS. We strongly recommend enabling 2FA for additional account security.'
            }
          ]
        },
        {
          id: 'technical-support',
          title: 'Technical Issues',
          questions: [
            {
              id: 'login-issues',
              question: 'I\'m having trouble logging in. What should I do?',
              answer: 'First, check that you\'re using the correct email and password. Clear your browser cache and cookies, or try a different browser. If the problem persists, contact our support team.'
            },
            {
              id: 'video-playback',
              question: 'Videos aren\'t playing properly. How can I fix this?',
              answer: 'Ensure you have a stable internet connection and try refreshing the page. Update your browser to the latest version and disable any ad blockers that might interfere with video playback.'
            },
            {
              id: 'mobile-app',
              question: 'Is there a mobile app available?',
              answer: 'Yes, our mobile app is available for both iOS and Android devices. You can download it from the App Store or Google Play Store for the best mobile experience.'
            },
            {
              id: 'browser-compatibility',
              question: 'Which browsers are supported?',
              answer: 'Our platform works best on the latest versions of Chrome, Firefox, Safari, and Edge. For optimal performance, please keep your browser updated to the latest version.'
            },
            {
              id: 'upload-issues',
              question: 'I\'m having trouble uploading content. What\'s wrong?',
              answer: 'Check your internet connection and ensure your file meets our size and format requirements. Try using a different browser or clearing your cache. Large files may take longer to upload.'
            }
          ]
        }
      ]
    },
    'creators': {
      title: 'For Creators',
      topics: [
        {
          id: 'getting-started',
          title: 'Getting Started as Creator',
          questions: [
            {
              id: 'creator-verification',
              question: 'How do I become a verified creator?',
              answer: 'Complete your profile, upload a government-issued ID for verification, provide tax information, and submit at least 3 high-quality portfolio images. Verification typically takes 24-48 hours.'
            },
            {
              id: 'profile-optimization',
              question: 'How can I optimize my creator profile?',
              answer: 'Use a high-quality profile photo, write a compelling bio, set competitive pricing, upload diverse portfolio content, and regularly update your profile with fresh content.'
            },
            {
              id: 'content-guidelines',
              question: 'What content guidelines should I follow?',
              answer: 'All content must be original, legally compliant, and follow our community standards. Avoid copyrighted material, respect model consent, and ensure all participants are 18+.'
            },
            {
              id: 'pricing-strategy',
              question: 'How should I price my content and services?',
              answer: 'Research similar creators in your niche, start with competitive pricing, offer various price points, consider your experience level, and adjust based on demand and feedback.'
            },
            {
              id: 'first-content',
              question: 'What should I upload as my first content?',
              answer: 'Start with high-quality photos showcasing your style, create engaging captions, use relevant tags, and consider offering introductory pricing to attract initial followers.'
            }
          ]
        },
        {
          id: 'earnings-payments',
          title: 'Earnings & Payments',
          questions: [
            {
              id: 'payment-methods',
              question: 'What payment methods can I use to receive earnings?',
              answer: 'We support bank transfers, PayPal, Payoneer, and other secure payment methods. Payment processing time varies by method but typically takes 1-5 business days.'
            },
            {
              id: 'commission-rates',
              question: 'What are the platform commission rates?',
              answer: 'We take a competitive commission rate of 20% on all earnings. This covers platform maintenance, payment processing, customer support, and marketing services.'
            },
            {
              id: 'minimum-payout',
              question: 'What\'s the minimum amount for withdrawal?',
              answer: 'The minimum withdrawal amount is $20. You can request payouts weekly, and payments are processed within 3-7 business days depending on your chosen method.'
            },
            {
              id: 'tax-information',
              question: 'Do I need to provide tax information?',
              answer: 'Yes, tax information is required for creators earning over certain thresholds. We\'ll provide necessary tax documents and recommend consulting with a tax professional for your specific situation.'
            },
            {
              id: 'earnings-tracking',
              question: 'How can I track my earnings and analytics?',
              answer: 'Your creator dashboard provides detailed analytics including earnings, views, engagement rates, top-performing content, and follower demographics to help optimize your strategy.'
            }
          ]
        },
        {
          id: 'content-management',
          title: 'Content Management',
          questions: [
            {
              id: 'upload-limits',
              question: 'Are there limits on how much content I can upload?',
              answer: 'There are no daily upload limits, but individual files must be under 1GB for videos and 50MB for images. We recommend high-quality content over quantity.'
            },
            {
              id: 'content-editing',
              question: 'Can I edit or update content after uploading?',
              answer: 'You can edit captions, tags, and pricing after upload. However, the actual media files cannot be changed. You can delete and re-upload if major changes are needed.'
            },
            {
              id: 'content-scheduling',
              question: 'Can I schedule content to be published later?',
              answer: 'Yes, our scheduling feature allows you to plan and automatically publish content at optimal times. This helps maintain consistent posting even when you\'re busy.'
            },
            {
              id: 'copyright-protection',
              question: 'How is my content protected from theft?',
              answer: 'We use watermarking, right-click protection, and actively monitor for unauthorized sharing. We also provide DMCA takedown services to protect your intellectual property.'
            },
            {
              id: 'content-backup',
              question: 'Should I backup my content separately?',
              answer: 'We recommend keeping local backups of your content. While our platform is secure, having personal backups ensures you never lose your valuable creative work.'
            }
          ]
        }
      ]
    },
    'fans': {
      title: 'For Fans',
      topics: [
        {
          id: 'browsing-content',
          title: 'Browsing & Discovery',
          questions: [
            {
              id: 'find-creators',
              question: 'How do I find creators I might be interested in?',
              answer: 'Use our search function, browse by categories, check trending creators, or use filters by location, content type, or pricing. Our recommendation algorithm will also suggest creators based on your interests.'
            },
            {
              id: 'search-filters',
              question: 'What search filters are available?',
              answer: 'You can filter by category (fashion, fitness, artistic, etc.), location, age range, pricing, content type, and popularity. Advanced filters help you find exactly what you\'re looking for.'
            },
            {
              id: 'favorites-wishlist',
              question: 'Can I save creators to favorites or create wishlists?',
              answer: 'Yes, you can add creators to your favorites list and create custom collections. This makes it easy to find and support your preferred creators quickly.'
            },
            {
              id: 'notifications',
              question: 'How do I get notified about new content from creators I follow?',
              answer: 'Enable notifications in your settings to receive alerts when creators you follow post new content, go live, or have special offers. You can customize notification preferences.'
            },
            {
              id: 'content-preview',
              question: 'Can I preview content before purchasing?',
              answer: 'Creators often provide preview images or teaser content. You can also check their profile portfolio and read reviews from other fans to help make informed decisions.'
            }
          ]
        },
        {
          id: 'purchasing-tips',
          title: 'Purchasing & Payments',
          questions: [
            {
              id: 'payment-security',
              question: 'Is it safe to make payments on the platform?',
              answer: 'Yes, we use industry-standard encryption and secure payment processors. Your financial information is protected and never stored on our servers. All transactions are secure and private.'
            },
            {
              id: 'payment-options',
              question: 'What payment methods are accepted?',
              answer: 'We accept major credit cards, debit cards, PayPal, and other secure payment methods. All payments are processed through encrypted, PCI-compliant payment gateways.'
            },
            {
              id: 'subscription-vs-tips',
              question: 'What\'s the difference between subscriptions and tips?',
              answer: 'Subscriptions provide access to a creator\'s regular content for a monthly fee. Tips are one-time payments to show appreciation for specific content or to support creators directly.'
            },
            {
              id: 'refund-policy',
              question: 'What is the refund policy?',
              answer: 'Refunds are considered on a case-by-case basis for technical issues or unauthorized charges. Digital content purchases are generally final, but we\'ll work with you to resolve any legitimate issues.'
            },
            {
              id: 'spending-limits',
              question: 'Can I set spending limits on my account?',
              answer: 'Yes, you can set daily, weekly, or monthly spending limits in your account settings. This helps you manage your budget and prevents overspending on the platform.'
            }
          ]
        },
        {
          id: 'interaction-etiquette',
          title: 'Interaction & Etiquette',
          questions: [
            {
              id: 'messaging-creators',
              question: 'How should I communicate with creators?',
              answer: 'Be respectful, polite, and understanding that creators are professionals. Avoid demanding free content, respect their boundaries, and remember that response times may vary.'
            },
            {
              id: 'custom-requests',
              question: 'Can I make custom content requests?',
              answer: 'Many creators accept custom requests for additional fees. Check their profile for custom content policies and pricing. Always discuss details and payment before the creator starts working.'
            },
            {
              id: 'review-system',
              question: 'How does the review system work?',
              answer: 'You can leave reviews for creators after purchasing content or services. Reviews help other fans make informed decisions and provide valuable feedback to creators.'
            },
            {
              id: 'fan-community',
              question: 'Is there a community aspect for fans?',
              answer: 'Yes, you can interact with other fans through comments (where enabled by creators), participate in live streams, and join creator-specific community features.'
            },
            {
              id: 'privacy-as-fan',
              question: 'How private are my activities as a fan?',
              answer: 'Your activities are private by default. Creators can see your username when you interact or purchase content, but your personal information and other activities remain confidential.'
            }
          ]
        }
      ]
    }
  };

  return (
    <div className="support-page">
      <div className="container">
        <div className="page-header">
          <h1>Support Center</h1>
          <p>Find answers to your questions and get the help you need</p>
        </div>
      </div>

      <div className="container">
        <div className="page-content">
          <div className="support-content">
        <div className="support-sidebar">
          <div className="section-tabs">
            {Object.entries(supportData).map(([key, section]) => (
              <button
                key={key}
                className={`section-tab ${activeSection === key ? 'active' : ''}`}
                onClick={() => setActiveSection(key)}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>

        <div className="support-main">
          <div className="section-content">
            <h2>{supportData[activeSection].title}</h2>
            
            <div className="topics-list">
              {supportData[activeSection].topics.map((topic) => (
                <div key={topic.id} className="topic-section">
                  <button
                    className={`topic-header ${openTopics[topic.id] ? 'open' : ''}`}
                    onClick={() => toggleTopic(topic.id)}
                  >
                    <h3>{topic.title}</h3>
                    <span className="toggle-icon">{openTopics[topic.id] ? '−' : '+'}</span>
                  </button>
                  
                  {openTopics[topic.id] && (
                    <div className="questions-list">
                      {topic.questions.map((item) => (
                        <div key={item.id} className="question-item">
                          <button
                            className={`question-header ${openQuestions[item.id] ? 'open' : ''}`}
                            onClick={() => toggleQuestion(item.id)}
                          >
                            <span className="question-text">{item.question}</span>
                            <span className="toggle-icon">{openQuestions[item.id] ? '−' : '+'}</span>
                          </button>
                          
                          {openQuestions[item.id] && (
                            <div className="answer-content">
                              <p>{item.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
        </div>
      </div>

      <div className="container">
        <div className="contact-support">
          <div className="contact-section">
            <h3>Still need help?</h3>
            <p>Can't find what you're looking for? Our support team is here to help.</p>
            <button className="btn-primary contact-btn">Contact Support</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;