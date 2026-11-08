import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  // Changes on every build, so the Studio iframe never loads a stale cached copy
  define: { __BUILD_ID__: JSON.stringify(Date.now().toString(36)) },
})
