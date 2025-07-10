import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    transaction_type: 'lend',
    price_per_hour: ''
  });
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [itemLoading, setItemLoading] = useState(true);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await axios.get(`/api/items/${id}`);
      const item = response.data;
      setFormData({
        name: item.name,
        description: item.description || '',
        transaction_type: item.transaction_type,
        price_per_hour: item.price_per_hour || ''
      });
      setCurrentImage(item.image_url);
      setExistingImages(item.additional_images || []);
    } catch (error) {
      setError('Item not found or unauthorized');
    } finally {
      setItemLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('transaction_type', formData.transaction_type);
    if (formData.price_per_hour) {
      data.append('price_per_hour', formData.price_per_hour);
    }
    if (image) {
      data.append('image', image);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/items/${id}`, data, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      navigate('/my-items');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update item');
    } finally {
      setLoading(false);
    }
  };

  if (itemLoading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Edit Item</h2>
      
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Item Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="4"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
              placeholder="Describe your item..."
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Transaction Type *</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {[
                { value: 'lend', label: 'Lend' },
                { value: 'give_away', label: 'Give Away' },
                { value: 'exchange', label: 'Exchange' }
              ].map(option => (
                <label key={option.value} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="transaction_type"
                    value={option.value}
                    checked={formData.transaction_type === option.value}
                    onChange={(e) => setFormData({...formData, transaction_type: e.target.value})}
                    style={{ marginRight: '0.5rem' }}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {formData.transaction_type === 'lend' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Price per Hour ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price_per_hour}
                onChange={(e) => setFormData({...formData, price_per_hour: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                placeholder="Enter hourly rate"
              />
            </div>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Item Photo</label>
            {currentImage && !image && (
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Current image:</p>
                <img
                  src={currentImage}
                  alt="Current"
                  style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px' }}
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            {image && (
              <div style={{ marginTop: '1rem' }}>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>New image:</p>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px' }}
                />
              </div>
            )}
          </div>
          
          {existingImages.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Additional Images</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.5rem' }}>
                {existingImages.map((imgUrl, index) => (
                  <div key={index} style={{ position: 'relative' }}>
                    <img
                      src={imgUrl}
                      alt={`Additional ${index + 1}`}
                      style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        if (window.confirm('Delete this image?')) {
                          try {
                            const token = localStorage.getItem('token');
                            await axios.delete(`/api/items/${id}/images/${index}`, {
                              headers: { 'Authorization': `Bearer ${token}` }
                            });
                            setExistingImages(prev => prev.filter((_, i) => i !== index));
                            alert('Image deleted!');
                          } catch (error) {
                            alert('Error deleting image');
                          }
                        }
                      }}
                      style={{
                        position: 'absolute',
                        top: '2px',
                        right: '2px',
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => navigate('/my-items')}
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor: '#95a5a6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem'
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
                backgroundColor: loading ? '#95a5a6' : '#2ecc71',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '1rem'
              }}
            >
              {loading ? 'Updating...' : 'Update Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItem;