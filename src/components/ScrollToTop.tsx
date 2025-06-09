'use client';

import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

const ScrollToTop = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Set initial state based on current scroll position
    if (window.pageYOffset > 72) {
      button.classList.add('flex', 'opacity-100');
      button.classList.remove('hidden', 'opacity-0');
    } else {
      button.classList.add('hidden', 'opacity-0');
      button.classList.remove('flex', 'opacity-100');
    }

    const handleScroll = () => {
      if (!button) return;

      if (window.pageYOffset > 72) {
        button.classList.add('flex', 'opacity-100');
        button.classList.remove('hidden', 'opacity-0');
      } else {
        button.classList.add('hidden', 'opacity-0');
        button.classList.remove('flex', 'opacity-100');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={twMerge(
        'fixed text-sm rounded-full z-10 bottom-5 end-5 h-9 w-9 text-center bg-primary/20 text-primary justify-center items-center transition-all duration-300 ease-in-out',
        'hidden opacity-0' // Initial state
      )}
      aria-label="Scroll to top"
    >
      <FontAwesomeIcon icon={faArrowUp} className="text-base" />
    </button>
  );
};

export default ScrollToTop;
