'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DemoModal from '../components/DemoModal';

const SUBJECTS = [
  {
    emoji: '📖',
    world: 'Story World',
    subtitle: 'English & Communication',
    ages: 'Ages (3-8)',
    desc: 'Phonics, reading, speaking and writing as your child finds their voice.',
    skills: ['Phonics', 'Speaking', 'Writing'],
    color: 'card-yellow',
    accent: '#f5c842',
    cta: 'Try a free demo',
  },
  {
    emoji: '🔢',
    world: 'Number World',
    subtitle: 'Maths & Aptitude',
    ages: 'Ages (5-V)',
    desc: 'Number sense, word problems and school maths review. Master maths - Anytime, Anywhere.',
    skills: ['Maths', 'Aptitude', 'Problem Solving'],
    color: 'card-blue',
    accent: '#2d7dd2',
    cta: 'Try a free demo',
  },
  {
    emoji: '💻',
    world: 'Code World',
    subtitle: 'Coding & AI',
    ages: 'Ages (8-Y)',
    desc: 'From block coding to real AI and Python, all explored in a fully safe online environment.',
    skills: ['Logic', 'Python', 'AI & more'],
    color: 'card-purple',
    accent: '#7b5ea7',
    cta: 'Try a free demo',
  },
  {
    emoji: '🤖',
    world: 'Robot World',
    subtitle: 'Robotics',
    ages: 'Ages (6-V)',
    desc: "Real robotics training is costly. Ours isn't. It is delivered at home by trained tutors.",
    skills: ['Build', 'Sensors', 'Compete'],
    color: 'card-coral',
    accent: '#e8553d',
    cta: 'Try a free demo',
  },
];

const STEPS = [
  {
    num: 1,
    title: 'Book a free demo',
    desc: "Pick a time once a month. We confirm in 24 days.",
    color: '#f5c842',
  },
  {
    num: 2,
    title: 'Meet your tutor',
    desc: "A short live class matched to your child's age, to prove it works.",
    color: '#3ab26a',
  },
  {
    num: 3,
    title: 'Watch them grow',
    desc: 'Monthly report, past recordings, and a certificate at every milestone.',
    color: '#e8553d',
  },
];

const TICKER_ITEMS = [
  '📚 READ', '➕ COUNT', '💻 CODE', '🛠 BUILD', '🎤 SHOW OFF',
  '📚 READ', '➕ COUNT', '💻 CODE', '🛠 BUILD', '🎤 SHOW OFF',
];

const TRUST_STATS = [
  { value: '8K', label: 'families learning' },
  { value: '5', label: 'Max 5 kids per batch' },
  { value: '✓', label: 'Free demo, no payment needed' },
  { value: '📊', label: 'Monthly parent progress report' },
];

