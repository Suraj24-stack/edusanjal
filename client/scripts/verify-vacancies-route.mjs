import fs from 'node:fs';

const vacanciesPath = 'src/app/vacancies/page.js';
const navBarPath = 'src/app/component/NavBar.js';
const failures = [];

if (!fs.existsSync(vacanciesPath)) {
  failures.push(`${vacanciesPath} does not exist`);
}

if (!fs.existsSync(navBarPath)) {
  failures.push(`${navBarPath} does not exist`);
}

const vacanciesPage = fs.existsSync(vacanciesPath)
  ? fs.readFileSync(vacanciesPath, 'utf8')
  : '';
const navBar = fs.existsSync(navBarPath) ? fs.readFileSync(navBarPath, 'utf8') : '';

if (vacanciesPage.includes('const [isLoading, setIsLoading]')) {
  failures.push('Vacancies page should not gate static local vacancy data behind an isLoading state');
}

if (vacanciesPage.includes('setTimeout(() => setIsLoading(false)')) {
  failures.push('Vacancies page should not add an artificial timer before rendering vacancy content');
}

if (vacanciesPage.includes('if (isLoading)')) {
  failures.push('Vacancies page should render vacancy content immediately instead of returning a skeleton first');
}

if (!vacanciesPage.includes('vacanciesData')) {
  failures.push('Vacancies page should still render from the local vacanciesData collection');
}

if (!vacanciesPage.includes('filteredJobs.map')) {
  failures.push('Vacancies page should still render filtered vacancy cards');
}

if (vacanciesPage.includes("import JobApplicationModal from '../component/JobApplicationModal'")) {
  failures.push('Vacancies page should lazy-load JobApplicationModal instead of importing it into the initial route chunk');
}

if (!vacanciesPage.includes("dynamic(() => import('../component/JobApplicationModal')")) {
  failures.push('Vacancies page should use next/dynamic for the application modal');
}

if (!navBar.includes('useRouter')) {
  failures.push('NavBar should use useRouter to proactively prefetch the vacancies route');
}

if (!navBar.includes("router.prefetch('/vacancies')")) {
  failures.push('NavBar should prefetch /vacancies so clicking the public nav item displays faster');
}

if (!navBar.includes('onMouseEnter={prefetchVacancies}') || !navBar.includes('onFocus={prefetchVacancies}')) {
  failures.push('Vacancies nav link should prefetch on hover and keyboard focus');
}

if (!navBar.includes("item.href === '/vacancies'") || !navBar.includes('<a') || !navBar.includes('window.location.href = event.currentTarget.href')) {
  failures.push('Vacancies nav item should use a document navigation path to avoid the slow client-side route transition');
}

if (failures.length > 0) {
  console.error('Vacancies route verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Vacancies route verification passed.');
