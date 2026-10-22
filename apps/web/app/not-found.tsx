'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main style={{
        minHeight: '80vh',
        background: 'var(--cream)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 60px',
        textAlign: 'center'
      }}>
        <div className="card" style={{ maxWidth: 560, width: '100%', padding: '48px 32px' }}>
          <div style={{
            fontSize: '4.5rem',
            lineHeight: 1,
            marginBottom: 16
          }}>
            🧭
          </div>
          <span className="badge badge-coral" style={{ marginBottom: 16, display: 'inline-block' }}>
            Page Not Found
          </span>
          <h1 className="heading-lg" style={{ marginBottom: 12 }}>
            Oops! This lesson is in another classroom
          </h1>
          <p style={{ color: 'var(--mid)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: 32 }}>
            The page you are looking for might have been moved, renamed, or is currently being explored by our space rovers.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn btn-coral">
              Back to Home →
            </Link>
            <Link href="/subjects" className="btn btn-outline">
              Explore Subjects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
