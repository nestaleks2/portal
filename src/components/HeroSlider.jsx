import React, { useState, useEffect } from 'react';
import { heroSlides } from '../data/modelsData';
import '../styles/components/HeroSlider.css';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getSlideClass = (index) => {
    const relativeIndex = (index - currentSlide + heroSlides.length) % heroSlides.length;
    
    if (relativeIndex === 0) return 'slide active';
    if (relativeIndex === heroSlides.length - 1) return 'slide prev';
    if (relativeIndex === 1) return 'slide next';
    if (relativeIndex <= heroSlides.length / 2) return 'slide hidden-right';
    return 'slide hidden-left';
  };

  return (
    <section className="hero-slider">
      <div className="slider-container">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={getSlideClass(index)}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-content">
              <h1>{slide.title}</h1>
            </div>
          </div>
        ))}
      </div>
      <div className="slider-dots">
        {heroSlides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;