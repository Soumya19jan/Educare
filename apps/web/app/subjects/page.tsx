'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DemoModal from '../../components/DemoModal';

const SUBJECTS = [
  {
    id: 'english',
    emoji: '📖',
    world: 'Story World',
    name: 'English & Communication',
    color: 'var(--yellow)',
    bg: 'var(--yellow-light)',
    border: '#d4a820',
    ages: '3–12 years',
    tagline: 'Find your voice, tell your story.',
    desc: 'Our English programme goes beyond grammar drills. We help children discover the joy of reading, build confidence in speaking, and develop writing skills through creative storytelling.',
    modules: [
      { icon: '🔤', title: 'Phonics & Reading', desc: 'Structured phonics for early readers, progressing to fluent chapter books.' },
      { icon: '🗣', title: 'Speaking & Presentation', desc: 'Weekly show-and-tell, debates, and impromptu speaking.' },
      { icon: '✍️', title: 'Creative Writing', desc: 'Stories, poems, and essays with personalised tutor feedback.' },
      { icon: '📚', title: 'Comprehension', desc: 'Reading comprehension, inference, and critical analysis.' },
    ],
    outcomes: ['Read fluently with expression', 'Write multi-paragraph stories', 'Speak confidently in front of an audience', 'Ace school English assessments'],
    batchSize: '3–5 kids',
    sessionLength: '45 min',
    frequency: '2x per week',
  },
  {
    id: 'maths',
    emoji: '🔢',
    world: 'Number World',
    name: 'Maths & Aptitude',
    color: 'var(--blue)',
    bg: 'var(--blue-light)',
    border: '#1a5fa0',
    ages: '5–16 years',
    tagline: 'Numbers that make sense.',
    desc: 'We make maths click. From counting to calculus concepts, our tutors build genuine understanding — not just exam shortcuts — so children stop fearing maths and start enjoying it.',
    modules: [
      { icon: '🧮', title: 'Arithmetic & Number Sense', desc: 'Mental maths, place value, fractions and decimals built to stick.' },
      { icon: '📐', title: 'Geometry & Measurement', desc: 'Visual, hands-on geometry that moves from shapes to proofs.' },
      { icon: '📊', title: 'Data & Statistics', desc: 'Graphs, probability and real-world data literacy.' },
      { icon: '🧩', title: 'Aptitude & Problem Solving', desc: 'Logical reasoning and competitive maths for Olympiads & beyond.' },
    ],
    outcomes: ['Strong school maths grades', 'Confidence with mental arithmetic', 'Ready for Olympiad-level problems', 'Practical data skills'],
    batchSize: '3–5 kids',
    sessionLength: '45 min',
    frequency: '2x per week',
  },
  {
    id: 'coding',
    emoji: '💻',
    world: 'Code World',
    name: 'Coding & AI',
    color: 'var(--purple)',
    bg: 'var(--purple-light)',
    border: '#5b3f8a',
    ages: '8–18 years',
    tagline: 'From block code to real AI.',
    desc: 'Children start with visual block coding and progress naturally through Python to real AI projects — all in a fully safe, supervised online environment with real projects at every level.',
    modules: [
      { icon: '🧱', title: 'Block Coding', desc: 'Scratch-style visual coding to learn loops, conditionals and logic.' },
      { icon: '🐍', title: 'Python Programming', desc: 'Text-based programming with real project output.' },
      { icon: '🤖', title: 'AI & Machine Learning', desc: 'Train simple ML models, understand AI concepts practically.' },
      { icon: '🌐', title: 'Web Basics', desc: 'HTML, CSS and JavaScript fundamentals.' },
    ],
    outcomes: ['Build real games and apps', 'Understand how AI works', 'Python fluency', 'Portfolio of projects for school applications'],
    batchSize: '3–5 kids',
    sessionLength: '60 min',
    frequency: '2x per week',
  },
  {
    id: 'robotics',
    emoji: '🤖',
    world: 'Robot World',
    name: 'Robotics',
    color: 'var(--coral)',
    bg: 'var(--coral-light)',
    border: '#c44430',
    ages: '6–16 years',
    tagline: 'Build. Program. Compete.',
    desc: "Real robotics training is expensive and hard to access. We deliver it at home — using a low-cost kit we supply — guided live by expert tutors. Children build, code, and compete.",
    modules: [
      { icon: '🔧', title: 'Robot Building', desc: 'Assemble and modify robots using our supplied kit.' },
      { icon: '📡', title: 'Sensors & Electronics', desc: 'Understand how robots sense their environment.' },
      { icon: '💡', title: 'Robot Programming', desc: 'Code robot behaviour using block-based and Python logic.' },
      { icon: '🏆', title: 'Compete & Showcase', desc: 'Enter competitions and present at end-of-term showcases.' },
    ],
    outcomes: ['Build a working robot', 'Understand sensors and actuators', 'Compete in junior robotics leagues', 'STEM portfolio project'],
    batchSize: '3–5 kids',
    sessionLength: '60 min',
    frequency: '1x per week',
  },
];

