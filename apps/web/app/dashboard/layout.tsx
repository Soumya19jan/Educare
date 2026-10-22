'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users, Bell, LogOut, Sparkles, Home, Video,
  Award, MessageSquare, Menu, X, Shield, ArrowLeft,
  Trophy, BookOpen, CreditCard
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Determine current active portal
  const isTeacher = pathname.includes('/dashboard/teacher');
  const isParent = pathname.includes('/dashboard/parent');
  const isStudent = !isTeacher && !isParent;

  // Dedicated branding & navigation for each persona
  const portalConfig = isTeacher
    ? {
        roleName: 'Teacher',
        roleEmoji: '👩‍🏫',
        portalTitle: 'Mentor Workstation',
        subTitle: 'EduSure Partner Mentor',
        badgeColor: 'badge-yellow',
        nav: [
          { label: 'Mentor Overview', href: '/dashboard/teacher', icon: Home },
          { label: 'My 1:4 Batches (Robotics & Code)', href: '/dashboard/teacher#batches', icon: Users },
          { label: 'Launch Live Video Lab', href: '/dashboard/teacher#live-session', icon: Video },
          { label: 'Code & Circuit Reviews', href: '/dashboard/teacher#grading', icon: Award },
          { label: 'Parent Notes & Updates', href: '/dashboard/teacher#ptm', icon: MessageSquare },
          { label: 'Mentor Earnings & Hours', href: '/dashboard/teacher#earnings', icon: CreditCard },
        ],
        user: { name: 'Dr. Sarah Vance', tag: 'Lead Robotics & STEM Mentor', initials: 'SV' },
      }
    : isParent
    ? {
        roleName: 'Parent',
        roleEmoji: '👨‍👩‍👧',
        portalTitle: 'Parent Companion',
        subTitle: 'Project Monitoring & Mentor Connect',
        badgeColor: 'badge-green',
        nav: [
          { label: 'Ward Overview', href: '/dashboard/parent', icon: Home },
          { label: 'Live Class Attendance', href: '/dashboard/parent#attendance', icon: Shield },
          { label: 'Robotics & Coding Portfolio', href: '/dashboard/parent#analytics', icon: Award },
          { label: 'Chat With Child’s Mentor', href: '/dashboard/parent#messaging', icon: MessageSquare },
          { label: 'Class Credits & Kits', href: '/dashboard/parent#credits', icon: BookOpen },
        ],
        user: { name: 'Marcus Johnson', tag: 'Alex’s Guardian', initials: 'MJ' },
      }
    : {
        roleName: 'Student',
        roleEmoji: '🎓',
        portalTitle: 'Student Maker Space',
        subTitle: 'Robotics, Coding & Hands-On STEM',
        badgeColor: 'badge-coral',
        nav: [
          { label: 'My Builder Hub', href: '/dashboard/student', icon: Home },
          { label: 'Join Live 1:4 Video Lab', href: '/dashboard/student#live-class', icon: Video },
          { label: 'Python & Circuit Sandbox', href: '/dashboard/student#speed-arena', icon: Trophy },
          { label: 'Project Milestones', href: '/dashboard/student#worksheets', icon: Award },
          { label: 'Ask AI 24/7 Mentor', href: '/dashboard/student#ai-tutor', icon: Sparkles },
        ],
        user: { name: 'Alex Johnson', tag: 'Batch R-102 (Robotics & Python)', initials: 'AJ' },
      };

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar for Desktop */}
        <aside
          style={{
            background: 'white',
            borderRight: '1px solid var(--border)',
            width: 270,
            display: 'none',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 24,
            flexShrink: 0,
          }}
          className="hidden md:flex"
        >
          <div>
            {/* Logo & Portal Identity */}
            <div style={{ paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid var(--border)' }}>
              <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: 'var(--yellow)', border: '2px solid #d4a820',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.3rem',
                  }}
                >
                  📚
                </div>
                <div>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--dark)', display: 'block', lineHeight: 1.1 }}>
                    Edu<span style={{ color: 'var(--coral)' }}>Sure</span>
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--mid)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {portalConfig.portalTitle}
                  </span>
                </div>
              </Link>
            </div>

            {/* Role Navigation Items */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--light)', textTransform: 'uppercase', letterSpacing: '0.05em', paddingLeft: 8, marginBottom: 4 }}>
                Menu
              </span>
              {portalConfig.nav.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 14px',
                      borderRadius: 12,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--dark)',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease',
                      background: 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--cream-dark)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <Icon style={{ width: 18, height: 18, color: 'var(--coral)' }} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User Pill & Back to Home */}
          <div style={{ paddingTop: 20, borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 14,
                background: 'var(--cream)', border: '1px solid var(--border)'
              }}
            >
              <div
                style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'var(--yellow)', border: '2px solid #d4a820',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.85rem', color: 'var(--dark)'
                }}
              >
                {portalConfig.user.initials}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--dark)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {portalConfig.user.name}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--mid)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {portalConfig.user.tag}
                </div>
              </div>
            </div>

            <Link
              href="/"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '10px', borderRadius: 12,
                border: '2px solid var(--border)', background: 'white',
                color: 'var(--dark)', fontSize: '0.825rem', fontWeight: 700,
                textDecoration: 'none', transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--cream-dark)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
              }}
            >
              <ArrowLeft style={{ width: 14, height: 14 }} /> Back to Home
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Top Header Bar */}
          <header
            style={{
              height: 68,
              background: 'white',
              borderBottom: '1px solid var(--border)',
              padding: '0 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              zIndex: 30,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="md:hidden"
                style={{
                  padding: 8, borderRadius: 10,
                  border: '1px solid var(--border)', background: 'var(--cream)',
                  cursor: 'pointer'
                }}
              >
                {mobileNavOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--dark)', margin: 0 }}>
                  {portalConfig.portalTitle}
                </h1>
                <span className={`badge ${portalConfig.badgeColor}`} style={{ fontSize: '0.72rem' }}>
                  Live 1:4 Tuition
                </span>
              </div>
            </div>

            {/* Quick Role Switcher Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: 4,
                  background: 'var(--cream-dark)',
                  borderRadius: 14,
                  border: '1px solid var(--border)',
                }}
              >
                {[
                  { role: 'student', label: '🎓 Student', href: '/dashboard/student', active: isStudent },
                  { role: 'teacher', label: '👩‍🏫 Tutor', href: '/dashboard/teacher', active: isTeacher },
                  { role: 'parent', label: '👨‍👩‍👧 Parent', href: '/dashboard/parent', active: isParent },
                ].map((item) => (
                  <Link
                    key={item.role}
                    href={item.href}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 10,
                      fontSize: '0.8rem',
                      fontWeight: item.active ? 700 : 600,
                      textDecoration: 'none',
                      background: item.active ? 'white' : 'transparent',
                      color: item.active ? 'var(--dark)' : 'var(--mid)',
                      boxShadow: item.active ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Notification & Home */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setNotificationOpen(!notificationOpen)}
                    style={{
                      width: 38, height: 38, borderRadius: 10,
                      border: '1px solid var(--border)', background: 'var(--cream)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', position: 'relative',
                    }}
                  >
                    <Bell style={{ width: 16, height: 16, color: 'var(--dark)' }} />
                    <span style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: '50%', background: 'var(--coral)' }} />
                  </button>

                  {notificationOpen && (
                    <div
                      style={{
                        position: 'absolute', right: 0, marginTop: 8,
                        width: 280, background: 'white',
                        border: '2px solid var(--border)', borderRadius: 16,
                        boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                        padding: 16, zIndex: 50,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 8, marginBottom: 10 }}>
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem' }}>Tuition Alerts</span>
                        <span className="badge badge-coral" style={{ fontSize: '0.65rem' }}>NEW</span>
                      </div>
                      <div style={{ padding: 10, borderRadius: 10, background: 'var(--cream)', fontSize: '0.8rem', color: 'var(--dark)', lineHeight: 1.5 }}>
                        <strong style={{ display: 'block', color: 'var(--dark)' }}>Robotics Batch R-102</strong>
                        Classroom room is ready. Tutor Dr. Sarah Vance is online.
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '8px 14px', borderRadius: 10,
                    border: '1px solid var(--border)', background: 'var(--cream)',
                    fontSize: '0.8rem', fontWeight: 700, color: 'var(--dark)',
                    textDecoration: 'none',
                  }}
                >
                  <LogOut style={{ width: 14, height: 14 }} />
                  <span className="hide-mobile">Exit</span>
                </Link>
              </div>
            </div>
          </header>

          {/* Mobile Navigation Drawer */}
          {mobileNavOpen && (
            <div style={{ background: 'white', borderBottom: '2px solid var(--border)', padding: 16 }} className="md:hidden">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {portalConfig.nav.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    style={{
                      padding: '10px 12px', borderRadius: 10,
                      fontWeight: 600, fontSize: '0.9rem',
                      color: 'var(--dark)', textDecoration: 'none',
                      background: 'var(--cream)',
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Main Body */}
          <main style={{ flex: 1, padding: '28px 24px', overflowY: 'auto' }}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
