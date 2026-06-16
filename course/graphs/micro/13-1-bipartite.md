<!-- hand-authored -->
# 📝 Graph Two-Coloring

> **Day 13** · Bipartite Graphs · ★★★★☆ · 15 XP · 15 min read

---

Can you split the nodes into **two groups** so every edge connects different groups? That's **bipartite** — equivalent to **2-coloring** the graph. Assign color 0 or 1; every edge must connect opposite colors. Same color on both ends? Not bipartite.

> **Contrast (Day 11–12):** Directed dependency graphs. Today: **undirected** conflict/partition graphs. No in-degree table — BFS/DFS with alternating colors level by level.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Two-color BFS/DFS** on an undirected graph:

```
color[v] = -1  (unassigned)
for each unvisited start:
    BFS: assign start color 0
    for each edge (u,v):
        if color[v] == -1: color[v] = color[u] ^ 1
        elif color[v] == color[u]: NOT BIPARTITE
```

| State | Meaning |
|---|---|
| `-1` | Unvisited |
| `0` / `1` | Two partitions |

XOR flip (`^ 1`) toggles 0↔1 when crossing an edge.

### 2. Simple explanation

Imagine seating people at two tables. Enemies must sit at **different** tables. Walk the social graph: each friend-of-enemy constraint forces the opposite table. If you ever need to seat someone at both tables, the graph has an **odd cycle** — bipartite impossible.

**BFS levels:** Each BFS layer alternates color — neighbors of color 0 get color 1, their neighbors get 0, etc. Level parity *is* the partition.

### 3. Visual walkthrough — two-color BFS

```
Graph:  0 — 1 — 2
        |       |
        3 — 4   5

BFS from 0 (color 0):
  Level 0: 0→0
  Level 1: 1,3→1
  Level 2: 2,4→0
  Level 3: 5→1

Valid 2-coloring ✓

Odd cycle (NOT bipartite):

    0 — 1
    |   |
    3 — 2 — 0

BFS: 0→0, 1→1, 2→0, but edge 1—2 both color 1 ✗
```

### 4. Conflict graph construction

Many problems don't hand you an adjacency list — you **build** it:

```
Possible Bipartition #886:
  n people, dislikes = pairs who can't share a group
  → undirected edge for each dislike
  → 2-color the conflict graph
```

Same BFS template after building `g[a].push(b); g[b].push(a)`.

### 5. What problem does this solve?

| Problem family | How 2-color helps |
|---|---|
| Is graph bipartite? | Direct 2-color check |
| Split into two conflict-free groups | Build conflict graph, 2-color |
| Flower planting (C-test) | Greedy 4-color on tree-like — bipartite special case |
| Grid checkerboard | Implicit bipartite (even/odd parity) |

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| Try all 2^n partitions | O(2^n) |
| 3-color DFS (Day 11) | Directed cycle tool — wrong for undirected bipartite |
| Union-Find alone | Merges components but doesn't check bipartiteness |
| Color without checking existing | Must verify `color[v] == color[u]` conflict |

### 7. Day 13 vs Day 11–12

| | **Day 11–12** | **Day 13** |
|---|---|---|
| Edge type | Directed | Undirected |
| Question | Cycle? Order? | Two-group split? |
| Tool | 3-color / Kahn | 2-color BFS |
| Odd cycle | Directed back-edge | Same-color neighbor |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "bipartite" / "two sets" | 2-color BFS/DFS |
| "partition into two groups" | Conflict graph + 2-color |
| "dislikes" / "cannot be together" | Edge = conflict |
| "is possible to divide" | Bipartite check |

**Keywords:** `bipartite` · `2-color` · `XOR 1` · `conflict graph` · `odd cycle`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Directed edges for dislikes | Undirected — both directions |
| Only checking one component | Loop all nodes as BFS starts |
| Using 3 colors | Bipartite = exactly 2 colors |
| Building conflict edges wrong | Dislike = edge between those two nodes |

### 10. Recognition drill

Read this problem aloud:

> *"Given n people and pairs who dislike each other, return true if you can split everyone into two groups so no dislikers share a group."*

Before coding, say:

> *"Build undirected conflict graph from dislikes → 2-color BFS. Same color on an edge = false."*

**Not** course schedule. **Not** Kahn peel. **Conflict graph + two-color.**

---

*Two colors, level by level. First quest: Is Graph Bipartite? →*
