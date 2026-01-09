'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  const navItems = [
    { name: 'Courses', href: '/courses' },
    { name: 'Colleges', href: '/colleges' },
    { name: 'Schools', href: '/schools' },
    { name: 'Degrees', href: '/degrees' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Vacancies', href: '/vacancies' },
    { name: 'News', href: '/news' },
  ];

  const moreItems = [
    { name: 'Blogs', href: '/blogs' },
    { name: 'Events', href: '/events' },
    { name: 'Videos', href: '/videos' },
    { name: 'Posts', href: '/posts' },
    { name: 'Organizations', href: '/organizations' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (href) => pathname === href;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between h-16">
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-[#2d5f7f] text-white shadow-md'
                    : 'text-gray-700 hover:bg-[#2d5f7f] hover:text-white hover:shadow-md'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* More Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                isMoreOpen
                  ? 'bg-[#2d5f7f] text-white shadow-md'
                  : 'text-gray-700 hover:bg-[#2d5f7f] hover:text-white hover:shadow-md'
              }`}
            >
              More
              <svg
                className={`w-4 h-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isMoreOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                {moreItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#2d5f7f] hover:text-white transition-colors duration-150"
                    onClick={() => setIsMoreOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center justify-between h-16">
          <span className="text-lg font-semibold text-gray-900">Menu</span>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-gray-700 hover:bg-[#2d5f7f] hover:text-white transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'bg-[#2d5f7f] text-white'
                    : 'text-gray-700 hover:bg-[#2d5f7f] hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-3 mt-3 border-t border-gray-200">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                More
              </div>
              {moreItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-[#2d5f7f] hover:text-white transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;