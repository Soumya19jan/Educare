'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Mic, MicOff, Video, VideoOff, ScreenShare, Sparkles, Volume2,
  Hand, Send, Star, Zap, Award, Users, Trophy, Play, CheckCircle2,
  HelpCircle, MessageSquare, Timer, Flame, ArrowRight, Bot, Terminal,
  Wrench, Cpu, RefreshCw, Check, AlertCircle, Layers
} from 'lucide-react';

interface LiveTuitionModalProps {
  isOpen?: boolean;
  onClose: () => void;
  userRole?: 'student' | 'teacher' | 'observer';
  roomName?: string;
  batchCode?: string;
  role?: string;
}

export default function LiveTuitionModal({
  isOpen = true,
  onClose,
  userRole = 'student',
  role,
}: LiveTuitionModalProps) {
  // Video & Audio Controls
  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);
  const [screenShare, setScreenShare] = useState(false);
  const [handRaised, setHandRaised] = useState(false);

  // Active Subject Mode in Classroom
  const [classroomSubject, setClassroomSubject] = useState<'robotics' | 'coding' | 'projects' | 'speed_math'>('robotics');

  // Robotics Circuit Simulator State
  const [sensorDistance, setSensorDistance] = useState(18); // cm
  const [roverMotorState, setRoverMotorState] = useState<'FORWARD' | 'TURNING_RIGHT' | 'STOPPED'>('FORWARD');
  const [servoAngle, setServoAngle] = useState(90);

  // Python Code Sandbox State
  const [pythonCode, setPythonCode] = useState(
`# EduSure Python 1:4 Coding Lab
def detect_obstacle(distance_cm):
    if distance_cm < 20:
        return "TRIGGER_AVOIDANCE_RIGHT"
    elif distance_cm > 100:
        return "FULL_SPEED_AHEAD"
    return "MAINTAIN_CRUISE"

# Test rover sensor reading
result = detect_obstacle(18)
print(f"Sensor Output: {result}")`
  );
  const [codeRunning, setCodeRunning] = useState(false);
  const [codeOutput, setCodeOutput] = useState('Output: Click "Run Code" to test on virtual rover.');

  // Hands-on Project Assembly Step State
  const [projectStep, setProjectStep] = useState(2);

  // Speed Math Puzzle Arena State
  const [currentRound, setCurrentRound] = useState(1);
  const [timerSeconds, setTimerSeconds] = useState(25);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [stars, setStars] = useState(4);

  // Classmate Participants (1:4 Small Batch)
  const [students, setStudents] = useState([
    { id: 1, name: 'Alex Johnson (You)', role: 'student', stars: 4, mic: true, video: true, projectStatus: 'Wiring Sensor' },
    { id: 2, name: 'Maya Patel', role: 'student', stars: 5, mic: true, video: true, projectStatus: 'Code Verified' },
    { id: 3, name: 'Liam Chen', role: 'student', stars: 3, mic: false, video: true, projectStatus: 'Assembling Chassis' },
    { id: 4, name: 'Sophia Rossi', role: 'student', stars: 6, mic: true, video: true, projectStatus: 'Calibrating Servo' },
  ]);

  // Questions Database for Speed Math
  const puzzles = [
    {
      round: 1,
      title: 'Mental Math Sprint • Rapid Multiplication',
      question: 'Calculate in your mind: 48 × 25 = ?',
      hint: 'Speed Trick: 48 × (100 ÷ 4) = 12 × 100!',
      options: [1150, 1200, 1250, 1300],
      correctAnswer: 1200,
    },
    {
      round: 2,
      title: 'Fast Division • Vedic Split Technique',
      question: 'Find 960 ÷ 15 without a calculator:',
      hint: 'Speed Trick: Double both! 1920 ÷ 30 = 192 ÷ 3!',
      options: [62, 64, 66, 68],
      correctAnswer: 64,
    },
  ];

  const currentPuzzle = puzzles[(currentRound - 1) % puzzles.length];

  // Simulator Effect: adjust motor state based on sensor distance
  useEffect(() => {
    if (sensorDistance < 20) {
      setRoverMotorState('TURNING_RIGHT');
      setServoAngle(45);
    } else {
      setRoverMotorState('FORWARD');
      setServoAngle(90);
    }
  }, [sensorDistance]);

  // Speed Math Timer countdown
  useEffect(() => {
    if (!isOpen || classroomSubject !== 'speed_math') return;
    const interval = setInterval(() => {
      setTimerSeconds((t) => (t > 0 ? t - 1 : 25));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, classroomSubject]);

  const handleRunPython = () => {
    setCodeRunning(true);
    setTimeout(() => {
      setCodeRunning(false);
      setCodeOutput(
        sensorDistance < 20
          ? `>>> Sensor reading: ${sensorDistance}cm\n>>> Evaluation: TRIGGER_AVOIDANCE_RIGHT\n>>> Hardware Action: Servo turned to 45°, Right Motor PWM: 180\n✓ Test passed (42ms)`
          : `>>> Sensor reading: ${sensorDistance}cm\n>>> Evaluation: MAINTAIN_CRUISE\n>>> Hardware Action: Both Motors Forward @ 255 PWM\n✓ Test passed (38ms)`
      );
    }, 500);
  };

  const handleSelectAnswer = (opt: number) => {
    setSelectedOption(opt);
    if (opt === currentPuzzle.correctAnswer) {
      setFeedback('correct');
      setStars((s) => s + 1);
    } else {
      setFeedback('wrong');
    }
  };

  const handleNextRound = () => {
    setSelectedOption(null);
    setFeedback(null);
    setCurrentRound((r) => r + 1);
    setTimerSeconds(25);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-7xl h-[92vh] bg-dark-900 border border-dark-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header Bar */}
          <div className="px-5 py-3 bg-dark-900 border-b border-dark-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-sm sm:text-base">
                    Batch R-102 (1:4 Live Robotics & Hands-On STEM)
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    LIVE MENTORSHIP
                  </span>
                </div>
                <p className="text-xs text-dark-400">
                  Mentor: Dr. Sarah Vance • 4 Builders Connected • Hardware Box Shipped
                </p>
              </div>
            </div>

            {/* Subject Mode Switcher Pills */}
            <div className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-dark-950 border border-dark-800 text-xs">
              <button
                onClick={() => setClassroomSubject('robotics')}
                className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                  classroomSubject === 'robotics'
                    ? 'bg-amber-500 text-dark-950 font-bold shadow'
                    : 'text-dark-400 hover:text-white'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Robotics Circuit Lab</span>
              </button>
              <button
                onClick={() => setClassroomSubject('coding')}
                className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                  classroomSubject === 'coding'
                    ? 'bg-primary-500 text-white font-bold shadow'
                    : 'text-dark-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Python Code Sandbox</span>
              </button>
              <button
                onClick={() => setClassroomSubject('projects')}
                className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                  classroomSubject === 'projects'
                    ? 'bg-emerald-500 text-white font-bold shadow'
                    : 'text-dark-400 hover:text-white'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Hands-On Assembly</span>
              </button>
              <button
                onClick={() => setClassroomSubject('speed_math')}
                className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                  classroomSubject === 'speed_math'
                    ? 'bg-purple-500 text-white font-bold shadow'
                    : 'text-dark-400 hover:text-white'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Speed Math Arena</span>
              </button>
            </div>

            {/* Stars & Close */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{stars} Stars</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-dark-400 hover:text-white hover:bg-dark-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Stage Grid: Center Active Lab (8 cols) + 1:4 Video Grid (4 cols) */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-dark-950">
            {/* Center Stage: Interactive Lab Workstation */}
            <div className="lg:col-span-8 p-3 sm:p-5 flex flex-col justify-between overflow-y-auto">
              {/* ROBOTICS CIRCUIT LAB */}
              {classroomSubject === 'robotics' && (
                <div className="relative rounded-2xl bg-gradient-to-b from-dark-900 to-dark-850 border border-dark-700/80 p-5 shadow-xl flex-1 flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between border-b border-dark-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                        <Bot className="w-4 h-4" />
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white">4WD Autonomous Rover • Ultrasonic Radar Lab</h4>
                        <p className="text-[11px] text-dark-400">Breadboard Pin Wiring & Obstacle Avoidance Trigger</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Arduino Nano V3 (Online)
                    </span>
                  </div>

                  {/* Circuit Visual & Slider */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Visual Schematic Diagram */}
                    <div className="p-4 rounded-2xl bg-dark-950 border border-dark-800 flex flex-col justify-between space-y-3">
                      <span className="text-[10px] font-mono text-dark-400 uppercase">Interactive Breadboard Pin Map</span>
                      <div className="space-y-1.5 font-mono text-xs">
                        <div className="flex items-center justify-between p-2 rounded bg-dark-900 border border-dark-750">
                          <span className="text-dark-300">Pin D9 (TRIG):</span>
                          <span className="text-emerald-400 font-bold">10μs Ultrasonic Pulse</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-dark-900 border border-dark-750">
                          <span className="text-dark-300">Pin D10 (ECHO):</span>
                          <span className="text-amber-400 font-bold">{sensorDistance * 58}μs Return Echo</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-dark-900 border border-dark-750">
                          <span className="text-dark-300">Motor Driver (L298N):</span>
                          <span className={roverMotorState === 'TURNING_RIGHT' ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                            {roverMotorState}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-dark-900 border border-dark-750">
                          <span className="text-dark-300">SG90 Servo Angle:</span>
                          <span className="text-primary-400 font-bold">{servoAngle}°</span>
                        </div>
                      </div>
                    </div>

                    {/* Sensor Slider & Live State */}
                    <div className="p-4 rounded-2xl bg-dark-950 border border-dark-800 flex flex-col justify-between space-y-3">
                      <span className="text-[10px] font-mono text-dark-400 uppercase">Virtual Obstacle Proximity Test</span>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-dark-300">Proximity to Wall:</span>
                          <span className={`font-mono font-bold ${sensorDistance < 20 ? 'text-red-400' : 'text-emerald-400'}`}>
                            {sensorDistance} cm {sensorDistance < 20 ? '(CRITICAL)' : '(CLEAR)'}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="80"
                          value={sensorDistance}
                          onChange={(e) => setSensorDistance(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] font-mono text-dark-500 mt-1">
                          <span>5cm (Close)</span>
                          <span>40cm</span>
                          <span>80cm (Far)</span>
                        </div>
                      </div>

                      <div className={`p-3 rounded-xl border text-xs font-mono ${
                        sensorDistance < 20
                          ? 'bg-red-500/10 border-red-500/30 text-red-300'
                          : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      }`}>
                        {sensorDistance < 20
                          ? '🚨 Obstacle under 20cm! Servo pivoting 45° to scan right clearance.'
                          : '✓ Path unobstructed (>20cm). Both 4WD DC motors driving forward.'}
                      </div>
                    </div>
                  </div>

                  {/* Tutor Instruction Bar */}
                  <div className="p-3 rounded-xl bg-dark-900 border border-dark-800 flex items-center justify-between text-xs text-dark-300">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Mentor Tip: Make sure your Echo pin is connected to digital pin 10 with a 1kΩ pull-down resistor.</span>
                    </span>
                    <button
                      onClick={() => setSensorDistance(12)}
                      className="px-3 py-1 rounded-lg bg-dark-800 hover:bg-dark-700 text-white font-mono text-[11px]"
                    >
                      Simulate Obstacle
                    </button>
                  </div>
                </div>
              )}

              {/* PYTHON CODE SANDBOX */}
              {classroomSubject === 'coding' && (
                <div className="relative rounded-2xl bg-gradient-to-b from-dark-900 to-dark-850 border border-dark-700/80 p-5 shadow-xl flex-1 flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between border-b border-dark-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-primary-500/20 text-primary-400">
                        <Terminal className="w-4 h-4" />
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white">Live Python 3.12 Cloud Sandbox</h4>
                        <p className="text-[11px] text-dark-400">Real-time script compilation with 1:4 batch sync</p>
                      </div>
                    </div>
                    <button
                      onClick={handleRunPython}
                      disabled={codeRunning}
                      className="btn-primary text-xs py-1.5 px-4 font-bold flex items-center gap-1.5"
                    >
                      {codeRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      <span>{codeRunning ? 'Executing...' : 'Run Code'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    {/* Editable Editor */}
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-dark-400 uppercase mb-1">Editor (main.py)</span>
                      <textarea
                        value={pythonCode}
                        onChange={(e) => setPythonCode(e.target.value)}
                        className="flex-1 w-full p-3 rounded-xl bg-dark-950 border border-dark-800 font-mono text-xs text-emerald-300 focus:outline-none focus:border-primary-500 resize-none min-h-[180px]"
                        spellCheck={false}
                      />
                    </div>

                    {/* Terminal Output */}
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-dark-400 uppercase mb-1">Console & Hardware Execution</span>
                      <div className="flex-1 p-3 rounded-xl bg-dark-950 border border-dark-800 font-mono text-xs text-dark-300 overflow-y-auto whitespace-pre-wrap min-h-[180px]">
                        {codeOutput}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-dark-900 border border-dark-800 flex items-center justify-between text-xs text-dark-300">
                    <span className="text-emerald-400 font-mono">● 4 of 4 student test units passed</span>
                    <button
                      onClick={() => setPythonCode(`# Reset code template\nprint("Hello from EduSure Robotics!")`)}
                      className="text-dark-400 hover:text-white text-[11px]"
                    >
                      Reset Code
                    </button>
                  </div>
                </div>
              )}

              {/* HANDS-ON PROJECTS ASSEMBLY */}
              {classroomSubject === 'projects' && (
                <div className="relative rounded-2xl bg-gradient-to-b from-dark-900 to-dark-850 border border-dark-700/80 p-5 shadow-xl flex-1 flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between border-b border-dark-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                        <Wrench className="w-4 h-4" />
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white">Capstone Project: Smart Home Intruder Radar</h4>
                        <p className="text-[11px] text-dark-400">Step-by-step physical assembly under mentor video guidance</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Step {projectStep} of 4
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    {[
                      { step: 1, title: 'Unbox Kit & Mount Chassis', desc: 'Secure 4 DC gear motors with M3 screws' },
                      { step: 2, title: 'Mount Servo & Sensor Radar', desc: 'Attach SG90 servo bracket with ultrasonic eye' },
                      { step: 3, title: 'Wire L298N Motor Driver', desc: 'Connect 7.4V battery pack & control pins' },
                      { step: 4, title: 'Flash Code & Live Defense', desc: 'Present autonomous rover to parents' },
                    ].map((s) => (
                      <button
                        key={s.step}
                        onClick={() => setProjectStep(s.step)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          projectStep === s.step
                            ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg'
                            : 'bg-dark-950 border-dark-800 text-dark-400 hover:border-dark-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-mono font-bold">STEP {s.step}</span>
                          {projectStep > s.step && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                        </div>
                        <div className="text-xs font-bold truncate">{s.title}</div>
                        <div className="text-[10px] text-dark-400 mt-1 line-clamp-2">{s.desc}</div>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-dark-950 border border-dark-800 space-y-2">
                    <span className="text-xs font-bold text-white block">Step {projectStep} Blueprint & Inspection Checklist:</span>
                    <ul className="text-xs text-dark-300 space-y-1 list-disc list-inside">
                      <li>Hold your hardware kit up to the camera so Dr. Vance can verify motor polarity.</li>
                      <li>Double-check red VCC jumper wires connect to the 5V power bus, not 3.3V.</li>
                      <li>Test servo zero-position before securing the ultrasonic bracket screw.</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setProjectStep((s) => Math.max(1, s - 1))}
                      className="px-3 py-1.5 rounded-xl bg-dark-900 border border-dark-800 text-xs text-dark-300 hover:text-white"
                    >
                      Previous Step
                    </button>
                    <button
                      onClick={() => setProjectStep((s) => Math.min(4, s + 1))}
                      className="btn-primary text-xs py-1.5 px-4 font-bold"
                    >
                      Complete Step & Next
                    </button>
                  </div>
                </div>
              )}

              {/* SPEED MATH ARENA */}
              {classroomSubject === 'speed_math' && (
                <div className="relative rounded-2xl bg-gradient-to-b from-dark-900 to-dark-850 border border-dark-700/80 p-5 shadow-xl flex-1 flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between border-b border-dark-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-primary-500/20 text-primary-400 flex items-center justify-center font-bold text-xs">
                        R{currentPuzzle.round}
                      </span>
                      <span className="text-xs font-semibold text-white">{currentPuzzle.title}</span>
                    </div>
                    <span className="text-xs font-mono text-dark-400">Time Remaining: {timerSeconds}s</span>
                  </div>

                  <div className="py-6 text-center space-y-4">
                    <div className="inline-block p-4 sm:p-6 rounded-3xl bg-dark-950/80 border-2 border-primary-500/40 shadow-2xl">
                      <span className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-white to-secondary-400 font-mono tracking-tight">
                        {currentPuzzle.question}
                      </span>
                    </div>
                    <p className="text-xs text-amber-300/90 font-medium flex items-center justify-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{currentPuzzle.hint}</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {currentPuzzle.options.map((opt) => {
                      const isSelected = selectedOption === opt;
                      const isCorrect = opt === currentPuzzle.correctAnswer;
                      let btnClass = 'bg-dark-900 border-dark-700 text-white hover:border-primary-500 hover:bg-dark-800';
                      if (selectedOption !== null) {
                        if (isCorrect) btnClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 scale-105';
                        else if (isSelected) btnClass = 'bg-red-500/20 border-red-500 text-red-300';
                        else btnClass = 'bg-dark-900/50 border-dark-800 text-dark-500 opacity-60';
                      }
                      return (
                        <button
                          key={opt}
                          onClick={() => handleSelectAnswer(opt)}
                          disabled={selectedOption !== null}
                          className={`p-4 rounded-2xl border-2 text-center font-mono font-bold text-xl transition-all ${btnClass}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {feedback && (
                    <div className={`p-3 rounded-2xl border flex items-center justify-between text-xs font-semibold ${
                      feedback === 'correct' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-red-500/20 border-red-500 text-red-300'
                    }`}>
                      <span>{feedback === 'correct' ? '⚡ Awesome calculation! +1 Star awarded to you!' : '❌ Not quite. Check the shortcut tip!'}</span>
                      <button onClick={handleNextRound} className="px-3 py-1 rounded-xl bg-white text-dark-950 font-bold">
                        Next Problem →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Video & Room Control Bar */}
              <div className="mt-4 pt-3 border-t border-dark-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMicActive(!micActive)}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      micActive ? 'bg-dark-800 border-dark-700 text-white' : 'bg-red-500/20 border-red-500 text-red-400'
                    }`}
                  >
                    {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    <span className="hidden sm:inline">{micActive ? 'Mute' : 'Unmuted'}</span>
                  </button>

                  <button
                    onClick={() => setVideoActive(!videoActive)}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      videoActive ? 'bg-dark-800 border-dark-700 text-white' : 'bg-red-500/20 border-red-500 text-red-400'
                    }`}
                  >
                    {videoActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    <span className="hidden sm:inline">{videoActive ? 'Video On' : 'Video Off'}</span>
                  </button>

                  <button
                    onClick={() => setHandRaised(!handRaised)}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      handRaised ? 'bg-amber-500 text-dark-950 border-amber-500' : 'bg-dark-800 border-dark-700 text-white'
                    }`}
                  >
                    <Hand className="w-4 h-4" />
                    <span className="hidden sm:inline">{handRaised ? 'Hand Raised!' : 'Raise Hand'}</span>
                  </button>
                </div>

                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors"
                >
                  Leave Session
                </button>
              </div>
            </div>

            {/* Right Column: 1 Tutor Box + 4 Student Video Boxes (4 cols) */}
            <div className="lg:col-span-4 bg-dark-900 border-l border-dark-800 p-3 sm:p-4 flex flex-col justify-between space-y-3 overflow-y-auto">
              {/* Tutor Video Stream Box (Top) */}
              <div className="relative rounded-2xl bg-dark-950 border border-dark-750 overflow-hidden shadow-lg h-36 flex flex-col justify-between p-3">
                <div className="flex items-center justify-between text-xs z-10">
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-dark-900/90 text-white font-semibold text-[11px] border border-dark-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Dr. Sarah Vance <span className="text-[9px] font-mono text-primary-400">MENTOR</span>
                  </span>
                  <Volume2 className="w-3.5 h-3.5 text-primary-400" />
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary-500 to-secondary-500 flex items-center justify-center text-white font-extrabold text-sm shadow-xl">
                    SV
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-dark-400 z-10 font-mono">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-3 bg-emerald-400 rounded-sm animate-pulse" />
                    <span className="w-1.5 h-4 bg-emerald-400 rounded-sm animate-pulse delay-75" />
                    <span className="w-1.5 h-2 bg-emerald-400 rounded-sm animate-pulse delay-150" />
                  </div>
                  <span>1080p Mentor HD</span>
                </div>
              </div>

              {/* 1:4 Small-Batch Student Video Grid */}
              <div className="space-y-2 flex-1">
                <span className="text-[11px] font-mono text-dark-400 uppercase tracking-wider block font-semibold">
                  Tuition Batch R-102 (4 Builders):
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="relative rounded-xl bg-dark-950 border border-dark-800 p-2.5 flex flex-col justify-between h-28"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-white font-semibold truncate text-[11px]">{student.name.split(' ')[0]}</span>
                        <span className="text-amber-400 font-mono font-bold text-[10px]">★ {student.stars}</span>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="w-9 h-9 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center text-white font-bold text-xs">
                          {student.name[0]}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[9px] text-dark-400 font-mono">
                        <span className="truncate text-amber-300">{student.projectStatus}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Batch Project Status */}
              <div className="p-3 rounded-2xl bg-dark-950 border border-dark-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-dark-400 uppercase font-semibold">Batch Project Goal:</span>
                  <span className="text-emerald-400 font-bold">4WD Obstacle Rover</span>
                </div>
                <div className="w-full h-1.5 bg-dark-800 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full" />
                </div>
                <span className="text-[10px] text-dark-400 block text-right font-mono">75% Complete (Testing Phase)</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
