'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  Eye,
  Share2,
  Search,
  PlusCircle,
  Calendar,
  X,
  Send,
  MessageCircle,
  Tag,
  TrendingUp,
  AlertCircle,
  Sparkles
} from 'lucide-react';

import { initialPosts, categories } from '../data/postsData';

export default function PostsPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Selected post for Detail view/comments
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  
  // Create Post Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [newTags, setNewTags] = useState('');

  // Likes tracker
  const [likedPosts, setLikedPosts] = useState(new Set());

  const handleLike = (e, postId) => {
    e.stopPropagation();
    const updatedLiked = new Set(likedPosts);
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        if (updatedLiked.has(postId)) {
          updatedLiked.delete(postId);
          return { ...post, likes: post.likes - 1 };
        } else {
          updatedLiked.add(postId);
          return { ...post, likes: post.likes + 1 };
        }
      }
      return post;
    });
    setPosts(updatedPosts);
    setLikedPosts(updatedLiked);

    // If modal is open, sync the selected post state as well
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => ({
        ...prev,
        likes: updatedLiked.has(postId) ? prev.likes + 1 : prev.likes - 1
      }));
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim() || !selectedPost) return;

    const newComment = {
      id: Date.now(),
      author: "You (Student User)",
      authorRole: "Student",
      authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      content: commentText,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const updatedPosts = posts.map(post => {
      if (post.id === selectedPost.id) {
        return {
          ...post,
          commentsCount: post.commentsCount + 1,
          comments: [...(post.comments || []), newComment]
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    setSelectedPost(prev => ({
      ...prev,
      commentsCount: prev.commentsCount + 1,
      comments: [...(prev.comments || []), newComment]
    }));
    setCommentText('');
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const tagsArr = newTags.split(',').map(tag => tag.trim()).filter(tag => tag !== "");

    const newPostObj = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
      category: newCategory,
      author: "Guest Student",
      authorRole: "Aspirant",
      authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      likes: 0,
      commentsCount: 0,
      views: 1,
      tags: tagsArr.length > 0 ? tagsArr : ["StudentLife"],
      comments: []
    };

    setPosts([newPostObj, ...posts]);
    setIsCreateOpen(false);
    
    // Reset Form
    setNewTitle('');
    setNewContent('');
    setNewCategory('General');
    setNewTags('');
  };

  // Filter posts based on active category and search term
  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const getCategoryTagColor = (category) => {
    const colors = {
      'Notices': 'bg-red-50 text-red-700 border-red-200/50',
      'Q&A': 'bg-blue-50 text-blue-700 border-blue-200/50',
      'Study Groups': 'bg-green-50 text-green-700 border-green-200/50',
      'General': 'bg-amber-50 text-amber-700 border-amber-200/50',
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200/50';
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-16">
      {/* Premium Hero Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0B3C5D] via-[#1d5073] to-[#2d5f7f] text-white py-16 px-4">
        {/* Subtle decorative background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute -bottom-20 left-10 w-80 h-80 bg-white/5 rounded-full blur-2xl"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-xs font-semibold rounded-full border border-white/20 mb-4 animate-pulse">
            <Sparkles size={12} className="text-[#F2A900]" />
            EduLink Student Forums & Announcements
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            EduLink <span className="text-[#F2A900]">Community Board</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-base md:text-lg text-slate-200">
            Join the conversation, ask questions about colleges and courses, share preparation materials, and stay updated with official notices.
          </p>

          {/* Search bar & Create Post CTA */}
          <div className="mt-8 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-slate-200 p-1 flex-grow w-full">
              <Search className="absolute left-4 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search posts, topics, notices, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-transparent border-none outline-none text-slate-900 placeholder-slate-400 w-full focus:ring-0 rounded-lg text-sm md:text-base"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="p-2 text-slate-400 hover:text-slate-600 mr-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F2A900] hover:bg-[#d69600] text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
            >
              <PlusCircle size={20} />
              <span>Create Post</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Listing Controls & Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Category selection card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Tag size={18} className="text-[#0B3C5D]" />
                Filter Category
              </h2>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${activeCategory === cat
                      ? 'bg-[#0B3C5D] text-white border-[#0B3C5D] shadow-sm'
                      : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50 hover:border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform statistics card */}
            <div className="bg-gradient-to-br from-[#0B3C5D] to-[#1d5073] text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4">
                <TrendingUp size={160} />
              </div>
              <h2 className="text-base font-extrabold mb-3 flex items-center gap-1.5">
                <Sparkles size={16} className="text-[#F2A900]" />
                Forum Guidelines
              </h2>
              <ul className="text-xs space-y-2.5 text-slate-200 leading-relaxed list-disc pl-4">
                <li>Keep discussions educational, respectful, and support-oriented.</li>
                <li>Cite sources for academic news or exam schedule extensions.</li>
                <li>Do not publish copyrighted exam materials or questions.</li>
              </ul>
            </div>
          </div>

          {/* Posts List Feed */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-xl font-bold text-slate-900">
                {activeCategory} Discussions
              </h2>
              <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-2.5 py-1 rounded-full">
                {filteredPosts.length} posts found
              </span>
            </div>

            {/* Post Feed List */}
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 p-6 cursor-pointer space-y-4"
              >
                {/* Header Author Info */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.authorImage}
                      alt={post.author}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    <div>
                      <span className="block font-bold text-sm text-slate-900">{post.author}</span>
                      <span className="text-xs text-slate-500 font-semibold">{post.authorRole}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryTagColor(post.category)}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar size={13} />
                      {post.date}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-900 hover:text-[#0B3C5D] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed line-clamp-3">
                    {post.content}
                  </p>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors rounded text-xs font-semibold border border-slate-100"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer Interactions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4 text-slate-500 text-xs font-semibold">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={(e) => handleLike(e, post.id)}
                      className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-slate-50 transition-colors ${likedPosts.has(post.id) ? 'text-red-500 animate-pulse' : 'text-slate-500'}`}
                    >
                      <ThumbsUp size={16} className={likedPosts.has(post.id) ? 'fill-current' : ''} />
                      <span>{post.likes}</span>
                    </button>
                    <div className="flex items-center gap-1.5 py-1.5 px-3">
                      <MessageSquare size={16} />
                      <span>{post.commentsCount} comments</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      <span>{post.views} views</span>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(window.location.origin + `/posts?id=${post.id}`);
                        alert("Post link copied to clipboard!");
                      }}
                      className="p-1.5 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-all"
                      title="Copy link to post"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty Search/Filter State */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <AlertCircle size={48} className="mx-auto text-slate-300 mb-4 animate-pulse" />
                <h3 className="text-lg font-bold text-slate-900">No Posts Found</h3>
                <p className="text-slate-500 mt-2 max-w-sm mx-auto text-sm leading-relaxed">
                  We couldn't find any threads matching your search criteria or selected category tab. Try typing a different keyword or tag.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('All');
                  }}
                  className="mt-6 px-5 py-2.5 bg-[#0B3C5D] hover:bg-[#1d5073] text-white text-sm font-semibold rounded-xl shadow transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox / Post Details Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <img
                  src={selectedPost.authorImage}
                  alt={selectedPost.author}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <span className="block font-bold text-sm text-slate-900 leading-tight">{selectedPost.author}</span>
                  <span className="text-[11px] text-slate-500 font-semibold">{selectedPost.authorRole}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-grow">
              {/* Category, Title, Content */}
              <div className="space-y-3">
                <span className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-full border ${getCategoryTagColor(selectedPost.category)}`}>
                  {selectedPost.category}
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-snug">
                  {selectedPost.title}
                </h3>
                <p className="text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  {selectedPost.content}
                </p>
              </div>

              {/* Tags */}
              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-xs font-semibold border border-slate-100"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Meta stats bar */}
              <div className="flex items-center justify-between border-t border-b border-slate-100 py-3 text-xs text-slate-500 font-semibold">
                <div className="flex items-center gap-6">
                  <button
                    onClick={(e) => handleLike(e, selectedPost.id)}
                    className={`flex items-center gap-1.5 ${likedPosts.has(selectedPost.id) ? 'text-red-500' : 'hover:text-[#0B3C5D]'}`}
                  >
                    <ThumbsUp size={16} className={likedPosts.has(selectedPost.id) ? 'fill-current' : ''} />
                    <span>{selectedPost.likes} Likes</span>
                  </button>
                  <span className="flex items-center gap-1.5">
                    <MessageSquare size={16} />
                    <span>{selectedPost.commentsCount} Comments</span>
                  </span>
                </div>
                <span>{selectedPost.views} Views</span>
              </div>

              {/* Comments Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-extrabold text-slate-950 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageCircle size={16} className="text-[#0B3C5D]" />
                  Comments Feed
                </h4>

                <div className="space-y-4">
                  {selectedPost.comments && selectedPost.comments.length > 0 ? (
                    selectedPost.comments.map((comment) => (
                      <div key={comment.id} className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={comment.authorImage}
                              alt={comment.author}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                            <div>
                              <span className="block font-bold text-xs text-slate-900">{comment.author}</span>
                              <span className="text-[10px] text-slate-400 font-semibold">{comment.authorRole}</span>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-400 font-semibold">{comment.date}</span>
                        </div>
                        <p className="text-slate-700 text-xs md:text-sm leading-relaxed pl-9">
                          {comment.content}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic text-center py-4">No comments yet. Start the discussion below!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Comment Input Footer */}
            <form onSubmit={handleAddComment} className="p-4 border-t border-slate-100 bg-slate-50 sticky bottom-0 z-10 flex gap-2">
              <input
                type="text"
                placeholder="Write a supportive comment/answer..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-grow px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#0B3C5D] focus:border-[#0B3C5D] bg-white text-slate-900"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="p-2.5 bg-[#0B3C5D] hover:bg-[#1d5073] disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors shadow-sm flex items-center justify-center flex-shrink-0"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">Create New Community Post</h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreatePost} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Post Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Help needed with NEB Grade 12 Re-exam registration form"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#0B3C5D] focus:border-[#0B3C5D] text-slate-900 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#0B3C5D] focus:border-[#0B3C5D] text-slate-900 bg-white"
                  >
                    <option value="Notices">Notices</option>
                    <option value="Q&A">Q&A</option>
                    <option value="Study Groups">Study Groups</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. NEB, Exam, Help"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#0B3C5D] focus:border-[#0B3C5D] text-slate-900 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Content Details</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Explain your query, study material download instructions, or details of the notice in detail..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#0B3C5D] focus:border-[#0B3C5D] text-slate-900 bg-white resize-none"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100 justify-end">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0B3C5D] hover:bg-[#1d5073] text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
