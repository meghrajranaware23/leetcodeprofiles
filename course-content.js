// ══════════════════════════════════════════════════════════
//  COURSE CONTENT — Arrays & Strings Ascension
//  Micro-lesson architecture: E-Rank (25) + D-Rank (24) + locked C–S placeholders
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

  // ═══════════════════════════════════════
  //  LOCKED RANKS (C through S)
  //  Topics aligned to approved progression plan
  // ═══════════════════════════════════════

  // C-RANK — Warrior: Windows, Kadane's & Sorting Strategy (Days 11–16)
  { id: 'day-11', title: 'Sliding Window + Hash Map', rank: 'c', day: 11, dayTitle: 'Window + Hash Map', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'day-12', title: "Kadane's Algorithm", rank: 'c', day: 12, dayTitle: "Kadane's", type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'day-13', title: 'Difference Arrays', rank: 'c', day: 13, dayTitle: 'Difference Arrays', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'day-14', title: 'Sorting as Strategy', rank: 'c', day: 14, dayTitle: 'Sort-First', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'day-15', title: 'Advanced Interval Patterns', rank: 'c', day: 15, dayTitle: 'Intervals', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'day-16', title: 'Greedy on Arrays', rank: 'c', day: 16, dayTitle: 'Greedy', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'rank-c-test', title: 'C-Rank Test', rank: 'c', day: 17, dayTitle: 'C-Rank Test', type: 'test', icon: '🔒', xp: 0, content: '' },
  { id: 'rank-c-complete', title: 'C-Rank Complete', rank: 'c', day: 18, dayTitle: 'Rank Up!', type: 'complete', icon: '🔒', xp: 0, content: '' },

  // B-RANK — Commander: Stacks, Matrices & Advanced Structures (Days 17–22)
  { id: 'day-17', title: 'Monotonic Stack Fundamentals', rank: 'b', day: 17, dayTitle: 'Monotonic Stack I', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'day-18', title: 'Advanced Monotonic Stack', rank: 'b', day: 18, dayTitle: 'Monotonic Stack II', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'day-19', title: 'Matrix Traversal Patterns', rank: 'b', day: 19, dayTitle: 'Matrix Traversal', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'day-20', title: '2D Prefix Sums', rank: 'b', day: 20, dayTitle: '2D Prefix Sums', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'day-21', title: 'Hash Key Design', rank: 'b', day: 21, dayTitle: 'Hash Key Design', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'day-22', title: 'Sweep Line', rank: 'b', day: 22, dayTitle: 'Sweep Line', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'rank-b-test', title: 'B-Rank Test', rank: 'b', day: 23, dayTitle: 'B-Rank Test', type: 'test', icon: '🔒', xp: 0, content: '' },
  { id: 'rank-b-complete', title: 'B-Rank Complete', rank: 'b', day: 24, dayTitle: 'Rank Up!', type: 'complete', icon: '🔒', xp: 0, content: '' },

  // A-RANK — Elite: String Algorithms & Elite Techniques (Days 23–27)
  { id: 'day-23', title: 'Rabin-Karp Rolling Hash', rank: 'a', day: 23, dayTitle: 'Rabin-Karp', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'day-24', title: 'KMP / Z-Algorithm', rank: 'a', day: 24, dayTitle: 'KMP', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'day-25', title: 'Multi-Constraint Windows', rank: 'a', day: 25, dayTitle: 'Advanced Windows', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'day-26', title: 'Greedy on Strings', rank: 'a', day: 26, dayTitle: 'Greedy Strings', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'day-27', title: 'Bit Manipulation for Strings', rank: 'a', day: 27, dayTitle: 'Bitmask & XOR', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'rank-a-test', title: 'A-Rank Test', rank: 'a', day: 28, dayTitle: 'A-Rank Test', type: 'test', icon: '🔒', xp: 0, content: '' },
  { id: 'rank-a-complete', title: 'A-Rank Complete', rank: 'a', day: 29, dayTitle: 'Rank Up!', type: 'complete', icon: '🔒', xp: 0, content: '' },

  // S-RANK — Legend: Final Synthesis (Days 28–30)
  { id: 'day-28', title: 'Multi-Pattern Array Synthesis', rank: 's', day: 28, dayTitle: 'Array Synthesis', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'day-29', title: 'Multi-Pattern String Synthesis', rank: 's', day: 29, dayTitle: 'String Synthesis', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'day-30', title: 'The Final Ascension', rank: 's', day: 30, dayTitle: 'Final Ascension', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'rank-s-test', title: 'S-Rank Final Test', rank: 's', day: 31, dayTitle: 'S-Rank Test', type: 'test', icon: '🔒', xp: 0, content: '' },
  { id: 'rank-s-complete', title: 'S-Rank Complete', rank: 's', day: 32, dayTitle: 'Legend', type: 'complete', icon: '🔒', xp: 0, content: '' },
];
