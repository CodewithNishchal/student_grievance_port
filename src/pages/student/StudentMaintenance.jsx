import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import Modal from '../../components/shared/Modal';
import { complaintAPI } from '../../services/api';

const StudentMaintenance = () => {
  const { user } = useSelector((state) => state.auth);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [myComplaints, setMyComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  const [complaintForm, setComplaintForm] = useState({
    title: '',
    description: '',
    severity: 'medium',
    media: null,
    category: 'housekeeping',
  });

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const response = await complaintAPI.getMyComplaints(user?.user_id);
      if (response.success) {
        // Filter for MAINTENANCE, HOUSEKEEPING, or WATER dept_id
        setMyComplaints(response.data.filter((c) => 
          ['MAINTENANCE', 'HOUSEKEEPING', 'WATER'].includes(c.dept_id)
        ));
      }
    } catch {
      // Handle error
    }
  };

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const complaintData = {
        student_id: user?.user_id,
        title: complaintForm.title,
        description: complaintForm.description,
        severity: complaintForm.severity,
        dept_id: 'MAINTENANCE',
      };

      const response = await complaintAPI.createComplaint(complaintData);

      if (response.success) {
        alert(`Complaint submitted successfully! Complaint ID: ${response.data.complaint_id}`);
        setShowComplaintModal(false);
        loadComplaints();
        setComplaintForm({
          title: '',
          description: '',
          severity: 'medium',
          media: null,
          category: 'housekeeping',
        });
      }
    } catch {
      alert('Failed to submit complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      pending: 'pending',
      in_progress: 'in-progress',
      resolved: 'resolved',
    };
    return statusMap[status] || 'pending';
  };

  const getSeverityBadgeClass = (severity) => {
    const severityMap = {
      low: 'severity-low',
      medium: 'severity-medium',
      high: 'severity-high',
    };
    return severityMap[severity] || 'severity-medium';
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-content">
          <div className="page-header">
            <i className="fas fa-tools"></i>
            <div>
              <h1>Maintenance Services</h1>
              <p>Housekeeping, water supply, and facility maintenance</p>
            </div>
          </div>

          {/* Housekeeping Services */}
          <div className="content-card">
            <h2>
              <i className="fas fa-broom"></i> Housekeeping Services
            </h2>
            <table>
              <thead>
                <tr>
                  <th>Area</th>
                  <th>Frequency</th>
                  <th>Timings</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Hostel Rooms</strong></td>
                  <td>Daily</td>
                  <td>9:00 AM - 12:00 PM</td>
                </tr>
                <tr>
                  <td><strong>Corridors</strong></td>
                  <td>Twice Daily</td>
                  <td>8:00 AM & 6:00 PM</td>
                </tr>
                <tr>
                  <td><strong>Washrooms</strong></td>
                  <td>Three Times Daily</td>
                  <td>7:00 AM, 1:00 PM, 8:00 PM</td>
                </tr>
                <tr>
                  <td><strong>Common Areas</strong></td>
                  <td>Daily</td>
                  <td>10:00 AM - 4:00 PM</td>
                </tr>
                <tr>
                  <td><strong>Garbage Collection</strong></td>
                  <td>Twice Daily</td>
                  <td>9:00 AM & 7:00 PM</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Water Supply Schedule */}
          <div className="content-card">
            <h2>
              <i className="fas fa-tint"></i> Water Supply Timings
            </h2>
            <table>
              <thead>
                <tr>
                  <th>Area</th>
                  <th>Morning</th>
                  <th>Evening</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Hostel Blocks A-D</strong></td>
                  <td>5:00 AM - 9:00 AM</td>
                  <td>5:00 PM - 10:00 PM</td>
                  <td><span className="status-badge resolved">Active</span></td>
                </tr>
                <tr>
                  <td><strong>Hostel Blocks E-H</strong></td>
                  <td>5:30 AM - 9:30 AM</td>
                  <td>5:30 PM - 10:30 PM</td>
                  <td><span className="status-badge resolved">Active</span></td>
                </tr>
                <tr>
                  <td><strong>Hot Water (Winter)</strong></td>
                  <td>6:00 AM - 8:00 AM</td>
                  <td>6:00 PM - 8:00 PM</td>
                  <td><span className="status-badge resolved">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Facility Maintenance */}
          <div className="content-card">
            <h2>
              <i className="fas fa-wrench"></i> Facility Maintenance
            </h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div className="alert alert-info">
                <i className="fas fa-check-circle"></i>
                <span><strong>Electrical:</strong> Report any electrical issues immediately for safety</span>
              </div>
              <div className="alert alert-info">
                <i className="fas fa-check-circle"></i>
                <span><strong>Plumbing:</strong> Leaks, clogs, and water pressure issues</span>
              </div>
              <div className="alert alert-info">
                <i className="fas fa-check-circle"></i>
                <span><strong>Furniture:</strong> Broken beds, chairs, tables, and cupboards</span>
              </div>
              <div className="alert alert-info">
                <i className="fas fa-check-circle"></i>
                <span><strong>Doors & Windows:</strong> Locks, hinges, and glass repairs</span>
              </div>
            </div>
          </div>

          {/* Important Guidelines */}
          <div className="content-card">
            <h2>
              <i className="fas fa-exclamation-triangle"></i> Important Guidelines
            </h2>
            <ul style={{ lineHeight: '1.8', color: '#555' }}>
              <li>Keep your room accessible during cleaning hours</li>
              <li>Report all maintenance issues promptly</li>
              <li>Do not attempt DIY repairs on electrical or plumbing issues</li>
              <li>Keep valuable items secured during cleaning</li>
              <li>Cooperate with maintenance staff for efficient service</li>
              <li>Report leaking taps to conserve water</li>
            </ul>
          </div>

          {/* Submit Complaint */}
          <div className="content-card">
            <h2>
              <i className="fas fa-exclamation-circle"></i> Submit a Complaint
            </h2>
            <button className="btn btn-primary" onClick={() => setShowComplaintModal(true)}>
              <i className="fas fa-plus"></i> File New Complaint
            </button>
          </div>

          {/* My Complaints */}
          <div className="content-card">
            <h2>
              <i className="fas fa-list"></i> My Complaints
            </h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Complaint ID</th>
                    <th>Title</th>
                    <th>Severity</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myComplaints.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                        No complaints found
                      </td>
                    </tr>
                  ) : (
                    myComplaints.map((complaint) => (
                      <tr key={complaint.complaint_id}>
                        <td>{complaint.complaint_id}</td>
                        <td>{complaint.title}</td>
                        <td>
                          <span className={getSeverityBadgeClass(complaint.severity)}>
                            {complaint.severity}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${getStatusBadgeClass(complaint.status)}`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td>{new Date(complaint.created_at).toLocaleDateString()}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            style={{ padding: '0.3rem 0.8rem', fontSize: '0.85rem' }}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Complaint Modal */}
      <Modal
        isOpen={showComplaintModal}
        onClose={() => setShowComplaintModal(false)}
        title={<><i className="fas fa-exclamation-circle"></i> Submit Maintenance Complaint</>}
      >
        <form onSubmit={handleSubmitComplaint}>
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              value={complaintForm.category}
              onChange={(e) => setComplaintForm({ ...complaintForm, category: e.target.value })}
              required
            >
              <option value="housekeeping">Housekeeping</option>
              <option value="water">Water Supply</option>
              <option value="electrical">Electrical</option>
              <option value="plumbing">Plumbing</option>
              <option value="furniture">Furniture</option>
              <option value="doors_windows">Doors & Windows</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              placeholder="Brief description of the issue"
              value={complaintForm.title}
              onChange={(e) => setComplaintForm({ ...complaintForm, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              rows="4"
              placeholder="Detailed description (location, room number, specific issue)"
              value={complaintForm.description}
              onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="severity">Severity *</label>
            <select
              id="severity"
              value={complaintForm.severity}
              onChange={(e) => setComplaintForm({ ...complaintForm, severity: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="media">Attach Media (Optional)</label>
            <input
              type="file"
              id="media"
              accept="image/*,video/*"
              onChange={(e) => setComplaintForm({ ...complaintForm, media: e.target.files[0] })}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            <i className="fas fa-check"></i> {loading ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>
      </Modal>

      <Footer />
    </>
  );
};

export default StudentMaintenance;
