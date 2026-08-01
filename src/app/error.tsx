'use client';

import { useEffect } from 'react';

/**
 * Error Boundary — catches unhandled runtime errors during rendering.
 * Next.js App Router convention: any uncaught error in the route segment
 * is caught here and replaced with this fallback UI.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to console for debugging — could be sent to an error tracking service
    // Security: do not log error details to browser console
  }, [error]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#04050a',
        color: '#e8edf5',
        fontFamily: 'Inter, system-ui, sans-serif',
        gap: '16px',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#ffffff',
          margin: 0,
        }}
      >
        Something went wrong
      </h1>
      <p
        style={{
          fontSize: '14px',
          color: 'rgba(232, 237, 245, 0.6)',
          maxWidth: '400px',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        The application encountered an unexpected error. You can try reloading
        the page.
      </p>
      {error?.message && (
        <code
          style={{
            fontSize: '12px',
            color: 'rgba(232, 237, 245, 0.3)',
            fontFamily: "'JetBrains Mono', monospace",
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '6px 12px',
            borderRadius: '6px',
            maxWidth: '600px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {error.message}
        </code>
      )}
      <button
        onClick={reset}
        style={{
          marginTop: '8px',
          padding: '10px 24px',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          background: 'rgba(255, 255, 255, 0.05)',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background 0.15s, border-color 0.15s',
        }}
      >
        Try again
      </button>
    </div>
  );
}
