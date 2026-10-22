'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DemoModal from '../../components/DemoModal';

export default function ContactPage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Parent',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <>
      <Navbar onBookDemo={() => setDemoOpen(true)} />

      <main style={{ background: 'var(--cream)', minHeight: '100vh', paddingTop: 90 }}>
        {/* Hero Section */}
        <section style={{ padding: '60px 0 40px', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <span className="badge badge-coral" style={{ marginBottom: 16, display: 'inline-block' }}>
              We&apos;re Here To Help
            </span>
            <h1 className="heading-xl" style={{ marginBottom: 16 }}>
              Get in touch with the <span style={{ color: 'var(--coral)' }}>EduSure</span> team
            </h1>
            <p style={{ color: 'var(--mid)', fontSize: '1.1rem', lineHeight: 1.7 }}>
              Have questions about curriculums, batch timings, device kits, or school partnerships? Our academic advisors are always ready to chat.
            </p>
          </div>
        </section>

        {/* Contact Info Grid & Form */}
        <section style={{ padding: '20px 0 80px' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
            {/* Direct Channels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="card" style={{ background: 'white' }}>
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>💬</div>
                <h3 className="heading-sm" style={{ marginBottom: 6 }}>WhatsApp Academic Support</h3>
                <p style={{ color: 'var(--mid)', fontSize: '0.9rem', marginBottom: 16, lineHeight: 1.6 }}>
                  Direct chat with our education counselor for instant answers, syllabus brochures, and batch rescheduling.
                </p>
                <a
                  href="https://wa.me/919876543210?text=Hi%20EduSure%2C%20I%20would%20like%20to%20know%20more%20about%20your%20classes."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-forest"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
                >
                  <span>Chat on WhatsApp →</span>
                </a>
              </div>

              <div className="card" style={{ background: 'white' }}>
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>📞</div>
                <h3 className="heading-sm" style={{ marginBottom: 6 }}>Phone &amp; Callback</h3>
                <p style={{ color: 'var(--mid)', fontSize: '0.9rem', marginBottom: 12, lineHeight: 1.6 }}>
                  Monday to Saturday: 9:00 AM – 8:00 PM IST
                </p>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--dark)', fontSize: '1.1rem' }}>
                  +91 98765 43210
                </div>
              </div>

              <div className="card" style={{ background: 'white' }}>
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>✉️</div>
                <h3 className="heading-sm" style={{ marginBottom: 6 }}>Official Email</h3>
                <p style={{ color: 'var(--mid)', fontSize: '0.9rem', marginBottom: 12, lineHeight: 1.6 }}>
                  For general inquiries, admissions, or institutional proposals:
                </p>
                <a
                  href="mailto:hello@edusure.in"
                  style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--coral)', textDecoration: 'none' }}
                >
                  hello@edusure.in
                </a>
              </div>
            </div>

            {/* Message Form */}
            <div className="card" style={{ background: 'white' }}>
              <h2 className="heading-md" style={{ marginBottom: 8 }}>Send us a message</h2>
              <p style={{ color: 'var(--mid)', fontSize: '0.9rem', marginBottom: 24 }}>
                Leave your details below and an academic counselor will reach out within 2 business hours.
              </p>

              {submitted ? (
                <div style={{
                  padding: '32px 20px',
                  borderRadius: 16,
                  background: '#eaf8f0',
                  border: '2px solid #b2e4c8',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🎉</div>
                  <h3 className="heading-sm" style={{ color: 'var(--forest-dark)', marginBottom: 8 }}>
                    Thank you! Message Received
                  </h3>
                  <p style={{ color: 'var(--mid)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 20 }}>
                    We have received your inquiry. One of our student advisors will call you shortly on <strong>{form.phone || form.email}</strong>.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', role: 'Parent', message: '' }); }}
                    className="btn btn-outline btn-sm"
                  >
                    Send another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label className="label">Your Name</label>
                    <input
                      className="input"
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label className="label">Email Address</label>
                      <input
                        className="input"
                        type="email"
                        required
                        placeholder="priya@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label">Phone / WhatsApp</label>
                      <input
                        className="input"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label">I am a:</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {['Parent', 'Teacher', 'School Leader', 'Other'].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setForm({ ...form, role: r })}
                          style={{
                            flex: 1,
                            padding: '8px 4px',
                            borderRadius: 10,
                            border: form.role === r ? '2px solid var(--coral)' : '2px solid var(--border)',
                            background: form.role === r ? 'var(--coral-light)' : 'white',
                            color: form.role === r ? 'var(--coral-dark)' : 'var(--dark)',
                            fontWeight: form.role === r ? 700 : 500,
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                          }}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="label">Your Query / Message</label>
                    <textarea
                      className="input"
                      rows={4}
                      required
                      placeholder="Tell us about your child's grade or any specific question..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-coral"
                    style={{ width: '100%', marginTop: 8 }}
                    disabled={loading}
                  >
                    {loading ? 'Sending message...' : 'Submit inquiry →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
    </>
  );
}
