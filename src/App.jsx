import { useState, useEffect } from 'react'
import { Routes, Route, Outlet, Link, useLocation } from 'react-router-dom'
import './App.css'
import { MENU } from './content'
import { applyPageMeta } from './seo'
import { useTheme } from './useTheme'
import { useAuth } from './useAuth'
import { Nav } from './Nav'
import { AuthModal } from './AuthModal'
import { ChatWidget } from './ChatWidget'
import { SiteLink } from './ui'
import { Home } from './pages/Home'
import { Features } from './pages/Features'
import { Solutions } from './pages/Solutions'
import { Resources } from './pages/Resources'
import { About } from './pages/About'

function Footer({ theme, onToggleTheme }) {
  return (
    <footer className="site-footer">
      <div className="footer-cols">
        {MENU.map((item) => {
          // The same links as the top bar, once each.
          const seen = new Set()
          const links = [...item.explore, ...item.groups.flatMap((g) => g.links)].filter((l) => {
            const k = l.label + (l.to || l.href || l.action)
            if (seen.has(k)) return false
            seen.add(k)
            return true
          })
          return (
            <div className="footer-col" key={item.key}>
              <p className="footer-title">{item.label}</p>
              <ul>
                {links.map((l) => (
                  <li key={l.label + (l.to || l.href || l.action)}>
                    <SiteLink link={l} className="footer-link" />
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
      <div className="footer-bottom">
        <Link to="/" className="footer-brand">
          <span aria-hidden="true">&#9728;</span> Sunovo Labs
        </Link>
        <p className="footer-copy">Sunovo Labs © 2026 · Built one project at a time.</p>
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          <span aria-hidden="true">{theme === 'dark' ? '☀' : '☽'}</span>
          {theme === 'dark' ? 'Light theme' : 'Dark theme'}
        </button>
      </div>
    </footer>
  )
}

function Layout() {
  const [theme, toggleTheme] = useTheme()
  const auth = useAuth()
  const [authOpen, setAuthOpen] = useState(false)
  const { pathname, hash } = useLocation()

  return (
    <div id="page">
      <Nav key={pathname + hash} auth={auth} onOpenAuth={() => setAuthOpen(true)} />
      <ChatWidget />
      <main>
        <Outlet />
      </main>
      <Footer theme={theme} onToggleTheme={toggleTheme} />
      {authOpen && <AuthModal auth={auth} onClose={() => setAuthOpen(false)} />}
    </div>
  )
}

// New page: back to the top. A #section link: scroll to that section once the
// page has rendered it (a client-side route change does not do this by itself).
function RouteEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    applyPageMeta(pathname)
  }, [pathname])
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    const timer = setInterval(() => {
      const el = document.getElementById(id)
      if (el || ++tries > 30) {
        clearInterval(timer)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 40)
    return () => clearInterval(timer)
  }, [pathname, hash])
  return null
}

function App() {
  return (
    <>
      <RouteEffects />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
