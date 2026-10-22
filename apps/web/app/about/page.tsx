'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DemoModal from '../../components/DemoModal';

const PILLARS = [
  {
    emoji: '👥',
    title: 'Strict 1:4 Batch Ratio',
    desc: 'No massive webinar auditoriums. Maximum 4 children per mentor ensures every single voice is heard, questions are addressed instantly, and no child gets left behind.',
  },
  {
    emoji: '🛠️',
    title: 'Learn by Making, Not Staring',
    desc: 'Children learn coding by building real playable games, maths through interactive puzzles and simulations, and robotics with hands-on hardware components shipped to their home.',
  },
  {
    emoji: '🧠',
    title: 'Future-Ready Life Skills',
    desc: 'Beyond rote school exams, our syllabus focuses on structured thinking, public speaking confidence, logic debugging, and ethical awareness in the age of Artificial Intelligence.',
  },
  {
    emoji: '📊',
    title: 'Transparent Parent Feedback',
    desc: 'No vague term report cards. After every single session, parents receive audio notes, project milestone highlights, and skill mastery heatmaps from the mentor.',
  },
];

const STATS = [
  { value: '10,000+', label: 'Happy Learners Across 14 Countries' },
  { value: '1:4', label: 'Max Student to Mentor Ratio' },
  { value: '98.4%', label: 'Parent Retention Rate' },
  { value: '450+', label: 'Certified STEM & Language Mentors' },
];

export default function AboutPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <Navbar onBookDemo={() => setDemoOpen(true)} />

      <main style={{ background: 'var(--cream)', minHeight: '100vh', paddingTop: 90 }}>
        {/* Hero */}
        <section style={{ padding: '60px 0 50px', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: 840 }}>
            <span className="badge badge-yellow" style={{ marginBottom: 16, display: 'inline-block' }}>
              Our Story &amp; Mission
            </span>
            <h1 className="heading-xl" style={{ marginBottom: 20 }}>
              Nurturing confident thinkers, <br className="hide-mobile" />
              creators, and <span style={{ color: 'var(--coral)' }}>problem solvers</span>
            </h1>
            <p style={{ color: 'var(--mid)', fontSize: '1.15rem', lineHeight: 1.7, maxWidth: 700, margin: '0 auto' }}>
              We started EduSure with a simple conviction: learning should feel like an exciting adventure, not an endless chore of passive video watching.
            </p>
          </div>
        </section>

        {/* Stats Strip */}
        <section style={{ background: 'var(--white)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '40px 0' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, textAlign: 'center' }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--coral)', marginBottom: 4 }}>
                  {s.value}
                </div>
                <div style={{ color: 'var(--mid)', fontSize: '0.875rem', fontWeight: 600 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pillars Section */}
        <section style={{ padding: '80px 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="badge badge-coral" style={{ marginBottom: 12, display: 'inline-block' }}>
                Pedagogy First
              </span>
              <h2 className="heading-lg">Why parents choose EduSure</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {PILLARS.map((p) => (
                <div key={p.title} className="card" style={{ background: 'white' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>{p.emoji}</div>
                  <h3 className="heading-sm" style={{ marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ color: 'var(--mid)', fontSize: '0.925rem', lineHeight: 1.65 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The 4 Subjects Overview */}
        <section style={{ padding: '60px 0 90px', background: 'var(--cream-dark)' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <span className="badge badge-forest" style={{ marginBottom: 12, display: 'inline-block' }}>
              Comprehensive Curriculum
            </span>
            <h2 className="heading-lg" style={{ marginBottom: 16 }}>
              Four worlds. One unified platform.
            </h2>
            <p style={{ color: 'var(--mid)', fontSize: '1rem', maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.6 }}>
              Explore our four foundational tracks designed to complement your child&apos;s school curriculum while developing real-world creative autonomy.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
              {[
                { name: 'English & Communication', icon: '📖', color: 'var(--coral)', path: '/subjects#english' },
                { name: 'Maths & Aptitude', icon: '🔢', color: 'var(--yellow)', path: '/subjects#maths' },
                { name: 'Coding & AI', icon: '💻', color: 'var(--forest)', path: '/subjects#coding' },
                { name: 'Robotics & Hardware', icon: '🤖', color: 'var(--navy)', path: '/subjects#robotics' },
              ].map((sub) => (
                <Link
                  key={sub.name}
                  href={sub.path}
                  className="card"
                  style={{
                    background: 'white',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 12,
                    padding: '24px 16px'
                  }}
                >
                  <div style={{ fontSize: '2.2rem' }}>{sub.icon}</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', color: 'var(--dark)' }}>
                    {sub.name}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--coral)', fontWeight: 600 }}>
                    View Syllabus →
                  </span>
                </Link>
              ))}
            </div>

            <button className="btn btn-coral btn-lg" onClick={() => setDemoOpen(true)}>
              Book a Free Demo Class →
            </button>
          </div>
        </section>
      </main>

      <Footer />
      {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
    </>
  );
}
