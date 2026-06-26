<!-- hand-authored -->
# 📝 Threshold BFS / Multi-State Paths

> **Day 28** · Advanced Path Optimization · 25 XP · 18 min read

---

Day 8 BFS finds shortest paths when every step costs 1. Day 19 Dijkstra handles weighted edges. Day 28 covers two **S-Rank hybrids** where the answer is not a plain `(r,c)` or `(node)` BFS:

1. **Binary search on the answer + BFS feasibility** — "What is the minimum threshold T such that a path exists?"
2. **Multi-dimensional state BFS** — the node is `(r, c, k)` where `k` is remaining resource (obstacles you can still eliminate).

Both reuse the Day 8 BFS skeleton. The difference is **what you binary-search** or **what extra dimension lives in the visited array**.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

| Variant | Search space | Feasibility check | Today's quest |
|---|---|---|---|
| **Threshold + BFS** | Integer answer `T` (water level, max edge weight) | BFS/DFS: can we reach goal with constraint ≤ T? | Swim in Rising Water #778 |
| **3D state BFS** | `(row, col, remaining_k)` | Standard BFS; visited is 3D | Obstacles Elimination #1293 |

**Threshold pattern:** If `can(T)` is monotone (more permissive as T grows), binary search T. Each `can(T)` is O(cells) BFS.

**Multi-state pattern:** When the same cell can be revisited with **different remaining resources**, visited must include that resource: `vis[r][c][rem]`.

### 2. Simple explanation — binary search + BFS

**Swim in Rising Water:** Water rises to level T. You may enter cell `(r,c)` only if `grid[r][c] ≤ T`. Find the **smallest T** where a path exists from top-left to bottom-right.

Instead of trying every T from 0 to max, binary search T. For each mid, run BFS: flood cells with value ≤ mid. If BFS reaches the goal → try smaller T; else need larger T.

The answer space is **sorted by feasibility** — classic "binary search the answer."

### 3. Visual — binary search + feasibility BFS

```
Grid (values = elevation):
  0  2
  1  3

Start (0,0)=0, end (1,1)=3
lo = max(0,3)=3, hi = 3  → but let's trace general case:

can(T=1): cells ≤1 are (0,0),(1,0) — can't reach (1,1) ✗
can(T=2): add (0,1) — still blocked at (1,1) ✗
can(T=3): all cells open — path 0→1→3 ✓

Binary search finds T=3.

can(T) BFS trace (T=2):
  queue [(0,0)]  vis={(0,0)}
  pop (0,0) → neighbors (1,0) val=1≤2 ✓, (0,1) val=2≤2 ✓
  queue [(1,0),(0,1)]
  from (0,1): (1,1) val=3>2 ✗ — goal unreachable
```

### 4. Simple explanation — 3D state BFS

**Shortest Path with Obstacles Elimination:** Grid with obstacles (`1`). You may eliminate at most `k` obstacles total. Shortest path from `(0,0)` to `(m-1,n-1)`.

A plain `(r,c)` visited array fails: you might reach `(5,3)` with 2 eliminations left, then later need to return with 1 left — different states!

**State = `(r, c, rem)`** where `rem` = obstacles still eliminable. Queue `(r, c, rem, dist)`. When stepping onto obstacle cell, pay `rem - 1`. Visited: `vis[r][c][rem]` — same cell, different `rem` = different nodes.

### 5. Visual — (r, c, k) state BFS

```
Grid (0=free, 1=obstacle), k=1:

        (0,0,k=1,d=0)
           ↓
        (0,1,k=1,d=1)  — free cell
           ↓
        (0,2,k=0,d=2)  — obstacle, used 1 elimination
           ↓
        (1,2,k=0,d=3)  — goal!

Key: (0,2) with k=1 might also be reachable — that's a DIFFERENT
state from (0,2,k=0). vis[0][2][1] and vis[0][2][0] are separate.
```

### 6. The universal templates

**Binary search + feasibility:**
```
lo = min feasible lower bound, hi = max possible answer
while lo < hi:
    mid = (lo + hi) / 2
    if can(mid): hi = mid      // still feasible — try smaller
    else: lo = mid + 1         // need more permissive threshold
return lo

function can(T):
    BFS from start; only visit cells with value ≤ T
    return reached goal
```

**3D state BFS:**
```
queue = [(sr, sc, k, 0)]
vis[sr][sc][k] = true
while queue:
    (r, c, rem, d) = pop
    if (r,c) == goal: return d
    for each neighbor (nr, nc):
        nrem = rem - grid[nr][nc]    // 0 if free, 1 if obstacle
        if nrem >= 0 and not vis[nr][nc][nrem]:
            vis[nr][nc][nrem] = true
            push (nr, nc, nrem, d+1)
return -1
```

### 7. Why brute force fails

| Brute force | Problem |
|---|---|
| Try every T from 0 to max linearly | O(max · n²) — binary search cuts to O(n² log max) |
| Dijkstra on elevation grid | Overkill — feasibility is yes/no per threshold |
| 2D BFS ignoring remaining k | Wrong — same cell, different k = different paths |
| DFS for shortest path with obstacles | BFS guarantees minimum steps |
| BFS without `vis[r][c][rem]` | Revisit same (r,c) at worse k wastes queue |

**The insight:** Name whether you're **searching an answer** (binary search + check) or **expanding state** (add dimension to visited).

### 8. Day 28 vs neighbors

| | **Day 8 BFS** | **Day 19 Dijkstra** | **Day 28 Threshold** | **Day 28 3D State** |
|---|---|---|---|---|
| Goal | Min steps | Min weighted cost | Min threshold T | Min steps with k budget |
| State | `(r,c)` | `(dist, node)` | `(r,c)` inside can(T) | `(r,c,rem)` |
| Search | Direct BFS | Heap relax | Binary search outer loop | BFS with 3D vis |
| Monotone? | N/A | N/A | can(T) monotone in T | N/A |

### 9. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "minimum time until you can swim" / "minimum maximum cell value on path" | Binary search T + BFS can(T) |
| "eliminate at most k obstacles" / "budget remaining" | `(r,c,k)` 3D state BFS |
| "shortest path" + extra counter per cell | Add dimension to visited |
| "can you reach with limit L?" inside a loop | Feasibility check for binary search |

**Keywords:** `binary search answer` · `can(T)` · `(r,c,k)` · `vis[r][c][rem]` · `monotone feasibility`

### 10. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Binary search without monotone can(T) | Verify: larger T never makes path harder |
| lo bound too low in swim water | Start `lo = max(grid[0][0], grid[m-1][n-1])` — endpoints must be enterable |
| 2D visited for obstacle elimination | Must be `vis[r][c][rem]` — up to k+1 layers |
| Using Dijkstra when unweighted + threshold | BFS inside can(T) is enough |
| Forgetting goal check inside can(T) BFS | Return true only when `(m-1,n-1)` reached |

### 11. Recognition drill

Read this problem aloud:

> *"You can eliminate at most k obstacles. Find the shortest path from top-left to bottom-right."*

Before coding, say:

> *"3D state BFS: node = (r,c,rem). Queue (r,c,rem,d). vis[r][c][rem]. Not Day 8 — same cell with different rem is a different state."*

Read this one:

> *"Find the minimum elevation t such that you can swim from top-left to bottom-right, waiting until t for each cell."*

Before coding, say:

> *"Binary search t. can(t) = BFS on cells with grid[r][c] ≤ t. Monotone → binary search, not Dijkstra."*

---

*Two S-Rank path patterns unlocked. Quest 1: Swim in Rising Water — binary search the water level. →*
