import CollegesClient from './CollegesClient';
import { CollegeModel } from '../../../../server/models/collegeModel';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Best Colleges in Nepal 2026 - Engineering, Medical, Management & IT Colleges",
  description: "Compare and find the top colleges and universities in Nepal for 2026. View academic ranking, tuition fee structure, admission status, programs, and acceptance rates.",
  keywords: ["best colleges in nepal", "top engineering colleges nepal", "medical colleges in nepal", "it colleges in nepal", "management colleges nepal", "tribhuvan university colleges"],
  alternates: {
    canonical: "/colleges"
  },
  openGraph: {
    title: "Best Colleges & Universities in Nepal 2026 - EduLink",
    description: "Compare and find the top colleges and universities in Nepal for 2026. View academic ranking, tuition fees, and programs.",
    url: "https://edulink.surajkhadka7.com.np/colleges",
    type: "website"
  }
};

export default async function Page() {
  let colleges = [];
  try {
    colleges = await CollegeModel.getAll();
  } catch (error) {
    console.error('Failed to fetch colleges for dynamic server page:', error);
  }

  const displayColleges = colleges.filter(school => school.showInCollegeList);

  // Generate JSON-LD Schema on the server
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://edulink.surajkhadka7.com.np/colleges/#webpage",
    "name": "Top Colleges in Nepal 2026",
    "url": "https://edulink.surajkhadka7.com.np/colleges",
    "description": "Comprehensive list of the best colleges and universities in Nepal, including rankings and tuition details.",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": displayColleges.length,
      "itemListElement": displayColleges.map((college, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "CollegeOrUniversity",
          "name": college.name,
          "description": college.description,
          "url": `https://edulink.surajkhadka7.com.np/schools/${college.id}`,
          "image": college.image,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": college.location,
            "addressLocality": "Kathmandu",
            "addressCountry": "NP"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "NPR",
            "description": `Average Tuition: ${college.tuition}`
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
      <CollegesClient initialColleges={displayColleges} />
    </>
  );
}
