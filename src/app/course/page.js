const CourseGrid = require('../../components/courses/CourseGrid')
const CourseFilters = require('../../components/courses/CourseFilters')
const CourseBanner = require('../../components/courses/CourseBanner')
const PopularCourses = require('../../components/courses/PopularCourses')

const metadata = {
  title: 'Courses - EduSanjal',
  description: 'Explore thousands of courses across various disciplines in Nepal. Find the perfect course that matches your career goals.',
}

function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CourseBanner />
      <CourseFilters />
      <PopularCourses />
      <CourseGrid />
    </div>
  )
}

module.exports = CoursesPage