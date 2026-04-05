// This file contains all functions that talk to our backend API
import axios from 'axios';
import authService from './authService';

// Base URL for all API calls
// Backend runs on port 5000, frontend on port 3000
const API_URL = 'http://localhost:5000/api/issues';

// GET all issues from backend
const getIssues = async () => {
  const response = await axios.get(API_URL, {
    headers: authService.getAuthHeader()
  });
  return response.data.data; // Returns array of issues
};

// CREATE a new issue
const createIssue = async (issueData) => {
  // issueData = { title: "...", description: "..." }
  const response = await axios.post(API_URL, issueData, {
    headers: authService.getAuthHeader()
  });
  return response.data.data; // Returns the created issue
};

// DELETE an issue
const deleteIssue = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: authService.getAuthHeader()
  });
  return response.data;
};

// TOGGLE issue status (open ↔ closed)
const toggleIssueStatus = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}`, {}, {
    headers: authService.getAuthHeader()
  });
  return response.data.data; // Returns updated issue
};

// Export all functions so components can use them
const issueService = {
  getIssues,
  createIssue,
  deleteIssue,
  toggleIssueStatus
};

export default issueService;
