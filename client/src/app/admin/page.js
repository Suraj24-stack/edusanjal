'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  getCourses, 
  getVacancies, 
  getBlogs, 
  getApplications, 
  getActivities 
} from './dataStore';
import { 
  School, 
  BookOpen, 
  Briefcase, 
  UserCheck, 
  FileText, 
  ArrowUpRight, 
  PlusCircle, 
  TrendingUp 
} from 'lucide-react';

export default function AdminOverview() {
  const [stats, setStats] = useState({
    colleges: 0,
    courses: 0,
    vacancies: 0,
    applications: 0,
    blogs: 0
  });
  const [activities, setActivities] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch stats from local dataStore
    const coursesCount = getCourses().length;
    const vacanciesCount = getVacancies().length;
    const blogsCount = getBlogs().length;
    const apps = getApplications();
    const appsCount = apps.length;

    // Load colleges dynamically
    fetch('/api/colleges')
      .then(res => res.json())
      .then(data => {
        const collegesCount = data.success && data.colleges ? data.colleges.length : 0;
        setStats({
          colleges: collegesCount,
          courses: coursesCount,
          vacancies: vacanciesCount,
          applications: appsCount,
          blogs: blogsCount
        });
      })
      .catch(err => {
        console.error('Error fetching dynamic colleges count:', err);
        setStats({
          colleges: 0,
          courses: coursesCount,
          vacancies: vacanciesCount,
          applications: appsCount,
          blogs: blogsCount
        });
      });

    setApplications(apps.slice(0, 3)); // show top 3 recent applications
    setActivities(getActivities().slice(0, 5)); // show recent 5 activities
  }, []);

  const cardData = [
    { name: 'Colleges & Schools', count: stats.colleges, icon: School, href: '/admin/colleges', color: 'from-blue-500 to-indigo-600', text: 'Total institutions listed' },
    { name: 'Courses & Degrees', count: stats.courses, icon: BookOpen, href: '/admin/courses', color: 'from-emerald-500 to-teal-600', text: 'Active programs offered' },
    { name: 'Active Vacancies', count: stats.vacancies, icon: Briefcase, href: '/admin/vacancies', color: 'from-amber-500 to-orange-600', text: 'Job openings for educators' },
    { name: 'Total Applications', count: stats.applications, icon: UserCheck, href: '/admin/applications', color: 'from-rose-500 to-pink-600', text: 'Admissions & job inquiries' },
    { name: 'Blogs & Articles', count: stats.blogs, icon: FileText, href: '/admin/blogs', color: 'from-violet-500 to-purple-600', text: 'Published education news' }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0B3C5D] tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm font-semibold mt-1">
            Welcome back! Here is a summary of EduLink\'s active metrics and system events.
          </p>
        </div>
        
        {/* Quick Action Shortcuts */}
        <div className="flex items-center gap-3">
          <Link 
            href="/admin/colleges?add=true" 
            className="flex items-center gap-2 bg-[#0B3C5D] hover:bg-[#0B3C5D]/90 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-lg shadow-[#0B3C5D]/10 transition-all duration-300 active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Institution</span>
          </Link>
          <Link 
            href="/admin/blogs?add=true" 
            className="flex items-center gap-2 bg-[#F2A900] hover:bg-[#E09A00] text-[#0B3C5D] font-bold text-xs px-4 py-3 rounded-2xl shadow-lg shadow-[#F2A900]/10 transition-all duration-300 active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publish Article</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
        {cardData.map((card) => {
          const Icon = card.icon;
          return (
            <Link 
              key={card.name} 
              href={card.href}
              className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-md shadow-slate-100 group-hover:scale-105 transition-all duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="mt-4">
                  <span className="block text-2xl font-black text-slate-800 tracking-tight">{card.count}</span>
                  <span className="block text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">{card.name}</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold text-slate-400">
                <span>{card.text}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#0B3C5D] transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Chart and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SVG Analytics Chart Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-[#0B3C5D] tracking-tight">Application & Traffic Trends</h2>
                <p className="text-slate-400 text-xs font-semibold mt-0.5">Month-over-month submission rates for 2026</p>
              </div>
              <div className="flex items-center gap-1 bg-[#F2A900]/10 text-[#0B3C5D] px-2.5 py-1 rounded-xl text-[10px] font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+12.4% vs last month</span>
              </div>
            </div>
            
            {/* SVG Interactive Line Chart */}
            <div className="mt-6 h-64 relative">
              <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                <defs>
                  {/* Gradient definition for fill */}
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0B3C5D" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0B3C5D" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F2A900" stopOpacity="0.20" />
                    <stop offset="100%" stopColor="#F2A900" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                
                {/* Grid Lines */}
                <line x1="0" y1="40" x2="500" y2="40" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="0" y1="90" x2="500" y2="90" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="0" y1="140" x2="500" y2="140" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="5,5" />
                
                {/* Admission Fair Line (Navy) */}
                <path 
                  d="M 10 160 Q 100 130 150 90 T 300 120 T 420 50 T 490 30" 
                  fill="none" 
                  stroke="#0B3C5D" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                />
                {/* Area under navy curve */}
                <path 
                  d="M 10 160 Q 100 130 150 90 T 300 120 T 420 50 T 490 30 L 490 180 L 10 180 Z" 
                  fill="url(#chartGradient)" 
                />

                {/* Vacancy Applications Line (Gold) */}
                <path 
                  d="M 10 170 Q 80 150 160 140 T 280 90 T 410 110 T 490 80" 
                  fill="none" 
                  stroke="#F2A900" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                />
                {/* Area under gold curve */}
                <path 
                  d="M 10 170 Q 80 150 160 140 T 280 90 T 410 110 T 490 80 L 490 180 L 10 180 Z" 
                  fill="url(#goldGradient)" 
                />
                
                {/* Data Points */}
                <circle cx="150" cy="90" r="5" fill="#0B3C5D" stroke="#ffffff" strokeWidth="2" className="cursor-pointer hover:r-7 transition-all duration-200" />
                <circle cx="420" cy="50" r="5" fill="#0B3C5D" stroke="#ffffff" strokeWidth="2" />
                <circle cx="280" cy="90" r="5" fill="#F2A900" stroke="#ffffff" strokeWidth="2" />
              </svg>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#0B3C5D]" /> Admission Inquiries
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#F2A900]" /> Vacancy Applications
              </span>
            </div>
            <span>Jan - Jun 2026</span>
          </div>
        </div>

        {/* Recent Activities Section */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-[#0B3C5D] tracking-tight">Recent Activity</h2>
            <p className="text-slate-400 text-xs font-semibold mt-0.5">Real-time log of administrative events</p>
            
            <div className="mt-6 space-y-5">
              {activities.map((act) => (
                <div key={act.id} className="flex gap-4">
                  <div className="relative shrink-0 flex items-center justify-center">
                    <div className={`
                      w-3 h-3 rounded-full z-10
                      ${act.type === 'admission' ? 'bg-rose-500 ring-4 ring-rose-100' : ''}
                      ${act.type === 'blog' ? 'bg-violet-500 ring-4 ring-violet-100' : ''}
                      ${act.type === 'college' ? 'bg-blue-500 ring-4 ring-blue-100' : ''}
                      ${act.type === 'job' ? 'bg-emerald-500 ring-4 ring-emerald-100' : ''}
                    `} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-700 leading-normal">{act.text}</p>
                    <span className="block text-[10px] font-semibold text-slate-400 mt-1">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-50">
            <Link 
              href="/admin/applications"
              className="block text-center text-xs font-black text-[#0B3C5D] hover:text-[#F2A900] transition-colors"
            >
              View Full Activity Log
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Applications Feed */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-extrabold text-[#0B3C5D] tracking-tight">Pending Inquiries</h2>
            <p className="text-slate-400 text-xs font-semibold mt-0.5">Student and applicant submissions needing review</p>
          </div>
          <Link 
            href="/admin/applications"
            className="text-xs font-black text-[#0B3C5D] hover:text-[#F2A900] transition-colors"
          >
            Manage Applications
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider pb-3">
                <th className="pb-3 font-extrabold">Applicant</th>
                <th className="pb-3 font-extrabold">Type</th>
                <th className="pb-3 font-extrabold">Target Entity</th>
                <th className="pb-3 font-extrabold">Date</th>
                <th className="pb-3 font-extrabold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                  <td className="py-4">
                    <span className="block font-bold text-slate-800 text-sm">{app.name}</span>
                    <span className="block text-[11px] text-slate-400 font-semibold mt-0.5">{app.email}</span>
                  </td>
                  <td className="py-4 text-xs font-bold">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] ${app.type === 'Admission' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                      {app.type}
                    </span>
                  </td>
                  <td className="py-4 font-bold text-slate-700 text-xs">{app.targetName}</td>
                  <td className="py-4 font-semibold text-slate-400 text-xs">{app.date}</td>
                  <td className="py-4">
                    <span className={`
                      inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border
                      ${app.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                      ${app.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                      ${app.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                    `}>
                      <span className={`w-1.5 h-1.5 rounded-full ${app.status === 'Approved' ? 'bg-green-500' : app.status === 'Pending' ? 'bg-amber-500' : 'bg-red-500'}`} />
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
