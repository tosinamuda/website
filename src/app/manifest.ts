import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tosin Amuda Website',
    short_name: 'Tosin Amuda',
    description: 'Tosin Amuda',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#9333ea',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
