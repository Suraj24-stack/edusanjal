import BlogsPage from './BlogsClient';
import { featuredBlogs, recentBlogs } from '../data/blogsData';

export const metadata = {
  title: "Educational Blogs, Study Tips & Guides | EduLink",
  description: "Discover helpful articles, university prep recommendations, entrance exam guidelines, and career opportunities for students in Nepal on EduLink.",
  keywords: ["educational blogs nepal", "study tips", "entrance prep", "scholarship guides", "career guidance nepal", "campus life kathmandu"],
  alternates: {
    canonical: "/blogs"
  },
  openGraph: {
    title: "Educational Blogs, Study Tips & Guides - EduLink",
    description: "Discover helpful articles, study tips, entrance exam guidelines, and career opportunities for students in Nepal.",
    url: "https://edulink.surajkhadka7.com.np/blogs",
    type: "website"
  }
};

export default function Page() {
  const allBlogs = [...featuredBlogs, ...recentBlogs];

  // Generate JSON-LD Schema on the server
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://edulink.surajkhadka7.com.np/blogs/#webpage",
    "name": "Educational Blogs, Study Tips & Guides in Nepal",
    "url": "https://edulink.surajkhadka7.com.np/blogs",
    "description": "Educational blogs, study tips, entrance exam guidelines, and career opportunities in Nepal.",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": allBlogs.length,
      "itemListElement": allBlogs.map((blog, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "BlogPosting",
          "headline": blog.title,
          "description": blog.excerpt || blog.summary,
          "datePublished": blog.date ? new Date(blog.date).toISOString().split('T')[0] : "2026-07-09",
          "author": {
            "@type": "Person",
            "name": blog.author || "EduLink Blogger"
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
      <BlogsPage />
    </>
  );
}
