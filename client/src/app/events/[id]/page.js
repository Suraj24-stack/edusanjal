import EventDetailClient from './EventDetailClient';
import { featuredEvents, upcomingEvents } from '../../data/eventsData';

// Dynamically generate metadata for each event page
export async function generateMetadata({ params }) {
  const eventId = parseInt(params.id);
  const event = [...featuredEvents, ...upcomingEvents].find((e) => e.id === eventId);

  if (!event) {
    return {
      title: "Event Not Found | EduLink",
      description: "The requested educational event details could not be found."
    };
  }

  const title = `${event.title} | EduLink Events`;
  const description = event.excerpt || `Join the ${event.category} event: ${event.title} organized by ${event.host} at ${event.venue}.`;
  const canonicalUrl = `https://edulink.surajkhadka7.com.np/events/${eventId}`;

  return {
    title,
    description,
    keywords: [
      event.category,
      ...(event.tags || []),
      "educational events nepal",
      "college expo nepal",
      "webinars for students"
    ],
    alternates: {
      canonical: `/events/${eventId}`
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop",
          width: 800,
          height: 450,
          alt: event.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop"]
    }
  };
}

export default function Page({ params }) {
  const eventId = parseInt(params.id);
  const event = [...featuredEvents, ...upcomingEvents].find((e) => e.id === eventId);

  if (!event) {
    return <EventDetailClient />;
  }

  // Generate dynamic JSON-LD structured data for Event SEO
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    "@id": `https://edulink.surajkhadka7.com.np/events/${event.id}#event`,
    "name": event.title,
    "description": event.excerpt,
    "image": event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop",
    "url": `https://edulink.surajkhadka7.com.np/events/${event.id}`,
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
        "name": "Events",
        "item": "https://edulink.surajkhadka7.com.np/events"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": event.title,
        "item": `https://edulink.surajkhadka7.com.np/events/${event.id}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <EventDetailClient />
    </>
  );
}
