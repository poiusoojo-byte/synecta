import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { RightSidebar } from './components/RightSidebar';
import { BottomNav } from './components/BottomNav';
import { ToastContainer } from './components/ToastContainer';
import { PitchDeckModal } from './components/PitchDeckModal';
import { VideoCallModal } from './components/VideoCallModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { SkillSwapPage } from './pages/SkillSwapPage';
import { TalentProfilePage } from './pages/TalentProfilePage';
import { ShowcasePage } from './pages/ShowcasePage';
import { CommunityPage } from './pages/CommunityPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { NotificationsPage } from './pages/NotificationsPage';

export const MainApp: React.FC = () => {
  const { currentPage } = useApp();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // If on landing page, display the standalone landing experience
  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans">
        <LandingPage />
        <PitchDeckModal />
        <VideoCallModal />
        <ToastContainer />
      </div>
    );
  }

  // Determine if right sidebar should be displayed (recommended on home & skillswap)
  const showRightSidebar = currentPage === 'home' || currentPage === 'skillswap';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)} />

      {/* Main Body with Sidebars */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto flex">
        {/* Left Permanent Desktop Sidebar & Mobile Drawer */}
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Central Content Canvas */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12">
          <div className="max-w-5xl mx-auto">
            {currentPage === 'home' && <HomePage />}
            {currentPage === 'skillswap' && <SkillSwapPage />}
            {currentPage === 'profile' && <TalentProfilePage />}
            {currentPage === 'showcase' && <ShowcasePage />}
            {currentPage === 'community' && <CommunityPage />}
            {currentPage === 'projects' && <ProjectsPage />}
            {currentPage === 'reviews' && <ReviewsPage />}
            {currentPage === 'notifications' && <NotificationsPage />}
          </div>
        </main>

        {/* Right Sidebar for Recommended Talent & Trends */}
        {showRightSidebar && <RightSidebar />}
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Global Modals & Notifications */}
      <PitchDeckModal />
      <VideoCallModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return <MainApp />;
}
