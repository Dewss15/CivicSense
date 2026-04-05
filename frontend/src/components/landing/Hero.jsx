import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const Hero = ({ onGetStarted, onSignIn }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Light mode: radial glow behind headline for depth */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none dark:hidden">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-radial from-primary-200/40 via-sky-100/20 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-6"
        >
          <span className="px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300 text-sm font-semibold border border-primary-300 dark:border-primary-500/30 backdrop-blur-sm shadow-sm dark:shadow-none">
            ✨ AI-Powered Civic Intelligence Platform
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-primary-700 via-secondary-600 to-primary-700 dark:from-primary-400 dark:via-secondary-400 dark:to-primary-400 bg-clip-text text-transparent">
            CivicSense
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl md:text-4xl font-semibold text-slate-800 dark:text-gray-200 mb-6"
        >
          AI-Powered Civic Intelligence
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-slate-500 dark:text-gray-400 mb-12 max-w-3xl mx-auto"
        >
          Report. Analyze. Improve your city smarter.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={onGetStarted}
            size="lg"
            className="px-8 py-4 text-lg font-semibold shadow-glow-lg hover:shadow-glow transform hover:scale-105 transition-all duration-300"
          >
            🚀 Get Started
          </Button>
          <Button
            onClick={onSignIn}
            variant="ghost"
            size="lg"
            className="px-8 py-4 text-lg font-semibold border-2 border-slate-300 dark:border-gray-600 hover:border-primary-600 dark:hover:border-primary-500 text-slate-700 dark:text-gray-300 backdrop-blur-sm"
          >
            Sign In →
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: '50K+', label: 'Issues Resolved' },
            { value: '95%', label: 'AI Accuracy' },
            { value: '24/7', label: 'Real-time Tracking' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary-700 dark:text-primary-400 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500 dark:text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gradient overlay - makes text more readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white/80 dark:from-transparent dark:via-slate-900/30 dark:to-slate-900/60 pointer-events-none -z-10" />

      {/* Light mode soft shadow under hero for depth separation */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white/60 dark:to-transparent pointer-events-none z-0" />
    </section>
  );
};

export default Hero;
