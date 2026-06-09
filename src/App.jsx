import site from './data/site.json';

function App() {
  const { hero, sections } = site;

  return (
    <div className="page-shell">
      <div className="background-orbs" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#home">
          {site.brand}
        </a>
        <nav className="topnav" aria-label="Primary">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.navLabel || section.title}
            </a>
          ))}
        </nav>
      </header>

      <main className="layout" id="home">
        <section className="hero card">
          <div className="hero-copy">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1>{hero.name}</h1>
            <p className="hero-role">{hero.role}</p>
            <p className="hero-text">{hero.summary}</p>

            <div className="hero-actions">
              {hero.actions.map((action) => (
                <a
                  key={action.label}
                  className={action.variant === 'primary' ? 'button button-primary' : 'button button-secondary'}
                  href={action.href}
                >
                  {action.label}
                </a>
              ))}
            </div>
          </div>

          <aside className="hero-panel">
            {hero.avatar ? <div className="avatar">{hero.avatar}</div> : null}
            <ul className="meta-list">
              {hero.meta.map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        {sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}
      </main>
    </div>
  );
}

function Section({ section }) {
  return (
    <section className="card section" id={section.id}>
      <div className="section-heading">
        <p className="eyebrow">{section.kicker}</p>
        <h2>{section.title}</h2>
        {section.description ? <p className="section-description">{section.description}</p> : null}
      </div>

      {section.type === 'text' ? <TextSection section={section} /> : null}
      {section.type === 'chips' ? <ChipSection section={section} /> : null}
      {section.type === 'cards' ? <CardSection section={section} /> : null}
      {section.type === 'timeline' ? <TimelineSection section={section} /> : null}
      {section.type === 'contact' ? <ContactSection section={section} /> : null}
    </section>
  );
}

function TextSection({ section }) {
  return (
    <div className="text-stack">
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

function ChipSection({ section }) {
  return (
    <div className="chip-groups">
      {section.groups.map((group) => (
        <article key={group.name} className="chip-group">
          <h3>{group.name}</h3>
          <div className="chips">
            {group.items.map((item) => (
              <span key={item.name} className="chip">
                {item.name}
                {item.level ? <em>{item.level}</em> : null}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function CardSection({ section }) {
  return (
    <div className="card-grid">
      {section.items.map((item) => (
        <article key={item.title} className="mini-card">
          <div className="mini-card-top">
            <h3>{item.title}</h3>
            {item.badge ? <span className="badge">{item.badge}</span> : null}
          </div>
          <p>{item.description}</p>
          {item.link ? (
            <a className="inline-link" href={item.link.href} target={item.link.external ? '_blank' : undefined} rel={item.link.external ? 'noreferrer' : undefined}>
              {item.link.label}
            </a>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function TimelineSection({ section }) {
  return (
    <div className="timeline">
      {section.items.map((item) => (
        <article key={`${item.company}-${item.role}`} className="timeline-item">
          <div className="timeline-marker" />
          <div>
            <div className="timeline-row">
              <h3>{item.company}</h3>
              <span>{item.period}</span>
            </div>
            <p className="timeline-role">{item.role}</p>
            <ul className="bullet-list">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

function ContactSection({ section }) {
  return (
    <div className="contact-grid">
      <p>{section.message}</p>
      <div className="contact-links">
        {section.links.map((link) => (
          <a
            key={link.label}
            className="button button-secondary"
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noreferrer' : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
