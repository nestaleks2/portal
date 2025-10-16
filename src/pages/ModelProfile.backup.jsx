import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { modelsData } from '../data/modelsData';
import Lightbox from '../components/Lightbox';

const ModelProfile = () => {
  const { id } = useParams();
  const model = modelsData.find(m => m.id === parseInt(id)) || modelsData[0];
  
  const [activeTab, setActiveTab] = useState('photos');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItems, setLightboxItems] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxType, setLightboxType] = useState('image');

  const openLightbox = (items, index, type = 'image') => {
    setLightboxItems(items);
    setLightboxIndex(index);
    setLightboxType(type);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <div className="model-profile-v2">
      <div className="container">
        {/* Hero Section */}
        <div className="profile-hero">
          <div className="hero-content">
            <div className="hero-image-container">
              <img src={model.avatar} alt={model.name} className="hero-main-image" />
              <div className="hero-overlay">
                <div className="hero-info">
                  <h1 className="hero-name">{model.stageName || model.name}</h1>
                  {model.stageName && model.stageName !== model.name && (
                    <p className="hero-real-name">{model.name} {model.surname}</p>
                  )}
                  <div className="hero-location">
                    <span className="location-icon">📍</span>
                    {model.country}
                  </div>
                  <div className="hero-details">
                    <div className="detail-row">
                      <span className="detail-label">Age:</span>
                      <span className="detail-value">{model.age} years</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Height:</span>
                      <span className="detail-value">{model.height}cm</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Body Type:</span>
                      <span className="detail-value">{model.bodyType}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Hair:</span>
                      <span className="detail-value">{model.hairColor}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Style:</span>
                      <span className="detail-value">{model.style}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Measurements:</span>
                      <span className="detail-value">{model.measurements}</span>
                    </div>
                  </div>
                  {model.bioEN && (
                    <div className="hero-bio">
                      <p>{model.bioEN}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          {/* Left Sidebar */}
          <div className="profile-sidebar">
            {/* About Card */}
            <div className="info-card">
              <h3 className="card-title">About</h3>
              <div className="card-content">
                {model.bioEN && (
                  <p className="bio-text">{model.bioEN}</p>
                )}
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Style</span>
                    <span className="info-value">{model.style}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Hair</span>
                    <span className="info-value">{model.hairColor}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Body Type</span>
                    <span className="info-value">{model.bodyType}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Features</span>
                    <span className="info-value">{model.features}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Measurements Card */}
            <div className="info-card">
              <h3 className="card-title">Measurements</h3>
              <div className="card-content">
                <div className="measurements-grid">
                  <div className="measurement-item">
                    <span className="measurement-label">Bust/Waist/Hips</span>
                    <span className="measurement-value">{model.measurements}</span>
                  </div>
                  <div className="measurement-item">
                    <span className="measurement-label">Clothing Size</span>
                    <span className="measurement-value">{model.clothingSize}</span>
                  </div>
                  <div className="measurement-item">
                    <span className="measurement-label">Shoe Size</span>
                    <span className="measurement-value">{model.shoeSize}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interests Card */}
            <div className="info-card">
              <h3 className="card-title">Interests</h3>
              <div className="card-content">
                <div className="interests-tags">
                  {model.hobbies.split(', ').map((hobby, index) => (
                    <span key={index} className="interest-tag">{hobby}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            {model.social && Object.values(model.social).some(link => link) && (
              <div className="info-card">
                <h3 className="card-title">Connect</h3>
                <div className="card-content">
                  <div className="social-links-grid">
                    {model.social.instagram && (
                      <a href={model.social.instagram} target="_blank" rel="noopener noreferrer" className="social-link-card">
                        <span className="social-icon">📷</span>
                        <span className="social-name">Instagram</span>
                      </a>
                    )}
                    {model.social.x && (
                      <a href={model.social.x} target="_blank" rel="noopener noreferrer" className="social-link-card">
                        <span className="social-icon">✖️</span>
                        <span className="social-name">X</span>
                      </a>
                    )}
                    {model.social.youtube && (
                      <a href={model.social.youtube} target="_blank" rel="noopener noreferrer" className="social-link-card">
                        <span className="social-icon">📺</span>
                        <span className="social-name">YouTube</span>
                      </a>
                    )}
                    {model.social.onlyfans && (
                      <a href={model.social.onlyfans} target="_blank" rel="noopener noreferrer" className="social-link-card">
                        <span className="social-icon">🔥</span>
                        <span className="social-name">OnlyFans</span>
                      </a>
                    )}
                    {model.social.linkme && (
                      <a href={model.social.linkme} target="_blank" rel="noopener noreferrer" className="social-link-card">
                        <span className="social-icon">🔗</span>
                        <span className="social-name">LinkMe</span>
                      </a>
                    )}
                    {model.social.website && (
                      <a href={model.social.website} target="_blank" rel="noopener noreferrer" className="social-link-card">
                        <span className="social-icon">🌐</span>
                        <span className="social-name">Website</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="profile-main">
            {/* Tab Navigation */}
            <div className="content-tabs">
              <div className="tab-buttons">
                <button 
                  className={`tab-button ${activeTab === 'photos' ? 'active' : ''}`}
                  onClick={() => setActiveTab('photos')}
                >
                  <span className="tab-icon">📷</span>
                  <span className="tab-text">Photos</span>
                  <span className="tab-count">{model.photos.length}</span>
                </button>
                <button 
                  className={`tab-button ${activeTab === 'videos' ? 'active' : ''}`}
                  onClick={() => setActiveTab('videos')}
                >
                  <span className="tab-icon">🎬</span>
                  <span className="tab-text">Videos</span>
                  <span className="tab-count">{model.videos.length}</span>
                </button>
                <button 
                  className={`tab-button ${activeTab === 'premium' ? 'active' : ''}`}
                  onClick={() => setActiveTab('premium')}
                >
                  <span className="tab-icon">⭐</span>
                  <span className="tab-text">Premium</span>
                  <span className="tab-count">{model.premiumPhotos?.length || 0}</span>
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="tab-content-area">
              {activeTab === 'photos' && (
                <div className="media-grid">
                  {model.photos.map((photo, index) => (
                    <div 
                      key={index} 
                      className="media-item photo-item"
                      onClick={() => openLightbox(model.photos, index, 'image')}
                    >
                      <div className="media-wrapper">
                        <img src={photo} alt={`Photo ${index + 1}`} />
                        <div className="media-overlay">
                          <div className="media-controls">
                            <span className="control-icon">🔍</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'videos' && (
                <div className="media-grid">
                  {model.videos.map((video, index) => (
                    <div 
                      key={index} 
                      className="media-item video-item"
                      onClick={() => openLightbox(model.videos.map(v => v.src), index, 'video')}
                    >
                      <div className="media-wrapper">
                        <img src={video.thumbnail} alt={`Video ${index + 1}`} />
                        <div className="media-overlay">
                          <div className="media-controls">
                            <span className="control-icon">▶️</span>
                          </div>
                        </div>
                        <div className="video-badge">VIDEO</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'premium' && (
                <div className="premium-section">
                  {model.premiumPhotos && model.premiumPhotos.length > 0 ? (
                    <div className="media-grid">
                      {model.premiumPhotos.map((photo, index) => (
                        <div 
                          key={index} 
                          className="media-item premium-item"
                          onClick={() => openLightbox(model.premiumPhotos, index, 'image')}
                        >
                          <div className="media-wrapper">
                            <img src={photo} alt={`Premium Photo ${index + 1}`} />
                            <div className="media-overlay">
                              <div className="media-controls">
                                <span className="control-icon">⭐</span>
                              </div>
                            </div>
                            <div className="premium-badge">PREMIUM</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="premium-upgrade">
                      <div className="upgrade-content">
                        <div className="upgrade-icon">🔒</div>
                        <h3>Premium Content Available</h3>
                        <p>Unlock exclusive premium content and support {model.stageName || model.name}</p>
                        <div className="upgrade-features">
                          <div className="feature-item">
                            <span className="feature-icon">⭐</span>
                            <span>Exclusive photoshoots</span>
                          </div>
                          <div className="feature-item">
                            <span className="feature-icon">🎬</span>
                            <span>Behind-the-scenes content</span>
                          </div>
                          <div className="feature-item">
                            <span className="feature-icon">💬</span>
                            <span>Direct messaging</span>
                          </div>
                        </div>
                        <button className="upgrade-button">
                          <span>Upgrade to Premium</span>
                          <span className="button-icon">✨</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        items={lightboxItems}
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        type={lightboxType}
      />
    </div>
  );
};

export default ModelProfile;