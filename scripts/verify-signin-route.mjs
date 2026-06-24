import fs from 'node:fs';

const headerPath = 'src/app/component/Header.js';
const appShellPath = 'src/app/component/AppShell.js';
const layoutPath = 'src/app/layout.js';
const signinPath = 'src/app/signin/page.js';
const globalsPath = 'src/app/globals.css';

const failures = [];

if (!fs.existsSync(signinPath)) {
  failures.push(`${signinPath} does not exist`);
}

const header = fs.existsSync(headerPath) ? fs.readFileSync(headerPath, 'utf8') : '';
const appShell = fs.existsSync(appShellPath) ? fs.readFileSync(appShellPath, 'utf8') : '';
const layout = fs.existsSync(layoutPath) ? fs.readFileSync(layoutPath, 'utf8') : '';
const signin = fs.existsSync(signinPath) ? fs.readFileSync(signinPath, 'utf8') : '';
const globals = fs.existsSync(globalsPath) ? fs.readFileSync(globalsPath, 'utf8') : '';

const signinLinks = header.match(/href="\/signin"/g) || [];
if (signinLinks.length < 3) {
  failures.push(`expected at least 3 /signin links in Header.js, found ${signinLinks.length}`);
}

if (header.includes('<button className="flex items-center space-x-2 p-2 text-gray-600')) {
  failures.push('desktop Profile action is still a button instead of a /signin link');
}

const myProfileIndex = header.indexOf('<span className="font-medium">My Profile</span>');
const myProfileOpeningTag = myProfileIndex >= 0
  ? header.slice(Math.max(0, myProfileIndex - 350), myProfileIndex)
  : '';

if (!myProfileOpeningTag.includes('<Link href="/signin"')) {
  failures.push('mobile My Profile action is still a button instead of a /signin link');
}

if (failures.length > 0) {
  console.error('Signin route verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

if (!fs.existsSync(appShellPath)) {
  failures.push(`${appShellPath} does not exist`);
}

if (!appShell.includes("const AUTH_ROUTES = ['/signin']")) {
  failures.push('AppShell.js must define /signin as an auth route');
}

if (!appShell.includes('usePathname')) {
  failures.push('AppShell.js must use usePathname to detect auth routes');
}

if (!appShell.includes('!isAuthRoute') || !appShell.includes('<Header />') || !appShell.includes('<Footer />')) {
  failures.push('AppShell.js must hide the public shell for auth routes');
}

if (layout.includes('import Header') || layout.includes('import NavBar') || layout.includes('import Footer')) {
  failures.push('layout.js should delegate route chrome to AppShell instead of importing public shell components directly');
}

if (!layout.includes('<AppShell>') || !layout.includes('</AppShell>')) {
  failures.push('layout.js must wrap children with AppShell');
}

if (!globals.includes('@layer base') || !globals.includes('@layer components')) {
  failures.push('globals.css should define base and component layers');
}

if (!globals.includes('.container-custom')) {
  failures.push('globals.css must define the shared container-custom utility used by public pages');
}

if (globals.includes('@theme inline')) {
  failures.push('globals.css should not contain Tailwind v4 @theme inline syntax in this Tailwind 3 project');
}

if (!signin.includes('Back to home') || !signin.includes('href="/"')) {
  failures.push('signin page should include a clear back-to-home link for the standalone auth layout');
}

if (!signin.includes('lg:grid-cols-[minmax(0,1fr)_440px]')) {
  failures.push('signin page should use the approved two-column auth layout on large screens');
}

if (failures.length > 0) {
  console.error('Signin route verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Signin route verification passed.');
