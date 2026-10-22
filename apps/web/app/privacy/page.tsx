'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DemoModal from '../../components/DemoModal';

export default function PrivacyPolicyPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <Navbar onBookDemo={() => setDemoOpen(true)} />

      <main style={{ background: 'var(--cream)', minHeight: '100vh', paddingTop: 90 }}>
        <section style={{ padding: '60px 0 80px' }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <span className="badge badge-yellow" style={{ marginBottom: 12, display: 'inline-block' }}>
              Legal &amp; Safety
            </span>
            <h1 className="heading-xl" style={{ marginBottom: 16 }}>Privacy Policy</h1>
            <p style={{ color: 'var(--mid)', fontSize: '0.9rem', marginBottom: 32 }}>
              Last updated: October 2026
            </p>

            <div className="card" style={{ background: 'white', display: 'flex', flexDirection: 'column', gap: 24, fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--dark)' }}>
              <div>
                <h2 className="heading-sm" style={{ marginBottom: 8 }}>1. Student Privacy &amp; Child Safety</h2>
                <p style={{ color: 'var(--mid)' }}>
                  EduSure is committed to the highest standards of child online safety. We strictly comply with COPPA (Children’s Online Privacy Protection Act) and international data protection standards. We never sell student data, show external advertisements, or expose student accounts to unauthorized third parties.
                </p>
              </div>

              <div>
                <h2 className="heading-sm" style={{ marginBottom: 8 }}>2. Information We Collect</h2>
                <p style={{ color: 'var(--mid)' }}>
                  When parents register for classes, we collect parent contact information (name, email, phone number) and basic child details (name, grade level, learning goals). During live interactive sessions, audio and video streams are encrypted in transit and session recordings are kept securely for quality assurance and parent review only.
                </p>
              </div>

              <div>
                <h2 className="heading-sm" style={{ marginBottom: 8 }}>3. Mentor Vetting &amp; Background Checks</h2>
                <p style={{ color: 'var(--mid)' }}>
                  All EduSure instructors undergo rigorous background checks, identity verification, and safeguarding compliance protocols prior to conducting any live 1:4 session.
                </p>
              </div>

              <div>
                <h2 className="heading-sm" style={{ marginBottom: 8 }}>4. Data Deletion Requests</h2>
                <p style={{ color: 'var(--mid)' }}>
                  Parents and guardians hold full rights to view, update, or permanently delete their child’s profile, session recordings, and submitted assignments at any time by contacting privacy@edusure.in.
                </p>
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
