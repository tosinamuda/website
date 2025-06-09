// components/blog/BlogCard.tsx
'use client';

import { BlogPost } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import PlaceholderImage from '../shared/PlaceholderImage';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const formattedDate = useMemo(() => {
    try {
      return formatDate(post.date);
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Recent';
    }
  }, [post.date]);
  return (
    <motion.div
      className="bg-white border border-gray-100 overflow-hidden transition-all duration-300 hover:border-gray-200 group h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative overflow-hidden aspect-[16/9]">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <PlaceholderImage showLabel={false} category="Blog" />
        )}

        {post.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-white px-3 py-1 text-xs font-medium">Featured</span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2 flex items-center text-xs text-gray-500">
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <span>{post.readingTime.text}</span>
        </div>
        <h3 className="text-xl font-semibold text-charcoal mb-3 group-hover:text-primary transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-gray-700 text-sm mb-4 flex-grow">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories.slice(0, 2).map((category, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 text-xs">
              {category}
            </span>
          ))}
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="text-primary text-sm font-medium flex items-center mt-auto hover:text-purple-800 transition-colors duration-300"
        >
          Read More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}
