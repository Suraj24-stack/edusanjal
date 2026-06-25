import fs from 'node:fs';

const files = {
  tailwind: 'tailwind.config.js',
  globals: 'src/app/globals.css',
  signin: 'src/app/signin/page.js',
  signup: 'src/app/signup/page.js',
};

const failures = [];

const read = (path) => (fs.existsSync(path) ? fs.readFileSync(path, 'utf8') : '');

for (const [name, path] of Object.entries(files)) {
  if (!fs.existsSync(path)) {
    failures.push(`${name} file is missing at ${path}`);
  }
}

const tailwind = read(files.tailwind);
const globals = read(files.globals);
const signin = read(files.signin);
const signup = read(files.signup);

if (!tailwind.includes("'./src/**/*.{js,ts,jsx,tsx,mdx}'")) {
  failures.push('tailwind.config.js must scan src/app so auth page utilities are generated');
}

for (const directive of ['@tailwind base;', '@tailwind components;', '@tailwind utilities;']) {
  if (!globals.includes(directive)) {
    failures.push(`globals.css is missing ${directive}`);
  }
}

const requiredAuthClasses = [
  'min-h-screen overflow-hidden bg-[#0B3C5D] text-white',
  'bg-[radial-gradient(circle_at_top_left,rgba(242,169,0,0.26),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.14),transparent_30%)]',
  'lg:grid-cols-[minmax(0,1fr)_440px]',
  'rounded-2xl border border-white/15 bg-white',
  'focus:ring-[#F2A900]/20',
];

for (const [pageName, source] of [['signin', signin], ['signup', signup]]) {
  if (!source.includes(`data-auth-page="${pageName}"`)) {
    failures.push(`${pageName} page should expose data-auth-page="${pageName}" for UI smoke checks`);
  }

  if (!source.includes('data-auth-card')) {
    failures.push(`${pageName} page should expose data-auth-card on the white form panel`);
  }

  if (!source.includes('data-auth-form')) {
    failures.push(`${pageName} page should expose data-auth-form on the auth form`);
  }

  for (const className of requiredAuthClasses) {
    if (!source.includes(className)) {
      failures.push(`${pageName} page is missing required auth layout class: ${className}`);
    }
  }
}

if (failures.length > 0) {
  console.error('Auth UI CSS verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Auth UI CSS verification passed.');
