import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  PhoneOff,
  MessageSquare,
  FileCode2,
  Sparkles,
  Send,
  Star,
  Clock,
  Shield,
  CheckCircle,
} from 'lucide-react';

export const VideoCallModal: React.FC = () => {
  const { isVideoCallOpen, closeVideoCall, videoCallPartner, currentUser, addToast, addReview } = useApp();

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'agenda'>('video');
  const [callSeconds, setCallSeconds] = useState(0);

  // In-call chat
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Notes state
  const [sharedNotes, setSharedNotes] = useState(
    `// SYNECTA SkillSwap Session Scratchpad\n// Partner: ${videoCallPartner?.name || 'Partner'}\n\n1. Exchange Goal: UI Motion Curve Math & Framer Motion\n2. Key takeaway: Use cubic-bezier(0.16, 1, 0.3, 1) for natural spring friction\n3. Action item: Export token JSON from Figma into React theme`
  );

  // Review prompt on finish
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);
  const [ratingStars, setRatingStars] = useState(5);
  const [reviewFeedback, setReviewFeedback] = useState('Great interactive session! Super knowledgeable and clear communication.');

  useEffect(() => {
    if (!isVideoCallOpen) {
      setCallSeconds(0);
      setShowReviewPrompt(false);
      return;
    }

    const timer = setInterval(() => {
      setCallSeconds((prev) => prev + 1);
    }, 1000);

    // Initial greeting in chat
    if (videoCallPartner) {
      setChatMessages([
        {
          sender: videoCallPartner.name,
          text: `Hey ${currentUser.name}! Excited for our session today. Let's start with your questions!`,
          time: 'Just now',
        },
      ]);
      setSharedNotes(
        `// SYNECTA SkillSwap Live Shared Scratchpad\n// Mentors: ${videoCallPartner.name} ↔ ${currentUser.name}\n\n• Topic: Practical Workflow Exchange\n• Skill Offered: ${videoCallPartner.skillsOffered[0] || 'Design'}\n• Skill Received: ${currentUser.skillsOffered[0] || 'Code'}\n\n// Type notes here during call...`
      );
    }

    return () => clearInterval(timer);
  }, [isVideoCallOpen, videoCallPartner, currentUser]);

  if (!isVideoCallOpen || !videoCallPartner) return null;

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const msg = {
      sender: currentUser.name,
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages((prev) => [...prev, msg]);
    setChatInput('');

    // Simulate partner quick answer
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: videoCallPartner.name,
          text: 'Got it! Shared the component file directly to your workspace.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 2000);
  };

  const handleEndCall = () => {
    setShowReviewPrompt(true);
  };

  const handleSubmitReviewAndExit = () => {
    addReview({
      toUserId: videoCallPartner.id,
      toUserName: videoCallPartner.name,
      rating: ratingStars,
      context: 'SkillSwap Session',
      skillsExchanged: `${videoCallPartner.skillsOffered[0] || 'Skill'} ↔ ${currentUser.skillsOffered[0] || 'Skill'}`,
      comment: reviewFeedback,
      criteriaRatings: {
        skillExpertise: ratingStars,
        communication: 5,
        reliability: 5,
      },
    });
    addToast('success', 'Session Completed', `Swap feedback submitted for ${videoCallPartner.name}. Verified badges updated!`);
    closeVideoCall();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-2xl w-full max-w-5xl h-[88vh] shadow-2xl flex flex-col border border-slate-800 overflow-hidden text-white relative">
        
        {/* Top Room Header Bar */}
        <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>LIVE P2P SESSION</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-mono font-medium">{formatTimer(callSeconds)}</span>
              <span className="text-slate-500">•</span>
              <span className="font-medium text-slate-300">Room: swap-{videoCallPartner.id.slice(0, 5)}</span>
            </div>
          </div>

          {/* Session Tab Switcher */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === 'video' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Video Stream
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'notes' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              Shared Notes
            </button>
          </div>

          <button
            onClick={closeVideoCall}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Minimize call"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Call Main Stage Area */}
        <div className="flex-1 relative flex overflow-hidden">
          {/* Main Stage (Stream / Whiteboard) */}
          <div className="flex-1 relative bg-slate-950 flex flex-col items-center justify-center p-4">
            {activeTab === 'video' && (
              <div className="w-full h-full relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center shadow-inner">
                {/* Simulated Remote Partner Video */}
                {isScreenSharing ? (
                  <div className="w-full h-full p-6 bg-slate-900 flex flex-col justify-center items-center text-center">
                    <div className="max-w-md p-6 rounded-xl bg-slate-800/90 border border-indigo-500/30 shadow-2xl">
                      <Monitor className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                      <h4 className="font-bold text-white text-base">Screen Sharing: Figma Auto-Layout Architecture</h4>
                      <p className="text-xs text-slate-300 mt-2">
                        {videoCallPartner.name} is sharing design frame tokens and layout hierarchies with you in real time.
                      </p>
                      <div className="mt-4 p-3 bg-slate-950 rounded-lg text-left font-mono text-[11px] text-cyan-300">
                        {`export const tokens = {\n  spacing: { sm: '8px', md: '16px', lg: '24px' },\n  motion: 'cubic-bezier(0.16, 1, 0.3, 1)'\n};`}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full relative">
                    <img
                      src={videoCallPartner.coverImage || videoCallPartner.avatar}
                      alt={videoCallPartner.name}
                      className="w-full h-full object-cover filter brightness-[0.75]"
                    />
                    {/* Simulated Voice wave indicator overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40" />

                    {/* Partner Floating Badge */}
                    <div className="absolute bottom-5 left-5 flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 shadow-lg">
                      <img
                        src={videoCallPartner.avatar}
                        alt={videoCallPartner.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{videoCallPartner.name}</span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-500/40 text-indigo-300 font-semibold">
                            Teaching: {videoCallPartner.skillsOffered[0]}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                          <span className="text-[11px] text-emerald-400 font-medium">Audio streaming (HD)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Local User Mini Webcam Preview */}
                <div className="absolute top-4 right-4 w-40 sm:w-52 aspect-video bg-slate-800 rounded-xl overflow-hidden border-2 border-indigo-500/50 shadow-2xl z-20">
                  {isVideoOn ? (
                    <div className="w-full h-full relative">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1.5 left-2 px-1.5 py-0.5 rounded bg-black/60 text-[10px] text-white font-medium">
                        You ({currentUser.name.split(' ')[0]})
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-400 text-xs">
                      <VideoOff className="w-6 h-6 mb-1 text-slate-500" />
                      Camera off
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="w-full h-full bg-slate-900 rounded-2xl border border-slate-800 p-4 flex flex-col">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <FileCode2 className="w-4 h-4 text-indigo-400" />
                    <span className="font-bold text-white">Live Collaborative Scratchpad & Agenda</span>
                  </div>
                  <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Synced across peers
                  </span>
                </div>
                <textarea
                  value={sharedNotes}
                  onChange={(e) => setSharedNotes(e.target.value)}
                  className="flex-1 w-full bg-slate-950 text-slate-200 font-mono text-xs sm:text-sm p-4 rounded-xl mt-3 border border-slate-800 focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
                  placeholder="Type session notes, code snippets, or exchange takeaways here..."
                />
              </div>
            )}
          </div>

          {/* In-Call Side Chat Drawer */}
          {isChatOpen && (
            <div className="w-80 bg-slate-950 border-l border-slate-800 flex flex-col h-full animate-in slide-in-from-right duration-200">
              <div className="p-3.5 border-b border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                  In-Session Chat
                </span>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1 text-slate-400 hover:text-white rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Message List */}
              <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      msg.sender === currentUser.name ? 'items-end' : 'items-start'
                    }`}
                  >
                    <span className="text-[10px] text-slate-400 font-medium mb-1">
                      {msg.sender} • {msg.time}
                    </span>
                    <div
                      className={`px-3 py-2 rounded-xl max-w-[85%] ${
                        msg.sender === currentUser.name
                          ? 'bg-indigo-600 text-white rounded-tr-none'
                          : 'bg-slate-800 text-slate-200 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-slate-900 border border-slate-800 text-white text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Bottom Control Bar */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-xs text-slate-400 hidden md:block">
              <span className="text-white font-medium">Session:</span> {videoCallPartner.name}
            </div>
          </div>

          {/* Action Call Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-3 rounded-full transition-all ${
                isMicOn
                  ? 'bg-slate-800 hover:bg-slate-700 text-white'
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
              title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
            >
              {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3 rounded-full transition-all ${
                isVideoOn
                  ? 'bg-slate-800 hover:bg-slate-700 text-white'
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
              title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}
            >
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`p-3 rounded-full transition-all ${
                isScreenSharing
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-white'
              }`}
              title="Share Screen"
            >
              <Monitor className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`p-3 rounded-full relative transition-all ${
                isChatOpen ? 'bg-indigo-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'
              }`}
              title="Toggle in-call chat"
            >
              <MessageSquare className="w-5 h-5" />
              {chatMessages.length > 0 && !isChatOpen && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-indigo-500 rounded-full"></span>
              )}
            </button>

            {/* End Call Button */}
            <button
              onClick={handleEndCall}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-lg transition-all ml-2"
            >
              <PhoneOff className="w-4 h-4" />
              <span>End & Rate</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400">
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>End-to-End Encrypted Demo</span>
          </div>
        </div>

        {/* Review & Feedback Overlay Modal */}
        {showReviewPrompt && (
          <div className="absolute inset-0 z-30 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-white">Rate your SkillSwap with {videoCallPartner.name}</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Your feedback helps maintain a trusted, high-reputation talent network across Indonesia.
                </p>
              </div>

              {/* Star Selector */}
              <div className="flex justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRatingStars(star)}
                    className="p-1.5 hover:scale-125 transition-transform"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= ratingStars
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="text-left text-xs">
                <label className="font-semibold text-slate-300 block mb-1">Written Feedback & Validation Note</label>
                <textarea
                  value={reviewFeedback}
                  onChange={(e) => setReviewFeedback(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-indigo-500 resize-none h-20"
                  placeholder="Describe your session quality, key learnings, and collaboration experience..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeVideoCall}
                  className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold"
                >
                  Skip Feedback
                </button>
                <button
                  type="button"
                  onClick={handleSubmitReviewAndExit}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-md"
                >
                  Submit & Complete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
