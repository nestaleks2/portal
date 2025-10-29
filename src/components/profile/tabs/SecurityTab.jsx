import React, { useState } from 'react';

const SecurityTab = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const loginSessions = [
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'New York, NY',
      ipAddress: '192.168.1.100',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'New York, NY',
      ipAddress: '192.168.1.101',
      lastActive: '1 hour ago',
      current: false
    },
    {
      id: 3,
      device: 'Chrome on Android',
      location: 'Brooklyn, NY',
      ipAddress: '192.168.1.102',
      lastActive: '2 days ago',
      current: false
    }
  ];

  const securityEvents = [
    {
      id: 1,
      type: 'login',
      description: 'Successful login from Chrome on Windows',
      timestamp: '2 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'password_change',
      description: 'Password changed successfully',
      timestamp: '1 week ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'failed_login',
      description: 'Failed login attempt from unknown device',
      timestamp: '2 weeks ago',
      status: 'warning'
    }
  ];

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    
    alert('Password changed successfully! (demo)');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleToggle2FA = () => {
    if (!twoFactorEnabled) {
      setShowQRCode(true);
    } else {
      if (window.confirm('Are you sure you want to disable two-factor authentication?')) {
        setTwoFactorEnabled(false);
        alert('Two-factor authentication disabled');
      }
    }
  };

  const handleEnable2FA = () => {
    setTwoFactorEnabled(true);
    setShowQRCode(false);
    alert('Two-factor authentication enabled successfully!');
  };

  const handleTerminateSession = (sessionId) => {
    if (window.confirm('Are you sure you want to terminate this session?')) {
      alert(`Session ${sessionId} terminated (demo)`);
    }
  };

  const handleTerminateAllSessions = () => {
    if (window.confirm('This will log you out of all devices except the current one. Continue?')) {
      alert('All other sessions terminated (demo)');
    }
  };

  return (
    <div className="security-tab">
      <div className="tab-header">
        <h2>Security Settings</h2>
        <p>Manage your account security and privacy</p>
      </div>

      <div className="security-sections">
        <div className="security-section sec-password-section">
          <h3>Password</h3>
          <form onSubmit={handlePasswordSubmit} className="security-form">
            <div className="form-group security-form-group">
              <label htmlFor="currentPassword" className="security-label">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="form-input security-input"
                required
                aria-describedby="current-password-desc"
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="form-input"
                required
                minLength="8"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="form-input"
                required
                minLength="8"
              />
            </div>

            <button type="submit" className="btn-primary">
              Change Password
            </button>
          </form>

          <div className="password-requirements">
            <h4>Password Requirements:</h4>
            <ul>
              <li>At least 8 characters long</li>
              <li>Contains uppercase and lowercase letters</li>
              <li>Contains at least one number</li>
              <li>Contains at least one special character</li>
            </ul>
          </div>
        </div>

        <div className="security-section">
          <h3>Two-Factor Authentication</h3>
          <div className="two-factor-settings">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Two-Factor Authentication</h4>
                <p>Add an extra layer of security to your account</p>
              </div>
              <div className="setting-control">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={twoFactorEnabled}
                    onChange={handleToggle2FA}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            {showQRCode && (
              <div className="two-factor-setup">
                <div className="qr-code-section">
                  <h4>Scan QR Code</h4>
                  <div className="qr-code-placeholder">
                    <div className="qr-code">📱</div>
                    <p>Scan this QR code with your authenticator app</p>
                  </div>
                  <div className="backup-codes">
                    <h5>Backup Codes:</h5>
                    <div className="codes-list">
                      <code>ABC123-DEF456</code>
                      <code>GHI789-JKL012</code>
                      <code>MNO345-PQR678</code>
                    </div>
                    <p className="codes-warning">Save these codes in a safe place</p>
                  </div>
                  <div className="setup-actions">
                    <button className="btn-secondary" onClick={() => setShowQRCode(false)}>
                      Cancel
                    </button>
                    <button className="btn-primary" onClick={handleEnable2FA}>
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {twoFactorEnabled && (
              <div className="two-factor-status">
                <div className="status-item success">
                  <span className="status-icon">✅</span>
                  Two-factor authentication is enabled
                </div>
                <button className="btn-secondary">Regenerate Backup Codes</button>
              </div>
            )}
          </div>
        </div>

        <div className="security-section">
          <h3>Active Sessions</h3>
          <div className="sessions-list">
            {loginSessions.map(session => (
              <div key={session.id} className="session-item">
                <div className="session-info">
                  <div className="session-device">
                    {session.device}
                    {session.current && <span className="current-badge">Current</span>}
                  </div>
                  <div className="session-details">
                    <span>{session.location}</span>
                    <span>•</span>
                    <span>{session.ipAddress}</span>
                    <span>•</span>
                    <span>Last active {session.lastActive}</span>
                  </div>
                </div>
                {!session.current && (
                  <button 
                    className="btn-danger small"
                    onClick={() => handleTerminateSession(session.id)}
                  >
                    Terminate
                  </button>
                )}
              </div>
            ))}
          </div>
          <button 
            className="btn-warning"
            onClick={handleTerminateAllSessions}
          >
            Terminate All Other Sessions
          </button>
        </div>

        <div className="security-section">
          <h3>Security Activity</h3>
          <div className="security-events">
            {securityEvents.map(event => (
              <div key={event.id} className={`event-item ${event.status}`}>
                <div className="event-icon">
                  {event.type === 'login' && '🔐'}
                  {event.type === 'password_change' && '🔑'}
                  {event.type === 'failed_login' && '⚠️'}
                </div>
                <div className="event-info">
                  <div className="event-description">{event.description}</div>
                  <div className="event-timestamp">{event.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-secondary">View Full Security Log</button>
        </div>

        <div className="security-section">
          <h3>Privacy Settings</h3>
          <div className="privacy-settings">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Activity Status</h4>
                <p>Show when you're online or last seen</p>
              </div>
              <div className="setting-control">
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Profile Indexing</h4>
                <p>Allow search engines to index your profile</p>
              </div>
              <div className="setting-control">
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Data Analytics</h4>
                <p>Help improve our service by sharing usage data</p>
              </div>
              <div className="setting-control">
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="security-section">
          <h3>Account Recovery</h3>
          <div className="recovery-options">
            <div className="recovery-item">
              <h4>Recovery Email</h4>
              <p>anna.backup@example.com</p>
              <button className="btn-secondary">Update</button>
            </div>
            <div className="recovery-item">
              <h4>Recovery Phone</h4>
              <p>+1 (555) ***-4567</p>
              <button className="btn-secondary">Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;