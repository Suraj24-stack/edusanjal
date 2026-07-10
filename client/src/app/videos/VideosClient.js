'use client';

import React, { useState } from 'react';
import {
  Play,
  Search,
  Calendar,
  Eye,
  Clock,
  Sparkles,
  X,
  ArrowRight,
  ChevronRight,
  Video
} from 'lucide-react';

import { featuredVideos, recentVideos, categories } from '../data/videosData';

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const getCategoryColor = (category) => {
    const colors = {
      'Entrance Prep': 'bg-red-50 text-red-700 border-red-200/50',
      'Campus Tours': 'bg-blue-50 text-blue-700 border-blue-200/50',
      'Career Advice': 'bg-green-50 text-green-700 border-green-200/50',
      'Scholarship Guides': 'bg-purple-50 text-purple-700 border-purple-200/50',
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200/50';
  };

  const getCategoryBadgeColor = (category) => {
    const colors = {
      'Entrance Prep': 'bg-red-500 text-white',
      'Campus Tours': 'bg-blue-500 text-white',
      'Career Advice': 'bg-green-500 text-white',
      'Scholarship Guides': 'bg-purple-500 text-white',
    };
    return colors[category] || 'bg-gray-500 text-white';
  };

  // Filter video arrays based on category
  const filteredFeatured = activeCategory === 'All'
    ? featuredVideos
    : featuredVideos.filter(vid => vid.category === activeCategory);

  const filteredRecent = activeCategory === 'All'
    ? recentVideos
    : recentVideos.filter(vid => vid.category === activeCategory);

  // Search filter
  const filterBySearch = (list) => {
    if (!searchTerm) return list;
    return list.filter(vid =>
      vid.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vid.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vid.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const displayFeatured = filterBySearch(filteredFeatured);
  const displayRecent = filterBySearch(filteredRecent);
  const allDisplayVideos = [...displayFeatured, ...displayRecent];

  const formatViews = (num) => {
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
            EduLink Video Hub & Lectures
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            EduLink <span className="text-[#F2A900]">Video Library</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-base md:text-lg text-slate-200">
            Explore campus virtual tours, watch preparation tutorials, and gain key insights from academic counseling specialists in Nepal.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-slate-200 p-1">
              <Search className="absolute left-4 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search lectures, college tours, prep guidelines..."
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
          </div>
        </div>
      </div>

      {/* Main Listing Controls & Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Categories Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border whitespace-nowrap ${activeCategory === category
                  ? 'bg-[#0B3C5D] text-white border-[#0B3C5D] shadow-md shadow-slate-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-[#0B3C5D]'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="text-sm font-medium text-slate-500">
            Showing {allDisplayVideos.length} {allDisplayVideos.length === 1 ? 'video' : 'videos'}
          </div>
        </div>

        {/* Featured Section */}
        {displayFeatured.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <Sparkles className="text-[#F2A900]" size={20} />
              Featured Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayFeatured.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
                >
                  {/* Aspect ratio video thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/90 group-hover:bg-white text-[#0B3C5D] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                        <Play size={24} className="fill-current ml-1 text-[#0B3C5D]" />
                      </div>
                    </div>
                    {/* Duration badge */}
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-semibold rounded-md flex items-center gap-1">
                      <Clock size={12} />
                      {video.duration}
                    </div>
                    {/* Category overlay */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-[#0B3C5D]/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                        {video.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-[#0B3C5D] transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="mt-2.5 text-slate-600 text-sm leading-relaxed line-clamp-2 flex-grow">
                      {video.excerpt}
                    </p>

                    {/* Meta info & Author */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={video.authorImage}
                          alt={video.author}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100"
                        />
                        <span className="text-xs font-semibold text-slate-700">
                          {video.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                        <span className="flex items-center gap-1">
                          <Eye size={14} />
                          {formatViews(video.views)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {video.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Videos Grid */}
        {displayRecent.length > 0 && (
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <Video className="text-[#0B3C5D]" size={20} />
              Educational Lectures & Tours
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayRecent.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/30 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 group-hover:bg-white text-[#0B3C5D] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300">
                        <Play size={20} className="fill-current ml-1 text-[#0B3C5D]" />
                      </div>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-semibold rounded flex items-center gap-1">
                      <Clock size={11} />
                      {video.duration}
                    </div>
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-0.5 bg-[#0B3C5D]/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-full">
                        {video.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#0B3C5D] transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="mt-2 text-slate-600 text-xs leading-relaxed line-clamp-2 flex-grow">
                      {video.excerpt}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={video.authorImage}
                          alt={video.author}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-[11px] font-semibold text-slate-700">
                          {video.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] font-medium text-slate-500">
                        <span className="flex items-center gap-0.5">
                          <Eye size={12} />
                          {formatViews(video.views)}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Calendar size={12} />
                          {video.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty Search/Filter State */}
        {allDisplayVideos.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm mt-8">
            <Video size={48} className="mx-auto text-slate-300 mb-4 animate-bounce" />
            <h3 className="text-lg font-bold text-slate-900">No Videos Found</h3>
            <p className="text-slate-500 mt-2 max-w-sm mx-auto text-sm">
              We couldn't find any videos matching your search query or selected category. Let's try searching for another topic.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('All');
              }}
              className="mt-6 px-5 py-2 bg-[#0B3C5D] hover:bg-[#1d5073] text-white text-sm font-semibold rounded-lg shadow transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Lightbox / Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-full mb-1.5 ${getCategoryBadgeColor(selectedVideo.category)}`}>
                  {selectedVideo.category}
                </span>
                <h3 className="text-base md:text-lg font-bold text-slate-900 leading-snug line-clamp-1 pr-4">
                  {selectedVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Video Player Iframe */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                className="absolute inset-0 w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Modal Footer Description */}
            <div className="p-6 bg-white border-t border-slate-100">
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                {selectedVideo.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedVideo.authorImage}
                    alt={selectedVideo.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <span className="block font-bold text-slate-800">{selectedVideo.author}</span>
                    <span className="block text-[10px] text-slate-400">EduLink Instructor</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Eye size={14} />
                    {formatViews(selectedVideo.views)} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    Uploaded on {selectedVideo.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
