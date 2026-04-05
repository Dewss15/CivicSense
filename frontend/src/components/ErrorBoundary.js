// Error Boundary - Catches React errors and shows fallback UI
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.iconContainer}>
              <span style={styles.icon}>⚠️</span>
            </div>
            <h1 style={styles.title}>Oops! Something went wrong</h1>
            <p style={styles.message}>
              We're sorry for the inconvenience. The application encountered an unexpected error.
            </p>
            
            {this.state.error && (
              <div style={styles.errorDetails}>
                <strong>Error:</strong> {this.state.error.toString()}
              </div>
            )}
            
            <div style={styles.actions}>
              <button onClick={this.handleReset} style={styles.resetButton}>
                🔄 Try Again
              </button>
              <button 
                onClick={() => window.location.href = '/'} 
                style={styles.homeButton}
              >
                🏠 Go Home
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <details style={styles.details}>
                <summary style={styles.summary}>Error Details (Development Only)</summary>
                <pre style={styles.stackTrace}>
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    animation: 'fadeIn 0.5s ease-out'
  },
  iconContainer: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  icon: {
    fontSize: '64px',
    display: 'inline-block',
    animation: 'shake 0.5s ease-in-out'
  },
  title: {
    fontSize: '28px',
    color: '#333',
    marginBottom: '16px',
    textAlign: 'center'
  },
  message: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.6',
    textAlign: 'center',
    marginBottom: '24px'
  },
  errorDetails: {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffc107',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '24px',
    fontSize: '14px',
    color: '#856404',
    wordBreak: 'break-word'
  },
  actions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  resetButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s'
  },
  homeButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s'
  },
  details: {
    marginTop: '20px',
    fontSize: '12px'
  },
  summary: {
    cursor: 'pointer',
    fontWeight: '600',
    color: '#667eea',
    marginBottom: '10px'
  },
  stackTrace: {
    backgroundColor: '#f8f9fa',
    padding: '12px',
    borderRadius: '8px',
    overflow: 'auto',
    maxHeight: '200px',
    fontSize: '11px',
    lineHeight: '1.5'
  }
};

export default ErrorBoundary;
