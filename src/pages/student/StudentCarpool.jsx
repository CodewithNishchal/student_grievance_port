/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import Modal from '../../components/shared/Modal';

const StudentCarpool = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('available');
  const [showPostRideModal, setShowPostRideModal] = useState(false);
  const [filterSource, setFilterSource] = useState('');
  const [filterDest, setFilterDest] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const [rideForm, setRideForm] = useState({
    source: '',
    destination: '',
    date: '',
    time: '',
    seats: '',
    farePerPerson: '',
    recurring: false,
    frequency: 'daily',
  });

  const availableRides = [
    {
      id: 'R001',
      driver: { name: 'Amit Kumar', rating: 4.8, rides: 23 },
      source: 'Campus',
      destination: 'Railway Station',
      date: 'Nov 7, 2025',
      time: '8:00 AM',
      seats: 2,
      fare: 50,
      type: 'One-time',
    },
    {
      id: 'R002',
      driver: { name: 'Priya Sharma', rating: 4.9, rides: 35 },
      source: 'City Center',
      destination: 'Campus',
      date: 'Nov 6-10, 2025',
      time: '6:00 PM',
      seats: 3,
      fare: 40,
      type: 'Daily (Weekdays)',
    },
  ];

  const myRides = [
    {
      id: 'R003',
      type: 'posted',
      source: 'Campus',
      destination: 'Mall',
      date: 'Nov 8, 2025',
      time: '5:00 PM',
      seats: 3,
      fare: 35,
      joined: 2,
    },
  ];

  const handlePostRide = (e) => {
    e.preventDefault();
    // TODO: Call API to post ride
    alert('Ride posted successfully!');
    setShowPostRideModal(false);
  };

  const handleJoinRide = (rideName) => {
    // TODO: Call API to join ride
    alert(`Joined ride with ${rideName}!`);
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-content">
          <div className="page-header">
            <i className="fas fa-car-side"></i>
            <div>
              <h1>Carpool - Share Rides, Save Money</h1>
              <p>Eco-friendly and cost-effective travel with fellow students</p>
            </div>
          </div>

          <div className="alert alert-info">
            <i className="fas fa-leaf"></i>
            <span>
              <strong>Go Green!</strong> Carpooling reduces carbon emissions and saves up to 50% on
              travel costs.
            </span>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'available' ? 'active' : ''}`}
              onClick={() => setActiveTab('available')}
            >
              <i className="fas fa-list"></i> Available Rides
            </button>
            <button
              className={`tab ${activeTab === 'post' ? 'active' : ''}`}
              onClick={() => setActiveTab('post')}
            >
              <i className="fas fa-plus-circle"></i> Post a Ride
            </button>
            <button
              className={`tab ${activeTab === 'myrides' ? 'active' : ''}`}
              onClick={() => setActiveTab('myrides')}
            >
              <i className="fas fa-user"></i> My Rides
            </button>
          </div>

          {/* Available Rides Tab */}
          {activeTab === 'available' && (
            <div className="tab-content active">
              <div className="content-card">
                <h2>
                  <i className="fas fa-search"></i> Find Available Rides
                </h2>

                <div className="filter-bar">
                  <input
                    type="text"
                    placeholder="Source location"
                    value={filterSource}
                    onChange={(e) => setFilterSource(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Destination"
                    value={filterDest}
                    onChange={(e) => setFilterDest(e.target.value)}
                  />
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                  />
                  <button className="btn btn-primary" onClick={() => alert('Filtering rides...')}>
                    <i className="fas fa-filter"></i> Filter
                  </button>
                </div>

                <div className="ride-list">
                  {availableRides.map((ride) => (
                    <div key={ride.id} className="ride-card">
                      <div className="ride-header">
                        <div className="ride-route">
                          <span>{ride.source}</span>
                          <i className="fas fa-arrow-right"></i>
                          <span>{ride.destination}</span>
                        </div>
                        <div className="profile-mini">
                          <div
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              background: 'var(--primary-color)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontWeight: 'bold',
                            }}
                          >
                            {ride.driver.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </div>
                          <div>
                            <strong>{ride.driver.name}</strong>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                              ⭐ {ride.driver.rating} ({ride.driver.rides} rides)
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ride-details">
                        <div className="ride-detail">
                          <i className="fas fa-calendar"></i> {ride.date}
                        </div>
                        <div className="ride-detail">
                          <i className="fas fa-clock"></i> {ride.time}
                        </div>
                        <div className="ride-detail">
                          <i className="fas fa-chair"></i> {ride.seats} seats available
                        </div>
                        <div className="ride-detail">
                          <i className="fas fa-rupee-sign"></i> ₹{ride.fare} per person
                        </div>
                        <div className="ride-detail">
                          <i className="fas fa-redo"></i> {ride.type}
                        </div>
                      </div>
                      <button
                        className="btn btn-success mt-2"
                        onClick={() => handleJoinRide(ride.driver.name)}
                      >
                        <i className="fas fa-check-circle"></i> Join Ride
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Post a Ride Tab */}
          {activeTab === 'post' && (
            <div className="tab-content active">
              <div className="content-card">
                <h2>
                  <i className="fas fa-plus-circle"></i> Post Your Ride
                </h2>
                <button className="btn btn-primary" onClick={() => setShowPostRideModal(true)}>
                  <i className="fas fa-plus"></i> Create New Ride
                </button>

                <div className="alert alert-info mt-2">
                  <i className="fas fa-info-circle"></i>
                  Share your travel plans and split costs with fellow students!
                </div>
              </div>
            </div>
          )}

          {/* My Rides Tab */}
          {activeTab === 'myrides' && (
            <div className="tab-content active">
              <div className="content-card">
                <h2>
                  <i className="fas fa-user"></i> My Rides
                </h2>

                <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>Rides I&apos;ve Posted</h3>
                <div className="ride-list">
                  {myRides
                    .filter((r) => r.type === 'posted')
                    .map((ride) => (
                      <div key={ride.id} className="ride-card">
                        <div className="ride-header">
                          <div className="ride-route">
                            <span>{ride.source}</span>
                            <i className="fas fa-arrow-right"></i>
                            <span>{ride.destination}</span>
                          </div>
                          <span className="status-badge in-progress">Active</span>
                        </div>
                        <div className="ride-details">
                          <div className="ride-detail">
                            <i className="fas fa-calendar"></i> {ride.date}
                          </div>
                          <div className="ride-detail">
                            <i className="fas fa-clock"></i> {ride.time}
                          </div>
                          <div className="ride-detail">
                            <i className="fas fa-chair"></i> {ride.seats} seats, {ride.joined} joined
                          </div>
                          <div className="ride-detail">
                            <i className="fas fa-rupee-sign"></i> ₹{ride.fare} per person
                          </div>
                        </div>
                        <div className="flex-between mt-2">
                          <button className="btn btn-primary">View Participants</button>
                          <button className="btn btn-danger">Cancel Ride</button>
                        </div>
                      </div>
                    ))}
                </div>

                <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Rides I&apos;ve Joined</h3>
                <p style={{ color: 'var(--text-secondary)' }}>No joined rides yet</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Post Ride Modal */}
      <Modal
        isOpen={showPostRideModal}
        onClose={() => setShowPostRideModal(false)}
        title={<><i className="fas fa-plus-circle"></i> Post a Ride</>}
      >
        <form onSubmit={handlePostRide}>
          <div className="form-group">
            <label htmlFor="source">Source Location *</label>
            <input
              type="text"
              id="source"
              placeholder="Enter source"
              value={rideForm.source}
              onChange={(e) => setRideForm({ ...rideForm, source: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="destination">Destination *</label>
            <input
              type="text"
              id="destination"
              placeholder="Enter destination"
              value={rideForm.destination}
              onChange={(e) => setRideForm({ ...rideForm, destination: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              value={rideForm.date}
              onChange={(e) => setRideForm({ ...rideForm, date: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time *</label>
            <input
              type="time"
              id="time"
              value={rideForm.time}
              onChange={(e) => setRideForm({ ...rideForm, time: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="seats">Available Seats *</label>
            <input
              type="number"
              id="seats"
              min="1"
              max="6"
              placeholder="Number of seats"
              value={rideForm.seats}
              onChange={(e) => setRideForm({ ...rideForm, seats: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="farePerPerson">Fare Per Person (₹) *</label>
            <input
              type="number"
              id="farePerPerson"
              placeholder="₹"
              value={rideForm.farePerPerson}
              onChange={(e) => setRideForm({ ...rideForm, farePerPerson: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={rideForm.recurring}
                onChange={(e) => setRideForm({ ...rideForm, recurring: e.target.checked })}
              />
              Recurring Ride
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            <i className="fas fa-check"></i> Post Ride
          </button>
        </form>
      </Modal>

      <Footer />
    </>
  );
};

export default StudentCarpool;
