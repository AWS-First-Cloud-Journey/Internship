import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [conversationAppointments, setConversationAppointments] = useState([]);
  const [searchUsers, setSearchUsers] = useState('');
  const [sending, setSending] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchConversations();
    
    // Auto-refresh conversations list every 2 seconds
    const conversationInterval = setInterval(() => {
      fetchConversations();
    }, 2000);
    
    return () => clearInterval(conversationInterval);
  }, []);
  
  // Real-time user search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchConversations();
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchUsers]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
      markMessagesAsRead(selectedConversation.id);
      fetchConversationAppointments(selectedConversation.id);
      
      // Much faster refresh for messages (every 1 second)
      const messageInterval = setInterval(() => {
        fetchMessages(selectedConversation.id);
        markMessagesAsRead(selectedConversation.id);
      }, 1000);
      
      // Slower refresh for appointments (every 5 seconds)
      const appointmentInterval = setInterval(() => {
        fetchConversationAppointments(selectedConversation.id);
      }, 5000);
      
      return () => {
        clearInterval(messageInterval);
        clearInterval(appointmentInterval);
      };
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Auto-scroll when new messages arrive
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages.length]);

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = searchUsers ? `?search=${encodeURIComponent(searchUsers)}` : '';
      const response = await axios.get(`/api/conversations${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setConversations(response.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleUserSearch = () => {
    fetchConversations();
  };

  const fetchMessages = async (conversationId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/conversations/${conversationId}/messages`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  
  const markMessagesAsRead = async (conversationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/conversations/${conversationId}/mark-read`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      // Trigger navbar count update
      window.dispatchEvent(new Event('messageCountUpdate'));
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };
  
  const fetchConversationAppointments = async (conversationId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/conversations/${conversationId}/appointments`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setConversationAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };
  
  const createAppointment = async (appointmentData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/conversations/${selectedConversation.id}/appointments`, appointmentData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchConversationAppointments(selectedConversation.id);
      fetchMessages(selectedConversation.id);
      setShowAppointmentModal(false);
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    const imagePromises = imageFiles.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            file: file,
            preview: e.target.result,
            id: Math.random().toString(36).substr(2, 9)
          });
        };
        reader.readAsDataURL(file);
      });
    });
    
    Promise.all(imagePromises).then(images => {
      setSelectedImages(prev => [...prev, ...images]);
    });
    
    // Clear file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  
  const removeImage = (imageId) => {
    setSelectedImages(prev => prev.filter(img => img.id !== imageId));
  };
  
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && selectedImages.length === 0) return;
    if (sending) return;

    setSending(true);
    try {
      const token = localStorage.getItem('token');
      
      // Send text message if there's text
      if (newMessage.trim()) {
        const textFormData = new FormData();
        textFormData.append('message_type', 'text');
        textFormData.append('content', newMessage);
        if (replyTo) {
          textFormData.append('reply_to_id', replyTo.id);
        }
        
        await axios.post(`/api/conversations/${selectedConversation.id}/messages`, textFormData, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      
      // Send each image separately
      for (const image of selectedImages) {
        const imageFormData = new FormData();
        imageFormData.append('file', image.file);
        imageFormData.append('message_type', 'image');
        imageFormData.append('content', '');
        
        await axios.post(`/api/conversations/${selectedConversation.id}/messages`, imageFormData, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      // Clear inputs immediately
      setNewMessage('');
      setReplyTo(null);
      setSelectedImages([]);

      // Immediately fetch new messages
      fetchMessages(selectedConversation.id);
      window.dispatchEvent(new Event('messageCountUpdate'));
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const editMessage = async (messageId, newContent) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/messages/${messageId}`, 
        { content: newContent },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      fetchMessages(selectedConversation.id);
    } catch (error) {
      console.error('Error editing message:', error);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/messages/${messageId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchMessages(selectedConversation.id);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const token = localStorage.getItem('token');
          await axios.post(`/api/conversations/${selectedConversation.id}/messages`, {
            message_type: 'location',
            location_lat: position.coords.latitude,
            location_lng: position.coords.longitude,
            location_name: 'Current Location'
          }, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          fetchMessages(selectedConversation.id);
        } catch (error) {
          console.error('Error sharing location:', error);
        }
      });
    }
  };

  const MessageBubble = ({ message, isOwn }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(message.content);
    const currentUser = JSON.parse(localStorage.getItem('user'));

    // System messages (appointment notifications)
    if (message.message_type === 'system') {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1rem'
        }}>
          <div style={{
            background: '#f0f8ff',
            color: '#666',
            padding: '0.5rem 1rem',
            borderRadius: '12px',
            fontSize: '0.9rem',
            border: '1px solid #e0e8f0'
          }}>
            {message.content}
            <div style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '0.25rem', textAlign: 'center' }}>
              {new Date(message.created_at).toLocaleTimeString()}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{
        display: 'flex',
        justifyContent: isOwn ? 'flex-end' : 'flex-start',
        marginBottom: '1rem'
      }}>
        <div style={{
          maxWidth: '70%',
          background: isOwn ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f1f1f1',
          color: isOwn ? 'white' : 'black',
          padding: '0.75rem 1rem',
          borderRadius: '18px',
          position: 'relative'
        }}>
          {message.reply_to && (
            <div style={{
              background: 'rgba(0,0,0,0.1)',
              padding: '0.5rem',
              borderRadius: '8px',
              marginBottom: '0.5rem',
              fontSize: '0.8rem',
              borderLeft: '3px solid rgba(255,255,255,0.5)'
            }}>
              <strong>{message.reply_to.sender_username}:</strong>
              <div>{message.reply_to.content}</div>
            </div>
          )}

          {message.message_type === 'image' && message.file_url && (
            <img 
              src={`/api/uploads/${message.file_url}`}
              alt="Shared image"
              style={{ maxWidth: '200px', borderRadius: '8px', marginBottom: '0.5rem' }}
            />
          )}

          {message.message_type === 'location' && message.location && (
            <div style={{ marginBottom: '0.5rem' }}>
              📍 <strong>{message.location.name}</strong>
              <br />
              <small>Lat: {message.location.lat}, Lng: {message.location.lng}</small>
            </div>
          )}

          {isEditing ? (
            <div>
              <input
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                style={{ width: '100%', padding: '0.25rem', marginBottom: '0.5rem' }}
              />
              <div>
                <button onClick={() => {
                  editMessage(message.id, editContent);
                  setIsEditing(false);
                }} style={{ marginRight: '0.5rem', fontSize: '0.7rem' }}>Save</button>
                <button onClick={() => setIsEditing(false)} style={{ fontSize: '0.7rem' }}>Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              {message.content}
              {message.is_edited && <small style={{ opacity: 0.7 }}> (edited)</small>}
            </div>
          )}

          <div style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '0.25rem' }}>
            {new Date(message.created_at).toLocaleTimeString()}
          </div>

          {isOwn && message.sender_id === currentUser.id && !message.is_deleted && (
            <div style={{ position: 'absolute', top: '-10px', right: '0', display: 'none' }} 
                 className="message-actions">
              <button onClick={() => setReplyTo(message)} style={{ fontSize: '0.6rem', margin: '0 2px' }}>Reply</button>
              <button onClick={() => setIsEditing(true)} style={{ fontSize: '0.6rem', margin: '0 2px' }}>Edit</button>
              <button onClick={() => deleteMessage(message.id)} style={{ fontSize: '0.6rem', margin: '0 2px' }}>Delete</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem' }}>
        <Link to="/" style={{
          color: 'white',
          textDecoration: 'none',
          padding: '0.75rem 1.5rem',
          background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
          borderRadius: '12px',
          fontWeight: '500',
          transition: 'all 0.3s ease',
          marginRight: '2rem',
          boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)'
        }}>← Home</Link>
        <h2 style={{ 
          fontSize: '2.5rem',
          fontWeight: '700',
          background: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundSize: '400% 400%',
          animation: 'rainbow 3s ease-in-out infinite'
        }}>Messages</h2>
      </div>

      <div style={{ display: 'flex', height: '600px', background: 'rgba(255, 255, 255, 0.95)', borderRadius: '16px', overflow: 'hidden' }}>
        {/* Conversations List */}
        <div style={{ width: '300px', borderRight: '1px solid #eee', overflow: 'auto' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
            <h3 style={{ marginBottom: '1rem' }}>Conversations</h3>
            <input
              type="text"
              placeholder="Search users..."
              value={searchUsers}
              onChange={(e) => setSearchUsers(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}
            />
          </div>
          {conversations.map(conv => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              style={{
                padding: '1rem',
                borderBottom: '1px solid #f0f0f0',
                cursor: 'pointer',
                background: selectedConversation?.id === conv.id ? '#f0f8ff' : 'transparent',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: conv.unread_count > 0 ? 'bold' : 'normal' }}>
                  {conv.other_user.username}
                </div>
                {conv.unread_count > 0 && (
                  <span style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: 'bold'
                  }}>
                    {conv.unread_count}
                  </span>
                )}
              </div>
              {conv.item && <div style={{ fontSize: '0.8rem', color: '#666' }}>About: {conv.item.name}</div>}
              {conv.last_message && (
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: conv.unread_count > 0 ? '#333' : '#999', 
                  marginTop: '0.25rem',
                  fontWeight: conv.unread_count > 0 ? '500' : 'normal'
                }}>
                  {conv.last_message.content?.substring(0, 50)}...
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Messages Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {selectedConversation ? (
            <>
              {/* Header */}
              <div style={{ padding: '1rem', borderBottom: '1px solid #eee', background: '#f8f9fa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h4>{selectedConversation.other_user.username}</h4>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#2ecc71',
                        animation: 'pulse 2s infinite'
                      }}></div>
                    </div>
                    {selectedConversation.item && (
                      <small>Discussing: {selectedConversation.item.name}</small>
                    )}
                  </div>
                  <button
                    onClick={() => setShowAppointmentModal(true)}
                    style={{
                      background: '#f39c12',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    📅 Schedule
                  </button>
                </div>
                
                {/* Appointments Header */}
                {conversationAppointments.length > 0 && (
                  <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#e8f4fd', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Appointments:</div>
                    {conversationAppointments.map(apt => (
                      <div 
                        key={apt.id}
                        onClick={() => window.location.href = '/appointments'}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.5rem',
                          background: 'white',
                          borderRadius: '6px',
                          marginBottom: '0.25rem',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        <span>📅 {new Date(apt.appointment_time).toLocaleDateString()} at {new Date(apt.appointment_time).toLocaleTimeString()}</span>
                        <span style={{
                          background: apt.status === 'confirmed' ? '#2ecc71' : apt.status === 'pending' ? '#f39c12' : '#e74c3c',
                          color: 'white',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '12px',
                          fontSize: '0.7rem'
                        }}>
                          {apt.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Messages */}
              <div style={{ flex: 1, padding: '1rem', overflow: 'auto' }}>
                {messages.map(message => (
                  <MessageBubble 
                    key={message.id} 
                    message={message} 
                    isOwn={message.sender_id === JSON.parse(localStorage.getItem('user')).id}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Image Preview */}
              {selectedImages.length > 0 && (
                <div style={{ padding: '1rem', borderTop: '1px solid #eee', background: '#f8f9fa' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                    {selectedImages.map(image => (
                      <div key={image.id} style={{ position: 'relative', display: 'inline-block' }}>
                        <img
                          src={image.preview}
                          alt="Preview"
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            border: '2px solid #e0e0e0'
                          }}
                        />
                        <button
                          onClick={() => removeImage(image.id)}
                          style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: '#e74c3c',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <small style={{ color: '#666' }}>{selectedImages.length} image(s) selected</small>
                </div>
              )}
              
              {/* Reply Preview */}
              {replyTo && (
                <div style={{ padding: '0.5rem 1rem', background: '#f0f8ff', borderTop: '1px solid #eee' }}>
                  <small>Replying to: {replyTo.content}</small>
                  <button onClick={() => setReplyTo(null)} style={{ float: 'right', background: 'none', border: 'none' }}>✕</button>
                </div>
              )}

              {/* Input Area */}
              <form onSubmit={sendMessage} style={{ padding: '1rem', borderTop: '1px solid #eee', display: 'flex', gap: '0.5rem' }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  style={{ display: 'none' }}
                />
                <button type="button" onClick={() => fileInputRef.current?.click()} style={{ padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>📷</button>
                <button type="button" onClick={shareLocation} style={{ padding: '0.5rem' }}>📍</button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  style={{ flex: 1, padding: '0.75rem', border: '1px solid #ddd', borderRadius: '20px' }}
                />
                <button 
                  type="submit" 
                  disabled={sending || (!newMessage.trim() && selectedImages.length === 0)}
                  style={{ 
                    padding: '0.5rem 1rem', 
                    background: sending ? '#95a5a6' : (!newMessage.trim() && selectedImages.length === 0) ? '#ddd' : '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '20px',
                    cursor: (sending || (!newMessage.trim() && selectedImages.length === 0)) ? 'not-allowed' : 'pointer',
                    opacity: (sending || (!newMessage.trim() && selectedImages.length === 0)) ? 0.7 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  {sending ? 'Sending...' : (
                    <>
                      Send
                      {selectedImages.length > 0 && (
                        <span style={{
                          background: 'rgba(255,255,255,0.3)',
                          borderRadius: '10px',
                          padding: '0.1rem 0.4rem',
                          fontSize: '0.8rem'
                        }}>
                          +{selectedImages.length}
                        </span>
                      )}
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .message-actions {
          display: none;
        }
        div:hover .message-actions {
          display: block;
        }
        @keyframes pulse {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      
      {/* Appointment Modal */}
      {showAppointmentModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h3 style={{ marginBottom: '1rem' }}>Schedule Appointment</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              createAppointment({
                appointment_time: formData.get('appointment_time'),
                location: formData.get('location'),
                notes: formData.get('notes')
              });
            }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Date & Time:</label>
                <input
                  type="datetime-local"
                  name="appointment_time"
                  min={new Date().toISOString().slice(0, 16)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Location:</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Meeting location"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Notes:</label>
                <textarea
                  name="notes"
                  placeholder="Additional notes..."
                  rows="3"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setShowAppointmentModal(false)}
                  style={{ flex: 1, padding: '0.75rem', background: '#95a5a6', color: 'white', border: 'none', borderRadius: '8px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '0.75rem', background: '#f39c12', color: 'white', border: 'none', borderRadius: '8px' }}
                >
                  Create Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;