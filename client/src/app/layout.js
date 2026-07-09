import "./globals.css";
import AppShell from "./component/AppShell";

export const metadata = {
  title: "EduLink - Your Partner for Excellence in Education",
  description: "Find the best colleges, courses, and educational opportunities in Nepal. Your trusted partner for academic excellence.",
  keywords: "education, colleges, courses, Nepal, admission, university, school, EduSanjal, scholarships, study abroad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
