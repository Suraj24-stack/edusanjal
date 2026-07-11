'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  School, 
  BookOpen, 
  FileText, 
  Briefcase, 
  UserCheck, 
  Menu, 
  X, 
  Bell, 
  User,
  GraduationCap
} from 'lucide-react';
import { initializeDB } from './dataStore';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Initialize DB data once when layout is mounted
  useEffect(() => {
    initializeDB();
  }, []);

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Colleges & Schools', href: '/admin/colleges', icon: School },
    { name: 'Courses & Degrees', href: '/admin/courses', icon: BookOpen },
    { name: 'Blogs & News', href: '/admin/blogs', icon: FileText },
    { name: 'Vacancies', href: '/admin/vacancies', icon: Briefcase },
    { name: 'Applications', href: '/admin/applications', icon: UserCheck }
  ];

  // Helper to check if a navigation item is active
  const isActive = (href) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  // Build Breadcrumbs from pathname
  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);
    return paths.map((path, idx) => {
      const url = `/${paths.slice(0, idx + 1).join('/')}`;
      const name = path.replace(/-/g, ' ');
      const isLast = idx === paths.length - 1;
      return (
        <span key={url} className="flex items-center text-xs font-semibold">
          <span className="mx-2 text-slate-400">/</span>
          {isLast ? (
            <span className="text-slate-800 capitalize font-bold">{name}</span>
          ) : (
            <Link href={url} className="text-slate-500 hover:text-[#0B3C5D] capitalize transition-colors duration-200">
              {name}
            </Link>
          )}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800 antialiased">
      {/* Backdrop overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#0B3C5D] text-white flex flex-col justify-between 
        shadow-2xl transition-transform duration-300 ease-out border-r border-[#0B3C5D]/10
        lg:translate-x-0 lg:static lg:h-screen lg:shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Logo Brand area */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rotate-12 rounded bg-[#F2A900] p-1 flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 -rotate-12 text-[#0B3C5D]" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">EduLink</span>
                <span className="block text-[10px] font-bold tracking-widest text-[#F2A900] uppercase">Admin Portal</span>
              </div>
            </Link>
            
            <button 
              className="lg:hidden text-white hover:text-[#F2A900] transition-colors p-1"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 group relative
                    ${active 
                      ? 'bg-gradient-to-r from-[#F2A900] to-[#E09A00] text-[#0B3C5D] shadow-lg shadow-[#F2A900]/10' 
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${active ? 'text-[#0B3C5D]' : 'text-slate-400 group-hover:text-white'}`} />
                  <span>{item.name}</span>
                  {active && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#0B3C5D]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info / Footer in Sidebar */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-[#F2A900]/25 flex items-center justify-center text-[#F2A900] font-black shadow-inner">
              AD
            </div>
            <div className="overflow-hidden">
              <span className="block text-sm font-bold text-white truncate">Administrator</span>
              <span className="block text-xs font-semibold text-slate-400 truncate">admin@edulink.com</span>
            </div>
          </div>
          <Link 
            href="/" 
            className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300"
          >
            Exit to Client Site
          </Link>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar Component */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-slate-600 hover:text-slate-900 p-2 hover:bg-slate-50 rounded-xl transition-all duration-200"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Breadcrumbs Navigation */}
            <div className="hidden md:flex items-center text-xs font-semibold text-slate-500">
              <Link href="/admin" className="hover:text-[#0B3C5D] transition-colors flex items-center gap-1 font-bold">
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
              {getBreadcrumbs()}
            </div>
          </div>

          {/* Quick Actions Profile/Notifications */}
          <div className="flex items-center gap-4">
            {/* Quick Search */}
            <div className="relative hidden sm:block w-64">
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full bg-slate-50 text-xs text-slate-700 placeholder-slate-400 px-4 py-2.5 pl-10 rounded-xl border border-slate-100 outline-none focus:bg-white focus:border-[#0B3C5D]/30 transition-all duration-300"
              />
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Notifications Button */}
            <button className="relative w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-950 transition-all duration-300">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
            </button>

            {/* Avatar Dropdown */}
            <div className="flex items-center gap-3 pl-2 border-l border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold">
                <User className="w-5 h-5 text-slate-500" />
              </div>
              <div className="hidden xl:block text-left">
                <span className="block text-xs font-bold text-slate-800 leading-tight">Suraj Khadka</span>
                <span className="block text-[10px] font-semibold text-slate-400">Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable View Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50/50">
          {children}
        </main>
      </div>
    </div>
  );
}
