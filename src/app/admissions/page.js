'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

// Sample admissions data
const admissionsData = [
  {
    id: 1,
    institution: "Harvard University",
    type: "University",
    level: "Undergraduate",
    deadline: "January 1, 2025",
    acceptanceRate: "3.4%",
    avgGPA: "4.18",
    avgSAT: "1520",
    avgACT: "34",
    applicationFee: "$85",
    requirements: ["Common App", "SAT/ACT", "Essays", "Letters of Recommendation", "Transcripts"],
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop",
    description: "Highly competitive admission process with holistic review of academic excellence and personal achievements.",
    earlyDecision: "November 1",
    regularDecision: "January 1",
    notificationDate: "March 30",
    tuition: "$54,880",
    financialAid: "100% need met",
    interviews: "Optional"
  },
  {
    id: 2,
    institution: "Stanford University",
    type: "University",
    level: "Undergraduate",
    deadline: "January 2, 2025",
    acceptanceRate: "4.3%",
    avgGPA: "4.16",
    avgSAT: "1505",
    avgACT: "33",
    applicationFee: "$90",
    requirements: ["Coalition App", "SAT/ACT", "Essays", "Letters of Recommendation", "Transcripts"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    description: "Seeks students with intellectual vitality and demonstrated leadership potential.",
    earlyDecision: "November 1",
    regularDecision: "January 2",
    notificationDate: "April 1",
    tuition: "$56,169",
    financialAid: "No loan policy",
    interviews: "Not offered"
  },
  {
    id: 3,
    institution: "MIT",
    type: "University",
    level: "Undergraduate",
    deadline: "January 1, 2025",
    acceptanceRate: "6.7%",
    avgGPA: "4.15",
    avgSAT: "1535",
    avgACT: "35",
    applicationFee: "$85",
    requirements: ["MIT Application", "SAT/ACT", "Subject Tests", "Essays", "Letters of Recommendation"],
    image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400&h=300&fit=crop",
    description: "Looks for students who have challenged themselves academically and shown creativity.",
    earlyDecision: "November 1",
    regularDecision: "January 1",
    notificationDate: "March 14",
    tuition: "$53,790",
    financialAid: "Need-blind admission",
    interviews: "Recommended"
  },
  {
    id: 4,
    institution: "UC Berkeley",
    type: "University",
    level: "Undergraduate",
    deadline: "November 30, 2024",
    acceptanceRate: "17.5%",
    avgGPA: "4.25",
    avgSAT: "1405",
    avgACT: "32",
    applicationFee: "$80",
    requirements: ["UC Application", "SAT/ACT", "Personal Insight Questions", "Transcripts"],
    image: "https://images.unsplash.com/photo-1481026469463-66327c86e544?w=400&h=300&fit=crop",
    description: "Comprehensive review process considering academic achievement and personal context.",
    earlyDecision: "N/A",
    regularDecision: "November 30",
    notificationDate: "March 31",
    tuition: "$14,226",
    financialAid: "Blue and Gold Plan",
    interviews: "Not required"
  },
  {
    id: 5,
    institution: "Phillips Exeter Academy",
    type: "High School",
    level: "Secondary",
    deadline: "January 15, 2025",
    acceptanceRate: "15%",
    avgGPA: "A average",
    avgSSAT: "85th percentile",
    avgACT: "N/A",
    applicationFee: "$50",
    requirements: ["Gateway Application", "SSAT", "Essays", "Interviews", "Transcripts"],
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
    description: "Holistic admission process evaluating academic potential and character.",
    earlyDecision: "N/A",
    regularDecision: "January 15",
    notificationDate: "March 10",
    tuition: "$57,000",
    financialAid: "Need-blind admission",
    interviews: "Required"
  },
  {
    id: 6,
    institution: "Harvard Medical School",
    type: "Graduate School",
    level: "Graduate",
    deadline: "October 15, 2024",
    acceptanceRate: "2.8%",
    avgGPA: "3.9",
    avgMCAT: "520",
    avgACT: "N/A",
    applicationFee: "$100",
    requirements: ["AMCAS", "MCAT", "Essays", "Clinical Experience", "Research"],
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    description: "Extremely competitive program seeking future physician leaders.",
    earlyDecision: "August 1",
    regularDecision: "October 15",
    notificationDate: "March 15",
    tuition: "$69,300",
    financialAid: "Need-based aid",
    interviews: "Required"
  },
  {
    id: 7,
    institution: "Wharton Business School",
    type: "Graduate School",
    level: "Graduate",
    deadline: "September 6, 2024",
    acceptanceRate: "20.7%",
    avgGPA: "3.6",
    avgGMAT: "730",
    avgACT: "N/A",
    applicationFee: "$250",
    requirements: ["Online Application", "GMAT/GRE", "Essays", "Work Experience", "Interviews"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    description: "Seeks candidates with leadership potential and professional impact.",
    earlyDecision: "September 6",
    regularDecision: "January 3",
    notificationDate: "March 30",
    tuition: "$84,874",
    financialAid: "Merit scholarships",
    interviews: "By invitation"
  },
  {
    id: 8,
    institution: "Community College",
    type: "Community College",
    level: "Undergraduate",
    deadline: "Rolling",
    acceptanceRate: "100%",
    avgGPA: "2.0",
    avgSAT: "Optional",
    avgACT: "Optional",
    applicationFee: "$25",
    requirements: ["Application", "High School Diploma/GED", "Placement Tests"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop",
    description: "Open admission policy providing accessible higher education opportunities.",
    earlyDecision: "N/A",
    regularDecision: "Rolling",
    notificationDate: "Immediate",
    tuition: "$3,800",
    financialAid: "Pell Grant eligible",
    interviews: "Not required"
  }
];

const timelineData = [
  {
    month: "September",
    tasks: ["Research schools", "Request transcripts", "Ask for recommendation letters", "Start essays"],
    priority: "high",
    color: "bg-red-500"
  },
  {
    month: "October",
    tasks: ["Take SAT/ACT", "Complete essays", "Submit early applications", "Schedule interviews"],
    priority: "high",
    color: "bg-[#F2A900]"
  },
  {
    month: "November",
    tasks: ["Submit remaining applications", "Complete interviews", "Apply for scholarships"],
    priority: "medium",
    color: "bg-yellow-500"
  },
  {
    month: "December",
    tasks: ["Submit final applications", "Send fall grades", "Continue scholarship search"],
    priority: "medium",
    color: "bg-green-500"
  },
  {
    month: "January-March",
    tasks: ["Wait for decisions", "Visit campuses", "Compare financial aid offers"],
    priority: "low",
    color: "bg-[#0B3C5D]"
  },
  {
    month: "April-May",
    tasks: ["Make final decision", "Submit deposit", "Plan for college"],
    priority: "high",
    color: "bg-purple-500"
  }
];

const AdmissionCard = ({ admission }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case 'University':
        return "from-[#F2A900]/10 to-[#F2A900]/20 border-[#F2A900]/30 text-[#0B3C5D]";
      case 'High School':
        return "from-green-50 to-emerald-50 border-green-100 text-green-800";
      case 'Graduate School':
        return "from-purple-50 to-pink-50 border-purple-100 text-purple-800";
      case 'Community College':
        return "from-[#0B3C5D]/10 to-[#0B3C5D]/20 border-[#0B3C5D]/30 text-[#0B3C5D]";
      default:
        return "from-gray-50 to-slate-50 border-gray-100 text-gray-800";
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Undergraduate":
        return "bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/90";
      case "Graduate":
        return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "Secondary":
        return "bg-gradient-to-r from-green-500 to-teal-500";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500";
    }
  };

  const getAcceptanceColor = (rate) => {
    const percentage = parseFloat(rate);
    if (percentage <= 5) return "from-red-50 to-pink-50 border-red-100 text-red-800";
    if (percentage <= 15) return "from-orange-50 to-red-50 border-orange-100 text-orange-800";
    if (percentage <= 30) return "from-[#F2A900]/10 to-[#F2A900]/20 border-[#F2A900]/30 text-[#0B3C5D]";
    if (percentage <= 50) return "from-[#0B3C5D]/10 to-[#0B3C5D]/20 border-[#0B3C5D]/30 text-[#0B3C5D]";
    return "from-green-50 to-emerald-50 border-green-100 text-green-800";
  };

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:border-[#F2A900]/30">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={admission.image}
          alt={admission.institution}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/90 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
          {admission.acceptanceRate}
        </div>
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold text-white ${getLevelColor(admission.level)}`}>
            {admission.level}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
            Due: {admission.deadline}
          </span>
        </div>
      </div>
      
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-[#0B3C5D] transition-colors duration-300 leading-tight">
            {admission.institution}
          </h3>
          <div className="flex items-center text-gray-500 ml-2 flex-shrink-0">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-gradient-to-r ${getTypeColor(admission.type)} border`}>
          {admission.type}
        </div>
        
        <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">{admission.description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className={`bg-gradient-to-r rounded-xl p-3 border ${getAcceptanceColor(admission.acceptanceRate)}`}>
            <div className="text-xs font-semibold uppercase tracking-wide opacity-80">Acceptance</div>
            <div className="text-sm font-bold mt-1">{admission.acceptanceRate}</div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
            <div className="text-xs font-semibold text-green-700 uppercase tracking-wide">App Fee</div>
            <div className="text-sm font-bold text-green-800 mt-1">{admission.applicationFee}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Avg GPA</div>
            <div className="text-sm font-bold text-gray-900 mt-1">{admission.avgGPA}</div>
          </div>
          <div className="bg-gradient-to-r from-[#0B3C5D]/10 to-[#0B3C5D]/20 rounded-xl p-3 border border-[#0B3C5D]/30">
            <div className="text-xs font-semibold text-[#0B3C5D] uppercase tracking-wide">Test Score</div>
            <div className="text-sm font-bold text-[#0B3C5D] mt-1">
              {admission.avgSAT !== "Optional" && admission.avgSAT !== "N/A" ? admission.avgSAT : 
               admission.avgMCAT !== "N/A" ? admission.avgMCAT :
               admission.avgGMAT !== "N/A" ? admission.avgGMAT :
               admission.avgSSAT !== "N/A" ? admission.avgSSAT : "Optional"}
            </div>
          </div>
        </div>
        
        <div className="mb-5">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key Requirements</div>
          <div className="flex flex-wrap gap-1.5">
            {admission.requirements.slice(0, 3).map((requirement, index) => (
              <span key={index} className="bg-gradient-to-r from-[#0B3C5D]/10 to-[#0B3C5D]/20 text-[#0B3C5D] px-3 py-1 rounded-full text-xs font-medium border border-[#0B3C5D]/20">
                {requirement}
              </span>
            ))}
            {admission.requirements.length > 3 && (
              <span className="text-gray-500 text-xs font-medium px-2 py-1">+{admission.requirements.length - 3} more</span>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="flex-1 bg-gradient-to-r from-[#F2A900] to-[#D9A100] hover:from-[#D9A100] hover:to-[#C09000] text-[#0B3C5D] py-3 px-4 rounded-xl transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]">
            Apply Now
          </button>
          <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors duration-200 font-semibold text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm2 2a1 1 0 000 2h6a1 1 0 100-2H5z" clipRule="evenodd" />
            </svg>
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
            Admission Filters
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
            <label className="block text-sm font-semibold text-gray-700">Institution Type</label>
            <select
              value={filters.type}
              onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A900] focus:border-transparent transition-all duration-200"
            >
              <option value="">All Types</option>
              <option value="University">University</option>
              <option value="High School">High School</option>
              <option value="Graduate School">Graduate School</option>
              <option value="Community College">Community College</option>
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
              <option value="Undergraduate">Undergraduate</option>
              <option value="Graduate">Graduate</option>
              <option value="Secondary">Secondary</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Deadline</label>
            <select
              value={filters.deadline}
              onChange={(e) => onFilterChange({ ...filters, deadline: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A900] focus:border-transparent transition-all duration-200"
            >
              <option value="">All Deadlines</option>
              <option value="Soon">Due Soon (&lt; 30 days)</option>
              <option value="Month">Next Month</option>
              <option value="Quarter">Next Quarter</option>
              <option value="Rolling">Rolling Admission</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A900] focus:border-transparent transition-all duration-200"
            >
              <option value="deadline">Deadline</option>
              <option value="acceptance">Acceptance Rate</option>
              <option value="name">Institution Name</option>
              <option value="fee">Application Fee</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineCard = ({ timeline }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6 hover:shadow-xl hover:border-[#F2A900]/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
      <div className="flex items-center mb-4">
        <div className={`w-4 h-4 rounded-full ${timeline.color} mr-3 group-hover:scale-110 transition-transform duration-300`}></div>
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#0B3C5D] transition-colors duration-300">{timeline.month}</h3>
      </div>
      <div className="space-y-2">
        {timeline.tasks.map((task, index) => (
          <div key={index} className="flex items-center text-sm text-gray-700">
            <svg className="w-4 h-4 text-[#F2A900] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {task}
          </div>
        ))}
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

export default function AdmissionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    level: '',
    deadline: '',
    sortBy: 'deadline'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('applications');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredAdmissions = useMemo(() => {
    let filtered = admissionsData.filter(admission => {
      const matchesSearch = admission.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           admission.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           admission.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = !filters.type || admission.type === filters.type;
      const matchesLevel = !filters.level || admission.level === filters.level;
      
      // Simplified deadline filtering for demo
      const matchesDeadline = !filters.deadline || 
        (filters.deadline === 'Rolling' && admission.deadline === 'Rolling') ||
        (filters.deadline === 'Soon' && admission.deadline.includes('2024'));
      
      return matchesSearch && matchesType && matchesLevel && matchesDeadline;
    });

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.institution.localeCompare(b.institution);
        case 'acceptance':
          const aRate = parseFloat(a.acceptanceRate.replace('%', ''));
          const bRate = parseFloat(b.acceptanceRate.replace('%', ''));
          return aRate - bRate;
        case 'fee':
          const aFee = parseInt(a.applicationFee.replace(/[$]/g, ''));
          const bFee = parseInt(b.applicationFee.replace(/[$]/g, ''));
          return aFee - bFee;
        case 'deadline':
        default:
          return new Date(a.deadline) - new Date(b.deadline);
      }
    });

    return filtered;
  }, [searchTerm, filters]);

  const stats = useMemo(() => {
    const totalApplications = admissionsData.length;
    const avgAcceptance = admissionsData.reduce((acc, admission) => {
      const rate = parseFloat(admission.acceptanceRate.replace('%', ''));
      return acc + rate;
    }, 0) / totalApplications;
    const avgFee = admissionsData.reduce((acc, admission) => {
      const fee = parseInt(admission.applicationFee.replace(/[$]/g, ''));
      return acc + fee;
    }, 0) / totalApplications;

    return { 
      totalApplications, 
      avgAcceptance: `${avgAcceptance.toFixed(1)}%`,
      avgFee: `$${Math.round(avgFee)}`,
      upcomingDeadlines: admissionsData.filter(a => a.deadline.includes('2024')).length
    };
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
              College Admissions Hub
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl">
              Navigate your path to higher education with comprehensive admission information and guidance
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            title="Total Applications"
            value={stats.totalApplications}
            description="Available programs"
            color="primary"
          />
          <StatsCard 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>}
            title="Avg Acceptance"
            value={stats.avgAcceptance}
            description="Average rate"
            color="blue"
          />
          <StatsCard 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>}
            title="Avg App Fee"
            value={stats.avgFee}
            description="Application cost"
            color="green"
          />
          <StatsCard 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>}
            title="Urgent Deadlines"
            value={stats.upcomingDeadlines}
            description="Due this year"
            color="secondary"
          />
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-2">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('applications')}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                  activeTab === 'applications' 
                    ? 'bg-gradient-to-r from-[#F2A900] to-[#D9A100] text-[#0B3C5D] shadow-lg' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Applications
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                  activeTab === 'timeline' 
                    ? 'bg-gradient-to-r from-[#F2A900] to-[#D9A100] text-[#0B3C5D] shadow-lg' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Timeline
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'applications' && (
          <>
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search institutions, requirements, or application types..."
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
                    {filteredAdmissions.length} of {admissionsData.length} admission opportunities
                  </span>
                </div>
              </div>
            </div>

            {/* Admissions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredAdmissions.map(admission => (
                <AdmissionCard key={admission.id} admission={admission} />
              ))}
            </div>

            {/* No Results */}
            {filteredAdmissions.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto border border-white/20 shadow-lg">
                  <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No applications found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters to find more opportunities.</p>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setFilters({ type: '', level: '', deadline: '', sortBy: 'deadline' });
                    }}
                    className="bg-gradient-to-r from-[#F2A900] to-[#D9A100] text-[#0B3C5D] px-6 py-3 rounded-xl font-semibold hover:from-[#D9A100] hover:to-[#C09000] transition-all duration-300"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Timeline</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Stay organized with our comprehensive admission timeline. Plan ahead and never miss an important deadline.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {timelineData.map((timeline, index) => (
                <TimelineCard key={index} timeline={timeline} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}