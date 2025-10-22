import React from 'react';
import { useNavigate } from 'react-router-dom';
import { banners } from '../data/modelsData';
import '../styles/components/Banners.css';

const Banners = () => {
  const navigate = useNavigate();

  const handleBannerClick = (link) => {
    navigate(link);
  };

  return (
    <section className="banners">
      <div className="banner-container">
        {banners.map((banner) => (
          <div 
            key={banner.id} 
            className="banner"
            onClick={() => handleBannerClick(banner.link)}
            style={{ cursor: 'pointer' }}
          >
            <img src={banner.image} alt={banner.title} />
            <div className="banner-content">
              <h3>{banner.title}</h3>
              <p>{banner.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banners;