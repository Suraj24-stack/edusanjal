'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Sparkles, ArrowRight } from 'lucide-react';

const NavBar = () => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { 
      name: 'Courses', 
      href: '/courses',
      description: 'Explore thousands of courses',
      icon: '📚',
      color: 'from-blue-500 to-indigo-500'
    },
    { 
      name: 'Colleges', 
      href: '/colleges',
      description: 'Find your perfect college',
      icon: '🏛️',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      name: 'Schools', 
      href: '/schools',
      description: 'Discover top schools',
      icon: '🏫',
      color: 'from-emerald-500 to-teal-500'
    },
    { 
      name: 'Degrees', 
      href: '/degrees',
      description: 'Browse degree programs',
      icon: '🎓',
      color: 'from-cyan-500 to-blue-500'
    },
    { 
      name: 'Admissions', 
      href: '/admissions',
      description: 'Admission guidance',
      icon: '📝',
      color: 'from-amber-500 to-orange-500'
    },
    { 
      name: 'Vacancies', 
      href: '/vacancies',
      description: 'Job opportunities',
      icon: '💼',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      name: 'News', 
      href: '/news',
      description: 'Latest education news',
      icon: '📰',
      color: 'from-red-500 to-pink-500'
    },
  ];

  const moreItems = [
    { 
      name: 'Scholarships', 
      href: '/scholarships',
      description: 'Financial aid opportunities',
      icon: '💰',
      isNew: true,
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      name: 'Results', 
      href: '/results',
      description: 'Exam results & grades',
      icon: '📊',
      color: 'from-indigo-500 to-purple-500'
    },
    { 
      name: 'Events', 
      href: '/events',
      description: 'Educational events',
      icon: '🎪',
      color: 'from-pink-500 to-red-500'
    },
    { 
      name: 'Study Abroad', 
      href: '/study-abroad',
      description: 'International opportunities',
      icon: '🌍',
      isNew: true,
      color: 'from-teal-500 to-cyan-500'
    },
    { 
      name: 'Career Guidance', 
      href: '/career',
      description: 'Professional development',
      icon: '🚀',
      color: 'from-violet-500 to-purple-500'
    },
    { 
      name: 'About Us', 
      href: '/about',
      description: 'Our story & mission',
      icon: 'ℹ️',
      color: 'from-slate-500 to-gray-500'
    },
    { 
      name: 'Contact', 
      href: '/contact',
      description: 'Get in touch',
      icon: '📞',
      color: 'from-blue-500 to-indigo-500'
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href) => pathname === href;

  return (
    <nav className={`backdrop-blur-xl bg-white/80 border-b border-white/20 sticky top-16 z-40 transition-all duration-500 ${
      isScrolled 
        ? 'shadow-2xl shadow-black/10 bg-white/90' 
        : 'shadow-lg shadow-black/5'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isActive(item.href)
                    ? 'text-white bg-gradient-to-r shadow-lg shadow-primary-500/25'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white/60 hover:shadow-md hover:shadow-black/10'
                } ${isActive(item.href) ? item.color : ''}`}
              >
                <span className="flex items-center space-x-2.5">
                  <span className="text-base transform group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                  <span className="text-sm tracking-wide">{item.name}</span>
                </span>
                
                {/* Active indicator */}
                {isActive(item.href) && (
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full shadow-lg"></div>
                )}
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-purple-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </Link>
            ))}
          </div>
          
          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className={`group flex items-center space-x-2.5 px-5 py-2.5 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                isMoreOpen 
                  ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/25' 
                  : 'text-gray-700 hover:text-gray-900 bg-white/60 hover:bg-white/80 hover:shadow-md hover:shadow-black/10'
              }`}
            >
              <Sparkles className={`w-4 h-4 transition-all duration-300 ${isMoreOpen ? 'text-white' : 'text-indigo-500 group-hover:text-indigo-600'}`} />
              <span className="text-sm tracking-wide">More</span>
              <ChevronDown className={`w-4 h-4 transition-all duration-300 ${isMoreOpen ? 'rotate-180 text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
            </button>
            
            {/* Dropdown Menu */}
            {isMoreOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10 backdrop-blur-sm bg-black/10" 
                  onClick={() => setIsMoreOpen(false)}
                ></div>
                <div className="absolute right-0 mt-3 w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/20 border border-white/20 py-4 z-20 transform animate-in slide-in-from-top-2 duration-300">
                  {/* Header */}
                  <div className="px-6 py-3 border-b border-gray-100/50">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                      <h3 className="text-sm font-bold text-gray-900">Explore More</h3>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Additional resources & tools</p>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="p-3 space-y-1">
                    {moreItems.map((item, index) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group flex items-center space-x-4 px-4 py-3.5 rounded-xl hover:bg-white/80 hover:shadow-md hover:shadow-black/5 transition-all duration-300 transform hover:scale-[1.02]"
                        onClick={() => setIsMoreOpen(false)}
                      >
                        <div className={`p-2.5 rounded-xl bg-gradient-to-r ${item.color} shadow-lg transform group-hover:scale-110 transition-transform duration-200`}>
                          <span className="text-white text-sm">{item.icon}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-gray-900 group-hover:text-gray-800 transition-colors duration-200">
                              {item.name}
                            </span>
                            {item.isNew && (
                              <span className="px-2.5 py-1 text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-sm animate-pulse">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
                            {item.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="lg:hidden flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-lg font-bold text-gray-900 tracking-wide">Navigation</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
              isMobileMenuOpen 
                ? 'text-white bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/25' 
                : 'text-gray-700 hover:text-gray-900 bg-white/60 hover:bg-white/80 hover:shadow-md hover:shadow-black/10'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-white/20 shadow-2xl shadow-black/10 animate-in slide-in-from-top-4 duration-300">
          <div className="px-4 sm:px-6 py-6">
            <div className="space-y-6">
              {/* Main Navigation */}
              <div className="space-y-2">
                <h3 className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Main Menu</h3>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                      isActive(item.href)
                        ? `text-white bg-gradient-to-r ${item.color} shadow-lg shadow-primary-500/25`
                        : 'text-gray-700 hover:text-gray-900 hover:bg-white/80 hover:shadow-md hover:shadow-black/5'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className={`p-2.5 rounded-xl transition-all duration-200 transform group-hover:scale-110 ${
                      isActive(item.href) 
                        ? 'bg-white/20' 
                        : `bg-gradient-to-r ${item.color}`
                    }`}>
                      <span className={`text-base ${isActive(item.href) ? 'text-white' : 'text-white'}`}>{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-base tracking-wide">{item.name}</span>
                      <p className={`text-xs mt-1 ${isActive(item.href) ? 'text-white/80' : 'text-gray-500'}`}>{item.description}</p>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-all duration-200 group-hover:translate-x-1 ${
                      isActive(item.href) ? 'text-white/70' : 'text-gray-400'
                    }`} />
                  </Link>
                ))}
              </div>
              
              {/* More Items */}
              <div className="border-t border-gray-100/50 pt-6">
                <h3 className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Additional Options</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {moreItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group flex items-center space-x-3 px-4 py-3.5 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-white/80 hover:shadow-md hover:shadow-black/5 transition-all duration-300 transform hover:scale-[1.02]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color} shadow-sm transform group-hover:scale-110 transition-transform duration-200`}>
                        <span className="text-white text-sm">{item.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-0.5">
                          <span className="font-semibold text-sm truncate">{item.name}</span>
                          {item.isNew && (
                            <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-sm animate-pulse">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;