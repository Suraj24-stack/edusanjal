'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  X,
  Clock,
  TrendingUp,
  MapPin,
  Star,
  BookOpen,
  Building2,
  GraduationCap,
  Briefcase,
  Calendar,
  ChevronRight,
  Mic,
  Camera,
  Sparkles,
  Zap,
  ArrowRight,
  History,
  Heart,
  Users,
  Globe
} from 'lucide-react';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [focusedResult, setFocusedResult] = useState(-1);
  const searchRef = useRef(null);
  const filterRef = useRef(null);

  const searchCategories = [
    {
      id: 'all',
      name: 'All',
      icon: Search,
      gradient: 'from-gray-500 to-gray-600',
      count: '2.3K'
    },
    {
      id: 'courses',
      name: 'Courses',
      icon: BookOpen,
      gradient: 'from-[#0B3C5D] to-[#0B3C5D]/90',
      count: '856'
    },
    {
      id: 'colleges',
      name: 'Colleges',
      icon: Building2,
      gradient: 'from-green-500 to-emerald-600',
      count: '342'
    },
    {
      id: 'schools',
      name: 'Schools',
      icon: GraduationCap,
      gradient: 'from-purple-500 to-purple-600',
      count: '654'
    },
    {
      id: 'jobs',
      name: 'Jobs',
      icon: Briefcase,
      gradient: 'from-[#F2A900] to-[#D9A100]',
      count: '123'
    },
    {
      id: 'events',
      name: 'Events',
      icon: Calendar,
      gradient: 'from-pink-500 to-rose-600',
      count: '89'
    },
  ];

  const popularSearches = [
    { term: 'Computer Science', trend: '+12%', icon: '💻' },
    { term: 'Engineering Colleges', trend: '+8%', icon: '🏗️' },
    { term: 'Medical Schools', trend: '+15%', icon: '🏥' },
    { term: 'Business Administration', trend: '+5%', icon: '📊' },
    { term: 'Teaching Jobs', trend: '+10%', icon: '👨‍🏫' },
    { term: 'Scholarship Programs', trend: '+20%', icon: '🎓' },
    { term: 'Online Courses', trend: '+25%', icon: '🌐' },
    { term: 'International Universities', trend: '+18%', icon: '🌍' }
  ];

  const quickFilters = [
    { name: 'Top Rated', icon: Star, color: 'text-[#F2A900]', bg: 'bg-[#F2A900]/10', border: 'border-[#F2A900]/30' },
    { name: 'Latest', icon: Zap, color: 'text-[#0B3C5D]', bg: 'bg-[#0B3C5D]/10', border: 'border-[#0B3C5D]/30' },
    { name: 'Near Me', icon: MapPin, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200' },
    { name: 'Free', icon: Heart, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
  ];

  const mockResults = [
    {
      id: 1,
      title: 'Computer Science Engineering',
      subtitle: 'Bachelor of Technology • 4 Years',
      category: 'courses',
      location: 'Kathmandu',
      rating: 4.8,
      reviews: 234,
      price: 'NPR 50,000/year',
      image: '🖥️',
      verified: true,
      popular: true,
      students: '2.5K+'
    },
    {
      id: 2,
      title: 'Tribhuvan University',
      subtitle: 'Top Public University • Established 1959',
      category: 'colleges',
      location: 'Kirtipur',
      rating: 4.6,
      reviews: 1250,
      price: 'NPR 25,000/year',
      image: '🏛️',
      verified: true,
      popular: false,
      students: '50K+'
    },
    {
      id: 3,
      title: 'Software Developer',
      subtitle: 'Full-time • Tech Company',
      category: 'jobs',
      location: 'Lalitpur',
      rating: 4.9,
      reviews: 89,
      price: 'NPR 80,000/month',
      image: '💼',
      verified: true,
      popular: true,
      students: '12 openings'
    }
  ];

  // Get the current category
  const currentCategory = searchCategories.find(cat => cat.id === selectedCategory) || searchCategories[0];

  // Handle search input with debounce
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setIsSearchOpen(true);
    setFocusedResult(-1);
  };

  // Handle search submission
  const submitSearch = () => {
    // Always close search dropdown on submit button click
    setIsSearchOpen(false);

    if (searchQuery.trim()) {
      // Add to recent searches
      const newRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 8);
      setRecentSearches(newRecent);

      // Save to localStorage
      try {
        localStorage.setItem('recentSearches', JSON.stringify(newRecent));
      } catch (error) {
        console.warn('Could not save to localStorage:', error);
      }

      console.log('Searching for:', searchQuery, 'in category:', selectedCategory);
    }
  };

  // Handle key press with arrow navigation
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (focusedResult >= 0) {
        // Navigate to focused result
        const results = mockResults.filter(result =>
          selectedCategory === 'all' || result.category === selectedCategory
        );
        if (results[focusedResult]) {
          console.log('Navigate to:', results[focusedResult]);
        }
      } else {
        submitSearch();
      }
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
      setFocusedResult(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const maxResults = mockResults.filter(result =>
        selectedCategory === 'all' || result.category === selectedCategory
      ).length;
      setFocusedResult(prev => (prev + 1) % maxResults);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const maxResults = mockResults.filter(result =>
        selectedCategory === 'all' || result.category === selectedCategory
      ).length;
      setFocusedResult(prev => prev <= 0 ? maxResults - 1 : prev - 1);
    }
  };

  // Load recent searches
  useEffect(() => {
    try {
      const saved = localStorage.getItem('recentSearches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (error) {
      console.warn('Could not load from localStorage:', error);
    }
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Voice search (mock implementation)
  const startVoiceSearch = () => {
    setIsListening(true);
    // Mock voice search
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery('Computer Science');
      setIsSearchOpen(true);
    }, 2000);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchOpen(false);
    setFocusedResult(-1);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('recentSearches');
    } catch (error) {
      console.warn('Could not clear localStorage:', error);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2" ref={searchRef}>
      {/* Main Search Bar and Results Container */}
      <div className="relative">
        {/* The Search Bar itself */}
        <div className={`relative overflow-hidden bg-white/95 backdrop-blur-xl rounded-2xl border transition-all duration-500 ${isSearchOpen
            ? 'border-[#F2A900]/50 shadow-2xl shadow-[#F2A900]/10 scale-[1.01]'
            : 'border-gray-200/60 shadow-xl hover:border-gray-300/80 hover:shadow-2xl'
          }`}>
          {/* Subtle glow effect when focused */}
          <div className={`absolute inset-0 bg-gradient-to-r from-[#0B3C5D]/5 via-[#F2A900]/5 to-[#0B3C5D]/5 rounded-2xl opacity-0 transition-opacity duration-500 ${isSearchOpen ? 'opacity-100' : ''
            }`} />

          <div className="relative flex items-stretch">
            {/* 1. Category Selector */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-5 py-3 sm:py-4 text-gray-700 hover:text-[#0B3C5D] border-r border-gray-200/60 transition-all duration-300 hover:bg-[#0B3C5D]/5 group"
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${currentCategory.gradient} rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <currentCategory.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="font-bold text-sm leading-tight">{currentCategory.name}</div>
                  <div className="text-[10px] text-gray-500 leading-tight">{currentCategory.count} results</div>
                </div>
                <Filter className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Category Dropdown Overlay */}
              {isFilterOpen && (
                <div className="absolute top-full left-0 mt-3 w-72 sm:w-80 bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/60 z-50 overflow-hidden" ref={filterRef}>
                  <div className="px-5 py-4 bg-gray-50/50 border-b border-gray-100">
                    <h3 className="text-sm font-black text-[#0B3C5D] uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#F2A900]" /> Search Filter
                    </h3>
                  </div>
                  <div className="p-3 grid grid-cols-2 gap-2">
                    {searchCategories.map((category) => {
                      const IconComp = category.icon;
                      const isSel = selectedCategory === category.id;
                      return (
                        <button
                          key={category.id}
                          onClick={() => { setSelectedCategory(category.id); setIsFilterOpen(false); }}
                          className={`flex flex-col items-center p-3 rounded-xl transition-all ${isSel ? 'bg-[#F2A900]/10 border border-[#F2A900]/30' : 'hover:bg-gray-50 border border-transparent'
                            }`}
                        >
                          <div className={`w-10 h-10 bg-gradient-to-r ${category.gradient} rounded-lg flex items-center justify-center mb-2 shadow-sm`}>
                            <IconComp className="w-5 h-5 text-white" />
                          </div>
                          <span className={`text-xs font-bold ${isSel ? 'text-[#0B3C5D]' : 'text-gray-600'}`}>{category.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 2. Main Search Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                onKeyDown={handleKeyPress}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Find colleges, courses, degrees..."
                className="w-full h-full px-4 sm:px-6 py-3 sm:py-4 text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent text-sm sm:text-lg font-bold"
              />
              {searchQuery && (
                <button onClick={clearSearch} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>

            {/* 3. Icons and CTA Button */}
            <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4">
              <button
                onClick={startVoiceSearch}
                title="Voice Search"
                className={`hidden sm:flex p-2.5 rounded-xl transition-all ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'text-gray-400 hover:text-[#0B3C5D] hover:bg-gray-100'
                  }`}
              >
                <Mic className="w-5 h-5" />
              </button>

              <button
                onClick={submitSearch}
                className="px-4 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-[#F2A900] via-[#D9A100] to-[#F2A900] text-[#0B3C5D] font-black rounded-xl hover:shadow-xl transform active:scale-95 transition-all duration-300 flex items-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline text-xs tracking-tighter">SEARCH</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4. Results Dropdown Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 mt-4 bg-white/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-200/60 z-40 max-h-[35rem] overflow-y-auto custom-scrollbar">
            {/* View: Initial (Recent Searches) */}
            {recentSearches.length > 0 && !searchQuery && (
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-black text-[#0B3C5D] uppercase tracking-widest flex items-center gap-2">
                    <History className="w-4 h-4" /> RECENT
                  </h3>
                  <button onClick={clearRecentSearches} className="text-[10px] text-gray-400 hover:text-red-500 font-black uppercase">Clear All</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((s, i) => (
                    <button key={i} onClick={() => { setSearchQuery(s); submitSearch(); }} className="px-4 py-2 bg-gray-50 hover:bg-[#F2A900]/10 text-gray-600 hover:text-[#0B3C5D] rounded-full text-[11px] font-bold border border-transparent hover:border-[#F2A900]/20 transition-all">{s}</button>
                  ))}
                </div>
              </div>
            )}

            {/* View: Popular/Trending Suggests */}
            {!searchQuery && (
              <div className="p-6">
                <h3 className="text-xs font-black text-[#0B3C5D] uppercase tracking-widest flex items-center gap-2 mb-5">
                  <TrendingUp className="w-4 h-4 text-[#F2A900]" /> TRENDING NOW
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {popularSearches.map((s, i) => (
                    <button key={i} onClick={() => { setSearchQuery(s.term); submitSearch(); }} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100 group">
                      <span className="text-2xl group-hover:scale-110 transition-transform">{s.icon}</span>
                      <div className="text-left">
                        <div className="font-bold text-gray-900 group-hover:text-[#0B3C5D] text-sm">{s.term}</div>
                        <div className="text-[10px] text-green-600 font-bold uppercase tracking-tight">{s.trend} Growth</div>
                      </div>
                      <ArrowRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-[#F2A900] group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* View: Live Result Matches */}
            {searchQuery && (
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xs font-black text-[#0B3C5D] uppercase tracking-widest flex items-center gap-2">
                    <Search className="w-4 h-4" /> MATCHING RESULTS
                  </h3>
                  <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-2 py-1 rounded">
                    {mockResults.filter(r => selectedCategory === 'all' || r.category === selectedCategory).length} FOUND
                  </span>
                </div>

                <div className="space-y-3">
                  {mockResults
                    .filter(r => selectedCategory === 'all' || r.category === selectedCategory)
                    .map((r, i) => (
                      <Link key={r.id} href={`/${r.category}/${r.id}`} className={`flex flex-col sm:flex-row gap-4 p-4 rounded-xl border-2 transition-all ${i === focusedResult ? 'border-[#F2A900] bg-[#F2A900]/5' : 'border-transparent hover:border-gray-100 hover:bg-gray-50'}`}>
                        <div className="relative w-max h-max">
                          <span className="text-4xl sm:text-5xl">{r.image}</span>
                          {r.verified && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#0B3C5D] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                              <span className="text-white text-[10px]">✓</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-black text-gray-900 text-base">{r.title}</h4>
                            {r.popular && <span className="text-[9px] font-black bg-[#F2A900] text-[#0B3C5D] px-2 py-0.5 rounded-full uppercase">HOT</span>}
                          </div>
                          <p className="text-xs text-gray-500 mb-3 font-medium">{r.subtitle}</p>
                          <div className="flex flex-wrap gap-4 text-[10px] sm:text-[11px] font-bold text-gray-600">
                            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gray-400" /> {r.location}</span>
                            <span className="flex items-center gap-1.5 text-[#F2A900]"><Star className="w-3.5 h-3.5 fill-current" /> {r.rating} ({r.reviews})</span>
                            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#0B3C5D]" /> {r.students}</span>
                          </div>
                        </div>
                        <div className="sm:text-right flex items-center sm:flex-col justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-3 sm:pt-0">
                          <span className="font-black text-[#0B3C5D] text-lg leading-none">{r.price}</span>
                          <span className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-1 group">
                            VIEW DETAILS <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </Link>
                    ))}
                </div>

                {/* View All Footer */}
                <div className="mt-8 pt-5 border-t border-gray-100 text-center">
                  <button onClick={submitSearch} className="inline-flex items-center gap-2 font-black text-[#0B3C5D] hover:text-[#F2A900] transition-colors uppercase tracking-widest text-[11px]">
                    Load All 54+ Results <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Voice Search Indicator */}
      {isListening && (
        <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/50 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center justify-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-30"></div>
            </div>
            <div className="text-center">
              <p className="text-red-700 font-bold text-lg">Listening...</p>
              <p className="text-red-600 text-sm">Speak clearly into your microphone</p>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-red-400 rounded-full animate-pulse`}
                  style={{
                    height: `${Math.random() * 20 + 10}px`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;