<!-- hand-authored -->
# 📝 Direction-Aware Traversal

> **Day 9** · Direction-Aware Traversal · 10 XP · 15 min read

---

Days 2–8 mostly treated edges as **two-way doors**. Today the graph has **direction**: roads are one-way, routes were built wrong, paths must be recorded. Two tools: **DFS with path backtracking** (collect all routes) and **DFS on a rooted tree** counting **misdirected edges** (Reorder Routes).

> **Preview contrast (Day 8 vs Day 9):** Day 8 = BFS for **shortest** steps. Day 9 = DFS for **all paths** or **edge-direction math** — depth-first, not layer-first.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Direction-aware traversal** — respect which way edges point; use DFS with explicit path state.

- **All paths (DAG)** — push node onto path list; at target save `path[:]`; recurse neighbors; **pop** (backtrack)
- **Reorder routes** — treat undirected traversal with **cost 1** if edge opposes parent→child direction in DFS tree
- **No global visited on DAG all-paths** — DAG has no cycles; path list backtrack replaces per-node permanent visited
- **Tree rooted at 0** — every connection appears once; count wrong-way edges during DFS

### 2. Simple explanation

**All paths:** You're exploring a maze of one-way streets that never loops. At each intersection you write your route on a clipboard. Reaching the destination? Photocopy the clipboard. Back up? Erase the last street name. Siblings don't share partial routes because you **pop** after trying each branch.

**Reorder routes:** City hall is node 0. You walk the road network as if every street were two-way, but tally a fine whenever you traverse a road **against** its original one-way sign (child → parent in the given direction). The DFS tree from 0 counts exactly the edges that need flipping.

### 3. Visual — DFS path list backtrack

```
DAG:  0 → 1 → 3
      ↓       ↑
      2 ──────┘

path = []
dfs(0):
  push 0 → path=[0]
  dfs(1): push → [0,1]
    dfs(3): push → [0,1,3] → TARGET → save copy ✓
    pop → [0,1]
  pop → [0]
  dfs(2): push → [0,2]
    dfs(3): push → [0,2,3] → save copy ✓
    pop, pop
  pop → []

BACKTRACK: push → recurse → pop at EVERY node after exploring children
```

### 4. Visual — misdirected edge count in DFS tree

```
Given directed edges (one-way roads):
  0 → 1,  3 → 1,  2 → 0,  4 → 2

Build adjacency for DFS from 0:
  0 → (1, cost=1)   // 0→1 matches direction, cost 0 going 1→0? 
  Actually: from a, add (b,1) for edge a→b; add (b,0) for reverse b→a

  adj[0]: (1,1), (2,0)  // 2→0 reversed as 0→2 costs 0? 
  Standard trick:
    for edge (a,b): adj[a].push(b,1); adj[b].push(a,0)
  DFS from 0: sum cost when walking edge against original arrow

Tree DFS from 0 visits all nodes (connected graph):
  Each edge checked once; cost=1 means that edge points away from parent
  → must flip. Total = min reorders.
```

### 5. The universal templates

**All paths (DAG):**
```
function dfs(u):
    path.push(u)
    if u == target: res.append(copy(path))
    else:
        for v in graph[u]:
            dfs(v)
    path.pop()
```

**Reorder (rooted DFS tree):**
```
for edge (a,b) in connections:
    adj[a].push(b, 1)   // a→b is correct direction when descending
    adj[b].push(a, 0)   // reverse traverse costs 1 flip

function dfs(u, parent):
    flips = 0
    for (v, cost) in adj[u]:
        if v != parent:
            flips += cost + dfs(v, u)
    return flips
```

### 6. Why BFS or naive approaches fail

| BFS for all paths | Problem |
|---|---|
| BFS finds shortest, not all | Need DFS backtrack |
| Queue can't easily enumerate paths | Path list + pop |

| Try every permutation of edges | Problem |
|---|---|
| Factorial | DFS tree counts each edge once |

| Global visited in all-paths DAG | Problem |
|---|---|
| Blocks valid routes that revisit nodes via different paths | DAG: no cycles, backtrack suffices |

### 7. Day 8 vs Day 9 — the contrast

| | **Day 8 — BFS Shortest** | **Day 9 — Directed DFS** |
|---|---|---|
| Goal | Min steps to target | **All** paths OR flip count |
| Structure | Unweighted layers | DAG paths / rooted tree |
| State | `(r,c,steps)` | **Path list** or edge cost |
| Backtrack? | No | **Yes** for all paths |
| Example | Binary Matrix | All Paths, Reorder Routes |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "all paths from source to target" | DFS + path push/pop |
| "directed acyclic graph" | No cycle visited set needed |
| "minimum edge reversals" / "reorder routes" | DFS tree + misdirected count |
| "all paths lead to city zero" | Root at 0, sum flip costs |
| "shortest path" only | **Day 8** BFS — not today |

**Keywords:** `path.push` · `path.pop` · `path[:]` · `misdirected` · `cost 0/1` · `parent`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forgetting `path.pop()` after recursion | Duplicates and wrong paths |
| Saving path reference not copy | `res.append(path[:])` |
| Global visited on all-paths DAG | Usually unnecessary — graph is DAG |
| BFS for reorder routes | DFS tree edge accounting |
| Wrong adjacency cost orientation | `(a,b): a→(b,1), b→(a,0)` |

### 10. Recognition drill

Read this problem aloud:

> *"Return all paths from node 0 to node n-1 in a DAG."*

Before coding, say:

> *"DFS path backtrack: push u, at target save copy, recurse adj[u], pop. Not BFS — not Day 8."*

---

*Edges have direction. First quest: collect every path. →*
