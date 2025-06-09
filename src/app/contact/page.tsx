import ContactSection from '@/components/ContactSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Tosin Amuda',
  description: 'Get in touch with Tosin Amuda',
};

export default function Contact() {
  return (
    <div>
      <section className="pt-36 pb-20">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-8">Contact Me</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Let&apos;s discuss anything of interest to you or me
            </p>
          </div>

          <div className="mt-12">
            <img
              src="/images/tosin-profile-pic.png"
              alt="Tosin Amuda"
              className="mx-auto rounded-full w-32 h-32 object-cover mb-8"
            />
          </div>

          <ContactSection />
        </div>
      </section>
    </div>
  );
}
