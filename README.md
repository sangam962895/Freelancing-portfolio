# Sangam Kumar Gupt: AI Data Specialist Portfolio

A static React + TypeScript + Vite portfolio. It has no backend, no database, no paid APIs, and no secrets. It deploys to GitHub Pages.

## 1. Setup (Windows)

Install Node.js LTS from https://nodejs.org, then open PowerShell in this folder:

```powershell
npm install
npm run dev        # local preview at http://localhost:5173
npm run build      # production build in dist/
npm run preview    # preview the production build
npm run check-private   # scan for accidental private data before committing
```

## 2. Managing files in Windows File Explorer

Drag files into these folders under `public/assets/`:

| Folder | What goes here | Suggested filename |
| --- | --- | --- |
| `profile/` | Profile photo (JPG, square crop works best) | `profile-photo.jpg` |
| `projects/` | Project screenshots | `plantcareai.jpg`, `summaraize.jpg`, `talk2tube.jpg` |
| `certificates/` | Certificates you may publish | `ibm-llm-intro.pdf` |
| `resume/` | Public resume | `sangam-gupt-resume.pdf` |
| `work-samples/` | Approved, redacted samples only | `sample-01.jpg` |

After adding a file, update its path in `src/data/portfolio.ts` and refresh the browser.

### Adding a certificate PDF

1. Copy the PDF into `public/assets/certificates/` (for example `infosys-pandas-python.pdf`).
2. In `src/data/portfolio.ts`, uncomment the `certificateFile` line for that certificate and set the path to match, for example `certificateFile: 'assets/certificates/infosys-pandas-python.pdf'`.
3. Refresh the page. A **View certificate** button appears. It shows the PDF on the page, and **Open in new tab** opens it separately. Phone browsers often don't display PDFs inside a page, so use **Open in new tab** there.

Certificate PDFs are public once published. Upload only certificates you're allowed to share.

### Adding payment proof PDFs

1. Save **redacted** copies of your payment proof in `public/assets/payments/`, named `payment-1.pdf`, `payment-2.pdf`, and `payment-3.pdf`.
2. Refresh the page. Each slot's **View** button shows the PDF on the page.
3. To add more slots, add slugs to `paymentProofFiles` in `src/data/portfolio.ts`.

Redact transaction IDs, invoice IDs, tax numbers, phone numbers, email addresses, and home addresses before saving. The privacy check does not scan PDF content, so review each file yourself before publishing.

### GitHub showcase

The GitHub section at the bottom of the page loads repo count, stars, followers, latest repo, and top repos live from GitHub. It needs no key. If GitHub can't be reached, the saved values in `github` in `src/data/portfolio.ts` are shown.

The site reads `public/assets/github-stats.json`, which is generated from the GitHub API. Total commits are counted as your commits on the default branch of your public, non-fork repos.

- Run it on your PC: `npm run update-github` (needs internet, no token). Then run `npm run build` and deploy.
- On GitHub Actions it runs automatically before each deploy, using the built-in `GITHUB_TOKEN`.
- If GitHub is unreachable, the existing file is kept.

### EmailJS contact form (.env)

The contact form reads three PUBLIC values from a `.env` file in the project root:

```
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

- Start from `.env.example`, copy it to `.env`, and fill in the values.
- Restart `npm run dev` (or rebuild) after changing `.env`. Vite reads it only at startup and build time.
- **Never put the EmailJS Private Key in `.env` or anywhere in the site.** Anything in the browser build is visible to every visitor.
- `.env` is listed in `.gitignore`, so it won't be pushed to GitHub. Set the same three values as repository secrets if you deploy with GitHub Actions.
- `npm run check-private` fails if it finds a private key or secret assignment in `.env`, `src/`, or `public/`.

## 3. Updating content

All text lives in `src/data/portfolio.ts`. Rules:

- Values beginning with `[` (for example `[YOUR EMAIL]`) are placeholders. Links with placeholder values are hidden automatically.
- Entries marked `[CONFIRM ...]` are drafts. Confirm or replace them before publishing.
- Empty lists hide their section. `paidProof` is empty, so the Paid Work Proof section does not appear.

## 4. Public and private files

Keep these outside the repository, for example in `C:\Portfolio-Private\`: payment receipts, invoices, transaction and invoice IDs, bank details, tax IDs, identity documents, unredacted client files, confidential datasets, and anything covered by a confidentiality agreement. Never copy them into `public/`.

`.gitignore` does not remove files that are already tracked. If a private file was committed by mistake, run `git rm --cached <file>`, then rewrite history before pushing.

## 5. Git and GitHub Pages

```powershell
git init
git branch -M main
git status                         # review every file before committing
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then in GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds and deploys on each push to `main`. It runs `check-private` first and stops if it finds a suspicious pattern.

Your site will be at `https://<your-username>.github.io/<repo-name>/`. The config uses relative paths, so it works from a subpath without changes.

Nothing is pushed automatically. You run the `git push` command yourself.

## 6. Checklist before publishing

- [ ] Profile photo added to `public/assets/profile/profile-photo.jpg`
- [ ] Email, LinkedIn, and GitHub URLs replaced in `src/data/portfolio.ts`
- [ ] Every `[CONFIRM ...]` entry reviewed, confirmed, or removed
- [ ] Internship certificate URL added, or left as placeholder (hidden)
- [ ] Project GitHub and demo links added
- [ ] Project screenshots added (optional; a gradient placeholder shows otherwise)
- [ ] Confirmed the CrowdGen / Appen work may be named publicly
- [ ] Confirmed the resume PDF is the version you want public
- [ ] `npm run check-private` passes
- [ ] Viewed at 320, 375, 768, 1024, 1440, and 1920 px wide
- [ ] Mobile menu opens, closes with Escape, and links work

## Project structure

```
public/assets/        photos, screenshots, certificates, resume (public files only)
src/data/             portfolio.ts: all editable content
src/sections/         the 12 page sections
src/components/       navbar, footer, project card
src/styles/           global.css with design tokens
scripts/              check-private.mjs
.github/workflows/    GitHub Pages deployment
```
