'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

// Sample degrees data
const degreesData = [
  {
    id: 1,
    title: "Computer Science",
    level: "Bachelor's",
    duration: "4 Years",
    field: "Technology",
    ranking: 1,
    avgSalary: "$85,000",
    jobGrowth: "+22%",
    difficulty: "High",
    students: "2.1M",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
    description: "Comprehensive program covering programming, algorithms, software development, and computer systems.",
    established: "Popular since 1960s",
    careers: ["Software Engineer", "Data Scientist", "Cybersecurity Analyst", "Web Developer", "AI Engineer"],
    requirements: ["Mathematics", "Physics", "Problem Solving"],
    universities: ["MIT", "Stanford", "Carnegie Mellon", "Berkeley", "Harvard"]
  },
  {
    id: 2,
    title: "Business Administration",
    level: "Master's",
    duration: "2 Years",
    field: "Business",
    ranking: 2,
    avgSalary: "$95,000",
    jobGrowth: "+8%",
    difficulty: "Medium",
    students: "1.8M",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    description: "Advanced business management program focusing on leadership, strategy, and operations.",
    established: "Popular since 1950s",
    careers: ["Business Manager", "Consultant", "Financial Analyst", "Marketing Director", "Entrepreneur"],
    requirements: ["Bachelor's Degree", "Work Experience", "GMAT/GRE"],
    universities: ["Harvard", "Wharton", "Stanford", "Kellogg", "Booth"]
  },
  {
    id: 3,
    title: "Medicine",
    level: "Doctorate",
    duration: "8 Years",
    field: "Healthcare",
    ranking: 3,
    avgSalary: "$220,000",
    jobGrowth: "+4%",
    difficulty: "Very High",
    students: "350K",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    description: "Comprehensive medical education program preparing students to become practicing physicians.",
    established: "Traditional field",
    careers: ["Doctor", "Surgeon", "Pediatrician", "Cardiologist", "Researcher"],
    requirements: ["Pre-med Requirements", "MCAT", "Clinical Experience", "Research"],
    universities: ["Johns Hopkins", "Harvard", "UCSF", "Mayo Clinic", "Stanford"]
  },
  {
    id: 4,
    title: "Engineering",
    level: "Bachelor's",
    duration: "4 Years",
    field: "Technology",
    ranking: 4,
    avgSalary: "$75,000",
    jobGrowth: "+6%",
    difficulty: "High",
    students: "1.2M",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    description: "Applied sciences program focusing on design, building, and maintenance of structures and systems.",
    established: "Since Industrial Revolution",
    careers: ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer", "Software Engineer", "Aerospace Engineer"],
    requirements: ["Mathematics", "Physics", "Chemistry", "Problem Solving"],
    universities: ["MIT", "Stanford", "Caltech", "Georgia Tech", "Carnegie Mellon"]
  },
  {
    id: 5,
    title: "Psychology",
    level: "Bachelor's",
    duration: "4 Years",
    field: "Social Sciences",
    ranking: 5,
    avgSalary: "$65,000",
    jobGrowth: "+3%",
    difficulty: "Medium",
    students: "900K",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
    description: "Study of mind, behavior, and mental processes with applications in various fields.",
    established: "Late 19th century",
    careers: ["Clinical Psychologist", "Therapist", "School Counselor", "Research Psychologist", "HR Specialist"],
    requirements: ["Social Sciences", "Statistics", "Research Methods", "Communication"],
    universities: ["Harvard", "Stanford", "Yale", "UCLA", "University of Michigan"]
  },
  {
    id: 6,
    title: "Data Science",
    level: "Master's",
    duration: "2 Years",
    field: "Technology",
    ranking: 6,
    avgSalary: "$115,000",
    jobGrowth: "+35%",
    difficulty: "High",
    students: "180K",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    description: "Interdisciplinary program combining statistics, computer science, and domain expertise.",
    established: "Emerging field since 2000s",
    careers: ["Data Scientist", "Machine Learning Engineer", "Data Analyst", "AI Researcher", "Business Intelligence"],
    requirements: ["Mathematics", "Programming", "Statistics", "Domain Knowledge"],
    universities: ["Stanford", "MIT", "Carnegie Mellon", "Berkeley", "Harvard"]
  },
  {
    id: 7,
    title: "Nursing",
    level: "Bachelor's",
    duration: "4 Years",
    field: "Healthcare",
    ranking: 7,
    avgSalary: "$70,000",
    jobGrowth: "+7%",
    difficulty: "Medium-High",
    students: "650K",
    image: "https://images.unsplash.com/photo-1584467735871-8014b29b028c?w=400&h=300&fit=crop",
    description: "Healthcare program preparing students for nursing practice and patient care.",
    established: "Florence Nightingale era",
    careers: ["Registered Nurse", "Nurse Practitioner", "Clinical Nurse", "Nurse Educator", "Nurse Manager"],
    requirements: ["Biology", "Chemistry", "Anatomy", "Communication Skills"],
    universities: ["Johns Hopkins", "University of Pennsylvania", "UCSF", "Duke", "Emory"]
  },
  {
    id: 8,
    title: "Marketing",
    level: "Bachelor's",
    duration: "4 Years",
    field: "Business",
    ranking: 8,
    avgSalary: "$60,000",
    jobGrowth: "+10%",
    difficulty: "Medium",
    students: "450K",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    description: "Business program focusing on promotion, advertising, and customer relationship management.",
    established: "Mid-20th century",
    careers: ["Marketing Manager", "Digital Marketer", "Brand Manager", "Social Media Manager", "Market Researcher"],
    requirements: ["Communication", "Creativity", "Analytics", "Psychology"],
    universities: ["Northwestern", "Wharton", "Stanford", "Harvard", "Columbia"]
  }
];

