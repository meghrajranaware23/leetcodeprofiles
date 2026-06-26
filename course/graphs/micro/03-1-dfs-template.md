<!-- hand-authored -->
# 📝 DFS: Depth-First Search

> **Day 3** · DFS — Depth-First Search · 10 XP · 10 min read

---

Your mission today: **learn depth-first search for the first time in this pack** — go **deep before wide**. No queue. No BFS wavefront. Just recursion (or an explicit stack), a **visited** set, and a clear **visit order** you can trace on paper.

---

## Part 1 — The Recursion Stack Goes Deep

### 1. What is DFS?

**Depth-first search** explores as far as possible along one path before backtracking.

Tool: **recursion** (implicit stack) or a **stack** (LIFO).
- Mark current node visited
- Recurse on each unvisited neighbor
- When no unvisited neighbors remain, return (backtrack)

Day 2 went wide with a queue. Day 3 goes deep with the call stack.

### 2. Visual — visit order on a graph (no BFS, no queue)

```
Graph:  0 — 1 — 2
        |
        3

DFS from 0 (neighbors tried in order: 1, then 3):

  enter 0  →  mark 0
  enter 1  →  mark 1
  enter 2  →  mark 2   (2 has no new neighbors)
  back to 1, back to 0
  enter 3  →  mark 3

Visit order: 0 → 1 → 2 → 3
Recursion stack at deepest point: [0, 1, 2]
```

**Read it as:** chase one edge chain to the end, then unwind and try the next branch from the earliest unvisited neighbor.

### 3. The DFS skeleton

```python
def dfs(u):
    visited[u] = True
    for v in adj[u]:
        if not visited[v]:
            dfs(v)
```

**Outer restart loop** — for counting **connected components**:

```python
components = 0
for i in range(n):
    if not visited[i]:
        components += 1
        dfs(i)          # floods entire component from i
```

Each time you find an unvisited node, start a new DFS — that is one new component. Quest 1 (#547 Provinces) uses exactly this pattern (or Union-Find — same grouping idea).

### 4. Recursion stack mental model

Each `dfs(u)` call sits on the stack until all descendants finish.

```
dfs(0) called
  dfs(1) called
    dfs(2) called
    dfs(2) returns
  dfs(1) returns
  dfs(3) called
  dfs(3) returns
dfs(0) returns
```

When debugging: **draw the stack**, not the queue. Day 2's level batches do not apply here.

### 5. DFS vs BFS — when to pick DFS (Day 3 focus)

| Signal | Pick |
|---|---|
| "Count connected components" | **DFS** restart loop |
| "Can reach all nodes from 0?" | **DFS** from source + visited check |
| "Explore entire component" | **DFS** flood |
| "Shortest path / minimum minutes" | BFS (Day 2) — not DFS |
| "Level-by-level timeline" | BFS — not DFS |

### 6. Pattern signals — Day 3 only

| When the problem says… | Think… |
|---|---|
| "connected components" / "provinces" / "circles" | Outer loop + `dfs(i)` restart |
| "can you visit every room?" | DFS from 0, check all visited |
| "reachability" from one start | Single DFS/BFS flood |
| Adjacency already given as lists | `rooms[u]` or `adj[u]` neighbors |
| Undirected connectivity matrix | Edge when `matrix[i][j]==1` |

**Keywords:** `dfs` · `visited` · `recursion` · `backtrack` · `component` · `restart loop`

### 7. Why brute force fails

| Brute force | Problem |
|---|---|
| DFS without `visited` | Infinite loops on cycles |
| Count components without restart loop | Miss disconnected pieces |
| BFS for "explore whole component" when order doesn't matter | Works but DFS is natural for flood-fill style |
| Re-run DFS from every node without skip | O(n²) visits; mark visited globally |
| Stack overflow on huge grid without iterative DFS | Rare in E-Rank; know recursion depth limits |

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forget to mark visited **before** recursing | Revisit same node infinitely |
| Only DFS from node 0 for component **count** | Miss components not touching 0 |
| Confuse DFS visit order with BFS levels | No `len(q)` — stack depth instead |
| Not building neighbor list from matrix | Provinces: `j` neighbor when `isConnected[i][j]` |
| Return early without checking all rooms | Keys and Rooms: `all(visited)` at end |

### 9. Bridge from Day 2

Day 2: queue, `(r,c)`, minutes = batches.  
Day 3: recursion stack, `visited`, components = **restart** DFS from each unvisited node.

Same grid can use either — but **connectivity counting** and **reach-all** are DFS home turf in E-Rank.

### 10. Recognition drill — today's quests

**Quest 1 — Number of Provinces #547:**
> *"How many connected groups? Outer loop: if not visited, `components++`, `dfs(i)`."*

**Quest 2 — Keys and Rooms #841:**
> *"DFS from room 0. Can you mark every room? Return `all(visited)`."*

---

*You see the recursion stack and restart loop. Quest 1 counts components; Quest 2 checks full reachability. →*
