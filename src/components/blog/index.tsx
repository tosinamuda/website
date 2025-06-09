import { BlogPost } from '@/lib/blog';
import { Author, Post } from '@/lib/types';
import { getHumanFriendlyDate } from '@/lib/utils';
import { faArrowLeft, faArrowRight, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export const BlogCard = ({ post }: { post: BlogPost }) => {
  if (!post) return null;

  return (
    <div>
      <div className="relative w-full aspect-[3/2] mb-5">
        <img
          src={post.image || '/images/blog/hero-post.png'}
          alt="Blog Hero Featured Image"
          className="rounded-md  absolute inset-0 object-cover w-full h-full"
        />
      </div>

      <span className="bg-orange-500/10 text-orange-500 font-medium rounded-md text-xs py-1 px-2">
        <Link href={`/blog/${post.slug}`}>{post.categories?.[0] || 'Blog'}</Link>
      </span>
      <h1 className="text-lg my-3 transition-all hover:text-primary line-clamp-2">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h1>
      <div className="text-sm/relaxed tracking-wider text-gray-500">
        <div
          className="line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: post.excerpt,
          }}
        />
        <Link href={`/blog/${post.slug}`} className="text-primary">
          read more
        </Link>
      </div>
    </div>
  );
};
export const FeaturedPost = ({ post }: { post: Post }) => {
  if (!post) return null;

  return (
    <>
      <div className="md:col-span-2 col-span-3">
        <div className="relative w-full aspect-[1/1]">
          <img
            src={post.featuredImage?.node?.sourceUrl || '/images/blog/hero-post.png'}
            alt="Your Image"
            className="rounded-md  absolute inset-0 object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-14 justify-between xl:h-full">
          <div>
            <span className="bg-orange-500/10 text-orange-500 font-medium rounded-md text-xs py-1 px-2">
              <a href="#" className="capitalize">
                {post.categories?.edges?.[0]?.node?.name || `Blog`}
              </a>
            </span>
            <h1 className="text-lg my-3 transition-all hover:text-primary">
              <Link href={`/blog/${post.slug}`}>{post?.title || 'Tosin Amuda - Blog...'}</Link>
            </h1>
            <div className="text-sm/relaxed tracking-wider text-gray-500">
              <div
                className="line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: post?.excerpt,
                }}
              />
              <Link href={`/blog/${post.slug}`} className="text-primary">
                read more
              </Link>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <img
                src={post.author?.node?.avatar?.url || '/images/avatars/default.jpg'}
                className="h-10 w-10 rounded-md"
                alt="Author Avatar"
              />
              <div>
                <h6 className="text-sm transition-all hover:text-primary">
                  <Link href="/about">{post.author?.node?.name || 'Author'}</Link>
                </h6>
                <p className="text-sm text-gray-500">
                  {getHumanFriendlyDate(post.date)} · 3 min read
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export function BlogCTA({ post }: { post: Post }) {
  if (!post) return null;

  return (
    <div className="border relative shadow-xl rounded-lg w-full">
      <div className="relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-4 right-4 text-sm bg-red-500 text-white rounded-sm py-1 px-3">
          Resource
        </div>
        <img
          src={post.featuredImage?.node?.sourceUrl || '/images/blog/hero-post.png'}
          className="w-full aspect-[3/2] object-cover"
          alt="Featured Post"
        />

        <div className="absolute right-5 bottom-3 left-5 text-white">
          <h2 className="text-2xl">
            <Link href={`blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <div className="flex mt-3">
            <a href="#" className="ms-1 -me-3 shadow-lg">
              <img
                src={post.author?.node?.avatar?.url || '/images/avatars/default.jpg'}
                alt="Author Avatar"
                className="w-8 h-8 shadow-lg border-2 border-white rounded-full"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlogComment() {
  return (
    <>
      <div className="flex items-center gap-2">
        <h1 className="tracking-wider">Comments</h1>
        <span className="bg-gray-200 px-2 rounded-md">3</span>
      </div>

      <div>
        <div className="flex gap-3 my-6">
          <img src="/images/avatars/img-4.jpg" className="h-11 w-11 rounded-md" alt="User Avatar" />
          <div>
            <h6 className="text-sm mb-1">Sansa Stark</h6>
            <p className="text-sm text-gray-500">2 days ago</p>
            <p className="text-sm/relaxed tracking-wider text-gray-600 mt-2">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
              voluptatum deleniti atque.
            </p>
            <a href="#" className="text-primary text-sm">
              <FontAwesomeIcon icon={faComment} className="me-1" /> Reply
            </a>

            <div className="flex gap-3 my-6">
              <img
                src="/images/avatars/img-1.jpg"
                className="h-11 w-11 rounded-md"
                alt="User Avatar"
              />
              <div>
                <h6 className="text-sm mb-1">Cersei Lannister</h6>
                <p className="text-sm text-gray-500">1 days ago</p>
                <p className="text-sm/relaxed tracking-wider text-gray-600 mt-2">
                  Itaque earum rerum hic tenetur sapiente delectus aut reiciendis voluptatibus
                  maiores alias consequatur aut perferendis
                </p>
                <a href="#" className="text-primary text-sm">
                  <FontAwesomeIcon icon={faComment} className="me-1" /> Reply
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b"></div>

        <div className="flex gap-3 my-6">
          <img src="/images/avatars/img-2.jpg" className="h-11 w-11 rounded-md" alt="User Avatar" />
          <div>
            <h6 className="text-sm mb-1">Sansa Stark</h6>
            <p className="text-sm text-gray-500">2 days ago</p>
            <p className="text-sm/relaxed tracking-wider text-gray-600 mt-2">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
              voluptatum deleniti atque.
            </p>
            <a href="#" className="text-primary text-sm">
              <FontAwesomeIcon icon={faComment} className="me-1" /> Reply
            </a>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <div className="border bg-white rounded-sm p-6">
          <h1>Post a comment</h1>

          <div className="flex flex-col gap-5 mt-5">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              <div>
                <input
                  className="rounded-sm border-gray-300 focus:border-gray-400 focus:ring-0 w-full text-sm"
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="Name"
                />
              </div>
              <div>
                <input
                  className="rounded-sm border-gray-300 focus:border-gray-400 focus:ring-0 w-full text-sm"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
            </div>

            <div>
              <input
                className="rounded-sm border-gray-300 focus:border-gray-400 focus:ring-0 w-full text-sm"
                type="text"
                id="Subject"
                name="Subject"
                placeholder="Subject"
              />
            </div>

            <div>
              <textarea
                className="rounded-sm border-gray-300 focus:border-gray-400 focus:ring-0 w-full text-sm"
                id="message"
                name="message"
                rows={5}
                placeholder="Message"
              ></textarea>
            </div>

            <button className="flex">
              <a
                href="#"
                className="bg-black/70 text-white rounded-md text-sm font-semibold flex-none shadow-sm shadow-black hover:shadow-lg hover:shadow-black/30 focus:shadow-none focus:outline focus:outline-black/50 px-5 py-3"
              >
                Submit
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export function BlogTags({}) {
  return (
    <div className="flex flex-wrap sm:gap-2 gap-5 mt-10">
      <div>
        <a
          href="#"
          className="text-xs bg-gray-200 rounded-md font-medium transition-all hover:shadow-md hover:bg-gray-300/80 focus:bg-gray-300/80 py-2 px-4"
        >
          Startup
        </a>
      </div>
      <div>
        <a
          href="#"
          className="text-xs bg-gray-200 rounded-md font-medium transition-all hover:shadow-md hover:bg-gray-300/80 focus:bg-gray-300/80 py-2 px-4"
        >
          Website Design
        </a>
      </div>
      <div>
        <a
          href="#"
          className="text-xs bg-gray-200 rounded-md font-medium transition-all hover:shadow-md hover:bg-gray-300/80 focus:bg-gray-300/80 py-2 px-4"
        >
          Website Development
        </a>
      </div>
      <div>
        <a
          href="#"
          className="text-xs bg-gray-200 rounded-md font-medium transition-all hover:shadow-md hover:bg-gray-300/80 focus:bg-gray-300/80 py-2 px-4"
        >
          Tailwind
        </a>
      </div>
    </div>
  );
}
export function BlogShare({}) {
  return (
    <>
      <p className="text-sm text-gray-500">SHARE:</p>
      <div className="flex gap-3">
        <span>
          <a href="#">
            <svg
              className="w-5 h-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
        </span>
        <span>
          <a href="#">
            <svg
              className="w-5 h-5 text-teal-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
        </span>
        <span>
          <a href="#">
            <svg
              className="w-5 h-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </span>
      </div>
    </>
  );
}

export function PostCursor({ author }: { author: Author }) {
  return (
    <>
      <div className="border-t mb-5"></div>

      <div className="grid md:grid-cols-4 grid-cols-1 items-center">
        <div>
          <div>
            <div className="flex items-center justify-start">
              <button
                className="border border-gray-300 rounded-md text-sm tracking-wider transition-all duration-500 hover:shadow-lg py-2 px-5"
                data-fc-placement="top"
                data-fc-type="tooltip"
              >
                {' '}
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Prev Post
              </button>
              <div
                className="bg-white shadow-lg hidden rounded-md transition-all opacity-0 z-50 p-4 w-72"
                role="tooltip"
              >
                <div className="flex items-center gap-5">
                  <img
                    src="/images/blog/blog-3.png"
                    className="w-16 rounded-sm"
                    alt="Blog Post Thumbnail"
                  />
                  <div>
                    <h6 className="text-sm">Introducing new blazzing fast user interface</h6>
                    <p className="text-sm text-gray-500">by Emily Blunt</p>
                  </div>
                </div>
                <div
                  className="bg-white w-2.5 h-2.5 rotate-45 -z-10 rounded-[1px]"
                  data-fc-arrow=""
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <div className="my-5 md:my-0">
            <div className="flex md:justify-center justify-start items-center gap-4">
              <img src={author.avatar.url} className="h-12 w-12 rounded-full" alt="Author Avatar" />
              <div>
                <h6 className="text-sm transition-all hover:text-primary">
                  <a href="#">{author.name}</a>
                </h6>
                <p className="text-sm text-gray-500">{author.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center md:justify-end justify-start">
          <button
            className="border border-gray-300 rounded-md text-sm tracking-wider transition-all duration-500 hover:shadow-lg py-2 px-5"
            data-fc-placement="top"
            data-fc-type="tooltip"
          >
            Next Post <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
          </button>
          <div
            className="bg-white shadow-lg hidden rounded-md transition-all opacity-0 z-50 p-4 w-72"
            role="tooltip"
          >
            <div className="flex items-center gap-5">
              <img
                src="/images/blog/blog-2.png"
                className="w-16 rounded-sm"
                alt="Blog Post Thumbnail"
              />
              <div>
                <h6 className="text-sm">What you should know before...</h6>
                <p className="text-sm text-gray-500">by Emily Blunt</p>
              </div>
            </div>
            <div
              className="bg-white w-2.5 h-2.5 rotate-45 -z-10 rounded-[1px]"
              data-fc-arrow=""
            ></div>
          </div>
        </div>
      </div>

      <div className="border-b mt-5"></div>
    </>
  );
}
