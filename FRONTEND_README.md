# IIIT Nagpur - Campus Amenities Management System

A comprehensive React-based web application for managing campus amenities including mess, transport, network, housekeeping, water supply, and carpool services. This system supports three user roles: Students, Drivers, and Admins.

## 🚀 Features

### For Students
- **Dashboard**: Overview of all campus amenities
- **Mess Management**: View timings, menus, and submit complaints
- **Transport**: 
  - Check bus schedules
  - Book cabs with one-time or regular bookings
  - View auto driver contacts
  - Track booking status
- **Carpool**: 
  - Post rides
  - Join available rides
  - Share costs with fellow students
- **Network, Housekeeping, Water**: Submit and track complaints
- **Complaint Tracking**: View status of all submitted complaints

### For Drivers
- **Booking Requests**: View and accept pending ride bookings
- **Bidding System**: Place competitive bids on ride bookings
- **Ride Management**: Track confirmed bookings and completed rides
- **Statistics Dashboard**: View total rides, ratings, and performance metrics

### For Admins
- **Complaint Management**: View and resolve complaints across all departments
- **Statistics**: Track pending, in-progress, and resolved complaints
- **Department Management**: Manage Mess, Transport, Network, Housekeeping, and Water departments
- **Schedule Management**: Update timings and schedules for various services

## 🛠️ Technology Stack

- **Frontend**: React 19.x
- **Routing**: React Router DOM v7
- **State Management**: Redux Toolkit
- **Styling**: Custom CSS with CSS Variables
- **Icons**: Font Awesome 6.4
- **Build Tool**: Vite
- **Package Manager**: npm

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd student_grievance_port
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── shared/          # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Modal.jsx
│   │   └── LoadingSpinner.jsx
│   ├── admin/           # Admin-specific components
│   └── student/         # Student-specific components
├── pages/
│   ├── Landing.jsx      # Landing page with role selection
│   ├── auth/            # Authentication pages
│   │   ├── StudentLogin.jsx
│   │   ├── StudentRegister.jsx
│   │   ├── AdminLogin.jsx
│   │   └── DriverLogin.jsx
│   ├── student/         # Student pages
│   │   ├── StudentDashboard.jsx
│   │   ├── StudentMess.jsx
│   │   ├── StudentTransport.jsx
│   │   └── StudentCarpool.jsx
│   ├── admin/           # Admin pages
│   │   └── AdminDashboard.jsx
│   └── driver/          # Driver pages
│       └── DriverDashboard.jsx
├── services/
│   └── api.js           # API service layer with placeholders
├── store/
│   ├── store.js         # Redux store configuration
│   └── authSlice.js     # Authentication state management
├── App.jsx              # Main app component with routing
├── App.css              # Global styles
└── main.jsx             # Application entry point
```

## 🔐 Authentication

The app uses Redux for state management with three user roles:
- **Student**: Access to all amenity services and complaint management
- **Admin**: Full access to complaint resolution and department management
- **Driver**: Access to ride booking management and bidding system

### Default Credentials (Placeholder)
Since the backend is not implemented, you can login with any credentials. The mock API will accept any email/roll number and password combination.

## 🔌 API Integration

The application currently uses **placeholder API functions** located in `src/services/api.js`. All API calls return mock data and need to be replaced with actual backend endpoints.

### API Categories:

1. **Authentication APIs** (`authAPI`)
   - `loginStudent(rollNumber, password)`
   - `loginAdmin(email, password)`
   - `loginDriver(email, password)`
   - `registerStudent(userData)`

2. **Complaint APIs** (`complaintAPI`)
   - `getMyComplaints(studentId)`
   - `getAllComplaints(filters)`
   - `createComplaint(complaintData)`
   - `updateComplaintStatus(complaintId, status, resolvedAt)`
   - `uploadComplaintMedia(complaintId, files)`

3. **Ride Booking APIs** (`rideAPI`)
   - `getMyBookings(studentId)`
   - `getAvailableBookings()`
   - `createBooking(bookingData)`
   - `acceptBooking(bookingId, driverId)`
   - `cancelBooking(bookingId)`

4. **Bid APIs** (`bidAPI`)
   - `getBidsForBooking(bookingId)`
   - `placeBid(bookingId, driverId, proposedFare)`
   - `acceptBid(bidId)`

5. **Department APIs** (`departmentAPI`)
   - `getAllDepartments()`

6. **Schedule APIs** (`scheduleAPI`)
   - `getSchedulesByDepartment(deptId)`
   - `updateSchedule(scheduleId, scheduleData)`

7. **Driver APIs** (`driverAPI`)
   - `getDriverProfile(driverId)`
   - `updateAvailability(driverId, isOnline, latitude, longitude)`
   - `getDriverStats(driverId)`

8. **User APIs** (`userAPI`)
   - `getUserById(userId)`
   - `updateUserProfile(userId, userData)`

### Integrating with Backend

To connect to your backend:

1. Open `src/services/api.js`
2. Update the `API_BASE_URL` constant with your backend URL
3. Replace the mock return statements with actual fetch/axios calls
4. Handle authentication tokens appropriately

Example:
```javascript
// Before (Mock)
loginStudent: async (rollNumber, password) => {
  return {
    success: true,
    data: { user_id: 'student_123', role: 'student', ... }
  };
}

// After (Real API)
loginStudent: async (rollNumber, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/student/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rollNumber, password })
  });
  return await response.json();
}
```

## 🗄️ Database Schema

The application is designed to work with the following database schema:

### Tables:
- **users**: User accounts (students, drivers, admins)
- **driver_profiles**: Driver-specific information
- **driver_availability**: Real-time driver availability
- **ride_bookings**: Cab booking requests
- **ride_bids**: Driver bids on ride bookings
- **departments**: Campus departments (Mess, Transport, etc.)
- **complaints**: Student complaints
- **complaint_media**: Media attachments for complaints
- **schedules**: Department schedules and timings

Refer to the database schema documentation for complete field definitions and relationships.

## 🎨 Customization

### Styling
The application uses CSS variables for easy theming. Edit `src/App.css` to customize:

```css
:root {
    --primary-color: #2c5f8d;
    --success-color: #27ae60;
    --danger-color: #e74c3c;
    /* ... more variables */
}
```

### Adding New Features

1. **New Student Pages**: Create components in `src/pages/student/`
2. **New API Endpoints**: Add to `src/services/api.js`
3. **New Routes**: Update `src/App.jsx`

## 🐛 Known Issues & TODO

- [ ] Connect to actual backend API
- [ ] Implement file upload functionality for complaint media
- [ ] Add real-time notifications
- [ ] Implement map integration for ride locations
- [ ] Add payment gateway integration
- [ ] Create admin pages for each department (Network, Housekeeping, Water)
- [ ] Implement search and filtering for complaints
- [ ] Add export functionality for reports
- [ ] Implement WebSocket for real-time updates
- [ ] Add unit and integration tests

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is part of IIIT Nagpur's campus infrastructure.

## 📞 Support

For issues or questions:
- Email: amenities@iiitn.ac.in
- Campus Helpdesk: +91-XXX-XXX-XXXX

---

**Note**: This is a frontend-only implementation with placeholder API calls. Backend integration is required for full functionality.
