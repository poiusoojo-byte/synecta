import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { PageView } from '../types';
import {
  Compass,
  Repeat,
  Image,
  Users2,
  Briefcase,
  Star,
  Bell,
  UserCheck,
  Sparkles,
  Home,
  X,
  ExternalLink,
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const {
    currentPage,
    setCurrentPage,
    unreadNotificationCount,
    currentUser,
    viewProfile,
    openPitchDeck,
  } = useApp();

  const navItems: Array<{
    id: PageView;
    label: string;
    icon: React.ReactNode;
    badge?: string;
    badgeColor?: string;
  }> = [
    {
      id: 'home',
      label: 'Discover & Home',
      icon: <Compass className="w-5 h-5" />,
    },
    {
      id: 'skillswap',
      label: 'SkillSwap',
      icon: <Repeat className="w-5 h-5" />,
      badge: 'HERO FEATURE',
      badgeColor: 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white animate-pulse',
    },
    {
      id: 'showcase',
      label: 'Creative Showcase',
      icon: <Image className="w-5 h-5" />,
    },
    {
      id: 'community',
      label: 'Communities & Chat',
      icon: <Users2 className="w-5 h-5" />,
    },
    {
      id: 'projects',
      label: 'Project Recruitment',
      icon: <Briefcase className="w-5 h-5" />,
      badge: 'HIRING',
      badgeColor: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: 'reviews',
      label: 'Ratings & Feedback',
      icon: <Star className="w-5 h-5" />,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell className="w-5 h-5" />,
      badge: unreadNotificationCount > 0 ? `${unreadNotificationCount}` : undefined,
      badgeColor: 'bg-indigo-600 text-white',
    },
  ];

  const handleNavClick = (pageId: PageView) => {
    setCurrentPage(pageId);
    if (pageId === 'profile') {
      viewProfile(currentUser.id);
    }
    onCloseMobile();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200/80 w-64 lg:w-72 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <button
          onClick={() => {
            setCurrentPage('home');
            onCloseMobile();
          }}
          className="text-left"
        >
          <Logo size="md" showTagline={true} />
        </button>
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 p-4 overflow-y-auto space-y-1.5">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Core Navigation
        </div>

        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all text-left ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-white' : 'text-slate-500'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Separator */}
        <div className="pt-4 pb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Competition & Team
        </div>

        {/* Judges Pitch Deck Button */}
        <button
          onClick={() => {
            openPitchDeck();
            onCloseMobile();
          }}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-900 border border-indigo-200/80 hover:from-indigo-100 hover:to-purple-100 transition-all text-left shadow-2xs"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Business Pitch Deck</span>
          </div>
          <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded font-bold">
            ALBACADABRA
          </span>
        </button>

        <button
          onClick={() => handleNavClick('landing')}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors text-left"
        >
          <Home className="w-4 h-4" />
          <span>Welcome / Landing Hero</span>
        </button>
      </div>

      {/* User Mini Card at Bottom */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/70">
        <button
          onClick={() => {
            viewProfile(currentUser.id);
            onCloseMobile();
          }}
          className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white hover:shadow-xs transition-all text-left border border-transparent hover:border-slate-200"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-slate-900 truncate">
                {currentUser.name}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            </div>
            <p className="text-[11px] text-slate-500 truncate">{currentUser.role}</p>
          </div>
          <UserCheck className="w-4 h-4 text-slate-400" />
        </button>

        <div className="mt-2.5 px-2 text-[10px] text-slate-400 leading-tight">
          SMAN 3 Kota Sukabumi • Tim Santasi
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Permanent) */}
      <aside className="hidden lg:block shrink-0 sticky top-0 h-screen z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
