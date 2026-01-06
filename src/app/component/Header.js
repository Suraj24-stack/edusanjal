'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  X, 
  Bell, 
  User, 
  Search, 
  Filter, 
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
  ChevronDown,
  Mic,
  Camera
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [recentSearches, setRecentSearches] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const searchRef = useRef(null);
  const filterRef = useRef(null);

  const searchCategories = [
    { id: 'all', name: 'All', icon: Search, color: 'bg-gray-500' },
    { id: 'courses', name: 'Courses', icon: BookOpen, color: 'bg-[#0B3C5D]' },
    { id: 'colleges', name: 'Colleges', icon: Building2, color: 'bg-green-500' },
    { id: 'schools', name: 'Schools', icon: GraduationCap, color: 'bg-purple-500' },
    { id: 'jobs', name: 'Jobs', icon: Briefcase, color: 'bg-[#F2A900]' },
    { id: 'events', name: 'Events', icon: Calendar, color: 'bg-pink-500' },
  ];

  const popularSearches = [
    'Computer Science',
    'Engineering Colleges',
    'Medical Schools',
    'Business Administration',
    'Teaching Jobs',
    'Scholarship Programs',
    'Online Courses',
    'International Universities'
  ];

  const mockResults = [
    {
      id: 1,
      title: 'Computer Science Engineering',
      subtitle: 'Bachelor of Technology',
      category: 'courses',
      location: 'Kathmandu',
      rating: 4.8,
      reviews: 234,
      price: 'NPR 50,000/year',
      image: '🖥️'
    },
    {
      id: 2,
      title: 'Tribhuvan University',
      subtitle: 'Top Public University',
      category: 'colleges',
      location: 'Kirtipur',
      rating: 4.6,
      reviews: 1250,
      price: 'NPR 25,000/year',
      image: '🏛️'
    },
    {
      id: 3,
      title: 'Software Developer',
      subtitle: 'Tech Company',
      category: 'jobs',
      location: 'Lalitpur',
      rating: 4.9,
      reviews: 89,
      price: 'NPR 80,000/month',
      image: '💼'
    }
  ];

  const currentCategory = searchCategories.find(cat => cat.id === selectedCategory) || searchCategories[0];

  // Handle search functions
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setIsSearchOpen(true);
  };

  const submitSearch = () => {
    if (searchQuery.trim()) {
      const newRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(newRecent);
      
      try {
        localStorage.setItem('recentSearches', JSON.stringify(newRecent));
      } catch (error) {
        console.warn('Could not save to localStorage:', error);
      }
      
      setIsSearchOpen(false);
      setIsMobileSearchOpen(false);
      console.log('Searching for:', searchQuery, 'in category:', selectedCategory);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitSearch();
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('recentSearches');
    } catch (error) {
      console.warn('Could not clear localStorage:', error);
    }
  };

  const startVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery('Computer Science');
      setIsSearchOpen(true);
    }, 2000);
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

  // Close dropdowns when clicking outside
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

  return (
    <>
      {/* Main Header - Always Sticky */}
      <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-8 h-8 bg-[#0B3C5D] rounded transform rotate-12">
                <div className="w-full h-full bg-white rounded transform -rotate-12 flex items-center justify-center">
                  <span className="text-[#0B3C5D] font-bold text-sm">E</span>
                </div>
              </div>
              <span className="text-2xl font-bold text-[#0B3C5D] hidden sm:block">EduLink</span>
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-3xl mx-8" ref={searchRef}>
              <div className="relative w-full">
                <div className={`flex items-center bg-white rounded-xl border-2 transition-all duration-300 ${
                  isSearchOpen ? 'border-[#F2A900] shadow-xl' : 'border-gray-200 shadow-md hover:border-gray-300'
                }`}>
                  {/* Category Selector */}
                  <div className="relative">
                    <button
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-[#0B3C5D] border-r border-gray-200 transition-colors duration-200 rounded-l-xl"
                    >
                      <currentCategory.icon className="w-5 h-5" />
                      <span className="hidden lg:block font-medium">
                        {currentCategory.name}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Category Dropdown */}
                    {isFilterOpen && (
                      <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50" ref={filterRef}>
                        <div className="p-4">
                          <h3 className="text-sm font-semibold text-gray-900 mb-3">Search Categories</h3>
                          <div className="space-y-2">
                            {searchCategories.map((category) => {
                              const IconComponent = category.icon;
                              return (
                                <button
                                  key={category.id}
                                  onClick={() => {
                                    setSelectedCategory(category.id);
                                    setIsFilterOpen(false);
                                  }}
                                  className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 ${
                                    selectedCategory === category.id 
                                      ? 'bg-[#F2A900]/10 text-[#0B3C5D]' 
                                      : 'hover:bg-gray-50 text-gray-700'
                                  }`}
                                >
                                  <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}>
                                    <IconComponent className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="font-medium">{category.name}</span>
                                  {selectedCategory === category.id && (
                                    <div className="ml-auto w-2 h-2 bg-[#F2A900] rounded-full"></div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Search Input */}
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearch}
                      onKeyDown={handleKeyPress}
                      onFocus={() => setIsSearchOpen(true)}
                      placeholder="Search colleges, courses, schools, jobs..."
                      className="w-full px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none bg-transparent"
                    />
                    
                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 px-4">
                    <button
                      onClick={startVoiceSearch}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        isListening 
                          ? 'bg-red-100 text-red-600 animate-pulse' 
                          : 'text-gray-400 hover:text-[#0B3C5D] hover:bg-gray-100'
                      }`}
                    >
                      <Mic className="w-4 h-4" />
                    </button>

                    <button className="p-2 text-gray-400 hover:text-[#0B3C5D] rounded-lg hover:bg-gray-100 transition-all duration-200">
                      <Camera className="w-4 h-4" />
                    </button>

                    <button
                      onClick={submitSearch}
                      className="px-4 py-2 bg-gradient-to-r from-[#F2A900] to-[#D9A100] text-[#0B3C5D] font-medium rounded-lg hover:from-[#D9A100] hover:to-[#C09000] transition-all duration-200 shadow-md"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Search Dropdown */}
                {isSearchOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-40 max-h-96 overflow-y-auto">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && !searchQuery && (
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>Recent Searches</span>
                          </h3>
                          <button
                            onClick={clearRecentSearches}
                            className="text-xs text-gray-500 hover:text-[#0B3C5D]"
                          >
                            Clear all
                          </button>
                        </div>
                        <div className="space-y-2">
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setSearchQuery(search);
                                submitSearch();
                              }}
                              className="flex items-center space-x-3 w-full p-2 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
                            >
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">{search}</span>
                              <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Popular Searches */}
                    {!searchQuery && (
                      <div className="p-4 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4" />
                          <span>Popular Searches</span>
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {popularSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setSearchQuery(search);
                                submitSearch();
                              }}
                              className="p-2 text-left text-gray-700 hover:bg-[#F2A900]/10 hover:text-[#0B3C5D] rounded-lg transition-all duration-200 text-sm"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Search Results */}
                    {searchQuery && (
                      <div className="p-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                          Search Results for "{searchQuery}"
                        </h3>
                        <div className="space-y-3">
                          {mockResults
                            .filter(result => 
                              selectedCategory === 'all' || result.category === selectedCategory
                            )
                            .map((result) => (
                            <Link
                              key={result.id}
                              href={`/${result.category}/${result.id}`}
                              className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                            >
                              <div className="text-2xl">{result.image}</div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 group-hover:text-[#0B3C5D]">
                                  {result.title}
                                </h4>
                                <p className="text-sm text-gray-600">{result.subtitle}</p>
                                <div className="flex items-center space-x-4 mt-1">
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-3 h-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">{result.location}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-3 h-3 text-[#F2A900] fill-current" />
                                    <span className="text-xs text-gray-500">{result.rating}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-[#0B3C5D] text-sm">{result.price}</p>
                                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto mt-1" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Auth & Notifications */}
            <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
              <button className="relative p-2 text-gray-600 hover:text-[#0B3C5D] rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-[#0B3C5D] rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <User className="w-5 h-5" />
                <span className="hidden lg:block text-sm font-medium">Profile</span>
              </button>

              <Link 
                href="/signin" 
                className="px-4 py-2 text-gray-700 hover:text-[#0B3C5D] font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                Sign in
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center space-x-2">
              <button 
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="p-2 text-gray-600 hover:text-[#0B3C5D] rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-[#0B3C5D] rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar - Slides down when opened */}
        {isMobileSearchOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    onKeyDown={handleKeyPress}
                    placeholder="Search colleges, courses, schools, jobs..."
                    className="w-full px-4 py-3 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  onClick={submitSearch}
                  className="px-4 py-3 bg-gradient-to-r from-[#F2A900] to-[#D9A100] text-[#0B3C5D] rounded-r-lg"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg sticky top-28 z-30">
          <div className="container mx-auto px-4 py-6">
            {/* Mobile Navigation */}
            <div className="space-y-2 mb-6">
              <Link href="/courses" className="flex items-center space-x-3 p-3 text-gray-700 hover:text-[#0B3C5D] hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                <span className="text-orange-500">📚</span>
                <span className="font-medium">Courses</span>
              </Link>
              <Link href="/colleges" className="flex items-center space-x-3 p-3 text-gray-700 hover:text-[#0B3C5D] hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                <span className="text-blue-500">🏛️</span>
                <span className="font-medium">Colleges</span>
              </Link>
              <Link href="/schools" className="flex items-center space-x-3 p-3 text-gray-700 hover:text-[#0B3C5D] hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                <span className="text-red-500">🏫</span>
                <span className="font-medium">Schools</span>
              </Link>
              <Link href="/degrees" className="flex items-center space-x-3 p-3 text-gray-700 hover:text-[#0B3C5D] hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                <span className="text-purple-500">🎓</span>
                <span className="font-medium">Degrees</span>
              </Link>
              <Link href="/admissions" className="flex items-center space-x-3 p-3 text-gray-700 hover:text-[#0B3C5D] hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                <span className="text-pink-500">📝</span>
                <span className="font-medium">Admissions</span>
              </Link>
              <Link href="/vacancies" className="flex items-center space-x-3 p-3 text-gray-700 hover:text-[#0B3C5D] hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                <span className="text-green-500">💼</span>
                <span className="font-medium">Vacancies</span>
              </Link>
              <Link href="/news" className="flex items-center space-x-3 p-3 text-gray-700 hover:text-[#0B3C5D] hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                <span className="text-gray-500">📰</span>
                <span className="font-medium">News</span>
              </Link>
            </div>

            {/* Mobile User Actions */}
            <div className="space-y-4 mb-6 pt-6 border-t border-gray-200">
              <button className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:text-[#0B3C5D] hover:bg-gray-50 rounded-lg transition-all duration-200">
                <User className="w-5 h-5" />
                <span className="font-medium">My Profile</span>
              </button>
              
              <button className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:text-[#0B3C5D] hover:bg-gray-50 rounded-lg transition-all duration-200">
                <Bell className="w-5 h-5" />
                <span className="font-medium">Notifications</span>
                <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>

            {/* Mobile Auth Buttons */}
            <div className="space-y-3">
              <Link 
                href="/signin" 
                className="block w-full py-3 text-center text-gray-700 hover:text-[#0B3C5D] font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200" 
                onClick={() => setIsMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link 
                href="/signup" 
                className="block w-full py-3 text-center bg-gradient-to-r from-[#F2A900] to-[#D9A100] text-[#0B3C5D] font-medium rounded-lg hover:from-[#D9A100] hover:to-[#C09000] transition-all duration-200 shadow-md" 
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Voice Search Feedback */}
      {isListening && (
        <div className="fixed top-32 left-4 right-4 z-50 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 md:w-96">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-red-700 font-medium">Listening... Speak now</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;