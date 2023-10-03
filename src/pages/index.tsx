import Link from 'next/link'
import ContactSection from '@/components/ContactSection'
import { BlogCard } from '@/components/blog'
import { DevelopmentSVG, ProductSVG, DesignSVG } from '@/assets/svg'
import { PostGraph, getAllPostsForBlogHome } from '@/lib/api'
import { GetStaticProps } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowUp } from '@fortawesome/free-solid-svg-icons'

type Portfolio = {
  title: string
  featuredImage: string
  link: string
  category: string
}

const portfolios: Portfolio[] = [
  {
    title: 'LLM Micro Apps',
    featuredImage: 'images/portfolio/LLM-Micro-Apps.png',
    link: 'https://ibm.biz/watsonx-at-iis',
    category: 'AI, Web',
  },
  {
    title: 'LLM-Enabled Insurance Claim Processing',
    featuredImage: 'images/portfolio/insurex.png',
    link: '#',
    category: 'AI, Web',
  },

  {
    title: 'Zipawoof (Now FreeBidAfrica)',
    featuredImage: 'images/portfolio/zipawoof.png',
    link: '#',
    category: 'Web',
  },
  {
    title: 'Kamdora Mobile App',
    featuredImage: 'images/portfolio/kamdora.png',
    link: '#',
    category: 'Mobile',
  },
]

function PortfolioItem(p: Portfolio) {
  return (
    <div>
      <div className="group relative mt-12 hover:opacity-80">
        <div className=" group-hover:bg-white/10 rounded-md group-hover:shadow-lg transition-all duration-300">
          <div>
            <div className="relative">
              <img
                src={p.featuredImage}
                className="rounded-md aspect-[580/403] object-cover w-full"
              />
            </div>
            <div className="absolute inset-0 group-hover:flex items-center justify-center hidden transition-all duration-300 z-10">
              <Link href={p.link} className="inline-block">
                <div className="flex items-center gap-3 py-[6px] px-3 bg-primary rounded-md">
                  <p className="text-sm font-semibold text-white">
                    View Project
                  </p>
                  <FontAwesomeIcon icon={faArrowRight} className="text-white" />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 group-hover:bg-slate-300/20 transition-all duration-300"></div>
      </div>
      <div className="my-7">
        <h3 className="text-xl">{p.title}</h3>
        <p className="font-medium text-slate-500 pe-8">{p.category}</p>
      </div>
    </div>
  )
}

