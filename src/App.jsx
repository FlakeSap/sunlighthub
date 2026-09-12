import { useEffect, useState } from 'react'
import './App.css'
import { useReveal } from './useReveal'

const projects = [
  {
    id: 'sunset',
    name: 'Sunset',
    year: '2026',
    status: 'live',
    tagline: 'One AI companion, two moods.',
    description:
      'Chat with Sunset or Sunshine — two personas, one AI companion — from the web, or right from the sidebar in VS Code without leaving the editor.',
    tags: ['Web App', 'VS Code Extension'],
    links: [{ label: 'Open Sunset', href: 'https://sunset-public.onrender.com' }],
  },
]

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('sunlight-theme') || 'system'
    } catch {
      return 'system'
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', theme)
    }
    try {
      localStorage.setItem('sunlight-theme', theme)
    } catch {
      // ignore
    }
  }, [theme])

  const toggle = () => {
    setTheme((current) => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const effectiveIsDark = current === 'dark' || (current === 'system' && prefersDark)
      return effectiveIsDark ? 'light' : 'dark'
    })
  }

  return [theme, toggle]
}

function useScrolled(threshold = 400) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

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

function Hero() {
  return (
    <section className="hero">
      <nav className="hero-nav">
        <span className="hero-nav-mark">
          <span aria-hidden="true">&#9728;</span> Sunlight
        </span>
      </nav>
      <div className="hero-center">
        <div className="hero-word-wrap">
          <span className="hero-word hero-word-glow" aria-hidden="true">
            Sunlight
          </span>
          <h1 className="hero-word">Sunlight</h1>
        </div>
        <p className="hero-tagline">Everything we've built, in one place.</p>
      </div>
      <div className="hero-scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  )
}

function GiantReveal({ word, line }) {
  const [ref, visible] = useReveal()
  return (
    <section className={`giant ${visible ? 'is-visible' : ''}`} ref={ref}>
      <h2 className="giant-word">{word}</h2>
      <p className="giant-line">{line}</p>
    </section>
  )
}

function StatusBadge({ status }) {
  const label = status === 'live' ? 'Live' : 'In progress'
  return <span className={`status status-${status}`}>{label}</span>
}

function ProjectCard({ project, index }) {
  const [ref, visible] = useReveal()
  return (
    <article
      ref={ref}
      className={`project-card ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="project-card-top">
        <h3>{project.name}</h3>
        <StatusBadge status={project.status} />
      </div>
      <p className="tagline">{project.tagline}</p>
      <p className="description">{project.description}</p>
      <div className="tags">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="card-footer">
        <span className="year">{project.year}</span>
        <div className="links">
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              {link.label} &rarr;
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}

function PlaceholderCard({ index }) {
  const [ref, visible] = useReveal()
  return (
    <article
      ref={ref}
      className={`project-card project-card-placeholder ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <h3>What&apos;s next?</h3>
      <p className="description">New projects land here as we build them.</p>
    </article>
  )
}

function ProjectsSection() {
  const [headerRef, headerVisible] = useReveal()
  return (
    <section className="projects-section">
      <div ref={headerRef} className={`projects-header ${headerVisible ? 'is-visible' : ''}`}>
        <h2>The projects</h2>
        <p>Every one we've shipped, growing one card at a time.</p>
      </div>
      <div className="project-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
        <PlaceholderCard index={projects.length} />
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="hub-footer">
      <p>Built one project at a time, since 2026.</p>
    </footer>
  )
}

function App() {
  const [theme, toggleTheme] = useTheme()

  return (
    <div id="page">
      <Atmosphere />
      <FloatingDock theme={theme} onToggleTheme={toggleTheme} />
      <Hero />
      <GiantReveal word="BUILD." line="Start with an idea, end with something real." />
      <GiantReveal word="SHIP." line="Push it out into the world, warts and all." />
      <GiantReveal word="SHINE." line="Let it stand on its own, and start the next one." />
      <ProjectsSection />
      <Footer />
    </div>
  )
}

export default App
