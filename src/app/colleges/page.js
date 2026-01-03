'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

// Sample colleges data
const collegesData = [
  {
    id: 1,
    name: "Islington College",
    location: "Kathmandu, Nepal",
    type: "Private",
    ranking: 1,
    tuition: "$54,880",
    acceptance: "3.4%",
    students: "23,000",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop",
    description: "Prestigious Ivy League university known for excellence in education and research.",
    established: 1636,
    programs: ["Business", "Medicine", "Law", "Engineering", "Liberal Arts"]
  },
  {
    id: 2,
    name: "The British College",
    location: "Thapathali,Kathmandu",
    type: "Private",
    ranking: 2,
    tuition: "$56,169",
    acceptance: "4.3%",
    students: "17,000",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    description: "Leading research university in the heart of Silicon Valley.",
    established: 1885,
    programs: ["Computer Science", "Engineering", "Business", "Medicine", "Liberal Arts"]
  },
  {
    id: 3,
    name: "Kathford College",
    location: "Kathmandu, Nepal",
    type: "Private",
    ranking: 3,
    tuition: "$53,790",
    acceptance: "6.7%",
    students: "11,000",
    image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400&h=300&fit=crop",
    description: "World-renowned institute of technology and scientific research.",
    established: 1861,
    programs: ["Engineering", "Computer Science", "Physics", "Mathematics", "Economics"]
  },
  {
    id: 4,
    name: "Padmashree International Colleg",
    location: "Tinkune, Kathmandu",
    type: "Public",
    ranking: 4,
    tuition: "$14,226",
    acceptance: "17.5%",
    students: "45,000",
    image: "https://images.unsplash.com/photo-1481026469463-66327c86e544?w=400&h=300&fit=crop",
    description: "Top public research university with diverse academic programs.",
    established: 1868,
    programs: ["Engineering", "Business", "Liberal Arts", "Sciences", "Law"]
  },
  {
    id: 5,
    name: "Kathmandu Medical College",
    location: " Kathmandu",
    type: "Private",
    ranking: 5,
    tuition: "$59,950",
    acceptance: "5.9%",
    students: "13,000",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop",
    description: "Historic Ivy League university with strong liberal arts tradition.",
    established: 1701,
    programs: ["Liberal Arts", "Law", "Medicine", "Business", "Drama"]
  },
  {
    id: 6,
    name: "KIST Medical College.",
    location: " Lalitpur, Imanol",
    type: "Private",
    ranking: 6,
    tuition: "$56,010",
    acceptance: "5.8%",
    students: "5,400",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
    description: "Elite private university known for undergraduate education excellence.",
    established: 1746,
    programs: ["Liberal Arts", "Engineering", "Public Policy", "Economics", "Physics"]
  }
];

