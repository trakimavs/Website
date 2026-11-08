import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Built pages arrive with their HTML already in place (see scripts/build.mjs),
// so React attaches to it. A query string (e.g. /waitlist?board=...) can change
// what the page shows, and the dev server and 404 page send an empty root, so
// those are drawn fresh instead.
if (root.firstElementChild && !window.location.search) {
  hydrateRoot(root, app)
} else {
  root.innerHTML = ''
  createRoot(root).render(app)
}
