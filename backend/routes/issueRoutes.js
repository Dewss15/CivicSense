// Routes define the API endpoints (URLs) our frontend will call
const express = require('express');
const router = express.Router();
const {
  getIssues,
  createIssue,
  deleteIssue,
  updateIssueStatus
} = require('../controllers/issueController');
const { protect } = require('../middleware/authMiddleware');
const { validateIssue } = require('../middleware/validationMiddleware');

// Routes and their purposes:

// GET /api/issues - Get all issues (protected)
router.get('/', protect, getIssues);

// POST /api/issues - Create a new issue (protected + validated)
// Frontend sends: { title: "...", description: "...", priority: "...", location: "..." }
router.post('/', protect, validateIssue, createIssue);

// DELETE /api/issues/:id - Delete a specific issue (protected, owner only)
// Example: DELETE /api/issues/65abc123def456
router.delete('/:id', protect, deleteIssue);

// PATCH /api/issues/:id - Update issue status (protected)
// Example: PATCH /api/issues/65abc123def456
router.patch('/:id', protect, updateIssueStatus);

module.exports = router;
