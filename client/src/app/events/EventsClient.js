'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Search,
  Bookmark,
  MapPin,
  Filter,
  X,
  ArrowRight,
  Sparkles,
  Share2,
  CheckCircle2,
  Users,
  Award,
  Video,
  ExternalLink
} from 'lucide-react';

import { featuredEvents, upcomingEvents, categories } from '../data/eventsData';

export default function EventsClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [bookmarkedEvents, setBookmarkedEvents] = useState(new Set());
  const [registeredEvents, setRegisteredEvents] = useState(new Set());
  const [isShareAlertVisible, setIsShareAlertVisible] = useState(false);

  const getCategoryColor = (category) => {
    const colors = {
      'Expos & Fairs': 'bg-blue-50 text-blue-700 border-blue-200/50',
      'Webinars & Seminars': 'bg-purple-50 text-purple-700 border-purple-200/50',
      'Workshops & Training': 'bg-green-50 text-green-700 border-green-200/50',
      'Prep & Exams': 'bg-red-50 text-red-700 border-red-200/50',
      'Admissions & Open Days': 'bg-amber-50 text-amber-700 border-amber-200/50',
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200/50';
  };

  const getCategoryBadgeColor = (category) => {
    const colors = {
      'Expos & Fairs': 'bg-blue-600 text-white',
      'Webinars & Seminars': 'bg-purple-600 text-white',
      'Workshops & Training': 'bg-green-600 text-white',
      'Prep & Exams': 'bg-red-600 text-white',
      'Admissions & Open Days': 'bg-amber-600 text-white',
    };
    return colors[category] || 'bg-gray-600 text-white';
  };

  // Combine featured and upcoming lists for filtering
  const allEvents = [...featuredEvents, ...upcomingEvents];

  const filteredEvents = activeCategory === 'All'
    ? allEvents
    : allEvents.filter(event => event.category === activeCategory);

  const searchFilteredEvents = searchTerm
    ? filteredEvents.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.host.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    : filteredEvents;

  const handleBookmark = (e, eventId) => {
    e.preventDefault();
    e.stopPropagation();
    const newBookmarked = new Set(bookmarkedEvents);
    if (newBookmarked.has(eventId)) {
      newBookmarked.delete(eventId);
    } else {
      newBookmarked.add(eventId);
    }
    setBookmarkedEvents(newBookmarked);
  };

  const handleRegister = (e, eventId) => {
    e.preventDefault();
    e.stopPropagation();
    const newRegistered = new Set(registeredEvents);
    if (newRegistered.has(eventId)) {
      newRegistered.delete(eventId);
    } else {
      newRegistered.add(eventId);
    }
    setRegisteredEvents(newRegistered);
  };

  const handleShareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShareAlertVisible(true);
    setTimeout(() => setIsShareAlertVisible(false), 2500);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '/events');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-16">
      {/* Toast Alert for Copying Link */}
      {isShareAlertVisible && (
        <div className="fixed bottom-5 right-5 bg-slate-900 text-white py-3 px-5 rounded-xl shadow-2xl z-[90] flex items-center gap-2 text-xs font-bold transition-all border border-slate-800 animate-bounce">
          <Sparkles size={14} className="text-[#F2A900]" />
          Events directory link copied!
        </div>
      )}

      {/* Premium Hero Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0B3C5D] via-[#1d5073] to-[#2d5f7f] text-white py-16 px-4">
        {/* Subtle decorative background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute -bottom-20 left-10 w-80 h-80 bg-white/5 rounded-full blur-2xl"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-xs font-semibold rounded-full border border-white/20 mb-4 animate-pulse">
            <Sparkles size={12} className="text-[#F2A900]" />
            EduLink Educational Events Hub
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Education <span className="text-[#F2A900]">Events & Expos</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-base md:text-lg text-slate-200">
            Never miss an opportunity. Register for college fairs, scholarship webinars, skill-building workshops, and academic prep sessions in Nepal.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-slate-200 p-1">
              <Search className="absolute left-4 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search college expos, scholarship webinars, prep sessions..."
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
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-4.5 py-2 rounded-xl text-sm font-semibold border transition-all duration-300 ${activeCategory === category.name
                  ? 'bg-[#0B3C5D] text-white border-[#0B3C5D] shadow-md shadow-[#0B3C5D]/20 scale-105'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Mobile Categories Trigger */}
          <div className="md:hidden flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 w-full">
            <span className="text-sm font-bold text-slate-600">
              Category: <span className="text-[#0B3C5D]">{activeCategory}</span>
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
              Found <span className="text-[#0B3C5D] font-bold">{searchFilteredEvents.length}</span> matches
            </div>
          )}
        </div>

        {/* Mobile Filter Sheet */}
        {isFilterOpen && (
          <div className="md:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity">
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl p-6 transition-transform">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-[#0B3C5D]">Filter by Type</h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {categories.map((category) => (
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
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Grid: Event Cards */}
          <div className="lg:col-span-2 space-y-8">
            {searchFilteredEvents.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar size={28} />
                </div>
                <h3 className="font-bold text-lg text-slate-700">No Events Found</h3>
                <p className="text-slate-500 mt-1">Try resetting your search query or choosing another category.</p>
                <button
                  onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                  className="mt-4 px-5 py-2 bg-[#0B3C5D] hover:bg-[#1c5277] text-white text-sm font-semibold rounded-xl transition-all"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {searchFilteredEvents.map((event) => {
                  const isRegistered = registeredEvents.has(event.id);
                  const displayCapacity = event.capacity - (isRegistered ? event.registeredCount + 1 : event.registeredCount);
                  
                  return (
                    <Link href={`/events/${event.id}`} key={event.id} className="group">
                      <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
                        {/* Event Cover Image */}
                        <div className="relative aspect-video overflow-hidden bg-slate-100">
                          {event.image ? (
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <Calendar size={48} />
                            </div>
                          )}
                          <span className={`absolute top-3 left-3 px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${getCategoryBadgeColor(event.category)}`}>
                            {event.category}
                          </span>

                          <button
                            onClick={(e) => handleBookmark(e, event.id)}
                            className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md shadow-md transition-all ${bookmarkedEvents.has(event.id)
                              ? 'bg-[#F2A900] text-white border border-[#F2A900]'
                              : 'bg-white/90 text-slate-600 hover:bg-white border border-slate-200/50'
                              }`}
                          >
                            <Bookmark size={14} fill={bookmarkedEvents.has(event.id) ? 'currentColor' : 'none'} />
                          </button>
                        </div>

                        {/* Content Panel */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            {/* Meta items */}
                            <div className="flex items-center gap-3 text-[11px] text-slate-400 font-bold mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar size={12} className="text-slate-400" />
                                {event.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={12} className="text-slate-400" />
                                {event.time}
                              </span>
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0B3C5D] transition-colors leading-snug line-clamp-2">
                              {event.title}
                            </h3>

                            <p className="text-slate-500 text-xs font-semibold mt-2.5 line-clamp-3 leading-relaxed">
                              {event.excerpt}
                            </p>

                            {/* Venue info */}
                            <div className="mt-4 flex items-start gap-1.5 text-xs text-slate-600 font-semibold bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                              <MapPin size={14} className="text-[#0B3C5D] shrink-0 mt-0.5" />
                              <div className="line-clamp-2">
                                <p className="font-bold text-slate-800">{event.venue}</p>
                                <p className="text-slate-500 text-[10px]">{event.location}</p>
                              </div>
                            </div>
                          </div>

                          {/* Footer Action Panel */}
                          <div className="mt-6 pt-4 border-t border-slate-100">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[10px] font-bold text-slate-400">
                                Host: <span className="text-slate-700">{event.host}</span>
                              </span>
                              <span className="text-[10px] font-extrabold text-slate-500 bg-slate-100 py-0.5 px-2 rounded-md">
                                {displayCapacity} seats left
                              </span>
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={(e) => handleRegister(e, event.id)}
                                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${isRegistered
                                  ? 'bg-green-500 text-white border-green-500 hover:bg-green-600 shadow-md shadow-green-500/10'
                                  : 'bg-gradient-to-r from-[#F2A900] to-[#D9A100] hover:from-[#D9A100] hover:to-[#C09000] text-[#0B3C5D] border-transparent hover:shadow-md'
                                  }`}
                              >
                                {isRegistered ? (
                                  <>
                                    <CheckCircle2 size={13} />
                                    Registered
                                  </>
                                ) : (
                                  'Register Now'
                                )}
                              </button>
                              
                              <button
                                className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all font-bold text-xs"
                              >
                                Info
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Spotlight Widget */}
            <div className="bg-[#F2A900]/10 border border-[#F2A900]/20 rounded-2xl p-6 relative overflow-hidden">
              <Award className="text-[#F2A900] absolute right-4 top-4 opacity-15" size={60} />
              <span className="text-[10px] font-extrabold text-[#F2A900] uppercase tracking-wider bg-white/70 border border-[#F2A900]/30 px-2 py-0.5 rounded-md inline-block mb-3">
                Admission Fair
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Register for Admission Fair</h3>
              <p className="text-slate-600 text-xs mt-1.5 leading-relaxed font-semibold">
                Evaluate university credentials, get 1-on-1 counseling, and win scholarship slots. Over 50 constituent campuses participating.
              </p>
              <Link href="/events/1" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#0B3C5D] hover:underline">
                View Event details
                <ArrowRight size={12} />
              </Link>
            </div>

            {/* Share Widget */}
            <button
              onClick={handleShareClick}
              className="w-full flex items-center justify-center gap-2 p-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 shadow-sm transition-all"
            >
              <Share2 size={16} className="text-[#0B3C5D]" />
              <span className="text-sm font-bold text-slate-700">Share Events Directory</span>
            </button>

            {/* Newsletter widget */}
            <div className="bg-gradient-to-br from-[#0B3C5D] to-[#2d5f7f] text-white rounded-2xl p-6 shadow-lg shadow-blue-900/10">
              <h3 className="font-bold text-lg">Never Miss an Event</h3>
              <p className="text-slate-200 text-xs mt-1.5 leading-relaxed font-semibold">
                Join our newsletter list to receive email notifications and alerts regarding upcoming college open days and seminars in Nepal.
              </p>
              <div className="mt-4 space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-[#F2A900] text-xs"
                />
                <button className="w-full bg-[#F2A900] hover:bg-[#D9A100] text-[#0B3C5D] font-extrabold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md shadow-amber-500/20">
                  Subscribe for Alerts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
