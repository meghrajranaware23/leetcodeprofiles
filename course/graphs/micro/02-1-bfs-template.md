<!-- hand-authored -->
# 📝 BFS: Breadth-First Search

> **Day 2** · BFS — Breadth-First Search · 10 XP · 10 min read

---

Your mission today: **learn grid BFS on `(r, c)` coordinates** — the queue goes **wide before deep**. If you completed the Trees pack Day 3 (level-order), you already know the FIFO queue and `len(q)` level batches. Here we apply that same skeleton to **grids and graphs**, not binary tree children.

---

## Part 1 — The Queue Expands a Wavefront

### 1. What is BFS on a grid?

Each cell `(r, c)` is a node. Edges connect **4-directional** neighbors (up, down, left, right) that pass your condition (same color, fresh orange, etc.).

Tool: a **FIFO queue** of coordinates.
- Dequeue `(r, c)`, process cell
- Enqueue valid unvisited neighbors

**Visit order:** all cells at distance 1 before distance 2 — same "level" idea as tree BFS, but neighbors are `(r±1, c±1)` instead of `left`/`right` children.

### 2. Bridge from Trees Day 3 (no repeat lesson)

| Trees BFS (#102) | Graphs BFS (today) |
|---|---|
| Queue of `TreeNode*` | Queue of `(r, c)` pairs |
| Enqueue `node.left`, `node.right` | Enqueue 4 grid neighbors |
| `for _ in range(len(q))` = one level | Same batch loop = **one minute** in Rotting Oranges |
| Output grouped by depth | Distance / time = number of batches |

You already know **why** `level_size = len(queue)` — newly enqueued cells belong to the **next** wave. Today you only change **what** gets enqueued.

### 3. Visual — grid BFS from `(1,1)` (no DFS)

```
Grid (1 = land, 0 = water):
  0 1 0
  1 1 1
  0 1 0

Start queue = [(1,1)]

Wave 0: process (1,1) → enqueue (0,1), (2,1), (1,0), (1,2)
Wave 1: process those 4 neighbors (all valid 1-cells)
Wave 2: enqueue from wave 1 … until queue empty

Visit order (BFS): (1,1) → (0,1),(2,1),(1,0),(1,2) → …
```

**Read it as:** center cell first, then ring by ring — not drilling down one branch.

### 4. The grid BFS skeleton

```python
DIRS = (1,0), (-1,0), (0,1), (0,-1)
q = deque([(sr, sc)])
visited or mutate grid in-place

while q:
    r, c = q.popleft()
    for dr, dc in DIRS:
        nr, nc = r + dr, c + dc
        if in_bounds(nr, nc) and not_yet_visited(nr, nc):
            mark visited
            q.append((nr, nc))
```

**Bounds check:** `0 <= nr < m and 0 <= nc < n` — every grid quest needs this.

### 5. Multi-source BFS — level timeline (Rotting Oranges preview)

Some problems start BFS from **many cells at once** (all rotten oranges). Enqueue every source before the loop; each `len(q)` batch = **one time step**.

```
Minute 0: queue = all rotten cells
Minute 1: process entire batch → newly rotten neighbors join queue
Minute 2: next batch …
```

Quest 2 (#994) counts minutes with exactly this pattern — same Trees level batch, different meaning (time instead of tree depth).

### 6. Pattern signals — Day 2 only

| When the problem says… | Think… |
|---|---|
| "shortest path" / "minimum steps" (unweighted grid) | BFS from source |
| "spread" / "minutes" / "levels" on grid | Multi-source BFS + batch count |
| "fill" / "flood" connected cells | BFS/DFS from click; BFS if levels matter |
| `m×n` matrix + 4-direction | `(r,c)` queue + DIRS |
| "nearest" / "minimum time" (no weights) | BFS — first visit wins |

**Keywords:** `queue` · `(r,c)` · `BFS` · `len(q)` · `4-direction` · `deque`

### 7. Why brute force fails

| Brute force | Problem |
|---|---|
| DFS for "minimum minutes to spread" | DFS doesn't guarantee shortest time — BFS does |
| Process queue without batching for time | Can't count minutes / levels |
| No bounds check on `(nr, nc)` | Index out of range |
| Revisit cells without marking | Infinite queue growth |
| Nested loops simulating waves | O(n²) passes; one BFS is O(m·n) |

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Using stack (LIFO) instead of queue | That's DFS, not BFS |
| Forgetting `len(q)` batch for timeline | Rotting Oranges needs per-minute loop |
| 8-direction when problem says 4 | Read problem — today's grids are 4-dir |
| Not marking visited on enqueue | Duplicate cells in queue |
| Confusing Flood Fill quest pattern name with required algo | #733 solution uses DFS — both flood the component |

### 9. BFS vs DFS on grids (when to pick)

| Signal | Pick |
|---|---|
| Minimum steps / minutes / shortest | **BFS** |
| Just recolor / explore component / count area | BFS or DFS (Day 3 owns DFS intro) |
| Level-by-level timeline | **BFS** with batch loop |

### 10. Recognition drill — today's quests

**Quest 1 — Flood Fill #733:**
> *"From `(sr,sc)`, recolor connected same-value cells — 4-dir flood (DFS or BFS both work)."*

**Quest 2 — Rotting Oranges #994:**
> *"Multi-source BFS. Batch `len(q)` = one minute. Track fresh count."*

---

*You know the queue on grids. Quest 1 floods a region; Quest 2 counts a timeline. →*
