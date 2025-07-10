import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhoneVerification = ({ userId, onVerified }) => {
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/api/verify-phone', {
        user_id: userId,
        code: code
      });
      onVerified();
    } catch (error) {
      setError(error.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '450px', 
      margin: '4rem auto', 
      padding: '3rem', 
      background: 'rgba(255, 255, 255, 0.95)', 
      backdropFilter: 'blur(20px)',
      borderRadius: '24px', 
      boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      animation: 'fadeInUp 0.8s ease-out'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '2.5rem',
        fontSize: '2.5rem',
        fontWeight: '700',
        background: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundSize: '400% 400%',
        animation: 'rainbow 3s ease-in-out infinite'
      }}>Verify Phone</h2>
      
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
        Enter the 6-digit code sent to your phone
      </p>
      
      {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
      
      <form onSubmit={handleVerify}>
        <div style={{ marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength="6"
            style={{ 
              width: '100%', 
              padding: '1rem', 
              border: '2px solid rgba(102, 126, 234, 0.2)', 
              borderRadius: '12px',
              fontSize: '1.2rem',
              textAlign: 'center',
              letterSpacing: '0.5rem',
              transition: 'all 0.3s ease',
              background: 'rgba(255, 255, 255, 0.8)',
              outline: 'none'
            }}
            required
          />
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          {timeLeft > 0 ? (
            <span style={{ color: '#666' }}>Code expires in {timeLeft}s</span>
          ) : (
            <span style={{ color: '#e74c3c' }}>Code expired</span>
          )}
        </div>
        
        <button 
          type="submit" 
          disabled={loading || timeLeft === 0}
          style={{ 
            width: '100%', 
            padding: '1rem', 
            background: timeLeft === 0 ? '#95a5a6' : 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)', 
            color: 'white', 
            border: 'none', 
            borderRadius: '12px', 
            cursor: timeLeft === 0 ? 'not-allowed' : 'pointer',
            fontSize: '1.1rem',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: timeLeft === 0 ? 'none' : '0 4px 15px rgba(255, 107, 107, 0.6)'
          }}
        >
          {loading ? 'Verifying...' : 'Verify Phone'}
        </button>
      </form>
    </div>
  );
};

export default PhoneVerification;