import Footer from '@/components/Footer'

const About = () => {
  return (
    <>
      <section className="bg-gradient-to-t from-fuchsia-500/10 lg:pt-28 sm:pb-36 pb-16 pt-36 relative">
        <div className="container">
          <div className="flex justify-center">
            <div className="lg:w-7/12 text-center">
              <h1 className="text-5xl/relaxed text-gray-700">About Me</h1>
              <p className="mb-6 md:text-lg text-gray-500">
                This is supposed to be a bio but now a resume. I will work on
                that
              </p>
              <button className="flex items-center justify-center mx-auto mb-6">
                <a
                  href="https://drive.google.com/file/d/1ZBwSPb9yHnBGmgYx57rEwUSRtXZ_emAF/view?usp=sharing"
                  className="inline-flex items-center justify-center rounded text-xs font-semibold border border-primary text-primary hover:shadow-lg hover:bg-primary hover:text-white hover:shadow-primary/30 focus:shadow-none focus:outline focus:outline-primary/40 px-3 py-2 group"
                >
                  Download Resume
                </a>
              </button>
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
            <h3>🔥Summary</h3>
            <p>
              Tosin is a Full Stack Software Engineer at IBM in the global
              Innovation Studio team focused on building demo platform and
              experience for IBM global clients. In his time at IBM, he has
              received several global recognition including Developer Advocate
              Hero Award and a MEA CTO Recognition. He is also an avid design
              thinker who has delivered successful design thinking workshops.
            </p>
            <p>
              Tosin is committed to giving back to the tech community and has
              shared his expertise either through guest lecturing on Cloud &amp;
              AI Development at universities such as Oxford, Surrey, and
              Sheffield Hallam or through Industry Mentorship programs like She
              Code Africa Cloud School Program and GIZ Africa AI Accelerator.
            </p>

            <h3 id="technical-skills">🚀Technical Skills</h3>
            <ul>
              <li>
                Continuous Integration: Jira, Zenhub, Travis, IBM Devops
                Toolchain, Gitlab Pipelines
              </li>
              <li>Test Frameworks: Jest, Chai, Mocha, Selenium</li>
              <li>Source Control: Bitbucket, Git, Github, Gitlab</li>
              <li>
                Languages &amp; Frameworks: Javascript(NodeJs, ES6, ExpressJs,
                Mongoose, NextJS, Socket), PHP Python(Flask), C#{' '}
              </li>
              <li>
                Cloud: IBM Cloud, Google Cloud, Firebase, AWS (EC2, S3, RDS),
                Digitalocean
              </li>
              <li>
                Databases: MySQL, PostgreSQL, MongoDB, Cloudant, Microsoft SQL
              </li>
              <li>Container: Docker, Kubernetes</li>
              <li>Application Servers: Nginx, Apache, Tomcat</li>
            </ul>
            <h3 id="work-experience">👨🏾‍💻Work Experience</h3>
            <h4 id="ibm-lessbrgreater">
              IBM <br />
            </h4>
            <p>Developer &amp; Marketing Specialist, 2019-Till Date </p>
            <ul>
              <li>
                Leading development of demos &amp; Pocs for the Client Center in
                West Africa where I have worked on several demos including
                Chatbots for several industries using IBM Watson Assistant, Node
                Js and Python(Flask) in a continuous delivery fashion to support
                the pre-sales activities
              </li>
              <li>
                Championing the automated testing unit of the MEA Client Center
                development team using Selenium Grid, Selenium Webdriver (NodeJs
                binding), Mocha and MochaAwesome
              </li>
              <li>
                Enabled over 1000 developers at the different sessions on IBM
                Cloud and Watson API to help them build smart application.
              </li>
              <li>
                Leading the agile initiatives of a distributed Middle East &amp;
                Africa Client Center Marketing team to ensure timely continuous
                delivery on all marketing activities.
              </li>
              <li>
                Recognised for my contributions as a Design Thinking Co-Creator
                in helping our clients globally define a clear-cut digital
                transformation strategy in a co-creation manner using Design
                Thinking and particulary accelerating an IBM deal worth $22M
                deal through a design thinking session
              </li>
            </ul>
            <h4 id="atom-lagos-nigeria">ATOM Lagos, Nigeria</h4>
            <p>
              Co-Founder &amp; VP Engineering (Part-Time) April 2017 – Till Date
            </p>
            <ul>
              <li>
                Managing our engineering team and process (PM, Scrum and DevOps)
                delivering several digital products [how-to.ng, zipawoof.com,
                jointly-staging.web.app etc] with agility
              </li>
              <li>
                Setting up continuous delivery pipeline that improved the
                engineering team velocity by more than 15% using Gitlab CI/CD
                and Github Actions
              </li>
              <li>
                Leading architectural designs for all our Cloud-Based Products
                using AWS, DigitalOcean, Firebase and Ably and PubNub with
                emphasis on scale and resiliency.
              </li>
              <li>
                Planned and executed a containerization strategy for all our
                Wordpress-Based application using easy-engine and docker-compose
              </li>
            </ul>
            <h4 id="enye-httpsenyetech-lagos-nigeria">
              ENYE [https://enye.tech] Lagos, Nigeria
            </h4>
            <p>Engineering Mentor Nov 2019 – Jan 2020</p>
            <ul>
              <li>
                Mentoring two teams of software engineers in the Enye Software
                Engineering program on best practices and latest technology and
                practices ranging from CI/CD, Testing, Linting, AirBnB Js
                standard, Serverless Backend and Code Review.
              </li>
              <li>
                Provided architectural and design guide for the development of
                the backend system for a Ethereum-Based blockchain platform.
              </li>
            </ul>
            <h4 id="data-science-nigeria-httpswwwdatasciencenigeriaorg-lagos-nigeria">
              DATA SCIENCE NIGERIA [https://www.datasciencenigeria.org/] Lagos,
              Nigeria
            </h4>
            <p>Software Engineer (Contract) May 2018 – May 2019</p>
            <ul>
              <li>
                Managed &amp; refactored the Java EE backend application
                supporting Marktell app to become stable and reliable.
              </li>
              <li>
                Designed &amp; implemented the cloud-based architecture
                including data model, APIs, server infrastructure suited for a
                data collection and annotation application on AWS which included
                use of Amazon S3, RDS
              </li>
              <li>
                Led the data science student community launch in University of
                Lagos
              </li>
            </ul>
            <h4 id="l5lab-httpsl5labcom-lagos-nigeria">
              L5lab [https://l5lab.com/] Lagos, Nigeria
            </h4>
            <p>Software Engineer (DevOps) May 2016 – Dec. 2017</p>
            <ul>
              <li>
                Designed System Architecture, planned, implemented and managed
                Cloud-based Software application running on Amazon Web Service
                (AWS) leveraging AWS EC2, RDS, Lambda, Route53, S3, EBS and VPC
                services.
              </li>
              <li>
                Modernized legacy Telcoms APIs, back-end services and developed
                new APIs that were integrated with telco systems including VPN,
                SDP, SMSC, EVC which saw increase in availability and
                reliability of the systems using PHP, Flask and Amazon RDS.
              </li>
              <li>
                Beyond daily monitoring, report analysis, log analysis and issue
                escalation, I developed a PowerBI dashboard to provide insights
                on revenue and system data to executives
              </li>
              <li>
                Automated the SMS delivery services using RabbitMQ, Bash Script
                and Linux Cron Jobs
              </li>
              <li>
                Developed mobile apps and APIs that enable apps to make use of
                Telco Billing (Pass.Ng, Kamdora).
              </li>
              <li>
                Planned and executed Cloud Migration Strategy from AWS to
                Digitalocean that saved the business its cloud Consumption cost
                by almost 50%
              </li>
            </ul>
            <h3 id="education-and-training">EDUCATION &amp; TRAINING</h3>
            <p>
              Enye Tech Lagos, Nigeria Full Stack Software Engineering Training
              April 2019 - June 2019
            </p>
            <p>
              University of Lagos Lagos, Nigeria BSc. Computer Science 2009 -
              2014
            </p>
            <ul>
              <li>CGPA: 4.61/5.0 (First Class)</li>
              <li>
                Received Shell National Merit Scholarship for Academic
                Excellence, 2009 – 2014
              </li>
            </ul>
            <h3 id="selected-awards-badges-and-certifications">
              SELECTED AWARDS, BADGES &amp; CERTIFICATIONS
            </h3>
            <ul>
              <li>IBM Developer Kubernetes Badge</li>
              <li>IBM Developer NodeJS Badge</li>
              <li>
                IBM Middle East and Africa Recognition for Innovation Jam, 2020
              </li>
              <li>
                IBM Middle East and Africa Recognition for Technical Speaking,
                2020
              </li>
              <li>
                IBM Academy of Technology Recognition for Developer Advocacy,
                2020
              </li>
              <li>Enterprise Design Thinking for AI Badge</li>
              <li>IBM Blockchain Developer Badge</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default About
