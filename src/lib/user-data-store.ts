// src/lib/user-data-store.ts — KV operations for user data sync
export const VALID_DATA_TYPES = ['pins','bookmarks','shapes','alertZones','settings'] as const;
export type UserDataType = typeof VALID_DATA_TYPES[number];
export const MAX_DATA_SIZE = 5 * 1024 * 1024;

function getKvConfig() {
  return { baseUrl: process.env.KV_REST_API_URL || process.env.KV_URL, token: process.env.KV_REST_API_TOKEN || process.env.KV_TOKEN };
}
function userDataKey(sub: string, type: string): string { return `userdata:${sub}:${type}`; }

export async function getUserData(sub: string, type: UserDataType): Promise<unknown | null> {
  const { baseUrl, token } = getKvConfig();
  if (!baseUrl || !token) return null;
  try {
    const resp = await fetch(`${baseUrl}/get/${encodeURIComponent(userDataKey(sub, type))}`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' });
    if (!resp.ok) return null;
    const data = await resp.json();
    if (!data.result) return null;
    return typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
  } catch { return null; }
}

export async function getAllUserData(sub: string): Promise<Record<string, unknown>> {
  const results = await Promise.all(VALID_DATA_TYPES.map(async (type) => [type, await getUserData(sub, type)]));
  return Object.fromEntries(results);
}

export async function setUserData(sub: string, type: UserDataType, data: unknown): Promise<boolean> {
  const { baseUrl, token } = getKvConfig();
  if (!baseUrl || !token) throw new Error('KV not configured');
  const dataStr = JSON.stringify(data);
  if (dataStr.length > MAX_DATA_SIZE) throw new Error('Data too large');
  const resp = await fetch(baseUrl, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(['SET', userDataKey(sub, type), dataStr]), cache: 'no-store' });
  if (!resp.ok) throw new Error(`KV SET failed: ${resp.status}`);
  return true;
}

export function isValidDataType(type: string): type is UserDataType {
  return (VALID_DATA_TYPES as readonly string[]).includes(type);
}
