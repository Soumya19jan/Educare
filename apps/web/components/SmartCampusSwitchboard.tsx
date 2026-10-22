'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bot, Terminal, Wrench, Package, Video, MessageSquareText,
  Zap, Brain, CheckCircle2, RotateCcw, Sparkles, SlidersHorizontal, Activity, Cpu
} from 'lucide-react';

interface SwitchConfig {
  id: string;
  name: string;
  description: string;
  icon: any;
  enabled: boolean;
  category: 'Robotics & Hardware' | 'Coding & AI' | 'Tuition & Parents';
  badge: string;
}

export default function SmartCampusSwitchboard() {
  const [switches, setSwitches] = useState<SwitchConfig[]>([
    {
      id: 'robotics_sim',
      name: 'Interactive Virtual Circuit & Sensor Lab',
      description: 'Simulates real Arduino/ESP32 breadboard pin wiring, ultrasonic radar distance scanning, and servo motors before physical assembly.',
      icon: Bot,
      enabled: true,
      category: 'Robotics & Hardware',
      badge: 'Arduino & ESP32 Virtual I/O',
    },
    {
      id: 'python_compiler',
      name: 'Live In-Browser Python 3.12 Sandbox',
      description: 'Students write, run, and debug Python game logic, algorithms, and rover automation scripts with zero local setup.',
      icon: Terminal,
      enabled: true,
      category: 'Coding & AI',
      badge: 'Zero-install Cloud IDE',
    },
    {
      id: 'kit_dispatch',
      name: 'Doorstep Hardware Kit Delivery Tracker',
      description: 'Physical boxes containing Arduino, sensors, motor drivers, and 4WD chassis are dispatched directly to the student’s home address.',
      icon: Package,
      enabled: true,
      category: 'Robotics & Hardware',
      badge: 'Inspected Component Box v3.2',
    },
    {
      id: 'batch_video',
      name: 'Low-Latency 1:4 Video Mesh with Screen & Breadboard Cam',
      description: 'Ultra-small batches ensure the tutor spots loose jumper wires, corrects syntax typos, and guides every student personally.',
      icon: Video,
      enabled: true,
      category: 'Tuition & Parents',
      badge: '1:4 Strict Ratio Guarantee',
    },
    {
      id: 'parent_pulse',
      name: 'Automated Parent WhatsApp Class Digest',
      description: 'Dispatches video recordings of child’s working rover, lines of Python written, and mentor review notes immediately after each session.',
      icon: MessageSquareText,
      enabled: true,
      category: 'Tuition & Parents',
      badge: 'Instant Parent Transparency',
    },
    {
      id: 'hands_on_blueprints',
      name: 'Interactive Project Blueprints & Capstone Defense',
      description: 'Step-by-step schematics for Smart Plant Waterer, Intruder Radar, and Autonomous Rover culminating in parent live defense.',
      icon: Wrench,
      enabled: true,
      category: 'Robotics & Hardware',
      badge: 'Verified Builder Capstone',
    },
    {
      id: 'speed_math',
      name: 'Speed Math & Applied Physics Sprint Arena',
      description: 'Mental agility games, Vedic arithmetic shortcuts, and circuit physics equations (Ohm’s law, gear ratios) gamified with stars.',
      icon: Zap,
      enabled: true,
      category: 'Coding & AI',
      badge: 'Mental Agility & Agility Sprints',
    },
    {
      id: 'ai_copilot',
      name: '24/7 Socratic Robotics & Code Copilot',
      description: 'Guided hints for broken code or miswired breadboards without giving away answers, fostering true problem-solving resilience.',
      icon: Brain,
      enabled: false,
      category: 'Coding & AI',
      badge: 'Socratic Hint Engine',
    },
  ]);

  const [activeCategory, setActiveCategory] = useState<'All' | 'Robotics & Hardware' | 'Coding & AI' | 'Tuition & Parents'>('All');
  const [systemLog, setSystemLog] = useState<string>('Tuition workstation synchronized. All 1:4 classroom systems active.');

  const toggleSwitch = (id: string) => {
    setSwitches((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newState = !item.enabled;
          setSystemLog(
            `Module [${item.name}] set to ${newState ? 'ACTIVE' : 'STANDBY'} at ${new Date().toLocaleTimeString()}`
          );
          return { ...item, enabled: newState };
        }
        return item;
      })
    );
  };

  const activeCount = switches.filter((s) => s.enabled).length;
  const filteredSwitches = activeCategory === 'All' ? switches : switches.filter((s) => s.category === activeCategory);

  return (
    <section id="switchboard" className="section-padding relative overflow-hidden bg-dark-900 border-t border-b border-dark-800">
      {/* Background glow highlights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-300 text-xs font-semibold mb-4">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Interactive Tuition & Hardware Switchboard
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Total Live Lab Control at <span className="gradient-text">Your Fingertips</span>
          </h2>
          <p className="text-dark-300 text-sm md:text-base leading-relaxed">
            Toggle modules on and off in real-time. Experience how EduSure orchestrates virtual breadboards, in-browser Python compilers, hardware kit delivery, and parent updates.
          </p>
        </div>

        {/* Live Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="glass-card p-4 text-center">
            <div className="text-xs text-dark-400 font-medium mb-1">Active Lab Modules</div>
            <div className="text-2xl sm:text-3xl font-bold text-primary-400 flex items-center justify-center gap-1">
              <span>{activeCount}</span>
              <span className="text-xs text-dark-400">/ {switches.length}</span>
            </div>
            <span className="inline-block mt-1 text-[11px] text-emerald-400 font-mono">
              ● Live Lab Ready
            </span>
          </div>

          <div className="glass-card p-4 text-center">
            <div className="text-xs text-dark-400 font-medium mb-1">Small Batch Mentorship</div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-400">
              1 : 4 Ratio
            </div>
            <span className="inline-block mt-1 text-[11px] text-dark-300">
              Strict peer cap
            </span>
          </div>

          <div className="glass-card p-4 text-center">
            <div className="text-xs text-dark-400 font-medium mb-1">Hardware Kit Delivery</div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">100%</div>
            <span className="inline-block mt-1 text-[11px] text-emerald-300">
              Doorstep Box v3.2
            </span>
          </div>

          <div className="glass-card p-4 text-center">
            <div className="text-xs text-dark-400 font-medium mb-1">Parent Visibility</div>
            <div className="text-2xl sm:text-3xl font-bold text-white">Instant</div>
            <span className="inline-block mt-1 text-[11px] text-secondary-400 font-medium">
              Post-Session WhatsApp Digest
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-dark-800">
          <div className="flex flex-wrap gap-2">
            {(['All', 'Robotics & Hardware', 'Coding & AI', 'Tuition & Parents'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                    : 'bg-dark-800 text-dark-300 hover:text-white hover:bg-dark-750'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Real-time system log ticker */}
          <div className="flex items-center gap-2 text-xs text-dark-300 bg-dark-950 px-3 py-1.5 rounded-lg border border-dark-800 font-mono">
            <Activity className="w-3.5 h-3.5 text-secondary-400 animate-pulse" />
            <span className="truncate max-w-xs">{systemLog}</span>
          </div>
        </div>

        {/* The Interactive Switch Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSwitches.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => toggleSwitch(item.id)}
                className={`group cursor-pointer p-5 rounded-2xl border transition-all duration-300 ${
                  item.enabled
                    ? 'bg-dark-800/80 border-primary-500/40 shadow-lg shadow-primary-500/5'
                    : 'bg-dark-900/60 border-dark-800 hover:border-dark-700 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`p-3 rounded-xl transition-colors ${
                        item.enabled
                          ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-md'
                          : 'bg-dark-800 text-dark-400 group-hover:text-dark-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white text-sm sm:text-base group-hover:text-primary-300 transition-colors">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-xs text-dark-300 leading-relaxed mb-3">
                        {item.description}
                      </p>
                      <span className="inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-dark-900 text-secondary-300 border border-dark-800">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  {/* Physical Style Toggle Switch */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0 pt-1">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={item.enabled}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSwitch(item.id);
                      }}
                      className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        item.enabled ? 'bg-primary-500' : 'bg-dark-700'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          item.enabled ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                        item.enabled ? 'text-primary-400' : 'text-dark-500'
                      }`}
                    >
                      {item.enabled ? 'ACTIVE' : 'OFF'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reset / All-On Switch bar */}
        <div className="mt-8 p-4 rounded-xl bg-dark-800/40 border border-dark-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-dark-300">
            <CheckCircle2 className="w-4 h-4 text-secondary-400" />
            <span>Changes take effect immediately across all synchronized institution nodes.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSwitches((prev) => prev.map((s) => ({ ...s, enabled: true })));
                setSystemLog('All 8 features activated simultaneously.');
              }}
              className="text-xs text-primary-400 hover:text-primary-300 font-medium px-3 py-1.5 rounded-lg hover:bg-dark-800 transition-colors"
            >
              Turn All ON
            </button>
            <button
              onClick={() => {
                setSwitches((prev) => prev.map((s) => ({ ...s, enabled: false })));
                setSystemLog('All features paused.');
              }}
              className="text-xs text-dark-400 hover:text-dark-300 font-medium px-3 py-1.5 rounded-lg hover:bg-dark-800 transition-colors"
            >
              Pause All
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
