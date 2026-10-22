'use client';

import { useState } from 'react';
import {
  Users, Video, Star, Clock, CheckCircle2,
  Play, DollarSign, Calendar, MessageSquare, Send, Award,
  Sparkles, Check, ChevronRight
} from 'lucide-react';
import LiveTuitionModal from '../../../components/LiveTuitionModal';

interface BatchStudent {
  id: string;
  name: string;
  parentName: string;
  speedRating: string;
  starsAwarded: number;
  lastSessionNote: string;
}

export default function TeacherDashboard() {
  const [classroomOpen, setClassroomOpen] = useState(false);

  // Active batch students (Robotics & Coding)
  const [students, setStudents] = useState<BatchStudent[]>([
    {
      id: 's1',
      name: 'Alex Johnson',
      parentName: 'Marcus Johnson',
      speedRating: 'Robotics Hardware (Active)',
      starsAwarded: 14,
      lastSessionNote: 'Wired ultrasonic radar on breadboard and calibrated obstacle distance threshold in code.',
    },
    {
      id: 's2',
      name: 'Maya Patel',
      parentName: 'Pooja Patel',
      speedRating: 'Python Code (Verified)',
      starsAwarded: 12,
      lastSessionNote: 'Wrote clean obstacle detection algorithm in Python with 100% test case pass rate.',
    },
    {
      id: 's3',
      name: 'Liam Chen',
      parentName: 'David Chen',
      speedRating: 'Chassis Assembly (Good)',
      starsAwarded: 10,
      lastSessionNote: 'Mounted 4WD DC gear motors and connected L298N motor driver module with correct polarity.',
    },
    {
      id: 's4',
      name: 'Sophia Rossi',
      parentName: 'Elena Rossi',
      speedRating: 'Servo Radar (Fastest)',
      starsAwarded: 16,
      lastSessionNote: 'Calibrated SG90 servo pulse timing for 180-degree sweep radar. Ready for Bluetooth control.',
    },
  ]);

  const [feedbackStudent, setFeedbackStudent] = useState<string>('Alex Johnson');
  const [newNote, setNewNote] = useState('');
  const [noteSent, setNoteSent] = useState(false);

  const handleAwardStar = (id: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, starsAwarded: s.starsAwarded + 1 } : s))
    );
  };

  const handleSendParentNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setStudents((prev) =>
      prev.map((s) => (s.name === feedbackStudent ? { ...s, lastSessionNote: newNote.trim() } : s))
    );
    setNewNote('');
    setNoteSent(true);
    setTimeout(() => setNoteSent(false), 2500);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Banner: Teacher Partner Status */}
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
            <span className="badge badge-yellow" style={{ fontSize: '0.75rem' }}>
              Certified EduSure STEM Tutor
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--forest-dark)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--forest)' }} />
              Active Online
            </span>
          </div>
          <h2 className="heading-md" style={{ marginBottom: 6 }}>Dr. Sarah Vance • Tutor Workstation</h2>
          <p style={{ color: 'var(--mid)', fontSize: '0.9rem' }}>
            4 Assigned 1:4 Tuition Batches • 16 Active Students • 34 Hours Taught This Month
          </p>
        </div>

        {/* Start Live Session Button */}
        <button
          onClick={() => setClassroomOpen(true)}
          className="btn btn-coral"
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 24px' }}
        >
          <Video style={{ width: 18, height: 18 }} />
          <span>Launch Batch Video Room</span>
        </button>
      </div>

      {/* Tutor Earnings & Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <div className="card" style={{ background: 'white' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--mid)', fontWeight: 600, marginBottom: 6 }}>Monthly Payout Earned</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--forest-dark)' }}>
            ₹42,500 <span style={{ fontSize: '0.9rem', color: 'var(--mid)', fontWeight: 500 }}>($1,840)</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--mid)', marginTop: 6, display: 'block' }}>34 hours taught @ ₹1,250/hr</span>
        </div>

        <div className="card" style={{ background: 'white' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--mid)', fontWeight: 600, marginBottom: 6 }}>Parent Satisfaction Rating</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, color: '#d4a820' }}>
            4.95 ★
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--forest-dark)', fontWeight: 700, marginTop: 6, display: 'block' }}>Top 2% of EduSure Tutors</span>
        </div>

        <div className="card" style={{ background: 'white' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--mid)', fontWeight: 600, marginBottom: 6 }}>Active Small Batches</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--blue)' }}>
            4 <span style={{ fontSize: '0.9rem', color: 'var(--mid)', fontWeight: 500 }}>Batches</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--mid)', marginTop: 6, display: 'block' }}>Strict 1:4 student-to-tutor ratio</span>
        </div>

        <div className="card" style={{ background: 'white' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--mid)', fontWeight: 600, marginBottom: 6 }}>Student Speed Growth</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--coral)' }}>
            +320%
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--forest-dark)', fontWeight: 700, marginTop: 6, display: 'block' }}>Cohort speed acceleration</span>
        </div>
      </div>

      {/* Main Grid: Batch Live Management & Student Notes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
        {/* Left Column: Assigned Batches & Live Classroom */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Active Live Batch Room Card */}
          <div className="card" style={{ background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span className="badge badge-coral" style={{ fontSize: '0.75rem' }}>
                Current Batch: R-102 (Robotics)
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--mid)', fontFamily: 'var(--font-mono)' }}>
                5:00 PM - 5:45 PM
              </span>
            </div>

            <div style={{ padding: 18, borderRadius: 16, background: 'var(--cream-dark)', border: '1px solid var(--border)', marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--dark)', marginBottom: 4 }}>
                    4WD Autonomous Rover • Ultrasonic Tuning
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--mid)' }}>4 Enrolled Builders (All breadboards ready)</p>
                </div>
                <button
                  onClick={() => setClassroomOpen(true)}
                  className="btn btn-coral btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <Play style={{ width: 14, height: 14 }} /> Enter Lab
                </button>
              </div>

              {/* Student Star Roster in this batch */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {students.map((student) => (
                  <div key={student.id} style={{ padding: 12, borderRadius: 12, background: 'white', border: '1px solid var(--border)', textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--dark)' }}>{student.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--coral)', fontWeight: 600, margin: '2px 0 8px' }}>{student.speedRating}</div>
                    <button
                      onClick={() => handleAwardStar(student.id)}
                      style={{
                        width: '100%', padding: '4px 8px', borderRadius: 8,
                        background: 'var(--yellow-light)', border: '1px solid var(--yellow)',
                        color: 'var(--dark)', fontSize: '0.75rem', fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {student.starsAwarded} ⭐ (+1 Award)
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Assigned Batches */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', color: 'var(--dark)', marginBottom: 12 }}>
                Other Small Batches Today
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { batch: 'Batch M-204 (Maths & Aptitude)', time: '6:00 PM - 6:45 PM', kids: '4 / 4 kids', status: 'Upcoming' },
                  { batch: 'Batch C-301 (Python & AI)', time: '7:00 PM - 8:00 PM', kids: '3 / 4 kids', status: 'Confirmed' },
                ].map((b) => (
                  <div key={b.batch} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: 12, background: 'var(--cream)', border: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--dark)' }}>{b.batch}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--mid)' }}>{b.time} • {b.kids}</div>
                    </div>
                    <span className="badge badge-yellow" style={{ fontSize: '0.72rem' }}>{b.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Send Post-Session Note to Parent */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="card" style={{ background: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ fontSize: '1.4rem' }}>💬</div>
              <h3 className="heading-sm">Send Post-Session Note to Parent</h3>
            </div>
            <p style={{ color: 'var(--mid)', fontSize: '0.85rem', marginBottom: 20 }}>
              Dispatches tutor notes directly to the parent companion app and WhatsApp after class.
            </p>

            <form onSubmit={handleSendParentNote} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label className="label">Select Student</label>
                <select
                  className="input"
                  value={feedbackStudent}
                  onChange={(e) => setFeedbackStudent(e.target.value)}
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} (Parent: {s.parentName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Tutor Assessment &amp; Feedback</label>
                <textarea
                  className="input"
                  rows={4}
                  required
                  placeholder="e.g. Alex solved the ultrasonic sensor calibration with zero assistance! Recommend starting the motor steering servo test next session..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  style={{ resize: 'vertical' }}
                />
              </div>

              {noteSent && (
                <div style={{
                  padding: '10px 14px', borderRadius: 10,
                  background: '#eaf8f0', border: '1px solid #b2e4c8',
                  color: 'var(--forest-dark)', fontSize: '0.8rem', fontWeight: 700
                }}>
                  ✓ Note dispatched to parent WhatsApp!
                </div>
              )}

              <button type="submit" className="btn btn-coral" style={{ width: '100%' }}>
                Send Note to Parent →
              </button>
            </form>
          </div>

          {/* Recent Student Log Summary */}
          <div className="card" style={{ background: 'white' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--dark)', marginBottom: 12 }}>
              Last Feedback Dispatched
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {students.slice(0, 2).map((s) => (
                <div key={s.id} style={{ padding: '10px 12px', borderRadius: 10, background: 'var(--cream)', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--dark)' }}>{s.name}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--mid)' }}>Today</span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--mid)', margin: 0, lineHeight: 1.5 }}>
                    &quot;{s.lastSessionNote}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {classroomOpen && (
        <LiveTuitionModal
          roomName="Robotics Level 3: Ultrasonic Obstacle Radar"
          batchCode="R-102"
          role="tutor"
          onClose={() => setClassroomOpen(false)}
        />
      )}
    </div>
  );
}
