import React from 'react';
import ViewerProfileTabs from '../components/profile/ViewerProfileTabs';
import '../styles/pages/Dashboard.css';

const DashboardViewer = () => {
  return (
    <div className="dashboard">
      <ViewerProfileTabs />
    </div>
  );
};

export default DashboardViewer;