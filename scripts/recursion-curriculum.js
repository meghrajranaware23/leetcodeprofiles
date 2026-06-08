/**
 * Recursion & Backtracking Ascension — curriculum source of truth
 * Used by build-recursion-course.js to generate markdown + recursion-content.js
 */

export const RANK_THEMES = {
  e: { label: 'E-Rank', theme: 'Learn to Trust', title: 'Novice' },
  d: { label: 'D-Rank', theme: 'Learn to Divide', title: 'Apprentice' },
  c: { label: 'C-Rank', theme: 'Learn to Explore', title: 'Pathfinder' },
  b: { label: 'B-Rank', theme: 'Learn to Prune', title: 'Strategist' },
  a: { label: 'A-Rank', theme: 'Learn to Optimize', title: 'Master' },
  s: { label: 'S-Rank', theme: 'The Recursive Ascension', title: 'Legend' },
};

export const DAYS = [
  // E-RANK — Learn to Trust
  {
    day: 1, rank: 'e', dayTitle: 'The Recursive Mental Model',
    concept: { file: '01-1-recursive-mental-model.md', title: 'The Recursive Mental Model', pattern: 'Call Stack & Base Cases', stars: 1 },
    quests: [
      { file: '01-2-quest-reverse-string.md', title: 'Quest: Reverse String', slug: 'reverse-string', lc: 344, name: 'Reverse String', diff: 'Easy', xp: 10, pattern: 'Linear Recursion' },
      { file: '01-3-quest-power-of-two.md', title: 'Quest: Power of Two', slug: 'power-of-two', lc: 231, name: 'Power of Two', diff: 'Easy', xp: 10, pattern: 'Recursive Reduction' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 2, rank: 'e', dayTitle: 'Base Cases & Recursive Hypothesis',
    concept: { file: '02-1-base-cases-hypothesis.md', title: 'Base Cases & The Recursive Hypothesis', pattern: 'Recursive Hypothesis (Trust)', stars: 1 },
    quests: [
      { file: '02-2-quest-fibonacci.md', title: 'Quest: Fibonacci Number', slug: 'fibonacci', lc: 509, name: 'Fibonacci Number', diff: 'Easy', xp: 10, pattern: 'Binary Recursion' },
      { file: '02-3-quest-climbing-stairs.md', title: 'Quest: Climbing Stairs', slug: 'climbing-stairs', lc: 70, name: 'Climbing Stairs', diff: 'Easy', xp: 10, pattern: 'Memoized Recursion' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 3, rank: 'e', dayTitle: 'Recursion on Linear Structures',
    concept: { file: '03-1-linear-recursion.md', title: 'Recursion on Arrays & Linked Lists', pattern: 'Index-Based Recursion', stars: 2 },
    quests: [
      { file: '03-2-quest-merge-sorted-lists.md', title: 'Quest: Merge Two Sorted Lists', slug: 'merge-sorted-lists', lc: 21, name: 'Merge Two Sorted Lists', diff: 'Easy', xp: 10, pattern: 'List Recursion' },
      { file: '03-3-quest-reverse-linked-list.md', title: 'Quest: Reverse Linked List', slug: 'reverse-linked-list', lc: 206, name: 'Reverse Linked List', diff: 'Easy', xp: 10, pattern: 'Pointer Recursion' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 4, rank: 'e', dayTitle: 'Recursion with Return Values',
    concept: { file: '04-1-return-value-recursion.md', title: 'Recursion with Return Values', pattern: 'Bottom-Up Return Recursion', stars: 2 },
    quests: [
      { file: '04-2-quest-max-depth.md', title: 'Quest: Maximum Depth', slug: 'max-depth', lc: 104, name: 'Maximum Depth of Binary Tree', diff: 'Easy', xp: 10, pattern: 'Bottom-Up Return' },
      { file: '04-3-quest-same-tree.md', title: 'Quest: Same Tree', slug: 'same-tree', lc: 100, name: 'Same Tree', diff: 'Easy', xp: 10, pattern: 'Parallel Recursion' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 5, rank: 'e', dayTitle: 'Recursion with State',
    concept: { file: '05-1-state-passing-recursion.md', title: 'Recursion with State (Parameters)', pattern: 'Top-Down State Recursion', stars: 2 },
    quests: [
      { file: '05-2-quest-path-sum.md', title: 'Quest: Path Sum', slug: 'path-sum', lc: 112, name: 'Path Sum', diff: 'Easy', xp: 10, pattern: 'Top-Down Accumulator' },
      { file: '05-3-quest-range-sum-bst.md', title: 'Quest: Range Sum of BST', slug: 'range-sum-bst', lc: 938, name: 'Range Sum of BST', diff: 'Easy', xp: 10, pattern: 'Bounded DFS' },
    ],
    checkpoint: { xp: 10 },
  },
  // D-RANK — Learn to Divide
  {
    day: 6, rank: 'd', dayTitle: 'Multiple Recursive Calls',
    concept: { file: '06-1-multiple-recursive-calls.md', title: 'Multiple Recursive Calls', pattern: 'Binary Recursion', stars: 3 },
    quests: [
      { file: '06-2-quest-pow-x-n.md', title: 'Quest: Pow(x, n)', slug: 'pow-x-n', lc: 50, name: 'Pow(x, n)', diff: 'Medium', xp: 15, pattern: 'Fast Exponentiation' },
      { file: '06-3-quest-count-good-numbers.md', title: 'Quest: Count Good Numbers', slug: 'count-good-numbers', lc: 1922, name: 'Count Good Numbers', diff: 'Medium', xp: 15, pattern: 'Modular Binary Recursion' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 7, rank: 'd', dayTitle: 'Divide and Conquer',
    concept: { file: '07-1-divide-and-conquer.md', title: 'Divide and Conquer', pattern: 'Divide and Conquer', stars: 3 },
    quests: [
      { file: '07-2-quest-sort-array.md', title: 'Quest: Sort an Array', slug: 'sort-array', lc: 912, name: 'Sort an Array', diff: 'Medium', xp: 15, pattern: 'Merge Sort Recursion' },
      { file: '07-3-quest-max-subarray.md', title: 'Quest: Maximum Subarray', slug: 'max-subarray', lc: 53, name: 'Maximum Subarray', diff: 'Medium', xp: 15, pattern: 'Divide and Conquer Max' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 8, rank: 'd', dayTitle: 'String Recursion & Generation',
    concept: { file: '08-1-string-generation.md', title: 'String Recursion & Generation', pattern: 'Choose and Extend', stars: 3 },
    quests: [
      { file: '08-2-quest-generate-parentheses.md', title: 'Quest: Generate Parentheses', slug: 'generate-parentheses', lc: 22, name: 'Generate Parentheses', diff: 'Medium', xp: 15, pattern: 'Constrained Generation' },
      { file: '08-3-quest-letter-combinations.md', title: 'Quest: Letter Combinations', slug: 'letter-combinations', lc: 17, name: 'Letter Combinations of a Phone Number', diff: 'Medium', xp: 15, pattern: 'Multi-Branch Generation' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 9, rank: 'd', dayTitle: 'Recursion on Trees',
    concept: { file: '09-1-tree-recursion.md', title: 'Recursion on Trees (Consolidation)', pattern: 'Tree Recursion Skeleton', stars: 3 },
    quests: [
      { file: '09-2-quest-invert-tree.md', title: 'Quest: Invert Binary Tree', slug: 'invert-tree', lc: 226, name: 'Invert Binary Tree', diff: 'Easy', xp: 15, pattern: 'Postorder Modification' },
      { file: '09-3-quest-symmetric-tree.md', title: 'Quest: Symmetric Tree', slug: 'symmetric-tree', lc: 101, name: 'Symmetric Tree', diff: 'Easy', xp: 15, pattern: 'Mirror Recursion' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 10, rank: 'd', dayTitle: 'Helper Functions & Recursion Design',
    concept: { file: '10-1-helper-functions.md', title: 'Helper Functions & Recursion Design', pattern: 'Helper Function Design', stars: 3 },
    quests: [
      { file: '10-2-quest-validate-bst.md', title: 'Quest: Validate BST', slug: 'validate-bst', lc: 98, name: 'Validate Binary Search Tree', diff: 'Medium', xp: 20, pattern: 'Range-Bounded Helper' },
      { file: '10-3-quest-flatten-tree.md', title: 'Quest: Flatten Binary Tree', slug: 'flatten-tree', lc: 114, name: 'Flatten Binary Tree to Linked List', diff: 'Medium', xp: 20, pattern: 'Postorder Rewiring' },
    ],
    checkpoint: { xp: 10 },
  },
  // C-RANK — Learn to Explore
  {
    day: 11, rank: 'c', dayTitle: 'The Backtracking Template',
    concept: { file: '11-1-backtracking-template.md', title: 'The Backtracking Template', pattern: 'Choose / Explore / Unchoose', stars: 3 },
    quests: [
      { file: '11-2-quest-subsets.md', title: 'Quest: Subsets', slug: 'subsets', lc: 78, name: 'Subsets', diff: 'Medium', xp: 20, pattern: 'Subset Backtracking' },
      { file: '11-3-quest-subsets-ii.md', title: 'Quest: Subsets II', slug: 'subsets-ii', lc: 90, name: 'Subsets II', diff: 'Medium', xp: 20, pattern: 'Subset with Dedup' },
    ],
    checkpoint: { xp: 15 },
  },
  {
    day: 12, rank: 'c', dayTitle: 'Permutations',
    concept: { file: '12-1-permutations.md', title: 'Permutation Generation', pattern: 'Permutation Backtracking', stars: 3 },
    quests: [
      { file: '12-2-quest-permutations.md', title: 'Quest: Permutations', slug: 'permutations', lc: 46, name: 'Permutations', diff: 'Medium', xp: 20, pattern: 'Used-Array Permutations' },
      { file: '12-3-quest-permutations-ii.md', title: 'Quest: Permutations II', slug: 'permutations-ii', lc: 47, name: 'Permutations II', diff: 'Medium', xp: 25, pattern: 'Permutation with Dedup' },
    ],
    checkpoint: { xp: 15 },
  },
  {
    day: 13, rank: 'c', dayTitle: 'Combinations',
    concept: { file: '13-1-combinations.md', title: 'Combination Generation', pattern: 'Combination Backtracking', stars: 3 },
    quests: [
      { file: '13-2-quest-combinations.md', title: 'Quest: Combinations', slug: 'combinations', lc: 77, name: 'Combinations', diff: 'Medium', xp: 20, pattern: 'Start-Index Combinations' },
      { file: '13-3-quest-combination-sum.md', title: 'Quest: Combination Sum', slug: 'combination-sum', lc: 39, name: 'Combination Sum', diff: 'Medium', xp: 25, pattern: 'Unlimited Reuse Combinations' },
    ],
    checkpoint: { xp: 15 },
  },
  {
    day: 14, rank: 'c', dayTitle: 'Backtracking on Strings',
    concept: { file: '14-1-string-partitioning.md', title: 'Backtracking on Strings', pattern: 'String Partitioning', stars: 4 },
    quests: [
      { file: '14-2-quest-palindrome-partitioning.md', title: 'Quest: Palindrome Partitioning', slug: 'palindrome-partitioning', lc: 131, name: 'Palindrome Partitioning', diff: 'Medium', xp: 25, pattern: 'Partition Backtracking' },
      { file: '14-3-quest-restore-ip-addresses.md', title: 'Quest: Restore IP Addresses', slug: 'restore-ip-addresses', lc: 93, name: 'Restore IP Addresses', diff: 'Medium', xp: 25, pattern: 'Fixed-Segment Partition' },
    ],
    checkpoint: { xp: 15 },
  },
  {
    day: 15, rank: 'c', dayTitle: 'Combination Sum Variants',
    concept: { file: '15-1-combination-sum-variants.md', title: 'Combination Sum Variants', pattern: 'Constraint Variation Backtracking', stars: 4 },
    quests: [
      { file: '15-2-quest-combination-sum-ii.md', title: 'Quest: Combination Sum II', slug: 'combination-sum-ii', lc: 40, name: 'Combination Sum II', diff: 'Medium', xp: 25, pattern: 'Single-Use with Dedup' },
      { file: '15-3-quest-combination-sum-iii.md', title: 'Quest: Combination Sum III', slug: 'combination-sum-iii', lc: 216, name: 'Combination Sum III', diff: 'Medium', xp: 25, pattern: 'Fixed Count Combinations' },
    ],
    checkpoint: { xp: 15 },
  },
  {
    day: 16, rank: 'c', dayTitle: 'Backtracking with Complex State',
    concept: { file: '16-1-grid-backtracking.md', title: 'Backtracking with Complex State', pattern: 'Grid Backtracking', stars: 4 },
    quests: [
      { file: '16-2-quest-word-search.md', title: 'Quest: Word Search', slug: 'word-search', lc: 79, name: 'Word Search', diff: 'Medium', xp: 25, pattern: 'Grid DFS Backtracking' },
      { file: '16-3-quest-letter-case-permutation.md', title: 'Quest: Letter Case Permutation', slug: 'letter-case-permutation', lc: 784, name: 'Letter Case Permutation', diff: 'Medium', xp: 20, pattern: 'Binary Choice Backtracking' },
    ],
    checkpoint: { xp: 15 },
  },
  // B-RANK — Learn to Prune
  {
    day: 17, rank: 'b', dayTitle: 'Pruning Strategies',
    concept: { file: '17-1-pruning-strategies.md', title: 'Pruning Strategies', pattern: 'Early Termination Pruning', stars: 4 },
    quests: [
      { file: '17-2-quest-target-sum.md', title: 'Quest: Target Sum', slug: 'target-sum', lc: 494, name: 'Target Sum', diff: 'Medium', xp: 35, pattern: 'Sign-Choice Backtracking' },
      { file: '17-3-quest-partition-k-subsets.md', title: 'Quest: Partition to K Equal Sum Subsets', slug: 'partition-k-subsets', lc: 698, name: 'Partition to K Equal Sum Subsets', diff: 'Medium', xp: 35, pattern: 'Bucket Assignment Pruning' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 18, rank: 'b', dayTitle: 'Board & Grid Problems',
    concept: { file: '18-1-board-constraints.md', title: 'Board & Grid Constraint Backtracking', pattern: 'Constraint Satisfaction', stars: 4 },
    quests: [
      { file: '18-2-quest-n-queens-ii.md', title: 'Quest: N-Queens II', slug: 'n-queens-ii', lc: 52, name: 'N-Queens II', diff: 'Medium', xp: 35, pattern: 'Row-by-Row Constraints' },
      { file: '18-3-quest-sudoku-solver.md', title: 'Quest: Sudoku Solver', slug: 'sudoku-solver', lc: 37, name: 'Sudoku Solver', diff: 'Medium', xp: 35, pattern: 'Cell Assignment Backtracking' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 19, rank: 'b', dayTitle: 'Partition Problems',
    concept: { file: '19-1-partition-problems.md', title: 'Partition Problems', pattern: 'Partition Backtracking', stars: 4 },
    quests: [
      { file: '19-2-quest-matchsticks-square.md', title: 'Quest: Matchsticks to Square', slug: 'matchsticks-square', lc: 473, name: 'Matchsticks to Square', diff: 'Medium', xp: 35, pattern: '4-Bucket Partition' },
      { file: '19-3-quest-partition-k-subsets.md', title: 'Quest: Partition to K Subsets (Revisited)', slug: 'partition-k-revisit', lc: 698, name: 'Partition to K Equal Sum Subsets', diff: 'Medium', xp: 35, pattern: 'Sorted Pruning Partition' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 20, rank: 'b', dayTitle: 'Backtracking + String Building',
    concept: { file: '20-1-expression-generation.md', title: 'Backtracking + String Building', pattern: 'Expression Generation', stars: 4 },
    quests: [
      { file: '20-2-quest-expression-add-operators.md', title: 'Quest: Expression Add Operators', slug: 'expression-add-operators', lc: 282, name: 'Expression Add Operators', diff: 'Medium', xp: 35, pattern: 'Operator Insertion Backtracking' },
      { file: '20-3-quest-additive-number.md', title: 'Quest: Additive Number', slug: 'additive-number', lc: 306, name: 'Additive Number', diff: 'Medium', xp: 35, pattern: 'Sequence Validation Backtracking' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 21, rank: 'b', dayTitle: 'Backtracking + Memoization Bridge',
    concept: { file: '21-1-backtracking-memo-bridge.md', title: 'Backtracking + Memoization Bridge', pattern: 'Overlap Recognition', stars: 4 },
    quests: [
      { file: '21-2-quest-word-break.md', title: 'Quest: Word Break', slug: 'word-break', lc: 139, name: 'Word Break', diff: 'Medium', xp: 35, pattern: 'Recursion + Memoization' },
      { file: '21-3-quest-word-break-ii.md', title: 'Quest: Word Break II', slug: 'word-break-ii', lc: 140, name: 'Word Break II', diff: 'Medium', xp: 35, pattern: 'Backtracking + Memo Hybrid' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 22, rank: 'b', dayTitle: 'Advanced Constraint Backtracking',
    concept: { file: '22-1-multi-constraint-backtracking.md', title: 'Advanced Constraint Backtracking', pattern: 'Multi-Constraint Backtracking', stars: 4 },
    quests: [
      { file: '22-2-quest-beautiful-arrangement.md', title: 'Quest: Beautiful Arrangement', slug: 'beautiful-arrangement', lc: 526, name: 'Beautiful Arrangement', diff: 'Medium', xp: 35, pattern: 'Divisibility Constraint Permutation' },
      { file: '22-3-quest-find-unique-binary-string.md', title: 'Quest: Find Unique Binary String', slug: 'find-unique-binary-string', lc: 1980, name: 'Find Unique Binary String', diff: 'Medium', xp: 35, pattern: 'Cantor Diagonal Backtracking' },
    ],
    checkpoint: { xp: 25 },
  },
  // A-RANK — Learn to Optimize
  {
    day: 23, rank: 'a', dayTitle: 'Recursion + Memoization',
    concept: { file: '23-1-recursion-memoization.md', title: 'Recursion + Memoization (Top-Down DP)', pattern: 'Top-Down DP', stars: 4 },
    quests: [
      { file: '23-2-quest-house-robber.md', title: 'Quest: House Robber', slug: 'house-robber', lc: 198, name: 'House Robber', diff: 'Medium', xp: 30, pattern: 'Linear Memoization' },
      { file: '23-3-quest-decode-ways.md', title: 'Quest: Decode Ways', slug: 'decode-ways', lc: 91, name: 'Decode Ways', diff: 'Medium', xp: 35, pattern: 'String Memoization' },
    ],
    checkpoint: { xp: 20 },
  },
  {
    day: 24, rank: 'a', dayTitle: 'Advanced Backtracking Patterns',
    concept: { file: '24-1-advanced-backtracking.md', title: 'Advanced Backtracking Patterns', pattern: 'Disguised Backtracking', stars: 4 },
    quests: [
      { file: '24-2-quest-path-max-gold.md', title: 'Quest: Path with Maximum Gold', slug: 'path-max-gold', lc: 1219, name: 'Path with Maximum Gold', diff: 'Medium', xp: 35, pattern: 'Grid Path Enumeration' },
      { file: '24-3-quest-unique-paths-iii.md', title: 'Quest: Unique Paths III', slug: 'unique-paths-iii', lc: 980, name: 'Unique Paths III', diff: 'Medium', xp: 40, pattern: 'Full Grid Coverage Backtracking' },
    ],
    checkpoint: { xp: 20 },
  },
  {
    day: 25, rank: 'a', dayTitle: 'Recursion in Math & Counting',
    concept: { file: '25-1-recursive-counting.md', title: 'Recursion in Math & Counting', pattern: 'Recursive Counting', stars: 4 },
    quests: [
      { file: '25-2-quest-unique-bsts.md', title: 'Quest: Unique Binary Search Trees', slug: 'unique-bsts', lc: 96, name: 'Unique Binary Search Trees', diff: 'Medium', xp: 35, pattern: 'Catalan Recursion' },
      { file: '25-3-quest-add-parentheses.md', title: 'Quest: Different Ways to Add Parentheses', slug: 'add-parentheses', lc: 241, name: 'Different Ways to Add Parentheses', diff: 'Medium', xp: 40, pattern: 'Divide and Conquer Enumeration' },
    ],
    checkpoint: { xp: 20 },
  },
  {
    day: 26, rank: 'a', dayTitle: 'Backtracking Synthesis I',
    concept: { file: '26-1-backtracking-synthesis.md', title: 'Backtracking Synthesis I', pattern: 'Pattern Composition', stars: 5 },
    quests: [
      { file: '26-2-quest-letter-combinations-ii.md', title: 'Quest: Letter Combinations (Revisited)', slug: 'letter-combinations-ii', lc: 17, name: 'Letter Combinations of a Phone Number', diff: 'Medium', xp: 35, pattern: 'Multi-Branch Generation' },
      { file: '26-3-quest-generate-parentheses-ii.md', title: 'Quest: Generate Parentheses (Revisited)', slug: 'generate-parentheses-ii', lc: 22, name: 'Generate Parentheses', diff: 'Medium', xp: 35, pattern: 'Constrained Generation' },
    ],
    checkpoint: { xp: 20 },
  },
  {
    day: 27, rank: 'a', dayTitle: 'Interview Simulation',
    concept: { file: '27-1-interview-simulation.md', title: 'Interview Simulation', pattern: 'Speed Pattern Recognition', stars: 5 },
    quests: [
      { file: '27-2-quest-combination-sum-iv.md', title: 'Quest: Combination Sum IV', slug: 'combination-sum-iv', lc: 377, name: 'Combination Sum IV', diff: 'Medium', xp: 40, pattern: 'Order-Matters Counting' },
      { file: '27-3-quest-partition-equal-subset.md', title: 'Quest: Partition Equal Subset Sum', slug: 'partition-equal-subset', lc: 416, name: 'Partition Equal Subset Sum', diff: 'Medium', xp: 40, pattern: 'Subset Sum Memoization' },
    ],
    checkpoint: { xp: 20 },
  },
  // S-RANK — The Recursive Ascension
  {
    day: 28, rank: 's', dayTitle: 'Recursive Synthesis I',
    concept: { file: '28-1-recursive-synthesis-i.md', title: 'Recursive Synthesis I', pattern: 'Multi-Pattern Recursion', stars: 5 },
    quests: [
      { file: '28-2-quest-restore-ip-ii.md', title: 'Quest: Restore IP Addresses (Revisited)', slug: 'restore-ip-ii', lc: 93, name: 'Restore IP Addresses', diff: 'Medium', xp: 50, pattern: 'Partition Backtracking' },
      { file: '28-3-quest-palindrome-partition-ii.md', title: 'Quest: Palindrome Partitioning (Revisited)', slug: 'palindrome-partition-ii', lc: 131, name: 'Palindrome Partitioning', diff: 'Medium', xp: 50, pattern: 'Partition with Pruning' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 29, rank: 's', dayTitle: 'Recursive Synthesis II',
    concept: { file: '29-1-recursive-synthesis-ii.md', title: 'Recursive Synthesis II', pattern: 'Complex State Recursion', stars: 5 },
    quests: [
      { file: '29-2-quest-regex-matching.md', title: 'Quest: Regular Expression Matching', slug: 'regex-matching', lc: 10, name: 'Regular Expression Matching', diff: 'Hard', xp: 60, pattern: 'Recursive Pattern Matching' },
      { file: '29-3-quest-wildcard-matching.md', title: 'Quest: Wildcard Matching', slug: 'wildcard-matching', lc: 44, name: 'Wildcard Matching', diff: 'Hard', xp: 60, pattern: 'Memoized String Matching' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 30, rank: 's', dayTitle: 'The Final Ascension',
    concept: { file: '30-1-final-ascension.md', title: 'The Final Ascension', pattern: 'Pattern Decision Tree', stars: 5 },
    quests: [
      { file: '30-2-quest-word-search-ii.md', title: 'Quest: Word Search II', slug: 'word-search-ii', lc: 212, name: 'Word Search II', diff: 'Hard', xp: 60, pattern: 'Trie + Grid Backtracking' },
      { file: '30-3-quest-n-queens.md', title: 'Quest: N-Queens', slug: 'n-queens', lc: 51, name: 'N-Queens', diff: 'Hard', xp: 60, pattern: 'Full Constraint Generation' },
    ],
    checkpoint: { xp: 25 },
  },
];

export const RANK_TESTS = {
  e: {
    day: 6, dayTitle: 'E-Rank Test',
    tests: [
      { file: 'test-1-power-of-three.md', title: 'Test: Power of Three', lc: 326, name: 'Power of Three', diff: 'Easy', xp: 100 },
      { file: 'test-2-max-depth-nary.md', title: 'Test: Max Depth N-ary Tree', lc: 559, name: 'Maximum Depth of N-ary Tree', diff: 'Easy', xp: 100 },
      { file: 'test-3-swap-pairs.md', title: 'Test: Swap Nodes in Pairs', lc: 24, name: 'Swap Nodes in Pairs', diff: 'Medium', xp: 100 },
    ],
    complete: { file: 'rank-e-complete.md', day: 7 },
  },
  d: {
    day: 11, dayTitle: 'D-Rank Test',
    tests: [
      { file: 'd-test-1-sort-list.md', title: 'Test: Sort List', lc: 148, name: 'Sort List', diff: 'Medium', xp: 100 },
      { file: 'd-test-2-construct-tree.md', title: 'Test: Construct Tree', lc: 105, name: 'Construct Binary Tree from Preorder and Inorder Traversal', diff: 'Medium', xp: 100 },
      { file: 'd-test-3-add-parentheses.md', title: 'Test: Different Ways to Add Parentheses', lc: 241, name: 'Different Ways to Add Parentheses', diff: 'Medium', xp: 100 },
    ],
    complete: { file: 'rank-d-complete.md', day: 12 },
  },
  c: {
    day: 17, dayTitle: 'C-Rank Test',
    tests: [
      { file: 'c-test-1-combination-sum-ii.md', title: 'Test: Combination Sum II', lc: 40, name: 'Combination Sum II', diff: 'Medium', xp: 150 },
      { file: 'c-test-2-letter-tile.md', title: 'Test: Letter Tile Possibilities', lc: 1079, name: 'Letter Tile Possibilities', diff: 'Medium', xp: 150 },
      { file: 'c-test-3-fibonacci-sequence.md', title: 'Test: Split Array into Fibonacci Sequence', lc: 842, name: 'Split Array into Fibonacci Sequence', diff: 'Medium', xp: 150 },
    ],
    complete: { file: 'rank-c-complete.md', day: 18 },
  },
  b: {
    day: 23, dayTitle: 'B-Rank Test',
    tests: [
      { file: 'b-test-1-n-queens-ii.md', title: 'Test: N-Queens II', lc: 52, name: 'N-Queens II', diff: 'Medium', xp: 200 },
      { file: 'b-test-2-word-search.md', title: 'Test: Word Search', lc: 79, name: 'Word Search', diff: 'Medium', xp: 200 },
      { file: 'b-test-3-matchsticks.md', title: 'Test: Matchsticks to Square', lc: 473, name: 'Matchsticks to Square', diff: 'Medium', xp: 200 },
    ],
    complete: { file: 'rank-b-complete.md', day: 24 },
  },
  a: {
    day: 28, dayTitle: 'A-Rank Test',
    tests: [
      { file: 'a-test-1-unique-paths-iii.md', title: 'Test: Unique Paths III', lc: 980, name: 'Unique Paths III', diff: 'Medium', xp: 250 },
      { file: 'a-test-2-decode-ways.md', title: 'Test: Decode Ways', lc: 91, name: 'Decode Ways', diff: 'Medium', xp: 250 },
      { file: 'a-test-3-partition-subset.md', title: 'Test: Partition Equal Subset Sum', lc: 416, name: 'Partition Equal Subset Sum', diff: 'Medium', xp: 250 },
    ],
    complete: { file: 'rank-a-complete.md', day: 29 },
  },
  s: {
    day: 31, dayTitle: 'S-Rank Test',
    tests: [
      { file: 's-test-1-word-search-ii.md', title: 'Test: Word Search II', lc: 212, name: 'Word Search II', diff: 'Hard', xp: 300 },
      { file: 's-test-2-n-queens.md', title: 'Test: N-Queens', lc: 51, name: 'N-Queens', diff: 'Hard', xp: 300 },
      { file: 's-test-3-regex-matching.md', title: 'Test: Regular Expression Matching', lc: 10, name: 'Regular Expression Matching', diff: 'Hard', xp: 300 },
    ],
    complete: { file: 'rank-s-complete.md', day: 32 },
  },
};

export const E_RANK_PATTERNS = [
  'Simple Linear Recursion',
  'Recursive Hypothesis (Trust)',
  'Accumulator Recursion',
  'Bottom-Up Return Recursion',
  'Top-Down State Recursion',
];

export const D_RANK_PATTERNS = [
  'Binary Recursion',
  'Divide and Conquer',
  'String Generation',
  'Tree Recursion Skeleton',
  'Helper Function Design',
];

export const C_RANK_PATTERNS = [
  'Backtracking Template (Choose/Explore/Unchoose)',
  'Subset Generation',
  'Permutation Generation',
  'Combination Generation',
  'String Partitioning',
  'Grid Backtracking',
];

export const B_RANK_PATTERNS = [
  'Pruning by Bound',
  'Constraint Satisfaction (Board)',
  'Partition Assignment',
  'Expression Generation',
  'Backtracking + Memoization Bridge',
  'Multi-Constraint Backtracking',
];

export const A_RANK_PATTERNS = [
  'Top-Down DP (Recursion + Memo)',
  'Disguised Backtracking',
  'Recursive Counting',
  'Pattern Composition',
  'Interview Speed Recognition',
];

export const S_RANK_PATTERNS = [
  'Multi-Pattern Recursion Synthesis',
  'Complex State Recursion',
  'Trie + Backtracking',
  'Recursive Pattern Matching',
  'Pattern Decision Tree',
];

export const RECURSION_CHEAT_SHEET = [
  ['"reverse" / "factorial" / "power of" / single shrinking input', 'Simple linear recursion'],
  ['"how many ways" + overlapping subproblems', 'Recursion + memoization'],
  ['"all subsets" / "all combinations" / "include or exclude"', 'Subset backtracking'],
  ['"all permutations" / "all arrangements" / order matters', 'Permutation backtracking'],
  ['"combination sum" / "pick k from n"', 'Combination backtracking + start index'],
  ['"partition" / "split string" / "restore IP"', 'String partition backtracking'],
  ['"word search" / "grid path" / "visit all cells"', 'Grid backtracking + mark/unmark'],
  ['"N-Queens" / "Sudoku" / board constraints', 'Constraint satisfaction backtracking'],
  ['"matchsticks" / "partition equal" / assign to buckets', 'Partition backtracking + pruning'],
  ['"regex" / "wildcard" / pattern matching', 'Recursive string matching + memo'],
];
