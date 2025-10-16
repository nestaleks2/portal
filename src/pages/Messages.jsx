import React, { useState, useRef, useEffect } from 'react';
import { modelsData } from '../data/modelsData';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({});
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showChatList, setShowChatList] = useState(true);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  
  // Mock chat data
  const [chats] = useState([
    {
      id: 1,
      modelId: 1,
      model: modelsData[0],
      lastMessage: 'Thanks for subscribing! 💕',
      lastMessageTime: '2 min ago',
      unreadCount: 2,
      isOnline: true
    },
    {
      id: 2,
      modelId: 2,
      model: modelsData[1],
      lastMessage: 'Hope you enjoyed the new photos',
      lastMessageTime: '1 hour ago',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 3,
      modelId: 3,
      model: modelsData[2],
      lastMessage: 'Good morning! How are you today?',
      lastMessageTime: '3 hours ago',
      unreadCount: 1,
      isOnline: true
    }
  ]);

  // Check screen size for mobile view
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setShowChatList(true); // Always show chat list on desktop
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Mock messages data
  useEffect(() => {
    setMessages({
      1: [
        {
          id: 1,
          senderId: 1,
          senderType: 'model',
          content: 'Hi there! Welcome to my profile! 😊',
          timestamp: new Date(Date.now() - 3600000),
          type: 'text'
        },
        {
          id: 2,
          senderId: 'user',
          senderType: 'user',
          content: 'Hi! Thanks for the warm welcome. Love your content!',
          timestamp: new Date(Date.now() - 3500000),
          type: 'text'
        },
        {
          id: 3,
          senderId: 1,
          senderType: 'model',
          content: 'Thanks for subscribing! 💕',
          timestamp: new Date(Date.now() - 120000),
          type: 'text'
        }
      ],
      2: [
        {
          id: 4,
          senderId: 2,
          senderType: 'model',
          content: 'Hope you enjoyed the new photos',
          timestamp: new Date(Date.now() - 3600000),
          type: 'text'
        }
      ],
      3: [
        {
          id: 5,
          senderId: 3,
          senderType: 'model',
          content: 'Good morning! How are you today?',
          timestamp: new Date(Date.now() - 10800000),
          type: 'text'
        }
      ]
    });
  }, []);

  useEffect(() => {
    // Only scroll to bottom when messages change, not when chat changes
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!message.trim() && attachedFiles.length === 0) return;
    if (!selectedChat) return;

    const newMessage = {
      id: Date.now(),
      senderId: 'user',
      senderType: 'user',
      content: message,
      timestamp: new Date(),
      type: attachedFiles.length > 0 ? 'media' : 'text',
      attachments: attachedFiles
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage]
    }));

    setMessage('');
    setAttachedFiles([]);

    // Simulate typing indicator and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const response = {
        id: Date.now() + 1,
        senderId: selectedChat.modelId,
        senderType: 'model',
        content: getRandomResponse(),
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => ({
        ...prev,
        [selectedChat.id]: [...(prev[selectedChat.id] || []), response]
      }));
    }, 2000);
  };

  const getRandomResponse = () => {
    const responses = [
      'Thank you so much! 💕',
      'You\'re so sweet! 😘',
      'I appreciate your support!',
      'Hope you\'re having a great day! ✨',
      'Thanks for being such an amazing fan! 🥰'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleFileAttach = (event) => {
    const files = Array.from(event.target.files);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatMessageContent = (content) => {
    // Simple text formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/__(.*?)__/g, '<u>$1</u>');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="messages-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Messages</h1>
        </div>
      </div>

      <div className="container">
        <div className="messages-layout">
          {/* Sidebar with chat list */}
          <div className={`messages-sidebar ${isMobile && !showChatList ? 'mobile-hidden' : ''}`}>
            <div className="sidebar-header">
              <div className="search-container">
                <input 
                  type="text" 
                  placeholder="Search conversations..." 
                  className="search-input"
                />
                <span className="search-icon">🔍</span>
              </div>
            </div>
            
            <div className="conversations-list">
              {chats.map(chat => (
                <div 
                  key={chat.id}
                  className={`conversation-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedChat(chat);
                    if (isMobile) {
                      setShowChatList(false); // Switch to chat view on mobile
                    }
                  }}
                >
                  <div className="conversation-avatar">
                    <img 
                      src={chat.model.avatar} 
                      alt={chat.model.name}
                    />
                    {chat.isOnline && <div className="status-indicator online"></div>}
                  </div>
                  
                  <div className="conversation-content">
                    <div className="conversation-header">
                      <h4 className="conversation-name">{chat.model.stageName || chat.model.name}</h4>
                      <span className="conversation-time">{chat.lastMessageTime}</span>
                    </div>
                    <div className="conversation-preview">
                      <p className="last-message">{chat.lastMessage}</p>
                      {chat.unreadCount > 0 && (
                        <span className="unread-count">{chat.unreadCount}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main messages area */}
          <div className={`messages-main ${isMobile && showChatList ? 'mobile-hidden' : ''}`}>
            {selectedChat ? (
              <>
                {/* Chat header */}
                <div className="messages-header">
                  <div className="header-info">
                    {isMobile && (
                      <button 
                        className="back-btn"
                        onClick={() => setShowChatList(true)}
                        title="Back to chat list"
                      >
                        ←
                      </button>
                    )}
                    <img 
                      src={selectedChat.model.avatar} 
                      alt={selectedChat.model.name}
                      className="header-avatar"
                    />
                    <div className="header-details">
                      <h3 className="header-name">{selectedChat.model.stageName || selectedChat.model.name}</h3>
                      <span className={`header-status ${selectedChat.isOnline ? 'online' : 'offline'}`}>
                        {selectedChat.isOnline ? '🟢 Online' : '⚫ Last seen recently'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="header-actions">
                    <button className="action-btn" title="Video call">
                      <span>📹</span>
                    </button>
                    <button className="action-btn" title="Voice call">
                      <span>📞</span>
                    </button>
                    <button className="action-btn" title="More options">
                      <span>⋯</span>
                    </button>
                  </div>
                </div>

                {/* Messages area */}
                <div className="messages-content">
                  <div className="messages-scroll">
                    {messages[selectedChat.id]?.map(msg => (
                      <div 
                        key={msg.id}
                        className={`message-bubble ${msg.senderType === 'user' ? 'sent' : 'received'}`}
                      >
                        {msg.senderType === 'model' && (
                          <div className="message-avatar">
                            <img 
                              src={selectedChat.model.avatar} 
                              alt={selectedChat.model.name}
                            />
                          </div>
                        )}
                        
                        <div className="bubble-content">
                          {msg.type === 'media' && msg.attachments && (
                            <div className="message-attachments">
                              {msg.attachments.map((file, index) => (
                                <div key={index} className="attachment-preview">
                                  {file.type.startsWith('image/') ? (
                                    <img src={URL.createObjectURL(file)} alt="attachment" />
                                  ) : (
                                    <div className="file-attachment">
                                      <span className="file-icon">📎</span>
                                      <span className="file-name">{file.name}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {msg.content && (
                            <div 
                              className="bubble-text"
                              dangerouslySetInnerHTML={{
                                __html: formatMessageContent(msg.content)
                              }}
                            />
                          )}
                          
                          <div className="bubble-time">
                            {formatTime(msg.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="message-bubble received typing">
                        <div className="message-avatar">
                          <img 
                            src={selectedChat.model.avatar} 
                            alt={selectedChat.model.name}
                          />
                        </div>
                        <div className="bubble-content">
                          <div className="typing-indicator">
                            <div className="typing-dots">
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Message input area */}
                <div className="message-composer">
                  {attachedFiles.length > 0 && (
                    <div className="attachment-preview">
                      {attachedFiles.map((file, index) => (
                        <div key={index} className="attachment-item">
                          {file.type.startsWith('image/') ? (
                            <img src={URL.createObjectURL(file)} alt="preview" />
                          ) : (
                            <div className="file-preview">
                              <span className="file-icon">📎</span>
                              <span className="file-name">{file.name}</span>
                            </div>
                          )}
                          <button 
                            className="remove-attachment-btn"
                            onClick={() => removeAttachment(index)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="input-container">
                    <div className="composer-actions">
                      <button 
                        className="composer-btn"
                        onClick={() => imageInputRef.current?.click()}
                        title="Attach image"
                      >
                        🖼️
                      </button>
                      <button 
                        className="composer-btn"
                        onClick={() => fileInputRef.current?.click()}
                        title="Attach file"
                      >
                        📎
                      </button>
                    </div>
                    
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="message-input"
                      rows="1"
                    />
                    
                    <button 
                      className={`send-btn ${(!message.trim() && attachedFiles.length === 0) ? 'disabled' : ''}`}
                      onClick={handleSendMessage}
                      disabled={!message.trim() && attachedFiles.length === 0}
                    >
                      <span>📤</span>
                    </button>
                  </div>
                  
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileAttach}
                    style={{ display: 'none' }}
                  />
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileAttach}
                    style={{ display: 'none' }}
                  />
                </div>
              </>
            ) : (
              <div className="empty-state">
                <div className="empty-content">
                  <div className="empty-icon">💬</div>
                  <h3 className="empty-title">Select a conversation</h3>
                  <p className="empty-description">Choose from your existing conversations or start a new one</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;