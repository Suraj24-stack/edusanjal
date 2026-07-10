import OrganizationsClient from './OrganizationsClient';
import { organizationsData } from '../data/organizationsData';

export const metadata = {
  title: "Educational Organizations & Administrative Bodies in Nepal | EduLink",
  description: "Explore ministries, universities, board departments, and international counseling organizations supporting education in Nepal.",
  keywords: ["educational organizations nepal", "universities in nepal", "counseling bodies", "ministry of education nepal", "USEF nepal", "British Council"],
  alternates: {
    canonical: "/organizations"
  },
  openGraph: {
    title: "Educational Organizations & Administrative Bodies in Nepal - EduLink",
    description: "Explore ministries, universities, board departments, and international counseling organizations supporting education in Nepal.",
    url: "https://edulink.surajkhadka7.com.np/organizations",
    type: "website"
  }
};

export default function Page() {
  // Generate JSON-LD Schema on the server
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://edulink.surajkhadka7.com.np/organizations/#webpage",
    "name": "Educational & Counseling Organizations in Nepal",
    "url": "https://edulink.surajkhadka7.com.np/organizations",
    "description": "Directory of ministries, universities, boarding organizations, and testing counselors in Nepal.",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": organizationsData.length,
      "itemListElement": organizationsData.map((org, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": org.type === "University" ? "EducationalOrganization" : "Organization",
          "name": org.name,
          "description": org.description,
          "url": `https://edulink.surajkhadka7.com.np/organizations/${org.id}`,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": org.location,
            "addressCountry": "NP"
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
      <OrganizationsClient />
    </>
  );
}
