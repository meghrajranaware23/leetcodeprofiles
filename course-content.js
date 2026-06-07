// ══════════════════════════════════════════════════════════
//  COURSE CONTENT — Arrays & Strings Ascension
//  Micro-lesson architecture: 25 E-Rank lessons + locked rank placeholders
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

  // ═══════════════════════════════════════
  //  LOCKED RANKS (D through S)
  //  Topics aligned to approved progression plan
  // ═══════════════════════════════════════

  // D-RANK — Builder: Two Pointers & Sliding Window (Days 6–10)
  { id: 'day-06', title: 'Opposite-End Two Pointers', rank: 'd', day: 6, dayTitle: 'Two Pointers I', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'day-07', title: 'Multi-Pointer Techniques', rank: 'd', day: 7, dayTitle: 'Multi-Pointer', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'day-08', title: 'Fast & Slow Pointers', rank: 'd', day: 8, dayTitle: 'Fast & Slow', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'day-09', title: 'Fixed-Size Sliding Window', rank: 'd', day: 9, dayTitle: 'Sliding Window I', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'day-10', title: 'Variable-Size Sliding Window', rank: 'd', day: 10, dayTitle: 'Sliding Window II', type: 'lesson', icon: '🔒', xp: 0, content: '' },
  { id: 'rank-d-test', title: 'D-Rank Test', rank: 'd', day: 11, dayTitle: 'D-Rank Test', type: 'test', icon: '🔒', xp: 0, content: '' },
  { id: 'rank-d-complete', title: 'D-Rank Complete', rank: 'd', day: 12, dayTitle: 'Rank Up!', type: 'complete', icon: '🔒', xp: 0, content: '' },

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
