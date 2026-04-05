import React, { useState, useEffect } from 'react';
import AppLayout from './components/layout/AppLayout';
import PublicLayout from './components/layout/PublicLayout';
import Dashboard from './pages/Dashboard';
import Issues from './pages/Issues';
import LandingPage from './pages/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import { ToastContainer } from './components/ui/Toast';
import Spinner from './components/ui/Spinner';
import issueService from './services/issueService';
import authService from './services/authService';

function App() {
  // STATE MANAGEMENT
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState('landing'); // 'landing', 'login', 'signup'
  const [activeRoute, setActiveRoute] = useState('dashboard');
  
  // TOAST STATE
  const [toasts, setToasts] = useState([]);

  // TOAST METHODS
  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Check if user is already logged in on mount
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      fetchIssues();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FETCH all issues from backend
  const fetchIssues = async () => {
    try {
      setLoading(true);
      const data = await issueService.getIssues();
      setIssues(data);
    } catch (err) {
      showToast('Failed to fetch issues. Make sure backend is running!', 'error');
      console.error('Error fetching issues:', err);
    } finally {
      setLoading(false);
    }
  };

  // CREATE a new issue
  const handleCreateIssue = async (issueData) => {
    try {
      const newIssue = await issueService.createIssue(issueData);
      setIssues([newIssue, ...issues]);
      showToast('✅ Issue created successfully!', 'success');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create issue';
      showToast(`❌ ${msg}`, 'error');
      console.error('Error creating issue:', err);
    }
  };

  // DELETE an issue
  const handleDeleteIssue = async (id) => {
    try {
      await issueService.deleteIssue(id);
      setIssues(issues.filter((issue) => issue._id !== id));
      showToast('🗑️ Issue deleted successfully', 'success');
    } catch (err) {
      showToast('❌ Failed to delete issue', 'error');
      console.error('Error deleting issue:', err);
    }
  };

  // TOGGLE issue status
  const handleToggleStatus = async (id) => {
    try {
      const updatedIssue = await issueService.toggleIssueStatus(id);
      setIssues(
        issues.map((issue) =>
          issue._id === id ? updatedIssue : issue
        )
      );
      showToast(`✅ Status updated to "${updatedIssue.status}"`, 'success');
    } catch (err) {
      showToast('❌ Failed to update status', 'error');
      console.error('Error updating issue:', err);
    }
  };

  // Handle successful login
  const handleLogin = (userData) => {
    setUser(userData);
    fetchIssues();
    showToast(`👋 Welcome back, ${userData.name}!`, 'success');
  };

  // Handle successful signup
  const handleSignup = (userData) => {
    setUser(userData);
    fetchIssues();
    showToast(`🎉 Welcome to CivicSense, ${userData.name}!`, 'success');
  };

  // Handle logout
  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setIssues([]);
    setActiveRoute('dashboard');
    showToast('👋 Logged out successfully', 'info');
  };

  // Handle navigation
  const handleNavigate = (route) => {
    setActiveRoute(route);
  };

  // Show landing/login/signup screen if not authenticated
  if (!user) {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors">
          <Spinner size="lg" />
        </div>
      );
    }
    
    // Landing page has its own layout (CityBackground etc.)
    if (authView === 'landing') {
      return (
        <>
          <ToastContainer toasts={toasts} removeToast={removeToast} />
          <LandingPage 
            onGetStarted={() => setAuthView('signup')}
            onSignIn={() => setAuthView('login')}
          />
        </>
      );
    }

    // Login & Signup share the PublicLayout (theme toggle, consistent bg)
    return (
      <PublicLayout>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        
        {authView === 'login' && (
          <Login 
            onLogin={handleLogin}
            onSwitchToSignup={() => setAuthView('signup')}
            onBack={() => setAuthView('landing')}
          />
        )}
        
        {authView === 'signup' && (
          <Signup 
            onSignup={handleSignup}
            onSwitchToLogin={() => setAuthView('login')}
            onBack={() => setAuthView('landing')}
          />
        )}
      </PublicLayout>
    );
  }

  // Main authenticated app
  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <AppLayout 
        activeRoute={activeRoute}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        user={user}
      >
        {/* Dashboard Route */}
        {activeRoute === 'dashboard' && (
          <Dashboard issues={issues} />
        )}

        {/* Issues Route */}
        {activeRoute === 'issues' && (
          <Issues
            issues={issues}
            onDelete={handleDeleteIssue}
            onToggleStatus={handleToggleStatus}
            onCreate={handleCreateIssue}
          />
        )}

        {/* Create Issue Route (same as Issues but could open modal) */}
        {activeRoute === 'create' && (
          <Issues
            issues={issues}
            onDelete={handleDeleteIssue}
            onToggleStatus={handleToggleStatus}
            onCreate={handleCreateIssue}
          />
        )}
      </AppLayout>
    </>
  );
}

export default App;
