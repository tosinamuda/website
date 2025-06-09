// src/components/blog/NewsletterCTA.tsx
'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

interface NewsletterCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

export default function NewsletterCTA({
  title = 'Get more stories like this',
  description = 'Subscribe to our newsletter to receive updates when new articles go live on the blog.',
  buttonText = 'Subscribe →',
}: NewsletterCTAProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Here you would normally submit to your newsletter service
    // For now, we'll just simulate success
    setSubmitted(true);
    setError('');

    // You could add your actual newsletter signup logic here
    // Example: await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
  };

  return (
    <motion.div
      className="bg-blue-50 p-6 md:p-8 my-8 rounded-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-serif font-bold text-charcoal mb-2">{title}</h3>
      <p className="text-gray-700 mb-6">{description}</p>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-sm">
          Thank you for subscribing! Please check your email to confirm your subscription.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {error && <p className="mt-1 text-red-600 text-sm">{error}</p>}
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-purple-800 text-white px-6 py-3 rounded-sm font-medium transition-colors duration-300"
          >
            {buttonText}
          </button>
        </form>
      )}
    </motion.div>
  );
}
