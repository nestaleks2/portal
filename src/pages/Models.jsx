import React from 'react';
import ModelsGrid from '../components/ModelsGrid';

const Models = () => {
  return (
    <div className="models-page">
      <div className="page-header">
        <h1>All Models</h1>
        <p>Discover talented models from around the world</p>
      </div>

      <ModelsGrid limitRows={false} />
    </div>
  );
};

export default Models;
