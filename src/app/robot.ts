import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Base URL - update this to your actual domain
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://tosinamuda.com' // Replace with your actual domain
      : 'http://localhost:3000';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
