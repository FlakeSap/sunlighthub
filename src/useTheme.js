import { useEffect, useState } from 'react'

const KEY = 'sunlight-theme'

// The site is dark unless a visitor picked light. An older version saved
// 'system' for everyone who never touched the toggle, so any stored value other
// than an explicit 'light' means dark.
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(KEY) === 'light' ? 'light' : 'dark'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      // ignore
    }
  }, [theme])

  const toggle = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))

  return [theme, toggle]
}
