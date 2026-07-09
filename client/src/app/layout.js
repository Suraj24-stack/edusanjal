import "./globals.css";
import AppShell from "./component/AppShell";

export const metadata = {
  metadataBase: new URL('https://edusanjal.surajkhadka7.com.np'),
  title: {
    default: "EduLink - Discover Colleges, Courses, Admissions & Vacancies in Nepal",
    template: "%s | EduLink"
  },
  description: "Find the best colleges, schools, universities, +2 colleges, admissions open, courses, fee structures, vacancies, notices, news, and scholarships in Nepal on EduLink.",
  keywords: [
    "colleges in Nepal", "schools in Nepal", "+2 colleges", "universities in Nepal", 
    "admissions open Nepal", "entrance exams", "scholarships in Nepal", "courses in Nepal", 
    "vacancies Nepal", "educational news Nepal", "exam notices", "results Nepal", 
    "engineering colleges", "medical colleges", "nursing colleges", "management colleges", 
    "IT colleges", "EduLink"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "EduLink - Discover Colleges, Courses, Admissions & Vacancies in Nepal",
    description: "Find the best colleges, schools, universities, +2 colleges, admissions open, courses, fee structures, vacancies, notices, news, and scholarships in Nepal.",
    url: "https://edusanjal.surajkhadka7.com.np",
    siteName: "EduLink",
    locale: "en_NP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduLink - Discover Colleges, Courses, Admissions & Vacancies in Nepal",
    description: "Find the best colleges, schools, universities, +2 colleges, admissions open, courses, fee structures, vacancies, notices, news, and scholarships in Nepal.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://edusanjal.surajkhadka7.com.np/#organization",
  "name": "EduLink",
  "url": "https://edusanjal.surajkhadka7.com.np",
  "logo": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop",
  "description": "The premier educational discovery and admission portal in Nepal, helping students find schools, colleges, courses, degrees, news, exam notices, results, and career opportunities.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kathmandu",
    "addressCountry": "NP"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+977-9848213092",
    "contactType": "customer service",
    "areaServed": "NP",
    "availableLanguage": ["English", "Nepali"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
