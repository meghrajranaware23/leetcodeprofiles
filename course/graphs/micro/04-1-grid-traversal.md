<!-- hand-authored -->
# 📝 Grids as Graphs

> **Day 4** · Grids as Graphs · ★★☆☆☆ · 10 XP · 10 min read

---

Your mission today: treat every **`m×n` matrix as a graph** — cells are nodes, **4-directional** edges connect neighbors. Two core moves: **count perimeter** (+1 per water/boundary edge) and **flood each island** (restart DFS/BFS from every unvisited `1`).

---

## Part 1 — Four Directions, Two Problems

### 1. The grid graph model

| Concept | Grid version |
|---|---|
| Node | Cell `(r, c)` |
| Edge | To `(r±1,c)` or `(r,c±1)` if in bounds |
| Neighbor check | `0 <= nr < m and 0 <= nc < n` |
| Visited | Flip `'1'→'0'`, or separate `vis[][]` |

**DIRS** (use everywhere in E-Rank):

```python
DIRS = (1,0), (-1,0), (0,1), (0,-1)
```

Day 2 used the same loop for BFS floods. Day 4 applies it to **perimeter arithmetic** and **component counting**.

### 2. Pattern A — Island perimeter (+1 per exposed edge)

Each land cell `1` contributes **4** side-length units. Each **shared edge** with another land cell removes **2** (one from each cell — counted twice otherwise).

```
Land cell alone:
  +4 (all sides touch water/outside)

Two land cells horizontal neighbors:
  Each +4, shared vertical edge −2 each → total 4+4−2−2 = 4 ✓
```

**Per-cell formula** (scan all cells once):

```
if grid[r][c] == 1:
    peri += 4
    if up neighbor is land:    peri -= 2
    if left neighbor is land:  peri -= 2
```

Only check **up** and **left** — each internal edge counted once from both sides. Quest 1 (#463) uses exactly this.

Alternative mental model: for each land cell, add **+1 for each of 4 sides** that touches water or out-of-bounds (equivalent result).

### 3. Pattern B — Count islands (restart flood from each `1`)

```
count = 0
for each cell (r,c):
    if grid[r][c] == '1':
        count += 1
        dfs(r, c)    # marks entire island visited (e.g. flip to '0')
```

Each unvisited `1` starts a **new component** — same restart loop as Day 3 Provinces, but on a grid. Quest 2 (#200) is the canonical interview form.

### 4. Visual — perimeter on a small island

```
Grid:
  0 1 0
  1 1 1
  0 1 0

Land at (0,1): +4, no up/left land → contributes 4
Land at (1,0): +4, right neighbor land → −2 → 2 net so far…
(Full scan yields perimeter 12 — trace on paper)
```

### 5. Visual — flood marking one island

```
Before:
  1 1 0
  1 0 0
  0 0 1

Scan finds (0,0)=='1' → count=1, dfs floods (0,0),(0,1),(1,0) → all '0'
Scan finds (2,2)=='1' → count=2, dfs floods (2,2)

Answer: 2 islands
```

### 6. Pattern signals — Day 4 only

| When the problem says… | Think… |
|---|---|
| "island perimeter" / "boundary length" | +4/−2 scan OR +1 per water edge |
| "number of islands" | Restart + dfs from each `1` |
| `m×n` binary grid | 4-dir, bounds check |
| "4-directionally connected" | Grid graph edges |
| "sink" / "mark visited" | Mutate grid in-place |

**Keywords:** `4-direction` · `(r,c)` · `DIRS` · `perimeter` · `island` · `component` · `restart`

### 7. Why brute force fails

| Brute force | Problem |
|---|---|
| Count land cells × 4 for perimeter | Ignores shared internal edges — overcounts |
| Check every pair of land cells for connectivity | O(k²) per island |
| 8-direction flood when problem says 4 | Wrong connectivity — diagonal corners don't connect |
| Count islands without marking visited | Same island counted multiple times |
| Forget bounds on neighbor check | Index errors |

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Subtract 2 for all 4 neighbors in perimeter | Only up+left (or count water edges once) |
| Start flood but forget `count++` before dfs | Increment when you **discover** new island |
| Use BFS when DFS is simpler for island sink | Either works; DFS in-place is common |
| `'1'` vs `1` type mismatch | Match grid type (char vs int) |
| DFS on `0` cells | Only flood from land |

### 9. Bridge from Day 3

Day 3: **restart loop** on graph nodes.  
Day 4: **same loop** on grid cells — `(r,c)` instead of index `i`, 4-dir instead of `adj[i]`.

Perimeter is the new twist: local **edge arithmetic** without full flood.

### 10. Recognition drill — today's quests

**Quest 1 — Island Perimeter #463:**
> *"Each land +4; subtract 2 for each up/left land neighbor."*

**Quest 2 — Number of Islands #200:**
> *"For each `'1'`: count++, dfs sink entire island to `'0'`."*

---

*Grid = graph with 4 edges per cell. Quest 1 counts edges; Quest 2 counts components. →*
