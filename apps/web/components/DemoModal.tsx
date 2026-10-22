'use client';

import { useState } from 'react';

interface DemoModalProps {
  subject?: string;
  onClose: () => void;
}

export default function DemoModal({ subject = '', onClose }: DemoModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    childName: '',
    grade: '',
    subject: subject || 'English & Communication',
    phone: '',
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 32, height: 32, borderRadius: 8,
            background: 'var(--cream-dark)', border: '1px solid var(--border)',
            fontSize: '0.9rem', cursor: 'pointer',
          }}
        >
          ✕
        </button>

        {!submitted ? (
          <>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>🎓</div>
              <h2 className="heading-md" style={{ marginBottom: 4 }}>Book your free demo</h2>
              <p style={{ color: 'var(--mid)', fontSize: '0.875rem' }}>
                No payment needed. We confirm within 24 hours on WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label className="label">Child&apos;s first name *</label>
                <input
                  className="input"
                  placeholder="e.g. Arjun"
                  required
                  value={form.childName}
                  onChange={(e) => setForm({ ...form, childName: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Class / grade *</label>
                <input
                  className="input"
                  placeholder="e.g. Grade 4 / Age 9"
                  required
                  value={form.grade}
                  onChange={(e) => setForm({ ...form, grade: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Subject</label>
                <select
                  className="input"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                >
                  <option>English &amp; Communication</option>
                  <option>Maths &amp; Aptitude</option>
                  <option>Coding &amp; AI</option>
                  <option>Robotics</option>
                </select>
              </div>
              <div>
                <label className="label">Parent WhatsApp number *</label>
                <input
                  className="input"
                  placeholder="+91 98765 43210"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <label className="checkbox-wrap">
                <input
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                />
                <span>
                  I am a parent or guardian and I consent to this data being used to contact me about a free demo class.
                </span>
              </label>
              <button type="submit" className="btn btn-coral" style={{ width: '100%', marginTop: 4 }}>
                Confirm my free demo →
              </button>
              <p style={{ textAlign: 'center', color: 'var(--light)', fontSize: '0.75rem' }}>
                🔒 We never share your details. No spam, ever.
              </p>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎉</div>
            <h2 className="heading-md" style={{ marginBottom: 12 }}>You&apos;re booked!</h2>
            <p style={{ color: 'var(--mid)', marginBottom: 24 }}>
              We&apos;ll WhatsApp you within 24 hours to confirm your free demo class. Can&apos;t wait!
            </p>
            <button className="btn btn-coral" onClick={onClose} style={{ width: '100%' }}>
              Got it 👍
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
