import './globals.css'
import { Inter } from 'next/font/google'
import Header from './component/Header'
import Footer from './component/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EduSanjal - Your Partner for Excellence in Education',
  description: 'Find the best colleges, courses, and educational opportunities in Nepal. Your trusted partner for academic excellence.',
  keywords: 'education, colleges, courses, Nepal, admission, university, school',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}