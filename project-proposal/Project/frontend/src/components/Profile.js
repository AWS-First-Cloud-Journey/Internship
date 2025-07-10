import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    phone: '',
    zalo_id: '',
    address: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [verificationTimer, setVerificationTimer] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setProfile(response.data);
    } catch (error) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const updateData = { ...profile };
      
      await axios.put('/api/profile', updateData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      // Update localStorage user data
      const currentUser = JSON.parse(localStorage.getItem('user'));
      localStorage.setItem('user', JSON.stringify({
        ...currentUser,
        username: profile.username,
        email: profile.email
      }));
      
      // Refresh profile data
      fetchProfile();
      
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };
  
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/change-password', {
        old_password: oldPassword,
        new_password: newPassword
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      setSuccess('Password changed successfully!');
      setShowChangePassword(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to change password');
    }
  };
  
  const sendEmailVerification = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/send-email-verification', {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setEmailVerificationCode(response.data.verification_code);
      setVerificationTimer(60);
      
      const timer = setInterval(() => {
        setVerificationTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      setSuccess('Verification code sent to your email!');
    } catch (error) {
      setError('Failed to send verification code');
    }
  };
  
  const verifyEmail = async (code) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/verify-email', { code }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setProfile(prev => ({ ...prev, email_verified: true }));
      setShowEmailVerification(false);
      setSuccess('Email verified successfully!');
    } catch (error) {
      setError(error.response?.data?.message || 'Verification failed');
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
        }}>My Profile</h2>
      </div>
      
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: '1rem', textAlign: 'center' }}>{success}</div>}
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Username</label>
          {isEditing ? (
            <input
              type="text"
              value={profile.username}
              onChange={(e) => setProfile({...profile, username: e.target.value})}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          ) : (
            <p style={{ padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '4px', margin: 0 }}>
              {profile.username}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {isEditing ? (
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                style={{ flex: 1, padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            ) : (
              <p style={{ padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '4px', margin: 0, color: '#666', flex: 1 }}>
                {profile.email}
              </p>
            )}
            {profile.email_verified ? (
              <span style={{ color: '#2ecc71', fontSize: '1.5rem' }}>✓</span>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#e74c3c', fontSize: '1.5rem' }}>✗</span>
                <button
                  onClick={() => setShowEmailVerification(true)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Verify
                </button>
              </div>
            )}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Phone</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {isEditing ? (
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                style={{ flex: 1, padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            ) : (
              <p style={{ padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '4px', margin: 0, flex: 1 }}>
                {profile.phone || 'Not provided'}
              </p>
            )}
            {profile.phone_verified ? (
              <span style={{ color: '#2ecc71', fontSize: '1.5rem' }}>✓</span>
            ) : (
              <span style={{ color: '#e74c3c', fontSize: '1.5rem' }}>✗</span>
            )}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Zalo ID</label>
          {isEditing ? (
            <input
              type="text"
              value={profile.zalo_id}
              onChange={(e) => setProfile({...profile, zalo_id: e.target.value})}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          ) : (
            <p style={{ padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '4px', margin: 0 }}>
              {profile.zalo_id || 'Not provided'}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Address</label>
          {isEditing ? (
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({...profile, address: e.target.value})}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          ) : (
            <p style={{ padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '4px', margin: 0 }}>
              {profile.address}
            </p>
          )}
        </div>
        
        {/* Change Password Section */}
        <div style={{ marginBottom: '1.5rem' }}>
          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            style={{
              background: '#3498db',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            {showChangePassword ? 'Cancel' : 'Change Password'}
          </button>
        </div>
        
        {showChangePassword && (
          <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Current Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem', position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  paddingRight: '3rem',
                  border: '1px solid #ddd', 
                  borderRadius: '4px' 
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '2.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                required
              />
            </div>
            <button
              onClick={handleChangePassword}
              style={{
                background: '#2ecc71',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Update Password
            </button>
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem' }}>
          {isEditing ? (
            <>
              <button
                onClick={() => {
                  setIsEditing(false);
                  fetchProfile(); // Reset changes
                }}
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
                onClick={handleSave}
                disabled={saving}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: saving ? '#95a5a6' : '#2ecc71',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: saving ? 'not-allowed' : 'pointer'
                }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
      
      {showEmailVerification && (
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
            borderRadius: '12px',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3 style={{ marginBottom: '1rem' }}>Verify Email</h3>
            <p style={{ marginBottom: '1rem', color: '#666' }}>Enter the 6-digit code:</p>
            <input
              type="text"
              placeholder="Enter code"
              maxLength="6"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginBottom: '1rem',
                textAlign: 'center',
                fontSize: '1.2rem'
              }}
              onChange={(e) => {
                if (e.target.value.length === 6) {
                  verifyEmail(e.target.value);
                }
              }}
            />
            {verificationTimer > 0 && (
              <p style={{ textAlign: 'center', color: '#666', marginBottom: '1rem' }}>
                Code expires in {verificationTimer}s
              </p>
            )}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setShowEmailVerification(false)}
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
                onClick={sendEmailVerification}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Send Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;