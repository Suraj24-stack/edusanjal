const HeroSection = require('../app/component/Hero')
const FeaturedBanners = require('../app/component/FeaturedBanner')
const AdmissionFair = require('../app/component/AdmissionFair')


function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedBanners />
      <AdmissionFair />
      
    </div>
  )
}

module.exports = Home