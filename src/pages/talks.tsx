import Footer from '@/components/Footer'

const About = () => {
  return (
    <>
      <section className="bg-gradient-to-t from-fuchsia-500/10 lg:pt-28 sm:pb-36 pb-16 pt-36 relative">
        <div className="container">
          <div className="flex justify-center">
            <div className="lg:w-7/12 text-center">
              <h1 className="text-5xl/relaxed text-gray-700">Talks</h1>
              <p className="mb-6 md:text-lg text-gray-500">
                If you’re interested in having me speak at an event you are
                organizing, please send me a message via{' '}
                <a target="_blank" href="https://twitter.com/tosinamuda">
                  Twitter
                </a>
                . I'm always happy to talk about: AI Engineering (Applied LLM &
                Conversational AI), Typescript, Python, Engineering Best
                Practices, and Design Thinking and more. Thanks! 😊
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
          <div className="prose max-w-none">
            <h2 id="upcoming-talks">Upcoming Talks</h2>
            <p></p>
            <table>
              <thead>
                <tr>
                  <td>
                    <strong>Event</strong>
                  </td>
                  <td>
                    <strong>Date</strong>
                  </td>
                  <td>
                    <strong>Talk</strong>
                  </td>
                  <td>
                    <strong>Event Location</strong>
                  </td>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
            <h2 id="past-talks">Past Talks</h2>
            <table>
              <thead>
                <tr>
                  <td>
                    <strong>Event</strong>
                  </td>
                  <td>
                    <strong>Date</strong>
                  </td>
                  <td>
                    <strong>Talk</strong>
                  </td>
                  <td>
                    <strong>Event Location</strong>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a target="_blank" href="https://festival.oscafrica.org/">
                      Open Source Festival 2023
                    </a>
                  </td>
                  <td>16 June, 2023</td>
                  <td>
                    <a
                      target="_blank"
                      href="https://oscafest23.sched.com/event/662ca4f5adfedb9c9521b81f2c40083a"
                    >
                      Sustainability for Developers
                    </a>
                  </td>
                  <td>Lagos, 🇳🇬</td>
                </tr>
                <tr>
                  <td>
                    <a
                      target="_blank"
                      href="https://oscafest22.sched.com/event/yuK5/building-for-cloud-the-12-factor-approach"
                    >
                      Open Source Festival 2022
                    </a>
                  </td>
                  <td>25 March, 2022</td>
                  <td>
                    <a
                      target="_blank"
                      href="https://www.youtube.com/watch?v=9BaVjwqUZME"
                    >
                      Building for Cloud - The 12 Factor Approach
                    </a>
                  </td>
                  <td>Lagos, 🇳🇬</td>
                </tr>
                <tr>
                  <td>
                    <a
                      target="_blank"
                      href="https://www.meetup.com/ibm-developer-lagos/events/274901284/"
                    >
                      IBM Developer
                    </a>
                  </td>
                  <td>03 Dec, 2020</td>
                  <td>
                    <a
                      target="_blank"
                      href="https://www.crowdcast.io/e/deploy-your-first-app"
                    >
                      Deploy your first App with Red Hat Openshift on IBM Cloud
                    </a>
                  </td>
                  <td>Virtual</td>
                </tr>

                <tr>
                  <td>
                    <a target="_blank" href="https://africaaiaccelerator.com">
                      GIZ Africa AI Accelerator
                    </a>
                  </td>
                  <td>04 Dec, 2020</td>
                  <td>AI Fairness 360: Detecting and Mitigating Bias in AI</td>
                  <td>Virtual</td>
                </tr>
                <tr>
                  <td>
                    <a target="_blank" href="https://africaaiaccelerator.com">
                      GIZ Africa AI Accelerator
                    </a>
                  </td>
                  <td>26 Nov, 2020</td>
                  <td>Responsible Machine Learning</td>
                  <td>Virtual</td>
                </tr>

                <tr>
                  <td>
                    <a
                      target="_blank"
                      href="https://www.meetup.com/ibm-developer-lagos/events/274690428/"
                    >
                      IBM Developer
                    </a>
                  </td>
                  <td>24 Nov, 2020</td>
                  <td>
                    <a
                      target="_blank"
                      href="https://www.crowdcast.io/e/ai-nodejs"
                    >
                      Intro to AI in NodeJs
                    </a>
                  </td>
                  <td>Virtual</td>
                </tr>
                <tr>
                  <td>
                    <a target="_blank" href="https://africaaiaccelerator.com">
                      GIZ Africa AI Accelerator
                    </a>
                  </td>
                  <td>19 Nov, 2020</td>
                  <td>Introduction to Devops</td>
                  <td>Virtual</td>
                </tr>

                <tr>
                  <td>
                    <a
                      target="_blank"
                      href="https://www.unodc.org/easternafrica/en/what-we-do/anti-corruption/eastern-africa-youth-block-chain-challenge.html"
                    >
                      UNODC East Africa Hackathon
                    </a>
                  </td>
                  <td>30 Oct, 2020.</td>
                  <td>
                    <a
                      target="_blank"
                      href="https://www.crowdcast.io/e/unodc-ea-hackathon--"
                    >
                      Introduction to Design Thinking
                    </a>
                  </td>
                  <td>Virtual</td>
                </tr>

                <tr>
                  <td>
                    <a
                      target="_blank"
                      href="https://www.meetup.com/ZA-IBMCloud/events/271239126/"
                    >
                      Think Digital Summit Africa
                    </a>
                  </td>
                  <td>24 June, 2020.</td>
                  <td>
                    <a
                      target="_blank"
                      href="https://ibm.6connex.com/event/ThinkDigitalSummitAfrica/"
                    >
                      Building Serverless Web Applications on IBM Cloud
                    </a>
                  </td>
                  <td>Virtual</td>
                </tr>

                <tr>
                  <td>
                    <a
                      target="_blank"
                      href="https://www.facebook.com/UreportNigeria/videos/593027677953710"
                    >
                      UNICEF Nigeria UReport
                    </a>
                  </td>
                  <td>06 April, 2020.</td>
                  <td>
                    <a
                      target="_blank"
                      href="https://www.facebook.com/watch/live/?v=593027677953710"
                    >
                      Building a Chatbot for Covid-19
                    </a>
                  </td>
                  <td>Facebook Live</td>
                </tr>
                <tr>
                  <td>
                    <a
                      target="_blank"
                      href="https://www.eventbrite.com/e/abuja-blockchain-digital-assets-conference-2019-tickets-67571336687"
                    >
                      Blockchain Nigeria User Group
                    </a>
                  </td>
                  <td>4 Oct, 2019</td>
                  <td>
                    Building Blockchain Apps using IBM Blockchain Platform
                  </td>
                  <td>Abuja, 🇳🇬</td>
                </tr>
                <tr>
                  <td>
                    <a
                      target="_blank"
                      href="https://www.meetup.com/JAMStack-Lagos/events/263995250/"
                    >
                      JAMstack Lagos
                    </a>
                  </td>
                  <td>14 Sep, 2019</td>
                  <td>
                    Building Serverless API for JAMStack Web App using IBM Cloud
                    Functions
                  </td>
                  <td>Lagos, 🇳🇬</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default About
