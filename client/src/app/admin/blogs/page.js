'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  getBlogs, 
  saveBlogs, 
  logActivity 
} from '../dataStore';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  X, 
  FileText, 
  Eye, 
  Heart, 
  MessageSquare,
  User
} from 'lucide-react';

function AdminBlogsContent() {
  const searchParams = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Entrance Prep',
    author: 'Suraj Khadka',
    readTime: '4 min read',
    tags: ''
  });

  // Load data
  useEffect(() => {
    const list = getBlogs();
    setBlogs(list);
    setFilteredBlogs(list);

    // If query has ?add=true, trigger add modal
    if (searchParams.get('add') === 'true') {
      handleOpenAddModal();
    }
  }, [searchParams]);

  // Filter blogs
  useEffect(() => {
    let result = blogs;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(b => 
        b.title.toLowerCase().includes(term) || 
        b.excerpt.toLowerCase().includes(term) || 
        b.author.toLowerCase().includes(term)
      );
    }

    if (filterCategory !== 'All') {
      result = result.filter(b => b.category === filterCategory);
    }

    setFilteredBlogs(result);
  }, [searchTerm, filterCategory, blogs]);

  // Unique categories for filtering
  const categories = ['All', ...new Set(blogs.map(b => b.category).filter(Boolean))];

  const handleOpenAddModal = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'Entrance Prep',
      author: 'Suraj Khadka',
      readTime: '4 min read',
      tags: 'Education, Admission, Guide'
    });
    setIsEditMode(false);
    setModalOpen(true);
  };

  const handleOpenEditModal = (blog) => {
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      category: blog.category || 'Entrance Prep',
      author: blog.author || 'Suraj Khadka',
      readTime: blog.readTime || '4 min read',
      tags: blog.tags ? blog.tags.join(', ') : ''
    });
    setCurrentBlogId(blog.id);
    setIsEditMode(true);
    setModalOpen(true);
  };

  const handleDeleteBlog = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      const updated = blogs.filter(b => b.id !== id);
      setBlogs(updated);
      saveBlogs(updated);
      logActivity(`Deleted blog post "${title}".`, 'blog');
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return;

    const tagsArray = formData.tags
      ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    const blogData = {
      ...formData,
      tags: tagsArray,
      date: formatDate(),
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=450&fit=crop"
    };

    let updatedList = [];
    if (isEditMode) {
      const original = blogs.find(b => b.id === currentBlogId);
      updatedList = blogs.map(b => 
        b.id === currentBlogId 
          ? { 
              ...b, 
              ...blogData,
              // Keep original views/likes/comments if edit
              views: original.views || 0,
              likes: original.likes || 0,
              comments: original.comments || 0
            } 
          : b
      );
      logActivity(`Updated blog post "${formData.title}".`, 'blog');
    } else {
      const newBlog = {
        id: Date.now(),
        views: 0,
        likes: 0,
        comments: 0,
        ...blogData
      };
      updatedList = [newBlog, ...blogs];
      logActivity(`Published new blog post "${formData.title}".`, 'blog');
    }

    setBlogs(updatedList);
    saveBlogs(updatedList);
    setModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0B3C5D] tracking-tight">Manage Blogs & Articles</h1>
          <p className="text-slate-500 text-sm font-semibold mt-1">
            Write, edit, and publish blogs, news updates, or entrance guides for students.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 bg-[#0B3C5D] hover:bg-[#0B3C5D]/90 text-white font-bold text-xs px-5 py-3.5 rounded-2xl shadow-lg shadow-[#0B3C5D]/10 transition-all duration-300 active:scale-[0.98]"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Publish Article</span>
        </button>
      </div>

      {/* Filters Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by title, author, description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 text-xs text-slate-700 placeholder-slate-400 px-4 py-3 pl-10 rounded-2xl border border-slate-100 outline-none focus:bg-white focus:border-[#0B3C5D]/30 transition-all duration-300"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>

        {/* Categories filters */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-50 text-xs text-slate-700 px-3.5 py-2.5 rounded-xl border border-slate-100 outline-none focus:bg-white focus:border-[#0B3C5D]/20 font-bold"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider pb-3 bg-slate-50/50">
                <th className="py-4 px-6 font-extrabold">Article Title</th>
                <th className="py-4 px-6 font-extrabold">Author / Date</th>
                <th className="py-4 px-6 font-extrabold">Category</th>
                <th className="py-4 px-6 font-extrabold text-center">Engagement</th>
                <th className="py-4 px-6 font-extrabold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700">
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-slate-400 font-semibold text-sm">
                    No articles match your search parameters.
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                    {/* Title */}
                    <td className="py-4 px-6 max-w-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-slate-50 relative">
                          <img 
                            src={blog.image || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=100&h=100&fit=crop"} 
                            alt={blog.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="block font-black text-slate-800 text-sm truncate">{blog.title}</span>
                          <span className="block text-[11px] text-slate-400 font-semibold mt-0.5 truncate">
                            {blog.excerpt || 'No description preview available.'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Author & Date */}
                    <td className="py-4 px-6">
                      <div>
                        <span className="flex items-center gap-1 font-bold text-slate-800 text-xs">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {blog.author}
                        </span>
                        <span className="block text-[10px] text-slate-400 font-semibold mt-0.5">
                          {blog.date} • {blog.readTime || '3 min read'}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-0.5 rounded bg-violet-50 text-violet-700 text-[10px] font-bold uppercase tracking-wider border border-violet-100">
                        {blog.category}
                      </span>
                    </td>

                    {/* Engagement */}
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-500">
                        <span className="flex items-center gap-1.5" title="Views">
                          <Eye className="w-3.5 h-3.5 text-slate-400" />
                          {blog.views || 0}
                        </span>
                        <span className="flex items-center gap-1.5" title="Likes">
                          <Heart className="w-3.5 h-3.5 text-slate-400" />
                          {blog.likes || 0}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(blog)}
                          className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-[#0B3C5D] transition-colors"
                          title="Edit Post"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog.id, blog.title)}
                          className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-slate-50 shrink-0">
              <h3 className="text-[#0B3C5D] font-extrabold text-base">
                {isEditMode ? 'Edit Blog Article' : 'Write New Article'}
              </h3>
              <button 
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Forms */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Article Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Author */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Author Name *</label>
                  <input
                    type="text"
                    name="author"
                    required
                    value={formData.author}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Read Time */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Read Time Estimate</label>
                  <input
                    type="text"
                    name="readTime"
                    placeholder="e.g. 5 min read"
                    value={formData.readTime}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all font-bold"
                  >
                    <option value="Study Tips">Study Tips</option>
                    <option value="Entrance Prep">Entrance Prep</option>
                    <option value="Career Guidance">Career Guidance</option>
                    <option value="Scholarships">Scholarships</option>
                    <option value="Campus Life">Campus Life</option>
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tags (Comma Separated)</label>
                  <input
                    type="text"
                    name="tags"
                    placeholder="e.g. TU, CMAT, Entrance Exam"
                    value={formData.tags}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Excerpt */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Brief Summary / Excerpt *</label>
                  <textarea
                    name="excerpt"
                    required
                    rows="2"
                    placeholder="Short description displayed on search lists..."
                    value={formData.excerpt}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Full Article Content */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Content (HTML/Rich-Text Supported) *</label>
                  <textarea
                    name="content"
                    required
                    rows="10"
                    placeholder="<p>Begin writing the article here...</p>"
                    value={formData.content}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs font-mono text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-5 py-3 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0B3C5D] hover:bg-[#0B3C5D]/90 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg transition-all"
                >
                  {isEditMode ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminBlogs() {
  return (
    <Suspense fallback={<div className="text-sm font-semibold text-slate-400 p-8 text-center bg-white rounded-3xl border border-slate-100">Loading blog content...</div>}>
      <AdminBlogsContent />
    </Suspense>
  );
}
