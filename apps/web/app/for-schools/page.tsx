'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DemoModal from '../../components/DemoModal';

const SCHOOL_BENEFITS = [
  {
    icon: '💰',
    title: 'No cost to the school',
    desc: 'We fund the programme entirely. You provide the space and the students. We do everything else.',
  },
  {
    icon: '📚',
    title: 'Four enrichment streams',
    desc: 'English, Maths, Coding & AI, and Robotics. Delivered as after-school clubs — not during curriculum time.',
  },
  {
    icon: '👩‍🏫',
    title: 'Expert tutors supplied',
    desc: 'All tutors are DBS-checked, subject-specialist, and trained in our teaching methodology.',
  },
  {
    icon: '📊',
    title: 'School progress dashboard',
    desc: 'Your designated school coordinator gets a live dashboard showing attendance, engagement, and outcomes.',
  },
  {
    icon: '🏆',
    title: 'End-of-term showcase events',
    desc: 'We organise end-of-term showcase events at your school. Parents attend. Governors love them.',
  },
  {
    icon: '🤝',
    title: 'Revenue share for the school',
    desc: 'Schools earn a revenue share for every enrolled student. The more students, the more your school earns.',
  },
];

const HOW_IT_WORKS_SCHOOL = [
  { num: 1, title: 'Initial conversation', desc: 'We meet (virtually or in person) to understand your school\'s priorities and timetable.' },
  { num: 2, title: 'Pilot programme', desc: 'We run a 6-week pilot with one cohort. Zero risk, zero cost.' },
  { num: 3, title: 'Full roll-out', desc: 'If the pilot works (it always does), we roll out across year groups.' },
  { num: 4, title: 'Ongoing partnership', desc: 'Dedicated school coordinator, termly reviews, and continuous improvement.' },
];

export default function ForSchoolsPage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    schoolName: '',
    contactName: '',
    role: '',
    email: '',
    phone: '',
    students: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar onBookDemo={() => setDemoOpen(true)} />
      <main>
        {/* Hero */}
        <div className="page-hero" style={{ background: 'var(--dark)', paddingBottom: 80 }}>
          <div className="container">
            <span className="badge" style={{ background: 'rgba(245,200,66,0.2)', borderColor: 'var(--yellow)', color: 'var(--yellow)', marginBottom: 16 }}>
              🏫 For schools
            </span>
            <h1 className="heading-xl" style={{ color: 'var(--white)', marginBottom: 16 }}>
              After-school excellence.<br />At no cost to your school.
            </h1>
            <p className="body-lg" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 580, margin: '0 auto 32px' }}>
              EduSure partners with schools to deliver live, expert-led English, Maths, Coding and Robotics clubs. Your students learn. Your school earns.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#partner-form" className="btn btn-yellow btn-lg">Partner with us</a>
              <a href="#how-it-works" className="btn btn-outline btn-lg" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
                How it works
              </a>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <section className="section">
          <div className="container">
            <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: 40 }}>Why schools choose EduSure</h2>
            <div className="three-col">
              {SCHOOL_BENEFITS.map((b) => (
                <div key={b.title} className="card">
                  <div style={{ fontSize: '2rem', marginBottom: 14 }}>{b.icon}</div>
                  <h3 className="heading-sm" style={{ marginBottom: 8 }}>{b.title}</h3>
                  <p style={{ color: 'var(--mid)', fontSize: '0.9rem', lineHeight: 1.6 }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works for schools */}
        <section id="how-it-works" className="section" style={{ background: 'var(--cream-dark)' }}>
          <div className="container">
            <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: 40 }}>How the partnership works</h2>
            <div className="four-col">
              {HOW_IT_WORKS_SCHOOL.map((step) => (
                <div key={step.num} className="card" style={{ textAlign: 'center' }}>
                  <div
                    className="step-number"
                    style={{
                      background: 'var(--yellow)', color: 'var(--dark)',
                      margin: '0 auto 16px', width: 48, height: 48, fontSize: '1.2rem',
                    }}
                  >
                    {step.num}
                  </div>
                  <h3 className="heading-sm" style={{ marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ color: 'var(--mid)', fontSize: '0.875rem', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section style={{ background: 'var(--dark)', padding: '56px 0' }}>
          <div className="container">
            <div className="four-col" style={{ textAlign: 'center' }}>
              {[
                { value: '50+', label: 'Partner schools' },
                { value: '8,000+', label: 'Students enrolled' },
                { value: '4', label: 'Subjects offered' },
                { value: '100%', label: 'Schools that renewed' },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '2.5rem', color: 'var(--yellow)', marginBottom: 6 }}>
                    {s.value}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner form */}
        <section id="partner-form" className="section">
          <div className="container" style={{ maxWidth: 600 }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <h2 className="heading-lg" style={{ marginBottom: 12 }}>Let&apos;s talk</h2>
              <p style={{ color: 'var(--mid)' }}>Fill in the form and a member of our schools team will be in touch within one school day.</p>
            </div>

            {!submitted ? (
              <div className="card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div className="two-col" style={{ gap: 16 }}>
                    <div>
                      <label className="label">School name *</label>
                      <input className="input" required value={form.schoolName} onChange={(e) => setForm({ ...form, schoolName: e.target.value })} placeholder="Bright Future Academy" />
                    </div>
                    <div>
                      <label className="label">Your name *</label>
                      <input className="input" required value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} placeholder="Ms. Patel" />
                    </div>
                  </div>
                  <div className="two-col" style={{ gap: 16 }}>
                    <div>
                      <label className="label">Your role *</label>
                      <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                        <option value="">Select...</option>
                        <option>Head Teacher / Principal</option>
                        <option>Deputy Head</option>
                        <option>Coordinator</option>
                        <option>Governor</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">Approx. no. of students</label>
                      <input className="input" value={form.students} onChange={(e) => setForm({ ...form, students: e.target.value })} placeholder="e.g. 400" />
                    </div>
                  </div>
                  <div>
                    <label className="label">School email *</label>
                    <input className="input" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@schoolname.edu" />
                  </div>
                  <div>
                    <label className="label">Phone / WhatsApp</label>
                    <input className="input" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+44 7700 900000" />
                  </div>
                  <div>
                    <label className="label">Anything specific you&apos;d like us to know?</label>
                    <textarea className="input" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="e.g. We have 200 Year 4–6 students interested in coding..." style={{ resize: 'vertical' }} />
                  </div>
                  <button type="submit" className="btn btn-coral" style={{ width: '100%' }}>
                    Partner with us →
                  </button>
                </form>
              </div>
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎉</div>
                <h2 className="heading-md" style={{ marginBottom: 12 }}>Thank you, {form.contactName}!</h2>
                <p style={{ color: 'var(--mid)' }}>
                  Our schools team will be in touch within one school day. We can&apos;t wait to explore what we can build together.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
    </>
  );
}
