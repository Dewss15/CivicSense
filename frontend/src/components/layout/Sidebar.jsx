import React, { useState } from 'react';

const Sidebar = ({ activeRoute, onNavigate, user }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'issues', label: 'Issues', icon: '📋' },
    { id: 'create', label: 'Create Issue', icon: '➕' },
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen glass border-r border-gray-200 dark:border-slate-700 transition-all duration-300 z-30 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-slate-700">
        {!isCollapsed && (
          <div className="flex items-center gap-2 animate-fade-in">
            <span className="text-2xl">🏙️</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              CivicSense
            </h1>
          </div>
        )}
        {isCollapsed && <span className="text-2xl mx-auto">🏙️</span>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors ${
            isCollapsed ? 'hidden' : ''
          }`}
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          <span className="text-gray-600 dark:text-gray-400">{isCollapsed ? '→' : '←'}</span>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${
              activeRoute === item.id
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-glow'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
            } ${isCollapsed ? '  justify-center' : ''}`}
            title={isCollapsed ? item.label : ''}
          >
            <span className={`text-xl ${activeRoute === item.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
              {item.icon}
            </span>
            {!isCollapsed && (
              <span className="animate-fade-in">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer - User Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-slate-700">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          {!isCollapsed && (
            <div className="flex-1 animate-fade-in">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email || ''}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
