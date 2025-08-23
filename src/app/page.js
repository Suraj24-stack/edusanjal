
import HeroSection from '../app/component/Hero';
import FeaturedBanners from '../app/component/FeaturedBanner';
import AdmissionFair from '../app/component/AdmissionFair';
import Courses from '../app/courses/page';

function Home() {
  return (
    <div className="min-h-screen">
       
      <HeroSection />
      <FeaturedBanners />
      <AdmissionFair />
      <Courses />
    </div>
  );
}

export default Home;