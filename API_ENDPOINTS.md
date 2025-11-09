# Backend API Endpoints - Required Implementation Guide

This document lists all API endpoints that need to be implemented in the backend to make the frontend fully functional.

## Base URL
```
http://localhost:3000/api
```

## 🔐 Authentication Endpoints

### POST /auth/student/login
**Description**: Student login  
**Request Body**:
```json
{
  "rollNumber": "string",
  "password": "string"
}
```
**Response**:
```json
{
  "success": true,
  "data": {
    "user_id": "string",
    "role": "student",
    "name": "string",
    "email": "string",
    "token": "jwt_token",
    "phone_number": "string"
  }
}
```

### POST /auth/admin/login
**Description**: Admin login  
**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
**Response**: Same as student login with role="admin"

### POST /auth/driver/login
**Description**: Driver login  
**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
**Response**: Same as student login with role="driver"

### POST /auth/student/register
**Description**: Student registration  
**Request Body**:
```json
{
  "roll_number": "string",
  "name": "string",
  "email": "string",
  "phone_number": "string",
  "password": "string"
}
```
**Response**:
```json
{
  "success": true,
  "data": {
    "user_id": "string",
    "message": "Registration successful"
  }
}
```

---

## 📝 Complaint Endpoints

### GET /complaints/student/:studentId
**Description**: Get all complaints for a student  
**Headers**: `Authorization: Bearer {token}`  
**Response**:
```json
{
  "success": true,
  "data": [
    {
      "complaint_id": "string",
      "title": "string",
      "description": "string",
      "status": "pending|in_progress|resolved",
      "severity": "low|medium|high",
      "created_at": "timestamp",
      "resolved_at": "timestamp|null",
      "dept_id": "string",
      "student_id": "string",
      "is_archived": false
    }
  ]
}
```

### GET /complaints/admin
**Description**: Get all complaints (admin only)  
**Headers**: `Authorization: Bearer {token}`  
**Query Params**: `?dept_id=string&status=string&severity=string`  
**Response**: Same array structure as above

### POST /complaints
**Description**: Create a new complaint  
**Headers**: `Authorization: Bearer {token}`  
**Request Body**:
```json
{
  "student_id": "string",
  "title": "string",
  "description": "string",
  "severity": "low|medium|high",
  "dept_id": "string"
}
```
**Response**:
```json
{
  "success": true,
  "data": {
    "complaint_id": "string",
    "status": "pending",
    "created_at": "timestamp",
    ...
  }
}
```

### PUT /complaints/:complaintId/status
**Description**: Update complaint status (admin only)  
**Headers**: `Authorization: Bearer {token}`  
**Request Body**:
```json
{
  "status": "pending|in_progress|resolved",
  "resolved_at": "timestamp|null"
}
```

### POST /complaints/:complaintId/media
**Description**: Upload media for complaint  
**Headers**: `Authorization: Bearer {token}`  
**Content-Type**: `multipart/form-data`  
**Request Body**: FormData with files  
**Response**:
```json
{
  "success": true,
  "data": {
    "media_ids": ["string"],
    "file_urls": ["string"]
  }
}
```

---

## 🚗 Ride Booking Endpoints

### GET /bookings/student/:studentId
**Description**: Get all bookings for a student  
**Headers**: `Authorization: Bearer {token}`  
**Response**:
```json
{
  "success": true,
  "data": [
    {
      "booking_id": "string",
      "pickup_location": "string",
      "dropoff_location": "string",
      "required_time": "timestamp",
      "status": "pending|accepted|completed|cancelled",
      "booking_type": "one_time|regular",
      "fixed_fare": "decimal",
      "student_id": "string"
    }
  ]
}
```

### GET /bookings/available
**Description**: Get all available bookings for drivers  
**Headers**: `Authorization: Bearer {token}`  
**Response**: Same array structure as above

### POST /bookings
**Description**: Create a new ride booking  
**Headers**: `Authorization: Bearer {token}`  
**Request Body**:
```json
{
  "student_id": "string",
  "pickup_location": "string",
  "dropoff_location": "string",
  "required_time": "timestamp",
  "booking_type": "one_time|regular",
  "fixed_fare": "decimal|null"
}
```

### PUT /bookings/:bookingId/accept
**Description**: Driver accepts a booking  
**Headers**: `Authorization: Bearer {token}`  
**Request Body**:
```json
{
  "driver_id": "string"
}
```

### PUT /bookings/:bookingId/cancel
**Description**: Cancel a booking  
**Headers**: `Authorization: Bearer {token}`

### PUT /bookings/:bookingId/complete
**Description**: Mark a ride as completed  
**Headers**: `Authorization: Bearer {token}`

---

## 💰 Bid Endpoints

### GET /bids/booking/:bookingId
**Description**: Get all bids for a booking  
**Headers**: `Authorization: Bearer {token}`  
**Response**:
```json
{
  "success": true,
  "data": [
    {
      "bid_id": "string",
      "booking_id": "string",
      "driver_id": "string",
      "proposed_fare": "decimal",
      "bid_status": "proposed|accepted|rejected"
    }
  ]
}
```

