const Link = require('next/link').default
const { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } = require('lucide-react')

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Help Center', href: '/help' },
  ]

  const categories = [
    { name: 'Engineering Colleges', href: '/colleges/engineering' },
    { name: 'Medical Colleges', href: '/colleges/medical' },
    { name: 'Management Colleges', href: '/colleges/management' },
    { name: 'IT Colleges', href: '/colleges/it' },
    { name: 'Arts Colleges', href: '/colleges/arts' },
  ]

  const services = [
    { name: 'Career Guidance', href: '/services/career-guidance' },
    { name: 'Admission Counseling', href: '/services/admission-counseling' },
    { name: 'Scholarship Information', href: '/scholarships' },
    { name: 'Study Abroad', href: '/services/study-abroad' },
    { name: 'Online Courses', href: '/courses/online' },
  ]

  return (
    <footer className="bg-gradient-to-br from-[#0B3C5D] via-[#0B3C5D]/95 to-[#0B3C5D]/90 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#F2A900] rounded transform rotate-12">
                <div className="w-full h-full bg-white rounded transform -rotate-12 flex items-center justify-center">
                  <span className="text-[#0B3C5D] font-bold text-sm">E</span>
                </div>
              </div>
              <span className="text-2xl font-bold text-white">EduLink</span>
            </Link>
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for educational excellence in Nepal. Connecting students with the best colleges, courses, and opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#F2A900] transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#F2A900] transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#F2A900] transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#F2A900] transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#F2A900]">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#F2A900] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#F2A900]">Popular Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-gray-300 hover:text-[#F2A900] transition-colors duration-200"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#F2A900]">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#F2A900]" />
                <span className="text-gray-300">Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#F2A900]" />
                <span className="text-gray-300">+9779848213092</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#F2A900]" />
                <span className="text-gray-300">info@EduLink.com</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-medium mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-l-lg focus:ring-2 focus:ring-[#F2A900] focus:border-transparent outline-none text-white placeholder-gray-400"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-[#F2A900] to-[#D9A100] hover:from-[#D9A100] hover:to-[#C09000] text-[#0B3C5D] font-semibold rounded-r-lg transition-all duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 surazk.tech All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

module.exports = Footer