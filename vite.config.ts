import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  // Changes on every build, so the Studio iframe never loads a stale cached copy
  // __BUILD_YEAR__ is the footer's copyright year: set once per build, so the
  // pre-rendered page and the browser always agree. It rolls over on the
  // first publish of a new year.
  define: {
    __BUILD_ID__: JSON.stringify(Date.now().toString(36)),
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
})
