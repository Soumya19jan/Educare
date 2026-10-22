'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Lock, Mail, User, Building, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  selectedPlan?: { name: string; cycle: string; price: string } | null;
}

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = 'login',
  selectedPlan = null,
}: AuthModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [role, setRole] = useState<'student' | 'teacher' | 'parent' | 'admin'>('teacher');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleQuickDemoFill = (selectedRole: 'student' | 'teacher' | 'parent' | 'admin') => {
    setRole(selectedRole);
    if (selectedRole === 'student') {
      setEmail('alex.student@edusure.io');
      setName('Alex Johnson');
      setPassword('demo-student-pass');
    } else if (selectedRole === 'teacher') {
      setEmail('dr.vance@edusure.io');
      setName('Dr. Sarah Vance');
      setPassword('demo-teacher-pass');
    } else if (selectedRole === 'parent') {
      setEmail('marcus.parent@edusure.io');
      setName('Marcus Johnson');
      setPassword('demo-parent-pass');
    } else {
      setEmail('dean.admin@apex-academy.edu');
      setName('Dean Arthur Miller');
      setInstitutionName('Apex Global Academy');
      setPassword('demo-admin-pass');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');

    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(
        mode === 'login'
          ? `Welcome back! Redirecting to ${role.toUpperCase()} portal...`
          : `Account successfully created! Loading ${role.toUpperCase()} dashboard...`
      );
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
        const target = role === 'admin' ? 'teacher' : role;
        router.push(`/dashboard/${target}`);
      }, 1100);
    }, 700);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-dark-900 border border-dark-700/80 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-dark-400 hover:text-white hover:bg-dark-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500" />
              <span className="font-bold text-white text-lg">EduSure</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {mode === 'login' ? 'Sign in to your account' : 'Start your 14-day free trial'}
            </h3>
            {selectedPlan && (
              <div className="mt-2 p-2 rounded-lg bg-primary-500/10 border border-primary-500/20 text-xs text-primary-300">
                Selected Plan: <strong>{selectedPlan.name}</strong> ({selectedPlan.price} / {selectedPlan.cycle})
              </div>
            )}
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex p-1 rounded-xl bg-dark-800 border border-dark-700 mb-6">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'login' ? 'bg-primary-500 text-white shadow-md' : 'text-dark-400 hover:text-white'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'register' ? 'bg-primary-500 text-white shadow-md' : 'text-dark-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Role Switcher */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-dark-300 mb-2">Select Your Role:</label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['teacher', 'student', 'parent', 'admin'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 px-1 rounded-xl text-xs font-semibold capitalize border transition-all ${
                    role === r
                      ? 'bg-secondary-500/20 border-secondary-500 text-secondary-300 shadow-sm'
                      : 'bg-dark-800/60 border-dark-700 text-dark-400 hover:text-white'
                  }`}
                >
                  {r === 'student' ? '🎓 Student' : r === 'teacher' ? '👨‍🏫 Teacher' : r === 'parent' ? '👨‍👩‍👧 Parent' : '🏛️ Admin'}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Demo Autofill pills */}
          <div className="mb-4 p-2.5 rounded-xl bg-dark-950 border border-dark-800 flex items-center justify-between text-xs">
            <span className="text-dark-400 font-mono text-[11px] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-secondary-400" /> 1-Click Fast Login:
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => handleQuickDemoFill('teacher')}
                className="px-2 py-0.5 rounded bg-dark-800 hover:bg-dark-700 text-primary-300 text-[11px]"
              >
                Teacher
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoFill('student')}
                className="px-2 py-0.5 rounded bg-dark-800 hover:bg-dark-700 text-secondary-300 text-[11px]"
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoFill('parent')}
                className="px-2 py-0.5 rounded bg-dark-800 hover:bg-dark-700 text-amber-300 text-[11px]"
              >
                Parent
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-dark-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-dark-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya Patel"
                    className="w-full pl-9 pr-3 py-2.5 bg-dark-800/80 border border-dark-700 rounded-xl text-white text-xs focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>
            )}

            {mode === 'register' && role === 'admin' && (
              <div>
                <label className="block text-xs font-medium text-dark-300 mb-1">Institution Name</label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 w-4 h-4 text-dark-500" />
                  <input
                    type="text"
                    required
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    placeholder="e.g. Stanford High or Apex Academy"
                    className="w-full pl-9 pr-3 py-2.5 bg-dark-800/80 border border-dark-700 rounded-xl text-white text-xs focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-dark-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-dark-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@school.edu"
                  className="w-full pl-9 pr-3 py-2.5 bg-dark-800/80 border border-dark-700 rounded-xl text-white text-xs focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-dark-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-dark-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-dark-800/80 border border-dark-700 rounded-xl text-white text-xs focus:outline-none focus:border-primary-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-dark-500 hover:text-dark-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Sign In Now' : 'Create Free Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <p className="mt-4 text-center text-[11px] text-dark-500">
            By signing in, you agree to our Terms of Service & FERPA Privacy Compliance.
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
