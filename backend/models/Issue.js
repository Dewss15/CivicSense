// This defines what an "Issue" looks like in our database
const mongoose = require('mongoose');

// Create a schema (blueprint) for Issue
const issueSchema = new mongoose.Schema({
  // Title of the issue (e.g., "Login button not working")
  title: {
    type: String,
    required: [true, 'Please add a title'], // Must provide title
    trim: true // Removes extra spaces
  },
  
  // Detailed description of the issue
  description: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true
  },
  
  // Priority level
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  
  // Status of the issue
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved'],
    default: 'Open'
  },
  
  // Location where the issue was reported
  location: {
    type: String,
    trim: true,
    default: ''
  },
  
  // ===== AI-GENERATED FIELDS =====
  // Short AI summary of the issue description
  aiSummary: {
    type: String,
    trim: true,
    default: ''
  },

  // AI-detected priority level
  aiPriority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical', ''],
    default: ''
  },

  // AI-detected category
  aiCategory: {
    type: String,
    enum: ['Roads', 'Sanitation', 'Electricity', 'Water', 'Public Safety', 'Other', ''],
    default: ''
  },
  
  // User who created this issue
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Create a model from the schema
// "Issue" is the model name, it will create a "issues" collection in MongoDB
const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
