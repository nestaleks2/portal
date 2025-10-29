import React from 'react';
import CreatorProfileTabs from '../components/profile/CreatorProfileTabs';
import '../styles/pages/Dashboard.css';

const DashboardCreator = () => {
  return (
    <div className="dashboard">
      <CreatorProfileTabs />
    </div>
  );
};

export default DashboardCreator;