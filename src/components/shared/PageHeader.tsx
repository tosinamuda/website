'use client';

import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface PageHeaderProps {
  tag?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

const PageHeader = ({ tag, title, subtitle, className }: PageHeaderProps) => {
  return (
    <div
      className={twMerge(
        'relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gray-50 overflow-hidden',
        className
      )}
    >
      {/* Subtle patterned background */}
      <div className="absolute inset-0 bg-gray-50 z-0 opacity-50">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F3F4F6" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tag && (
            <span className="text-teal text-sm font-medium tracking-widest uppercase">{tag}</span>
          )}
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mt-3 mb-6">
            {title}
          </h1>
          {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
        </motion.div>
      </div>
    </div>
  );
};

export default PageHeader;
