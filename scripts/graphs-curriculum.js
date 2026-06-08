/**
 * Graphs Ascension — curriculum source of truth
 * Used by build-graphs-course.js to generate markdown + graphs-content.js
 */

export const RANK_THEMES = {
  e: { label: 'E-Rank', theme: 'Learn to See Graphs', title: 'Scout' },
  d: { label: 'D-Rank', theme: 'Learn to Traverse', title: 'Pathfinder' },
  c: { label: 'C-Rank', theme: 'Learn to Direct', title: 'Cartographer' },
  b: { label: 'B-Rank', theme: 'Learn to Unite', title: 'Navigator' },
  a: { label: 'A-Rank', theme: 'Learn to Combine', title: 'Expedition Leader' },
  s: { label: 'S-Rank', theme: 'The Final Ascension', title: 'Graph Legend' },
};

export const DAYS = [
  // E-RANK
  {
    day: 1, rank: 'e', dayTitle: 'The Graph Mental Model',
    concept: { file: '01-1-graph-mental-model.md', title: 'The Graph Mental Model', pattern: 'Graph Representation', stars: 1 },
    quests: [
      { file: '01-2-quest-town-judge.md', title: 'Quest: Find the Town Judge', lc: 997, name: 'Find the Town Judge', diff: 'Easy', xp: 10, pattern: 'Degree Analysis' },
      { file: '01-3-quest-find-path.md', title: 'Quest: Find if Path Exists', lc: 1971, name: 'Find if Path Exists in Graph', diff: 'Easy', xp: 10, pattern: 'Adjacency List + DFS' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 2, rank: 'e', dayTitle: 'BFS — Breadth-First Search',
    concept: { file: '02-1-bfs-template.md', title: 'BFS: Breadth-First Search', pattern: 'BFS Template', stars: 2 },
    quests: [
      { file: '02-2-quest-flood-fill.md', title: 'Quest: Flood Fill', lc: 733, name: 'Flood Fill', diff: 'Easy', xp: 10, pattern: 'BFS on Grid' },
      { file: '02-3-quest-rotting-oranges.md', title: 'Quest: Rotting Oranges', lc: 994, name: 'Rotting Oranges', diff: 'Medium', xp: 10, pattern: 'Multi-Source BFS Preview' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 3, rank: 'e', dayTitle: 'DFS — Depth-First Search',
    concept: { file: '03-1-dfs-template.md', title: 'DFS: Depth-First Search', pattern: 'DFS Template', stars: 2 },
    quests: [
      { file: '03-2-quest-provinces.md', title: 'Quest: Number of Provinces', lc: 547, name: 'Number of Provinces', diff: 'Medium', xp: 10, pattern: 'DFS Connected Components' },
      { file: '03-3-quest-keys-rooms.md', title: 'Quest: Keys and Rooms', lc: 841, name: 'Keys and Rooms', diff: 'Medium', xp: 10, pattern: 'DFS Reachability' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 4, rank: 'e', dayTitle: 'Grids as Graphs',
    concept: { file: '04-1-grid-traversal.md', title: 'Grids as Graphs', pattern: 'Grid-as-Graph Traversal', stars: 2 },
    quests: [
      { file: '04-2-quest-island-perimeter.md', title: 'Quest: Island Perimeter', lc: 463, name: 'Island Perimeter', diff: 'Easy', xp: 10, pattern: 'Grid Boundary Counting' },
      { file: '04-3-quest-num-islands.md', title: 'Quest: Number of Islands', lc: 200, name: 'Number of Islands', diff: 'Medium', xp: 10, pattern: 'Grid DFS/BFS Components' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 5, rank: 'e', dayTitle: 'Component Exploration',
    concept: { file: '05-1-connected-components.md', title: 'Connected Component Discovery', pattern: 'Connected Components', stars: 2 },
    quests: [
      { file: '05-2-quest-max-area.md', title: 'Quest: Max Area of Island', lc: 695, name: 'Max Area of Island', diff: 'Medium', xp: 10, pattern: 'Component Size Tracking' },
      { file: '05-3-quest-clone-graph.md', title: 'Quest: Clone Graph', lc: 133, name: 'Clone Graph', diff: 'Medium', xp: 10, pattern: 'Graph Copy via BFS/DFS' },
    ],
    checkpoint: { xp: 10 },
  },
  // D-RANK
  {
    day: 6, rank: 'd', dayTitle: 'Multi-Source BFS',
    concept: { file: '06-1-multi-source-bfs.md', title: 'Multi-Source BFS', pattern: 'Multi-Source BFS', stars: 3 },
    quests: [
      { file: '06-2-quest-01-matrix.md', title: 'Quest: 01 Matrix', lc: 542, name: '01 Matrix', diff: 'Medium', xp: 15, pattern: 'Multi-Source BFS' },
      { file: '06-3-quest-far-from-land.md', title: 'Quest: As Far from Land as Possible', lc: 1162, name: 'As Far from Land as Possible', diff: 'Medium', xp: 15, pattern: 'Multi-Source BFS on Grid' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 7, rank: 'd', dayTitle: 'Boundary Traversal',
    concept: { file: '07-1-boundary-dfs.md', title: 'Boundary DFS / Outside-In Thinking', pattern: 'Boundary DFS', stars: 3 },
    quests: [
      { file: '07-2-quest-pacific-atlantic.md', title: 'Quest: Pacific Atlantic Water Flow', lc: 417, name: 'Pacific Atlantic Water Flow', diff: 'Medium', xp: 15, pattern: 'Boundary DFS' },
      { file: '07-3-quest-enclaves.md', title: 'Quest: Number of Enclaves', lc: 1020, name: 'Number of Enclaves', diff: 'Medium', xp: 15, pattern: 'Outside-In Flood Fill' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 8, rank: 'd', dayTitle: 'Shortest Path (Unweighted)',
    concept: { file: '08-1-bfs-shortest-path.md', title: 'BFS Shortest Path', pattern: 'BFS Shortest Path', stars: 3 },
    quests: [
      { file: '08-2-quest-binary-matrix-path.md', title: 'Quest: Shortest Path in Binary Matrix', lc: 1091, name: 'Shortest Path in Binary Matrix', diff: 'Medium', xp: 15, pattern: 'BFS Shortest Path' },
      { file: '08-3-quest-shortest-bridge.md', title: 'Quest: Shortest Bridge', lc: 934, name: 'Shortest Bridge', diff: 'Medium', xp: 15, pattern: 'Component + BFS Expansion' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 9, rank: 'd', dayTitle: 'Direction-Aware Traversal',
    concept: { file: '09-1-direction-traversal.md', title: 'Direction-Aware Traversal', pattern: 'Direction-Aware Traversal', stars: 3 },
    quests: [
      { file: '09-2-quest-all-paths.md', title: 'Quest: All Paths From Source to Target', lc: 797, name: 'All Paths From Source to Target', diff: 'Medium', xp: 15, pattern: 'DFS Path Recording' },
      { file: '09-3-quest-reorder-routes.md', title: 'Quest: Reorder Routes', lc: 1466, name: 'Reorder Routes to Make All Paths Lead to the City Zero', diff: 'Medium', xp: 15, pattern: 'Edge Direction Reasoning' },
    ],
    checkpoint: { xp: 10 },
  },
  {
    day: 10, rank: 'd', dayTitle: 'State-Space BFS',
    concept: { file: '10-1-state-space-bfs.md', title: 'State-Space BFS', pattern: 'State-Space BFS', stars: 3 },
    quests: [
      { file: '10-2-quest-open-lock.md', title: 'Quest: Open the Lock', lc: 752, name: 'Open the Lock', diff: 'Medium', xp: 15, pattern: 'State-Space BFS' },
      { file: '10-3-quest-genetic-mutation.md', title: 'Quest: Minimum Genetic Mutation', lc: 433, name: 'Minimum Genetic Mutation', diff: 'Medium', xp: 15, pattern: 'State Graph BFS' },
    ],
    checkpoint: { xp: 10 },
  },
  // C-RANK
  {
    day: 11, rank: 'c', dayTitle: 'Cycle Detection & Topological Sort',
    concept: { file: '11-1-cycle-detection.md', title: 'Directed Cycle Detection', pattern: 'Directed Cycle Detection', stars: 3 },
    quests: [
      { file: '11-2-quest-course-schedule.md', title: 'Quest: Course Schedule', lc: 207, name: 'Course Schedule', diff: 'Medium', xp: 20, pattern: 'Cycle Detection' },
      { file: '11-3-quest-course-schedule-ii.md', title: 'Quest: Course Schedule II', lc: 210, name: 'Course Schedule II', diff: 'Medium', xp: 25, pattern: 'Topological Sort' },
    ],
    checkpoint: { xp: 15 },
  },
  {
    day: 12, rank: 'c', dayTitle: 'Topological Sort Applications',
    concept: { file: '12-1-kahns-algorithm.md', title: "Kahn's Algorithm", pattern: "Kahn's Algorithm", stars: 3 },
    quests: [
      { file: '12-2-quest-safe-states.md', title: 'Quest: Find Eventual Safe States', lc: 802, name: 'Find Eventual Safe States', diff: 'Medium', xp: 20, pattern: 'Reverse Topological Sort' },
      { file: '12-3-quest-recipes.md', title: 'Quest: Find All Possible Recipes', lc: 2115, name: 'Find All Possible Recipes from Given Supplies', diff: 'Medium', xp: 25, pattern: 'Topological Dependency Chain' },
    ],
    checkpoint: { xp: 15 },
  },
  {
    day: 13, rank: 'c', dayTitle: 'Bipartite Graphs',
    concept: { file: '13-1-bipartite.md', title: 'Graph Two-Coloring', pattern: 'Graph Two-Coloring', stars: 4 },
    quests: [
      { file: '13-2-quest-bipartite.md', title: 'Quest: Is Graph Bipartite?', lc: 785, name: 'Is Graph Bipartite?', diff: 'Medium', xp: 20, pattern: 'BFS/DFS Two-Coloring' },
      { file: '13-3-quest-bipartition.md', title: 'Quest: Possible Bipartition', lc: 886, name: 'Possible Bipartition', diff: 'Medium', xp: 25, pattern: 'Conflict Graph Coloring' },
    ],
    checkpoint: { xp: 15 },
  },
  {
    day: 14, rank: 'c', dayTitle: 'DAG Reasoning',
    concept: { file: '14-1-dag-reasoning.md', title: 'DAG Source/Sink Analysis', pattern: 'DAG Source/Sink Analysis', stars: 4 },
    quests: [
      { file: '14-2-quest-min-vertices.md', title: 'Quest: Minimum Number of Vertices', lc: 1557, name: 'Minimum Number of Vertices to Reach All Nodes', diff: 'Medium', xp: 20, pattern: 'In-Degree Sink Analysis' },
      { file: '14-3-quest-ancestors.md', title: 'Quest: All Ancestors in DAG', lc: 2192, name: 'All Ancestors of a Node in a Directed Acyclic Graph', diff: 'Medium', xp: 25, pattern: 'DAG Reachability' },
    ],
    checkpoint: { xp: 15 },
  },
  {
    day: 15, rank: 'c', dayTitle: 'Graph Reachability',
    concept: { file: '15-1-reachability.md', title: 'Multi-Hop Reachability', pattern: 'Multi-Hop Reachability', stars: 4 },
    quests: [
      { file: '15-2-quest-course-schedule-iv.md', title: 'Quest: Course Schedule IV', lc: 1462, name: 'Course Schedule IV', diff: 'Medium', xp: 20, pattern: 'Transitive Closure' },
      { file: '15-3-quest-inform-employees.md', title: 'Quest: Time Needed to Inform Employees', lc: 1376, name: 'Time Needed to Inform All Employees', diff: 'Medium', xp: 25, pattern: 'Tree BFS on DAG' },
    ],
    checkpoint: { xp: 15 },
  },
  {
    day: 16, rank: 'c', dayTitle: 'Graph Reduction',
    concept: { file: '16-1-graph-reduction.md', title: 'Graph Transformation', pattern: 'Graph Transformation', stars: 4 },
    quests: [
      { file: '16-2-quest-min-height-trees.md', title: 'Quest: Minimum Height Trees', lc: 310, name: 'Minimum Height Trees', diff: 'Medium', xp: 20, pattern: 'Leaf Peeling / Graph Reduction' },
      { file: '16-3-quest-evaluate-division.md', title: 'Quest: Evaluate Division', lc: 399, name: 'Evaluate Division', diff: 'Medium', xp: 25, pattern: 'Weighted Graph Construction' },
    ],
    checkpoint: { xp: 15 },
  },
  // B-RANK
  {
    day: 17, rank: 'b', dayTitle: 'Union-Find Fundamentals',
    concept: { file: '17-1-union-find.md', title: 'Union-Find DSU', pattern: 'Union-Find DSU', stars: 4 },
    quests: [
      { file: '17-2-quest-redundant-connection.md', title: 'Quest: Redundant Connection', lc: 684, name: 'Redundant Connection', diff: 'Medium', xp: 35, pattern: 'Union-Find Cycle Detection' },
      { file: '17-3-quest-connect-network.md', title: 'Quest: Connect Network', lc: 1319, name: 'Number of Operations to Make Network Connected', diff: 'Medium', xp: 35, pattern: 'Component Counting with UF' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 18, rank: 'b', dayTitle: 'Union-Find Applications',
    concept: { file: '18-1-uf-applications.md', title: 'UF Application Modeling', pattern: 'UF Application Modeling', stars: 4 },
    quests: [
      { file: '18-2-quest-accounts-merge.md', title: 'Quest: Accounts Merge', lc: 721, name: 'Accounts Merge', diff: 'Medium', xp: 35, pattern: 'Equivalence Class Union' },
      { file: '18-3-quest-equality-equations.md', title: 'Quest: Satisfiability of Equality Equations', lc: 990, name: 'Satisfiability of Equality Equations', diff: 'Medium', xp: 35, pattern: 'Constraint Union-Find' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 19, rank: 'b', dayTitle: "Dijkstra's Algorithm",
    concept: { file: '19-1-dijkstra.md', title: "Dijkstra's Shortest Path", pattern: "Dijkstra's Shortest Path", stars: 4 },
    quests: [
      { file: '19-2-quest-network-delay.md', title: 'Quest: Network Delay Time', lc: 743, name: 'Network Delay Time', diff: 'Medium', xp: 35, pattern: "Dijkstra's Algorithm" },
      { file: '19-3-quest-max-probability.md', title: 'Quest: Path with Maximum Probability', lc: 1514, name: 'Path with Maximum Probability', diff: 'Medium', xp: 35, pattern: 'Modified Dijkstra' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 20, rank: 'b', dayTitle: 'Shortest Path Variants',
    concept: { file: '20-1-constrained-shortest-path.md', title: 'Constrained Shortest Path', pattern: 'Constrained Shortest Path', stars: 4 },
    quests: [
      { file: '20-2-quest-min-effort.md', title: 'Quest: Path With Minimum Effort', lc: 1631, name: 'Path With Minimum Effort', diff: 'Medium', xp: 35, pattern: 'Dijkstra on Grid' },
      { file: '20-3-quest-cheapest-flights.md', title: 'Quest: Cheapest Flights Within K Stops', lc: 787, name: 'Cheapest Flights Within K Stops', diff: 'Medium', xp: 35, pattern: 'Bellman-Ford / Modified Dijkstra' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 21, rank: 'b', dayTitle: 'Minimum Spanning Tree',
    concept: { file: '21-1-mst.md', title: "MST (Kruskal's/Prim's)", pattern: "MST (Kruskal's/Prim's)", stars: 4 },
    quests: [
      { file: '21-2-quest-connect-points.md', title: 'Quest: Min Cost to Connect All Points', lc: 1584, name: 'Min Cost to Connect All Points', diff: 'Medium', xp: 35, pattern: "Kruskal's MST" },
      { file: '21-3-quest-smallest-string.md', title: 'Quest: Smallest String With Swaps', lc: 1202, name: 'Smallest String With Swaps', diff: 'Medium', xp: 35, pattern: 'UF for Connected Components' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 22, rank: 'b', dayTitle: 'Combined Graph Techniques',
    concept: { file: '22-1-multi-technique.md', title: 'Multi-Technique Combination', pattern: 'Multi-Technique Combination', stars: 4 },
    quests: [
      { file: '22-2-quest-unreachable-pairs.md', title: 'Quest: Count Unreachable Pairs', lc: 2316, name: 'Count Unreachable Pairs of Nodes in an Undirected Graph', diff: 'Medium', xp: 35, pattern: 'Component Size Math' },
      { file: '22-3-quest-alternating-colors.md', title: 'Quest: Shortest Path with Alternating Colors', lc: 1129, name: 'Shortest Path with Alternating Colors', diff: 'Medium', xp: 35, pattern: 'BFS with State (node, color)' },
    ],
    checkpoint: { xp: 25 },
  },
  // A-RANK
  {
    day: 23, rank: 'a', dayTitle: 'Advanced State BFS',
    concept: { file: '23-1-advanced-state-bfs.md', title: 'Complex State-Space BFS', pattern: 'Complex State-Space BFS', stars: 4 },
    quests: [
      { file: '23-2-quest-word-ladder.md', title: 'Quest: Word Ladder', lc: 127, name: 'Word Ladder', diff: 'Hard', xp: 40, pattern: 'Word Graph BFS' },
      { file: '23-3-quest-snakes-ladders.md', title: 'Quest: Snakes and Ladders', lc: 909, name: 'Snakes and Ladders', diff: 'Medium', xp: 30, pattern: 'Implicit Graph BFS' },
    ],
    checkpoint: { xp: 20 },
  },
  {
    day: 24, rank: 'a', dayTitle: 'Graph Modeling',
    concept: { file: '24-1-graph-modeling.md', title: 'Building Graphs from Non-Graph Inputs', pattern: 'Graph Construction from Non-Graph Inputs', stars: 4 },
    quests: [
      { file: '24-2-quest-detonate-bombs.md', title: 'Quest: Detonate Maximum Bombs', lc: 2101, name: 'Detonate Maximum Bombs', diff: 'Medium', xp: 30, pattern: 'Geometric Graph Construction' },
      { file: '24-3-quest-collect-apples.md', title: 'Quest: Min Time to Collect Apples', lc: 1443, name: 'Minimum Time to Collect All Apples in a Tree', diff: 'Medium', xp: 30, pattern: 'Tree DFS + Return Cost' },
    ],
    checkpoint: { xp: 20 },
  },
  {
    day: 25, rank: 'a', dayTitle: 'Advanced Shortest Paths',
    concept: { file: '25-1-dijkstra-counting.md', title: 'Dijkstra + Counting/DP', pattern: 'Dijkstra + Path Counting', stars: 5 },
    quests: [
      { file: '25-2-quest-ways-to-arrive.md', title: 'Quest: Number of Ways to Arrive', lc: 1976, name: 'Number of Ways to Arrive at Destination', diff: 'Medium', xp: 35, pattern: 'Dijkstra + DP Count' },
      { file: '25-3-quest-smallest-neighbors.md', title: 'Quest: Find the City With Smallest Neighbors', lc: 1334, name: 'Find the City With the Smallest Number of Neighbors at a Threshold Distance', diff: 'Medium', xp: 35, pattern: 'Dijkstra from Each Node' },
    ],
    checkpoint: { xp: 20 },
  },
  {
    day: 26, rank: 'a', dayTitle: 'DFS + Memoization',
    concept: { file: '26-1-dfs-memo.md', title: 'Graph DFS with Memoization', pattern: 'DFS + Memoization', stars: 5 },
    quests: [
      { file: '26-2-quest-longest-path-matrix.md', title: 'Quest: Longest Increasing Path in Matrix', lc: 329, name: 'Longest Increasing Path in a Matrix', diff: 'Hard', xp: 40, pattern: 'DFS + Memo on DAG' },
      { file: '26-3-quest-network-idle.md', title: 'Quest: Time When Network Becomes Idle', lc: 2039, name: 'The Time When the Network Becomes Idle', diff: 'Medium', xp: 30, pattern: 'Tree BFS + Bottleneck' },
    ],
    checkpoint: { xp: 20 },
  },
  {
    day: 27, rank: 'a', dayTitle: 'Multi-Pattern Synthesis',
    concept: { file: '27-1-multi-pattern.md', title: 'Pattern Decision Making', pattern: 'Multi-Pattern Graph Synthesis', stars: 5 },
    quests: [
      { file: '27-2-quest-min-jumps.md', title: 'Quest: Minimum Jumps to Reach Home', lc: 1654, name: 'Minimum Jumps to Reach Home', diff: 'Medium', xp: 35, pattern: 'BFS with Forbidden States' },
      { file: '27-3-quest-network-rank.md', title: 'Quest: Maximal Network Rank', lc: 1615, name: 'Maximal Network Rank', diff: 'Medium', xp: 35, pattern: 'Adjacency Set Intersection' },
    ],
    checkpoint: { xp: 20 },
  },
  // S-RANK
  {
    day: 28, rank: 's', dayTitle: 'Advanced Path Optimization',
    concept: { file: '28-1-threshold-bfs.md', title: 'Threshold BFS / Multi-State Paths', pattern: 'Threshold BFS / Multi-State Paths', stars: 5 },
    quests: [
      { file: '28-2-quest-swim-water.md', title: 'Quest: Swim in Rising Water', lc: 778, name: 'Swim in Rising Water', diff: 'Hard', xp: 50, pattern: 'Binary Search + BFS' },
      { file: '28-3-quest-obstacles-elimination.md', title: 'Quest: Shortest Path with Obstacles Elimination', lc: 1293, name: 'Shortest Path in a Grid with Obstacles Elimination', diff: 'Hard', xp: 60, pattern: '3D State BFS' },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 29, rank: 's', dayTitle: 'Advanced Graph Algorithms',
    concept: { file: '29-1-euler-bridges.md', title: 'Euler Paths and Bridges', pattern: "Euler Path / Tarjan's Bridges", stars: 5 },
    quests: [
      { file: '29-2-quest-reconstruct-itinerary.md', title: 'Quest: Reconstruct Itinerary', lc: 332, name: 'Reconstruct Itinerary', diff: 'Hard', xp: 50, pattern: "Hierholzer's Algorithm" },
      { file: '29-3-quest-critical-connections.md', title: 'Quest: Critical Connections', lc: 1192, name: 'Critical Connections in a Network', diff: 'Hard', xp: 60, pattern: "Tarjan's Bridges" },
    ],
    checkpoint: { xp: 25 },
  },
  {
    day: 30, rank: 's', dayTitle: 'The Final Ascension',
    concept: { file: '30-1-final-ascension.md', title: 'The Final Ascension', pattern: 'Pattern Decision Tree', stars: 5 },
    quests: [
      { file: '30-2-quest-visit-all-nodes.md', title: 'Quest: Shortest Path Visiting All Nodes', lc: 847, name: 'Shortest Path Visiting All Nodes', diff: 'Hard', xp: 50, pattern: 'Bitmask BFS' },
      { file: '30-3-quest-remove-edges.md', title: 'Quest: Remove Max Edges', lc: 1579, name: 'Remove Max Number of Edges to Keep Graph Fully Traversable', diff: 'Hard', xp: 60, pattern: 'Dual Union-Find' },
    ],
    checkpoint: { xp: 25 },
  },
];

export const RANK_TESTS = {
  e: {
    day: 6, dayTitle: 'E-Rank Test',
    tests: [
      { file: 'test-1-star-graph.md', title: 'Test: Find Center of Star Graph', lc: 1791, name: 'Find Center of Star Graph', diff: 'Easy', xp: 100 },
      { file: 'test-2-sub-islands.md', title: 'Test: Count Sub Islands', lc: 1905, name: 'Count Sub Islands', diff: 'Medium', xp: 100 },
      { file: 'test-3-surrounded-regions.md', title: 'Test: Surrounded Regions', lc: 130, name: 'Surrounded Regions', diff: 'Medium', xp: 100 },
    ],
    complete: { file: 'rank-e-complete.md', day: 7 },
  },
  d: {
    day: 11, dayTitle: 'D-Rank Test',
    tests: [
      { file: 'd-test-1-nearest-exit.md', title: 'Test: Nearest Exit from Entrance', lc: 1926, name: 'Nearest Exit from Entrance in Maze', diff: 'Medium', xp: 100 },
      { file: 'd-test-2-closed-islands.md', title: 'Test: Number of Closed Islands', lc: 1254, name: 'Number of Closed Islands', diff: 'Medium', xp: 100 },
      { file: 'd-test-3-highest-peak.md', title: 'Test: Map of Highest Peak', lc: 1765, name: 'Map of Highest Peak', diff: 'Medium', xp: 100 },
    ],
    complete: { file: 'rank-d-complete.md', day: 12 },
  },
  c: {
    day: 17, dayTitle: 'C-Rank Test',
    tests: [
      { file: 'c-test-1-flower-planting.md', title: 'Test: Flower Planting With No Adjacent', lc: 1042, name: 'Flower Planting With No Adjacent', diff: 'Medium', xp: 150 },
      { file: 'c-test-2-jump-game-iii.md', title: 'Test: Jump Game III', lc: 1306, name: 'Jump Game III', diff: 'Medium', xp: 150 },
      { file: 'c-test-3-loud-and-rich.md', title: 'Test: Loud and Rich', lc: 851, name: 'Loud and Rich', diff: 'Medium', xp: 150 },
    ],
    complete: { file: 'rank-c-complete.md', day: 18 },
  },
  b: {
    day: 23, dayTitle: 'B-Rank Test',
    tests: [
      { file: 'b-test-1-min-score-path.md', title: 'Test: Minimum Score of a Path', lc: 2492, name: 'Minimum Score of a Path Between Two Cities', diff: 'Medium', xp: 200 },
      { file: 'b-test-2-road-importance.md', title: 'Test: Maximum Total Importance of Roads', lc: 2285, name: 'Maximum Total Importance of Roads', diff: 'Medium', xp: 200 },
      { file: 'b-test-3-equiv-string.md', title: 'Test: Lexicographically Smallest Equivalent String', lc: 1061, name: 'Lexicographically Smallest Equivalent String', diff: 'Medium', xp: 200 },
    ],
    complete: { file: 'rank-b-complete.md', day: 24 },
  },
  a: {
    day: 28, dayTitle: 'A-Rank Test',
    tests: [
      { file: 'a-test-1-watched-videos.md', title: 'Test: Get Watched Videos by Your Friends', lc: 1311, name: 'Get Watched Videos by Your Friends', diff: 'Medium', xp: 250 },
      { file: 'a-test-2-convert-number.md', title: 'Test: Minimum Operations to Convert Number', lc: 2059, name: 'Minimum Operations to Convert Number', diff: 'Medium', xp: 250 },
      { file: 'a-test-3-valid-path-grid.md', title: 'Test: Check if Valid Path in Grid', lc: 1391, name: 'Check if There is a Valid Path in a Grid', diff: 'Medium', xp: 250 },
    ],
    complete: { file: 'rank-a-complete.md', day: 29 },
  },
  s: {
    day: 31, dayTitle: 'S-Rank Test',
    tests: [
      { file: 's-test-1-valid-path-cost.md', title: 'Test: Min Cost Valid Path in Grid', lc: 1368, name: 'Minimum Cost to Make at Least One Valid Path in a Grid', diff: 'Hard', xp: 300 },
      { file: 's-test-2-edge-limited.md', title: 'Test: Edge Length Limited Paths', lc: 1697, name: 'Checking Existence of Edge Length Limited Paths', diff: 'Hard', xp: 300 },
      { file: 's-test-3-fuel-cost.md', title: 'Test: Min Fuel Cost to Report to Capital', lc: 2477, name: 'Minimum Fuel Cost to Report to the Capital', diff: 'Medium', xp: 300 },
    ],
    complete: { file: 'rank-s-complete.md', day: 32 },
  },
};

export const E_RANK_PATTERNS = [
  'Graph Representation and Degree Analysis',
  'BFS Template (Queue + Visited)',
  'DFS Template (Stack/Recursion + Visited)',
  'Grid-as-Graph Traversal (4-directional movement)',
  'Connected Component Discovery',
];

export const D_RANK_PATTERNS = [
  'Multi-Source BFS (initialize queue with all sources)',
  'Boundary DFS / Outside-In Thinking',
  'BFS = Shortest Path in Unweighted Graphs',
  'Direction-Aware Traversal (edge direction reasoning)',
  'State-Space BFS (abstract states as graph nodes)',
];

export const C_RANK_PATTERNS = [
  'Directed Cycle Detection (3-color DFS / Kahn\'s)',
  'Topological Sort (BFS in-degree peeling)',
  'Bipartite Graph Coloring (BFS/DFS 2-color)',
  'DAG Source/Sink Analysis',
  'Multi-Hop Reachability',
  'Graph Reduction and Transformation',
];

export const B_RANK_PATTERNS = [
  'Union-Find with Path Compression + Union by Rank',
  'Union-Find Application Modeling',
  'Dijkstra\'s Algorithm (priority queue relaxation)',
  'Constrained Shortest Path (modified Dijkstra/BFS)',
  'Minimum Spanning Tree (Kruskal\'s with UF)',
  'Multi-Technique Graph Combination',
];

export const A_RANK_PATTERNS = [
  'Advanced State-Space BFS (multi-step transformation)',
  'Graph Construction from Non-Graph Inputs',
  'Dijkstra + Path Counting / DP overlay',
  'DFS + Memoization on Grids/Graphs',
  'Multi-Pattern Graph Synthesis',
];

export const S_RANK_PATTERNS = [
  'Binary Search + Graph Threshold',
  'Multi-State Shortest Path (3D BFS)',
  'Euler Path (Hierholzer\'s Algorithm)',
  'Tarjan\'s Bridges / Articulation Points',
  'Bitmask BFS (TSP-like state tracking)',
  'Dual Union-Find / Advanced Connectivity',
];
