
import { format } from 'date-fns';

const API_URL = process.env.WORDPRESS_API_URL || ""

async function fetchAPI(query = '', { variables }: Record<string, any> = {}) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getPreviewPost(id: string | number, idType = 'DATABASE_ID') {
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
  )
  return data.post
}

export async function getAllPostsWithSlug() {
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
  `)
  return data?.posts
}

export async function getAllPostsForHome(preview: boolean) {
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
  )

  return data?.posts
}
export interface Post {
  // Define the properties of a Post
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  status?: 'draft' | 'publish'
  categories: {
    edges: { node: { name: string } }[];
  };
  author: { node: User }
  content: string,
  featuredImage: {
    node: {
      sourceUrl: string
      srcSet: string
    }
  }
  // ... other properties
}



export interface PostGraph {

  edges: { node: Post }[];

}

export interface PostData {
  post: Post;
  posts: PostGraph;
}

export interface User {
  name: string;
  firstName: string;
  lastName: string;
  avatar: { url: string }
  description: string;
}

export type Author = User

export interface PreviewData {
  post?: Post
}



export type TagContent = {
  readonly slug: string;
  readonly name: string;
};

export type PostContent = {
  readonly date: string;
  readonly title: string;
  readonly slug: string;
  readonly tags?: string[];
  readonly fullPath: string;
};





export async function getPostAndMorePosts(
  slug: string | number,
  preview: boolean,
  previewData: PreviewData
): Promise<PostData> {

  const postPreview = preview ? previewData?.post : undefined;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug))
  const isSamePost = isId
    ? Number(slug) === postPreview?.id
    : slug === postPreview?.slug
  const isDraft = isSamePost && postPreview?.status === 'draft'
  const isRevision = isSamePost && postPreview?.status === 'publish'

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
  )

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node

    if (revision) Object.assign(data.post, revision)
    delete data.post.revisions
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }: { node: Post }) => node.slug !== slug);

  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop()

  console.log(data);

  return data
}

export async function getAllPostsForBlogHome(preview: boolean, limit: number = 12): Promise<PostGraph | null> {
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
          preview
        },
      }
    )

    return data?.posts

  }

  catch (error) {
    console.error(error)
    return null;
  }

}

/**
 * 
 * @param inputDateString input in this string format e.g '2021-11-24T18:34:05';
 * @return output date in this format 'dd MMM, yyyy' e.g 11 Sep, 2021
 */
export const getHumanFriendlyDate = (inputDateString: string) => format(new Date(inputDateString), 'dd MMM, yyyy');
