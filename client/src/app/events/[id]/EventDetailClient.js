'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Bookmark,
  Eye,
  ThumbsUp,
  Share2,
  ChevronRight,
  Sparkles,
  MapPin,
  Users,
  CheckCircle2,
  Award,
  Video
} from 'lucide-react';

import { featuredEvents, upcomingEvents } from '../../data/eventsData';

export default function EventDetailClient() {
  const params = useParams();
  const router = useRouter();
  const eventId = parseInt(params.id);

  const allEvents = [...featuredEvents, ...upcomingEvents];
  const event = allEvents.find((e) => e.id === eventId);

  // States
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isShareAlertVisible, setIsShareAlertVisible] = useState(false);

  useEffect(() => {
    if (event) {
      setLikesCount(event.likes || 0);
    }
  }, [event]);

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 p-8 rounded-2xl max-w-md w-full shadow-lg text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar size={28} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Event Not Found</h2>
          <p className="text-slate-500 mt-2 text-sm">
            We couldn't find the educational event you were looking for. It might have finished or been removed.
          </p>
          <button
            onClick={() => router.push('/events')}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B3C5D] hover:bg-[#1b4e72] text-white text-sm font-semibold rounded-xl transition-all shadow-md"
          >
            <ArrowLeft size={16} />
            Back to Events Directory
          </button>
        </div>
      </div>
    );
  }

  // Related events (filtered by category, excluding current)
  const relatedEvents = allEvents
    .filter((e) => e.category === event.category && e.id !== event.id)
    .slice(0, 3);

  // Fallback to other events if no exact category matches
  const displayRelated = relatedEvents.length > 0
    ? relatedEvents
    : allEvents.filter((e) => e.id !== event.id).slice(0, 3);

  const handleLikeToggle = () => {
    setLikesCount(prev => isRegistered ? prev - 1 : prev + 1);
    setIsRegistered(!isRegistered);
  };

  const handleShareClick = () => {
    setIsShareAlertVisible(true);
    setTimeout(() => setIsShareAlertVisible(false), 2500);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const remainingSlots = event.capacity - (isRegistered ? event.registeredCount + 1 : event.registeredCount);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 pb-16">
      {/* Toast Alert for Copying Link */}
      {isShareAlertVisible && (
        <div className="fixed bottom-5 right-5 bg-slate-900 text-white py-3 px-5 rounded-xl shadow-2xl z-[90] flex items-center gap-2 text-xs font-bold transition-all border border-slate-800 animate-bounce">
          <Sparkles size={14} className="text-[#F2A900]" />
          Event link copied to clipboard!
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between text-xs font-bold text-slate-400">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-[#0B3C5D] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/events" className="hover:text-[#0B3C5D] transition-colors">Events</Link>
            <ChevronRight size={12} />
            <span className="text-[#0B3C5D] line-clamp-1">{event.title}</span>
          </div>

          <button
            onClick={() => router.push('/events')}
            className="flex items-center gap-1 text-[#0B3C5D] hover:text-[#F2A900] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to events
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Event Article */}
          <div className="lg:col-span-2 space-y-6">
            <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-6 md:p-8">
              {/* Header Panel */}
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-[#0B3C5D]/10 text-xs font-extrabold text-[#0B3C5D] rounded-lg uppercase tracking-wider">
                  {event.category}
                </span>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                  {event.title}
                </h1>

                {/* Event host & views row */}
                <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-100">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Organized by {event.host}</h4>
                    <p className="text-[11px] text-slate-400 font-semibold">Educational Partner</p>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1">
                      <Eye size={13} />
                      {event.views ? event.views.toLocaleString() : '1,000'} Views
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp size={13} />
                      {likesCount} Likes
                    </span>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              {event.image && (
                <div className="mt-6 aspect-video rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* HTML Content Body */}
              <div
                className="mt-8 prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm md:text-base"
                dangerouslySetInnerHTML={{ __html: event.content }}
              />

              {/* Event Schedule Timeline details inside page */}
              <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-[#0B3C5D] text-sm">Schedule & Registration Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="flex gap-2">
                    <Calendar className="text-[#F2A900] shrink-0" size={16} />
                    <div>
                      <p className="font-bold text-slate-800">Date & Time</p>
                      <p className="text-slate-500 font-semibold">{event.date} at {event.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <MapPin className="text-[#F2A900] shrink-0" size={16} />
                    <div>
                      <p className="font-bold text-slate-800">Venue</p>
                      <p className="text-slate-500 font-semibold">{event.venue}</p>
                      <p className="text-slate-400 text-[10px]">{event.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive buttons footer panel */}
              <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4 flex-1 sm:flex-initial">
                  <button
                    onClick={() => setIsRegistered(!isRegistered)}
                    className={`flex-1 sm:flex-initial py-2.5 px-6 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${isRegistered
                      ? 'bg-green-500 text-white border-green-500 hover:bg-green-600 shadow-md shadow-green-500/10'
                      : 'bg-gradient-to-r from-[#F2A900] to-[#D9A100] hover:from-[#D9A100] hover:to-[#C09000] text-[#0B3C5D] border-transparent hover:shadow-md'
                      }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle2 size={14} />
                        Registered
                      </>
                    ) : (
                      'Register Now'
                    )}
                  </button>

                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`flex items-center justify-center p-2.5 rounded-lg border transition-colors ${isBookmarked
                      ? 'bg-[#F2A900]/10 text-[#F2A900] border-[#F2A900]/30'
                      : 'bg-slate-50 text-slate-500 hover:bg-[#F2A900]/10 hover:text-[#F2A900] border-slate-200'
                      }`}
                  >
                    <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <button
                  onClick={handleShareClick}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-colors"
                >
                  <Share2 size={13} />
                  Share Event
                </button>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats Panel */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 text-sm mb-4 border-b border-slate-100 pb-2">Event Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0B3C5D] flex items-center justify-center shrink-0">
                    <Calendar size={15} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Date</p>
                    <p className="text-xs font-extrabold text-slate-800 mt-0.5">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Clock size={15} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Time</p>
                    <p className="text-xs font-extrabold text-slate-800 mt-0.5">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <MapPin size={15} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Venue</p>
                    <p className="text-xs font-extrabold text-slate-800 mt-0.5 truncate">{event.venue}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <Users size={15} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Capacity</p>
                    <p className="text-xs font-extrabold text-slate-800 mt-0.5">
                      {remainingSlots} / {event.capacity} seats left
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related/Recommended Events */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-[#0B3C5D] flex items-center gap-2 mb-5 border-b border-slate-100 pb-3">
                <Calendar size={16} className="text-[#F2A900]" />
                Recommended Events
              </h3>

              <div className="space-y-4">
                {displayRelated.map((related) => (
                  <Link href={`/events/${related.id}`} key={related.id} className="group block">
                    <article className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                      <span className="text-[9px] font-extrabold text-[#0B3C5D] uppercase tracking-wider bg-[#0B3C5D]/5 px-2 py-0.5 rounded-md inline-block mb-2">
                        {related.category}
                      </span>
                      <h4 className="font-bold text-slate-800 text-xs group-hover:text-[#0B3C5D] transition-colors leading-snug line-clamp-2">
                        {related.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-1">{related.date}</p>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
