'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DemoModal from '../../components/DemoModal';

const PARENT_FEATURES = [
  {
    icon: '📊',
    title: 'Monthly progress reports',
    desc: 'Every month you get a clear, honest report: what your child covered, what clicked, and what the next milestone is. Written by their actual tutor, not a computer.',
    color: 'var(--yellow)',
    bg: 'var(--yellow-light)',
  },
  {
    icon: '🎥',
    title: 'Recording of every class',
    desc: "Every session is recorded automatically. Watch from any device, any time. Rewind to that moment your child finally got fractions.",
    color: 'var(--blue)',
    bg: 'var(--blue-light)',
  },
  {
    icon: '💬',
    title: 'Direct tutor WhatsApp access',
    desc: "Your child's tutor is one WhatsApp message away. Ask about homework, share an update, celebrate a milestone. Real people, real answers.",
    color: 'var(--green)',
    bg: 'var(--green-light)',
  },
  {
    icon: '📅',
    title: 'Flexible scheduling',
    desc: "Weekday evenings, weekend mornings — you pick what works for your family. And if plans change, we make it easy to reschedule.",
    color: 'var(--purple)',
    bg: 'var(--purple-light)',
  },
  {
    icon: '🏆',
    title: 'End-of-term showcase',
    desc: 'Every term ends with a live event where children present what they built, wrote, or coded. Parents are invited. Siblings welcome. Certificates awarded.',
    color: 'var(--coral)',
    bg: 'var(--coral-light)',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Parent community',
    desc: 'Join a community of parents who share your values. Swap tips, celebrate wins, and support each other in a private WhatsApp group.',
    color: 'var(--pink)',
    bg: 'var(--pink-light)',
  },
];

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    child: 'Riya, 9 — Coding',
    text: "Riya used to say coding was 'for boys'. Three months in, she's built her first game and won't stop talking about it at dinner.",
    avatar: '👩',
  },
  {
    name: 'Mohammed Al-Hassan',
    child: 'Amir, 7 — English',
    text: 'His reading went from reluctant to obsessive. The tutor found the exact books he loves and now he reads before bed every night.',
    avatar: '👨',
  },
  {
    name: 'Sunita Patel',
    child: 'Dev, 11 — Maths',
    text: "Dev was failing maths at school. His teacher just told him he's now working above grade level. The reports each month keep me fully in the loop.",
    avatar: '👩',
  },
];

export default function ForParentsPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <Navbar onBookDemo={() => setDemoOpen(true)} />
      <main>
        {/* Hero */}
        <div className="page-hero" style={{ background: 'var(--cream-dark)' }}>
          <div className="container">
            <span className="badge badge-yellow" style={{ marginBottom: 16 }}>👨‍👩‍👧 For parents</span>
            <h1 className="heading-xl" style={{ marginBottom: 16 }}>
              You stay in the loop.<br />Always.
            </h1>
            <p className="body-lg" style={{ color: 'var(--mid)', maxWidth: 560, margin: '0 auto 32px' }}>
              EduSure is designed so that parents always know exactly what their child is learning, how they are doing, and what comes next.
            </p>
            <button className="btn btn-coral btn-lg" onClick={() => setDemoOpen(true)}>
              Book a free demo class
            </button>
          </div>
        </div>

        {/* Features */}
        <section className="section">
          <div className="container">
            <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: 40 }}>What parents get</h2>
            <div className="three-col">
              {PARENT_FEATURES.map((f) => (
                <div key={f.title} className="card">
                  <div
                    className="icon-box"
                    style={{ background: f.bg, border: `2px solid ${f.color}`, marginBottom: 16, fontSize: '1.6rem', width: 52, height: 52, borderRadius: 14 }}
                  >
                    {f.icon}
                  </div>
                  <h3 className="heading-sm" style={{ marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ color: 'var(--mid)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Report card explainer */}
        <section className="section" style={{ background: 'var(--cream-dark)' }}>
          <div className="container">
            <div className="two-col" style={{ alignItems: 'center' }}>
              <div>
                <h2 className="heading-lg" style={{ marginBottom: 16 }}>Your monthly report card</h2>
                <p style={{ color: 'var(--mid)', marginBottom: 24, lineHeight: 1.7 }}>
                  Every month, your child&apos;s tutor writes a personal progress report — not a generic printout. You see attendance, strongest topics, areas to work on, and the goal for next month.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    "Written by your child's actual tutor",
                    "Sent to your WhatsApp automatically",
                    'Includes a recording highlight reel',
                    'Celebrates milestones with a certificate',
                  ].map((point) => (
                    <div key={point} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--green)', fontWeight: 700, fontSize: '1.1rem' }}>✓</span>
                      <span style={{ fontSize: '0.95rem' }}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="report-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>Monthly Report</p>
                  <span className="badge badge-green">✓ Sent</span>
                </div>
                {[
                  { label: 'Attendance', value: '8 of 8 classes', good: true },
                  { label: 'Strongest area', value: 'Creative Writing', good: true },
                  { label: 'Focus for next month', value: 'Comprehension', good: false },
                  { label: 'Next milestone', value: 'Chapter Book Finish', good: null },
                ].map((row) => (
                  <div key={row.label} className="report-row">
                    <span style={{ color: 'var(--mid)', fontSize: '0.85rem' }}>{row.label}</span>
                    <span style={{
                      fontWeight: 700, fontSize: '0.85rem',
                      color: row.good === true ? 'var(--green)' : row.good === false ? 'var(--coral)' : 'var(--dark)',
                    }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section">
          <div className="container">
            <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: 40 }}>What parents say</h2>
            <div className="three-col">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="card">
                  <p style={{ fontSize: '1.6rem', marginBottom: 12 }}>&ldquo;</p>
                  <p style={{ color: 'var(--mid)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 20 }}>{t.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--yellow-light)', border: '2px solid var(--yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                      {t.avatar}
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem' }}>{t.name}</p>
                      <p style={{ color: 'var(--mid)', fontSize: '0.8rem' }}>{t.child}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--dark)', padding: '64px 0', textAlign: 'center' }}>
          <div className="container">
            <h2 className="heading-lg" style={{ color: 'var(--white)', marginBottom: 16 }}>
              Give your child the tutor they deserve
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 32 }}>
              Free demo. No payment. Just a brilliant class.
            </p>
            <button className="btn btn-yellow btn-lg" onClick={() => setDemoOpen(true)}>
              Book our free demo class
            </button>
          </div>
        </section>
      </main>
      <Footer />
      {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
    </>
  );
}
