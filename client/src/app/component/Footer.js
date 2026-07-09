import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Help Center', href: '/help' },
  ];

  const categories = [
    { name: 'Engineering Colleges', href: '/colleges/engineering' },
    { name: 'Medical Colleges', href: '/colleges/medical' },
    { name: 'Management Colleges', href: '/colleges/management' },
    { name: 'IT Colleges', href: '/colleges/it' },
    { name: 'Arts Colleges', href: '/colleges/arts' },
  ];

  const services = [
    { name: 'Career Guidance', href: '/services/career-guidance' },
    { name: 'Admission Counseling', href: '/services/admission-counseling' },
    { name: 'Scholarship Information', href: '/scholarships' },
    { name: 'Study Abroad', href: '/services/study-abroad' },
    { name: 'Online Courses', href: '/courses/online' },
  ];

  return (
    <footer className="bg-gradient-to-br from-[#0B3C5D] via-[#0B3C5D]/95 to-[#0B3C5D]/90 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2" aria-label="EduLink Home">
              <div className="w-8 h-8 bg-[#F2A900] rounded transform rotate-12">
                <div className="w-full h-full bg-white rounded transform -rotate-12 flex items-center justify-center">
                  <span className="text-[#0B3C5D] font-bold text-sm">E</span>
                </div>
              </div>
              <span className="text-2xl font-bold text-white">EduLink</span>
            </Link>
            <p className="text-gray-300 leading-relaxed text-sm">
              Your trusted partner for educational excellence in Nepal. Connecting students with the best colleges, schools, courses, and opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#F2A900] transition-colors duration-200" aria-label="EduLink Facebook page">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#F2A900] transition-colors duration-200" aria-label="EduLink Twitter page">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#F2A900] transition-colors duration-200" aria-label="EduLink Instagram profile">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#F2A900] transition-colors duration-200" aria-label="EduLink LinkedIn company profile">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#F2A900] tracking-wide">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#F2A900] transition-colors duration-200 text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#F2A900] tracking-wide">Popular Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-gray-300 hover:text-[#F2A900] transition-colors duration-200 text-sm font-medium"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#F2A900] tracking-wide">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#F2A900] shrink-0" aria-hidden="true" />
                <span className="text-gray-300">Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#F2A900] shrink-0" aria-hidden="true" />
                <span className="text-gray-300">+977-9848213092</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#F2A900] shrink-0" aria-hidden="true" />
                <span className="text-gray-300">info@edulink.com</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-bold text-sm mb-2 text-white">Subscribe to our newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-l-lg focus:ring-2 focus:ring-[#F2A900] focus:border-transparent outline-none text-white placeholder-gray-400 text-sm"
                  aria-label="Email address for newsletter"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-[#F2A900] to-[#D9A100] hover:from-[#D9A100] hover:to-[#C09000] text-[#0B3C5D] font-bold rounded-r-lg transition-all duration-200 text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-xs">
            © 2026 EduLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;