<!-- hand-authored -->
# 📝 Connected Component Discovery

> **Day 5** · Component Exploration · 10 XP · 10 min read

---

Your mission today: **extend component floods with a counter** (max island area) and **clone graphs with an old→new map** (BFS/DFS copy). Day 4 counted islands; Day 5 asks *how big* and *how to duplicate*.

---

## Part 1 — Count During Flood, Copy With a Map

### 1. Component area counter

Same restart loop as Number of Islands #200 — but `dfs` **returns** the number of cells sunk:

```python
def dfs(r, c):
    grid[r][c] = 0
    area = 1
    for each 4-neighbor still land:
        area += dfs(nr, nc)
    return area

best = max(best, dfs(r,c))   # when discovering new island
```

Quest 1 (#695 Max Area): track **maximum** area across all components.

### 2. Clone graph — old node → new node map

Given a linked graph (`Node` with `val` and `neighbors`), build a **deep copy**.

Critical tool: `map[old_node] = new_node`

```
Visit old node u:
  if u already in map: return map[u]
  create copy with same val
  map[u] = copy
  for each neighbor v of u:
    copy.neighbors.append(clone(v))
  return copy
```

Quest 2 (#133): BFS or DFS both work — map prevents infinite loops on cycles.

### 3. Visual — area flood on grid

```
Grid:
  1 1 0
  1 0 0
  0 0 1

Island 1 flood from (0,0): area = 3
Island 2 flood from (2,2): area = 1
Max area = 3
```

Same walk as #200 — add **accumulation** during recursion.

### 4. Visual — clone with map (cycle-safe)

```
Original:  1 — 2
           |   |
           4 — 3   (cycle 1-2-3-4-1)

clone(1):
  create copy1, map[1]=copy1
  clone(2): create copy2, map[2]=copy2
    clone(3) …
    clone(4) …
    when edge back to 1: map[1] already exists → reuse copy1
```

Without `map`, you'd recreate node 1 forever on the cycle.

### 5. BFS clone variant

```python
q = deque([start])
map[start] = Node(start.val)
while q:
    u = q.popleft()
    for v in u.neighbors:
        if v not in map:
            map[v] = Node(v.val)
            q.append(v)
        map[u].neighbors.append(map[v])
```

Quest solution uses DFS; BFS is equivalent — pick one traversal, keep the map.

### 6. Pattern signals — Day 5 only

| When the problem says… | Think… |
|---|---|
| "max area" / "largest island" | Restart + dfs returns size |
| "clone" / "copy graph" | `map[old]=new` before recursing neighbors |
| `Node` with `neighbors` list | Explicit graph, not grid |
| Cycles in graph | Map breaks infinite recreation |
| "deep copy" | New nodes, same structure |

**Keywords:** `area` · `max` · `clone` · `map` · `old→new` · `neighbors` · `component size`

### 7. Why brute force fails

| Brute force | Problem |
|---|---|
| Count area with global variable only, no return | Works but messy; returning area is cleaner |
| Clone without map on cyclic graph | Infinite recursion |
| Serialize graph to string and parse back | Overkill; O(V+E) traverse suffices |
| Scan grid without restart for max area | Misses islands not at origin |
| Deep copy by value without tracking old nodes | Duplicate nodes for shared neighbors |

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forget `map[old]` before recursing neighbors | Cycle stack overflow |
| Max area: forget `max()` across components | Only measure first island |
| Clone: append neighbor before copy exists | Create copy first, then link |
| Grid area: not sinking visited cells | Double-count cells |
| Use grid dfs on `Node` graph | Different input — follow `neighbors` |

### 9. E-Rank synthesis

| Day | Skill |
|---|---|
| 1 | Build graph, degrees, connectivity |
| 2 | Grid BFS, multi-source time |
| 3 | DFS, restart loop, reachability |
| 4 | Grid perimeter, island count |
| **5** | **Sized components + graph clone** |

### 10. Recognition drill — today's quests

**Quest 1 — Max Area of Island #695:**
> *"Same as #200, but dfs returns area; track `best = max(best, area)`."*

**Quest 2 — Clone Graph #133:**
> *"`map[old]=new`; clone neighbors recursively; map handles cycles."*

---

*Day 5 closes E-Rank: size your floods, duplicate your graphs. Then the rank tests. →*
