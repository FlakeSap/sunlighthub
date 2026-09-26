import { useRef, useState, useEffect } from 'react'
import { OPEN_CHAT_EVENT } from './content'

const SUNSET_API = 'https://sunset-public.onrender.com'

const WELCOME = {
  role: 'assistant',
  text: "Hi! I'm the Sunovo Labs helper — ask me what this site is, what Sunset does, or how to find something.",
}

function renderInline(text, keyPrefix) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={`${keyPrefix}-${i}`}>{part.slice(2, -2)}</strong>
    ) : (
      part
    ),
  )
}

function MarkdownLite({ text }) {
  const lines = text.split('\n')
  return (
    <>
      {lines.map((line, i) => {
        if (line.startsWith('## ')) {
          return (
            <div key={i} className="chat-md-h">
              {renderInline(line.slice(3), i)}
            </div>
          )
        }
        if (line.startsWith('- ')) {
          return (
            <div key={i} className="chat-md-li">
              &bull; {renderInline(line.slice(2), i)}
            </div>
          )
        }
        if (!line.trim()) return <br key={i} />
        return <div key={i}>{renderInline(line, i)}</div>
      })}
    </>
  )
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

  // The hero prompt and the menu's "Ask the helper" links reach this widget by
  // an event, so they need no shared state. `sendRef` always points at the send()
  // of the latest render, so an event never sends with stale messages.
  const sendRef = useRef(null)
  useEffect(() => {
    sendRef.current = send
  })
  useEffect(() => {
    function onAsk(e) {
      setOpen(true)
      const text = e.detail && e.detail.text
      if (text) sendRef.current(text)
    }
    window.addEventListener(OPEN_CHAT_EVENT, onAsk)
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onAsk)
  }, [])

  async function send(override) {
    const text = (typeof override === 'string' ? override : input).trim()
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
            <span>Sunovo Labs helper</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
              &times;
            </button>
          </div>
          <div className="chat-panel-messages" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg chat-msg-${m.role}`}>
                {m.role === 'assistant' ? <MarkdownLite text={m.text} /> : m.text}
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
        aria-label={open ? 'Close Sunovo Labs helper' : 'Open Sunovo Labs helper'}
      >
        {open ? '×' : '✨'}
      </button>
    </div>
  )
}
