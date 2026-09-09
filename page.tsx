import MotionEffects from "@/components/MotionEffects";
import ProjectGallery from "@/components/ProjectGallery";
import Terminal from "@/components/Terminal";
import ContactMenu from "@/components/ContactMenu";
import SocialCircles from "@/components/SocialCircles";
import DocumentPreview from "@/components/DocumentPreview";
import { portfolio } from "@/data/portfolio";

function ExternalLink({ href, children, className = "text-link" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}

function ProjectCard({ project, index }: { project: (typeof portfolio.projects)[number]; index: number }) {
  return (
    <article className={`project-card ${index % 2 ? "project-reverse" : ""}`} data-reveal>
      <div className="project-visual">
        <div className="project-visual-head">
          <span className="project-number">{project.number}</span>
          <span className={`project-status status-${project.statusTone}`}><i />{project.status}</span>
        </div>
        <ProjectGallery projectName={project.name} platform={project.platform} items={project.gallery} />
      </div>

      <div className="project-main">
        <p className="project-type">{project.type}</p>
        <h3>{project.name}</h3>
        <p className="project-full-name">{project.fullName}</p>
        <p className="project-summary">{project.summary}</p>

        <div className="project-meta">
          <div>
            <span>My role</span>
            <p>{project.role}</p>
          </div>
          <div>
            <span>Project status</span>
            <p>{project.note}</p>
          </div>
        </div>

        <div className="case-grid">
          <div>
            <span>Challenge</span>
            <p>{project.problem}</p>
          </div>
          <div>
            <span>Solution</span>
            <p>{project.solution}</p>
          </div>
        </div>

        <div className="feature-block">
          <span className="mini-label">Key features</span>
          <div className="feature-list">
            {project.features.map((feature) => <span key={feature}>{feature}</span>)}
          </div>
        </div>

        <div className="project-bottom">
          <div className="chips">
            {project.stack.map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="project-links">
            {project.live && (
              <ExternalLink
                href={project.live}
                className="button project-live"
                aria-label={`Open ${project.name} live project`}
              >
                <span>Live Project</span>
              </ExternalLink>
            )}
            {project.github && <ExternalLink href={project.github}>View code</ExternalLink>}
            {!project.live && !project.github && <span className="muted-link">Repository coming soon</span>}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main>
      <MotionEffects />
      <div className="pointer-glow" aria-hidden="true" />
      <div className="page-grid" aria-hidden="true" />

      <header className="site-header shell">
        <a className="brand" href="#top" aria-label="Ylyssa Kaye Cepriano portfolio home">
          <span className="brand-mark" aria-hidden="true">
            <img src="/favicon.png" alt="" className="brand-mark-image" />
          </span>
          <span className="brand-copy">
            <strong>{portfolio.name}</strong>
            <small>{portfolio.primaryRole}</small>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
          <ContactMenu />
        </nav>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <div className="status hero-enter delay-1"><span /> {portfolio.availability}</div>
          <p className="eyebrow hero-enter delay-2">PORTFOLIO / YLYSSA KAYE CEPRIANO</p>
          <h1 className="hero-enter delay-3">
            I design and build <em>useful digital systems.</em>
          </h1>
          <p className="hero-role hero-enter delay-4">{portfolio.primaryRole} · {portfolio.secondaryRole}</p>
          <p className="hero-lead hero-enter delay-4">{portfolio.intro}</p>
          <div className="role-pills hero-enter delay-5">
            {portfolio.roles.slice(2).map((role) => <span key={role}>{role}</span>)}
          </div>
          <div className="hero-actions hero-enter delay-5">
            <a className="button primary" href="#work"><span>Explore my work</span><b>↓</b></a>
          </div>
        </div>

        <aside className="hero-panel profile-photo-panel hero-enter delay-4" aria-label="Professional portrait of Ylyssa Kaye Cepriano">
          <img
            className="profile-photo"
            src="/profile/ylyssa-kaye-cepriano.png"
            alt="Professional portrait of Ylyssa Kaye Cepriano"
          />
          <div className="profile-photo-overlay">
            <div>
              <strong>{portfolio.name}</strong>
              <span>{portfolio.primaryRole}</span>
            </div>
            <span className="profile-photo-status"><i /> Available</span>
          </div>
        </aside>
      </section>

      <section className="proof-strip shell" aria-label="Portfolio summary" data-reveal>
        <div><strong>04</strong><span>Featured systems</span></div>
        <div><strong>03</strong><span>Web · mobile · cloud</span></div>
        <div><strong>01</strong><span>Government system in active use</span></div>
        <div><strong>AI</strong><span>Integrated product workflow</span></div>
      </section>

      <section className="section shell" id="work">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">01 / SELECTED WORK</p>
          <div>
            <h2>See the systems, not just the descriptions.</h2>
            <p className="section-intro">Each project includes its real interface so recruiters can explore the environment, workflow, and UI decisions behind the product.</p>
          </div>
        </div>
        <div className="project-list">
          {portfolio.projects.map((project, index) => <ProjectCard project={project} index={index} key={project.name} />)}
        </div>
      </section>

      <section className="section shell" id="experience">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">02 / EXPERIENCE</p>
          <div>
            <h2>Professional experience grounded in data and public service.</h2>
            <p className="section-intro">Hands-on work with municipal records, database operations, public-facing coordination, and government data processing.</p>
          </div>
        </div>
        <div className="timeline">
          {portfolio.experience.map((item) => (
            <article className="timeline-item" key={`${item.title}-${item.organization}`} data-reveal>
              <div className="timeline-period">{item.period}</div>
              <div className="timeline-content">
                <div className="timeline-head">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.organization}</p>
                  </div>
                  <span>{item.location}</span>
                </div>
                <ul>
                  {item.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section about-section shell" id="about">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">03 / ABOUT & EXPERTISE</p>
          <div>
            <h2>Technical thinking with a design-aware approach.</h2>
            <p className="section-intro">I work across code, data, interfaces, and digital communication — with a focus on products that are easy to understand and practical to use.</p>
          </div>
        </div>
        <div className="about-grid">
          <div data-reveal>
            <p className="about-copy">{portfolio.about}</p>
            <div className="about-links">
              <ExternalLink href={portfolio.github}>GitHub / whydtsip</ExternalLink>
              <ExternalLink href={portfolio.linkedin}>LinkedIn</ExternalLink>
            </div>
          </div>
          <div className="skills-grid">
            {Object.entries(portfolio.skills).map(([group, skills], index) => (
              <div className="skill-group" key={group} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
                <span>{group}</span>
                <div className="skill-tags">
                  {skills.map((skill) => <b key={skill}>{skill}</b>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell" id="education">
        <div className="split-heading" data-reveal>
          <div>
            <p className="eyebrow">04 / EDUCATION</p>
            <h2>Academic track</h2>
          </div>
          <div>
            <p className="eyebrow">05 / CREDENTIALS</p>
            <h2>Professional training</h2>
          </div>
        </div>
        <div className="education-credentials-grid">
          <div className="education-list">
            {portfolio.education.map((item) => (
              <article className="info-card" key={item.school} data-reveal>
                <span>{item.period}</span>
                <h3>{item.school}</h3>
                <strong>{item.program}</strong>
                <p>{item.detail}</p>
                {item.document && item.documentLabel && (
                  <DocumentPreview
                    image={item.document}
                    title={`${item.school} — ${item.program}`}
                    label={item.documentLabel}
                    placeholder={item.documentPlaceholder}
                  />
                )}
              </article>
            ))}
          </div>
          <div className="credentials-list">
            {portfolio.credentials.map((item, index) => (
              <article className="credential-card" key={item.name} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.name}</h3>
                  <strong>{item.issuer}</strong>
                  <p>{item.detail}</p>
                  {item.document && item.documentLabel && (
                    <DocumentPreview image={item.document} title={item.name} label={item.documentLabel} />
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact section shell" id="contact" data-reveal>
        <p className="eyebrow">06 / LET&apos;S WORK TOGETHER</p>
        <h2>Have a role or project in mind?</h2>
        <p>I&apos;m currently open to part-time, freelance, and remote opportunities in web development, frontend development, full-stack development, mobile applications, and UI/UX-focused work.</p>
        <a className="contact-email" href={`mailto:${portfolio.email}`}>{portfolio.email}</a>
        <SocialCircles />
      </section>

      <footer className="footer shell">
        <span>© 2026 {portfolio.name}</span>
        <span>Designed & developed with intention.</span>
      </footer>

      <Terminal />
    </main>
  );
}
