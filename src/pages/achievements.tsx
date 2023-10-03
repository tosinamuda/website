import Footer from '@/components/Footer'

const About = () => {
  return (
    <>
      <section className="bg-gradient-to-t from-fuchsia-500/10 lg:pt-28 sm:pb-36 pb-16 pt-36 relative">
        <div className="container">
          <div className="flex justify-center">
            <div className="lg:w-7/12 text-center">
              <h1 className="text-5xl/relaxed text-gray-700">
                Awards and Achievements
              </h1>
              <p className="mb-6 md:text-lg text-gray-500">
                This is a personal repository of my previous wins and positive
                moments. Small wins, big wins, all to remind myself how awesome
                I am 😊
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
            <table>
              <thead>
                <tr>
                  <td>
                    <strong>Programs</strong>
                  </td>
                  <td>
                    <strong>Date</strong>
                  </td>
                  <td>
                    <strong>Achievements</strong>
                  </td>
                  <td>
                    <strong>Links</strong>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a
                      target="_blank"
                      href="https://tcblodge.wordpress.com/2015/12/13/icteducational-cds-hosts-taraba-state-first-hour-of-code/?fbclid=IwAR3dos8jPEmIPg-nxwVv7KDezsZnzGWjRjvcU6qix28hrQZQTeckTSUODro"
                    >
                      Hour of Code
                    </a>
                  </td>
                  <td>09 Dec, 2015</td>
                  <td>
                    Led the ICT group during my national service that organised
                    the first hour of code in Taraba State, an initiative to
                    introduce over 20 high school students to programming
                  </td>
                  <td>
                    <a href="https://www.tarabafacts.com.ng/2015/12/icteducational-cds-hosts-taraba-state.html">
                      Blog Report
                    </a>
                  </td>
                </tr>

                <tr>
                  <td>
                    <a
                      target="_blank"
                      href="https://thenationonlineng.net/mtn-surprises-lagos-don/"
                    >
                      MTN Season of Surprise Winner
                    </a>
                  </td>
                  <td>05 Feb, 2015</td>
                  <td>
                    Led the Campaign Team that won the MTN Season of Surprise
                    for a faculty member in Nigeria University
                  </td>
                  <td>
                    <a href="https://www.lindaikejisblog.com/2015/02/photos-mtn-surprises-unilag-professor.html">
                      Blog Report
                    </a>
                  </td>
                </tr>

                <tr>
                  <td>Jumia Customer of the Month</td>
                  <td>30 Sep, 2014</td>
                  <td>
                    Won the Jumia Nigeria September 2014 Customer of the Month
                  </td>
                  <td>
                    <a href="https://www.facebook.com/jumia.com.ng/photos/a.704481062963353/704481126296680">
                      Jumia Facebook
                    </a>
                  </td>
                </tr>

                <tr>
                  <td>
                    <a
                      target="_blank"
                      href="http://gsl-archive.mit.edu/accounts/601/"
                    >
                      MIT Global Startup Lab
                    </a>
                  </td>
                  <td>25 Jun, 2012</td>
                  <td>
                    Selected for the MIT Global Startup Lab Accelerator in
                    Nigeria Summer of 2012
                  </td>
                  <td>
                    <a href="http://gsl-archive.mit.edu/project/58/">
                      Program Page
                    </a>
                  </td>
                </tr>

                <tr>
                  <td>
                    <a target="_blank">Shell University Scholarship Award</a>
                  </td>
                  <td>10 June, 2011.</td>
                  <td>
                    Won the 2009/2010 Shell University Scholarship Award which
                    lasted throughout my undergraduate
                  </td>
                  <td>N/A</td>
                </tr>

                <tr>
                  <td>
                    <a
                      target="_blank"
                      href="https://corporate.exxonmobil.com/Locations/Nigeria/Educational-initiatives-in-Nigeria#EEPNLScholarshipAwards"
                    >
                      NNPC/MPN/STAN National Quiz
                    </a>
                  </td>
                  <td>02 Sep, 2008</td>
                  <td>
                    Won the Best Science Student in Nigeria Award at the Science
                    Teacher Association of Nigeria National Quiz
                  </td>
                  <td>
                    <a href="https://allafrica.com/stories/200809020340.html">
                      Thisday Newspaper
                    </a>
                  </td>
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
