import EventsPage from './EventsClient';
import { featuredEvents, upcomingEvents } from '../data/eventsData';

export const metadata = {
  title: "Educational Events, Expos & Webinars in Nepal | EduLink",
  description: "Explore the latest educational events, college expos, scholarship webinars, open days, and exam preparation bootcamps in Nepal on EduLink.",
  keywords: ["educational events nepal", "college fair kathmandu", "scholarship webinars", "tu cmat strategy", "ielts masterclass", "stem bootcamp"],
  alternates: {
    canonical: "/events"
  },
  openGraph: {
    title: "Educational Events, Expos & Webinars in Nepal - EduLink",
    description: "Explore the latest educational events, college expos, scholarship webinars, open days, and exam preparation bootcamps in Nepal.",
    url: "https://edulink.surajkhadka7.com.np/events",
    type: "website"
  }
};

export default function Page() {
  const allEvents = [...featuredEvents, ...upcomingEvents];

  // Generate JSON-LD Schema on the server
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://edulink.surajkhadka7.com.np/events/#webpage",
    "name": "Educational Events, Expos & Webinars in Nepal",
    "url": "https://edulink.surajkhadka7.com.np/events",
    "description": "Latest educational expos, admission open days, scholarship webinars, and test prep workshops in Nepal.",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": allEvents.length,
      "itemListElement": allEvents.map((event, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "EducationEvent",
          "name": event.title,
          "description": event.excerpt,
          "startDate": "2026-08-15",
          "location": {
            "@type": "Place",
            "name": event.venue,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": event.location,
              "addressLocality": "Kathmandu",
              "addressCountry": "NP"
            }
          },
          "organizer": {
            "@type": "Organization",
            "name": event.host
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
      <EventsPage />
    </>
  );
}
