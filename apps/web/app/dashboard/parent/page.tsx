'use client';

import { useState } from 'react';
import {
  Award, MessageSquare, Send, CheckCircle2,
  Clock, CreditCard, Video, Zap, Calendar, Star, Check
} from 'lucide-react';
import LiveTuitionModal from '../../../components/LiveTuitionModal';

export default function ParentDashboard() {
  const [observerModalOpen, setObserverModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<'alex' | 'emma'>('alex');

  // Teacher Messaging State
  const [teacherMsg, setTeacherMsg] = useState('');
  const [sentMsgs, setSentMsgs] = useState<Array<{ sender: string; text: string; time: string }>>([
    {
      sender: 'Dr. Sarah Vance (Tutor)',
      text: 'Good evening Mr. Johnson! Alex was phenomenal in today’s session. He solved the 3-digit mental multiplication challenge in under 8 seconds. We are progressing to Level 4 roots next week!',
      time: 'Yesterday, 5:48 PM',
    },
    {
      sender: 'You',
      text: 'Thank you Dr. Vance! We noticed his calculation speed has increased tremendously. He loves the daily sprint drills.',
      time: 'Yesterday, 6:15 PM',
    },
  ]);
  const [msgSentNotice, setMsgSentNotice] = useState(false);
  const [credits, setCredits] = useState(12);

  const childrenData = {
    alex: {
      name: 'Alex Johnson',
      grade: 'Grade 7 • Robotics & Python Batch R-102',
      tutor: 'Dr. Sarah Vance',
      tutorInitials: 'SV',
      speedRating: 'Robotics & Hardware Circuits',
      accuracy: '96.4%',
      stars: 340,
      completedClasses: 24,
      totalClasses: 36,
      currentSessionStatus: 'LIVE NOW (5:00 - 5:45 PM)',
      inClass: true,
      projectTitle: '4WD Autonomous Obstacle Rover',
      projectProgress: '75% Assembled',
      hardwareBox: 'Robotics Kit v3.2 Delivered',
      lastTutorNote:
        'Alex successfully wired the ultrasonic radar sensor on his breadboard and calibrated the obstacle distance threshold in Python. Superb mechanical intuition!',
      skills: [
        { name: 'Breadboard Wiring & Resistor Calculations', level: 'Mastered ★★★', pct: 98 },
        { name: 'Python Loops, Functions & Sensor APIs', level: 'Mastered ★★★', pct: 95 },
        { name: 'Ultrasonic Radar & Servo Motor Calibration', level: 'Current Focus ★', pct: 75 },
      ],
    },
    emma: {
      name: 'Emma Johnson',
      grade: 'Grade 5 • Python Game Programming Batch P-108',
      tutor: 'Prof. Marcus Chen',
      tutorInitials: 'MC',
      speedRating: 'Arcade Game Developer',
      accuracy: '98.0%',
      stars: 280,
      completedClasses: 18,
      totalClasses: 36,
      currentSessionStatus: 'Next Class: Tomorrow at 4:00 PM',
      inClass: false,
      projectTitle: 'Arcade Space Collector Game',
      projectProgress: '100% Completed',
      hardwareBox: 'Game Controller Kit Delivered',
      lastTutorNote:
        'Emma completed all 15 Python game loop exercises with zero syntax errors. Her interactive space game is ready for family play!',
      skills: [
        { name: 'Visual Logic & 2D Coordinate System', level: 'Mastered ★★★', pct: 100 },
        { name: 'Pygame Sprite Movement & Collision Physics', level: 'Mastered ★★★', pct: 96 },
        { name: 'Sound Synthesis & High Score Tracker', level: 'Proficient ★★', pct: 90 },
      ],
    },
  };

  const child = childrenData[selectedChild];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherMsg.trim()) return;

    setSentMsgs((prev) => [
      ...prev,
      {
        sender: 'You',
        text: teacherMsg.trim(),
        time: 'Just now',
      },
    ]);
    setTeacherMsg('');
    setMsgSentNotice(true);
    setTimeout(() => setMsgSentNotice(false), 2500);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Banner: Parent Monitoring Companion */}
      <div
        className="card"
        style={{
          background: 'white',
          border: '2px solid var(--border)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          padding: 28,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="badge badge-green" style={{ fontSize: '0.75rem' }}>
              Parent Monitoring Companion
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--mid)', fontFamily: 'var(--font-mono)' }}>
              EDUSURE LIVE TUITION
            </span>
          </div>
          <h2 className="heading-md" style={{ marginBottom: 6 }}>Marcus Johnson&apos;s Family Hub</h2>
          <p style={{ color: 'var(--mid)', fontSize: '0.9rem' }}>
            Monitor attendance, monthly report cards, and message {child.name}&apos;s tutor.
          </p>
        </div>

        {/* Child Selector Switch */}
        <div style={{ display: 'flex', gap: 8, background: 'var(--cream-dark)', padding: 6, borderRadius: 14, border: '1px solid var(--border)' }}>
          <button
            onClick={() => setSelectedChild('alex')}
            style={{
              padding: '8px 16px', borderRadius: 10,
              fontSize: '0.825rem', fontWeight: selectedChild === 'alex' ? 700 : 600,
              border: selectedChild === 'alex' ? '2px solid var(--coral)' : '1px solid transparent',
              background: selectedChild === 'alex' ? 'white' : 'transparent',
              color: selectedChild === 'alex' ? 'var(--dark)' : 'var(--mid)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            <span>👦 Alex (Gr 7)</span>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--forest)' }} />
          </button>

          <button
            onClick={() => setSelectedChild('emma')}
            style={{
              padding: '8px 16px', borderRadius: 10,
              fontSize: '0.825rem', fontWeight: selectedChild === 'emma' ? 700 : 600,
              border: selectedChild === 'emma' ? '2px solid var(--coral)' : '1px solid transparent',
              background: selectedChild === 'emma' ? 'white' : 'transparent',
              color: selectedChild === 'emma' ? 'var(--dark)' : 'var(--mid)',
              cursor: 'pointer'
            }}
          >
            👧 Emma (Gr 5)
          </button>
        </div>
      </div>

      {/* Live Tuition Status Card */}
      <div
        className="card"
        style={{
          background: 'white',
          border: '2px solid var(--border)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: 20
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'var(--forest-light)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem'
          }}>
            🎥
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {child.inClass && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--coral)' }} />}
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--dark)', margin: 0 }}>
                {child.name}’s Live Class Status: <span style={{ color: 'var(--forest-dark)' }}>{child.currentSessionStatus}</span>
              </h3>
            </div>
            <p style={{ color: 'var(--mid)', fontSize: '0.85rem', margin: '4px 0 0' }}>
              Mentor: <strong>{child.tutor}</strong> • Small 1:4 Group Batch
            </p>
          </div>
        </div>

        {child.inClass && (
          <button
            onClick={() => setObserverModalOpen(true)}
            className="btn btn-coral btn-sm"
          >
            <span>View Live Tuition Room</span>
          </button>
        )}
      </div>

      {/* Robotics, Project & Mastery Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <div className="card" style={{ background: 'white' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--mid)', fontWeight: 600, marginBottom: 6 }}>Capstone Project</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--coral)' }}>
            {child.projectProgress}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--dark)', fontWeight: 600, marginTop: 4, display: 'block' }}>{child.projectTitle}</span>
        </div>

        <div className="card" style={{ background: 'white' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--mid)', fontWeight: 600, marginBottom: 6 }}>Attendance</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--forest-dark)' }}>
            {child.completedClasses} / {child.totalClasses} classes
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--forest-dark)', fontWeight: 700, marginTop: 4, display: 'block' }}>100% On-Time Record</span>
        </div>

        <div className="card" style={{ background: 'white' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--mid)', fontWeight: 600, marginBottom: 6 }}>Accuracy Rating</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--blue)' }}>
            {child.accuracy}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--mid)', marginTop: 4, display: 'block' }}>{child.speedRating}</span>
        </div>

        <div className="card" style={{ background: 'white' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--mid)', fontWeight: 600, marginBottom: 6 }}>Star Coins Earned</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: '#d4a820' }}>
            {child.stars} ⭐
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--mid)', marginTop: 4, display: 'block' }}>Tutor Merit Badges: 8</span>
        </div>
      </div>

      {/* Main Grid: Report Card & Tutor Chat */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
        {/* Left Column: Monthly Report Card & Skills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Monthly Report Card */}
          <div className="card" style={{ background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '1.3rem' }}>📊</span>
                <h3 className="heading-sm">Monthly Progress Report Card</h3>
              </div>
              <span className="badge badge-yellow">Verified</span>
            </div>

            <div style={{ padding: 18, borderRadius: 16, background: 'var(--cream-dark)', border: '1px solid var(--border)', marginBottom: 20 }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--mid)', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
                &quot;{child.lastTutorNote}&quot;
              </p>
              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--dark)' }}>— {child.tutor}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--mid)' }}>Session Note</span>
              </div>
            </div>

            {/* Skill Mastery Levels */}
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--dark)', marginBottom: 12 }}>
              Skill Mastery Heatmap
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {child.skills.map((s, idx) => (
                <div key={idx} style={{ padding: '12px 14px', borderRadius: 12, background: 'var(--cream)', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6 }}>
                    <span style={{ color: 'var(--dark)' }}>{s.name}</span>
                    <span style={{ color: 'var(--forest-dark)' }}>{s.level}</span>
                  </div>
                  <div style={{ height: 6, width: '100%', background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${s.pct}%`, background: 'var(--forest)', borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Class Credits Remaining */}
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--dark)' }}>Class Credits Available</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--mid)' }}>{credits} credits remaining in wallet</div>
              </div>
              <button onClick={() => setCredits((c) => c + 4)} className="btn btn-outline btn-sm">
                + Add 4 Credits
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Chat with Tutor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="card" style={{ background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ fontSize: '1.3rem' }}>💬</div>
                <div>
                  <h3 className="heading-sm" style={{ margin: 0 }}>Chat with Mentor</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--mid)' }}>Direct WhatsApp / Dashboard Connect</span>
                </div>
              </div>
              <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>Online</span>
            </div>

            {/* Message Thread */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 300, overflowY: 'auto', padding: '12px 0', marginBottom: 16 }}>
              {sentMsgs.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: msg.sender === 'You' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    padding: '12px 14px',
                    borderRadius: 14,
                    background: msg.sender === 'You' ? 'var(--coral-light)' : 'var(--cream-dark)',
                    border: msg.sender === 'You' ? '1px solid var(--coral)' : '1px solid var(--border)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--dark)' }}>{msg.sender}</span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--mid)' }}>{msg.time}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--dark)', margin: 0, lineHeight: 1.5 }}>
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Reply Input Form */}
            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: 8 }}>
              <input
                className="input"
                type="text"
                placeholder="Ask Dr. Sarah Vance a question..."
                value={teacherMsg}
                onChange={(e) => setTeacherMsg(e.target.value)}
                style={{ flex: 1 }}
              />
              <button type="submit" className="btn btn-coral" style={{ padding: '0 16px' }}>
                Send
              </button>
            </form>

            {msgSentNotice && (
              <span style={{ fontSize: '0.75rem', color: 'var(--forest-dark)', fontWeight: 700, marginTop: 8, display: 'block' }}>
                ✓ Message delivered to mentor!
              </span>
            )}
          </div>
        </div>
      </div>

      {observerModalOpen && (
        <LiveTuitionModal
          roomName="Robotics Level 3: Ultrasonic Obstacle Radar"
          batchCode="R-102"
          role="observer"
          onClose={() => setObserverModalOpen(false)}
        />
      )}
    </div>
  );
}
