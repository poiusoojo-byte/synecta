import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users2,
  MessageSquare,
  Sparkles,
  Send,
  Plus,
  Check,
  Hash,
  Share2,
  ThumbsUp,
  ShieldAlert,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const {
    communities,
    selectedCommunityId,
    viewCommunity,
    toggleJoinCommunity,
    sendCommunityMessage,
    currentUser,
    viewProfile,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'chat' | 'posts'>('chat');
  const [chatInput, setChatInput] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Active community
  const activeCommunity =
    communities.find((c) => c.id === selectedCommunityId) || communities[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendCommunityMessage(activeCommunity.id, chatInput.trim());
    setChatInput('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Community Directory Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Talent Communities & Hubs
            </h2>
            <p className="text-xs text-slate-500">
              Join focused skill collectives across Indonesia to share workflows and find collaborators.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {communities.map((comm) => {
            const isSelected = comm.id === activeCommunity.id;
            return (
              <div
                key={comm.id}
                onClick={() => viewCommunity(comm.id)}
                className={`bg-white rounded-2xl border p-4.5 transition-all cursor-pointer flex flex-col justify-between shadow-2xs hover:shadow-md ${
                  isSelected
                    ? 'border-indigo-600 ring-2 ring-indigo-500/10'
                    : 'border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <img
                      src={comm.avatar}
                      alt={comm.name}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500/20"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleJoinCommunity(comm.id);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
                        comm.isJoined
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs'
                      }`}
                    >
                      {comm.isJoined ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Joined</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Join</span>
                        </>
                      )}
                    </button>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 mb-1 leading-snug">
                    {comm.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-indigo-600 block mb-2">
                    {comm.topic}
                  </span>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {comm.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Users2 className="w-3.5 h-3.5 text-indigo-600" />
                    {comm.memberCount} members
                  </span>
                  <span className="text-indigo-600 font-bold text-[11px] flex items-center gap-0.5">
                    <span>Open Lounge</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Community Active Hub Stage */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col">
        {/* Community Banner */}
        <div className="h-32 sm:h-40 w-full relative bg-slate-900">
          <img
            src={activeCommunity.coverImage}
            alt={activeCommunity.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div className="flex items-center gap-3">
              <img
                src={activeCommunity.avatar}
                alt={activeCommunity.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white shadow-md bg-white"
              />
              <div className="text-white">
                <h2 className="text-base sm:text-xl font-bold leading-tight">
                  {activeCommunity.name}
                </h2>
                <p className="text-xs text-slate-300">{activeCommunity.topic}</p>
              </div>
            </div>

            <button
              onClick={() => toggleJoinCommunity(activeCommunity.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                activeCommunity.isJoined
                  ? 'bg-white/20 text-white backdrop-blur-md hover:bg-white/30'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              {activeCommunity.isJoined ? 'Member (Joined)' : 'Join Community'}
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 bg-slate-50/70 px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'chat'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Hash className="w-4 h-4" />
            Live Group Lounge ({activeCommunity.chatMessages.length})
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'posts'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Community Discussions ({activeCommunity.recentPosts.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Simulated Live Group Chat */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-[480px] bg-slate-50/70 rounded-2xl border border-slate-200 overflow-hidden">
              {/* Channel Notice Header */}
              <div className="p-3 bg-white border-b border-slate-200 text-xs flex items-center justify-between text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-slate-900">#skill-exchange-channel</span>
                  <span className="text-slate-400">• Real-time P2P conversation simulation</span>
                </div>
                <span className="text-[11px] text-slate-400">
                  {activeCommunity.memberCount} active members
                </span>
              </div>

              {/* Chat Messages Log */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
                {activeCommunity.chatMessages.map((msg) => {
                  const isMine = msg.senderId === currentUser.id || msg.isCurrentUser;

                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${isMine ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isMine && (
                        <img
                          src={msg.senderAvatar}
                          alt={msg.senderName}
                          className="w-8 h-8 rounded-full object-cover shrink-0 cursor-pointer"
                          onClick={() => viewProfile(msg.senderId)}
                        />
                      )}

                      <div className={`max-w-[75%] ${isMine ? 'items-end' : 'items-start'}`}>
                        <div className="flex items-center gap-1.5 mb-1 text-[11px]">
                          <span className="font-bold text-slate-800">
                            {isMine ? 'You' : msg.senderName}
                          </span>
                          {msg.senderRole && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                              {msg.senderRole}
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                        </div>

                        <div
                          className={`p-3 rounded-2xl text-xs leading-relaxed ${
                            isMine
                              ? 'bg-indigo-600 text-white rounded-tr-none shadow-xs'
                              : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-2xs'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input Box */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 bg-white border-t border-slate-200 flex gap-2 items-center"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={`Send message to #${activeCommunity.name.toLowerCase().replace(/\s+/g, '-')}...`}
                  className="flex-1 bg-slate-100 hover:bg-slate-50 focus:bg-white text-xs px-4 py-2.5 rounded-xl border border-transparent focus:border-indigo-500 outline-none transition-all"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}

          {/* Discussion Posts */}
          {activeTab === 'posts' && (
            <div className="space-y-4">
              {activeCommunity.recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-200 transition-all space-y-3 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={post.authorAvatar}
                        alt={post.author}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">
                          {post.author}
                        </span>
                        <span className="text-[10px] text-slate-400">{post.time}</span>
                      </div>
                    </div>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900">{post.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{post.content}</p>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-indigo-600 font-semibold cursor-pointer">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{post.likes} Upvotes</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.replies} Replies</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
