import React from 'react';
import CityBackground from '../components/landing/CityBackground';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import { useTheme } from '../hooks/useTheme';

const LandingPage = ({ onGetStarted, onSignIn }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 text-slate-800 dark:text-white overflow-x-hidden">
      {/* 3D City Background */}
      <CityBackground />
      
      {/* Content Wrapper */}
      <div className="relative z-10">

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

        {/* Hero Section */}
        <Hero onGetStarted={onGetStarted} onSignIn={onSignIn} />

        {/* Features Section */}
        <Features />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Footer */}
        <footer className="relative bg-white/90 dark:bg-slate-950/80 backdrop-blur-lg py-12 px-6 border-t border-slate-200 dark:border-gray-800 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] dark:shadow-none">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
              CivicSense
            </h3>
            <p className="text-slate-500 dark:text-gray-500 mt-2">
              AI-Powered Civic Intelligence Platform
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm text-slate-500 dark:text-gray-400">
            <a href="#features" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">How It Works</a>
            <a href="#about" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">About</a>
            <a href="#contact" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contact</a>
          </div>

          <div className="text-sm text-slate-400 dark:text-gray-600">
            © {new Date().getFullYear()} CivicSense. All rights reserved.
          </div>
        </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
