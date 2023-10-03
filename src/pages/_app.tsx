
import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { config } from '@fortawesome/fontawesome-svg-core'
import NavBar from '@/components/NavBar'
import ScrollToTop from '@/components/ScrollToTop'

import AOS from 'aos'
import 'normalize.css'
import 'aos/dist/aos.css'
import '../../public/styles/global.css'
import '@frostui/tailwindcss'
import '@fortawesome/fontawesome-svg-core/styles.css'


config.autoAddCss = false

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter()

  useEffect(() => {
    AOS.init({
      duration: 400,
      once: false,
    })

    // Handle mobile menu
    const handleMobileMenu = () => {
      const currentURL = window.location.href.split(/[?#]/)[0]
      const mobileNavLinks = document.querySelectorAll(
        '#mobileMenu .navbar-nav a'
      )

      mobileNavLinks.forEach((element) => {
        if (element instanceof HTMLAnchorElement) {
          const link = element
          if (link.href === currentURL) {
            link.classList.add('active')
            const parentElement =
              link?.parentElement?.parentElement?.parentElement

            if (parentElement?.classList.contains('nav-item')) {
              const collapseElement = parentElement.querySelector(
                '[data-fc-type="collapse"]'
              )
              collapseElement?.classList.add('active')
              //@ts-ignore
              if (collapseElement && window.frost) {
                // Assuming frost.Collapse.getInstanceOrCreate() is a valid method
                //@ts-ignore
                window.frost.Collapse.getInstanceOrCreate(
                  collapseElement
                ).show()
              }

              if (link.parentElement && link.parentElement.style) {
                link.parentElement.style.height = ''
              }
            }
          }
        }
      })
    }

    handleMobileMenu()

    // Handle navbar links
    const handleNavbarLinks = () => {
      const currentURL = window.location.href.split(/[?#]/)[0]
      const navbarLinks = document.querySelectorAll('#navbar .navbar-nav a')

      navbarLinks.forEach((element) => {
        if (element instanceof HTMLAnchorElement) {
          const link = element
          if (link.href === currentURL) {
            link.classList.add('active')
            const parentElement =
              link?.parentElement?.parentElement?.parentElement

            if (parentElement?.classList.contains('nav-item')) {
              parentElement
                .querySelector('[data-fc-type="dropdown"]')
                ?.classList.add('active')
            }
          }
        }
      })
    }

    handleNavbarLinks()

    // Handle sticky navbar
    const handleStickyNavbar = () => {
      const navbar = document.getElementById('navbar')

      window.addEventListener('scroll', (event) => {
        event.preventDefault()

        if (navbar) {
          if (
            75 <= document.body.scrollTop ||
            75 <= document.documentElement.scrollTop
          ) {
            navbar.classList.add('nav-sticky')
          } else {
            navbar.classList.remove('nav-sticky')
          }
        }
      })
    }

    handleStickyNavbar()

    // Handle "Back to Top" button
    const handleBackToTop = () => {
      const backToTopBtn = document.querySelector('[data-toggle="back-to-top"]')

      window.addEventListener('scroll', () => {
        if (72 < window.pageYOffset) {
          backToTopBtn?.classList.add('flex')
          backToTopBtn?.classList.remove('hidden')
        } else {
          backToTopBtn?.classList.remove('flex')
          backToTopBtn?.classList.add('hidden')
        }
      })

      backToTopBtn &&
        backToTopBtn.addEventListener('click', (event) => {
          event.preventDefault()
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        })
    }

    handleBackToTop()

    // Typewriter effect (you need to have elements with the 'typewrite' class and appropriate data attributes)
    const initTypewriters = () => {
      class Typewriter {
        el: HTMLElement
        period: number
        txt: string
        isDeleting: boolean
        loopNum: number
        toRotate: string[]

        constructor(el: HTMLElement, toRotate: string[], period: string) {
          this.toRotate = toRotate
          this.el = el
          this.loopNum = 0
          this.period = parseInt(period, 10) || 2000
          this.txt = ''
          this.tick()
          this.isDeleting = false
        }

        tick() {
          const i = this.loopNum % this.toRotate.length
          const fullTxt = this.toRotate[i]

          if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1)
          } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1)
          }

          this.el.innerHTML = `<span class="wrap">${this.txt}</span>`

          let delta = 200 - Math.random() * 100

          if (this.isDeleting) {
            delta /= 2
          }

          if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period
            this.isDeleting = true
          } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false
            this.loopNum++
            delta = 500
          }

          setTimeout(() => {
            this.tick()
          }, delta)
        }
      }

      const typewriteElements = document.getElementsByClassName('typewrite')

      for (let i = 0; i < typewriteElements.length; i++) {
        const element = typewriteElements[i]
        const toRotate = JSON.parse(element.getAttribute('data-type') || '[]')
        const period = element.getAttribute('data-period')
        if (toRotate) {
          new Typewriter(element as HTMLElement, toRotate, period || '2000')
        }
      }
    }

    initTypewriters()
  }, [asPath])
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <ScrollToTop />
    </>
  )
}
