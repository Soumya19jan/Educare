'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DemoModal from '../../components/DemoModal';

export default function TermsOfServicePage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <Navbar onBookDemo={() => setDemoOpen(true)} />

      <main style={{ background: 'var(--cream)', minHeight: '100vh', paddingTop: 90 }}>
        <section style={{ padding: '60px 0 80px' }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <span className="badge badge-yellow" style={{ marginBottom: 12, display: 'inline-block' }}>
              Terms of Agreement
            </span>
            <h1 className="heading-xl" style={{ marginBottom: 16 }}>Terms of Service</h1>
            <p style={{ color: 'var(--mid)', fontSize: '0.9rem', marginBottom: 32 }}>
              Last updated: October 2026
            </p>

            <div className="card" style={{ background: 'white', display: 'flex', flexDirection: 'column', gap: 24, fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--dark)' }}>
              <div>
                <h2 className="heading-sm" style={{ marginBottom: 8 }}>1. Services Overview</h2>
                <p style={{ color: 'var(--mid)' }}>
                  EduSure provides live online 1:4 tutoring, interactive digital learning tools, coding sandboxes, and STEM kits for students across English, Mathematics, Coding, and Robotics tracks.
                </p>
              </div>

              <div>
                <h2 className="heading-sm" style={{ marginBottom: 8 }}>2. Free Demo Class &amp; Enrollment</h2>
                <p style={{ color: 'var(--mid)' }}>
                  Every new student is entitled to one free trial class. Enrolling in paid batches is voluntary and flexible. You may choose pay-as-you-go monthly credits or term packages with a 100% money-back guarantee for unused sessions.
                </p>
              </div>

              <div>
                <h2 className="heading-sm" style={{ marginBottom: 8 }}>3. Code of Conduct</h2>
                <p style={{ color: 'var(--mid)' }}>
                  We cultivate a kind, encouraging, and collaborative learning environment. Bullying, harassment, or disruptive behavior during live sessions will result in immediate suspension with refund of remaining balances.
                </p>
              </div>

              <div>
                <h2 className="heading-sm" style={{ marginBottom: 8 }}>4. Hardware Kits &amp; Shipping</h2>
                <p style={{ color: 'var(--mid)' }}>
                  Hardware kits delivered for Robotics &amp; IoT tracks are physical assets owned by the student upon delivery. Faulty components will be replaced free of charge within 30 days of shipment receipt.
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
