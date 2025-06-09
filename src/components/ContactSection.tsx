import * as motion from 'motion/react-client';
import { HubSpotForm } from './HubSpotForm';
import { SocialLinks } from './SocialLinks';

export default function ContactSection() {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <h2 className="md:text-3xl text-xl font-semibold my-5">Let&apos;s Talk!</h2>
        <p className="text-slate-700">
          I am open to discussing anything of interest, whether it&apos;s a new idea, a hobby, or a
          topic you&apos;re passionate about.
        </p>
        <p className="text-slate-500 mt-12">Email me at</p>
        <h4>
          <a href="mailto:tosin@tosinamuda.com" className="text-lg font-semibold text-slate-600">
            tosin[at]tosinamuda.com
          </a>
        </h4>
        <div className="mt-12">
          <div className="flex flex-col gap-3">
            <h5 className="text-slate-400">Social</h5>
            <div className="flex gap-5">
              <SocialLinks />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <HubSpotForm />
      </motion.div>
    </div>
  );
}
