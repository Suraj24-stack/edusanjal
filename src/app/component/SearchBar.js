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
  Camera
} from 'lucide-react';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const searchRef = useRef(null);
  const filterRef = useRef(null);

  const searchCategories = [
    { id: 'all', name: 'All', icon: Search, color: 'bg-gray-500' },
    { id: 'courses', name: 'Courses', icon: BookOpen, color: 'bg-blue-500' },
    { id: 'colleges', name: 'Colleges', icon: Building2, color: 'bg-green-500' },
    { id: 'schools', name: 'Schools', icon: GraduationCap, color: 'bg-purple-500' },
    { id: 'jobs', name: 'Jobs', icon: Briefcase, color: 'bg-orange-500' },
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

  const quickFilters = [
    { name: 'Top Rated', icon: Star },
    { name: 'Latest', icon: TrendingUp },
    { name: 'Near Me', icon: MapPin },
    { name: 'Free', icon: BookOpen },
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

  // Get the current category
  const currentCategory = searchCategories.find(cat => cat.id === selectedCategory) || searchCategories[0];

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setIsSearchOpen(true);
  };

  // Handle search submission
  const submitSearch = () => {
    if (searchQuery.trim()) {
      // Add to recent searches
      const newRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
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

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitSearch();
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
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
    <div className="w-full max-w-4xl mx-auto" ref={searchRef}>
      {/* Main Search Bar */}
      <div className="relative">
        <div className={`flex items-center bg-white rounded-xl border-2 transition-all duration-300 ${
          isSearchOpen ? 'border-blue-500 shadow-xl' : 'border-gray-200 shadow-md hover:border-gray-300'
        }`}>
          {/* Category Selector */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-blue-600 border-r border-gray-200 transition-colors duration-200"
            >
              <currentCategory.icon className="w-5 h-5" />
              <span className="hidden sm:block font-medium">
                {currentCategory.name}
              </span>
              <Filter className="w-4 h-4" />
            </button>

            {/* Category Dropdown */}
            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50" ref={filterRef}>
                <div className="p-3">
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
                              ? 'bg-blue-50 text-blue-600' 
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}>
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium">{category.name}</span>
                          {selectedCategory === category.id && (
                            <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick Filters */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Filters</h4>
                    <div className="flex flex-wrap gap-2">
                      {quickFilters.map((filter) => {
                        const FilterIcon = filter.icon;
                        return (
                          <button
                            key={filter.name}
                            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 rounded-lg transition-all duration-200"
                          >
                            <FilterIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">{filter.name}</span>
                          </button>
                        );
                      })}
                    </div>
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
              className="w-full px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
            />
            
            {/* Clear Button */}
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
            {/* Voice Search */}
            <button
              onClick={startVoiceSearch}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isListening 
                  ? 'bg-red-100 text-red-600 animate-pulse' 
                  : 'text-gray-400 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>

            {/* Visual Search */}
            <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100 transition-all duration-200">
              <Camera className="w-5 h-5" />
            </button>

            {/* Search Button */}
            <button
              onClick={submitSearch}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Search
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
                    className="text-xs text-gray-500 hover:text-blue-600"
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
                      className="p-2 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
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
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600">
                          {result.title}
                        </h4>
                        <p className="text-sm text-gray-600">{result.subtitle}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{result.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-500">{result.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">{result.price}</p>
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

      {/* Search Suggestions */}
      {isListening && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <p className="text-red-700 font-medium">Listening... Speak now</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;