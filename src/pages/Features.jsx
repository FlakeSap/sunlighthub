const FEATURES = [
  {
    id: 'showcase',
    title: 'Project showcase',
    body: 'Every project we ship gets a card here — a live status, a short pitch, and a link straight through. One growing index instead of scattered repos.',
  },
  {
    id: 'account',
    title: 'Shared account',
    body: "Sign in once with Google and it's recognized across Sunset and everything else built under Sunlight — no separate accounts per project.",
  },
  {
    id: 'helper',
    title: 'AI helper',
    body: "The chat bubble in the corner is a real AI helper, built on the same engine as Sunset — ask it what a project does or how to find something.",
  },
]

export function Features() {
  return (
    <section className="page-section">
      <h1>Features</h1>
      <p className="page-lead">What the Sunlight hub itself does.</p>
      <div className="feature-list">
        {FEATURES.map((f) => (
          <div id={f.id} key={f.id} className="feature-item">
            <h2>{f.title}</h2>
            <p>{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
