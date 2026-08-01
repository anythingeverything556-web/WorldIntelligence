# WorldIntelligence

Real-time open-source intelligence (OSINT) platform. Interactive 2D/3D globe tracking military bases, conflict zones, nuclear facilities, critical infrastructure, naval assets, and breaking news — all in one command center.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/anythingeverything556-web/WorldIntelligence)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Features

- **Interactive 2D Map** (Leaflet) with 10,000+ plotted data points
- **3D Globe** (Cesium) with satellite imagery, terrain, and fly-to navigation
- **Military Infrastructure** — airbases, naval ports, missile sites, bunkers, radar stations
- **Conflict Zone Tracking** — front lines, contested territory, real-time updates
- **Nuclear Facilities** — power plants, enrichment sites, research reactors
- **Critical Infrastructure** — pipelines, undersea cables, data centers, power grids
- **Live News Feed** — geotagged breaking news overlaid on the map
- **Street-Level Imagery** — Mapillary integration with multi-key rotation
- **Historical Satellite Imagery** — ESRI Wayback time-slider
- **Drawing & Measurement Tools** — measure distances, draw zones, drop pins
- **Bookmarks & Alert Zones** — save locations, get notified on changes
- **Google Sign-In** — save your pins and settings across sessions
- **PWA Support** — installable, offline-capable, service worker caching
- **Dark Theme** — built for low-light analysis environments

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) + TypeScript 5 |
| UI | React 19, Tailwind CSS 4, shadcn/ui |
| Auth | Google Identity Services + jose (JWT sessions) |
| Cache / User Store | Upstash Redis (KV) via REST API |
| 2D Map | Leaflet 1.9 + MarkerCluster |
| 3D Globe | Cesium 1.140 (lazy-loaded from CDN) |
| Street View | Mapillary |
| Historical Imagery | ESRI Wayback |
| Hosting | Vercel |

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm
- A [Vercel](https://vercel.com) account (for deployment)
- API tokens (see Environment Variables below)

### 1. Clone

```bash
git clone https://github.com/anythingeverything556-web/WorldIntelligence.git
cd WorldIntelligence
```

### 2. Install

```bash
npm install --legacy-peer-deps
```

### 3. Configure environment

```bash
cp .env.example .env.local
```

Fill in your API tokens and secrets in `.env.local`. See the full guide below.

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Vercel

Click the button at the top of this README, or:

1. Push this repo to your GitHub account
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Add all environment variables in the Vercel dashboard (Project Settings > Environment Variables)
4. Deploy

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in each value.

### Required API Keys & Secrets

#### 1. `GOOGLE_CLIENT_ID`

Powers Google Sign-In authentication.

1. Go to [Google Cloud Console > Credentials](https://console.cloud.google.com/apis/credentials)
2. Click **Create Credentials** > **OAuth 2.0 Client ID**
3. Select **Web application**
4. Add your domain to **Authorized JavaScript origins** (e.g. `http://localhost:3000` for dev, `https://yourdomain.com` for prod)
5. Copy the Client ID — looks like `xxxxx.apps.googleusercontent.com`

Free tier: yes.

#### 2. `SESSION_SECRET`

Signs session JWTs (httpOnly cookies).

```bash
openssl rand -base64 48
```

Paste the output. Must be 64+ characters.

#### 3. `CESIUM_ION_TOKEN`

Powers the 3D globe (terrain, imagery, 3D tiles).

1. Go to [ion.cesium.com/tokens](https://ion.cesium.com/tokens)
2. Sign up (free)
3. Copy the default token or create a new one

Free tier: yes (5 GB/month).

#### 4. `MAPILLARY_TOKENS`

Powers street-level imagery. Comma-separated list for key rotation.

1. Go to [mapillary.com/developer](https://www.mapillary.com/developer)
2. Create an app, copy the Client Token
3. For multiple keys: `token1,token2,token3`

Free tier: yes.

#### 5. `MAPTILER_TOKEN`

Powers base map tiles.

1. Go to [cloud.maptiler.com/account/keys](https://cloud.maptiler.com/account/keys)
2. Sign up (free), copy the default key

Free tier: yes (100k loads/month).

#### 6. `KV_REST_API_URL` + `KV_REST_API_TOKEN`

Powers user data storage and OSM military data cache.

1. Go to [console.upstash.com](https://console.upstash.com/)
2. Create a Redis database
3. Copy the REST URL and REST Token

Free tier: yes (10k commands/day).

#### 7. `ADMIN_SECRET`

Protects the OSM cache write endpoint. Must be 32+ characters.

```bash
openssl rand -base64 32
```

#### 8. `CORS_ORIGINS`

Comma-separated list of allowed origins for API routes.

```
CORS_ORIGINS=http://localhost:3000,https://yourdomain.com
```

---

## Architecture

```
Browser --> / (Next.js route.ts) --> serves public/efweg.html --> SPA loads
                                        |
                                        +-- public/assets/js/app.min.js       (main bootstrap)
                                        +-- public/assets/js/data.min.js      (OSINT datasets)
                                        +-- public/assets/js/features.min.js  (20 feature modules)
                                        +-- public/assets/js/google-auth.min.js (Google Sign-In)
                                        +-- public/assets/js/osm.min.js       (OSM data loader)
                                        +-- public/assets/js/cesium/          (3D globe, lazy-loaded)
```

The project uses a **thin-wrapper pattern** — Next.js handles API routes, auth, and env var proxying. The actual application is a vanilla JavaScript SPA in `public/`.

### Key Directories

| Path | Purpose |
|------|---------|
| `public/` | Static SPA — the real application |
| `public/assets/js/` | Client-side JavaScript (14k+ lines) |
| `public/assets/css/` | Dark theme styles |
| `public/assets/data/borders/` | 20 GeoJSON region files (country borders) |
| `src/app/api/` | Next.js API routes (auth, OSM cache, health, config) |
| `src/lib/` | Shared utilities (session, user-store, cn) |
| `src/components/ui/` | 48 shadcn/ui components |
| `api/` | Standalone Vercel serverless functions |

---

## Scripts

```bash
npm run dev        # Start dev server on port 3000
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

---

## API Routes

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/auth/google` | POST | Rate-limited | Google Sign-In token verification |
| `/api/auth/session` | GET | Cookie | Check current session |
| `/api/auth/signout` | POST | Cookie | Clear session |
| `/api/config` | GET | Same-origin | Serve map tokens to client |
| `/api/health` | GET | Public | Health check |
| `/api/osm-cache` | GET | CORS | Read OSM military data from KV |
| `/api/osm-cache` | POST | Admin secret | Write OSM military data to KV |
| `/api/user/data` | GET/POST | Cookie | User data CRUD |
| `/api/user/me` | GET | Cookie | Current user profile |

---

## Security

- Google ID token verification (server-side only, `google-auth-library`)
- Session JWTs signed with `jose` (HS256, 7-day expiry)
- httpOnly, Secure, SameSite=Lax session cookies
- Strict same-origin CORS validation on all API routes
- Content Security Policy headers (configured in `vercel.json`)
- X-Content-Type-Options, X-Frame-Options, Referrer-Policy, HSTS
- Admin secret with timing-safe comparison on write endpoints
- Rate limiting on auth endpoint (5 attempts/min per IP)
- Input validation and `email_verified` claim check
- No secrets in client-side code — all tokens proxied through API routes

---

## Data Storage

All user-created data (pins, bookmarks, drawn shapes, alert zones, settings) is stored client-side in browser `localStorage`. User identity records (Google ID, email, name, picture) are stored server-side in Upstash KV (keyed by `user:<sub>`). No relational database.

---

## Project Structure

```
WorldIntelligence/
|-- api/                    # Vercel serverless functions
|   |-- config.mjs          # Token proxy (Cesium, MapTiler, Mapillary)
|   |-- osm-cache.mjs       # OSM military data cache (KV read/write)
|   |-- ping.mjs            # Health check
|-- public/                 # Static SPA
|   |-- efweg.html          # Main application page
|   |-- console.html        # Intel console view
|   |-- intel-feed.html     # News feed view
|   |-- assets/
|   |   |-- js/             # Client-side JavaScript
|   |   |-- css/            # Stylesheets
|   |   |-- data/borders/   # GeoJSON country borders
|   |   |-- img/            # Logos and images
|   |-- manifest.json       # PWA manifest
|   |-- sw.js               # Service worker
|-- src/
|   |-- app/
|   |   |-- api/            # Next.js API routes
|   |   |-- layout.tsx      # Root layout
|   |   |-- route.ts        # Root page handler
|   |-- components/ui/      # shadcn/ui components
|   |-- hooks/              # React hooks
|   |-- lib/                # Utilities (session, user store)
|-- .env.example            # Environment variable template
|-- .gitignore
|-- LICENSE                 # MIT
|-- next.config.ts
|-- package.json
|-- tailwind.config.ts
|-- tsconfig.json
|-- vercel.json             # Vercel deployment config + CSP headers
```

---

## Military, Air Force & Naval Data

The full military installation dataset (airbases, naval ports, missile sites, radar stations, bunkers) is not included in this repository due to size.

If you want the data for self-hosting:

**DM me on X (Twitter): [@WorldIntelOSINT](https://x.com/WorldIntelOSINT)**

I will send you the data files and instructions on how to load them into your instance.

---

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes
4. Push and open a Pull Request

---

## License

[MIT](LICENSE) — 2026 WorldIntelligence
