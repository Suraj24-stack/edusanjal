'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import ApplicationModal from '../component/ApplicationModal'; // ADDED: Import ApplicationModal

// Sample schools data
const schoolsData = [
  {
    id: 1,
    name: "St. Xavier's College",
    location: "Maitighar",
    type: "Private",
    level: "High School",
    ranking: 1,
    tuition: "$57,000",
    acceptance: "15%",
    students: "1,100",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
    description: "Elite preparatory school known for academic excellence and innovative teaching methods.",
    established: 1781,
    programs: ["Advanced Placement", "International Baccalaureate", "STEM", "Arts", "Athletics"],
    boardingType: "Boarding & Day"
  },
  {
    id: 2,
    name: "Kathmandu Model Secondary School (KMSS)",
    location: "Bagbazar",
    type: "Private",
    level: "High School",
    ranking: 2,
    tuition: "Free",
    acceptance: "3%",
    students: "3,300",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
    description: "Specialized high school focusing on science, technology, engineering, and mathematics.",
    established: 1904,
    programs: ["STEM", "Computer Science", "Engineering", "Research", "Mathematics"],
    boardingType: "Day School"
  },
  {
    id: 3,
    name: "Global College of Management (GCM),",
    location: "Mid-Baneshwor",
    type: "Private",
    level: "High School",
    ranking: 3,
    tuition: "Free",
    acceptance: "18%",
    students: "1,800",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop",
    description: "Magnet school specializing in science, technology, engineering, and mathematics education.",
    established: 1985,
    programs: ["STEM", "Research Labs", "Computer Science", "Biotechnology", "Astronomy"],
    boardingType: "Day School"
  },
  {
    id: 4,
    name: "Trinity International College",
    location: "Dillibazar",
    type: "Private",
    level: "K-12",
    ranking: 4,
    tuition: "$52,000",
    acceptance: "20%",
    students: "2,100",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop",
    description: "Independent school providing comprehensive K-12 education with strong academic programs.",
    established: 1893,
    programs: ["Advanced Placement", "STEM", "Arts", "World Languages", "Athletics"],
    boardingType: "Day School"
  },
  {
    id: 5,
    name: "Ace Institute of Management",
    location: "Bibhuti Janak Marg",
    type: "Private",
    level: "High School",
    ranking: 5,
    tuition: "Free*",
    acceptance: "8%",
    students: "540",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    description: "Jesuit preparatory school offering free tuition through endowment support.",
    established: 1914,
    programs: ["Classical Studies", "Advanced Placement", "Service Learning", "Arts", "Athletics"],
    boardingType: "Day School"
  },
  {
    id: 6,
    name: "Kathmandu Model College",
    location: "Bagabazar, Kathmandu",
    type: "Private",
    level: "High School",
    ranking: 6,
    tuition: "$65,000",
    acceptance: "17%",
    students: "870",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop",
    description: "Elite boarding school with rigorous academics and diverse extracurricular opportunities.",
    established: 1890,
    programs: ["Advanced Placement", "Arts Concentration", "Environmental Studies", "Global Studies", "Athletics"],
    boardingType: "Boarding & Day"
  },
  {
    id: 7,
    name: "Uniglobe",
    location: "Kathmandu",
    type: "Public Charter",
    level: "K-12",
    ranking: 7,
    tuition: "Free",
    acceptance: "Lottery",
    students: "1,400",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop",
    description: "Charter school known for rigorous international curriculum and high academic standards.",
    established: 1998,
    programs: ["International Curriculum", "Advanced Placement", "STEM", "World Languages", "Liberal Arts"],
    boardingType: "Day School"
  },
  {
    id: 8,
    name: "GoldenGate International College",
    location: "Mid-Baneshwor",
    type: "Private",
    level: "K-12",
    ranking: 8,
    tuition: "$38,000",
    acceptance: "22%",
    students: "840",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
    description: "Progressive independent school emphasizing intellectual curiosity and global citizenship.",
    established: 1919,
    programs: ["Liberal Arts", "STEM", "Computer Science", "Arts", "Community Service"],
    boardingType: "Day School"
  }
];

