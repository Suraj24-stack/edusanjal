'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Banknote, 
  BookOpen, 
  Users, 
  Award, 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  ShieldCheck, 
  Percent, 
  Sparkles,
  ClipboardList,
  Clock
} from 'lucide-react';
import { schoolsData, admissionsData } from '../../data/schoolsData';
import ApplicationModal from '../../component/ApplicationModal';

export default function SchoolDetailPage({ initialSchool = null }) {
  const params = useParams();
  const router = useRouter();
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const schoolId = parseInt(params.id, 10);
  const school = initialSchool || schoolsData.find((s) => s.id === schoolId);

  // Find if there is an active admission for this school
  const activeAdmission = admissionsData.find((a) => a.schoolId === schoolId);

  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B3C5D]/5 via-white to-[#F2A900]/5 p-6">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 max-w-lg mx-auto text-center border border-white/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F2A900] via-[#0B3C5D] to-[#F2A900]" />
          <div className="bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-100">
            <Building2 className="h-10 w-10 text-red-500" />
          </div>
          <h3 className="text-3xl font-extrabold text-[#0B3C5D] mb-4 tracking-tight">Institution Not Found</h3>
          <p className="text-gray-600 mb-8 text-md font-medium leading-relaxed">
            The school or college you are looking for does not exist or has been removed from our listings.
          </p>
          <Link
            href="/schools"
            className="inline-flex items-center gap-2 bg-[#0B3C5D] hover:bg-[#0B3C5D]/90 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-[#0B3C5D]/20 hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  const getTuitionColor = (tuition) => {
    if (tuition === "Free" || tuition === "Free*") return "from-green-50 to-emerald-50 border-green-200 text-green-800";
    const amount = parseInt(tuition.replace(/[^0-9]/g, '')) || 0;
    if (amount > 50000) return "from-red-50 to-pink-50 border-red-200 text-red-800";
    if (amount > 30000) return "from-[#F2A900]/10 to-[#F2A900]/20 border-[#F2A900]/30 text-[#0B3C5D]";
    return "from-[#0B3C5D]/10 to-[#0B3C5D]/20 border-[#0B3C5D]/30 text-[#0B3C5D]";
  };

  const getAdmissionTuitionColor = (tuition) => {
    if (tuition === "Free") return "bg-green-50 text-green-700 border-green-200";
    return "bg-blue-50 text-blue-700 border-blue-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B3C5D]/5 via-white to-[#F2A900]/5 pb-20">
      {/* Top Banner with Background Image */}
      <div className="relative h-[280px] sm:h-[350px] lg:h-[420px] w-full bg-slate-900 overflow-hidden">
        <Image
          src={school.image}
          alt={school.name}
          fill
          priority
          className="object-cover opacity-60 scale-105 filter blur-[2px] transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        
        {/* Navigation & Breadcrumbs */}
        <div className="absolute top-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center z-10">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-xl font-bold text-xs uppercase tracking-wider border border-white/20 shadow-md transition-all duration-200 hover:-translate-x-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          
          <div className="hidden sm:flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-wider bg-black/30 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
            <Link href="/" className="hover:text-[#F2A900] transition-colors">Home</Link>
            <span>/</span>
            <Link href={school.showInCollegeList ? "/colleges" : "/schools"} className="hover:text-[#F2A900] transition-colors">
              {school.showInCollegeList ? "Colleges" : "Schools"}
            </Link>
            <span>/</span>
            <span className="text-[#F2A900] truncate max-w-[150px]">{school.name}</span>
          </div>
        </div>

        {/* Institution Info Overlay */}
        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-white">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-[#F2A900] text-[#0B3C5D] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
              {school.level}
            </span>
            <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
              {school.type}
            </span>
            {school.ranking && (
              <span className="bg-indigo-600/80 backdrop-blur-sm border border-indigo-400/30 px-3 py-1 rounded-full text-xs font-bold tracking-wide flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-yellow-300" /> Rank #{school.ranking}
              </span>
            )}
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-2 leading-none drop-shadow-md">
            {school.name}
          </h1>
          
          <p className="flex items-center gap-1.5 text-sm sm:text-base text-gray-200 font-medium">
            <MapPin className="w-4 h-4 text-[#F2A900] shrink-0" /> {school.location}
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Details & Academics */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Overview Section */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <h2 className="text-xl sm:text-2xl font-black text-[#0B3C5D] mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#F2A900]" /> Overview
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {school.description}
              </p>
            </div>

            {/* key Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 text-center flex flex-col items-center justify-center">
                <Users className="w-6 h-6 text-[#0B3C5D] mb-2" />
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Students</span>
                <span className="text-lg font-black text-gray-900 mt-1">{school.students}</span>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 text-center flex flex-col items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[#0B3C5D] mb-2" />
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Established</span>
                <span className="text-lg font-black text-gray-900 mt-1">{school.established}</span>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 text-center flex flex-col items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#0B3C5D] mb-2" />
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Acceptance</span>
                <span className="text-lg font-black text-gray-900 mt-1">{school.acceptance || "N/A"}</span>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 text-center flex flex-col items-center justify-center">
                <Banknote className="w-6 h-6 text-[#0B3C5D] mb-2" />
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Tuition Fee</span>
                <span className="text-lg font-black text-gray-900 mt-1">{school.tuition}</span>
              </div>
              {school.boardingType && (
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 text-center flex flex-col items-center justify-center col-span-2 sm:col-span-1">
                  <Building2 className="w-6 h-6 text-[#0B3C5D] mb-2" />
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Boarding</span>
                  <span className="text-lg font-black text-gray-900 mt-1">{school.boardingType}</span>
                </div>
              )}
            </div>

            {/* Academic Programs */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <h2 className="text-xl sm:text-2xl font-black text-[#0B3C5D] mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#F2A900]" /> Academic Programs Offered
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {school.programs.map((program, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-[#0B3C5D]/5 rounded-xl border border-gray-100 transition-colors duration-200">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F2A900] shrink-0" />
                    <span className="text-sm font-bold text-gray-800">{program}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Admissions Widget */}
          <div className="space-y-8">
            
            {activeAdmission ? (
              <div className="bg-[#0B3C5D] rounded-[32px] p-6 sm:p-8 text-white relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-8 -translate-y-8 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/5 rounded-full -translate-x-12 translate-y-12 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F2A900] text-[#0B3C5D] text-xs font-black uppercase tracking-widest mb-6">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Admissions Open
                  </div>

                  <h3 className="text-2xl font-black text-white leading-tight mb-4">
                    Apply for {activeAdmission.level}
                  </h3>

                  <p className="text-white/80 text-sm font-medium leading-relaxed mb-6">
                    {activeAdmission.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                      <span className="text-white/60 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#F2A900]" /> Deadline
                      </span>
                      <span className="text-sm font-bold">{activeAdmission.deadline}</span>
                    </div>

                    <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                      <span className="text-white/60 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#F2A900]" /> Affiliation
                      </span>
                      <span className="text-sm font-bold text-right">{activeAdmission.affiliation}</span>
                    </div>

                    <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                      <span className="text-white/60 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#F2A900]" /> Tuition (Estimated)
                      </span>
                      <span className="text-sm font-bold">{activeAdmission.tuition}/year</span>
                    </div>

                    {activeAdmission.startDate && (
                      <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                        <span className="text-white/60 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#F2A900]" /> Starts
                        </span>
                        <span className="text-sm font-bold">{activeAdmission.startDate}</span>
                      </div>
                    )}
                  </div>

                  {activeAdmission.requirements && (
                    <div className="mb-8">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#F2A900] mb-3 flex items-center gap-1.5">
                        <ClipboardList className="w-4 h-4" /> Admission Requirements
                      </h4>
                      <ul className="space-y-2">
                        {activeAdmission.requirements.map((req, index) => (
                          <li key={index} className="flex items-center gap-2 text-white/95 text-xs font-semibold">
                            <CheckCircle2 className="w-4 h-4 text-[#F2A900] shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={() => setShowApplicationModal(true)}
                    className="w-full bg-[#F2A900] hover:bg-[#E59E00] text-[#0B3C5D] py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[32px] border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-gray-100">
                  <Calendar className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-xl font-black text-[#0B3C5D] mb-2">Admissions Closed</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">
                  There are currently no active admission intakes or announcements open for this institution. Keep checking back for updates!
                </p>
                <button
                  disabled
                  className="w-full bg-gray-100 text-gray-400 py-4 rounded-2xl font-black text-sm uppercase tracking-widest cursor-not-allowed"
                >
                  Applications Closed
                </button>
              </div>
            )}

            {/* Quick Contact & Details */}
            <div className="bg-white rounded-[32px] border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-black text-[#0B3C5D] mb-4">Quick Facts</h3>
              <div className="space-y-4 text-xs font-bold text-gray-600">
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span>Location</span>
                  <span className="text-gray-800 text-right truncate max-w-[180px]">{school.location}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span>Institution Type</span>
                  <span className="text-gray-800">{school.type}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span>Tuition Structure</span>
                  <span className="text-gray-800">{school.tuition}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span>Status</span>
                  <span className="text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Verified
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Application Modal Popup */}
      {showApplicationModal && (
        <ApplicationModal
          school={activeAdmission || school}
          onClose={() => setShowApplicationModal(false)}
        />
      )}
    </div>
  );
}
