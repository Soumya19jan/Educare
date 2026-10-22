'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Route based on email keyword or default to student
      const lower = form.email.toLowerCase();
      if (lower.includes('teacher') || lower.includes('tutor')) {
        router.push('/dashboard/teacher');
      } else if (lower.includes('parent')) {
        router.push('/dashboard/parent');
      } else {
        router.push('/dashboard/student');
      }
    }, 600);
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
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--yellow)', border: '2px solid #d4a820', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
          📚
        </div>
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--dark)' }}>
          Edu<span style={{ color: 'var(--coral)' }}>Sure</span>
        </span>
      </Link>

      <div className="card" style={{ maxWidth: 400, width: '100%' }}>
        <h1 className="heading-md" style={{ marginBottom: 6 }}>Welcome back</h1>
        <p style={{ color: 'var(--mid)', fontSize: '0.9rem', marginBottom: 28 }}>Sign in to your EduSure account</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label className="label">Email address</label>
            <input
              className="input"
              type="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label className="label" style={{ marginBottom: 0 }}>Password</label>
              <Link href="/auth/forgot-password" style={{ fontSize: '0.8rem', color: 'var(--coral)' }}>Forgot password?</Link>
            </div>
            <input
              className="input"
              type="password"
              required
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-coral" style={{ width: '100%', marginTop: 4 }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in →'}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ color: 'var(--mid)', fontSize: '0.875rem' }}>
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" style={{ color: 'var(--coral)', fontWeight: 700 }}>
              Sign up free
            </Link>
          </p>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ color: 'var(--light)', fontSize: '0.8rem' }}>or sign in as</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { role: '🎓 Student', href: '/dashboard/student' },
            { role: '👩‍🏫 Tutor', href: '/dashboard/teacher' },
            { role: '👨‍👩‍👧 Parent', href: '/dashboard/parent' },
          ].map((r) => (
            <Link
              key={r.role}
              href={r.href}
              style={{
                flex: 1, padding: '8px 4px', textAlign: 'center',
                border: '2px solid var(--border)', borderRadius: 10,
                fontSize: '0.75rem', fontWeight: 600,
                fontFamily: 'var(--font-heading)',
                color: 'var(--mid)',
                transition: 'all 0.15s',
              }}
            >
              {r.role}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
