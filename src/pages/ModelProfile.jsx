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
    <div className="model-profile">
      <div className="container">
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-image-container">
              <img src={model.avatar} alt={model.name} className="profile-avatar" />
            </div>
            <div className="profile-details">
              <h1>{model.stageName || model.name}</h1>
              {model.stageName && model.stageName !== model.name && (
                <p className="real-name">({model.name} {model.surname})</p>
              )}
              {model.bioEN && (
                <p className="model-bio">{model.bioEN}</p>
              )}
              
              {/* Social Media Links */}
              {model.social && (
                <div className="social-media">
                  <h3>Follow</h3>
                  <div className="social-links">
                    {model.social.instagram && (
                      <a href={model.social.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                        <span className="social-icon">📷</span> Instagram
                      </a>
                    )}
                    {model.social.x && (
                      <a href={model.social.x} target="_blank" rel="noopener noreferrer" className="social-link">
                        <span className="social-icon">✖️</span> X (Twitter)
                      </a>
                    )}
                    {model.social.youtube && (
                      <a href={model.social.youtube} target="_blank" rel="noopener noreferrer" className="social-link">
                        <span className="social-icon">📺</span> YouTube
                      </a>
                    )}
                    {model.social.onlyfans && (
                      <a href={model.social.onlyfans} target="_blank" rel="noopener noreferrer" className="social-link">
                        <span className="social-icon">🔥</span> OnlyFans
                      </a>
                    )}
                    {model.social.linkme && (
                      <a href={model.social.linkme} target="_blank" rel="noopener noreferrer" className="social-link">
                        <span className="social-icon">🔗</span> LinkMe
                      </a>
                    )}
                    {model.social.website && (
                      <a href={model.social.website} target="_blank" rel="noopener noreferrer" className="social-link">
                        <span className="social-icon">🌐</span> Website
                      </a>
                    )}
                  </div>
                </div>
              )}
              
              <div className="profile-meta">
                <div className="detail-row">
                  <div className="detail-item">
                    <span className="detail-label">Country:</span>
                    <span className="detail-value">{model.country}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Age:</span>
                    <span className="detail-value">{model.age} years</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Height:</span>
                    <span className="detail-value">{model.height}</span>
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-item">
                    <span className="detail-label">Measurements:</span>
                    <span className="detail-value">{model.measurements}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Clothing:</span>
                    <span className="detail-value">{model.clothingSize}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Shoe:</span>
                    <span className="detail-value">{model.shoeSize}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-tabs">
          <div className="tab-navigation">
            <button 
              className={`tab-nav-button ${activeTab === 'photos' ? 'active' : ''}`}
              onClick={() => setActiveTab('photos')}
            >
              Photos
            </button>
            <button 
              className={`tab-nav-button ${activeTab === 'videos' ? 'active' : ''}`}
              onClick={() => setActiveTab('videos')}
            >
              Videos
            </button>
            <button 
              className={`tab-nav-button ${activeTab === 'premium' ? 'active' : ''}`}
              onClick={() => setActiveTab('premium')}
            >
              Premium Content
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'photos' && (
              <div className="content-gallery">
                {model.photos.map((photo, index) => (
                  <div 
                    key={index} 
                    className="gallery-item"
                    onClick={() => openLightbox(model.photos, index, 'image')}
                  >
                    <img src={photo} alt={`Photo ${index + 1}`} />
                    <div className="gallery-overlay">
                      <span className="gallery-icon">📷</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'videos' && (
              <div className="content-gallery">
                {model.videos.map((video, index) => (
                  <div 
                    key={index} 
                    className="gallery-item video-item"
                    onClick={() => openLightbox(model.videos.map(v => v.src), index, 'video')}
                  >
                    <img src={video.thumbnail} alt={`Video ${index + 1}`} />
                    <div className="gallery-overlay">
                      <span className="gallery-icon">▶️</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'premium' && (
              <div className="premium-content">
                <div className="premium-header">
                  <h2>Premium Content</h2>
                  <p>Exclusive content available for premium subscribers</p>
                </div>
                <div className="content-gallery">
                  {model.premiumPhotos && model.premiumPhotos.map((photo, index) => (
                    <div 
                      key={index} 
                      className="gallery-item premium-item"
                      onClick={() => openLightbox(model.premiumPhotos, index, 'image')}
                    >
                      <img src={photo} alt={`Premium Photo ${index + 1}`} />
                      <div className="gallery-overlay">
                        <span className="gallery-icon">⭐</span>
                      </div>
                      <div className="premium-badge">Premium</div>
                    </div>
                  )) || (
                    <div className="premium-placeholder">
                      <div className="placeholder-content">
                        <span className="placeholder-icon">🔒</span>
                        <h3>Premium Content Available</h3>
                        <p>Subscribe to access exclusive premium content</p>
                        <button className="btn-primary premium-cta">Upgrade to Premium</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
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