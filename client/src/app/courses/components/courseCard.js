'use client';
import { Star, Clock, BookOpen, Users, ArrowRight } from "lucide-react";

export default function CourseCard({ course }) {
  const getCategoryGradient = (category) => {
    switch (category) {
      case 'Technology':
        return 'from-blue-600 to-cyan-500';
      case 'Business':
        return 'from-purple-600 to-indigo-500';
      case 'Design':
        return 'from-pink-500 to-rose-400';
      case 'Marketing':
        return 'from-amber-500 to-orange-500';
      case 'Healthcare':
        return 'from-emerald-500 to-teal-400';
      case 'Education':
        return 'from-red-500 to-rose-500';
      default:
        return 'from-slate-600 to-slate-500';
    }
  };

  const getCategoryEmoji = (category) => {
    switch (category) {
      case 'Technology':
        return '⚛️';
      case 'Business':
        return '💼';
      case 'Design':
        return '🎨';
      case 'Marketing':
        return '📈';
      case 'Healthcare':
        return '🏥';
      case 'Education':
        return '🏫';
      default:
        return '📚';
    }
  };

  const gradient = getCategoryGradient(course.category);
  const emoji = getCategoryEmoji(course.category);

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Thumbnail Container */}
      <div className={`relative w-full h-44 overflow-hidden bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        {/* Abstract background shapes */}
        <div className="absolute top-2 right-2 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-black/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.25'%3E%3Ccircle cx='15' cy='15' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Large Emoji / Icon */}
        <div className="relative text-5xl transform group-hover:scale-110 transition-transform duration-500 select-none">
          {emoji}
        </div>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm shadow-sm text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-gray-800">
          {course.category}
        </div>

        {course.isNew && (
          <div className="absolute top-3 right-3 bg-[#F2A900] text-[#0B3C5D] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm animate-pulse">
            New
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Students */}
          <div className="flex items-center gap-3 mb-2.5 text-xs text-gray-500 font-semibold">
            <span className="flex items-center gap-0.5 text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {course.rating || 'N/A'}
            </span>
            {course.students && (
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-gray-400" />
                {course.students.toLocaleString()} students
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-[#0B3C5D] font-bold text-base md:text-lg leading-snug group-hover:text-[#F2A900] transition-colors duration-200 line-clamp-2 mb-3 min-h-[2.75rem] flex items-center">
            {course.title}
          </h3>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-[#0B3C5D]/10 text-[#0B3C5D] flex items-center justify-center text-[10px] font-bold uppercase border border-[#0B3C5D]/20">
              {course.instructor ? course.instructor.split(' ').map(n => n[0]).join('') : '?'}
            </div>
            <span className="text-xs text-gray-600 font-semibold">
              By <span className="text-[#0B3C5D]">{course.instructor}</span>
            </span>
          </div>
        </div>

        {/* Footer Area */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between mb-4 text-xs text-gray-500 font-semibold">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-gray-400" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5 text-gray-400" />
              <span>{course.level}</span>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              {course.originalPrice && course.originalPrice > course.price && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-400 line-through">
                    Rs. {course.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold bg-rose-50 text-rose-600 px-1.5 py-0.2 rounded">
                    -{Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}%
                  </span>
                </div>
              )}
              <span className="text-base md:text-lg font-black text-[#0B3C5D] leading-tight">
                {course.price > 0 ? `Rs. ${course.price.toLocaleString()}` : 'Free'}
              </span>
            </div>

            <button className="bg-[#0B3C5D] hover:bg-[#F2A900] text-white hover:text-[#0B3C5D] px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1 shadow-sm hover:shadow active:scale-95">
              Enroll
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}