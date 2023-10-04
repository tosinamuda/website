export interface Post {
    // Define the properties of a Post
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    date: string;
    status?: 'draft' | 'publish';
    categories: {
        edges: { node: { name: string; }; }[];
    };
    author: { node: User; };
    content: string;
    featuredImage: {
        node: {
            sourceUrl: string;
            srcSet: string;
        };
    };
}

export interface PostGraph {
    edges: { node: Post; }[];
}

export interface PostData {
    post: Post;
    posts: PostGraph;
}

export interface User {
    name: string;
    firstName: string;
    lastName: string;
    avatar: { url: string; };
    description: string;
}

export type Author = User;

export interface PreviewData {
    post?: Post;
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
