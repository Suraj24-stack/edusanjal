import SchoolsClient from './SchoolsClient';
import { CollegeModel } from '../../../../server/models/collegeModel';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Best Schools and Secondary Academies in Nepal - Rankings & Fees",
  description: "Find and compare the top schools, K-12 institutions, and +2 secondary schools in Nepal. Browse rankings, established dates, boarding status, tuition structure, and programs.",
  keywords: ["best schools in nepal", "top boarding schools nepal", "secondary schools nepal", "plus two schools in nepal", "st xaviers college secondary"],
  alternates: {
    canonical: "/schools"
  },
  openGraph: {
    title: "Best Schools & K-12 Academies in Nepal - EduLink",
    description: "Compare and find the top schools and secondary academies in Nepal. View academic ranking, tuition structure, boarding options, and programs.",
    url: "https://edulink.surajkhadka7.com.np/schools",
    type: "website"
  }
};

export default async function Page() {
  let colleges = [];
  try {
    colleges = await CollegeModel.getAll();
  } catch (error) {
    console.error('Failed to fetch schools for dynamic server page:', error);
  }

  const schools = colleges.filter(school => school.showInSchoolList);

  // Generate JSON-LD Schema on the server
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://edulink.surajkhadka7.com.np/schools/#webpage",
    "name": "Top Schools and Secondary Academies in Nepal",
    "url": "https://edulink.surajkhadka7.com.np/schools",
    "description": "Comprehensive list of the best secondary schools and K-12 academies in Nepal.",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": schools.length,
      "itemListElement": schools.map((school, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "School",
          "name": school.name,
          "description": school.description,
          "url": `https://edulink.surajkhadka7.com.np/schools/${school.id}`,
          "image": school.image,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": school.location,
            "addressLocality": "Kathmandu",
            "addressCountry": "NP"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "NPR",
            "description": `Tuition Structure: ${school.tuition}`
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
      <SchoolsClient initialSchools={schools} />
    </>
  );
}
