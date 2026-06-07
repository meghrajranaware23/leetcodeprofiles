const fs = require('fs');
const path = require('path');

function escapeForTemplateLiteral(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

const basePath = __dirname;

const files = [
  {
    path: path.join(basePath, 'course', 'arrays-and-strings', '00-introduction.md'),
    id: 'introduction',
    title: 'Welcome to the Ascension',
    rank: 'null',
    rankLabel: 'START',
    type: 'intro',
    icon: '⚔️'
  },
  {
    path: path.join(basePath, 'course', 'arrays-and-strings', 'rank-e', 'day-01-array-fundamentals.md'),
    id: 'day-01',
    title: 'Array Fundamentals & Traversal Mastery',
    rank: "'E'",
    rankLabel: 'E-RANK',
    type: 'lesson',
    icon: '📋'
  },
  {
    path: path.join(basePath, 'course', 'arrays-and-strings', 'rank-e', 'day-02-string-fundamentals.md'),
    id: 'day-02',
    title: 'String Fundamentals & Manipulation',
    rank: "'E'",
    rankLabel: 'E-RANK',
    type: 'lesson',
    icon: '📋'
  },
  {
    path: path.join(basePath, 'course', 'arrays-and-strings', 'rank-e', 'day-03-frequency-counting.md'),
    id: 'day-03',
    title: 'Frequency Counting & Character Maps',
    rank: "'E'",
    rankLabel: 'E-RANK',
    type: 'lesson',
    icon: '📋'
  },
  {
    path: path.join(basePath, 'course', 'arrays-and-strings', 'rank-e', 'day-04-hash-maps.md'),
    id: 'day-04',
    title: 'Hash Maps \u2014 The Swiss Army Knife',
    rank: "'E'",
    rankLabel: 'E-RANK',
    type: 'lesson',
    icon: '📋'
  },
  {
    path: path.join(basePath, 'course', 'arrays-and-strings', 'rank-e', 'day-05-prefix-sums.md'),
    id: 'day-05',
    title: 'Prefix Sums \u2014 Unlocking Range Queries',
    rank: "'E'",
    rankLabel: 'E-RANK',
    type: 'lesson',
    icon: '📋'
  },
  {
    path: path.join(basePath, 'course', 'arrays-and-strings', 'rank-e', 'rank-e-test.md'),
    id: 'rank-e-test',
    title: 'E-Rank Test \u2014 Prove Your Foundation',
    rank: "'E'",
    rankLabel: 'E-RANK',
    type: 'test',
    icon: '⚔'
  },
  {
    path: path.join(basePath, 'course', 'arrays-and-strings', 'rank-e', 'rank-e-complete.md'),
    id: 'rank-e-complete',
    title: 'E-Rank Complete \u2014 Awakening Confirmed',
    rank: "'E'",
    rankLabel: 'E-RANK',
    type: 'complete',
    icon: '🏆'
  }
];

let output = '// Auto-generated course content module\n';
output += '// Generated: ' + new Date().toISOString() + '\n\n';
output += 'export const COURSE_LESSONS = [\n';

for (const f of files) {
  const raw = fs.readFileSync(f.path, 'utf-8');
  const escaped = escapeForTemplateLiteral(raw);
  output += '  {\n';
  output += '    id: ' + JSON.stringify(f.id) + ',\n';
  output += '    title: ' + JSON.stringify(f.title) + ',\n';
  output += '    rank: ' + f.rank + ',\n';
  output += '    rankLabel: ' + JSON.stringify(f.rankLabel) + ',\n';
  output += '    type: ' + JSON.stringify(f.type) + ',\n';
  output += '    locked: false,\n';
  output += '    icon: ' + JSON.stringify(f.icon) + ',\n';
  output += '    content: `' + escaped + '`\n';
  output += '  },\n';
}

// Locked placeholder entries
const locked = [
  // D-RANK
  { id: 'day-06', title: 'Two Pointers \u2014 Opposite Ends', rank: 'D', rankLabel: 'D-RANK', type: 'lesson' },
  { id: 'day-07', title: 'Two Pointers \u2014 Same Direction', rank: 'D', rankLabel: 'D-RANK', type: 'lesson' },
  { id: 'day-08', title: 'Fast & Slow Pointers', rank: 'D', rankLabel: 'D-RANK', type: 'lesson' },
  { id: 'day-09', title: 'Fixed-Size Sliding Window', rank: 'D', rankLabel: 'D-RANK', type: 'lesson' },
  { id: 'day-10', title: 'Variable-Size Sliding Window', rank: 'D', rankLabel: 'D-RANK', type: 'lesson' },
  { id: 'rank-d-test', title: 'D-Rank Test', rank: 'D', rankLabel: 'D-RANK', type: 'test' },
  // C-RANK
  { id: 'day-11', title: 'Sliding Window + Hash Map Combos', rank: 'C', rankLabel: 'C-RANK', type: 'lesson' },
  { id: 'day-12', title: 'Monotonic Stack Thinking', rank: 'C', rankLabel: 'C-RANK', type: 'lesson' },
  { id: 'day-13', title: 'Monotonic Queue & Deque Patterns', rank: 'C', rankLabel: 'C-RANK', type: 'lesson' },
  { id: 'day-14', title: 'Sorting-Based Array Patterns', rank: 'C', rankLabel: 'C-RANK', type: 'lesson' },
  { id: 'day-15', title: 'Interval Problems', rank: 'C', rankLabel: 'C-RANK', type: 'lesson' },
  { id: 'day-16', title: 'Greedy Array Patterns', rank: 'C', rankLabel: 'C-RANK', type: 'lesson' },
  { id: 'rank-c-test', title: 'C-Rank Test', rank: 'C', rankLabel: 'C-RANK', type: 'test' },
  // B-RANK
  { id: 'day-17', title: 'Matrix Traversal \u2014 Row, Column, Diagonal', rank: 'B', rankLabel: 'B-RANK', type: 'lesson' },
  { id: 'day-18', title: 'Spiral & Rotational Matrix Patterns', rank: 'B', rankLabel: 'B-RANK', type: 'lesson' },
  { id: 'day-19', title: '2D Prefix Sums & Submatrix Queries', rank: 'B', rankLabel: 'B-RANK', type: 'lesson' },
  { id: 'day-20', title: 'Simulation Problems', rank: 'B', rankLabel: 'B-RANK', type: 'lesson' },
  { id: 'day-21', title: 'Advanced String Patterns \u2014 KMP & Z-Function', rank: 'B', rankLabel: 'B-RANK', type: 'lesson' },
  { id: 'day-22', title: 'String Hashing & Rabin-Karp', rank: 'B', rankLabel: 'B-RANK', type: 'lesson' },
  { id: 'rank-b-test', title: 'B-Rank Test', rank: 'B', rankLabel: 'B-RANK', type: 'test' },
  // A-RANK
  { id: 'day-23', title: 'The Pattern Recognition Meta-Lesson', rank: 'A', rankLabel: 'A-RANK', type: 'lesson' },
  { id: 'day-24', title: 'Interview Tricks & Edge Case Mastery', rank: 'A', rankLabel: 'A-RANK', type: 'lesson' },
  { id: 'day-25', title: 'Multi-Pattern Combination Problems', rank: 'A', rankLabel: 'A-RANK', type: 'lesson' },
  { id: 'day-26', title: 'Contest Speed Techniques', rank: 'A', rankLabel: 'A-RANK', type: 'lesson' },
  { id: 'day-27', title: 'Mock Interview Simulation', rank: 'A', rankLabel: 'A-RANK', type: 'lesson' },
  { id: 'rank-a-test', title: 'A-Rank Test', rank: 'A', rankLabel: 'A-RANK', type: 'test' },
  // S-RANK
  { id: 'day-28', title: 'S-Rank Array Challenge', rank: 'S', rankLabel: 'S-RANK', type: 'lesson' },
  { id: 'day-29', title: 'S-Rank String Challenge', rank: 'S', rankLabel: 'S-RANK', type: 'lesson' },
  { id: 'day-30', title: 'The Final Ascension', rank: 'S', rankLabel: 'S-RANK', type: 'lesson' },
  { id: 'rank-s-test', title: 'S-Rank Final Test', rank: 'S', rankLabel: 'S-RANK', type: 'test' },
];

for (const l of locked) {
  output += '  { ';
  output += 'id: ' + JSON.stringify(l.id) + ', ';
  output += 'title: ' + JSON.stringify(l.title) + ', ';
  output += 'rank: ' + JSON.stringify(l.rank) + ', ';
  output += 'rankLabel: ' + JSON.stringify(l.rankLabel) + ', ';
  output += 'type: ' + JSON.stringify(l.type) + ', ';
  output += "locked: true, icon: '\uD83D\uDD12', content: '' ";
  output += '},\n';
}

output += '];\n';

const outPath = path.join(basePath, 'course-content.js');
fs.writeFileSync(outPath, output, 'utf-8');

// Validate syntax
try {
  new Function(output.replace(/^export /, ''));
  console.log('Syntax validation PASSED');
} catch (e) {
  console.log('Syntax validation FAILED:', e.message);
}

console.log('Done! File written to:', outPath);
console.log('File size:', fs.statSync(outPath).size, 'bytes');
