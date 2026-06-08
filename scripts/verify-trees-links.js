/**
 * Verify all LeetCode URLs in Trees Ascension curriculum
 */
import { DAYS, RANK_TESTS } from './trees-curriculum.js';
import { LC_SLUGS, lcUrl } from './trees-lc-slugs.js';
import { SOLUTIONS } from './trees-solutions.js';

async function checkUrl(slug) {
  const url = `https://leetcode.com/problems/${slug}/`;
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    return { slug, url, status: res.status, ok: res.ok };
  } catch (e) {
    return { slug, url, status: 0, ok: false, error: e.message };
  }
}

const problems = [];
for (const day of DAYS) {
  for (const q of day.quests) problems.push({ lc: q.lc, slug: q.slug, name: q.name });
}
for (const block of Object.values(RANK_TESTS)) {
  for (const t of block.tests) problems.push({ lc: t.lc, slug: t.slug || LC_SLUGS[t.lc], name: t.name });
}

const missingSlugs = problems.filter(p => !LC_SLUGS[p.lc]);
const missingSolutions = problems.filter(p => !SOLUTIONS[p.lc]);
const placeholderQuests = [];

console.log(`Missing slugs: ${missingSlugs.length}`);
missingSlugs.forEach(p => console.log(`  #${p.lc} ${p.name}`));

console.log(`\nMissing solutions: ${missingSolutions.length}`);
missingSolutions.forEach(p => console.log(`  #${p.lc} ${p.name}`));

console.log('\nVerifying canonical slugs via HTTP...');
const uniqueSlugs = [...new Set(Object.values(LC_SLUGS))];
const results = await Promise.all(uniqueSlugs.map(checkUrl));
const failed = results.filter(r => !r.ok);
console.log(`\nHTTP failures: ${failed.length}`);
failed.forEach(f => console.log(`  ${f.url} → ${f.status}`));

console.log(`\nTotal unique problems: ${uniqueSlugs.length}`);
console.log(`Total curriculum entries: ${problems.length}`);
