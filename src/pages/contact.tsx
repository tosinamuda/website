import React from 'react'
import { GetStaticProps } from 'next'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

import { FeaturedPost, BlogCTA, BlogCard } from '@/components/blog'
import { HubSpotForm } from '@/components/ContactSection'

const Contact = () => {
  return (
    <>
      <section className="bg-gradient-to-t from-fuchsia-500/10 lg:pt-28 sm:pb-36 pb-16 pt-36 relative">
        <div className="container">
          <div className="flex justify-center">
            <div className="lg:w-7/12 text-center">
              <h1 className="text-5xl/relaxed text-gray-700">Contact Us</h1>
              <p className="mb-6 md:text-lg text-gray-500">
                Please fill out the following form and we will get back to you
                shortly
              </p>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-1 w-full">
          <img className="w-full h-full" src="/images/svg/shape.svg" />
        </div>
      </section>

      <section className="lg:pb-24 py-6 relative">
        <div className="container">
          <div className="lg:flex align-items-center">
            <div className="lg:w-1/2">
              <div className="mb-6 relative bg-clip-border rounded-[0.1875rem]">
                <div className="py-12">
                  <h2 className="mb-4 text-2xl/6 mt-0 font-medium">
                    Let's Talk Further
                  </h2>
                  <p className="mb-12 text-base/6">
                    Please fill out the following form and I will get back to
                    you shortly
                  </p>
                  <HubSpotForm />
                </div>
              </div>
            </div>

            <div className="lg:w-5/12 ms-auto overflow-x-hidden">
              <div className="h-[520px]">
                <div
                  id="marker-map5"
                  className="h-100"
                  data-toggle="map"
                  data-map='{"mapCenter": [40.749179, -73.989276], "zoom": 12, "useTextIcon": false, "interactive": true, "geojson": "/assets/sample-listing-geojson.json" }'
                >
                  <div
                    data-aos="fade-up"
                    data-aos-duration="500"
                    className="aos-init aos-animate"
                  >
                    <img
                      src="images/tosin-profile-pic.png"
                      className="lg:ms-auto lg:me-0 mx-auto z-10 relative"
                    />
                  </div>
                  {/* <iframe
                    className="w-full h-[500px]"
                    src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d6030.418742494061!2d-111.34563870463673!3d26.01036670629853!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2smx!4v1471908546569"
                    frameborder="0"
                  ></iframe> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Contact
