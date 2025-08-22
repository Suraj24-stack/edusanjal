'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Sparkles } from 'lucide-react';

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
      icon: '📚'
    },
    { 
      name: 'Colleges', 
      href: '/colleges',
      description: 'Find your perfect college',
      icon: '🏛️'
    },
    { 
      name: 'Schools', 
      href: '/schools',
      description: 'Discover top schools',
      icon: '🏫'
    },
    { 
      name: 'Degrees', 
      href: '/degrees',
      description: 'Browse degree programs',
      icon: '🎓'
    },
    { 
      name: 'Admissions', 
      href: '/admissions',
      description: 'Admission guidance',
      icon: '📝'
    },
    { 
      name: 'Vacancies', 
      href: '/vacancies',
      description: 'Job opportunities',
      icon: '💼'
    },
    { 
      name: 'News', 
      href: '/news',
      description: 'Latest education news',
      icon: '📰'
    },
  ];

  const moreItems = [
    { 
      name: 'Scholarships', 
      href: '/scholarships',
      description: 'Financial aid opportunities',
      icon: '💰',
      isNew: true
    },
    { 
      name: 'Results', 
      href: '/results',
      description: 'Exam results & grades',
      icon: '📊'
    },
    { 
      name: 'Events', 
      href: '/events',
      description: 'Educational events',
      icon: '🎪'
    },
    { 
      name: 'Study Abroad', 
      href: '/study-abroad',
      description: 'International opportunities',
      icon: '🌍',
      isNew: true
    },
    { 
      name: 'Career Guidance', 
      href: '/career',
      description: 'Professional development',
      icon: '🚀'
    },
    { 
      name: 'About Us', 
      href: '/about',
      description: 'Our story & mission',
      icon: 'ℹ️'
    },
    { 
      name: 'Contact', 
      href: '/contact',
      description: 'Get in touch',
      icon: '📞'
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
    <nav className={`bg-white sticky top-16 z-40 transition-all duration-300 ${
      isScrolled ? 'shadow-lg border-b border-gray-100' : 'border-b border-gray-100'
    }`}>
      <div className="container-custom">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between h-14">
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.name}</span>
                </span>
                {isActive(item.href) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>
          
          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-primary-600 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4" />
              <span>More</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isMoreOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsMoreOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-3 z-20">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Explore More</h3>
                    <p className="text-xs text-gray-500">Additional resources & tools</p>
                  </div>
                  <div className="grid grid-cols-1 gap-1 p-2">
                    {moreItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-primary-50 transition-all duration-200"
                        onClick={() => setIsMoreOpen(false)}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900 group-hover:text-primary-600">
                              {item.name}
                            </span>
                            {item.isNew && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-full">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 group-hover:text-primary-500">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="lg:hidden flex items-center justify-between h-14">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-900">Navigation</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-primary-600 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="container-custom py-4">
            <div className="space-y-3">
              {/* Main Navigation */}
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* More Items */}
              <div className="border-t border-gray-100 pt-4">
                <h3 className="px-4 py-2 text-sm font-semibold text-gray-900">More Options</h3>
                <div className="space-y-2">
                  {moreItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{item.name}</span>
                          {item.isNew && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{item.description}</p>
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