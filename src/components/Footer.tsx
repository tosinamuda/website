import { SocialLinks } from '@/components/SocialLinks';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="container">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 pt-14 pb-10">
          <div>
            <Link href="/">
              <img src="/images/tosin.svg" className="w-32 mb-3" alt="Tosin Amuda Logo" />
            </Link>
            <p className="text-sm/relaxed tracking-wider text-gray-500">
              Hey, this is Tosin Amuda&apos;s website, feel free to contact me to discuss anything
              about Digital product - Software Engineering, AI Engineering, LLM, Conversational AI,
              Cloud Engineering, Product Analytics and Design Thinking
            </p>
          </div>
          <div>
            <div className="flex justify-start sm:justify-end lg:gap-32 gap-14">
              <div>
                <div className="flex flex-col gap-4 text-sm">
                  <h5 className="mb-3">About</h5>
                  <div className="text-gray-500/80">
                    <Link href="/about">Bio</Link>
                  </div>
                  <div className="text-gray-500/80">
                    <Link href="/achievements">Awards</Link>
                  </div>
                  <div className="text-gray-500/80">
                    <Link href="/talks">Talks</Link>
                  </div>
                  <div className="text-gray-500/80">
                    <Link href="/resume">Portfolio</Link>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-4 text-sm">
                  <h5 className="mb-3">Contact</h5>
                  <div className="text-gray-500/80">
                    <Link href="/blog">Blog</Link>
                  </div>
                  <div className="text-gray-500/80">
                    <Link href="https://linkedin.com/in/tosinamuda">Linkedin</Link>
                  </div>
                  <div className="text-gray-500/80">
                    <a href="https://github.com/tosinamuda">Github</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b"></div>

        <div className="grid sm:grid-cols-2 text-center sm:text-start gap-6 py-5">
          <div>
            <p className="text-gray-500/80 text-sm">{new Date().getFullYear()} © Tosin Amuda</p>
          </div>

          <div className="flex justify-center sm:justify-end gap-7">
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
