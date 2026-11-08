import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

// Jump to the top of the page whenever a link is clicked.
// Back/forward navigation (POP) is left alone so the browser can
// return visitors to where they were on the previous page.
export default function ScrollToTop() {
  const location = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType !== 'POP') window.scrollTo(0, 0)
  }, [location.key, navigationType])

  return null
}
