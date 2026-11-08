import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { pageMeta, SITE_URL } from '../seo'

// Each page's HTML is built with the right <head> (scripts/build.mjs). When a
// visitor then moves between pages in the browser, this keeps the tab title,
// description and canonical link in step with the page on screen.
function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

export default function PageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = pageMeta(pathname)
    const url = `${SITE_URL}${meta.path === '/' ? '/' : meta.path}`
    document.title = meta.title
    setMeta('meta[name="description"]', 'content', meta.description)
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:title"]', 'content', meta.title)
    setMeta('meta[property="og:description"]', 'content', meta.description)
    setMeta('meta[property="og:url"]', 'content', url)
  }, [pathname])

  return null
}
