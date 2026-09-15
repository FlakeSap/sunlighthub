const MANUALS = [
  {
    id: 'sunset',
    title: 'Sunset',
    body: 'How memory, modes, and Sunshine work, plus everything that isn’t obvious the first time you open it.',
    href: 'https://sunset-public.onrender.com/?manual=1',
  },
  { id: 'sunscript', title: 'SunScript' },
  { id: 'sunguard', title: 'SunGuard' },
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
            {m.href ? (
              <>
                <p>{m.body}</p>
                <a href={m.href} target="_blank" rel="noreferrer" className="feature-link">
                  Open {m.title} manual &rarr;
                </a>
              </>
            ) : (
              <p className="coming-soon">Coming soon</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
