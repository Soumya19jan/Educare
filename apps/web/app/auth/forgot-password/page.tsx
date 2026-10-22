'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--cream)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      {/* Brand */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'var(--yellow)', border: '2px solid #d4a820',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem'
        }}>
          📚
        </div>
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--dark)' }}>
          Edu<span style={{ color: 'var(--coral)' }}>Sure</span>
        </span>
      </Link>

      <div className="card" style={{ maxWidth: 400, width: '100%' }}>
        <h1 className="heading-md" style={{ marginBottom: 6 }}>Reset your password</h1>
        <p style={{ color: 'var(--mid)', fontSize: '0.875rem', marginBottom: 24 }}>
          Enter your registered email address and we will send you a password reset link.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label className="label">Registered Email</label>
              <input
                className="input"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-coral"
              style={{ width: '100%', marginTop: 4 }}
              disabled={loading}
            >
              {loading ? 'Sending link...' : 'Send reset instructions →'}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📬</div>
            <h3 className="heading-sm" style={{ color: 'var(--forest-dark)', marginBottom: 8 }}>
              Check your inbox
            </h3>
            <p style={{ color: 'var(--mid)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 20 }}>
              We have dispatched reset instructions to <strong>{email}</strong>. Please check your spam folder if you don&apos;t see it within 2 minutes.
            </p>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => { setSubmitted(false); setEmail(''); }}
            >
              Try another email
            </button>
          </div>
        )}

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ color: 'var(--mid)', fontSize: '0.875rem' }}>
            Remembered your password?{' '}
            <Link href="/auth/login" style={{ color: 'var(--coral)', fontWeight: 700 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
