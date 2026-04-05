// Authentication middleware - protects routes that require login
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// This middleware runs BEFORE route handlers
// It checks if user is logged in by verifying JWT token
const protect = async (req, res, next) => {
  let token;
  
  // Check if Authorization header exists and starts with 'Bearer'
  // Format: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from "Bearer TOKEN_HERE"
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token hasn't been tampered with
      // jwt.verify checks signature and expiration
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Decoded token contains: { id: userId, iat: issuedAt, exp: expiresAt }
      // Fetch user from database (excluding password)
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }
      
      // User is authenticated! Move to next middleware/route handler
      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed'
      });
    }
  } else {
    // No token provided
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided'
    });
  }
};

module.exports = { protect };
