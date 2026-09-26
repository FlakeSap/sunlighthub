import { Link } from 'react-router-dom'
import { askHelper } from './content'

export function ArrowUpRight() {
  return (
    <svg className="arrow-ur" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      <path
        d="M3 2.5h6.5V9M9.3 2.7 2.5 9.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="m16 16 4.2 4.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function ChevronDown() {
  return (
    <svg className="chev" viewBox="0 0 12 12" width="8" height="8" aria-hidden="true" focusable="false">
      <path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// One link, whatever kind it is (see MENU in content.js). `onNavigate` lets the
// caller close a menu once a link was used.
export function SiteLink({ link, className, onNavigate, children }) {
  const label = children ?? link.label
  const done = () => onNavigate && onNavigate()

  if (link.action === 'chat') {
    return (
      <button
        type="button"
        className={className}
        onClick={() => {
          done()
          askHelper(link.text)
        }}
      >
        {label}
      </button>
    )
  }

  if (link.external) {
    return (
      <a className={className} href={link.href} target="_blank" rel="noreferrer" onClick={done}>
        {label}
        <ArrowUpRight />
      </a>
    )
  }

  return (
    <Link className={className} to={link.to} onClick={done}>
      {label}
      {link.note && <span className="link-note">{link.note}</span>}
    </Link>
  )
}
