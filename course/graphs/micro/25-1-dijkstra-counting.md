<!-- hand-authored -->
# 📝 Dijkstra + Counting/DP

> **Day 25** · Advanced Shortest Paths · 20 XP · 15 min read

---

Day 19 Dijkstra answers: *"What is the minimum cost to each node?"* Day 25 adds two **extensions on the same relaxation engine** — without changing the core "pop smallest dist, relax neighbors" loop.

> **Critical distinction from Day 19:** Network Delay and Max Probability find **one number per node** (dist or prob). Today you also maintain **`ways[v]`** (path count at minimum dist) or run **all-pairs shortest paths** to count nodes within a threshold. Same Dijkstra skeleton — **extra arrays** updated during relaxation.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

Two Day 25 techniques:

| Technique | Extra state | When relaxing edge u→v with weight w |
|---|---|---|
| **Dijkstra + path count** | `ways[v]` | If `nd < dist[v]`: set `ways[v]=ways[u]`. If `nd == dist[v]`: `ways[v]+=ways[u]` (mod) |
| **All-pairs threshold** | `dist[i][j]` for all i,j | Floyd-Warshall O(n³) or n× Dijkstra; count j where `dist[i][j] ≤ T` |

Both require **non-negative edge weights** (standard Dijkstra precondition).

### 2. Simple explanation

**Count ways (#1976):** Imagine Dijkstra spreading minimum travel time from city 0. When two different routes reach city `v` with the **same** minimum time, they are equally good — add their path counts. When a **strictly shorter** route is found, discard old count and inherit from the better predecessor only.

This is **DP on the shortest-path DAG** induced by Dijkstra order — but you compute it inline during relaxation, not in a second pass.

**Smallest neighbors (#1334):** For each city `i`, how many cities are within distance `≤ threshold`? You need **every pair** `(i,j)` shortest distance. n ≤ 100 → Floyd-Warshall is clean. Pick city with smallest reach count; tie → largest index.

### 3. Visual — Dijkstra + ways (same dist layer)

```
Roads: 0 --1-- 1 --1-- 2
       0 --2-- 2

From 0:
  dist[0]=0, ways[0]=1
  Relax 0→1: dist[1]=1, ways[1]=1
  Relax 0→2: dist[2]=2, ways[2]=1
  Relax 1→2: nd=2 == dist[2] → ways[2] += ways[1] → ways[2]=2

Two shortest paths 0→2: 0→2 and 0→1→2 ✓
```

**Three outcomes per relax:**
1. `nd > dist[v]` → skip
2. `nd < dist[v]` → `dist[v]=nd; ways[v]=ways[u]`
3. `nd == dist[v]` → `ways[v]+=ways[u]`

### 4. Visual — all-pairs threshold count

```
n=3, threshold=2

dist matrix after Floyd:
     0  1  2
 0 [ 0  1  2 ]
 1 [ 1  0  1 ]
 2 [ 2  1  0 ]

From city 0: cities within T=2 → {0,1,2} count=3
From city 1: {0,1,2} count=3
Pick largest index on tie → city 2 if all equal

Tie-break rule: **smallest count**, then **largest city number**.
```

### 5. The Dijkstra + ways template

```
dist[s] = 0; ways[s] = 1
pq = [(0, s)]

while pq not empty:
    (d, u) = pop
    if d > dist[u]: continue      // stale entry

    for (v, w) in adj[u]:
        nd = d + w
        if nd < dist[v]:
            dist[v] = nd
            ways[v] = ways[u]
            push (nd, v)
        else if nd == dist[v]:
            ways[v] = (ways[v] + ways[u]) % MOD
```

**Not Day 19:** Day 19 stops at `dist[v]=min`. Day 25 adds the **`else if nd == dist[v]`** branch.

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| **Enumerate all paths, keep shortest** | Exponential — Dijkstra is O(E log V) |
| **BFS on unweighted graph** | Roads have weights — need Dijkstra |
| **Count paths before knowing min dist** | Must tie count to final dist layer |
| **Dijkstra once from arbitrary node for #1334** | Need all-pairs, not single-source |
| **Floyd when n=2000 with sparse graph** | n≤100 on #1334 — Floyd OK |

### 7. Day 19 vs Day 25

| | **Day 19 — Network Delay** | **Day 25 — Ways to Arrive** |
|---|---|---|
| Output | Max dist from source | Count paths at min dist |
| Extra array | None | `ways[]` |
| Relax tie | N/A (first pop is best) | **Add ways on equal nd** |
| Mod | No | Yes (1e9+7) |

| | **Day 19 — Max Probability** | **Day 25 — Smallest Neighbors** |
|---|---|---|
| Edge weight | Probability (max product) | Distance (sum) |
| Query | Single source to all | **All pairs** within threshold |
| Algorithm | Dijkstra variant | Floyd-Warshall |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "Number of ways" + "minimum time/distance" | Dijkstra + ways |
| "Mod 10⁹+7" on path count | Same-dist layer accumulation |
| "Within threshold distance" for **every** city | All-pairs (Floyd or n× Dijkstra) |
| "Smallest number of neighbors" | Count per row of dist matrix |
| "Network delay" / "max probability" | **Day 19** — single dist/prob only |

**Keywords:** `ways[v]` · `nd == dist[v]` · `Floyd-Warshall` · `distanceThreshold` · `tie largest index`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Add ways when `nd > dist[v]` | Only on `<` (reset) or `==` (add) |
| Forget `% MOD` on ways | Required on #1976 |
| Use BFS for weighted roads | Dijkstra |
| Single-source Dijkstra for #1334 | All-pairs needed |
| Wrong tie-break on city index | **Largest** index when reach count tied |

### 10. Recognition drill

Read this problem aloud:

> *"Return the number of ways to travel from intersection 0 to n-1 in minimum time."*

Before coding, say:

> *"Dijkstra from 0 with ways[] — reset on strictly better dist, add on equal dist. NOT plain Day 19 delay."*

Read:

> *"Find the city with fewest cities reachable within distance threshold T."*

Before coding, say:

> *"Floyd all-pairs, count dist[i][j]≤T per row, min count, tie → max i."*

---

*Same priority queue — extra counting logic. First quest: ways to arrive. →*
