'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Video, Terminal, Bot, Check,
  Cpu, Users, Shield, ArrowUpRight, Zap, Package, Wrench
} from 'lucide-react';

export default function FeaturesSection({ onOpenDemo }: { onOpenDemo: () => void }) {
  const [activeTab, setActiveTab] = useState<'circuit_lab' | 'classroom' | 'python_sandbox' | 'hardware_kit'>('circuit_lab');

  const tabs = [
    { id: 'circuit_lab' as const, label: 'Virtual Circuit & Robotics', icon: Bot, tag: 'Hardware Sim' },
    { id: 'classroom' as const, label: '1:4 Live Video Lab', icon: Video, tag: 'Small Batch' },
    { id: 'python_sandbox' as const, label: 'Python & Game Dev', icon: Terminal, tag: 'In-Browser IDE' },
    { id: 'hardware_kit' as const, label: 'Doorstep Hardware Kits', icon: Package, tag: 'Physical Boxes' },
  ];

  return (
    <section id="features" className="section-padding relative">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-primary-400 mb-2 block">
            Integrated Learning Architecture
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Built for Real <span className="gradient-text">Hands-On Mastery</span>
          </h2>
          <p className="text-dark-300 text-sm md:text-base">
            From circuit wiring to Python game programming and physical hardware kit assembly under certified 1:4 mentor guidance.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-4xl mx-auto p-1.5 rounded-2xl bg-dark-800/80 border border-dark-700/60">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-500 to-amber-500 text-white shadow-lg'
                    : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Panel */}
        <div className="relative min-h-[460px] glass-card p-6 sm:p-10 border border-dark-700/80">
          <AnimatePresence mode="wait">
            {activeTab === 'circuit_lab' && (
              <motion.div
                key="circuit_lab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                    <Bot className="w-3.5 h-3.5" /> Virtual Breadboard & Sensors
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Test Robotics Circuits Before Connecting Physical Power
                  </h3>
                  <p className="text-dark-300 text-sm leading-relaxed">
                    Students experiment with Arduino microcontrollers, ultrasonic echo sensors, motor driver H-bridges, and LEDs in a safe virtual sandbox, preventing short circuits and burned components.
                  </p>
                  
                  <div className="space-y-3">
                    {[
                      'Interactive breadboard pin wiring with color-coded jumper telemetry',
                      'Real-time ultrasonic distance simulation (5cm - 80cm) with obstacle alerts',
                      'Virtual servo angle rotation and 4WD motor speed PWM testing',
                    ].map((point, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-dark-200">
                        <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={onOpenDemo}
                      className="btn-primary inline-flex items-center gap-2 text-xs sm:text-sm"
                    >
                      Open Live Circuit Simulator <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Circuit Preview Visual */}
                <div className="bg-dark-950 p-5 rounded-2xl border border-dark-800 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-dark-800 pb-3">
                    <span className="text-xs text-amber-400 font-mono font-bold">Arduino Nano V3 • Circuit State</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                      5V Bus Active
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-dark-900 border border-dark-800 flex justify-between items-center">
                      <span className="text-dark-400">Pin D9 (PWM)</span>
                      <span className="text-amber-400">SG90 Servo (90°)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-dark-900 border border-dark-800 flex justify-between items-center">
                      <span className="text-dark-400">Pin D11 (Trig) / D12 (Echo)</span>
                      <span className="text-emerald-400">Ultrasonic Sensor (18 cm)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-dark-900 border border-dark-800 flex justify-between items-center">
                      <span className="text-dark-400">H-Bridge IN1..IN4</span>
                      <span className="text-primary-400">Dual TT Gear Motors: CRUISE</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300">
                    ✓ All circuits verified. Jumper connections ready for physical assembly.
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'classroom' && (
              <motion.div
                key="classroom"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-500/10 border border-secondary-500/30 text-secondary-300 text-xs font-mono">
                    <Zap className="w-3.5 h-3.5" /> 1:4 Small Batch WebRTC Video
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Small Batch (1:4) Video Mesh with Dual Hardware Cameras
                  </h3>
                  <p className="text-dark-300 text-sm leading-relaxed">
                    No crowded classrooms of 50 students. With only 4 students per batch, tutors can inspect each child's physical breadboard camera, debug Python syntax line-by-line, and ensure nobody falls behind.
                  </p>
                  
                  <div className="space-y-3">
                    {[
                      'Dual webcam support: face camera + desk camera for breadboard inspection',
                      'Ultra-low latency audio with background fan and motor noise suppression',
                      'Real-time screen share with code collaborative highlighting',
                    ].map((point, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-dark-200">
                        <div className="w-5 h-5 rounded-full bg-secondary-500/20 text-secondary-400 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={onOpenDemo}
                      className="btn-primary inline-flex items-center gap-2 text-xs sm:text-sm"
                    >
                      Join 1:4 Live Classroom <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-dark-950 p-5 rounded-2xl border border-dark-800 space-y-4 shadow-xl">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="aspect-video bg-dark-900 rounded-xl border border-dark-800 p-3 flex flex-col justify-between">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-primary-400 font-bold">Mentor Dr. Vance</span>
                        <span className="text-emerald-400">HD Stream</span>
                      </div>
                      <div className="text-center text-xs text-dark-400">Breadboard Cam Active</div>
                    </div>
                    <div className="aspect-video bg-dark-900 rounded-xl border border-dark-800 p-3 flex flex-col justify-between">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-white font-bold">Alex Johnson (You)</span>
                        <span className="text-amber-400">Wiring Sensor</span>
                      </div>
                      <div className="text-center text-xs text-dark-400">4WD Rover Mounted</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-dark-900 border border-dark-800">
                      <div className="text-white font-bold">1:4 Ratio</div>
                      <div className="text-[10px] text-dark-400">Strict Cap</div>
                    </div>
                    <div className="p-2 rounded-lg bg-dark-900 border border-dark-800">
                      <div className="text-white font-bold">24ms</div>
                      <div className="text-[10px] text-dark-400">Ultra-low Ping</div>
                    </div>
                    <div className="p-2 rounded-lg bg-dark-900 border border-dark-800">
                      <div className="text-white font-bold">100%</div>
                      <div className="text-[10px] text-dark-400">Attention Time</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'python_sandbox' && (
              <motion.div
                key="python_sandbox"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-300 text-xs font-mono">
                    <Terminal className="w-3.5 h-3.5" /> Python 3.12 Cloud Compiler
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Live In-Browser Coding from Basic Loops to Python AI
                  </h3>
                  <p className="text-dark-300 text-sm leading-relaxed">
                    Zero environment install required. Students jump straight into writing Python logic, building Pygame arcade classics, and programming autonomous steering algorithms.
                  </p>
                  
                  <div className="space-y-3">
                    {[
                      'Instant code runner with immediate standard output & error diagnostics',
                      '50+ built-in coding exercises with automated test assertions',
                      'Serial bridge to flash Python MicroPython scripts straight to microcontrollers',
                    ].map((point, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-dark-200">
                        <div className="w-5 h-5 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={onOpenDemo}
                      className="btn-primary inline-flex items-center gap-2 text-xs sm:text-sm"
                    >
                      Try Interactive Code Runner <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-dark-950 p-5 rounded-2xl border border-dark-800 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between border-b border-dark-800 pb-3">
                    <span className="text-xs text-white font-semibold font-mono">main.py (Python 3.12)</span>
                    <span className="text-xs text-emerald-400 font-mono font-bold">Status: All Tests Passed</span>
                  </div>

                  <pre className="p-3 rounded-xl bg-dark-900 border border-dark-800 text-xs text-primary-300 font-mono overflow-x-auto">
{`def steer_evasion(dist):
    if dist < 20:
        return "TURN_RIGHT_45"
    return "FULL_AHEAD"

# Test assertion
assert steer_evasion(15) == "TURN_RIGHT_45"
print("✓ Evasion logic verified!")`}
                  </pre>

                  <div className="p-3 rounded-xl bg-dark-900 border border-dark-800 text-[11px] text-dark-300 font-mono">
                    <span className="text-emerald-400">Terminal Output:</span><br />
                    <span>&gt;&gt;&gt; [EduSure Python Sandbox]</span><br />
                    <span>&gt;&gt;&gt; ✓ Evasion logic verified!</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'hardware_kit' && (
              <motion.div
                key="hardware_kit"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                    <Package className="w-3.5 h-3.5" /> Doorstep Hardware Logistics
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Real Physical Engineering Kits Delivered to Your Home
                  </h3>
                  <p className="text-dark-300 text-sm leading-relaxed">
                    Learning is never purely virtual. Every enrolled student receives our curated physical hardware kit containing genuine microcontrollers, sensors, motors, chassis, and tools.
                  </p>
                  
                  <div className="space-y-3">
                    {[
                      'EduSure Robotic Kit v3.2: Arduino Nano, 4WD chassis, ultrasonic & IR sensors',
                      'Smart IoT Expansion Pack: ESP32 Wi-Fi module, soil sensor, relay switch & buzzer',
                      'Zero soldering required: Child-safe push-fit jumper wires and acrylic frames',
                    ].map((point, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-dark-200">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-dark-950 p-5 rounded-2xl border border-dark-800 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between border-b border-dark-800 pb-3">
                    <span className="text-xs text-white font-semibold">Box v3.2 Component Checklist</span>
                    <span className="text-xs text-emerald-400 font-mono font-bold">100% Quality Inspected</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {[
                      { item: 'Arduino Nano Microcontroller + USB-C Cable', count: '1x' },
                      { item: '4-Wheel Drive Acrylic Robot Chassis + Geared Motors', count: '4x' },
                      { item: 'HC-SR04 Ultrasonic Distance Sensor + Mounting Bracket', count: '1x' },
                      { item: 'SG90 Micro Servo Motor for Radar Sweep', count: '1x' },
                      { item: '830-Point Solderless Breadboard + 65 Jumper Wires', count: '1x' },
                    ].map((comp, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-dark-900 border border-dark-800 flex justify-between items-center">
                        <span className="text-dark-300">{comp.item}</span>
                        <span className="text-amber-400 font-mono font-bold">{comp.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
