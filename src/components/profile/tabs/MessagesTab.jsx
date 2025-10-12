import React, { useState } from 'react';

const MessagesTab = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageText, setMessageText] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Alexander Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80',
      lastMessage: 'Hi! Interested in collaboration for a photo shoot.',
      timestamp: '2 hours ago',
      unread: true,
      isSubscriber: true
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c9ef2fe8?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80',
      lastMessage: 'Great portfolio! Would like to discuss terms.',
      timestamp: '1 day ago',
      unread: false,
      isSubscriber: true
    },
    {
      id: 3,
      name: 'John Wilson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80',
      lastMessage: 'Thank you for the premium content!',
      timestamp: '3 days ago',
      unread: false,
      isSubscriber: false
    }
  ];

  const messages = {
    1: [
      {
        id: 1,
        sender: 'Alexander Smith',
        content: 'Hi! I saw your portfolio and I\'m really impressed.',
        timestamp: '2:30 PM',
        isOwn: false
      },
      {
        id: 2,
        sender: 'You',
        content: 'Thank you! I appreciate the kind words.',
        timestamp: '2:45 PM',
        isOwn: true
      },
      {
        id: 3,
        sender: 'Alexander Smith',
        content: 'I\'m interested in collaboration for a photo shoot. Would you be available next week?',
        timestamp: '3:00 PM',
        isOwn: false
      }
    ],
    2: [
      {
        id: 1,
        sender: 'Maria Rodriguez',
        content: 'Great portfolio! Would like to discuss terms for a project.',
        timestamp: 'Yesterday 4:20 PM',
        isOwn: false
      },
      {
        id: 2,
        sender: 'You',
        content: 'I\'d be happy to discuss! What kind of project are you thinking about?',
        timestamp: 'Yesterday 4:35 PM',
        isOwn: true
      }
    ],
    3: [
      {
        id: 1,
        sender: 'John Wilson',
        content: 'Thank you for the premium content! It\'s amazing.',
        timestamp: '3 days ago',
        isOwn: false
      }
    ]
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      alert(`Message sent: "${messageText}" (demo)`);
      setMessageText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);
  const chatMessages = messages[selectedChat] || [];

  return (
    <div className="messages-tab">
      <div className="tab-header">
        <h2>Messages</h2>
        <p>Chat with your followers and subscribers</p>
      </div>

      <div className="messages-container">
        <div className="conversations-sidebar">
          <div className="conversations-header">
            <h3>Conversations</h3>
            <button className="new-message-btn">+ New</button>
          </div>

          <div className="message-filters">
            <button className="filter-btn active">All</button>
            <button className="filter-btn">Unread</button>
            <button className="filter-btn">Subscribers</button>
          </div>

          <div className="conversations-list">
            {conversations.map(conversation => (
              <div
                key={conversation.id}
                className={`conversation-item ${selectedChat === conversation.id ? 'active' : ''} ${conversation.unread ? 'unread' : ''}`}
                onClick={() => setSelectedChat(conversation.id)}
              >
                <div className="conversation-avatar">
                  <img src={conversation.avatar} alt={conversation.name} />
                  {conversation.isSubscriber && (
                    <div className="subscriber-indicator">💎</div>
                  )}
                </div>
                <div className="conversation-info">
                  <div className="conversation-name">{conversation.name}</div>
                  <div className="conversation-preview">{conversation.lastMessage}</div>
                </div>
                <div className="conversation-meta">
                  <div className="conversation-time">{conversation.timestamp}</div>
                  {conversation.unread && <div className="unread-indicator"></div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-area">
          {selectedConversation ? (
            <>
              <div className="chat-header">
                <div className="chat-user-info">
                  <img src={selectedConversation.avatar} alt={selectedConversation.name} />
                  <div>
                    <h4>{selectedConversation.name}</h4>
                    {selectedConversation.isSubscriber && (
                      <span className="subscriber-badge">Premium Subscriber</span>
                    )}
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="action-btn secondary">📞 Call</button>
                  <button className="action-btn secondary">🎥 Video</button>
                  <button className="action-btn secondary">⚙️ Settings</button>
                </div>
              </div>

              <div className="messages-area">
                {chatMessages.map(message => (
                  <div
                    key={message.id}
                    className={`message ${message.isOwn ? 'own' : 'other'}`}
                  >
                    <div className="message-content">
                      <div className="message-text">{message.content}</div>
                      <div className="message-timestamp">{message.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="message-composer">
                <div className="composer-tools">
                  <button className="tool-btn">📎</button>
                  <button className="tool-btn">📷</button>
                  <button className="tool-btn">😊</button>
                </div>
                <div className="composer-input">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    rows="2"
                  />
                  <button 
                    className="send-btn"
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">
              <div className="no-chat-icon">💬</div>
              <h3>Select a conversation</h3>
              <p>Choose a conversation from the sidebar to start chatting</p>
            </div>
          )}
        </div>
      </div>

      <div className="messaging-stats">
        <h3>Messaging Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{conversations.length}</div>
            <div className="stat-label">Total Conversations</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{conversations.filter(c => c.unread).length}</div>
            <div className="stat-label">Unread Messages</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{conversations.filter(c => c.isSubscriber).length}</div>
            <div className="stat-label">Subscriber Chats</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">98%</div>
            <div className="stat-label">Response Rate</div>
          </div>
        </div>
      </div>

      <div className="messaging-tools">
        <h3>Messaging Tools</h3>
        <div className="tools-grid">
          <div className="tool-card">
            <span className="tool-icon">🤖</span>
            <h4>Auto Responses</h4>
            <p>Set up automatic responses for common questions</p>
            <button className="tool-btn">Setup Auto Responses</button>
          </div>
          <div className="tool-card">
            <span className="tool-icon">📋</span>
            <h4>Message Templates</h4>
            <p>Create templates for frequently sent messages</p>
            <button className="tool-btn">Create Templates</button>
          </div>
          <div className="tool-card">
            <span className="tool-icon">🔔</span>
            <h4>Notification Settings</h4>
            <p>Customize your message notification preferences</p>
            <button className="tool-btn">Manage Notifications</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesTab;