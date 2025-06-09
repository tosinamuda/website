import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import rehypePrettyCode, { Options, Theme } from 'rehype-pretty-code';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import moonlightTheme from './assets/moonlight-ii.json' with { type: 'json' };

const options: Options = {
  // See Options section below.
  theme: moonlightTheme as unknown as Theme,
  keepBackground: false,
};

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  output: 'export',
  reactStrictMode: true,
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: 'frontmatter' }],
      remarkGfm,
      [rehypePrettyCode, options],
    ],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
