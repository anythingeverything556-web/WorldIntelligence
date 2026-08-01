import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: '#050505', color: '#fff', fontFamily: 'system-ui, sans-serif', gap: '24px', padding: '20px', textAlign: 'center'
    }}>
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)' }}>ERROR 404</p>
      <h1 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: '72px', fontWeight: 900, margin: 0, letterSpacing: '-2px' }}>Not mapped.</h1>
      <p style={{ fontSize: '18px', color: 'rgba(255,255,255,.4)', maxWidth: '400px', margin: 0 }}>
        This page isn&apos;t in our intelligence layer. Try the console instead.
      </p>
      <Link href="/console.html" style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        padding: '14px 32px', borderRadius: '12px', background: '#fff', color: '#000',
        fontWeight: 700, fontSize: '16px', textDecoration: 'none', transition: 'transform .25s ease'
      }}>
        Launch Console &rarr;
      </Link>
      <Link href="/" style={{ color: 'rgba(255,255,255,.3)', fontSize: '14px', textDecoration: 'none' }}>
        or go home
      </Link>
    </div>
  );
}
