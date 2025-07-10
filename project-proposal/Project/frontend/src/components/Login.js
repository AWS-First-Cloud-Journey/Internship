import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', formData);
      onLogin(response.data.access_token, response.data.user);
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>Welcome Back</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={{ 
              width: '100%', 
              padding: '1rem', 
              border: '2px solid rgba(102, 126, 234, 0.2)', 
              borderRadius: '12px',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              background: 'rgba(255, 255, 255, 0.8)',
              outline: 'none'
            }}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem', position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            style={{ 
              width: '100%', 
              padding: '1rem', 
              paddingRight: '3rem',
              border: '2px solid rgba(102, 126, 234, 0.2)', 
              borderRadius: '12px',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              background: 'rgba(255, 255, 255, 0.8)',
              outline: 'none'
            }}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <button type="submit" style={{ 
          width: '100%', 
          padding: '1rem', 
          background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)', 
          color: 'white', 
          border: 'none', 
          borderRadius: '12px', 
          cursor: 'pointer',
          fontSize: '1.1rem',
          fontWeight: '600',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(255, 107, 107, 0.6)'
        }}>
          Login
        </button>
      </form>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
        <p><Link to="/forgot-password" style={{ color: '#e74c3c' }}>Forgot Password?</Link></p>
      </div>
    </div>
  );
};

export default Login;