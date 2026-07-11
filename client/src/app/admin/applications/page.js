'use client';

import { useState, useEffect } from 'react';
import { 
  getApplications, 
  saveApplications, 
  logActivity 
} from '../dataStore';
import { 
  Search, 
  X, 
  Check, 
  AlertCircle, 
  Clock, 
  Mail, 
  Phone, 
  Eye, 
  Trash2,
  Inbox
} from 'lucide-react';

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');

  // Modal State
  const [selectedApp, setSelectedApp] = useState(null);

  // Load applications
  useEffect(() => {
    setApplications(getApplications());
  }, []);

  // Filter applications
  useEffect(() => {
    let result = applications;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(app => 
        app.name.toLowerCase().includes(term) || 
        app.email.toLowerCase().includes(term) || 
        app.targetName.toLowerCase().includes(term)
      );
    }

    if (filterStatus !== 'All') {
      result = result.filter(app => app.status === filterStatus);
    }

    if (filterType !== 'All') {
      result = result.filter(app => app.type === filterType);
    }

    setFilteredApplications(result);
  }, [searchTerm, filterStatus, filterType, applications]);

  // Status Action Handlers
  const handleUpdateStatus = (id, newStatus) => {
    const appToUpdate = applications.find(a => a.id === id);
    if (!appToUpdate) return;

    const updated = applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    );

    setApplications(updated);
    saveApplications(updated);
    logActivity(`Application for "${appToUpdate.name}" status updated to ${newStatus}.`, 'admission');
    
    // Update selected app detail modal if it's currently open
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleDeleteApplication = (id, name) => {
    if (window.confirm(`Are you sure you want to delete application from ${name}?`)) {
      const updated = applications.filter(app => app.id !== id);
      setApplications(updated);
      saveApplications(updated);
      logActivity(`Deleted application from "${name}".`, 'admission');
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp(null);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div>
        <h1 className="text-3xl font-black text-[#0B3C5D] tracking-tight">Applications & Inquiries</h1>
        <p className="text-slate-500 text-sm font-semibold mt-1">
          Review and update candidate statuses for admissions and vacancies.
        </p>
      </div>

      {/* Filters Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by applicant name, email, target..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 text-xs text-slate-700 placeholder-slate-400 px-4 py-3 pl-10 rounded-2xl border border-slate-100 outline-none focus:bg-white focus:border-[#0B3C5D]/30 transition-all duration-300"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>

        {/* Action filters */}
        <div className="flex flex-wrap gap-4 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Type</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-slate-50 text-xs text-slate-700 px-3.5 py-2.5 rounded-xl border border-slate-100 outline-none focus:bg-white focus:border-[#0B3C5D]/20 font-bold"
            >
              <option value="All">All Inquiries</option>
              <option value="Admission">Admissions</option>
              <option value="Job">Job Vacancies</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-50 text-xs text-slate-700 px-3.5 py-2.5 rounded-xl border border-slate-100 outline-none focus:bg-white focus:border-[#0B3C5D]/20 font-bold"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
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
                <th className="py-4 px-6 font-extrabold">Applicant Info</th>
                <th className="py-4 px-6 font-extrabold">Type</th>
                <th className="py-4 px-6 font-extrabold">Target Institution / Job</th>
                <th className="py-4 px-6 font-extrabold">Submitted</th>
                <th className="py-4 px-6 font-extrabold">Status</th>
                <th className="py-4 px-6 font-extrabold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700">
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-slate-400 font-semibold text-sm">
                    No applications match your search parameters.
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                    
                    {/* Applicant Info */}
                    <td className="py-4 px-6">
                      <div>
                        <span className="block font-black text-slate-800 text-sm">{app.name}</span>
                        <span className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold mt-1">
                          <Mail className="w-3.5 h-3.5" /> {app.email}
                        </span>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="py-4 px-6 text-xs font-bold">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] ${app.type === 'Admission' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                        {app.type}
                      </span>
                    </td>

                    {/* Target Name */}
                    <td className="py-4 px-6 font-bold text-slate-700 text-xs">
                      {app.targetName}
                    </td>

                    {/* Submitted Date */}
                    <td className="py-4 px-6 font-semibold text-slate-400 text-xs">
                      {app.date}
                    </td>

                    {/* Status badge */}
                    <td className="py-4 px-6">
                      <span className={`
                        inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border
                        ${app.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                        ${app.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                        ${app.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                      `}>
                        <span className={`w-1.5 h-1.5 rounded-full ${app.status === 'Approved' ? 'bg-green-500' : app.status === 'Pending' ? 'bg-amber-500' : 'bg-red-500'}`} />
                        {app.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-[#0B3C5D] transition-colors"
                          title="View Inquiry Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        <div className="h-6 w-px bg-slate-100 mx-1" />

                        {app.status === 'Pending' ? (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(app.id, 'Approved')}
                              className="w-8 h-8 rounded-lg border border-green-100 bg-green-50/50 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-all duration-200"
                              title="Approve Applicant"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(app.id, 'Rejected')}
                              className="w-8 h-8 rounded-lg border border-red-100 bg-red-50/50 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                              title="Reject Applicant"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleUpdateStatus(app.id, 'Pending')}
                            className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
                            title="Reset to Pending"
                          >
                            <Clock className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteApplication(app.id, app.name)}
                          className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Delete Application"
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

      {/* Inquiry Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-slate-50 shrink-0">
              <div className="flex items-center gap-2">
                <Inbox className="w-5 h-5 text-[#0B3C5D]" />
                <h3 className="text-[#0B3C5D] font-extrabold text-base">Inquiry details</h3>
              </div>
              <button 
                onClick={() => setSelectedApp(null)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Profile Card */}
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-[#0B3C5D]/10 text-[#0B3C5D] font-black text-lg flex items-center justify-center">
                  {selectedApp.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <span className="block font-black text-slate-800 text-sm leading-snug">{selectedApp.name}</span>
                  <span className="block text-xs font-semibold text-slate-400 mt-0.5">{selectedApp.date}</span>
                </div>
              </div>

              {/* Data Details */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inquiry Type</span>
                  <span className="block font-bold text-slate-800 mt-1">{selectedApp.type}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</span>
                  <span className="block font-bold text-slate-800 mt-1">{selectedApp.status}</span>
                </div>
                <div className="col-span-2">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Entity</span>
                  <span className="block font-bold text-[#0B3C5D] text-sm mt-1">{selectedApp.targetName}</span>
                </div>
                
                <div className="h-px bg-slate-100 col-span-2 my-2" />

                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><Mail className="w-3 h-3" /> Email Address</span>
                  <a href={`mailto:${selectedApp.email}`} className="block font-semibold text-[#0B3C5D] hover:underline mt-1">{selectedApp.email}</a>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><Phone className="w-3 h-3" /> Phone Number</span>
                  <a href={`tel:${selectedApp.phone}`} className="block font-semibold text-slate-800 mt-1">{selectedApp.phone}</a>
                </div>

                <div className="h-px bg-slate-100 col-span-2 my-2" />

                <div className="col-span-2 bg-[#0B3C5D]/5 p-4 rounded-xl border border-[#0B3C5D]/10">
                  <span className="block text-[10px] font-bold text-[#0B3C5D] uppercase tracking-widest">Applicant Message / Details</span>
                  <p className="text-slate-700 leading-relaxed font-semibold mt-2 whitespace-pre-wrap">{selectedApp.details}</p>
                </div>
              </div>

              {/* Status Actions inside Modal */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 shrink-0">
                {selectedApp.status === 'Pending' ? (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(selectedApp.id, 'Rejected')}
                      className="bg-red-50 border border-red-100 text-red-600 hover:bg-red-100 font-bold text-xs px-4 py-2.5 rounded-xl transition-all"
                    >
                      Reject Application
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedApp.id, 'Approved')}
                      className="bg-green-600 text-white hover:bg-green-700 font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all"
                    >
                      Approve Application
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleUpdateStatus(selectedApp.id, 'Pending')}
                    className="bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs px-4 py-2.5 rounded-xl transition-all animate-pulse"
                  >
                    Reset Status to Pending
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
