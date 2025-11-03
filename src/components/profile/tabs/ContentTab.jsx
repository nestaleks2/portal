import React, { useState } from 'react';
import { 
  createGalleryPreview, 
  createVideoGalleryPreview, 
  validateImageFile, 
  validateVideoFile 
} from '../../../utils/imageUtils';

// Import social media icons
import twitterIcon from '../../../img/icons/x.svg';
import facebookIcon from '../../../img/icons/facebook.svg';
import instagramIcon from '../../../img/icons/instagram.svg';
import telegramIcon from '../../../img/icons/telegram.svg';
import whatsappIcon from '../../../img/icons/whatsapp.svg';
import linkedinIcon from '../../../img/icons/linkedin.svg';
import linkIcon from '../../../img/icons/link.svg';

// Import content type icons
import photoIcon from '../../../img/icons/photo.svg';
import videoIcon from '../../../img/icons/video.svg';
import premiumIcon from '../../../img/icons/premium.svg';

const ContentTab = () => {
  const [uploadProgress, setUploadProgress] = useState({ visible: false, progress: 0 });
  const [filter, setFilter] = useState('all');
  const [uploadedContent, setUploadedContent] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [showPlacementModal, setShowPlacementModal] = useState(false);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState('');
  const [uploadFormData, setUploadFormData] = useState({
    file: null,
    title: '',
    description: '',
    isPremium: false,
    preview: null
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharingContent, setSharingContent] = useState(null);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showEditorModal, setShowEditorModal] = useState(false);

  const processFiles = async (files, isPremium = false) => {
    setUploadProgress({ visible: true, progress: 0 });
    setPreviewImages([]);

    const processedFiles = [];
    const previews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');

      try {
        // Валидация файла
        if (isImage) {
          const validation = validateImageFile(file);
          if (!validation.valid) {
            alert(`Error with ${file.name}: ${validation.error}`);
            continue;
          }
        } else if (isVideo) {
          const validation = validateVideoFile(file);
          if (!validation.valid) {
            alert(`Error with ${file.name}: ${validation.error}`);
            continue;
          }
        } else {
          alert(`Unsupported file type: ${file.name}`);
          continue;
        }

        // Создание превью
        let preview = null;
        if (isImage) {
          preview = await createGalleryPreview(file);
        } else if (isVideo) {
          preview = await createVideoGalleryPreview(file);
        }

        const newContent = {
          id: Date.now() + i,
          file: file,
          type: isImage ? 'photo' : 'video',
          title: file.name.split('.')[0],
          thumbnail: preview,
          size: file.size,
          status: 'processing',
          uploadDate: new Date().toISOString(),
          isPremium: isPremium
        };

        processedFiles.push(newContent);
        previews.push(preview);

        // Обновляем прогресс
        const progress = ((i + 1) / files.length) * 100;
        setUploadProgress({ visible: true, progress });
        
      } catch (error) {
        console.error(`Error processing ${file.name}:`, error);
        alert(`Error processing ${file.name}: ${error.message}`);
      }
    }

    // Симуляция загрузки
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev.progress + Math.random() * 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress({ visible: false, progress: 0 });
            setUploadedContent(prevContent => [...prevContent, ...processedFiles]);
            setPreviewImages(previews);
            alert(`Successfully processed ${processedFiles.length} file(s)`);
          }, 500);
          return { visible: true, progress: 100 };
        }
        return { visible: true, progress: newProgress };
      });
    }, 100);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      document.body.style.overflow = 'hidden';
      setPendingFiles(files);
      setShowPlacementModal(true);
    }
  };

  const handlePlacementChoice = async (isPremium) => {
    document.body.style.overflow = 'unset';
    setShowPlacementModal(false);
    if (pendingFiles.length > 0) {
      await processFiles(pendingFiles, isPremium);
      setPendingFiles([]);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Валидация файла
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      let validation;
      if (isImage) {
        validation = validateImageFile(file);
      } else if (isVideo) {
        validation = validateVideoFile(file);
      } else {
        alert('Unsupported file type');
        return;
      }

      if (!validation.valid) {
        alert(`Error: ${validation.error}`);
        return;
      }

      // Создание превью
      let preview = null;
      try {
        if (isImage) {
          preview = await createGalleryPreview(file);
        } else if (isVideo) {
          preview = await createVideoGalleryPreview(file);
        }
      } catch (error) {
        console.error('Error creating preview:', error);
      }

      setUploadFormData({
        file: file,
        title: file.name.split('.')[0],
        description: '',
        isPremium: false,
        preview: preview
      });
    }
  };

  const handleUploadSubmit = async () => {
    if (!uploadFormData.file) return;

    document.body.style.overflow = 'unset';
    setShowUploadModal(false);
    setUploadProgress({ visible: true, progress: 0 });

    try {
      const newContent = {
        id: Date.now(),
        file: uploadFormData.file,
        type: uploadFormData.file.type.startsWith('image/') ? 'photo' : 'video',
        title: uploadFormData.title || uploadFormData.file.name.split('.')[0],
        description: uploadFormData.description,
        thumbnail: uploadFormData.preview,
        size: uploadFormData.file.size,
        status: 'processing',
        uploadDate: new Date().toISOString(),
        isPremium: uploadFormData.isPremium
      };

      // Симуляция загрузки
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev.progress + Math.random() * 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setUploadProgress({ visible: false, progress: 0 });
              setUploadedContent(prevContent => [newContent, ...prevContent]);
              alert(`Successfully uploaded: ${newContent.title}`);
            }, 500);
            return { visible: true, progress: 100 };
          }
          return { visible: true, progress: newProgress };
        });
      }, 100);

    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed: ' + error.message);
      setUploadProgress({ visible: false, progress: 0 });
    }

    // Сброс формы
    setUploadFormData({
      file: null,
      title: '',
      description: '',
      isPremium: false,
      preview: null
    });
  };

  const closeUploadModal = () => {
    document.body.style.overflow = 'unset';
    setShowUploadModal(false);
    setUploadFormData({
      file: null,
      title: '',
      description: '',
      isPremium: false,
      preview: null
    });
  };

  const handleEditContent = (item) => {
    document.body.style.overflow = 'hidden';
    setEditingContent({...item});
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editingContent) return;

    // Обновляем контент в списке
    setUploadedContent(prevContent => 
      prevContent.map(item => 
        item.id === editingContent.id ? editingContent : item
      )
    );

    document.body.style.overflow = 'unset';
    setShowEditModal(false);
    setEditingContent(null);
    alert(`Content "${editingContent.title}" updated successfully`);
  };

  const closeEditModal = () => {
    document.body.style.overflow = 'unset';
    setShowEditModal(false);
    setEditingContent(null);
  };

  const handleShareContent = (item) => {
    document.body.style.overflow = 'hidden';
    setSharingContent(item);
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    document.body.style.overflow = 'unset';
    setShowShareModal(false);
    setSharingContent(null);
  };

  const shareToSocialMedia = (platform) => {
    if (!sharingContent) return;

    const contentUrl = `${window.location.origin}/content/${sharingContent.id}`;
    const title = sharingContent.title;
    const description = sharingContent.description || `Check out this ${sharingContent.type} content!`;

    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(contentUrl)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(contentUrl)}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct URL sharing, so we copy to clipboard
        navigator.clipboard.writeText(`${title} - ${contentUrl}`);
        alert('Content link copied to clipboard! You can now paste it in Instagram.');
        closeShareModal();
        return;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(contentUrl)}&text=${encodeURIComponent(title)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title} - ${contentUrl}`)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(contentUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(contentUrl);
        alert('Content link copied to clipboard!');
        closeShareModal();
        return;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      closeShareModal();
    }
  };

  // Analytics handlers
  const openAnalytics = () => {
    document.body.style.overflow = 'hidden';
    setShowAnalyticsModal(true);
  };

  const closeAnalytics = () => {
    document.body.style.overflow = 'unset';
    setShowAnalyticsModal(false);
  };

  // Schedule handlers
  const openSchedule = () => {
    document.body.style.overflow = 'hidden';
    setShowScheduleModal(true);
  };

  const closeSchedule = () => {
    document.body.style.overflow = 'unset';
    setShowScheduleModal(false);
  };

  // Editor handlers
  const openEditor = () => {
    document.body.style.overflow = 'hidden';
    setShowEditorModal(true);
  };

  const closeEditor = () => {
    document.body.style.overflow = 'unset';
    setShowEditorModal(false);
  };

  const contentItems = [
    {
      id: 1,
      type: 'photo',
      title: 'Professional Photoshoot',
      thumbnail: 'https://images.unsplash.com/photo-1494790108755-2616c9ef2fe8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      views: '2.1K',
      likes: '324',
      date: '2 days ago',
      status: 'published',
      isPremium: false
    },
    {
      id: 2,
      type: 'video',
      title: 'Behind the Scenes Video',
      thumbnail: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      views: '1.8K',
      likes: '298',
      date: '5 days ago',
      status: 'published',
      isPremium: true
    },
    {
      id: 3,
      type: 'photo',
      title: 'Fashion Portrait Series',
      thumbnail: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      views: '1.5K',
      likes: '245',
      date: '1 week ago',
      status: 'published',
      isPremium: false
    }
  ];

  // Объединяем демо контент с загруженным (новый контент сначала)
  const allContent = [...uploadedContent, ...contentItems];
  
  const filteredContent = allContent.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'photos') return item.type === 'photo';
    if (filter === 'videos') return item.type === 'video';
    if (filter === 'premium') return item.isPremium;
    return true;
  });

  const handleDeleteContent = (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      alert(`Content ${id} deleted (demo)`);
    }
  };


  const getStatusBadge = (status) => {
    const statusColors = {
      published: 'success',
      draft: 'warning',
      processing: 'info'
    };
    return `status-badge ${statusColors[status] || 'default'}`;
  };

  return (
    <div className="content-tab">
      <div className="tab-header">
        <h2>Content Management</h2>
        <p>Upload, organize, and manage your content</p>
      </div>

      <div className="upload-section">
        <h3>Upload New Content</h3>
        <div className="upload-area content-upload-area">
          <div className="upload-box content-upload-box">
            <span className="upload-icon">📷</span>
            <h4>Upload Photos</h4>
            <p>JPG, PNG up to 10MB</p>
            <button 
              className="upload-btn" 
              onClick={() => {
                document.body.style.overflow = 'hidden';
                setUploadType('photo');
                setShowUploadModal(true);
              }}
              aria-label="Upload photo content"
            >
              Upload Photos
            </button>
          </div>
          <div className="upload-box content-upload-box">
            <span className="upload-icon">🎥</span>
            <h4>Upload Videos</h4>
            <p>MP4, MOV up to 100MB</p>
            <button 
              className="upload-btn" 
              onClick={() => {
                document.body.style.overflow = 'hidden';
                setUploadType('video');
                setShowUploadModal(true);
              }}
              aria-label="Upload video content"
            >
              Upload Videos
            </button>
          </div>
        </div>
        
        {uploadProgress.visible && (
          <div className="upload-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${uploadProgress.progress}%` }}
              />
            </div>
            <div className="progress-text">
              Processing files: {Math.round(uploadProgress.progress)}%
            </div>
          </div>
        )}

      </div>

      <div className="content-section">
        <div className="content-header content-tab-header">
          <h3>Your Content</h3>
        </div>

        <div className="model-content-tabs">
          <button 
            className={`tab-button ${filter === 'photos' ? 'active' : ''}`}
            onClick={() => setFilter('photos')}
          >
            <img src={photoIcon} alt="Photos" className="tab-icon" />
            <span className="tab-text">Photos</span>
            <span className="tab-count">{allContent.filter(item => item.type === 'photo').length}</span>
          </button>
          <button 
            className={`tab-button ${filter === 'videos' ? 'active' : ''}`}
            onClick={() => setFilter('videos')}
          >
            <img src={videoIcon} alt="Videos" className="tab-icon" />
            <span className="tab-text">Videos</span>
            <span className="tab-count">{allContent.filter(item => item.type === 'video').length}</span>
          </button>
          <button 
            className={`tab-button ${filter === 'premium' ? 'active' : ''}`}
            onClick={() => setFilter('premium')}
          >
            <img src={premiumIcon} alt="Premium" className="tab-icon" />
            <span className="tab-text">Premium</span>
            <span className="tab-count">{allContent.filter(item => item.isPremium).length}</span>
          </button>
          <button 
            className={`tab-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            <span className="tab-text">All Content</span>
            <span className="tab-count">{allContent.length}</span>
          </button>
        </div>

        <div className="content-grid">
          {filteredContent.map(item => (
            <div key={item.id} className="content-card">
              <div className="content-thumbnail">
                <img src={item.thumbnail} alt={item.title} />
                <div className="content-overlay">
                  <div className="content-type">
                    {item.type === 'video' ? '🎥' : '📷'}
                  </div>
                  {item.isPremium && (
                    <div className="premium-badge">💎</div>
                  )}
                </div>
              </div>
              <div className="content-info">
                <h4 className="content-title">{item.title}</h4>
                <div className="content-meta">
                  <span className={getStatusBadge(item.status)}>{item.status}</span>
                  <span className="content-date">{item.date}</span>
                </div>
                <div className="content-stats">
                  <span className="content-stat">
                    <span className="stat-icon">👁️</span>
                    {item.views}
                  </span>
                  <span className="content-stat">
                    <span className="stat-icon">❤️</span>
                    {item.likes}
                  </span>
                </div>
                <div className="content-actions">
                  <button 
                    className="action-btn edit"
                    onClick={() => handleEditContent(item)}
                  >
                    <span className="action-icon">✏️</span>
                    Edit
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDeleteContent(item.id)}
                  >
                    <span className="action-icon">🗑️</span>
                    Delete
                  </button>
                  <button 
                    className="action-btn share"
                    onClick={() => handleShareContent(item)}
                  >
                    <span className="action-icon">📤</span>
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📁</div>
            <h4>No content found</h4>
            <p>Try adjusting your filters or upload some new content</p>
          </div>
        )}
      </div>

      <div className="content-tools">
        <h3>Content Tools</h3>
        <div className="tools-grid">
          <div className="tool-card">
            <span className="tool-icon">📊</span>
            <h4>Analytics</h4>
            <p>View detailed performance metrics for your content</p>
            <button className="tool-btn" onClick={openAnalytics}>View Analytics</button>
          </div>
          <div className="tool-card">
            <span className="tool-icon">📅</span>
            <h4>Schedule Posts</h4>
            <p>Plan and schedule your content releases</p>
            <button className="tool-btn" onClick={openSchedule}>Schedule Content</button>
          </div>
          <div className="tool-card">
            <span className="tool-icon">🎨</span>
            <h4>Edit Tools</h4>
            <p>Basic photo and video editing capabilities</p>
            <button className="tool-btn" onClick={openEditor}>Open Editor</button>
          </div>
        </div>
      </div>

      {/* Upload Content Modal */}
      {showUploadModal && (
        <div className="content-upload-modal-overlay">
          <div className="content-upload-modal">
            <div className="modal-header">
              <h3>Upload {uploadType === 'photo' ? 'Photo' : 'Video'} Content</h3>
              <button 
                className="modal-close"
                onClick={closeUploadModal}
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
            
            <div className="upload-modal-content">
              <div className="upload-form">
                <div className="file-upload-section">
                  <h4>Select File</h4>
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      id="content-file-input"
                      accept={uploadType === 'photo' ? 'image/*' : 'video/*'}
                      onChange={handleFileChange}
                      className="hidden-file-input"
                    />
                    <label htmlFor="content-file-input" className="file-input-label">
                      {uploadFormData.file ? uploadFormData.file.name : 'Choose File'}
                    </label>
                  </div>
                </div>

                {uploadFormData.preview && (
                  <div className="preview-section">
                    <h4>Preview</h4>
                    <div className="content-preview">
                      <img src={uploadFormData.preview} alt="Content preview" />
                    </div>
                  </div>
                )}

                <div className="form-fields">
                  <div className="form-group">
                    <label htmlFor="content-title">Title</label>
                    <input
                      type="text"
                      id="content-title"
                      value={uploadFormData.title}
                      onChange={(e) => setUploadFormData(prev => ({...prev, title: e.target.value}))}
                      placeholder="Enter content title"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="content-description">Description</label>
                    <textarea
                      id="content-description"
                      value={uploadFormData.description}
                      onChange={(e) => setUploadFormData(prev => ({...prev, description: e.target.value}))}
                      placeholder="Enter content description"
                      rows="3"
                    />
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={uploadFormData.isPremium}
                        onChange={(e) => setUploadFormData(prev => ({...prev, isPremium: e.target.checked}))}
                      />
                      <span className="checkbox-custom"></span>
                      Premium Content
                      <span className="premium-badge">💎</span>
                    </label>
                    <p className="form-help">Premium content is only visible to premium subscribers</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeUploadModal}>
                Cancel
              </button>
              <button 
                className="btn-primary" 
                onClick={handleUploadSubmit}
                disabled={!uploadFormData.file}
              >
                Upload Content
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Content Modal */}
      {showEditModal && editingContent && (
        <div className="content-upload-modal-overlay">
          <div className="content-upload-modal">
            <div className="modal-header">
              <h3>Edit Content</h3>
              <button 
                className="modal-close"
                onClick={closeEditModal}
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
            
            <div className="upload-modal-content">
              <div className="upload-form">
                {editingContent.thumbnail && (
                  <div className="preview-section">
                    <h4>Current Preview</h4>
                    <div className="content-preview">
                      <img src={editingContent.thumbnail} alt="Content preview" />
                    </div>
                  </div>
                )}

                <div className="form-fields">
                  <div className="form-group">
                    <label htmlFor="edit-title">Title</label>
                    <input
                      type="text"
                      id="edit-title"
                      value={editingContent.title}
                      onChange={(e) => setEditingContent(prev => ({...prev, title: e.target.value}))}
                      placeholder="Enter content title"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="edit-description">Description</label>
                    <textarea
                      id="edit-description"
                      value={editingContent.description || ''}
                      onChange={(e) => setEditingContent(prev => ({...prev, description: e.target.value}))}
                      placeholder="Enter content description"
                      rows="3"
                    />
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={editingContent.isPremium || false}
                        onChange={(e) => setEditingContent(prev => ({...prev, isPremium: e.target.checked}))}
                      />
                      <span className="checkbox-custom"></span>
                      Premium Content
                      <span className="premium-badge">💎</span>
                    </label>
                    <p className="form-help">Premium content is only visible to premium subscribers</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeEditModal}>
                Cancel
              </button>
              <button 
                className="btn-primary" 
                onClick={handleSaveEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Content Modal */}
      {showShareModal && sharingContent && (
        <div className="content-placement-modal-overlay">
          <div className="content-share-modal">
            <div className="modal-header">
              <h3>Share "{sharingContent.title}"</h3>
              <button 
                className="modal-close"
                onClick={closeShareModal}
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
            
            <div className="share-modal-content">
              <div className="content-preview-info">
                <img src={sharingContent.thumbnail} alt={sharingContent.title} />
                <div className="preview-info">
                  <h4>{sharingContent.title}</h4>
                  <p>{sharingContent.description || `${sharingContent.type} content`}</p>
                </div>
              </div>

              <div className="share-options">
                <h4>Share to Social Media</h4>
                <div className="social-buttons">
                  <button 
                    className="social-btn twitter"
                    onClick={() => shareToSocialMedia('twitter')}
                  >
                    <img src={twitterIcon} alt="Twitter" className="social-icon" />
                    Twitter
                  </button>
                  <button 
                    className="social-btn facebook"
                    onClick={() => shareToSocialMedia('facebook')}
                  >
                    <img src={facebookIcon} alt="Facebook" className="social-icon" />
                    Facebook
                  </button>
                  <button 
                    className="social-btn instagram"
                    onClick={() => shareToSocialMedia('instagram')}
                  >
                    <img src={instagramIcon} alt="Instagram" className="social-icon" />
                    Instagram
                  </button>
                  <button 
                    className="social-btn telegram"
                    onClick={() => shareToSocialMedia('telegram')}
                  >
                    <img src={telegramIcon} alt="Telegram" className="social-icon" />
                    Telegram
                  </button>
                  <button 
                    className="social-btn whatsapp"
                    onClick={() => shareToSocialMedia('whatsapp')}
                  >
                    <img src={whatsappIcon} alt="WhatsApp" className="social-icon" />
                    WhatsApp
                  </button>
                  <button 
                    className="social-btn linkedin"
                    onClick={() => shareToSocialMedia('linkedin')}
                  >
                    <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
                    LinkedIn
                  </button>
                  <button 
                    className="social-btn copy"
                    onClick={() => shareToSocialMedia('copy')}
                  >
                    <img src={linkIcon} alt="Copy Link" className="social-icon" />
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Placement Modal */}
      {showPlacementModal && (
        <div className="content-placement-modal-overlay">
          <div className="content-placement-modal">
            <div className="modal-header">
              <h3>Выберите тип размещения контента</h3>
              <button 
                className="modal-close"
                onClick={() => {
                  document.body.style.overflow = 'unset';
                  setShowPlacementModal(false);
                }}
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
            
            <div className="placement-options">
              <div className="placement-option">
                <div className="option-icon">📷</div>
                <h4>Обычный контент</h4>
                <p>Контент будет доступен всем подписчикам</p>
                <ul>
                  <li>Бесплатный доступ</li>
                  <li>Максимальный охват</li>
                  <li>Привлечение новых подписчиков</li>
                </ul>
                <button 
                  className="placement-btn regular"
                  onClick={() => handlePlacementChoice(false)}
                >
                  Разместить как обычный
                </button>
              </div>
              
              <div className="placement-option premium">
                <div className="option-icon">💎</div>
                <h4>Премиум контент</h4>
                <p>Контент только для премиум подписчиков</p>
                <ul>
                  <li>Эксклюзивный доступ</li>
                  <li>Дополнительный доход</li>
                  <li>Особый статус контента</li>
                </ul>
                <button 
                  className="placement-btn premium-btn"
                  onClick={() => handlePlacementChoice(true)}
                >
                  Разместить как премиум
                </button>
              </div>
            </div>
            
            <div className="modal-footer">
              <p>Файлов к загрузке: <strong>{pendingFiles.length}</strong></p>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {showAnalyticsModal && (
        <div className="content-upload-modal-overlay">
          <div className="content-upload-modal analytics-modal">
            <div className="modal-header">
              <h3>Content Analytics</h3>
              <button 
                className="modal-close"
                onClick={closeAnalytics}
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
            
            <div className="analytics-modal-content">
              <div className="analytics-overview">
                <h4>Performance Overview</h4>
                <div className="overview-stats">
                  <div className="overview-stat">
                    <span className="stat-number">{allContent.reduce((sum, item) => sum + parseInt(item.views || 0), 0)}</span>
                    <span className="stat-label">Total Views</span>
                  </div>
                  <div className="overview-stat">
                    <span className="stat-number">{allContent.reduce((sum, item) => sum + parseInt(item.likes || 0), 0)}</span>
                    <span className="stat-label">Total Likes</span>
                  </div>
                  <div className="overview-stat">
                    <span className="stat-number">{allContent.length}</span>
                    <span className="stat-label">Total Content</span>
                  </div>
                  <div className="overview-stat">
                    <span className="stat-number">{((allContent.reduce((sum, item) => sum + parseInt(item.likes || 0), 0) / allContent.reduce((sum, item) => sum + parseInt(item.views || 0), 0)) * 100 || 0).toFixed(1)}%</span>
                    <span className="stat-label">Engagement Rate</span>
                  </div>
                </div>
              </div>

              <div className="analytics-content-list">
                <h4>Content Performance</h4>
                <div className="analytics-table">
                  <div className="table-header">
                    <div className="table-col">Content</div>
                    <div className="table-col">Type</div>
                    <div className="table-col">Views</div>
                    <div className="table-col">Likes</div>
                    <div className="table-col">Engagement</div>
                    <div className="table-col">Date</div>
                  </div>
                  {allContent.slice(0, 10).map(item => (
                    <div key={item.id} className="table-row">
                      <div className="table-col content-cell">
                        <img src={item.thumbnail} alt={item.title} className="content-thumb" />
                        <span className="content-title-short">{item.title}</span>
                      </div>
                      <div className="table-col">
                        <span className={`type-badge ${item.type}`}>
                          {item.type === 'video' ? '🎥' : '📷'} {item.type}
                        </span>
                      </div>
                      <div className="table-col">{item.views || '0'}</div>
                      <div className="table-col">{item.likes || '0'}</div>
                      <div className="table-col">
                        {item.views ? ((parseInt(item.likes || 0) / parseInt(item.views)) * 100).toFixed(1) : '0'}%
                      </div>
                      <div className="table-col">{item.date || 'N/A'}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeAnalytics}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="content-upload-modal-overlay">
          <div className="content-upload-modal schedule-modal">
            <div className="modal-header">
              <h3>Schedule Content</h3>
              <button 
                className="modal-close"
                onClick={closeSchedule}
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
            
            <div className="schedule-modal-content">
              <div className="schedule-form">
                <h4>Schedule New Post</h4>
                <div className="form-group">
                  <label>Select Content</label>
                  <select className="schedule-select">
                    <option value="">Choose content to schedule</option>
                    {allContent.filter(item => item.status !== 'draft').map(item => (
                      <option key={item.id} value={item.id}>
                        {item.title} ({item.type})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Schedule Date</label>
                  <input type="date" className="schedule-date" />
                </div>
                
                <div className="form-group">
                  <label>Schedule Time</label>
                  <input type="time" className="schedule-time" />
                </div>
                
                <div className="form-group">
                  <label>Platform</label>
                  <div className="platform-options">
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      <span className="checkbox-custom"></span>
                      Instagram
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      <span className="checkbox-custom"></span>
                      Twitter
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      <span className="checkbox-custom"></span>
                      Facebook
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Caption</label>
                  <textarea 
                    placeholder="Write your post caption..."
                    rows="4"
                    className="schedule-caption"
                  />
                </div>
              </div>

              <div className="scheduled-posts">
                <h4>Scheduled Posts</h4>
                <div className="scheduled-list">
                  <div className="scheduled-item">
                    <div className="scheduled-content">
                      <img src="https://images.unsplash.com/photo-1494790108755-2616c9ef2fe8?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Content" />
                      <div className="scheduled-info">
                        <h5>Professional Photoshoot</h5>
                        <p>Nov 5, 2024 at 3:00 PM</p>
                        <span className="platform-badges">
                          <span className="platform-badge instagram">IG</span>
                          <span className="platform-badge twitter">TW</span>
                        </span>
                      </div>
                    </div>
                    <button className="schedule-action-btn cancel">Cancel</button>
                  </div>
                  
                  <div className="scheduled-item">
                    <div className="scheduled-content">
                      <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Content" />
                      <div className="scheduled-info">
                        <h5>Behind the Scenes Video</h5>
                        <p>Nov 7, 2024 at 6:00 PM</p>
                        <span className="platform-badges">
                          <span className="platform-badge facebook">FB</span>
                        </span>
                      </div>
                    </div>
                    <button className="schedule-action-btn cancel">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeSchedule}>
                Close
              </button>
              <button className="btn-primary">
                Schedule Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {showEditorModal && (
        <div className="content-upload-modal-overlay">
          <div className="content-upload-modal editor-modal">
            <div className="modal-header">
              <h3>Content Editor</h3>
              <button 
                className="modal-close"
                onClick={closeEditor}
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
            
            <div className="editor-modal-content">
              <div className="editor-sidebar">
                <h4>Select Content to Edit</h4>
                <div className="content-list">
                  {allContent.map(item => (
                    <div key={item.id} className="editor-content-item">
                      <img src={item.thumbnail} alt={item.title} />
                      <div className="editor-content-info">
                        <h5>{item.title}</h5>
                        <span className="content-type-badge">{item.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="editor-workspace">
                <div className="editor-tools">
                  <h4>Editing Tools</h4>
                  <div className="tool-buttons">
                    <button className="editor-tool-btn">
                      <span className="tool-icon">🖼️</span>
                      Crop
                    </button>
                    <button className="editor-tool-btn">
                      <span className="tool-icon">🎨</span>
                      Filters
                    </button>
                    <button className="editor-tool-btn">
                      <span className="tool-icon">☀️</span>
                      Brightness
                    </button>
                    <button className="editor-tool-btn">
                      <span className="tool-icon">🌈</span>
                      Contrast
                    </button>
                    <button className="editor-tool-btn">
                      <span className="tool-icon">📝</span>
                      Text
                    </button>
                    <button className="editor-tool-btn">
                      <span className="tool-icon">🎭</span>
                      Effects
                    </button>
                  </div>
                </div>
                
                <div className="editor-preview">
                  <div className="preview-area">
                    <div className="preview-placeholder">
                      <span className="preview-icon">🖼️</span>
                      <p>Select content from the sidebar to start editing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeEditor}>
                Cancel
              </button>
              <button className="btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentTab;