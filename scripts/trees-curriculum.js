/**
 * Trees Ascension — curriculum source of truth
 * Used by build-trees-course.js to generate markdown + trees-content.js
 */

export const RANK_THEMES = {
  e: { label: 'E-Rank', theme: 'Learn to Traverse', title: 'Sapling' },
  d: { label: 'D-Rank', theme: 'Learn to Recurse', title: 'Branch Walker' },
  c: { label: 'C-Rank', theme: 'Learn to Decide', title: 'Forest Guard' },
  b: { label: 'B-Rank', theme: 'Learn to Transform', title: 'Canopy Commander' },
  a: { label: 'A-Rank', theme: 'Learn to Combine', title: 'Ancient Oak' },
  s: { label: 'S-Rank', theme: 'The Final Ascension', title: 'Forest Legend' },
};

export const DAYS = [
  // E-RANK
  {
    day: 1, rank: 'e', dayTitle: 'The Tree Mental Model',
    concept: { file: '01-1-tree-mental-model.md', title: 'The Tree Mental Model', pattern: 'Tree Mental Model', stars: 1 },
    quests: [
      { file: '01-2-quest-max-depth.md', title: 'Quest: Maximum Depth', slug: 'max-depth', lc: 104, name: 'Maximum Depth of Binary Tree', diff: 'Easy', xp: 10, pattern: 'Bottom-Up Recursion' },
      { file: '01-3-quest-invert-tree.md', title: 'Quest: Invert Binary Tree', slug: 'invert-tree', lc: 226, name: 'Invert Binary Tree', diff: 'Easy', xp: 10, pattern: 'Recursive Tree Modification' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 2, rank: 'e', dayTitle: 'DFS Traversals',
    concept: { file: '02-1-dfs-traversals.md', title: 'DFS: Inorder, Preorder, Postorder', pattern: 'DFS Traversals', stars: 2 },
    quests: [
      { file: '02-2-quest-inorder.md', title: 'Quest: Inorder Traversal', slug: 'inorder', lc: 94, name: 'Binary Tree Inorder Traversal', diff: 'Easy', xp: 10, pattern: 'Inorder DFS' },
      { file: '02-3-quest-preorder.md', title: 'Quest: Preorder Traversal', slug: 'preorder', lc: 144, name: 'Binary Tree Preorder Traversal', diff: 'Easy', xp: 10, pattern: 'Preorder DFS' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 3, rank: 'e', dayTitle: 'BFS Level-Order',
    concept: { file: '03-1-bfs-level-order.md', title: 'BFS: Level-Order Traversal', pattern: 'BFS Level-Order', stars: 2 },
    quests: [
      { file: '03-2-quest-level-order.md', title: 'Quest: Level Order Traversal', slug: 'level-order', lc: 102, name: 'Binary Tree Level Order Traversal', diff: 'Medium', xp: 10, pattern: 'BFS with Queue' },
      { file: '03-3-quest-avg-levels.md', title: 'Quest: Average of Levels', slug: 'avg-levels', lc: 637, name: 'Average of Levels in Binary Tree', diff: 'Easy', xp: 10, pattern: 'BFS Level Computation' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 4, rank: 'e', dayTitle: 'Tree Properties',
    concept: { file: '04-1-bottom-up-recursion.md', title: 'Tree Properties via Recursion', pattern: 'Bottom-Up Recursion', stars: 2 },
    quests: [
      { file: '04-2-quest-balanced-tree.md', title: 'Quest: Balanced Binary Tree', slug: 'balanced-tree', lc: 110, name: 'Balanced Binary Tree', diff: 'Easy', xp: 15, pattern: 'Bottom-Up Height Check' },
      { file: '04-3-quest-count-nodes.md', title: 'Quest: Count Complete Tree Nodes', slug: 'count-nodes', lc: 222, name: 'Count Complete Tree Nodes', diff: 'Medium', xp: 10, pattern: 'Complete Tree Properties' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 5, rank: 'e', dayTitle: 'Tree Comparison',
    concept: { file: '05-1-parallel-recursion.md', title: 'Same Tree & Subtree Patterns', pattern: 'Parallel Tree Recursion', stars: 2 },
    quests: [
      { file: '05-2-quest-same-tree.md', title: 'Quest: Same Tree', slug: 'same-tree', lc: 100, name: 'Same Tree', diff: 'Easy', xp: 10, pattern: 'Parallel Recursion' },
      { file: '05-3-quest-symmetric-tree.md', title: 'Quest: Symmetric Tree', slug: 'symmetric-tree', lc: 101, name: 'Symmetric Tree', diff: 'Easy', xp: 10, pattern: 'Mirror Recursion' },
    ],
    checkpoint: { xp: 10 },
  },
  // D-RANK
  {
    day: 6, rank: 'd', dayTitle: 'Top-Down DFS',
    concept: { file: '06-1-top-down-dfs.md', title: 'Top-Down DFS: Passing State Downward', pattern: 'Top-Down DFS', stars: 3 },
    quests: [
      { file: '06-2-quest-path-sum-ii.md', title: 'Quest: Path Sum II', slug: 'path-sum-ii', lc: 113, name: 'Path Sum II', diff: 'Medium', xp: 15, pattern: 'Top-Down with Backtracking' },
      { file: '06-3-quest-root-to-leaf.md', title: 'Quest: Sum Root to Leaf Numbers', slug: 'root-to-leaf', lc: 129, name: 'Sum Root to Leaf Numbers', diff: 'Medium', xp: 15, pattern: 'Top-Down Accumulation' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 7, rank: 'd', dayTitle: 'Bottom-Up DFS',
    concept: { file: '07-1-bottom-up-global.md', title: 'Bottom-Up DFS: Gathering Results Upward', pattern: 'Bottom-Up with Global Update', stars: 3 },
    quests: [
      { file: '07-2-quest-diameter.md', title: 'Quest: Diameter of Binary Tree', slug: 'diameter', lc: 543, name: 'Diameter of Binary Tree', diff: 'Easy', xp: 15, pattern: 'Bottom-Up with Global Update' },
      { file: '07-3-quest-max-path-sum.md', title: 'Quest: Maximum Path Sum', slug: 'max-path-sum', lc: 124, name: 'Binary Tree Maximum Path Sum', diff: 'Hard', xp: 20, pattern: 'Bottom-Up Path Optimization' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 8, rank: 'd', dayTitle: 'Tree Construction',
    concept: { file: '08-1-recursive-construction.md', title: 'Recursive Construction: Building Trees', pattern: 'Recursive Construction', stars: 3 },
    quests: [
      { file: '08-2-quest-preorder-inorder.md', title: 'Quest: Construct from Preorder & Inorder', slug: 'preorder-inorder', lc: 105, name: 'Construct Binary Tree from Preorder and Inorder Traversal', diff: 'Medium', xp: 20, pattern: 'Divide and Conquer Construction' },
      { file: '08-3-quest-inorder-postorder.md', title: 'Quest: Construct from Inorder & Postorder', slug: 'inorder-postorder', lc: 106, name: 'Construct Binary Tree from Inorder and Postorder Traversal', diff: 'Medium', xp: 20, pattern: 'Reverse Construction' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 9, rank: 'd', dayTitle: 'Level-Order Patterns',
    concept: { file: '09-1-bfs-variations.md', title: 'Level-Order Patterns', pattern: 'BFS Template Variations', stars: 3 },
    quests: [
      { file: '09-2-quest-right-side-view.md', title: 'Quest: Right Side View', slug: 'right-side-view', lc: 199, name: 'Binary Tree Right Side View', diff: 'Medium', xp: 15, pattern: 'BFS Last Per Level' },
      { file: '09-3-quest-zigzag.md', title: 'Quest: Zigzag Level Order', slug: 'zigzag', lc: 103, name: 'Binary Tree Zigzag Level Order Traversal', diff: 'Medium', xp: 15, pattern: 'BFS Direction Alternation' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 10, rank: 'd', dayTitle: 'Recursion vs Iteration',
    concept: { file: '10-1-iterative-dfs.md', title: 'Recursion vs Iteration Trade-offs', pattern: 'Iterative DFS with Stack', stars: 3 },
    quests: [
      { file: '10-2-quest-postorder.md', title: 'Quest: Postorder Traversal', slug: 'postorder', lc: 145, name: 'Binary Tree Postorder Traversal', diff: 'Easy', xp: 15, pattern: 'Iterative Postorder' },
      { file: '10-3-quest-flatten-tree.md', title: 'Quest: Flatten Binary Tree', slug: 'flatten-tree', lc: 114, name: 'Flatten Binary Tree to Linked List', diff: 'Medium', xp: 20, pattern: 'In-Place Tree Rewiring' },
    ],
    checkpoint: { xp: 10 },
  },
  // C-RANK
  {
    day: 11, rank: 'c', dayTitle: 'BST Fundamentals',
    concept: { file: '11-1-bst-fundamentals.md', title: 'BST Fundamentals: Search & Validate', pattern: 'BST Invariant & Search', stars: 3 },
    quests: [
      { file: '11-2-quest-validate-bst.md', title: 'Quest: Validate BST', slug: 'validate-bst', lc: 98, name: 'Validate Binary Search Tree', diff: 'Medium', xp: 20, pattern: 'BST Range Validation' },
      { file: '11-3-quest-search-bst.md', title: 'Quest: Search in BST', slug: 'search-bst', lc: 700, name: 'Search in a Binary Search Tree', diff: 'Easy', xp: 10, pattern: 'BST Binary Search' },
    ],
    checkpoint: { xp: 15 },
  },
  {
    day: 12, rank: 'c', dayTitle: 'BST Operations',
    concept: { file: '12-1-bst-operations.md', title: 'BST Operations: Insert, Delete, Kth', pattern: 'BST Modification', stars: 3 },
    quests: [
      { file: '12-2-quest-kth-smallest.md', title: 'Quest: Kth Smallest in BST', slug: 'kth-smallest', lc: 230, name: 'Kth Smallest Element in a BST', diff: 'Medium', xp: 20, pattern: 'Inorder Early Termination' },
      { file: '12-3-quest-delete-node.md', title: 'Quest: Delete Node in BST', slug: 'delete-node', lc: 450, name: 'Delete Node in a BST', diff: 'Medium', xp: 25, pattern: 'BST Delete Cases' },
    ],
    checkpoint: { xp: 15 },
  },
  {
    day: 13, rank: 'c', dayTitle: 'Lowest Common Ancestor',
    concept: { file: '13-1-lca-pattern.md', title: 'Lowest Common Ancestor', pattern: 'LCA Pattern', stars: 3 },
    quests: [
      { file: '13-2-quest-lca-binary.md', title: 'Quest: LCA of Binary Tree', slug: 'lca-binary', lc: 236, name: 'Lowest Common Ancestor of a Binary Tree', diff: 'Medium', xp: 20, pattern: 'LCA Split Detection' },
      { file: '13-3-quest-lca-bst.md', title: 'Quest: LCA of BST', slug: 'lca-bst', lc: 235, name: 'Lowest Common Ancestor of a Binary Search Tree', diff: 'Medium', xp: 15, pattern: 'BST LCA Walk' },
    ],
    checkpoint: { xp: 15 },
  },
  {
    day: 14, rank: 'c', dayTitle: 'Path Problems',
    concept: { file: '14-1-path-problems.md', title: 'Path Problems: Root-to-Leaf & Any-to-Any', pattern: 'Path Sum Patterns', stars: 4 },
    quests: [
      { file: '14-2-quest-path-sum-iii.md', title: 'Quest: Path Sum III', slug: 'path-sum-iii', lc: 437, name: 'Path Sum III', diff: 'Medium', xp: 25, pattern: 'Prefix Sum on Trees' },
      { file: '14-3-quest-univalue-path.md', title: 'Quest: Longest Univalue Path', slug: 'univalue-path', lc: 687, name: 'Longest Univalue Path', diff: 'Medium', xp: 25, pattern: 'Bottom-Up Path Length' },
    ],
    checkpoint: { xp: 15 },
  },
  {
    day: 15, rank: 'c', dayTitle: 'Tree Coordinates',
    concept: { file: '15-1-coordinate-traversal.md', title: 'Tree Width, Depth & Coordinates', pattern: 'Coordinate-Based Traversal', stars: 4 },
    quests: [
      { file: '15-2-quest-vertical-order.md', title: 'Quest: Vertical Order Traversal', slug: 'vertical-order', lc: 987, name: 'Vertical Order Traversal of a Binary Tree', diff: 'Hard', xp: 25, pattern: 'Column Coordinate BFS' },
      { file: '15-3-quest-boundary.md', title: 'Quest: Boundary of Binary Tree', slug: 'boundary', lc: 545, name: 'Boundary of Binary Tree', diff: 'Medium', xp: 20, pattern: 'Boundary DFS' },
    ],
    checkpoint: { xp: 15 },
  },
  {
    day: 16, rank: 'c', dayTitle: 'Serialization',
    concept: { file: '16-1-serialization.md', title: 'Tree Serialization & Deserialization', pattern: 'Serialization/Encoding', stars: 4 },
    quests: [
      { file: '16-2-quest-serialize.md', title: 'Quest: Serialize & Deserialize', slug: 'serialize', lc: 297, name: 'Serialize and Deserialize Binary Tree', diff: 'Hard', xp: 25, pattern: 'Preorder with Null Markers' },
      { file: '16-3-quest-bst-preorder.md', title: 'Quest: BST from Preorder', slug: 'bst-preorder', lc: 1008, name: 'Construct Binary Search Tree from Preorder Traversal', diff: 'Medium', xp: 20, pattern: 'BST Construction' },
    ],
    checkpoint: { xp: 15 },
  },
  // B-RANK
  {
    day: 17, rank: 'b', dayTitle: 'Tree Views',
    concept: { file: '17-1-tree-views.md', title: 'Tree Views and Projections', pattern: 'Tree Views/Projections', stars: 4 },
    quests: [
      { file: '17-2-quest-bottom-left.md', title: 'Quest: Bottom Left Tree Value', slug: 'bottom-left', lc: 513, name: 'Find Bottom Left Tree Value', diff: 'Medium', xp: 35, pattern: 'BFS Level-End Tracking' },
      { file: '17-3-quest-vertical-order-ii.md', title: 'Quest: Vertical Order Traversal II', slug: 'vertical-order-ii', lc: 314, name: 'Binary Tree Vertical Order Traversal', diff: 'Medium', xp: 35, pattern: 'Column BFS' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 18, rank: 'b', dayTitle: 'Tree Manipulation',
    concept: { file: '18-1-tree-manipulation.md', title: 'Tree Manipulation: Merge & Transform', pattern: 'Tree Merge/Transform', stars: 4 },
    quests: [
      { file: '18-2-quest-merge-trees.md', title: 'Quest: Merge Two Binary Trees', slug: 'merge-trees', lc: 617, name: 'Merge Two Binary Trees', diff: 'Easy', xp: 25, pattern: 'Parallel Construction' },
      { file: '18-3-quest-greater-tree.md', title: 'Quest: Convert BST to Greater Tree', slug: 'greater-tree', lc: 538, name: 'Convert BST to Greater Tree', diff: 'Medium', xp: 35, pattern: 'Reverse Inorder' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 19, rank: 'b', dayTitle: 'N-ary Trees & Tries',
    concept: { file: '19-1-trie-structures.md', title: 'N-ary Trees and Trie Structures', pattern: 'Trie (Prefix Tree)', stars: 4 },
    quests: [
      { file: '19-2-quest-implement-trie.md', title: 'Quest: Implement Trie', slug: 'implement-trie', lc: 208, name: 'Implement Trie (Prefix Tree)', diff: 'Medium', xp: 35, pattern: 'Trie Design' },
      { file: '19-3-quest-nary-depth.md', title: 'Quest: N-ary Tree Depth', slug: 'nary-depth', lc: 559, name: 'Maximum Depth of N-ary Tree', diff: 'Easy', xp: 25, pattern: 'N-ary Recursion' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 20, rank: 'b', dayTitle: 'Tree DP',
    concept: { file: '20-1-tree-dp.md', title: 'Tree DP: Optimal Substructure', pattern: 'Tree DP', stars: 4 },
    quests: [
      { file: '20-2-quest-house-robber.md', title: 'Quest: House Robber III', slug: 'house-robber', lc: 337, name: 'House Robber III', diff: 'Medium', xp: 35, pattern: 'Tree DP Rob/Skip' },
      { file: '20-3-quest-zigzag-path.md', title: 'Quest: Longest ZigZag Path', slug: 'zigzag-path', lc: 1372, name: 'Longest ZigZag Path in a Binary Tree', diff: 'Medium', xp: 45, pattern: 'Direction State DP' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 21, rank: 'b', dayTitle: 'Subtree Patterns',
    concept: { file: '21-1-subtree-patterns.md', title: 'Subtree Patterns: Sum, Count, Compare', pattern: 'Subtree Aggregation', stars: 4 },
    quests: [
      { file: '21-2-quest-subtree-sum.md', title: 'Quest: Most Frequent Subtree Sum', slug: 'subtree-sum', lc: 508, name: 'Most Frequent Subtree Sum', diff: 'Medium', xp: 35, pattern: 'Subtree Sum + Frequency' },
      { file: '21-3-quest-good-nodes.md', title: 'Quest: Count Good Nodes', slug: 'good-nodes', lc: 1448, name: 'Count Good Nodes in Binary Tree', diff: 'Medium', xp: 35, pattern: 'Top-Down Max Tracking' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 22, rank: 'b', dayTitle: 'Advanced BFS',
    concept: { file: '22-1-tree-as-graph.md', title: 'Advanced BFS: Tree as Graph', pattern: 'Tree-as-Graph BFS', stars: 4 },
    quests: [
      { file: '22-2-quest-cousins.md', title: 'Quest: Cousins in Binary Tree', slug: 'cousins', lc: 993, name: 'Cousins in Binary Tree', diff: 'Easy', xp: 35, pattern: 'BFS Parent Tracking' },
      { file: '22-3-quest-deepest-sum.md', title: 'Quest: Deepest Leaves Sum', slug: 'deepest-sum', lc: 1302, name: 'Deepest Leaves Sum', diff: 'Medium', xp: 35, pattern: 'BFS Depth Accumulation' },
    ],
    checkpoint: { xp: 25 },
  },
  // A-RANK
  {
    day: 23, rank: 'a', dayTitle: 'BST Augmentation',
    concept: { file: '23-1-bst-iterator.md', title: 'BST Augmentation & Iterator Patterns', pattern: 'BST Iterator/Augmentation', stars: 4 },
    quests: [
      { file: '23-2-quest-closest-bst.md', title: 'Quest: Closest BST Value', slug: 'closest-bst', lc: 270, name: 'Closest Binary Search Tree Value', diff: 'Easy', xp: 30, pattern: 'BST Navigation' },
      { file: '23-3-quest-inorder-successor.md', title: 'Quest: Inorder Successor in BST', slug: 'inorder-successor', lc: 285, name: 'Inorder Successor in BST', diff: 'Medium', xp: 40, pattern: 'BST Successor Logic' },
    ],
    checkpoint: { xp: 20 },
  },
  {
    day: 24, rank: 'a', dayTitle: 'Advanced Trie',
    concept: { file: '24-1-advanced-trie.md', title: 'Advanced Trie Applications', pattern: 'Advanced Trie', stars: 4 },
    quests: [
      { file: '24-2-quest-word-dictionary.md', title: 'Quest: Add and Search Words', slug: 'word-dictionary', lc: 211, name: 'Design Add and Search Words Data Structure', diff: 'Medium', xp: 30, pattern: 'Trie + Wildcard DFS' },
      { file: '24-3-quest-replace-words.md', title: 'Quest: Replace Words', slug: 'replace-words', lc: 648, name: 'Replace Words', diff: 'Medium', xp: 30, pattern: 'Trie Prefix Matching' },
    ],
    checkpoint: { xp: 20 },
  },
  {
    day: 25, rank: 'a', dayTitle: 'Tree Distance',
    concept: { file: '25-1-tree-distance.md', title: 'Tree Distance and Diameter', pattern: 'Tree Distance/Diameter', stars: 5 },
    quests: [
      { file: '25-2-quest-sum-distances.md', title: 'Quest: Sum of Distances in Tree', slug: 'sum-distances', lc: 834, name: 'Sum of Distances in Tree', diff: 'Hard', xp: 40, pattern: 'Re-rooting Technique' },
      { file: '25-3-quest-diff-chars-path.md', title: 'Quest: Longest Path Different Chars', slug: 'diff-chars-path', lc: 2246, name: 'Longest Path With Different Adjacent Characters', diff: 'Hard', xp: 50, pattern: 'N-ary Diameter Variant' },
    ],
    checkpoint: { xp: 20 },
  },
  {
    day: 26, rank: 'a', dayTitle: 'Morris Traversal',
    concept: { file: '26-1-morris-traversal.md', title: 'Morris Traversal & Space-Optimal Techniques', pattern: 'Morris Traversal', stars: 5 },
    quests: [
      { file: '26-2-quest-recover-bst.md', title: 'Quest: Recover BST', slug: 'recover-bst', lc: 99, name: 'Recover Binary Search Tree', diff: 'Medium', xp: 30, pattern: 'Inorder Anomaly Detection' },
      { file: '26-3-quest-sorted-list-bst.md', title: 'Quest: Sorted List to BST', slug: 'sorted-list-bst', lc: 109, name: 'Convert Sorted List to Binary Search Tree', diff: 'Medium', xp: 30, pattern: 'Balanced BST Construction' },
    ],
    checkpoint: { xp: 20 },
  },
  {
    day: 27, rank: 'a', dayTitle: 'Tree + Graph Hybrid',
    concept: { file: '27-1-tree-graph-hybrid.md', title: 'Tree + Graph Hybrid Patterns', pattern: 'Tree-Graph Hybrid', stars: 5 },
    quests: [
      { file: '27-2-quest-infected-tree.md', title: 'Quest: Time to Infect Tree', slug: 'infected-tree', lc: 2385, name: 'Amount of Time for Binary Tree to Be Infected', diff: 'Medium', xp: 30, pattern: 'Multi-Directional BFS' },
      { file: '27-3-quest-step-directions.md', title: 'Quest: Step-by-Step Directions', slug: 'step-directions', lc: 2096, name: 'Step-by-Step Directions from a Binary Tree Node to Another', diff: 'Medium', xp: 30, pattern: 'LCA + Path Construction' },
    ],
    checkpoint: { xp: 20 },
  },
  // S-RANK
  {
    day: 28, rank: 's', dayTitle: 'Tree Synthesis I',
    concept: { file: '28-1-tree-synthesis-i.md', title: 'Tree Synthesis I: Recursion + Data Structures', pattern: 'Multi-Pattern Synthesis', stars: 5 },
    quests: [
      { file: '28-2-quest-consecutive-seq.md', title: 'Quest: Longest Consecutive Sequence', slug: 'consecutive-seq', lc: 298, name: 'Binary Tree Longest Consecutive Sequence', diff: 'Medium', xp: 40, pattern: 'DFS + Running State' },
      { file: '28-3-quest-max-sum-bst.md', title: 'Quest: Maximum Sum BST', slug: 'max-sum-bst', lc: 1373, name: 'Maximum Sum BST in Binary Tree', diff: 'Hard', xp: 60, pattern: 'Tree DP + BST Validation' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 29, rank: 's', dayTitle: 'Tree Synthesis II',
    concept: { file: '29-1-tree-synthesis-ii.md', title: 'Tree Synthesis II: Design + Traversal', pattern: 'Design Synthesis', stars: 5 },
    quests: [
      { file: '29-2-quest-magic-dictionary.md', title: 'Quest: Magic Dictionary', slug: 'magic-dictionary', lc: 676, name: 'Implement Magic Dictionary', diff: 'Medium', xp: 40, pattern: 'Trie + Wildcard Design' },
      { file: '29-3-quest-quad-tree.md', title: 'Quest: Construct Quad Tree', slug: 'quad-tree', lc: 427, name: 'Construct Quad Tree', diff: 'Medium', xp: 60, pattern: 'Divide and Conquer Tree Build' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 30, rank: 's', dayTitle: 'Final Ascension',
    concept: { file: '30-1-final-ascension.md', title: 'The Final Ascension', pattern: 'Pattern Decision Tree', stars: 5 },
    quests: [
      { file: '30-2-quest-distribute-coins.md', title: 'Quest: Distribute Coins', slug: 'distribute-coins', lc: 979, name: 'Distribute Coins in Binary Tree', diff: 'Medium', xp: 40, pattern: 'Bottom-Up Greedy Moves' },
      { file: '30-3-quest-smallest-genetic.md', title: 'Quest: Smallest Missing Genetic Value', slug: 'smallest-genetic', lc: 2003, name: 'Smallest Missing Genetic Value in Each Subtree', diff: 'Hard', xp: 60, pattern: 'Subtree Set Aggregation' },
    ],
    checkpoint: { xp: 25 },
  },
];

export const RANK_TESTS = {
  e: {
    day: 6, dayTitle: 'E-Rank Test',
    tests: [
      { file: 'test-1-subtree.md', title: 'Test: Subtree of Another Tree', lc: 572, name: 'Subtree of Another Tree', diff: 'Easy', xp: 100 },
      { file: 'test-2-min-depth.md', title: 'Test: Minimum Depth', lc: 111, name: 'Minimum Depth of Binary Tree', diff: 'Easy', xp: 100 },
      { file: 'test-3-path-sum.md', title: 'Test: Path Sum', lc: 112, name: 'Path Sum', diff: 'Easy', xp: 100 },
    ],
    complete: { file: 'rank-e-complete.md', day: 7 },
  },
  d: {
    day: 11, dayTitle: 'D-Rank Test',
    tests: [
      { file: 'd-test-1-binary-tree-paths.md', title: 'Test: Binary Tree Paths', lc: 257, name: 'Binary Tree Paths', diff: 'Easy', xp: 100 },
      { file: 'd-test-2-next-right-pointers.md', title: 'Test: Next Right Pointers', lc: 116, name: 'Populating Next Right Pointers in Each Node', diff: 'Medium', xp: 100 },
      { file: 'd-test-3-max-width.md', title: 'Test: Maximum Width', lc: 662, name: 'Maximum Width of Binary Tree', diff: 'Medium', xp: 100 },
    ],
    complete: { file: 'rank-d-complete.md', day: 12 },
  },
  c: {
    day: 17, dayTitle: 'C-Rank Test',
    tests: [
      { file: 'c-test-1-bst-iterator.md', title: 'Test: BST Iterator', lc: 173, name: 'Binary Search Tree Iterator', diff: 'Medium', xp: 150 },
      { file: 'c-test-2-distance-k.md', title: 'Test: Nodes Distance K', lc: 863, name: 'All Nodes Distance K in Binary Tree', diff: 'Medium', xp: 150 },
      { file: 'c-test-3-recover-bst.md', title: 'Test: Recover BST', lc: 99, name: 'Recover Binary Search Tree', diff: 'Medium', xp: 150 },
    ],
    complete: { file: 'rank-c-complete.md', day: 18 },
  },
  b: {
    day: 23, dayTitle: 'B-Rank Test',
    tests: [
      { file: 'b-test-1-word-search-ii.md', title: 'Test: Word Search II', lc: 212, name: 'Word Search II', diff: 'Hard', xp: 200 },
      { file: 'b-test-2-nested-iterator.md', title: 'Test: Flatten Nested Iterator', lc: 341, name: 'Flatten Nested List Iterator', diff: 'Medium', xp: 200 },
      { file: 'b-test-3-tree-cameras.md', title: 'Test: Binary Tree Cameras', lc: 968, name: 'Binary Tree Cameras', diff: 'Hard', xp: 200 },
    ],
    complete: { file: 'rank-b-complete.md', day: 24 },
  },
  a: {
    day: 28, dayTitle: 'A-Rank Test',
    tests: [
      { file: 'a-test-1-serialize-bst.md', title: 'Test: Serialize BST', lc: 449, name: 'Serialize and Deserialize BST', diff: 'Medium', xp: 250 },
      { file: 'a-test-2-count-complete.md', title: 'Test: Count Complete Nodes', lc: 222, name: 'Count Complete Tree Nodes', diff: 'Medium', xp: 250 },
      { file: 'a-test-3-delete-forest.md', title: 'Test: Delete Nodes Return Forest', lc: 1110, name: 'Delete Nodes And Return Forest', diff: 'Medium', xp: 250 },
    ],
    complete: { file: 'rank-a-complete.md', day: 29 },
  },
  s: {
    day: 31, dayTitle: 'S-Rank Test',
    tests: [
      { file: 's-test-1-tree-cameras.md', title: 'Test: Binary Tree Cameras', lc: 968, name: 'Binary Tree Cameras', diff: 'Hard', xp: 300 },
      { file: 's-test-2-good-paths.md', title: 'Test: Number of Good Paths', lc: 2421, name: 'Number of Good Paths', diff: 'Hard', xp: 300 },
      { file: 's-test-3-avg-subtree.md', title: 'Test: Average of Subtree', lc: 2265, name: 'Count Nodes Equal to Average of Subtree', diff: 'Medium', xp: 300 },
    ],
    complete: { file: 'rank-s-complete.md', day: 32 },
  },
};

export const E_RANK_PATTERNS = [
  'Tree Mental Model',
  'DFS Traversals (inorder/preorder/postorder)',
  'BFS Level-Order',
  'Bottom-Up Recursion',
  'Parallel Tree Recursion',
];

export const D_RANK_PATTERNS = [
  'Top-Down DFS',
  'Bottom-Up with Global Update',
  'Recursive Construction',
  'BFS Template Variations',
  'Iterative DFS with Stack',
];

export const C_RANK_PATTERNS = [
  'BST Invariant & Search',
  'BST Modification',
  'LCA Pattern',
  'Path Sum Patterns',
  'Coordinate-Based Traversal',
  'Serialization/Encoding',
  'Inorder for Sorted Access',
];

export const B_RANK_PATTERNS = [
  'Tree Views/Projections',
  'Tree Merge/Transform',
  'Trie (Prefix Tree)',
  'Tree DP',
  'Subtree Aggregation',
  'Tree-as-Graph BFS',
];

export const A_RANK_PATTERNS = [
  'BST Iterator/Augmentation',
  'Advanced Trie',
  'Tree Distance/Diameter',
  'Morris Traversal',
  'Tree-Graph Hybrid',
];

export const S_RANK_PATTERNS = [
  'DFS + Hash Map (prefix sums on trees)',
  'Tree DP + BST Validation',
  'Trie + Design Patterns',
  'Re-rooting Technique',
  'Multi-Value Bottom-Up Returns',
];
