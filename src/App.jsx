import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
//ek change
// Landing & Auth Pages
import Landing from './pages/Landing';
import StudentLogin from './pages/auth/StudentLogin';
import StudentRegister from './pages/auth/StudentRegister';
import AdminLogin from './pages/auth/AdminLogin';
import DriverLogin from './pages/auth/DriverLogin';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentMess from './pages/student/StudentMess';
import StudentTransport from './pages/student/StudentTransport';
import StudentCarpool from './pages/student/StudentCarpool';
import StudentMaintenance from './pages/student/StudentMaintenance';
import StudentNetwork from './pages/student/StudentNetwork';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminComplaintManagement from './pages/admin/AdminComplaintManagement';

// Driver Pages
import DriverDashboard from './pages/driver/DriverDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/driver/login" element={<DriverLogin />} />

        {/* Student Protected Routes - All 5 sections */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/mess"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentMess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/transport"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentTransport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/maintenance"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentMaintenance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/network"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentNetwork />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/carpool"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentCarpool />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected Routes - All except Carpool */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/:dept"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminComplaintManagement />
            </ProtectedRoute>
          }
        />

        {/* Driver Protected Routes - Only Carpool */}
        <Route
          path="/driver/dashboard"
          element={
            <ProtectedRoute allowedRoles={['driver']}>
              <DriverDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver/carpool"
          element={
            <ProtectedRoute allowedRoles={['driver']}>
              <DriverDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

