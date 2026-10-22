'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Subjects', href: '/subjects' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'For parents', href: '/for-parents' },
  { label: 'For schools', href: '/for-schools' },
];

interface NavbarProps {
  onBookDemo?: () => void;
}

export default function Navbar({ onBookDemo }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 800,
          background: scrolled ? 'rgba(250,249,245,0.95)' : 'var(--cream)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'all 0.25s ease',
        }}
      >
        <div className="container" style={{ height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'var(--yellow)',
                border: '2px solid #d4a820',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.3rem',
              }}
            >
              📚
            </div>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '1.3rem',
                color: 'var(--dark)',
              }}
            >
              Edu<span style={{ color: 'var(--coral)' }}>Sure</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/auth/login" className="nav-link" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
              Log in
            </Link>
            <button className="btn btn-coral btn-sm" onClick={onBookDemo}>
              Book a free demo
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="show-mobile"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            style={{
              width: 40, height: 40, borderRadius: 10,
              border: '2px solid var(--border)',
              background: 'var(--white)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 5,
            }}
          >
            <span style={{ width: 18, height: 2, background: 'var(--dark)', borderRadius: 2, display: 'block' }} />
            <span style={{ width: 18, height: 2, background: 'var(--dark)', borderRadius: 2, display: 'block' }} />
            <span style={{ width: 18, height: 2, background: 'var(--dark)', borderRadius: 2, display: 'block' }} />
          </button>
        </div>
      </nav>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 900,
            background: 'rgba(0,0,0,0.4)',
          }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            style={{
              position: 'absolute', top: 0, right: 0, bottom: 0,
              width: 'min(320px, 90vw)',
              background: 'var(--cream)',
              padding: '24px',
              overflow: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close btn */}
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'absolute', top: 16, right: 16,
                width: 36, height: 36, borderRadius: 10,
                background: 'var(--cream-dark)', border: '2px solid var(--border)',
                fontSize: '1.1rem',
              }}
            >
              ✕
            </button>

            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                📚
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem' }}>
                Edu<span style={{ color: 'var(--coral)' }}>Sure</span>
              </span>
            </Link>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 24 }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    padding: '12px 16px', borderRadius: 12,
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600, fontSize: '1.05rem',
                    color: 'var(--dark)',
                    display: 'block',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/auth/login"
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: '12px 16px', borderRadius: 12,
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700, fontSize: '1.05rem',
                  color: 'var(--coral)',
                  display: 'block',
                }}
              >
                Log in →
              </Link>
            </div>

            <button
              className="btn btn-coral"
              style={{ width: '100%' }}
              onClick={() => { setMobileOpen(false); onBookDemo?.(); }}
            >
              Book a free demo
            </button>
          </div>
        </div>
      )}
    </>
  );
}
