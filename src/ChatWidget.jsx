import { useRef, useState, useEffect } from 'react'

const SUNSET_API = 'https://sunset-public.onrender.com'

const WELCOME = {
  role: 'assistant',
  text: "Hi! I'm the Sunlight helper — ask me what this site is, what Sunset does, or how to find something.",
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, open])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    const next = [...messages, { role: 'user', text }]
    setMessages(next)
    setInput('')
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${SUNSET_API}/api/guest/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, kind: 'sunlight-helper' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setMessages((m) => [...m, { role: 'assistant', text: data.text }])
    } catch (err) {
      setError(err.message || 'Could not reach the helper right now.')
    }
    setLoading(false)
  }

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-panel">
          <div className="chat-panel-header">
            <span>Sunlight helper</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
              &times;
            </button>
          </div>
          <div className="chat-panel-messages" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg chat-msg-${m.role}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="chat-msg chat-msg-assistant chat-msg-loading">…</div>}
          </div>
          {error && <p className="chat-error">{error}</p>}
          <form
            className="chat-input-row"
            onSubmit={(e) => {
              e.preventDefault()
              send()
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something…"
              aria-label="Message"
            />
            <button type="submit" disabled={loading || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        className="chat-bubble"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close Sunlight helper' : 'Open Sunlight helper'}
      >
        {open ? '×' : '✨'}
      </button>
    </div>
  )
}
