import "./globals.css";
import Header from "./component/Header";
import NavBar from "./component/NavBar";
import Footer from "./component/Footer";

export const metadata = {
  title: "EduLink - Your Partner for Excellence in Education",
  description: "Find the best colleges, courses, and educational opportunities in Nepal. Your trusted partner for academic excellence.",
  keywords: "education, colleges, courses, Nepal, admission, university, school, EduSanjal, scholarships, study abroad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen bg-gradient-to-br from-[#0B3C5D]/5 via-white to-[#F2A900]/5">
        {/* Header - Sticky at top */}
        <Header />
        
        {/* Navigation - Sticky below header */}
        <NavBar />
        
        {/* Main content area */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Footer - Always at bottom */}
        <Footer />
      </body>
    </html>
  );
}