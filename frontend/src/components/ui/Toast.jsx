import React, { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  
  const types = {
    success: {
      bg: 'bg-green-500',
      icon: '✅',
    },
    error: {
      bg: 'bg-red-500',
      icon: '❌',
    },
    warning: {
      bg: 'bg-yellow-500',
      icon: '⚠️',
    },
    info: {
      bg: 'bg-blue-500',
      icon: 'ℹ️',
    },
  };
  
  const config = types[type] || types.info;
  
  return (
    <div className="animate-slide-in">
      <div className={`${config.bg} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[300px]`}>
        <span className="text-2xl">{config.icon}</span>
        <p className="flex-1 font-medium">{message}</p>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors ml-2"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-20 right-6 z-50 space-y-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default Toast;
