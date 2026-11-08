// Used only at build time by scripts/build.mjs to turn each page into HTML.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { AppShell } from './App'

export { pageMeta, allPaths, SITE_URL, organization } from './seo'
export { boards } from './data/boards'

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppShell />
    </StaticRouter>,
  )
}
