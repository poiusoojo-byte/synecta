import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import {
  ArrowRight,
  Repeat,
  Image,
  Briefcase,
  Sparkles,
  ShieldCheck,
  Zap,
  Users,
  Award,
  ChevronRight,
  Play,
  CheckCircle2,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentPage, openPitchDeck } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Welcome Bar */}
      <nav className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo size="md" showTagline={false} />
          <div className="flex items-center gap-3">
            <button
              onClick={openPitchDeck}
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/60 transition-colors"
            >
              <Award className="w-3.5 h-3.5" />
              <span>ALBACADABRA 2026 Proposal</span>
            </button>
            <button
              onClick={() => setCurrentPage('home')}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-2"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none -z-10">
            <div className="absolute top-10 left-1/4 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl" />
            <div className="absolute top-12 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Competition Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold mb-6 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
              <span>Official Business Plan Competition Prototype • SMAN 3 Kota Sukabumi</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
              Connect Skills.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600">
                Create Opportunities.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              SYNECTA is Indonesia’s skill-sharing social platform. Exchange digital competencies, build verified work portfolios, and collaborate on real-world projects powered by AI matching.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md mx-auto">
              <button
                onClick={() => setCurrentPage('home')}
                className="w-full sm:w-auto px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md shadow-indigo-600/20 hover:scale-102 flex items-center justify-center gap-2.5"
              >
                <span>Explore Platform</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentPage('skillswap')}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base rounded-xl transition-all border border-slate-300/80 shadow-2xs flex items-center justify-center gap-2 hover:border-indigo-400"
              >
                <Repeat className="w-4 h-4 text-indigo-600" />
                <span>Discover How It Works</span>
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Instant Demo Access
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> No Sign-Up Required
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Interactive Mock Data
              </span>
            </div>

            {/* Live Interactive Hero Banner Card */}
            <div className="mt-14 max-w-5xl mx-auto rounded-2xl bg-white border border-slate-200/90 shadow-xl overflow-hidden p-3 sm:p-5">
              <div className="rounded-xl bg-slate-900 text-white p-5 sm:p-8 text-left relative overflow-hidden">
                <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-3 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-indigo-500/30 text-indigo-300 font-mono text-xs font-semibold border border-indigo-400/30">
                        AI SKILLSWAP ENGINE
                      </span>
                      <span className="text-xs text-slate-400">Live Simulation</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      “Trade UI/UX Design for React Frontend Architecture”
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm">
                      Matches two creators with complementary skills and mutual scheduling. Connect in one click to launch an in-browser collaborative session.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full sm:w-auto">
                    <button
                      onClick={() => setCurrentPage('skillswap')}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-102"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Launch SkillSwap Demo</span>
                    </button>
                    <button
                      onClick={openPitchDeck}
                      className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-colors"
                    >
                      <span>Read Business Model (PDF)</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Three Benefit Cards Required by Prompt */}
            <div className="mt-20 max-w-7xl mx-auto text-left">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Built for the Productive Generation
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Three interconnected pillars solving the skill-to-employment gap in Indonesia.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Benefit 1 */}
                <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Repeat className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                      Pillar 01
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2.5">
                      Exchange Skills
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Zero monetary cost barter system. Trade your specialized talents—from video editing and 3D modeling to React development—through algorithmically matched peer mentoring.
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentPage('skillswap')}
                    className="mt-6 flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                  >
                    <span>Test SkillSwap</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Benefit 2 */}
                <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                      <Image className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600">
                      Pillar 02
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2.5">
                      Showcase Talent
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Publish designs, code repositories, short-form reels, and business decks. Receive peer feedback and validated 5-star badges that demonstrate verifiable proof of skill.
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentPage('showcase')}
                    className="mt-6 flex items-center gap-1.5 text-xs font-bold text-cyan-600 hover:text-cyan-800"
                  >
                    <span>Browse Showcase</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Benefit 3 */}
                <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                      Pillar 03
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2.5">
                      Build Projects
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Discover curated project recruitment calls from early-stage startups, agencies, and student collectives. Apply directly using your verified SYNECTA skill reputation.
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentPage('projects')}
                    className="mt-6 flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-800"
                  >
                    <span>View Projects</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Demo Workflow Journey Callout */}
            <div className="mt-16 p-6 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 max-w-4xl mx-auto text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  Recommended Demo Journey for Competition Judges
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  1. Explore Discover → 2. Test SkillSwap Matching → 3. Open Video Call → 4. Inspect Showcase → 5. Apply to Project.
                </p>
              </div>
              <button
                onClick={() => setCurrentPage('home')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shrink-0 transition-colors shadow-sm"
              >
                Start Demo Walkthrough
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo size="sm" showTagline={false} />
            <span className="text-slate-400">•</span>
            <span>Connect Skills. Create Opportunities.</span>
          </div>
          <div>
            Built by <strong className="text-slate-800">Tim Santasi (SMAN 3 Kota Sukabumi)</strong> for ALBACADABRA 2026.
          </div>
        </div>
      </footer>
    </div>
  );
};
