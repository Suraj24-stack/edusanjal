'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

// Sample vacancies data for Nepal
const vacanciesData = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Leapfrog Technology",
    location: "Kathmandu, Nepal",
    type: "Full-time",
    category: "Technology",
    experience: "2-4 years",
    salary: "NPR 80,000 - 120,000",
    deadline: "2024-12-15",
    postedDate: "2024-11-15",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
    description: "Join our dynamic team to develop cutting-edge software solutions using modern technologies.",
    requirements: ["Bachelor's in Computer Science", "React/Node.js experience", "Problem-solving skills"],
    benefits: ["Health Insurance", "Performance Bonus", "Remote Work", "Professional Development"],
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    applicants: 45,
    isUrgent: true,
    companyLogo: "🚀"
  },
  {
    id: 2,
    title: "Banking Officer",
    company: "Nepal Investment Bank",
    location: "Kathmandu, Nepal",
    type: "Full-time",
    category: "Banking",
    experience: "1-3 years",
    salary: "NPR 60,000 - 90,000",
    deadline: "2024-12-20",
    postedDate: "2024-11-10",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    description: "Seeking dedicated banking professionals to join our expanding branch network.",
    requirements: ["Bachelor's degree", "Banking knowledge", "Customer service skills"],
    benefits: ["Life Insurance", "Medical Coverage", "Festival Bonus", "Career Growth"],
    skills: ["Financial Analysis", "Customer Service", "Banking Operations", "Communication"],
    applicants: 123,
    isUrgent: false,
    companyLogo: "🏦"
  },
  {
    id: 3,
    title: "Civil Engineer",
    company: "Department of Roads",
    location: "Pokhara, Nepal",
    type: "Government",
    category: "Engineering",
    experience: "3-5 years",
    salary: "NPR 70,000 - 100,000",
    deadline: "2024-12-10",
    postedDate: "2024-11-05",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    description: "Government position for infrastructure development projects across Nepal.",
    requirements: ["Civil Engineering degree", "Government exam qualification", "Project management"],
    benefits: ["Job Security", "Pension", "Medical Benefits", "Government Holidays"],
    skills: ["AutoCAD", "Project Management", "Construction", "Quality Control"],
    applicants: 89,
    isUrgent: true,
    companyLogo: "🏗️"
  },
  {
    id: 4,
    title: "English Teacher",
    company: "Kathmandu University School",
    location: "Dhulikhel, Nepal",
    type: "Full-time",
    category: "Education",
    experience: "1-2 years",
    salary: "NPR 40,000 - 65,000",
    deadline: "2024-12-25",
    postedDate: "2024-11-12",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop",
    description: "Inspire young minds and shape the future of education in Nepal.",
    requirements: ["Education degree", "Teaching certification", "English proficiency"],
    benefits: ["Summer Vacation", "Professional Development", "Health Insurance"],
    skills: ["Classroom Management", "Curriculum Development", "Student Assessment"],
    applicants: 67,
    isUrgent: false,
    companyLogo: "📚"
  },
  {
    id: 5,
    title: "Marketing Manager",
    company: "Himalayan Bank Limited",
    location: "Lalitpur, Nepal",
    type: "Full-time",
    category: "Marketing",
    experience: "3-6 years",
    salary: "NPR 90,000 - 130,000",
    deadline: "2024-12-18",
    postedDate: "2024-11-08",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    description: "Lead marketing initiatives for Nepal's leading financial institution.",
    requirements: ["Marketing degree", "Digital marketing experience", "Team leadership"],
    benefits: ["Performance Incentives", "Car Allowance", "Medical Insurance"],
    skills: ["Digital Marketing", "Brand Management", "Analytics", "Leadership"],
    applicants: 78,
    isUrgent: false,
    companyLogo: "📈"
  },
  {
    id: 6,
    title: "Nurse",
    company: "Tribhuvan University Teaching Hospital",
    location: "Kathmandu, Nepal",
    type: "Full-time",
    category: "Healthcare",
    experience: "0-2 years",
    salary: "NPR 45,000 - 70,000",
    deadline: "2024-12-22",
    postedDate: "2024-11-14",
    image: "https://images.unsplash.com/photo-1584467735871-8014b29b028c?w=400&h=300&fit=crop",
    description: "Join Nepal's premier healthcare institution and serve the community.",
    requirements: ["Nursing degree", "Registration certificate", "Compassionate care"],
    benefits: ["Medical Coverage", "Night Allowance", "Professional Development"],
    skills: ["Patient Care", "Medical Procedures", "Emergency Response", "Communication"],
    applicants: 156,
    isUrgent: true,
    companyLogo: "🏥"
  },
  {
    id: 7,
    title: "Data Analyst",
    company: "F1Soft International",
    location: "Kathmandu, Nepal",
    type: "Full-time",
    category: "Technology",
    experience: "2-4 years",
    salary: "NPR 75,000 - 110,000",
    deadline: "2024-12-28",
    postedDate: "2024-11-16",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    description: "Analyze data to drive business decisions in Nepal's fintech industry.",
    requirements: ["Statistics/Math degree", "Python/R experience", "SQL knowledge"],
    benefits: ["Flexible Hours", "Learning Budget", "Health Insurance", "Snacks"],
    skills: ["Python", "SQL", "Data Visualization", "Statistics"],
    applicants: 34,
    isUrgent: false,
    companyLogo: "📊"
  },
  {
    id: 8,
    title: "Project Coordinator",
    company: "World Wildlife Fund Nepal",
    location: "Kathmandu, Nepal",
    type: "Contract",
    category: "Non-Profit",
    experience: "2-5 years",
    salary: "NPR 85,000 - 120,000",
    deadline: "2024-12-30",
    postedDate: "2024-11-18",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    description: "Lead conservation projects to protect Nepal's biodiversity and ecosystems.",
    requirements: ["Environmental Science degree", "Project management", "Field experience"],
    benefits: ["Travel Opportunities", "Training Programs", "Medical Insurance"],
    skills: ["Project Management", "Research", "Community Engagement", "Report Writing"],
    applicants: 23,
    isUrgent: false,
    companyLogo: "🌿"
  }
];

