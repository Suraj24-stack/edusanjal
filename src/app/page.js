import HeroSection from '../app/component/Hero';
import FeaturedBanners from '../app/component/FeaturedBanner';
import AdmissionFair from '../app/component/AdmissionFair';
import Courses from '../app/courses/page';

export const metadata = {
  title: "EduSanjal - Find Best Colleges, Courses & Schools in Nepal",
  description: "Discover top colleges, universities, schools, and courses in Nepal. Get admission guidance, scholarships, and career counseling. Your trusted partner for educational excellence.",
  keywords: "Nepal colleges, universities Nepal, courses Nepal, admission Nepal, scholarships, career guidance, study abroad",
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Main banner with search */}
      <HeroSection />
      
      {/* Featured Opportunities - Highlighted colleges and programs */}
      <FeaturedBanners />
      
      {/* Admission Fair - Upcoming events and participating colleges */}
      <AdmissionFair />
      
      {/* Course Listings - Browse available courses */}
      <Courses />
    </div>
  );
}