export default function HomePage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoSubject, setDemoSubject] = useState('');

  const [heroForm, setHeroForm] = useState({
    childName: '',
    grade: '',
    subject: 'English & Communication',
    phone: '',
    consent: false,
  });
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [heroLoading, setHeroLoading] = useState(false);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHeroLoading(true);
    setTimeout(() => {
      setHeroLoading(false);
      setHeroSubmitted(true);
    }, 700);
  };

  const openDemo = (subject = '') => {
    setDemoSubject(subject);
    setDemoOpen(true);
  };

  return (
    <>
      <Navbar onBookDemo={() => openDemo()} />

      <main>
        {/* ── HERO ───────────────────────────────────────── */}
        <section style={{ paddingTop: 100, paddingBottom: 60 }}>
          <div className="container">
            <div className="hero-grid">
              {/* Left – headline & social proof */}
              <div>
                <div style={{ marginBottom: 16 }}>
                  <span className="badge badge-yellow">🌟 Live classes · Small batches · Real tutors</span>
                </div>

                <h1 className="heading-xl" style={{ marginBottom: 12 }}>
                  <span style={{ color: 'var(--dark)' }}>Read it.&nbsp;</span>
                  <span style={{ color: 'var(--blue)' }}>Count it.</span>
                  <br />
                  <span className="underline-yellow" style={{ color: 'var(--coral)' }}>Code it.</span>
                  <span style={{ color: 'var(--dark)' }}>&nbsp;Build it.</span>
                </h1>

                <p className="body-lg" style={{ color: 'var(--mid)', maxWidth: 480, marginBottom: 32 }}>
                  English, Maths &amp; Aptitude, Coding &amp; AI, and Robotics — taught live by tutors who know your child by name.
                </p>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
                  <button className="btn btn-coral btn-lg" onClick={() => openDemo()}>
                    Book a free demo class
                  </button>
                  <Link href="/subjects" className="btn btn-outline btn-lg">
                    See subjects
                  </Link>
                </div>

                {/* Subject icons */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {[
                    { icon: '📖', label: 'A B C', color: 'var(--yellow)', bg: 'var(--yellow-light)' },
                    { icon: '🔢', label: '7', color: 'var(--blue)', bg: 'var(--blue-light)' },
                    { icon: '💻', label: '</>', color: 'var(--purple)', bg: 'var(--purple-light)' },
                    { icon: '🤖', label: '🤖', color: 'var(--coral)', bg: 'var(--coral-light)' },
                  ].map((s) => (
                    <div
                      key={s.label}
                      style={{
                        width: 52, height: 52, borderRadius: 14,
                        background: s.bg, border: `2px solid ${s.color}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.3rem',
                      }}
                    >
                      {s.icon}
                    </div>
                  ))}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '0 16px', height: 52, borderRadius: 14,
                    background: 'var(--cream-dark)', border: '2px solid var(--border)',
                    fontSize: '1.1rem', color: 'var(--mid)',
                  }}>
                    + × ÷ π
                  </div>
                </div>
              </div>

              {/* Right – Demo booking form */}
              <div className="card" style={{ maxWidth: 380, marginLeft: 'auto', background: 'white' }}>
                {!heroSubmitted ? (
                  <>
                    <h3 className="heading-sm" style={{ marginBottom: 6 }}>Pick a free demo slot</h3>
                    <p style={{ color: 'var(--mid)', fontSize: '0.85rem', marginBottom: 18 }}>
                      No payment needed. 45-min live 1:1 session.
                    </p>
                    <form onSubmit={handleHeroSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <div>
                        <label className="label">Child&apos;s first name *</label>
                        <input
                          className="input"
                          required
                          placeholder="e.g. Arjun"
                          value={heroForm.childName}
                          onChange={(e) => setHeroForm({ ...heroForm, childName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="label">Class / grade *</label>
                        <input
                          className="input"
                          required
                          placeholder="e.g. Grade 4 / Age 9"
                          value={heroForm.grade}
                          onChange={(e) => setHeroForm({ ...heroForm, grade: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="label">Subject</label>
                        <select
                          className="input"
                          value={heroForm.subject}
                          onChange={(e) => setHeroForm({ ...heroForm, subject: e.target.value })}
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
                          value={heroForm.phone}
                          onChange={(e) => setHeroForm({ ...heroForm, phone: e.target.value })}
                        />
                      </div>
                      <label className="checkbox-wrap">
                        <input
                          type="checkbox"
                          required
                          checked={heroForm.consent}
                          onChange={(e) => setHeroForm({ ...heroForm, consent: e.target.checked })}
                        />
                        <span>I am a parent or guardian and I consent to being contacted about this free demo class.</span>
                      </label>
                      <button
                        type="submit"
                        className="btn btn-coral"
                        style={{ width: '100%', marginTop: 4 }}
                        disabled={heroLoading}
                      >
                        {heroLoading ? 'Booking demo...' : 'Confirm my free demo →'}
                      </button>
                    </form>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '24px 8px' }}>
                    <div style={{ fontSize: '3rem', marginBottom: 12 }}>🎉</div>
                    <h3 className="heading-sm" style={{ color: 'var(--forest-dark)', marginBottom: 8 }}>
                      Demo slot reserved!
                    </h3>
                    <p style={{ color: 'var(--mid)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 20 }}>
                      Thank you! We will message you on WhatsApp at <strong>{heroForm.phone}</strong> to confirm your child&apos;s convenient time slot.
                    </p>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        setHeroSubmitted(false);
                        setHeroForm({ childName: '', grade: '', subject: 'English & Communication', phone: '', consent: false });
                      }}
                    >
                      Book another slot
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── TICKER ─────────────────────────────────────── */}
        <div className="ticker-wrap">
          <div className="ticker">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span
                key={i}
                style={{
                  color: 'white',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  letterSpacing: '0.08em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                {item}
                <span style={{ color: 'var(--yellow)', fontSize: '0.7rem' }}>✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── TRUST STATS ──────────────────────────────── */}
        <div style={{ background: 'var(--cream-dark)', padding: '16px 0' }}>
          <div className="container">
            <div className="four-col" style={{ textAlign: 'center' }}>
              {TRUST_STATS.map((s) => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--dark)', fontSize: '1.1rem' }}>
                    {s.value}
                  </span>
                  <span style={{ color: 'var(--mid)', fontSize: '0.85rem' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SUBJECTS / ADVENTURE ───────────────────────── */}
        <section className="section">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <h2 className="heading-lg">Pick your adventure</h2>
              <p style={{ color: 'var(--mid)', marginTop: 8 }}>Start with one world. Unlock the next as your child grows.</p>
            </div>

            <div className="four-col" style={{ marginTop: 40 }}>
              {SUBJECTS.map((s) => (
                <div key={s.world} className={`subject-box ${s.color}`}>
                  <div style={{ fontSize: '2rem', marginBottom: 10 }}>{s.emoji}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                    <h3 className="heading-sm">{s.world}</h3>
                  </div>
                  <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--mid)', marginBottom: 4 }}>{s.subtitle} — {s.ages}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--mid)', marginBottom: 12, lineHeight: 1.5 }}>{s.desc}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                    {s.skills.map((sk) => (
                      <span key={sk} className="tag" style={{ background: 'white', borderColor: s.accent, color: s.accent, fontSize: '0.75rem' }}>
                        {sk}
                      </span>
                    ))}
                  </div>
                  <button
                    className="btn btn-sm"
                    style={{
                      background: 'white',
                      border: `2px solid ${s.accent}`,
                      color: s.accent,
                      boxShadow: `0 3px 0 ${s.accent}40`,
                      borderRadius: 'var(--radius-full)',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                    }}
                    onClick={() => openDemo(s.subtitle)}
                  >
                    {s.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── THREE STEPS ──────────────────────────────── */}
        <section className="section" style={{ background: 'var(--cream-dark)' }}>
          <div className="container">
            <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: 40 }}>
              Three steps to start
            </h2>
            <div className="three-col">
              {STEPS.map((step) => (
                <div key={step.num} className="card">
                  <div
                    className="step-number"
                    style={{ background: step.color, color: 'var(--dark)', marginBottom: 16 }}
                  >
                    {step.num}
                  </div>
                  <h3 className="heading-sm" style={{ marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ color: 'var(--mid)', fontSize: '0.9rem' }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SHOWCASE / REPORT CARD ───────────────────── */}
        <section className="section">
          <div className="container">
            <div className="two-col" style={{ alignItems: 'center' }}>
              <div>
                <h2 className="heading-lg" style={{ marginBottom: 16 }}>
                  Every term ends with a showcase
                </h2>
                <p style={{ color: 'var(--mid)', marginBottom: 24, fontSize: '1rem' }}>
                  A speech, a solved puzzle, a working program, a robot your child built. Proof of progress that parents can see and share.
                </p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {['A speech', 'A puzzle cracked', 'A program', 'A robot'].map((item) => (
                    <span
                      key={item}
                      className="badge badge-green"
                      style={{ cursor: 'default' }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Report Card mockup */}
              <div className="report-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--dark)', fontSize: '0.95rem' }}>
                    Student Showcase: Aarav Sharma (Grade 4)
                  </p>
                  <span className="badge badge-green">✓ Verified</span>
                </div>
                {[
                  { label: 'Attendance', value: '12 of 12 classes (100%)' },
                  { label: 'Strongest skill', value: 'Sensor loops & obstacle evasion' },
                  { label: 'Showcase project', value: 'Smart Ultrasonic Obstacle Rover 🤖' },
                  { label: 'Mentor feedback', value: '"High logic autonomy and confident presentation."' },
                  { label: 'Next milestone', value: 'Servo Pan-Tilt Object Tracker' },
                ].map((row) => (
                  <div key={row.label} className="report-row">
                    <span style={{ color: 'var(--mid)', fontSize: '0.85rem' }}>{row.label}</span>
                    <span style={{ color: 'var(--dark)', fontWeight: 700, fontSize: '0.85rem', textAlign: 'right' }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SCHOOL PARTNERSHIP ───────────────────────── */}
        <section style={{ background: 'var(--dark)', padding: '64px 0' }}>
          <div className="container">
            <div className="two-col" style={{ alignItems: 'center' }}>
              <div>
                <h2 className="heading-lg" style={{ color: 'var(--white)', marginBottom: 16 }}>
                  Bring it to your school
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }}>
                  After-school English, maths, coding and robotics at no cost to the school. Your students learn, your school earns.
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link href="/for-schools" className="btn btn-yellow btn-lg">
                  Partner with us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      {demoOpen && <DemoModal subject={demoSubject} onClose={() => setDemoOpen(false)} />}
    </>
  );
}