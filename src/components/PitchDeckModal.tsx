import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import {
  X,
  TrendingUp,
  Award,
  Users,
  ShieldCheck,
  Briefcase,
  DollarSign,
  ChevronRight,
  Sparkles,
  PieChart,
  Layers,
} from 'lucide-react';
import { BUSINESS_PLAN_INFO } from '../data/mockData';

export const PitchDeckModal: React.FC = () => {
  const { isPitchDeckOpen, closePitchDeck } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'strategy' | 'team'>('overview');

  if (!isPitchDeckOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] shadow-2xl flex flex-col border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">Business Plan & Valuation Summary</h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                  ALBACADABRA 2026
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Official Competition Proposal • Tim Santasi (SMAN 3 Kota Sukabumi)
              </p>
            </div>
          </div>
          <button
            onClick={closePitchDeck}
            className="p-2 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Executive Summary
          </button>
          <button
            onClick={() => setActiveTab('financials')}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'financials'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Financial Model & BEP
          </button>
          <button
            onClick={() => setActiveTab('strategy')}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'strategy'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            7P Strategy & Revenue
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'team'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            Founders (Tim Santasi)
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-700 text-sm">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Problem & Demographic Bonus Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 flex gap-4">
                <div className="p-3 bg-indigo-600 text-white rounded-xl h-fit shrink-0">
                  <PieChart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">
                    The Indonesia Demographic Bonus Imperative (BPS 2025 Context)
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                    {BUSINESS_PLAN_INFO.backgroundRationale.bps2025}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-indigo-200/60">
                    <div className="bg-white/80 p-2.5 rounded-lg border border-indigo-100">
                      <span className="text-[11px] text-slate-500 uppercase font-bold block">SMA Unemployment</span>
                      <span className="text-base font-extrabold text-amber-600">6.88% (BPS)</span>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-lg border border-indigo-100">
                      <span className="text-[11px] text-slate-500 uppercase font-bold block">SMK Unemployment</span>
                      <span className="text-base font-extrabold text-red-600">8.63% (BPS)</span>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-lg border border-indigo-100">
                      <span className="text-[11px] text-slate-500 uppercase font-bold block">University Grad TPT</span>
                      <span className="text-base font-extrabold text-indigo-600">5.39% (BPS)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Value Proposition */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mb-3">
                    01
                  </div>
                  <h5 className="font-bold text-slate-900 mb-1">P2P SkillSwap (AI Assisted)</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Zero-cost bilateral knowledge barter. Trade video editing for web development, breaking expensive boot camp barriers.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold mb-3">
                    02
                  </div>
                  <h5 className="font-bold text-slate-900 mb-1">Reputation & Showcase</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Peer reviews and portfolio showcases build an immutable proof of work for skill-based hiring, bypassing pedigree bias.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
                    03
                  </div>
                  <h5 className="font-bold text-slate-900 mb-1">Tripartite Recruitment</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Three-way partnership bridge connecting educational institutions (SMA/SMK), SYNECTA talent pool, and hiring companies.
                  </p>
                </div>
              </div>

              {/* Fast Metrics Row */}
              <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Investment Hurdle / IRR</span>
                  <span className="text-2xl font-black text-emerald-400">41.1%</span>
                  <span className="text-[11px] text-slate-400"> vs 15% discount rate</span>
                </div>
                <div className="border-l border-slate-800 pl-4">
                  <span className="text-xs text-slate-400 block font-medium">Net Present Value (NPV)</span>
                  <span className="text-2xl font-black text-cyan-400">Rp7.636,6 Juta</span>
                  <span className="text-[11px] text-slate-400">Positive DCF outlook</span>
                </div>
                <div className="border-l border-slate-800 pl-4">
                  <span className="text-xs text-slate-400 block font-medium">Break-Even Point (BEP)</span>
                  <span className="text-2xl font-black text-amber-400">Tahun 2030</span>
                  <span className="text-[11px] text-slate-400">28.6% safety margin</span>
                </div>
                <div className="border-l border-slate-800 pl-4">
                  <span className="text-xs text-slate-400 block font-medium">Payback Period</span>
                  <span className="text-2xl font-black text-indigo-300">4.06 Tahun</span>
                  <span className="text-[11px] text-slate-400">From Year 0 (2026)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financials' && (
            <div className="space-y-5">
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-100 px-4 py-2.5 font-bold text-xs uppercase tracking-wider text-slate-700 flex justify-between">
                  <span>5-Year Projections (2027 – 2031) • Dalam Rp Juta</span>
                  <span>Sumber: Tim Santasi (2026)</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                      <tr>
                        <th className="p-3 font-semibold">Komponen</th>
                        <th className="p-3 font-semibold">2027</th>
                        <th className="p-3 font-semibold">2028</th>
                        <th className="p-3 font-semibold">2029</th>
                        <th className="p-3 font-semibold">2030 (BEP)</th>
                        <th className="p-3 font-semibold text-emerald-700">2031</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-3 font-medium text-slate-900">Monthly Active Users (MAU)</td>
                        <td className="p-3">20.000</td>
                        <td className="p-3">120.000</td>
                        <td className="p-3">300.000</td>
                        <td className="p-3 font-semibold text-indigo-600">700.000</td>
                        <td className="p-3 font-bold text-emerald-600">1.500.000</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-slate-900">Total Pendapatan</td>
                        <td className="p-3">Rp700,8</td>
                        <td className="p-3">Rp6.388,4</td>
                        <td className="p-3">Rp16.151,0</td>
                        <td className="p-3 font-semibold text-indigo-600">Rp36.792,4</td>
                        <td className="p-3 font-bold text-emerald-600">Rp77.135,2</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-slate-600">Total Biaya Operasional</td>
                        <td className="p-3">Rp4.423,2</td>
                        <td className="p-3">Rp9.970,2</td>
                        <td className="p-3">Rp16.186,0</td>
                        <td className="p-3">Rp30.342,0</td>
                        <td className="p-3">Rp50.193,0</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="p-3 font-bold text-slate-900">Laba (Rugi) Bersih</td>
                        <td className="p-3 text-red-600 font-semibold">(Rp3.722,4)</td>
                        <td className="p-3 text-red-600 font-semibold">(Rp3.581,8)</td>
                        <td className="p-3 text-amber-600 font-semibold">(Rp35,0)</td>
                        <td className="p-3 text-emerald-600 font-bold">+Rp6.450,4</td>
                        <td className="p-3 text-emerald-600 font-extrabold">+Rp21.272,0</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-slate-900">Saldo Kas Akhir</td>
                        <td className="p-3">Rp2.560,6</td>
                        <td className="p-3">Rp4.231,8</td>
                        <td className="p-3">Rp12.449,8</td>
                        <td className="p-3 font-semibold">Rp19.153,2</td>
                        <td className="p-3 font-bold text-emerald-600">Rp40.603,3</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Capital Allocation Pie / Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-indigo-600" />
                    Kebutuhan Investasi Awal (Tahun 0: Rp1.470 Juta)
                  </h5>
                  <ul className="text-xs space-y-1.5 text-slate-600">
                    <li className="flex justify-between">
                      <span>Pengembangan Aplikasi (App + AI Engine)</span>
                      <span className="font-bold text-slate-900">Rp750,0 Juta (51.0%)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Desain UI/UX & Brand Identity</span>
                      <span className="font-bold text-slate-900">Rp100,0 Juta (6.8%)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Perangkat Kerja & Hardware Lab</span>
                      <span className="font-bold text-slate-900">Rp300,0 Juta (20.4%)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sosialisasi Sekolah & Uji Beta</span>
                      <span className="font-bold text-slate-900">Rp200,0 Juta (13.6%)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Audit Keamanan, Privasi & PSE</span>
                      <span className="font-bold text-slate-900">Rp120,0 Juta (8.2%)</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Rencana Pendanaan Non-Hutang (Rp20.500 Juta)
                  </h5>
                  <p className="text-xs text-slate-500 mb-2">
                    Struktur modal murni ekuitas bertahap dan hibah agar kas awal bebas dari beban bunga:
                  </p>
                  <ul className="text-xs space-y-1.5 text-slate-600">
                    <li className="flex justify-between">
                      <span>Seed Fund / VC Tahap 0</span>
                      <span className="font-semibold text-slate-900">Rp5.000 Juta (24.4%)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Angel Investor & Hibah Inkubasi</span>
                      <span className="font-semibold text-slate-900">Rp2.250 Juta (11.0%)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Seed Tahap 2 (Setelah 100k MAU)</span>
                      <span className="font-semibold text-slate-900">Rp5.000 Juta (24.4%)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Series A (Setelah 500k MAU)</span>
                      <span className="font-bold text-indigo-600">Rp8.000 Juta (39.0%)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'strategy' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-base">
                Diversified Monetization Streams (Model 5 Pilar)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {BUSINESS_PLAN_INFO.revenueStreams.map((stream, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 text-sm">{stream.name}</span>
                      <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                        {stream.share2031}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{stream.detail}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mt-2">
                <h5 className="font-bold text-slate-900 mb-1 text-sm">7P Marketing Implementation Summary</h5>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600 mt-2">
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="font-bold text-indigo-600 block">Product</span>
                    AI SkillSwap, Showcase, Video Call, Recruiter Hub
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="font-bold text-indigo-600 block">Price</span>
                    Freemium (Rp29k), Boost (Rp25k), 10% Fee
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="font-bold text-indigo-600 block">Place</span>
                    Android, iOS, WebApp, School Hubs
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="font-bold text-indigo-600 block">Promotion</span>
                    3-Way School/Campus Mou, Competitions
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-slate-900 text-base">Struktur Tim Santasi (C-Level Founders)</h4>
                <p className="text-xs text-slate-500">
                  SMAN 3 Kota Sukabumi, Jawa Barat • Peserta Business Plan ALBACADABRA 2026
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {BUSINESS_PLAN_INFO.founders.map((founder, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white text-center flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl mb-3 shadow-inner">
                      {founder.name.split(' ')[0][0]}
                      {founder.name.split(' ')[1]?.[0] || ''}
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm">{founder.name}</h5>
                    <span className="text-xs font-semibold text-indigo-600 mb-2">{founder.role}</span>
                    <p className="text-xs text-slate-600 text-center leading-relaxed">
                      {founder.responsibility}
                    </p>
                    {founder.nisn && (
                      <span className="mt-3 text-[10px] text-slate-400 font-mono">
                        NISN: {founder.nisn}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center gap-3">
                <Award className="w-5 h-5 text-indigo-600 shrink-0" />
                <p className="text-xs text-indigo-950">
                  Proposal ini dilengkapi dengan surat pernyataan keaslian karya dari SMAN 3 Kota Sukabumi, tertanggal 12 Oktober 2026.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Business Model Evaluated for ALBACADABRA 2026 Jury Panel</span>
          </div>
          <button
            onClick={closePitchDeck}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
          >
            Back to Interactive Prototype
          </button>
        </div>
      </div>
    </div>
  );
};
