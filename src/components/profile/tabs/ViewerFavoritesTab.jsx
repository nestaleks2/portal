import React, { useState } from 'react';

const ViewerFavoritesTab = () => {
  const [filter, setFilter] = useState('all');

  const favorites = [
    {
      id: 1,
      type: 'photo',
      creator: 'Sky Model',
      thumbnail: 'https://images.unsplash.com/photo-1494790108755-2616c9ef2fe8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      title: 'Sunset Beach Photoshoot',
      addedDate: '2024-01-10',
      likes: 324,
      comments: 45
    },
    {
      id: 2,
      type: 'video',
      creator: 'Luna Rose',
      thumbnail: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      title: 'Behind the Scenes - Studio Session',
      addedDate: '2024-01-08',
      likes: 198,
      comments: 32,
      duration: '5:24'
    },
    {
      id: 3,
      type: 'photo',
      creator: 'Aria Storm',
      thumbnail: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      title: 'Fitness Motivation Series',
      addedDate: '2024-01-05',
      likes: 412,
      comments: 67
    },
    {
      id: 4,
      type: 'video',
      creator: 'Sky Model',
      thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      title: 'Travel Vlog - Bali Adventures',
      addedDate: '2024-01-03',
      likes: 289,
      comments: 54,
      duration: '12:15'
    }
  ];

  const filteredFavorites = favorites.filter(fav => {
    if (filter === 'photos') return fav.type === 'photo';
    if (filter === 'videos') return fav.type === 'video';
    return true;
  });

  const stats = [
    { label: 'Total Favorites', value: favorites.length.toString() },
    { label: 'Photos', value: favorites.filter(f => f.type === 'photo').length.toString() },
    { label: 'Videos', value: favorites.filter(f => f.type === 'video').length.toString() },
    { label: 'This Month', value: '12' }
  ];

  return (
    <div className="favorites-tab">
      <div className="tab-header">
        <h2>My Favorites</h2>
        <p>Your saved content from creators you follow</p>
      </div>

      <div className="dashboard-wrapper">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-main">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <div className="content-header">
          <h3>Saved Content</h3>
          <div className="content-filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === 'photos' ? 'active' : ''}`}
              onClick={() => setFilter('photos')}
            >
              Photos
            </button>
            <button 
              className={`filter-btn ${filter === 'videos' ? 'active' : ''}`}
              onClick={() => setFilter('videos')}
            >
              Videos
            </button>
          </div>
        </div>

        <div className="content-grid">
          {filteredFavorites.map((favorite) => (
            <div key={favorite.id} className="content-card">
              <div className="content-thumbnail">
                <img src={favorite.thumbnail} alt={favorite.title} />
                <div className="content-overlay">
                  <div className="content-type">
                    {favorite.type === 'video' ? '🎥' : '📷'}
                  </div>
                  {favorite.duration && (
                    <div className="video-duration">{favorite.duration}</div>
                  )}
                </div>
              </div>
              
              <div className="content-info">
                <h4 className="content-title">{favorite.title}</h4>
                <p className="content-creator">by {favorite.creator}</p>
                
                <div className="content-meta">
                  <span className="content-date">Added {favorite.addedDate}</span>
                </div>
                
                <div className="content-stats">
                  <div className="content-stat">
                    <span className="stat-icon">❤️</span>
                    <span>{favorite.likes}</span>
                  </div>
                  <div className="content-stat">
                    <span className="stat-icon">💬</span>
                    <span>{favorite.comments}</span>
                  </div>
                </div>
                
                <div className="content-actions">
                  <button className="action-btn primary small">View</button>
                  <button className="action-btn secondary small">Remove</button>
                  <button className="action-btn secondary small">Share</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredFavorites.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">⭐</div>
          <h3>No favorites yet</h3>
          <p>Start exploring content from your favorite creators and save the ones you love!</p>
          <button className="btn-primary">Discover Content</button>
        </div>
      )}
    </div>
  );
};

export default ViewerFavoritesTab;