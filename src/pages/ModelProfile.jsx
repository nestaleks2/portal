import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { modelsData } from '../data/modelsData';
import Lightbox from '../components/Lightbox';
import '../styles/pages/ModelProfile.css';
import instagramIcon from '../img/icons/instagram.svg';
import xIcon from '../img/icons/x.svg';
import youtubeIcon from '../img/icons/youtube.svg';
import onlyfansIcon from '../img/icons/onlyfans.svg';
import linkmeIcon from '../img/icons/linkme.png';
import websiteIcon from '../img/icons/website.svg';
import fanvueIcon from '../img/icons/fanvue.png';
import facebookIcon from '../img/icons/facebook.svg';
import tiktokIcon from '../img/icons/tiktok.svg';
import telegramIcon from '../img/icons/telegram.svg';
import photoIcon from '../img/icons/photo.svg';
import videoIcon from '../img/icons/video.svg';
import premiumIcon from '../img/icons/premium.svg';

const ModelProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const model = modelsData.find(m => m.id === parseInt(id)) || modelsData[0];
  
  const [activeTab, setActiveTab] = useState('photos');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItems, setLightboxItems] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxType, setLightboxType] = useState('image');
  const [showMoreBio, setShowMoreBio] = useState(false);

  const openLightbox = (items, index, type = 'image') => {
    setLightboxItems(items);
    setLightboxIndex(index);
    setLightboxType(type);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const truncateBio = (text, lines = 2) => {
    if (!text) return '';
    const words = text.split(' ');
    const wordsPerLine = 15; // Approximate words per line
    const maxWords = lines * wordsPerLine;
    
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  return (
    <div className="model-profile-new">
      <div className="container">
        {/* Banner Section */}
        <div className="profile-banner">
          <img src={model.avatar} alt={model.name} className="banner-background" />
          <div className="banner-overlay"></div>
        </div>

        {/* Avatar and Info Section */}
        <div className="profile-header">
          <div className="avatar-section">
            <img src={model.avatar} alt={model.name} className="profile-avatar-large" />
          </div>
          
          <div className="info-section">
            <h1 className="model-name">
              {model.name} "{model.stageName}" {model.surname}
            </h1>
            
            <div className="bio-section">
              {model.bioEN && (
                <div className="bio-text">
                  <p>{showMoreBio ? model.bioEN : truncateBio(model.bioEN)}</p>
                  {model.bioEN.split(' ').length > 30 && (
                    <button 
                      className="show-more-btn"
                      onClick={() => setShowMoreBio(!showMoreBio)}
                    >
                      {showMoreBio ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Social Media Block */}
            {model.social && Object.values(model.social).some(link => link) && (
              <div className="social-media-block">
                <h3>Follow me:</h3>
                <div className="social-links">
                  {model.social.instagram && (
                    <a href={model.social.instagram} target="_blank" rel="noopener noreferrer" className="social-link instagram">
                      <img src={instagramIcon} alt="Instagram" className="social-icon" />
                      Instagram
                    </a>
                  )}
                  {model.social.x && (
                    <a href={model.social.x} target="_blank" rel="noopener noreferrer" className="social-link twitter">
                      <img src={xIcon} alt="X" className="social-icon" />
                      X (Twitter)
                    </a>
                  )}
                  {model.social.youtube && (
                    <a href={model.social.youtube} target="_blank" rel="noopener noreferrer" className="social-link youtube">
                      <img src={youtubeIcon} alt="YouTube" className="social-icon" />
                      YouTube
                    </a>
                  )}
                  {model.social.onlyfans && (
                    <a href={model.social.onlyfans} target="_blank" rel="noopener noreferrer" className="social-link onlyfans">
                      <img src={onlyfansIcon} alt="OnlyFans" className="social-icon" />
                      OnlyFans
                    </a>
                  )}
                  {model.social.linkme && (
                    <a href={model.social.linkme} target="_blank" rel="noopener noreferrer" className="social-link linkme">
                      <img src={linkmeIcon} alt="LinkMe" className="social-icon" />
                      LinkMe
                    </a>
                  )}
                  {model.social.website && (
                    <a href={model.social.website} target="_blank" rel="noopener noreferrer" className="social-link website">
                      <img src={websiteIcon} alt="Website" className="social-icon" />
                      Website
                    </a>
                  )}
                  {model.social.fanvue && (
                    <a href={model.social.fanvue} target="_blank" rel="noopener noreferrer" className="social-link fanvue">
                      <img src={fanvueIcon} alt="FanVue" className="social-icon" />
                      FanVue
                    </a>
                  )}
                  {model.social.facebook && (
                    <a href={model.social.facebook} target="_blank" rel="noopener noreferrer" className="social-link facebook">
                      <img src={facebookIcon} alt="Facebook" className="social-icon" />
                      Facebook
                    </a>
                  )}
                  {model.social.tiktok && (
                    <a href={model.social.tiktok} target="_blank" rel="noopener noreferrer" className="social-link tiktok">
                      <img src={tiktokIcon} alt="TikTok" className="social-icon" />
                      TikTok
                    </a>
                  )}
                  {model.social.telegram && (
                    <a href={model.social.telegram} target="_blank" rel="noopener noreferrer" className="social-link telegram">
                      <img src={telegramIcon} alt="Telegram" className="social-icon" />
                      Telegram
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Send Message Button */}
            <button className="send-message-btn" onClick={() => navigate('/messages')}>
              <span className="message-icon">💬</span>
              Send Message
            </button>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="content-section">
          <div className="model-content-tabs">
            <button 
              className={`tab-button ${activeTab === 'photos' ? 'active' : ''}`}
              onClick={() => setActiveTab('photos')}
            >
              <img src={photoIcon} alt="Photos" className="tab-icon" />
              <span className="tab-text">Photos</span>
              <span className="tab-count">{model.photos.length}</span>
            </button>
            <button 
              className={`tab-button ${activeTab === 'videos' ? 'active' : ''}`}
              onClick={() => setActiveTab('videos')}
            >
              <img src={videoIcon} alt="Videos" className="tab-icon" />
              <span className="tab-text">Videos</span>
              <span className="tab-count">{model.videos.length}</span>
            </button>
            <button 
              className={`tab-button ${activeTab === 'premium' ? 'active' : ''}`}
              onClick={() => setActiveTab('premium')}
            >
              <img src={premiumIcon} alt="Premium" className="tab-icon" />
              <span className="tab-text">Premium</span>
              <span className="tab-count">{model.premiumPhotos?.length || 0}</span>
            </button>
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