// Simple ping endpoint — confirms standalone functions work on Vercel.
// SECURITY: Returns only { ok: true, ts }. No infrastructure info leaked.
export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    ts: Date.now(),
  });
}
