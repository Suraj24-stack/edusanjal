'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import ApplicationModal from '../component/ApplicationModal'; // ADDED: Import ApplicationModal

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
    name: "Padmashree International College",
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
    location: "Kathmandu",
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
    name: "KIST Medical College",
    location: "Lalitpur, Imanol",
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

// MODIFIED: Added onApply prop to CollegeCard
const CollegeCard = ({ college, onApply }) => {
  return (
    <div className="group bg-white/90 backdrop-blur-md rounded-3xl border border-white/40 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:border-[#0B3C5D]/20 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-44 w-full overflow-hidden shrink-0">
        <Image
          src={college.image}
          alt={college.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Ranking Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#0B3C5D] px-3 py-1 rounded-xl text-[10px] font-bold shadow-xl border border-white/50">
          Ranked #{college.ranking}
        </div>

        {/* Established Date */}
        <div className="absolute bottom-3 left-3">
          <span className="text-white text-[10px] font-semibold bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 uppercase tracking-widest">
            {college.established}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Header & Location */}
        <div className="mb-4">
          <div className="flex items-start justify-between min-h-[64px]">
            <h3 className="text-2xl font-extrabold text-[#0B3C5D] group-hover:text-[#F2A900] transition-colors duration-300 leading-tight line-clamp-2">
              {college.name}
            </h3>
            <div className="mt-1 text-black">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <p className="text-black text-sm font-bold flex items-center mt-1 uppercase tracking-wider">
            {college.location}
          </p>
        </div>

        {/* Description */}
        <div className="mb-6 flex-grow">
          <p className="text-black text-sm font-medium leading-relaxed line-clamp-3">
            {college.description}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#0B3C5D]/5 rounded-2xl p-3 border border-[#0B3C5D]/5 hover:bg-white hover:border-[#F2A900]/30 transition-colors duration-300">
            <div className="text-[10px] font-bold text-black uppercase tracking-widest mb-1">Ownership</div>
            <div className="text-sm font-bold text-[#0B3C5D]">{college.type}</div>
          </div>
          <div className="bg-[#0B3C5D]/5 rounded-2xl p-3 border border-[#0B3C5D]/5 hover:bg-white hover:border-[#F2A900]/30 transition-colors duration-300">
            <div className="text-[10px] font-bold text-black uppercase tracking-widest mb-1">Students</div>
            <div className="text-sm font-bold text-[#0B3C5D]">{college.students}+</div>
          </div>
          <div className="bg-[#F2A900]/5 rounded-2xl p-3 border border-[#F2A900]/10 hover:bg-white hover:border-[#F2A900]/30 transition-colors duration-300">
            <div className="text-[10px] font-bold text-black uppercase tracking-widest mb-1">Avg Tuition</div>
            <div className="text-sm font-bold text-[#0B3C5D]">{college.tuition}</div>
          </div>
          <div className="bg-[#0B3C5D]/5 rounded-2xl p-3 border border-[#0B3C5D]/5 hover:bg-white hover:border-[#F2A900]/30 transition-colors duration-300">
            <div className="text-[10px] font-bold text-black uppercase tracking-widest mb-1">Acceptance</div>
            <div className="text-sm font-bold text-[#0B3C5D]">{college.acceptance}</div>
          </div>
        </div>

        {/* Popular Programs Tags */}
        <div className="mb-8 min-h-[50px]">
          <div className="flex flex-wrap gap-2">
            {college.programs.slice(0, 2).map((program, index) => (
              <span key={index} className="bg-white text-[#0B3C5D] border border-[#0B3C5D]/10 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                {program}
              </span>
            ))}
            {college.programs.length > 2 && (
              <span className="text-black text-[10px] font-bold py-1.5 px-2">+{college.programs.length - 2} more</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
          <button className="flex-1 bg-white border border-[#0B3C5D]/20 text-[#0B3C5D] py-3.5 px-4 rounded-2xl transition-all duration-300 font-bold text-xs uppercase tracking-widest hover:bg-[#0B3C5D] hover:text-white shadow-sm active:scale-95">
            Details
          </button>

          <button
            onClick={() => onApply(college)}
            className="flex-1 bg-gradient-to-r from-[#F2A900] to-[#E59E00] text-[#0B3C5D] py-3.5 px-4 rounded-2xl transition-all duration-300 font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-xl hover:translate-y-[-1px] active:scale-95 flex items-center justify-center gap-2"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

const FilterSection = ({ filters, onFilterChange, isOpen, toggleOpen }) => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-white/40 shadow-sm mb-8 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-[#0B3C5D] flex items-center tracking-tight">
            <div className="bg-[#0B3C5D]/5 p-2 rounded-xl mr-3">
              <svg className="w-5 h-5 text-[#0B3C5D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
            </div>
            Refine Search
          </h3>
          <button
            onClick={toggleOpen}
            className="sm:hidden bg-[#0B3C5D]/5 text-[#0B3C5D] p-2.5 rounded-2xl hover:bg-[#0B3C5D]/10 transition-colors border border-[#0B3C5D]/10"
          >
            <svg className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 ${isOpen ? 'block' : 'hidden sm:grid'}`}>
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-black uppercase tracking-widest ml-1">University Type</label>
            <select
              value={filters.type}
              onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
              className="w-full px-5 py-3.5 bg-[#0B3C5D]/5 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F2A900] focus:bg-white focus:border-transparent transition-all duration-300 font-semibold text-[#0B3C5D] appearance-none"
            >
              <option value="">All Types</option>
              <option value="Private">Private</option>
              <option value="Public">Public</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-black uppercase tracking-widest ml-1">Max Tuition</label>
            <select
              value={filters.maxTuition}
              onChange={(e) => onFilterChange({ ...filters, maxTuition: e.target.value })}
              className="w-full px-5 py-3.5 bg-[#0B3C5D]/5 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F2A900] focus:bg-white focus:border-transparent transition-all duration-300 font-semibold text-[#0B3C5D] appearance-none"
            >
              <option value="">Any Price</option>
              <option value="20000">Under $20,000</option>
              <option value="40000">Under $40,000</option>
              <option value="60000">Under $60,000</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-black uppercase tracking-widest ml-1">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
              className="w-full px-5 py-3.5 bg-[#0B3C5D]/5 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F2A900] focus:bg-white focus:border-transparent transition-all duration-300 font-semibold text-[#0B3C5D] appearance-none"
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
  <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 shadow-lg overflow-hidden animate-pulse flex flex-col h-full">
    <div className="h-44 bg-gray-200" />
    <div className="p-6 flex flex-col flex-grow">
      <div className="h-8 bg-gray-200 rounded-lg mb-4 w-3/4" />
      <div className="h-4 bg-gray-200 rounded-lg mb-6 w-1/2" />
      <div className="h-4 bg-gray-200 rounded-lg mb-4" />
      <div className="h-4 bg-gray-200 rounded-lg mb-6 w-5/6" />
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="h-16 bg-gray-100 rounded-2xl" />
        <div className="h-16 bg-gray-100 rounded-2xl" />
        <div className="h-16 bg-gray-100 rounded-2xl" />
        <div className="h-16 bg-gray-100 rounded-2xl" />
      </div>
      <div className="mt-auto pt-4 flex gap-3">
        <div className="h-12 bg-gray-200 rounded-2xl flex-1" />
        <div className="h-12 bg-gray-200 rounded-2xl flex-1" />
      </div>
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

  // ADDED: State for application modal
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // ADDED: Handler for Apply Now button
  const handleApplyClick = (college) => {
    setSelectedCollege(college);
    setShowApplicationModal(true);
  };

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
        <div className="mb-10">
          <div className="relative max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Search by college name, city or program..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-8 py-5 pl-16 pr-8 text-xl bg-white/90 backdrop-blur-md border border-white/40 rounded-3xl shadow-sm focus:outline-none focus:ring-4 focus:ring-[#F2A900]/20 focus:bg-white focus:border-[#F2A900]/30 transition-all duration-500 text-[#0B3C5D] placeholder:text-[#0B3C5D]/30"
            />
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-[#0B3C5D]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between px-2">
          <div className="flex items-center space-x-3">
            <div className="bg-[#0B3C5D] text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg shadow-[#0B3C5D]/20">
              {filteredColleges.length}
            </div>
            <span className="text-sm font-extrabold text-black uppercase tracking-widest">
              Universities matching your criteria
            </span>
          </div>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredColleges.map(college => (
            <CollegeCard key={college.id} college={college} onApply={handleApplyClick} />
          ))}
        </div>

        {/* No Results */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-24">
            <div className="bg-white/90 backdrop-blur-md rounded-[40px] p-12 max-w-lg mx-auto border border-white/40 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F2A900] via-[#0B3C5D] to-[#F2A900]" />
              <div className="bg-[#0B3C5D]/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#0B3C5D]/10">
                <svg className="h-10 w-10 text-[#0B3C5D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-extrabold text-[#0B3C5D] mb-4 tracking-tight">No results found</h3>
              <p className="text-black mb-10 text-lg font-bold leading-relaxed">
                We couldn't find any universities that match your current filters. Try broadening your search or resetting all filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ type: '', maxTuition: '', sortBy: 'ranking' });
                }}
                className="bg-[#0B3C5D] text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#0B3C5D]/90 transition-all duration-300 shadow-xl shadow-[#0B3C5D]/20 hover:scale-105 active:scale-95"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ADDED: Application Modal */}
      {showApplicationModal && selectedCollege && (
        <ApplicationModal
          school={selectedCollege}
          onClose={() => {
            setShowApplicationModal(false);
            setSelectedCollege(null);
          }}
        />
      )}
    </div>
  );
}