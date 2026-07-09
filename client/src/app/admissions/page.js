'use client';

import { useState, useMemo } from 'react';
import ApplicationModal from '../component/ApplicationModal';
import { MapPin, Calendar, DollarSign, BookOpen, School, Eye, ArrowRight } from 'lucide-react';

// Sample admissions data
const admissionsData = [
  {
    id: 1,
    institution: "St. Xavier's College",
    level: "Bachelors",
    affiliation: "Tribhuvan University",
    programs: ["BBA", "BBS", "BIT"],
    deadline: "June 15, 2026",
    startDate: "January 01, 2025",
    description: "Admissions Open for Foundation Level, Application Level, Advisory Level",
    location: "Maitighar, Kathmandu",
    type: "Private",
    acceptanceRate: "15%",
    students: "1,200",
    tuition: "$5,000",
    requirements: ["SLC/SEE", "Entrance Exam", "Interview"],
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
    established: 1951
  },
  {
    id: 2,
    institution: "Kathmandu Model College",
    level: "Plus Two or Diploma",
    affiliation: "NEB",
    programs: ["Science", "Management", "Humanities"],
    deadline: "May 30, 2026",
    startDate: "April 21, 2025",
    description: "Admissions Open for +2 Science, Management and Humanities",
    location: "Bagbazar, Kathmandu",
    type: "Private",
    acceptanceRate: "25%",
    students: "850",
    tuition: "$3,500",
    requirements: ["SLC/SEE Certificate", "Character Certificate"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop",
    established: 1990
  },
  {
    id: 3,
    institution: "Trinity International College",
    level: "Bachelors",
    affiliation: "Tribhuvan University",
    programs: ["BBS", "BHM", "BSW"],
    deadline: "July 15, 2026",
    startDate: "December 25, 2025",
    description: "Admission Open for Bachelors Programs",
    location: "Dillibazar, Kathmandu",
    type: "Private",
    acceptanceRate: "20%",
    students: "1,500",
    tuition: "$4,500",
    requirements: ["Higher Secondary Certificate", "Entrance Test"],
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop",
    established: 1995
  },
  {
    id: 4,
    institution: "Islington College",
    level: "Bachelors",
    affiliation: "London Metropolitan University",
    programs: ["Computing", "Business", "Networking"],
    deadline: "August 30, 2026",
    startDate: "March 15, 2025",
    description: "Admissions Open for UK Degree Programs",
    location: "Kamalpokhari, Kathmandu",
    type: "Private",
    acceptanceRate: "30%",
    students: "2,000",
    tuition: "$8,000",
    requirements: ["10+2 or Equivalent", "IELTS/PTE", "Interview"],
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop",
    established: 2000
  },
  {
    id: 5,
    institution: "Padma Kanya Campus",
    level: "Bachelors",
    affiliation: "Tribhuvan University",
    programs: ["BA", "BSc", "BED"],
    deadline: "June 30, 2026",
    startDate: "February 10, 2025",
    description: "Admissions Open for Various Bachelor Programs",
    location: "Bagbazar, Kathmandu",
    type: "Public",
    acceptanceRate: "40%",
    students: "3,500",
    tuition: "$500",
    requirements: ["10+2 Certificate", "Entrance Examination"],
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
    established: 1951
  },
  {
    id: 6,
    institution: "Budhanilkantha School",
    level: "Short-Term-Training",
    affiliation: "Government of Nepal",
    programs: ["Skill Development", "Vocational Training"],
    deadline: "Rolling",
    startDate: "January 05, 2025",
    description: "Admission Open for Skill Development Programs",
    location: "Budhanilkantha, Kathmandu",
    type: "Government",
    acceptanceRate: "100%",
    students: "500",
    tuition: "Free",
    requirements: ["SLC or Equivalent"],
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop",
    established: 1972
  },
  {
    id: 7,
    institution: "ACCA Nepal",
    level: "Chartered Accountancy (CA)",
    affiliation: "ACCA",
    programs: ["ACCA Foundation", "ACCA Professional"],
    deadline: "September 30, 2026",
    startDate: "January 20, 2025",
    description: "Admissions Open for ACCA Programs",
    location: "Putalisadak, Kathmandu",
    type: "Private",
    acceptanceRate: "50%",
    students: "800",
    tuition: "$6,000",
    requirements: ["10+2 or Equivalent", "Registration with ACCA"],
    image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400&h=300&fit=crop",
    established: 2005
  },
  {
    id: 8,
    institution: "Little Angels School",
    level: "Pre-Diploma",
    affiliation: "Government of Nepal",
    programs: ["Montessori", "Nursery", "KG"],
    deadline: "April 30, 2026",
    startDate: "March 01, 2025",
    description: "Admission Open for Play Group",
    location: "Hattiban, Lalitpur",
    type: "Private",
    acceptanceRate: "60%",
    students: "2,500",
    tuition: "$2,000",
    requirements: ["Age Requirement", "Parent Interview"],
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop",
    established: 1990
  }
];

const AdmissionCard = ({ admission, onApply }) => {
  const getTypeBadgeStyle = (type) => {
    switch (type) {
      case 'Private':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Public':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Government':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* College Image Header */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-100">
        <img
          src={admission.image || "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop"}
          alt={admission.institution}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Abstract overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
        
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm shadow-sm text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md text-gray-800">
          {admission.level}
        </div>

        <div className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border backdrop-blur-sm shadow-sm ${getTypeBadgeStyle(admission.type)}`}>
          {admission.type}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Institution & Location */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[#0B3C5D] font-bold text-lg md:text-xl leading-snug group-hover:text-[#F2A900] transition-colors duration-200 line-clamp-1">
              {admission.institution}
            </h3>
          </div>
          <div className="flex items-center gap-1 text-gray-500 font-semibold text-xs mt-1">
            <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <span>{admission.location}</span>
          </div>

          {/* Description Title */}
          <p className="text-sm font-semibold text-gray-700 mt-3 line-clamp-2 min-h-[2.5rem] leading-snug">
            {admission.description}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 my-4 pt-3 border-t border-gray-100 text-xs text-gray-600 font-semibold">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              <span className="truncate">Until {admission.deadline}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              <span className="truncate">{admission.affiliation}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              <span className="truncate">Tuition: {admission.tuition}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500 font-medium">
              <School className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              <span>Estd. {admission.established}</span>
            </div>
          </div>

          {/* Programs Offered */}
          <div className="mb-4">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1.5">Programs Offered</span>
            <div className="flex flex-wrap gap-1">
              {admission.programs.map((program, idx) => (
                <span key={idx} className="bg-gray-50 text-gray-700 text-[11px] px-2 py-0.5 rounded border border-gray-100 font-medium">
                  {program}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-100 pt-4 flex gap-2">
          <button
            className="flex-1 bg-white border border-gray-200 hover:border-[#0B3C5D] hover:bg-gray-50 text-gray-700 hover:text-[#0B3C5D] py-2.5 px-3 rounded-xl transition-all duration-200 font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            View Details
          </button>

          <button
            onClick={() => onApply(admission)}
            className="flex-1 bg-gradient-to-r from-[#F2A900] to-[#D9A100] hover:from-[#D9A100] hover:to-[#C09000] text-white py-2.5 px-3 rounded-xl transition-all duration-200 font-bold text-xs shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 active:scale-[0.98]"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AdmissionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState(null);

  const handleApplyClick = (admission) => {
    setSelectedAdmission(admission);
    setShowApplicationModal(true);
  };

  const filteredAdmissions = useMemo(() => {
    return admissionsData.filter(admission => {
      const matchesSearch =
        admission.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admission.programs.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesSearch;
    });
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Blue Gradient Header */}
      <div className="bg-gradient-to-r from-[#1a4d6d] via-[#2d5f7f] to-[#3d7fa0] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Degree Programs
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl">
            Discover the perfect degree program to launch your career and achieve your professional goals
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for admissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-black font-bold">
            Showing {filteredAdmissions.length} of {admissionsData.length} admissions
          </p>
        </div>

        {/* Admissions List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredAdmissions.map((admission) => (
            <AdmissionCard key={admission.id} admission={admission} onApply={handleApplyClick} />
          ))}
        </div>

        {/* No Results */}
        {filteredAdmissions.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No admissions found</h3>
            <p className="text-black mb-4 font-bold">Try adjusting your search</p>
            <button
              onClick={() => setSearchTerm('')}
              className="bg-gradient-to-r from-[#F2A900] to-[#D9A100] text-white px-6 py-2 rounded-lg font-semibold hover:from-[#D9A100] hover:to-[#C09000] transition-all"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedAdmission && (
        <ApplicationModal
          school={selectedAdmission}
          onClose={() => {
            setShowApplicationModal(false);
            setSelectedAdmission(null);
          }}
        />
      )}
    </div>
  );
}