'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DemoModal from '../../components/DemoModal';

const STEPS = [
  {
    num: 1,
    icon: '📅',
    title: 'Book a free demo',
    color: '#f5c842',
    detail: [
      'Fill out the booking form — takes under 2 minutes.',
      "We'll WhatsApp you within 24 hours to confirm a time.",
      'No payment, no commitment, no credit card.',
    ],
  },
  {
    num: 2,
    icon: '👩‍🏫',
    title: 'Meet your tutor',
    color: '#3ab26a',
    detail: [
      "A 45-minute live class, matched to your child's age and level.",
      'Small group of 3–5 children — just like a real school class.',
      "You can sit in and watch — we encourage it for parents.",
    ],
  },
  {
    num: 3,
    icon: '📊',
    title: 'Get your demo report',
    color: '#2d7dd2',
    detail: [
      "After the class, your tutor sends a personal note on your child's strengths.",
      'Recommended next steps and which world to start with.',
      'A simple, honest assessment — no hard sell.',
    ],
  },
  {
    num: 4,
    icon: '🚀',
    title: 'Start your journey',
    color: '#e8553d',
    detail: [
      'Choose the right plan and pick your weekly schedule.',
      'Same tutor every week so your child builds a real relationship.',
      'Monthly progress reports and recordings of every class.',
    ],
  },
  {
    num: 5,
    icon: '🏆',
    title: 'Showcase & celebrate',
    color: '#7b5ea7',
    detail: [
      'Every term ends with a live showcase — a speech, a project, a demo.',
      'Parents are invited. Siblings too.',
      'A certificate for every milestone achieved.',
    ],
  },
];

const FAQS = [
  { q: "What's the class size?", a: "We cap every class at 5 children maximum. Most classes run with 3–4. This means your tutor actually knows your child." },
  { q: 'How long are sessions?', a: 'English and Maths sessions are 45 minutes. Coding and Robotics are 60 minutes. All sessions are held live on our secure video platform.' },
  { q: 'Can I watch the class?', a: 'Yes! We encourage parents to sit in for the first few classes. All sessions are recorded too, so you can watch back any time.' },
  { q: 'What happens if my child misses a class?', a: "We send you the recording automatically. Your tutor also sends a catch-up note so your child doesn't miss out on the week's learning." },
  { q: 'Is there a contract?', a: 'No long-term contracts. We offer monthly rolling plans. Cancel any time with 7 days notice.' },
  { q: 'What tech do I need?', a: 'Just a laptop, tablet or phone with a camera and a stable internet connection. We handle everything else.' },
];

export default function HowItWorksPage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar onBookDemo={() => setDemoOpen(true)} />
      <main>
        {/* Hero */}
        <div className="page-hero" style={{ background: 'var(--cream-dark)' }}>
          <div className="container">
            <span className="badge badge-green" style={{ marginBottom: 16 }}>Simple & transparent</span>
            <h1 className="heading-xl" style={{ marginBottom: 16 }}>How EduSure works</h1>
            <p className="body-lg" style={{ color: 'var(--mid)', maxWidth: 520, margin: '0 auto' }}>
              Five steps from first click to standing ovation. No jargon, no hidden steps.
            </p>
          </div>
        </div>

        {/* Steps */}
        <section className="section">
          <div className="container">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                style={{
                  display: 'flex',
                  gap: 32,
                  alignItems: 'flex-start',
                  marginBottom: i < STEPS.length - 1 ? 48 : 0,
                }}
              >
                {/* Number & connector */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div
                    className="step-number"
                    style={{ background: step.color, color: 'var(--dark)', width: 56, height: 56, fontSize: '1.4rem', boxShadow: `0 4px 0 ${step.color}80` }}
                  >
                    {step.num}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{ width: 2, flex: 1, background: 'var(--border)', minHeight: 40, marginTop: 8 }} />
                  )}
                </div>

                {/* Content */}
                <div className="card" style={{ flex: 1, marginBottom: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <span style={{ fontSize: '1.8rem' }}>{step.icon}</span>
                    <h2 className="heading-md">{step.title}</h2>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {step.detail.map((d) => (
                      <div key={d} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ color: step.color, fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.4 }}>✓</span>
                        <span style={{ color: 'var(--mid)', fontSize: '0.95rem' }}>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="section" style={{ background: 'var(--cream-dark)' }}>
          <div className="container" style={{ maxWidth: 720 }}>
            <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: 40 }}>Frequently asked questions</h2>
            {FAQS.map((faq, i) => (
              <div key={i} className="faq-item">
                <button className="faq-trigger" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <span style={{ fontSize: '1.2rem', transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: '0.2s' }}>+</span>
                </button>
                {openFaq === i && (
                  <div className="faq-body">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--dark)', padding: '64px 0', textAlign: 'center' }}>
          <div className="container">
            <h2 className="heading-lg" style={{ color: 'var(--white)', marginBottom: 16 }}>
              Ready to take step one?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 32 }}>
              Book a free demo class — no payment, no commitment.
            </p>
            <button className="btn btn-coral btn-lg" onClick={() => setDemoOpen(true)}>
              Book my free demo class
            </button>
          </div>
        </section>
      </main>
      <Footer />
      {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
    </>
  );
}
