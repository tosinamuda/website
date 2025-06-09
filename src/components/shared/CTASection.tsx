'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  className?: string;
}

const CTASection = ({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  className,
}: CTASectionProps) => {
  return (
    <div className={twMerge('py-16 md:py-24 bg-white border-t border-gray-100', className)}>
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block h-px w-16 bg-primary mb-6"></span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-6">{title}</h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">{description}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {secondaryButtonText && secondaryButtonLink && (
              <Link
                href={secondaryButtonLink}
                className="bg-white border border-gray-300 text-charcoal hover:text-primary hover:border-primary px-8 py-3 font-medium transition-all duration-300"
              >
                {secondaryButtonText}
              </Link>
            )}
            <Link
              href={primaryButtonLink}
              className="bg-primary hover:bg-purple-800 text-white px-8 py-3 font-medium transition-colors duration-300"
            >
              {primaryButtonText}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTASection;
