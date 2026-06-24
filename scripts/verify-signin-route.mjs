import fs from 'node:fs';

const headerPath = 'src/app/component/Header.js';
const navBarPath = 'src/app/component/NavBar.js';
const appShellPath = 'src/app/component/AppShell.js';
const layoutPath = 'src/app/layout.js';
const signinPath = 'src/app/signin/page.js';
const signupPath = 'src/app/signup/page.js';
const globalsPath = 'src/app/globals.css';

const failures = [];

if (!fs.existsSync(signinPath)) {
  failures.push(`${signinPath} does not exist`);
}

if (!fs.existsSync(signupPath)) {
  failures.push(`${signupPath} does not exist`);
}

const header = fs.existsSync(headerPath) ? fs.readFileSync(headerPath, 'utf8') : '';
const navBar = fs.existsSync(navBarPath) ? fs.readFileSync(navBarPath, 'utf8') : '';
const appShell = fs.existsSync(appShellPath) ? fs.readFileSync(appShellPath, 'utf8') : '';
const layout = fs.existsSync(layoutPath) ? fs.readFileSync(layoutPath, 'utf8') : '';
const signin = fs.existsSync(signinPath) ? fs.readFileSync(signinPath, 'utf8') : '';
const signup = fs.existsSync(signupPath) ? fs.readFileSync(signupPath, 'utf8') : '';
const globals = fs.existsSync(globalsPath) ? fs.readFileSync(globalsPath, 'utf8') : '';

const signinLinks = header.match(/href="\/signin"/g) || [];
if (signinLinks.length < 2) {
  failures.push(`expected at least 2 /signin links in Header.js, found ${signinLinks.length}`);
}

const signupLinks = header.match(/href="\/signup"/g) || [];
if (signupLinks.length < 2) {
  failures.push(`expected at least 2 /signup links in Header.js, found ${signupLinks.length}`);
}

if (!header.includes('isProfileOpen')) {
  failures.push('Header.js should manage a profile dropdown with isProfileOpen state');
}

if (!header.includes('profileRef')) {
  failures.push('Header.js should use profileRef so profile dropdown closes on outside click');
}

if (!header.includes('Sign up') || !header.includes('Create account')) {
  failures.push('profile menu should expose both Sign in and Sign up actions');
}

if (header.includes('href="/signin" \n                className="px-4 py-2 text-gray-700')) {
  failures.push('desktop Sign in must not remain as a standalone top-navbar link');
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

if (!header.includes('sticky top-0 z-[70]')) {
  failures.push('Header.js should stack above NavBar so the Profile dropdown is not hidden behind the More nav row');
}

if (!header.includes('absolute right-0 top-full z-[80]')) {
  failures.push('Profile dropdown should have a higher z-index than the header and navbar layers');
}

if (!navBar.includes('sticky top-0 z-40')) {
  failures.push('NavBar.js should sit below Header.js in the stacking order');
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

if (!appShell.includes("'/signin'") || !appShell.includes("'/signup'")) {
  failures.push('AppShell.js must define /signin and /signup as auth routes');
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

if (!signup.includes('Create your EduLink account')) {
  failures.push('signup page should include a clear create-account heading');
}

if (!signup.includes('autoComplete="name"') || !signup.includes('autoComplete="new-password"')) {
  failures.push('signup page should include name and new-password fields');
}

if (!signup.includes('href="/signin"')) {
  failures.push('signup page should link back to the signin page');
}

if (failures.length > 0) {
  console.error('Signin route verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Signin route verification passed.');
