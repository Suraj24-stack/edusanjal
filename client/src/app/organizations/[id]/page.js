import OrganizationDetailClient from './OrganizationDetailClient';
import { organizationsData } from '../../data/organizationsData';

// Dynamically generate metadata for each organization page
export async function generateMetadata({ params }) {
  const orgId = parseInt(params.id);
  const org = organizationsData.find((o) => o.id === orgId);

  if (!org) {
    return {
      title: "Organization Not Found | EduLink",
      description: "The requested organization details could not be found."
    };
  }

  const title = `${org.name} - Profile & Services | EduLink`;
  const description = org.description || `Read detailed profile, services, and official contact information for ${org.name} in Nepal.`;
  const canonicalUrl = `https://edulink.surajkhadka7.com.np/organizations/${orgId}`;

  return {
    title,
    description,
    keywords: [
      org.name,
      org.shortName,
      org.category,
      "educational organizations nepal",
      "nepal education directory"
    ],
    alternates: {
      canonical: `/organizations/${orgId}`
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: org.image || "https://images.unsplash.com/photo-1541829019-259276a7f85c?w=800&h=450&fit=crop",
          width: 800,
          height: 450,
          alt: org.name
        }
      ]
    }
  };
}

export default function Page({ params }) {
  const orgId = parseInt(params.id);
  const org = organizationsData.find((o) => o.id === orgId);

  if (!org) {
    return <OrganizationDetailClient />;
  }

  // Generate dynamic JSON-LD structured data for SEO
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": org.type === "University" ? "EducationalOrganization" : "Organization",
    "@id": `https://edulink.surajkhadka7.com.np/organizations/${org.id}#org`,
    "name": org.name,
    "alternateName": org.shortName,
    "description": org.description,
    "image": org.image || "https://images.unsplash.com/photo-1541829019-259276a7f85c?w=800&h=450&fit=crop",
    "url": `https://edulink.surajkhadka7.com.np/organizations/${org.id}`,
    "telephone": org.phone,
    "email": org.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": org.location,
      "addressCountry": "NP"
    }
  };

  // Generate Breadcrumbs JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://edulink.surajkhadka7.com.np"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Organizations",
        "item": "https://edulink.surajkhadka7.com.np/organizations"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": org.shortName,
        "item": `https://edulink.surajkhadka7.com.np/organizations/${org.id}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <OrganizationDetailClient />
    </>
  );
}
