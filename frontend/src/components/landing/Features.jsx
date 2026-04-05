import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    icon: '🤖',
    title: 'Smart Issue Detection',
    description: 'AI automatically categorizes and prioritizes civic issues based on urgency, location, and impact.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: '⚡',
    title: 'AI Prioritization',
    description: 'Machine learning algorithms analyze patterns and suggest optimal resolution strategies.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: '📊',
    title: 'Real-time Tracking',
    description: 'Monitor issue status, get insights, and track resolution progress with live dashboards.',
    gradient: 'from-orange-500 to-red-500',
  },
];

const FeatureCard = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative"
    >
      <div className="glass p-8 rounded-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:-translate-y-2 h-full">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
          {feature.icon}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 dark:text-gray-400 leading-relaxed">
          {feature.description}
        </p>

        {/* Decorative gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
      </div>
    </motion.div>
  );
};

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 px-6 bg-white/60 dark:bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-700 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-slate-500 dark:text-gray-400 max-w-2xl mx-auto">
            Transform how your city manages infrastructure issues with cutting-edge AI technology
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
