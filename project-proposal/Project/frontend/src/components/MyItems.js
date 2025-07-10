import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RepostModal from './RepostModal';

const MyItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRepostModal, setShowRepostModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchMyItems();
  }, []);
  
  // Real-time search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchMyItems(1);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [search, category, transactionType]);

  const fetchMyItems = async (page = 1) => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: '30'
      });
      
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      if (transactionType) params.append('transaction_type', transactionType);
      
      const response = await axios.get(`/api/my-items?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setItems(response.data.items);
      setPagination(response.data.pagination);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching my items:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = () => {
    setCurrentPage(1);
    fetchMyItems(1);
  };
  
  const renderPagination = () => {
    if (!pagination.pages || pagination.pages <= 1) return null;
    
    const pages = [];
    const current = pagination.page;
    const total = pagination.pages;
    
    if (current > 3) {
      pages.push(1);
      if (current > 4) pages.push('...');
    }
    
    for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
      pages.push(i);
    }
    
    if (current < total - 2) {
      if (current < total - 3) pages.push('...');
      pages.push(total);
    }
    
    return (
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
        {pages.map((page, index) => (
          page === '...' ? (
            <span key={index} style={{ padding: '0.5rem' }}>...</span>
          ) : (
            <button
              key={page}
              onClick={() => fetchMyItems(page)}
              style={{
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                background: page === current ? '#667eea' : 'rgba(255, 255, 255, 0.8)',
                color: page === current ? 'white' : '#333',
                fontWeight: page === current ? 'bold' : 'normal'
              }}
            >
              {page}
            </button>
          )
        ))}
      </div>
    );
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
        }}>My Vehicles</h2>
      </div>
      
      {/* Search and Filters */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(20px)',
        borderRadius: '16px', 
        padding: '1.5rem', 
        marginBottom: '2rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Search</label>
            <input
              type="text"
              placeholder="Search your items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid rgba(102, 126, 234, 0.2)',
                borderRadius: '12px',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid rgba(102, 126, 234, 0.2)',
                borderRadius: '12px',
                fontSize: '1rem',
                outline: 'none'
              }}
            >
              <option value="">All Categories</option>
              <option value="car">Car</option>
              <option value="motorbike">Motorbike</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Type</label>
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid rgba(102, 126, 234, 0.2)',
                borderRadius: '12px',
                fontSize: '1rem',
                outline: 'none'
              }}
            >
              <option value="">All Types</option>
              <option value="lend">Lend</option>
              <option value="give_away">Give Away</option>
              <option value="exchange">Exchange</option>
            </select>
          </div>
        </div>
      </div>
      
      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>You haven't posted any items yet.</p>
          <Link to="/create" style={{ color: '#3498db' }}>Post your first item!</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {items.map(item => (
            <div key={item.id} style={{ position: 'relative' }}>
              <Link to={`/item/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{item.name}</h3>
                  <p style={{ color: '#666', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    {item.description?.substring(0, 100)}{item.description?.length > 100 ? '...' : ''}
                  </p>
                  {item.transaction_type === 'lend' && item.price_per_hour && (
                    <p style={{ color: '#2ecc71', fontWeight: 'bold', marginBottom: '1rem', fontSize: '0.9rem' }}>
                      ${item.price_per_hour}/hour
                    </p>
                  )}
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
                        item.available_quantity === 0 ? (
                          <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>All lent out</span>
                        ) : (
                          `Available: ${item.available_quantity}/${item.quantity}`
                        )
                      ) : item.status === 'completed' ? (
                        <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>Completed</span>
                      ) : (
                        `Qty: ${item.quantity}`
                      )}
                    </span>
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              </Link>
              <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '0.5rem' }}>
                <Link to={`/edit-item/${item.id}`} style={{
                  backgroundColor: '#f39c12',
                  color: 'white',
                  padding: '0.5rem',
                  borderRadius: '50%',
                  textDecoration: 'none',
                  fontSize: '0.8rem',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}>
                  Edit
                </Link>
                {item.transaction_type === 'lend' && item.available_quantity === 0 && (
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setShowRepostModal(true);
                    }}
                    style={{
                      backgroundColor: '#2ecc71',
                      color: 'white',
                      padding: '0.5rem',
                      borderRadius: '50%',
                      border: 'none',
                      fontSize: '0.8rem',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showRepostModal && selectedItem && (
        <RepostModal
          item={selectedItem}
          onClose={() => {
            setShowRepostModal(false);
            setSelectedItem(null);
          }}
          onSuccess={() => {
            fetchMyItems(); // Refresh items
            alert('Item reposted successfully!');
          }}
        />
      )}
      
      {/* Pagination */}
      {renderPagination()}
    </div>
  );
};

export default MyItems;