import React, { useState, useRef } from 'react';
import OverviewTab from './tabs/OverviewTab';
import ContentTab from './tabs/ContentTab';
import SubscriptionsTab from './tabs/SubscriptionsTab';
import FollowersTab from './tabs/FollowersTab';
import MessagesTab from './tabs/MessagesTab';
import SettingsTab from './tabs/SettingsTab';
import SecurityTab from './tabs/SecurityTab';
import BillingTab from './tabs/BillingTab';

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hasOverflow, setHasOverflow] = useState(false);
  const tabsRef = useRef(null);

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

  const checkScrollability = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      const overflow = scrollWidth > clientWidth;
      
      setHasOverflow(overflow);
      setCanScrollLeft(overflow && scrollLeft > 0);
      setCanScrollRight(overflow && scrollLeft < scrollWidth - clientWidth);
    }
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    
    // Add haptic feedback simulation for mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    // Ensure active tab is visible on mobile
    if (tabsRef.current) {
      const activeTabElement = tabsRef.current.querySelector(`[data-tab="${tabId}"]`);
      if (activeTabElement) {
        activeTabElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  const scrollLeft = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: -200, behavior: 'smooth' });
      setTimeout(checkScrollability, 300);
    }
  };

  const scrollRight = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      setTimeout(checkScrollability, 300);
    }
  };

  React.useEffect(() => {
    checkScrollability();
    const handleResize = () => checkScrollability();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        <div className="dashboard-tabs-container">
            {hasOverflow && (
              <button 
                className={`dashboard-tab-nav dashboard-tab-nav-left ${!canScrollLeft ? 'disabled' : ''}`}
                onClick={scrollLeft}
                disabled={!canScrollLeft}
              >
                ‹
              </button>
            )}
            
            <div className="dashboard-tabs" ref={tabsRef} onScroll={checkScrollability}>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`dashboard-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => handleTabClick(tab.id)}
                  data-tab={tab.id}
                  aria-label={`Switch to ${tab.label} tab`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            {hasOverflow && (
              <button 
                className={`dashboard-tab-nav dashboard-tab-nav-right ${!canScrollRight ? 'disabled' : ''}`}
                onClick={scrollRight}
                disabled={!canScrollRight}
              >
                ›
              </button>
            )}
        </div>
      </div>

      <div className="dashboard-content">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default ProfileTabs;