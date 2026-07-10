'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Bookmark,
  Eye,
  ThumbsUp,
  Filter,
  X,
  ArrowRight,
  Sparkles,
  Building2,
  MapPin,
  Calendar,
  Globe,
  Award,
  BookOpen,
  ChevronRight
} from 'lucide-react';

import { organizationsData, categories } from '../data/organizationsData';

export default function OrganizationsClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [bookmarkedOrgs, setBookmarkedOrgs] = useState(new Set());
  const [likedOrgs, setLikedOrgs] = useState(new Set());

  const getCategoryColor = (category) => {
    const colors = {
      'Government': 'bg-blue-50 text-blue-700 border-blue-200/50',
      'University': 'bg-purple-50 text-purple-700 border-purple-200/50',
      'Association': 'bg-green-50 text-green-700 border-green-200/50',
      'Counseling & Prep': 'bg-amber-50 text-amber-700 border-amber-200/50',
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200/50';
  };

  const getCategoryBadgeColor = (category) => {
    const colors = {
      'Government': 'bg-blue-600 text-white',
      'University': 'bg-purple-600 text-white',
      'Association': 'bg-green-600 text-white',
      'Counseling & Prep': 'bg-amber-600 text-white',
    };
    return colors[category] || 'bg-gray-600 text-white';
  };

  const filteredOrgs = activeCategory === 'All'
    ? organizationsData
    : organizationsData.filter(org => org.category === activeCategory);

  const searchFilteredOrgs = searchTerm
    ? filteredOrgs.filter(org =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    : filteredOrgs;

  const handleBookmark = (e, orgId) => {
    e.preventDefault();
    e.stopPropagation();
    const newBookmarked = new Set(bookmarkedOrgs);
    if (newBookmarked.has(orgId)) {
      newBookmarked.delete(orgId);
    } else {
      newBookmarked.add(orgId);
    }
    setBookmarkedOrgs(newBookmarked);
  };

  const handleLike = (e, orgId) => {
    e.preventDefault();
    e.stopPropagation();
    const newLiked = new Set(likedOrgs);
    if (newLiked.has(orgId)) {
      newLiked.delete(orgId);
    } else {
      newLiked.add(orgId);
    }
    setLikedOrgs(newLiked);
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
            EduLink Institutional Directory
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Educational <span className="text-[#F2A900]">Organizations</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-base md:text-lg text-slate-200">
            Discover key ministries, universities, test prep administrators, and board authorities shaping education and scholarships in Nepal.
          </p>

          {/* Interactive Search */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-slate-200 p-1">
              <Search className="absolute left-4 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search organizations, services, policies, universities..."
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
        {/* Categories Selector */}
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

          {searchTerm && (
            <div className="text-sm text-slate-500 font-semibold bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              Found <span className="text-[#0B3C5D] font-bold">{searchFilteredOrgs.length}</span> matches
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

        {/* Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Grid: Organization Cards */}
          <div className="lg:col-span-2 space-y-8">
            {searchFilteredOrgs.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 size={28} />
                </div>
                <h3 className="font-bold text-lg text-slate-700">No Organizations Found</h3>
                <p className="text-slate-500 mt-1">Try tweaking your search term or select another category.</p>
                <button
                  onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                  className="mt-4 px-5 py-2 bg-[#0B3C5D] hover:bg-[#1c5277] text-white text-sm font-semibold rounded-xl transition-all"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {searchFilteredOrgs.map((org) => (
                  <Link href={`/organizations/${org.id}`} key={org.id} className="group block">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col md:flex-row transform hover:-translate-y-1">
                      {/* Left/Top Graphic Cover */}
                      <div className="relative md:w-56 h-48 md:h-auto overflow-hidden bg-slate-100 flex-shrink-0">
                        {org.image ? (
                          <img
                            src={org.image}
                            alt={org.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                            <Building2 size={40} />
                          </div>
                        )}
                        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${getCategoryBadgeColor(org.category)}`}>
                          {org.category}
                        </span>

                        <div className="absolute bottom-3 left-3 bg-white/95 text-slate-800 w-10 h-10 rounded-xl flex items-center justify-center shadow-md font-bold text-lg">
                          {org.logo}
                        </div>
                      </div>

                      {/* Right Panel Details */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0B3C5D] transition-colors leading-snug">
                                {org.name}
                              </h3>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 items-center text-xs text-slate-400 font-semibold mt-1">
                                <span className="flex items-center gap-1">
                                  <MapPin size={12} />
                                  {org.location.split(',')[0]}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar size={12} />
                                  Est. {org.established}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={(e) => handleBookmark(e, org.id)}
                              className={`p-2 rounded-full backdrop-blur-md shadow-sm transition-all flex-shrink-0 ${bookmarkedOrgs.has(org.id)
                                ? 'bg-[#F2A900] text-white border border-[#F2A900]'
                                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                                }`}
                            >
                              <Bookmark size={14} fill={bookmarkedOrgs.has(org.id) ? 'currentColor' : 'none'} />
                            </button>
                          </div>

                          <p className="text-slate-500 text-xs font-semibold mt-3.5 line-clamp-2 leading-relaxed">
                            {org.description}
                          </p>

                          {/* Key Services Badges */}
                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {org.services.slice(0, 3).map((service, idx) => (
                              <span key={idx} className="px-2.5 py-1 bg-slate-50 text-[10px] font-bold text-slate-500 border border-slate-150 rounded-lg">
                                ✓ {service.split(' & ')[0].split(' and ')[0].slice(0, 35)}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Action footer */}
                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={(e) => handleLike(e, org.id)}
                              className={`flex items-center gap-1 text-xs font-bold transition-colors ${likedOrgs.has(org.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                            >
                              <ThumbsUp size={13} fill={likedOrgs.has(org.id) ? 'currentColor' : 'none'} />
                              <span>{org.likes + (likedOrgs.has(org.id) ? 1 : 0)}</span>
                            </button>
                            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                              <Eye size={13} />
                              {formatNumber(org.views)} views
                            </span>
                          </div>

                          <span className="text-xs font-bold text-[#0B3C5D] group-hover:text-[#F2A900] transition-colors flex items-center gap-0.5">
                            Details
                            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Panel */}
          <div className="space-y-6">
            {/* Spotlight Widget */}
            <div className="bg-[#F2A900]/10 border border-[#F2A900]/20 rounded-2xl p-6 relative overflow-hidden">
              <Award className="text-[#F2A900] absolute right-4 top-4 opacity-15" size={60} />
              <span className="text-[10px] font-extrabold text-[#F2A900] uppercase tracking-wider bg-white/70 border border-[#F2A900]/30 px-2 py-0.5 rounded-md inline-block mb-3">
                Spotlight Service
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Overseas Study No Objection Certificate (NOC)</h3>
              <p className="text-slate-600 text-xs mt-1.5 leading-relaxed font-semibold">
                MoEST NOC facilitation is key for students preparing to pursue high education abroad. Check details of Ministry of Education to learn how to get an NOC easily!
              </p>
              <Link href="/organizations/1" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#0B3C5D] hover:underline">
                View MoEST Services
                <ArrowRight size={12} />
              </Link>
            </div>

            {/* Popular institutions */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-[#0B3C5D] flex items-center gap-2 mb-5 border-b border-slate-100 pb-3">
                <Building2 size={18} className="text-[#F2A900]" />
                Most Searched Centers
              </h3>

              <div className="space-y-4">
                {organizationsData.slice(0, 3).map((org, idx) => (
                  <Link href={`/organizations/${org.id}`} key={org.id} className="group flex gap-3 border-b border-slate-100 pb-3.5 last:border-b-0 last:pb-0">
                    <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200/50 text-base font-bold">
                      {org.logo}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 text-xs group-hover:text-[#0B3C5D] transition-colors leading-snug">
                        {org.name}
                      </h4>
                      <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-400 font-semibold">
                        <span>{org.category}</span>
                        <span className="flex items-center gap-0.5">
                          <ThumbsUp size={10} />
                          {org.likes}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Join Directory Banner */}
            <div className="bg-gradient-to-br from-[#0B3C5D] to-[#2d5f7f] text-white rounded-2xl p-6 shadow-lg shadow-blue-900/10">
              <h3 className="font-bold text-lg">Partner with EduLink</h3>
              <p className="text-slate-200 text-xs mt-1.5 leading-relaxed font-semibold">
                Are you an educational administrative department, university, boarding union, or counselor in Nepal? List your agency on EduLink.
              </p>
              <button className="w-full bg-[#F2A900] hover:bg-[#D9A100] text-[#0B3C5D] font-extrabold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md shadow-amber-500/20 mt-4">
                Request Listing Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
