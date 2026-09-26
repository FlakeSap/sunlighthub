import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MENU, NEWS, PROJECTS, SUNSET_URL, askHelper } from './content'
import { ArrowUpRight, ChevronDown, SearchIcon, SiteLink } from './ui'

// Everything the search box can find: every menu link, every project, every news item.
const SEARCH_INDEX = (() => {
  const seen = new Set()
  const out = []
  const add = (link, hint) => {
    const key = link.label + '|' + (link.to || link.href || link.action)
    if (seen.has(key)) return
    seen.add(key)
    out.push({ link, hint, hay: (link.label + ' ' + (hint || '')).toLowerCase() })
  }
  for (const p of PROJECTS) {
    add(
      p.href ? { label: p.name, href: p.href, external: true } : { label: p.name, to: '/#' + p.id },
      p.tagline,
    )
  }
  for (const m of MENU) {
    for (const l of m.explore) add(l, m.label)
    for (const g of m.groups) for (const l of g.links) add(l, g.title)
  }
  for (const n of NEWS) add({ label: n.title, to: '/#news' }, n.summary)
  return out
})()

function followLink(link, navigate) {
  if (link.action === 'chat') askHelper(link.text)
  else if (link.external) window.open(link.href, '_blank', 'noopener,noreferrer')
  else navigate(link.to)
}

