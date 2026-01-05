'use client';

import { useState } from 'react';
import { X, Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ApplicationModal({ school, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [formData, setFormData] = useState({
    // Student Information
    studentName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    
    // Parent/Guardian Information
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    parentOccupation: '',
    
    // Academic Information
    previousSchool: '',
    lastGrade: '',
    lastPercentage: '',
    applyingForGrade: '',
    
    // Documents
    documents: {
      photo: null,
      birthCertificate: null,
      previousMarksheet: null,
      citizenshipCopy: null,
    },
    
    // Additional Information
    additionalInfo: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleFileChange = (e, documentType) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [documentType]: 'File size must be less than 5MB'
        }));
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [documentType]: file
        }
      }));
      
      // Clear error
      if (errors[documentType]) {
        setErrors(prev => ({
          ...prev,
          [documentType]: null
        }));
      }
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
    }
    
    if (step === 2) {
      if (!formData.parentName.trim()) newErrors.parentName = 'Parent/Guardian name is required';
      if (!formData.parentPhone.trim()) newErrors.parentPhone = 'Parent phone is required';
      if (!formData.parentEmail.trim()) newErrors.parentEmail = 'Parent email is required';
    }
    
    if (step === 3) {
      if (!formData.previousSchool.trim()) newErrors.previousSchool = 'Previous school is required';
      if (!formData.lastGrade) newErrors.lastGrade = 'Last grade completed is required';
      if (!formData.applyingForGrade) newErrors.applyingForGrade = 'Applying for grade is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Append all text fields
      Object.keys(formData).forEach(key => {
        if (key !== 'documents') {
          submitData.append(key, formData[key]);
        }
      });
      
      // Append school information
      submitData.append('schoolId', school.id);
      submitData.append('schoolName', school.name);
      
      // Append files
      Object.keys(formData.documents).forEach(key => {
        if (formData.documents[key]) {
          submitData.append(key, formData.documents[key]);
        }
      });

      // Submit to API
      const response = await fetch('/api/applications', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application');
      }

      const result = await response.json();
      setSubmitSuccess(true);
      
      // Auto close after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (error) {
      console.error('Application submission error:', error);
      setSubmitError(error.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success screen
  if (submitSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="mx-auto text-green-500" size={64} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Application Submitted Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Your application to <span className="font-semibold">{school.name}</span> has been submitted successfully. The school will review your application and contact you soon.
          </p>
          <button
            onClick={onClose}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B3C5D] to-[#1565C0] text-white p-6 rounded-t-xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-2">Apply to {school.name}</h2>
          <p className="text-blue-100">{school.location}</p>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 md:w-32 h-1 ${
                      step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs md:text-sm font-medium">Student Info</span>
            <span className="text-xs md:text-sm font-medium">Parent Info</span>
            <span className="text-xs md:text-sm font-medium">Academic</span>
            <span className="text-xs md:text-sm font-medium">Documents</span>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Student Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Student Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.studentName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter full name"
                  />
                  {errors.studentName && (
                    <p className="text-red-500 text-sm mt-1">{errors.studentName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.gender ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="student@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="98XXXXXXXX"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter full address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Parent/Guardian Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Parent/Guardian Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent/Guardian Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.parentName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter parent/guardian name"
                  />
                  {errors.parentName && (
                    <p className="text-red-500 text-sm mt-1">{errors.parentName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.parentPhone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="98XXXXXXXX"
                  />
                  {errors.parentPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.parentPhone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.parentEmail ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="parent@example.com"
                  />
                  {errors.parentEmail && (
                    <p className="text-red-500 text-sm mt-1">{errors.parentEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent Occupation
                  </label>
                  <input
                    type="text"
                    name="parentOccupation"
                    value={formData.parentOccupation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter occupation"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Academic Information */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Academic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous School <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.previousSchool ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter previous school name"
                  />
                  {errors.previousSchool && (
                    <p className="text-red-500 text-sm mt-1">{errors.previousSchool}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Grade Completed <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="lastGrade"
                    value={formData.lastGrade}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.lastGrade ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select grade</option>
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(grade => (
                      <option key={grade} value={`Grade ${grade}`}>Grade {grade}</option>
                    ))}
                  </select>
                  {errors.lastGrade && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastGrade}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Percentage/GPA
                  </label>
                  <input
                    type="text"
                    name="lastPercentage"
                    value={formData.lastPercentage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 85% or 3.5 GPA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Applying for Grade <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="applyingForGrade"
                    value={formData.applyingForGrade}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.applyingForGrade ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select grade</option>
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(grade => (
                      <option key={grade} value={`Grade ${grade}`}>Grade {grade}</option>
                    ))}
                  </select>
                  {errors.applyingForGrade && (
                    <p className="text-red-500 text-sm mt-1">{errors.applyingForGrade}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Documents & Additional Info */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Documents Upload</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Photo
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'photo')}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer text-blue-600 hover:text-blue-700">
                      {formData.documents.photo ? formData.documents.photo.name : 'Click to upload'}
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Max 5MB</p>
                  </div>
                  {errors.photo && (
                    <p className="text-red-500 text-sm mt-1">{errors.photo}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Birth Certificate
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, 'birthCertificate')}
                      className="hidden"
                      id="birth-certificate-upload"
                    />
                    <label htmlFor="birth-certificate-upload" className="cursor-pointer text-blue-600 hover:text-blue-700">
                      {formData.documents.birthCertificate ? formData.documents.birthCertificate.name : 'Click to upload'}
                    </label>
                    <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                  </div>
                  {errors.birthCertificate && (
                    <p className="text-red-500 text-sm mt-1">{errors.birthCertificate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous Marksheet
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, 'previousMarksheet')}
                      className="hidden"
                      id="marksheet-upload"
                    />
                    <label htmlFor="marksheet-upload" className="cursor-pointer text-blue-600 hover:text-blue-700">
                      {formData.documents.previousMarksheet ? formData.documents.previousMarksheet.name : 'Click to upload'}
                    </label>
                    <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent Citizenship Copy
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, 'citizenshipCopy')}
                      className="hidden"
                      id="citizenship-upload"
                    />
                    <label htmlFor="citizenship-upload" className="cursor-pointer text-blue-600 hover:text-blue-700">
                      {formData.documents.citizenshipCopy ? formData.documents.citizenshipCopy.name : 'Click to upload'}
                    </label>
                    <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any additional information you'd like to share..."
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <AlertCircle size={20} />
              <p>{submitError}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Previous
              </button>
            )}
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="ml-auto px-8 py-2 bg-gradient-to-r from-[#0B3C5D] to-[#1565C0] hover:from-[#1565C0] hover:to-[#0B3C5D] text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
