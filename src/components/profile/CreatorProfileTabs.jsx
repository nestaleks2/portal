import React, { useState } from 'react';
import OverviewTab from './tabs/OverviewTab';
import ContentTab from './tabs/ContentTab';
import SubscriptionsTab from './tabs/SubscriptionsTab';
import FollowersTab from './tabs/FollowersTab';
import MessagesTab from './tabs/MessagesTab';
import SettingsTab from './tabs/SettingsTab';
import SecurityTab from './tabs/SecurityTab';
import BillingTab from './tabs/BillingTab';

const CreatorProfileTabs = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', component: OverviewTab },
    { id: 'content', label: 'Content', component: ContentTab },
    { id: 'subscriptions', label: 'Subscriptions', component: SubscriptionsTab },
    { id: 'followers', label: 'Followers', component: FollowersTab },
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
              <img src="https://images.unsplash.com/photo-1494790108755-2616c9ef2fe8?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80" alt="Profile" />
            </div>
            <div className="profile-info">
              <h2>Mary Crockfoot</h2>
              <div className="profile-details">
                <span className="profile-age">24 years</span>
                <span className="profile-location">London, Great Britain</span>
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

export default CreatorProfileTabs;