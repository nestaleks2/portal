import React, { useState } from 'react';

const ViewerSubscriptionsTab = () => {
  const [filter, setFilter] = useState('active');

  const subscriptions = [
    {
      id: 1,
      creator: 'Sky Model',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c9ef2fe8?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80',
      plan: 'Premium',
      price: '$19.99',
      period: 'monthly',
      status: 'active',
      nextBilling: '2024-01-15',
      joinDate: '2023-12-15',
      totalSpent: '$59.97'
    },
    {
      id: 2,
      creator: 'Luna Rose',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80',
      plan: 'Basic',
      price: '$9.99',
      period: 'monthly',
      status: 'active',
      nextBilling: '2024-01-20',
      joinDate: '2024-01-01',
      totalSpent: '$9.99'
    },
    {
      id: 3,
      creator: 'Aria Storm',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80',
      plan: 'Premium',
      price: '$19.99',
      period: 'monthly',
      status: 'cancelled',
      cancelDate: '2023-12-01',
      joinDate: '2023-10-15',
      totalSpent: '$39.98'
    }
  ];

  const filteredSubscriptions = subscriptions.filter(sub => {
    if (filter === 'active') return sub.status === 'active';
    if (filter === 'cancelled') return sub.status === 'cancelled';
    return true;
  });

  const totalMonthlySpend = subscriptions
    .filter(sub => sub.status === 'active')
    .reduce((total, sub) => total + parseFloat(sub.price.replace('$', '')), 0);

  return (
    <div className="subscriptions-tab">
      <div className="tab-header">
        <h2>My Subscriptions</h2>
        <p>Manage your creator subscriptions and billing</p>
      </div>

      <div className="dashboard-wrapper">
        <div className="stats-grid">
          <div className="dashboard-stat-card">
            <div className="stat-main">
              <div className="dashboard-stat-number">{subscriptions.filter(s => s.status === 'active').length}</div>
              <div className="dashboard-stat-label">Active Subscriptions</div>
            </div>
          </div>
          <div className="dashboard-stat-card">
            <div className="stat-main">
              <div className="dashboard-stat-number">${totalMonthlySpend.toFixed(2)}</div>
              <div className="dashboard-stat-label">Monthly Spend</div>
            </div>
          </div>
          <div className="dashboard-stat-card">
            <div className="stat-main">
              <div className="dashboard-stat-number">{subscriptions.length}</div>
              <div className="dashboard-stat-label">Total Subscribed</div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="content-header">
          <h3>Subscription Management</h3>
          <div className="content-filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
              onClick={() => setFilter('cancelled')}
            >
              Cancelled
            </button>
          </div>
        </div>

        <div className="subscriptions-list">
          {filteredSubscriptions.map((subscription) => (
            <div key={subscription.id} className="subscription-item">
              <div className="subscription-info">
                <div className="creator-avatar">
                  <img src={subscription.avatar} alt={subscription.creator} />
                </div>
                <div className="subscription-details">
                  <h4>{subscription.creator}</h4>
                  <p className="plan-info">{subscription.plan} Plan</p>
                  <p className="price-info">{subscription.price}/{subscription.period}</p>
                </div>
              </div>

              <div className="subscription-meta">
                <div className="subscription-dates">
                  <p><strong>Joined:</strong> {subscription.joinDate}</p>
                  {subscription.status === 'active' ? (
                    <p><strong>Next billing:</strong> {subscription.nextBilling}</p>
                  ) : (
                    <p><strong>Cancelled:</strong> {subscription.cancelDate}</p>
                  )}
                  <p><strong>Total spent:</strong> {subscription.totalSpent}</p>
                </div>
                
                <div className={`status-badge ${subscription.status === 'active' ? 'success' : 'warning'}`}>
                  {subscription.status === 'active' ? 'Active' : 'Cancelled'}
                </div>
              </div>

              <div className="subscription-actions">
                {subscription.status === 'active' ? (
                  <>
                    <button className="btn-secondary btn-small">View Content</button>
                    <button className="btn-primary btn-small">Manage</button>
                  </>
                ) : (
                  <button className="btn-primary btn-small">Resubscribe</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredSubscriptions.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">💎</div>
          <h3>No subscriptions found</h3>
          <p>Start discovering amazing creators and subscribe to get exclusive content!</p>
          <button className="btn-primary">Discover Creators</button>
        </div>
      )}
    </div>
  );
};

export default ViewerSubscriptionsTab;