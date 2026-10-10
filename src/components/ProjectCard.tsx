import { useState } from 'react';
import type { Project } from '../data/portfolio';
import { asset, SafeLink, Tags } from '../utils';

export default function ProjectCard({ project }: { project: Project }) {
  const headingId = `project-${project.id}`;
  // If the screenshot is missing or fails to load, show the placeholder instead of a broken image.
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = !!project.image && !imageFailed;
  return (
    <article className="card project-card" aria-labelledby={headingId}>
      <div className="project-media">
        {showImage ? (
          <img
            src={asset(project.image!)}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="media-fallback" aria-hidden="true">
            {project.title.split(' ')[0]}
          </span>
        )}
      </div>
      <div className="card-body">
        <p className="eyebrow">
          {project.category} · {project.date}
        </p>
        <h3 id={headingId}>{project.title}</h3>
        <p>{project.objective}</p>
        <Tags items={project.technologies} />
        <details className="details">
          <summary>View details</summary>
          <p>
            <strong>My contribution:</strong> {project.contribution}
          </p>
          <ul>
            {project.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          {project.results.length > 0 && (
            <>
              <p>
                <strong>Verified results:</strong>
              </p>
              <ul>
                {project.results.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </>
          )}
        </details>
        <div className="card-links">
          <SafeLink className="btn btn-ghost" href={project.github}>
            GitHub
          </SafeLink>
          <SafeLink className="btn btn-ghost" href={project.demo}>
            Live demo
          </SafeLink>
          <SafeLink className="btn btn-ghost" href={project.video}>
            Watch demo
          </SafeLink>
        </div>
      </div>
    </article>
  );
}
