import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserProfile, SkillSwapMatch } from '../types';
import {
  Repeat,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  Video,
  UserCheck,
  Plus,
  Check,
  ChevronRight,
  SlidersHorizontal,
  Compass,
  Star,
  Zap,
  Info,
  RefreshCw,
} from 'lucide-react';

export const SkillSwapPage: React.FC = () => {
  const {
    users,
    currentUser,
    viewProfile,
    toggleConnectUser,
    connectedUserIds,
    startVideoCall,
    addToast,
  } = useApp();

  // Search Filters
  const [skillToLearn, setSkillToLearn] = useState('UI/UX Design');
  const [skillToTeach, setSkillToTeach] = useState('React / TypeScript');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [proficiencyLevel, setProficiencyLevel] = useState('Intermediate');

  // Matching Engine State
  const [isMatching, setIsMatching] = useState(false);
  const [matchProgress, setMatchProgress] = useState(0);
  const [matchingStage, setMatchingStage] = useState('');
  const [hasSearched, setHasSearched] = useState(true);

  const availableLearnSkills = [
    'UI/UX Design',
    'Motion Graphics',
    '3D Blender Modeling',
    'Python & AI Systems',
    'DaVinci Color Grading',
    'Business & Pitch Deck',
    'React / TypeScript',
    'Mobile App (Flutter)',
  ];

  const availableTeachSkills = [
    'React / TypeScript',
    'Python',
    'Video Editing',
    'UI/UX Design',
    '3D Blender Modeling',
    'Financial Modeling',
    'Graphic Design',
    'Audio Mastering',
  ];

  const locations = ['All', 'Remote', 'Bandung', 'Jakarta', 'Sukabumi', 'Yogyakarta', 'Surabaya'];
  const proficiencies = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

  // Presets for quick competition demo
  const presetDemos = [
    { learn: 'UI/UX Design', teach: 'React / TypeScript', label: 'Design ↔ Code' },
    { learn: 'Motion Graphics', teach: 'Video Editing', label: 'Motion ↔ Video' },
    { learn: '3D Blender Modeling', teach: 'React / TypeScript', label: '3D ↔ WebGL' },
    { learn: 'Python & AI Systems', teach: 'UI/UX Design', label: 'AI ↔ UI/UX' },
  ];

  const handleApplyPreset = (learn: string, teach: string) => {
    setSkillToLearn(learn);
    setSkillToTeach(teach);
    triggerMatchSimulation(learn, teach);
  };

  const triggerMatchSimulation = (learn = skillToLearn, teach = skillToTeach) => {
    setIsMatching(true);
    setMatchProgress(10);
    setMatchingStage('Vectorizing skill requirements & reciprocity matrix...');

    const step1 = setTimeout(() => {
      setMatchProgress(45);
      setMatchingStage('Cross-referencing verified peer review histories...');
    }, 400);

    const step2 = setTimeout(() => {
      setMatchProgress(80);
      setMatchingStage('Calibrating complementary time zones & synergy indexes...');
    }, 900);

    const step3 = setTimeout(() => {
      setMatchProgress(100);
      setMatchingStage('Match synthesized successfully!');
      setIsMatching(false);
      setHasSearched(true);
      addToast(
        'success',
        'AI Match Ready!',
        `Generated 3 high-affinity mutual exchange recommendations for ${learn}.`
      );
    }, 1400);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
    };
  };

  // Generate dynamic matches based on users
  const candidates = users.filter((u) => u.id !== currentUser.id);

  const mockMatches: SkillSwapMatch[] = candidates.map((candidate, idx) => {
    const synergy = idx === 0 ? 98 : idx === 1 ? 94 : idx === 2 ? 89 : 82;
    return {
      id: `match-${candidate.id}`,
      user: candidate,
      matchPercentage: synergy,
      skillTeach: candidate.skillsOffered[0] || skillToLearn,
      skillLearn: candidate.skillsWanted[0] || skillToTeach,
      proficiencyLevel: (candidate.rating > 4.9 ? 'Advanced' : 'Intermediate') as any,
      location: candidate.location,
      availability: idx === 0 ? 'Available Tonight • 7:00 PM' : 'Flexible Weekend Schedule',
      compatibilityDetails: {
        skillSynergy: synergy,
        scheduleAlignment: 96 - idx * 4,
        reputationScore: Math.round(candidate.rating * 20),
      },
    };
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Hero Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-6 sm:p-10 border border-indigo-500/20 shadow-xl relative overflow-hidden">
        {/* Animated background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>AI MATCHING ENGINE V1.0 • HERO FEATURE</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Find your perfect skill exchange.
          </h1>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
            Specify what you wish to learn and what you can teach. Our bilateral reciprocity algorithm matches you with verified creators for zero-cost, high-impact peer mentoring.
          </p>

          {/* Quick Preset Buttons for Judges */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Quick Demo Scenarios:</span>
            {presetDemos.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(preset.learn, preset.teach)}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-indigo-200 border border-white/10 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Control Console */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900">
              Exchange Filter Matrix
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Bidirectional Matching Parameters
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Skill to Learn */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              Skill You Want to Learn
            </label>
            <select
              value={skillToLearn}
              onChange={(e) => setSkillToLearn(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 p-2.5 focus:border-indigo-500 focus:bg-white outline-none transition-all"
            >
              {availableLearnSkills.map((sk) => (
                <option key={sk} value={sk}>
                  {sk}
                </option>
              ))}
            </select>
            <span className="text-[11px] text-slate-400 block">Target competency</span>
          </div>

          {/* Skill to Teach */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              Skill You Can Teach
            </label>
            <select
              value={skillToTeach}
              onChange={(e) => setSkillToTeach(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 p-2.5 focus:border-indigo-500 focus:bg-white outline-none transition-all"
            >
              {availableTeachSkills.map((sk) => (
                <option key={sk} value={sk}>
                  {sk}
                </option>
              ))}
            </select>
            <span className="text-[11px] text-slate-400 block">Your offered knowledge</span>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              Location Preference
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 p-2.5 focus:border-indigo-500 focus:bg-white outline-none transition-all"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === 'All' ? 'Any Location (Remote + ID)' : loc}
                </option>
              ))}
            </select>
            <span className="text-[11px] text-slate-400 block">Proximity or online</span>
          </div>

          {/* Proficiency */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-500" />
              Proficiency Level
            </label>
            <select
              value={proficiencyLevel}
              onChange={(e) => setProficiencyLevel(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 p-2.5 focus:border-indigo-500 focus:bg-white outline-none transition-all"
            >
              {proficiencies.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
            <span className="text-[11px] text-slate-400 block">Desired mastery depth</span>
          </div>
        </div>

        {/* Find My Match Trigger Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Matching logic computes mutual synergy, scheduling, and peer validation.</span>
          </div>

          <button
            onClick={() => triggerMatchSimulation()}
            disabled={isMatching}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-extrabold text-sm shadow-md shadow-indigo-600/30 hover:scale-102 transition-all flex items-center justify-center gap-2.5 disabled:opacity-75"
          >
            {isMatching ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Synthesizing Matches...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Find My Match</span>
              </>
            )}
          </button>
        </div>

        {/* Live Matching Radar Animation Container */}
        {isMatching && (
          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-cyan-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                {matchingStage}
              </span>
              <span className="font-bold text-white font-mono">{matchProgress}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 h-full transition-all duration-300"
                style={{ width: `${matchProgress}%` }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-400 pt-1">
              <span>✓ Skill Reciprocity Index Verified</span>
              <span>✓ Availability Overlap Identified</span>
              <span>✓ Quality Trust Score Authenticated</span>
            </div>
          </div>
        )}
      </div>

      {/* Match Results Showcase */}
      {hasSearched && (
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg sm:text-xl text-slate-900">
                  Recommended SkillSwap Partners
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  3 Ideal Matches Found
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Calculated for: Learning <strong className="text-slate-800">{skillToLearn}</strong> • Teaching <strong className="text-slate-800">{skillToTeach}</strong>
              </p>
            </div>

            {/* Illustrative AI Disclaimer required by prompt */}
            <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Simulated prototype matching for competition demonstration.</span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {mockMatches.slice(0, 3).map((match, idx) => {
              const user = match.user;
              const isConnected = connectedUserIds.includes(user.id);
              const isTopPick = idx === 0;

              return (
                <div
                  key={match.id}
                  className={`bg-white rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden shadow-2xs hover:shadow-lg ${
                    isTopPick
                      ? 'border-indigo-400 ring-2 ring-indigo-500/10'
                      : 'border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  {/* Top Match Ribbon */}
                  {isTopPick && (
                    <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-[11px] font-bold px-4 py-1 text-center flex items-center justify-center gap-1.5 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>BEST MUTUAL AFFINITY MATCH ({match.matchPercentage}%)</span>
                    </div>
                  )}

                  <div className="p-5 sm:p-6 space-y-4">
                    {/* Header info */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/20 cursor-pointer"
                            onClick={() => viewProfile(user.id)}
                          />
                          {user.isOnline && (
                            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                          )}
                        </div>
                        <div>
                          <button
                            onClick={() => viewProfile(user.id)}
                            className="font-bold text-base text-slate-900 hover:text-indigo-600 text-left block"
                          >
                            {user.name}
                          </button>
                          <span className="text-xs text-slate-500 block">
                            {user.role}
                          </span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            {user.location}
                          </span>
                        </div>
                      </div>

                      {/* Percentage Ring / Pill */}
                      <div className="text-right">
                        <div className="inline-flex flex-col items-end">
                          <span className="text-lg font-black text-indigo-600">
                            {match.matchPercentage}%
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                            Match Score
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {user.bio}
                    </p>

                    {/* Complementary Skills Exchange Card */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                      <div className="flex items-start gap-2 text-xs">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-100 text-cyan-800 shrink-0 mt-0.5">
                          TEACHES
                        </span>
                        <div className="min-w-0">
                          <span className="font-bold text-slate-900 block truncate">
                            {user.skillsOffered[0]}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            Level: {match.proficiencyLevel}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-slate-200/60 pt-2 flex items-start gap-2 text-xs">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 shrink-0 mt-0.5">
                          WANTS
                        </span>
                        <div className="min-w-0">
                          <span className="font-bold text-slate-900 block truncate">
                            {user.skillsWanted[0]}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            Eager to practice with you
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Trust & Availability Indicators */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1 text-amber-600 font-bold">
                        ★ {user.rating} ({user.reviewCount} sessions)
                      </span>
                      <span className="flex items-center gap-1 text-slate-600 text-[11px]">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {match.availability}
                      </span>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex flex-col gap-2">
                    {/* Primary Hero: Start Session simulated video call */}
                    <button
                      onClick={() => startVideoCall(user)}
                      className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm shadow-indigo-600/20 hover:scale-101"
                    >
                      <Video className="w-4 h-4 text-cyan-300" />
                      <span>Start Session (Live Call)</span>
                    </button>

                    <div className="flex gap-2">
                      <button
                        onClick={() => viewProfile(user.id)}
                        className="flex-1 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
                      >
                        View Profile
                      </button>

                      <button
                        onClick={() => toggleConnectUser(user.id)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors ${
                          isConnected
                            ? 'bg-slate-200 text-slate-700'
                            : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                        }`}
                      >
                        {isConnected ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Connected</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            <span>Connect</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* How SkillSwap Works Explainer Box */}
      <div className="p-6 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-4 text-xs sm:text-sm text-slate-700">
        <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          The SYNECTA Safe Barter Protocol
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-3.5 rounded-xl border border-indigo-100">
            <span className="font-bold text-indigo-700 block mb-1">1. AI Match Validation</span>
            Vectors evaluate mutual skill complement, reducing mismatch dropouts by 84%.
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-indigo-100">
            <span className="font-bold text-indigo-700 block mb-1">2. In-App Video & Notes</span>
            Integrated live whiteboard, screen sharing, and milestone notes without leaving the platform.
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-indigo-100">
            <span className="font-bold text-indigo-700 block mb-1">3. Reputation Validation</span>
            Post-session 5-star peer reviews feed directly into the candidate’s recruitment badge.
          </div>
        </div>
      </div>

    </div>
  );
};
