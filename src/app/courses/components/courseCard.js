'use client';
import { useState } from "react";

// Temporary test component
function CourseCard({ course }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3>{course.title}</h3>
      <p>By {course.instructor}</p>
    </div>
  );
}

export default function PopularCourses() {
  // rest of your component code...
}