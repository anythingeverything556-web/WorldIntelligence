// src/app/api/user/me/route.ts — Combined profile + data
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, createSessionToken, getSessionCookieOptions, SESSION_COOKIE_NAME } from '@/lib/session';
import { getAllUserData } from '@/lib/user-data-store';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const c = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!c) return NextResponse.json({ user: null, data: null });
  const payload = await verifySessionToken(c);
  if (!payload) return NextResponse.json({ user: null, data: null });
  let allData = {};
  try { allData = await getAllUserData(payload.sub); } catch {}
  let response = NextResponse.json({ user: { name: payload.name, email: payload.email, picture: payload.picture }, data: allData });
  // Sliding renewal
  if (payload.iat && payload.exp) {
    const now = Math.floor(Date.now() / 1000);
    if (now - payload.iat > (payload.exp - payload.iat) / 2) {
      try { response.cookies.set(SESSION_COOKIE_NAME, await createSessionToken({ sub: payload.sub, email: payload.email, name: payload.name, picture: payload.picture }), getSessionCookieOptions()); } catch {}
    }
  }
  return response;
}
