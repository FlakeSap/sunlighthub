import { useState } from 'react'
import { GoogleButton } from './GoogleButton'

export function AuthModal({ auth, onClose }) {
  const [error, setError] = useState('')
  const [registering, setRegistering] = useState(false)
  const [registerChecked, setRegisterChecked] = useState(true)

  async function handleCredential(credential) {
    setError('')
    try {
      await auth.signInWithCredential(credential)
      if (registerChecked) {
        setRegistering(true)
        await auth.registerAcrossProjects()
        setRegistering(false)
      }
    } catch (err) {
      setError(err.message || 'Something went wrong signing in.')
      setRegistering(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        {auth.isSignedIn ? (
          <div className="modal-body">
            <h2>You're signed in</h2>
            <p className="modal-sub">{auth.user?.email}</p>
            {auth.isRegisteredAcrossProjects ? (
              <p className="auth-note">This account is registered across all Sunovo Labs projects.</p>
            ) : (
              <button
                type="button"
                className="pill pill-solid"
                disabled={registering}
                onClick={async () => {
                  setRegistering(true)
                  try {
                    await auth.registerAcrossProjects()
                  } catch (err) {
                    setError(err.message)
                  }
                  setRegistering(false)
                }}
              >
                {registering ? 'Registering…' : 'Register across all Sunovo Labs projects'}
              </button>
            )}
            <button type="button" className="pill pill-mid" onClick={auth.signOut}>
              Sign out
            </button>
          </div>
        ) : (
          <div className="modal-body">
            <h2>Sign in to Sunovo Labs</h2>
            <p className="modal-sub">One account, recognized across Sunset and every project here.</p>
            <div className="google-button-wrap">
              <GoogleButton onCredential={handleCredential} onError={setError} />
            </div>
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={registerChecked}
                onChange={(e) => setRegisterChecked(e.target.checked)}
              />
              Register this account across all Sunovo Labs' projects
            </label>
            {registering && <p className="auth-note">Finishing sign-in…</p>}
          </div>
        )}
        {error && <p className="auth-error">{error}</p>}
      </div>
    </div>
  )
}
