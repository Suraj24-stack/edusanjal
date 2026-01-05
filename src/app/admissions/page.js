'use client';

import { useState, useEffect, useMemo } from 'react';
import ApplicationModal from '../component/ApplicationModal';

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

const levels = [
  "Short-Term-Training",
  "Pre-Diploma", 
  "Plus Two or Diploma",
  "Bachelors",
  "Chartered Accountancy (CA)",
  "Post Graduate Diploma"
];

const affiliations = [
  "ACCA",
  "Agriculture and Forestry University",
  "CPA Australia",
  "Government of Nepal",
  "Kathmandu University",
  "London Metropolitan University",
  "NEB",
  "Purbanchal University",
  "Tribhuvan University"
];

const AdmissionCard = ({ admission, onApply }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-xl font-bold text-gray-900 mb-3">
        {admission.description}
      </h2>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <span className="text-sm">
            <span className="font-semibold">From</span> {admission.startDate} <span className="font-semibold">Until</span> {admission.deadline}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <span className="text-sm font-medium">{admission.institution}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
            {admission.level}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">
            {admission.affiliation}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
            {admission.type}
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">Programs:</span> {admission.programs.join(', ')}
          </div>
        </div>
        
        <div className="mt-4">
          <button
            onClick={() => onApply(admission)}
            className="w-full bg-gradient-to-r from-[#F2A900] to-[#D9A100] hover:from-[#D9A100] hover:to-[#C09000] text-white py-3 px-4 rounded-lg transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
            </svg>
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AdmissionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedAffiliations, setSelectedAffiliations] = useState([]);
  const [levelSearch, setLevelSearch] = useState('');
  const [affiliationSearch, setAffiliationSearch] = useState('');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState(null);

  const handleApplyClick = (admission) => {
    setSelectedAdmission(admission);
    setShowApplicationModal(true);
  };

  const toggleLevel = (level) => {
    setSelectedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const toggleAffiliation = (affiliation) => {
    setSelectedAffiliations(prev => 
      prev.includes(affiliation)
        ? prev.filter(a => a !== affiliation)
        : [...prev, affiliation]
    );
  };

  const filteredLevels = levels.filter(level => 
    level.toLowerCase().includes(levelSearch.toLowerCase())
  );

  const filteredAffiliations = affiliations.filter(affiliation => 
    affiliation.toLowerCase().includes(affiliationSearch.toLowerCase())
  );

  const filteredAdmissions = useMemo(() => {
    return admissionsData.filter(admission => {
      const matchesSearch = 
        admission.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admission.programs.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(admission.level);
      const matchesAffiliation = selectedAffiliations.length === 0 || selectedAffiliations.includes(admission.affiliation);
      
      return matchesSearch && matchesLevel && matchesAffiliation;
    });
  }, [searchTerm, selectedLevels, selectedAffiliations]);

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
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-80 flex-shrink-0">
            {/* Level Filter */}
            <div className="bg-white rounded-lg border border-gray-200 mb-4">
              <button 
                className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-gray-900 hover:bg-gray-50"
              >
                <span>Level</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="px-4 pb-4">
                <input
                  type="text"
                  placeholder="Search level"
                  value={levelSearch}
                  onChange={(e) => setLevelSearch(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                />
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredLevels.map((level) => (
                    <label key={level} className="flex items-start cursor-pointer hover:bg-gray-50 p-1 rounded">
                      <input
                        type="checkbox"
                        checked={selectedLevels.includes(level)}
                        onChange={() => toggleLevel(level)}
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Affiliation Filter */}
            <div className="bg-white rounded-lg border border-gray-200">
              <button 
                className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-gray-900 hover:bg-gray-50"
              >
                <span>Affiliation</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="px-4 pb-4">
                <input
                  type="text"
                  placeholder="Search affiliation"
                  value={affiliationSearch}
                  onChange={(e) => setAffiliationSearch(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                />
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredAffiliations.map((affiliation) => (
                    <label key={affiliation} className="flex items-start cursor-pointer hover:bg-gray-50 p-1 rounded">
                      <input
                        type="checkbox"
                        checked={selectedAffiliations.includes(affiliation)}
                        onChange={() => toggleAffiliation(affiliation)}
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{affiliation}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for admissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <p className="text-sm text-gray-600">
                Showing {filteredAdmissions.length} of {admissionsData.length} admissions
              </p>
            </div>

            {/* Admissions List */}
            <div className="space-y-4">
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
                <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedLevels([]);
                    setSelectedAffiliations([]);
                  }}
                  className="bg-gradient-to-r from-[#F2A900] to-[#D9A100] text-white px-6 py-2 rounded-lg font-semibold hover:from-[#D9A100] hover:to-[#C09000] transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
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
