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
      <div className="profile-header">
        <div className="profile-info">
          <img src={model.avatar} alt={model.name} className="profile-avatar" />
          <div className="profile-details">
            <h1>{model.name}</h1>
            <div className="detail-item">
              <span className="detail-label">Country:</span> {model.country}
            </div>
            <div className="detail-item">
              <span className="detail-label">Age:</span> {model.age} years old
            </div>
            <div className="detail-item">
              <span className="detail-label">Height:</span> {model.height}
            </div>
            <div className="detail-item">
              <span className="detail-label">Measurements:</span> {model.measurements}
            </div>
            <div className="detail-item">
              <span className="detail-label">Clothing Size:</span> {model.clothingSize}
            </div>
            <div className="detail-item">
              <span className="detail-label">Shoe Size:</span> {model.shoeSize}
            </div>
          </div>
        </div>
      </div>

      <div className="tabs">
        <div className="tab-buttons">
          <button 
            className={`tab-button ${activeTab === 'photos' ? 'active' : ''}`}
            onClick={() => setActiveTab('photos')}
          >
            Photos
          </button>
          <button 
            className={`tab-button ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'photos' && (
            <div className="photo-gallery">
              {model.photos.map((photo, index) => (
                <div 
                  key={index} 
                  className="photo-item"
                  onClick={() => openLightbox(model.photos, index, 'image')}
                >
                  <img src={photo} alt={`Photo ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'videos' && (
            <div className="video-gallery">
              {model.videos.map((video, index) => (
                <div 
                  key={index} 
                  className="video-item"
                  onClick={() => openLightbox(model.videos.map(v => v.src), index, 'video')}
                >
                  <img src={video.thumbnail} alt={`Video ${index + 1}`} className="video-thumbnail" />
                  <div className="play-button">▶</div>
                </div>
              ))}
            </div>
          )}
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