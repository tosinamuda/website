// components/blog/BlogContent.tsx
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BlogPost } from '@/lib/blog';
import { useMDXComponents } from '@/mdx-components';

interface BlogContentProps {
  post: BlogPost;
}

export default function BlogContent({ post }: BlogContentProps) {
  const components = useMDXComponents({});
  try {
    return (
      <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-charcoal prose-p:text-gray-700 prose-a:text-primary">
        <MDXRemote source={post.content} components={components} />
      </div>
    );
  } catch (error) {
    console.error('Error rendering MDX content:', error);
    return (
      <div className="prose prose-lg max-w-none">
        <p className="text-red-500">Error loading blog content. Please try again later.</p>
      </div>
    );
  }
}
