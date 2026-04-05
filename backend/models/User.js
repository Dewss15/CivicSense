// User model for authentication
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Full name of the user
  name: {
    type: String,
    required: [true, 'Please add your name'],
    trim: true
  },
  
  // Email (used for login)
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please add a valid email']
  },
  
  // Hashed password (NEVER store plain passwords!)
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false // Don't return password in queries by default
  },
  
  // When user registered
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// MIDDLEWARE: Hash password before saving to database
// This runs automatically before user.save()
userSchema.pre('save', async function(next) {
  // Only hash if password is new or modified
  if (!this.isModified('password')) {
    return next();
  }
  
  // Generate salt (random data to make hash unique)
  const salt = await bcrypt.genSalt(10);
  
  // Hash the password with the salt
  this.password = await bcrypt.hash(this.password, salt);
  
  next();
});

// METHOD: Compare entered password with hashed password
// Usage: const isMatch = await user.matchPassword(enteredPassword);
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
