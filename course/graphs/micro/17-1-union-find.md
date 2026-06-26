<!-- hand-authored -->
# 📝 Union-Find DSU

> **Day 17** · Union-Find Fundamentals · 25 XP · 15 min read

---

Days 1–16 explored graphs by **walking** them — BFS waves, DFS trails, topo peels. Today you stop traversing and start **merging groups**. Union-Find (Disjoint Set Union) answers connectivity with near-constant-time `find` and `union`. No queue. No stack. Just a `parent[]` forest that collapses into representatives.

> **Preview contrast (BFS vs UF):** BFS/DFS visit nodes one by one to discover components. UF **merges** components as edges arrive — perfect when the question is "are these already connected?" not "visit every node."

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Union-Find (DSU)** — maintain disjoint sets with two operations:

| Operation | Meaning |
|---|---|
| **find(x)** | Return the representative (root) of x's set |
| **union(a, b)** | Merge the sets containing a and b |

Core arrays:
- **`parent[i]`** — parent of node i; `parent[i] == i` means i is a root
- **`rank[i]`** (optional) — tree height hint for union-by-rank

**Cycle detection rule:** Before `union(u, v)`, if `find(u) == find(v)`, edge `(u,v)` closes a cycle.

### 2. Simple explanation

Imagine friend groups at a party. Everyone starts alone (`parent[i] = i`). When two people become friends, you merge their entire groups by pointing one leader at the other. To ask "are Alice and Bob in the same group?" — follow each person's chain of "who's my group leader?" until you hit a root. Same root → same group.

**Path compression** is the shortcut: while finding Alice's root, every person on the path points directly to the root. Next lookup is instant.

### 3. Visual — parent[] forest with path compression

```
Start:  parent = [0, 1, 2, 3, 4]   (each node is its own root)

union(0,1):  0 ← 1        parent = [0, 0, 2, 3, 4]
union(1,2):  0 ← 1 ← 2     parent = [0, 0, 0, 3, 4]  (rank: attach 2 under 0)

find(2) with path compression:
  walk 2→0, then set parent[2]=0, parent[1]=0
  parent = [0, 0, 0, 3, 4]   ← flat tree under root 0

Cycle check — edge (0,2):
  find(0)=0, find(2)=0  → SAME ROOT → cycle edge ✗
```

### 4. Visual — union by rank

```
Without rank: chain 0←1←2←3←4  → find(4) walks 4 steps

With rank:
  union(0,1): rank equal → attach 1 under 0, rank[0]++
  union(2,3): attach 3 under 2, rank[2]++
  union(0,2): rank[0] > rank[2] → attach 2 under 0

Result: balanced trees, find stays O(α(n))
```

### 5. The universal template

```
function find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])   // path compression
    return parent[x]

function union(a, b):
    ra = find(a), rb = find(b)
    if ra == rb: return false          // cycle / already connected
    if rank[ra] < rank[rb]: swap(ra, rb)
    parent[rb] = ra
    if rank[ra] == rank[rb]: rank[ra]++
    return true

// Cycle edge in edge list:
for each edge (u, v):
    if not union(u, v): return edge     // first edge that closes cycle
```

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| DFS/BFS per connectivity query | O(V+E) per query — too slow for streaming edges |
| Rebuild adjacency + DFS for each edge | O(E · (V+E)) on Redundant Connection |
| Floyd-Warshall for "same component?" | O(V³) when UF is O(E · α(V)) |
| Ignore path compression | Degenerate chains → find becomes O(V) |

**The insight:** When edges arrive online and you only need "same group?" or "first cycle edge," UF beats traversal.

### 7. BFS/DFS vs Union-Find — the contrast

| | **BFS / DFS (Days 1–16)** | **Union-Find (Day 17+)** |
|---|---|---|
| Question | Visit all nodes? Shortest path? | Are u and v connected? Merge groups? |
| Structure | Queue / stack / recursion | `parent[]` + optional `rank[]` |
| Cycle detect | Gray DFS, topo sort | `find(u) == find(v)` before union |
| Best for | Traversal, ordering, layers | Dynamic connectivity, Kruskal's MST |
| Visual | Wavefront / depth trail | Forest of roots |

Day 17 is the **first B-Rank concept without a BFS wavefront.** Embrace the parent array.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "redundant edge" / "edge that creates a cycle" | UF — first edge with same root |
| "connect all computers" / "minimum cables" | UF component count |
| "merge groups" / "equivalent" / "same set" | UF |
| "shortest path in unweighted graph" | **BFS** — not UF |
| "minimum total cost connecting all points" | **Kruskal MST** (Day 21) — UF + sorted edges |

**Keywords:** `parent[]` · `find` · `union` · `path compression` · `rank` · `same root` · `cycle edge`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forgetting path compression in `find` | Always flatten: `parent[x] = find(parent[x])` |
| Union without checking roots first | `find(a) == find(b)` before merging — or detect cycle |
| 0-indexed vs 1-indexed nodes | Redundant Connection uses 1..n — size arrays accordingly |
| Using BFS to detect cycle in **undirected** edge list | UF is simpler: same root = cycle |
| Confusing UF with BFS "visited" | UF merges sets; BFS explores paths |

### 10. Recognition drill

Read this problem aloud:

> *"Given an undirected graph built by adding edges one at a time, return the edge that completes the first cycle."*

Before coding, say:

> *"Union-Find: process edges in order; if find(u)==find(v) before union, that edge is redundant. Path compression + union by rank. Not BFS — no traversal needed."*

---

*No queue today — just roots and ranks. First quest: Redundant Connection #684. →*
