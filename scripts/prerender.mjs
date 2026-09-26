// Runs after `vite build`. Writes one real HTML file per page (dist/features/index.html, ...) with that page's
// own title, description, canonical address and preview tags already in it. Two reasons:
//  1. Google reads the right metadata on the first fetch, without running the JavaScript app.
//  2. A direct link such as /about is answered by a real file, so it works even if the host has no
//     "send every path to index.html" rule.
// The app itself is the same on every page; React takes over as soon as it loads.
//   usage: node scripts/prerender.mjs [distFolder]
import fs from 'node:fs'
import path from 'node:path'
import { PAGES, SITE_URL } from '../src/seo.js'

const dist = path.resolve(process.argv[2] || 'dist')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Replaces exactly one match, or stops the build: a silent no-op here would ship a page with the wrong tags.
function swap(html, pattern, value, label) {
  if (!pattern.test(html)) throw new Error(`prerender: "${label}" was not found in index.html`)
  return html.replace(pattern, () => value)
}

let written = 0
for (const [route, page] of Object.entries(PAGES)) {
  const url = SITE_URL + route
  let html = template
  html = swap(html, /<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`, 'title')
  html = swap(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(page.description)}" />`, 'description')
  html = swap(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`, 'canonical')
  html = swap(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(page.title)}" />`, 'og:title')
  html = swap(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(page.description)}" />`, 'og:description')
  html = swap(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`, 'og:url')
  html = swap(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(page.title)}" />`, 'twitter:title')
  html = swap(html, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${esc(page.description)}" />`, 'twitter:description')
  const file = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html)
  written++
}
console.log(`prerender: wrote ${written} pages`)
