import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ScrollToTop = () => {
  return (
    <button
      data-toggle="back-to-top"
      className="fixed text-sm rounded-full z-10 bottom-5 end-5 h-9 w-9 text-center bg-primary/20 text-primary flex justify-center items-center"
    >
      <FontAwesomeIcon icon={faArrowUp} className="text-base" />
    </button>
  )
}

export default ScrollToTop
