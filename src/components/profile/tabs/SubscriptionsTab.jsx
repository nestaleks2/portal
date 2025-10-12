import React, { useState } from 'react';

const SubscriptionsTab = () => {
  const [filter, setFilter] = useState('all');

  const subscriptions = [
    {
      id: 1,
      creator: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c9ef2fe8?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      plan: 'Pro',
      price: '$19.99/month',
      status: 'active',
      renewDate: '2024-01-15',
      subscribed: '6 months ago'
    },
    {
      id: 2,
      creator: 'Emma Davis',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      plan: 'Essential',
      price: '$9.99/month',
      status: 'active',
      renewDate: '2024-01-20',
      subscribed: '3 months ago'
    },
    {
      id: 3,
      creator: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      plan: 'Premium',
      price: '$39.99/month',
      status: 'cancelled',
      renewDate: null,
      subscribed: '1 year ago'
    }
  ];

  const mySubscriptions = [
    {
      id: 1,
      type: 'Premium Platform',
      plan: 'Pro Annual',
      price: '$159.99/year',
      status: 'active',
      renewDate: '2024-06-15',
      features: ['Unlimited content access', 'Ad-free experience', 'Priority support']
    }
  ];

  const filteredSubscriptions = subscriptions.filter(sub => {
    if (filter === 'all') return true;
    return sub.status === filter;
  });

  const handleManageSubscription = (id, action) => {
    alert(`${action} subscription ${id} (demo)`);
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      active: 'success',
      cancelled: 'error',
      expired: 'warning'
    };
    return `status-badge ${statusColors[status] || 'default'}`;
  };

  return (
    <div className="subscriptions-tab">
      <div className="tab-header">
        <h2>Subscriptions</h2>
        <p>Manage your subscriptions and view your subscription activity</p>
      </div>

      <div className="subscription-overview">
        <div className="overview-stats">
          <div className="stat-card">
            <div className="stat-number">{subscriptions.filter(s => s.status === 'active').length}</div>
            <div className="stat-label">Active Subscriptions</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">${subscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + parseFloat(s.price.replace('$', '').replace('/month', '')), 0).toFixed(2)}</div>
            <div className="stat-label">Monthly Spending</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{subscriptions.length}</div>
            <div className="stat-label">Total Subscriptions</div>
          </div>
        </div>
      </div>

      <div className="subscription-section">
        <h3>My Platform Subscription</h3>
        <div className="platform-subscription">
          {mySubscriptions.map(sub => (
            <div key={sub.id} className="subscription-card platform">
              <div className="subscription-header">
                <div className="subscription-info">
                  <h4>{sub.type}</h4>
                  <p className="subscription-plan">{sub.plan}</p>
                </div>
                <div className="subscription-price">{sub.price}</div>
              </div>
              <div className="subscription-details">
                <div className="subscription-status">
                  <span className={getStatusBadge(sub.status)}>{sub.status}</span>
                  {sub.renewDate && (
                    <span className="renew-date">Renews {sub.renewDate}</span>
                  )}
                </div>
                <div className="subscription-features">
                  <h5>Included Features:</h5>
                  <ul>
                    {sub.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="subscription-actions">
                  <button className="action-btn secondary">Modify Plan</button>
                  <button className="action-btn danger">Cancel Subscription</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="subscription-section">
        <div className="section-header">
          <h3>Creator Subscriptions</h3>
          <div className="subscription-filters">
            {['all', 'active', 'cancelled'].map(filterType => (
              <button
                key={filterType}
                className={`filter-btn ${filter === filterType ? 'active' : ''}`}
                onClick={() => setFilter(filterType)}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="subscriptions-list">
          {filteredSubscriptions.map(sub => (
            <div key={sub.id} className="subscription-card">
              <div className="subscription-creator">
                <img src={sub.avatar} alt={sub.creator} className="creator-avatar" />
                <div className="creator-info">
                  <h4>{sub.creator}</h4>
                  <p>Subscribed {sub.subscribed}</p>
                </div>
              </div>
              <div className="subscription-plan-info">
                <div className="plan-details">
                  <span className="plan-name">{sub.plan}</span>
                  <span className="plan-price">{sub.price}</span>
                </div>
                <div className="subscription-status">
                  <span className={getStatusBadge(sub.status)}>{sub.status}</span>
                  {sub.renewDate && (
                    <span className="renew-date">Renews {sub.renewDate}</span>
                  )}
                </div>
              </div>
              <div className="subscription-actions">
                {sub.status === 'active' ? (
                  <>
                    <button 
                      className="action-btn secondary"
                      onClick={() => handleManageSubscription(sub.id, 'Modify')}
                    >
                      Modify
                    </button>
                    <button 
                      className="action-btn danger"
                      onClick={() => handleManageSubscription(sub.id, 'Cancel')}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button 
                    className="action-btn primary"
                    onClick={() => handleManageSubscription(sub.id, 'Reactivate')}
                  >
                    Reactivate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="subscription-section">
        <h3>Subscription History</h3>
        <div className="history-list">
          <div className="history-item">
            <div className="history-date">Jan 15, 2024</div>
            <div className="history-details">
              <div className="history-action">Payment processed for Sarah Johnson - Pro Plan</div>
              <div className="history-amount">$19.99</div>
            </div>
          </div>
          <div className="history-item">
            <div className="history-date">Jan 10, 2024</div>
            <div className="history-details">
              <div className="history-action">Cancelled subscription to Alex Rivera</div>
              <div className="history-amount">-</div>
            </div>
          </div>
          <div className="history-item">
            <div className="history-date">Dec 20, 2023</div>
            <div className="history-details">
              <div className="history-action">Payment processed for Emma Davis - Essential Plan</div>
              <div className="history-amount">$9.99</div>
            </div>
          </div>
        </div>
      </div>

      <div className="subscription-section">
        <h3>Discover New Creators</h3>
        <div className="discover-creators">
          <button className="action-btn primary large">Browse Creators</button>
          <button className="action-btn secondary large">View Recommendations</button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsTab;