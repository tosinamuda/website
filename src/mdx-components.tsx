// src/mdx-components.tsx
import DownloadCTA from '@/components/blog/mdx/DownloadCTA';
import InlineCTA from '@/components/blog/mdx/InlineCTA';
import NewsletterCTA from '@/components/blog/mdx/NewsletterCTA';
import ResourceCTA from '@/components/blog/mdx/ResourceCTA';
import ServiceCTA from '@/components/blog/mdx/ServiceCTA';
import ServiceHighlight from '@/components/blog/mdx/ServiceHighlight';
import ShareableTakeaway from '@/components/blog/mdx/ShareableTakeaway';
import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-serif font-bold text-charcoal mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-serif font-bold text-charcoal mt-7 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-charcoal mt-6 mb-3">{children}</h3>
    ),
    p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-6">{children}</p>,
    a: ({ href, children }) => (
      <a href={href} className="text-primary hover:text-purple-800 transition-colors duration-300">
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">{children}</ol>
    ),
    img: ({ src, alt }) => (
      <div className="my-8">
        <Image src={src || ''} alt={alt || ''} width={800} height={450} className="rounded-sm" />
      </div>
    ),
    blockquote: ({ children }) => (
      <div className="prose">
        <blockquote>{children}</blockquote>
      </div>
    ),
    TipBox: ({ children }) => (
      <div className="bg-soft-apricot border-l-4 border-primary p-6 mb-6 rounded-sm">
        <div className="font-medium text-purple-800 mb-2">Tip</div>
        <div className="text-gray-700">{children}</div>
      </div>
    ),

    // Add the CTA components
    InlineCTA,
    DownloadCTA,
    ServiceCTA,
    ShareableTakeaway,
    NewsletterCTA,
    ResourceCTA,
    ServiceHighlight,
    ...components,
  };
}
