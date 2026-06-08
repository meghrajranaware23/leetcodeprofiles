# 📝 Graph DFS with Memoization

> **Day 26** · DFS + Memoization · ★★★★★ · 20 XP · 15 min read

---

Your mission today: **understand DFS + Memoization visually** before you touch any code. Draw the graph on paper. Watch nodes get visited. Then the traversal becomes obvious.

---

## Part 1 — Why Does This Work?

### 1. What is the pattern?

**DFS + Memoization** — the core technique you'll use in today's quests.

Every graph problem reduces to one question: *How do I explore the connections?*
- **BFS** (breadth-first): expand wavefront level by level — shortest path in unweighted graphs
- **DFS** (depth-first): go deep before wide — connectivity, cycles, backtracking
- **Union-Find**: merge connected groups efficiently — connectivity queries
- **Dijkstra**: weighted shortest path — priority queue relaxation
- **State-space**: treat configurations as nodes — abstract graph BFS

### 2. Simple explanation

Think of a graph like a city map. Nodes are intersections, edges are roads. To explore:
- **BFS** = flood filling outward — visit all neighbors before going deeper
- **DFS** = walking one road to the end, then backtracking

The visited set prevents infinite loops. The queue/stack determines exploration order.

### 3. Visual walkthrough

```
Graph:  0 — 1 — 2
        |       |
        3 — 4   5

BFS from 0:
Queue: [0] → visit 0, enqueue 1,3
Queue: [1,3] → visit 1, enqueue 2; visit 3, enqueue 4
Queue: [2,4] → visit 2, enqueue 5; visit 4
Queue: [5] → visit 5
Visited: {0,1,3,2,4,5}
```

### 4. How the pattern works

```
function bfs(start):
    queue = [start]
    visited = {start}
    while queue not empty:
        node = queue.dequeue()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.enqueue(neighbor)
```

The magic: you never revisit a node. Each visit is O(1) amortized with a visited set.

### 5. What problem does this solve?

| Problem family | How this pattern helps |
|---|---|
| Connectivity | DFS/BFS finds all reachable nodes |
| Shortest path (unweighted) | BFS guarantees minimum steps |
| Grid traversal | Treat cells as nodes, 4-directional edges |
| Multi-source propagation | Initialize BFS from all sources |
| Cycle detection | DFS with coloring or in-degree topo sort |
| Weighted shortest path | Dijkstra with priority queue |

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| Try all paths recursively without memo | Exponential time on dense graphs |
| BFS without visited set | Infinite loops on cyclic graphs |
| Dijkstra on unweighted graphs | Unnecessary priority queue overhead |
| Nested loops for connectivity | O(n²) when O(n) BFS/DFS suffices |
| Ignoring graph structure in grids | Miss the natural adjacency model |

### 7. The key observation

**A graph is just nodes and edges.** Most interview problems are one of: traverse it, find shortest path, detect structure, or build it from input. Name the exploration strategy first.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "shortest path" / "minimum steps" | BFS (unweighted) or Dijkstra (weighted) |
| "connected" / "reachable" / "can visit" | DFS/BFS with visited set |
| "grid" / "matrix" / "island" | Grid-as-graph, 4-directional BFS/DFS |
| "course schedule" / "prerequisites" | Topological sort / cycle detection |
| "bipartite" / "two groups" | Graph 2-coloring |
| "union" / "merge groups" / "connected components" | Union-Find |
| "minimum cost" / "network delay" | Dijkstra |
| "all paths" / "backtrack" | DFS with path recording |

**Keywords:** `graph` · `node` · `edge` · `adjacent` · `connected` · `traverse` · `shortest`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forgetting visited set | Always track visited — cycles cause infinite loops |
| Using DFS for shortest path | BFS guarantees shortest in unweighted graphs |
| Not building adjacency list | Convert edge list to adjacency list first |
| Off-by-one in grid bounds | Check `0 <= r < rows and 0 <= c < cols` |
| Confusing directed vs undirected | Check if edges are one-way or two-way |

### 10. Recognition drill

Read this problem aloud:

> *"Given an m×n grid, count the number of islands."*

Before coding, say:

> *"Grid-as-graph → DFS/BFS from each unvisited '1' cell, mark visited, count components."*

---

*You understand the pattern. Your first quest puts it into practice. →*
