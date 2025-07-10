import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Set API base URL
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
import Login from './components/Login';
import Register from './components/Register';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import CreateItem from './components/CreateItem';
import Requests from './components/Requests';
import MyItems from './components/MyItems';
import EditItem from './components/EditItem';
import Profile from './components/Profile';
import PublicProfile from './components/PublicProfile';
import Messages from './components/Messages';
import Appointments from './components/Appointments';
import ForgotPassword from './components/ForgotPassword';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <div style={{ minHeight: '100vh', position: 'relative' }}>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -2
          }}
        >
          <source src="/3combine.mp4" type="video/mp4" />
        </video>
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(102, 126, 234, 0.2)',
            zIndex: -1,
            pointerEvents: 'none'
          }}
        />
        <Navbar user={user} logout={logout} />
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/login" element={!user ? <Login onLogin={login} /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register onLogin={login} /> : <Navigate to="/" />} />
            <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to="/" />} />
            <Route path="/create" element={user ? <CreateItem /> : <Navigate to="/login" />} />
            <Route path="/requests" element={user ? <Requests /> : <Navigate to="/login" />} />
            <Route path="/my-items" element={user ? <MyItems /> : <Navigate to="/login" />} />
            <Route path="/edit-item/:id" element={user ? <EditItem /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/user/:userId" element={<PublicProfile />} />
            <Route path="/messages" element={user ? <Messages /> : <Navigate to="/login" />} />
            <Route path="/appointments" element={user ? <Appointments /> : <Navigate to="/login" />} />
            <Route path="/item/:id" element={<ItemDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

// For production, set REACT_APP_API_URL to your backend URL