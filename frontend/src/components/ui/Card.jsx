import React from 'react';

const Card = ({ children, className = '', variant = 'default', hover = false, ...props }) => {
  const variants = {
    default: 'glass rounded-xl shadow-md',
    gradient: 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-xl shadow-lg',
    bordered: 'bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-xl',
  };
  
  const hoverClass = hover ? 'hover:shadow-glow hover:-translate-y-1 transition-all duration-300' : '';
  
  return (
    <div 
      className={`${variants[variant]} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
