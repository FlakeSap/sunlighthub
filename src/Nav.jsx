import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  {
    label: 'Features',
    to: '/features',
    items: [
      { label: 'Project showcase', to: '/features#showcase' },
      { label: 'Shared account', to: '/features#account' },
      { label: 'AI helper', to: '/features#helper' },
    ],
  },
  {
    label: 'Solutions',
    to: '/solutions',
    items: [
      { label: 'Sunset', to: '/solutions#sunset' },
      { label: 'SunScript', to: '/solutions#sunscript' },
    ],
  },
  {
    label: 'Resources',
    to: '/resources',
    items: [
      { label: 'Sunset manual', to: '/resources#sunset' },
      { label: 'SunScript manual', to: '/resources#sunscript' },
      { label: 'SunGuard manual', to: '/resources#sunguard' },
      { label: 'SunStudy manual', to: '/resources#sunstudy' },
    ],
  },
  { label: 'About', to: '/about' },
]

function DropdownItem({ item }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  // Click/tap is the only way this opens now — it used to also open on
  // onMouseEnter and close on onMouseLeave, but on touch devices a tap fires
  // a synthetic mouseenter+mouseleave pair right after the click, closing the
  // menu before its content could even render. Closing on an outside pointer
  // press (below) replaces what onMouseLeave used to do, without the touch bug.
  useEffect(() => {
    if (!open) return
    function onPointerDown(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  if (!item.items) {
    return (
      <NavLink to={item.to} className="nav-link">
        {item.label}
      </NavLink>
    )
  }

  return (
    <div ref={wrapRef} className="nav-dropdown">
      <button
        type="button"
        className="nav-link nav-link-btn"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {item.label} <span className="nav-caret" aria-hidden="true">&#9662;</span>
      </button>
      {open && (
        <div className="nav-dropdown-menu">
          {item.items.map((sub) =>
            sub.href ? (
              <a key={sub.label} href={sub.href} target="_blank" rel="noreferrer">
                {sub.label}
              </a>
            ) : (
              <Link key={sub.label} to={sub.to} onClick={() => setOpen(false)}>
                {sub.label}
              </Link>
            ),
          )}
        </div>
      )}
    </div>
  )
}

export function Nav({ auth, onOpenAuth }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="hero-nav">
      <Link to="/" className="hero-nav-mark">
        <span aria-hidden="true">&#9728;</span> Sunlight
      </Link>

      <button
        type="button"
        className="nav-mobile-toggle"
        onClick={() => setMobileOpen((o) => !o)}
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
      >
        &#9776;
      </button>

      <div className={`nav-links ${mobileOpen ? 'nav-links-open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <DropdownItem key={item.label} item={item} />
        ))}
        <div className="nav-auth">
          {auth.isSignedIn ? (
            <button type="button" className="btn btn-ghost" onClick={onOpenAuth}>
              {auth.user?.name?.split(' ')[0] || 'Account'}
            </button>
          ) : (
            <>
              <button type="button" className="btn btn-ghost" onClick={onOpenAuth}>
                Login
              </button>
              <button type="button" className="btn btn-primary" onClick={onOpenAuth}>
                Start for free
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
