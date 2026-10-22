import Link from 'next/link';

const FOOTER_LINKS = {
  'Subjects': [
    { label: 'English & Communication', href: '/subjects#english' },
    { label: 'Maths & Aptitude', href: '/subjects#maths' },
    { label: 'Coding & AI', href: '/subjects#coding' },
    { label: 'Robotics', href: '/subjects#robotics' },
  ],
  'Company': [
    { label: 'How it works', href: '/how-it-works' },
    { label: 'For parents', href: '/for-parents' },
    { label: 'For schools', href: '/for-schools' },
    { label: 'About us', href: '/about' },
  ],
  'Support': [
    { label: 'FAQs', href: '/faq' },
    { label: 'Contact us', href: '/contact' },
    { label: 'Privacy policy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer-dark">
      <div className="container" style={{ padding: '60px 24px 32px' }}>
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div style={{ maxWidth: 260 }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                📚
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', color: 'white' }}>
                Edu<span style={{ color: 'var(--yellow)' }}>Sure</span>
              </span>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', lineHeight: 1.7 }}>
              Live, expert tutoring in English, Maths, Coding &amp; Robotics — taught by tutors who know your child by name.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              {['📘 Facebook', '📸 Instagram', '▶ YouTube'].map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: '0.75rem', padding: '4px 10px', borderRadius: 8,
                    background: 'rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'white', marginBottom: 12, fontSize: '0.9rem' }}>
                {section}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {links.map((l) => (
                  <Link key={l.label} href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} EduSure. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link href="/privacy" className="footer-link">
              Privacy policy
            </Link>
            <Link href="/terms" className="footer-link">
              Terms
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hi%20EduSure%2C%20I%20have%20an%20inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
