import { DesignSVG, DevelopmentSVG, ProductSVG } from '@/assets/svg';
import ContactSection from '@/components/ContactSection';
import PortfolioItem from '@/components/PortfolioItem';
import { BlogCard } from '@/components/blog';
import { getHomePosts } from '@/lib/blog';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as motion from 'motion/react-client';
import type { Metadata } from 'next';
import Link from 'next/link';
import { portfolios } from '@/content/portfolio';

export const metadata: Metadata = {
  title: 'Tosin Amuda - Software Engineer, Product Engineer & AI Engineer',
  description:
    'Personal website of Tosin Amuda - Building digital products and teams enabled by Cloud and AI',
};

// Animation variants for consistent animations
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default async function Home() {
  const posts = await getHomePosts();

  return (
    <>
      <section className="pt-32 pb-16 relative bg-gradient-to-t from-fuchsia-500/10">
        <div>
          <div className="hero-with-shapes -z-10">
            <div className="shape1"></div>
            <div className="shape2"></div>
            <div className="shape3"></div>
          </div>

          <div className="container">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <h4 className="text-lg text-primary font-medium mb-4">Hello! I am Tosin Amuda.</h4>
                <h1 className="md:text-5xl text-3xl font-medium mb-6 leading-tight">
                  I build <span className="text-primary">AI-powered</span> digital products and
                  solutions.
                </h1>
                <p className="text-lg mb-10 text-slate-600 max-w-lg leading-relaxed">
                  Leading and inspiring technical teams to create impactful solutions.
                </p>

                <motion.div
                  className="flex flex-wrap items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                >
                  <Link
                    href="#contact"
                    className="py-3 px-6 rounded-sm border border-purple-500 font-semibold text-white bg-fuchsia-600 hover:text-white hover:shadow-lg hover:shadow-purple-600/50 focus:outline focus:outline-red-500/50 transition-all duration-500"
                  >
                    Let&apos;s Talk
                  </Link>
                  <Link
                    href="/blog"
                    className="py-3 px-6 rounded-sm border border-purple-500 hover:border-purple-500 text-purple-500 font-semibold hover:bg-purple-500 hover:text-white hover:shadow-lg hover:shadow-purple-500/50 focus:outline focus:outline-purple-500/50 transition-all duration-500"
                  >
                    Explore Blog
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                className="lg:justify-self-end"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              >
                <img
                  src="images/tosin-profile-pic.png"
                  alt="Tosin Amuda"
                  className="w-full max-w-md mx-auto lg:mx-0 z-10 relative"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="hidden py-16 bg-slate-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-6">My Journey</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Tech Generalist</h3>
                <p className="text-slate-600 text-sm">
                  Started by exploring every corner of tech - from frontend to data science
                </p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Finding Focus</h3>
                <p className="text-slate-600 text-sm">
                  Discovered my passion at the intersection of AI and product engineering
                </p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Building Impact</h3>
                <p className="text-slate-600 text-sm">
                  Now shipping AI-powered products that serve thousands of users globally
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container">
          <div>
            <h2 className="md:text-3xl text-xl font-semibold my-5">How I Create Impact</h2>
          </div>

          <motion.div
            className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 pt-14"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div className="group" variants={fadeInUp}>
              <div className="p-6 rounded-md shadow-sm group-hover:shadow-lg transition-all duration-500">
                <div className="w-12 h-12 bg-red-500/10 flex items-center justify-center rounded-tr-xl rounded-bl-xl group-hover:rounded-tr-none group-hover:rounded-bl-none group-hover:rounded-tl-xl group-hover:rounded-br-xl transition-all duration-500">
                  <DesignSVG className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-lg mt-6">Product Engineering</h4>
                <p className="text-base text-slate-400 leading-7 mt-2">
                  I apply product thinking into building digital products that meet stakeholders and
                  users&apos; need.
                </p>
              </div>
            </motion.div>

            <motion.div className="group" variants={fadeInUp}>
              <div className="p-6 rounded-md shadow-sm group-hover:shadow-lg transition-all duration-500">
                <div className="w-12 h-12 bg-red-500/10 flex items-center justify-center rounded-tr-xl rounded-bl-xl group-hover:rounded-tr-none group-hover:rounded-bl-none group-hover:rounded-tl-xl group-hover:rounded-br-xl transition-all duration-500">
                  <ProductSVG className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-lg mt-6">AI Engineering</h4>
                <p className="text-base text-slate-400 leading-7 mt-2">
                  I apply AI (majorly LLM, Conversational AI) to enrich products and improve user
                  experience
                </p>
              </div>
            </motion.div>

            <motion.div className="group" variants={fadeInUp}>
              <div className="p-6 rounded-md shadow-sm group-hover:shadow-lg transition-all duration-500">
                <div className="w-12 h-12 bg-red-500/10 flex items-center justify-center rounded-tr-xl rounded-bl-xl group-hover:rounded-tr-none group-hover:rounded-bl-none group-hover:rounded-tl-xl group-hover:rounded-br-xl transition-all duration-500">
                  <DevelopmentSVG className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-lg mt-6">Product Analytics</h4>
                <p className="text-base text-slate-400 leading-7 mt-2">
                  I measure how successful user are in my products so I can optimize their
                  experience and improve conversion.
                </p>
              </div>
            </motion.div>

            <motion.div className="group" variants={fadeInUp}>
              <div className="p-6 rounded-md shadow-sm group-hover:shadow-lg transition-all duration-500">
                <div className="w-12 h-12 bg-red-500/10 flex items-center justify-center rounded-tr-xl rounded-bl-xl group-hover:rounded-tr-none group-hover:rounded-bl-none group-hover:rounded-tl-xl group-hover:rounded-br-xl transition-all duration-500">
                  <DevelopmentSVG className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-lg mt-6">Design Thinking</h4>
                <p className="text-base text-slate-400 leading-7 mt-2">
                  I&apos;ve facilitated several Design Thinking Workshop to help client find new
                  creative and inclusive solutions
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100/50 border-t border-slate-200">
        <div className="container">
          {/* Enhanced Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
            </motion.div>
          </div>

          {/* Single responsive grid for all portfolio items */}
          <motion.div
            className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {portfolios.map((portfolio) => (
              <motion.div key={portfolio.title} variants={fadeInUp}>
                <PortfolioItem portfolio={portfolio} />
              </motion.div>
            ))}
          </motion.div>

          {/* Optional CTA section */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-slate-600 mb-6">Interested in collaborating on your next project?</p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
            >
              Let&apos;s Work Together
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container">
          <div className="flex items-center justify-between my-4">
            <div>
              <h1 className="text-3xl font-medium my-3">Latest Articles</h1>
            </div>

            <div className="text-end">
              <p>
                {' '}
                <Link href="/blog" className="font-medium text-primary">
                  View All
                  <span>
                    <img
                      src="/images/svg/arrow-right.svg"
                      alt="Arrow right"
                      className="w-5 h-5 inline text-primary"
                    />
                  </span>
                </Link>
              </p>
            </div>
          </div>

          {posts && posts.length > 0 ? (
            <motion.div
              className="grid lg:grid-cols-3 grid-cols-1 gap-6 lg:py-8 py-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              {posts.map((post) => (
                <motion.div key={post.title} variants={fadeInUp}>
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-8">
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-200 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  Blog Temporarily Unavailable
                </h3>
                <p className="text-slate-500 mb-4">
                  Our blog content is temporarily unavailable due to maintenance. Please check back
                  later.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  Try Blog Page
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          )}
          <hr className="mt-10" />
        </div>
      </section>

      <section id="contact" className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container">
          <ContactSection />
        </div>
      </section>

      <section className="py-8 bg-slate-800 border-t border-slate-700">
        <div className="container">
          <ul className="flex flex-wrap items-center justify-center gap-5">
            <li className="after:content-['-'] after:text-slate-400 after:font-extrabold">
              <Link href="#" className="text-slate-300 hover:text-white me-4">
                About
              </Link>
            </li>
            <li className="after:content-['-'] after:text-slate-400 after:font-extrabold">
              <Link href="/blog" className="text-slate-300 hover:text-white me-4">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="text-slate-300 hover:text-white me-4">
                Contact
              </Link>
            </li>
          </ul>

          <p className="mt-5 text-center text-slate-300">
            {new Date().getFullYear()} © Tosin Amuda
          </p>
        </div>
      </section>
    </>
  );
}
