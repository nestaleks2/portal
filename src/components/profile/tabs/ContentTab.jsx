import React, { useState } from 'react';

const ContentTab = () => {
  const [uploadProgress, setUploadProgress] = useState({ visible: false, progress: 0 });
  const [filter, setFilter] = useState('all');

  const simulateUpload = (files) => {
    setUploadProgress({ visible: true, progress: 0 });
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev.progress + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress({ visible: false, progress: 0 });
            alert(`Successfully uploaded ${files.length} file(s)`);
          }, 500);
          return { visible: true, progress: 100 };
        }
        return { visible: true, progress: newProgress };
      });
    }, 200);
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      simulateUpload(files);
    }
  };

  const contentItems = [
    {
      id: 1,
      type: 'photo',
      title: 'Professional Photoshoot',
      thumbnail: 'https://images.unsplash.com/photo-1494790108755-2616c9ef2fe8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      views: '2.1K',
      likes: '324',
      date: '2 days ago',
      status: 'published',
      isPremium: false
    },
    {
      id: 2,
      type: 'video',
      title: 'Behind the Scenes Video',
      thumbnail: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      views: '1.8K',
      likes: '298',
      date: '5 days ago',
      status: 'published',
      isPremium: true
    },
    {
      id: 3,
      type: 'photo',
      title: 'Fashion Portrait Series',
      thumbnail: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      views: '1.5K',
      likes: '245',
      date: '1 week ago',
      status: 'published',
      isPremium: false
    },
    {
      id: 4,
      type: 'photo',
      title: 'Editorial Shoot Draft',
      thumbnail: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      views: '0',
      likes: '0',
      date: '3 hours ago',
      status: 'draft',
      isPremium: false
    }
  ];

  const filteredContent = contentItems.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'photos') return item.type === 'photo';
    if (filter === 'videos') return item.type === 'video';
    if (filter === 'premium') return item.isPremium;
    if (filter === 'drafts') return item.status === 'draft';
    return true;
  });

  const handleDeleteContent = (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      alert(`Content ${id} deleted (demo)`);
    }
  };

  const handleEditContent = (id) => {
    alert(`Edit content ${id} (demo)`);
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      published: 'success',
      draft: 'warning',
      processing: 'info'
    };
    return `status-badge ${statusColors[status] || 'default'}`;
  };

  return (
    <div className="content-tab">
      <div className="tab-header">
        <h2>Content Management</h2>
        <p>Upload, organize, and manage your content</p>
      </div>

      <div className="upload-section">
        <h3>Upload New Content</h3>
        <div className="upload-area">
          <div className="upload-box">
            <span className="upload-icon">📷</span>
            <h4>Upload Photos</h4>
            <p>JPG, PNG up to 10MB</p>
            <input 
              type="file" 
              className="file-input" 
              multiple 
              accept="image/*"
              onChange={handleFileUpload}
            />
            <button className="upload-btn">Choose Files</button>
          </div>
          <div className="upload-box">
            <span className="upload-icon">🎥</span>
            <h4>Upload Videos</h4>
            <p>MP4, MOV up to 100MB</p>
            <input 
              type="file" 
              className="file-input" 
              multiple 
              accept="video/*"
              onChange={handleFileUpload}
            />
            <button className="upload-btn">Choose Files</button>
          </div>
          <div className="upload-box">
            <span className="upload-icon">📱</span>
            <h4>Live Stream</h4>
            <p>Start live streaming</p>
            <button className="upload-btn live-btn">Go Live</button>
          </div>
        </div>
        
        {uploadProgress.visible && (
          <div className="upload-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${uploadProgress.progress}%` }}
              />
            </div>
            <div className="progress-text">
              Uploading: {Math.round(uploadProgress.progress)}%
            </div>
          </div>
        )}
      </div>

      <div className="content-section">
        <div className="content-header">
          <h3>Your Content</h3>
          <div className="content-filters">
            {['all', 'photos', 'videos', 'premium', 'drafts'].map(filterType => (
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

        <div className="content-stats">
          <div className="stat-item">
            <span className="stat-number">{contentItems.filter(item => item.type === 'photo').length}</span>
            <span className="stat-label">Photos</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{contentItems.filter(item => item.type === 'video').length}</span>
            <span className="stat-label">Videos</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{contentItems.filter(item => item.isPremium).length}</span>
            <span className="stat-label">Premium</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{contentItems.filter(item => item.status === 'draft').length}</span>
            <span className="stat-label">Drafts</span>
          </div>
        </div>

        <div className="content-grid">
          {filteredContent.map(item => (
            <div key={item.id} className="content-card">
              <div className="content-thumbnail">
                <img src={item.thumbnail} alt={item.title} />
                <div className="content-overlay">
                  <div className="content-type">
                    {item.type === 'video' ? '🎥' : '📷'}
                  </div>
                  {item.isPremium && (
                    <div className="premium-badge">💎</div>
                  )}
                </div>
              </div>
              <div className="content-info">
                <h4 className="content-title">{item.title}</h4>
                <div className="content-meta">
                  <span className={getStatusBadge(item.status)}>{item.status}</span>
                  <span className="content-date">{item.date}</span>
                </div>
                <div className="content-stats">
                  <span className="content-stat">
                    <span className="stat-icon">👁️</span>
                    {item.views}
                  </span>
                  <span className="content-stat">
                    <span className="stat-icon">❤️</span>
                    {item.likes}
                  </span>
                </div>
                <div className="content-actions">
                  <button 
                    className="action-btn edit"
                    onClick={() => handleEditContent(item.id)}
                  >
                    Edit
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDeleteContent(item.id)}
                  >
                    Delete
                  </button>
                  <button className="action-btn share">
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📁</div>
            <h4>No content found</h4>
            <p>Try adjusting your filters or upload some new content</p>
          </div>
        )}
      </div>

      <div className="content-tools">
        <h3>Content Tools</h3>
        <div className="tools-grid">
          <div className="tool-card">
            <span className="tool-icon">📊</span>
            <h4>Analytics</h4>
            <p>View detailed performance metrics for your content</p>
            <button className="tool-btn">View Analytics</button>
          </div>
          <div className="tool-card">
            <span className="tool-icon">📅</span>
            <h4>Schedule Posts</h4>
            <p>Plan and schedule your content releases</p>
            <button className="tool-btn">Schedule Content</button>
          </div>
          <div className="tool-card">
            <span className="tool-icon">🎨</span>
            <h4>Edit Tools</h4>
            <p>Basic photo and video editing capabilities</p>
            <button className="tool-btn">Open Editor</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTab;