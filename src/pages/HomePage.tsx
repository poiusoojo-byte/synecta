import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Sparkles,
  Repeat,
  Heart,
  MessageSquare,
  Share2,
  ExternalLink,
  Plus,
  Check,
  Star,
  Users,
  Briefcase,
  ArrowRight,
  Filter,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    currentUser,
    users,
    showcaseItems,
    toggleLikeShowcase,
    projects,
    communities,
    viewProfile,
    viewCommunity,
    setSelectedProjectId,
    setCurrentPage,
    toggleConnectUser,
    connectedUserIds,
    searchQuery,
    setSearchQuery,
    startVideoCall,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'people' | 'projects' | 'communities'>('all');

  // Filter content based on searchQuery and activeFilter
  const query = searchQuery.toLowerCase().trim();

  const filteredUsers = users.filter((u) => {
    if (u.id === currentUser.id) return false;
    if (!query) return true;
    return (
      u.name.toLowerCase().includes(query) ||
      u.role.toLowerCase().includes(query) ||
      u.skillsOffered.some((s) => s.toLowerCase().includes(query)) ||
      u.skillsWanted.some((s) => s.toLowerCase().includes(query)) ||
      u.location.toLowerCase().includes(query)
    );
  });

  const filteredShowcase = showcaseItems.filter((item) => {
    if (!query) return true;
    return (
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.tags.some((t) => t.toLowerCase().includes(query)) ||
      item.creator.name.toLowerCase().includes(query)
    );
  });

  const filteredProjects = projects.filter((p) => {
    if (!query) return true;
    return (
      p.title.toLowerCase().includes(query) ||
      p.organization.toLowerCase().includes(query) ||
      p.skillsRequired.some((s) => s.toLowerCase().includes(query)) ||
      p.projectType.toLowerCase().includes(query)
    );
  });

  const filteredCommunities = communities.filter((c) => {
    if (!query) return true;
    return (
      c.name.toLowerCase().includes(query) ||
      c.topic.toLowerCase().includes(query) ||
      c.trendingTopics.some((t) => t.toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Personalized Greeting Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-indigo-500/20 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">👋</span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Welcome back, {currentUser.name.split(' ')[0]}!
              </h2>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Discover active creators ready to exchange skills today. Explore 24 new skill offers and 3 open student recruitment projects in West Java.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentPage('skillswap')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md hover:scale-102"
            >
              <Repeat className="w-4 h-4" />
              <span>Launch SkillSwap</span>
            </button>
            <button
              onClick={() => setCurrentPage('showcase')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/15 transition-all"
            >
              <span>Explore Showcase</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeFilter === 'all'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Discoveries
          </button>
          <button
            onClick={() => setActiveFilter('people')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeFilter === 'people'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Creators & Mentors ({filteredUsers.length})
          </button>
          <button
            onClick={() => setActiveFilter('projects')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeFilter === 'projects'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Projects ({filteredProjects.length})
          </button>
          <button
            onClick={() => setActiveFilter('communities')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeFilter === 'communities'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Communities ({filteredCommunities.length})
          </button>
        </div>

        {searchQuery && (
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span>Filtering for: <strong className="text-slate-800">"{searchQuery}"</strong></span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-indigo-600 underline text-xs font-medium"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Featured Talent Horizontal Rail */}
      {(activeFilter === 'all' || activeFilter === 'people') && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-sm sm:text-base text-slate-900">
                Verified Creators & Skill Swappers
              </h3>
            </div>
            <button
              onClick={() => setCurrentPage('skillswap')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>Smart Match</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.slice(0, 3).map((user) => {
              const isConnected = connectedUserIds.includes(user.id);
              return (
                <div
                  key={user.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500/20 cursor-pointer"
                          onClick={() => viewProfile(user.id)}
                        />
                        <div>
                          <button
                            onClick={() => viewProfile(user.id)}
                            className="font-bold text-sm text-slate-900 hover:text-indigo-600 text-left block"
                          >
                            {user.name}
                          </button>
                          <span className="text-xs text-slate-500 block truncate">
                            {user.role}
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                        ★ {user.rating}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                      {user.bio}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                          Teaches
                        </span>
                        <span className="font-semibold text-slate-800 truncate">
                          {user.skillsOffered[0]}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                          Wants
                        </span>
                        <span className="font-semibold text-slate-800 truncate">
                          {user.skillsWanted[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => toggleConnectUser(user.id)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                        isConnected
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                      }`}
                    >
                      {isConnected ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Connected</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Connect</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => startVideoCall(user)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs flex items-center gap-1 transition-colors"
                    >
                      <Repeat className="w-3.5 h-3.5" />
                      <span>Swap</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Main Discover Showcase Feed */}
      {(activeFilter === 'all' || activeFilter === 'people') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm sm:text-base text-slate-900">
              Recent Showcase Works & Case Studies
            </h3>
            <button
              onClick={() => setCurrentPage('showcase')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              View Full Gallery
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredShowcase.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image Card */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100 group">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
                      {item.category}
                    </span>
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-lg text-xs font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow">
                      ★ {item.rating}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5">
                    {/* Creator Row */}
                    <div className="flex items-center justify-between gap-3 mb-2.5">
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => viewProfile(item.creator.id)}
                      >
                        <img
                          src={item.creator.avatar}
                          alt={item.creator.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-xs font-bold text-slate-800 hover:text-indigo-600">
                          {item.creator.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{item.createdAt}</span>
                    </div>

                    <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Interaction Footer */}
                <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/50">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleLikeShowcase(item.id)}
                      className={`flex items-center gap-1.5 transition-colors ${
                        item.hasLiked ? 'text-rose-600 font-bold' : 'hover:text-slate-800'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          item.hasLiked ? 'fill-rose-600 text-rose-600' : ''
                        }`}
                      />
                      <span>{item.likes}</span>
                    </button>
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4" />
                      <span>{item.commentsCount}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setCurrentPage('showcase')}
                    className="font-bold text-indigo-600 hover:text-indigo-800 text-xs flex items-center gap-1"
                  >
                    <span>View Work</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Projects Rail */}
      {(activeFilter === 'all' || activeFilter === 'projects') && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm sm:text-base text-slate-900">
                Active Project Recruitment Calls
              </h3>
            </div>
            <button
              onClick={() => setCurrentPage('projects')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-800"
            >
              Browse All Projects
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {proj.orgType}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {proj.duration}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 mb-1">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-slate-500 mb-3">{proj.organization}</p>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {proj.skillsRequired.slice(0, 3).map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-medium"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600">
                    {proj.spotsAvailable} spot(s) open
                  </span>
                  <button
                    onClick={() => {
                      setSelectedProjectId(proj.id);
                      setCurrentPage('projects');
                    }}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-indigo-600 text-white transition-colors"
                  >
                    View & Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Communities Rail */}
      {(activeFilter === 'all' || activeFilter === 'communities') && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-sm sm:text-base text-slate-900">
                Top Collaborative Communities
              </h3>
            </div>
            <button
              onClick={() => setCurrentPage('community')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Join Communities
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {filteredCommunities.map((comm) => (
              <div
                key={comm.id}
                onClick={() => viewCommunity(comm.id)}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md cursor-pointer transition-all space-y-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={comm.avatar}
                    alt={comm.name}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/20"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-xs text-slate-900 truncate">
                      {comm.name}
                    </h4>
                    <span className="text-[11px] text-slate-500">
                      {comm.memberCount} active members
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {comm.description}
                </p>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                  <span className="text-indigo-600 font-bold">Open Chat Lounge</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
