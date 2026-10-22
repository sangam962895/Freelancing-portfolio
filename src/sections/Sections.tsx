import { lazy, Suspense, useState, type ReactNode } from 'react';
import {
  profile, aboutMe, skillGroups, freelanceExperience, internship, projects,
  paidProof, education, certifications, academicAchievements, contactOptions,
} from '../data/portfolio';
import { asset, isPlaceholder, Section, SafeLink, Tags } from '../utils';
import ProjectCard from '../components/ProjectCard';
import ContactForm from '../components/ContactForm';
import { paymentProofFiles } from '../data/portfolio';

const PdfPreview = lazy(() => import('../components/PdfPreview'));

/* 1. Home */
export function Home() {
  const githubLink = profile.links.find((l) => l.label === 'GitHub');
  const socialLinks = profile.links.filter((l) => l.label !== 'GitHub');

  return (
    <section id="home" className="hero" aria-labelledby="hero-name">
      <div className="container hero-grid">
        <div className="hero-text">
          <p className="eyebrow">{profile.title}</p>
          <h1 id="hero-name">{profile.name}</h1>
          <p className="lead">{profile.headline}</p>
          <p>{profile.intro}</p>
          <ul className="hero-summary">
            {profile.summary.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div className="btn-row">
            <a className="btn btn-primary" href="#projects">View My Work</a>
            <a className="btn btn-outline" href={asset(profile.resumeFile)} download>Download Resume</a>
            <a className="btn btn-outline" href="#contact">Contact Me</a>
            {githubLink && (
              <SafeLink className="btn btn-ghost" href={githubLink.url}>GitHub</SafeLink>
            )}
          </div>
          <div className="link-row">
            {socialLinks.map((l) => (
              <SafeLink key={l.label} href={l.url}>{l.label}</SafeLink>
            ))}
          </div>
        </div>
        <div className="hero-photo">
          <div className="photo-frame">
            <span className="photo-placeholder" aria-hidden="true">SG</span>
            <img
              src={asset(profile.photo)}
              alt={`Profile photo of ${profile.name}`}
              width={400}
              height={400}
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* 2. About */
export function About() {
  return (
    <Section id="about" title="About Me" eyebrow="Background">
      <div className="two-col">
        <div>
          {aboutMe.bio.map((p) => <p key={p}>{p}</p>)}
          <p><strong>Goals:</strong> {aboutMe.goals}</p>
        </div>
        <div className="card">
          <h3>Interests</h3>
          <ul>{aboutMe.interests.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
      </div>
    </Section>
  );
}

/* 3. Skills */
export function Skills() {
  return (
    <Section id="skills" title="Skills & Expertise" eyebrow="What I work with">
      <div className="grid-3">
        {skillGroups.map((g) => (
          <div className="card" key={g.title}>
            <h3>{g.title}</h3>
            <Tags items={g.items} />
          </div>
        ))}
      </div>
    </Section>
  );
}

/* 4. AI Training Experience */
export function AITraining() {
  return (
    <Section id="ai-training" title="AI Training Experience" eyebrow="Task work">
      <div className="grid-2">
        <article className="card">
          <h3>Audio Recording for Voice-Recognition Data</h3>
          <p>Completed timed recordings for a voice-recognition dataset and later worked on multilingual audio transcription and speech data annotation for Hindi and English audio clips.</p>
          <p><strong>Workflow:</strong> setup and device logging, playback review, transcription or transcript correction, word-level alignment, quality checks, and submission.</p>
        </article>
        <article className="card">
          <h3>Image Annotation (English Image Project)</h3>
          <p>Completed image-task work for an English image project, following the assignment instructions and quality requirements before submission.</p>
          <p><strong>Workflow:</strong> review task requirements, complete the assigned image work, verify the output, and submit it according to project guidelines.</p>
        </article>
        <article className="card">
          <h3>Multilingual Audio Transcription &amp; Speech Data Annotation (Hindi and English)</h3>
          <p>Worked on multilingual audio transcription and speech data annotation tasks for Hindi and English content, including transcription, transcript correction, audio labeling, and word-level alignment.</p>
          <p><strong>Workflow:</strong> review audio content, transcribe or correct transcripts, label relevant audio segments, verify alignment at the word level, and complete quality checks before submission.</p>
        </article>
      </div>
      <p className="muted note">
        Entries use the terms that match the work I performed. More task types will be added as new verified experience is documented.
      </p>
    </Section>
  );
}

/* 5. Data Collection */
export function DataCollection() {
  return (
    <Section id="data-collection" title="Data Collection" eyebrow="Audio datasets">
      <div className="card">
        <h3>Audio Recording and Session Data</h3>
        <dl className="kv">
          <dt>Objective</dt><dd>Create controlled audio sessions for voice-recognition and anti-spoofing research.</dd>
          <dt>My role</dt><dd>Set up each session, run the assigned capture type, review audio, and submit files with metadata.</dd>
          <dt>Method</dt><dd>Regular capture (silent loudspeaker playback) and mixed capture (alternating speech and playback), with distinct equipment, room, and distance combinations.</dd>
          <dt>Tools</dt><dd>Microsoft Teams, a browser-based data collection app, and devices such as a smartphone, laptop, and speaker.</dd>
          <dt>Output</dt><dd>Recording files, session files, a setup photo, and metadata (mic, speaker, room, furnishing, distance in cm).</dd>
        </dl>
        <p className="muted note">Client data and recordings are not published. Shown here are only the process and skills.</p>
      </div>
    </Section>
  );
}

/* 6. Projects */
export function Projects() {
  const groups = ['AI/ML', 'Generative AI', 'Data'] as const;
  return (
    <Section id="projects" title="Projects" eyebrow="Selected work">
      {groups.map((g) => {
        const list = projects.filter((p) => p.category === g);
        if (list.length === 0) return null;
        return (
          <div key={g} className="project-group">
            <h3 className="group-title">{g}</h3>
            <div className="grid-3">
              {list.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          </div>
        );
      })}
    </Section>
  );
}

/* 7. Work Experience */
export function Experience() {
  return (
    <Section id="experience" title="Work Experience" eyebrow="Freelance and internship">
      <h3 className="group-title">Freelance Experience</h3>
      <div className="stack">
        {freelanceExperience.map((f) => (
          <article className="card" key={f.title}>
            <h4>{f.title}</h4>
            <p className="muted">{f.platform} · {f.duration}</p>
            <p>{f.description}</p>
            <p><strong>Responsibilities</strong></p>
            <ul>{f.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
            <p><strong>Tools:</strong> {f.tools.join(', ')}</p>
            <p><strong>Deliverables:</strong> {f.deliverables.join('; ')}</p>
          </article>
        ))}
      </div>

      <h3 className="group-title">AI/ML Internship</h3>
      <article className="card">
        <h4>{internship.title}</h4>
        <p className="muted">{internship.organization} · {internship.duration}</p>
        <ul>{internship.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
        <p><strong>Technologies:</strong> {internship.technologies.join(', ')}</p>
        <p><strong>Project completed:</strong> {internship.projects.join(', ')}</p>
        <SafeLink className="btn btn-ghost" href={internship.certificateUrl}>View certificate</SafeLink>
      </article>
    </Section>
  );
}

/* 8. Paid Work Proof: hidden automatically when there is no approved evidence */
const paymentProofDetails: Record<string, { title: string; meta: string }> = {
  'payment-1': {
    title: 'CrowdGen Payment Receipt',
    meta: 'Productivity transaction receipt showing a gross amount of $19.68 USD.',
  },
  'payment-2': {
    title: 'CrowdGen Invoice Summary',
    meta: 'Invoice dated October 7, 2026, for $52.11 USD; status is ready for payout.',
  },
  'pement-3': {
    title: 'Freelancing Payment Proof',
    meta: 'Freelancing earnings dashboard showing $780 total paid.',
  },
};

export function PaidProof() {
  if (paidProof.length === 0) return null;
  return (
    <Section id="paid-proof" title="Paid Work Proof" eyebrow="Payment summary">
      <div className="grid-2">
        {paidProof.map((p) => (
          <article className="card" key={p.title}>
            {p.image && <img src={asset(p.image)} alt={p.title} loading="lazy" />}
            <h3>{p.title}</h3>
            <p className="muted">{p.note}</p>
            <ul>{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
          </article>
        ))}
      </div>
      <h3 className="group-title">Payment proof files</h3>
      <div className="grid-2">
        {paymentProofFiles.map((slug, i) => {
          const details = paymentProofDetails[slug];
          return (
            <PdfCard
              key={slug}
              title={details?.title ?? `Payment proof ${i + 1}`}
              meta={details?.meta}
              path={`assets/payments/${slug}.pdf`}
            />
          );
        })}
      </div>
    </Section>
  );
}

/* 9. Education */
export function Education() {
  return (
    <Section id="education" title="Education" eyebrow="Academic timeline">
      <ol className="timeline">
        {education.map((e) => (
          <li key={e.degree + e.period}>
            <h3>{e.degree}{e.specialization ? `, ${e.specialization}` : ''}</h3>
            <p className="muted">{e.institution} · {e.period}</p>
            <p>{e.status}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* Reusable PDF card: preview assets are requested only after the panel is opened. */
function PdfCard({ title, meta, path, footer }: { title: string; meta?: string; path: string; footer?: ReactNode }) {
  const [showPanel, setShowPanel] = useState(false);
  const panelId = `pdf-panel-${path.replace(/\W+/g, '-')}`;
  const file = asset(path);

  return (
    <article className="card">
      <h3>{title}</h3>
      {meta && <p className="muted">{meta}</p>}
      <div className="btn-row">
        <button type="button" className="btn btn-primary" aria-expanded={showPanel} aria-controls={panelId} onClick={() => setShowPanel((v) => !v)}>
          {showPanel ? 'Hide' : 'View'}
        </button>
        <a className="btn btn-ghost" href={file} target="_blank" rel="noopener noreferrer">Open in new tab</a>
      </div>
      {showPanel && (
        <div id={panelId} className="cert-panel">
          <Suspense fallback={<p className="pdf-preview-loading" role="status">Loading PDF preview…</p>}>
            <PdfPreview src={file} title={title} />
          </Suspense>
        </div>
      )}
      {footer}
    </article>
  );
}

/* 10. Certifications & Achievements */
export function Certifications() {
  return (
    <Section id="certifications" title="Certifications & Achievements" eyebrow="Credentials">
      <div className="grid-2">
        {certifications.map((c) => (
          <PdfCard
            key={c.slug}
            title={c.title}
            meta={`${c.issuer} · ${c.date}`}
            path={`assets/certificates/${c.slug}.pdf`}
            footer={<SafeLink className="btn btn-ghost" href={c.certificateUrl}>View online certificate</SafeLink>}
          />
        ))}
      </div>
      {academicAchievements.length > 0 && (
        <ul className="mt">{academicAchievements.map((a) => <li key={a}>{a}</li>)}</ul>
      )}
    </Section>
  );
}

/* 11. Resume */
export function Resume() {
  return (
    <Section id="resume" title="Resume" eyebrow="CV">
      <div className="card resume-card">
        <p>{profile.resumeSummary}</p>
        <div className="btn-row">
          <a className="btn btn-primary" href={asset(profile.resumeFile)} download>Download Resume (PDF)</a>
          <a className="btn btn-outline" href={asset(profile.resumeFile)} target="_blank" rel="noopener noreferrer">Open preview</a>
          <a className="btn btn-outline" href="#contact">Contact about opportunities</a>
        </div>
      </div>
    </Section>
  );
}

/* 12. Contact */
const gmailComposeUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=info.sangamgupta@gmail.com';

export function Contact() {
  const emailReady = !isPlaceholder(profile.email);
  return (
    <Section id="contact" title="Contact Me" eyebrow="Let's talk">
      <div className="grid-2">
        <div className="card">
          <h3>What I can help with</h3>
          <dl className="kv">
            {contactOptions.map((o) => (
              <div key={o.label}>
                <dt>{o.label}</dt>
                <dd>{o.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="card">
          <h3>Send me a message</h3>
          <ContactForm />
          {emailReady ? (
            <p>
              Email: <SafeLink href={gmailComposeUrl}>{profile.email}</SafeLink>
            </p>
          ) : (
            <p className="muted">[YOUR EMAIL] is not set yet. Edit src/data/portfolio.ts.</p>
          )}
          <div className="link-row">
            {profile.links.map((l) =>
              l.label === 'GitHub' ? (
                <SafeLink key={l.label} className="btn btn-outline" href={l.url}>{l.label}</SafeLink>
              ) : (
                <SafeLink key={l.label} href={l.url}>{l.label}</SafeLink>
              )
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

export const hasPaidProof = paidProof.length > 0;
export const hasAcademicAchievements = academicAchievements.length > 0;
