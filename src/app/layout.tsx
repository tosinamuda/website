import type { Metadata } from 'next';
import LayoutWrapper from '../components/layout/layout-wrapper';

// CSS imports
import './global.css';

export const metadata: Metadata = {
  title: 'Tosin Amuda - Software Engineer',
  description:
    'Personal website of Tosin Amuda - Software Engineer, Product Engineer, and AI Engineer',
  keywords: ['Software Engineer', 'Product Engineer', 'AI Engineer', 'Tosin Amuda'],
  authors: [{ name: 'Tosin Amuda' }],
  creator: 'Tosin Amuda',
  publisher: 'Tosin Amuda',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tosinamuda.com'),
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
