import PostsPage from './PostsClient';
import { initialPosts } from '../data/postsData';

export const metadata = {
  title: "Community Posts, Notices & Q&A Board | EduLink",
  description: "Connect with the EduLink community. Find latest university notices, study group discussions, and academic Q&A in Nepal.",
  keywords: ["educational posts nepal", "university notices kathmandu", "entrance prep study groups", "student discussions nepal"],
  alternates: {
    canonical: "/posts"
  },
  openGraph: {
    title: "Community Posts, Notices & Q&A Board - EduLink",
    description: "Connect with the EduLink community. Find latest university notices, study group discussions, and academic Q&A in Nepal.",
    url: "https://edulink.surajkhadka7.com.np/posts",
    type: "website"
  }
};

export default function Page() {
  // Generate JSON-LD Schema on the server
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://edulink.surajkhadka7.com.np/posts/#webpage",
    "name": "Community Posts, Notices & Q&A Board in Nepal",
    "url": "https://edulink.surajkhadka7.com.np/posts",
    "description": "Connect with the EduLink community. Find latest university notices, study group discussions, and academic Q&A in Nepal.",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": initialPosts.length,
      "itemListElement": initialPosts.map((post, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "SocialMediaPosting",
          "headline": post.title,
          "articleBody": post.content,
          "datePublished": post.date ? new Date(post.date).toISOString().split('T')[0] : "2026-07-09",
          "author": {
            "@type": "Person",
            "name": post.author
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
      <PostsPage />
    </>
  );
}
