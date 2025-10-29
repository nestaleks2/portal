import React, { useState } from 'react';

const SettingsTab = () => {
  const [formData, setFormData] = useState({
    name: 'Anna Petrova',
    email: 'anna@example.com',
    username: 'anna_petrova',
    bio: 'Professional model with experience in fashion and commercial shoots.',
    location: 'New York, NY',
    website: 'https://anapetrova.com',
    phone: '+1 (555) 123-4567',
    birthdate: '1995-03-15',
    language: 'en',
    timezone: 'America/New_York',
    profileVisibility: 'public',
    contentVisibility: 'subscribers',
    allowMessages: 'all',
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    weeklyReports: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Avatar upload: ${file.name} (demo)`);
    }
  };

  return (
    <div className="settings-tab">
      <div className="tab-header">
        <h2>Profile Settings</h2>
        <p>Manage your profile information and preferences</p>
      </div>

      <div className="settings-sections">
        <div className="settings-section">
          <h3>Profile Information</h3>
          <div className="profile-photo-section settings-photo-section">
            <div className="current-photo settings-current-photo">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616c9ef2fe8?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                alt="Profile" 
                className="profile-photo settings-profile-photo"
              />
            </div>
            <div className="photo-controls settings-photo-controls">
              <input 
                type="file" 
                id="avatar-upload" 
                accept="image/*" 
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
                aria-label="Upload profile photo"
              />
              <label htmlFor="avatar-upload" className="btn-secondary settings-btn">
                Change Photo
              </label>
              <button className="btn-danger settings-btn" aria-label="Remove profile photo">
                Remove
              </button>
            </div>
          </div>

          <div className="form-grid settings-form-grid">
            <div className="form-group settings-form-group">
              <label htmlFor="name" className="settings-label">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input settings-input"
                aria-describedby="name-description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input"
              />
            </div>

            <div className="form-group settings-form-group full-width">
              <label htmlFor="bio" className="settings-label">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-textarea settings-textarea"
                rows="4"
                placeholder="Tell people about yourself..."
                aria-describedby="bio-description"
              />
              <small id="bio-description" className="form-description">
                Share your background and interests
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="birthdate">Birth Date</label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="language">Language</label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-select"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="timezone">Timezone</label>
              <select
                id="timezone"
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-select"
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>Privacy Settings</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="profileVisibility">Profile Visibility</label>
              <select
                id="profileVisibility"
                name="profileVisibility"
                value={formData.profileVisibility}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-select"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="subscribers">Subscribers Only</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="contentVisibility">Content Visibility</label>
              <select
                id="contentVisibility"
                name="contentVisibility"
                value={formData.contentVisibility}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-select"
              >
                <option value="public">Public</option>
                <option value="subscribers">Subscribers Only</option>
                <option value="premium">Premium Subscribers Only</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="allowMessages">Allow Messages From</label>
              <select
                id="allowMessages"
                name="allowMessages"
                value={formData.allowMessages}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-select"
              >
                <option value="all">Everyone</option>
                <option value="followers">Followers Only</option>
                <option value="subscribers">Subscribers Only</option>
                <option value="none">No One</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>Notification Preferences</h3>
          <div className="checkbox-group settings-checkbox-group">
            <label className="checkbox-container settings-checkbox-container">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={formData.emailNotifications}
                onChange={handleInputChange}
                disabled={!isEditing}
                aria-describedby="email-notifications-desc"
              />
              <span className="checkmark settings-checkmark"></span>
              <span className="checkbox-label">Email Notifications</span>
              <span id="email-notifications-desc" className="checkbox-description">
                Receive notifications via email
              </span>
            </label>

            <label className="checkbox-container">
              <input
                type="checkbox"
                name="pushNotifications"
                checked={formData.pushNotifications}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <span className="checkmark"></span>
              Push Notifications
              <span className="checkbox-description">Receive push notifications on your devices</span>
            </label>

            <label className="checkbox-container">
              <input
                type="checkbox"
                name="marketingEmails"
                checked={formData.marketingEmails}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <span className="checkmark"></span>
              Marketing Emails
              <span className="checkbox-description">Receive promotional emails and updates</span>
            </label>

            <label className="checkbox-container">
              <input
                type="checkbox"
                name="weeklyReports"
                checked={formData.weeklyReports}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <span className="checkmark"></span>
              Weekly Reports
              <span className="checkbox-description">Receive weekly performance reports</span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        {!isEditing ? (
          <button 
            className="btn-primary"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        ) : (
          <div className="edit-actions">
            <button 
              className="btn-secondary"
              onClick={() => {
                setIsEditing(false);
                // Reset form data to original values
              }}
            >
              Cancel
            </button>
            <button 
              className={`btn-primary ${isSaving ? 'loading' : ''}`}
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      <div className="danger-zone">
        <h3>Danger Zone</h3>
        <div className="danger-actions">
          <div className="danger-item">
            <div className="danger-info">
              <h4>Deactivate Account</h4>
              <p>Temporarily deactivate your account. You can reactivate it anytime.</p>
            </div>
            <button className="btn-warning">Deactivate</button>
          </div>
          <div className="danger-item">
            <div className="danger-info">
              <h4>Delete Account</h4>
              <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
            </div>
            <button className="btn-danger">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;