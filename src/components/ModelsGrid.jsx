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

  // Функция для перемешивания массива
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Мемоизируем перемешанные модели для каждого фильтра
  const shuffledModels = useMemo(() => {
    const filtered = currentFilter === 'all' 
      ? modelsData 
      : modelsData.filter(model => model.category === currentFilter);
    return shuffleArray(filtered);
  }, [currentFilter]);

  const displayModels = limitRows ? shuffledModels.slice(0, 12) : shuffledModels;

  // Умный алгоритм размещения плиток
  const getOptimalLayout = (models) => {
    const layout = [];
    let currentRowWidth = 0;
    const maxRowWidth = 4; // Каждый ряд может вместить 4 обычные плитки
    
    models.forEach((model, index) => {
      let size = '';
      
      // Логика выбора размера на основе доступного места
      if (currentRowWidth === 0) {
        // Начало нового ряда - можем выбрать любой размер
        size = Math.random() > 0.3 ? '' : 'wide'; // 70% обычных, 30% широких
      } else if (currentRowWidth === 1) {
        // Есть место для широкой плитки или 3 обычных
        size = Math.random() > 0.4 ? '' : 'wide'; // 60% обычных, 40% широких
      } else if (currentRowWidth === 2) {
        // Есть место только для 2 обычных плиток
        size = '';
      } else if (currentRowWidth === 3) {
        // Есть место только для 1 обычной плитки
        size = '';
      }
      
      // Обновляем текущую ширину ряда
      if (size === 'wide') {
        currentRowWidth += 2;
      } else {
        currentRowWidth += 1;
      }
      
      // Если ряд заполнен, начинаем новый
      if (currentRowWidth >= maxRowWidth) {
        currentRowWidth = 0;
      }
      
      layout.push({
        ...model,
        layoutSize: size
      });
    });
    
    return layout;
  };

  const modelsWithLayout = useMemo(() => {
    return getOptimalLayout(displayModels);
  }, [displayModels]);

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
        {modelsWithLayout.map((model) => (
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
      
      {limitRows && shuffledModels.length > 12 && (
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