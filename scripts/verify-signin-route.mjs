import fs from 'node:fs';

const headerPath = 'src/app/component/Header.js';
const signinPath = 'src/app/signin/page.js';

const failures = [];

if (!fs.existsSync(signinPath)) {
  failures.push(`${signinPath} does not exist`);
}

const header = fs.existsSync(headerPath) ? fs.readFileSync(headerPath, 'utf8') : '';

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

console.log('Signin route verification passed.');
