export type PageView =
  | 'landing'
  | 'home'
  | 'skillswap'
  | 'profile'
  | 'showcase'
  | 'community'
  | 'projects'
  | 'reviews'
  | 'notifications';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  headline: string;
  role: string;
  avatar: string;
  coverImage?: string;
  location: string;
  schoolOrOrg: string;
  bio: string;
  skillsOffered: string[];
  skillsWanted: string[];
  rating: number;
  reviewCount: number;
  sessionsCompleted: number;
  badges: string[];
  isVerified: boolean;
  isOnline?: boolean;
  portfolioItems?: {
    id: string;
    title: string;
    category: string;
    image: string;
    likes: number;
  }[];
  experience?: {
    role: string;
    org: string;
    period: string;
    description: string;
  }[];
}

export interface SkillSwapMatch {
  id: string;
  user: UserProfile;
  matchPercentage: number;
  skillTeach: string;
  skillLearn: string;
  proficiencyLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  location: string;
  availability: string;
  compatibilityDetails: {
    skillSynergy: number;
    scheduleAlignment: number;
    reputationScore: number;
  };
}

export interface ShowcaseItem {
  id: string;
  title: string;
  category: 'Design' | 'Coding' | 'Photography' | 'Music' | 'Writing' | 'Business';
  creator: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  image: string;
  description: string;
  tags: string[];
  likes: number;
  hasLiked?: boolean;
  commentsCount: number;
  rating: number;
  ratingCount: number;
  createdAt: string;
  comments?: {
    id: string;
    author: string;
    avatar: string;
    text: string;
    time: string;
  }[];
}

export interface CommunityMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole?: string;
  text: string;
  timestamp: string;
  isCurrentUser?: boolean;
}

export interface Community {
  id: string;
  name: string;
  topic: string;
  category: string;
  coverImage: string;
  avatar: string;
  description: string;
  memberCount: number;
  isJoined?: boolean;
  rules?: string[];
  trendingTopics: string[];
  recentPosts: {
    id: string;
    author: string;
    authorAvatar: string;
    title: string;
    content: string;
    likes: number;
    replies: number;
    time: string;
  }[];
  chatMessages: CommunityMessage[];
}

export interface ProjectRecruitment {
  id: string;
  title: string;
  organization: string;
  orgType: 'Startup' | 'Creative Agency' | 'Student Venture' | 'Non-Profit';
  orgLogo: string;
  location: string;
  isRemote: boolean;
  duration: string;
  stipend: string;
  description: string;
  responsibilities: string[];
  skillsRequired: string[];
  projectType: 'Web Development' | 'Mobile App' | 'Design System' | 'Creative Media' | 'AI / Data';
  teamMembers: {
    name: string;
    role: string;
    avatar: string;
  }[];
  spotsAvailable: number;
  hasApplied?: boolean;
  recruiter: {
    name: string;
    role: string;
    avatar: string;
    contactNote: string;
  };
}

export interface ReviewItem {
  id: string;
  fromUser: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  toUserId: string;
  toUserName: string;
  rating: number;
  date: string;
  context: 'SkillSwap Session' | 'Project Collaboration' | 'Showcase Review';
  skillsExchanged?: string;
  comment: string;
  criteriaRatings: {
    skillExpertise: number;
    communication: number;
    reliability: number;
  };
  verified: boolean;
}

export interface NotificationItem {
  id: string;
  type: 'skill_match' | 'project_invite' | 'connection_request' | 'review_received' | 'like';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  actionUrl?: string;
  avatar?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}
