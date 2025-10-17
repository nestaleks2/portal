import React, { useState } from 'react';
import ViewerOverviewTab from './tabs/ViewerOverviewTab';
import ViewerSubscriptionsTab from './tabs/ViewerSubscriptionsTab';
import ViewerFavoritesTab from './tabs/ViewerFavoritesTab';
import MessagesTab from './tabs/MessagesTab';
import SettingsTab from './tabs/SettingsTab';
import SecurityTab from './tabs/SecurityTab';
import BillingTab from './tabs/BillingTab';

const ViewerProfileTabs = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', component: ViewerOverviewTab },
    { id: 'subscriptions', label: 'Subscriptions', component: ViewerSubscriptionsTab },
    { id: 'favorites', label: 'Favorites', component: ViewerFavoritesTab },
    { id: 'messages', label: 'Messages', component: MessagesTab },
    { id: 'settings', label: 'Settings', component: SettingsTab },
    { id: 'security', label: 'Security', component: SecurityTab },
    { id: 'billing', label: 'Billing', component: BillingTab }
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);
  const ActiveComponent = activeTabData?.component;

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <div className="container">
          <div className="dashboard-profile">
            <div className="profile-avatar">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80" alt="Profile" />
            </div>
            <div className="profile-info">
              <h2>John Viewer</h2>
              <div className="profile-details">
                <span className="profile-age">28 years</span>
                <span className="profile-location">New York, USA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-nav">
        <div className="container">
          <div className="dashboard-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`dashboard-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="container">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  );
};

export default ViewerProfileTabs;