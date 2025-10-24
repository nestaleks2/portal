import React from 'react';
import CreatorProfileTabs from '../components/profile/CreatorProfileTabs';
import '../styles/pages/Dashboard.css';

const DashboardCreator = () => {
  return (
    <div className="dashboard">
      <div className="container">
        <CreatorProfileTabs />
      </div>
    </div>
  );
};

export default DashboardCreator;