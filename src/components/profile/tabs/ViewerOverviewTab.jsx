import React from 'react';

const ViewerOverviewTab = () => {
  const stats = [
    { label: 'Following', value: '42', change: '+3', trend: 'up' },
    { label: 'Favorites', value: '156', change: '+12', trend: 'up' },
    { label: 'Comments', value: '89', change: '+5', trend: 'up' },
    { label: 'Spent', value: '$89', change: '+15', trend: 'up' },
    { label: 'Active Days', value: '28', change: '+2', trend: 'up' },
    { label: 'Subscriptions', value: '8', change: '+1', trend: 'up' }
  ];

  const recentActivity = [
    { type: 'subscription', message: 'Subscribed to @skymodel', time: '2 hours ago', icon: '💎' },
    { type: 'like', message: 'Liked a new photo from @skymodel', time: '5 hours ago', icon: '❤️' },
    { type: 'comment', message: 'Commented on a post', time: '1 day ago', icon: '💬' },
    { type: 'follow', message: 'Started following @newmodel', time: '2 days ago', icon: '👤' },
    { type: 'favorite', message: 'Added photo to favorites', time: '3 days ago', icon: '⭐' }
  ];

  const recommendedCreators = [
    { 
      id: 1, 
      name: 'Sky Model',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c9ef2fe8?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80',
      followers: '2.1K',
      category: 'Fashion'
    },
    { 
      id: 2, 
      name: 'Luna Rose',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80',
      followers: '1.8K',
      category: 'Lifestyle'
    },
    { 
      id: 3, 
      name: 'Aria Storm',
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80',
      followers: '3.2K',
      category: 'Fitness'
    }
  ];

  return (
    <div className="overview-tab">
      <div className="tab-header">
        <h2>Overview</h2>
        <p>Your activity and engagement statistics</p>
      </div>

      <div className="dashboard-wrapper">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="dashboard-stat-card">
              <div className="stat-main">
                <div className="dashboard-stat-number">{stat.value}</div>
                <div className="dashboard-stat-label">{stat.label}</div>
              </div>
              <div className={`stat-change ${stat.trend}`}>
                <span className="change-icon">{stat.trend === 'up' ? '↗' : '↘'}</span>
                <span className="change-value">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="overview-content">
        <div className="overview-section">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-content">
                  <div className="activity-message">{activity.message}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overview-section">
          <h3>Recommended Creators</h3>
          <div className="recommended-creators">
            {recommendedCreators.map((creator) => (
              <div key={creator.id} className="creator-card">
                <div className="creator-image">
                  <img src={creator.image} alt={creator.name} />
                </div>
                <div className="creator-info">
                  <h4>{creator.name}</h4>
                  <p className="creator-category">{creator.category}</p>
                  <p className="creator-followers">{creator.followers} followers</p>
                </div>
                <button className="btn-primary btn-small">Follow</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <button className="action-btn primary">
          <span>🔍</span>
          Discover New Creators
        </button>
        <button className="action-btn secondary">
          <span>⭐</span>
          View Favorites
        </button>
        <button className="action-btn secondary">
          <span>💎</span>
          Manage Subscriptions
        </button>
      </div>
    </div>
  );
};

export default ViewerOverviewTab;