const JobCard = ({ job }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case 'Full-time':
        return "from-green-50 to-emerald-50 border-green-100 text-green-800";
      case 'Part-time':
        return "from-blue-50 to-cyan-50 border-blue-100 text-blue-800";
      case 'Contract':
        return "from-orange-50 to-amber-50 border-orange-100 text-orange-800";
      case 'Government':
        return "from-purple-50 to-indigo-50 border-purple-100 text-purple-800";
      default:
        return "from-gray-50 to-slate-50 border-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Technology':
        return "bg-gradient-to-r from-blue-500 to-indigo-500";
      case 'Banking':
        return "bg-gradient-to-r from-green-500 to-emerald-500";
      case 'Engineering':
        return "bg-gradient-to-r from-orange-500 to-red-500";
      case 'Education':
        return "bg-gradient-to-r from-purple-500 to-pink-500";
      case 'Healthcare':
        return "bg-gradient-to-r from-cyan-500 to-teal-500";
      case 'Marketing':
        return "bg-gradient-to-r from-pink-500 to-rose-500";
      case 'Non-Profit':
        return "bg-gradient-to-r from-emerald-500 to-green-500";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500";
    }
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysUntilDeadline(job.deadline);

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:border-emerald-200">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={job.image}
          alt={job.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Urgent Badge */}
        {job.isUrgent && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg animate-pulse">
            Urgent
          </div>
        )}
        
        {/* Days Left */}
        <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-sm font-bold shadow-lg ${
          daysLeft <= 7 ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white' :
          daysLeft <= 14 ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white' :
          'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
        }`}>
          {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
        </div>
        
        {/* Company Logo */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-2xl bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            {job.companyLogo}
          </span>
        </div>
      </div>
      
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300 leading-tight">
            {job.title}
          </h3>
          <div className="flex items-center text-gray-500 ml-2 flex-shrink-0">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <p className="text-gray-600 font-semibold">{job.company}</p>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold text-white ${getCategoryColor(job.category)}`}>
            {job.category}
          </span>
        </div>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {job.location}
          </div>
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getTypeColor(job.type)} border`}>
            {job.type}
          </div>
        </div>
        
        <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">{job.description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Experience</div>
            <div className="text-sm font-bold text-gray-900 mt-1">{job.experience}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Applicants</div>
            <div className="text-sm font-bold text-gray-900 mt-1">{job.applicants}</div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100 col-span-2">
            <div className="text-xs font-semibold text-green-700 uppercase tracking-wide">Salary</div>
            <div className="text-sm font-bold text-green-800 mt-1">{job.salary}</div>
          </div>
        </div>
        
        <div className="mb-5">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key Skills</div>
          <div className="flex flex-wrap gap-1.5">
            {job.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium border border-emerald-200">
                {skill}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="text-gray-500 text-xs font-medium px-2 py-1">+{job.skills.length - 3} more</span>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 px-4 rounded-xl transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]">
            Apply Now
          </button>
          <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors duration-200 font-semibold text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
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
            <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
            </svg>
            Job Filters
          </h3>
          <button
            onClick={toggleOpen}
            className="sm:hidden bg-emerald-100 text-emerald-600 p-2 rounded-xl hover:bg-emerald-200 transition-colors"
          >
            <svg className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        <div className={`grid grid-cols-1 sm:grid-cols-5 gap-4 mt-4 ${isOpen ? 'block' : 'hidden sm:grid'}`}>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Category</label>
            <select
              value={filters.category}
              onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Banking">Banking</option>
              <option value="Engineering">Engineering</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Marketing">Marketing</option>
              <option value="Non-Profit">Non-Profit</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Job Type</label>
            <select
              value={filters.type}
              onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Government">Government</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Location</label>
            <select
              value={filters.location}
              onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">All Locations</option>
              <option value="Kathmandu">Kathmandu</option>
              <option value="Pokhara">Pokhara</option>
              <option value="Lalitpur">Lalitpur</option>
              <option value="Chitwan">Chitwan</option>
              <option value="Dharan">Dharan</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Experience</label>
            <select
              value={filters.experience}
              onChange={(e) => onFilterChange({ ...filters, experience: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">All Levels</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
            >
              <option value="recent">Most Recent</option>
              <option value="deadline">Deadline</option>
              <option value="salary">Salary</option>
              <option value="applicants">Applicants</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ icon, title, value, description, color = "emerald" }) => {
  const colorClasses = {
    emerald: "from-emerald-500 to-teal-500",
    blue: "from-blue-500 to-indigo-500",
    orange: "from-orange-500 to-red-500",
    purple: "from-purple-500 to-pink-500"
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
        <div className="h-16 bg-gray-200 rounded-xl col-span-2" />
      </div>
      <div className="h-10 bg-gray-200 rounded-xl" />
    </div>
  </div>
);

export default function VacanciesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    location: '',
    experience: '',
    sortBy: 'recent'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredJobs = useMemo(() => {
    let filtered = vacanciesData.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           job.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !filters.category || job.category === filters.category;
      const matchesType = !filters.type || job.type === filters.type;
      const matchesLocation = !filters.location || job.location.includes(filters.location);
      
      let matchesExperience = true;
      if (filters.experience) {
        const jobExp = job.experience.toLowerCase();
        switch (filters.experience) {
          case '0-1':
            matchesExperience = jobExp.includes('0-') || jobExp.includes('1-');
            break;
          case '1-3':
            matchesExperience = jobExp.includes('1-') || jobExp.includes('2-') || jobExp.includes('3-');
            break;
          case '3-5':
            matchesExperience = jobExp.includes('3-') || jobExp.includes('4-') || jobExp.includes('5-');
            break;
          case '5+':
            matchesExperience = jobExp.includes('5+') || jobExp.includes('6+');
            break;
        }
      }
      
      return matchesSearch && matchesCategory && matchesType && matchesLocation && matchesExperience;
    });

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'deadline':
          return new Date(a.deadline) - new Date(b.deadline);
        case 'salary':
          const aSalary = parseInt(a.salary.replace(/[^0-9]/g, ''));
          const bSalary = parseInt(b.salary.replace(/[^0-9]/g, ''));
          return bSalary - aSalary;
        case 'applicants':
          return a.applicants - b.applicants;
        case 'recent':
        default:
          return new Date(b.postedDate) - new Date(a.postedDate);
      }
    });

    return filtered;
  }, [searchTerm, filters]);

  const stats = useMemo(() => {
    const totalJobs = vacanciesData.length;
    const urgentJobs = vacanciesData.filter(job => job.isUrgent).length;
    const avgApplicants = Math.round(vacanciesData.reduce((acc, job) => acc + job.applicants, 0) / totalJobs);
    const topCategory = vacanciesData.reduce((acc, job) => {
      acc[job.category] = (acc[job.category] || 0) + 1;
      return acc;
    }, {});
    const mostPopular = Object.keys(topCategory).reduce((a, b) => topCategory[a] > topCategory[b] ? a : b);

    return { totalJobs, urgentJobs, avgApplicants, mostPopular };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 shadow-xl">
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 sm:py-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Jobs in Nepal 🇳🇵
            </h1>
            <p className="text-lg sm:text-xl text-emerald-100 max-w-2xl">
              Discover amazing career opportunities across Nepal. From tech startups to government positions, find your dream job today.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2z" clipRule="evenodd" /></svg>}
            title="Total Jobs"
            value={stats.totalJobs}
            description="Available positions"
            color="emerald"
          />
          <StatsCard 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>}
            title="Urgent Hiring"
            value={stats.urgentJobs}
            description="Immediate openings"
            color="orange"
          />
          <StatsCard 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" /></svg>}
            title="Avg Applicants"
            value={stats.avgApplicants}
            description="Per job posting"
            color="blue"
          />
          <StatsCard 
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3z" clipRule="evenodd" /></svg>}
            title="Top Category"
            value={stats.mostPopular}
            description="Most in-demand"
            color="purple"
          />
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search jobs by title, company, skills, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pl-14 pr-6 text-lg bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
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
                {filteredJobs.length} of {vacanciesData.length} job opportunities
              </span>
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto border border-white/20 shadow-lg">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters to find more opportunities.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ category: '', type: '', location: '', experience: '', sortBy: 'recent' });
                }}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300"
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