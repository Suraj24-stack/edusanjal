import { schoolsData } from './data/schoolsData';

export default async function sitemap() {
  const baseUrl = 'https://edusanjal.surajkhadka7.com.np';

  const routes = [
    '',
    '/schools',
    '/colleges',
    '/admissions',
    '/courses',
    '/degrees',
    '/news',
    '/vacancies',
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

  return [...routes, ...schoolUrls];
}
