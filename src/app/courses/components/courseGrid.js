'use client';
import { useState } from 'react';
import CourseCard from './courseCard';

export default function CourseGrid() {
  const [loadedCourses, setLoadedCourses] = useState(6);
  
  const courses = [
    { 
      id: 4, 
      title: "React Fundamentals & Modern Development", 
      instructor: "Alex Chen",
      category: "Technology", 
      level: "Beginner", 
      price: 5000,
      originalPrice: 8000,
      rating: 4.6,
      students: 234,
      duration: "12 hours",
      isNew: true
    },
    { 
      id: 5, 
      title: "Business Analytics & Intelligence", 
      instructor: "Maria Rodriguez",
      category: "Business", 
      level: "Intermediate", 
      price: 8000,
      originalPrice: 12000,
      rating: 4.8,
      students: 456,
      duration: "20 hours",
      isNew: false
    },
    { 
      id: 6, 
      title: "UI/UX Design Masterclass", 
      instructor: "David Kim",
      category: "Design", 
      level: "Beginner", 
      price: 6000,
      originalPrice: 9000,
      rating: 4.7,
      students: 789,
      duration: "15 hours",
      isNew: true
    },
    { 
      id: 7, 
      title: "Python Programming & Data Science", 
      instructor: "Dr. Emma Wilson",
      category: "Technology", 
      level: "Intermediate", 
      price: 7500,
      originalPrice: 10000,
      rating: 4.9,
      students: 1234,
      duration: "25 hours",
      isNew: false
    },
    { 
      id: 8, 
      title: "Digital Marketing & Social Media", 
      instructor: "Sophie Turner",
      category: "Marketing", 
      level: "Beginner", 
      price: 4500,
      originalPrice: 7000,
      rating: 4.5,
      students: 567,
      duration: "18 hours",
      isNew: true
    },
    { 
      id: 9, 
      title: "Project Management Professional", 
      instructor: "Robert Johnson",
      category: "Business", 
      level: "Advanced", 
      price: 12000,
      originalPrice: 15000,
      rating: 4.8,
      students: 345,
      duration: "30 hours",
      isNew: false
    },
  ];

  const loadMore = () => {
    setLoadedCourses(prev => Math.min(prev + 3, courses.length));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          All Courses
        </h2>
        <div className="text-sm text-gray-600">
          Showing {loadedCourses} of {courses.length} courses
        </div>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {courses.slice(0, loadedCourses).map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      
      {loadedCourses < courses.length && (
        <div className="text-center mt-12">
          <button
            onClick={loadMore}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
          >
            Load More Courses
          </button>
        </div>
      )}
    </div>
  );
}