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
      gradient: 'from-blue-500 to-blue-600',
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
      gradient: 'from-orange-500 to-orange-600',
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
    { name: 'Top Rated', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-200' },
    { name: 'Latest', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
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
    if (searchQuery.trim()) {
      // Add to recent searches
      const newRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 8);
      setRecentSearches(newRecent);
      
      // Save to localStorage with error handling
      try {
        localStorage.setItem('recentSearches', JSON.stringify(newRecent));
      } catch (error) {
        console.warn('Could not save to localStorage:', error);
      }
      
      // Close search
      setIsSearchOpen(false);
      
      // Navigate to search results (you can implement this)
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
    <div className="w-full max-w-5xl mx-auto" ref={searchRef}>
      {/* Main Search Container */}
      <div className="relative">
        {/* Search Bar */}
        <div className={`relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-2xl border transition-all duration-500 ${
          isSearchOpen 
            ? 'border-blue-400/50 shadow-2xl shadow-blue-500/10 scale-[1.02]' 
            : 'border-gray-200/60 shadow-xl hover:border-gray-300/80 hover:shadow-2xl'
        }`}>
          {/* Animated gradient border */}
          <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 transition-opacity duration-500 ${
            isSearchOpen ? 'opacity-100' : ''
          }`} />
          
          <div className="relative flex items-stretch">
            {/* Category Selector */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-3 px-5 py-4 text-gray-700 hover:text-blue-600 border-r border-gray-200/60 transition-all duration-300 hover:bg-blue-50/50 group"
              >
                <div className={`w-10 h-10 bg-gradient-to-r ${currentCategory.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <currentCategory.icon className="w-5 h-5 text-white" />
                </div>
                <div className="hidden sm:block text-left">
                  <div className="font-semibold text-sm">{currentCategory.name}</div>
                  <div className="text-xs text-gray-500">{currentCategory.count} results</div>
                </div>
                <Filter className={`w-4 h-4 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Enhanced Category Dropdown */}
              {isFilterOpen && (
                <div className="absolute top-full left-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/60 z-50 overflow-hidden" ref={filterRef}>
                  {/* Header */}
                  <div className="px-6 py-4 bg-gradient-to-r from-blue-50/80 to-purple-50/80 border-b border-gray-200/60">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-blue-500" />
                      <span>Search Categories</span>
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Choose your preferred search category</p>
                  </div>

                  {/* Categories Grid */}
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      {searchCategories.map((category) => {
                        const IconComponent = category.icon;
                        const isSelected = selectedCategory === category.id;
                        return (
                          <button
                            key={category.id}
                            onClick={() => {
                              setSelectedCategory(category.id);
                              setIsFilterOpen(false);
                            }}
                            className={`relative p-4 rounded-xl transition-all duration-300 group ${
                              isSelected 
                                ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 scale-105' 
                                : 'hover:bg-gray-50 border-2 border-transparent hover:scale-105'
                            }`}
                          >
                            <div className="flex flex-col items-center space-y-2">
                              <div className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                                isSelected ? 'shadow-lg' : ''
                              }`}>
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                              <div className="text-center">
                                <div className={`font-semibold text-sm ${isSelected ? 'text-blue-600' : 'text-gray-700'}`}>
                                  {category.name}
                                </div>
                                <div className="text-xs text-gray-500">{category.count}</div>
                              </div>
                            </div>
                            {isSelected && (
                              <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Filters */}
                  <div className="px-4 pb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-orange-500" />
                      <span>Quick Filters</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {quickFilters.map((filter) => {
                        const FilterIcon = filter.icon;
                        return (
                          <button
                            key={filter.name}
                            className={`flex items-center space-x-2 px-3 py-2 ${filter.bg} hover:scale-105 ${filter.color} rounded-lg transition-all duration-300 border ${filter.border} hover:shadow-md`}
                          >
                            <FilterIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">{filter.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Search Input Container */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                onKeyDown={handleKeyPress}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search colleges, courses, schools, jobs..."
                className="w-full px-6 py-4 text-gray-900 placeholder-gray-500 focus:outline-none bg-transparent text-lg font-medium"
              />
              
              {/* Search Suggestions Chips */}
              {!searchQuery && !isSearchOpen && (
                <div className="absolute left-6 top-full mt-2 flex space-x-2">
                  {['Engineering', 'Medical', 'IT Jobs'].map((chip, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(chip);
                        setIsSearchOpen(true);
                      }}
                      className="px-3 py-1.5 bg-gray-100/80 hover:bg-blue-100 text-xs font-medium text-gray-600 hover:text-blue-600 rounded-full transition-all duration-200 hover:scale-105"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Clear Button */}
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 px-4">
              {/* Voice Search */}
              <button
                onClick={startVoiceSearch}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-100 text-red-600 animate-pulse scale-110' 
                    : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:scale-110'
                }`}
              >
                <Mic className="w-5 h-5" />
              </button>

              {/* Visual Search */}
              <button className="p-3 text-gray-400 hover:text-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-300 hover:scale-110">
                <Camera className="w-5 h-5" />
              </button>

              {/* Search Button */}
              <button
                onClick={submitSearch}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:via-blue-800 hover:to-purple-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Search Dropdown */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 mt-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/60 z-40 max-h-[32rem] overflow-y-auto">
            {/* Recent Searches */}
            {recentSearches.length > 0 && !searchQuery && (
              <div className="p-6 border-b border-gray-100/60">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                    <History className="w-5 h-5 text-blue-500" />
                    <span>Recent Searches</span>
                  </h3>
                  <button
                    onClick={clearRecentSearches}
                    className="text-sm text-gray-500 hover:text-red-500 font-medium transition-colors duration-200"
                  >
                    Clear all
                  </button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(search);
                        submitSearch();
                      }}
                      className="flex items-center space-x-3 p-3 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-300 hover:scale-105 border border-transparent hover:border-blue-200/50 group"
                    >
                      <div className="w-8 h-8 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors duration-300">
                        <Clock className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-700 group-hover:text-blue-600 truncate">
                          {search}
                        </div>
                        <div className="text-xs text-gray-500">Recent</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            {!searchQuery && (
              <div className="p-6 border-b border-gray-100/60">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <span>Trending Searches</span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full">HOT</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(search.term);
                        submitSearch();
                      }}
                      className="flex items-center space-x-4 p-4 text-left hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 rounded-xl transition-all duration-300 hover:scale-105 border border-transparent hover:border-orange-200/50 group"
                    >
                      <div className="text-2xl">{search.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-700 group-hover:text-orange-600">
                          {search.term}
                        </div>
                        <div className="text-sm text-green-600 font-medium flex items-center space-x-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>{search.trend}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {searchQuery && (
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Search className="w-5 h-5 text-blue-500" />
                  <span>Results for "{searchQuery}"</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-bold rounded-full">
                    {mockResults.filter(result => selectedCategory === 'all' || result.category === selectedCategory).length}
                  </span>
                </h3>
                <div className="space-y-3">
                  {mockResults
                    .filter(result => 
                      selectedCategory === 'all' || result.category === selectedCategory
                    )
                    .map((result, index) => (
                    <Link
                      key={result.id}
                      href={`/${result.category}/${result.id}`}
                      className={`flex items-center space-x-5 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] border-2 group ${
                        index === focusedResult
                          ? 'bg-blue-50 border-blue-200 shadow-lg'
                          : 'hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 border-transparent hover:border-blue-200/50'
                      }`}
                    >
                      <div className="relative">
                        <div className="text-3xl">{result.image}</div>
                        {result.verified && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {result.title}
                          </h4>
                          {result.popular && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full flex items-center space-x-1">
                              <Star className="w-3 h-3 fill-current" />
                              <span>Popular</span>
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{result.subtitle}</p>
                        
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{result.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-medium text-gray-700">{result.rating}</span>
                            <span className="text-gray-500">({result.reviews})</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-blue-400" />
                            <span className="text-gray-600">{result.students}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right flex flex-col items-end space-y-2">
                        <p className="font-bold text-blue-600 text-lg">{result.price}</p>
                        <div className="flex items-center space-x-2 text-gray-500 group-hover:text-blue-500 transition-colors duration-300">
                          <span className="text-sm font-medium">View Details</span>
                          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </Link>
                  ))}
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