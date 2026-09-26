import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NEWS, PROJECTS, SUNSET_URL, WINDOWS_URL, askHelper } from '../content'
import { ArrowUpRight } from '../ui'

const PROMPTS = [
  'What is Sunovo Labs?',
  'Which project should I try first?',
  'What does Sunset do?',
  'How do I get Sunset for Windows?',
]

// ---------- generated art (no image files, nothing fetched) ----------

function seeded(seed) {
  let a = seed | 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// A field of stars with a two-armed spiral of them, and a low sun glowing at the
// corner. Built once per seed, so every render draws the same sky.
function buildSky(seed) {
  const rnd = seeded(seed)
  const stars = []
  for (let i = 0; i < 230; i++) {
    stars.push({ x: rnd() * 1000, y: rnd() * 560, r: 0.5 + rnd() ** 3 * 1.9, o: 0.3 + rnd() * 0.7, c: '#ffffff' })
  }
  const warm = ['#fff4d6', '#ffd9a0', '#ffb45c', '#ffffff']
  for (let arm = 0; arm < 2; arm++) {
    for (let i = 0; i < 300; i++) {
      const t = i / 300
      const a = arm * Math.PI + t * Math.PI * 4.6 + 0.4
      const rad = 8 + t * 250
      const jitter = 5 + t * 20
      stars.push({
        x: 470 + Math.cos(a) * rad * 1.2 + (rnd() - 0.5) * jitter * 2,
        y: 290 + Math.sin(a) * rad * 0.98 + (rnd() - 0.5) * jitter * 2,
        r: 0.7 + rnd() ** 2 * 2.1 * (1.15 - t * 0.5),
        o: 0.55 + rnd() * 0.45,
        c: warm[Math.floor(rnd() * warm.length)],
      })
    }
  }
  const sparkles = []
  for (let i = 0; i < 6; i++) sparkles.push({ x: 60 + rnd() * 880, y: 40 + rnd() * 400, s: 7 + rnd() * 9 })
  return { stars, sparkles }
}

const SKIES = { main: buildSky(11), side: buildSky(29) }

function Sky({ name, sun }) {
  const { stars, sparkles } = SKIES[name]
  const gid = `glow-${name}`
  return (
    <svg className="sky" viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={gid} cx={sun.x} cy={sun.y} r={sun.r} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff3cf" />
          <stop offset="0.16" stopColor="#ffc05c" />
          <stop offset="0.42" stopColor="#f0700a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#d97706" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${gid}-core`} cx="470" cy="290" r="90" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffe9b8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffb45c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#02040a" />
          <stop offset="1" stopColor="#0c1424" />
        </linearGradient>
      </defs>
      <rect width="1000" height="560" fill={`url(#${gid}-bg)`} />
      <circle cx={sun.x} cy={sun.y} r={sun.r} fill={`url(#${gid})`} />
      <circle cx="470" cy="290" r="90" fill={`url(#${gid}-core)`} />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x.toFixed(1)} cy={s.y.toFixed(1)} r={s.r.toFixed(2)} fill={s.c} opacity={s.o.toFixed(2)} />
      ))}
      {sparkles.map((s, i) => (
        <path
          key={i}
          d={`M${s.x} ${s.y - s.s}Q${s.x} ${s.y} ${s.x + s.s} ${s.y}Q${s.x} ${s.y} ${s.x} ${s.y + s.s}Q${s.x} ${s.y} ${s.x - s.s} ${s.y}Q${s.x} ${s.y} ${s.x} ${s.y - s.s}Z`}
          fill="#fff"
          opacity="0.9"
        />
      ))}
    </svg>
  )
}

// ---------- sections ----------

