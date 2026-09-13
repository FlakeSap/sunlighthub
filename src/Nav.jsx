import { useState } from 'react'
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
    items: [{ label: 'Sunset', to: '/solutions#sunset' }],
  },
  {
    label: 'Resources',
    to: '/resources',
    items: [
      { label: 'Sunlight on GitHub', href: 'https://github.com/FlakeSap/sunlighthub' },
      { label: 'Sunset on GitHub', href: 'https://github.com/FlakeSap/sunset-public' },
    ],
  },
  { label: 'About', to: '/about' },
]

function DropdownItem({ item }) {
  const [open, setOpen] = useState(false)

  if (!item.items) {
    return (
      <NavLink to={item.to} className="nav-link">
        {item.label}
      </NavLink>
    )
  }

  return (
    <div
      className="nav-dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
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
