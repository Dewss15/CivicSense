import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

const Header = ({ onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-64 h-16 glass border-b border-gray-200 dark:border-slate-700 z-20 transition-all duration-300">
      <div className="h-full flex items-center justify-between px-6">
        {/* Search Bar */}
        <div className={`flex-1 max-w-md transition-all duration-300 ${searchFocused ? 'max-w-2xl' : ''}`}>
          <div className={`relative ${searchFocused ? 'shadow-glow' : ''}`}>
            <input
              type="text"
              placeholder="Search issues..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full px-4 py-2 pl-10 rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-all duration-200"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full bg-gray-300 dark:bg-slate-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Toggle theme"
          >
            <div
              className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white dark:bg-slate-900 shadow-md transform transition-transform duration-300 flex items-center justify-center text-xs ${
                theme === 'dark' ? 'translate-x-7' : ''
              }`}
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </div>
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
            <span className="text-xl">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
