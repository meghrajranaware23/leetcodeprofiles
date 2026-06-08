// ══════════════════════════════════════════════════════════
//  COURSE CONTENT — Arrays & Strings Ascension
//  Micro-lesson architecture: E-Rank (25) + D-Rank (24) + C-Rank (28) + B-Rank (28) + A-Rank (24) + S-Rank (16)
//  Topics aligned to approved 30-day progression plan
//  Uses Vite ?raw imports for clean markdown embedding
// ══════════════════════════════════════════════════════════

import welcomeContent from './course/micro/00-welcome.md?raw';
import d1_1_content from './course/micro/01-1-array-mental-model.md?raw';
import d1_2_content from './course/micro/01-2-quest-move-zeroes.md?raw';
import d1_3_content from './course/micro/01-3-quest-remove-duplicates.md?raw';
import d1_4_content from './course/micro/01-4-checkpoint.md?raw';
import d2_1_content from './course/micro/02-1-strings-as-arrays.md?raw';
import d2_2_content from './course/micro/02-2-quest-valid-palindrome.md?raw';
import d2_3_content from './course/micro/02-3-quest-reverse-string.md?raw';
import d2_4_content from './course/micro/02-4-checkpoint.md?raw';
import d3_1_content from './course/micro/03-1-frequency-pattern.md?raw';
import d3_2_content from './course/micro/03-2-quest-valid-anagram.md?raw';
import d3_3_content from './course/micro/03-3-quest-first-unique.md?raw';
import d3_4_content from './course/micro/03-4-checkpoint.md?raw';
import d4_1_content from './course/micro/04-1-hashmap-patterns.md?raw';
import d4_2_content from './course/micro/04-2-quest-two-sum.md?raw';
import d4_3_content from './course/micro/04-3-quest-contains-duplicate.md?raw';
import d4_4_content from './course/micro/04-4-checkpoint.md?raw';
import d5_1_content from './course/micro/05-1-prefix-sum-pattern.md?raw';
import d5_2_content from './course/micro/05-2-quest-range-sum.md?raw';
import d5_3_content from './course/micro/05-3-quest-pivot-index.md?raw';
import d5_4_content from './course/micro/05-4-checkpoint.md?raw';
import test1_content from './course/micro/test-1-majority-element.md?raw';
import test2_content from './course/micro/test-2-intersection-arrays.md?raw';
import test3_content from './course/micro/test-3-product-except-self.md?raw';
import completeContent from './course/micro/rank-e-complete.md?raw';
import d6_1_content from './course/micro/06-1-converging-two-pointers.md?raw';
import d6_2_content from './course/micro/06-2-quest-two-sum-ii.md?raw';
import d6_3_content from './course/micro/06-3-quest-container-water.md?raw';
import d6_4_content from './course/micro/06-4-checkpoint.md?raw';
import d7_1_content from './course/micro/07-1-multi-pointer.md?raw';
import d7_2_content from './course/micro/07-2-quest-three-sum.md?raw';
import d7_3_content from './course/micro/07-3-quest-sort-colors.md?raw';
import d7_4_content from './course/micro/07-4-checkpoint.md?raw';
import d8_1_content from './course/micro/08-1-fast-slow-pointers.md?raw';
import d8_2_content from './course/micro/08-2-quest-happy-number.md?raw';
import d8_3_content from './course/micro/08-3-quest-find-duplicate.md?raw';
import d8_4_content from './course/micro/08-4-checkpoint.md?raw';
import d9_1_content from './course/micro/09-1-fixed-sliding-window.md?raw';
import d9_2_content from './course/micro/09-2-quest-max-average.md?raw';
import d9_3_content from './course/micro/09-3-quest-max-ones-iii.md?raw';
import d9_4_content from './course/micro/09-4-checkpoint.md?raw';
import d10_1_content from './course/micro/10-1-variable-sliding-window.md?raw';
import d10_2_content from './course/micro/10-2-quest-min-subarray-sum.md?raw';
import d10_3_content from './course/micro/10-3-quest-longest-substring.md?raw';
import d10_4_content from './course/micro/10-4-checkpoint.md?raw';
import dTest1_content from './course/micro/d-test-1-three-sum-closest.md?raw';
import dTest2_content from './course/micro/d-test-2-permutation-in-string.md?raw';
import dTest3_content from './course/micro/d-test-3-boats-save-people.md?raw';
import dCompleteContent from './course/micro/rank-d-complete.md?raw';
import c11_1_content from './course/micro/11-1-sliding-window-hashmap.md?raw';
import c11_2_content from './course/micro/11-2-quest-find-all-anagrams.md?raw';
import c11_3_content from './course/micro/11-3-quest-longest-k-distinct.md?raw';
import c11_4_content from './course/micro/11-4-checkpoint.md?raw';
import c12_1_content from './course/micro/12-1-kadanes-algorithm.md?raw';
import c12_2_content from './course/micro/12-2-quest-max-subarray.md?raw';
import c12_3_content from './course/micro/12-3-quest-max-product-subarray.md?raw';
import c12_4_content from './course/micro/12-4-checkpoint.md?raw';
import c13_1_content from './course/micro/13-1-difference-arrays.md?raw';
import c13_2_content from './course/micro/13-2-quest-flight-bookings.md?raw';
import c13_3_content from './course/micro/13-3-quest-car-pooling.md?raw';
import c13_4_content from './course/micro/13-4-checkpoint.md?raw';
import c14_1_content from './course/micro/14-1-sorting-as-strategy.md?raw';
import c14_2_content from './course/micro/14-2-quest-merge-intervals.md?raw';
import c14_3_content from './course/micro/14-3-quest-non-overlapping.md?raw';
import c14_4_content from './course/micro/14-4-checkpoint.md?raw';
import c15_1_content from './course/micro/15-1-interval-patterns.md?raw';
import c15_2_content from './course/micro/15-2-quest-insert-interval.md?raw';
import c15_3_content from './course/micro/15-3-quest-meeting-rooms-ii.md?raw';
import c15_4_content from './course/micro/15-4-checkpoint.md?raw';
import c16_1_content from './course/micro/16-1-greedy-on-arrays.md?raw';
import c16_2_content from './course/micro/16-2-quest-jump-game.md?raw';
import c16_3_content from './course/micro/16-3-quest-gas-station.md?raw';
import c16_4_content from './course/micro/16-4-checkpoint.md?raw';
import cTest1_content from './course/micro/c-test-1-max-circular-subarray.md?raw';
import cTest2_content from './course/micro/c-test-2-partition-labels.md?raw';
import cTest3_content from './course/micro/c-test-3-min-window-substring.md?raw';
import cCompleteContent from './course/micro/rank-c-complete.md?raw';
import b17_1_content from './course/micro/17-1-monotonic-stack.md?raw';
import b17_2_content from './course/micro/17-2-quest-daily-temperatures.md?raw';
import b17_3_content from './course/micro/17-3-quest-next-greater-ii.md?raw';
import b17_4_content from './course/micro/17-4-checkpoint.md?raw';
import b18_1_content from './course/micro/18-1-advanced-monotonic-stack.md?raw';
import b18_2_content from './course/micro/18-2-quest-largest-rectangle.md?raw';
import b18_3_content from './course/micro/18-3-quest-trapping-rain-water.md?raw';
import b18_4_content from './course/micro/18-4-checkpoint.md?raw';
import b19_1_content from './course/micro/19-1-matrix-traversal.md?raw';
import b19_2_content from './course/micro/19-2-quest-spiral-matrix.md?raw';
import b19_3_content from './course/micro/19-3-quest-rotate-image.md?raw';
import b19_4_content from './course/micro/19-4-checkpoint.md?raw';
import b20_1_content from './course/micro/20-1-2d-prefix-sums.md?raw';
import b20_2_content from './course/micro/20-2-quest-range-sum-2d.md?raw';
import b20_3_content from './course/micro/20-3-quest-submatrices-target.md?raw';
import b20_4_content from './course/micro/20-4-checkpoint.md?raw';
import b21_1_content from './course/micro/21-1-hash-key-design.md?raw';
import b21_2_content from './course/micro/21-2-quest-group-anagrams.md?raw';
import b21_3_content from './course/micro/21-3-quest-group-shifted-strings.md?raw';
import b21_4_content from './course/micro/21-4-checkpoint.md?raw';
import b22_1_content from './course/micro/22-1-advanced-sweep-line.md?raw';
import b22_2_content from './course/micro/22-2-quest-my-calendar.md?raw';
import b22_3_content from './course/micro/22-3-quest-skyline-problem.md?raw';
import b22_4_content from './course/micro/22-4-checkpoint.md?raw';
import bTest1_content from './course/micro/b-test-1-maximal-rectangle.md?raw';
import bTest2_content from './course/micro/b-test-2-sum-subarray-mins.md?raw';
import bTest3_content from './course/micro/b-test-3-diagonal-traverse-ii.md?raw';
import bCompleteContent from './course/micro/rank-b-complete.md?raw';
import a23_1_content from './course/micro/23-1-rabin-karp.md?raw';
import a23_2_content from './course/micro/23-2-quest-repeated-dna.md?raw';
import a23_3_content from './course/micro/23-3-quest-longest-duplicate.md?raw';
import a23_4_content from './course/micro/23-4-checkpoint.md?raw';
import a24_1_content from './course/micro/24-1-kmp-algorithm.md?raw';
import a24_2_content from './course/micro/24-2-quest-strstr.md?raw';
import a24_3_content from './course/micro/24-3-quest-shortest-palindrome.md?raw';
import a24_4_content from './course/micro/24-4-checkpoint.md?raw';
import a25_1_content from './course/micro/25-1-multi-constraint-windows.md?raw';
import a25_2_content from './course/micro/25-2-quest-concat-words.md?raw';
import a25_3_content from './course/micro/25-3-quest-k-different.md?raw';
import a25_4_content from './course/micro/25-4-checkpoint.md?raw';
import a26_1_content from './course/micro/26-1-greedy-strings.md?raw';
import a26_2_content from './course/micro/26-2-quest-remove-k-digits.md?raw';
import a26_3_content from './course/micro/26-3-quest-remove-dup-letters.md?raw';
import a26_4_content from './course/micro/26-4-checkpoint.md?raw';
import a27_1_content from './course/micro/27-1-bitmask-strings.md?raw';
import a27_2_content from './course/micro/27-2-quest-single-number.md?raw';
import a27_3_content from './course/micro/27-3-quest-max-product-lengths.md?raw';
import a27_4_content from './course/micro/27-4-checkpoint.md?raw';
import aTest1_content from './course/micro/a-test-1-longest-palindromic.md?raw';
import aTest2_content from './course/micro/a-test-2-first-missing-positive.md?raw';
import aTest3_content from './course/micro/a-test-3-text-justification.md?raw';
import aCompleteContent from './course/micro/rank-a-complete.md?raw';
import s28_1_content from './course/micro/28-1-array-synthesis.md?raw';
import s28_2_content from './course/micro/28-2-quest-sliding-window-max.md?raw';
import s28_3_content from './course/micro/28-3-quest-shortest-subarray-k.md?raw';
import s28_4_content from './course/micro/28-4-checkpoint.md?raw';
import s29_1_content from './course/micro/29-1-string-synthesis.md?raw';
import s29_2_content from './course/micro/29-2-quest-longest-repeating.md?raw';
import s29_3_content from './course/micro/29-3-quest-unique-chars-substrings.md?raw';
import s29_4_content from './course/micro/29-4-checkpoint.md?raw';
import s30_1_content from './course/micro/30-1-final-ascension.md?raw';
import s30_2_content from './course/micro/30-2-quest-fixed-bounds.md?raw';
import s30_3_content from './course/micro/30-3-quest-max-value-equation.md?raw';
import s30_4_content from './course/micro/30-4-checkpoint.md?raw';
import sTest1_content from './course/micro/s-test-1-132-pattern.md?raw';
import sTest2_content from './course/micro/s-test-2-create-max-number.md?raw';
import sTest3_content from './course/micro/s-test-3-max-score-subarray.md?raw';
import sCompleteContent from './course/micro/rank-s-complete.md?raw';