export default function SubjectsPage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoSubject, setDemoSubject] = useState('');

  return (
    <>
      <Navbar onBookDemo={() => setDemoOpen(true)} />
      <main>
        {/* Hero */}
        <div className="page-hero" style={{ background: 'var(--cream-dark)' }}>
          <div className="container">
            <span className="badge badge-yellow" style={{ marginBottom: 16 }}>📚 Four worlds to explore</span>
            <h1 className="heading-xl" style={{ marginBottom: 16 }}>All our subjects</h1>
            <p className="body-lg" style={{ color: 'var(--mid)', maxWidth: 560, margin: '0 auto' }}>
              Start with one world, unlock the next as your child grows. Every subject is taught live, in small batches, by tutors who know your child&apos;s name.
            </p>
          </div>
        </div>

        {/* Subjects */}
        {SUBJECTS.map((subject, idx) => (
          <section
            key={subject.id}
            id={subject.id}
            className="section"
            style={{ background: idx % 2 === 1 ? 'var(--cream-dark)' : 'var(--cream)' }}
          >
            <div className="container">
              <div className="two-col" style={{ alignItems: 'flex-start' }}>
                <div>
                  <div
                    style={{
                      width: 72, height: 72, borderRadius: 20,
                      background: subject.bg,
                      border: `3px solid ${subject.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '2.4rem', marginBottom: 20,
                    }}
                  >
                    {subject.emoji}
                  </div>
                  <span className="badge" style={{ background: subject.bg, borderColor: subject.color, color: subject.border, marginBottom: 12 }}>
                    {subject.world} · Ages {subject.ages}
                  </span>
                  <h2 className="heading-lg" style={{ marginBottom: 8 }}>{subject.name}</h2>
                  <p style={{ color: subject.color, fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1.1rem', marginBottom: 16 }}>
                    {subject.tagline}
                  </p>
                  <p style={{ color: 'var(--mid)', marginBottom: 24, lineHeight: 1.7 }}>{subject.desc}</p>

                  {/* Session info */}
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
                    {[
                      { icon: '👥', label: subject.batchSize },
                      { icon: '⏱', label: subject.sessionLength },
                      { icon: '📅', label: subject.frequency },
                    ].map((info) => (
                      <div key={info.label} className="card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span>{info.icon}</span>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{info.label}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="btn btn-coral"
                    onClick={() => { setDemoSubject(subject.name); setDemoOpen(true); }}
                  >
                    Try a free {subject.name} demo
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* Modules */}
                  <div className="card">
                    <h3 className="heading-sm" style={{ marginBottom: 16 }}>What we cover</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {subject.modules.map((m) => (
                        <div key={m.title} style={{ display: 'flex', gap: 12 }}>
                          <div
                            className="icon-box"
                            style={{ background: subject.bg, width: 40, height: 40, borderRadius: 10, fontSize: '1.2rem' }}
                          >
                            {m.icon}
                          </div>
                          <div>
                            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, marginBottom: 2 }}>{m.title}</p>
                            <p style={{ color: 'var(--mid)', fontSize: '0.85rem' }}>{m.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcomes */}
                  <div className="card" style={{ background: subject.bg, borderColor: subject.color }}>
                    <h3 className="heading-sm" style={{ marginBottom: 12 }}>What your child will achieve</h3>
                    {subject.outcomes.map((o) => (
                      <div key={o} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                        <span style={{ color: subject.color, fontWeight: 700, fontSize: '1.1rem', lineHeight: 1 }}>✓</span>
                        <span style={{ fontSize: '0.9rem' }}>{o}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section style={{ background: 'var(--dark)', padding: '64px 0', textAlign: 'center' }}>
          <div className="container">
            <h2 className="heading-lg" style={{ color: 'var(--white)', marginBottom: 16 }}>
              Not sure which world to start with?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 32 }}>
              Book a free demo and let our tutors suggest the best starting point for your child.
            </p>
            <button className="btn btn-yellow btn-lg" onClick={() => setDemoOpen(true)}>
              Book a free demo class
            </button>
          </div>
        </section>
      </main>
      <Footer />
      {demoOpen && <DemoModal subject={demoSubject} onClose={() => setDemoOpen(false)} />}
    </>
  );
}
