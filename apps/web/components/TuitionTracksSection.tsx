'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Terminal, Wrench, Sparkles, CheckCircle2, ArrowRight,
  Zap, Package, Shield, Layers, Play, Award, Code2, Bot
} from 'lucide-react';

export default function TuitionTracksSection({ onOpenEnroll }: { onOpenEnroll?: () => void }) {
  const [activeTrack, setActiveTrack] = useState<'robotics' | 'programming' | 'projects' | 'core_stem'>('robotics');

  const tracks = [
    {
      id: 'robotics' as const,
      name: 'Robotics & Microcontrollers',
      icon: Bot,
      color: 'from-amber-500 to-orange-500',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      tagline: 'Arduino, ESP32, Sensor Interfacing & Autonomous Rovers',
      description: 'Students receive physical hardware boxes at home and wire real breadboard circuits, learn pulse-width modulation (PWM), sensor polling, and motor driver H-bridges under 1:4 mentor guidance.',
      kitIncluded: 'EduSure Robotic Kit v3.2 (Arduino, 4WD Chassis, Ultrasonic & IR Sensors, Servo, LCD)',
      modules: [
        'Breadboard Basics & Resistor / LED Circuits',
        'Ultrasonic Sensor Distance Measurement & Serial Plotting',
        'Motor Shield & 4WD Autonomous Obstacle Avoidance',
        'Bluetooth Smartphone-Controlled Robotic Rover',
      ],
      ageGroup: 'Ages 8 - 16',
      mentorRatio: '1 : 4 Small Batch',
    },
    {
      id: 'programming' as const,
      name: 'Programming & Python AI',
      icon: Terminal,
      color: 'from-primary-500 to-secondary-500',
      badgeColor: 'bg-primary-500/20 text-primary-300 border-primary-500/30',
      tagline: 'From Visual Logic to Python, Pygame & Generative AI Models',
      description: 'Hands-on live coding with interactive in-browser compiler. Students build arcade games, interactive chatbots, data visualizations, and automation scripts with instant live syntax feedback.',
      kitIncluded: 'Interactive Cloud Sandbox + 50+ Real-World Code Challenges',
      modules: [
        'Logic Fundamentals: Variables, Loops & Functions',
        'Object-Oriented Game Dev in Python & Pygame',
        'Data Structures & Algorithm Optimization',
        'AI Vision & Speech Recognition Integration',
      ],
      ageGroup: 'Ages 9 - 18',
      mentorRatio: '1 : 4 Small Batch',
    },
    {
      id: 'projects' as const,
      name: 'Hands-On Engineering Projects',
      icon: Wrench,
      color: 'from-emerald-500 to-teal-500',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      tagline: 'Real Hardware Prototypes, Smart Home IoT & Inventions',
      description: 'Students don’t just memorize theories—they build tangible hardware prototypes. Every 8 sessions culminate in a working physical project presented to parents during live project defense.',
      kitIncluded: 'Smart IoT Expansion Pack (Sensors, Relays, Wi-Fi ESP32, Solar Cell)',
      modules: [
        'Smart Plant Self-Watering System with Soil Moisture Sensors',
        'Home Security Intruder Alarm with Motion Radar & Buzzer',
        'Solar-Powered Miniature Smart Weather Station',
        '4-DOF Articulated Robotic Arm with Claw Pick & Place',
      ],
      ageGroup: 'Ages 10 - 17',
      mentorRatio: '1 : 4 Small Batch',
    },
    {
      id: 'core_stem' as const,
      name: 'Applied Science, Physics & Speed Math',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      tagline: 'Mental Agility, Applied Physics & Engineering Foundations',
      description: 'Connect classroom math and physics to real-world engineering. Fast calculation techniques, circuit voltage physics, gear ratio kinematics, and Olympiad problem-solving.',
      kitIncluded: 'Physics Mechanics & Speed Math Formula Workshop Suite',
      modules: [
        'Rapid Mental Arithmetic & Pattern Recognition Sprints',
        'Kinematics & Gear Ratios for Mechanical Advantage',
        'Ohm’s Law & Electric Potential in Real Circuits',
        'Competitive STEM Olympiad Logic & Proofs',
      ],
      ageGroup: 'Ages 7 - 16',
      mentorRatio: '1 : 4 Small Batch',
    },
  ];

  const current = tracks.find((t) => t.id === activeTrack) || tracks[0];

  return (
    <section id="tracks" className="section-padding relative bg-dark-950/70 border-t border-b border-dark-800">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-800/80 border border-dark-700/80 text-xs font-medium text-amber-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive STEM & Hardware Curriculum</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Online Tuition Tailored for <span className="gradient-text">Real Builders</span>
          </h2>
          <p className="text-dark-300 text-sm sm:text-base mt-3">
            Choose from our specialized 1:4 live tuition tracks. From assembling robotic rovers to writing Python games and hands-on hardware prototypes.
          </p>
        </div>

        {/* Track Selection Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto mb-10">
          {tracks.map((track) => {
            const Icon = track.icon;
            const isSelected = activeTrack === track.id;
            return (
              <button
                key={track.id}
                onClick={() => setActiveTrack(track.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-dark-850 border-primary-500/70 shadow-xl shadow-primary-500/10 ring-1 ring-primary-500/40'
                    : 'bg-dark-900/60 border-dark-800 hover:border-dark-700 hover:bg-dark-850/60 text-dark-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isSelected
                        ? `bg-gradient-to-tr ${track.color} text-white shadow-md`
                        : 'bg-dark-800 text-dark-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${track.badgeColor}`}>
                    {track.mentorRatio}
                  </span>
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-dark-200'}`}>
                    {track.name}
                  </h4>
                  <span className="text-[11px] text-dark-400 font-mono mt-0.5 block">{track.ageGroup}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Track Detailed Feature Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-6 sm:p-10 border border-dark-700/80 max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Track Details (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className={`text-xs font-mono font-semibold uppercase px-2.5 py-1 rounded-full border inline-block mb-3 ${current.badgeColor}`}>
                    {current.tagline}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {current.name}
                  </h3>
                  <p className="text-dark-300 text-sm sm:text-base mt-2 leading-relaxed">
                    {current.description}
                  </p>
                </div>

                {/* Hardware Kit Included Banner */}
                <div className="p-4 rounded-2xl bg-dark-900 border border-dark-800 flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Physical Hardware Kit Shipped to Doorstep</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                        FREE SHIPPING
                      </span>
                    </span>
                    <p className="text-xs text-dark-400 mt-0.5">{current.kitIncluded}</p>
                  </div>
                </div>

                {/* Modules Checklist */}
                <div>
                  <span className="text-xs font-mono uppercase text-dark-400 block mb-2.5 font-semibold">
                    Hands-On Curriculum Milestones:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {current.modules.map((m, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-dark-900/70 border border-dark-800 text-xs text-dark-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <a
                    href="/dashboard/student"
                    className="btn-primary text-xs sm:text-sm font-semibold inline-flex items-center gap-2 px-5 py-2.5"
                  >
                    <span>View Student Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="/dashboard/teacher"
                    className="btn-secondary text-xs sm:text-sm font-semibold inline-flex items-center gap-2 px-4 py-2.5"
                  >
                    <span>Tutor View</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Live Interactive Demo Box / Visual Mock (5 cols) */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-dark-900 border border-dark-700/80 p-5 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-dark-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <span className="text-xs font-mono font-bold text-white">Live 1:4 Tuition Batch</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Active Hardware Session
                    </span>
                  </div>

                  {/* Visual Simulation Display */}
                  <div className="p-4 rounded-xl bg-dark-950 border border-dark-800 space-y-3 font-mono text-xs">
                    {current.id === 'robotics' && (
                      <div className="space-y-2">
                        <div className="text-dark-400">// Arduino Circuit Pin Wiring</div>
                        <div className="text-emerald-400">pinMode(TRIG_PIN, OUTPUT);</div>
                        <div className="text-emerald-400">pinMode(ECHO_PIN, INPUT);</div>
                        <div className="text-primary-400">digitalWrite(LEFT_MOTOR, HIGH);</div>
                        <div className="p-2.5 rounded-lg bg-dark-900 border border-dark-750 text-[11px] text-amber-300">
                          ⚡ Ultrasonic Sensor reading: <strong>14.2 cm</strong> → Turning Servo Right
                        </div>
                      </div>
                    )}

                    {current.id === 'programming' && (
                      <div className="space-y-2">
                        <div className="text-dark-400"># Python 3.12 Game Loop</div>
                        <div className="text-amber-400">def update_player_pos(x, y, vel):</div>
                        <div className="text-emerald-400 pl-4">return x + vel * dt, y</div>
                        <div className="text-primary-400">rover = RobotRover(model="EduBot-1")</div>
                        <div className="p-2.5 rounded-lg bg-dark-900 border border-dark-750 text-[11px] text-emerald-300">
                          ✓ All 4 student test cases passed in 42ms!
                        </div>
                      </div>
                    )}

                    {current.id === 'projects' && (
                      <div className="space-y-2">
                        <div className="text-dark-400">// Project: Smart Plant Irrigation</div>
                        <div className="text-sky-400">moisture_level = read_sensor(A0)</div>
                        <div className="text-amber-400">if moisture_level &lt; 30%:</div>
                        <div className="text-emerald-400 pl-4">trigger_water_pump(duration_ms=1500)</div>
                        <div className="p-2.5 rounded-lg bg-dark-900 border border-dark-750 text-[11px] text-sky-300">
                          🌱 Water Pump Engaged • Parent WhatsApp Alert Dispatched
                        </div>
                      </div>
                    )}

                    {current.id === 'core_stem' && (
                      <div className="space-y-2">
                        <div className="text-dark-400">-- Applied Kinematics & Speed Math</div>
                        <div className="text-amber-400">Gear Ratio = Driven Teeth / Driver Teeth (48/12 = 4:1)</div>
                        <div className="text-emerald-400">Speed Multiplier = 4.0x torque increase</div>
                        <div className="p-2.5 rounded-lg bg-dark-900 border border-dark-750 text-[11px] text-amber-300">
                          ★ Star Awarded to Alex Johnson (Answered in 4.2s)
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 4 Connected Students Bar */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] text-dark-400 font-mono uppercase block">
                      Classroom Batch R-102 (1 Tutor : 4 Students)
                    </span>
                    <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                      {['Alex (Hardware)', 'Maya (Code)', 'Liam (Circuit)', 'Sophia (Testing)'].map((s, idx) => (
                        <div key={idx} className="p-1 rounded-lg bg-dark-800 text-dark-300 truncate font-semibold">
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
