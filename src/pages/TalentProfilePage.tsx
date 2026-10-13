import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Star,
  Award,
  CheckCircle,
  Briefcase,
  Repeat,
  MessageSquare,
  Plus,
  Check,
  Video,
  Send,
  X,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

export const TalentProfilePage: React.FC = () => {
  const {
    selectedProfileId,
    users,
    currentUser,
    reviews,
    connectedUserIds,
    toggleConnectUser,
    startVideoCall,
    projects,
    addToast,
    setCurrentPage,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'portfolio' | 'reviews' | 'experience'>('portfolio');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedProjectIdToInvite, setSelectedProjectIdToInvite] = useState(projects[0]?.id || '');
  const [isMessageDrawerOpen, setIsMessageDrawerOpen] = useState(false);
  const [directMessageText, setDirectMessageText] = useState('');
  const [sentMessages, setSentMessages] = useState<string[]>([]);

  // Find user
  const user = users.find((u) => u.id === selectedProfileId) || users[1];
  const isConnected = connectedUserIds.includes(user.id);
  const isSelf = user.id === currentUser.id;

  // Filter user's received reviews
  const userReviews = reviews.filter((r) => r.toUserId === user.id);

  const handleSendDirectMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directMessageText.trim()) return;
    setSentMessages((prev) => [...prev, directMessageText.trim()]);
    addToast('success', 'Message Sent', `Direct message delivered to ${user.name}.`);
    setDirectMessageText('');
  };

  const handleInviteToProject = () => {
    const proj = projects.find((p) => p.id === selectedProjectIdToInvite);
    setIsInviteModalOpen(false);
    addToast(
      'success',
      'Invitation Dispatched!',
      `Invited ${user.name} to join "${proj?.title || 'Project'}" as a collaborator.`
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Profile Cover & Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
        {/* Cover Photo */}
        <div className="h-44 sm:h-56 w-full relative bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950">
          {user.coverImage && (
            <img
              src={user.coverImage}
              alt="Cover"
              className="w-full h-full object-cover opacity-65"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Profile Info Row */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-5">
            {/* Avatar & Verification Badge */}
            <div className="flex items-end gap-4">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-white shadow-xl bg-white"
                />
                {user.isVerified && (
                  <span
                    className="absolute -bottom-1 -right-1 p-1 bg-indigo-600 text-white rounded-full ring-2 ring-white shadow"
                    title="Verified Creator & Skill Swapper"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </span>
                )}
              </div>

              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {user.name}
                  </h1>
                  <span className="text-xs text-slate-400 font-medium">@{user.username}</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-indigo-700">
                  {user.headline}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {user.location}
                  </span>
                  <span>•</span>
                  <span>{user.schoolOrOrg}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {!isSelf && (
              <div className="flex flex-wrap items-center gap-2 sm:mb-2">
                <button
                  onClick={() => startVideoCall(user)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm shadow-indigo-600/30 transition-all hover:scale-102"
                >
                  <Video className="w-4 h-4" />
                  <span>Start SkillSwap</span>
                </button>

                <button
                  onClick={() => setIsMessageDrawerOpen(!isMessageDrawerOpen)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-slate-600" />
                  <span>Message</span>
                </button>

                <button
                  onClick={() => setIsInviteModalOpen(true)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Briefcase className="w-4 h-4 text-slate-600" />
                  <span>Invite to Project</span>
                </button>

                <button
                  onClick={() => toggleConnectUser(user.id)}
                  className={`p-2.5 rounded-xl transition-colors ${
                    isConnected
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                  }`}
                  title={isConnected ? 'Connected' : 'Connect with talent'}
                >
                  {isConnected ? <Check className="w-4 h-4 text-emerald-600" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>

          {/* Bio text */}
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            {user.bio}
          </p>

          {/* Badges & Trust Stats Row */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {user.badges.map((badge, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80 flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-indigo-600" />
                  {badge}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-5 text-xs">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-extrabold text-slate-900 text-sm">{user.rating}</span>
                <span className="text-slate-500">({user.reviewCount} reviews)</span>
              </div>
              <div className="text-slate-400">•</div>
              <div className="flex items-center gap-1">
                <Repeat className="w-3.5 h-3.5 text-indigo-600" />
                <span className="font-bold text-slate-900">{user.sessionsCompleted}</span>
                <span className="text-slate-500">sessions completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bidirectional Skills Exchange Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Skills Offered (Can Teach) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Skills Offered (Can Teach)
            </h3>
            <span className="text-[11px] text-slate-400">Available for barter</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.skillsOffered.map((sk, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs"
              >
                {sk}
              </span>
            ))}
          </div>
        </div>

        {/* Skills Wanted (Eager to Learn) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              Skills Wanted (Wants to Learn)
            </h3>
            <span className="text-[11px] text-slate-400">Looking for mentors</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.skillsWanted.map((sk, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200/80 shadow-2xs"
              >
                {sk}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs: Portfolio, Reviews, Experience */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="flex border-b border-slate-100 bg-slate-50/60 px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'portfolio'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Showcase Portfolio ({user.portfolioItems?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'reviews'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Verified Reviews ({userReviews.length})
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'experience'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Experience & Ventures
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'portfolio' && (
            <div className="space-y-4">
              {user.portfolioItems && user.portfolioItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.portfolioItems.map((pf) => (
                    <div
                      key={pf.id}
                      className="rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group"
                    >
                      <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
                        <img
                          src={pf.image}
                          alt={pf.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-900/80 text-white">
                          {pf.category}
                        </span>
                      </div>
                      <div className="p-3.5 flex items-center justify-between">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {pf.title}
                        </h4>
                        <span className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                          ♥ {pf.likes}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">
                  No public portfolio items uploaded yet.
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {userReviews.length > 0 ? (
                userReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.fromUser.avatar}
                          alt={rev.fromUser.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <span className="font-bold text-xs text-slate-900 block">
                            {rev.fromUser.name}
                          </span>
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      "{rev.comment}"
                    </p>

                    {rev.skillsExchanged && (
                      <div className="text-[11px] text-indigo-700 bg-indigo-50/80 px-2.5 py-1 rounded-lg w-fit font-medium">
                        {rev.skillsExchanged}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">
                  No reviews recorded yet for this talent profile.
                </div>
              )}
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-4">
              {user.experience && user.experience.length > 0 ? (
                user.experience.map((exp, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{exp.role}</h4>
                      <div className="text-xs font-semibold text-indigo-600">{exp.org}</div>
                      <span className="text-[11px] text-slate-400 block mb-1.5">{exp.period}</span>
                      <p className="text-xs text-slate-600 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">
                  No verified venture experience listed yet.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Direct Message Drawer */}
      {isMessageDrawerOpen && (
        <div className="fixed bottom-0 right-4 sm:right-8 z-40 w-full max-w-sm bg-white rounded-t-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom duration-200">
          <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between text-xs">
            <span className="font-bold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              Direct Message: {user.name}
            </span>
            <button
              onClick={() => setIsMessageDrawerOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 max-h-56 overflow-y-auto space-y-2 text-xs bg-slate-50">
            <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-900 text-[11px]">
              👋 Tip: Propose a concrete skill exchange and suggest a convenient time window.
            </div>
            {sentMessages.map((msg, i) => (
              <div key={i} className="flex justify-end">
                <div className="bg-indigo-600 text-white p-2.5 rounded-xl rounded-tr-none text-xs max-w-[85%]">
                  {msg}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendDirectMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={directMessageText}
              onChange={(e) => setDirectMessageText(e.target.value)}
              placeholder="Write a message..."
              className="flex-1 bg-slate-100 text-xs px-3 py-2 rounded-xl border border-transparent focus:border-indigo-500 focus:bg-white outline-none"
            />
            <button
              type="submit"
              className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Invite to Project Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Invite {user.name} to Project</h3>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Select which active venture or startup project listing you would like to invite this creator to collaborate on:
            </p>

            <div className="space-y-2">
              {projects.map((proj) => (
                <label
                  key={proj.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedProjectIdToInvite === proj.id
                      ? 'border-indigo-600 bg-indigo-50/50'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="project_invite"
                    checked={selectedProjectIdToInvite === proj.id}
                    onChange={() => setSelectedProjectIdToInvite(proj.id)}
                    className="mt-1 text-indigo-600"
                  />
                  <div className="min-w-0 flex-1 text-xs">
                    <span className="font-bold text-slate-900 block truncate">{proj.title}</span>
                    <span className="text-[11px] text-slate-500">{proj.organization}</span>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInviteToProject}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-sm"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
