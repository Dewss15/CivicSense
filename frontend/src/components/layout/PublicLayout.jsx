import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const PublicLayout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Theme Toggle - Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="glass px-4 py-2 rounded-full hover:shadow-glow transition-all duration-300"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      {children}
    </div>
  );
};

export default PublicLayout;
