import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import Modal from '../../components/shared/Modal';
import { complaintAPI } from '../../services/api';

const StudentMess = () => {
  const { user } = useSelector((state) => state.auth);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [myComplaints, setMyComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  const [complaintForm, setComplaintForm] = useState({
    title: '',
    description: '',
    severity: 'medium',
    media: null,
  });

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const response = await complaintAPI.getMyComplaints(user?.user_id);
      if (response.success) {
        setMyComplaints(response.data.filter((c) => c.dept_id === 'MESS'));
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
        dept_id: 'MESS',
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
            <i className="fas fa-utensils"></i>
            <div>
              <h1>Mess Management</h1>
              <p>Timings, menus, and complaint management</p>
            </div>
          </div>

          {/* Mess Timings */}
          <div className="content-card">
            <h2>
              <i className="fas fa-clock"></i> Mess Timings
            </h2>
            <table>
              <thead>
                <tr>
                  <th>Meal</th>
                  <th>Weekdays</th>
                  <th>Weekends</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Breakfast</strong></td>
                  <td>7:30 AM - 9:30 AM</td>
                  <td>8:00 AM - 10:00 AM</td>
                </tr>
                <tr>
                  <td><strong>Lunch</strong></td>
                  <td>12:30 PM - 2:30 PM</td>
                  <td>12:30 PM - 2:30 PM</td>
                </tr>
                <tr>
                  <td><strong>Snacks</strong></td>
                  <td>5:00 PM - 6:00 PM</td>
                  <td>5:00 PM - 6:00 PM</td>
                </tr>
                <tr>
                  <td><strong>Dinner</strong></td>
                  <td>7:30 PM - 10:00 PM</td>
                  <td>7:30 PM - 10:00 PM</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Weekly Menu */}
          <div className="content-card">
            <h2>
              <i className="fas fa-calendar-week"></i> This Week&apos;s Menu
            </h2>
            <div className="alert alert-info">
              <i className="fas fa-file-pdf"></i>
              <span>
                View the complete menu: <a href="#">Download PDF</a>
              </span>
            </div>
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
        title={<><i className="fas fa-exclamation-circle"></i> Submit Mess Complaint</>}
      >
        <form onSubmit={handleSubmitComplaint}>
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
              placeholder="Detailed description of the issue"
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

export default StudentMess;
