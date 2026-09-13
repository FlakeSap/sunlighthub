import { useState, useEffect } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import './App.css'
import { useTheme } from './useTheme'
import { useAuth } from './useAuth'
import { useScrolled } from './useScrolled'
import { Nav } from './Nav'
import { AuthModal } from './AuthModal'
import { ChatWidget } from './ChatWidget'
import { Home } from './pages/Home'
import { Features } from './pages/Features'
import { Solutions } from './pages/Solutions'
import { Resources } from './pages/Resources'
import { About } from './pages/About'

function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="glow-orb glow-orb-3" />
    </div>
  )
}

function FloatingDock({ theme, onToggleTheme }) {
  const scrolled = useScrolled()
  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <div className="dock">
      <button
        type="button"
        className="dock-btn"
        onClick={onToggleTheme}
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {isDark ? '☀' : '☽'}
      </button>
      <button
        type="button"
        className={`dock-btn dock-btn-top ${scrolled ? 'dock-btn-visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        title="Back to top"
        tabIndex={scrolled ? 0 : -1}
      >
        &uarr;
      </button>
    </div>
  )
}

function Footer() {
  return (
    <footer className="hub-footer">
      <p>Built one project at a time, since 2026.</p>
    </footer>
  )
}

function Layout() {
  const [theme, toggleTheme] = useTheme()
  const auth = useAuth()
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <div id="page">
      <Atmosphere />
      <Nav auth={auth} onOpenAuth={() => setAuthOpen(true)} />
      <FloatingDock theme={theme} onToggleTheme={toggleTheme} />
      <ChatWidget />
      <Outlet />
      <Footer />
      {authOpen && <AuthModal auth={auth} onClose={() => setAuthOpen(false)} />}
    </div>
  )
}

function ScrollToTop() {
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0)
  })
  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
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
