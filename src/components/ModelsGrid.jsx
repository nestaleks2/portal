import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { modelsData } from '../data/modelsData';
import ModelsFilter from './ModelsFilter';

const ModelsGrid = ({ limitRows = true }) => {
  const [filteredModels, setFilteredModels] = useState(modelsData);
  const [screenSize, setScreenSize] = useState('desktop');
  const navigate = useNavigate();

  // Reset filtered models when component mounts
  useEffect(() => {
    setFilteredModels(modelsData);
  }, []);

  // Update screen size on resize
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width <= 640) setScreenSize('mobile');
      else if (width <= 768) setScreenSize('tablet');
      else setScreenSize('desktop');
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Handle filter changes from ModelsFilter component
  const handleFilterChange = useCallback((filtered) => {
    setFilteredModels(filtered);
  }, []);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // All tiles are now uniform - no need for layout patterns

  // All tiles are uniform - just return models as is
  const assignUniformLayout = (models) => {
    return models.map(model => ({
      ...model,
      layoutSize: 'regular' // All tiles are regular size
    }));
  };

  // Calculate how many models to show on home page to fill complete rows
  const calculateModelsForCompleteRows = (screenSize) => {
    let tilesPerRow;
    let rowsToShow;
    
    switch (screenSize) {
      case 'mobile': // <= 640px
        // 4 ряда по 2 плитки = 8 моделей
        tilesPerRow = 2;
        rowsToShow = 4;
        break;
      case 'tablet': // 641px - 768px
        // 3 ряда по 3 плитки = 9 моделей
        tilesPerRow = 3;
        rowsToShow = 3;
        break;
      default: // desktop > 768px
        // 2 ряда по 4 плитки = 8 моделей
        tilesPerRow = 4;
        rowsToShow = 2;
        break;
    }
    
    return Math.min(tilesPerRow * rowsToShow, modelsData.length);
  };

  // Persist shuffle + layout for the session so navigation does not reshuffle
  const stableModels = useMemo(() => {
    const pageType = limitRows ? 'home' : 'models';
    const cacheKey = `__MODELS_GRID_ORDER_${pageType}__`;
    
    // For home page, use cached shuffled data if available
    if (limitRows && typeof window !== 'undefined' && window[cacheKey]) {
      return window[cacheKey];
    }

    // For models page or first time, apply layout to filtered models
    const dataToProcess = limitRows ? modelsData : filteredModels;
    const shuffledWithLayout = assignUniformLayout(shuffleArray(dataToProcess));

    // Only cache for home page
    if (limitRows && typeof window !== 'undefined') {
      window[cacheKey] = shuffledWithLayout;
    }

    return shuffledWithLayout;
  }, [limitRows, filteredModels]);

  // Calculate display models separately to handle screen size changes
  // This ensures complete rows are shown on home page
  const finalDisplayModels = useMemo(() => {
    if (limitRows) {
      const modelsToShow = calculateModelsForCompleteRows(screenSize);
      return stableModels.slice(0, modelsToShow);
    }
    return stableModels;
  }, [stableModels, limitRows, screenSize]);


  const handleModelClick = (modelId) => {
    navigate(`/model/${modelId}`);
  };

  return (
    <section className="models-section">
      {!limitRows && (
        <ModelsFilter 
          models={modelsData} 
          onFilterChange={handleFilterChange}
        />
      )}
      
      <div className="models-grid">
        {finalDisplayModels.map((model) => (
          <div
            key={model.id}
            className={`model-tile ${model.layoutSize}`}
            onClick={() => handleModelClick(model.id)}
          >
            <img src={model.avatar} alt={model.name} />
            <div className="model-overlay">
              <h3>{model.name}</h3>
              <p>{model.country}, {model.age} years old</p>
            </div>
          </div>
        ))}
      </div>
      
      {limitRows && modelsData.length > calculateModelsForCompleteRows(screenSize) && (
        <div className="see-more-section">
          <button 
            className="btn-primary see-more-btn"
            onClick={() => navigate('/models')}
          >
            See More
          </button>
        </div>
      )}
    </section>
  );
};

export default ModelsGrid;
