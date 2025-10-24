import React from 'react';
import ViewerProfileTabs from '../components/profile/ViewerProfileTabs';
import '../styles/pages/Dashboard.css';

const DashboardViewer = () => {
  return (
    <div className="dashboard">
      <div className="container">
        <ViewerProfileTabs />
      </div>
    </div>
  );
};

export default DashboardViewer;