// Builds public/assets/github-stats.json from GitHub's public API.
// Run locally:   npm run update-github
// In CI the workflow runs it with the automatic GITHUB_TOKEN (higher rate limit).
// Total commits = commits authored by you on the default branch of your public, non-fork repos.
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const USER = 'sangam962895';
const OUT = 'public/assets/github-stats.json';
const token = process.env.GITHUB_TOKEN;
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'portfolio-github-stats',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

async function api(url) {
  const res = await fetch(url, { headers });
  return res;
}

async function getJson(url) {
  const res = await api(url);
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

// Count commits by using per_page=1 and reading the last page number from the Link header.
async function countCommits(repo) {
  const res = await api(`https://api.github.com/repos/${USER}/${repo}/commits?author=${USER}&per_page=1`);
  if (res.status === 409) return 0; // empty repository
  if (!res.ok) throw new Error(`commits for ${repo} -> HTTP ${res.status}`);
  const link = res.headers.get('link') || '';
  const m = link.match(/[?&]page=(\d+)[^>]*>;\s*rel="last"/);
  if (m) return Number(m[1]);
  const items = await res.json();
  return Array.isArray(items) ? items.length : 0;
}

try {
  const user = await getJson(`https://api.github.com/users/${USER}`);
  const repos = [];
  for (let page = 1; ; page++) {
    const batch = await getJson(`https://api.github.com/users/${USER}/repos?sort=updated&per_page=100&page=${page}`);
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  const own = repos.filter((r) => !r.fork); // API returns most recently updated first

  let totalCommits = 0;
  for (const r of own) totalCommits += await countCommits(r.name);

  const top = [...own]
    .sort((a, b) => b.stargazers_count - a.stargazers_count || b.pushed_at.localeCompare(a.pushed_at))
    .slice(0, 6)
    .map((r) => ({ name: r.name, url: r.html_url, language: r.language ?? '', description: r.description ?? '' }));

  const latest = own[0];
  const data = {
    updatedAt: new Date().toISOString(),
    username: USER,
    profileUrl: `https://github.com/${USER}`,
    publicRepos: user.public_repos,
    followers: user.followers,
    stars: own.reduce((sum, r) => sum + r.stargazers_count, 0),
    totalCommits,
    latestRepo: latest ? { name: latest.name, url: latest.html_url, updatedAt: latest.pushed_at } : null,
    topRepos: top,
  };

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n');
  console.log(`Wrote ${OUT}: ${data.publicRepos} repos, ${data.totalCommits} commits, ${data.stars} stars`);
} catch (err) {
  // Do not overwrite the existing file with partial data.
  console.error('GitHub stats update failed; keeping the previous file.\n' + err.message);
  process.exit(1);
}
