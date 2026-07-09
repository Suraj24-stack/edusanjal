import NewsPage from './NewsClient';
import { featuredNews, recentNews } from '../data/newsData';

export const metadata = {
  title: "Latest Educational News & Notices in Nepal | EduLink",
  description: "Stay updated with the latest educational news, exam notices, result announcements, academic program updates, and university decisions in Nepal.",
  keywords: ["educational news nepal", "exam notices nepal", "tu exam results", "ku notices", "nepal education bill", "pabson protest"],
  alternates: {
    canonical: "/news"
  },
  openGraph: {
    title: "Latest Educational News & Notices in Nepal - EduLink",
    description: "Stay updated with the latest educational news, exam notices, result announcements, and academic updates in Nepal.",
    url: "https://edulink.surajkhadka7.com.np/news",
    type: "website"
  }
};

export default function Page() {
  const allNews = [...featuredNews, ...recentNews];

  // Generate JSON-LD Schema on the server
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://edulink.surajkhadka7.com.np/news/#webpage",
    "name": "Latest Educational News & Notices in Nepal",
    "url": "https://edulink.surajkhadka7.com.np/news",
    "description": "Latest educational articles, news, and official notices in Nepal.",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": allNews.length,
      "itemListElement": allNews.map((news, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "NewsArticle",
          "headline": news.title,
          "description": news.excerpt || news.summary,
          "datePublished": news.date ? new Date(news.date).toISOString().split('T')[0] : "2025-08-01",
          "author": {
            "@type": "Person",
            "name": news.author || "EduLink Journalist"
          },
          "publisher": {
            "@type": "Organization",
            "name": "EduLink",
            "logo": {
              "@type": "ImageObject",
              "url": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop"
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
      <NewsPage />
    </>
  );
}
