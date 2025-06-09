import { Post, PostData, PostGraph, PreviewData } from './types';

const API_URL = process.env.WORDPRESS_API_URL ?? '';

type Variables = { [key: string]: string | number | boolean | undefined } | undefined;

interface ApiError {
  type: 'network' | 'timeout' | 'server' | 'graphql' | 'config';
  message: string;
  status?: number;
}

async function fetchAPI(query = '', { variables }: { variables?: Variables } = {}) {
  try {
    // Check if API_URL is configured
    if (!API_URL) {
      console.warn('WordPress API URL is not configured - blog features will be unavailable');
      return null;
    }

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };

    if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
    }

    // Add timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      // WPGraphQL Plugin must be enabled
      const res = await fetch(API_URL, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          query,
          variables,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle different HTTP status codes
      if (!res.ok) {
        const errorInfo: ApiError = {
          type: 'server',
          message: `WordPress API returned ${res.status}: ${res.statusText}`,
          status: res.status,
        };

        // Log different types of errors with appropriate levels
        if (res.status >= 500) {
          console.error('WordPress API server error:', errorInfo);
        } else if (res.status === 404) {
          console.warn('WordPress API endpoint not found:', errorInfo);
        } else {
          console.warn('WordPress API error:', errorInfo);
        }

        return null;
      }

      // Check if response has content
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn('WordPress API returned non-JSON response');
        return null;
      }

      const json = await res.json();

      // Handle GraphQL errors
      if (json.errors) {
        console.warn('WordPress GraphQL errors:', json.errors);
        return null;
      }

      return json.data;
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId);

      const error = fetchError as Error & { name?: string; code?: string };

      if (error.name === 'AbortError') {
        console.warn('WordPress API request timed out - blog features temporarily unavailable');
      } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        console.warn('WordPress API is unreachable - blog features temporarily unavailable');
      } else {
        console.warn('WordPress API network error:', error.message || 'Unknown error');
      }

      return null;
    }
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Unexpected error in WordPress API call:', err.message || 'Unknown error');
    return null;
  }
}

export async function getPreviewPost(id: string | number, idType = 'DATABASE_ID') {
  try {
    const data = await fetchAPI(
      `
      query PreviewPost($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
          databaseId
          slug
          status
        }
      }`,
      {
        variables: { id, idType },
      }
    );
    return data?.post || null;
  } catch (error) {
    console.warn('Error fetching preview post:', error);
    return null;
  }
}

export async function getAllPostsWithSlug() {
  try {
    const data = await fetchAPI(`
      {
        posts(first: 10000) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `);
    return data?.posts || null;
  } catch (error) {
    console.warn('Error fetching posts with slug:', error);
    return null;
  }
}

export async function getAllPostsForHome(preview: boolean) {
  try {
    const data = await fetchAPI(
      `
      query AllPosts {
        posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              slug
              date
              featuredImage {
                node {
                  sourceUrl
                }
              }
              author {
                node {
                  name
                  firstName
                  lastName
                  avatar {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
      {
        variables: {
          onlyEnabled: !preview,
          preview,
        },
      }
    );

    return data?.posts || null;
  } catch (error) {
    console.warn('Error fetching posts for home:', error);
    return null;
  }
}

export async function getPostAndMorePosts(
  slug: string | number,
  preview: boolean,
  previewData: PreviewData
): Promise<PostData | null> {
  try {
    const postPreview = preview ? previewData?.post : undefined;
    // The slug may be the id of an unpublished post
    const isId = Number.isInteger(Number(slug));
    const isSamePost = isId ? Number(slug) === postPreview?.id : slug === postPreview?.slug;
    const isDraft = isSamePost && postPreview?.status === 'draft';
    const isRevision = isSamePost && postPreview?.status === 'publish';

    const data = await fetchAPI(
      `
        fragment AuthorFields on User {
        name
        firstName
        lastName
        description
        avatar {
            url
        }
        }
        fragment PostFields on Post {
        title
        excerpt
        slug
        date
        featuredImage {
            node {
            sourceUrl
            }
        }
        author {
            node {
            ...AuthorFields
            }
        }
        categories {
            edges {
            node {
                name
            }
            }
        }
        tags {
            edges {
            node {
                name
            }
            }
        }
        }
        query PostBySlug($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
            ...PostFields
            content
            ${
              // Only some of the fields of a revision are considered as there are some inconsistencies
              isRevision
                ? `
            revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
            edges {
                node {
                title
                excerpt
                content
                author {
                    node {
                    ...AuthorFields
                    }
                }
                }
            }
            }
            `
                : ''
            }
        }
        posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
            edges {
            node {
                ...PostFields
            }
            }
        }
        }
    `,
      {
        variables: {
          id: isDraft ? postPreview.id : slug,
          idType: isDraft ? 'DATABASE_ID' : 'SLUG',
        },
      }
    );

    // Check if data was successfully fetched
    if (!data) {
      return null;
    }

    // Draft posts may not have an slug
    if (isDraft && data.post) data.post.slug = postPreview.id;
    // Apply a revision (changes in a published post)
    if (isRevision && data.post?.revisions) {
      const revision = data.post.revisions.edges[0]?.node;

      if (revision) Object.assign(data.post, revision);
      delete data.post.revisions;
    }

    // Filter out the main post
    if (data.posts?.edges) {
      data.posts.edges = data.posts.edges.filter(({ node }: { node: Post }) => node.slug !== slug);

      // If there are still 3 posts, remove the last one
      if (data.posts.edges.length > 2) data.posts.edges.pop();
    }

    return data;
  } catch (error) {
    console.warn('Error fetching post and more posts:', error);
    return null;
  }
}

export async function getAllPostsForBlogHome(
  preview: boolean,
  limit: number = 12
): Promise<PostGraph | null> {
  try {
    const data = await fetchAPI(
      `
      query AllPosts {
        posts(first: ${limit}, where: { orderby: { field: DATE, order: DESC }}) {
          edges {
            node {
              postId
              title
              excerpt(format: RENDERED)
              slug
              date
              featuredImage {
                node {
                  sourceUrl
                  srcSet
                }
              }
              author {
                node {
                  name
                  firstName
                  lastName
                  avatar {
                    url
                  }
                }
              }
                categories {
                edges {
                node {
                    name
                }
            }
          }
              
            }
          }
        }
      }
    `,
      {
        variables: {
          onlyEnabled: !preview,
          preview,
        },
      }
    );

    return data?.posts || null;
  } catch (error) {
    console.warn('Error fetching blog posts:', error);
    return null;
  }
}
