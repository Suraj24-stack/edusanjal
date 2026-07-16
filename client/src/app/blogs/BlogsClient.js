'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Search,
  Bookmark,
  Eye,
  ThumbsUp,
  MessageCircle,
  Share2,
  Filter,
  X,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles
} from 'lucide-react';

// Static imports removed. Data loaded dynamically from backend.

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState(new Set());
  const [likedBlogs, setLikedBlogs] = useState(new Set());

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/blogs');
        const data = await res.json();
        if (data.success) {
          setBlogs(data.blogs);
        } else {
          setError(data.message || 'Failed to load blogs');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to connect to the server');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      'Study Tips': 'bg-blue-50 text-blue-700 border-blue-200/50',
      'Entrance Prep': 'bg-red-50 text-red-700 border-red-200/50',
      'Career Guidance': 'bg-green-50 text-green-700 border-green-200/50',
      'Scholarships': 'bg-purple-50 text-purple-700 border-purple-200/50',
      'Campus Life': 'bg-amber-50 text-amber-700 border-amber-200/50',
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200/50';
  };

  const getCategoryBadgeColor = (category) => {
    const colors = {
      'Study Tips': 'bg-blue-500 text-white',
      'Entrance Prep': 'bg-red-500 text-white',
      'Career Guidance': 'bg-green-500 text-white',
      'Scholarships': 'bg-purple-500 text-white',
      'Campus Life': 'bg-amber-500 text-white',
    };
    return colors[category] || 'bg-gray-500 text-white';
  };

  const featured = blogs.filter(b => b.is_featured);
  const recent = blogs.filter(b => b.is_recent);

  const filteredBlogs = activeCategory === 'All'
    ? featured
    : featured.filter(blog => blog.category === activeCategory);

  const filteredRecentBlogs = activeCategory === 'All'
    ? recent
    : recent.filter(blog => blog.category === activeCategory);

  const searchFilteredBlogs = searchTerm
    ? filteredBlogs.filter(blog =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.excerpt && blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    : filteredBlogs;

  const categoryNames = ['All', 'Study Tips', 'Entrance Prep', 'Career Guidance', 'Scholarships', 'Campus Life'];
  const dynamicCategories = categoryNames.map(name => ({
    name,
    count: name === 'All' 
      ? blogs.length 
      : blogs.filter(b => b.category === name).length
  }));

  const handleBookmark = (e, blogId) => {
    e.preventDefault();
    e.stopPropagation();
    const newBookmarked = new Set(bookmarkedBlogs);
    if (newBookmarked.has(blogId)) {
      newBookmarked.delete(blogId);
    } else {
      newBookmarked.add(blogId);
    }
    setBookmarkedBlogs(newBookmarked);
  };

  const handleLike = (e, blogId) => {
    e.preventDefault();
    e.stopPropagation();
    const newLiked = new Set(likedBlogs);
    if (newLiked.has(blogId)) {
      newLiked.delete(blogId);
    } else {
      newLiked.add(blogId);
    }
    setLikedBlogs(newLiked);
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
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
            EduLink Insights & Knowledge Hub
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            EduLink <span className="text-[#F2A900]">Blogs & Guides</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-base md:text-lg text-slate-200">
            Empowering students with smart study tactics, prep secrets, scholarship opportunities, and real-life campus insights in Nepal.
          </p>

          {/* Interactive Hero Search */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-slate-200 p-1">
              <Search className="absolute left-4 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search study tips, prep exams, career guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-transparent border-none outline-none text-slate-900 placeholder-slate-400 w-full focus:ring-0 rounded-lg text-sm md:text-base"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="p-2 text-slate-400 hover:text-slate-600 mr-2"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Listing Controls & Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Categories Selector & Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
          {/* Categories Pill View (Desktop) */}
          <div className="hidden md:flex flex-wrap gap-2">
            {dynamicCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-4.5 py-2 rounded-xl text-sm font-semibold border transition-all duration-300 ${activeCategory === category.name
                  ? 'bg-[#0B3C5D] text-white border-[#0B3C5D] shadow-md shadow-[#0B3C5D]/20 scale-105'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
                  }`}
              >
                {category.name}
                <span className={`text-xs ml-1.5 font-bold ${activeCategory === category.name ? 'text-white/80' : 'text-slate-400'}`}>
                  ({category.count})
                </span>
              </button>
            ))}
          </div>

          {/* Mobile Categories Trigger */}
          <div className="md:hidden flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 w-full">
            <span className="text-sm font-bold text-slate-600">
              Showing: <span className="text-[#0B3C5D]">{activeCategory}</span>
            </span>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold border border-slate-200 transition-colors"
            >
              <Filter size={14} />
              Filter Categories
            </button>
          </div>

          {/* Search Result Info */}
          {searchTerm && (
            <div className="text-sm text-slate-500 font-semibold bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              Found <span className="text-[#0B3C5D] font-bold">{searchFilteredBlogs.length}</span> matches
            </div>
          )}
        </div>

        {/* Mobile Filter Sheet */}
        {isFilterOpen && (
          <div className="md:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity">
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl p-6 transition-transform">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-[#0B3C5D]">Filter by Topic</h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {dynamicCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => {
                      setActiveCategory(category.name);
                      setIsFilterOpen(false);
                    }}
                    className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all text-center ${activeCategory === category.name
                      ? 'bg-[#0B3C5D] text-white border-[#0B3C5D]'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Grid: Blog Cards */}
          <div className="lg:col-span-2 space-y-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200 shadow-sm w-full animate-pulse">
                <BookOpen size={48} className="text-slate-300 animate-bounce" />
                <p className="text-slate-400 mt-4 font-semibold text-sm">Loading amazing articles...</p>
              </div>
            ) : error ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm w-full">
                <p className="text-red-500 font-semibold text-sm">{error}</p>
              </div>
            ) : searchFilteredBlogs.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm w-full">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={28} />
                </div>
                <h3 className="font-bold text-lg text-slate-700">No Articles Found</h3>
                <p className="text-slate-500 mt-1">Try tweaking your search term or select another category.</p>
                <button
                  onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                  className="mt-4 px-5 py-2 bg-[#0B3C5D] hover:bg-[#1c5277] text-white text-sm font-semibold rounded-xl transition-all"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {searchFilteredBlogs.map((blog) => (
                  <Link href={`/blogs/${blog.id}`} key={blog.id} className="group">
                    <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
                      {/* Image Frame */}
                      <div className="relative aspect-video overflow-hidden bg-slate-100">
                        {blog.image ? (
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <BookOpen size={48} />
                          </div>
                        )}
                        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${getCategoryBadgeColor(blog.category)}`}>
                          {blog.category}
                        </span>

                        <button
                          onClick={(e) => handleBookmark(e, blog.id)}
                          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md shadow-md transition-all ${bookmarkedBlogs.has(blog.id)
                            ? 'bg-[#F2A900] text-white border border-[#F2A900]'
                            : 'bg-white/90 text-slate-600 hover:bg-white border border-slate-200/50'
                            }`}
                        >
                          <Bookmark size={14} fill={bookmarkedBlogs.has(blog.id) ? 'currentColor' : 'none'} />
                        </button>
                      </div>

                      {/* Content Panel */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {blog.tags?.slice(0, 2).map(tag => (
                              <span key={tag} className="px-2 py-0.5 bg-slate-50 text-[10px] font-bold text-slate-400 border border-slate-100 rounded-md">
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0B3C5D] transition-colors leading-snug line-clamp-2">
                            {blog.title}
                          </h3>

                          <p className="text-slate-500 text-xs font-semibold mt-2.5 line-clamp-3 leading-relaxed">
                            {blog.excerpt}
                          </p>
                        </div>

                        {/* Author & Actions Panel */}
                        <div className="mt-5 pt-4 border-t border-slate-100">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              {blog.authorImage ? (
                                <img
                                  src={blog.authorImage}
                                  alt={blog.author}
                                  className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-100"
                                />
                              ) : (
                                <div className="w-7 h-7 bg-[#0B3C5D]/10 rounded-full flex items-center justify-center text-xs font-bold text-[#0B3C5D]">
                                  {blog.author?.charAt(0)}
                                </div>
                              )}
                              <div>
                                <h4 className="text-xs font-bold text-slate-800">{blog.author}</h4>
                                <p className="text-[10px] text-slate-400 font-semibold">{blog.date}</p>
                              </div>
                            </div>

                            <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                              <Clock size={11} />
                              {blog.readTime}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={(e) => handleLike(e, blog.id)}
                                className={`flex items-center gap-1 text-[11px] font-bold transition-colors ${likedBlogs.has(blog.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                              >
                                <ThumbsUp size={13} fill={likedBlogs.has(blog.id) ? 'currentColor' : 'none'} />
                                <span>{blog.likes + (likedBlogs.has(blog.id) ? 1 : 0)}</span>
                              </button>
                              <div className="flex items-center gap-1 text-[11px] text-slate-400 font-bold">
                                <MessageCircle size={13} />
                                <span>{blog.comments}</span>
                              </div>
                            </div>

                            <span className="text-xs font-bold text-[#0B3C5D] group-hover:text-[#F2A900] transition-colors flex items-center gap-0.5">
                              Read More
                              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Announcement / Quote widget */}
            <div className="bg-[#F2A900]/10 border border-[#F2A900]/20 rounded-2xl p-6 relative overflow-hidden">
              <Award className="text-[#F2A900] absolute right-4 top-4 opacity-15" size={60} />
              <span className="text-[10px] font-extrabold text-[#F2A900] uppercase tracking-wider bg-white/70 border border-[#F2A900]/30 px-2 py-0.5 rounded-md inline-block mb-3">
                Academy Spotlight
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Need entrance guidance?</h3>
              <p className="text-slate-600 text-xs mt-1.5 leading-relaxed font-semibold">
                Explore our detailed course guides and check out participating colleges inside the colleges panel to align your goals!
              </p>
              <Link href="/courses" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#0B3C5D] hover:underline">
                View course directory
                <ArrowRight size={12} />
              </Link>
            </div>

            {/* Trending / Recent short articles list */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-[#0B3C5D] flex items-center gap-2 mb-5 border-b border-slate-100 pb-3">
                <TrendingUp size={18} className="text-[#F2A900]" />
                Recent Popular Reads
              </h3>

              <div className="space-y-4">
                {filteredRecentBlogs.slice(0, 4).map((blog, idx) => (
                  <article key={blog.id} className="group flex gap-3 border-b border-slate-100 pb-3.5 last:border-b-0 last:pb-0">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${idx < 2 ? 'bg-[#0B3C5D] text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      {blog.isNew && (
                        <span className="px-1.5 py-0.5 bg-red-500 text-white text-[8px] font-extrabold rounded-md uppercase tracking-wider mb-1 inline-block">
                          New
                        </span>
                      )}
                      <h4 className="font-bold text-slate-800 text-xs group-hover:text-[#0B3C5D] cursor-pointer transition-colors leading-snug line-clamp-2">
                        {blog.title}
                      </h4>
                      <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400 font-semibold">
                        <span>{blog.date}</span>
                        <span className="flex items-center gap-0.5">
                          <Eye size={10} />
                          {formatNumber(blog.views)}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Newsletter form */}
            <div className="bg-gradient-to-br from-[#0B3C5D] to-[#2d5f7f] text-white rounded-2xl p-6 shadow-lg shadow-blue-900/10">
              <h3 className="font-bold text-lg">Receive Prep Reminders</h3>
              <p className="text-slate-200 text-xs mt-1.5 leading-relaxed font-semibold">
                Get monthly notifications about scholarships, entrance schedules, and exclusive college application tips in Nepal.
              </p>
              <div className="mt-4 space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-[#F2A900] text-xs"
                />
                <button className="w-full bg-[#F2A900] hover:bg-[#D9A100] text-[#0B3C5D] font-extrabold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md shadow-amber-500/20">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
