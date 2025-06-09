import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Tosin Amuda',
  description: 'Learn more about Tosin Amuda - Software Engineer, Product Engineer & AI Engineer',
};

export default function About() {
  return (
    <div>
      <section className="pt-36 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              About Me
            </h1>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12 items-start">
              {/* Profile Image */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <img
                    src="/images/tosin-profile-pic.png"
                    alt="Tosin Amuda"
                    className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl"
                  />
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-800">Tosin Amuda</h3>
                    <p className="text-purple-600 font-medium">Software Engineer at IBM</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Official Bio */}
                <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-8 shadow-lg border border-purple-100">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="w-2 h-8 bg-gradient-to-b from-purple-600 to-fuchsia-600 rounded-full mr-3"></span>
                    Official Bio
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Tosin is a software developer on IBM&apos;s Showcase Team, where he builds
                      interactive AI experiences to help clients envision what is possible with IBM
                      technologies. A first-class Computer Science graduate of the University of
                      Lagos, Nigeria, Tosin actively bridges industry and academia.
                    </p>
                    <p>
                      He has delivered guest lectures on Cloud and AI development at institutions
                      including the University of Oxford, the University of Surrey, and Sheffield
                      Hallam University. Tosin previously volunteered as a mentor with the She Code
                      Africa Cloud School Program and the GIZ Africa AI Accelerator, supporting
                      emerging developers and students to build practical technology skills.
                    </p>
                  </div>
                </div>

                {/* Personal Introduction */}
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="w-2 h-8 bg-gradient-to-b from-purple-600 to-fuchsia-600 rounded-full mr-3"></span>
                    My Journey
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      I am currently a Software Engineer, but my journey has been much broader.
                      I&apos;ve been a tech generalist with a wealth of experience in engineering,
                      digital marketing, design thinking, and startup operations. I am more than
                      just a title; I am passionate about building tech products and teams that
                      drive innovation and impact.
                    </p>
                    <p>
                      Currently, I focus on Software Engineering, Product Engineering, AI
                      Engineering, Product Analytics, and Design Thinking. I am passionate about
                      building tech products and teams that drive innovation and impact, applying
                      product thinking to meet stakeholders&apos; and users&apos; needs while
                      leveraging AI to enrich user experiences.
                    </p>
                  </div>
                </div>

                {/* Skills & Expertise */}
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="w-2 h-8 bg-gradient-to-b from-purple-600 to-fuchsia-600 rounded-full mr-3"></span>
                    Areas of Expertise
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-gray-700">Software Engineering</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-gray-700">AI Engineering</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-gray-700">Product Engineering</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-fuchsia-600 rounded-full"></div>
                        <span className="text-gray-700">Design Thinking</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-fuchsia-600 rounded-full"></div>
                        <span className="text-gray-700">Product Analytics</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-fuchsia-600 rounded-full"></div>
                        <span className="text-gray-700">Digital Marketing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
