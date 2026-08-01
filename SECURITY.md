# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.x (latest on `main`) | Yes |
| < 1.0 | No |

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Report privately via one of these channels:

- **X (Twitter) DM:** [@WorldIntelOSINT](https://x.com/WorldIntelOSINT)
- **GitHub Private Vulnerability Reporting:** use the *Security* tab on this
  repository → *Report a vulnerability*

Include:

- Description of the vulnerability
- Steps to reproduce
- Affected endpoint/file/component
- Potential impact

You can expect an acknowledgment within **72 hours** and a status update
within **7 days**.

## Scope Notes

Things we care about most:

- Authentication/session bypass (Google Sign-In, JWT handling)
- Exposure of server-side tokens (Cesium, MapTiler, Mapillary, KV) to
  unauthorized origins
- ADMIN_SECRET bypass on the OSM cache write endpoint
- CORS misconfigurations allowing cross-origin token theft
- Injection into API routes

Things explicitly out of scope:

- Vulnerabilities in third-party data providers (report to them directly)
- OSINT data *content* disputes (use a regular issue with the `data` label)
- Denial-of-service against the hosted demo (it's a free Vercel tier —
  we know it can be saturated)

## Disclosure

Once a fix is shipped, credit will be given in the release notes unless you
prefer to remain anonymous.
