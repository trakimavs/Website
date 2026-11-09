// Builds the site, then saves every page as finished HTML so search engines and
// AI tools can read it without running JavaScript. Also writes the 404 page,
// sitemap.xml, robots.txt and llms.txt. Run with: npm run build
import { build } from 'vite'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrOut = join(root, 'dist-ssr')

// One id for both builds, so the browser and the built HTML agree.
const define = { __BUILD_ID__: JSON.stringify(Date.now().toString(36)) }

await build({ root, define, logLevel: 'warn' })
await build({
  root,
  define,
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir: ssrOut, emptyOutDir: true },
})

const { render, pageMeta, allPaths, SITE_URL, boards, organization } = await import(
  pathToFileURL(join(ssrOut, 'entry-server.js')).href
)

const template = await readFile(join(dist, 'index.html'), 'utf8')

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function head(meta, { noindex = false } = {}) {
  const url = `${SITE_URL}${meta.path === '/' ? '/' : meta.path}`
  const image = `${SITE_URL}${meta.image}`
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    noindex ? `<meta name="robots" content="noindex" />` : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="Mavrikis Designs" />`,
    `<meta property="og:locale" content="en_ZA" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="${esc(meta.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    // Every page names the business, so the "creator" links on board pages resolve
    ...[
      ...(meta.found && !meta.jsonLd.some((d) => d['@type'] === 'Organization') ? [organization] : []),
      ...meta.jsonLd,
    ].map(
      (data) =>
        `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`,
    ),
  ]
  return tags.join('\n    ')
}

function page(meta, appHtml, opts) {
  return template
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, head(meta, opts))
    .replace('<!--app-html-->', appHtml)
}

async function write(file, contents) {
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, contents)
}

const paths = allPaths()
for (const path of paths) {
  const html = page(pageMeta(path), render(path))
  if (path === '/') {
    await write(join(dist, 'index.html'), html)
  } else {
    // GitHub Pages serves /about from about.html; the folder copy covers /about/
    await write(join(dist, `${path.slice(1)}.html`), html)
    await write(join(dist, path.slice(1), 'index.html'), html)
  }
}

// 404: an empty shell the browser fills in, kept out of search results
await write(join(dist, '404.html'), page(pageMeta('/404'), '', { noindex: true }))

const today = new Date().toISOString().slice(0, 10)
await write(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map((p) => `  <url><loc>${SITE_URL}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')}
</urlset>
`,
)

const aiBots = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
]
await write(
  join(dist, 'robots.txt'),
  `# Search engines and AI assistants are welcome to read this site.
User-agent: *
Allow: /

${aiBots.map((bot) => `User-agent: ${bot}\nAllow: /`).join('\n\n')}

Sitemap: ${SITE_URL}/sitemap.xml
`,
)

// A plain-text summary for AI tools (https://llmstxt.org)
await write(
  join(dist, 'llms.txt'),
  `# Mavrikis Designs

> Handcrafted Tavli (backgammon) boards, made one at a time by a single maker in Gauteng, South Africa. Solid Kiaat wood, hand-poured resin points, hand-turned pieces and custom laser engravings. Boards are made to order; there is a waitlist for future work and custom commissions.

- Website: ${SITE_URL}/
- Instagram: https://www.instagram.com/mavrikisdesigns/
- Contact: mavrikisdesigns@gmail.com, or the waitlist form at ${SITE_URL}/waitlist

## Pages

- [The Collection](${SITE_URL}/collection): every board made so far
- [About](${SITE_URL}/about): the maker's story, starting with Pappou's handmade board
- [Waitlist](${SITE_URL}/waitlist): join the waitlist or ask about a commission
- [Studio](${SITE_URL}/studio): design your own board online
- [Questions](${SITE_URL}/faq): materials, commissions, ordering and delivery

## Boards

${boards
  .map(
    (b) =>
      `- [${b.name}](${SITE_URL}/collection/${b.id}): ${b.tagline}. ${b.style}, ${b.year}. ${b.available ? 'Available.' : 'Sold.'}`,
  )
  .join('\n')}
`,
)

await rm(ssrOut, { recursive: true, force: true })
console.log(`Built ${paths.length} pages, 404.html, sitemap.xml, robots.txt and llms.txt`)
