'use client'

const Link = require('next/link').default
const { ExternalLink, Star, Clock, Users } = require('lucide-react')

const FeaturedBanners = () => {
  const banners = [
    {
      id: 1,
      title: 'TOP 100 SCHOLARSHIP',
      subtitle: 'Study B.Sc.IT',
      description: 'Get scholarship for B.Sc.IT program',
      bgColor: 'bg-gradient-to-r from-red-500 to-orange-500',
      textColor: 'text-white',
      ctaText: 'Apply Now',
      badge: 'LIMITED TIME',
      isUrgent: true
    },
    {
      id: 2,
      title: 'Texas College of Management',
      subtitle: 'BIT / BCS / BBA / BHM / MBA / MCS / MBA in HM / HR',
      description: 'Your Partner for Excellence',
      bgColor: 'bg-gradient-to-r from-blue-600 to-purple-600',
      textColor: 'text-white',
      ctaText: 'Learn More',
      website: 'www.texascollege.edu.np'
    },
    {
      id: 3,
      title: 'Programmes Offered',
      subtitle: 'BCA, BTHM, BIT, BSW, BCIS, BBS',
      description: 'Multiple programs available',
      bgColor: 'bg-gradient-to-r from-green-600 to-teal-600',
      textColor: 'text-white',
      ctaText: 'View Programs',
      badge: 'ADMISSION OPEN'
    },
    {
      id: 4,
      title: 'NCMT College',
      subtitle: 'Affiliated to Lincoln University College',
      description: 'BBA | BHM | BIT | BCS | MBA',
      bgColor: 'bg-gradient-to-r from-purple-600 to-pink-600',
      textColor: 'text-white',
      ctaText: 'Apply Now',
      badge: 'ADMISSION OPEN',
      rating: 4.8
    },
    {
      id: 5,
      title: 'NCIT',
      subtitle: 'Information Technology',
      description: 'BE Software, BE Civil, BE Computer, BE IT, B.Arch, BCA (IT), BBA',
      bgColor: 'bg-gradient-to-r from-indigo-600 to-blue-600',
      textColor: 'text-white',
      ctaText: 'Apply Now',
      badge: 'ADMISSIONS OPEN!',
      contact: '+9801234567'
    },
    {
      id: 6,
      title: 'KEA Business School',
      subtitle: 'Excellence in Business Education',
      description: 'MBA, BBA, and professional courses',
      bgColor: 'bg-gradient-to-r from-gray-700 to-gray-900',
      textColor: 'text-white',
      ctaText: 'Explore',
      badge: 'PREMIUM'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover top colleges and exclusive programs tailored for your success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`${banner.bgColor} ${banner.textColor} rounded-2xl p-6 relative overflow-hidden group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl`}
            >
              {/* Badge */}
              {banner.badge && (
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                  banner.isUrgent ? 'bg-yellow-400 text-gray-900' : 'bg-white/20 backdrop-blur-sm'
                }`}>
                  {banner.badge}
                </div>
              )}

              {/* Rating */}
              {banner.rating && (
                <div className="flex items-center mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-semibold">{banner.rating}</span>
                  <span className="text-sm opacity-80 ml-1">(245 reviews)</span>
                </div>
              )}

              {/* Content */}
              <h3 className="text-xl font-bold mb-2">{banner.title}</h3>
              <p className="text-lg font-medium mb-3 opacity-90">{banner.subtitle}</p>
              <p className="text-sm opacity-80 mb-6">{banner.description}</p>

              {/* Additional Info */}
              {banner.website && (
                <div className="flex items-center mb-4 text-sm opacity-80">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {banner.website}
                </div>
              )}

              {banner.contact && (
                <div className="flex items-center mb-4 text-sm opacity-80">
                  <Clock className="w-4 h-4 mr-2" />
                  {banner.contact}
                </div>
              )}

              {/* CTA Button */}
              <Link
                href={`/colleges/${banner.id}`}
                className="inline-block bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
              >
                {banner.ctaText}
              </Link>

              {/* Decorative Elements */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-300"></div>
              <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-300"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/colleges"
            className="btn-primary text-lg px-8 py-4 hover:scale-105 transition-transform duration-200"
          >
            View All Colleges
          </Link>
        </div>
      </div>
    </section>
  )
}

module.exports = FeaturedBanners