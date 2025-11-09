import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useState } from 'react';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const getDashboardLink = () => {
    if (user?.role === 'student') return '/student/dashboard';
    if (user?.role === 'admin') return '/admin/dashboard';
    if (user?.role === 'driver') return '/driver/dashboard';
    return '/';
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <div className="logo-circle">
          IIIT<span>N</span>
        </div>
        <h2>IIITN Amenities {user?.role && `- ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}`}</h2>
      </div>

      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <i className="fas fa-bars"></i>
      </div>

      <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`} id="navLinks">
        <li>
          <Link to={getDashboardLink()}>
            <i className="fas fa-home"></i> Dashboard
          </Link>
        </li>
        {user?.role === 'student' && (
          <li>
            <Link to="/student/carpool">
              <i className="fas fa-car-side"></i> Carpool
            </Link>
          </li>
        )}
        <li>
          <Link to="#" onClick={(e) => e.preventDefault()}>
            <i className="fas fa-question-circle"></i> Help
          </Link>
        </li>
      </ul>

      <div className="nav-user">
        <span id="userName">{user?.name || 'User'}</span>
        <button className="btn-logout" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
