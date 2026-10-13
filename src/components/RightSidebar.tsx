import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  TrendingUp,
  Users,
  Repeat,
  Check,
  Plus,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const RightSidebar: React.FC = () => {
  const {
    users,
    currentUser,
    viewProfile,
    toggleConnectUser,
    connectedUserIds,
    communities,
    toggleJoinCommunity,
    setCurrentPage,
    startVideoCall,
  } = useApp();

  const recommendedUsers = users
    .filter((u) => u.id !== currentUser.id)
    .slice(0, 3);

  const trendingSkills = [
    { name: 'UI/UX Motion', tag: 'Design', swappers: 124 },
    { name: 'React & Vite', tag: 'Coding', swappers: 198 },
    { name: 'DaVinci Grading', tag: 'Video', swappers: 86 },
    { name: '3D Blender', tag: '3D Art', swappers: 94 },
    { name: 'AI Prompting', tag: 'AI/ML', swappers: 142 },
    { name: 'Pitch Modeling', tag: 'Business', swappers: 67 },
  ];

  return (
    <aside className="hidden xl:block w-80 shrink-0 p-5 space-y-6 select-none border-l border-slate-200/80 bg-slate-50/50">
      
      {/* Recommended Talent Box */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
              Recommended Talent
            </h3>
          </div>
          <button
            onClick={() => setCurrentPage('skillswap')}
            className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
          >
            See All
          </button>
        </div>

        <div className="space-y-3">
          {recommendedUsers.map((user) => {
            const isConnected = connectedUserIds.includes(user.id);
            return (
              <div
                key={user.id}
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-100 flex flex-col gap-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20 cursor-pointer"
                    onClick={() => viewProfile(user.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <button
                      onClick={() => viewProfile(user.id)}
                      className="font-bold text-xs text-slate-900 truncate hover:text-indigo-600 text-left block"
                    >
                      {user.name}
                    </button>
                    <span className="text-[11px] text-slate-500 truncate block">
                      {user.role}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 flex items-center justify-between pt-1 border-t border-slate-200/60">
                  <span className="truncate">
                    Teaches: <strong className="text-slate-800">{user.skillsOffered[0]}</strong>
                  </span>
                  <span className="text-amber-600 font-bold ml-1 shrink-0">
                    ★ {user.rating}
                  </span>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => toggleConnectUser(user.id)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                      isConnected
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/60'
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        Connected
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" />
                        Connect
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => startVideoCall(user)}
                    className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-1 transition-colors shadow-2xs"
                    title="Simulate SkillSwap Call"
                  >
                    <Repeat className="w-3 h-3" />
                    Swap
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trending Skills Box */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-cyan-600" />
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
            Trending Skills in Demand
          </h3>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {trendingSkills.map((sk, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage('skillswap')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-medium transition-colors flex items-center gap-1 border border-transparent hover:border-indigo-200"
            >
              <span>{sk.name}</span>
              <span className="text-[10px] text-slate-400">({sk.swappers})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Communities */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
              Suggested Communities
            </h3>
          </div>
          <button
            onClick={() => setCurrentPage('community')}
            className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Explore
          </button>
        </div>

        <div className="space-y-3">
          {communities.slice(0, 2).map((comm) => (
            <div key={comm.id} className="flex items-start justify-between gap-3 text-xs">
              <div className="min-w-0 flex-1">
                <span className="font-bold text-slate-900 block truncate">
                  {comm.name}
                </span>
                <span className="text-[11px] text-slate-500">
                  {comm.memberCount} members
                </span>
              </div>
              <button
                onClick={() => toggleJoinCommunity(comm.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                  comm.isJoined
                    ? 'bg-slate-100 text-slate-600'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs'
                }`}
              >
                {comm.isJoined ? 'Joined' : 'Join'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Demographic Bonus Impact Badge */}
      <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white text-xs space-y-1.5 shadow-sm">
        <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>INDONESIA 2026 DEMOGRAPHIC BONUS</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-snug">
          Empowering 154M workforce with peer-to-peer talent development and verified skill badges.
        </p>
      </div>

    </aside>
  );
};
