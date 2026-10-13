import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PageView,
  UserProfile,
  ShowcaseItem,
  Community,
  ProjectRecruitment,
  ReviewItem,
  NotificationItem,
  ToastMessage,
  CommunityMessage,
} from '../types';
import {
  CURRENT_USER,
  MOCK_USERS,
  INITIAL_SHOWCASE_ITEMS,
  INITIAL_COMMUNITIES,
  INITIAL_PROJECTS,
  INITIAL_REVIEWS,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

interface AppContextType {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  currentUser: UserProfile;
  users: UserProfile[];
  selectedProfileId: string;
  viewProfile: (userId: string) => void;
  selectedCommunityId: string;
  viewCommunity: (communityId: string) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  
  // Showcase
  showcaseItems: ShowcaseItem[];
  addShowcaseItem: (newItem: {
    title: string;
    category: ShowcaseItem['category'];
    image: string;
    description: string;
    tags: string[];
  }) => void;
  toggleLikeShowcase: (itemId: string) => void;
  addCommentShowcase: (itemId: string, text: string) => void;

  // Communities
  communities: Community[];
  toggleJoinCommunity: (communityId: string) => void;
  sendCommunityMessage: (communityId: string, text: string) => void;

  // Projects
  projects: ProjectRecruitment[];
  applyToProject: (
    projectId: string,
    details: { role: string; pitch: string; portfolio: string; hours: string }
  ) => void;

  // Reviews
  reviews: ReviewItem[];
  addReview: (review: {
    toUserId: string;
    toUserName: string;
    rating: number;
    context: ReviewItem['context'];
    skillsExchanged?: string;
    comment: string;
    criteriaRatings: {
      skillExpertise: number;
      communication: number;
      reliability: number;
    };
  }) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Connections
  connectedUserIds: string[];
  toggleConnectUser: (userId: string) => void;

  // Simulated Video Call
  isVideoCallOpen: boolean;
  videoCallPartner: UserProfile | null;
  startVideoCall: (partner: UserProfile) => void;
  closeVideoCall: () => void;

  // Pitch Deck Modal
  isPitchDeckOpen: boolean;
  openPitchDeck: () => void;
  closePitchDeck: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'info' | 'warning', title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('landing');
  const [currentUser] = useState<UserProfile>(CURRENT_USER);
  const [users] = useState<UserProfile[]>(MOCK_USERS);
  const [selectedProfileId, setSelectedProfileId] = useState<string>('user-maya');
  const [selectedCommunityId, setSelectedCommunityId] = useState<string>('comm-1');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const [showcaseItems, setShowcaseItems] = useState<ShowcaseItem[]>(() => {
    const saved = localStorage.getItem('synecta_showcase');
    return saved ? JSON.parse(saved) : INITIAL_SHOWCASE_ITEMS;
  });

  const [communities, setCommunities] = useState<Community[]>(() => {
    const saved = localStorage.getItem('synecta_communities');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITIES;
  });

  const [projects, setProjects] = useState<ProjectRecruitment[]>(() => {
    const saved = localStorage.getItem('synecta_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem('synecta_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('synecta_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [connectedUserIds, setConnectedUserIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('synecta_connections');
    return saved ? JSON.parse(saved) : ['user-fardhan'];
  });

  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [videoCallPartner, setVideoCallPartner] = useState<UserProfile | null>(null);
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('synecta_showcase', JSON.stringify(showcaseItems));
      localStorage.setItem('synecta_communities', JSON.stringify(communities));
      localStorage.setItem('synecta_projects', JSON.stringify(projects));
      localStorage.setItem('synecta_reviews', JSON.stringify(reviews));
      localStorage.setItem('synecta_notifications', JSON.stringify(notifications));
      localStorage.setItem('synecta_connections', JSON.stringify(connectedUserIds));
    } catch {
      // Local storage disabled or error
    }
  }, [showcaseItems, communities, projects, reviews, notifications, connectedUserIds]);

  const addToast = (type: 'success' | 'info' | 'warning', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const viewProfile = (userId: string) => {
    setSelectedProfileId(userId);
    setCurrentPage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewCommunity = (commId: string) => {
    setSelectedCommunityId(commId);
    setCurrentPage('community');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleConnectUser = (userId: string) => {
    setConnectedUserIds((prev) => {
      const isConnected = prev.includes(userId);
      const targetUser = users.find((u) => u.id === userId);
      const targetName = targetUser?.name || 'Talent';
      if (isConnected) {
        addToast('info', 'Disconnected', `Removed ${targetName} from your network.`);
        return prev.filter((id) => id !== userId);
      } else {
        addToast('success', 'Connected!', `Connected with ${targetName}. You can now send direct swap requests.`);
        return [...prev, userId];
      }
    });
  };

  const addShowcaseItem = (newItemData: {
    title: string;
    category: ShowcaseItem['category'];
    image: string;
    description: string;
    tags: string[];
  }) => {
    const newItem: ShowcaseItem = {
      id: 'sc-' + Date.now(),
      title: newItemData.title,
      category: newItemData.category,
      image: newItemData.image,
      description: newItemData.description,
      tags: newItemData.tags,
      creator: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        role: currentUser.role,
      },
      likes: 1,
      hasLiked: true,
      commentsCount: 0,
      rating: 5.0,
      ratingCount: 1,
      createdAt: 'Just now',
      comments: [],
    };
    setShowcaseItems((prev) => [newItem, ...prev]);
    addToast('success', 'Published!', `"${newItem.title}" is now visible to all creators & recruiters on SYNECTA.`);
  };

  const toggleLikeShowcase = (itemId: string) => {
    setShowcaseItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const hasLiked = item.hasLiked;
          return {
            ...item,
            hasLiked: !hasLiked,
            likes: hasLiked ? item.likes - 1 : item.likes + 1,
          };
        }
        return item;
      })
    );
  };

  const addCommentShowcase = (itemId: string, text: string) => {
    if (!text.trim()) return;
    const commentObj = {
      id: 'c-' + Date.now(),
      author: currentUser.name,
      avatar: currentUser.avatar,
      text: text.trim(),
      time: 'Just now',
    };
    setShowcaseItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            commentsCount: item.commentsCount + 1,
            comments: [...(item.comments || []), commentObj],
          };
        }
        return item;
      })
    );
    addToast('success', 'Comment Added', 'Your feedback was posted on the creator portfolio.');
  };

  const toggleJoinCommunity = (communityId: string) => {
    setCommunities((prev) =>
      prev.map((c) => {
        if (c.id === communityId) {
          const willJoin = !c.isJoined;
          if (willJoin) {
            addToast('success', 'Joined Community', `Welcome to ${c.name}! You can now join the live channel.`);
          } else {
            addToast('info', 'Left Community', `You left ${c.name}.`);
          }
          return {
            ...c,
            isJoined: willJoin,
            memberCount: willJoin ? c.memberCount + 1 : c.memberCount - 1,
          };
        }
        return c;
      })
    );
  };

  const sendCommunityMessage = (communityId: string, text: string) => {
    if (!text.trim()) return;
    const msg: CommunityMessage = {
      id: 'msg-' + Date.now(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      senderRole: 'Member',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true,
    };
    setCommunities((prev) =>
      prev.map((c) => {
        if (c.id === communityId) {
          return {
            ...c,
            chatMessages: [...c.chatMessages, msg],
          };
        }
        return c;
      })
    );
  };

  const applyToProject = (
    projectId: string,
    details: { role: string; pitch: string; portfolio: string; hours: string }
  ) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return { ...p, hasApplied: true };
        }
        return p;
      })
    );
    const targetProj = projects.find((p) => p.id === projectId);
    addToast(
      'success',
      'Application Submitted!',
      `Your application for ${details.role} on "${targetProj?.title}" was received.`
    );
  };

  const addReview = (review: {
    toUserId: string;
    toUserName: string;
    rating: number;
    context: ReviewItem['context'];
    skillsExchanged?: string;
    comment: string;
    criteriaRatings: {
      skillExpertise: number;
      communication: number;
      reliability: number;
    };
  }) => {
    const newRev: ReviewItem = {
      id: 'rev-' + Date.now(),
      fromUser: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        role: currentUser.role,
      },
      toUserId: review.toUserId,
      toUserName: review.toUserName,
      rating: review.rating,
      date: 'Just now',
      context: review.context,
      skillsExchanged: review.skillsExchanged,
      comment: review.comment,
      criteriaRatings: review.criteriaRatings,
      verified: true,
    };
    setReviews((prev) => [newRev, ...prev]);
    addToast('success', 'Review Recorded', `Your verified feedback for ${review.toUserName} has updated their talent score.`);
  };

  const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    addToast('info', 'Notifications Cleared', 'All notifications marked as read.');
  };

  const startVideoCall = (partner: UserProfile) => {
    setVideoCallPartner(partner);
    setIsVideoCallOpen(true);
  };

  const closeVideoCall = () => {
    setIsVideoCallOpen(false);
    setVideoCallPartner(null);
  };

  const openPitchDeck = () => setIsPitchDeckOpen(true);
  const closePitchDeck = () => setIsPitchDeckOpen(false);

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        currentUser,
        users,
        selectedProfileId,
        viewProfile,
        selectedCommunityId,
        viewCommunity,
        selectedProjectId,
        setSelectedProjectId,
        showcaseItems,
        addShowcaseItem,
        toggleLikeShowcase,
        addCommentShowcase,
        communities,
        toggleJoinCommunity,
        sendCommunityMessage,
        projects,
        applyToProject,
        reviews,
        addReview,
        notifications,
        unreadNotificationCount,
        markNotificationRead,
        markAllNotificationsRead,
        connectedUserIds,
        toggleConnectUser,
        isVideoCallOpen,
        videoCallPartner,
        startVideoCall,
        closeVideoCall,
        isPitchDeckOpen,
        openPitchDeck,
        closePitchDeck,
        searchQuery,
        setSearchQuery,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
