<!-- hand-authored -->
# 📝 Multi-Source BFS

> **Day 6** · Multi-Source BFS · ★★★☆☆ · 10 XP · 15 min read

---

Day 2 taught **single-source BFS**: one start cell, one wavefront. Today you seed the queue with **every source at once** — all zeros, all land cells, all water tiles — and let one synchronized wave assign distances. The grid becomes a **dist matrix** filled level by level.

> **Preview contrast (Day 2 vs Day 6):** Day 2 = *one* `(r,c)` in the queue. Day 6 = *all* sources enqueued with `dist = 0` before the first pop. Same BFS skeleton — different initialization.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Multi-source BFS** — enqueue every source cell simultaneously; expand one layer at a time; first visit to any cell = shortest distance from the **nearest** source.

- **Sources** — all cells matching a condition (0, land, water, border)
- **Dist matrix** — `-1` = unvisited; `0` at sources; `dist[nr][nc] = dist[r][c] + 1` on first reach
- **One queue, one wave** — no outer loop restarting BFS per source
- **First visit wins** — BFS order guarantees minimum steps in unweighted grids

### 2. Simple explanation

Imagine every fire station in a city sounding the alarm at the same instant. Each station's siren reaches its neighbors in one minute, then those neighbors reach *their* neighbors in the next minute. A house equidistant from two stations still gets a time — whichever wave arrives first. You don't run separate floods from each station; you **start them all together** and read off times from a shared clock.

### 3. Visual — dist matrix wave from all zeros

```
mat:          dist after multi-source BFS:
1 0 1         -1  0  -1
0 0 0    →     1  0   1
1 0 1          2  1   2

Queue init: all (r,c) where mat[r][c]==0, dist=0
Layer 1: neighbors of zeros get dist=1
Layer 2: next ring gets dist=2
Stop when queue empty — every reachable cell has nearest-0 distance
```

### 4. Visual — Day 2 single-source vs Day 6 multi-source

```
Same grid, need distance to nearest 0:

DAY 2 (single-source from one 0):
  Run BFS from (0,1) only → fills half the grid
  Run again from (1,0) → redundant work
  Run again from (1,2) ...  → O(sources × cells) if repeated

DAY 6 (multi-source):
  Queue = [(0,1,0), (1,0,0), (1,1,0), (1,2,0), (2,1,0)]  all at once
  One BFS pass → entire dist matrix ✓
```

### 5. The universal template

```
function multiSourceBFS(grid):
    dist = matrix filled with -1
    queue = empty

    for each cell (r,c):
        if cell is a SOURCE:
            dist[r][c] = 0
            queue.enqueue((r, c))

    while queue not empty:
        (r, c) = queue.dequeue()
        for each neighbor (nr, nc):
            if in bounds and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                queue.enqueue((nr, nc))

    return dist
```

Optional variant (Far from Land): track `maxDist` per layer instead of writing a full matrix — same queue seeding, level-by-level expansion.

### 6. Why multi-source beats repeated single-source

| Repeated single-source (Day 2 loop) | Problem |
|---|---|
| BFS from each 0 separately | O(sources × cells) — wasteful |
| Take min of many distance arrays | Extra space and merge logic |
| DFS from each 1 toward land | Wrong tool — need nearest, not path existence |

| Per-cell BFS from each 1 (Far from Land wrong way) | Problem |
|---|---|
| BFS from every land cell to find water | O(cells²) — multi-source from **land** is the fix |

**The insight:** "Distance to nearest X" almost always means **seed all X**, not search from every non-X.

### 7. Day 2 vs Day 6 — the contrast

| | **Day 2 — Single-Source** | **Day 6 — Multi-Source** |
|---|---|---|
| Queue init | One `(r,c)` or one node | **All** sources enqueued |
| Question answered | Reachable from A? Steps from A? | Nearest source distance for **every** cell |
| Typical output | Path length, level count | Full **dist matrix** or max layer |
| Restart? | One run | Never restart — one synchronized wave |
| Example | Rotting Oranges (eventually multi), Flood Fill | 01 Matrix, Far from Land, Highest Peak (test) |

If the problem says "distance to the **closest** 0 / land / water," think Day 6 immediately.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "distance to nearest 0" / "01 matrix" | Multi-source from all 0s |
| "furthest from land" / "as far from land as possible" | Multi-source from all **land** (1s) |
| "elevation map from water" / "highest peak" | Multi-source from all water cells |
| "multiple rotten oranges at t=0" | Multi-source (Day 2 preview, Day 6 formal) |
| "shortest path from A to B" | **Single-source** Day 8 — one start, one goal |

**Keywords:** `enqueue all sources` · `dist = -1` · `first visit` · `nearest` · `wave` · `layer`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| BFS from each 1 toward 0 (01 Matrix) | Seed **all 0s**, expand to 1s |
| Forgetting `dist == -1` check | That's your visited set |
| Using DFS for "nearest" distances | BFS layers = shortest unweighted distance |
| Not enqueueing all sources before the loop | Init pass must fill the queue completely |
| Confusing with Day 8 `(r,c,steps)` | Day 6 writes a matrix; Day 8 often returns one path length |

### 10. Recognition drill

Read this problem aloud:

> *"Given a binary matrix, return a matrix of distances to the nearest 0 for each cell."*

Before coding, say:

> *"Multi-source BFS: seed queue with every 0, dist=0; dist matrix -1 elsewhere; wave outward. Not Day 2 loop per zero — one queue, all sources."*

---

*All sources fire at once. First quest: fill the dist matrix. →*
