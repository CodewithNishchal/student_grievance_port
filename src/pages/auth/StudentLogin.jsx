import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { authAPI } from '../../services/api';

const StudentLogin = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.loginStudent(rollNumber, password);
      
      if (response.success) {
        dispatch(login(response.data));
        navigate('/student/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.',err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <Link to="/" className="back-link">
          <i className="fas fa-arrow-left"></i> Back to Home
        </Link>

        <div className="auth-header">
          <div className="logo-circle">
            IIIT<span>N</span>
          </div>
          <h2>Student Login</h2>
          <p>Access your amenities dashboard</p>
        </div>

        <form id="studentLoginForm" onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="rollNumber">
              <i className="fas fa-id-card"></i> Roll Number
            </label>
            <input
              type="text"
              id="rollNumber"
              placeholder="Enter your roll number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <i className="fas fa-lock"></i> Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            <i className="fas fa-sign-in-alt"></i> {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="auth-footer">
            Don&apos;t have an account? <Link to="/student/register">Register here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
