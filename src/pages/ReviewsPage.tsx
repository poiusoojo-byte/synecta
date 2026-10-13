import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ReviewItem } from '../types';
import {
  Star,
  Award,
  Plus,
  X,
  MessageSquare,
  ShieldCheck,
  CheckCircle,
  Filter,
  Sparkles,
  Info,
} from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const { reviews, addReview, users, currentUser } = useApp();

  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [isWriteReviewModalOpen, setIsWriteReviewModalOpen] = useState(false);

  // Form State
  const [targetUserId, setTargetUserId] = useState(users[1]?.id || '');
  const [formRating, setFormRating] = useState(5);
  const [formContext, setFormContext] = useState<ReviewItem['context']>('SkillSwap Session');
  const [formSkillsExchanged, setFormSkillsExchanged] = useState('Exchanged: Video Editing ↔ UI/UX Wireframing');
  const [formComment, setFormComment] = useState('');
  const [skillExpertise, setSkillExpertise] = useState(5);
  const [communication, setCommunication] = useState(5);
  const [reliability, setReliability] = useState(5);

  const filteredReviews = reviews.filter((r) => {
    if (filterRating === 'all') return true;
    return r.rating === filterRating;
  });

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formComment.trim()) return;

    const targetUser = users.find((u) => u.id === targetUserId);
    addReview({
      toUserId: targetUserId,
      toUserName: targetUser?.name || 'Talent',
      rating: formRating,
      context: formContext,
      skillsExchanged: formSkillsExchanged,
      comment: formComment.trim(),
      criteriaRatings: {
        skillExpertise,
        communication,
        reliability,
      },
    });

    setIsWriteReviewModalOpen(false);
    setFormComment('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200/80">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>VERIFIED REPUTATION PROTOCOL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Ratings & Peer Feedback System
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every SkillSwap barter and project collaboration is rated across Skill Competence, Communication, and Reliability to build verified digital reputations.
          </p>
        </div>

        <button
          onClick={() => setIsWriteReviewModalOpen(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm shadow-indigo-600/20 transition-all hover:scale-102 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Demo Disclaimer required by prompt */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-center gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0" />
        <div>
          <span className="font-bold block">Prototype Demonstration Sandbox:</span>
          Reviews displayed here are illustrative sample evaluations and live in-session entries created for the ALBACADABRA 2026 jury review.
        </div>
      </div>

      {/* Overall Reputation Summary Box */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center shadow-2xs">
          <span className="text-3xl font-black text-slate-900">4.96</span>
          <div className="flex gap-1 my-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-[11px] text-slate-500">Platform-wide average</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center shadow-2xs">
          <span className="text-3xl font-black text-emerald-600">98.4%</span>
          <span className="text-xs font-bold text-slate-800 mt-1">Reciprocity Satisfaction</span>
          <span className="text-[11px] text-slate-500">Post-swap ratings</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center shadow-2xs">
          <span className="text-3xl font-black text-indigo-600">4.9 / 5</span>
          <span className="text-xs font-bold text-slate-800 mt-1">Communication Index</span>
          <span className="text-[11px] text-slate-500">Punctuality & clarity</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center shadow-2xs">
          <span className="text-3xl font-black text-cyan-600">100%</span>
          <span className="text-xs font-bold text-slate-800 mt-1">Anti-Abuse Protected</span>
          <span className="text-[11px] text-slate-500">Two-way verification</span>
        </div>
      </div>

      {/* Review Filters & List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="font-bold text-sm sm:text-base text-slate-900">
            Recent Feedback Entries ({filteredReviews.length})
          </h3>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium mr-1">Filter Stars:</span>
            {['all', 5, 4].map((star) => (
              <button
                key={star}
                onClick={() => setFilterRating(star as any)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filterRating === star
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {star === 'all' ? 'All Ratings' : `${star} Stars`}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.fromUser.avatar}
                    alt={rev.fromUser.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{rev.fromUser.name}</span>
                      <span className="text-xs text-slate-400">reviewed</span>
                      <strong className="text-xs text-indigo-700">{rev.toUserName}</strong>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {rev.date} • Context: {rev.context}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {rev.rating}.0
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                "{rev.comment}"
              </p>

              {rev.skillsExchanged && (
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                    Bilateral Barter
                  </span>
                  <span className="text-slate-600 font-medium">
                    {rev.skillsExchanged}
                  </span>
                </div>
              )}

              {/* Criteria detail row */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                <div>
                  <span className="font-bold text-slate-800">Skill Competence: </span>
                  {rev.criteriaRatings.skillExpertise} / 5
                </div>
                <div>
                  <span className="font-bold text-slate-800">Communication: </span>
                  {rev.criteriaRatings.communication} / 5
                </div>
                <div>
                  <span className="font-bold text-slate-800">Reliability: </span>
                  {rev.criteriaRatings.reliability} / 5
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Modal */}
      {isWriteReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Write Verified Peer Review</h3>
              <button
                onClick={() => setIsWriteReviewModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReview} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Select Talent to Review</label>
                <select
                  value={targetUserId}
                  onChange={(e) => setTargetUserId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 outline-none text-xs"
                >
                  {users
                    .filter((u) => u.id !== currentUser.id)
                    .map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} — {u.role}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Overall Star Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormRating(star)}
                      className="p-1 hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formRating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Skills Exchanged Description</label>
                <input
                  type="text"
                  value={formSkillsExchanged}
                  onChange={(e) => setFormSkillsExchanged(e.target.value)}
                  placeholder="e.g. Exchanged: 3D Blender ↔ React State Management"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 outline-none text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Written Feedback & Validation *</label>
                <textarea
                  required
                  rows={3}
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  placeholder="Describe your peer's pedagogical depth, promptness, and hands-on clarity..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 outline-none text-xs resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWriteReviewModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors shadow-sm"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
