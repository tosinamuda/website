import Footer from '@/components/Footer'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
import { PostData } from '@/lib/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import ErrorPage from 'next/error'
import Link from 'next/link'
import { useRouter } from 'next/router'

type PostProps = PostData & { preview: boolean }

const BlogDetail = ({ post }: PostProps) => {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <div className="text-gray-700">
      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
        <>
          <section className="pt-20">
            <div className="container">
              <div className="py-14">
                <div className="flex flex-wrap items-center gap-2 bg-gray-100 py-2 px-3">
                  <Link href="/" className="transition-all hover:text-primary">
                    Home
                  </Link>{' '}
                  /
                  <Link
                    href="/blog"
                    className="transition-all hover:text-primary"
                  >
                    Blog
                  </Link>{' '}
                  /<p className="text-gray-500">{post.title}</p>
                </div>
              </div>

              <div className="lg:w-4/5">
                <span className="bg-orange-500/10 text-orange-500 font-medium rounded-md text-xs py-1 px-2">
                  <a href="#">{post.categories.edges[0].node.name}</a>
                </span>
                <h1 className="lg:text-5xl/snug text-3xl/snug mt-3">
                  {post.title}
                </h1>
              </div>

              <div className="mb-8">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-3 mt-7">
                    <img
                      src={post.author.node.avatar.url}
                      alt="avatar"
                      className="h-11 w-11 rounded-full"
                    />

                    <div>
                      <h6 className="text-sm transition-all hover:text-primary">
                        <a href="#">{post.author.node.name}</a>
                      </h6>
                      <p className="text-sm text-gray-500">
                        11 Mar, 2020 · 3 min read
                      </p>
                    </div>
                  </div>

                  {/* TODO: Fix Blog Share 
                  <div className="flex gap-2">
                    <BlogShare />
                  </div> */}
                </div>
              </div>
            </div>
          </section>
          <section className="pb-7">
            <div className="container">
              <div>
                <img
                  src={
                    post.featuredImage.node.sourceUrl ||
                    '/images/blog/hero-post.png'
                  }
                  className="rounded-md"
                />
                {/* TODO: Fix Featured Image Caption
                 <p className="text-xs text-gray-500 mt-2 text-center">
                  The image caption referencing the above image
                </p> */}
              </div>

              <div
                className="prose max-w-none  mt-10"
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
              />

              {/* TODO: Add Blog Tags <BlogTags /> */}

              {/* TODO: Fix Blog Share 
              <div className="flex gap-2 mt-8 mb-14">
                <BlogShare />
              </div> */}
            </div>
          </section>

          {/* TODO: Add Post Cursor
          <section>
            <div className="container">
              <PostCursor author={post.author.node} />
            </div>
          </section> */}
          {/*  TODO: Add Comment Setion 
            <section className="lg:py-24 py-14">
              <div className="container">
                  <BlogComment />
              </div>
            </section> 
          */}
        </>
      )}
      <Footer></Footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  // @ts-ignore
  const data = await getPostAndMorePosts(params?.slug, preview, previewData)

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug()

  return {
    // @ts-ignore
    paths: allPosts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
    fallback: true,
  }
}

export default BlogDetail
