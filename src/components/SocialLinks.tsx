'use client';

import Link from 'next/link';

export function SocialLinks() {
  return (
    <>
      {' '}
      <div>
        <Link href="/">
          <img src="/images/svg/web.svg" className="w-7 h-7" alt="Website" />
        </Link>
      </div>
      <div>
        <Link href="https://linkedin.com/in/tosinamuda">
          <img src="/images/svg/linkedin.svg" className="w-7 h-7" alt="LinkedIn" />
        </Link>
      </div>
      <div>
        <Link href="https://x.com/tosinamuda">
          <img src="/images/svg/twitter.svg" className="w-7 h-7" alt="Twitter" />
        </Link>
      </div>
      <div>
        <Link href="https://github.com/tosinamuda">
          <img src="/images/svg/github.svg" className="w-7 h-7" alt="GitHub" />
        </Link>
      </div>
    </>
  );
}
