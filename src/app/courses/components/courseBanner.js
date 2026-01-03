// components/coursebanner.js
'use client';
import { Search } from "lucide-react";

export default function CourseBanner() {
  return (
    <div className="relative bg-[#0B3C5D] text-white overflow-hidden">
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect Course
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Explore thousands of courses across Nepal. Build skills, gain confidence, and grow your future.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />

              <input
                type="text"
                placeholder="What do you want to learn today?"
                className="w-full pl-12 pr-32 py-4 rounded-2xl text-gray-900 placeholder-gray-500 shadow-xl focus:ring-4 focus:ring-[#F2A900]/40 focus:outline-none text-lg"
              />

              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#F2A900] hover:bg-[#D9A100] text-[#0B3C5D] px-6 py-2 rounded-xl transition-all duration-300 shadow-md font-semibold">
                Search
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-[#F2A900]">5000+</div>
              <div className="text-sm text-white/90">Courses</div>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-[#F2A900]">50K+</div>
              <div className="text-sm text-white/90">Students</div>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-[#F2A900]">500+</div>
              <div className="text-sm text-white/90">Instructors</div>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-[#F2A900]">95%</div>
              <div className="text-sm text-white/90">Success Rate</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}