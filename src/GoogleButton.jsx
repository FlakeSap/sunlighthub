import { useEffect, useRef, useState } from 'react'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

let scriptPromise = null
function loadGoogleScript() {
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) return resolve()
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Google sign-in'))
    document.head.appendChild(script)
  })
  return scriptPromise
}

export function GoogleButton({ onCredential, onError }) {
  const buttonRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!CLIENT_ID) return
    let cancelled = false

    loadGoogleScript()
      .then(() => {
        if (cancelled) return
        const poll = setInterval(() => {
          if (!window.google?.accounts?.id) return
          clearInterval(poll)
          if (cancelled) return
          window.google.accounts.id.initialize({
            client_id: CLIENT_ID,
            callback: (response) => onCredential(response.credential),
          })
          if (buttonRef.current) {
            window.google.accounts.id.renderButton(buttonRef.current, {
              theme: 'filled_black',
              size: 'large',
              shape: 'pill',
            })
          }
          setReady(true)
        }, 100)
      })
      .catch((err) => onError?.(err.message))

    return () => {
      cancelled = true
    }
  }, [onCredential, onError])

  if (!CLIENT_ID) {
    return <p className="auth-note">Sign-in isn't configured yet — set VITE_GOOGLE_CLIENT_ID.</p>
  }

  return <div ref={buttonRef} className="google-button" aria-busy={!ready} />
}
