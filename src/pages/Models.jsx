import React from 'react';
import ModelsGrid from '../components/ModelsGrid';

const Models = () => {
  return (
    <div className="models-page">
      <div className="container">
        <div className="page-header">
          <h1>All Models</h1>
          <p>Discover talented models from around the world</p>
        </div>
      </div>

      <div className="container">
        <div className="page-content">
          <ModelsGrid limitRows={false} />
        </div>
      </div>
    </div>
  );
};

export default Models;
