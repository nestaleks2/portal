import React, { useState } from 'react';

const FollowersTab = () => {
  const [activeSection, setActiveSection] = useState('followers');

  const followers = [
    {
      id: 1,
      name: 'John Smith',
      username: '@johnsmith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      followedDate: '2 days ago',
      isSubscriber: true,
      isPremium: false
    },
    {
      id: 2,
      name: 'Emily Wilson',
      username: '@emilyw',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c9ef2fe8?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      followedDate: '1 week ago',
      isSubscriber: true,
      isPremium: true
    },
    {
      id: 3,
      name: 'Michael Brown',
      username: '@mikeb',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      followedDate: '2 weeks ago',
      isSubscriber: false,
      isPremium: false
    }
  ];

  const following = [
    {
      id: 1,
      name: 'Sarah Johnson',
      username: '@sarahj',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      followedDate: '3 months ago',
      isSubscriber: false,
      isPremium: false
    },
    {
      id: 2,
      name: 'Alex Rivera',
      username: '@alexr',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      followedDate: '6 months ago',
      isSubscriber: false,
      isPremium: false
    }
  ];

  const handleFollowAction = (id, action) => {
    alert(`${action} user ${id} (demo)`);
  };

  const handleMessageUser = (id) => {
    alert(`Message user ${id} (demo)`);
  };

  const stats = {
    followers: followers.length,
    following: following.length,
    subscribers: followers.filter(f => f.isSubscriber).length,
    premiumSubscribers: followers.filter(f => f.isPremium).length
  };

  return (
    <div className="followers-tab">
      <div className="tab-header">
        <h2>Followers & Following</h2>
        <p>Manage your followers and see who you're following</p>
      </div>

      <div className="followers-stats">
        <div className="stat-card">
          <div className="stat-number">{stats.followers}</div>
          <div className="stat-label">Followers</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.following}</div>
          <div className="stat-label">Following</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.subscribers}</div>
          <div className="stat-label">Subscribers</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.premiumSubscribers}</div>
          <div className="stat-label">Premium Subscribers</div>
        </div>
      </div>

      <div className="followers-navigation">
        <button
          className={`nav-btn ${activeSection === 'followers' ? 'active' : ''}`}
          onClick={() => setActiveSection('followers')}
        >
          Followers ({followers.length})
        </button>
        <button
          className={`nav-btn ${activeSection === 'following' ? 'active' : ''}`}
          onClick={() => setActiveSection('following')}
        >
          Following ({following.length})
        </button>
      </div>

      <div className="followers-content">
        {activeSection === 'followers' && (
          <div className="followers-list">
            <div className="section-header">
              <h3>Your Followers</h3>
              <div className="followers-actions">
                <button className="action-btn secondary">Export List</button>
                <button className="action-btn primary">Invite Friends</button>
              </div>
            </div>
            
            <div className="users-grid">
              {followers.map(follower => (
                <div key={follower.id} className="user-card">
                  <div className="user-avatar">
                    <img src={follower.avatar} alt={follower.name} />
                    {follower.isPremium && (
                      <div className="premium-badge">💎</div>
                    )}
                  </div>
                  <div className="user-info">
                    <h4>{follower.name}</h4>
                    <p className="username">{follower.username}</p>
                    <p className="follow-date">Followed {follower.followedDate}</p>
                    {follower.isSubscriber && (
                      <span className="subscriber-badge">
                        {follower.isPremium ? 'Premium Subscriber' : 'Subscriber'}
                      </span>
                    )}
                  </div>
                  <div className="user-actions">
                    <button 
                      className="action-btn secondary small"
                      onClick={() => handleMessageUser(follower.id)}
                    >
                      Message
                    </button>
                    <button 
                      className="action-btn danger small"
                      onClick={() => handleFollowAction(follower.id, 'Block')}
                    >
                      Block
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'following' && (
          <div className="following-list">
            <div className="section-header">
              <h3>People You Follow</h3>
              <div className="following-actions">
                <button className="action-btn secondary">Discover More</button>
              </div>
            </div>
            
            <div className="users-grid">
              {following.map(user => (
                <div key={user.id} className="user-card">
                  <div className="user-avatar">
                    <img src={user.avatar} alt={user.name} />
                  </div>
                  <div className="user-info">
                    <h4>{user.name}</h4>
                    <p className="username">{user.username}</p>
                    <p className="follow-date">Following since {user.followedDate}</p>
                  </div>
                  <div className="user-actions">
                    <button 
                      className="action-btn secondary small"
                      onClick={() => handleMessageUser(user.id)}
                    >
                      Message
                    </button>
                    <button 
                      className="action-btn danger small"
                      onClick={() => handleFollowAction(user.id, 'Unfollow')}
                    >
                      Unfollow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="followers-insights">
        <h3>Follower Insights</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <h4>Growth This Month</h4>
            <div className="insight-value">+12 followers</div>
            <div className="insight-change positive">↗ +24%</div>
          </div>
          <div className="insight-card">
            <h4>Engagement Rate</h4>
            <div className="insight-value">8.5%</div>
            <div className="insight-change positive">↗ +2.1%</div>
          </div>
          <div className="insight-card">
            <h4>Subscriber Conversion</h4>
            <div className="insight-value">45%</div>
            <div className="insight-change positive">↗ +5%</div>
          </div>
        </div>
      </div>

      <div className="follower-management">
        <h3>Follower Management</h3>
        <div className="management-tools">
          <div className="tool-card">
            <span className="tool-icon">📧</span>
            <h4>Bulk Message</h4>
            <p>Send a message to all your followers</p>
            <button className="tool-btn">Compose Message</button>
          </div>
          <div className="tool-card">
            <span className="tool-icon">🎯</span>
            <h4>Targeted Campaigns</h4>
            <p>Create campaigns for specific follower groups</p>
            <button className="tool-btn">Create Campaign</button>
          </div>
          <div className="tool-card">
            <span className="tool-icon">📊</span>
            <h4>Analytics</h4>
            <p>Detailed analytics about your followers</p>
            <button className="tool-btn">View Analytics</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowersTab;