const RESOURCES = [
  { title: 'Sunlight on GitHub', body: 'This hub’s source.', href: 'https://github.com/FlakeSap/sunlighthub' },
  { title: 'Sunset on GitHub', body: 'The AI companion behind the first project card.', href: 'https://github.com/FlakeSap/sunset-public' },
]

export function Resources() {
  return (
    <section className="page-section">
      <h1>Resources</h1>
      <p className="page-lead">Where to look under the hood.</p>
      <div className="feature-list">
        {RESOURCES.map((r) => (
          <div key={r.title} className="feature-item">
            <h2>{r.title}</h2>
            <p>{r.body}</p>
            <a href={r.href} target="_blank" rel="noreferrer" className="feature-link">
              Visit &rarr;
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
