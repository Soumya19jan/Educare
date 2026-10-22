'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DemoModal from '../../components/DemoModal';

const FAQS = [
  {
    category: 'Admissions & Demo',
    questions: [
      {
        q: 'What is the format of the Free Trial Demo class?',
        a: 'The free trial is a live 45-minute 1:1 session with a senior mentor. During the session, the mentor assesses your child’s baseline confidence, teaches a hands-on project (e.g. creating a mini animation or solving an interactive puzzle), and provides you with a personalized learning roadmap.',
      },
      {
        q: 'What age groups and grades do you accept?',
        a: 'Our programs are curated for children between ages 6 to 16 (Grades 1 through 10). Curriculum tracks are age-calibrated so early learners start with visual block environments and story reading, while older students tackle Python, Arduino C++, and competitive aptitude.',
      },
      {
        q: 'Can we try multiple subjects before deciding?',
        a: 'Yes! You can book an initial free demo in any subject. If your child is curious about coding and robotics as well as maths, our counselors can arrange an orientation across tracks.',
      },
    ],
  },
  {
    category: 'Classroom & Format',
    questions: [
      {
        q: 'How many students are in one batch?',
        a: 'We strictly enforce a maximum of 4 students per batch. This ensures every student receives dedicated screen-share time, personal mentoring, and immediate answers to doubts.',
      },
      {
        q: 'What equipment and hardware does my child need?',
        a: 'A desktop or laptop (Windows, Mac, or Chromebook) with a working webcam, microphone, and stable internet connection (at least 10 Mbps). Tablets can be used for English reading and Math sprints, but a computer is recommended for Coding and Robotics.',
      },
      {
        q: 'How does the Robotics kit delivery work?',
        a: 'Once enrolled in the Robotics track, an EduSure IoT & Maker Kit (containing microcontrollers, ultrasonic sensors, servos, LEDs, breadboards, and jumper cables) is dispatched to your doorstep with tracking.',
      },
      {
        q: 'Can classes be rescheduled if my child is sick or traveling?',
        a: 'Yes! You can request a reschedule up to 4 hours before the session directly through the Parent Companion dashboard or by messaging your dedicated academic counselor on WhatsApp.',
      },
    ],
  },
  {
    category: 'Mentors & Quality',
    questions: [
      {
        q: 'How are EduSure mentors selected?',
        a: 'Only the top 3% of applicants pass our rigorous 5-stage screening, which tests subject mastery, child psychology, pedagogical warmth, and live class management. All mentors undergo continuous quality audits.',
      },
      {
        q: 'How do parents receive feedback on progress?',
        a: 'After every live session, parents receive an update on the Parent Companion app including session concepts, homework challenges, and audio notes from the mentor. You also receive comprehensive milestone reports every 8 sessions.',
      },
    ],
  },
];

export default function FAQPage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<string>('0-0');

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? '' : id);
  };

  return (
    <>
      <Navbar onBookDemo={() => setDemoOpen(true)} />

      <main style={{ background: 'var(--cream)', minHeight: '100vh', paddingTop: 90 }}>
        {/* Header */}
        <section style={{ padding: '60px 0 40px', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <span className="badge badge-coral" style={{ marginBottom: 16, display: 'inline-block' }}>
              Common Questions
            </span>
            <h1 className="heading-xl" style={{ marginBottom: 16 }}>
              Frequently Asked Questions
            </h1>
            <p style={{ color: 'var(--mid)', fontSize: '1.1rem', lineHeight: 1.7 }}>
              Everything you need to know about EduSure live 1:4 tuitions, hardware kits, mentors, and class schedules.
            </p>
          </div>
        </section>

        {/* FAQs list */}
        <section style={{ padding: '20px 0 80px' }}>
          <div className="container" style={{ maxWidth: 800 }}>
            {FAQS.map((category, catIdx) => (
              <div key={category.category} style={{ marginBottom: 40 }}>
                <h2 className="heading-sm" style={{ color: 'var(--dark)', marginBottom: 16, paddingBottom: 8, borderBottom: '2px solid var(--border)' }}>
                  {category.category}
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {category.questions.map((faq, qIdx) => {
                    const id = `${catIdx}-${qIdx}`;
                    const isOpen = openIndex === id;
                    return (
                      <div
                        key={faq.q}
                        className="card"
                        style={{
                          background: 'white',
                          padding: '18px 20px',
                          cursor: 'pointer',
                          borderColor: isOpen ? 'var(--coral)' : 'var(--border)',
                          transition: 'border-color 0.2s ease',
                        }}
                        onClick={() => toggleAccordion(id)}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                          <h3 style={{
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 600,
                            fontSize: '1.05rem',
                            color: isOpen ? 'var(--coral-dark)' : 'var(--dark)',
                            margin: 0
                          }}>
                            {faq.q}
                          </h3>
                          <span style={{
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            color: isOpen ? 'var(--coral)' : 'var(--mid)',
                            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                            display: 'inline-block',
                            lineHeight: 1
                          }}>
                            +
                          </span>
                        </div>

                        {isOpen && (
                          <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                            <p style={{ color: 'var(--mid)', fontSize: '0.95rem', lineHeight: 1.65, margin: 0 }}>
                              {faq.a}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Bottom Support Banner */}
            <div className="card" style={{
              background: 'var(--cream-dark)',
              textAlign: 'center',
              padding: '36px 24px',
              marginTop: 48,
              border: '2px dashed var(--coral)'
            }}>
              <h3 className="heading-sm" style={{ marginBottom: 8 }}>Still have a specific question?</h3>
              <p style={{ color: 'var(--mid)', fontSize: '0.95rem', marginBottom: 20 }}>
                Our academic counselors are online and happy to walk you through any details.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-coral" onClick={() => setDemoOpen(true)}>
                  Book a free demo →
                </button>
                <Link href="/contact" className="btn btn-outline">
                  Contact counselor
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
    </>
  );
}