function Hero() {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % PROMPTS.length), 3400)
    return () => clearInterval(t)
  }, [])

  function submit() {
    const v = text.trim()
    if (!v) return
    askHelper(v)
    setText('')
  }

  return (
    <section className="hero" id="top">
      <h1 className="hero-title">What can I help with?</h1>
      <form
        className="prompt"
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <textarea
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              submit()
            }
          }}
          placeholder={PROMPTS[i]}
          aria-label="Ask the Sunovo Labs helper"
        />
        <button type="submit" className="prompt-send" disabled={!text.trim()} aria-label="Send">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
            <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </form>
      <div className="chips">
        <a className="chip" href={SUNSET_URL} target="_blank" rel="noreferrer">
          Talk with Sunset <ArrowUpRight />
        </a>
        <Link className="chip" to="/#projects">
          Projects
        </Link>
        <Link className="chip" to="/#news">
          News
        </Link>
        <Link className="chip" to="/resources">
          Resources
        </Link>
        <Link className="chip" to="/about">
          About
        </Link>
      </div>
    </section>
  )
}

function Featured() {
  return (
    <section className="featured" aria-label="Featured">
      <a className="feature feature-main" href={SUNSET_URL} target="_blank" rel="noreferrer">
        <div className="feature-art feature-art-wide">
          <Sky name="main" sun={{ x: 930, y: 610, r: 300 }} />
        </div>
        <h2 className="feature-title">Nova 5.5: our most careful mode</h2>
        <p className="feature-sum">
          One model writes a draft, a second independent model checks the facts and the working, and you get
          the corrected version. It takes longer, and it is worth it when the answer matters.
        </p>
        <p className="meta">
          <b>Sunset</b>
          <span>Sep 21, 2026</span>
        </p>
      </a>
      <a className="feature feature-side" href={WINDOWS_URL}>
        <div className="feature-art feature-art-tall">
          <Sky name="side" sun={{ x: 760, y: 120, r: 330 }} />
          <span className="eclipse" aria-hidden="true" />
        </div>
        <h2 className="feature-title feature-title-sm">Get Sunset for Windows</h2>
        <p className="meta">
          <b>Download</b>
          <span>Windows</span>
        </p>
      </a>
    </section>
  )
}

function News() {
  return (
    <section className="block" id="news">
      <div className="block-head">
        <h2>Recent news</h2>
        <a className="block-link" href={SUNSET_URL} target="_blank" rel="noreferrer">
          Open Sunset <ArrowUpRight />
        </a>
      </div>
      <ul className="news-grid">
        {NEWS.map((n) => (
          <li className="news-item" key={n.id}>
            <div className={`thumb tone-${n.tone}`} aria-hidden="true" />
            <div className="news-text">
              <h3>{n.title}</h3>
              <p className="news-sum">{n.summary}</p>
              <p className="meta">
                <b>{n.category}</b>
                <span>{n.date}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Projects() {
  return (
    <section className="block" id="projects">
      <div className="block-head">
        <h2>Projects</h2>
        <Link className="block-link" to="/solutions">
          View all
        </Link>
      </div>
      <ul className="project-grid">
        {PROJECTS.map((p) => {
          const tile = <span className="tile-word">{p.name}</span>
          return (
            <li className="project" id={p.id} key={p.id}>
              {p.href ? (
                <a className={`tile tile-${p.id}`} href={p.href} target="_blank" rel="noreferrer" aria-label={`Open ${p.name}`}>
                  {tile}
                </a>
              ) : (
                <div className={`tile tile-${p.id}`}>{tile}</div>
              )}
              <h3>{p.tagline}</h3>
              <p className="project-desc">{p.description}</p>
              <p className="meta">
                <b className={p.status === 'live' ? 'is-live' : 'is-progress'}>
                  {p.status === 'live' ? 'Live' : 'In development'}
                </b>
                <span>{p.year}</span>
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function GetStarted() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <h2 id="cta-title">Get started with Sunset</h2>
      <div className="cta-actions">
        <a className="pill pill-mid" href={WINDOWS_URL}>
          Download for Windows
        </a>
        <a className="pill pill-outline" href={SUNSET_URL} target="_blank" rel="noreferrer">
          Open on the web <ArrowUpRight />
        </a>
      </div>
    </section>
  )
}

export function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <News />
      <Projects />
      <GetStarted />
    </>
  )
}
