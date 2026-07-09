import AdmissionsClient from './AdmissionsClient';
import { admissionsData } from '../data/schoolsData';

export const metadata = {
  title: "College Admissions Open in Nepal 2026 - Deadlines, Requirements & Fees",
  description: "Explore the latest college admissions open in Nepal for 2026. View admission deadlines, requirements, entrance exam info, and fee structures for BBA, BBS, BIT, +2, and UK degrees.",
  keywords: ["college admission nepal", "admission open 2026 nepal", "tu admissions", "ku admissions", "bachelors admission nepal", "plus two admission"],
  alternates: {
    canonical: "/admissions"
  },
  openGraph: {
    title: "College Admissions Open in Nepal 2026 - EduLink",
    description: "Explore the latest college admissions open in Nepal for 2026. View admission deadlines, requirements, entrance exam info, and fee structures.",
    url: "https://edulink.surajkhadka7.com.np/admissions",
    type: "website"
  }
};

export default function Page() {
  // Generate JSON-LD Schema on the server
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://edulink.surajkhadka7.com.np/admissions/#webpage",
    "name": "College Admissions Open in Nepal 2026",
    "url": "https://edulink.surajkhadka7.com.np/admissions",
    "description": "Latest admissions open in top colleges and universities across Nepal.",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": admissionsData.length,
      "itemListElement": admissionsData.map((admission, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Event",
          "name": `${admission.institution} Admissions Open (${admission.level})`,
          "description": admission.description,
          "startDate": (admission.startDate && !isNaN(Date.parse(admission.startDate))) ? new Date(admission.startDate).toISOString().split('T')[0] : "2026-01-01",
          "endDate": (admission.deadline && admission.deadline.toLowerCase() !== "rolling" && !isNaN(Date.parse(admission.deadline))) ? new Date(admission.deadline).toISOString().split('T')[0] : "2026-12-31",
          "eventStatus": "https://schema.org/EventScheduled",
          "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
          "location": {
            "@type": "Place",
            "name": admission.institution,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": admission.location,
              "addressLocality": "Kathmandu",
              "addressCountry": "NP"
            }
          },
          "organizer": {
            "@type": "EducationalOrganization",
            "name": admission.institution,
            "url": `https://edulink.surajkhadka7.com.np/schools/${admission.schoolId}`
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
      <AdmissionsClient />
    </>
  );
}
