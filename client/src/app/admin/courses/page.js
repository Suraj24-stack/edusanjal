'use client';

import { useState, useEffect } from 'react';
import { 
  getCourses, 
  saveCourses, 
  logActivity 
} from '../dataStore';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  X, 
  BookOpen 
} from 'lucide-react';

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterField, setFilterField] = useState('All');
  const [filterLevel, setFilterLevel] = useState('All');

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    level: "Bachelor's",
    duration: '4 Years',
    field: 'Technology',
    avgSalary: 'Rs 80,000',
    difficulty: 'Medium',
    description: '',
    careers: '',
    requirements: '',
    universities: ''
  });

  // Load data
  useEffect(() => {
    const list = getCourses();
    setCourses(list);
    setFilteredCourses(list);
  }, []);

  // Filter courses
  useEffect(() => {
    let result = courses;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(c => 
        c.title.toLowerCase().includes(term) || 
        c.field.toLowerCase().includes(term) ||
        (c.description && c.description.toLowerCase().includes(term))
      );
    }

    if (filterField !== 'All') {
      result = result.filter(c => c.field === filterField);
    }

    if (filterLevel !== 'All') {
      result = result.filter(c => c.level === filterLevel);
    }

    setFilteredCourses(result);
  }, [searchTerm, filterField, filterLevel, courses]);

  // Unique fields for filtering dropdown
  const uniqueFields = ['All', ...new Set(courses.map(c => c.field).filter(Boolean))];

  const handleOpenAddModal = () => {
    setFormData({
      title: '',
      level: "Bachelor's",
      duration: '4 Years',
      field: 'Technology',
      avgSalary: 'Rs 80,000',
      difficulty: 'Medium',
      description: '',
      careers: 'Software Engineer, Developer, Analyst',
      requirements: 'Mathematics, Science',
      universities: 'Tribhuvan University, Kathmandu University'
    });
    setIsEditMode(false);
    setModalOpen(true);
  };

  const handleOpenEditModal = (course) => {
    setFormData({
      title: course.title,
      level: course.level || "Bachelor's",
      duration: course.duration || '4 Years',
      field: course.field || 'Technology',
      avgSalary: course.avgSalary || 'Rs 80,000',
      difficulty: course.difficulty || 'Medium',
      description: course.description || '',
      careers: course.careers ? course.careers.join(', ') : '',
      requirements: course.requirements ? course.requirements.join(', ') : '',
      universities: course.universities ? course.universities.join(', ') : ''
    });
    setCurrentCourseId(course.id);
    setIsEditMode(true);
    setModalOpen(true);
  };

  const handleDeleteCourse = (id, title) => {
    if (window.confirm(`Are you sure you want to delete course ${title}?`)) {
      const updated = courses.filter(c => c.id !== id);
      setCourses(updated);
      saveCourses(updated);
      logActivity(`Deleted course program "${title}".`, 'course');
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return;

    // Convert comma strings to arrays
    const careerArray = formData.careers ? formData.careers.split(',').map(item => item.trim()).filter(Boolean) : [];
    const reqArray = formData.requirements ? formData.requirements.split(',').map(item => item.trim()).filter(Boolean) : [];
    const uniArray = formData.universities ? formData.universities.split(',').map(item => item.trim()).filter(Boolean) : [];

    const courseData = {
      ...formData,
      careers: careerArray,
      requirements: reqArray,
      universities: uniArray,
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop"
    };

    let updatedList = [];
    if (isEditMode) {
      updatedList = courses.map(c => 
        c.id === currentCourseId ? { ...c, ...courseData } : c
      );
      logActivity(`Updated course program "${formData.title}".`, 'course');
    } else {
      const newCourse = {
        id: Date.now(),
        ...courseData
      };
      updatedList = [newCourse, ...courses];
      logActivity(`Added new course program "${formData.title}".`, 'course');
    }

    setCourses(updatedList);
    saveCourses(updatedList);
    setModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0B3C5D] tracking-tight">Manage Courses & Degrees</h1>
          <p className="text-slate-500 text-sm font-semibold mt-1">
            Publish, edit or archive academic degree programs, requirements and salaries on EduLink.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 bg-[#0B3C5D] hover:bg-[#0B3C5D]/90 text-white font-bold text-xs px-5 py-3.5 rounded-2xl shadow-lg shadow-[#0B3C5D]/10 transition-all duration-300 active:scale-[0.98]"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Add Course</span>
        </button>
      </div>

      {/* Filters Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by degree title, field..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 text-xs text-slate-700 placeholder-slate-400 px-4 py-3 pl-10 rounded-2xl border border-slate-100 outline-none focus:bg-white focus:border-[#0B3C5D]/30 transition-all duration-300"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>

        {/* Categories filters */}
        <div className="flex flex-wrap gap-4 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Field</span>
            <select
              value={filterField}
              onChange={(e) => setFilterField(e.target.value)}
              className="bg-slate-50 text-xs text-slate-700 px-3.5 py-2.5 rounded-xl border border-slate-100 outline-none focus:bg-white focus:border-[#0B3C5D]/20 font-bold"
            >
              {uniqueFields.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Level</span>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="bg-slate-50 text-xs text-slate-700 px-3.5 py-2.5 rounded-xl border border-slate-100 outline-none focus:bg-white focus:border-[#0B3C5D]/20 font-bold"
            >
              <option value="All">All Levels</option>
              <option value="Associate">Associate</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="Doctorate">Doctorate</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid List */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider pb-3 bg-slate-50/50">
                <th className="py-4 px-6 font-extrabold">Degree Program</th>
                <th className="py-4 px-6 font-extrabold">Academic Field</th>
                <th className="py-4 px-6 font-extrabold">Duration</th>
                <th className="py-4 px-6 font-extrabold">Avg. Starting Salary</th>
                <th className="py-4 px-6 font-extrabold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700">
              {filteredCourses.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-slate-400 font-semibold text-sm">
                    No degree programs match your search parameters.
                  </td>
                </tr>
              ) : (
                filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                    {/* Title */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0B3C5D]/10 text-[#0B3C5D] flex items-center justify-center font-bold">
                          <BookOpen className="w-5 h-5 text-[#0B3C5D]" />
                        </div>
                        <div>
                          <span className="block font-black text-slate-800 text-sm">{course.title}</span>
                          <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                            {course.level}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Field */}
                    <td className="py-4 px-6 text-xs font-bold text-slate-600">
                      {course.field}
                    </td>

                    {/* Duration */}
                    <td className="py-4 px-6 text-xs font-bold text-slate-500">
                      {course.duration}
                    </td>

                    {/* Salary */}
                    <td className="py-4 px-6 text-xs font-black text-[#0B3C5D]">
                      {course.avgSalary}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(course)}
                          className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-[#0B3C5D] transition-colors"
                          title="Edit Details"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id, course.title)}
                          className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Delete Course"
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
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-slate-50 shrink-0">
              <h3 className="text-[#0B3C5D] font-extrabold text-base">
                {isEditMode ? 'Edit Course Details' : 'Add New Course'}
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
                {/* Course Title */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Degree / Course Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Academic Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Academic Field *</label>
                  <input
                    type="text"
                    name="field"
                    required
                    placeholder="e.g. Technology, Humanities, Business"
                    value={formData.field}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Average Salary */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Average Starting Salary</label>
                  <input
                    type="text"
                    name="avgSalary"
                    placeholder="e.g. Rs 80,000"
                    value={formData.avgSalary}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Level Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Academic Level</label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all font-bold"
                  >
                    <option value="Associate">Associate Degree</option>
                    <option value="Bachelor's">Bachelor's Degree</option>
                    <option value="Master's">Master's Degree</option>
                    <option value="Doctorate">Doctorate</option>
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Program Duration</label>
                  <input
                    type="text"
                    name="duration"
                    placeholder="e.g. 4 Years"
                    value={formData.duration}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Program Difficulty</label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all font-bold"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Very High">Very High</option>
                  </select>
                </div>

                {/* Academic Requirements */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject Requirements (Comma Separated)</label>
                  <input
                    type="text"
                    name="requirements"
                    placeholder="e.g. Mathematics, Physics, English"
                    value={formData.requirements}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Careers / Job Paths */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Career Paths (Comma Separated)</label>
                  <input
                    type="text"
                    name="careers"
                    placeholder="e.g. Software Engineer, Tech Lead, System Architect"
                    value={formData.careers}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Universities Offering */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Universities/Colleges Offering (Comma Separated)</label>
                  <input
                    type="text"
                    name="universities"
                    placeholder="e.g. Tribhuvan University, Pokhara University, Kathmandu University"
                    value={formData.universities}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                  <textarea
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
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
                  {isEditMode ? 'Save Changes' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
