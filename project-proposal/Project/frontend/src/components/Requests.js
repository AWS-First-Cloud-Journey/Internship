import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Requests = () => {
  const [requests, setRequests] = useState({ received: [], sent: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('received');
  const [editingRequest, setEditingRequest] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchRequests();
    
    // Set up auto-refresh every 5 seconds
    const interval = setInterval(() => {
      fetchRequests();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchRequests = async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/requests', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
      if (showRefreshing) setRefreshing(false);
    }
  };

  const respondToRequest = async (requestId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/requests/${requestId}/respond`, { status }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchRequests(); // Refresh
      // Trigger navbar count update
      window.dispatchEvent(new Event('requestCountUpdate'));
      alert(`Request ${status}!`);
    } catch (error) {
      alert('Error responding to request');
    }
  };

  const editRequest = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/requests/${requestId}`, editForm, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setEditingRequest(null);
      setEditForm({});
      fetchRequests();
      // Trigger navbar count update
      window.dispatchEvent(new Event('requestCountUpdate'));
      alert('Request updated successfully!');
    } catch (error) {
      alert('Error updating request');
    }
  };

  const cancelRequest = async (requestId) => {
    if (window.confirm('Are you sure you want to cancel this request?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/requests/${requestId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchRequests();
        // Trigger navbar count update
        window.dispatchEvent(new Event('requestCountUpdate'));
        alert('Request cancelled successfully!');
      } catch (error) {
        alert('Error cancelling request');
      }
    }
  };

  const startEdit = (request) => {
    setEditingRequest(request.id);
    setEditForm({
      hours: request.hours || '',
      quantity_requested: request.quantity_requested || 1,
      message: request.message || ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return '#2ecc71';
      case 'rejected': return '#e74c3c';
      default: return '#f39c12';
    }
  };

  const getRequestTitle = (item_name, transaction_type) => {
    switch (transaction_type) {
      case 'lend': return `Borrow Request: ${item_name}`;
      case 'give_away': return `Give Away Request: ${item_name}`;
      case 'exchange': return `Exchange Request: ${item_name}`;
      default: return `Request: ${item_name}`;
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
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
        }}>My Requests</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#666' }}>Auto-refreshing every 5s</span>
          <button
            onClick={() => fetchRequests(true)}
            disabled={refreshing}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: refreshing ? '#95a5a6' : '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: refreshing ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem'
            }}
          >
            {refreshing ? 'Refreshing...' : 'Refresh Now'}
          </button>
        </div>
      </div>
      
      <div style={{ display: 'flex', marginBottom: '2rem', borderBottom: '1px solid #ddd' }}>
        {['received', 'sent'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '1rem',
              border: 'none',
              backgroundColor: activeTab === tab ? '#3498db' : 'transparent',
              color: activeTab === tab ? 'white' : '#666',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {tab} ({requests[tab].length})
          </button>
        ))}
      </div>

      <div>
        {requests[activeTab].length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>No {activeTab} requests</p>
        ) : (
          requests[activeTab].map(request => (
            <div key={request.id} style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              marginBottom: '1rem',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h4 style={{ marginBottom: '0.5rem' }}>
                    {getRequestTitle(request.item_name, request.transaction_type)}
                  </h4>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>
                    {activeTab === 'received' ? `From: ${request.requester_name}` : `To: ${request.owner_name}`}
                  </p>
                </div>
                <span style={{
                  backgroundColor: getStatusColor(request.status),
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  textTransform: 'capitalize'
                }}>
                  {request.status}
                </span>
              </div>

              {request.quantity_requested && (
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong>Quantity:</strong> {request.quantity_requested}
                </p>
              )}
              
              {request.hours && (
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong>Duration:</strong> {request.hours} hours
                </p>
              )}

              {request.exchange_item_name && (
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong>Offering:</strong> {request.exchange_item_name}
                </p>
              )}

              {request.message && (
                <p style={{ marginBottom: '1rem', fontStyle: 'italic', color: '#666' }}>
                  "{request.message}"
                </p>
              )}

              <p style={{ color: '#999', fontSize: '0.8rem', marginBottom: '1rem' }}>
                {new Date(request.created_at).toLocaleDateString()}
              </p>

              {editingRequest === request.id ? (
                <div>
                  {request.quantity_requested && (
                    <div style={{ marginBottom: '1rem' }}>
                      <label>Quantity:</label>
                      <input
                        type="number"
                        min="1"
                        value={editForm.quantity_requested}
                        onChange={(e) => setEditForm({...editForm, quantity_requested: e.target.value})}
                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                    </div>
                  )}
                  {request.hours && (
                    <div style={{ marginBottom: '1rem' }}>
                      <label>Hours:</label>
                      <input
                        type="number"
                        min="1"
                        value={editForm.hours}
                        onChange={(e) => setEditForm({...editForm, hours: e.target.value})}
                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                    </div>
                  )}
                  <div style={{ marginBottom: '1rem' }}>
                    <label>Message:</label>
                    <textarea
                      value={editForm.message}
                      onChange={(e) => setEditForm({...editForm, message: e.target.value})}
                      style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                      rows="3"
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      onClick={() => editRequest(request.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#2ecc71',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingRequest(null)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#95a5a6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {activeTab === 'received' && request.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button
                        onClick={() => respondToRequest(request.id, 'accepted')}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#2ecc71',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => respondToRequest(request.id, 'rejected')}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#e74c3c',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  
                  {activeTab === 'sent' && request.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button
                        onClick={() => startEdit(request)}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#3498db',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => cancelRequest(request.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#e74c3c',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Requests;