function SearchPanel({ onClose }) {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [q, setQ] = useState('')

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const query = q.trim().toLowerCase()
  const results = useMemo(() => {
    if (!query) return SEARCH_INDEX.slice(0, 4)
    const words = query.split(/\s+/)
    return SEARCH_INDEX.filter((r) => words.every((w) => r.hay.includes(w))).slice(0, 7)
  }, [query])

  const all = query
    ? [...results, { link: { label: `Ask the helper: “${q.trim()}”`, action: 'chat', text: q.trim() } }]
    : results

  return (
    <div className="mega search-panel" role="dialog" aria-label="Search">
      <form
        className="mega-inner search-form"
        onSubmit={(e) => {
          e.preventDefault()
          if (all[0]) {
            followLink(all[0].link, navigate)
            onClose()
          }
        }}
      >
        <SearchIcon />
        <input
          ref={inputRef}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search Sunovo Labs"
          aria-label="Search Sunovo Labs"
          autoComplete="off"
        />
      </form>
      <ul className="mega-inner search-results">
        {all.map((r) => (
          <li key={r.link.label + (r.link.to || r.link.href || r.link.action)}>
            <SiteLink link={r.link} className="search-result" onNavigate={onClose}>
              <span className="search-result-text">
                <span className="search-result-label">{r.link.label}</span>
                {r.hint && <span className="search-result-hint">{r.hint}</span>}
              </span>
            </SiteLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

function MegaPanel({ item, onNavigate }) {
  return (
    <div className="mega" id={`mega-${item.key}`} role="region" aria-label={`${item.label} menu`}>
      <div className="mega-inner">
        <div className="mega-col mega-explore">
          <p className="mega-title">Explore {item.label}</p>
          <ul>
            {item.explore.map((l) => (
              <li key={l.label}>
                <SiteLink link={l} className="mega-big" onNavigate={onNavigate} />
              </li>
            ))}
          </ul>
        </div>
        {item.groups.map((g) => (
          <div className="mega-col" key={g.title}>
            <p className="mega-title">{g.title}</p>
            <ul>
              {g.links.map((l) => (
                <li key={l.label}>
                  <SiteLink link={l} className="mega-small" onNavigate={onNavigate} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function MobileMenu({ auth, onOpenAuth, onNavigate }) {
  return (
    <div className="mobile-menu">
      <div className="mobile-actions">
        <a className="pill pill-solid" href={SUNSET_URL} target="_blank" rel="noreferrer">
          Try Sunset <ArrowUpRight />
        </a>
        <button
          type="button"
          className="pill pill-dark"
          onClick={() => {
            onNavigate()
            onOpenAuth()
          }}
        >
          {auth.isSignedIn ? auth.user?.name?.split(' ')[0] || 'Account' : 'Log in'}
        </button>
      </div>
      {MENU.map((item) => (
        <div className="mobile-group" key={item.key}>
          <p className="mega-title">{item.label}</p>
          <ul>
            {[...item.explore, ...item.groups.flatMap((g) => g.links)].map((l) => (
              <li key={item.key + l.label}>
                <SiteLink link={l} className="mobile-link" onNavigate={onNavigate} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function Nav({ auth, onOpenAuth }) {
  const navigate = useNavigate()
  const headerRef = useRef(null)
  const [openKey, setOpenKey] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  const anyOpen = openKey || searchOpen || mobileOpen || loginOpen
  const closeAll = () => {
    setOpenKey(null)
    setSearchOpen(false)
    setMobileOpen(false)
    setLoginOpen(false)
  }

  // (A page change, including a #section jump, remounts the whole Nav from
  // Layout, so every menu starts closed again.)
  useEffect(() => {
    if (!anyOpen) return
    function onPointerDown(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) closeAll()
    }
    function onKey(e) {
      if (e.key === 'Escape') closeAll()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [anyOpen])

  const active = MENU.find((m) => m.key === openKey)

  // A real mouse opens a panel by hovering, like the site this is modelled on;
  // touch and keyboard open it with a tap or Enter. Hover is only ever taken from
  // a mouse pointer: a tap also fires a synthetic mouseenter, which used to open
  // and close the menu in the same instant on phones.
  function onItemEnter(e, key) {
    if (e.pointerType !== 'mouse') return
    setSearchOpen(false)
    setLoginOpen(false)
    setOpenKey(key)
  }

  function onItemClick(e, item) {
    if (e.nativeEvent.pointerType === 'mouse') {
      navigate(item.to)
      closeAll()
      return
    }
    setSearchOpen(false)
    setLoginOpen(false)
    setOpenKey((k) => (k === item.key ? null : item.key))
  }

  function toggleSearch() {
    setOpenKey(null)
    setLoginOpen(false)
    setSearchOpen((s) => !s)
  }

  const shown = openKey || searchOpen

  return (
    <header
      ref={headerRef}
      className={`site-header ${anyOpen ? 'is-open' : ''}`}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse' && openKey) setOpenKey(null)
      }}
    >
      <div className="bar">
        <Link to="/" className="brand" aria-label="Sunovo Labs home">
          <span className="brand-sun" aria-hidden="true">
            &#9728;
          </span>
          Sunovo Labs
        </Link>

        <nav className={`bar-nav ${shown ? 'has-open' : ''}`} aria-label="Main">
          {MENU.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`bar-item ${openKey === item.key ? 'is-active' : ''}`}
              aria-expanded={openKey === item.key}
              aria-controls={`mega-${item.key}`}
              onPointerEnter={(e) => onItemEnter(e, item.key)}
              onClick={(e) => onItemClick(e, item)}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            className={`bar-icon ${searchOpen ? 'is-active' : ''}`}
            aria-label="Search"
            aria-expanded={searchOpen}
            onClick={toggleSearch}
          >
            <SearchIcon />
          </button>
        </nav>

        <div className="bar-right">
          <div className="login">
            {auth.isSignedIn ? (
              <button type="button" className="pill pill-dark" onClick={onOpenAuth}>
                {auth.user?.name?.split(' ')[0] || 'Account'}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="pill pill-dark"
                  aria-expanded={loginOpen}
                  aria-haspopup="menu"
                  onClick={() => {
                    setOpenKey(null)
                    setSearchOpen(false)
                    setLoginOpen((o) => !o)
                  }}
                >
                  Log in <ChevronDown />
                </button>
                {loginOpen && (
                  <div className="login-menu" role="menu">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setLoginOpen(false)
                        onOpenAuth()
                      }}
                    >
                      Sunovo Labs account
                    </button>
                    <a role="menuitem" href={SUNSET_URL} target="_blank" rel="noreferrer">
                      Sunset <ArrowUpRight />
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
          <a className="pill pill-solid" href={SUNSET_URL} target="_blank" rel="noreferrer">
            Try Sunset <ArrowUpRight />
          </a>
        </div>

        <button
          type="button"
          className="bar-burger"
          onClick={() => {
            setOpenKey(null)
            setSearchOpen(false)
            setMobileOpen((o) => !o)
          }}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
        </button>
      </div>

      {active && <MegaPanel key={active.key} item={active} onNavigate={closeAll} />}
      {searchOpen && <SearchPanel onClose={closeAll} />}
      {mobileOpen && <MobileMenu auth={auth} onOpenAuth={onOpenAuth} onNavigate={closeAll} />}
      {(active || searchOpen) && (
        <div
          className="scrim"
          aria-hidden="true"
          onPointerEnter={(e) => {
            if (e.pointerType === 'mouse' && !searchOpen) setOpenKey(null)
          }}
          onClick={closeAll}
        />
      )}
    </header>
  )
}
