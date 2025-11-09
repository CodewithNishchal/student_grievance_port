# Quick Start Guide - IIIT Nagpur Amenities Portal

## 🚀 Getting Started in 5 Minutes

### 1. Installation

```bash
# Navigate to project directory
cd student_grievance_port

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### 2. First Login

Since the backend is not connected, **any credentials will work** for testing:

#### Student Login
- Go to: http://localhost:5173/student/login
- Roll Number: `any_value` (e.g., `2021001`)
- Password: `any_value`

#### Admin Login
- Go to: http://localhost:5173/admin/login
- Email: `any_email` (e.g., `admin@iiitn.ac.in`)
- Password: `any_value`

#### Driver Login
- Go to: http://localhost:5173/driver/login
- Email: `any_email` (e.g., `driver@iiitn.ac.in`)
- Password: `any_value`

### 3. Key Features to Test

#### As a Student:
1. **Dashboard**: View all available amenities
2. **Mess**: Submit a complaint about food quality
3. **Transport**: 
   - Book a cab
   - Try regular booking option
4. **Carpool**:
   - Browse available rides
   - Post a new ride
5. **Track Complaints**: View status of submitted complaints

#### As a Driver:
1. **Dashboard**: View statistics
2. **New Requests**: See pending bookings
3. **Accept Booking**: Accept a ride request
4. **Place Bid**: Make a competitive bid on a booking

#### As an Admin:
1. **Dashboard**: Overview of all complaints
2. **Department Cards**: Click to manage specific departments
3. **High Priority**: Review urgent complaints
4. **Statistics**: Monitor resolution progress

## 📂 Project Structure Overview

```
src/
├── pages/              # All page components
│   ├── Landing.jsx     # Entry point with role selection
│   ├── auth/           # Login/Register pages
│   ├── student/        # Student-specific pages
│   ├── admin/          # Admin pages
│   └── driver/         # Driver pages
├── components/shared/  # Reusable components
├── services/api.js     # API layer (REPLACE WITH REAL APIs)
└── store/              # Redux state management
```

## 🔌 Connecting to Your Backend

### Step 1: Update API Base URL
Edit `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:3000/api'; // Your backend URL
```

### Step 2: Replace Mock Functions
Find the API function you need, for example:
```javascript
// Current (Mock)
loginStudent: async (rollNumber, password) => {
  return { success: true, data: {...} };
}

// Replace with real API call
loginStudent: async (rollNumber, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/student/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rollNumber, password })
  });
  return await response.json();
}
```

### Step 3: Handle Authentication Tokens
After successful login, store the token:
```javascript
const response = await authAPI.loginStudent(rollNumber, password);
if (response.success) {
  localStorage.setItem('token', response.data.token);
  // Use this token in subsequent API calls
}
```

## 🎨 Customizing Styles

Edit `src/App.css` to change colors:
```css
:root {
    --primary-color: #2c5f8d;    /* Change this */
    --success-color: #27ae60;    /* And this */
    --danger-color: #e74c3c;     /* And this */
}
```

## 🐛 Common Issues

### Issue: Pages not loading
**Solution**: Make sure you're on the correct route:
- Student Dashboard: `/student/dashboard`
- Admin Dashboard: `/admin/dashboard`
- Driver Dashboard: `/driver/dashboard`

### Issue: Redux state not working
**Solution**: Check if Redux DevTools is installed. The store is configured in `src/store/store.js`

### Issue: Icons not showing
**Solution**: Font Awesome is loaded via CDN in `index.html`. Check your internet connection.

## 📱 Testing on Mobile

The app is fully responsive. To test on mobile:

1. Start dev server: `npm run dev`
2. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
3. Access from mobile: `http://YOUR_IP:5173`

## 🔍 What to Build Next

### Immediate Tasks:
1. ✅ Frontend is complete
2. ⚠️ Connect backend APIs (replace placeholders in `api.js`)
3. ⚠️ Implement file upload for complaint media
4. ⚠️ Add real-time notifications
5. ⚠️ Implement map view for rides

### Backend Requirements:
You need endpoints for:
- User authentication (login/register)
- Complaints CRUD
- Ride bookings CRUD
- Bids management
- Departments & Schedules
- File uploads

## 📚 Additional Resources

- **React Router**: https://reactrouter.com/
- **Redux Toolkit**: https://redux-toolkit.js.org/
- **Font Awesome**: https://fontawesome.com/icons

## 🆘 Need Help?

1. Check `FRONTEND_README.md` for detailed documentation
2. Review the database schema provided
3. Look at console for any error messages
4. Ensure all dependencies are installed: `npm install`

## 🎯 Testing Checklist

Before deploying, test:
- [ ] All three role logins work
- [ ] Student can submit complaints
- [ ] Student can book rides
- [ ] Student can post/join carpool
- [ ] Driver can see and accept bookings
- [ ] Driver can place bids
- [ ] Admin can view all complaints
- [ ] Navbar and footer appear on all pages
- [ ] Mobile responsive layout works
- [ ] Protected routes redirect correctly

---

**Ready to develop!** 🚀

Start the dev server and begin connecting your backend APIs to make this application fully functional.
