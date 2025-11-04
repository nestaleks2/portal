import React, { useState } from 'react';
import instagramIcon from '../../../img/icons/instagram.svg';
import facebookIcon from '../../../img/icons/facebook.svg';
import xIcon from '../../../img/icons/x.svg';
import youtubeIcon from '../../../img/icons/youtube.svg';
import tiktokIcon from '../../../img/icons/tiktok.svg';
import telegramIcon from '../../../img/icons/telegram.svg';
import onlyfansIcon from '../../../img/icons/onlyfans.svg';
import fanvueIcon from '../../../img/icons/fanvue.png';
import linkmeIcon from '../../../img/icons/linkme.png';
import websiteIcon from '../../../img/icons/website.svg';

const SettingsTab = () => {
  const [formData, setFormData] = useState({
    name: 'Anna Petrova',
    email: 'anna@example.com',
    username: 'anna_petrova',
    bio: 'Professional model with experience in fashion and commercial shoots.',
    location: 'New York, NY',
    country: 'US',
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
    weeklyReports: true,
    gender: 'female',
    profession: 'model',
    notificationFrequency: 'immediate',
    // Model Profile Page Settings
    stageName: 'Sky',
    modelBio: 'Welcome to my exclusive content! Professional model with years of experience in fashion and commercial photography.',
    bannerImage: '',
    avatarImage: '',
    social: {
      instagram: 'https://www.instagram.com/anna_petrova/',
      facebook: '',
      x: 'https://x.com/anna_petrova',
      youtube: 'http://www.youtube.com/@anna_petrova',
      tiktok: '',
      telegram: '',
      website: 'https://anapetrova.com',
      onlyfans: '',
      fanvue: '',
      linkme: ''
    }
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

  const handleSocialChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [platform]: value
      }
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
      // Here you would typically upload the file and update formData.avatarImage
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Banner upload: ${file.name} (demo)`);
      // Here you would typically upload the file and update formData.bannerImage
    }
  };

  const handleModelAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Model Avatar upload: ${file.name} (demo)`);
      // Here you would typically upload the file and update formData.avatarImage
    }
  };

  return (
    <div className="settings-tab">
      <div className="tab-header">
        <h2>Profile Settings</h2>
        <p>Manage your profile information and preferences</p>
      </div>

      {!isEditing && (
        <div className="settings-actions">
          <button 
            className="btn-primary"
            onClick={() => setIsEditing(true)}
          >
            <span className="btn-icon">✏️</span>
            Edit Profile
          </button>
        </div>
      )}

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

            <div className="form-group settings-form-group">
              <label htmlFor="username" className="settings-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input settings-input"
              />
            </div>

            <div className="form-group settings-form-group">
              <label htmlFor="email" className="settings-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input settings-input"
              />
            </div>

            <div className="form-group settings-form-group">
              <label htmlFor="phone" className="settings-label">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input settings-input"
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

            <div className="form-group settings-form-group">
              <label htmlFor="country" className="settings-label">Country</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-select settings-input"
              >
                <option value="">Select Country</option>
                <option value="US">🇺🇸 United States</option>
                <option value="CA">🇨🇦 Canada</option>
                <option value="GB">🇬🇧 United Kingdom</option>
                <option value="FR">🇫🇷 France</option>
                <option value="DE">🇩🇪 Germany</option>
                <option value="IT">🇮🇹 Italy</option>
                <option value="ES">🇪🇸 Spain</option>
                <option value="NL">🇳🇱 Netherlands</option>
                <option value="SE">🇸🇪 Sweden</option>
                <option value="NO">🇳🇴 Norway</option>
                <option value="DK">🇩🇰 Denmark</option>
                <option value="FI">🇫🇮 Finland</option>
                <option value="AU">🇦🇺 Australia</option>
                <option value="NZ">🇳🇿 New Zealand</option>
                <option value="JP">🇯🇵 Japan</option>
                <option value="KR">🇰🇷 South Korea</option>
                <option value="CN">🇨🇳 China</option>
                <option value="SG">🇸🇬 Singapore</option>
                <option value="BR">🇧🇷 Brazil</option>
                <option value="MX">🇲🇽 Mexico</option>
                <option value="AR">🇦🇷 Argentina</option>
                <option value="RU">🇷🇺 Russia</option>
                <option value="IN">🇮🇳 India</option>
                <option value="AE">🇦🇪 UAE</option>
                <option value="SA">🇸🇦 Saudi Arabia</option>
                <option value="ZA">🇿🇦 South Africa</option>
              </select>
            </div>

            <div className="form-group settings-form-group">
              <label htmlFor="location" className="settings-label">City/State</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input settings-input"
                placeholder="e.g., New York, NY"
              />
            </div>

            <div className="form-group settings-form-group">
              <label htmlFor="website" className="settings-label">Website</label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input settings-input"
              />
            </div>

            <div className="form-group settings-form-group">
              <label htmlFor="birthdate" className="settings-label">Birth Date</label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input settings-input"
              />
            </div>

            <div className="form-group settings-form-group">
              <label htmlFor="gender" className="settings-label">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-select settings-input"
              >
                <option value="">Prefer not to say</option>
                <option value="female">♀️ Female</option>
                <option value="male">♂️ Male</option>
                <option value="non-binary">🏳️‍⚧️ Non-binary</option>
                <option value="other">🌈 Other</option>
              </select>
            </div>

            <div className="form-group settings-form-group">
              <label htmlFor="profession" className="settings-label">Profession</label>
              <select
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-select settings-input"
              >
                <option value="">Select profession</option>
                <optgroup label="Creative Arts">
                  <option value="model">📸 Model</option>
                  <option value="photographer">📷 Photographer</option>
                  <option value="artist">🎨 Artist</option>
                  <option value="designer">✏️ Designer</option>
                  <option value="influencer">📱 Influencer</option>
                  <option value="content-creator">🎬 Content Creator</option>
                  <option value="musician">🎵 Musician</option>
                  <option value="dancer">💃 Dancer</option>
                  <option value="actor">🎭 Actor</option>
                </optgroup>
                <optgroup label="Fitness & Wellness">
                  <option value="fitness-trainer">💪 Fitness Trainer</option>
                  <option value="yoga-instructor">🧘 Yoga Instructor</option>
                  <option value="nutritionist">🥗 Nutritionist</option>
                  <option value="wellness-coach">🌱 Wellness Coach</option>
                </optgroup>
                <optgroup label="Business & Professional">
                  <option value="entrepreneur">💼 Entrepreneur</option>
                  <option value="consultant">🎯 Consultant</option>
                  <option value="coach">🏆 Coach</option>
                  <option value="teacher">📚 Teacher</option>
                  <option value="student">🎓 Student</option>
                </optgroup>
                <optgroup label="Other">
                  <option value="other">🔧 Other</option>
                </optgroup>
              </select>
            </div>

            <div className="form-group settings-form-group">
              <label htmlFor="language" className="settings-label">Language</label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-select settings-input"
              >
                <option value="en">English</option>
                <option value="es">Español (Spanish)</option>
                <option value="fr">Français (French)</option>
                <option value="de">Deutsch (German)</option>
                <option value="it">Italiano (Italian)</option>
                <option value="pt">Português (Portuguese)</option>
                <option value="ru">Русский (Russian)</option>
                <option value="ja">日本語 (Japanese)</option>
                <option value="ko">한국어 (Korean)</option>
                <option value="zh">中文 (Chinese)</option>
                <option value="ar">العربية (Arabic)</option>
                <option value="nl">Nederlands (Dutch)</option>
                <option value="sv">Svenska (Swedish)</option>
                <option value="no">Norsk (Norwegian)</option>
                <option value="da">Dansk (Danish)</option>
              </select>
            </div>

            <div className="form-group settings-form-group">
              <label htmlFor="timezone" className="settings-label">Timezone</label>
              <select
                id="timezone"
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-select settings-input"
              >
                <optgroup label="North America">
                  <option value="America/New_York">Eastern Time (UTC-5/-4)</option>
                  <option value="America/Chicago">Central Time (UTC-6/-5)</option>
                  <option value="America/Denver">Mountain Time (UTC-7/-6)</option>
                  <option value="America/Los_Angeles">Pacific Time (UTC-8/-7)</option>
                  <option value="America/Vancouver">Vancouver (UTC-8/-7)</option>
                  <option value="America/Toronto">Toronto (UTC-5/-4)</option>
                </optgroup>
                <optgroup label="Europe">
                  <option value="Europe/London">London (UTC+0/+1)</option>
                  <option value="Europe/Paris">Paris (UTC+1/+2)</option>
                  <option value="Europe/Berlin">Berlin (UTC+1/+2)</option>
                  <option value="Europe/Rome">Rome (UTC+1/+2)</option>
                  <option value="Europe/Madrid">Madrid (UTC+1/+2)</option>
                  <option value="Europe/Amsterdam">Amsterdam (UTC+1/+2)</option>
                  <option value="Europe/Stockholm">Stockholm (UTC+1/+2)</option>
                  <option value="Europe/Moscow">Moscow (UTC+3)</option>
                </optgroup>
                <optgroup label="Asia Pacific">
                  <option value="Asia/Tokyo">Tokyo (UTC+9)</option>
                  <option value="Asia/Seoul">Seoul (UTC+9)</option>
                  <option value="Asia/Shanghai">Shanghai (UTC+8)</option>
                  <option value="Asia/Hong_Kong">Hong Kong (UTC+8)</option>
                  <option value="Asia/Singapore">Singapore (UTC+8)</option>
                  <option value="Asia/Dubai">Dubai (UTC+4)</option>
                  <option value="Australia/Sydney">Sydney (UTC+10/+11)</option>
                  <option value="Australia/Melbourne">Melbourne (UTC+10/+11)</option>
                </optgroup>
                <optgroup label="Other">
                  <option value="UTC">UTC (Coordinated Universal Time)</option>
                </optgroup>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>Privacy Settings</h3>
          <div className="form-grid settings-form-grid">
            <div className="form-group settings-form-group">
              <label htmlFor="profileVisibility" className="settings-label">Profile Visibility</label>
              <select
                id="profileVisibility"
                name="profileVisibility"
                value={formData.profileVisibility}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-select settings-input"
              >
                <option value="public">🌍 Public - Anyone can view</option>
                <option value="registered">👥 Registered Users Only</option>
                <option value="followers">👤 Followers Only</option>
                <option value="subscribers">⭐ Subscribers Only</option>
                <option value="private">🔒 Private - Nobody can view</option>
              </select>
            </div>

            <div className="form-group settings-form-group">
              <label htmlFor="contentVisibility" className="settings-label">Content Visibility</label>
              <select
                id="contentVisibility"
                name="contentVisibility"
                value={formData.contentVisibility}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-select settings-input"
              >
                <option value="public">🌍 Public - Free for everyone</option>
                <option value="preview">👀 Preview Only - Teasers visible</option>
                <option value="followers">👤 Followers Only</option>
                <option value="subscribers">⭐ Subscribers Only</option>
                <option value="premium">💎 Premium Subscribers Only</option>
                <option value="private">🔒 Private - Nobody can view</option>
              </select>
            </div>

            <div className="form-group settings-form-group">
              <label htmlFor="allowMessages" className="settings-label">Allow Messages From</label>
              <select
                id="allowMessages"
                name="allowMessages"
                value={formData.allowMessages}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-select settings-input"
              >
                <option value="all">💬 Everyone</option>
                <option value="verified">✅ Verified Users Only</option>
                <option value="followers">👤 Followers Only</option>
                <option value="mutual">🤝 Mutual Followers</option>
                <option value="subscribers">⭐ Subscribers Only</option>
                <option value="premium">💎 Premium Subscribers Only</option>
                <option value="none">🚫 No One</option>
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

            <label className="checkbox-container settings-checkbox-container">
              <input
                type="checkbox"
                name="pushNotifications"
                checked={formData.pushNotifications}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <span className="checkmark settings-checkmark"></span>
              <span className="checkbox-label">Push Notifications</span>
              <span className="checkbox-description">Receive push notifications on your devices</span>
            </label>

            <label className="checkbox-container settings-checkbox-container">
              <input
                type="checkbox"
                name="marketingEmails"
                checked={formData.marketingEmails}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <span className="checkmark settings-checkmark"></span>
              <span className="checkbox-label">Marketing Emails</span>
              <span className="checkbox-description">Receive promotional emails and updates</span>
            </label>

            <label className="checkbox-container settings-checkbox-container">
              <input
                type="checkbox"
                name="weeklyReports"
                checked={formData.weeklyReports}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <span className="checkmark settings-checkmark"></span>
              <span className="checkbox-label">Weekly Reports</span>
              <span className="checkbox-description">Receive weekly performance reports</span>
            </label>
          </div>

          <div className="form-group settings-form-group">
            <label htmlFor="notificationFrequency" className="settings-label">Notification Frequency</label>
            <select
              id="notificationFrequency"
              name="notificationFrequency"
              value={formData.notificationFrequency}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="form-select settings-input"
            >
              <option value="immediate">⚡ Immediate - Real-time notifications</option>
              <option value="hourly">⏰ Hourly - Bundled every hour</option>
              <option value="daily">📅 Daily - Once per day summary</option>
              <option value="weekly">📊 Weekly - Weekly digest only</option>
              <option value="never">🔕 Never - No notifications</option>
            </select>
          </div>
        </div>

        {/* Model Profile Page Settings */}
        <div className="settings-section">
          <h3>Model Profile Page Settings</h3>
          <p className="section-description">Customize how your model profile appears to visitors</p>

          {/* Stage Name */}
          <div className="form-grid settings-form-grid">
            <div className="form-group settings-form-group">
              <label htmlFor="stageName" className="settings-label">Stage Name</label>
              <input
                type="text"
                id="stageName"
                name="stageName"
                value={formData.stageName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input settings-input"
                placeholder="Your professional stage name"
              />
              <small className="form-description">
                This name will appear in quotes on your profile page
              </small>
            </div>

            <div className="form-group settings-form-group full-width">
              <label htmlFor="modelBio" className="settings-label">Model Profile Bio</label>
              <textarea
                id="modelBio"
                name="modelBio"
                value={formData.modelBio}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-textarea settings-textarea"
                rows="4"
                placeholder="Write a compelling bio for your model profile page..."
              />
              <small className="form-description">
                This bio will be displayed on your public model profile page
              </small>
            </div>
          </div>

          {/* Profile Images */}
          <div className="profile-images-section">
            <h4>Profile Images</h4>
            
            {/* Model Avatar */}
            <div className="image-upload-group">
              <label className="settings-label">Model Profile Avatar</label>
              <div className="image-upload-container">
                <div className="current-image">
                  <img 
                    src={formData.avatarImage || "https://images.unsplash.com/photo-1494790108755-2616c9ef2fe8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"} 
                    alt="Model Avatar" 
                    className="preview-image avatar-preview"
                  />
                </div>
                <div className="image-controls">
                  <input 
                    type="file" 
                    id="model-avatar-upload" 
                    accept="image/*" 
                    onChange={handleModelAvatarChange}
                    disabled={!isEditing}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="model-avatar-upload" className={`btn-secondary ${!isEditing ? 'disabled' : ''}`}>
                    Change Avatar
                  </label>
                  <small className="form-description">
                    Square image recommended (300x300px minimum)
                  </small>
                </div>
              </div>
            </div>

            {/* Banner Image */}
            <div className="image-upload-group">
              <label className="settings-label">Profile Banner Background</label>
              <div className="image-upload-container">
                <div className="current-image banner-preview">
                  <img 
                    src={formData.bannerImage || "https://images.unsplash.com/photo-1557683311-eac922347aa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                    alt="Banner Background" 
                    className="preview-image"
                  />
                  <div className="banner-overlay-preview"></div>
                </div>
                <div className="image-controls">
                  <input 
                    type="file" 
                    id="banner-upload" 
                    accept="image/*" 
                    onChange={handleBannerChange}
                    disabled={!isEditing}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="banner-upload" className={`btn-secondary ${!isEditing ? 'disabled' : ''}`}>
                    Change Banner
                  </label>
                  <small className="form-description">
                    Wide image recommended (1200x400px minimum). A dark overlay will be applied.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="settings-section">
          <h3>Social Media Links</h3>
          <p className="section-description">Manage your social media presence on your profile</p>
          
          <div className="social-links-grid">
            <div className="social-input-group">
              <label htmlFor="social-instagram" className="settings-label">
                <img src={instagramIcon} alt="" className="social-icon-label" />
                Instagram
              </label>
              <input
                type="url"
                id="social-instagram"
                value={formData.social.instagram}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                disabled={!isEditing}
                className="form-input settings-input"
                placeholder="https://www.instagram.com/yourusername/"
              />
            </div>

            <div className="social-input-group">
              <label htmlFor="social-x" className="settings-label">
                <img src={xIcon} alt="" className="social-icon-label" />
                X (Twitter)
              </label>
              <input
                type="url"
                id="social-x"
                value={formData.social.x}
                onChange={(e) => handleSocialChange('x', e.target.value)}
                disabled={!isEditing}
                className="form-input settings-input"
                placeholder="https://x.com/yourusername"
              />
            </div>

            <div className="social-input-group">
              <label htmlFor="social-youtube" className="settings-label">
                <img src={youtubeIcon} alt="" className="social-icon-label" />
                YouTube
              </label>
              <input
                type="url"
                id="social-youtube"
                value={formData.social.youtube}
                onChange={(e) => handleSocialChange('youtube', e.target.value)}
                disabled={!isEditing}
                className="form-input settings-input"
                placeholder="https://www.youtube.com/@yourusername"
              />
            </div>

            <div className="social-input-group">
              <label htmlFor="social-tiktok" className="settings-label">
                <img src={tiktokIcon} alt="" className="social-icon-label" />
                TikTok
              </label>
              <input
                type="url"
                id="social-tiktok"
                value={formData.social.tiktok}
                onChange={(e) => handleSocialChange('tiktok', e.target.value)}
                disabled={!isEditing}
                className="form-input settings-input"
                placeholder="https://www.tiktok.com/@yourusername"
              />
            </div>

            <div className="social-input-group">
              <label htmlFor="social-telegram" className="settings-label">
                <img src={telegramIcon} alt="" className="social-icon-label" />
                Telegram
              </label>
              <input
                type="url"
                id="social-telegram"
                value={formData.social.telegram}
                onChange={(e) => handleSocialChange('telegram', e.target.value)}
                disabled={!isEditing}
                className="form-input settings-input"
                placeholder="https://t.me/yourusername"
              />
            </div>

            <div className="social-input-group">
              <label htmlFor="social-facebook" className="settings-label">
                <img src={facebookIcon} alt="" className="social-icon-label" />
                Facebook
              </label>
              <input
                type="url"
                id="social-facebook"
                value={formData.social.facebook}
                onChange={(e) => handleSocialChange('facebook', e.target.value)}
                disabled={!isEditing}
                className="form-input settings-input"
                placeholder="https://www.facebook.com/yourusername"
              />
            </div>

            <div className="social-input-group">
              <label htmlFor="social-onlyfans" className="settings-label">
                <img src={onlyfansIcon} alt="" className="social-icon-label" />
                OnlyFans
              </label>
              <input
                type="url"
                id="social-onlyfans"
                value={formData.social.onlyfans}
                onChange={(e) => handleSocialChange('onlyfans', e.target.value)}
                disabled={!isEditing}
                className="form-input settings-input"
                placeholder="https://onlyfans.com/yourusername"
              />
            </div>

            <div className="social-input-group">
              <label htmlFor="social-fanvue" className="settings-label">
                <img src={fanvueIcon} alt="" className="social-icon-label" />
                FanVue
              </label>
              <input
                type="url"
                id="social-fanvue"
                value={formData.social.fanvue}
                onChange={(e) => handleSocialChange('fanvue', e.target.value)}
                disabled={!isEditing}
                className="form-input settings-input"
                placeholder="https://www.fanvue.com/yourusername"
              />
            </div>

            <div className="social-input-group">
              <label htmlFor="social-linkme" className="settings-label">
                <img src={linkmeIcon} alt="" className="social-icon-label" />
                LinkMe
              </label>
              <input
                type="url"
                id="social-linkme"
                value={formData.social.linkme}
                onChange={(e) => handleSocialChange('linkme', e.target.value)}
                disabled={!isEditing}
                className="form-input settings-input"
                placeholder="https://link.me/yourusername"
              />
            </div>

            <div className="social-input-group">
              <label htmlFor="social-website" className="settings-label">
                <img src={websiteIcon} alt="" className="social-icon-label" />
                Personal Website
              </label>
              <input
                type="url"
                id="social-website"
                value={formData.social.website}
                onChange={(e) => handleSocialChange('website', e.target.value)}
                disabled={!isEditing}
                className="form-input settings-input"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          <div className="social-preview">
            <h4>Preview</h4>
            <p className="section-description">This is how your social links will appear on your profile:</p>
            <div className="social-links-preview">
              {Object.entries(formData.social).map(([platform, url]) => (
                url && (
                  <div key={platform} className="social-link-preview">
                    <span className="social-platform">{platform}</span>
                    <span className="social-url">{url}</span>
                  </div>
                )
              ))}
              {Object.values(formData.social).every(url => !url) && (
                <p className="no-social-links">No social links added yet</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="edit-actions">
          <button 
            className="btn-secondary"
            onClick={() => {
              setIsEditing(false);
              // Reset form data to original values
            }}
          >
            <span className="btn-icon">✕</span>
            Cancel
          </button>
          <button 
            className={`btn-primary ${isSaving ? 'loading' : ''}`}
            onClick={handleSave}
            disabled={isSaving}
          >
            <span className="btn-icon">{isSaving ? '⏳' : '💾'}</span>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}

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