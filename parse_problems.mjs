import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('src').filter(f => f.includes('PracticeProblems.jsx') || f.includes('Practice.jsx'));

let allProblems = [];

files.forEach(f => {
  const content = fs.readFileSync(path.join('src', f), 'utf8');
  // Find "const problems = ["
  const startIndex = content.indexOf('const problems = [');
  if (startIndex === -1) {
    console.log(`No problems array found in ${f}`);
    return;
  }
  
  // Find the end of the array. It ends before "const startAnimation" or "return ("
  let endIndex = content.indexOf('const startAnimation', startIndex);
  if (endIndex === -1) endIndex = content.indexOf('const [', startIndex + 20);
  if (endIndex === -1) endIndex = content.indexOf('return (', startIndex);
  
  if (endIndex !== -1) {
    let arrayStr = content.substring(startIndex + 'const problems = '.length, endIndex);
    // Find the last semicolon or bracket
    const lastBracket = arrayStr.lastIndexOf(']');
    arrayStr = arrayStr.substring(0, lastBracket + 1);
    
    try {
      // Evaluate the array string
      const problems = eval('(' + arrayStr + ')');
      problems.forEach(p => p.sourceFile = f);
      allProblems.push(...problems);
      console.log(`Successfully parsed ${problems.length} problems from ${f}`);
    } catch (e) {
      console.log(`Error parsing ${f}: ${e.message}`);
    }
  }
});

console.log(`Total extracted: ${allProblems.length}`);
