import "./globals.css";
import NavBar from "./component/NavBar";
import Footer from "./component/Footer";

export const metadata = {
  title: "EduSanjal - Your Partner for Excellence in Education",
  description: "Find the best colleges, courses, and educational opportunities in Nepal. Your trusted partner for academic excellence.",
  keywords: "education, colleges, courses, Nepal, admission, university, school",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen bg-gray-50">
        {/* Header / navigation visible on every route */}
        <NavBar />
        
        {/* Route content */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Footer visible on every route */}
        <Footer />
      </body>
    </html>
  );
}