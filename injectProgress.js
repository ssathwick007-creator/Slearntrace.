const fs = require('fs');
const path = require('path');

// Quote-safe src dir
const srcDir = path.resolve('src');
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jsx'));

const SKIP = new Set(['DataStructuresHub.jsx', 'TopicOverviewCard.jsx', 'ProgressContext.jsx',
    'ArraysExplorer.jsx', 'LinkedListsExplorer.jsx', 'StacksExplorer.jsx',
    'QueuesExplorer.jsx', 'TreesExplorer.jsx', 'GraphsExplorer.jsx',
    'HashTablesExplorer.jsx', 'DFSMazeExplorer.jsx']);

const PROBLEMS_RE = /PracticeProblems/i;

let mCount = 0, pCount = 0, filesChanged = [];

files.forEach(file => {
    if (SKIP.has(file)) return;
    const filepath = path.join(srcDir, file);
    let content = fs.readFileSync(filepath, 'utf8');
    let changed = false;

    if (PROBLEMS_RE.test(file)) {
        // Practice problem files — mark on problem solved
        if (!content.includes('window.AppProgress') && content.includes('setIsAnimating(false)')) {
            content = content.replace(/setIsAnimating\(false\);/g, (m) => {
                return `setIsAnimating(false);\n        if (window.AppProgress) window.AppProgress.markProblemSolved();`;
            });
            changed = true; pCount++;
        }
    } else {
        // Metaphor/visualizer files — mark on animation done
        if (!content.includes('window.AppProgress') && content.includes('setIsAnimating(false)')) {
            // Use a unique ID per file
            const fileId = file.replace('.jsx', '');
            content = content.replace(/setIsAnimating\(false\);/g, (m) => {
                return `setIsAnimating(false);\n        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('${fileId}');`;
            });
            changed = true; mCount++;
        }
    }

    if (changed) {
        fs.writeFileSync(filepath, content);
        filesChanged.push(file);
    }
});

console.log(`\n✓ Injected window.AppProgress into ${mCount} metaphor files and ${pCount} practice problem files.`);
console.log(`Files changed (${filesChanged.length}):`, filesChanged.join(', '));
