import BlogDetailClient from './BlogDetailClient';
import { BlogModel } from '../../../../../server/models/blogModel';
import { featuredBlogs, recentBlogs } from '../../data/blogsData';

// Dynamically generate metadata for each blog article page
export async function generateMetadata({ params }) {
  const blogId = parseInt(params.id);
  let blog = null;
  try {
    blog = await BlogModel.getById(blogId);
  } catch (error) {
    console.error('Failed to load blog for metadata:', error);
  }

  if (!blog) {
    blog = [...featuredBlogs, ...recentBlogs].find((b) => b.id === blogId);
  }

  if (!blog) {
    return {
      title: "Article Not Found | EduLink",
      description: "The requested educational blog article could not be found."
    };
  }

  const title = `${blog.title} | EduLink Blogs`;
  const description = blog.excerpt || `Read the latest article about ${blog.category} on EduLink. Written by ${blog.author}.`;
  const canonicalUrl = `https://edulink.surajkhadka7.com.np/blogs/${blogId}`;

  return {
    title,
    description,
    keywords: [
      blog.category,
      ...(blog.tags || []),
      "educational blogs nepal",
      "student guides"
    ],
    alternates: {
      canonical: `/blogs/${blogId}`
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      publishedTime: blog.date ? new Date(blog.date).toISOString().split('T')[0] : "2026-07-09",
      authors: [blog.author],
      images: [
        {
          url: blog.image || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop",
          width: 800,
          height: 450,
          alt: blog.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [blog.image || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop"]
    }
  };
}

export default async function Page({ params }) {
  const blogId = parseInt(params.id);
  let blog = null;
  try {
    blog = await BlogModel.getById(blogId);
  } catch (error) {
    console.error('Failed to load blog for server page schema:', error);
  }

  if (!blog) {
    blog = [...featuredBlogs, ...recentBlogs].find((b) => b.id === blogId);
  }

  if (!blog) {
    return <BlogDetailClient />;
  }

  // Generate dynamic JSON-LD structured data for Blog Posting SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://edulink.surajkhadka7.com.np/blogs/${blog.id}#article`,
    "headline": blog.title,
    "description": blog.excerpt,
    "image": blog.image || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop",
    "url": `https://edulink.surajkhadka7.com.np/blogs/${blog.id}`,
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
  };

  // Generate Breadcrumbs JSON-LD for search engine hierarchies
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
        "name": "Blogs",
        "item": "https://edulink.surajkhadka7.com.np/blogs"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": `https://edulink.surajkhadka7.com.np/blogs/${blog.id}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogDetailClient />
    </>
  );
}
