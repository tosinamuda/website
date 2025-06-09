import Footer from '@/components/Footer';
import { getFeaturedAndRegularPosts } from '@/lib/blog';
import type { Metadata } from 'next';

import BlogCard from '@/components/blog/BlogCard';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog - Tosin Amuda',
  description: 'Thoughts, Opinions and Journal of an aspiring master',
};

export default async function Blog() {
  const { featuredPost, regularPosts } = await getFeaturedAndRegularPosts();

  return (
    <>
      <section className="pt-36 pb-20">
        <div className="container">
          <div className="absolute inset-0 h-96 bg-cover bg-no-repeat bg-center bg-[url('/images/blog/hero.jpeg')]">
            <div className="relative w-full h-full z-30 bg-black/10"></div>
          </div>

          <div className="relative lg:w-3/5 mx-auto z-30">
            <div className="text-center text-white">
              <h2 className="text-5xl font-semibold mb-8">Blog</h2>
              <p className="text-base/relaxed tracking-wide">
                Thoughts, Opinions and Journal of an aspiring master
              </p>
              <p></p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          {featuredPost && (
            <div className="mb-16">
              <h2 className="text-2xl font-serif font-bold text-charcoal mb-8">Featured Post</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="md:col-span-3 relative aspect-[16/9] md:aspect-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col justify-center">
                  <div className="mb-2 flex items-center text-sm text-gray-500">
                    <span>
                      {new Date(featuredPost.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{featuredPost.readingTime.text}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-700 mb-6">{featuredPost.excerpt}</p>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="text-primary font-medium inline-flex items-center hover:text-purple-800 transition-colors duration-300"
                  >
                    Read Full Article
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1"
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
              </div>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-8">Recent Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
