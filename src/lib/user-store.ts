// ── User Storage via Upstash KV REST API ─────────────────────────────────────
// Stores user records in Upstash KV (already configured for OSM cache).
// No database needed — reuses existing KV_REST_API_URL / KV_REST_API_TOKEN.
// User records are permanent (no TTL) and keyed by Google's `sub` ID.

export interface UserRecord {
  sub: string;          // Google user ID (unique, never changes)
  email: string;        // Google email (updated on each login in case it changes)
  name: string;         // Google display name (updated on each login)
  picture: string;      // Google profile picture URL (updated on each login)
  createdAt: string;    // ISO timestamp of first login (never changes)
  lastLoginAt: string;  // ISO timestamp of most recent login (updated each login)
}

// ── KV connection helpers ────────────────────────────────────────────────────
function getKvConfig() {
  const baseUrl = process.env.KV_REST_API_URL || process.env.KV_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.KV_TOKEN;
  return { baseUrl, token };
}

function userKey(sub: string): string {
  return `user:${sub}`;
}

// ── Get a user record by Google sub ID ───────────────────────────────────────
export async function getUser(sub: string): Promise<UserRecord | null> {
  const { baseUrl, token } = getKvConfig();
  if (!baseUrl || !token) return null;

  try {
    const resp = await fetch(`${baseUrl}/get/${encodeURIComponent(userKey(sub))}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    if (!data.result) return null;
    // KV returns the value as a JSON string — parse it
    const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
    return parsed as UserRecord;
  } catch (err) {
    console.error('[user-store] getUser error:', err);
    return null;
  }
}

// ── Upsert a user record (create or update) ──────────────────────────────────
// Always updates name, email, picture, lastLoginAt.
// Preserves createdAt if the user already exists.
export async function upsertUser(googleData: {
  sub: string;
  email: string;
  name: string;
  picture: string;
}): Promise<UserRecord> {
  const { baseUrl, token } = getKvConfig();
  if (!baseUrl || !token) {
    throw new Error('KV not configured — cannot store user');
  }

  const now = new Date().toISOString();

  // Check if user already exists (to preserve createdAt)
  const existing = await getUser(googleData.sub);
  const createdAt = existing?.createdAt || now;

  const userData: UserRecord = {
    sub: googleData.sub,
    email: googleData.email,
    name: googleData.name,
    picture: googleData.picture,
    createdAt,
    lastLoginAt: now,
  };

  // Store in KV — no TTL (permanent storage)
  // SET command without EX = no expiry
  try {
    const resp = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['SET', userKey(googleData.sub), JSON.stringify(userData)]),
      cache: 'no-store',
    });
    if (!resp.ok) {
      throw new Error(`KV SET failed: ${resp.status}`);
    }
  } catch (err) {
    console.error('[user-store] upsertUser error:', err);
    throw err;
  }

  return userData;
}
