import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { modelsData } from '../data/modelsData';

const ModelsGrid = ({ limitRows = true }) => {
  const [currentFilter, setCurrentFilter] = useState('all');
  const navigate = useNavigate();

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

  // Assign a predictable layout so tile sizes persist until reload
  const assignLayoutSizes = (models) => {
    const withLayout = [];
    let currentRowWidth = 0;
    const maxRowWidth = 4;

    models.forEach((model) => {
      let size = '';

      if (currentRowWidth === 0) {
        size = Math.random() > 0.3 ? '' : 'wide';
      } else if (currentRowWidth === 1) {
        size = Math.random() > 0.4 ? '' : 'wide';
      }

      currentRowWidth += size === 'wide' ? 2 : 1;

      if (currentRowWidth >= maxRowWidth) {
        currentRowWidth = 0;
      }

      withLayout.push({
        ...model,
        layoutSize: size
      });
    });

    return withLayout;
  };

  // Persist shuffle + layout for the session so navigation does not reshuffle
  const stableModels = useMemo(() => {
    if (typeof window !== 'undefined' && window.__MODELS_GRID_ORDER__) {
      return window.__MODELS_GRID_ORDER__;
    }

    const shuffledWithLayout = assignLayoutSizes(shuffleArray(modelsData));

    if (typeof window !== 'undefined') {
      window.__MODELS_GRID_ORDER__ = shuffledWithLayout;
    }

    return shuffledWithLayout;
  }, []);

  const filteredModels = useMemo(() => {
    if (currentFilter === 'all') {
      return stableModels;
    }

    return stableModels.filter(model => model.category === currentFilter);
  }, [currentFilter, stableModels]);

  const displayModels = limitRows ? filteredModels.slice(0, 12) : filteredModels;

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
      
      {limitRows && filteredModels.length > 12 && (
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
