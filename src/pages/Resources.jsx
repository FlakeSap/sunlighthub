const MANUALS = [
  {
    id: 'sunset',
    title: 'Sunset',
    body: 'How memory, modes, and Sunshine work, plus everything that isn’t obvious the first time you open it.',
    href: 'https://sunset-public.onrender.com/?manual=1',
  },
  { id: 'sunscript', title: 'SunScript' },
  {
    id: 'sunguard',
    title: 'SunGuard',
    body: 'Three tools for shipping AI safely — every one works signed out, no account needed.',
    sections: [
      {
        title: 'Redteam Tester',
        body: 'Paste your system prompt and hit “Run redteam tests”. SunGuard fires nine known jailbreak and prompt-injection patterns at it and shows how many attempts held. Expand any row to see the attempt, the model’s reply, and the judge’s reason for its verdict.',
      },
      {
        title: 'Content Scanner',
        body: 'Paste any text and hit “Scan text” for a per-category safety breakdown, read straight from Gemini’s own safety ratings rather than a hand-written prompt.',
      },
      {
        title: 'Learn',
        body: 'Short explainers on prompt injection, jailbreaking, alignment, and why red-teaming your own prompts is worth doing — read them before you test, or after a result surprises you.',
      },
      {
        title: 'Good to know',
        body: 'Usage is rate-limited so one visitor can’t burn the whole budget — if you hit the limit, wait a bit and try again. A judged verdict is a strong signal, not a guarantee, so re-check anything important by hand.',
      },
    ],
  },
  {
    id: 'sunstudy',
    title: 'SunStudy',
    body: 'SunStudy is still in development, so features may change — here’s what it does today.',
    sections: [
      {
        title: 'Snap & Solve',
        body: 'Photograph a problem or type it in and get a full worked solution: the goal, what’s known, and every step explained with the reason behind it. Built for Class 9–12 (CBSE, ICSE, state boards) and hard JEE/NEET numericals.',
      },
      {
        title: 'Notes → Flashcards',
        body: 'Paste your notes or a chapter summary and get flashcards plus a multiple-choice quiz to drill them, with instant right/wrong feedback.',
      },
      {
        title: 'Exam Intel',
        body: 'Name the exam you’re preparing for and get a briefing on its syllabus and pattern. It says plainly when it’s working from general knowledge, so you know what to double-check against the official source.',
      },
    ],
  },
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
            {m.href || m.sections ? <p>{m.body}</p> : <p className="coming-soon">Coming soon</p>}
            {m.sections && (
              <div className="manual-sections">
                {m.sections.map((s) => (
                  <div key={s.title} className="manual-section">
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                ))}
              </div>
            )}
            {m.href && (
              <a href={m.href} target="_blank" rel="noreferrer" className="feature-link">
                Open {m.title} manual &rarr;
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
