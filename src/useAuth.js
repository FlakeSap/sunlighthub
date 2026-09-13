import { useCallback, useEffect, useState } from 'react'

const SUNSET_API = 'https://sunset-public.onrender.com'

function readJSON(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function useAuth() {
  const [user, setUser] = useState(() => readJSON('sunlight-user'))
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('sunlight-token')
    } catch {
      return null
    }
  })
  const [registeredApps, setRegisteredApps] = useState([])

  useEffect(() => {
    if (!token) return
    fetch(`${SUNSET_API}/api/account/registered-apps`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : { apps: [] }))
      .then((data) => setRegisteredApps(data.apps || []))
      .catch(() => {})
  }, [token])

  const signInWithCredential = useCallback(async (credential) => {
    const exchangeRes = await fetch(`${SUNSET_API}/api/auth/vscode-exchange`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential }),
    })
    const exchangeData = await exchangeRes.json()
    if (!exchangeRes.ok) throw new Error(exchangeData.error || 'Sign-in failed')

    const tokenRes = await fetch(
      `${SUNSET_API}/api/auth/vscode-token?code=${encodeURIComponent(exchangeData.code)}`,
    )
    const tokenData = await tokenRes.json()
    if (!tokenRes.ok) throw new Error(tokenData.error || 'Sign-in failed')

    setToken(tokenData.token)
    setUser(tokenData.user)
    try {
      localStorage.setItem('sunlight-token', tokenData.token)
      localStorage.setItem('sunlight-user', JSON.stringify(tokenData.user))
    } catch {
      // ignore
    }
    return tokenData.user
  }, [])

  const registerAcrossProjects = useCallback(async () => {
    if (!token) throw new Error('Sign in first')
    const res = await fetch(`${SUNSET_API}/api/account/register-app`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ app: 'sunlight' }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Could not register')
    setRegisteredApps(data.apps || [])
    return data.apps
  }, [token])

  const signOut = useCallback(() => {
    setToken(null)
    setUser(null)
    setRegisteredApps([])
    try {
      localStorage.removeItem('sunlight-token')
      localStorage.removeItem('sunlight-user')
    } catch {
      // ignore
    }
  }, [])

  return {
    user,
    token,
    isSignedIn: Boolean(token && user),
    isRegisteredAcrossProjects: registeredApps.includes('sunlight'),
    signInWithCredential,
    registerAcrossProjects,
    signOut,
  }
}
