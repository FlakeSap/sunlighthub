import './App.css'

const projects = [
  {
    id: 'sunset',
    name: 'Sunset',
    year: '2026',
    status: 'live',
    tagline: 'One AI companion, two moods.',
    description:
      'Chat with Sunset or Sunshine — two personas, one AI companion — from the web, or right from the sidebar in VS Code without leaving the editor.',
    tags: ['Web App', 'VS Code Extension'],
    links: [{ label: 'Open Sunset', href: 'https://sunset-public.onrender.com' }],
  },
]

function StatusBadge({ status }) {
  const label = status === 'live' ? 'Live' : 'In progress'
  return <span className={`status status-${status}`}>{label}</span>
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card-top">
        <h2>{project.name}</h2>
        <StatusBadge status={project.status} />
      </div>
      <p className="tagline">{project.tagline}</p>
      <p className="description">{project.description}</p>
      <div className="tags">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="card-footer">
        <span className="year">{project.year}</span>
        <div className="links">
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              {link.label} &rarr;
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}

function PlaceholderCard() {
  return (
    <article className="project-card project-card-placeholder">
      <h2>What&apos;s next?</h2>
      <p className="description">New projects land here as we build them.</p>
    </article>
  )
}

function App() {
  return (
    <div id="page">
      <header className="hub-header">
        <div className="wordmark">
          <span className="sun-icon" aria-hidden="true">
            &#9728;
          </span>
          Sunlight
        </div>
        <p className="tagline-main">Everything we&apos;ve built, in one place.</p>
      </header>

      <main className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <PlaceholderCard />
      </main>

      <footer className="hub-footer">
        <p>Built one project at a time, since 2026.</p>
      </footer>
    </div>
  )
}

export default App
