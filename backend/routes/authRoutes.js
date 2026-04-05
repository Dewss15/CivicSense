// Authentication routes
const express = require('express');
const router = express.Router();
const { signup, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateSignup, validateLogin } = require('../middleware/validationMiddleware');

// Public routes (no authentication required)
router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);

// Protected route (requires valid JWT token)
router.get('/me', protect, getMe);

module.exports = router;
