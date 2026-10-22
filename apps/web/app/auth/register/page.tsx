'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'student' | 'teacher' | 'parent' | 'school'>('parent');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: 'Grade 4 (Age 9-10)',
    institution: '',
    subject: 'All Subjects (Full Access)',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        if (role === 'student') router.push('/dashboard/student');
        else if (role === 'teacher') router.push('/dashboard/teacher');
        else if (role === 'parent') router.push('/dashboard/parent');
        else router.push('/for-schools');
      }, 900);
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
      padding: '32px 16px',
    }}>
      {/* Brand Header */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: 'var(--yellow)', border: '2px solid #d4a820',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem'
        }}>
          📚
        </div>
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--dark)' }}>
          Edu<span style={{ color: 'var(--coral)' }}>Sure</span>
        </span>
      </Link>

      <div className="card" style={{ maxWidth: 480, width: '100%' }}>
        <h1 className="heading-md" style={{ marginBottom: 6 }}>Create your account</h1>
        <p style={{ color: 'var(--mid)', fontSize: '0.9rem', marginBottom: 24 }}>
          Join thousands of learners building skills that last a lifetime
        </p>

        {/* Role Selector Tabs */}
        <div style={{ marginBottom: 24 }}>
          <label className="label" style={{ marginBottom: 8 }}>I am registering as:</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[
              { id: 'parent', label: 'Parent', emoji: '👨‍👩‍👧' },
              { id: 'student', label: 'Student', emoji: '🎓' },
              { id: 'teacher', label: 'Tutor', emoji: '👩‍🏫' },
              { id: 'school', label: 'School', emoji: '🏛️' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setRole(item.id as any)}
                style={{
                  padding: '10px 4px',
                  borderRadius: 12,
                  border: role === item.id ? '2px solid var(--coral)' : '2px solid var(--border)',
                  background: role === item.id ? 'var(--coral-light)' : 'white',
                  color: role === item.id ? 'var(--coral-dark)' : 'var(--dark)',
                  fontWeight: role === item.id ? 700 : 500,
                  fontSize: '0.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label className="label">Full Name</label>
            <input
              className="input"
              type="text"
              required
              placeholder={role === 'school' ? 'Principal / Coordinator Name' : 'Jane Doe'}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {role === 'school' && (
            <div>
              <label className="label">School / Institution Name</label>
              <input
                className="input"
                type="text"
                required
                placeholder="Apex World Academy, Bangalore"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              />
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label className="label">Email Address</label>
              <input
                className="input"
                type="email"
                required
                placeholder="you@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Phone / WhatsApp</label>
              <input
                className="input"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          {(role === 'student' || role === 'parent') && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label className="label">Student Grade</label>
                <select
                  className="input"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                >
                  <option>Grade 1 (Age 6-7)</option>
                  <option>Grade 2 (Age 7-8)</option>
                  <option>Grade 3 (Age 8-9)</option>
                  <option>Grade 4 (Age 9-10)</option>
                  <option>Grade 5 (Age 10-11)</option>
                  <option>Grade 6 (Age 11-12)</option>
                  <option>Grade 7 (Age 12-13)</option>
                  <option>Grade 8 (Age 13-14)</option>
                  <option>Grade 9-10 (High School)</option>
                </select>
              </div>
              <div>
                <label className="label">Primary Interest</label>
                <select
                  className="input"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option>All 4 Subjects</option>
                  <option>📖 English & Storycraft</option>
                  <option>🔢 Maths & Aptitude</option>
                  <option>💻 Coding & AI</option>
                  <option>🤖 Robotics & Electronics</option>
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="label">Choose Password</label>
            <input
              className="input"
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {success && (
            <div style={{
              padding: '12px 16px',
              borderRadius: 12,
              background: '#eaf8f0',
              border: '2px solid #b2e4c8',
              color: 'var(--forest-dark)',
              fontSize: '0.875rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <span>✓</span>
              <span>Account provisioned! Redirecting to your workspace...</span>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-coral"
            style={{ width: '100%', marginTop: 8 }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Get Started Free →'}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ color: 'var(--mid)', fontSize: '0.875rem' }}>
            Already have an account?{' '}
            <Link href="/auth/login" style={{ color: 'var(--coral)', fontWeight: 700 }}>
              Sign in
            </Link>
          </p>
        </div>

        <div style={{
          marginTop: 20,
          padding: 12,
          background: 'var(--cream-dark)',
          borderRadius: 12,
          fontSize: '0.78rem',
          color: 'var(--mid)',
          textAlign: 'center'
        }}>
          🔒 No credit card required. Free demo class included with every new registration.
        </div>
      </div>
    </div>
  );
}
