import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ user, logout }) => {
  const [requestCount, setRequestCount] = useState(0);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchRequestCount();
      fetchUnreadMessageCount();
      
      // Set up auto-refresh every 10 seconds
      const interval = setInterval(() => {
        fetchRequestCount();
        fetchUnreadMessageCount();
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [user]);

  // Listen for count updates
  useEffect(() => {
    const handleRequestUpdate = () => {
      if (user) {
        fetchRequestCount();
        fetchUnreadMessageCount();
      }
    };
    
    window.addEventListener('requestCountUpdate', handleRequestUpdate);
    window.addEventListener('messageCountUpdate', handleRequestUpdate);
    return () => {
      window.removeEventListener('requestCountUpdate', handleRequestUpdate);
      window.removeEventListener('messageCountUpdate', handleRequestUpdate);
    };
  }, [user]);

  const fetchRequestCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/requests/count', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setRequestCount(response.data.pending_received);
    } catch (error) {
      console.error('Error fetching request count:', error);
    }
  };
  
  const fetchUnreadMessageCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/messages/count', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUnreadMessageCount(response.data.unread_count);
    } catch (error) {
      console.error('Error fetching unread message count:', error);
    }
  };
  return (
    <nav style={{
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(15px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '1rem 2rem',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      transition: 'all 0.3s ease'
    }}>
      <Link to="/" style={{ 
        color: 'white', 
        textDecoration: 'none', 
        fontSize: '1.8rem', 
        fontWeight: '800',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
      }}>
        Item Exchange
      </Link>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ 
              color: 'white',
              fontWeight: '500',
              opacity: '0.9'
            }}>Welcome, {user.username}!</span>
            <Link to="/" style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              fontWeight: '500',
              opacity: '0.9',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.9'}>Home</Link>
            <Link to="/requests" style={{ 
              color: 'white', 
              textDecoration: 'none', 
              position: 'relative', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              opacity: '0.9'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.9'}>
              Requests
              {requestCount > 0 && (
                <>
                  <span style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {requestCount}
                  </span>
                  <span style={{ color: '#e74c3c', fontSize: '1.2rem', fontWeight: 'bold' }}>!</span>
                </>
              )}
            </Link>
            <Link to="/my-items" style={{ 
              color: 'white', 
              textDecoration: 'none',
              fontWeight: '500',
              opacity: '0.9',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.9'}>
              My Items
            </Link>
            <Link to="/messages" style={{ 
              color: 'white', 
              textDecoration: 'none', 
              position: 'relative', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              opacity: '0.9'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.9'}>
              Messages
              {unreadMessageCount > 0 && (
                <>
                  <span style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {unreadMessageCount}
                  </span>
                  <span style={{ color: '#e74c3c', fontSize: '1.2rem', fontWeight: 'bold' }}>!</span>
                </>
              )}
            </Link>
            <Link to="/appointments" style={{ 
              color: 'white', 
              textDecoration: 'none',
              fontWeight: '500',
              opacity: '0.9',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.9'}>
              Appointments
            </Link>
            <Link to="/profile" style={{ 
              color: 'white', 
              textDecoration: 'none',
              fontWeight: '500',
              opacity: '0.9',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.9'}>
              Profile
            </Link>
            <Link to="/create" style={{ 
              color: 'white', 
              textDecoration: 'none', 
              padding: '0.75rem 1.5rem', 
              background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
              borderRadius: '25px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(255, 107, 107, 0.6)'
            }}>
              Post Item
            </Link>
            <button onClick={logout} style={{ padding: '0.5rem 1rem', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ 
              color: 'white', 
              textDecoration: 'none',
              fontWeight: '500',
              opacity: '0.9',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.9'}>Login</Link>
            <Link to="/register" style={{ 
              color: 'white', 
              textDecoration: 'none',
              fontWeight: '500',
              opacity: '0.9',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.9'}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;