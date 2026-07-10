'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Bookmark,
  Eye,
  ThumbsUp,
  Building2,
  MapPin,
  Calendar,
  Globe,
  Mail,
  Phone,
  Clock,
  Award,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Share2
} from 'lucide-react';

import { organizationsData } from '../../data/organizationsData';

export default function OrganizationDetailClient() {
  const params = useParams();
  const router = useRouter();
  const orgId = parseInt(params.id);

  const org = organizationsData.find((o) => o.id === orgId);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isShareAlertVisible, setIsShareAlertVisible] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    if (org) {
      setLikesCount(org.likes || 0);
    }
  }, [org]);

  if (!org) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 p-8 rounded-2xl max-w-md w-full shadow-lg text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 size={28} />
          </div>
          <h3 className="font-bold text-lg text-slate-800">Organization Not Found</h3>
          <p className="text-slate-500 mt-2">The organization profile you are looking for does not exist or has been moved.</p>
          <button
            onClick={() => router.push('/organizations')}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B3C5D] hover:bg-[#1c5277] text-white text-sm font-semibold rounded-xl transition-all shadow-md"
          >
            <ArrowLeft size={16} />
            Back to Directory
          </button>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    if (hasLiked) {
      setLikesCount(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const handleShare = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    navigator.clipboard.writeText(currentUrl).then(() => {
      setIsShareAlertVisible(true);
      setTimeout(() => setIsShareAlertVisible(false), 2500);
    });
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-16">
      {/* Cover Image Banner */}
      <div className="relative h-64 md:h-80 lg:h-96 w-full bg-slate-200 overflow-hidden">
        {org.image ? (
          <img
            src={org.image}
            alt={org.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-slate-200 to-slate-300"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-950/20 to-transparent"></div>

        {/* Back Link Overlay */}
        <div className="absolute top-6 left-4 md:left-8 z-10">
          <Link
            href="/organizations"
            className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-slate-900 rounded-xl shadow-md text-xs md:text-sm font-bold backdrop-blur-sm transition-all"
          >
            <ArrowLeft size={16} />
            Directory
          </Link>
        </div>
      </div>

      {/* Main Profile Info Overlay Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-20 z-20">
        {/* Profile Card Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Logo box */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-4xl shadow-md flex-shrink-0">
              {org.logo}
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0B3C5D]/10 text-xs font-bold text-[#0B3C5D] rounded-full mb-2">
                <Sparkles size={11} className="text-[#F2A900]" />
                {org.category} Profile
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {org.name}
              </h1>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2.5 text-xs md:text-sm text-slate-400 font-semibold">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-slate-400" />
                  {org.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-slate-400" />
                  Established {org.established}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 self-stretch md:self-auto justify-end border-t border-slate-100 pt-4 md:border-t-0 md:pt-0">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all border ${hasLiked
                ? 'bg-red-50 text-red-500 border-red-200 shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
                }`}
            >
              <ThumbsUp size={15} fill={hasLiked ? 'currentColor' : 'none'} />
              <span>{likesCount} Likes</span>
            </button>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2.5 rounded-xl border transition-all ${isBookmarked
                ? 'bg-[#F2A900] text-white border-[#F2A900] shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
                }`}
            >
              <Bookmark size={15} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 transition-all shadow-sm"
              title="Copy Profile URL"
            >
              <Share2 size={15} />
            </button>
          </div>
        </div>

        {/* Share Copy Notification */}
        {isShareAlertVisible && (
          <div className="fixed bottom-6 right-6 bg-[#0B3C5D] text-white py-3 px-5 rounded-xl shadow-2xl flex items-center gap-2.5 z-[100] animate-bounce text-xs font-semibold">
            <CheckCircle2 size={16} className="text-[#F2A900]" />
            Profile link copied to clipboard!
          </div>
        )}

        {/* Dynamic Detail Body Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10 items-start">
          {/* Main Info Columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview / About */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-lg md:text-xl font-bold text-[#0B3C5D] mb-4 border-b border-slate-100 pb-3">
                About the Organization
              </h2>
              <p className="text-slate-600 text-sm font-medium leading-relaxed whitespace-pre-line">
                {org.description}
              </p>
            </div>

            {/* Core Functions and Services */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-lg md:text-xl font-bold text-[#0B3C5D] mb-5 border-b border-slate-100 pb-3">
                Key Services & Responsibilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {org.services.map((service, idx) => (
                  <div key={idx} className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-200/50">
                    <CheckCircle2 size={18} className="text-[#0B3C5D] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-xs font-semibold leading-relaxed">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Accordions */}
            {org.faqs && org.faqs.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-lg md:text-xl font-bold text-[#0B3C5D] mb-5 border-b border-slate-100 pb-3">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-3">
                  {org.faqs.map((faq, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between p-4 bg-slate-50/65 hover:bg-slate-50 text-left transition-colors"
                      >
                        <span className="text-slate-800 font-bold text-xs md:text-sm flex items-center gap-2">
                          <HelpCircle size={16} className="text-[#F2A900] flex-shrink-0" />
                          {faq.question}
                        </span>
                        {openFaqIndex === idx ? (
                          <ChevronUp size={16} className="text-slate-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown size={16} className="text-slate-400 flex-shrink-0" />
                        )}
                      </button>

                      {openFaqIndex === idx && (
                        <div className="p-4 bg-white border-t border-slate-200 text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Info Columns */}
          <div className="space-y-6">
            {/* Quick Facts Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-[#0B3C5D] mb-4 border-b border-slate-100 pb-3 flex items-center gap-2 text-sm md:text-base">
                <Award size={18} className="text-[#F2A900]" />
                Institutional Info
              </h3>

              <div className="space-y-4 text-xs font-semibold">
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-400">Type</span>
                  <span className="text-slate-800 font-bold bg-[#0B3C5D]/10 text-[#0B3C5D] px-2 py-0.5 rounded-md text-[10px]">
                    {org.type}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-400">Established Year</span>
                  <span className="text-slate-800 font-bold">{org.established} A.D.</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-400">Verification</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                    ✓ Official Profile
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Connect Contacts */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-[#0B3C5D] mb-4 border-b border-slate-100 pb-3 text-sm md:text-base">
                Contact Desk
              </h3>

              <div className="space-y-3.5">
                {org.website && (
                  <a
                    href={org.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/50 rounded-xl transition-all group/link"
                  >
                    <Globe size={18} className="text-[#0B3C5D] group-hover/link:scale-105 transition-transform" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-slate-400 font-semibold">Official Website</p>
                      <p className="text-xs text-slate-700 font-bold truncate group-hover/link:text-[#0B3C5D]">
                        {org.website.replace('https://', '').replace('www.', '')}
                      </p>
                    </div>
                  </a>
                )}

                {org.email && (
                  <a
                    href={`mailto:${org.email}`}
                    className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/50 rounded-xl transition-all group/link"
                  >
                    <Mail size={18} className="text-[#0B3C5D] group-hover/link:scale-105 transition-transform" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-slate-400 font-semibold">Email Inquiry</p>
                      <p className="text-xs text-slate-700 font-bold truncate group-hover/link:text-[#0B3C5D]">
                        {org.email}
                      </p>
                    </div>
                  </a>
                )}

                {org.phone && (
                  <a
                    href={`tel:${org.phone}`}
                    className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/50 rounded-xl transition-all group/link"
                  >
                    <Phone size={18} className="text-[#0B3C5D] group-hover/link:scale-105 transition-transform" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-slate-400 font-semibold">Phone Contact</p>
                      <p className="text-xs text-slate-700 font-bold truncate group-hover/link:text-[#0B3C5D]">
                        {org.phone}
                      </p>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Note alert */}
            <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5 text-xs text-slate-500 font-semibold leading-relaxed">
              <h4 className="text-slate-800 font-bold mb-1">Feedback Disclaimer</h4>
              Profile facts, fees, and procedures listed here are gathered from open-source university reports and official board releases. Verify final details directly on their official channels.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
