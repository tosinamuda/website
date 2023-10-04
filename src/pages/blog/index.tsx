import { BlogCard, BlogCTA, FeaturedPost } from '@/components/blog'
import Footer from '@/components/Footer'
import { getAllPostsForBlogHome } from '@/lib/api'
import { PostGraph } from '@/lib/types'
import { GetStaticProps } from 'next'

const Blog = ({ allPosts }: { allPosts?: PostGraph }) => {
  if (allPosts == null) return <h1>Error</h1>
  const { edges } = allPosts || {}
  const posts = edges.map((edge) => edge.node)
  const featuredPost = posts.length > 0 ? posts[0] : undefined

  return (
    <>
      <section className="pt-36 pb-20">
        <div className="container">
          <div className="absolute inset-0 h-96 bg-cover bg-no-repeat bg-center bg-[url('../images/blog/hero.jpeg')]">
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
          {/*  <div className="flex items-center gap-2">
           <p>Tags:</p>
           <div className="flex flex-wrap items-center gap-1">
             {tags.map((tag) => (
               <a
                 href={`/tags/${tag.slug}`}
                 className="border border-gray-300 rounded-md text-xs font-medium tracking-wider transition-all duration-150 hover:shadow-lg focus:shadow-lg py-2 px-3"
                 key={tag.slug}
               >
                 {tag.name}
               </a>
             ))}
           </div>
          </div> */}

          <div
            className="grid lg:grid-cols-3 grid-cols-1 gap-10 items-center lg:py-16 py-14 aos-init"
            data-aos="fade-up"
            data-aos-duration="300"
          >
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-5 gap-10">
                {featuredPost && <FeaturedPost post={featuredPost} />}
              </div>
            </div>

            <div>
              <BlogCTA post={posts[8]} />
            </div>
          </div>

          <div
            className="grid lg:grid-cols-3 grid-cols-1 gap-6 lg:py-16 py-14 aos-init"
            data-aos="fade-up"
          >
            <BlogCard post={posts[1]} />
            <BlogCard post={posts[2]} />
            <BlogCard post={posts[3]} />
          </div>

          <div
            className="grid lg:grid-cols-3 grid-cols-1 gap-10 items-center lg:py-16 py-14 aos-init"
            data-aos="fade-up"
          >
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-5 gap-10">
                {featuredPost && <FeaturedPost post={posts[4]} />}
              </div>
            </div>

            <div>
              <BlogCTA post={posts[8]} />
            </div>
          </div>

          <div
            className="grid lg:grid-cols-3 gap-6 lg:py-16 py-14 aos-init"
            data-aos="fade-up"
          >
            <BlogCard post={posts[5]} />
            <BlogCard post={posts[6]} />
            <BlogCard post={posts[7]} />
          </div>

          {/* <BlogPagination></BlogPagination> */}
        </div>
      </section>

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForBlogHome(preview)
  /* const tags = listTags();
  const pagination = {
    current: 1,
    pages: Math.ceil(countPosts() / config.posts_per_page),
  }; */

  return {
    props: {
      allPosts,
      preview,
      tags: [],
      pagination: null,
    },
  }
}
export default Blog
