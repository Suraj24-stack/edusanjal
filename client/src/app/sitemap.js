import { schoolsData } from './data/schoolsData';
import { featuredBlogs, recentBlogs } from './data/blogsData';
import { BlogModel } from '../../../server/models/blogModel';

export default async function sitemap() {
  const baseUrl = 'https://edulink.surajkhadka7.com.np';

  const routes = [
    '',
    '/schools',
    '/colleges',
    '/admissions',
    '/courses',
    '/degrees',
    '/news',
    '/vacancies',
    '/blogs',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const schoolUrls = schoolsData.map((school) => ({
    url: `${baseUrl}/schools/${school.id}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  let blogs = [];
  try {
    blogs = await BlogModel.getAll();
  } catch (error) {
    console.error('Failed to load blogs for sitemap, falling back to static data:', error);
    blogs = [...featuredBlogs, ...recentBlogs];
  }

  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.id}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...routes, ...schoolUrls, ...blogUrls];
}

