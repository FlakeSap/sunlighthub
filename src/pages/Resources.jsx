const MANUALS = [
  { id: 'sunset', title: 'Sunset' },
  { id: 'sunforge', title: 'Sunforge' },
]

export function Resources() {
  return (
    <section className="page-section">
      <h1>Resources</h1>
      <p className="page-lead">Guides for getting the most out of each project.</p>
      <div className="feature-list">
        {MANUALS.map((m) => (
          <div id={m.id} key={m.id} className="feature-item">
            <h2>{m.title} manual</h2>
            <p className="coming-soon">Coming soon</p>
          </div>
        ))}
      </div>
    </section>
  )
}
