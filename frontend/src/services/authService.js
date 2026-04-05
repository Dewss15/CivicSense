// Authentication service - handles login, signup, and token management
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Sign up a new user
const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  
  if (response.data.data.token) {
    // Store token in localStorage
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }
  
  return response.data.data;
};

// Login existing user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  
  if (response.data.data.token) {
    // Store token in localStorage
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }
  
  return response.data.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

// Get current user from localStorage
const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Get auth header for API requests
const getAuthHeader = () => {
  const user = getCurrentUser();
  
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  
  return {};
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  getAuthHeader
};

export default authService;
