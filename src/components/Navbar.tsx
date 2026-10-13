import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import {
  Search,
  Bell,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  User,
} from 'lucide-react';

interface NavbarProps {
  onToggleMobileSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileSidebar }) => {
  const {
    currentPage,
    setCurrentPage,
    unreadNotificationCount,
    openPitchDeck,
    currentUser,
    viewProfile,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPage !== 'home') {
      setCurrentPage('home');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Menu Trigger + Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-none"
            aria-label="Open sidebar navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center text-left group"
          >
            <Logo size="sm" showTagline={false} />
          </button>
        </div>

        {/* Center: Search Bar with Live Filter */}
        <div className="flex-1 max-w-xl mx-2 hidden sm:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search skills (e.g. Figma, Python), creators, projects, communities..."
              className={`w-full bg-slate-100/90 hover:bg-slate-100 text-slate-800 placeholder-slate-400 text-xs sm:text-sm pl-10 pr-9 py-2 rounded-xl border transition-all outline-none ${
                isSearchFocused
                  ? 'bg-white border-indigo-500 ring-2 ring-indigo-500/10 shadow-sm'
                  : 'border-transparent'
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>

        {/* Right: Pitch Deck Pill + Notifications + User Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Competition Pitch Deck Quick Trigger */}
          <button
            onClick={openPitchDeck}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-50 to-cyan-50 hover:from-indigo-100 hover:to-cyan-100 text-indigo-700 border border-indigo-200/80 text-xs font-semibold shadow-2xs transition-all hover:scale-102"
            title="View Business Plan Proposal Summary for Competition Judges"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>ALBACADABRA 2026 Pitch</span>
            <span className="bg-indigo-600 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
              PDF
            </span>
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => setCurrentPage('notifications')}
            className={`relative p-2 rounded-xl transition-colors ${
              currentPage === 'notifications'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* User Profile Mini-Badge */}
          <button
            onClick={() => viewProfile(currentUser.id)}
            className="flex items-center gap-2 p-1 pl-1.5 sm:pr-2.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
            />
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-slate-500 leading-tight">
                SMAN 3 Sukabumi
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
