'use client'

const { useState } = require('react')
const Link = require('next/link').default
const { Search, GraduationCap, Building2, BookOpen, Users } = require('lucide-react')

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchCategory, setSearchCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All', icon: Search },
    { id: 'colleges', name: 'Colleges', icon: Building2 },
    { id: 'courses', name: 'Courses', icon: BookOpen },
    { id: 'degrees', name: 'Degrees', icon: GraduationCap },
  ]

  return (
    <section className="relative gradient-bg text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      
      <div className="relative container-custom py-20 lg:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Your Partner for
            <span className="block text-yellow-300">Educational Excellence</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-200">
            Discover the best colleges, courses, and educational opportunities in Nepal. 
            Your journey to success starts here.
          </p>

          {/* Search Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 mb-12 animate-slide-up animation-delay-400">
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSearchCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      searchCategory === category.id
                        ? 'bg-white text-primary-600 shadow-lg'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                )
              })}
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for colleges, courses, degrees..."
                  className="w-full px-6 py-4 text-gray-900 rounded-lg focus:ring-4 focus:ring-white/30 outline-none text-lg"
                />
              </div>
              <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-xl">
                Search Now
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in animation-delay-600">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">500+</div>
              <div className="text-blue-100">Colleges</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">1000+</div>
              <div className="text-blue-100">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">50K+</div>
              <div className="text-blue-100">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">100+</div>
              <div className="text-blue-100">Universities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300/20 rounded-full blur-xl animate-bounce-subtle"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-300/20 rounded-full blur-xl animate-bounce-subtle animation-delay-200"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-300/20 rounded-full blur-xl animate-bounce-subtle animation-delay-400"></div>
    </section>
  )
}

module.exports = HeroSection