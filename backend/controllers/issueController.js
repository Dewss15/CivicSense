// Controllers contain the logic for what happens when an API endpoint is called
const Issue = require('../models/Issue');
const asyncHandler = require('express-async-handler');
const { analyzeIssue } = require('../services/aiService');

// GET all issues
// Purpose: Fetch all issues from database and send to frontend
const getIssues = asyncHandler(async (req, res) => {
  // Find all issues, populate creator info, sort by newest first
  const issues = await Issue.find()
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    count: issues.length,
    data: issues
  });
});

// CREATE a new issue
// Purpose: Add a new issue to database, enhanced with AI analysis
const createIssue = asyncHandler(async (req, res) => {
  // Run AI analysis on the description (always returns a result — fallback if API fails)
  const aiResult = await analyzeIssue(req.body.description || '');

  // Add the logged-in user as the creator + merge AI results
  const issue = await Issue.create({
    ...req.body,
    createdBy: req.user._id,
    aiSummary: aiResult.shortSummary,
    aiPriority: aiResult.priority,
    aiCategory: aiResult.category,
  });
  
  // Populate creator info before sending back
  await issue.populate('createdBy', 'name email');
  
  res.status(201).json({
    success: true,
    data: issue
  });
});

// DELETE an issue
// Purpose: Remove an issue from database (owner only)
const deleteIssue = asyncHandler(async (req, res) => {
  const issue = await Issue.findById(req.params.id);
  
  if (!issue) {
    res.status(404);
    throw new Error('Issue not found');
  }
  
  // Check if user is the owner of the issue (allow deletion of legacy issues without createdBy)
  if (issue.createdBy && issue.createdBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this issue');
  }
  
  await issue.deleteOne();
  
  res.status(200).json({
    success: true,
    message: 'Issue deleted successfully',
    data: {}
  });
});

// UPDATE issue status
// Purpose: Change issue status (cycle through Open → In Progress → Resolved → Open)
const updateIssueStatus = asyncHandler(async (req, res) => {
  const issue = await Issue.findById(req.params.id);
  
  if (!issue) {
    res.status(404);
    throw new Error('Issue not found');
  }
  
  // Cycle through statuses
  const statusCycle = {
    'Open': 'In Progress',
    'In Progress': 'Resolved',
    'Resolved': 'Open'
  };
  
  issue.status = statusCycle[issue.status];
  await issue.save();
  await issue.populate('createdBy', 'name email');
  
  res.status(200).json({
    success: true,
    data: issue
  });
});

// Export all controller functions
module.exports = {
  getIssues,
  createIssue,
  deleteIssue,
  updateIssueStatus
};
