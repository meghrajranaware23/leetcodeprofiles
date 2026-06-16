<!-- hand-authored -->
# 📝 Directed Cycle Detection

> **Day 11** · Cycle Detection & Topological Sort · ★★★☆☆ · 15 XP · 15 min read

---

A **directed cycle** means you can follow arrows forever and return to where you started. Course prerequisites with a cycle? Impossible to finish. Today's weapon: **3-color DFS** — white (unseen), gray (on the current path), black (fully processed). Hit a gray neighbor? Cycle found.

> **Preview (Day 12):** Kahn's algorithm peels in-degree-zero nodes instead. Same "can you order this DAG?" question — different tool. You'll compare both tomorrow.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**3-color DFS cycle detection** on a directed graph:

| Color | Meaning | When set |
|---|---|---|
| **White (0)** | Not visited yet | Initial state |
| **Gray (1)** | On the active DFS path | Enter node |
| **Black (2)** | All descendants explored | Exit node |

**Cycle rule:** During DFS from `u`, if neighbor `v` is **gray**, there's a back-edge `u → v` on the current path → **cycle**.

### 2. Simple explanation

Imagine exploring a one-way maze. You drop breadcrumbs on the path you're currently walking (**gray**). If you step onto a breadcrumb still on your trail, you've looped. When you backtrack out of a dead end, you erase that breadcrumb (**black**) — that corridor is fully explored; reaching it again from elsewhere is fine.

**Kahn preview (Day 12):** Instead of colors, count how many edges point *into* each node. Repeatedly remove nodes with in-degree 0 (nothing left to wait for). If nodes remain when the queue empties → cycle. Today's quests use Kahn; the concept page teaches you to *see* cycles with DFS first.

### 3. Visual walkthrough — 3-color DFS

```
Prerequisite graph (edge = must take B before A):

    0 ──→ 1 ──→ 2
    ↑           │
    └───────────┘     ← cycle 0→1→2→0

DFS from 0:
  enter 0 → GRAY
  enter 1 → GRAY
  enter 2 → GRAY
  neighbor 0 is GRAY → CYCLE ✗

DAG (no cycle):

    3 ──→ 1 ──→ 0
    3 ──→ 2 ──→ 0

Peel order (Kahn preview): 3 first, then 1&2, then 0
```

### 4. The universal template

**3-color DFS:**
```
function dfs(u):
    color[u] = GRAY
    for v in adj[u]:
        if color[v] == GRAY: return CYCLE
        if color[v] == WHITE and dfs(v) == CYCLE: return CYCLE
    color[u] = BLACK
    return OK
```

**Kahn preview (used in quests today):**
```
build indeg[]; queue all with indeg==0
while queue: pop u, for each v: if --indeg[v]==0 push v
return processed == n   // false → cycle
```

### 5. What problem does this solve?

| Problem family | How this pattern helps |
|---|---|
| Course schedule feasibility | Cycle in prereq graph = can't finish |
| Dependency ordering | No cycle → topological order exists |
| Deadlock detection | Circular wait = directed cycle |
| Safe-state analysis (Day 12) | Reverse peel — same skeleton, flipped edges |

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| Try every permutation of courses | O(n!) — impossible at n=5000 |
| DFS with only visited/unvisited | Misses cross-edge vs back-edge distinction |
| Check cycles in undirected style | Directed back-edges need gray, not just "seen" |
| BFS level count for cycle detect | BFS doesn't track the active path |

**The insight:** Gray = "currently on stack." Only a gray neighbor proves a directed cycle.

### 7. Day 11 vs neighbors

| | **Day 11** | **Day 12** | **Day 13** |
|---|---|---|---|
| Question | Is there a cycle? Can we order? | Peel in-deg 0; reverse peel | Two-color undirected |
| Tool | 3-color DFS + Kahn preview | Kahn / reverse Kahn | BFS/DFS 2-color |
| Graph type | Directed | Directed | Undirected |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "prerequisites" / "must finish X before Y" | Directed graph; cycle = impossible |
| "can you finish all courses" | Cycle detection |
| "valid ordering" / "return order" | Topological sort (needs DAG) |
| "dependencies" / "blocked by" | Edge A→B means B before A |

**Keywords:** `directed` · `prerequisite` · `cycle` · `gray` · `in-degree` · `topological`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Building edge A→B when problem says "A requires B" | Read direction: prereq B → course A |
| Treating gray and black the same | Black = safe to revisit; gray = cycle |
| Using 2-color for directed cycle | 2-color is bipartite (Day 13), not directed cycles |
| Forgetting disconnected components | Loop all nodes; start DFS on each white node |

### 10. Recognition drill

Read this problem aloud:

> *"There are `numCourses` courses and prerequisites `[a, b]` meaning you must take course `b` before course `a`. Return true if you can finish all courses."*

Before coding, say:

> *"Directed prereq graph → cycle detection. Kahn: peel in-degree 0; if count < n, cycle. (Or 3-color DFS: gray neighbor = cycle.)"*

**Not** islands. **Not** bipartite. **Course schedule.**

---

*You can spot a directed cycle. First quest: Course Schedule #207. →*
