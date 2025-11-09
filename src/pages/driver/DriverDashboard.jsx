/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import Modal from '../../components/shared/Modal';
import { rideAPI, bidAPI, driverAPI } from '../../services/api';

const DriverDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('requests');
  const [pendingBookings, setPendingBookings] = useState([]);
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [stats, setStats] = useState({
    totalRides: 142,
    pendingRequests: 5,
    confirmedToday: 3,
    rating: 4.7,
  });
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    loadBookings();
    loadStats();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await rideAPI.getAvailableBookings();
      if (response.success) {
        setPendingBookings(response.data.filter((b) => b.status === 'pending'));
        setConfirmedBookings(response.data.filter((b) => b.status === 'accepted'));
      }
    } catch {
      // Handle error
    }
  };

  const loadStats = async () => {
    try {
      const response = await driverAPI.getDriverStats(user?.user_id);
      if (response.success) {
        setStats(response.data);
      }
    } catch {
      // Handle error
    }
  };

  const handleAcceptBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to accept this booking?')) return;

    try {
      await rideAPI.acceptBooking(bookingId, user?.user_id);
      alert('Booking accepted successfully!');
      loadBookings();
    } catch {
      alert('Failed to accept booking');
    }
  };

  const handlePlaceBid = async (e) => {
    e.preventDefault();

    try {
      await bidAPI.placeBid(selectedBooking, user?.user_id, parseFloat(bidAmount));
      alert('Bid placed successfully!');
      setShowBidModal(false);
      setBidAmount('');
      setSelectedBooking(null);
    } catch {
      alert('Failed to place bid');
    }
  };

  const openBidModal = (bookingId) => {
    setSelectedBooking(bookingId);
    setShowBidModal(true);
  };

  const handleCompleteRide = async (bookingId) => {
    if (!window.confirm('Mark this ride as completed?')) return;

    try {
      // TODO: Call API to complete ride
      alert('Ride completed successfully!');
      loadBookings();
    } catch {
      alert('Failed to complete ride');
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1>Driver Dashboard</h1>
            <p>Manage booking requests and confirmed rides</p>
          </div>

          {/* Statistics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '1.5rem',
                borderRadius: 'var(--radius)',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <i className="fas fa-clipboard-list" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></i>
              <h3 style={{ margin: '0.5rem 0' }}>Pending Requests</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{stats.pendingRequests}</p>
            </div>
            <div
              style={{
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                padding: '1.5rem',
                borderRadius: 'var(--radius)',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <i className="fas fa-check-circle" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></i>
              <h3 style={{ margin: '0.5rem 0' }}>Confirmed Today</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{stats.confirmedToday}</p>
            </div>
            <div
              style={{
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                padding: '1.5rem',
                borderRadius: 'var(--radius)',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <i className="fas fa-history" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></i>
              <h3 style={{ margin: '0.5rem 0' }}>Total Completed</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{stats.totalRides}</p>
            </div>
            <div
              style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                padding: '1.5rem',
                borderRadius: 'var(--radius)',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <i className="fas fa-star" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></i>
              <h3 style={{ margin: '0.5rem 0' }}>Your Rating</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{stats.rating} ⭐</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'requests' ? 'active' : ''}`}
              onClick={() => setActiveTab('requests')}
            >
              <i className="fas fa-inbox"></i> New Requests
            </button>
            <button
              className={`tab ${activeTab === 'confirmed' ? 'active' : ''}`}
              onClick={() => setActiveTab('confirmed')}
            >
              <i className="fas fa-check-double"></i> Confirmed Bookings
            </button>
            <button
              className={`tab ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <i className="fas fa-history"></i> History
            </button>
          </div>

          {/* New Requests Tab */}
          {activeTab === 'requests' && (
            <div className="tab-content active">
              <div className="content-card">
                <h2>
                  <i className="fas fa-bell"></i> Pending Booking Requests
                </h2>
                <div className="ride-list">
                  {pendingBookings.length === 0 ? (
                    <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                      No pending requests
                    </p>
                  ) : (
                    pendingBookings.map((booking) => (
                      <div key={booking.booking_id} className="ride-card">
                        <div className="ride-header">
                          <div>
                            <strong>Booking {booking.booking_id}</strong>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                              Student: {booking.student_id}
                            </p>
                          </div>
                          <span className="status-badge pending">New</span>
                        </div>
                        <div className="ride-route">
                          <span>
                            <i className="fas fa-map-marker-alt"></i> {booking.pickup_location}
                          </span>
                          <i className="fas fa-arrow-right"></i>
                          <span>
                            <i className="fas fa-map-marker-alt"></i> {booking.dropoff_location}
                          </span>
                        </div>
                        <div className="ride-details">
                          <div className="ride-detail">
                            <i className="fas fa-calendar"></i>{' '}
                            {new Date(booking.required_time).toLocaleDateString()}
                          </div>
                          <div className="ride-detail">
                            <i className="fas fa-clock"></i>{' '}
                            {new Date(booking.required_time).toLocaleTimeString()}
                          </div>
                          <div className="ride-detail">
                            <i className="fas fa-rupee-sign"></i> Estimated: ₹{booking.fixed_fare || 'N/A'}
                          </div>
                        </div>
                        <div className="flex-between mt-2">
                          <button
                            className="btn btn-success"
                            onClick={() => handleAcceptBooking(booking.booking_id)}
                          >
                            <i className="fas fa-check"></i> Accept
                          </button>
                          <button
                            className="btn btn-warning"
                            onClick={() => openBidModal(booking.booking_id)}
                          >
                            <i className="fas fa-hand-holding-usd"></i> Place Bid
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Confirmed Bookings Tab */}
          {activeTab === 'confirmed' && (
            <div className="tab-content active">
              <div className="content-card">
                <h2>
                  <i className="fas fa-check-circle"></i> Your Confirmed Bookings
                </h2>
                <table>
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Student</th>
                      <th>Route</th>
                      <th>Date & Time</th>
                      <th>Fare</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {confirmedBookings.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                          No confirmed bookings
                        </td>
                      </tr>
                    ) : (
                      confirmedBookings.map((booking) => (
                        <tr key={booking.booking_id}>
                          <td>{booking.booking_id}</td>
                          <td>{booking.student_id}</td>
                          <td>
                            {booking.pickup_location} → {booking.dropoff_location}
                          </td>
                          <td>{new Date(booking.required_time).toLocaleString()}</td>
                          <td>₹{booking.fixed_fare}</td>
                          <td>
                            <button
                              className="btn btn-success"
                              style={{ padding: '0.3rem 0.8rem', fontSize: '0.85rem' }}
                              onClick={() => handleCompleteRide(booking.booking_id)}
                            >
                              Complete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="tab-content active">
              <div className="content-card">
                <h2>
                  <i className="fas fa-history"></i> Ride History
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>Your completed ride history will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bid Modal */}
      <Modal
        isOpen={showBidModal}
        onClose={() => {
          setShowBidModal(false);
          setSelectedBooking(null);
          setBidAmount('');
        }}
        title={<><i className="fas fa-hand-holding-usd"></i> Place Your Bid</>}
      >
        <form onSubmit={handlePlaceBid}>
          <div className="form-group">
            <label htmlFor="bidAmount">Your Proposed Fare (₹) *</label>
            <input
              type="number"
              id="bidAmount"
              placeholder="Enter your fare"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              required
            />
          </div>

          <div className="alert alert-info">
            <i className="fas fa-info-circle"></i>
            <span>The student will review all bids and choose the best option.</span>
          </div>

          <button type="submit" className="btn btn-primary">
            <i className="fas fa-check"></i> Submit Bid
          </button>
        </form>
      </Modal>

      <Footer />
    </>
  );
};

export default DriverDashboard;
