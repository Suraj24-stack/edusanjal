'use client';
import { useState } from "react";
import CourseCard from './courseCard';

export default function PopularCourses() {
  const popularCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "John Doe",
      students: 1200,
      rating: 4.8,
      category: "Technology",
      level: "Beginner",
      price: 5000,
      originalPrice: 8000,
      duration: "25 hours",
      isNew: true
    },
    {
      id: 2,
      title: "Digital Marketing Mastery",
      instructor: "Sarah Smith",
      students: 850,
      rating: 4.7,
      category: "Marketing",
      level: "Intermediate",
      price: 6000,
      originalPrice: 9000,
      duration: "18 hours",
      isNew: false
    },
    {
      id: 3,
      title: "Data Science & AI Fundamentals",
      instructor: "Dr. Mike Johnson",
      students: 970,
      rating: 4.9,
      category: "Technology",
      level: "Advanced",
      price: 12000,
      originalPrice: 15000,
      duration: "40 hours",
      isNew: true
    },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0B3C5D]">
          🔥 Popular Courses
        </h2>
        <button className="text-[#F2A900] hover:text-[#D9A100] font-medium hover:underline">
          View All
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {popularCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}