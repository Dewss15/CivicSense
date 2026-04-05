import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const AppLayout = ({ children, activeRoute, onNavigate, onLogout, user }) => {
  return (
    <div className="min-h-screen">
      <Sidebar activeRoute={activeRoute} onNavigate={onNavigate} user={user} />
      <Header onLogout={onLogout} />
      
      {/* Main Content Area */}
      <main className="ml-64 mt-16 p-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
