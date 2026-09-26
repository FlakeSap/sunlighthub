// What search engines and link previews see for each page. One list, used twice: at build time
// (scripts/prerender.mjs writes a real HTML file per page, so Google gets the right title and
// description without running any JavaScript) and in the browser (App.jsx keeps them right while
// a visitor moves between pages).

export const SITE_URL = 'https://sunovo-laboratories.onrender.com'
export const SITE_NAME = 'Sunovo Labs'

export const PAGES = {
  '/': {
    title: 'Sunovo Labs',
    description: 'Sunovo Labs is the company behind Sunset, SunScript, SunGuard and SunStudy.',
  },
  '/features': {
    title: 'Features — Sunovo Labs',
    description:
      'What the Sunovo Labs site offers: a page for every project we ship, one shared account across all of them, and an AI helper.',
  },
  '/solutions': {
    title: 'Solutions — Sunovo Labs',
    description:
      'One entry per project — Sunset, SunScript and SunGuard — with a link straight in. Everything Sunovo Labs has built, in one list.',
  },
  '/resources': {
    title: 'Resources — Sunovo Labs',
    description:
      'Guides and manuals for Sunset, SunScript, SunGuard and SunStudy: how each one works and what is not obvious the first time you open it.',
  },
  '/about': {
    title: 'About — Sunovo Labs',
    description:
      'About Sunovo Labs, the company behind Sunset, SunScript, SunGuard and SunStudy.',
  },
}

const clean = (pathname) => (pathname || '/').replace(/\/+$/, '') || '/'

export function pageFor(pathname) {
  return PAGES[clean(pathname)] || PAGES['/']
}

export function canonicalFor(pathname) {
  const p = clean(pathname)
  return SITE_URL + (PAGES[p] ? p : '/')
}

// Browser only: keep the tab title, description, canonical address and preview tags in step with
// the page being shown.
export function applyPageMeta(pathname) {
  const page = pageFor(pathname)
  const url = canonicalFor(pathname)
  document.title = page.title
  const set = (selector, attr, value) => {
    const el = document.head.querySelector(selector)
    if (el) el.setAttribute(attr, value)
  }
  set('meta[name="description"]', 'content', page.description)
  set('link[rel="canonical"]', 'href', url)
  set('meta[property="og:title"]', 'content', page.title)
  set('meta[property="og:description"]', 'content', page.description)
  set('meta[property="og:url"]', 'content', url)
  set('meta[name="twitter:title"]', 'content', page.title)
  set('meta[name="twitter:description"]', 'content', page.description)
}