const CollegeCard = ({ college }) => {
  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:border-[#F2A900]/30">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={college.image}
          alt={college.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/90 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
          #{college.ranking}
        </div>
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
            Est. {college.established}
          </span>
        </div>
      </div>
      
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-[#0B3C5D] transition-colors duration-300 leading-tight">
            {college.name}
          </h3>
          <div className="flex items-center text-gray-500 ml-2 flex-shrink-0">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <p className="text-gray-600 mb-1 font-medium">{college.location}</p>
        <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">{college.description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</div>
            <div className="text-sm font-bold text-gray-900 mt-1">{college.type}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Students</div>
            <div className="text-sm font-bold text-gray-900 mt-1">{college.students}</div>
          </div>
          <div className="bg-gradient-to-r from-[#F2A900]/10 to-[#F2A900]/20 rounded-xl p-3 border border-[#F2A900]/30">
            <div className="text-xs font-semibold text-[#0B3C5D] uppercase tracking-wide">Tuition</div>
            <div className="text-sm font-bold text-[#0B3C5D] mt-1">{college.tuition}</div>
          </div>
          <div className="bg-gradient-to-r from-[#0B3C5D]/10 to-[#0B3C5D]/20 rounded-xl p-3 border border-[#0B3C5D]/30">
            <div className="text-xs font-semibold text-[#0B3C5D] uppercase tracking-wide">Acceptance</div>
            <div className="text-sm font-bold text-[#0B3C5D] mt-1">{college.acceptance}</div>
          </div>
        </div>
        
        <div className="mb-5">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Popular Programs</div>
          <div className="flex flex-wrap gap-1.5">
            {college.programs.slice(0, 3).map((program, index) => (
              <span key={index} className="bg-gradient-to-r from-[#0B3C5D]/10 to-[#0B3C5D]/20 text-[#0B3C5D] px-3 py-1 rounded-full text-xs font-medium border border-[#0B3C5D]/20">
                {program}
              </span>
            ))}
            {college.programs.length > 3 && (
              <span className="text-gray-500 text-xs font-medium px-2 py-1">+{college.programs.length - 3} more</span>
            )}
          </div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-[#F2A900] to-[#D9A100] hover:from-[#D9A100] hover:to-[#C09000] text-[#0B3C5D] py-3 px-4 rounded-xl transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]">
          Explore University
        </button>
      </div>
    </div>
  );
};

const FilterSection = ({ filters, onFilterChange, isOpen, toggleOpen }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg mb-6 overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2 text-[#0B3C5D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
            </svg>
            Filters
          </h3>
          <button
            onClick={toggleOpen}
            className="sm:hidden bg-[#0B3C5D]/10 text-[#0B3C5D] p-2 rounded-xl hover:bg-[#0B3C5D]/20 transition-colors"
          >
            <svg className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 ${isOpen ? 'block' : 'hidden sm:grid'}`}>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">University Type</label>
            <select
              value={filters.type}
              onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A900] focus:border-transparent transition-all duration-200"
            >
              <option value="">All Types</option>
              <option value="Private">Private</option>
              <option value="Public">Public</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Max Tuition</label>
            <select
              value={filters.maxTuition}
              onChange={(e) => onFilterChange({ ...filters, maxTuition: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A900] focus:border-transparent transition-all duration-200"
            >
              <option value="">Any Price</option>
              <option value="20000">Under $20,000</option>
              <option value="40000">Under $40,000</option>
              <option value="60000">Under $60,000</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A900] focus:border-transparent transition-all duration-200"
            >
              <option value="ranking">Ranking</option>
              <option value="name">Name</option>
              <option value="tuition">Tuition (Low to High)</option>
              <option value="acceptance">Acceptance Rate</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingCard = () => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-6">
      <div className="h-6 bg-gray-200 rounded-lg mb-2" />
      <div className="h-4 bg-gray-200 rounded-lg mb-4 w-3/4" />
      <div className="h-3 bg-gray-200 rounded-lg mb-4" />
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="h-16 bg-gray-200 rounded-xl" />
        <div className="h-16 bg-gray-200 rounded-xl" />
        <div className="h-16 bg-gray-200 rounded-xl" />
        <div className="h-16 bg-gray-200 rounded-xl" />
      </div>
      <div className="h-10 bg-gray-200 rounded-xl" />
    </div>
  </div>
);

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    maxTuition: '',
    sortBy: 'ranking'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredColleges = useMemo(() => {
    let filtered = collegesData.filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = !filters.type || college.type === filters.type;
      
      const matchesTuition = !filters.maxTuition || 
                            parseInt(college.tuition.replace(/[$,]/g, '')) <= parseInt(filters.maxTuition);
      
      return matchesSearch && matchesType && matchesTuition;
    });

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'tuition':
          return parseInt(a.tuition.replace(/[$,]/g, '')) - parseInt(b.tuition.replace(/[$,]/g, ''));
        case 'acceptance':
          return parseFloat(a.acceptance) - parseFloat(b.acceptance);
        case 'ranking':
        default:
          return a.ranking - b.ranking;
      }
    });

    return filtered;
  }, [searchTerm, filters]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B3C5D]/5 via-white to-[#F2A900]/5">
        <div className="bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/90 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8 sm:py-12">
              <div className="h-8 bg-white/20 rounded-lg mb-4 w-3/4 animate-pulse" />
              <div className="h-4 bg-white/20 rounded-lg w-1/2 animate-pulse" />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B3C5D]/5 via-white to-[#F2A900]/5">
      {/* Modern Header with Gradient */}
      <div className="bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/90 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 sm:py-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Discover Your Future
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl">
              Explore top colleges and universities to find the perfect match for your educational journey
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Modern Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search universities by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pl-14 pr-6 text-lg bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F2A900] focus:border-transparent transition-all duration-300"
            />
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filters */}
        <FilterSection 
          filters={filters} 
          onFilterChange={setFilters}
          isOpen={filtersOpen}
          toggleOpen={() => setFiltersOpen(!filtersOpen)}
        />

        {/* Results Count with Modern Design */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-sm">
              <span className="text-sm font-semibold text-gray-600">
                {filteredColleges.length} of {collegesData.length} universities
              </span>
            </div>
          </div>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredColleges.map(college => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>

        {/* No Results */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto border border-white/20 shadow-lg">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No universities found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters to find more results.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ type: '', maxTuition: '', sortBy: 'ranking' });
                }}
                className="bg-gradient-to-r from-[#F2A900] to-[#D9A100] text-[#0B3C5D] px-6 py-3 rounded-xl font-semibold hover:from-[#D9A100] hover:to-[#C09000] transition-all duration-300"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}