const Home = ({ allPosts }: { allPosts?: PostGraph }) => {
  if (allPosts == null) return <h1>Error</h1>

  const { edges } = allPosts || {}
  const posts = edges.map((edge) => edge.node)

  return (
    <>
      <section className="pt-44 relative  bg-gradient-to-t from-fuchsia-500/10">
        <div>
          <div className="hero-with-shapes -z-10">
            <div className="shape1"></div>
            <div className="shape2"></div>
            <div className="shape3"></div>
          </div>

          <div className="container">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
              <div
                className="pb-3 aos-init aos-animate"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <h4 className="text-lg">Hello! I am Tosin Amuda.</h4>
                <h1 className="md:text-5xl text-3xl font-medium my-3">
                  Today I'm a Software Engineer.
                </h1>
                <p className="text-base mt-6 mb-20 text-slate-700">
                  For a long time I was a{' '}
                  <span className="italic">tech generalist</span>, but the
                  constant truth about me is that I{' '}
                  <span className="italic">
                    love building tech products and teams
                  </span>
                  .
                </p>
                <div className="flex flex-wrap items-center gap-5">
                  <Link
                    href="#contact"
                    className="py-3 px-6 rounded border border-purple-500 font-semibold text-white bg-fuchsia-600 hover:text-white hover:shadow-lg hover:shadow-purple-600/50 focus:outline focus:outline-red-500/50 transition-all duration-500"
                  >
                    Let&apos;s Talk
                  </Link>
                  <Link
                    href="/blog"
                    className="py-3 px-6 rounded border border-purple-500 hover:border-purple-500 text-purple-500 font-semibold hover:bg-purple-500 hover:text-white hover:shadow-lg hover:shadow-purple-500/50 focus:outline focus:outline-purple-500/50 transition-all duration-500"
                  >
                    Explore Blog
                  </Link>
                </div>
              </div>
              <div
                data-aos="fade-up"
                data-aos-duration="500"
                className="aos-init aos-animate"
              >
                <img
                  src="images/tosin-profile-pic.png"
                  className="lg:ms-auto lg:me-0 mx-auto z-10 relative"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div>
            <h2 className="md:text-3xl text-xl font-semibold my-5">
              What I Do
            </h2>
            <p className="text-slate-400 font-medium">
              Building digital products and teams enabled by{' '}
              <span className="text-primary">Cloud and AI</span>.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 pt-14">
            <div
              className="group aos-init"
              data-aos="fade-up"
              data-aos-duration="600"
            >
              <div className="p-6 rounded-md shadow group-hover:shadow-lg transition-all duration-500">
                <div className="w-12 h-12 bg-red-500/10 flex items-center justify-center rounded-tr-xl rounded-bl-xl group-hover:rounded-tr-none group-hover:rounded-bl-none group-hover:rounded-tl-xl group-hover:rounded-br-xl transition-all duration-500">
                  <DesignSVG className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-lg mt-6">Product Engineering</h4>
                <p className="text-base text-slate-400 leading-7 mt-2">
                  I apply product thinking into building digital products that
                  meet stakeholders and users' need.
                </p>
              </div>
            </div>

            <div
              className="group aos-init"
              data-aos="fade-up"
              data-aos-duration="900"
            >
              <div className="p-6 rounded-md shadow group-hover:shadow-lg transition-all duration-500">
                <div className="w-12 h-12 bg-red-500/10 flex items-center justify-center rounded-tr-xl rounded-bl-xl group-hover:rounded-tr-none group-hover:rounded-bl-none group-hover:rounded-tl-xl group-hover:rounded-br-xl transition-all duration-500">
                  <ProductSVG className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-lg mt-6">AI Engineering</h4>
                <p className="text-base text-slate-400 leading-7 mt-2">
                  I apply AI (majorly LLM, Conversational AI) to enrich products
                  and improve user experience
                </p>
              </div>
            </div>

            <div
              className="group aos-init"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <div className="p-6 rounded-md shadow group-hover:shadow-lg transition-all duration-500">
                <div className="w-12 h-12 bg-red-500/10 flex items-center justify-center rounded-tr-xl rounded-bl-xl group-hover:rounded-tr-none group-hover:rounded-bl-none group-hover:rounded-tl-xl group-hover:rounded-br-xl transition-all duration-500">
                  <DevelopmentSVG className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-lg mt-6">Product Analytics</h4>
                <p className="text-base text-slate-400 leading-7 mt-2">
                  I measure how successful user are in my products so I can
                  optimize their experience and improve conversion.
                </p>
              </div>
            </div>

            <div
              className="group aos-init"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <div className="p-6 rounded-md shadow group-hover:shadow-lg transition-all duration-500">
                <div className="w-12 h-12 bg-red-500/10 flex items-center justify-center rounded-tr-xl rounded-bl-xl group-hover:rounded-tr-none group-hover:rounded-bl-none group-hover:rounded-tl-xl group-hover:rounded-br-xl transition-all duration-500">
                  <DevelopmentSVG className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-lg mt-6">Design Thinking</h4>
                <p className="text-base text-slate-400 leading-7 mt-2">
                  I've facilitated several Design Thinking Workshop to help
                  client find new creative and inclusive solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-5">
            <div>
              <h1 className="text-3xl font-medium my-3">Latest Projects</h1>
            </div>
          </div>

          <div
            className="grid lg:grid-cols-2 grid-cols-1 gap-6 aos-init"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            {portfolios.slice(0, 2).map((portfolio) => (
              <PortfolioItem key={portfolio.title} {...portfolio} />
            ))}
          </div>
          <div
            className="grid lg:grid-cols-2 grid-cols-1 gap-6 aos-init"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            {portfolios.slice(2, 4).map((portfolio) => (
              <PortfolioItem key={portfolio.title} {...portfolio} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
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
                      className="w-5 h-5 inline text-primary"
                    />
                  </span>
                </Link>
              </p>
            </div>
          </div>

          <div
            className="grid lg:grid-cols-3 grid-cols-1 gap-6 lg:py-8 py-6 aos-init"
            data-aos="fade-up"
          >
            {posts.map((post) => (
              <BlogCard key={post.title} post={post} />
            ))}
          </div>
          <hr className="mt-10" />
        </div>
      </section>

      <section id="contact" className="pt-20">
        <div className="container">
          <ContactSection />
          <hr className="mt-10" />
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <ul className="flex flex-wrap items-center justify-center gap-5">
            <li className="after:content-['-'] after:text-slate-300 after:font-extrabold">
              <Link
                href="#"
                className="text-slate-600 hover:text-blue-600 me-4"
              >
                About
              </Link>
            </li>
            <li className="after:content-['-'] after:text-slate-300 after:font-extrabold">
              <Link
                href="/blog"
                className="text-slate-600 hover:text-blue-600 me-4"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-slate-600 hover:text-blue-600 me-4"
              >
                Contact
              </Link>
            </li>
          </ul>

          <p className="mt-5 text-center text-slate-600">
            {new Date().getFullYear()} © Tosin Amuda
          </p>
        </div>
      </section>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForBlogHome(preview, 3)
  return {
    props: { allPosts, preview, tags: [], pagination: null },
  }
}
