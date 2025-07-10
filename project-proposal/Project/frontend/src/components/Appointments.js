import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
    // Check for reminders every minute
    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/appointments', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkReminders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/appointments/reminders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      response.data.forEach(reminder => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (reminder.requester_id === currentUser.id || reminder.owner_id === currentUser.id) {
          new Notification(`Appointment Reminder`, {
            body: `Your appointment for "${reminder.item_name}" is in 30 minutes at ${reminder.location}`,
            icon: '/favicon.ico'
          });
        }
      });
    } catch (error) {
      console.error('Error checking reminders:', error);
    }
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/appointments/${appointmentId}/status`, 
        { status },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };
  
  const deleteAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/appointments/${appointmentId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchAppointments();
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    }
  };
  
  const updateAppointment = async (appointmentId, data) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/appointments/${appointmentId}`, data, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchAppointments();
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f39c12';
      case 'confirmed': return '#2ecc71';
      case 'cancelled': return '#e74c3c';
      case 'completed': return '#95a5a6';
      default: return '#95a5a6';
    }
  };

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;

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
        }}>My Appointments</h2>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {appointments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
            No appointments scheduled
          </div>
        ) : (
          appointments.map(appointment => (
            <div key={appointment.id} style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '1.5rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'center'
            }}>
              {/* Item Image */}
              {appointment.item.image_url && (
                <img
                  src={appointment.item.image_url}
                  alt={appointment.item.name}
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                />
              )}

              {/* Appointment Details */}
              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: '0.5rem' }}>{appointment.item.name}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                  <div><strong>Date:</strong> {new Date(appointment.appointment_time).toLocaleDateString()}</div>
                  <div><strong>Time:</strong> {new Date(appointment.appointment_time).toLocaleTimeString()}</div>
                  <div><strong>Location:</strong> {appointment.location}</div>
                  <div><strong>With:</strong> {appointment.is_owner ? appointment.requester.username : appointment.owner.username}</div>
                </div>
                {appointment.notes && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                    <strong>Notes:</strong> {appointment.notes}
                  </div>
                )}
              </div>

              {/* Status & Actions */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  background: getStatusColor(appointment.status),
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  textTransform: 'capitalize',
                  marginBottom: '1rem'
                }}>
                  {appointment.status}
                </div>

                {appointment.is_owner && appointment.status === 'pending' && (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                      style={{
                        background: '#2ecc71',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                      style={{
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {appointment.status === 'confirmed' && (
                  <button
                    onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                    style={{
                      background: '#95a5a6',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >
                    Mark Complete
                  </button>
                )}

                {/* Edit/Delete buttons */}
                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      setSelectedAppointment(appointment);
                      setShowEditModal(true);
                    }}
                    style={{
                      background: '#3498db',
                      color: 'white',
                      border: 'none',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.7rem'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAppointment(appointment.id)}
                    style={{
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.7rem'
                    }}
                  >
                    Delete
                  </button>
                </div>
                
                {/* Show location on map if coordinates available */}
                {appointment.location_coords && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <a
                      href={`https://maps.google.com/?q=${appointment.location_coords.lat},${appointment.location_coords.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#3498db',
                        textDecoration: 'none',
                        fontSize: '0.8rem'
                      }}
                    >
                      📍 View on Map
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Edit Appointment Modal */}
      {showEditModal && selectedAppointment && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h3 style={{ marginBottom: '1rem' }}>Edit Appointment</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              updateAppointment(selectedAppointment.id, {
                appointment_time: formData.get('appointment_time'),
                location: formData.get('location'),
                notes: formData.get('notes')
              });
            }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Date & Time:</label>
                <input
                  type="datetime-local"
                  name="appointment_time"
                  defaultValue={new Date(selectedAppointment.appointment_time).toISOString().slice(0, 16)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Location:</label>
                <input
                  type="text"
                  name="location"
                  defaultValue={selectedAppointment.location}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Notes:</label>
                <textarea
                  name="notes"
                  defaultValue={selectedAppointment.notes}
                  rows="3"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  style={{ flex: 1, padding: '0.75rem', background: '#95a5a6', color: 'white', border: 'none', borderRadius: '8px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '0.75rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '8px' }}
                >
                  Update Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;