import { SignJWT, jwtVerify } from 'jose';

// ── Session Configuration ───────────────────────────────────────────────────
// SESSION_SECRET MUST be set in environment variables — no fallback for security
const SESSION_SECRET = process.env.SESSION_SECRET;
const SECRET_KEY = SESSION_SECRET
  ? new TextEncoder().encode(SESSION_SECRET)
  : null;
const SESSION_ISSUER = 'worldintelligence';
const SESSION_AUDIENCE = 'worldintelligence-users';
export const SESSION_EXPIRES_IN = '7d'; // 7-day session

export const SESSION_COOKIE_NAME = 'wi_session';

// ── Session Payload ──────────────────────────────────────────────────────────
export interface SessionPayload {
  sub: string;        // Google user ID (unique, never changes)
  email: string;      // Google email (may change if user updates Google account)
  name: string;       // Google display name (may change)
  picture: string;    // Google profile picture URL (may change)
  iat?: number;       // Issued at (set by jose)
  exp?: number;       // Expiry (set by jose)
}

// ── Create a signed session JWT ──────────────────────────────────────────────
export async function createSessionToken(payload: Omit<SessionPayload, 'iat' | 'exp'>): Promise<string> {
  if (!SECRET_KEY) {
    throw new Error('SESSION_SECRET not configured');
  }
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(SESSION_ISSUER)
    .setAudience(SESSION_AUDIENCE)
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(SESSION_EXPIRES_IN)
    .sign(SECRET_KEY);
  return token;
}

// ── Verify a session JWT and return the payload ──────────────────────────────
export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  if (!SECRET_KEY) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY, {
      issuer: SESSION_ISSUER,
      audience: SESSION_AUDIENCE,
    });
    if (!payload.sub || typeof payload.sub !== 'string') return null;
    return {
      sub: payload.sub,
      email: payload.email as string,
      name: payload.name as string,
      picture: payload.picture as string,
      iat: payload.iat,
      exp: payload.exp,
    };
  } catch {
    return null;
  }
}

// ── Cookie options for the session ───────────────────────────────────────────
// Returns the options object for NextResponse.cookies.set()
// NOTE: secure is conditional on NODE_ENV — secure cookies are NOT set on
// http://localhost during development. This is critical for local testing.
export function getSessionCookieOptions() {
  return {
    httpOnly: true,                          // JavaScript cannot read the cookie
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'lax' as const,                // CSRF protection (same-origin iframe works)
    path: '/',                               // All routes
    maxAge: 60 * 60 * 24 * 7,                // 7 days in seconds
  };
}
