'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Mic, MicOff, Video, VideoOff, ScreenShare, Sparkles, Volume2,
  Hand, Send, CheckCircle2, MessageSquare, Bot, Users, Shield, Zap,
  Settings, Award, HelpCircle
} from 'lucide-react';

interface DemoClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoClassroomModal({ isOpen, onClose }: DemoClassroomModalProps) {
  // Functional Switches & Controls State
  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);
  const [screenShareActive, setScreenShareActive] = useState(false);
  const [aiCopilotActive, setAiCopilotActive] = useState(true);
  const [noiseSuppression, setNoiseSuppression] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(1);
  
  // Interactive AI Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'ai' | 'user'; text: string; time: string }>>([
    {
      role: 'ai',
      text: 'Hello! I am your EduSure AI Class Copilot. I am taking notes, generating key concepts, and ready to answer any questions in real-time.',
      time: '10:02 AM',
    },
    {
      role: 'ai',
      text: 'Prof. Miller just covered Quantum Superposition (Slide 3). Would you like a 30-second summary or a quick quiz?',
      time: '10:04 AM',
    },
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai' | 'notes' | 'roster'>('ai');

  // Elapsed time counter
  const [elapsedSeconds, setElapsedSeconds] = useState(145);
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendQuestion = (questionToSend?: string) => {
    const text = (questionToSend || inputQuestion).trim();
    if (!text) return;

    const userMsg = {
      role: 'user' as const,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsAiThinking(true);

    setTimeout(() => {
      let aiReply = "Great question! Based on today's lecture content: In quantum computing, superposition allows qubits to represent both 0 and 1 simultaneously until measured, exponentially increasing parallel computation capacity.";
      if (text.toLowerCase().includes('quiz')) {
        aiReply = "Here is a quick check: If a qubit is in an equal superposition (|0⟩ + |1⟩)/√2, what is the probability of measuring 0? (Hint: |amplitude|² = 50%!).";
      } else if (text.toLowerCase().includes('summary') || text.toLowerCase().includes('notes')) {
        aiReply = "Key Lecture Highlights:\n1. Classical bits (0 or 1) vs Quantum Qubits\n2. Superposition & Bloch Sphere representation\n3. Next topic: Quantum Entanglement & Bell States";
      }

      setChatMessages((prev) => [
        ...prev,
        {
          role: 'ai' as const,
          text: aiReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsAiThinking(false);
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl h-[90vh] max-h-[820px] bg-dark-900 border border-dark-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-dark-800/90 border-b border-dark-700/60">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white text-sm sm:text-base">
                    Quantum Physics 301: Advanced Superposition
                  </h3>
                  <span className="px-2 py-0.5 rounded text-xs font-mono bg-primary-500/20 text-primary-300 border border-primary-500/30">
                    LIVE • {formatTimer(elapsedSeconds)}
                  </span>
                </div>
                <p className="text-xs text-dark-400">Instructor: Dr. Sarah Vance • 38 Participants</p>
              </div>
            </div>

            {/* Quick switches indicators */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setNoiseSuppression(!noiseSuppression)}
                className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                  noiseSuppression
                    ? 'bg-secondary-500/20 border-secondary-500/40 text-secondary-300'
                    : 'bg-dark-700 border-dark-600 text-dark-400'
                }`}
                title="Toggle AI Studio Noise Suppression"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>AI Noise Filter: {noiseSuppression ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-dark-400 hover:text-white hover:bg-dark-700 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Stage Grid */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-dark-950">
            {/* Center: Stage / Presentation Screen */}
            <div className={`flex flex-col h-full ${aiCopilotActive ? 'lg:col-span-8' : 'lg:col-span-12'} p-3 sm:p-4 transition-all duration-300`}>
              {/* Classroom Video Viewport */}
              <div className="relative flex-1 rounded-xl bg-dark-900 border border-dark-800 overflow-hidden flex items-center justify-center">
                {screenShareActive ? (
                  /* Screen Share / Slide Mode */
                  <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-dark-900 via-dark-850 to-dark-900">
                    <div className="flex items-center justify-between border-b border-dark-800 pb-3">
                      <span className="text-xs font-mono text-primary-400 uppercase tracking-wider">
                        Slide {selectedSlide} of 4 • Quantum Mechanics & Wavefunctions
                      </span>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4].map((slide) => (
                          <button
                            key={slide}
                            onClick={() => setSelectedSlide(slide)}
                            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                              selectedSlide === slide
                                ? 'bg-primary-500 text-white'
                                : 'bg-dark-800 text-dark-400 hover:text-white'
                            }`}
                          >
                            Slide {slide}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="my-auto text-center max-w-xl mx-auto space-y-4">
                      <div className="inline-block p-4 rounded-2xl bg-primary-500/10 border border-primary-500/20">
                        <span className="text-3xl font-mono text-primary-300">
                          |Ψ⟩ = α|0⟩ + β|1⟩
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-white">The State Vector & Measurement Probability</h4>
                      <p className="text-sm text-dark-300 leading-relaxed">
                        Where |α|² + |β|² = 1. Prior to observation, the quantum mechanical system simultaneously spans all possible eigenvalues.
                      </p>
                    </div>

                    {/* Small Floating Picture-in-Picture of Teacher */}
                    <div className="absolute bottom-4 right-4 w-44 h-28 rounded-xl bg-dark-800/90 border border-dark-700 shadow-xl overflow-hidden flex flex-col justify-between p-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-dark-300 font-medium">Dr. Vance (Live)</span>
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-600 to-secondary-500 flex items-center justify-center text-white font-bold text-sm">
                          DV
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <span className="w-1 h-3 bg-secondary-400 rounded-full animate-bounce" />
                        <span className="w-1 h-4 bg-secondary-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                        <span className="w-1 h-2 bg-secondary-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      </div>
                    </div>
                  </div>
                ) : videoActive ? (
                  /* HD Video Classroom Stream Simulation */
                  <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-dark-850 to-dark-900">
                    <div className="relative flex flex-col items-center">
                      <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-primary-500 to-secondary-500 p-1 shadow-2xl">
                        <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center text-white font-bold text-3xl sm:text-4xl">
                          SV
                        </div>
                        {micActive && (
                          <div className="absolute -inset-2 rounded-full border border-secondary-400/40 animate-ping pointer-events-none" />
                        )}
                      </div>
                      <h4 className="mt-4 text-white font-medium text-lg">Dr. Sarah Vance</h4>
                      <p className="text-xs text-dark-400">Speaking • Head of Quantum Sciences</p>

                      {/* Live Audio Spectrum indicator */}
                      {micActive ? (
                        <div className="flex items-center gap-1 mt-3 px-3 py-1.5 rounded-full bg-dark-800/80 border border-dark-700">
                          <Volume2 className="w-3.5 h-3.5 text-secondary-400" />
                          <div className="flex items-center gap-1 h-3">
                            <span className="w-1 h-2 bg-secondary-400 rounded-full animate-pulse" />
                            <span className="w-1 h-4 bg-secondary-400 rounded-full animate-pulse [animation-delay:0.15s]" />
                            <span className="w-1 h-3 bg-secondary-400 rounded-full animate-pulse [animation-delay:0.3s]" />
                            <span className="w-1 h-5 bg-secondary-400 rounded-full animate-pulse [animation-delay:0.2s]" />
                            <span className="w-1 h-2 bg-secondary-400 rounded-full animate-pulse [animation-delay:0.05s]" />
                          </div>
                          <span className="text-[11px] text-secondary-300 ml-1 font-mono">HD Audio 48kHz</span>
                        </div>
                      ) : (
                        <div className="mt-3 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs flex items-center gap-1.5">
                          <MicOff className="w-3.5 h-3.5" /> Mic Muted
                        </div>
                      )}
                    </div>

                    {/* Bottom Status Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-dark-400 bg-dark-900/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-dark-800">
                      <span className="flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5 text-primary-400" /> End-to-End Encrypted (AES-256)
                      </span>
                      <span className="font-mono text-dark-300">Latency: 28ms • Loss: 0.0%</span>
                    </div>
                  </div>
                ) : (
                  /* Video Off Placeholder */
                  <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <VideoOff className="w-14 h-14 text-dark-600" />
                    <p className="text-white font-medium">Video Feed Paused</p>
                    <p className="text-xs text-dark-400 max-w-sm">
                      Camera switched off for bandwidth conservation. Audio stream remains active.
                    </p>
                    <button
                      onClick={() => setVideoActive(true)}
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white text-xs font-medium rounded-lg transition-colors"
                    >
                      Turn Camera On
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Control Bar / Switches */}
              <div className="mt-3 py-3 px-4 rounded-xl bg-dark-900 border border-dark-800 flex flex-wrap items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-2">
                  {/* Mic Toggle Switch */}
                  <button
                    onClick={() => setMicActive(!micActive)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      micActive
                        ? 'bg-dark-800 hover:bg-dark-750 text-white border border-dark-700'
                        : 'bg-red-500/20 border border-red-500/40 text-red-300'
                    }`}
                  >
                    {micActive ? <Mic className="w-4 h-4 text-emerald-400" /> : <MicOff className="w-4 h-4" />}
                    <span>{micActive ? 'Mute' : 'Unmute'}</span>
                  </button>

                  {/* Video Toggle Switch */}
                  <button
                    onClick={() => setVideoActive(!videoActive)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      videoActive
                        ? 'bg-dark-800 hover:bg-dark-750 text-white border border-dark-700'
                        : 'bg-red-500/20 border border-red-500/40 text-red-300'
                    }`}
                  >
                    {videoActive ? <Video className="w-4 h-4 text-primary-400" /> : <VideoOff className="w-4 h-4" />}
                    <span>{videoActive ? 'Stop Video' : 'Start Video'}</span>
                  </button>

                  {/* Screen Share Switch */}
                  <button
                    onClick={() => setScreenShareActive(!screenShareActive)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      screenShareActive
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                        : 'bg-dark-800 hover:bg-dark-750 text-white border border-dark-700'
                    }`}
                  >
                    <ScreenShare className="w-4 h-4" />
                    <span>{screenShareActive ? 'Stop Share' : 'Share Screen'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Raise Hand Switch */}
                  <button
                    onClick={() => setHandRaised(!handRaised)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      handRaised
                        ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20 animate-bounce'
                        : 'bg-dark-800 text-dark-300 hover:text-white border border-dark-700'
                    }`}
                  >
                    <Hand className="w-4 h-4" />
                    <span>{handRaised ? 'Hand Raised!' : 'Raise Hand'}</span>
                  </button>

                  {/* AI Copilot Toggle Switch */}
                  <button
                    onClick={() => setAiCopilotActive(!aiCopilotActive)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      aiCopilotActive
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                        : 'bg-dark-800 text-dark-400 border border-dark-700'
                    }`}
                  >
                    <Bot className="w-4 h-4" />
                    <span>AI Copilot: {aiCopilotActive ? 'Active' : 'Hidden'}</span>
                  </button>

                  {/* Leave Call */}
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-lg shadow-red-600/20"
                  >
                    End Demo
                  </button>
                </div>
              </div>
            </div>

            {/* Right: AI Copilot & Real-Time Q&A Drawer */}
            {aiCopilotActive && (
              <div className="lg:col-span-4 h-full border-t lg:border-t-0 lg:border-l border-dark-800 bg-dark-900/90 flex flex-col overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-dark-800 p-2 gap-1 bg-dark-900">
                  <button
                    onClick={() => setActiveTab('ai')}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                      activeTab === 'ai'
                        ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                        : 'text-dark-400 hover:text-white'
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5" /> AI Doubt Solver
                  </button>
                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                      activeTab === 'notes'
                        ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                        : 'text-dark-400 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Live Notes
                  </button>
                  <button
                    onClick={() => setActiveTab('roster')}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                      activeTab === 'roster'
                        ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                        : 'text-dark-400 hover:text-white'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" /> Class (38)
                  </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'ai' && (
                  <div className="flex-1 flex flex-col justify-between p-3 overflow-hidden">
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                      {chatMessages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                        >
                          <div className="flex items-center gap-1 text-[10px] text-dark-400 mb-1">
                            {msg.role === 'ai' ? (
                              <span className="flex items-center gap-1 text-primary-400 font-semibold">
                                <Bot className="w-3 h-3" /> EduSure AI
                              </span>
                            ) : (
                              <span>You</span>
                            )}
                            <span>• {msg.time}</span>
                          </div>
                          <div
                            className={`p-3 rounded-2xl max-w-[90%] whitespace-pre-wrap leading-relaxed ${
                              msg.role === 'user'
                                ? 'bg-primary-600 text-white rounded-tr-none'
                                : 'bg-dark-800 border border-dark-700 text-dark-100 rounded-tl-none'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      {isAiThinking && (
                        <div className="flex items-center gap-2 p-2 text-xs text-primary-400">
                          <Bot className="w-3.5 h-3.5 animate-spin" />
                          <span>AI is generating response...</span>
                        </div>
                      )}
                    </div>

                    {/* Quick Prompt Pills */}
                    <div className="pt-2 border-t border-dark-800">
                      <div className="text-[10px] text-dark-400 mb-1 font-medium">Quick Prompts:</div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        <button
                          onClick={() => handleSendQuestion('Can you give a 3-bullet summary of the current slide?')}
                          className="px-2 py-1 rounded bg-dark-800 hover:bg-dark-700 text-dark-300 text-[11px] transition-colors"
                        >
                          📝 Summary of slide
                        </button>
                        <button
                          onClick={() => handleSendQuestion('Give me a multiple choice quiz question')}
                          className="px-2 py-1 rounded bg-dark-800 hover:bg-dark-700 text-dark-300 text-[11px] transition-colors"
                        >
                          ❓ Test my understanding
                        </button>
                      </div>

                      {/* Chat Input */}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSendQuestion();
                        }}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="text"
                          value={inputQuestion}
                          onChange={(e) => setInputQuestion(e.target.value)}
                          placeholder="Ask AI anything about the lecture..."
                          className="flex-1 bg-dark-800 border border-dark-700 text-white text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-primary-500"
                        />
                        <button
                          type="submit"
                          className="p-2 bg-primary-600 hover:bg-primary-500 text-white rounded-xl transition-colors"
                          title="Send message"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs text-dark-200">
                    <div className="p-3 rounded-xl bg-dark-800/60 border border-dark-700/60 space-y-2">
                      <div className="flex items-center justify-between text-primary-400 font-semibold text-xs">
                        <span>Automated Lecture Chapter 1</span>
                        <span className="text-[10px] text-dark-400">10:00 - 10:15 AM</span>
                      </div>
                      <p className="text-dark-300">
                        Introduction to linear algebra representations in Hilbert space. Matrix mechanics foundation.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-dark-800/60 border border-dark-700/60 space-y-2">
                      <div className="flex items-center justify-between text-secondary-400 font-semibold text-xs">
                        <span>Chapter 2: Superposition States</span>
                        <span className="text-[10px] text-dark-400">10:15 - Current</span>
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-dark-300">
                        <li>Normalized complex probability coefficients</li>
                        <li>Measurement collapse and born rule</li>
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-300">
                      <p className="font-medium text-xs mb-1">🎯 Homework Auto-Generated:</p>
                      <p className="text-[11px] text-dark-300">
                        Problem Set 4 has been created and will be pushed to student dashboards at lecture conclusion.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'roster' && (
                  <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
                    {[
                      { name: 'Dr. Sarah Vance (Instructor)', role: 'Host', online: true },
                      { name: 'Alex Johnson', role: 'Student', online: true },
                      { name: 'Maya Patel', role: 'Student', online: true },
                      { name: 'Liam Chen', role: 'Student', online: true },
                      { name: 'Sophia Rossi', role: 'Student', online: true },
                      { name: 'Ethan Miller', role: 'Student', online: true },
                    ].map((person, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded-lg bg-dark-800/40 border border-dark-700/40"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="text-white font-medium">{person.name}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-dark-700 text-dark-300">
                          {person.role}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
