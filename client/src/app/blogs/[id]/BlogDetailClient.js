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
  MessageCircle,
  Share2,
  BookOpen,
  Send,
  User,
  Heart,
  ChevronRight,
  Sparkles
} from 'lucide-react';

// Static imports removed. Data loaded dynamically from backend.

export default function BlogDetailClient() {
  const params = useParams();
  const router = useRouter();
  const blogId = parseInt(params.id);

  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [isShareAlertVisible, setIsShareAlertVisible] = useState(false);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        const resBlog = await fetch(`/api/blogs/${blogId}`);
        const dataBlog = await resBlog.json();
        if (dataBlog.success) {
          setBlog(dataBlog.blog);
          setLikesCount(dataBlog.blog.likes || 0);
        } else {
          setError(dataBlog.message || 'Blog not found');
        }

        const resAll = await fetch('/api/blogs');
        const dataAll = await resAll.json();
        if (dataAll.success) {
          setAllBlogs(dataAll.blogs);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch blog details');
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlogDetail();
    }
  }, [blogId]);

  useEffect(() => {
    if (blog) {
      // Add default dummy comments to make layout populated and realistic
      setComments([
        {
          id: 1,
          author: "Siddharth Thapa",
          date: "3 days ago",
          text: "This is extremely helpful! I am preparing for the entrance exam next month and these tips gave me a very clear direction. Especially the time management part."
        },
        {
          id: 2,
          author: "Ritu Shrestha",
          date: "1 day ago",
          text: "Highly agree with mastering the basics. High school fundamentals are definitely the decider."
        }
      ]);
    }
  }, [blog]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200 shadow-lg max-w-md w-full animate-pulse">
          <BookOpen size={48} className="text-slate-300 animate-bounce" />
          <p className="text-slate-400 mt-4 font-semibold text-sm">Loading article details...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 p-8 rounded-2xl max-w-md w-full shadow-lg text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen size={28} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Article Not Found</h2>
          <p className="text-slate-500 mt-2 text-sm">
            {error || "We couldn't locate the blog article you were looking for. It might have been moved or deleted."}
          </p>
          <button
            onClick={() => router.push('/blogs')}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B3C5D] hover:bg-[#1b4e72] text-white text-sm font-semibold rounded-xl transition-all shadow-md"
          >
            <ArrowLeft size={16} />
            Back to Blogs List
          </button>
        </div>
      </div>
    );
  }

  // Related articles (filtered by category, excluding current)
  const relatedBlogs = allBlogs
    .filter((b) => b.category === blog.category && b.id !== blog.id)
    .slice(0, 3);

  // Fallback to recent articles if no exact category matches
  const displayRelated = relatedBlogs.length > 0 
    ? relatedBlogs 
    : allBlogs.filter((b) => b.id !== blog.id).slice(0, 3);

  const handleLikeToggle = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleShareClick = () => {
    setIsShareAlertVisible(true);
    setTimeout(() => setIsShareAlertVisible(false), 2500);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentAuthor.trim() || !newCommentText.trim()) return;

    const commentObject = {
      id: comments.length + 1,
      author: newCommentAuthor.trim(),
      date: "Just now",
      text: newCommentText.trim()
    };

    setComments([commentObject, ...comments]);
    setNewCommentAuthor('');
    setNewCommentText('');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 pb-16">
      {/* Toast Alert for Copying Link */}
      {isShareAlertVisible && (
        <div className="fixed bottom-5 right-5 bg-slate-900 text-white py-3 px-5 rounded-xl shadow-2xl z-[90] flex items-center gap-2 text-xs font-bold transition-all border border-slate-800 animate-bounce">
          <Sparkles size={14} className="text-[#F2A900]" />
          Article link copied to clipboard!
        </div>
      )}

      {/* Breadcrumb Navigation header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between text-xs font-bold text-slate-400">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-[#0B3C5D] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/blogs" className="hover:text-[#0B3C5D] transition-colors">Blogs</Link>
            <ChevronRight size={12} />
            <span className="text-[#0B3C5D] line-clamp-1">{blog.title}</span>
          </div>

          <button
            onClick={() => router.push('/blogs')}
            className="flex items-center gap-1 text-[#0B3C5D] hover:text-[#F2A900] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to blogs
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Article Container */}
          <div className="lg:col-span-2 space-y-6">
            <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-6 md:p-8">
              {/* Header Info */}
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-[#0B3C5D]/10 text-xs font-extrabold text-[#0B3C5D] rounded-lg uppercase tracking-wider">
                  {blog.category}
                </span>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                  {blog.title}
                </h1>

                {/* Author Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-100">
                  <div className="flex items-center gap-3">
                    {blog.authorImage ? (
                      <img
                        src={blog.authorImage}
                        alt={blog.author}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-[#0B3C5D]/10 rounded-full flex items-center justify-center text-sm font-bold text-[#0B3C5D]">
                        {blog.author?.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{blog.author}</h4>
                      <p className="text-[11px] text-slate-400 font-semibold">Author & Contributor</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      {blog.readTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              {blog.image && (
                <div className="mt-6 aspect-video rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* HTML Content Body */}
              <div 
                className="mt-8 prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm md:text-base"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Article Footer & Interactive Widget bar */}
              <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLikeToggle}
                    className={`flex items-center gap-1.5 text-xs font-extrabold transition-colors py-2 px-3.5 rounded-lg border ${isLiked
                      ? 'bg-red-50 text-red-500 border-red-200'
                      : 'bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-500 border-slate-200'
                      }`}
                  >
                    <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
                    <span>{likesCount} Likes</span>
                  </button>

                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`flex items-center justify-center p-2 rounded-lg border transition-colors ${isBookmarked
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
                  Share Article
                </button>
              </div>
            </article>

            {/* Comments Container */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
              <h3 className="text-lg font-bold text-[#0B3C5D] border-b border-slate-100 pb-3 flex items-center gap-2">
                <MessageCircle size={18} className="text-[#F2A900]" />
                Discussion ({comments.length})
              </h3>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="md:col-span-1 relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={14} />
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={newCommentAuthor}
                      onChange={(e) => setNewCommentAuthor(e.target.value)}
                      className="pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#0B3C5D] rounded-lg w-full text-slate-800"
                    />
                  </div>
                  <div className="md:col-span-2 relative flex gap-2">
                    <input
                      type="text"
                      placeholder="Join the discussion and express your thoughts..."
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      className="px-3 py-2 text-xs bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#0B3C5D] rounded-lg flex-1 text-slate-800"
                    />
                    <button
                      type="submit"
                      className="bg-[#0B3C5D] hover:bg-[#1a4a6e] text-white p-2 rounded-lg transition-colors flex items-center justify-center shrink-0"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <p className="text-slate-400 text-xs text-center py-4 font-semibold">No comments yet. Be the first to share your thoughts!</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold border border-slate-200 shrink-0">
                        {comment.author?.charAt(0)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-800">{comment.author}</h4>
                          <span className="text-[10px] text-slate-400 font-semibold">{comment.date}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            {/* Quick stats / Author Highlight */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 text-sm mb-4">Article Insights</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <Eye className="mx-auto text-[#0B3C5D] mb-1.5" size={16} />
                  <p className="text-xs text-slate-400 font-semibold">Views</p>
                  <p className="text-sm font-extrabold text-slate-800 mt-0.5">
                    {blog.views ? blog.views.toLocaleString() : '1,200'}
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <ThumbsUp className="mx-auto text-[#F2A900] mb-1.5" size={16} />
                  <p className="text-xs text-slate-400 font-semibold">Likes</p>
                  <p className="text-sm font-extrabold text-slate-800 mt-0.5">{likesCount}</p>
                </div>
              </div>
            </div>

            {/* Related Blogs */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-[#0B3C5D] flex items-center gap-2 mb-5 border-b border-slate-100 pb-3">
                <BookOpen size={16} className="text-[#F2A900]" />
                Related Articles
              </h3>

              <div className="space-y-4">
                {displayRelated.map((related) => (
                  <Link href={`/blogs/${related.id}`} key={related.id} className="group block">
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
