import { useEffect, useState } from 'react';
import { github } from '../data/portfolio';
import { asset, Section, SafeLink, Tags } from '../utils';

// Stats file written by scripts/update-github-stats.mjs (run at deploy time or with `npm run update-github`).
interface GitHubStats {
  updatedAt: string | null;
  publicRepos: number;
  followers: number;
  stars: number;
  totalCommits: number | null;
  latestRepo: { name: string; url: string; updatedAt: string } | null;
  topRepos: { name: string; url: string; language: string; description: string }[];
}

export default function GitHubShowcase() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(asset('assets/github-stats.json'), { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: GitHubStats) => setStats(data))
      .catch(() => setStats(null))
      .finally(() => setLoaded(true));
    return () => ctrl.abort();
  }, []);

  const publicRepos = stats?.publicRepos ?? github.fallback.publicRepos;
  const followers = stats?.followers ?? github.fallback.followers;
  const stars = stats?.stars ?? github.fallback.stars;
  const totalCommits = stats?.totalCommits;
  const latest = stats?.latestRepo ?? null;
  const latestDate = latest
    ? new Date(latest.updatedAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    : undefined;

  const topRepos = stats?.topRepos?.length
    ? stats.topRepos
    : github.pinned.map((r) => ({ name: r.name, url: r.url, language: r.language, description: '' }));

  const updated = stats?.updatedAt
    ? new Date(stats.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : undefined;

  return (
    <Section id="github-showcase" title="GitHub Showcase" eyebrow="Code and open source">
      <div className="stat-grid">
        <div className="stat"><span className="stat-value">{publicRepos}</span><span className="stat-label">Public repositories</span></div>
        <div className="stat"><span className="stat-value">{totalCommits ?? '—'}</span><span className="stat-label">Total commits</span></div>
        <div className="stat"><span className="stat-value">{stars}</span><span className="stat-label">Stars received</span></div>
        <div className="stat"><span className="stat-value">{followers}</span><span className="stat-label">Followers</span></div>
        <div className="stat stat-wide">
          <span className="stat-label">Latest repository</span>
          <span className="stat-value stat-small">
            {latest ? (
              <a href={latest.url} target="_blank" rel="noopener noreferrer">{latest.name}</a>
            ) : (
              <a href={github.profileUrl} target="_blank" rel="noopener noreferrer">View on GitHub</a>
            )}
          </span>
          {latestDate && <span className="stat-label">Updated {latestDate}</span>}
        </div>
      </div>

      <h3 className="group-title">Top repositories</h3>
      <div className="grid-3">
        {topRepos.map((r) => (
          <article className="card" key={r.url}>
            <h4><a href={r.url} target="_blank" rel="noopener noreferrer">{r.name}</a></h4>
            {r.description && <p className="muted">{r.description}</p>}
            {r.language && <Tags items={[r.language]} />}
          </article>
        ))}
      </div>

      <div className="btn-row mt">
        <SafeLink className="btn btn-primary" href={github.profileUrl}>Open GitHub profile</SafeLink>
      </div>
      <p className="muted note mt">
        {!loaded
          ? 'Loading GitHub stats…'
          : updated
            ? `GitHub stats last updated ${updated}.`
            : 'Showing saved values. Run "npm run update-github" to load live numbers.'}
      </p>
    </Section>
  );
}
