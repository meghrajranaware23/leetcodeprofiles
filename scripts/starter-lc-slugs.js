/** Canonical LeetCode URL slugs for LeetCode Starter Path */
export const STARTER_LC_SLUGS = {
  1: 'two-sum',
  9: 'palindrome-number',
  13: 'roman-to-integer',
  20: 'valid-parentheses',
  26: 'remove-duplicates-from-sorted-array',
  27: 'remove-element',
  35: 'search-insert-position',
  53: 'maximum-subarray',
  58: 'length-of-last-word',
  66: 'plus-one',
  67: 'add-binary',
  70: 'climbing-stairs',
  88: 'merge-sorted-array',
  121: 'best-time-to-buy-and-sell-stock',
  125: 'valid-palindrome',
  136: 'single-number',
  169: 'majority-element',
  217: 'contains-duplicate',
  242: 'valid-anagram',
  268: 'missing-number',
  283: 'move-zeroes',
  344: 'reverse-string',
  349: 'intersection-of-two-arrays',
  412: 'fizz-buzz',
  724: 'find-pivot-index',
  1108: 'defanging-an-ip-address',
  1470: 'shuffle-the-array',
  1480: 'running-sum-of-1d-array',
  1512: 'number-of-good-pairs',
  1672: 'richest-customer-wealth',
  1920: 'build-array-from-permutation',
};

export function lcUrl(lc) {
  const slug = STARTER_LC_SLUGS[lc];
  if (!slug) throw new Error(`Missing LC slug for #${lc}`);
  return `https://leetcode.com/problems/${slug}/`;
}
