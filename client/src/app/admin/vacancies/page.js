'use client';

import { useState, useEffect } from 'react';
import { 
  getVacancies, 
  saveVacancies, 
  logActivity 
} from '../dataStore';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  X, 
  Briefcase, 
  MapPin, 
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function AdminVacancies() {
  const [vacancies, setVacancies] = useState([]);
  const [filteredVacancies, setFilteredVacancies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentVacancyId, setCurrentVacancyId] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: 'Kathmandu, Nepal',
    type: 'Full-time',
    category: 'Technology',
    experience: '1-3 years',
    salary: 'RS 50,000 - 80,000',
    deadline: '',
    description: '',
    requirements: '',
    benefits: '',
    skills: '',
    isUrgent: false,
    companyLogo: '💼'
  });

  // Load data
  useEffect(() => {
    const list = getVacancies();
    setVacancies(list);
    setFilteredVacancies(list);
  }, []);

  // Filter vacancies
  useEffect(() => {
    let result = vacancies;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(v => 
        v.title.toLowerCase().includes(term) || 
        v.company.toLowerCase().includes(term) || 
        v.location.toLowerCase().includes(term)
      );
    }

    if (filterType !== 'All') {
      result = result.filter(v => v.type === filterType);
    }

    if (filterCategory !== 'All') {
      result = result.filter(v => v.category === filterCategory);
    }

    setFilteredVacancies(result);
  }, [searchTerm, filterType, filterCategory, vacancies]);

  // Unique categories for filtering
  const categories = ['All', ...new Set(vacancies.map(v => v.category).filter(Boolean))];

  const handleOpenAddModal = () => {
    setFormData({
      title: '',
      company: '',
      location: 'Kathmandu, Nepal',
      type: 'Full-time',
      category: 'Technology',
      experience: '1-3 years',
      salary: 'RS 50,000 - 80,000',
      deadline: '2026-12-31',
      description: '',
      requirements: 'Bachelor\'s Degree in related field, 2 years experience',
      benefits: 'Health Insurance, Festival Bonus, Paid Leaves',
      skills: 'Communication, Teamwork, Technical Skills',
      isUrgent: false,
      companyLogo: '💼'
    });
    setIsEditMode(false);
    setModalOpen(true);
  };

  const handleOpenEditModal = (vac) => {
    setFormData({
      title: vac.title,
      company: vac.company || '',
      location: vac.location || 'Kathmandu, Nepal',
      type: vac.type || 'Full-time',
      category: vac.category || 'Technology',
      experience: vac.experience || '1-3 years',
      salary: vac.salary || 'RS 50,000 - 80,000',
      deadline: vac.deadline || '',
      description: vac.description || '',
      requirements: vac.requirements ? vac.requirements.join(', ') : '',
      benefits: vac.benefits ? vac.benefits.join(', ') : '',
      skills: vac.skills ? vac.skills.join(', ') : '',
      isUrgent: vac.isUrgent || false,
      companyLogo: vac.companyLogo || '💼'
    });
    setCurrentVacancyId(vac.id);
    setIsEditMode(true);
    setModalOpen(true);
  };

  const handleDeleteVacancy = (id, title, company) => {
    if (window.confirm(`Are you sure you want to delete vacancy "${title}" at ${company}?`)) {
      const updated = vacancies.filter(v => v.id !== id);
      setVacancies(updated);
      saveVacancies(updated);
      logActivity(`Deleted job vacancy "${title}" at ${company}.`, 'job');
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const formatDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.company.trim()) return;

    // Convert comma string to arrays
    const reqArray = formData.requirements ? formData.requirements.split(',').map(r => r.trim()).filter(Boolean) : [];
    const benefitsArray = formData.benefits ? formData.benefits.split(',').map(b => b.trim()).filter(Boolean) : [];
    const skillsArray = formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(Boolean) : [];

    const vacancyData = {
      ...formData,
      name: `${formData.company} - ${formData.title}`,
      requirements: reqArray,
      benefits: benefitsArray,
      skills: skillsArray,
      postedDate: formatDate(),
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop"
    };

    let updatedList = [];
    if (isEditMode) {
      const original = vacancies.find(v => v.id === currentVacancyId);
      updatedList = vacancies.map(v => 
        v.id === currentVacancyId 
          ? { 
              ...v, 
              ...vacancyData,
              applicants: original.applicants || 0 
            } 
          : v
      );
      logActivity(`Updated vacancy details for "${formData.title}" at ${formData.company}.`, 'job');
    } else {
      const newVacancy = {
        id: Date.now(),
        applicants: 0,
        ...vacancyData
      };
      updatedList = [newVacancy, ...vacancies];
      logActivity(`Published new job vacancy "${formData.title}" at ${formData.company}.`, 'job');
    }

    setVacancies(updatedList);
    saveVacancies(updatedList);
    setModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0B3C5D] tracking-tight">Manage Job Vacancies</h1>
          <p className="text-slate-500 text-sm font-semibold mt-1">
            Create, modify, or delete career and teaching vacancy openings at institutions and offices.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 bg-[#0B3C5D] hover:bg-[#0B3C5D]/90 text-white font-bold text-xs px-5 py-3.5 rounded-2xl shadow-lg shadow-[#0B3C5D]/10 transition-all duration-300 active:scale-[0.98]"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Post Vacancy</span>
        </button>
      </div>

      {/* Filters Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by title, company, location..."
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
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Government">Government</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-50 text-xs text-slate-700 px-3.5 py-2.5 rounded-xl border border-slate-100 outline-none focus:bg-white focus:border-[#0B3C5D]/20 font-bold"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
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
                <th className="py-4 px-6 font-extrabold">Job Details</th>
                <th className="py-4 px-6 font-extrabold">Institution / Company</th>
                <th className="py-4 px-6 font-extrabold">Salary Offered</th>
                <th className="py-4 px-6 font-extrabold">Deadline</th>
                <th className="py-4 px-6 font-extrabold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700">
              {filteredVacancies.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-slate-400 font-semibold text-sm">
                    No job vacancies match your search parameters.
                  </td>
                </tr>
              ) : (
                filteredVacancies.map((vac) => (
                  <tr key={vac.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                    {/* Job Details */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#F2A900] flex items-center justify-center font-bold text-lg select-none">
                          {vac.companyLogo || '💼'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-slate-800 text-sm leading-tight">{vac.title}</span>
                            {vac.isUrgent && (
                              <span className="flex items-center gap-0.5 bg-red-50 text-red-600 border border-red-100 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded">
                                Urgent
                              </span>
                            )}
                          </div>
                          <span className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold mt-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {vac.location}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <span className="block font-bold text-slate-800 text-xs">{vac.company}</span>
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-bold uppercase tracking-wider">
                          {vac.type}
                        </span>
                      </div>
                    </td>

                    {/* Salary */}
                    <td className="py-4 px-6 text-xs font-black text-[#0B3C5D]">
                      {vac.salary}
                    </td>

                    {/* Deadline */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{vac.deadline}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(vac)}
                          className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-[#0B3C5D] transition-colors"
                          title="Edit Vacancy"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteVacancy(vac.id, vac.title, vac.company)}
                          className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Delete Vacancy"
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
                {isEditMode ? 'Edit Vacancy Openings' : 'Post New Vacancy'}
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
                {/* Job Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Job / Position Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="e.g. Senior Secondary Teacher"
                    value={formData.title}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Company / Institution */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Company / Institution *</label>
                  <input
                    type="text"
                    name="company"
                    required
                    placeholder="e.g. Leapfrog or St. Xavier's"
                    value={formData.company}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Salary */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Salary range / info</label>
                  <input
                    type="text"
                    name="salary"
                    placeholder="e.g. RS 60,000 - 90,000"
                    value={formData.salary}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Experience Required</label>
                  <input
                    type="text"
                    name="experience"
                    placeholder="e.g. 2-4 years"
                    value={formData.experience}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Application Deadline *</label>
                  <input
                    type="date"
                    name="deadline"
                    required
                    value={formData.deadline}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all font-bold"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Job Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all font-bold"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Banking">Banking</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Education">Education</option>
                    <option value="Administration">Administration</option>
                  </select>
                </div>

                {/* Employment Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Employment Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all font-bold"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Government">Government</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                {/* Logo Emoji */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Logo (Emoji / Icon Symbol)</label>
                  <input
                    type="text"
                    name="companyLogo"
                    value={formData.companyLogo}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Urgent Checkbox */}
                <div className="flex items-center gap-2 py-2 md:mt-6">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isUrgent"
                      checked={formData.isUrgent}
                      onChange={handleFormChange}
                      className="w-4 h-4 rounded border-slate-300 text-[#0B3C5D] focus:ring-[#0B3C5D]/20"
                    />
                    <span>Mark as Urgent (Shows warning badge)</span>
                  </label>
                </div>

                {/* Requirements */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Education Requirements (Comma Separated)</label>
                  <input
                    type="text"
                    name="requirements"
                    placeholder="e.g. Master's in English Literature, B.Ed degree"
                    value={formData.requirements}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Skills */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Skills Needed (Comma Separated)</label>
                  <input
                    type="text"
                    name="skills"
                    placeholder="e.g. Classroom management, lesson plans, public speaking"
                    value={formData.skills}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Benefits */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Benefits Offered (Comma Separated)</label>
                  <input
                    type="text"
                    name="benefits"
                    placeholder="e.g. Free lunch, provident fund, medical insurance"
                    value={formData.benefits}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 text-xs text-slate-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-[#0B3C5D] transition-all"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Job Description</label>
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
                  {isEditMode ? 'Save Changes' : 'Post Vacancy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
