import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('src').filter(f => f.includes('PracticeProblems.jsx') || f.includes('Practice.jsx'));
let totalProblems = 0;
files.forEach(f => {
  const content = fs.readFileSync(path.join('src', f), 'utf8');
  // Simple regex to extract title
  const matches = [...content.matchAll(/title:\s*["']([^"']+)["']/g)];
  console.log(f, matches.length);
  totalProblems += matches.length;
});
console.log('Total problems found:', totalProblems);