### POST /bids
**Description**: Place a bid on a booking  
**Headers**: `Authorization: Bearer {token}`  
**Request Body**:
```json
{
  "booking_id": "string",
  "driver_id": "string",
  "proposed_fare": "decimal"
}
```

### PUT /bids/:bidId/accept
**Description**: Student accepts a bid  
**Headers**: `Authorization: Bearer {token}`

---

## 🏢 Department Endpoints

### GET /departments
**Description**: Get all departments  
**Response**:
```json
{
  "success": true,
  "data": [
    {
      "dep_id": "string",
      "dept_name": "string"
    }
  ]
}
```

---

## 📅 Schedule Endpoints

### GET /schedules/department/:deptId
**Description**: Get schedules for a department  
**Response**:
```json
{
  "success": true,
  "data": [
    {
      "schedule_id": "string",
      "dep_id": "string",
      "title": "string",
      "content_url": "string",
      "last_updated_by": "string",
      "last_updated_at": "timestamp",
      "is_current": true
    }
  ]
}
```

### PUT /schedules/:scheduleId
**Description**: Update a schedule (admin only)  
**Headers**: `Authorization: Bearer {token}`  
**Request Body**:
```json
{
  "title": "string",
  "content_url": "string",
  "last_updated_by": "string"
}
```

---

## 👤 Driver Endpoints

### GET /drivers/:driverId/profile
**Description**: Get driver profile  
**Headers**: `Authorization: Bearer {token}`  
**Response**:
```json
{
  "success": true,
  "data": {
    "driver_id": "string",
    "vehicle_model": "string",
    "vehicle_number": "string",
    "license_details": "string"
  }
}
```

### PUT /drivers/:driverId/availability
**Description**: Update driver availability  
**Headers**: `Authorization: Bearer {token}`  
**Request Body**:
```json
{
  "is_online": true,
  "current_latitude": "decimal|null",
  "current_longitude": "decimal|null"
}
```

### GET /drivers/:driverId/stats
**Description**: Get driver statistics  
**Headers**: `Authorization: Bearer {token}`  
**Response**:
```json
{
  "success": true,
  "data": {
    "total_rides": "number",
    "pending_requests": "number",
    "confirmed_today": "number",
    "rating": "decimal"
  }
}
```

---

## 👥 User Endpoints

### GET /users/:userId
**Description**: Get user by ID  
**Headers**: `Authorization: Bearer {token}`  
**Response**:
```json
{
  "success": true,
  "data": {
    "user_id": "string",
    "role": "student|driver|admin",
    "name": "string",
    "email": "string",
    "phone_number": "string",
    "is_active": true
  }
}
```

### PUT /users/:userId
**Description**: Update user profile  
**Headers**: `Authorization: Bearer {token}`  
**Request Body**: Any user fields to update

---

## 🔒 Authentication & Authorization

### Required Headers
All protected endpoints require:
```
Authorization: Bearer {jwt_token}
```

### JWT Token Payload
```json
{
  "user_id": "string",
  "role": "student|driver|admin",
  "email": "string",
  "exp": "timestamp"
}
```

---

## 📊 Error Responses

All endpoints should return consistent error format:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  }
}
```

### Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 🧪 Testing Endpoints

Use tools like:
- **Postman** - API testing
- **Insomnia** - REST client
- **Thunder Client** - VS Code extension
- **curl** - Command line

Example curl request:
```bash
curl -X POST http://localhost:3000/api/auth/student/login \
  -H "Content-Type: application/json" \
  -d '{"rollNumber":"2021001","password":"password123"}'
```

---

## 🔄 CORS Configuration

Backend should allow requests from:
```javascript
// In your backend (Express example)
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  credentials: true
}));
```

---

## 📝 Additional Notes

1. **File Uploads**: Use `multer` (Node.js) or equivalent
2. **Database**: PostgreSQL, MySQL, or MongoDB based on schema
3. **Authentication**: Use JWT with bcrypt for password hashing
4. **Validation**: Validate all inputs server-side
5. **Rate Limiting**: Implement to prevent abuse
6. **Logging**: Log all requests for debugging
7. **Environment Variables**: Use `.env` for sensitive data

---

## 🚀 Quick Backend Setup (Node.js/Express Example)

```javascript
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Auth middleware
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ success: false, error: 'Unauthorized' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

// Example endpoint
app.post('/api/auth/student/login', async (req, res) => {
  const { rollNumber, password } = req.body;
  
  // TODO: Verify credentials from database
  // TODO: Hash password comparison
  // TODO: Generate JWT token
  
  res.json({
    success: true,
    data: { user_id: '...', role: 'student', token: '...' }
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

**This completes the API endpoint documentation. Implement these endpoints in your backend to make the frontend fully functional!** 🎉
