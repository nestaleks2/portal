import React, { useState, useEffect } from 'react';
import '../styles/components/Lightbox.css';

const Lightbox = ({ items, isOpen, currentIndex, onClose, type = 'image' }) => {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        navigate(-1);
        break;
      case 'ArrowRight':
        navigate(1);
        break;
    }
  };

  const navigate = (direction) => {
    const newIndex = (index + direction + items.length) % items.length;
    setIndex(newIndex);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, index]);

  if (!isOpen || !items.length) return null;

  return (
    <div className="lightbox active" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>×</button>
        <button className="lightbox-nav lightbox-prev" onClick={() => navigate(-1)}>‹</button>
        <button className="lightbox-nav lightbox-next" onClick={() => navigate(1)}>›</button>
        
        {type === 'image' ? (
          <img src={items[index]} alt={`Image ${index + 1}`} />
        ) : (
          <video src={items[index]} controls autoPlay />
        )}
      </div>
    </div>
  );
};

export default Lightbox;