import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProjectRecruitment } from '../types';
import confetti from 'canvas-confetti';
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  Sparkles,
  ChevronRight,
  Filter,
  X,
  Send,
  Building,
  ShieldCheck,
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    applyToProject,
    viewProfile,
  } = useApp();

  const [filterType, setFilterType] = useState<string>('All');
  const [filterSkill, setFilterSkill] = useState<string>('All');
  
  // Application Modal
  const [applyingProject, setApplyingProject] = useState<ProjectRecruitment | null>(null);
  const [appRole, setAppRole] = useState('');
  const [appPitch, setAppPitch] = useState('');
  const [appPortfolio, setAppPortfolio] = useState('https://synecta.me/ershano_dev');
  const [appHours, setAppHours] = useState('10 Hours / Week');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Available skills from projects
  const allProjectSkills = ['All', 'UI/UX Design', 'React / TypeScript', 'Python', 'Audio Mastering', 'Mobile App'];
  const projectTypes = ['All', 'Startup', 'Creative Agency', 'Student Venture'];

  const filteredProjects = projects.filter((p) => {
    const matchesType = filterType === 'All' || p.orgType === filterType;
    const matchesSkill = filterSkill === 'All' || p.skillsRequired.includes(filterSkill);
    return matchesType && matchesSkill;
  });

  const handleOpenApply = (proj: ProjectRecruitment) => {
    setApplyingProject(proj);
    setAppRole(proj.skillsRequired[0] || 'Contributor');
  };

  const handleCompleteApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingProject) return;

    applyToProject(applyingProject.id, {
      role: appRole,
      pitch: appPitch,
      portfolio: appPortfolio,
      hours: appHours,
    });

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback
    }

    setApplyingProject(null);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/80">
            <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
            <span>SKILL-BASED HIRING & RECRUITMENT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Venture Projects & Team Recruitment
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Collaborate with early-stage Indonesian startups and student innovators. Join multidisciplinary teams, gain verified project credentials, and build working products.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200/60 shrink-0">
          <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
          <div className="text-xs text-emerald-950">
            <span className="font-bold block">3-Way School/Enterprise Partnership</span>
            Verified portfolios qualify for direct internship interviews.
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-500 uppercase text-[11px] mr-1">Organization:</span>
          {projectTypes.map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                filterType === t
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-500 uppercase text-[11px]">Skill Focus:</span>
          <select
            value={filterSkill}
            onChange={(e) => setFilterSkill(e.target.value)}
            className="bg-slate-100 text-slate-800 px-3 py-1.5 rounded-xl border border-transparent font-semibold outline-none"
          >
            {allProjectSkills.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Project Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => {
          return (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:shadow-lg hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Org header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={proj.orgLogo}
                      alt={proj.organization}
                      className="w-11 h-11 rounded-xl object-cover ring-2 ring-emerald-500/20"
                    />
                    <div>
                      <span className="font-bold text-xs text-slate-900 block leading-tight">
                        {proj.organization}
                      </span>
                      <span className="text-[11px] text-slate-500 leading-tight">
                        {proj.location}
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {proj.orgType}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 mb-1.5">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {/* Details Pills */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{proj.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="truncate">{proj.stipend}</span>
                  </div>
                </div>

                {/* Skills Required */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Competencies Needed
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {proj.skillsRequired.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] bg-indigo-50 text-indigo-700 font-semibold"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Team Members */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <div className="flex -space-x-2">
                      {proj.teamMembers.map((m, i) => (
                        <img
                          key={i}
                          src={m.avatar}
                          alt={m.name}
                          className="w-6 h-6 rounded-full border-2 border-white object-cover"
                          title={`${m.name} (${m.role})`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {proj.teamMembers.length} on team
                    </span>
                  </div>

                  <span className="text-xs font-bold text-emerald-600">
                    {proj.spotsAvailable} spot(s) remaining
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex gap-2">
                {proj.hasApplied ? (
                  <div className="w-full py-2.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center gap-1.5 border border-emerald-200">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Application Submitted</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleOpenApply(proj)}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <span>Apply to Join</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recruiter / Application Modal */}
      {applyingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{applyingProject.title}</h3>
                <span className="text-xs text-slate-500">Recruiter: {applyingProject.recruiter.name} ({applyingProject.recruiter.role})</span>
              </div>
              <button
                onClick={() => setApplyingProject(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Recruiter Note */}
            <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900 flex items-center gap-3">
              <img
                src={applyingProject.recruiter.avatar}
                alt={applyingProject.recruiter.name}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div>
                <span className="font-bold block">Recruiter Note:</span>
                <span className="text-slate-600">"{applyingProject.recruiter.contactNote}"</span>
              </div>
            </div>

            <form onSubmit={handleCompleteApplication} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Applying Role *</label>
                <input
                  type="text"
                  required
                  value={appRole}
                  onChange={(e) => setAppRole(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 outline-none text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Why are you excited to contribute? *</label>
                <textarea
                  required
                  rows={3}
                  value={appPitch}
                  onChange={(e) => setAppPitch(e.target.value)}
                  placeholder="Describe your relevant skills, past projects, or portfolio links..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 outline-none text-xs resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Portfolio Link</label>
                  <input
                    type="text"
                    value={appPortfolio}
                    onChange={(e) => setAppPortfolio(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Time Commitment</label>
                  <input
                    type="text"
                    value={appHours}
                    onChange={(e) => setAppHours(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 outline-none text-xs"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setApplyingProject(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors shadow-sm"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Celebration Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Application Recorded!</h3>
              <p className="text-xs text-slate-600 mt-1">
                Your credentials and verified SYNECTA portfolio link were forwarded to the project team. You will be notified when they schedule an introductory SkillSwap!
              </p>
            </div>
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
            >
              Back to Listings
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