// ── Lesson data with metadata ──
export const COURSE_LESSONS = [
  // ═══ INTRODUCTION ═══
  {
    id: 'welcome',
    title: 'Welcome to the Ascension',
    rank: 'intro',
    day: 0,
    dayTitle: '',
    type: 'intro',
    icon: '⚔️',
    xp: 0,
    content: welcomeContent,
  },

  // ═══ E-RANK: DAY 1 — Array Traversal ═══
  {
    id: '1-1',
    title: 'The Array Mental Model',
    rank: 'e',
    day: 1,
    dayTitle: 'Array Traversal',
    type: 'concept',
    icon: '📝',
    xp: 10,
    content: d1_1_content,
  },
  {
    id: '1-2',
    title: 'Quest: Move Zeroes',
    rank: 'e',
    day: 1,
    dayTitle: 'Array Traversal',
    type: 'quest',
    icon: '⚔',
    xp: 10,
    content: d1_2_content,
  },
  {
    id: '1-3',
    title: 'Quest: Remove Duplicates',
    rank: 'e',
    day: 1,
    dayTitle: 'Array Traversal',
    type: 'quest',
    icon: '⚔',
    xp: 10,
    content: d1_3_content,
  },
  {
    id: '1-4',
    title: 'Checkpoint & Practice',
    rank: 'e',
    day: 1,
    dayTitle: 'Array Traversal',
    type: 'checkpoint',
    icon: '✅',
    xp: 10,
    content: d1_4_content,
  },

  // ═══ E-RANK: DAY 2 — String Manipulation ═══
  {
    id: '2-1',
    title: 'Strings as Character Arrays',
    rank: 'e',
    day: 2,
    dayTitle: 'String Manipulation',
    type: 'concept',
    icon: '📝',
    xp: 10,
    content: d2_1_content,
  },
  {
    id: '2-2',
    title: 'Quest: Valid Palindrome',
    rank: 'e',
    day: 2,
    dayTitle: 'String Manipulation',
    type: 'quest',
    icon: '⚔',
    xp: 10,
    content: d2_2_content,
  },
  {
    id: '2-3',
    title: 'Quest: Reverse String',
    rank: 'e',
    day: 2,
    dayTitle: 'String Manipulation',
    type: 'quest',
    icon: '⚔',
    xp: 10,
    content: d2_3_content,
  },
  {
    id: '2-4',
    title: 'Checkpoint & Practice',
    rank: 'e',
    day: 2,
    dayTitle: 'String Manipulation',
    type: 'checkpoint',
    icon: '✅',
    xp: 10,
    content: d2_4_content,
  },

  // ═══ E-RANK: DAY 3 — Frequency Counting ═══
  {
    id: '3-1',
    title: 'The Frequency Pattern',
    rank: 'e',
    day: 3,
    dayTitle: 'Frequency Counting',
    type: 'concept',
    icon: '📝',
    xp: 10,
    content: d3_1_content,
  },
  {
    id: '3-2',
    title: 'Quest: Valid Anagram',
    rank: 'e',
    day: 3,
    dayTitle: 'Frequency Counting',
    type: 'quest',
    icon: '⚔',
    xp: 15,
    content: d3_2_content,
  },
  {
    id: '3-3',
    title: 'Quest: First Unique Char',
    rank: 'e',
    day: 3,
    dayTitle: 'Frequency Counting',
    type: 'quest',
    icon: '⚔',
    xp: 15,
    content: d3_3_content,
  },
  {
    id: '3-4',
    title: 'Checkpoint & Practice',
    rank: 'e',
    day: 3,
    dayTitle: 'Frequency Counting',
    type: 'checkpoint',
    icon: '✅',
    xp: 10,
    content: d3_4_content,
  },

  // ═══ E-RANK: DAY 4 — Hash Maps ═══
  {
    id: '4-1',
    title: 'Hash Map Core Patterns',
    rank: 'e',
    day: 4,
    dayTitle: 'Hash Maps',
    type: 'concept',
    icon: '📝',
    xp: 10,
    content: d4_1_content,
  },
  {
    id: '4-2',
    title: 'Quest: Two Sum',
    rank: 'e',
    day: 4,
    dayTitle: 'Hash Maps',
    type: 'quest',
    icon: '⚔',
    xp: 15,
    content: d4_2_content,
  },
  {
    id: '4-3',
    title: 'Quest: Contains Duplicate',
    rank: 'e',
    day: 4,
    dayTitle: 'Hash Maps',
    type: 'quest',
    icon: '⚔',
    xp: 10,
    content: d4_3_content,
  },
  {
    id: '4-4',
    title: 'Checkpoint & Practice',
    rank: 'e',
    day: 4,
    dayTitle: 'Hash Maps',
    type: 'checkpoint',
    icon: '✅',
    xp: 10,
    content: d4_4_content,
  },

  // ═══ E-RANK: DAY 5 — Prefix Sums ═══
  {
    id: '5-1',
    title: 'The Prefix Sum Pattern',
    rank: 'e',
    day: 5,
    dayTitle: 'Prefix Sums',
    type: 'concept',
    icon: '📝',
    xp: 10,
    content: d5_1_content,
  },
  {
    id: '5-2',
    title: 'Quest: Range Sum Query',
    rank: 'e',
    day: 5,
    dayTitle: 'Prefix Sums',
    type: 'quest',
    icon: '⚔',
    xp: 15,
    content: d5_2_content,
  },
  {
    id: '5-3',
    title: 'Quest: Find Pivot Index',
    rank: 'e',
    day: 5,
    dayTitle: 'Prefix Sums',
    type: 'quest',
    icon: '⚔',
    xp: 10,
    content: d5_3_content,
  },
  {
    id: '5-4',
    title: 'Checkpoint & Practice',
    rank: 'e',
    day: 5,
    dayTitle: 'Prefix Sums',
    type: 'checkpoint',
    icon: '✅',
    xp: 10,
    content: d5_4_content,
  },

  // ═══ E-RANK TEST ═══
  {
    id: 'test-1',
    title: 'Test: Majority Element',
    rank: 'e',
    day: 6,
    dayTitle: 'E-Rank Test',
    type: 'test',
    icon: '⚔',
    xp: 100,
    content: test1_content,
  },
  {
    id: 'test-2',
    title: 'Test: Intersection of Arrays',
    rank: 'e',
    day: 6,
    dayTitle: 'E-Rank Test',
    type: 'test',
    icon: '⚔',
    xp: 100,
    content: test2_content,
  },
  {
    id: 'test-3',
    title: 'Test: Product Except Self',
    rank: 'e',
    day: 6,
    dayTitle: 'E-Rank Test',
    type: 'test',
    icon: '⚔',
    xp: 100,
    content: test3_content,
  },

  // ═══ E-RANK COMPLETE ═══
  {
    id: 'rank-e-complete',
    title: 'E-Rank Complete',
    rank: 'e',
    day: 7,
    dayTitle: 'Rank Up!',
    type: 'complete',
    icon: '🏆',
    xp: 0,
    content: completeContent,
  },

  // ═══ D-RANK: DAY 6 — Opposite-End Two Pointers ═══
  {
    id: '6-1',
    title: 'Converging Two Pointers',
    rank: 'd',
    day: 6,
    dayTitle: 'Opposite-End Two Pointers',
    type: 'concept',
    icon: '📝',
    xp: 10,
    content: d6_1_content,
  },
  {
    id: '6-2',
    title: 'Quest: Two Sum II',
    rank: 'd',
    day: 6,
    dayTitle: 'Opposite-End Two Pointers',
    type: 'quest',
    icon: '⚔',
    xp: 15,
    content: d6_2_content,
  },
  {
    id: '6-3',
    title: 'Quest: Container With Most Water',
    rank: 'd',
    day: 6,
    dayTitle: 'Opposite-End Two Pointers',
    type: 'quest',
    icon: '⚔',
    xp: 20,
    content: d6_3_content,
  },
  {
    id: '6-4',
    title: 'Checkpoint & Practice',
    rank: 'd',
    day: 6,
    dayTitle: 'Opposite-End Two Pointers',
    type: 'checkpoint',
    icon: '✅',
    xp: 10,
    content: d6_4_content,
  },

  // ═══ D-RANK: DAY 7 — Multi-Pointer Techniques ═══
  {
    id: '7-1',
    title: 'Multi-Pointer Techniques',
    rank: 'd',
    day: 7,
    dayTitle: 'Multi-Pointer Techniques',
    type: 'concept',
    icon: '📝',
    xp: 10,
    content: d7_1_content,
  },
  {
    id: '7-2',
    title: 'Quest: 3Sum',
    rank: 'd',
    day: 7,
    dayTitle: 'Multi-Pointer Techniques',
    type: 'quest',
    icon: '⚔',
    xp: 15,
    content: d7_2_content,
  },
  {
    id: '7-3',
    title: 'Quest: Sort Colors',
    rank: 'd',
    day: 7,
    dayTitle: 'Multi-Pointer Techniques',
    type: 'quest',
    icon: '⚔',
    xp: 20,
    content: d7_3_content,
  },
  {
    id: '7-4',
    title: 'Checkpoint & Practice',
    rank: 'd',
    day: 7,
    dayTitle: 'Multi-Pointer Techniques',
    type: 'checkpoint',
    icon: '✅',
    xp: 10,
    content: d7_4_content,
  },

  // ═══ D-RANK: DAY 8 — Fast & Slow Pointers ═══
  {
    id: '8-1',
    title: 'Fast & Slow Pointers',
    rank: 'd',
    day: 8,
    dayTitle: 'Fast & Slow Pointers',
    type: 'concept',
    icon: '📝',
    xp: 10,
    content: d8_1_content,
  },
  {
    id: '8-2',
    title: 'Quest: Happy Number',
    rank: 'd',
    day: 8,
    dayTitle: 'Fast & Slow Pointers',
    type: 'quest',
    icon: '⚔',
    xp: 15,
    content: d8_2_content,
  },
  {
    id: '8-3',
    title: 'Quest: Find the Duplicate Number',
    rank: 'd',
    day: 8,
    dayTitle: 'Fast & Slow Pointers',
    type: 'quest',
    icon: '⚔',
    xp: 20,
    content: d8_3_content,
  },
  {
    id: '8-4',
    title: 'Checkpoint & Practice',
    rank: 'd',
    day: 8,
    dayTitle: 'Fast & Slow Pointers',
    type: 'checkpoint',
    icon: '✅',
    xp: 10,
    content: d8_4_content,
  },

  // ═══ D-RANK: DAY 9 — Fixed-Size Sliding Window ═══
  {
    id: '9-1',
    title: 'Fixed-Size Sliding Window',
    rank: 'd',
    day: 9,
    dayTitle: 'Fixed-Size Sliding Window',
    type: 'concept',
    icon: '📝',
    xp: 10,
    content: d9_1_content,
  },
  {
    id: '9-2',
    title: 'Quest: Max Average Subarray I',
    rank: 'd',
    day: 9,
    dayTitle: 'Fixed-Size Sliding Window',
    type: 'quest',
    icon: '⚔',
    xp: 15,
    content: d9_2_content,
  },
  {
    id: '9-3',
    title: 'Quest: Max Consecutive Ones III',
    rank: 'd',
    day: 9,
    dayTitle: 'Fixed-Size Sliding Window',
    type: 'quest',
    icon: '⚔',
    xp: 20,
    content: d9_3_content,
  },
  {
    id: '9-4',
    title: 'Checkpoint & Practice',
    rank: 'd',
    day: 9,
    dayTitle: 'Fixed-Size Sliding Window',
    type: 'checkpoint',
    icon: '✅',
    xp: 10,
    content: d9_4_content,
  },

  // ═══ D-RANK: DAY 10 — Variable-Size Sliding Window ═══
  {
    id: '10-1',
    title: 'Variable-Size Sliding Window',
    rank: 'd',
    day: 10,
    dayTitle: 'Variable-Size Sliding Window',
    type: 'concept',
    icon: '📝',
    xp: 10,
    content: d10_1_content,
  },
  {
    id: '10-2',
    title: 'Quest: Minimum Size Subarray Sum',
    rank: 'd',
    day: 10,
    dayTitle: 'Variable-Size Sliding Window',
    type: 'quest',
    icon: '⚔',
    xp: 15,
    content: d10_2_content,
  },
  {
    id: '10-3',
    title: 'Quest: Longest Substring Without Repeating',
    rank: 'd',
    day: 10,
    dayTitle: 'Variable-Size Sliding Window',
    type: 'quest',
    icon: '⚔',
    xp: 20,
    content: d10_3_content,
  },
  {
    id: '10-4',
    title: 'Checkpoint & Practice',
    rank: 'd',
    day: 10,
    dayTitle: 'Variable-Size Sliding Window',
    type: 'checkpoint',
    icon: '✅',
    xp: 10,
    content: d10_4_content,
  },

  // ═══ D-RANK TEST ═══
  {
    id: 'd-test-1',
    title: 'Test: 3Sum Closest',
    rank: 'd',
    day: 11,
    dayTitle: 'D-Rank Test',
    type: 'test',
    icon: '⚔',
    xp: 100,
    content: dTest1_content,
  },
  {
    id: 'd-test-2',
    title: 'Test: Permutation in String',
    rank: 'd',
    day: 11,
    dayTitle: 'D-Rank Test',
    type: 'test',
    icon: '⚔',
    xp: 100,
    content: dTest2_content,
  },
  {
    id: 'd-test-3',
    title: 'Test: Boats to Save People',
    rank: 'd',
    day: 11,
    dayTitle: 'D-Rank Test',
    type: 'test',
    icon: '⚔',
    xp: 100,
    content: dTest3_content,
  },

  // ═══ D-RANK COMPLETE ═══
  {
    id: 'rank-d-complete',
    title: 'D-Rank Complete',
    rank: 'd',
    day: 12,
    dayTitle: 'Rank Up!',
    type: 'complete',
    icon: '🏆',
    xp: 0,
    content: dCompleteContent,
  },

  // ═══ C-RANK: DAY 11 — Sliding Window + Hash Map ═══
  {
    id: '11-1',
    title: 'Sliding Window + Hash Map',
    rank: 'c',
    day: 11,
    dayTitle: 'Sliding Window + Hash Map',
    type: 'concept',
    icon: '📝',
    xp: 15,
    content: c11_1_content,
  },
  {
    id: '11-2',
    title: 'Quest: Find All Anagrams',
    rank: 'c',
    day: 11,
    dayTitle: 'Sliding Window + Hash Map',
    type: 'quest',
    icon: '⚔',
    xp: 20,
    content: c11_2_content,
  },
  {
    id: '11-3',
    title: 'Quest: Longest K Distinct',
    rank: 'c',
    day: 11,
    dayTitle: 'Sliding Window + Hash Map',
    type: 'quest',
    icon: '⚔',
    xp: 25,
    content: c11_3_content,
  },
  {
    id: '11-4',
    title: 'Checkpoint & Practice',
    rank: 'c',
    day: 11,
    dayTitle: 'Sliding Window + Hash Map',
    type: 'checkpoint',
    icon: '✅',
    xp: 15,
    content: c11_4_content,
  },

  // ═══ C-RANK: DAY 12 — Kadane's Algorithm ═══
  {
    id: '12-1',
    title: "Kadane's Algorithm",
    rank: 'c',
    day: 12,
    dayTitle: "Kadane's Algorithm",
    type: 'concept',
    icon: '📝',
    xp: 15,
    content: c12_1_content,
  },
  {
    id: '12-2',
    title: 'Quest: Maximum Subarray',
    rank: 'c',
    day: 12,
    dayTitle: "Kadane's Algorithm",
    type: 'quest',
    icon: '⚔',
    xp: 20,
    content: c12_2_content,
  },
  {
    id: '12-3',
    title: 'Quest: Maximum Product Subarray',
    rank: 'c',
    day: 12,
    dayTitle: "Kadane's Algorithm",
    type: 'quest',
    icon: '⚔',
    xp: 25,
    content: c12_3_content,
  },
  {
    id: '12-4',
    title: 'Checkpoint & Practice',
    rank: 'c',
    day: 12,
    dayTitle: "Kadane's Algorithm",
    type: 'checkpoint',
    icon: '✅',
    xp: 15,
    content: c12_4_content,
  },

  // ═══ C-RANK: DAY 13 — Difference Arrays ═══
  {
    id: '13-1',
    title: 'Difference Arrays',
    rank: 'c',
    day: 13,
    dayTitle: 'Difference Arrays',
    type: 'concept',
    icon: '📝',
    xp: 15,
    content: c13_1_content,
  },
  {
    id: '13-2',
    title: 'Quest: Corporate Flight Bookings',
    rank: 'c',
    day: 13,
    dayTitle: 'Difference Arrays',
    type: 'quest',
    icon: '⚔',
    xp: 20,
    content: c13_2_content,
  },
  {
    id: '13-3',
    title: 'Quest: Car Pooling',
    rank: 'c',
    day: 13,
    dayTitle: 'Difference Arrays',
    type: 'quest',
    icon: '⚔',
    xp: 25,
    content: c13_3_content,
  },
  {
    id: '13-4',
    title: 'Checkpoint & Practice',
    rank: 'c',
    day: 13,
    dayTitle: 'Difference Arrays',
    type: 'checkpoint',
    icon: '✅',
    xp: 15,
    content: c13_4_content,
  },

  // ═══ C-RANK: DAY 14 — Sorting as Strategy ═══
  {
    id: '14-1',
    title: 'Sorting as Strategy',
    rank: 'c',
    day: 14,
    dayTitle: 'Sorting as Strategy',
    type: 'concept',
    icon: '📝',
    xp: 15,
    content: c14_1_content,
  },
  {
    id: '14-2',
    title: 'Quest: Merge Intervals',
    rank: 'c',
    day: 14,
    dayTitle: 'Sorting as Strategy',
    type: 'quest',
    icon: '⚔',
    xp: 20,
    content: c14_2_content,
  },
  {
    id: '14-3',
    title: 'Quest: Non-Overlapping Intervals',
    rank: 'c',
    day: 14,
    dayTitle: 'Sorting as Strategy',
    type: 'quest',
    icon: '⚔',
    xp: 25,
    content: c14_3_content,
  },
  {
    id: '14-4',
    title: 'Checkpoint & Practice',
    rank: 'c',
    day: 14,
    dayTitle: 'Sorting as Strategy',
    type: 'checkpoint',
    icon: '✅',
    xp: 15,
    content: c14_4_content,
  },

  // ═══ C-RANK: DAY 15 — Interval Patterns ═══
  {
    id: '15-1',
    title: 'Interval Patterns',
    rank: 'c',
    day: 15,
    dayTitle: 'Interval Patterns',
    type: 'concept',
    icon: '📝',
    xp: 15,
    content: c15_1_content,
  },
  {
    id: '15-2',
    title: 'Quest: Insert Interval',
    rank: 'c',
    day: 15,
    dayTitle: 'Interval Patterns',
    type: 'quest',
    icon: '⚔',
    xp: 20,
    content: c15_2_content,
  },
  {
    id: '15-3',
    title: 'Quest: Meeting Rooms II',
    rank: 'c',
    day: 15,
    dayTitle: 'Interval Patterns',
    type: 'quest',
    icon: '⚔',
    xp: 25,
    content: c15_3_content,
  },
  {
    id: '15-4',
    title: 'Checkpoint & Practice',
    rank: 'c',
    day: 15,
    dayTitle: 'Interval Patterns',
    type: 'checkpoint',
    icon: '✅',
    xp: 15,
    content: c15_4_content,
  },

  // ═══ C-RANK: DAY 16 — Greedy on Arrays ═══
  {
    id: '16-1',
    title: 'Greedy on Arrays',
    rank: 'c',
    day: 16,
    dayTitle: 'Greedy on Arrays',
    type: 'concept',
    icon: '📝',
    xp: 15,
    content: c16_1_content,
  },
  {
    id: '16-2',
    title: 'Quest: Jump Game',
    rank: 'c',
    day: 16,
    dayTitle: 'Greedy on Arrays',
    type: 'quest',
    icon: '⚔',
    xp: 20,
    content: c16_2_content,
  },
  {
    id: '16-3',
    title: 'Quest: Gas Station',
    rank: 'c',
    day: 16,
    dayTitle: 'Greedy on Arrays',
    type: 'quest',
    icon: '⚔',
    xp: 25,
    content: c16_3_content,
  },
  {
    id: '16-4',
    title: 'Checkpoint & Practice',
    rank: 'c',
    day: 16,
    dayTitle: 'Greedy on Arrays',
    type: 'checkpoint',
    icon: '✅',
    xp: 15,
    content: c16_4_content,
  },

  // ═══ C-RANK TEST ═══
  {
    id: 'c-test-1',
    title: 'Test: Max Circular Subarray',
    rank: 'c',
    day: 17,
    dayTitle: 'C-Rank Test',
    type: 'test',
    icon: '⚔',
    xp: 150,
    content: cTest1_content,
  },
  {
    id: 'c-test-2',
    title: 'Test: Partition Labels',
    rank: 'c',
    day: 17,
    dayTitle: 'C-Rank Test',
    type: 'test',
    icon: '⚔',
    xp: 150,
    content: cTest2_content,
  },
  {
    id: 'c-test-3',
    title: 'Test: Minimum Window Substring',
    rank: 'c',
    day: 17,
    dayTitle: 'C-Rank Test',
    type: 'test',
    icon: '⚔',
    xp: 150,
    content: cTest3_content,
  },

  // ═══ C-RANK COMPLETE ═══
  {
    id: 'rank-c-complete',
    title: 'C-Rank Complete',
    rank: 'c',
    day: 18,
    dayTitle: 'Rank Up!',
    type: 'complete',
    icon: '🏆',
    xp: 0,
    content: cCompleteContent,
  },

  // ═══ B-RANK: DAY 17 — Monotonic Stack Fundamentals ═══
  {
    id: '17-1',
    title: 'Monotonic Stack',
    rank: 'b',
    day: 17,
    dayTitle: 'Monotonic Stack Fundamentals',
    type: 'concept',
    icon: '📝',
    xp: 25,
    content: b17_1_content,
  },
  {
    id: '17-2',
    title: 'Quest: Daily Temperatures',
    rank: 'b',
    day: 17,
    dayTitle: 'Monotonic Stack Fundamentals',
    type: 'quest',
    icon: '⚔',
    xp: 35,
    content: b17_2_content,
  },
  {
    id: '17-3',
    title: 'Quest: Next Greater Element II',
    rank: 'b',
    day: 17,
    dayTitle: 'Monotonic Stack Fundamentals',
    type: 'quest',
    icon: '⚔',
    xp: 45,
    content: b17_3_content,
  },
  {
    id: '17-4',
    title: 'Checkpoint & Practice',
    rank: 'b',
    day: 17,
    dayTitle: 'Monotonic Stack Fundamentals',
    type: 'checkpoint',
    icon: '✅',
    xp: 25,
    content: b17_4_content,
  },

  // ═══ B-RANK: DAY 18 — Advanced Monotonic Stack ═══
  {
    id: '18-1',
    title: 'Advanced Monotonic Stack',
    rank: 'b',
    day: 18,
    dayTitle: 'Advanced Monotonic Stack',
    type: 'concept',
    icon: '📝',
    xp: 25,
    content: b18_1_content,
  },
  {
    id: '18-2',
    title: 'Quest: Largest Rectangle in Histogram',
    rank: 'b',
    day: 18,
    dayTitle: 'Advanced Monotonic Stack',
    type: 'quest',
    icon: '⚔',
    xp: 35,
    content: b18_2_content,
  },
  {
    id: '18-3',
    title: 'Quest: Trapping Rain Water',
    rank: 'b',
    day: 18,
    dayTitle: 'Advanced Monotonic Stack',
    type: 'quest',
    icon: '⚔',
    xp: 45,
    content: b18_3_content,
  },
  {
    id: '18-4',
    title: 'Checkpoint & Practice',
    rank: 'b',
    day: 18,
    dayTitle: 'Advanced Monotonic Stack',
    type: 'checkpoint',
    icon: '✅',
    xp: 25,
    content: b18_4_content,
  },

  // ═══ B-RANK: DAY 19 — Matrix Traversal ═══
  {
    id: '19-1',
    title: 'Matrix Traversal Patterns',
    rank: 'b',
    day: 19,
    dayTitle: 'Matrix Traversal Patterns',
    type: 'concept',
    icon: '📝',
    xp: 25,
    content: b19_1_content,
  },
  {
    id: '19-2',
    title: 'Quest: Spiral Matrix',
    rank: 'b',
    day: 19,
    dayTitle: 'Matrix Traversal Patterns',
    type: 'quest',
    icon: '⚔',
    xp: 35,
    content: b19_2_content,
  },
  {
    id: '19-3',
    title: 'Quest: Rotate Image',
    rank: 'b',
    day: 19,
    dayTitle: 'Matrix Traversal Patterns',
    type: 'quest',
    icon: '⚔',
    xp: 45,
    content: b19_3_content,
  },
  {
    id: '19-4',
    title: 'Checkpoint & Practice',
    rank: 'b',
    day: 19,
    dayTitle: 'Matrix Traversal Patterns',
    type: 'checkpoint',
    icon: '✅',
    xp: 25,
    content: b19_4_content,
  },

  // ═══ B-RANK: DAY 20 — 2D Prefix Sums ═══
  {
    id: '20-1',
    title: '2D Prefix Sums',
    rank: 'b',
    day: 20,
    dayTitle: '2D Prefix Sums',
    type: 'concept',
    icon: '📝',
    xp: 25,
    content: b20_1_content,
  },
  {
    id: '20-2',
    title: 'Quest: Range Sum Query 2D',
    rank: 'b',
    day: 20,
    dayTitle: '2D Prefix Sums',
    type: 'quest',
    icon: '⚔',
    xp: 35,
    content: b20_2_content,
  },
  {
    id: '20-3',
    title: 'Quest: Submatrices Sum to Target',
    rank: 'b',
    day: 20,
    dayTitle: '2D Prefix Sums',
    type: 'quest',
    icon: '⚔',
    xp: 45,
    content: b20_3_content,
  },
  {
    id: '20-4',
    title: 'Checkpoint & Practice',
    rank: 'b',
    day: 20,
    dayTitle: '2D Prefix Sums',
    type: 'checkpoint',
    icon: '✅',
    xp: 25,
    content: b20_4_content,
  },

  // ═══ B-RANK: DAY 21 — Hash Key Design ═══
  {
    id: '21-1',
    title: 'Hash Key Design',
    rank: 'b',
    day: 21,
    dayTitle: 'Hash Key Design',
    type: 'concept',
    icon: '📝',
    xp: 25,
    content: b21_1_content,
  },
  {
    id: '21-2',
    title: 'Quest: Group Anagrams',
    rank: 'b',
    day: 21,
    dayTitle: 'Hash Key Design',
    type: 'quest',
    icon: '⚔',
    xp: 35,
    content: b21_2_content,
  },
  {
    id: '21-3',
    title: 'Quest: Group Shifted Strings',
    rank: 'b',
    day: 21,
    dayTitle: 'Hash Key Design',
    type: 'quest',
    icon: '⚔',
    xp: 45,
    content: b21_3_content,
  },
  {
    id: '21-4',
    title: 'Checkpoint & Practice',
    rank: 'b',
    day: 21,
    dayTitle: 'Hash Key Design',
    type: 'checkpoint',
    icon: '✅',
    xp: 25,
    content: b21_4_content,
  },

  // ═══ B-RANK: DAY 22 — Advanced Sweep Line ═══
  {
    id: '22-1',
    title: 'Advanced Sweep Line',
    rank: 'b',
    day: 22,
    dayTitle: 'Advanced Sweep Line',
    type: 'concept',
    icon: '📝',
    xp: 25,
    content: b22_1_content,
  },
  {
    id: '22-2',
    title: 'Quest: My Calendar I',
    rank: 'b',
    day: 22,
    dayTitle: 'Advanced Sweep Line',
    type: 'quest',
    icon: '⚔',
    xp: 35,
    content: b22_2_content,
  },
  {
    id: '22-3',
    title: 'Quest: The Skyline Problem',
    rank: 'b',
    day: 22,
    dayTitle: 'Advanced Sweep Line',
    type: 'quest',
    icon: '⚔',
    xp: 45,
    content: b22_3_content,
  },
  {
    id: '22-4',
    title: 'Checkpoint & Practice',
    rank: 'b',
    day: 22,
    dayTitle: 'Advanced Sweep Line',
    type: 'checkpoint',
    icon: '✅',
    xp: 25,
    content: b22_4_content,
  },

  // ═══ B-RANK TEST ═══
  {
    id: 'b-test-1',
    title: 'Test: Maximal Rectangle',
    rank: 'b',
    day: 23,
    dayTitle: 'B-Rank Test',
    type: 'test',
    icon: '⚔',
    xp: 200,
    content: bTest1_content,
  },
  {
    id: 'b-test-2',
    title: 'Test: Sum of Subarray Minimums',
    rank: 'b',
    day: 23,
    dayTitle: 'B-Rank Test',
    type: 'test',
    icon: '⚔',
    xp: 200,
    content: bTest2_content,
  },
  {
    id: 'b-test-3',
    title: 'Test: Diagonal Traverse II',
    rank: 'b',
    day: 23,
    dayTitle: 'B-Rank Test',
    type: 'test',
    icon: '⚔',
    xp: 200,
    content: bTest3_content,
  },

  // ═══ B-RANK COMPLETE ═══
  {
    id: 'rank-b-complete',
    title: 'B-Rank Complete',
    rank: 'b',
    day: 24,
    dayTitle: 'Rank Up!',
    type: 'complete',
    icon: '🏆',
    xp: 0,
    content: bCompleteContent,
  },

  // ═══ A-RANK: DAY 23 — Rabin-Karp Rolling Hash ═══
  {
    id: '23-1',
    title: 'Rabin-Karp Rolling Hash',
    rank: 'a',
    day: 23,
    dayTitle: 'Rabin-Karp',
    type: 'concept',
    icon: '📝',
    xp: 20,
    content: a23_1_content,
  },
  {
    id: '23-2',
    title: 'Quest: Repeated DNA Sequences',
    rank: 'a',
    day: 23,
    dayTitle: 'Rabin-Karp',
    type: 'quest',
    icon: '⚔',
    xp: 30,
    content: a23_2_content,
  },
  {
    id: '23-3',
    title: 'Quest: Longest Duplicate Substring',
    rank: 'a',
    day: 23,
    dayTitle: 'Rabin-Karp',
    type: 'quest',
    icon: '⚔',
    xp: 50,
    content: a23_3_content,
  },
  {
    id: '23-4',
    title: 'Checkpoint & Practice',
    rank: 'a',
    day: 23,
    dayTitle: 'Rabin-Karp',
    type: 'checkpoint',
    icon: '✅',
    xp: 20,
    content: a23_4_content,
  },

  // ═══ A-RANK: DAY 24 — KMP Pattern Matching ═══
  {
    id: '24-1',
    title: 'KMP Prefix Function',
    rank: 'a',
    day: 24,
    dayTitle: 'KMP',
    type: 'concept',
    icon: '📝',
    xp: 20,
    content: a24_1_content,
  },
  {
    id: '24-2',
    title: 'Quest: Find Index of First Occurrence',
    rank: 'a',
    day: 24,
    dayTitle: 'KMP',
    type: 'quest',
    icon: '⚔',
    xp: 30,
    content: a24_2_content,
  },
  {
    id: '24-3',
    title: 'Quest: Shortest Palindrome',
    rank: 'a',
    day: 24,
    dayTitle: 'KMP',
    type: 'quest',
    icon: '⚔',
    xp: 50,
    content: a24_3_content,
  },
  {
    id: '24-4',
    title: 'Checkpoint & Practice',
    rank: 'a',
    day: 24,
    dayTitle: 'KMP',
    type: 'checkpoint',
    icon: '✅',
    xp: 20,
    content: a24_4_content,
  },

  // ═══ A-RANK: DAY 25 — Multi-Constraint Windows ═══
  {
    id: '25-1',
    title: 'Multi-Constraint Windows',
    rank: 'a',
    day: 25,
    dayTitle: 'Multi-Constraint Windows',
    type: 'concept',
    icon: '📝',
    xp: 20,
    content: a25_1_content,
  },
  {
    id: '25-2',
    title: 'Quest: Concatenation of All Words',
    rank: 'a',
    day: 25,
    dayTitle: 'Multi-Constraint Windows',
    type: 'quest',
    icon: '⚔',
    xp: 30,
    content: a25_2_content,
  },
  {
    id: '25-3',
    title: 'Quest: Subarrays with K Different Integers',
    rank: 'a',
    day: 25,
    dayTitle: 'Multi-Constraint Windows',
    type: 'quest',
    icon: '⚔',
    xp: 50,
    content: a25_3_content,
  },
  {
    id: '25-4',
    title: 'Checkpoint & Practice',
    rank: 'a',
    day: 25,
    dayTitle: 'Multi-Constraint Windows',
    type: 'checkpoint',
    icon: '✅',
    xp: 20,
    content: a25_4_content,
  },

  // ═══ A-RANK: DAY 26 — Greedy on Strings ═══
  {
    id: '26-1',
    title: 'Greedy String Construction',
    rank: 'a',
    day: 26,
    dayTitle: 'Greedy Strings',
    type: 'concept',
    icon: '📝',
    xp: 20,
    content: a26_1_content,
  },
  {
    id: '26-2',
    title: 'Quest: Remove K Digits',
    rank: 'a',
    day: 26,
    dayTitle: 'Greedy Strings',
    type: 'quest',
    icon: '⚔',
    xp: 30,
    content: a26_2_content,
  },
  {
    id: '26-3',
    title: 'Quest: Remove Duplicate Letters',
    rank: 'a',
    day: 26,
    dayTitle: 'Greedy Strings',
    type: 'quest',
    icon: '⚔',
    xp: 50,
    content: a26_3_content,
  },
  {
    id: '26-4',
    title: 'Checkpoint & Practice',
    rank: 'a',
    day: 26,
    dayTitle: 'Greedy Strings',
    type: 'checkpoint',
    icon: '✅',
    xp: 20,
    content: a26_4_content,
  },

  // ═══ A-RANK: DAY 27 — Bitmask & XOR ═══
  {
    id: '27-1',
    title: 'Bitmask Character Sets',
    rank: 'a',
    day: 27,
    dayTitle: 'Bitmask & XOR',
    type: 'concept',
    icon: '📝',
    xp: 20,
    content: a27_1_content,
  },
  {
    id: '27-2',
    title: 'Quest: Single Number',
    rank: 'a',
    day: 27,
    dayTitle: 'Bitmask & XOR',
    type: 'quest',
    icon: '⚔',
    xp: 30,
    content: a27_2_content,
  },
  {
    id: '27-3',
    title: 'Quest: Maximum Product of Word Lengths',
    rank: 'a',
    day: 27,
    dayTitle: 'Bitmask & XOR',
    type: 'quest',
    icon: '⚔',
    xp: 50,
    content: a27_3_content,
  },
  {
    id: '27-4',
    title: 'Checkpoint & Practice',
    rank: 'a',
    day: 27,
    dayTitle: 'Bitmask & XOR',
    type: 'checkpoint',
    icon: '✅',
    xp: 20,
    content: a27_4_content,
  },

  // ═══ A-RANK TEST ═══
  {
    id: 'a-test-1',
    title: 'Test: Longest Palindromic Substring',
    rank: 'a',
    day: 28,
    dayTitle: 'A-Rank Test',
    type: 'test',
    icon: '⚔',
    xp: 250,
    content: aTest1_content,
  },
  {
    id: 'a-test-2',
    title: 'Test: First Missing Positive',
    rank: 'a',
    day: 28,
    dayTitle: 'A-Rank Test',
    type: 'test',
    icon: '⚔',
    xp: 250,
    content: aTest2_content,
  },
  {
    id: 'a-test-3',
    title: 'Test: Text Justification',
    rank: 'a',
    day: 28,
    dayTitle: 'A-Rank Test',
    type: 'test',
    icon: '⚔',
    xp: 250,
    content: aTest3_content,
  },

  // ═══ A-RANK COMPLETE ═══
  {
    id: 'rank-a-complete',
    title: 'A-Rank Complete',
    rank: 'a',
    day: 29,
    dayTitle: 'Rank Up!',
    type: 'complete',
    icon: '🏆',
    xp: 0,
    content: aCompleteContent,
  },

  // ═══ S-RANK: DAY 28 — Multi-Pattern Array Synthesis ═══
  {
    id: '28-1',
    title: 'Multi-Pattern Array Synthesis',
    rank: 's',
    day: 28,
    dayTitle: 'Array Synthesis',
    type: 'concept',
    icon: '📝',
    xp: 25,
    content: s28_1_content,
  },
  {
    id: '28-2',
    title: 'Quest: Sliding Window Maximum',
    rank: 's',
    day: 28,
    dayTitle: 'Array Synthesis',
    type: 'quest',
    icon: '⚔',
    xp: 40,
    content: s28_2_content,
  },
  {
    id: '28-3',
    title: 'Quest: Shortest Subarray with Sum at Least K',
    rank: 's',
    day: 28,
    dayTitle: 'Array Synthesis',
    type: 'quest',
    icon: '⚔',
    xp: 60,
    content: s28_3_content,
  },
  {
    id: '28-4',
    title: 'Checkpoint & Practice',
    rank: 's',
    day: 28,
    dayTitle: 'Array Synthesis',
    type: 'checkpoint',
    icon: '✅',
    xp: 25,
    content: s28_4_content,
  },

  // ═══ S-RANK: DAY 29 — Multi-Pattern String Synthesis ═══
  {
    id: '29-1',
    title: 'Multi-Pattern String Synthesis',
    rank: 's',
    day: 29,
    dayTitle: 'String Synthesis',
    type: 'concept',
    icon: '📝',
    xp: 25,
    content: s29_1_content,
  },
  {
    id: '29-2',
    title: 'Quest: Longest Repeating Character Replacement',
    rank: 's',
    day: 29,
    dayTitle: 'String Synthesis',
    type: 'quest',
    icon: '⚔',
    xp: 40,
    content: s29_2_content,
  },
  {
    id: '29-3',
    title: 'Quest: Count Unique Characters of All Substrings',
    rank: 's',
    day: 29,
    dayTitle: 'String Synthesis',
    type: 'quest',
    icon: '⚔',
    xp: 60,
    content: s29_3_content,
  },
  {
    id: '29-4',
    title: 'Checkpoint & Practice',
    rank: 's',
    day: 29,
    dayTitle: 'String Synthesis',
    type: 'checkpoint',
    icon: '✅',
    xp: 25,
    content: s29_4_content,
  },

  // ═══ S-RANK: DAY 30 — The Final Ascension ═══
  {
    id: '30-1',
    title: 'The Final Ascension',
    rank: 's',
    day: 30,
    dayTitle: 'Final Ascension',
    type: 'concept',
    icon: '📝',
    xp: 25,
    content: s30_1_content,
  },
  {
    id: '30-2',
    title: 'Quest: Count Subarrays With Fixed Bounds',
    rank: 's',
    day: 30,
    dayTitle: 'Final Ascension',
    type: 'quest',
    icon: '⚔',
    xp: 40,
    content: s30_2_content,
  },
  {
    id: '30-3',
    title: 'Quest: Max Value of Equation',
    rank: 's',
    day: 30,
    dayTitle: 'Final Ascension',
    type: 'quest',
    icon: '⚔',
    xp: 60,
    content: s30_3_content,
  },
  {
    id: '30-4',
    title: 'Checkpoint & Practice',
    rank: 's',
    day: 30,
    dayTitle: 'Final Ascension',
    type: 'checkpoint',
    icon: '✅',
    xp: 25,
    content: s30_4_content,
  },

  // ═══ S-RANK TEST ═══
  {
    id: 's-test-1',
    title: 'Test: 132 Pattern',
    rank: 's',
    day: 31,
    dayTitle: 'S-Rank Test',
    type: 'test',
    icon: '⚔',
    xp: 300,
    content: sTest1_content,
  },
  {
    id: 's-test-2',
    title: 'Test: Create Maximum Number',
    rank: 's',
    day: 31,
    dayTitle: 'S-Rank Test',
    type: 'test',
    icon: '⚔',
    xp: 300,
    content: sTest2_content,
  },
  {
    id: 's-test-3',
    title: 'Test: Maximum Score of a Good Subarray',
    rank: 's',
    day: 31,
    dayTitle: 'S-Rank Test',
    type: 'test',
    icon: '⚔',
    xp: 300,
    content: sTest3_content,
  },

  // ═══ S-RANK COMPLETE ═══
  {
    id: 'rank-s-complete',
    title: 'S-Rank Complete',
    rank: 's',
    day: 32,
    dayTitle: 'Legend',
    type: 'complete',
    icon: '🏆',
    xp: 0,
    content: sCompleteContent,
  },
];
