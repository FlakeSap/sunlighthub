import { useReveal } from '../useReveal'
import { useRevealToggle } from '../useRevealToggle'

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

const trio = [
  {
    word: 'BUILD.',
    line: 'Start with an idea, end with something real.',
    photo: '/screens/sunset-build.png',
  },
  {
    word: 'SHIP.',
    line: 'Push it out into the world, warts and all.',
    photo: '/screens/sunset-ship.png',
  },
  {
    word: 'SHINE.',
    line: 'Let it stand on its own, and start the next one.',
    photo: '/screens/sunset-shine.png',
  },
]

function Hero() {
  return (
    <section className="hero">
      <div className="hero-center">
        <div className="hero-word-wrap">
          <span className="hero-word hero-word-glow" aria-hidden="true">
            Sunlight
          </span>
          <h1 className="hero-word">Sunlight</h1>
        </div>
        <p className="hero-tagline">Everything we've built, in one place.</p>
      </div>
      <div className="hero-scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  )
}

function TrioColumn({ item }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`trio-col ${visible ? 'is-visible' : ''}`}>
      <div className="trio-photo" style={{ backgroundImage: `url(${item.photo})` }} />
      <h2 className="giant-word trio-word">{item.word}</h2>
      <p className="giant-line">{item.line}</p>
    </div>
  )
}

function TrioSection() {
  return (
    <section className="trio-section">
      {trio.map((item) => (
        <TrioColumn key={item.word} item={item} />
      ))}
    </section>
  )
}

function StatusBadge({ status }) {
  const label = status === 'live' ? 'Live' : 'In progress'
  return <span className={`status status-${status}`}>{label}</span>
}

function ProjectCard({ project, index }) {
  const [ref, visible] = useReveal()
  return (
    <article
      ref={ref}
      id={project.id}
      className={`project-card ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="project-card-top">
        <h3>{project.name}</h3>
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

function PlaceholderCard({ index }) {
  const [ref, visible] = useReveal()
  return (
    <article
      ref={ref}
      className={`project-card project-card-placeholder ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <h3>What&apos;s next?</h3>
      <p className="description">New projects land here as we build them.</p>
    </article>
  )
}

function ProjectsSection() {
  const [headerRef, headerVisible] = useReveal()
  const [sunrayRef, sunrayVisible] = useRevealToggle()

  return (
    <section ref={sunrayRef} className="projects-section">
      <div className={`sunray ${sunrayVisible ? 'sunray-visible' : ''}`} aria-hidden="true">
        <div className="sun-core" />
        <div className="sun-beams" />
      </div>
      <div ref={headerRef} className={`projects-header ${headerVisible ? 'is-visible' : ''}`}>
        <h2>The projects</h2>
        <p>Every one we've shipped, growing one card at a time.</p>
      </div>
      <div className="project-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
        <PlaceholderCard index={projects.length} />
      </div>
    </section>
  )
}

export function Home() {
  return (
    <>
      <Hero />
      <TrioSection />
      <ProjectsSection />
    </>
  )
}
