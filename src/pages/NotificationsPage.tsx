import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Check,
  CheckCheck,
  Repeat,
  Briefcase,
  UserPlus,
  Star,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setCurrentPage,
    startVideoCall,
    users,
    addToast,
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'unread') return !n.isRead;
    return true;
  });

  const handleAction = (notif: typeof notifications[0]) => {
    markNotificationRead(notif.id);

    if (notif.type === 'skill_match') {
      setCurrentPage('skillswap');
    } else if (notif.type === 'project_invite') {
      setCurrentPage('projects');
    } else if (notif.type === 'connection_request') {
      addToast('success', 'Connected', 'Accepted connection request!');
    } else if (notif.type === 'review_received') {
      setCurrentPage('reviews');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-600" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Notification Activity Feed
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Stay updated on skill matches, recruitment invitations, and peer review feedback.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={markAllNotificationsRead}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            <CheckCheck className="w-4 h-4 text-slate-500" />
            <span>Mark All as Read</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
            filter === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Activity ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
            filter === 'unread'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Unread Only ({notifications.filter((n) => !n.isRead).length})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.length > 0 ? (
          filteredNotifs.map((notif) => {
            const isMatch = notif.type === 'skill_match';
            const isProject = notif.type === 'project_invite';
            const isReview = notif.type === 'review_received';
            const isConnect = notif.type === 'connection_request';

            return (
              <div
                key={notif.id}
                className={`p-4.5 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  notif.isRead
                    ? 'bg-white border-slate-200 shadow-2xs'
                    : 'bg-indigo-50/50 border-indigo-200 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {/* Icon / Avatar */}
                  <div className="relative shrink-0">
                    {notif.avatar ? (
                      <img
                        src={notif.avatar}
                        alt="Sender"
                        className="w-11 h-11 rounded-xl object-cover ring-2 ring-indigo-500/20"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                        <Bell className="w-5 h-5" />
                      </div>
                    )}
                    <span
                      className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] ring-2 ring-white ${
                        isMatch
                          ? 'bg-cyan-500'
                          : isProject
                          ? 'bg-emerald-500'
                          : isReview
                          ? 'bg-amber-500'
                          : 'bg-indigo-600'
                      }`}
                    >
                      {isMatch && <Repeat className="w-3 h-3" />}
                      {isProject && <Briefcase className="w-3 h-3" />}
                      {isReview && <Star className="w-3 h-3" />}
                      {isConnect && <UserPlus className="w-3 h-3" />}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                        {notif.title}
                      </h3>
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                      {notif.message}
                    </p>
                    <span className="text-[10px] text-slate-400 block pt-0.5">
                      {notif.time}
                    </span>
                  </div>
                </div>

                {/* Notification Action */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => handleAction(notif)}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-2xs flex items-center gap-1"
                  >
                    <span>View & Respond</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {!notif.isRead && (
                    <button
                      onClick={() => markNotificationRead(notif.id)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 text-xs text-slate-400 space-y-2">
            <Bell className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-medium text-slate-600">No notifications to display right now.</p>
          </div>
        )}
      </div>

    </div>
  );
};
