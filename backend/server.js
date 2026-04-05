// Main server file - This is where everything starts!
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const issueRoutes = require('./routes/issueRoutes');
const authRoutes = require('./routes/authRoutes');

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// ===== MIDDLEWARE =====
// Middleware runs BEFORE your route handlers

// 1. Security Headers - Helmet sets various HTTP headers for security
app.use(helmet());

// 2. Request Logging - Morgan logs all HTTP requests
// 'dev' format: colored by response status, method, URL, response time
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined')); // More detailed for production
}

// 3. Rate Limiting - Prevents abuse by limiting requests per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting to all API routes
app.use('/api/', limiter);

// 4. CORS - Allows frontend (localhost:3000) to make requests to backend (localhost:5000)
// Without this, browsers block cross-origin requests for security
app.use(cors());

// 5. Body Parser - Converts incoming JSON to JavaScript object
// Allows us to access req.body in our controllers
app.use(express.json());

// 6. URL Encoded - Parses URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));

// ===== ROUTES =====
// Authentication routes
app.use('/api/auth', authRoutes);

// Issue routes
app.use('/api/issues', issueRoutes);

// Test route to check if server is running
app.get('/', (req, res) => {
  res.json({ message: '🚀 CivicSense API is running!' });
});

// ===== ERROR HANDLING MIDDLEWARE =====
// 404 Handler - Catches requests to non-existent routes
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Global Error Handler - Catches all errors from routes and middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    // Only show stack trace in development
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Test it: http://localhost:${PORT}`);
});

// Handle unhandled promise rejections (database connection errors, etc.)
process.on('unhandledRejection', (err) => {
  console.log('❌ Unhandled Rejection:', err.message);
  // Close server & exit
  server.close(() => process.exit(1));
});
