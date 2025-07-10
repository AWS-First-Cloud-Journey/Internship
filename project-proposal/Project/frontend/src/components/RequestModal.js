import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestModal = ({ item, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    hours: '',
    quantity_requested: 1,
    exchange_item_id: '',
    message: ''
  });
  const [userItems, setUserItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item.transaction_type === 'exchange') {
      fetchUserItems();
    }
  }, [item.transaction_type]);

  const fetchUserItems = async () => {
    try {
      const response = await axios.get('/api/items');
      const currentUser = JSON.parse(localStorage.getItem('user'));
      setUserItems(response.data.filter(i => i.username === currentUser.username));
    } catch (error) {
      console.error('Error fetching user items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/items/${item.id}/request`, {
        item_id: item.id,
        ...formData,
        quantity_requested: parseInt(formData.quantity_requested) || 1
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      // Trigger navbar count update
      window.dispatchEvent(new Event('requestCountUpdate'));
      onSuccess();
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        <h3 style={{ marginBottom: '1.5rem' }}>
          Request: {item.name}
        </h3>

        <form onSubmit={handleSubmit}>
          {item.transaction_type === 'lend' && (
            <>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Quantity needed *
                </label>
                <input
                  type="number"
                  min="1"
                  max={item.available_quantity}
                  value={formData.quantity_requested}
                  onChange={(e) => {
                    let value = parseInt(e.target.value) || 1;
                    if (value > item.available_quantity) value = item.available_quantity;
                    if (value < 1) value = 1;
                    setFormData({...formData, quantity_requested: value});
                  }}
                  onBlur={(e) => {
                    let value = parseInt(e.target.value) || 1;
                    if (value > item.available_quantity) value = item.available_quantity;
                    if (value < 1) value = 1;
                    setFormData({...formData, quantity_requested: value});
                  }}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                  required
                />
                <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  Available: {item.available_quantity || 0}
                </p>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Hours needed *
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.hours}
                  onChange={(e) => setFormData({...formData, hours: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                  required
                />
                {item.price_per_hour && (
                  <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    Total cost: ${(formData.hours * formData.quantity_requested * item.price_per_hour).toFixed(2)}
                  </p>
                )}
              </div>
            </>
          )}

          {item.transaction_type === 'exchange' && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Your item to exchange *
              </label>
              <select
                value={formData.exchange_item_id}
                onChange={(e) => setFormData({...formData, exchange_item_id: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                required
              >
                <option value="">Select an item</option>
                {userItems.map(userItem => (
                  <option key={userItem.id} value={userItem.id}>
                    {userItem.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Message (optional)
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows="3"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
              placeholder="Add a message to the owner..."
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor: '#95a5a6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor: loading ? '#95a5a6' : '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Sending...' : 'Send Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestModal;