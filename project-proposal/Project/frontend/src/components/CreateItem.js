import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const CreateItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'car',
    transaction_type: 'lend',
    price_per_hour: '',
    quantity: 1
  });
  const [image, setImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('transaction_type', formData.transaction_type);
    data.append('quantity', formData.quantity);
    if (formData.price_per_hour) {
      data.append('price_per_hour', formData.price_per_hour);
    }
    if (image) {
      data.append('image', image);
    }
    additionalImages.forEach(img => {
      data.append('additional_images', img);
    });

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/items', data, {
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      });
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create item');
    } finally {
      setLoading(false);
    }
  };

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
        }}>Post New Vehicle</h2>
      </div>
      
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
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Category *</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {[
                { value: 'car', label: 'Car' },
                { value: 'motorbike', label: 'Motorbike' }
              ].map(option => (
                <label key={option.value} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="category"
                    value={option.value}
                    checked={formData.category === option.value}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    style={{ marginRight: '0.5rem' }}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Quantity *</label>
            <input
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
              required
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
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Additional Images (up to 10)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setAdditionalImages(Array.from(e.target.files).slice(0, 10))}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            {additionalImages.length > 0 && (
              <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.5rem' }}>
                {additionalImages.map((img, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt={`Preview ${index + 1}`}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                ))}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Item Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            {image && (
              <div style={{ marginTop: '1rem' }}>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px' }}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: loading ? '#95a5a6' : '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem'
            }}
          >
            {loading ? 'Creating...' : 'Post Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateItem;