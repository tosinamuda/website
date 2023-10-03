import { useEffect } from 'react'
import Link from 'next/link'

export const HubSpotForm = () => {
  useEffect(() => {
    // Load the HubSpot form script
    const script = document.createElement('script')
    script.charset = 'utf-8'
    script.type = 'text/javascript'
    script.src = '//js-eu1.hsforms.net/forms/embed/v2.js'
    document.body.appendChild(script)

    script.addEventListener('load', () => {
      // @TS-ignore
      if (window.hbspt) {
        // @TS-ignore
        window.hbspt.forms.create({
          region: 'eu1',
          portalId: '143399522',
          formId: '4414ec34-6bb9-498d-9490-af8f457b8e47',
          target: '#hubspot-form',
        })
      }
    })

    // Clean up: remove the script when the component unmounts
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return <div id="hubspot-form" className="w-full"></div>
}

export default function ContactSection({}) {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
      <div data-aos="fade-up" data-aos-duration="600" className="aos-init">
        <h2 className="md:text-3xl text-xl font-semibold my-5">Let's Talk!</h2>
        <p className="text-slate-700">
          I am open to discuss your next project, improve user experience of an
          existing one or help with your UX/UI design challenges.
        </p>
        <p className="text-slate-500 mt-12">Email me at</p>
        <h4>
          <a
            href="mailto:tosin@tosinamuda.com"
            className="text-lg font-semibold text-slate-600"
          >
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
      </div>

      <div data-aos="fade-up" data-aos-duration="900" className="aos-init">
        <HubSpotForm />
      </div>
    </div>
  )
}

export function SocialLinks({}) {
  return (
    <>
      {' '}
      <div>
        <Link href="/">
          <img src="/images/svg/web.svg" className="w-7 h-7" />
        </Link>
      </div>
      <div>
        <Link href="https://linkedin.com/in/tosinamuda">
          <img src="/images/svg/linkedin.svg" className="w-7 h-7" />
        </Link>
      </div>
      <div>
        <Link href="https://x.com/tosinamuda">
          <img src="/images/svg/twitter.svg" className="w-7 h-7" />
        </Link>
      </div>
      <div>
        <Link href="https://github.com/tosinamuda">
          <img src="/images/svg/github.svg" className="w-7 h-7" />
        </Link>
      </div>
    </>
  )
}
