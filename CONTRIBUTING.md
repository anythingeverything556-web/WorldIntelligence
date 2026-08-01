# Contributing to WorldIntelligence

First off — thanks for taking the time to contribute. Every data point, bug
report, and line of code makes the map sharper for everyone.

## Ways to Contribute

| Type | Where to start |
|------|----------------|
| Report a bug | [Open a Bug Report](https://github.com/anythingeverything556-web/WorldIntelligence/issues/new?template=bug_report.md) |
| Suggest a feature | [Open a Feature Request](https://github.com/anythingeverything556-web/WorldIntelligence/issues/new?template=feature_request.md) |
| Submit OSINT data | Data corrections / new locations go in issues with the `data` label |
| Write code | Pick an open issue or propose your own change via PR |
| Improve docs | Typos, clarity, translations — all welcome |

## Development Setup

1. **Fork** the repo, then clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/WorldIntelligence.git
   cd WorldIntelligence
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env.local
   ```
   Fill in the variables you need (see the README's Environment Variables
   section for step-by-step guides per key). For pure frontend work you can
   skip most of them.

4. **Run the dev server:**
   ```bash
   npm run dev
   ```

5. **Verify before committing:**
   ```bash
   npm run lint
   npm run build
   ```

## Architecture Orientation

The project uses a **thin-wrapper pattern**:

- `src/app/api/` — Next.js API routes (auth, config, OSM cache). Server-side only.
- `public/` — the actual application. Vanilla JS, no build step for these files.
- `public/assets/js/` — client logic. `*.src.js` files are the readable sources,
  `*.min.js` are what the browser loads.
- `api/` — standalone Vercel serverless functions.

If you edit a `*.src.js` file, minify the output to the matching `*.min.js`
(terser and clean-css-cli are in devDependencies).

## Pull Request Guidelines

- **One change per PR.** Small, reviewable diffs get merged fast.
- **Describe the what and the why** in the PR body. Screenshots for UI changes.
- **No secrets.** Never commit tokens, keys, or `.env` files. CI will reject
  them and so will I.
- **Match the existing style.** Prettier isn't enforced but consistent
  formatting is appreciated.
- **Don't break the build.** `npm run build` must pass.

## Data Contributions

Found a wrong location, outdated facility status, or a missing site?

Open an issue with:

- The facility/location name
- Coordinates (lat, lon)
- What's wrong / what's missing
- A source link (satellite imagery, news article, official record)

Data accuracy is the soul of this project — unsourced claims get closed.

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md).
Be decent.

## Questions?

- [GitHub Issues](https://github.com/anythingeverything556-web/WorldIntelligence/issues)
- X (Twitter): [@WorldIntelOSINT](https://x.com/WorldIntelOSINT)
