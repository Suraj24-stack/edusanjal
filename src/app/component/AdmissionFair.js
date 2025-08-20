'use client'

const Link = require('next/link').default
const { MapPin, Calendar, Users, Award, ExternalLink } = require('lucide-react')

const AdmissionFair = () => {
  const fairColleges = [
    {
      id: 1,
      name: 'Academia International College',
      location: 'Gwarko Chowk, Lalitpur',
      programs: ['BSc CSIT', 'BBS'],
      featured: true,
      badge: 'VERIFIED',
      description: 'Leading college in technology and business education',
      students: '2000+',
      established: '2010'
    },
    {
      id: 2,
      name: 'Softwarica College of IT and E-commerce',
      location: 'Dillibazar, Kathmandu',
      programs: ['BIT', 'BSCS', 'BBA-BI'],
      featured: false,
      badge: 'PREMIUM',
      description: 'Specialized in IT and business innovation',
      students: '1500+',
      established: '2012'
    },
    {
      id: 3,
      name: 'Uniglobe College',
      location: 'New Baneshwor, Kathmandu | PU',
      programs: ['BCSIT', 'BBA', 'BBA(Finance)', 'MBA', 'MBA(Finance)'],
      featured: true,
      badge: 'TOP RATED',
      description: 'Premier institution for comprehensive education',
      students: '3000+',
      established: '2008'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Admission Fair
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Connect directly with top colleges and universities. Explore programs, ask questions, and start your admission journey.
          </p>
          
          {/* Fair Info */}
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-6 max-w-4xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center space-x-3">
                <Calendar className="w-6 h-6 text-primary-600" />
                <div>
                  <p className="font-semibold text-gray-900">Date</p>
                  <p className="text-gray-600">Dec 15-17, 2024</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="w-6 h-6 text-primary-600" />
                <div>
                  <p className="font-semibold text-gray-900">Venue</p>
                  <p className="text-gray-600">Kathmandu Convention Center</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Users className="w-6 h-6 text-primary-600" />
                <div>
                  <p className="font-semibold text-gray-900">Participants</p>
                  <p className="text-gray-600">100+ Colleges</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Link
                href="/admission-fair"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <span>Register for Fair</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Colleges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fairColleges.map((college) => (
            <div
              key={college.id}
              className={`card group hover:scale-105 transition-all duration-300 ${
                college.featured ? 'ring-2 ring-primary-200' : ''
              }`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
                  <div className="text-white text-6xl font-bold opacity-20">
                    {college.name.charAt(0)}
                  </div>
                </div>
                
                {/* Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
                  college.badge === 'VERIFIED' ? 'bg-green-500 text-white' :
                  college.badge === 'PREMIUM' ? 'bg-purple-500 text-white' :
                  'bg-yellow-500 text-gray-900'
                }`}>
                  {college.badge}
                </div>

                {college.featured && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    FEATURED
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                  {college.name}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{college.location}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{college.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center bg-gray-50 rounded-lg p-2">
                    <div className="font-semibold text-primary-600">{college.students}</div>
                    <div className="text-xs text-gray-600">Students</div>
                  </div>
                  <div className="text-center bg-gray-50 rounded-lg p-2">
                    <div className="font-semibold text-primary-600">{college.established}</div>
                    <div className="text-xs text-gray-600">Established</div>
                  </div>
                </div>

                {/* Programs */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">Programs:</p>
                  <div className="flex flex-wrap gap-2">
                    {college.programs.map((program, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
                      >
                        {program}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Link
                    href={`/colleges/${college.id}`}
                    className="flex-1 btn-primary text-center text-sm py-2"
                  >
                    Apply
                  </Link>
                  <Link
                    href={`/colleges/${college.id}/info`}
                    className="flex-1 btn-secondary text-center text-sm py-2"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/admission-fair"
            className="btn-primary text-lg px-8 py-4 hover:scale-105 transition-transform duration-200"
          >
            View All Participating Colleges
          </Link>
        </div>
      </div>
    </section>
  )
}

module.exports = AdmissionFair