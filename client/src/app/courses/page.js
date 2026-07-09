import CourseGrid from '../courses/components/courseGrid';
import CourseFilters from '../courses/components/courseFilter';
import CourseBanner from '../courses/components/courseBanner';
import PopularCourses from '../courses/components/popularCourse';

export const metadata = {
  title: 'Courses - EduLink',
  description: 'Explore thousands of courses across various disciplines in Nepal. Find the perfect course that matches your career goals.',
};

function CoursesPage({ showBanner = true }) {
  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      {showBanner && <CourseBanner />}
      <CourseFilters />
      <div className="container mx-auto px-4 py-12 max-w-7xl space-y-16">
        <PopularCourses />
        <CourseGrid />
      </div>
    </div>
  );
}

export default CoursesPage;