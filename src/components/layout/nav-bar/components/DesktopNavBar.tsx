'use client';

import { navigationData } from '@/data/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { DropdownMenu, NavLink } from './';

const DesktopNavBar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const darkModeClass = pathname === '/blog' || pathname === '/blog/' ? 'dark' : 'light';

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
      const shouldBeScrolled = scrollTop > 75;
      setIsScrolled((prev) => (prev !== shouldBeScrolled ? shouldBeScrolled : prev));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const headerClasses = twMerge(
    darkModeClass,
    'fixed top-0 inset-x-0 flex items-center z-40 w-full transition-all py-5',
    'bg-white lg:bg-transparent',
    isScrolled && 'nav-sticky lg:bg-white'
  );

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header id="desktop-navbar" className={`${headerClasses} hidden lg:flex`}>
      <div className="container">
        <nav className="flex items-center w-full">
          {/* Logo */}
          <Link href="/">
            <img src="/images/tosin.svg" className="h-8 dark:block logo-dark" alt="Logo Dark" />
            <img src="/images/tosin.svg" className="h-8 dark:hidden logo-light" alt="Logo Light" />
          </Link>

          {/* Navigation Menu */}
          <div className="ms-auto">
            <ul className="navbar-nav flex gap-x-3 items-center justify-center">
              {navigationData.mainItems.map((item) => {
                if (item.children) {
                  return (
                    <DropdownMenu
                      key={item.label}
                      item={item}
                      isOpen={isDropdownOpen}
                      onToggle={handleDropdownToggle}
                      dropdownRef={dropdownRef}
                    />
                  );
                }

                return (
                  <li key={item.label} className="nav-item">
                    <NavLink item={item} />
                  </li>
                );
              })}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="flex items-center ms-3">
            <Link
              href={navigationData.ctaButton.href}
              className="bg-primary hover:bg-purple-800 text-white px-4 py-2 rounded-sm inline-flex items-center text-sm"
            >
              {navigationData.ctaButton.label}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default DesktopNavBar;
