import fs from 'fs';
import path from 'path';
import * as babel from '@babel/core';

const files = fs.readdirSync('src').filter(f => f.includes('PracticeProblems.jsx') || f.includes('Practice.jsx'));

let allProblems = [];

files.forEach(f => {
  const content = fs.readFileSync(path.join('src', f), 'utf8');
  
  // Try to find the problems array string using Babel to parse AST
  try {
      const ast = babel.parseSync(content, {
          filename: f,
          presets: ['@babel/preset-react', '@babel/preset-env']
      });
      
      let found = false;
      babel.traverse(ast, {
          VariableDeclarator(p) {
              if (p.node.id.name === 'problems' || p.node.id.name === 'graphProblems') {
                  const { code } = babel.transformFromAstSync(
                      babel.types.file(babel.types.program([babel.types.expressionStatement(p.node.init)])),
                      content,
                      { presets: ['@babel/preset-env'] }
                  );
                  // Evaluatable string
                  const toEval = code.replace('"use strict";', '').trim().replace(/;$/, '');
                  try {
                      const arr = eval(`(${toEval})`);
                      if (Array.isArray(arr)) {
                          arr.forEach(a => a._sourceFile = f);
                          allProblems.push(...arr);
                          found = true;
                      }
                  } catch (e) {
                      console.error(`Eval failed for ${f}:`, e.message);
                  }
              }
          }
      });
      if (!found) console.log(`No 'problems' array found in ${f}`);
      else console.log(`Parsed ${f}`);
  } catch(e) {
      console.error(`Babel parse failed for ${f}:`, e.message);
  }
});

fs.writeFileSync('extracted_problems.json', JSON.stringify(allProblems, null, 2));
console.log(`Saved ${allProblems.length} problems to extracted_problems.json`);
