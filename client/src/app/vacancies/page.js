import VacanciesPage from './VacanciesClient';
import { vacanciesData } from '../data/vacanciesData';

export const metadata = {
  title: "Latest Jobs & Vacancies in Nepal 2026 - Apply Online | EduLink",
  description: "Find the latest jobs and career vacancies in Nepal for 2026. Explore full-time, part-time, and government job vacancies in IT, banking, teaching, engineering, and nursing.",
  keywords: ["jobs in nepal", "vacancies in nepal 2026", "government jobs nepal", "it jobs kathmandu", "teaching jobs nepal", "banking vacancies"],
  alternates: {
    canonical: "/vacancies"
  },
  openGraph: {
    title: "Latest Jobs & Vacancies in Nepal 2026 - EduLink",
    description: "Find the latest jobs and career vacancies in Nepal for 2026. Explore job openings in IT, banking, teaching, engineering, and nursing.",
    url: "https://edusanjal.surajkhadka7.com.np/vacancies",
    type: "website"
  }
};

export default function Page() {
  // Generate JSON-LD Schema on the server
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://edusanjal.surajkhadka7.com.np/vacancies/#webpage",
    "name": "Latest Jobs & Vacancies in Nepal 2026",
    "url": "https://edusanjal.surajkhadka7.com.np/vacancies",
    "description": "Comprehensive list of the latest job vacancies in Nepal across technology, banking, education, and healthcare sectors.",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": vacanciesData.length,
      "itemListElement": vacanciesData.map((job, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": job.title,
          "description": job.description + " Requirements: " + job.requirements.join(", "),
          "datePosted": job.postedDate,
          "validThrough": job.deadline,
          "employmentType": job.type === 'Full-time' ? 'FULL_TIME' : job.type === 'Part-time' ? 'PART_TIME' : 'CONTRACTOR',
          "hiringOrganization": {
            "@type": "Organization",
            "name": job.company,
            "logo": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": job.location.split(",")[0].trim(),
              "addressRegion": "Bagmati",
              "addressCountry": "NP"
            }
          },
          "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": "NPR",
            "value": {
              "@type": "QuantitativeValue",
              "value": job.salary,
              "unitText": "MONTH"
            }
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
      <VacanciesPage />
    </>
  );
}
