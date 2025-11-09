import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-header">
        <div className="logo-section">
          <div className="logo-circle" style={{ width: '100px', height: '100px', fontSize: '1.5rem' }}>
            IIIT<span>N</span>
          </div>
          <h1>IIIT Nagpur</h1>
          <p className="tagline">Campus Amenities Management System</p>
        </div>
      </div>

      <div className="role-selector">
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Select Your Role</h2>
        <div className="role-cards">
          <Link to="/student/login" className="role-card">
            <i className="fas fa-user-graduate"></i>
            <h3>Student</h3>
            <p>Access amenities and submit complaints</p>
          </Link>

          <Link to="/driver/login" className="role-card">
            <i className="fas fa-car"></i>
            <h3>Driver</h3>
            <p>Manage ride bookings and requests</p>
          </Link>

          <Link to="/admin/login" className="role-card">
            <i className="fas fa-user-shield"></i>
            <h3>Admin</h3>
            <p>Manage complaints and services</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
