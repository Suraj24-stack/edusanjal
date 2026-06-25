import fs from 'node:fs';

const vacanciesPath = 'src/app/vacancies/page.js';
const failures = [];

if (!fs.existsSync(vacanciesPath)) {
  failures.push(`${vacanciesPath} does not exist`);
}

const vacanciesPage = fs.existsSync(vacanciesPath)
  ? fs.readFileSync(vacanciesPath, 'utf8')
  : '';

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

if (failures.length > 0) {
  console.error('Vacancies route verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Vacancies route verification passed.');
