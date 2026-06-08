/**
 * Dynamic Programming Ascension — curriculum source of truth
 * Used by build-dp-course.js to generate markdown + dp-content.js
 */

export const RANK_THEMES = {
  e: { label: 'E-Rank', theme: 'Learn to See', title: 'Novice' },
  d: { label: 'D-Rank', theme: 'Learn to Decide', title: 'Apprentice' },
  c: { label: 'C-Rank', theme: 'Learn to Navigate', title: 'Pathfinder' },
  b: { label: 'B-Rank', theme: 'Learn to Transform', title: 'Strategist' },
  a: { label: 'A-Rank', theme: 'Learn to Synthesize', title: 'Master' },
  s: { label: 'S-Rank', theme: 'The Dynamic Ascension', title: 'Legend' },
};

export const DAYS = [
  // E-RANK — Learn to See
  {
    day: 1, rank: 'e', dayTitle: 'The DP Mental Model',
    concept: { file: '01-1-dp-mental-model.md', title: 'The DP Mental Model', pattern: 'Overlapping Subproblems & Optimal Substructure', stars: 1 },
    quests: [
      { file: '01-2-quest-fibonacci-number.md', title: 'Quest: Fibonacci Number', slug: 'fibonacci-number', lc: 509, name: 'Fibonacci Number', diff: 'Easy', xp: 10, pattern: 'Linear Recurrence' },
      { file: '01-3-quest-n-th-tribonacci.md', title: 'Quest: N-th Tribonacci Number', slug: 'n-th-tribonacci', lc: 1137, name: 'N-th Tribonacci Number', diff: 'Easy', xp: 10, pattern: 'Extended Recurrence' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 2, rank: 'e', dayTitle: 'Memoization — Your First DP Optimization',
    concept: { file: '02-1-memoization.md', title: 'Memoization — Your First DP Optimization', pattern: 'Top-Down Caching', stars: 1 },
    quests: [
      { file: '02-2-quest-climbing-stairs.md', title: 'Quest: Climbing Stairs', slug: 'climbing-stairs', lc: 70, name: 'Climbing Stairs', diff: 'Easy', xp: 10, pattern: 'Fibonacci in Disguise' },
      { file: '02-3-quest-min-cost-climbing-stairs.md', title: 'Quest: Min Cost Climbing Stairs', slug: 'min-cost-climbing-stairs', lc: 746, name: 'Min Cost Climbing Stairs', diff: 'Easy', xp: 10, pattern: 'Decision + Cost Memoization' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 3, rank: 'e', dayTitle: 'Tabulation — Building Bottom-Up',
    concept: { file: '03-1-tabulation.md', title: 'Tabulation — Building Bottom-Up', pattern: 'Bottom-Up Table Filling', stars: 2 },
    quests: [
      { file: '03-2-quest-pascals-triangle.md', title: 'Quest: Pascal\'s Triangle', slug: 'pascals-triangle', lc: 118, name: 'Pascal\'s Triangle', diff: 'Easy', xp: 10, pattern: '2D Visual Tabulation' },
      { file: '03-3-quest-counting-bits.md', title: 'Quest: Counting Bits', slug: 'counting-bits', lc: 338, name: 'Counting Bits', diff: 'Easy', xp: 10, pattern: 'Bit-Based Tabulation' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 4, rank: 'e', dayTitle: 'The DP Framework',
    concept: { file: '04-1-dp-framework.md', title: 'The DP Framework', pattern: 'State Definition & Recurrence Design', stars: 2 },
    quests: [
      { file: '04-2-quest-get-maximum-generated-array.md', title: 'Quest: Get Maximum in Generated Array', slug: 'get-maximum-generated-array', lc: 1646, name: 'Get Maximum in Generated Array', diff: 'Easy', xp: 10, pattern: 'Formula-Driven Tabulation' },
      { file: '04-3-quest-pascals-triangle-ii.md', title: 'Quest: Pascal\'s Triangle II', slug: 'pascals-triangle-ii', lc: 119, name: 'Pascal\'s Triangle II', diff: 'Easy', xp: 10, pattern: 'Space-Optimized Tabulation' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 5, rank: 'e', dayTitle: 'DP with Decisions',
    concept: { file: '05-1-dp-with-decisions.md', title: 'DP with Decisions', pattern: 'Optimal Decision at Each Step', stars: 2 },
    quests: [
      { file: '05-2-quest-best-time-to-buy-sell-stock.md', title: 'Quest: Best Time to Buy and Sell Stock', slug: 'best-time-to-buy-sell-stock', lc: 121, name: 'Best Time to Buy and Sell Stock', diff: 'Easy', xp: 10, pattern: 'Running Minimum DP' },
      { file: '05-3-quest-maximum-subarray.md', title: 'Quest: Maximum Subarray', slug: 'maximum-subarray', lc: 53, name: 'Maximum Subarray', diff: 'Medium', xp: 15, pattern: 'Kadane\'s / Linear Decision DP' },
    ],
    checkpoint: { xp: 10 },
  },
  // D-RANK — Learn to Decide
  {
    day: 6, rank: 'd', dayTitle: 'Take or Skip',
    concept: { file: '06-1-take-or-skip.md', title: 'Take or Skip', pattern: 'Decision DP (Include/Exclude)', stars: 3 },
    quests: [
      { file: '06-2-quest-house-robber.md', title: 'Quest: House Robber', slug: 'house-robber', lc: 198, name: 'House Robber', diff: 'Medium', xp: 15, pattern: 'Take/Skip DP' },
      { file: '06-3-quest-delete-and-earn.md', title: 'Quest: Delete and Earn', slug: 'delete-and-earn', lc: 740, name: 'Delete and Earn', diff: 'Medium', xp: 15, pattern: 'House Robber in Disguise' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 7, rank: 'd', dayTitle: 'Counting Decompositions',
    concept: { file: '07-1-counting-decompositions.md', title: 'Counting Decompositions', pattern: 'Path Counting DP', stars: 3 },
    quests: [
      { file: '07-2-quest-decode-ways.md', title: 'Quest: Decode Ways', slug: 'decode-ways', lc: 91, name: 'Decode Ways', diff: 'Medium', xp: 15, pattern: 'String Decomposition DP' },
      { file: '07-3-quest-unique-paths.md', title: 'Quest: Unique Paths', slug: 'unique-paths', lc: 62, name: 'Unique Paths', diff: 'Medium', xp: 15, pattern: 'Grid Path Counting' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 8, rank: 'd', dayTitle: 'Cost Optimization',
    concept: { file: '08-1-cost-optimization.md', title: 'Cost Optimization', pattern: 'Min/Max Cost DP', stars: 3 },
    quests: [
      { file: '08-2-quest-minimum-path-sum.md', title: 'Quest: Minimum Path Sum', slug: 'minimum-path-sum', lc: 64, name: 'Minimum Path Sum', diff: 'Medium', xp: 15, pattern: 'Grid Min-Cost DP' },
      { file: '08-3-quest-triangle.md', title: 'Quest: Triangle', slug: 'triangle', lc: 120, name: 'Triangle', diff: 'Medium', xp: 15, pattern: 'Bottom-Up Min-Cost DP' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 9, rank: 'd', dayTitle: 'Circular & Extended Decisions',
    concept: { file: '09-1-circular-extended.md', title: 'Circular & Extended Decisions', pattern: 'Variant Decision DP', stars: 3 },
    quests: [
      { file: '09-2-quest-house-robber-ii.md', title: 'Quest: House Robber II', slug: 'house-robber-ii', lc: 213, name: 'House Robber II', diff: 'Medium', xp: 20, pattern: 'Circular Constraint DP' },
      { file: '09-3-quest-maximum-product-subarray.md', title: 'Quest: Maximum Product Subarray', slug: 'maximum-product-subarray', lc: 152, name: 'Maximum Product Subarray', diff: 'Medium', xp: 20, pattern: 'Dual-State Tracking DP' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 10, rank: 'd', dayTitle: 'Multi-Option Decision DP',
    concept: { file: '10-1-multi-option-decision.md', title: 'Multi-Option Decision DP', pattern: 'Complex Transition DP', stars: 3 },
    quests: [
      { file: '10-2-quest-integer-break.md', title: 'Quest: Integer Break', slug: 'integer-break', lc: 343, name: 'Integer Break', diff: 'Medium', xp: 20, pattern: 'Partition Maximization DP' },
      { file: '10-3-quest-perfect-squares.md', title: 'Quest: Perfect Squares', slug: 'perfect-squares', lc: 279, name: 'Perfect Squares', diff: 'Medium', xp: 20, pattern: 'Minimization with Multiple Choices' },
    ],
    checkpoint: { xp: 10 },
  },
  // C-RANK — Learn to Navigate
  {
    day: 11, rank: 'c', dayTitle: 'Grid DP Foundations',
    concept: { file: '11-1-grid-dp-foundations.md', title: 'Grid DP Foundations', pattern: '2D Grid State', stars: 3 },
    quests: [
      { file: '11-2-quest-unique-paths-ii.md', title: 'Quest: Unique Paths II', slug: 'unique-paths-ii', lc: 63, name: 'Unique Paths II', diff: 'Medium', xp: 20, pattern: 'Grid DP with Obstacles' },
      { file: '11-3-quest-minimum-falling-path-sum.md', title: 'Quest: Minimum Falling Path Sum', slug: 'minimum-falling-path-sum', lc: 931, name: 'Minimum Falling Path Sum', diff: 'Medium', xp: 20, pattern: 'Column-Choice Grid DP' },
    ],
    checkpoint: { xp: 15 },
  },
  {
    day: 12, rank: 'c', dayTitle: 'Subsequence DP — LIS',
    concept: { file: '12-1-subsequence-dp-lis.md', title: 'Subsequence DP — LIS', pattern: 'Longest Increasing Subsequence', stars: 3 },
    quests: [
      { file: '12-2-quest-longest-increasing-subsequence.md', title: 'Quest: Longest Increasing Subsequence', slug: 'longest-increasing-subsequence', lc: 300, name: 'Longest Increasing Subsequence', diff: 'Medium', xp: 20, pattern: 'Classic LIS DP' },
      { file: '12-3-quest-number-of-lis.md', title: 'Quest: Number of Longest Increasing Subsequence', slug: 'number-of-lis', lc: 673, name: 'Number of Longest Increasing Subsequence', diff: 'Medium', xp: 25, pattern: 'LIS + Counting' },
    ],
    checkpoint: { xp: 15 },
  },
  {
    day: 13, rank: 'c', dayTitle: 'Two-Sequence DP — LCS',
    concept: { file: '13-1-two-sequence-dp-lcs.md', title: 'Two-Sequence DP — LCS', pattern: 'Longest Common Subsequence', stars: 3 },
    quests: [
      { file: '13-2-quest-longest-common-subsequence.md', title: 'Quest: Longest Common Subsequence', slug: 'longest-common-subsequence', lc: 1143, name: 'Longest Common Subsequence', diff: 'Medium', xp: 20, pattern: 'Classic LCS DP' },
      { file: '13-3-quest-uncrossed-lines.md', title: 'Quest: Uncrossed Lines', slug: 'uncrossed-lines', lc: 1035, name: 'Uncrossed Lines', diff: 'Medium', xp: 20, pattern: 'LCS in Visual Disguise' },
    ],
    checkpoint: { xp: 15 },
  },
  {
    day: 14, rank: 'c', dayTitle: 'Palindrome DP',
    concept: { file: '14-1-palindrome-dp.md', title: 'Palindrome DP', pattern: 'Palindrome State Design', stars: 4 },
    quests: [
      { file: '14-2-quest-longest-palindromic-substring.md', title: 'Quest: Longest Palindromic Substring', slug: 'longest-palindromic-substring', lc: 5, name: 'Longest Palindromic Substring', diff: 'Medium', xp: 25, pattern: 'Palindrome Expansion/DP' },
      { file: '14-3-quest-palindromic-substrings.md', title: 'Quest: Palindromic Substrings', slug: 'palindromic-substrings', lc: 647, name: 'Palindromic Substrings', diff: 'Medium', xp: 25, pattern: 'Palindrome Counting DP' },
    ],
    checkpoint: { xp: 15 },
  },
  {
    day: 15, rank: 'c', dayTitle: 'String Decision DP',
    concept: { file: '15-1-string-decision-dp.md', title: 'String Decision DP', pattern: 'String Partition DP', stars: 4 },
    quests: [
      { file: '15-2-quest-word-break.md', title: 'Quest: Word Break', slug: 'word-break', lc: 139, name: 'Word Break', diff: 'Medium', xp: 25, pattern: 'String Partition DP' },
      { file: '15-3-quest-longest-palindromic-subsequence.md', title: 'Quest: Longest Palindromic Subsequence', slug: 'longest-palindromic-subsequence', lc: 516, name: 'Longest Palindromic Subsequence', diff: 'Medium', xp: 25, pattern: '2D Palindrome DP' },
    ],
    checkpoint: { xp: 15 },
  },
  {
    day: 16, rank: 'c', dayTitle: 'Sequence DP Variants',
    concept: { file: '16-1-sequence-dp-variants.md', title: 'Sequence DP Variants', pattern: 'Sequence Pattern Recognition', stars: 4 },
    quests: [
      { file: '16-2-quest-wiggle-subsequence.md', title: 'Quest: Wiggle Subsequence', slug: 'wiggle-subsequence', lc: 376, name: 'Wiggle Subsequence', diff: 'Medium', xp: 20, pattern: 'Directional Subsequence DP' },
      { file: '16-3-quest-maximum-length-pair-chain.md', title: 'Quest: Maximum Length of Pair Chain', slug: 'maximum-length-pair-chain', lc: 646, name: 'Maximum Length of Pair Chain', diff: 'Medium', xp: 25, pattern: 'Interval Selection DP' },
    ],
    checkpoint: { xp: 15 },
  },
  // B-RANK — Learn to Transform
  {
    day: 17, rank: 'b', dayTitle: '0/1 Knapsack',
    concept: { file: '17-1-zero-one-knapsack.md', title: '0/1 Knapsack', pattern: 'Select or Skip with Capacity', stars: 4 },
    quests: [
      { file: '17-2-quest-partition-equal-subset-sum.md', title: 'Quest: Partition Equal Subset Sum', slug: 'partition-equal-subset-sum', lc: 416, name: 'Partition Equal Subset Sum', diff: 'Medium', xp: 35, pattern: 'Subset Sum = 0/1 Knapsack' },
      { file: '17-3-quest-target-sum.md', title: 'Quest: Target Sum', slug: 'target-sum', lc: 494, name: 'Target Sum', diff: 'Medium', xp: 35, pattern: 'Knapsack with Signs' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 18, rank: 'b', dayTitle: 'Unbounded Knapsack',
    concept: { file: '18-1-unbounded-knapsack.md', title: 'Unbounded Knapsack', pattern: 'Unlimited Selection', stars: 4 },
    quests: [
      { file: '18-2-quest-coin-change.md', title: 'Quest: Coin Change', slug: 'coin-change', lc: 322, name: 'Coin Change', diff: 'Medium', xp: 35, pattern: 'Minimize Coin Count' },
      { file: '18-3-quest-coin-change-ii.md', title: 'Quest: Coin Change II', slug: 'coin-change-ii', lc: 518, name: 'Coin Change II', diff: 'Medium', xp: 35, pattern: 'Count Combinations' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 19, rank: 'b', dayTitle: 'Knapsack Variants',
    concept: { file: '19-1-knapsack-variants.md', title: 'Knapsack Variants', pattern: 'Multi-Dimensional Knapsack', stars: 4 },
    quests: [
      { file: '19-2-quest-ones-and-zeroes.md', title: 'Quest: Ones and Zeroes', slug: 'ones-and-zeroes', lc: 474, name: 'Ones and Zeroes', diff: 'Medium', xp: 35, pattern: 'Multi-Constraint Knapsack' },
      { file: '19-3-quest-last-stone-weight-ii.md', title: 'Quest: Last Stone Weight II', slug: 'last-stone-weight-ii', lc: 1049, name: 'Last Stone Weight II', diff: 'Medium', xp: 35, pattern: 'Knapsack in Disguise' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 20, rank: 'b', dayTitle: 'State Machine DP',
    concept: { file: '20-1-state-machine-dp.md', title: 'State Machine DP', pattern: 'Multi-State Transitions', stars: 4 },
    quests: [
      { file: '20-2-quest-stock-cooldown.md', title: 'Quest: Best Time to Buy and Sell Stock with Cooldown', slug: 'stock-cooldown', lc: 309, name: 'Best Time to Buy and Sell Stock with Cooldown', diff: 'Medium', xp: 35, pattern: 'State Machine DP' },
      { file: '20-3-quest-stock-fee.md', title: 'Quest: Best Time to Buy and Sell Stock with Transaction Fee', slug: 'stock-fee', lc: 714, name: 'Best Time to Buy and Sell Stock with Transaction Fee', diff: 'Medium', xp: 35, pattern: 'State Machine with Cost' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 21, rank: 'b', dayTitle: 'String Transformation DP',
    concept: { file: '21-1-string-transformation-dp.md', title: 'String Transformation DP', pattern: 'Edit & Transform Operations', stars: 4 },
    quests: [
      { file: '21-2-quest-edit-distance.md', title: 'Quest: Edit Distance', slug: 'edit-distance', lc: 72, name: 'Edit Distance', diff: 'Medium', xp: 35, pattern: 'Classic String Transformation DP' },
      { file: '21-3-quest-minimum-ascii-delete-sum.md', title: 'Quest: Minimum ASCII Delete Sum for Two Strings', slug: 'minimum-ascii-delete-sum', lc: 712, name: 'Minimum ASCII Delete Sum for Two Strings', diff: 'Medium', xp: 35, pattern: 'Cost-Weighted LCS Variant' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 22, rank: 'b', dayTitle: 'Counting & Structural DP',
    concept: { file: '22-1-counting-structural-dp.md', title: 'Counting & Structural DP', pattern: 'Counting Structures / Partition DP', stars: 4 },
    quests: [
      { file: '22-2-quest-unique-bsts.md', title: 'Quest: Unique Binary Search Trees', slug: 'unique-bsts', lc: 96, name: 'Unique Binary Search Trees', diff: 'Medium', xp: 35, pattern: 'Catalan Number DP' },
      { file: '22-3-quest-combination-sum-iv.md', title: 'Quest: Combination Sum IV', slug: 'combination-sum-iv', lc: 377, name: 'Combination Sum IV', diff: 'Medium', xp: 35, pattern: 'Order-Matters Counting' },
    ],
    checkpoint: { xp: 25 },
  },
  // A-RANK — Learn to Synthesize
  {
    day: 23, rank: 'a', dayTitle: 'Advanced String DP',
    concept: { file: '23-1-advanced-string-dp.md', title: 'Advanced String DP', pattern: 'Multi-String Matching', stars: 4 },
    quests: [
      { file: '23-2-quest-interleaving-string.md', title: 'Quest: Interleaving String', slug: 'interleaving-string', lc: 97, name: 'Interleaving String', diff: 'Medium', xp: 35, pattern: 'Two-String Interleave DP' },
      { file: '23-3-quest-delete-operation.md', title: 'Quest: Delete Operation for Two Strings', slug: 'delete-operation', lc: 583, name: 'Delete Operation for Two Strings', diff: 'Medium', xp: 35, pattern: 'LCS-Based String DP' },
    ],
    checkpoint: { xp: 20 },
  },
  {
    day: 24, rank: 'a', dayTitle: 'Counting & State Machine Mastery',
    concept: { file: '24-1-counting-state-machine.md', title: 'Counting & State Machine Mastery', pattern: 'Counting with Constraints', stars: 4 },
    quests: [
      { file: '24-2-quest-dice-rolls-target.md', title: 'Quest: Number of Dice Rolls with Target Sum', slug: 'dice-rolls-target', lc: 1155, name: 'Number of Dice Rolls with Target Sum', diff: 'Medium', xp: 35, pattern: 'Multi-Option Counting DP' },
      { file: '24-3-quest-knight-dialer.md', title: 'Quest: Knight Dialer', slug: 'knight-dialer', lc: 935, name: 'Knight Dialer', diff: 'Medium', xp: 35, pattern: 'State Machine on Graph' },
    ],
    checkpoint: { xp: 20 },
  },
  {
    day: 25, rank: 'a', dayTitle: 'Multi-Dimensional State DP',
    concept: { file: '25-1-multi-dimensional-state.md', title: 'Multi-Dimensional State DP', pattern: '3+ State Dimensions', stars: 5 },
    quests: [
      { file: '25-2-quest-longest-string-chain.md', title: 'Quest: Longest String Chain', slug: 'longest-string-chain', lc: 1048, name: 'Longest String Chain', diff: 'Medium', xp: 35, pattern: 'Sort + Subsequence DP' },
      { file: '25-3-quest-out-of-boundary-paths.md', title: 'Quest: Out of Boundary Paths', slug: 'out-of-boundary-paths', lc: 576, name: 'Out of Boundary Paths', diff: 'Medium', xp: 40, pattern: '3D State Grid DP' },
    ],
    checkpoint: { xp: 20 },
  },
  {
    day: 26, rank: 'a', dayTitle: 'DP Pattern Synthesis',
    concept: { file: '26-1-dp-pattern-synthesis.md', title: 'DP Pattern Synthesis', pattern: 'Cross-Pattern Recognition', stars: 5 },
    quests: [
      { file: '26-2-quest-arithmetic-slices.md', title: 'Quest: Arithmetic Slices', slug: 'arithmetic-slices', lc: 413, name: 'Arithmetic Slices', diff: 'Medium', xp: 35, pattern: 'Counting Sequences DP' },
      { file: '26-3-quest-domino-tromino-tiling.md', title: 'Quest: Domino and Tromino Tiling', slug: 'domino-tromino-tiling', lc: 790, name: 'Domino and Tromino Tiling', diff: 'Medium', xp: 35, pattern: 'Tiling Recurrence DP' },
    ],
    checkpoint: { xp: 20 },
  },
  {
    day: 27, rank: 'a', dayTitle: 'Interview Simulation',
    concept: { file: '27-1-interview-simulation.md', title: 'Interview Simulation', pattern: 'Speed Pattern Recognition', stars: 5 },
    quests: [
      { file: '27-2-quest-jump-game-ii.md', title: 'Quest: Jump Game II', slug: 'jump-game-ii', lc: 45, name: 'Jump Game II', diff: 'Medium', xp: 40, pattern: 'Greedy/DP Dual Approach' },
      { file: '27-3-quest-minimum-cost-for-tickets.md', title: 'Quest: Minimum Cost for Tickets', slug: 'minimum-cost-for-tickets', lc: 983, name: 'Minimum Cost for Tickets', diff: 'Medium', xp: 40, pattern: 'Multi-Option Decision DP' },
    ],
    checkpoint: { xp: 20 },
  },
  // S-RANK — The Dynamic Ascension
  {
    day: 28, rank: 's', dayTitle: 'DP Synthesis I',
    concept: { file: '28-1-dp-synthesis-i.md', title: 'DP Synthesis I', pattern: 'Advanced 2D DP', stars: 5 },
    quests: [
      { file: '28-2-quest-maximal-square.md', title: 'Quest: Maximal Square', slug: 'maximal-square', lc: 221, name: 'Maximal Square', diff: 'Medium', xp: 50, pattern: '2D Grid DP Synthesis' },
      { file: '28-3-quest-partition-array-max-sum.md', title: 'Quest: Partition Array for Maximum Sum', slug: 'partition-array-max-sum', lc: 1043, name: 'Partition Array for Maximum Sum', diff: 'Medium', xp: 50, pattern: 'Interval-Style Partition DP' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 29, rank: 's', dayTitle: 'DP Synthesis II',
    concept: { file: '29-1-dp-synthesis-ii.md', title: 'DP Synthesis II', pattern: 'Complex String & Interval DP', stars: 5 },
    quests: [
      { file: '29-2-quest-distinct-subsequences.md', title: 'Quest: Distinct Subsequences', slug: 'distinct-subsequences', lc: 115, name: 'Distinct Subsequences', diff: 'Hard', xp: 60, pattern: 'Advanced String DP' },
      { file: '29-3-quest-stock-iii.md', title: 'Quest: Best Time to Buy and Sell Stock III', slug: 'stock-iii', lc: 123, name: 'Best Time to Buy and Sell Stock III', diff: 'Hard', xp: 60, pattern: 'K-Transaction State Machine' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 30, rank: 's', dayTitle: 'The Final Ascension',
    concept: { file: '30-1-final-ascension.md', title: 'The Final Ascension', pattern: 'Multi-Pattern Synthesis', stars: 5 },
    quests: [
      { file: '30-2-quest-longest-increasing-path.md', title: 'Quest: Longest Increasing Path in a Matrix', slug: 'longest-increasing-path', lc: 329, name: 'Longest Increasing Path in a Matrix', diff: 'Hard', xp: 60, pattern: 'Grid DFS + Memoization' },
      { file: '30-3-quest-burst-balloons.md', title: 'Quest: Burst Balloons', slug: 'burst-balloons', lc: 312, name: 'Burst Balloons', diff: 'Hard', xp: 60, pattern: 'Interval DP' },
    ],
    checkpoint: { xp: 25 },
  },
];

export const RANK_TESTS = {
  e: {
    day: 6, dayTitle: 'E-Rank Test',
    tests: [
      { file: 'test-1-range-sum-query.md', title: 'Test: Range Sum Query - Immutable', lc: 303, name: 'Range Sum Query - Immutable', diff: 'Easy', xp: 100 },
      { file: 'test-2-divisor-game.md', title: 'Test: Divisor Game', lc: 1025, name: 'Divisor Game', diff: 'Easy', xp: 100 },
      { file: 'test-3-is-subsequence.md', title: 'Test: Is Subsequence', lc: 392, name: 'Is Subsequence', diff: 'Easy', xp: 100 },
    ],
    complete: { file: 'rank-e-complete.md', day: 7 },
  },
  d: {
    day: 11, dayTitle: 'D-Rank Test',
    tests: [
      { file: 'd-test-1-jump-game.md', title: 'Test: Jump Game', lc: 55, name: 'Jump Game', diff: 'Medium', xp: 100 },
      { file: 'd-test-2-max-sum-circular.md', title: 'Test: Maximum Sum Circular Subarray', lc: 918, name: 'Maximum Sum Circular Subarray', diff: 'Medium', xp: 100 },
      { file: 'd-test-3-ugly-number-ii.md', title: 'Test: Ugly Number II', lc: 264, name: 'Ugly Number II', diff: 'Medium', xp: 100 },
    ],
    complete: { file: 'rank-d-complete.md', day: 12 },
  },
  c: {
    day: 17, dayTitle: 'C-Rank Test',
    tests: [
      { file: 'c-test-1-count-square-submatrices.md', title: 'Test: Count Square Submatrices', lc: 1277, name: 'Count Square Submatrices with All Ones', diff: 'Medium', xp: 150 },
      { file: 'c-test-2-longest-arithmetic-subseq.md', title: 'Test: Longest Arithmetic Subsequence', lc: 1027, name: 'Longest Arithmetic Subsequence', diff: 'Medium', xp: 150 },
      { file: 'c-test-3-flip-string-monotone.md', title: 'Test: Flip String to Monotone Increasing', lc: 926, name: 'Flip String to Monotone Increasing', diff: 'Medium', xp: 150 },
    ],
    complete: { file: 'rank-c-complete.md', day: 18 },
  },
  b: {
    day: 23, dayTitle: 'B-Rank Test',
    tests: [
      { file: 'b-test-1-two-keys-keyboard.md', title: 'Test: 2 Keys Keyboard', lc: 650, name: '2 Keys Keyboard', diff: 'Medium', xp: 200 },
      { file: 'b-test-2-max-length-positive-product.md', title: 'Test: Maximum Length of Subarray With Positive Product', lc: 1567, name: 'Maximum Length of Subarray With Positive Product', diff: 'Medium', xp: 200 },
      { file: 'b-test-3-guess-number.md', title: 'Test: Guess Number Higher or Lower II', lc: 375, name: 'Guess Number Higher or Lower II', diff: 'Medium', xp: 200 },
    ],
    complete: { file: 'rank-b-complete.md', day: 24 },
  },
  a: {
    day: 28, dayTitle: 'A-Rank Test',
    tests: [
      { file: 'a-test-1-min-cost-tree-leaf.md', title: 'Test: Minimum Cost Tree From Leaf Values', lc: 1130, name: 'Minimum Cost Tree From Leaf Values', diff: 'Medium', xp: 250 },
      { file: 'a-test-2-champagne-tower.md', title: 'Test: Champagne Tower', lc: 799, name: 'Champagne Tower', diff: 'Medium', xp: 250 },
      { file: 'a-test-3-stone-game.md', title: 'Test: Stone Game', lc: 877, name: 'Stone Game', diff: 'Medium', xp: 250 },
    ],
    complete: { file: 'rank-a-complete.md', day: 29 },
  },
  s: {
    day: 31, dayTitle: 'S-Rank Test',
    tests: [
      { file: 's-test-1-min-difficulty-job.md', title: 'Test: Minimum Difficulty of a Job Schedule', lc: 1335, name: 'Minimum Difficulty of a Job Schedule', diff: 'Hard', xp: 300 },
      { file: 's-test-2-longest-valid-parens.md', title: 'Test: Longest Valid Parentheses', lc: 32, name: 'Longest Valid Parentheses', diff: 'Hard', xp: 300 },
      { file: 's-test-3-palindrome-partition-ii.md', title: 'Test: Palindrome Partitioning II', lc: 132, name: 'Palindrome Partitioning II', diff: 'Hard', xp: 300 },
    ],
    complete: { file: 'rank-s-complete.md', day: 32 },
  },
};

export const E_RANK_PATTERNS = [
  'Overlapping Subproblems Recognition',
  'Top-Down Memoization (Caching)',
  'Bottom-Up Tabulation (Table Filling)',
  'State Definition & Recurrence Design',
  'Optimal Decision Making',
];

export const D_RANK_PATTERNS = [
  'Take/Skip Decision DP',
  'Path Counting / Decomposition DP',
  'Min/Max Cost Optimization DP',
  'Circular & Dual-State DP',
  'Multi-Option Decision DP',
];

export const C_RANK_PATTERNS = [
  'Grid DP (2D State Tables)',
  'Longest Increasing Subsequence',
  'Longest Common Subsequence (Two-Sequence DP)',
  'Palindrome DP (Substring & Subsequence)',
  'String Partition DP',
  'Sequence DP Variants',
];

export const B_RANK_PATTERNS = [
  '0/1 Knapsack (Select or Skip)',
  'Unbounded Knapsack (Unlimited Selection)',
  'Multi-Dimensional Knapsack',
  'State Machine DP (Stock Trading)',
  'String Transformation DP (Edit Distance)',
  'Counting & Structural DP',
];

export const A_RANK_PATTERNS = [
  'Multi-String DP',
  'Counting with Constraints',
  'Multi-Dimensional State DP',
  'Cross-Pattern Composition',
  'Interview Speed Recognition',
];

export const S_RANK_PATTERNS = [
  'Advanced 2D DP Synthesis',
  'Interval DP (Partition/Range)',
  'Complex String DP',
  'Hard-Level State Design',
  'Multi-Pattern Decision Tree',
];

export const DP_CHEAT_SHEET = [
  ['"how many ways" / "count paths" / "counting"', 'Counting DP — dp[i] = sum of valid transitions'],
  ['"minimum cost" / "cheapest" / "fewest"', 'Min-cost DP — dp[i] = min(options) + cost'],
  ['"maximum profit" / "best score" / "longest"', 'Max-value DP — dp[i] = max(options)'],
  ['"take or skip" / "rob houses" / "select items"', '0/1 Knapsack — dp[i] = max(take, skip)'],
  ['"unlimited supply" / "coins" / "denominations"', 'Unbounded Knapsack — try all items at each amount'],
  ['"longest increasing" / "subsequence"', 'LIS — dp[i] = max(dp[j]+1) for valid j < i'],
  ['"longest common" / "two strings"', 'LCS — 2D DP on two sequences'],
  ['"palindrome" / "reads same"', 'Palindrome DP — expand or dp[i][j]'],
  ['"grid" / "path" / "top-left to bottom-right"', 'Grid DP — dp[i][j] from neighbors'],
  ['"buy and sell" / "stock" / "transaction"', 'State Machine DP — hold/sold/rest states'],
  ['"transform" / "edit distance" / "operations"', 'String DP — insert/delete/replace choices'],
  ['"partition into" / "subset sum" / "target"', 'Subset Sum DP — include/exclude with capacity'],
];
