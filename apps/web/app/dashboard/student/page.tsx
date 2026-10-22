'use client';

import { useState } from 'react';
import {
  Trophy, Video, Zap, Star, Flame, Play, CheckCircle2,
  Clock, Award, BookOpen, Sparkles, ArrowRight, UserCheck, Check,
  Bot, Terminal, Wrench, Package, Cpu, Code2, RefreshCw
} from 'lucide-react';
import LiveTuitionModal from '../../../components/LiveTuitionModal';

export default function StudentDashboard() {
  const [classroomOpen, setClassroomOpen] = useState(false);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<'code' | 'quiz'>('code');

  // Interactive Code Sandbox on Dashboard
  const [pythonSnippet, setPythonSnippet] = useState(
`def rover_turn(angle):
    # Set servo steering angle
    servo.write(angle)
    return f"Rover turning to {angle} degrees"

print(rover_turn(45))`
  );
  const [runResult, setRunResult] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Quick Sprint State
  const [sprintIndex, setSprintIndex] = useState(0);
  const [score, setScore] = useState(380);
  const [selectedSprintAns, setSelectedSprintAns] = useState<number | null>(null);
  const [isSprintCorrect, setIsSprintCorrect] = useState<boolean | null>(null);

  const sprintQuestions = [
    { q: 'Ultrasonic sound speed is 340 m/s. Echo return time is 2ms. Distance = ?', hint: 'Distance = (Speed × Time) ÷ 2 = (340 × 0.002) ÷ 2 = 34cm!', options: [17, 34, 68, 85], ans: 34 },
    { q: 'In Python, what is the output of len(["rover", "servo", "motor"])?', hint: 'Count the items in the list!', options: [2, 3, 4, 15], ans: 3 },
    { q: 'Ohm’s Law: V = 5V, R = 250Ω. What is current I?', hint: 'I = V ÷ R = 5 ÷ 250 = 0.02A (20mA)!', options: [10, 20, 25, 50], ans: 20 },
  ];

  const currentSprint = sprintQuestions[sprintIndex % sprintQuestions.length];

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setRunResult('>>> Executing on virtual Arduino...\n>>> Rover turning to 45 degrees\n✓ Signal dispatched to SG90 Servo pin D9');
      setScore((s) => s + 15);
    }, 450);
  };

  const handleAnswerSprint = (opt: number) => {
    setSelectedSprintAns(opt);
    if (opt === currentSprint.ans) {
      setIsSprintCorrect(true);
      setScore((s) => s + 20);
    } else {
      setIsSprintCorrect(false);
    }
  };

  const handleNextSprint = () => {
    setSelectedSprintAns(null);
    setIsSprintCorrect(null);
    setSprintIndex((i) => i + 1);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Live Tuition Banner */}
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
            <span className="badge badge-coral" style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Flame style={{ width: 14, height: 14 }} /> 14-Day Builder Streak
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--mid)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              BATCH R-102 (ROBOTICS &amp; PYTHON)
            </span>
          </div>
          <h2 className="heading-md" style={{ marginBottom: 6 }}>Hey Alex! Ready for Robotics &amp; Python?</h2>
          <p style={{ color: 'var(--mid)', fontSize: '0.9rem' }}>
            Your live 1:4 session with <strong>Dr. Sarah Vance</strong> &amp; 3 classmates begins in <strong>10 minutes</strong>.
          </p>
        </div>

        {/* Live Video Room Call Button */}
        <button
          onClick={() => setClassroomOpen(true)}
          className="btn btn-coral"
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 24px' }}
        >
          <Video style={{ width: 18, height: 18 }} />
          <span>Launch 1:4 Live Video Lab</span>
        </button>
      </div>

      {/* Builder Gamified Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <div className="card" style={{ background: 'white' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--mid)', fontWeight: 600, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Bot style={{ width: 16, height: 16, color: 'var(--coral)' }} /> Capstone Project
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--coral)' }}>
            75% <span style={{ fontSize: '0.85rem', color: 'var(--mid)', fontWeight: 500 }}>done</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--forest-dark)', fontWeight: 700, marginTop: 6, display: 'block' }}>4WD Autonomous Rover</span>
        </div>

        <div className="card" style={{ background: 'white' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--mid)', fontWeight: 600, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Terminal style={{ width: 16, height: 16, color: 'var(--blue)' }} /> Code Written
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--blue)' }}>
            420+ <span style={{ fontSize: '0.85rem', color: 'var(--mid)', fontWeight: 500 }}>lines</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--mid)', marginTop: 6, display: 'block' }}>Python &amp; Arduino C++</span>
        </div>

        <div className="card" style={{ background: 'white' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--mid)', fontWeight: 600, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Package style={{ width: 16, height: 16, color: 'var(--forest)' }} /> Hardware Kit Box
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--forest-dark)' }}>
            Delivered ✓
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--mid)', marginTop: 6, display: 'block' }}>Box v3.2 (Arduino + Sensors)</span>
        </div>

        <div className="card" style={{ background: 'white' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--mid)', fontWeight: 600, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Star style={{ width: 16, height: 16, color: '#d4a820' }} /> Star Coins Earned
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, color: '#d4a820' }}>
            {score} ⭐
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--coral)', fontWeight: 700, marginTop: 6, display: 'block' }}>Rank #2 in Batch R-102</span>
        </div>
      </div>

      {/* Main Grid: Live Classroom Schedule & Interactive Lab */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
        {/* Left Column: Live Classes & Hands-on Milestones */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Live Video Classroom Preview Card */}
          <div className="card" style={{ background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span className="badge badge-yellow" style={{ fontSize: '0.75rem' }}>
                Live 1:4 Tuition Batch Ready
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--mid)', fontFamily: 'var(--font-mono)' }}>
                45 Mins • 4 Builders Max
              </span>
            </div>

            <div style={{ padding: 18, borderRadius: 16, background: 'var(--cream-dark)', border: '1px solid var(--border)', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--dark)', marginBottom: 6 }}>
                Robotics Level 3: Ultrasonic Obstacle Radar &amp; Motor Tuning
              </h3>
              <p style={{ color: 'var(--mid)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 16 }}>
                Mentored by <strong>Dr. Sarah Vance</strong>. Today each student wires their ultrasonic distance sensor and programs automatic steering evasion.
              </p>

              {/* Classmates in batch */}
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--mid)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 8 }}>
                  Classmates in your small 1:4 batch:
                </span>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {[
                    { name: 'Dr. Sarah Vance', role: 'Mentor', emoji: '👩‍🏫' },
                    { name: 'Maya Patel', role: 'Student', emoji: '👧' },
                    { name: 'Liam Chen', role: 'Student', emoji: '👦' },
                    { name: 'Sophia Rossi', role: 'Student', emoji: '👧' },
                  ].map((p, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 10, background: 'white', border: '1px solid var(--border)', fontSize: '0.8rem' }}>
                      <span>{p.emoji}</span>
                      <span style={{ fontWeight: 600, color: 'var(--dark)' }}>{p.name.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 18 }}>
                <button
                  onClick={() => setClassroomOpen(true)}
                  className="btn btn-coral"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                >
                  <Play style={{ width: 16, height: 16 }} /> Enter Live Video Room with Classmates
                </button>
              </div>
            </div>

            {/* Hands-On Curriculum Progress */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', color: 'var(--dark)' }}>
                  Robotics &amp; Coding Pathway
                </h3>
                <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>Level 3 of 5</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { title: 'Level 1: Electronics, Resistors & Circuits', progress: 100, status: 'Mastered ★★★' },
                  { title: 'Level 2: Python Syntax & Game Logic', progress: 100, status: 'Mastered ★★★' },
                  { title: 'Level 3: Ultrasonic Radar & Servo Motors', progress: 75, status: 'In Progress (75%)' },
                  { title: 'Level 4: IoT Smart Home Prototypes', progress: 0, status: 'Up Next 🔒' },
                ].map((m, i) => (
                  <div key={i} style={{ padding: '12px 14px', borderRadius: 12, background: 'var(--cream)', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6 }}>
                      <span style={{ color: 'var(--dark)' }}>{m.title}</span>
                      <span style={{ color: m.progress === 100 ? 'var(--forest-dark)' : 'var(--coral)' }}>{m.status}</span>
                    </div>
                    <div style={{ height: 6, width: '100%', background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${m.progress}%`,
                          background: m.progress === 100 ? 'var(--forest)' : 'var(--coral)',
                          borderRadius: 4
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Practice Sandbox & Quiz */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Interactive Lab Widget */}
          <div className="card" style={{ background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 6, background: 'var(--cream-dark)', padding: 4, borderRadius: 10 }}>
                <button
                  onClick={() => setActiveInteractiveTab('code')}
                  style={{
                    padding: '6px 12px', borderRadius: 8,
                    fontSize: '0.8rem', fontWeight: 700,
                    border: 'none', cursor: 'pointer',
                    background: activeInteractiveTab === 'code' ? 'white' : 'transparent',
                    color: 'var(--dark)',
                    boxShadow: activeInteractiveTab === 'code' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  💻 Python Runner
                </button>
                <button
                  onClick={() => setActiveInteractiveTab('quiz')}
                  style={{
                    padding: '6px 12px', borderRadius: 8,
                    fontSize: '0.8rem', fontWeight: 700,
                    border: 'none', cursor: 'pointer',
                    background: activeInteractiveTab === 'quiz' ? 'white' : 'transparent',
                    color: 'var(--dark)',
                    boxShadow: activeInteractiveTab === 'quiz' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  ⚡ STEM Sprint
                </button>
              </div>
              <span className="badge badge-yellow" style={{ fontSize: '0.72rem' }}>+20 XP</span>
            </div>

            {activeInteractiveTab === 'code' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--mid)', fontFamily: 'var(--font-mono)' }}>
                    rover_steering.py
                  </span>
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="btn btn-forest btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <Play style={{ width: 12, height: 12 }} />
                    <span>{isRunning ? 'Executing...' : 'Run on Arduino'}</span>
                  </button>
                </div>

                <textarea
                  value={pythonSnippet}
                  onChange={(e) => setPythonSnippet(e.target.value)}
                  style={{
                    width: '100%',
                    height: 120,
                    padding: 12,
                    background: '#1a1f26',
                    color: '#4cb48c',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    borderRadius: 12,
                    border: '1px solid #2d3748',
                    resize: 'none',
                  }}
                />

                {runResult && (
                  <div style={{
                    padding: 12, borderRadius: 12,
                    background: '#0d1117', color: '#58a6ff',
                    fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                    whiteSpace: 'pre-line', border: '1px solid #30363d'
                  }}>
                    {runResult}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ padding: 14, borderRadius: 12, background: 'var(--cream-dark)', border: '1px solid var(--border)' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--dark)', marginBottom: 6 }}>
                    {currentSprint.q}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--mid)', margin: 0 }}>
                    💡 Hint: {currentSprint.hint}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                  {currentSprint.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswerSprint(opt)}
                      style={{
                        padding: 10, borderRadius: 10,
                        border: selectedSprintAns === opt
                          ? isSprintCorrect ? '2px solid var(--forest)' : '2px solid var(--coral)'
                          : '1px solid var(--border)',
                        background: selectedSprintAns === opt
                          ? isSprintCorrect ? '#eaf8f0' : '#fceeee'
                          : 'white',
                        fontWeight: 700, fontSize: '0.9rem',
                        cursor: 'pointer'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {isSprintCorrect !== null && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isSprintCorrect ? 'var(--forest-dark)' : 'var(--coral)' }}>
                      {isSprintCorrect ? '🎉 Correct! +20 Stars' : '❌ Try again!'}
                    </span>
                    <button onClick={handleNextSprint} className="btn btn-outline btn-sm">
                      Next Sprint →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {classroomOpen && (
        <LiveTuitionModal
          roomName="Robotics Level 3: Ultrasonic Obstacle Radar"
          batchCode="R-102"
          role="student"
          onClose={() => setClassroomOpen(false)}
        />
      )}
    </div>
  );
}
