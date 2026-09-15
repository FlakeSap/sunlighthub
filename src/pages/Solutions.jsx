const SOLUTIONS = [
  {
    id: 'sunset',
    title: 'Sunset',
    body: 'An AI companion with two moods — Sunset and Sunshine — usable from the web or right inside VS Code.',
    href: 'https://sunset-public.onrender.com',
  },
  {
    id: 'sunscript',
    title: 'SunScript',
    body: 'An idea, research, and coding assistant with three focused modes — Instant, Deep Analysis (grounded in live web search), and Coding.',
    href: 'https://sunscript.onrender.com',
  },
  {
    id: 'sunguard',
    title: 'SunGuard',
    body: 'Redteam your system prompts for vulnerabilities, scan content for harm, and learn AI safety fundamentals — everything you need to ship safely.',
    href: 'https://sunguard-mpxl.onrender.com',
  },
]

export function Solutions() {
  return (
    <section className="page-section">
      <h1>Solutions</h1>
      <p className="page-lead">One entry per project — jump straight in.</p>
      <div className="feature-list">
        {SOLUTIONS.map((s) => (
          <div id={s.id} key={s.id} className="feature-item">
            <h2>{s.title}</h2>
            <p>{s.body}</p>
            <a href={s.href} target="_blank" rel="noreferrer" className="feature-link">
              Open {s.title} &rarr;
            </a>
          </div>
        ))}
        <div className="feature-item feature-item-placeholder">
          <h2>More on the way</h2>
          <p>New projects land here as we build them.</p>
        </div>
      </div>
    </section>
  )
}
