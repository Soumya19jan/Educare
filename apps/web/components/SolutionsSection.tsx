'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Users, HeartHandshake, CheckCircle2, ArrowRight, Video, Sparkles, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function SolutionsSection({ onOpenAuth }: { onOpenAuth: () => void }) {
  const [activePersona, setActivePersona] = useState<'student' | 'teacher' | 'parent'>('student');

  const personas = {
    student: {
      roleTitle: 'For Student Innovators (Ages 7 - 17)',
      headline: 'Build Real Robots & Code Real Projects with 3 Classmates',
      description: 'Step into a creative maker space where you never learn alone. Receive your physical hardware kit at your door, build autonomous rovers, code Python games, and test circuit electronics with instant mentor feedback.',
      portalLink: '/dashboard/student',
      portalCta: 'Explore Student Maker Space',
      stats: [
        { label: 'Active Batch Size', value: '1 : 4' },
        { label: 'Hands-On Building Time', value: '75%' },
        { label: 'Average Capstone Projects', value: '6 / Yr' },
      ],
      highlights: [
        'Live 1:4 video classroom with interactive circuit simulator and Python code sandbox',
        'Physical EduSure Hardware Box delivered to your doorstep with Arduino, sensors & motors',
        'Speed Math mental agility sprints and gamified builder streaks with weekly stars',
        'Build and showcase your capstone 4WD Obstacle Rover to peers and parents',
      ],
      tagline: 'Loved by over 12,000+ young creators and future engineers worldwide.',
    },
    teacher: {
      roleTitle: 'For Partner Mentors & Tutors',
      headline: 'High-Impact 1:4 Mentorship with Interactive Teaching Tools',
      description: 'Work with motivated learners in focused 4-student batches. Leverage pre-built virtual breadboards, live student code inspectors, and automated parent communication so you can focus 100% on pure teaching.',
      portalLink: '/dashboard/teacher',
      portalCta: 'Visit Mentor Workstation',
      stats: [
        { label: 'Max Students Per Batch', value: '4' },
        { label: 'Average Tutor Earnings', value: '₹45k / Mo' },
        { label: 'Admin Paperwork Saved', value: '12 hrs / Wk' },
      ],
      highlights: [
        'Live breadboard & sensor telemetry view to spot student wiring errors instantly',
        'In-browser Python code execution inspector for real-time debugging assistance',
        '1-click star coin awards and post-session parent note dispatcher',
        'Flexible batch scheduling (Robotics, Python AI, IoT Prototypes, Speed Math)',
      ],
      tagline: 'Empowering certified engineers, roboticists, and educators to teach globally.',
    },
    parent: {
      roleTitle: 'For Parents & Guardians',
      headline: 'Complete Transparency, Verified Milestones & Real Skills',
      description: 'Say goodbye to passive screen time. Watch your child build tangible electronics, write actual software, and talk directly with their mentor through bi-weekly 1-on-1 video calls.',
      portalLink: '/dashboard/parent',
      portalCta: 'Open Parent Companion',
      stats: [
        { label: 'Parent Satisfaction Rate', value: '99.2%' },
        { label: 'Kit Dispatch Tracking', value: 'Live GPS' },
        { label: 'Direct Mentor Access', value: '1-on-1 PTM' },
      ],
      highlights: [
        'Live session status tracker with one-click mentor video conference booking',
        'Track physical robotics kit delivery directly from the platform',
        'Verified project portfolio displaying working videos of child’s rover & games',
        'Automated post-session digests covering concepts learned, lines of code, and attendance',
      ],
      tagline: 'Zero guesswork—just tangible engineering confidence you can see at home.',
    },
  };

  const current = personas[activePersona];

  return (
    <section id="solutions" className="section-padding relative bg-dark-900/60 border-t border-dark-800">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-primary-400 mb-2 block">
            Dedicated Personas
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            A Tailored Portal for <span className="gradient-text">Every Role</span>
          </h2>
          <p className="text-dark-300 text-sm md:text-base">
            Whether you are building robots, mentoring small batches, or monitoring your child’s engineering journey, EduSure provides an uncluttered dedicated workspace.
          </p>

          {/* Persona Switcher Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-dark-800/80 border border-dark-700/60 gap-1.5">
            <button
              onClick={() => setActivePersona('student')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activePersona === 'student'
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'text-dark-400 hover:text-white'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>Student Innovator</span>
            </button>
            <button
              onClick={() => setActivePersona('teacher')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activePersona === 'teacher'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-dark-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Partner Mentor</span>
            </button>
            <button
              onClick={() => setActivePersona('parent')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activePersona === 'parent'
                  ? 'bg-secondary-500 text-white shadow-lg'
                  : 'text-dark-400 hover:text-white'
              }`}
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Parent Companion</span>
            </button>
          </div>
        </div>

        {/* Dynamic Persona Panel */}
        <div className="glass-card p-6 sm:p-10 border border-dark-700/80">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePersona}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-800 border border-dark-700 text-xs font-mono text-dark-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{current.roleTitle}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white">{current.headline}</h3>
                <p className="text-dark-300 text-sm leading-relaxed">{current.description}</p>

                <div className="space-y-3">
                  {current.highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-dark-200">
                      <CheckCircle2 className="w-4 h-4 text-secondary-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={current.portalLink}
                    className="btn-primary text-xs sm:text-sm inline-flex items-center gap-2"
                  >
                    <span>{current.portalCta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <span className="text-xs text-dark-400 italic">{current.tagline}</span>
                </div>
              </div>

              {/* Stats Column */}
              <div className="lg:col-span-5 grid grid-cols-1 gap-4">
                {current.stats.map((stat, i) => (
                  <div key={i} className="bg-dark-950 p-5 rounded-2xl border border-dark-800 text-center">
                    <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-400 font-mono mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-dark-300 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
