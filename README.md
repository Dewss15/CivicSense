# 🏙️ CivicSense - Civic Infrastructure Issue Tracking Platform

A production-grade, full-stack web application for tracking and managing civic infrastructure issues. Built with React, Node.js, Express, and MongoDB.

## ✨ Features

### 🔐 Authentication & Authorization
- Secure JWT-based authentication
- Password hashing with bcrypt
- Protected routes and ownership-based access control
- 30-day token expiration

### 📋 Issue Management
- Create, read, update, and delete (CRUD) operations
- Priority levels: Low, Medium, High, Critical
- Status workflow: Open → In Progress → Resolved
- Location tracking for each issue
- User ownership and creator attribution

### 🤖 AI-Powered Smart Suggestions
- Auto-detect issue priority from description keywords
- Intelligent category detection (7 categories)
- Automatic location extraction from text
- Real-time suggestions as you type
- Confidence-based recommendations

### 🎨 Professional UI/UX
- Responsive design with gradient backgrounds
- Real-time dashboard with 6 live statistics
- Advanced search and multi-filter system
- Toast notifications for all user actions
- Modal confirmations for destructive operations
- Loading states and smooth animations
- Color-coded priority and status badges
- Hover effects and transitions

### 🛡️ Production-Ready Backend
- Request logging with Morgan
- Rate limiting (100 requests per 15 minutes)
- Helmet security headers
- Input validation with express-validator
- Global error handling
- 404 handler for unknown routes
- Proper HTTP status codes throughout

### 🚨 Error Handling
- React Error Boundary for graceful error recovery
- Async error handling with express-async-handler
- Validation error messages
- User-friendly error feedback

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0 - UI library
- **Axios** 1.6.0 - HTTP client
- Functional components with hooks
- CSS animations and transitions
- localStorage for token persistence

### Backend
- **Node.js** v24.13.0 - Runtime environment
- **Express** 4.18.2 - Web framework
- **Mongoose** 8.0.0 - MongoDB ODM
- **JWT** 9.0.3 - Authentication
- **bcryptjs** 3.0.3 - Password hashing
- **express-validator** - Input validation
- **morgan** - Request logging
- **express-rate-limit** - Rate limiting
- **helmet** - Security headers

### Database
- **MongoDB** Community 7.0.x (local)

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Community Server
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd quick-issues
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quick-issues
JWT_SECRET=your_secret_key_change_in_production
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows (if not running as service)
mongod

# macOS/Linux
sudo systemctl start mongod
```

## 🚀 Running the Application

### Option 1: One-Click Startup (Windows)
Double-click `start.bat` or run:
```powershell
.\start.ps1
```

### Option 2: Manual Startup
**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The application will be available at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 📖 API Documentation

### Authentication Endpoints

#### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Issue Endpoints

#### Get All Issues
```http
GET /api/issues
Authorization: Bearer <token>
```

#### Create Issue
```http
POST /api/issues
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Broken streetlight",
  "description": "Streetlight on Main Street is not working",
  "priority": "High",
  "location": "Main Street"
}
```

#### Update Issue Status
```http
PATCH /api/issues/:id
Authorization: Bearer <token>
```

#### Delete Issue
```http
DELETE /api/issues/:id
Authorization: Bearer <token>
```

## 🎯 Usage Examples

### Testing AI Suggestions

**Critical Issue:**
- Title: "Emergency water leak"
- Description: "Major water pipe burst at Main Street near City Hall. Flooding the road."
- AI will suggest: Priority: Critical, Location: Main Street, Category: Water & Drainage

**Road Issue:**
- Title: "Large pothole"
- Description: "Serious pothole on Oak Avenue causing traffic delays"
- AI will suggest: Priority: High, Location: Oak Avenue, Category: Roads & Transportation

**Park Issue:**
- Title: "Broken swing"
- Description: "Minor issue - playground swing needs repair in Central Park"
- AI will suggest: Priority: Low, Location: Central Park, Category: Parks & Recreation

## 📊 Features by Phase

### Phase 1: Authentication ✅
- JWT backend + frontend integration
- Login/signup screens
- Protected routes
- Token persistence

### Phase 2: Enhanced Schema ✅
- Priority levels (4 options)
- Status workflow (3 states)
- Location field
- User ownership
- Timestamps

### Phase 3: Professional UI ✅
- Dashboard with 6 statistics
- Gradient design
- Hover animations
- Improved typography

### Phase 4: Search & Filter ✅
- Real-time search
- Status filter
- Priority filter
- Combined filtering
- Results counter

### Phase 5: Loading/UX ✅
- Toast notifications (4 types)
- Modal confirmations
- Loading spinners
- Form submission states
- Global animations

### Phase 6: AI Integration ✅
- Priority auto-detection
- Category detection (7 categories)
- Location extraction
- Smart suggestions panel
- Real-time analysis

### Phase 7: Backend Maturity ✅
- Request logging
- Rate limiting
- Input validation
- Error handling
- Security headers
- Frontend Error Boundary

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt (10 salt rounds)
- Rate limiting (100 req/15min per IP)
- Helmet security headers
- Input validation and sanitization
- XSS protection via HTML escaping
- CORS configuration
- Error stack traces hidden in production

## 🧪 Testing

### Manual Testing Checklist
- [ ] User signup with validation
- [ ] User login
- [ ] Create issue with AI suggestions
- [ ] Apply AI suggestions
- [ ] Filter by status
- [ ] Filter by priority
- [ ] Search issues
- [ ] Update issue status
- [ ] Delete own issue
- [ ] Try to delete other's issue (should fail)
- [ ] Logout and login again
- [ ] Check toast notifications
- [ ] Check modal confirmations
- [ ] Test rate limiting (make 100+ requests)

## 📁 Project Structure

```
quick-issues/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # Auth logic
│   │   └── issueController.js  # Issue CRUD logic
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification
│   │   └── validationMiddleware.js # Input validation
│   ├── models/
│   │   ├── User.js             # User schema
│   │   └── Issue.js            # Issue schema
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   └── issueRoutes.js      # Issue endpoints
│   ├── .env                    # Environment variables
│   ├── package.json
│   └── server.js               # Express app
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── FilterBar.js
│   │   │   ├── IssueCard.js
│   │   │   ├── IssueForm.js
│   │   │   ├── IssueList.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Toast.js
│   │   │   ├── Modal.js
│   │   │   ├── Spinner.js
│   │   │   ├── AISuggestions.js
│   │   │   └── ErrorBoundary.js
│   │   ├── services/
│   │   │   └── authService.js  # API calls
│   │   ├── utils/
│   │   │   └── aiHelpers.js    # AI logic
│   │   ├── animations.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── start.bat                   # Windows batch starter
└── start.ps1                   # PowerShell starter
```

## 🚧 Known Issues

- Old issues created before Phase 2 lack `createdBy` field (can be deleted by anyone)
- Password validation requires uppercase, lowercase, and number (may be strict for some users)

## 🔮 Future Enhancements (Phase 8)

- [ ] Docker containerization
- [ ] Production build optimization
- [ ] Deployment guides (Vercel + Railway)
- [ ] Image uploads for issues
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Issue comments/updates
- [ ] Export to CSV/PDF
- [ ] Mobile app (React Native)
- [ ] Real-time updates (WebSockets)

## 👤 Author

Built as a full-stack learning project demonstrating:
- REST API design
- JWT authentication
- React state management
- MongoDB data modeling
- Production-ready practices

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Built with passion for civic tech
- Designed for real-world civic infrastructure management
- Demonstrates modern full-stack development practices

---

**CivicSense** - Making cities better, one issue at a time. 🏙️✨