// MODIFIED: Added onApply prop to SchoolCard
const SchoolCard = ({ school, onApply }) => {
  const getTuitionColor = (tuition) => {
    if (tuition === "Free" || tuition === "Free*") return "from-green-50 to-emerald-50 border-green-100 text-green-800";
    const amount = parseInt(tuition.replace(/[$,*]/g, ''));
    if (amount > 50000) return "from-red-50 to-pink-50 border-red-100 text-red-800";
    if (amount > 30000) return "from-[#F2A900]/10 to-[#F2A900]/20 border-[#F2A900]/30 text-[#0B3C5D]";
    return "from-[#0B3C5D]/10 to-[#0B3C5D]/20 border-[#0B3C5D]/30 text-[#0B3C5D]";
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Private':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          </svg>
        );
      case 'Public':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 104 0 2 2 0 00-4 0zm6 0a2 2 0 104 0 2 2 0 00-4 0z" clipRule="evenodd" />
          </svg>
        );
      case 'Public Charter':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:border-[#F2A900]/30">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={school.image}
          alt={school.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/90 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
          #{school.ranking}
        </div>
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm ${
            school.type === 'Private' ? 'text-[#0B3C5D]' : 
            school.type === 'Public' ? 'text-green-800' : 'text-purple-800'
          }`}>
            {getTypeIcon(school.type)}
            <span className="ml-1">{school.type}</span>
          </span>
        </div>
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
            Est. {school.established}
          </span>
        </div>
      </div>
      
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-[#0B3C5D] transition-colors duration-300 leading-tight">
            {school.name}
          </h3>
          <div className="flex items-center text-gray-500 ml-2 flex-shrink-0">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <p className="text-gray-600 font-medium">{school.location}</p>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
            {school.level}
          </span>
        </div>
        
        <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">{school.description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Students</div>
            <div className="text-sm font-bold text-gray-900 mt-1">{school.students}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</div>
            <div className="text-sm font-bold text-gray-900 mt-1">{school.boardingType}</div>
          </div>
          <div className={`bg-gradient-to-r rounded-xl p-3 border ${getTuitionColor(school.tuition)}`}>
            <div className="text-xs font-semibold uppercase tracking-wide opacity-80">Tuition</div>
            <div className="text-sm font-bold mt-1">{school.tuition}</div>
          </div>
          <div className="bg-gradient-to-r from-[#0B3C5D]/10 to-[#0B3C5D]/20 rounded-xl p-3 border border-[#0B3C5D]/30">
            <div className="text-xs font-semibold text-[#0B3C5D] uppercase tracking-wide">Acceptance</div>
            <div className="text-sm font-bold text-[#0B3C5D] mt-1">{school.acceptance}</div>
          </div>
        </div>
        
        <div className="mb-5">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key Programs</div>
          <div className="flex flex-wrap gap-1.5">
            {school.programs.slice(0, 3).map((program, index) => (
              <span key={index} className="bg-gradient-to-r from-[#0B3C5D]/10 to-[#0B3C5D]/20 text-[#0B3C5D] px-3 py-1 rounded-full text-xs font-medium border border-[#0B3C5D]/20">
                {program}
              </span>
            ))}
            {school.programs.length > 3 && (
              <span className="text-gray-500 text-xs font-medium px-2 py-1">+{school.programs.length - 3} more</span>
            )}
          </div>
        </div>
        
        {/* MODIFIED: Changed from single button to two buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-white border-2 border-[#0B3C5D] text-[#0B3C5D] py-3 px-4 rounded-xl transition-all duration-300 font-semibold text-sm hover:bg-[#0B3C5D]/5 transform hover:scale-[1.02] active:scale-[0.98]">
            View Details
          </button>
          
          {/* ADDED: Apply Now button */}
          <button 
            onClick={() => onApply(school)}
            className="flex-1 bg-gradient-to-r from-[#F2A900] to-[#D9A100] hover:from-[#D9A100] hover:to-[#C09000] text-[#0B3C5D] py-3 px-4 rounded-xl transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            Apply Now
          </button>
        </div>
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
        
        <div className={`grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4 ${isOpen ? 'block' : 'hidden sm:grid'}`}>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">School Type</label>
            <select
              value={filters.type}
              onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A900] focus:border-transparent transition-all duration-200"
            >
              <option value="">All Types</option>
              <option value="Private">Private</option>
              <option value="Public">Public</option>
              <option value="Public Charter">Charter</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Level</label>
            <select
              value={filters.level}
              onChange={(e) => onFilterChange({ ...filters, level: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A900] focus:border-transparent transition-all duration-200"
            >
              <option value="">All Levels</option>
              <option value="K-12">K-12</option>
              <option value="High School">High School</option>
              <option value="Middle School">Middle School</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Boarding Type</label>
            <select
              value={filters.boardingType}
              onChange={(e) => onFilterChange({ ...filters, boardingType: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A900] focus:border-transparent transition-all duration-200"
            >
              <option value="">All Types</option>
              <option value="Boarding & Day">Boarding & Day</option>
              <option value="Day School">Day School</option>
              <option value="Boarding">Boarding Only</option>
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
              <option value="students">Student Count</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ icon, title, value, description, color = "primary" }) => {
  const colorClasses = {
    primary: "from-[#0B3C5D] to-[#0B3C5D]/90",
    secondary: "from-[#F2A900] to-[#D9A100]",
    blue: "from-blue-500 to-indigo-500",
    green: "from-green-500 to-emerald-500"
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6 hover:shadow-2xl hover:border-[#F2A900]/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
      <div className="flex items-center">
        <div className={`bg-gradient-to-r ${colorClasses[color]} p-3 rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#0B3C5D] transition-colors duration-300">{value}</h3>
          <p className="text-sm font-semibold text-gray-600">{title}</p>
          <p className="text-xs text-gray-500">{description}</p>
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

export default function SchoolsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    level: '',
    boardingType: '',
    sortBy: 'ranking'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // ADDED: State for application modal
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // ADDED: Handler for Apply Now button
  const handleApplyClick = (school) => {
    setSelectedSchool(school);
    setShowApplicationModal(true);
  };

  const filteredSchools = useMemo(() => {
    let filtered = schoolsData.filter(school => {
      const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           school.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           school.programs.some(program => program.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = !filters.type || school.type === filters.type;
      const matchesLevel = !filters.level || school.level === filters.level;
      const matchesBoardingType = !filters.boardingType || school.boardingType === filters.boardingType;
      
      return matchesSearch && matchesType && matchesLevel && matchesBoardingType;
    });

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'tuition':
          const aTuition = a.tuition === "Free" || a.tuition === "Free*" ? 0 : parseInt(a.tuition.replace(/[$,]/g, ''));
          const bTuition = b.tuition === "Free" || b.tuition === "Free*" ? 0 : parseInt(b.tuition.replace(/[$,]/g, ''));
          return aTuition - bTuition;
        case 'acceptance':
          const aAcceptance = a.acceptance === "Lottery" ? 100 : parseFloat(a.acceptance);
          const bAcceptance = b.acceptance === "Lottery" ? 100 : parseFloat(b.acceptance);
          return aAcceptance - bAcceptance;
        case 'students':
          return parseInt(b.students.replace(/,/g, '')) - parseInt(a.students.replace(/,/g, ''));
        case 'ranking':
        default:
          return a.ranking - b.ranking;
      }
    });

    return filtered;
  }, [searchTerm, filters]);

  const stats = useMemo(() => {
    const totalSchools = schoolsData.length;
    const privateSchools = schoolsData.filter(s => s.type === 'Private').length;
    const publicSchools = schoolsData.filter(s => s.type === 'Public' || s.type === 'Public Charter').length;
    const avgAcceptance = schoolsData.reduce((acc, school) => {
      const acceptance = school.acceptance === "Lottery" ? 50 : parseFloat(school.acceptance);
      return acc + acceptance;
    }, 0) / totalSchools;

    return { totalSchools, privateSchools, publicSchools, avgAcceptance: avgAcceptance.toFixed(1) };
  }, []);

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
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/90 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 sm:py-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Top Schools & Academies
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl">
              Discover exceptional K-12 educational institutions that shape future leaders
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" /></svg>}
            title="Total Schools"
            value={stats.totalSchools}
            description="Featured institutions"
            color="primary"
          />
          <StatsCard 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2z" clipRule="evenodd" /></svg>}
            title="Private Schools"
            value={stats.privateSchools}
            description="Independent institutions"
            color="secondary"
          />
          <StatsCard 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4z" clipRule="evenodd" /></svg>}
            title="Public Schools"
            value={stats.publicSchools}
            description="Public & charter schools"
            color="blue"
          />
          <StatsCard 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>}
            title="Avg Acceptance"
            value={`${stats.avgAcceptance}%`}
            description="Average acceptance rate"
            color="green"
          />
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search schools by name, location, or programs..."
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

        {/* Results Count */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-sm">
              <span className="text-sm font-semibold text-gray-600">
                {filteredSchools.length} of {schoolsData.length} schools
              </span>
            </div>
          </div>
        </div>

        {/* Schools Grid - MODIFIED: Added onApply prop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredSchools.map(school => (
            <SchoolCard key={school.id} school={school} onApply={handleApplyClick} />
          ))}
        </div>

        {/* No Results */}
        {filteredSchools.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto border border-white/20 shadow-lg">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No schools found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters to find more results.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ type: '', level: '', boardingType: '', sortBy: 'ranking' });
                }}
                className="bg-gradient-to-r from-[#F2A900] to-[#D9A100] text-[#0B3C5D] px-6 py-3 rounded-xl font-semibold hover:from-[#D9A100] hover:to-[#C09000] transition-all duration-300"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ADDED: Application Modal */}
      {showApplicationModal && selectedSchool && (
        <ApplicationModal
          school={selectedSchool}
          onClose={() => {
            setShowApplicationModal(false);
            setSelectedSchool(null);
          }}
        />
      )}

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/90 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/90 bg-clip-text text-transparent">
                Schools Directory
              </span>
            </div>
            <p className="text-gray-600 font-medium">
              &copy; 2024 Schools Directory. Empowering educational excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}