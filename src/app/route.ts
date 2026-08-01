// Route handler for / — serves public/efweg.html verbatim so edits to the
// file are the only thing you need to change. Next.js does no rewriting, no
// React hash, no HTML tampering. The bytes the file server returns are the
// exact bytes you wrote into public/efweg.html.

import { readFileSync } from "node:fs";
import { join } from "node:path";

const PUB = join(process.cwd(), "public", "efweg.html");

// Cache the file in module memory. Production deployments do not
// re-evaluate Server Components / route handlers on every request,
// but doing the read here at module load guarantees we always hand
// back the current bytes from disk on cold start.
const HTML = readFileSync(PUB);

export const dynamic = "force-static";
export const revalidate = false;

export async function GET(): Promise<Response> {
  return new Response(HTML, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300, must-revalidate",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  });
}
