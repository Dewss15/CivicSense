import React from 'react';

const Spinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className={`${sizes[size]} border-4 border-gray-200 dark:border-slate-700 border-t-primary-500 rounded-full animate-spin`}></div>
    </div>
  );
};

export default Spinner;
