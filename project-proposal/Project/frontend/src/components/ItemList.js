import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchItems();
  }, []);
  
  // Real-time search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchItems(1);
    }, 300); // 300ms delay to avoid too many requests
    
    return () => clearTimeout(timeoutId);
  }, [search, category, transactionType]);
  
  const renderPagination = () => {
    if (!pagination.pages || pagination.pages <= 1) return null;
    
    const pages = [];
    const current = pagination.page;
    const total = pagination.pages;
    
    // Always show first page
    if (current > 3) {
      pages.push(1);
      if (current > 4) pages.push('...');
    }
    
    // Show pages around current
    for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
      pages.push(i);
    }
    
    // Always show last page
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
              onClick={() => fetchItems(page)}
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

  const fetchItems = async (page = 1) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: '30'
      });
      
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      if (transactionType) params.append('transaction_type', transactionType);
      
      const response = await axios.get(`/api/items?${params}`);
      setItems(response.data.items);
      setPagination(response.data.pagination);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = () => {
    setCurrentPage(1);
    fetchItems(1);
  };



  const getTransactionTypeColor = (type) => {
    switch (type) {
      case 'lend': return '#3498db';
      case 'give_away': return '#2ecc71';
      case 'exchange': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  if (loading) return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '50vh',
      flexDirection: 'column'
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '3px solid rgba(255,255,255,0.3)',
        borderTop: '3px solid #667eea',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '1rem'
      }}></div>
      <p style={{ color: 'white', fontSize: '1.2rem' }}>Loading vehicles...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem' }}>
        <h1 style={{ 
          fontSize: '3rem',
          fontWeight: '700',
          background: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundSize: '400% 400%',
          animation: 'rainbow 3s ease-in-out infinite'
        }}>Available Vehicles</h1>
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
              placeholder="Search by name, description, or username..."
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
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <p style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>No vehicles available yet.</p>
          <Link to="/create" style={{ 
            color: 'white',
            textDecoration: 'none',
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '25px',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s ease'
          }}>Be the first to post a vehicle!</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {items.map(item => (
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
                flexDirection: 'column',
                animation: 'fadeInUp 0.6s ease-out',
                animationFillMode: 'both'
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
                    <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem', lineHeight: '1.3' }}>{item.name}</h3>
                    <p style={{ 
                      color: '#666', 
                      marginBottom: '0.5rem', 
                      fontSize: '0.9rem', 
                      lineHeight: '1.4', 
                      height: '2.8em', 
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      textOverflow: 'ellipsis'
                    }}>
                      {item.description || 'No description available'}
                    </p>
                    {item.transaction_type === 'lend' && item.price_per_hour && (
                      <p style={{ color: '#2ecc71', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>
                      <span>
                        {item.transaction_type === 'lend' ? (
                          item.available_quantity === 0 ? (
                            <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>All {item.category}s got lent</span>
                          ) : (
                            `Available: ${item.available_quantity}/${item.quantity}`
                          )
                        ) : (
                          `Qty: ${item.quantity}`
                        )}
                      </span>
                      <span>by {item.username}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#666', wordWrap: 'break-word' }}>
                      📍 {item.address}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {renderPagination()}
    </div>
  );
};

export default ItemList;