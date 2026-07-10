'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ApplicationModal from '../component/ApplicationModal';
import { schoolsData } from '../data/schoolsData';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Award, 
  Users, 
  ArrowRight, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft 
} from 'lucide-react';

const CollegeCard = ({ college, onApply }) => {
  return (
    <div className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:border-[#0B3C5D]/20 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden shrink-0">
        <Image
          src={college.image || "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop"}
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
            Estd. {college.established}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Header & Location */}
        <div className="mb-4">
          <div className="flex items-start justify-between min-h-[64px]">
            <h3 className="text-lg font-extrabold text-[#0B3C5D] group-hover:text-[#F2A900] transition-colors duration-300 leading-tight line-clamp-2">
              {college.name}
            </h3>
            <div className="mt-1 text-[#0B3C5D] shrink-0 ml-2">
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <p className="text-gray-500 text-xs font-semibold flex items-center mt-1 uppercase tracking-wider">
            {college.location}
          </p>
        </div>

        {/* Description */}
        <div className="mb-6 flex-grow">
          <p className="text-gray-600 text-sm font-medium leading-relaxed line-clamp-3">
            {college.description}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#0B3C5D]/5 rounded-2xl p-3 border border-[#0B3C5D]/5 hover:bg-white hover:border-[#F2A900]/30 transition-colors duration-300">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Ownership</div>
            <div className="text-sm font-bold text-[#0B3C5D]">{college.type}</div>
          </div>
          <div className="bg-[#0B3C5D]/5 rounded-2xl p-3 border border-[#0B3C5D]/5 hover:bg-white hover:border-[#F2A900]/30 transition-colors duration-300">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Students</div>
            <div className="text-sm font-bold text-[#0B3C5D]">{college.students}</div>
          </div>
          <div className="bg-[#F2A900]/5 rounded-2xl p-3 border border-[#F2A900]/10 hover:bg-white hover:border-[#F2A900]/30 transition-colors duration-300">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Avg Tuition</div>
            <div className="text-sm font-bold text-[#0B3C5D]">{college.tuition}</div>
          </div>
          <div className="bg-[#0B3C5D]/5 rounded-2xl p-3 border border-[#0B3C5D]/5 hover:bg-white hover:border-[#F2A900]/30 transition-colors duration-300">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Acceptance</div>
            <div className="text-sm font-bold text-[#0B3C5D]">{college.acceptance || college.acceptanceRate || 'N/A'}</div>
          </div>
        </div>

        {/* Popular Programs Tags */}
        <div className="mb-6 min-h-[40px]">
          <div className="flex flex-wrap gap-2">
            {college.programs.slice(0, 2).map((program, index) => (
              <span key={index} className="bg-slate-50 text-slate-700 border border-slate-100 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm">
                {program}
              </span>
            ))}
            {college.programs.length > 2 && (
              <span className="text-slate-400 text-[10px] font-bold py-1 px-1">+{college.programs.length - 2} more</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
          <Link href={`/schools/${college.id}`} className="flex-1 text-center bg-white border border-[#0B3C5D]/20 text-[#0B3C5D] py-3 px-4 rounded-xl transition-all duration-300 font-bold text-xs uppercase tracking-widest hover:bg-[#0B3C5D] hover:text-white shadow-sm active:scale-95 flex items-center justify-center">
            Details
          </Link>

          <button
            onClick={() => onApply(college)}
            className="flex-1 bg-gradient-to-r from-[#F2A900] to-[#E59E00] text-[#0B3C5D] py-3 px-4 rounded-xl transition-all duration-300 font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-xl hover:translate-y-[-1px] active:scale-95 flex items-center justify-center gap-2"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AdmissionFairClient() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [isShareAlertVisible, setIsShareAlertVisible] = useState(false);

  const handleApplyClick = (college) => {
    setSelectedCollege(college);
    setShowApplicationModal(true);
  };

  const handleShareClick = () => {
    setIsShareAlertVisible(true);
    setTimeout(() => setIsShareAlertVisible(false), 2500);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Get colleges participating in the list (all showInCollegeList)
  const participatingColleges = useMemo(() => {
    return schoolsData.filter(school => school.showInCollegeList);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 pb-16">
      {/* Toast Alert for Copying Link */}
      {isShareAlertVisible && (
        <div className="fixed bottom-5 right-5 bg-slate-900 text-white py-3 px-5 rounded-xl shadow-2xl z-[90] flex items-center gap-2 text-xs font-bold transition-all border border-slate-800 animate-bounce">
          <Sparkles size={14} className="text-[#F2A900]" />
          Admission Fair link copied to clipboard!
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between text-xs font-bold text-slate-400">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-[#0B3C5D] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-[#0B3C5D]">Admission Fair</span>
          </div>

          <Link
            href="/"
            className="flex items-center gap-1 text-[#0B3C5D] hover:text-[#F2A900] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Blue Gradient Header */}
      <div className="bg-gradient-to-r from-[#1a4d6d] via-[#2d5f7f] to-[#3d7fa0] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block px-3 py-1 bg-white/20 text-xs font-extrabold text-white rounded-lg uppercase tracking-wider mb-4 border border-white/10">
            Mega Event 2026
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
            EduLink Mega Admission Fair 2026
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl leading-relaxed">
            Connect directly with top colleges, schools, and university representatives across Nepal. Explore programs, ask questions, and secure on-the-spot admissions and scholarship opportunities.
          </p>

          {/* Quick Info Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mt-8 pt-8 border-t border-white/10 text-sm">
            <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/10">
              <Calendar className="w-5 h-5 text-[#F2A900] shrink-0" />
              <div>
                <p className="font-bold">Date & Time</p>
                <p className="text-blue-100 text-xs mt-0.5">Dec 15-17, 2026 | 10 AM - 5 PM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/10">
              <MapPin className="w-5 h-5 text-[#F2A900] shrink-0" />
              <div>
                <p className="font-bold">Venue</p>
                <p className="text-blue-100 text-xs mt-0.5">Kathmandu Convention Center</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/10">
              <Users className="w-5 h-5 text-[#F2A900] shrink-0" />
              <div>
                <p className="font-bold">Participants</p>
                <p className="text-blue-100 text-xs mt-0.5">100+ Colleges & Institutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden p-6 md:p-8">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4">About the Admission Fair</h2>
              <p className="text-slate-600 font-semibold mb-4 leading-relaxed">
                The EduLink Mega Admission Fair 2026 is Nepal's premier educational convergence, designed to bridge the gap between aspiring students and leading institutions. It offers students direct access to deans, administrators, and scholarship providers.
              </p>
              
              <h3 className="text-lg font-bold text-[#0B3C5D] mt-6 mb-3">Key Highlights</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 font-semibold mb-6">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F2A900] mt-1.5 shrink-0" />
                  Direct 1-on-1 counseling with college representatives.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F2A900] mt-1.5 shrink-0" />
                  Exclusive fair discounts on admission & registration fees.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F2A900] mt-1.5 shrink-0" />
                  Dedicated scholarship assessment zone (up to 100% waiver).
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F2A900] mt-1.5 shrink-0" />
                  Career-focused seminars in IT, management, and medicine.
                </li>
              </ul>

              <div className="border-t border-slate-100 pt-6 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsRegistered(!isRegistered)}
                    className={`py-3 px-8 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${isRegistered
                      ? 'bg-green-500 text-white border-green-500 hover:bg-green-600 shadow-md shadow-green-500/10'
                      : 'bg-gradient-to-r from-[#F2A900] to-[#D9A100] hover:from-[#D9A100] hover:to-[#C09000] text-[#0B3C5D] border-transparent hover:shadow-md'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle2 size={14} />
                        Registered for Fair
                      </>
                    ) : (
                      'Register Now'
                    )}
                  </button>

                  <button
                    onClick={handleShareClick}
                    className="flex items-center gap-1.5 px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors"
                  >
                    <Share2 size={13} />
                    Share Event
                  </button>
                </div>
              </div>
            </article>

            {/* Participating Colleges List */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">Participating Colleges</h2>
                  <p className="text-slate-500 text-sm mt-1 font-semibold">Explore colleges offering programs at the fair</p>
                </div>
                <div className="bg-slate-100 text-slate-800 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
                  {participatingColleges.length} Colleges
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {participatingColleges.map((college) => (
                  <CollegeCard 
                    key={college.id} 
                    college={college} 
                    onApply={handleApplyClick} 
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats Panel */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 text-sm mb-4 border-b border-slate-100 pb-2">Fair Schedule</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0B3C5D] flex items-center justify-center shrink-0 font-bold">
                    <Calendar size={15} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Date</p>
                    <p className="text-xs font-extrabold text-slate-800 mt-0.5">December 15 - 17, 2026</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 font-bold">
                    <Clock size={15} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Hours</p>
                    <p className="text-xs font-extrabold text-slate-800 mt-0.5">10:00 AM - 5:00 PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 font-bold">
                    <MapPin size={15} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Venue</p>
                    <p className="text-xs font-extrabold text-slate-800 mt-0.5 truncate">Kathmandu Convention Center</p>
                    <p className="text-[10px] text-slate-400 font-semibold truncate">New Baneshwor, Kathmandu</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-[#F2A900] flex items-center justify-center shrink-0 font-bold">
                    <Award size={15} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Entrance</p>
                    <p className="text-xs font-extrabold text-slate-800 mt-0.5">Free Registration</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Organizer details */}
            <div className="bg-gradient-to-br from-[#0B3C5D] to-[#2d5f7f] text-white rounded-2xl p-6 shadow-lg shadow-blue-900/10">
              <h3 className="font-bold text-lg">Organized by EduLink</h3>
              <p className="text-slate-200 text-xs mt-2 leading-relaxed font-semibold">
                Bringing top-tier colleges and universities together for strategic guidance. For registration queries or partner sponsorships, contact the EduLink Advisory Desk.
              </p>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-blue-100">
                <span>Email: contact@edulink.org</span>
                <span>Tel: +977-1-444444</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
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
