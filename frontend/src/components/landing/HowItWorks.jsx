import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Report an Issue',
    description: 'Citizens report civic issues through an intuitive interface. Upload photos, add location, and describe the problem.',
    icon: '📝',
    color: 'primary',
  },
  {
    number: '02',
    title: 'AI Analyzes',
    description: 'Our AI engine categorizes, prioritizes, and routes issues to the appropriate department automatically.',
    icon: '🧠',
    color: 'secondary',
  },
  {
    number: '03',
    title: 'Authorities Respond',
    description: 'Officials receive smart notifications, track progress, and respond efficiently with real-time updates.',
    icon: '✅',
    color: 'primary',
  },
];

const TimelineStep = ({ step, index, isLast }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative flex items-start gap-8"
    >
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-primary-500 to-secondary-500 opacity-20" />
      )}

      {/* Step Number Circle */}
      <div className="relative flex-shrink-0">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 flex items-center justify-center text-xl font-bold text-white shadow-glow-lg z-10`}>
          {step.icon}
        </div>
        <div className={`absolute inset-0 rounded-full bg-${step.color}-500 opacity-20 blur-xl animate-pulse`} />
      </div>

      {/* Content */}
      <div className="flex-1 pb-12">
        <div className="glass p-8 rounded-2xl hover:shadow-glow transition-all duration-300">
          <div className={`text-sm font-semibold text-${step.color}-400 mb-2`}>
            STEP {step.number}
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
            {step.title}
          </h3>
          <p className="text-slate-500 dark:text-gray-400 leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 px-6 bg-slate-50/80 dark:bg-slate-900/50">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-700 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-slate-500 dark:text-gray-400 max-w-2xl mx-auto">
            From report to resolution in three intelligent steps
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-0">
          {steps.map((step, index) => (
            <TimelineStep
              key={index}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
