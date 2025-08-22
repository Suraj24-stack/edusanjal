import CourseGrid from '../courses/components/courseGrid';
import CourseFilters from '../courses/components/courseFilter';
import CourseBanner from '../courses/components/courseBanner';
import PopularCourses from '../courses/components/popularCourse';

export const metadata = {
  title: 'Courses - EduSanjal',
  description: 'Explore thousands of courses across various disciplines in Nepal. Find the perfect course that matches your career goals.',
};

function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CourseBanner />
      <CourseFilters />
      <PopularCourses />
      <CourseGrid />
    </div>
  );
}

export default CoursesPage;