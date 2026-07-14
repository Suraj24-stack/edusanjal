'use client';

import { useState, useEffect, useTransition, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  logActivity 
} from '../dataStore';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  X, 
  MapPin, 
  BookOpen, 
  ExternalLink 
} from 'lucide-react';

function AdminCollegesContent() {
  const searchParams = useSearchParams();
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterLevel, setFilterLevel] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCollegeId, setCurrentCollegeId] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: 'Private',
    level: 'College',
    ranking: '',
    tuition: '',
    acceptance: '',
    students: '',
    image: '',
    description: '',
    established: '',
    programs: '',
    showInSchoolList: false,
    showInCollegeList: true
  });

  // Load data
  const loadColleges = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/colleges');
      const data = await res.json();
      if (data.success) {
        setColleges(data.colleges);
        setFilteredColleges(data.colleges);
      } else {
        setError(data.message || 'Failed to fetch institutions');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while loading data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadColleges();

    // If query contains ?add=true, trigger add modal
    if (searchParams.get('add') === 'true') {
      handleOpenAddModal();
    }
  }, [searchParams]);

  // Apply filters
  useEffect(() => {
    let result = colleges;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(term) || 
        c.location.toLowerCase().includes(term) || 
        (c.programs && c.programs.some(p => p.toLowerCase().includes(term)))
      );
    }

    if (filterType !== 'All') {
      result = result.filter(c => c.type === filterType);
    }

    if (filterLevel !== 'All') {
      result = result.filter(c => c.level === filterLevel);
    }

    setFilteredColleges(result);
  }, [searchTerm, filterType, filterLevel, colleges]);

  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      location: '',
      type: 'Private',
      level: 'College',
      ranking: '10',
      tuition: 'RS 50,000',
      acceptance: '20%',
      students: '500',
      image: '',
      description: '',
      established: '2000',
      programs: 'STEM, Commerce, Humanities',
      showInSchoolList: false,
      showInCollegeList: true
    });
    setIsEditMode(false);
    setModalOpen(true);
  };

  const handleOpenEditModal = (college) => {
    setFormData({
      name: college.name,
      location: college.location,
      type: college.type || 'Private',
      level: college.level || 'College',
      ranking: college.ranking || '10',
      tuition: college.tuition || 'RS 50,000',
      acceptance: college.acceptance || '20%',
      students: college.students || '500',
      image: college.image || '',
      description: college.description || '',
      established: college.established || '2000',
      programs: college.programs ? college.programs.join(', ') : '',
      showInSchoolList: college.showInSchoolList || false,
      showInCollegeList: college.showInCollegeList || true
    });
    setCurrentCollegeId(college.id);
    setIsEditMode(true);
    setModalOpen(true);
  };

  const handleDeleteCollege = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        const res = await fetch(`/api/colleges/${id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success) {
          setColleges(prev => prev.filter(c => c.id !== id));
          logActivity(`Deleted institution "${name}".`, 'college');
        } else {
          alert(`Error deleting institution: ${data.message}`);
        }
      } catch (err) {
        console.error(err);
        alert('An error occurred while deleting the institution');
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return;

    // Convert comma string to array
    const programArray = formData.programs
      ? formData.programs.split(',').map(p => p.trim()).filter(Boolean)
      : [];

    const collegeData = {
      ...formData,
      established: parseInt(formData.established, 10) || 2000,
      ranking: parseInt(formData.ranking, 10) || 10,
      programs: programArray,
      image: formData.image || "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop"
    };

    try {
      if (isEditMode) {
        const res = await fetch(`/api/colleges/${currentCollegeId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(collegeData),
        });
        const data = await res.json();
        if (data.success) {
          setColleges(prev => prev.map(c => c.id === currentCollegeId ? { ...c, ...collegeData } : c));
          logActivity(`Updated details for institution "${formData.name}".`, 'college');
        } else {
          alert(`Error updating: ${data.message}`);
          return;
        }
      } else {
        const res = await fetch('/api/colleges', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(collegeData),
        });
        const data = await res.json();
        if (data.success) {
          const newCollege = {
            id: data.id,
            ...collegeData
          };
          setColleges(prev => [newCollege, ...prev]);
          logActivity(`Added new institution "${formData.name}".`, 'college');
        } else {
          alert(`Error creating: ${data.message}`);
          return;
        }
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('An error occurred while saving the institution');
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0B3C5D] tracking-tight">Manage Colleges & Schools</h1>
          <p className="text-slate-500 text-sm font-semibold mt-1">
            Create, modify or archive primary educational institutions listed on EduLink.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 bg-[#0B3C5D] hover:bg-[#0B3C5D]/90 text-white font-bold text-xs px-5 py-3.5 rounded-2xl shadow-lg shadow-[#0B3C5D]/10 transition-all duration-300 active:scale-[0.98]"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Add Institution</span>
        </button>
      </div>

      {/* Filters Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by name, location, program..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 text-xs text-slate-700 placeholder-slate-400 px-4 py-3 pl-10 rounded-2xl border border-slate-100 outline-none focus:bg-white focus:border-[#0B3C5D]/30 transition-all duration-300"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>

        {/* Categories filters */}
        <div className="flex flex-wrap gap-4 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Type</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-slate-50 text-xs text-slate-700 px-3.5 py-2.5 rounded-xl border border-slate-100 outline-none focus:bg-white focus:border-[#0B3C5D]/20 font-bold"
            >
              <option value="All">All Types</option>
              <option value="Private">Private</option>
              <option value="Public">Public</option>
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
              <option value="High School">High School</option>
              <option value="College">College</option>
              <option value="University">University</option>
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
                <th className="py-4 px-6 font-extrabold">Institution Name</th>
                <th className="py-4 px-6 font-extrabold">Type / Level</th>
                <th className="py-4 px-6 font-extrabold">Established</th>
                <th className="py-4 px-6 font-extrabold">Programs</th>
                <th className="py-4 px-6 font-extrabold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-slate-400 font-semibold text-sm animate-pulse">
                    Loading institutions data...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-red-500 font-semibold text-sm">
                    {error}
                  </td>
                </tr>
              ) : filteredColleges.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-slate-400 font-semibold text-sm">
                    No institutions match your search parameters.
                  </td>
                </tr>
              ) : (
                filteredColleges.map((college) => (
                  <tr key={college.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                    {/* Name & Photo */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-slate-50 relative">
                          <img 
                            src={college.image || "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop"} 
                            alt={college.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="block font-black text-slate-800 text-sm">{college.name}</span>
                          <span className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {college.location}
                          </span>
                        </div>
                      </div>
                    </td>
                    
                    {/* Type & Level */}
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <span className="inline-block px-2.5 py-0.5 rounded bg-[#0B3C5D]/5 text-[#0B3C5D] text-[10px] font-bold uppercase tracking-wider">
                          {college.type}
                        </span>
                        <span className="block text-xs font-bold text-slate-500">
                          {college.level}
                        </span>
                      </div>
                    </td>
                    
                    {/* Est. */}
                    <td className="py-4 px-6 text-xs font-bold text-slate-500">
                      {college.established}
                    </td>

                    {/* Programs */}
                    <td className="py-4 px-6 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {college.programs && college.programs.slice(0, 3).map((prog, i) => (
                          <span key={i} className="bg-slate-100 text-slate-600 text-[9px] font-bold px-2 py-0.5 rounded border border-slate-200 uppercase tracking-wide">
                            {prog}
                          </span>
                        ))}
                        {college.programs && college.programs.length > 3 && (
                          <span className="text-[10px] font-bold text-slate-400 ml-1">
                            +{college.programs.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(college)}
                          className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-[#0B3C5D] transition-colors"
                          title="Edit Details"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCollege(college.id, college.name)}
                          className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Delete College"
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

      {/* CRUD Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-slate-50 shrink-0">
              <h3 className="text-[#0B3C5D] font-extrabold text-base">
                {isEditMode ? 'Edit Institution Details' : 'Add New Institution'}
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
                {/* Institution Name */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Institution Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location *</label>
                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="e.g. Maitighar, Kathmandu"
                    value={formData.location}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Established Year */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Established Year</label>
                  <input
                    type="number"
                    name="established"
                    value={formData.established}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Type Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all font-bold"
                  >
                    <option value="Private">Private</option>
                    <option value="Public">Public</option>
                  </select>
                </div>

                {/* Level Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Level</label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all font-bold"
                  >
                    <option value="High School">High School</option>
                    <option value="College">College</option>
                    <option value="University">University</option>
                  </select>
                </div>

                {/* Tuition Cost */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Average Tuition Fee</label>
                  <input
                    type="text"
                    name="tuition"
                    placeholder="e.g. RS 55,000"
                    value={formData.tuition}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Acceptance Rate */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Acceptance Rate</label>
                  <input
                    type="text"
                    name="acceptance"
                    placeholder="e.g. 15%"
                    value={formData.acceptance}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Student Enrollment */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Student Count</label>
                  <input
                    type="text"
                    name="students"
                    placeholder="e.g. 1,200"
                    value={formData.students}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Ranking */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">National Rank</label>
                  <input
                    type="number"
                    name="ranking"
                    placeholder="e.g. 3"
                    value={formData.ranking}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Image URL */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Featured Image URL</label>
                  <input
                    type="url"
                    name="image"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Programs (Comma Separated) */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Programs / Courses (Comma Separated)</label>
                  <textarea
                    name="programs"
                    rows="2"
                    placeholder="e.g. Science, Management, Humanities, Computer Science"
                    value={formData.programs}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">About / Description</label>
                  <textarea
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Display Preferences */}
                <div className="md:col-span-2 flex items-center gap-6 py-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      name="showInSchoolList"
                      checked={formData.showInSchoolList}
                      onChange={handleFormChange}
                      className="w-4 h-4 rounded border-slate-300 text-[#0B3C5D] focus:ring-[#0B3C5D]/20"
                    />
                    <span>Show in School Listings</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      name="showInCollegeList"
                      checked={formData.showInCollegeList}
                      onChange={handleFormChange}
                      className="w-4 h-4 rounded border-slate-300 text-[#0B3C5D] focus:ring-[#0B3C5D]/20"
                    />
                    <span>Show in College Listings</span>
                  </label>
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
                  {isEditMode ? 'Save Changes' : 'Create Institution'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminColleges() {
  return (
    <Suspense fallback={<div className="text-sm font-semibold text-slate-400 p-8 text-center bg-white rounded-3xl border border-slate-100">Loading colleges and schools data...</div>}>
      <AdminCollegesContent />
    </Suspense>
  );
}
