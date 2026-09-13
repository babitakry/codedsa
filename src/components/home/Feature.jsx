import React from 'react';
import { Code2, BarChart3, Zap, Lightbulb } from 'lucide-react';

const features = [
  {
    name: 'Curated Problemset',
    description: 'Hundreds of coding problems covering Arrays, Dynamic Programming, Graphs, Trees, and more, categorized by difficulty.',
    icon: Code2,
    color: 'text-[#00b8a3]',
    bg: 'bg-[#00b8a3]/10',
    border: 'border-[#00b8a3]/20',
  },
  {
    name: 'Progress & Analytics',
    description: 'Track your solved problems, acceptance rates, and submission history in real-time with comprehensive user analytics.',
    icon: BarChart3,
    color: 'text-[#ffc01e]',
    bg: 'bg-[#ffc01e]/10',
    border: 'border-[#ffc01e]/20',
  },
  {
    name: 'Multi-Language Execution',
    description: 'Run and test your code in C++, Java, Python, and JavaScript with fast code execution and real-time verdicts.',
    icon: Zap,
    color: 'text-[#3b82f6]',
    bg: 'bg-[#3b82f6]/10',
    border: 'border-[#3b82f6]/20',
  },
  {
    name: 'AI Problem Assistant',
    description: 'Get contextual hints, edge case analysis, and time-space complexity optimization from your built-in AI tutor.',
    icon: Lightbulb,
    color: 'text-[#ff375f]',
    bg: 'bg-[#ff375f]/10',
    border: 'border-[#ff375f]/20',
  },
];

const Feature = () => {
  return (
    <div className="py-12 sm:py-16 bg-neutral-50/50 dark:bg-[#1f1f1f]/50 border-t border-neutral-200/60 dark:border-[#282828] font-sans">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#00b8a3] mb-2">
            Built for Developers
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Everything you need to level up your DSA skills
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            A fast, distraction-free environment packed with tools to prepare you for technical interviews.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative p-6 rounded-xl border border-neutral-200 dark:border-[#333333] bg-white dark:bg-[#282828] shadow-xs hover:shadow-md transition-shadow group"
            >
              <div className={`w-10 h-10 rounded-lg ${feature.bg} ${feature.color} flex items-center justify-center mb-4 border ${feature.border}`}>
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {feature.name}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Feature;
