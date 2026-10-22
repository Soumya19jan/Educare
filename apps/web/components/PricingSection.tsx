'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Building2, School, GraduationCap, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (planName: string, billingCycle: string, price: string) => void;
}

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  // Billing cycle switch: Monthly or Quarterly (3 months)
  const [isQuarterly, setIsQuarterly] = useState(true);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const plans = [
    {
      name: 'Coding & Logic Explorer',
      icon: School,
      description: 'Ideal for beginners starting with Python, game programming, and mental speed math agility.',
      monthlyUSD: 49,
      quarterlyUSD: 39,
      monthlyINR: 2999,
      quarterlyINR: 2399,
      popular: false,
      batchRatio: '1 : 4 Small Batch',
      kitBadge: 'Cloud Code Sandbox Included',
      features: [
        '8 Live 1:4 Mentor-Led Video Sessions / mo',
        'Python 3.12, Pygame & Arcade Game Dev',
        'Interactive in-browser code compiler',
        'Speed Math mental agility sprints & weekly stars',
        'Parent WhatsApp progress digests after every class',
        'Direct parent-tutor 1-on-1 chat access',
      ],
      badge: 'Coding Focus',
    },
    {
      name: 'Robotics & Hardware Innovator',
      icon: GraduationCap,
      description: 'Our flagship 1:4 tuition track. Physical robotics kit delivered to your home with live hands-on build guidance.',
      monthlyUSD: 89,
      quarterlyUSD: 69,
      monthlyINR: 5499,
      quarterlyINR: 4499,
      popular: true,
      batchRatio: '1 : 4 Small Batch',
      kitBadge: 'Physical Hardware Box v3.2 Delivered',
      features: [
        '12 Live 1:4 Video Lab Sessions / mo',
        'Physical EduSure Robotic Kit delivered to home',
        'Build 4WD Autonomous Obstacle Rover & Arduino circuits',
        'Python + C++ Microcontroller firmware programming',
        'Step-by-step breadboard assembly with live mentor check',
        'Capstone project showcase & verified certificate',
        'Bi-weekly Parent-Teacher Video Conference (PTM)',
      ],
      badge: 'Most Popular',
    },
    {
      name: 'Full STEM & Invention Master',
      icon: Building2,
      description: 'Comprehensive tuition covering Robotics, Python AI, Smart IoT Prototypes, and Applied Science & Math.',
      monthlyUSD: 129,
      quarterlyUSD: 99,
      monthlyINR: 7999,
      quarterlyINR: 6499,
      popular: false,
      batchRatio: '1 : 4 Small Batch',
      kitBadge: 'Robotics Kit + Smart IoT Expansion Pack',
      features: [
        '16 Live 1:4 Video Lab Sessions / mo',
        'Includes Both Robotics Kit & IoT Sensor Expansion Pack',
        'Smart Plant Waterer, Intruder Alarm & AI Vision Projects',
        'Applied Physics of Circuits, Gear Kinematics & Speed Math',
        'Unlimited 24/7 AI Tutor doubt solving between classes',
        'Dedicated Senior Mentor with personalized project pacing',
        'Priority 1-on-1 Parent Consultation on request',
      ],
      badge: 'All-Inclusive',
    },
  ];

  return (
    <section id="pricing" className="section-padding relative bg-dark-950/70 border-t border-dark-800">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-primary-400 mb-2 block">
            1:4 Small Batch Tuition & Kits
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Live Tuition Plans for <span className="gradient-text">Future Builders</span>
          </h2>
          <p className="text-dark-300 text-sm md:text-base">
            Every plan includes live 1:4 video lab mentorship, real hardware kit boxes delivered to your doorstep, in-browser coding sandboxes, and verified milestone certificates.
          </p>

          {/* Functional Switches: Billing Cycle & Currency */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {/* Monthly / Quarterly Switch */}
            <div className="flex items-center gap-3 bg-dark-800/80 p-1.5 rounded-2xl border border-dark-700/60 shadow-lg">
              <button
                type="button"
                onClick={() => setIsQuarterly(false)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  !isQuarterly
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-dark-400 hover:text-white'
                }`}
              >
                Monthly Tuition
              </button>
              <button
                type="button"
                onClick={() => setIsQuarterly(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isQuarterly
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md'
                    : 'text-dark-400 hover:text-white'
                }`}
              >
                <span>Quarterly (3 Months)</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white">
                  SAVE 20% + FREE KIT DISPATCH
                </span>
              </button>
            </div>

            {/* Currency Switcher */}
            <div className="flex items-center gap-1 bg-dark-800/80 p-1 rounded-xl border border-dark-700/60 text-xs">
              <button
                type="button"
                onClick={() => setCurrency('INR')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  currency === 'INR' ? 'bg-secondary-500 text-white' : 'text-dark-400 hover:text-white'
                }`}
              >
                ₹ INR
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  currency === 'USD' ? 'bg-secondary-500 text-white' : 'text-dark-400 hover:text-white'
                }`}
              >
                $ USD
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = isQuarterly
              ? currency === 'INR'
                ? `₹${plan.quarterlyINR.toLocaleString('en-IN')}`
                : `$${plan.quarterlyUSD}`
              : currency === 'INR'
              ? `₹${plan.monthlyINR.toLocaleString('en-IN')}`
              : `$${plan.monthlyUSD}`;

            return (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-dark-800 to-dark-850 border-2 border-primary-500 shadow-2xl shadow-primary-500/10 md:-translate-y-2'
                    : 'bg-dark-900/80 border border-dark-800 hover:border-dark-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Most Popular Track
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-dark-800 text-primary-400 border border-dark-700">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-dark-800 text-amber-400 border border-dark-700">
                      {plan.batchRatio}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <div className="mb-3">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-primary-500/15 text-primary-300 border border-primary-500/30">
                      📦 {plan.kitBadge}
                    </span>
                  </div>
                  <p className="text-xs text-dark-300 mb-6 leading-relaxed">{plan.description}</p>

                  <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-dark-800">
                    <span className="text-4xl font-extrabold text-white">{price}</span>
                    <span className="text-xs text-dark-400 font-medium">/ month ({isQuarterly ? 'quarterly billing' : 'monthly billing'})</span>
                  </div>

                  <ul className="space-y-3 mb-8 text-xs sm:text-sm">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-dark-200">
                        <Check className="w-4 h-4 text-secondary-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPlan(plan.name, isQuarterly ? 'Quarterly' : 'Monthly', price)}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                    plan.popular
                      ? 'btn-primary'
                      : 'bg-dark-800 hover:bg-dark-700 text-white border border-dark-700'
                  }`}
                >
                  <span>Enroll in {plan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Enterprise Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-transparent border border-dark-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-white font-bold text-base">Looking for custom institutional procurement?</h4>
            <p className="text-xs text-dark-300">We offer custom on-premise deployments, government portal tenders, and volume pricing.</p>
          </div>
          <button
            onClick={() => onSelectPlan('Custom Enterprise Tender', 'Annual', 'Custom Quote')}
            className="px-5 py-2.5 bg-dark-800 hover:bg-dark-700 border border-dark-600 text-white text-xs font-semibold rounded-xl shrink-0 transition-colors"
          >
            Request Custom RFP
          </button>
        </div>
      </div>
    </section>
  );
}
