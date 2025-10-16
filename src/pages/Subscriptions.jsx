import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { modelsData } from '../data/modelsData';

const Subscriptions = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [sortOrder, setSortOrder] = useState('expire_date');
  
  // Модели с активными подписками
  const activeModels = modelsData.slice(0, 6).map(model => ({
    ...model,
    subscriptionDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    price: Math.floor(Math.random() * 20) + 5,
    status: 'active'
  }));
  
  // Модели с истекшими подписками
  const expiredModels = modelsData.slice(6, 9).map(model => ({
    ...model,
    subscriptionDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    expiredDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
    price: Math.floor(Math.random() * 20) + 5,
    status: 'expired'
  }));

  const getDaysRemaining = (expiryDate) => {
    const now = new Date();
    const diffTime = expiryDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDaysExpired = (expiredDate) => {
    const now = new Date();
    const diffTime = now - expiredDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleRenew = (modelId) => {
    console.log('Renew subscription for model:', modelId);
  };

  const handleViewProfile = (modelId) => {
    navigate(`/model/${modelId}`);
  };

  const sortModels = (models) => {
    return [...models].sort((a, b) => {
      if (sortOrder === 'expire_date') {
        const dateA = a.expiryDate || a.expiredDate;
        const dateB = b.expiryDate || b.expiredDate;
        return dateA - dateB;
      }
      return 0;
    });
  };

  const currentModels = activeTab === 'active' ? activeModels : expiredModels;
  const sortedModels = sortModels(currentModels);

  return (
    <div className="subscriptions-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>My Subscriptions</h1>
          <div className="subscription-stats">
            <span className="stat-item">
              <span className="stat-count">{activeModels.length}</span>
              <span className="stat-label">Active</span>
            </span>
            <span className="stat-divider">•</span>
            <span className="stat-item">
              <span className="stat-count">{expiredModels.length}</span>
              <span className="stat-label">Expired</span>
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="content-tabs">
          <div className="tab-buttons">
            <button 
              className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              <span className="tab-icon">✨</span>
              <span className="tab-text">Active</span>
              <span className="tab-count">{activeModels.length}</span>
            </button>
            <button 
              className={`tab-button ${activeTab === 'expired' ? 'active' : ''}`}
              onClick={() => setActiveTab('expired')}
            >
              <span className="tab-icon">⏰</span>
              <span className="tab-text">Expired</span>
              <span className="tab-count">{expiredModels.length}</span>
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="controls-section">
          <div className="sort-controls">
            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
              className="sort-select"
            >
              <option value="expire_date">Sort by expiry date</option>
              <option value="subscription_date">Sort by subscription date</option>
              <option value="price">Sort by price</option>
            </select>
          </div>
          <div className="results-count">
            {sortedModels.length} {activeTab === 'active' ? 'active' : 'expired'} subscriptions
          </div>
        </div>

        {/* Models Grid */}
        <div className="models-grid">
          {sortedModels.map((model) => (
            <div key={model.id} className={`model-card ${model.status}`}>
              <div 
                className="model-image"
                onClick={() => handleViewProfile(model.id)}
              >
                <img src={model.avatar} alt={model.stageName || model.name} />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <span className="view-icon">👁️</span>
                  </div>
                </div>
                <div className={`status-badge ${model.status}`}>
                  {model.status === 'active' ? 'Active' : 'Expired'}
                </div>
              </div>
              
              <div className="subscription-card-info">
                <div className="subscription-header">
                  <h3 
                    className="subscription-model-name"
                    onClick={() => handleViewProfile(model.id)}
                  >
                    {model.stageName || model.name}
                  </h3>
                  <div className="subscription-price">${model.price}/month</div>
                </div>

                <div className="subscription-stats">
                  <span className="subscription-stat">{model.followers} followers</span>
                </div>

                {model.status === 'active' ? (
                  <div className="subscription-details active">
                    <div className="subscription-renewal-info">
                      <span className="subscription-renewal-text">
                        Renews in {getDaysRemaining(model.expiryDate)} days
                      </span>
                      <span className="subscription-renewal-date">
                        {formatDate(model.expiryDate)}
                      </span>
                    </div>
                    <div className="subscription-actions">
                      <button 
                        className="btn-secondary"
                        onClick={() => handleViewProfile(model.id)}
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="subscription-details expired">
                    <div className="subscription-expiry-info">
                      <span className="subscription-expiry-text">
                        Expired {getDaysExpired(model.expiredDate)} days ago
                      </span>
                      <span className="subscription-expiry-date">
                        {formatDate(model.expiredDate)}
                      </span>
                    </div>
                    <div className="subscription-actions">
                      <button 
                        className="btn-primary"
                        onClick={() => handleRenew(model.id)}
                      >
                        Renew
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedModels.length === 0 && (
          <div className="empty-state">
            <div className="empty-content">
              <div className="empty-icon">
                {activeTab === 'active' ? '✨' : '⏰'}
              </div>
              <h3 className="empty-title">
                {activeTab === 'active' 
                  ? 'No active subscriptions' 
                  : 'No expired subscriptions'}
              </h3>
              <p className="empty-description">
                {activeTab === 'active' 
                  ? 'Start exploring and subscribe to your favorite models' 
                  : 'Your expired subscriptions will appear here'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;