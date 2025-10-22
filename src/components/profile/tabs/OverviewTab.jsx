import React from 'react';

const OverviewTab = () => {
  const stats = [
    { label: 'Views', value: '24.8K', change: '+12%', trend: 'up' },
    { label: 'Posts', value: '156', change: '+8', trend: 'up' },
    { label: 'Followers', value: '2.5K', change: '+15', trend: 'up' },
    { label: 'Likes', value: '18.2K', change: '+24%', trend: 'up' },
    { label: 'Comments', value: '1.2K', change: '+5%', trend: 'up' },
    { label: 'Earnings', value: '$1,245', change: '+18%', trend: 'up' }
  ];

  const recentActivity = [
    { type: 'like', message: 'Someone liked your photo', time: '2 minutes ago', icon: '❤️' },
    { type: 'follow', message: 'New follower: @johndoe', time: '15 minutes ago', icon: '👤' },
    { type: 'comment', message: 'New comment on your post', time: '1 hour ago', icon: '💬' },
    { type: 'subscription', message: 'New premium subscriber', time: '2 hours ago', icon: '💎' },
    { type: 'upload', message: 'Photo upload completed', time: '3 hours ago', icon: '📷' }
  ];

  const topPosts = [
    { 
      id: 1, 
      image: 'https://images.unsplash.com/photo-1494790108755-2616c9ef2fe8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      views: '2.1K',
      likes: '324',
      comments: '45'
    },
    { 
      id: 2, 
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      views: '1.8K',
      likes: '298',
      comments: '32'
    },
    { 
      id: 3, 
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      views: '1.5K',
      likes: '245',
      comments: '28'
    }
  ];

  return (
    <div className="overview-tab">
      <div className="tab-header">
        <h2>Overview</h2>
        <p>Your account performance and recent activity</p>
      </div>

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
          <h3>Top Performing Posts</h3>
          <div className="top-posts">
            {topPosts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-image">
                  <img src={post.image} alt={`Post ${post.id}`} />
                </div>
                <div className="post-stats">
                  <div className="post-stat">
                    <span className="stat-icon">👁️</span>
                    <span>{post.views}</span>
                  </div>
                  <div className="post-stat">
                    <span className="stat-icon">❤️</span>
                    <span>{post.likes}</span>
                  </div>
                  <div className="post-stat">
                    <span className="stat-icon">💬</span>
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="overview-section">
        <h3>Quick Actions</h3>
        <div className="quick-actions">
          <button className="action-btn primary">
            <span className="action-icon">📷</span>
            Upload Content
          </button>
          <button className="action-btn secondary">
            <span className="action-icon">📊</span>
            View Analytics
          </button>
          <button className="action-btn secondary">
            <span className="action-icon">💬</span>
            Check Messages
          </button>
          <button className="action-btn secondary">
            <span className="action-icon">⚙️</span>
            Update Profile
          </button>
        </div>
      </div>

      <div className="overview-section">
        <h3>Performance Chart</h3>
        <div className="chart-container">
          <div className="chart-placeholder">
            <canvas id="performanceChart" width="100%" height="200"></canvas>
            <div className="chart-fallback">
              <p>Performance chart will be displayed here</p>
              <div className="chart-mock">
                <div className="chart-bar" style={{height: '60%'}}></div>
                <div className="chart-bar" style={{height: '80%'}}></div>
                <div className="chart-bar" style={{height: '40%'}}></div>
                <div className="chart-bar" style={{height: '100%'}}></div>
                <div className="chart-bar" style={{height: '70%'}}></div>
                <div className="chart-bar" style={{height: '90%'}}></div>
                <div className="chart-bar" style={{height: '55%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;