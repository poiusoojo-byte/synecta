import React from 'react';
import { useApp } from '../context/AppContext';
import { PageView } from '../types';
import { Compass, Repeat, Image, Users2, Briefcase } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentPage, setCurrentPage } = useApp();

  const items: Array<{ id: PageView; label: string; icon: React.ReactNode }> = [
    { id: 'home', label: 'Home', icon: <Compass className="w-5 h-5" /> },
    { id: 'skillswap', label: 'SkillSwap', icon: <Repeat className="w-5 h-5" /> },
    { id: 'showcase', label: 'Showcase', icon: <Image className="w-5 h-5" /> },
    { id: 'community', label: 'Chat', icon: <Users2 className="w-5 h-5" /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="w-5 h-5" /> },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition-all relative ${
                isActive
                  ? 'text-indigo-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.id === 'skillswap' && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-600 rounded-full animate-ping" />
                )}
              </div>
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
