// src/lib/blog.ts
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

// Update the path to use src/content/blog
const blogDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  authorImage: string;
  featured?: boolean;
  categories: string[];
  tags: string[];
  image: string;
  content: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const fileNames = await fs.promises.readdir(blogDirectory);

  const posts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(blogDirectory, fileName);
        const fileContents = await fs.promises.readFile(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
          slug,
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          author: data.author,
          authorImage: data.authorImage,
          featured: data.featured || false,
          categories: data.categories || [],
          tags: data.tags || [],
          image: data.image,
          content,
          readingTime: readingTime(content),
        } as BlogPost;
      })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`);
    const fileContents = await fs.promises.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      author: data.author,
      authorImage: data.authorImage,
      featured: data.featured || false,
      categories: data.categories || [],
      tags: data.tags || [],
      image: data.image,
      content,
      readingTime: readingTime(content),
    } as BlogPost;
  } catch (error) {
    console.error('Error reading blog post:', error);
    return null;
  }
}

export async function getRelatedPosts(currentSlug: string, limit = 3): Promise<BlogPost[]> {
  const allPosts = await getBlogPosts();
  const currentPost = await getBlogPost(currentSlug);

  if (!currentPost) return [];

  return allPosts
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => {
      // Prioritize posts with matching categories or tags
      const aMatchCategories = a.categories.filter((cat) =>
        currentPost.categories.includes(cat)
      ).length;
      const bMatchCategories = b.categories.filter((cat) =>
        currentPost.categories.includes(cat)
      ).length;

      const aMatchTags = a.tags.filter((tag) => currentPost.tags.includes(tag)).length;
      const bMatchTags = b.tags.filter((tag) => currentPost.tags.includes(tag)).length;

      return bMatchCategories + bMatchTags - (aMatchCategories + aMatchTags);
    })
    .slice(0, limit);
}

// Reusable function to get featured and regular posts with edge case handling
export async function getFeaturedAndRegularPosts(): Promise<{
  featuredPost: BlogPost | null;
  regularPosts: BlogPost[];
  allPosts: BlogPost[];
}> {
  const allPosts = await getBlogPosts();
  let featuredPost = allPosts.find((post) => post.featured) || null;
  let regularPosts = allPosts.filter((post) => !post.featured);

  // If no featured post exists, treat the first post as featured
  if (!featuredPost && allPosts.length > 0) {
    featuredPost = allPosts[0];
    regularPosts = allPosts.slice(1);
  }

  return {
    featuredPost,
    regularPosts,
    allPosts,
  };
}

export async function getHomePosts(): Promise<BlogPost[]> {
  const { featuredPost, regularPosts } = await getFeaturedAndRegularPosts();

  if (!featuredPost) return [];

  // Combine featured post first, then regular posts, limited to 3 total
  const combinedPosts = [featuredPost, ...regularPosts];
  return combinedPosts.slice(0, 3);
}
