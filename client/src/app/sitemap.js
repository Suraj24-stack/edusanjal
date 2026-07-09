import { schoolsData } from './data/schoolsData';
import { featuredBlogs, recentBlogs } from './data/blogsData';

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

  const blogUrls = [...featuredBlogs, ...recentBlogs].map((blog) => ({
    url: `${baseUrl}/blogs/${blog.id}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...routes, ...schoolUrls, ...blogUrls];
}
