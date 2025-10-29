import React, { useState, useRef } from 'react';
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
              <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/170ddedb-f965-43d5-b731-abb8572fe488/djowc3y-525594bc-1666-4746-994a-cd616c57a843.png/v1/fit/w_828,h_1242,q_70,strp/velma_adventures____training_bodybuilders_by_eurotism_djowc3y-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTUzNiIsInBhdGgiOiIvZi8xNzBkZGVkYi1mOTY1LTQzZDUtYjczMS1hYmI4NTcyZmU0ODgvZGpvd2MzeS01MjU1OTRiYy0xNjY2LTQ3NDYtOTk0YS1jZDYxNmM1N2E4NDMucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.ZEl632md2xMBTWoweJPd5xw2uTPpO5FsMIvZIUM-9OM" alt="Profile" />
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
                  onClick={() => setActiveTab(tab.id)}
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

export default CreatorProfileTabs;