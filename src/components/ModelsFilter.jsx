import React, { useState, useEffect } from 'react';

const ModelsFilter = ({ models, onFilterChange }) => {
  const [filters, setFilters] = useState({
    country: 'all',
    gender: 'all',
    ageFrom: '',
    ageTo: ''
  });

  // Initialize with all models on component mount
  useEffect(() => {
    onFilterChange(models);
  }, [models, onFilterChange]);

  // Get unique countries from models data
  const getUniqueCountries = () => {
    const countries = [...new Set(models.map(model => model.country))];
    return countries.sort();
  };

  // Get age range options
  const getAgeRanges = () => {
    return [
      { value: '', label: 'Any' },
      { value: '18', label: '18+' },
      { value: '21', label: '21+' },
      { value: '25', label: '25+' },
      { value: '30', label: '30+' }
    ];
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    // Apply filters to models data
    const filteredModels = models.filter(model => {
      // Country filter
      if (newFilters.country !== 'all' && model.country !== newFilters.country) {
        return false;
      }
      
      // Gender filter - ensure model has gender field
      if (newFilters.gender !== 'all' && (!model.gender || model.gender !== newFilters.gender)) {
        return false;
      }
      
      // Age range filter
      if (newFilters.ageFrom && (!model.age || model.age < parseInt(newFilters.ageFrom))) {
        return false;
      }
      
      if (newFilters.ageTo && (!model.age || model.age > parseInt(newFilters.ageTo))) {
        return false;
      }
      
      return true;
    });
    
    onFilterChange(filteredModels);
  };

  const resetFilters = () => {
    const resetFilterState = {
      country: 'all',
      gender: 'all',
      ageFrom: '',
      ageTo: ''
    };
    setFilters(resetFilterState);
    onFilterChange(models);
  };

  return (
    <div className="models-filters">
      <div className="filters-container">
        {/* Country Filter */}
        <div className="filter-group">
          <label className="filter-label">Location</label>
          <div className="select-wrapper">
            <select 
              className="filter-select"
              value={filters.country}
              onChange={(e) => handleFilterChange('country', e.target.value)}
            >
              <option value="all">All Countries</option>
              {getUniqueCountries().map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Gender Filter */}
        <div className="filter-group">
          <label className="filter-label">Gender</label>
          <div className="gender-buttons">
            <button 
              className={`gender-btn ${filters.gender === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('gender', 'all')}
            >
              All
            </button>
            <button 
              className={`gender-btn ${filters.gender === 'female' ? 'active' : ''}`}
              onClick={() => handleFilterChange('gender', 'female')}
            >
              Female
            </button>
            <button 
              className={`gender-btn ${filters.gender === 'male' ? 'active' : ''}`}
              onClick={() => handleFilterChange('gender', 'male')}
            >
              Male
            </button>
          </div>
        </div>

        {/* Age Range Filter */}
        <div className="filter-group">
          <label className="filter-label">Age Range</label>
          <div className="age-range-container">
            <div className="age-input-group">
              <select 
                className="filter-select age-select"
                value={filters.ageFrom}
                onChange={(e) => handleFilterChange('ageFrom', e.target.value)}
              >
                <option value="">From</option>
                {Array.from({ length: 50 }, (_, i) => i + 18).map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
            </div>
            <span className="age-separator">–</span>
            <div className="age-input-group">
              <select 
                className="filter-select age-select"
                value={filters.ageTo}
                onChange={(e) => handleFilterChange('ageTo', e.target.value)}
              >
                <option value="">To</option>
                {Array.from({ length: 50 }, (_, i) => i + 18).map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="filter-group">
          <button 
            className="reset-filters-btn"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelsFilter;