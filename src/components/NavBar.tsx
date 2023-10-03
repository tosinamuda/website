import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface NavBarProps {
  darkMode?: boolean
}
const NavBar = (p: NavBarProps) => {
  const { asPath } = useRouter()

  const darkModeClass = asPath == '/blog' ? 'dark' : 'light'

  return (
    <>
      <Head>
        <title>Tosin Amuda</title>
      </Head>
      <header
        id="navbar"
        className={`${darkModeClass} fixed top-0 inset-x-0 flex items-center z-40 w-full lg:bg-transparent bg-white transition-all py-5`}
      >
        <div className="container">
          <nav className="flex items-center">
            <Link href="/">
              <img
                src="/images/tosin.svg"
                className="h-8 dark:block logo-dark"
                alt="Logo Dark"
              />
              <img
                src="/images/tosin.svg"
                className="h-8  dark:hidden logo-light"
                alt="Logo Light"
              />
            </Link>

            <div className="hidden lg:block ms-auto">
              <ul className="navbar-nav flex gap-x-3 items-center justify-center">
                <li className="nav-item">
                  <Link className="nav-link" href="/">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link href="/blog" className="nav-link">
                    Blog
                  </Link>
                </li>

                <li className="nav-item">
                  <a
                    href="#"
                    className="nav-link after:absolute hover:after:-bottom-10 after:inset-0 fc-dropdown"
                    data-fc-trigger="hover"
                    data-fc-target="innerPageDropdownMenu"
                    data-fc-type="dropdown"
                    data-fc-placement="bottom"
                  >
                    About{' '}
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className="ms-2 align-middle"
                    />
                  </a>

                  <div
                    id="innerPageDropdownMenu"
                    className="opacity-0 mt-4 fc-dropdown-open:opacity-100 fc-dropdown-open:translate-y-0 translate-y-3 origin-center transition-all bg-white rounded-lg shadow-lg border p-2 w-48 space-y-1.5 fc-dropdown absolute hidden"
                    style={{
                      left: '936.445px',
                      top: '58px',
                    }}
                  >
                    <div className="nav-item">
                      <Link className="nav-link" href="/about">
                        Bio
                      </Link>
                    </div>

                    <div className="nav-item">
                      <Link className="nav-link" href="/achievements">
                        Awards
                      </Link>
                    </div>

                    <div className="nav-item">
                      <Link className="nav-link" href="/talks">
                        Talks
                      </Link>
                    </div>

                    <div className="nav-item">
                      <Link className="nav-link" href="/resume">
                        Portfolio
                      </Link>
                    </div>
                  </div>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    target="_blank"
                    href="https://drive.google.com/file/d/1ZBwSPb9yHnBGmgYx57rEwUSRtXZ_emAF/view?usp=sharing"
                  >
                    Resume
                  </Link>
                </li>
              </ul>
            </div>

            <div className="hidden lg:flex items-center ms-3">
              <Link
                href="/contact"
                className="bg-primary text-white px-4 py-2 rounded inline-flex items-center text-sm"
              >
                Let's Talk
              </Link>
            </div>

            <div className="lg:hidden flex items-center ms-auto px-2.5">
              <button
                type="button"
                data-fc-target="mobileMenu"
                data-fc-type="offcanvas"
              >
                <FontAwesomeIcon icon={faBars} stroke="#6b7280" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div
        id="mobileMenu"
        className="fc-offcanvas-open:translate-x-0 translate-x-full fixed top-0 end-0 transition-all duration-200 transform h-full w-full max-w-md z-50 bg-white border-s hidden fc-offcanvas"
      >
        <div className="flex flex-col h-full divide-y-2 divide-gray-200">
          <div className="p-6 flex items-center justify-between">
            <a href="index.html">
              <img src="/images/tosin.svg" className="h-8" alt="Logo" />
            </a>

            <button data-fc-dismiss="" className="flex items-center px-2">
              <FontAwesomeIcon icon={faXmark} className="text-xl" />
            </button>
          </div>

          <div className="p-6 overflow-scroll h-full">
            <ul
              className="navbar-nav flex flex-col gap-2"
              data-fc-type="accordion"
            >
              <li className="nav-item">
                <Link href="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link href="/blog" className="nav-link">
                  Blog
                </Link>
              </li>

              <li className="nav-item">
                <a
                  href="#"
                  data-fc-type="collapse"
                  className="nav-link fc-collapse"
                >
                  About{' '}
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    className="ms-auto align-middle transition-all fc-collapse-open:rotate-180"
                  />
                </a>

                <ul
                  className="hidden overflow-hidden transition-[height] duration-300 space-y-2"
                  style={{
                    height: '0px',
                  }}
                >
                  <li className="nav-item mt-2">
                    <Link className="nav-link" href="/about">
                      Bio
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="/achievements">
                      Awards
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="/talks">
                      Talks
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="/resume">
                      Portfolios
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="https://drive.google.com/file/d/1ZBwSPb9yHnBGmgYx57rEwUSRtXZ_emAF/view?usp=sharing"
                  target="_blank"
                >
                  Resume
                </Link>
              </li>
            </ul>
          </div>

          <div className="p-6 flex items-center justify-center">
            <Link
              href="/contact"
              className="bg-primary w-full text-white p-3 rounded flex items-center justify-center text-sm"
            >
              Let's Talk
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar
