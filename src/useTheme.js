import { useEffect, useState } from 'react'

export function useTheme() {
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
