import DegreesClient from './DegreesClient';
import { degreesData } from '../data/degreesData';

export const metadata = {
  title: "Popular Degree Programs in Nepal - Bachelor's & Master's Degrees",
  description: "Explore the most popular degree programs in Nepal, including Computer Science, Business Administration (MBA), Medicine, and Engineering. View average salaries, duration, and careers.",
  keywords: ["popular degrees nepal", "bachelors programs nepal", "masters degree nepal", "computer science degree nepal", "mba in nepal", "engineering degree"],
  alternates: {
    canonical: "/degrees"
  },
  openGraph: {
    title: "Popular Degree Programs in Nepal - EduLink",
    description: "Explore the most popular degree programs in Nepal, including Computer Science, Business Administration, Medicine, and Engineering.",
    url: "https://edusanjal.surajkhadka7.com.np/degrees",
    type: "website"
  }
};

export default function Page() {
  // Generate JSON-LD Schema on the server
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://edusanjal.surajkhadka7.com.np/degrees/#webpage",
    "name": "Popular Degree Programs in Nepal",
    "url": "https://edusanjal.surajkhadka7.com.np/degrees",
    "description": "Comprehensive list of popular degree programs in Nepal, including career paths and salary details.",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": degreesData.length,
      "itemListElement": degreesData.map((degree, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Course",
          "name": `${degree.level} in ${degree.title}`,
          "description": degree.description,
          "provider": {
            "@type": "EducationalOrganization",
            "name": "Nepalese Universities"
          },
          "educationalCredentialAwarded": degree.level,
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "duration": degree.duration.replace("Years", "P4Y").replace("Year", "P1Y"), // Convert to ISO duration format or approximate
            "courseMode": "Full-time"
          }
        }
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <DegreesClient />
    </>
  );
}
