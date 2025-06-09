'use client';

import { navigationData } from '@/data/navigation';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { MobileDropdown, NavLink } from './';

const MobileNavBar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

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

  const headerClasses = twMerge(
    darkModeClass,
    'fixed top-0 inset-x-0 flex items-center z-40 w-full transition-all py-5',
    'bg-white',
    isScrolled && 'nav-sticky'
  );

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    setOpenDropdownIndex(null);
  };

  const handleDropdownToggle = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  return (
    <>
      {/* Mobile Header */}
      <header id="mobile-navbar" className={`${headerClasses} lg:hidden`}>
        <div className="container">
          <nav className="flex items-center w-full">
            {/* Logo */}
            <Link href="/">
              <img src="/images/tosin.svg" className="h-8" alt="Logo" />
            </Link>

            {/* Menu Toggle */}
            <div className="flex items-center ms-auto px-2.5">
              <button type="button" onClick={handleMenuToggle}>
                <FontAwesomeIcon icon={faBars} stroke="#6b7280" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        className={`fixed top-0 end-0 transition-all duration-200 transform h-full w-full max-w-md z-50 bg-white border-s lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full divide-y-2 divide-gray-200">
          {/* Menu Header */}
          <div className="p-6 flex items-center justify-between">
            <Link href="/">
              <img src="/images/tosin.svg" className="h-8" alt="Logo" />
            </Link>
            <button onClick={handleMenuClose} className="flex items-center px-2">
              <FontAwesomeIcon icon={faXmark} className="text-xl" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="p-6 overflow-scroll h-full">
            <ul className="navbar-nav flex flex-col gap-2">
              {navigationData.mainItems.map((item, index) => {
                if (item.children) {
                  return (
                    <MobileDropdown
                      key={item.label}
                      item={item}
                      isOpen={openDropdownIndex === index}
                      onToggle={() => handleDropdownToggle(index)}
                      onMenuClose={handleMenuClose}
                    />
                  );
                }

                return (
                  <li key={item.label} className="nav-item">
                    <NavLink item={item} onClick={handleMenuClose} />
                  </li>
                );
              })}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="p-6 flex items-center justify-center">
            <Link
              href={navigationData.ctaButton.href}
              className="bg-primary hover:bg-purple-800 w-full text-white p-3 rounded-sm flex items-center justify-center text-sm"
              onClick={handleMenuClose}
            >
              {navigationData.ctaButton.label}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavBar;
