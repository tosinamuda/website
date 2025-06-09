import { NavigationData } from '@/components/layout/nav-bar/types/navigation';

// Navigation data structure
export const navigationData: NavigationData = {
  mainItems: [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    {
      label: 'About',
      children: [
        { label: 'Bio', href: '/about' },
        { label: 'Awards', href: '/achievements' },
        { label: 'Talks', href: '/talks' },
        { label: 'Portfolio', href: '/resume' },
      ],
    },
    {
      label: 'Resume',
      href: 'https://drive.google.com/file/d/1ZBwSPb9yHnBGmgYx57rEwUSRtXZ_emAF/view?usp=sharing',
      isExternal: true,
    },
  ],
  ctaButton: {
    label: "Let's Talk",
    href: '/contact',
  },
};
