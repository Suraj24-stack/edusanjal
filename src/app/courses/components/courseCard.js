'use client';
import { useState } from "react";

// Temporary test component
function CourseCard({ course }) {
  return (
    <div className="bg-[#FFFFFF] p-4 rounded-lg shadow">
      <h3 className="text-[#0B3C5D] font-semibold">
        {course.title}
      </h3>
      <p className="text-[#F2A900]">
        By {course.instructor}
      </p>
    </div>
  );
}

export default function PopularCourses() {
  // rest of your component code...
}