'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  TrendingUp, 
  BookOpen, 
  AlertCircle, 
  Search, 
  Bell,
  Share2,
  Bookmark,
  Eye,
  ThumbsUp,
  MessageCircle,
  Filter,
  X
} from 'lucide-react';

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [bookmarkedNews, setBookmarkedNews] = useState(new Set());
  const [likedNews, setLikedNews] = useState(new Set());

  const featuredNews = [
    {
      id: 1,
      title: "Chancellors of Health Science Academies Take Oath",
      excerpt: "The newly appointed vice-chancellors of four different health science academies were sworn in today by Prime Minister and Chancellor in a ceremony held at the Prime Minister's official residence. This marks a significant milestone in Nepal's health education sector reform.",
      date: "August 14, 2025",
      location: "Kathmandu",
      category: "Education",
      image: "/api/placeholder/600/300",
      readTime: "3 min read",
      isBreaking: false,
      tags: ['Health', 'Academia', 'Government'],
      views: 1250,
      likes: 89,
      comments: 23,
      author: "Ramesh Khadka",
      authorImage: "/api/placeholder/40/40"
    },
    {
      id: 2,
      title: "Seven New Educational Programs Launched at Mid-West University",
      excerpt: "On August 13, 2025, the Standing Committee of the Academic Council at Mid-West University convened under the leadership of Vice Chancellor and Academic Council to approve seven innovative educational programs targeting emerging fields in technology and healthcare.",
      date: "August 13, 2025",
      location: "Mid-West Region",
      category: "Education",
      image: "/api/placeholder/600/300",
      readTime: "4 min read",
      isBreaking: false,
      tags: ['University', 'Programs', 'Academic'],
      views: 980,
      likes: 67,
      comments: 15,
      author: "Sita Sharma",
      authorImage: "/api/placeholder/40/40"
    },
    {
      id: 3,
      title: "Protests Demanding Removal of Non-Profit and Full Scholarship Provisions from Education Bill",
      excerpt: "The Private and Boarding Schools' Organization Nepal (PABSON) plans to conduct a nationwide protest against the proposed School Education Bill, arguing that the new provisions will severely impact private education institutions and limit educational choices for families.",
      date: "August 12, 2025",
      location: "Nationwide",
      category: "Politics",
      image: "/api/placeholder/600/300",
      readTime: "5 min read",
      isBreaking: true,
      tags: ['Protest', 'Education Bill', 'PABSON'],
      views: 2340,
      likes: 156,
      comments: 89,
      author: "Bikash Thapa",
      authorImage: "/api/placeholder/40/40"
    },
    {
      id: 4,
      title: "Digital Nepal Initiative Receives International Recognition",
      excerpt: "Nepal's ambitious Digital Nepal Framework has been recognized by the World Bank as a model for digital transformation in developing nations, highlighting the country's progress in e-governance and digital literacy programs.",
      date: "August 11, 2025",
      location: "Kathmandu",
      category: "Technology",
      image: "/api/placeholder/600/300",
      readTime: "6 min read",
      isBreaking: false,
      tags: ['Digital Nepal', 'World Bank', 'Recognition'],
      views: 1890,
      likes: 234,
      comments: 45,
      author: "Maya Gurung",
      authorImage: "/api/placeholder/40/40"
    }
  ];

  const recentNews = [
    {
      id: 5,
      title: "Kathmandu Metropolitan City to Revoke Approval of Inactive Schools",
      date: "August 11, 2025",
      category: "Local Government",
      readTime: "2 min read",
      summary: "KMC announces strict measures against non-functional educational institutions to ensure quality education standards",
      views: 678,
      isNew: true
    },
    {
      id: 6,
      title: "Nepal Engineering Council Alerts to Verify Recognition Before Enrolling",
      date: "August 10, 2025",
      category: "Education",
      readTime: "3 min read",
      summary: "Students advised to check accreditation status of engineering colleges to avoid career complications",
      views: 892,
      isNew: true
    },
    {
      id: 7,
      title: "New Academic Session Begins with Enhanced Safety Protocols",
      date: "August 9, 2025",
      category: "Education",
      readTime: "4 min read",
      summary: "Schools implement comprehensive safety measures for returning students post-pandemic",
      views: 1124,
      isNew: false
    },
    {
      id: 8,
      title: "Digital Learning Initiative Expands to Rural Areas",
      date: "August 8, 2025",
      category: "Technology",
      readTime: "3 min read",
      summary: "Government launches new program to bridge digital divide in education across remote regions",
      views: 756,
      isNew: false
    },
    {
      id: 9,
      title: "Teacher Training Program Launched for Government Schools",
      date: "August 7, 2025",
      category: "Education",
      readTime: "3 min read",
      summary: "Ministry of Education announces comprehensive teacher development initiative",
      views: 543,
      isNew: false
    }
  ];

  const categories = [
    { name: "All", count: 127 },
    { name: "Education", count: 45 },
    { name: "Politics", count: 23 },
    { name: "Technology", count: 18 },
    { name: "Local Government", count: 15 },
    { name: "Health", count: 12 },
    { name: "Sports", count: 8 },
    { name: "Economy", count: 14 }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Education': 'bg-[#2d5f7f]/10 text-[#2d5f7f] border-[#2d5f7f]/30',
      'Politics': 'bg-red-100 text-red-800 border-red-200',
      'Technology': 'bg-green-100 text-green-800 border-green-200',
      'Local Government': 'bg-purple-100 text-purple-800 border-purple-200',
      'Health': 'bg-pink-100 text-pink-800 border-pink-200',
      'Sports': 'bg-[#F2A900]/10 text-[#2d5f7f] border-[#F2A900]/30',
      'Economy': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const filteredNews = activeCategory === 'All' 
    ? featuredNews 
    : featuredNews.filter(news => news.category === activeCategory);

  const filteredRecentNews = activeCategory === 'All' 
    ? recentNews 
    : recentNews.filter(news => news.category === activeCategory);

  const searchFilteredNews = searchTerm 
    ? filteredNews.filter(news => 
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredNews;

  const handleBookmark = (newsId) => {
    const newBookmarked = new Set(bookmarkedNews);
    if (newBookmarked.has(newsId)) {
      newBookmarked.delete(newsId);
    } else {
      newBookmarked.add(newsId);
    }
    setBookmarkedNews(newBookmarked);
  };

  const handleLike = (newsId) => {
    const newLiked = new Set(likedNews);
    if (newLiked.has(newsId)) {
      newLiked.delete(newsId);
    } else {
      newLiked.add(newsId);
    }
    setLikedNews(newLiked);
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#2d5f7f] shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">Latest News</h1>
              <p className="text-white/80 text-sm lg:text-base mt-1">Stay updated with Nepal's latest news and updates</p>
            </div>
            
            {/* Search */}
            <div className="flex items-center space-x-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F2A900] focus:border-transparent w-full lg:w-64"
                />
              </div>
              
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden p-2.5 text-white hover:bg-white/10 rounded-lg"
              >
                <Filter size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Filter Overlay */}
        {isFilterOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-t-2xl absolute bottom-0 left-0 right-0">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Filter by Category</h3>
                <button onClick={() => setIsFilterOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => {
                      setActiveCategory(category.name);
                      setIsFilterOpen(false);
                    }}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      activeCategory === category.name
                        ? 'bg-[#2d5f7f] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-xs opacity-75 ml-1">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Categories Filter - Desktop */}
        <div className="hidden lg:block mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.name
                    ? 'bg-[#2d5f7f] text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span>{category.name}</span>
                <span className="text-xs opacity-75 ml-1">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Info */}
        {searchTerm && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-[#2d5f7f]">
              Found <span className="font-semibold">{searchFilteredNews.length}</span> results for "{searchTerm}"
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Breaking News Banner */}
            {featuredNews.some(news => news.isBreaking) && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertCircle className="text-red-500 mr-2" size={20} />
                    <span className="font-semibold text-red-800">Breaking News</span>
                  </div>
                  <span className="text-xs text-red-600">Updated 2 min ago</span>
                </div>
                <p className="text-red-700 mt-2 font-medium">
                  {featuredNews.find(news => news.isBreaking)?.title}
                </p>
              </div>
            )}

            {/* News Articles */}
            <div className="space-y-6">
              {searchFilteredNews.map((news) => (
                <article
                  key={news.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="relative">
                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                      <BookOpen size={48} className="text-gray-400" />
                    </div>
                    {news.isBreaking && (
                      <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                        BREAKING
                      </span>
                    )}
                    <button
                      onClick={() => handleBookmark(news.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                        bookmarkedNews.has(news.id)
                          ? 'bg-[#F2A900] text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Bookmark size={16} fill={bookmarkedNews.has(news.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(news.category)}`}>
                        {news.category}
                      </span>
                      <div className="flex gap-2">
                        {news.tags?.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-[#2d5f7f] cursor-pointer">
                      {news.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {news.excerpt}
                    </p>

                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-[#2d5f7f] rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-medium">
                          {news.author?.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{news.author}</p>
                        <p className="text-xs text-gray-500">Journalist</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1" />
                          {news.location}
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {news.readTime}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleLike(news.id)}
                          className={`flex items-center gap-1 text-sm ${
                            likedNews.has(news.id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                          }`}
                        >
                          <ThumbsUp size={16} fill={likedNews.has(news.id) ? 'currentColor' : 'none'} />
                          <span>{news.likes + (likedNews.has(news.id) ? 1 : 0)}</span>
                        </button>
                        
                        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#2d5f7f]">
                          <MessageCircle size={16} />
                          <span>{news.comments}</span>
                        </button>
                        
                        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-green-500">
                          <Share2 size={16} />
                          <span>Share</span>
                        </button>
                      </div>
                      
                      <button className="text-[#2d5f7f] hover:text-[#F2A900] font-medium text-sm">
                        Read More →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <button className="px-8 py-3 bg-[#2d5f7f] text-white rounded-lg hover:bg-[#234a5f] transition-colors font-medium">
                Load More Articles
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 flex items-center">
                  <TrendingUp className="text-[#F2A900] mr-2" size={20} />
                  Trending Now
                </h3>
              </div>
              <div className="space-y-4">
                {filteredRecentNews.slice(0, 5).map((news, index) => (
                  <article key={news.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex items-start gap-3">
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        index < 3 ? 'bg-[#F2A900]' : 'bg-gray-400'
                      }`}>
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        {news.isNew && (
                          <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded mb-1 inline-block">
                            NEW
                          </span>
                        )}
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm hover:text-[#2d5f7f] cursor-pointer line-clamp-2">
                          {news.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          <div className="flex items-center">
                            <Eye size={12} className="mr-1" />
                            <span>{formatNumber(news.views)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-[#2d5f7f] text-white rounded-lg p-6">
              <h3 className="font-bold mb-2">Stay Updated</h3>
              <p className="text-white/80 text-sm mb-4">
                Get the latest news delivered to your inbox
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-[#F2A900]"
                />
                <button className="w-full bg-[#F2A900] hover:bg-[#D9A100] text-white font-medium py-2.5 px-4 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}