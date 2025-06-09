import BlogCard from '@/components/blog/BlogCard';
import BlogHeader from '@/components/blog/BlogHeader';
import Footer from '@/components/Footer';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { getBlogPost, getBlogPosts, getRelatedPosts } from '@/lib/blog';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all posts
export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = false;

// Generate metadata for each post
export async function generateMetadata({ params }: BlogPostPageProps) {
  try {
    const slug = (await params).slug;
    const post = await getBlogPost(slug);

    if (!post) {
      return {
        title: 'Post Not Found | Tosin Amuda',
        description: 'The blog post you are looking for could not be found.',
      };
    }

    return {
      title: `${post.title} | Tosin Amuda`,
      description: post.excerpt,
      openGraph: {
        images: [post.image],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog | Tosin Amuda',
      description: `Tosin's.`,
    };
  }
}

export default async function BlogDetail({ params }: Readonly<BlogPostPageProps>) {
  const { slug } = await params;
  const { default: Post } = await import(`../../../content/blog/${slug}.mdx`);

  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug, 3);

  return (
    <div className="text-gray-700">
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">
          <div className="mb-6">
            <Link
              href="/blog"
              className="text-primary font-medium text-sm flex items-center mb-6 hover:text-purple-800 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
              Back to Blog
            </Link>

            <BlogHeader post={post} />
          </div>

          <div className="relative w-full aspect-[16/9] mb-12">
            <Image src={post.image} alt={post.title} fill priority className="object-cover" />
          </div>

          <ErrorBoundary fallback={<div>Something went wrong loading this post.</div>}>
            <Post />
          </ErrorBoundary>

          <div className="border-t border-gray-200 mt-16 pt-16">
            <div className="flex flex-wrap gap-3 mb-6">
              {post.tags.map((tag, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 text-sm">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <Link
                href="/blog"
                className="text-primary font-medium flex items-center hover:text-purple-800 transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 17l-5-5m0 0l5-5m-5 5h12"
                  />
                </svg>
                Back to Blog
              </Link>

              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://tosinamuda.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-400 transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://tosinamuda.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://tosinamuda.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-700 transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 md:px-10 max-w-6xl">
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} index={index} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/*       <CTASection
        title="Elevate Your Digital Marketing Strategy"
        description="Ready to implement these strategies for your business? Let's discuss how I can help you achieve measurable results."
        primaryButtonText="Let's Talk"
        primaryButtonLink="/contact"
      /> */}

      <Footer />
    </div>
  );
}
