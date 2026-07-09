import SchoolDetailClient from './SchoolDetailClient';
import { schoolsData, admissionsData } from '../../data/schoolsData';

// Dynamically generate metadata for each school/college page
export async function generateMetadata({ params }) {
  const schoolId = parseInt(params.id);
  const school = schoolsData.find((s) => s.id === schoolId);

  if (!school) {
    return {
      title: "Institution Not Found | EduLink",
      description: "The requested school or college could not be found."
    };
  }

  const title = `${school.name} - Admission, Courses, Fees & Rankings | EduLink`;
  const description = `Get details about ${school.name} located in ${school.location}. Established in ${school.established}, explore programs, average tuition (${school.tuition}), acceptance rate, and student directory on EduLink.`;
  const canonicalUrl = `https://edusanjal.surajkhadka7.com.np/schools/${schoolId}`;

  return {
    title,
    description,
    keywords: [
      school.name,
      `${school.name} location`,
      `${school.name} courses`,
      `${school.name} fees`,
      `${school.name} admission 2026`,
      school.location,
      "colleges in Nepal"
    ],
    alternates: {
      canonical: `/schools/${schoolId}`
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: school.image,
          width: 800,
          height: 600,
          alt: school.name
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [school.image]
    }
  };
}

export default function Page({ params }) {
  const schoolId = parseInt(params.id);
  const school = schoolsData.find((s) => s.id === schoolId);
  const activeAdmission = admissionsData.find((a) => a.schoolId === schoolId);

  if (!school) {
    return <SchoolDetailClient />;
  }

  const schoolType = school.showInCollegeList ? "CollegeOrUniversity" : "School";
  const parentRoute = school.showInCollegeList ? "colleges" : "schools";
  const parentLabel = school.showInCollegeList ? "Colleges" : "Schools";

  // Generate dynamic JSON-LD structured data for Entity SEO
  const institutionSchema = {
    "@context": "https://schema.org",
    "@type": schoolType,
    "@id": `https://edusanjal.surajkhadka7.com.np/schools/${school.id}#institution`,
    "name": school.name,
    "description": school.description,
    "image": school.image,
    "url": `https://edusanjal.surajkhadka7.com.np/schools/${school.id}`,
    "establishedDate": school.established.toString(),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": school.location,
      "addressLocality": "Kathmandu",
      "addressCountry": "NP"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "NPR",
      "description": `Tuition fee structure: ${school.tuition}`
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Academic Programs",
      "itemListElement": school.programs.map((program, idx) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": program,
          "description": `${program} program offered at ${school.name}.`
        }
      }))
    }
  };

  // Generate Breadcrumbs JSON-LD for Search Engine optimization
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://edusanjal.surajkhadka7.com.np"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": parentLabel,
        "item": `https://edusanjal.surajkhadka7.com.np/${parentRoute}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": school.name,
        "item": `https://edusanjal.surajkhadka7.com.np/schools/${school.id}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(institutionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SchoolDetailClient />
    </>
  );
}
