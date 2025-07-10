import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const PublicProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const [profileResponse, ratingsResponse] = await Promise.all([
        axios.get(`/api/users/${userId}`),
        axios.get(`/api/users/${userId}/ratings`)
      ]);
      setProfile(profileResponse.data);
      setRatings(ratingsResponse.data);
    } catch (error) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const getTransactionTypeColor = (type) => {
    switch (type) {
      case 'lend': return '#3498db';
      case 'give_away': return '#2ecc71';
      case 'exchange': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>{error}</div>;

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
        }}>{profile.username}'s Profile</h2>
      </div>
      
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(20px)',
        borderRadius: '24px', 
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Contact Information</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div>
            <strong>Username:</strong> {profile.username}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <strong>Phone:</strong> {profile.phone}
            <span style={{ fontSize: '1.2rem' }}>
              {profile.phone_verified ? '✅' : '❌'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <strong>Email:</strong> Verified
            <span style={{ fontSize: '1.2rem' }}>
              {profile.email_verified ? '✅' : '❌'}
            </span>
          </div>
          <div>
            <strong>Zalo ID:</strong> {profile.zalo_id || 'Not provided'}
          </div>
          <div>
            <strong>Address:</strong> {profile.address}
          </div>
          <div>
            <strong>Member since:</strong> {new Date(profile.created_at).toLocaleDateString()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <strong>Rating:</strong>
            <span style={{ color: '#ffd700', fontSize: '1.2rem' }}>
              {'★'.repeat(Math.floor(profile.average_rating))}
              {'☆'.repeat(5 - Math.floor(profile.average_rating))}
            </span>
            <span>({profile.average_rating}/5 from {profile.total_ratings} reviews)</span>
          </div>
        </div>
      </div>

      {/* Ratings Section */}
      {ratings.length > 0 && (
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(20px)',
          borderRadius: '24px', 
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Recent Reviews</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {ratings.slice(0, 5).map(rating => (
              <div key={rating.id} style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div>
                    <strong>{rating.rater_username}</strong>
                    <span style={{ color: '#ffd700', marginLeft: '0.5rem' }}>
                      {'★'.repeat(rating.rating)}{'☆'.repeat(5 - rating.rating)}
                    </span>
                  </div>
                  <small style={{ color: '#666' }}>{new Date(rating.created_at).toLocaleDateString()}</small>
                </div>
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Item: {rating.item_name}</p>
                {rating.comment && <p style={{ fontSize: '0.9rem' }}>{rating.comment}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 style={{ 
          marginBottom: '2rem', 
          fontSize: '2rem',
          textAlign: 'center',
          background: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundSize: '400% 400%',
          animation: 'rainbow 3s ease-in-out infinite'
        }}>Available Items ({profile.items.length})</h3>
        
        {profile.items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            No items available
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {profile.items.map(item => (
              <Link key={item.id} to={`/item/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  height: '420px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                }}
                >
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      style={{ width: '100%', height: '220px', objectFit: 'cover', flexShrink: 0 }}
                    />
                  )}
                  <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{item.name}</h4>
                      <p style={{ color: '#666', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                        {item.description?.substring(0, 100)}{item.description?.length > 100 ? '...' : ''}
                      </p>
                      {item.transaction_type === 'lend' && item.price_per_hour && (
                        <p style={{ color: '#2ecc71', fontWeight: 'bold', marginBottom: '1rem', fontSize: '0.9rem' }}>
                          ${item.price_per_hour}/hour
                        </p>
                      )}
                    </div>
                    <div>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <span style={{
                          backgroundColor: '#95a5a6',
                          color: 'white',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '12px',
                          fontSize: '0.7rem',
                          textTransform: 'uppercase',
                          marginRight: '0.5rem'
                        }}>
                          {item.category}
                        </span>
                        <span style={{
                          backgroundColor: getTransactionTypeColor(item.transaction_type),
                          color: 'white',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '12px',
                          fontSize: '0.7rem',
                          textTransform: 'capitalize'
                        }}>
                          {item.transaction_type.replace('_', ' ')}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#666' }}>
                        <span>
                          {item.transaction_type === 'lend' ? (
                            `Available: ${item.available_quantity}/${item.quantity}`
                          ) : (
                            `Qty: ${item.quantity}`
                          )}
                        </span>
                        <span>{new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicProfile;