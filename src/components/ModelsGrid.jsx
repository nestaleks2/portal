import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { modelsData } from '../data/modelsData';

const ModelsGrid = ({ limitRows = true }) => {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [screenSize, setScreenSize] = useState('desktop');
  const navigate = useNavigate();

  // Update screen size on resize
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 900) setScreenSize('mobile');
      else if (width < 1280) setScreenSize('tablet');
      else setScreenSize('desktop');
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'artistic', label: 'Artistic' },
    { id: 'fitness', label: 'Fitness' }
  ];

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Generate layout pattern based on screen size
  const generateRowPattern = (currentScreenSize) => {
    switch (currentScreenSize) {
      case 'desktop':
        // 2 wide + 2 regular per row (total 4 slots)
        return ['wide', '', 'wide', ''];
      case 'tablet':
        // 1 wide + 3 regular per row (total 4 slots)
        return ['wide', '', '', ''];
      case 'mobile':
        // 1 wide + 1 regular per row (total 2 slots)
        return ['wide', ''];
      default:
        return ['wide', '', 'wide', ''];
    }
  };

  // Assign responsive layout
  const assignLayoutSizes = (models, isLimited = false, currentScreenSize = 'desktop') => {
    const withLayout = [];
    const rowPattern = generateRowPattern(currentScreenSize);
    const slotsPerRow = rowPattern.length;
    
    // Calculate total models needed
    let totalModels;
    if (isLimited) {
      // Home page
      if (currentScreenSize === 'mobile') {
        totalModels = 8; // 4 rows × 2 slots = 8 models
      } else {
        totalModels = 8; // 2 rows × 4 slots = 8 models
      }
    } else {
      // Models page - use all models
      totalModels = models.length;
    }

    // Shuffle pattern within each row to add randomness
    const shuffleRowPattern = (pattern) => {
      const shuffled = [...pattern];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    // Pre-generate shuffled patterns for each row
    const rowsNeeded = Math.ceil(totalModels / slotsPerRow);
    const rowPatterns = [];
    for (let r = 0; r < rowsNeeded; r++) {
      rowPatterns.push(shuffleRowPattern(rowPattern));
    }

    // Assign layout sizes
    for (let i = 0; i < Math.min(totalModels, models.length); i++) {
      const rowIndex = Math.floor(i / slotsPerRow);
      const positionInRow = i % slotsPerRow;
      
      // Use the pre-generated pattern for this row
      const currentRowPattern = rowPatterns[rowIndex] || rowPattern;
      
      withLayout.push({
        ...models[i],
        layoutSize: currentRowPattern[positionInRow]
      });
    }

    return withLayout;
  };

  // Persist shuffle + layout for the session so navigation does not reshuffle
  const stableModels = useMemo(() => {
    const pageType = limitRows ? 'home' : 'models';
    const cacheKey = `__MODELS_GRID_ORDER_${pageType}_${screenSize}__`;
    
    if (typeof window !== 'undefined' && window[cacheKey]) {
      return window[cacheKey];
    }

    const shuffledWithLayout = assignLayoutSizes(shuffleArray(modelsData), limitRows, screenSize);

    if (typeof window !== 'undefined') {
      window[cacheKey] = shuffledWithLayout;
    }

    return shuffledWithLayout;
  }, [screenSize, limitRows]);

  const filteredModels = useMemo(() => {
    if (currentFilter === 'all') {
      return stableModels;
    }

    return stableModels.filter(model => model.category === currentFilter);
  }, [currentFilter, stableModels]);

  const displayModels = limitRows ? filteredModels.slice(0, 8) : filteredModels;

  const handleModelClick = (modelId) => {
    navigate(`/model/${modelId}`);
  };

  return (
    <section className="models-section">
      <div className="filters">
        <div className="filter-pills">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`pill ${currentFilter === filter.id ? 'active' : ''}`}
              onClick={() => setCurrentFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="models-grid">
        {displayModels.map((model) => (
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
      
      {limitRows && filteredModels.length > 8 && (
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
