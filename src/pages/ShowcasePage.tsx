import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShowcaseItem } from '../types';
import {
  Upload,
  Heart,
  MessageSquare,
  Star,
  Plus,
  X,
  Filter,
  Sparkles,
  ArrowRight,
  Send,
  CheckCircle,
} from 'lucide-react';

export const ShowcasePage: React.FC = () => {
  const {
    showcaseItems,
    addShowcaseItem,
    toggleLikeShowcase,
    addCommentShowcase,
    viewProfile,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeCommentItemId, setActiveCommentItemId] = useState<string | null>(null);
  const [newCommentInput, setNewCommentInput] = useState('');

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState<ShowcaseItem['category']>('Design');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadTags, setUploadTags] = useState('Figma, React, Prototype');
  const [uploadImage, setUploadImage] = useState(
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80'
  );

  const categories = ['All', 'Design', 'Coding', 'Photography', 'Music', 'Writing', 'Business'];

  const presetImages = [
    { label: 'Web / App UI', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80' },
    { label: 'Mobile Mockup', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1000&auto=format&fit=crop&q=80' },
    { label: '3D Render', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80' },
    { label: 'Cinematography', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&auto=format&fit=crop&q=80' },
    { label: 'Financial Plan', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80' },
  ];

  const filteredItems = showcaseItems.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const handleCreateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !uploadDescription.trim()) return;

    const tagsArray = uploadTags
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    addShowcaseItem({
      title: uploadTitle.trim(),
      category: uploadCategory,
      image: uploadImage,
      description: uploadDescription.trim(),
      tags: tagsArray.length > 0 ? tagsArray : ['Portfolio', 'Synecta'],
    });

    setIsUploadModalOpen(false);
    setUploadTitle('');
    setUploadDescription('');
  };

  const handlePostComment = (itemId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentInput.trim()) return;
    addCommentShowcase(itemId, newCommentInput.trim());
    setNewCommentInput('');
  };

  const activeCommentItem = showcaseItems.find((i) => i.id === activeCommentItemId);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-bold border border-cyan-200/80">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>TALENT PROOF-OF-WORK FEED</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Creative Showcase & Portfolio Feed
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Discover peer projects, vote on verified designs and code repos, or publish your own work to get discovered by recruiters and collaboration partners.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm shadow-indigo-600/20 transition-all hover:scale-102 shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Your Work</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Media Thumbnail */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
                  {item.category}
                </span>
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-lg text-xs font-bold bg-white/95 backdrop-blur-md text-slate-800 shadow flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {item.rating}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                {/* Creator info */}
                <div className="flex items-center justify-between gap-3">
                  <div
                    className="flex items-center gap-2.5 cursor-pointer"
                    onClick={() => viewProfile(item.creator.id)}
                  >
                    <img
                      src={item.creator.avatar}
                      alt={item.creator.name}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <span className="font-bold text-xs text-slate-900 hover:text-indigo-600 block leading-tight">
                        {item.creator.name}
                      </span>
                      <span className="text-[10px] text-slate-400 leading-tight">
                        {item.creator.role}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400">{item.createdAt}</span>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-slate-900 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Interaction Bar */}
            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleLikeShowcase(item.id)}
                  className={`flex items-center gap-1.5 transition-colors p-1 rounded-md hover:bg-slate-100 ${
                    item.hasLiked ? 'text-rose-600 font-bold' : 'hover:text-slate-800'
                  }`}
                  title="Like this work"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      item.hasLiked ? 'fill-rose-600 text-rose-600' : ''
                    }`}
                  />
                  <span>{item.likes}</span>
                </button>

                <button
                  onClick={() => setActiveCommentItemId(item.id)}
                  className="flex items-center gap-1.5 hover:text-slate-800 p-1 rounded-md hover:bg-slate-100 transition-colors"
                  title="View comments"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{item.commentsCount}</span>
                </button>
              </div>

              <button
                onClick={() => setActiveCommentItemId(item.id)}
                className="font-bold text-indigo-600 hover:text-indigo-800 text-xs flex items-center gap-1"
              >
                <span>Discussion</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mock Upload Work Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base">Upload Your Work to Showcase</h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUpload} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g., Sukabumi Heritage AI Audio Synth"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 outline-none text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Category *</label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 outline-none text-xs"
                  >
                    {categories.filter((c) => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={uploadTags}
                    onChange={(e) => setUploadTags(e.target.value)}
                    placeholder="React, Design, Python"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  placeholder="Describe the problem, technologies used, and your creative process..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 outline-none text-xs resize-none"
                />
              </div>

              {/* Preset Image Chooser */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">Select Thumbnail Preview</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-2">
                  {presetImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setUploadImage(img.url)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                        uploadImage === img.url
                          ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] text-white text-center py-0.5 truncate">
                        {img.label}
                      </span>
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={uploadImage}
                  onChange={(e) => setUploadImage(e.target.value)}
                  placeholder="Or paste an image URL..."
                  className="w-full p-2 rounded-lg border border-slate-200 text-[11px] text-slate-600 outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors shadow-sm"
                >
                  Publish to Feed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Comments Drawer / Modal */}
      {activeCommentItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{activeCommentItem.title}</h3>
                <span className="text-[11px] text-slate-500">by {activeCommentItem.creator.name}</span>
              </div>
              <button
                onClick={() => setActiveCommentItemId(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Existing Comments */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
              {activeCommentItem.comments && activeCommentItem.comments.length > 0 ? (
                activeCommentItem.comments.map((comm) => (
                  <div key={comm.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{comm.author}</span>
                      <span className="text-[10px] text-slate-400">{comm.time}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{comm.text}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs">
                  No comments yet. Be the first creator to share feedback!
                </div>
              )}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={(e) => handlePostComment(activeCommentItem.id, e)} className="flex gap-2 pt-2 border-t border-slate-100">
              <input
                type="text"
                value={newCommentInput}
                onChange={(e) => setNewCommentInput(e.target.value)}
                placeholder="Share your thoughts or technical critique..."
                className="flex-1 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs focus:bg-white focus:border-indigo-500 outline-none"
              />
              <button
                type="submit"
                className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
