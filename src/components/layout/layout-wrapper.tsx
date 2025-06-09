'use client';

import NavBar from '@/components/layout/nav-bar';
import ScrollToTop from '@/components/ScrollToTop';

export default function LayoutWrapper({ children }: { readonly children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
      <ScrollToTop />
    </>
  );
}
