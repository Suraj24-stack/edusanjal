import VideosPage from './VideosClient';
import { featuredVideos, recentVideos } from '../data/videosData';

export const metadata = {
  title: "Educational Videos, College Tours & Prep Guides | EduLink",
  description: "Watch educational tutorials, entrance exam prep tips, virtual college tours, and career guidance videos on EduLink.",
  keywords: ["educational videos nepal", "college tours kathmandu", "entrance preparation videos", "scholarship guides", "career advice nepal", "tu admission guidance"],
  alternates: {
    canonical: "/videos"
  },
  openGraph: {
    title: "Educational Videos, College Tours & Prep Guides - EduLink",
    description: "Watch educational tutorials, entrance exam prep tips, virtual college tours, and career guidance videos on EduLink.",
    url: "https://edulink.surajkhadka7.com.np/videos",
    type: "website"
  }
};

export default function Page() {
  const allVideos = [...featuredVideos, ...recentVideos];

  // Generate JSON-LD Schema on the server
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://edulink.surajkhadka7.com.np/videos/#webpage",
    "name": "Educational Videos, College Tours & Prep Guides in Nepal",
    "url": "https://edulink.surajkhadka7.com.np/videos",
    "description": "Watch educational tutorials, entrance exam prep tips, virtual college tours, and career guidance videos on EduLink.",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": allVideos.length,
      "itemListElement": allVideos.map((video, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "VideoObject",
          "name": video.title,
          "description": video.excerpt,
          "thumbnailUrl": video.thumbnail,
          "uploadDate": video.date ? new Date(video.date).toISOString().split('T')[0] : "2026-07-09",
          "duration": "PT" + video.duration.replace(':', 'M') + 'S',
          "embedUrl": `https://www.youtube.com/embed/${video.youtubeId}`,
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
      <VideosPage />
    </>
  );
}