const DegreeCard = ({ degree }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Very High':
        return "from-red-50 to-pink-50 border-red-100 text-red-800";
      case 'High':
        return "from-orange-50 to-red-50 border-orange-100 text-orange-800";
      case 'Medium-High':
        return "from-yellow-50 to-orange-50 border-yellow-100 text-yellow-800";
      case 'Medium':
        return "from-blue-50 to-indigo-50 border-blue-100 text-blue-800";
      default:
        return "from-green-50 to-emerald-50 border-green-100 text-green-800";
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Bachelor's":
        return "bg-gradient-to-r from-blue-500 to-indigo-500";
      case "Master's":
        return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "Doctorate":
        return "bg-gradient-to-r from-red-500 to-pink-500";
      case "Associate":
        return "bg-gradient-to-r from-green-500 to-teal-500";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500";
    }
  };

  const getFieldIcon = (field) => {
    switch (field) {
      case 'Technology':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
          </svg>
        );
      case 'Healthcare':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13V12a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        );
      case 'Business':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        );
      case 'Social Sciences':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
          </svg>
        );
    }
  };

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:border-cyan-200">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={degree.image}
          alt={degree.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
          #{degree.ranking}
        </div>
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold text-white ${getLevelColor(degree.level)}`}>
            {degree.level}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-800">
            {getFieldIcon(degree.field)}
            <span className="ml-1">{degree.field}</span>
          </span>
        </div>
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
            {degree.established}
          </span>
        </div>
      </div>
      
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors duration-300 leading-tight">
            {degree.title}
          </h3>
          <div className="flex items-center text-gray-500 ml-2 flex-shrink-0">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">{degree.duration}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">{degree.description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
            <div className="text-xs font-semibold text-green-700 uppercase tracking-wide">Avg Salary</div>
            <div className="text-sm font-bold text-green-800 mt-1">{degree.avgSalary}</div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3 border border-blue-100">
            <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Job Growth</div>
            <div className="text-sm font-bold text-blue-800 mt-1">{degree.jobGrowth}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Students</div>
            <div className="text-sm font-bold text-gray-900 mt-1">{degree.students}</div>
          </div>
          <div className={`bg-gradient-to-r rounded-xl p-3 border ${getDifficultyColor(degree.difficulty)}`}>
            <div className="text-xs font-semibold uppercase tracking-wide opacity-80">Difficulty</div>
            <div className="text-sm font-bold mt-1">{degree.difficulty}</div>
          </div>
        </div>
        
        <div className="mb-5">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Top Career Paths</div>
          <div className="flex flex-wrap gap-1.5">
            {degree.careers.slice(0, 3).map((career, index) => (
              <span key={index} className="bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 px-3 py-1 rounded-full text-xs font-medium border border-cyan-200">
                {career}
              </span>
            ))}
            {degree.careers.length > 3 && (
              <span className="text-gray-500 text-xs font-medium px-2 py-1">+{degree.careers.length - 3} more</span>
            )}
          </div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-3 px-4 rounded-xl transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]">
          Explore Degree
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
            <svg className="w-5 h-5 mr-2 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
            </svg>
            Filters
          </h3>
          <button
            onClick={toggleOpen}
            className="sm:hidden bg-cyan-100 text-cyan-600 p-2 rounded-xl hover:bg-cyan-200 transition-colors"
          >
            <svg className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        <div className={`grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4 ${isOpen ? 'block' : 'hidden sm:grid'}`}>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Degree Level</label>
            <select
              value={filters.level}
              onChange={(e) => onFilterChange({ ...filters, level: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">All Levels</option>
              <option value="Associate">Associate</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="Doctorate">Doctorate</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Field</label>
            <select
              value={filters.field}
              onChange={(e) => onFilterChange({ ...filters, field: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">All Fields</option>
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Social Sciences">Social Sciences</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Difficulty</label>
            <select
              value={filters.difficulty}
              onChange={(e) => onFilterChange({ ...filters, difficulty: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">All Levels</option>
              <option value="Medium">Medium</option>
              <option value="Medium-High">Medium-High</option>
              <option value="High">High</option>
              <option value="Very High">Very High</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
            >
              <option value="ranking">Popularity</option>
              <option value="title">Name</option>
              <option value="salary">Average Salary</option>
              <option value="jobGrowth">Job Growth</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ icon, title, value, description, color = "cyan" }) => {
  const colorClasses = {
    cyan: "from-cyan-500 to-blue-500",
    purple: "from-purple-500 to-pink-500",
    orange: "from-orange-500 to-red-500",
    green: "from-green-500 to-emerald-500"
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center">
        <div className={`bg-gradient-to-r ${colorClasses[color]} p-3 rounded-xl text-white`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
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

export default function DegreesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    level: '',
    field: '',
    difficulty: '',
    sortBy: 'ranking'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredDegrees = useMemo(() => {
    let filtered = degreesData.filter(degree => {
      const matchesSearch = degree.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           degree.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           degree.careers.some(career => career.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           degree.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLevel = !filters.level || degree.level === filters.level;
      const matchesField = !filters.field || degree.field === filters.field;
      const matchesDifficulty = !filters.difficulty || degree.difficulty === filters.difficulty;
      
      return matchesSearch && matchesLevel && matchesField && matchesDifficulty;
    });

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'salary':
          const aSalary = parseInt(a.avgSalary.replace(/[$,]/g, ''));
          const bSalary = parseInt(b.avgSalary.replace(/[$,]/g, ''));
          return bSalary - aSalary;
        case 'jobGrowth':
          const aGrowth = parseInt(a.jobGrowth.replace(/[+%]/g, ''));
          const bGrowth = parseInt(b.jobGrowth.replace(/[+%]/g, ''));
          return bGrowth - aGrowth;
        case 'duration':
          const aDuration = parseInt(a.duration.replace(/[^\d]/g, ''));
          const bDuration = parseInt(b.duration.replace(/[^\d]/g, ''));
          return aDuration - bDuration;
        case 'ranking':
        default:
          return a.ranking - b.ranking;
      }
    });

    return filtered;
  }, [searchTerm, filters]);

  const stats = useMemo(() => {
    const totalDegrees = degreesData.length;
    const techDegrees = degreesData.filter(d => d.field === 'Technology').length;
    const businessDegrees = degreesData.filter(d => d.field === 'Business').length;
    const avgSalary = degreesData.reduce((acc, degree) => {
      const salary = parseInt(degree.avgSalary.replace(/[$,]/g, ''));
      return acc + salary;
    }, 0) / totalDegrees;

    return { 
      totalDegrees, 
      techDegrees, 
      businessDegrees, 
      avgSalary: `$${(avgSalary / 1000).toFixed(0)}K`
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 shadow-xl">
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 sm:py-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Explore Degree Programs
            </h1>
            <p className="text-lg sm:text-xl text-cyan-100 max-w-2xl">
              Discover the perfect degree program to launch your career and achieve your professional goals
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" /></svg>}
            title="Total Degrees"
            value={stats.totalDegrees}
            description="Popular programs"
            color="cyan"
          />
          <StatsCard 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5z" clipRule="evenodd" /></svg>}
            title="Tech Degrees"
            value={stats.techDegrees}
            description="Technology programs"
            color="purple"
          />
          <StatsCard 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6z" clipRule="evenodd" /></svg>}
            title="Business Degrees"
            value={stats.businessDegrees}
            description="Business programs"
            color="orange"
          />
          <StatsCard 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>}
            title="Avg Salary"
            value={stats.avgSalary}
            description="Starting salaries"
            color="green"
          />
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search degrees by name, field, or career path..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pl-14 pr-6 text-lg bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
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
                {filteredDegrees.length} of {degreesData.length} degree programs
              </span>
            </div>
          </div>
        </div>

        {/* Degrees Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredDegrees.map(degree => (
            <DegreeCard key={degree.id} degree={degree} />
          ))}
        </div>

        {/* No Results */}
        {filteredDegrees.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto border border-white/20 shadow-lg">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No degree programs found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters to find more results.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ level: '', field: '', difficulty: '', sortBy: 'ranking' });
                }}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-300"
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