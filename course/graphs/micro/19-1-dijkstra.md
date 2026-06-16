<!-- hand-authored -->
# 📝 Dijkstra's Shortest Path

> **Day 19** · Dijkstra's Algorithm · ★★★★☆ · 25 XP · 15 min read

---

Unweighted shortest path? BFS (Days 2, 8). **Weighted** shortest path? Today: **Dijkstra** — a min-heap that always expands the currently cheapest known node. Each pop fixes one distance forever (non-negative weights). Relax neighbors; push improvements. This is the highest-priority pattern in B-Rank.

> **Preview contrast (BFS vs Dijkstra):** BFS queue order = hop count. Dijkstra heap order = **total weight**. Same "first visit wins" spirit — different priority key: `(dist, node)` not `(r, c)`.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Dijkstra's algorithm** — single-source shortest paths with **non-negative** edge weights:

- **`dist[v]`** — best known distance from source to v; `INF` initially; `dist[src] = 0`
- **Min-heap** — stores `(dist, node)`; always pop smallest dist first
- **Relaxation** — for edge `u → v` weight `w`: if `dist[u] + w < dist[v]`, update and push
- **Stale skip** — if popped `d > dist[u]`, skip (outdated heap entry)

Works on explicit graphs **and** implicit grids (Day 20).

### 2. Simple explanation

You're dispatching a courier from HQ. The heap is your to-do list sorted by **total travel time so far**. Always send the courier who has spent the least time traveling — that's the node whose distance is now final. From there, check each neighbor: "Can I reach you faster through me?" If yes, update their best time and add them to the heap. Non-negative weights guarantee that once a node is popped, no cheaper route exists.

### 3. Visual — min-heap relaxation trace

```
Graph (source 0):
  0 --1--> 1 --2--> 2
  0 --4--> 2

dist: all INF, dist[0]=0
heap: [(0,0)]

Pop (0,0): relax 1 → dist[1]=1, heap [(1,1)]
           relax 2 → dist[2]=4, heap [(1,1),(4,2)]

Pop (1,1): relax 2 → dist[2]=min(4,1+2)=3, heap [(3,2),(4,2)]

Pop (3,2): done — dist = [0, 1, 3]
Pop (4,2): stale (4 > 3) → skip
```

### 4. Visual — modified Dijkstra (maximize)

```
Path with Maximum Probability #1514:
  Same skeleton — maximize instead of minimize
  prob[v] = best product from start; prob[start] = 1.0
  Relax: prob[v] = max(prob[v], prob[u] * edge_prob)
  Max-heap (or negate for min-heap): pop largest prob first
  Stale skip: if popped p < prob[u], skip
```

### 5. The universal template

```
function dijkstra(source, graph):
    dist = array of INF; dist[source] = 0
    pq = min-heap; push (0, source)

    while pq not empty:
        (d, u) = pop(pq)
        if d > dist[u]: continue          // stale entry

        for each (v, weight) in adj[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                push (dist[v], v)

    return dist
```

**Max-probability variant:** swap `min`→`max`, `+`→`×`, `INF`→`0`, min-heap→max-heap.

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| BFS on weighted graph | Treats all edges as 1 — wrong answer |
| DFS trying all paths | Exponential — Dijkstra prunes with dist[] |
| Dijkstra without stale skip | Correct but slower — redundant heap work |
| Dijkstra with **negative** weights | Broken — use Bellman-Ford (Day 20 preview) |
| Relax every node V times naively | O(V²) — heap gives O((V+E) log V) |

**The insight:** Non-negative weights + always expand cheapest frontier = optimal dist[].

### 7. Day 19 vs Day 8 BFS vs Day 20 variants

| | **Day 8 BFS** | **Day 19 Dijkstra** | **Day 20 Cheapest Flights** |
|---|---|---|---|
| Edge cost | 1 (unweighted) | w ≥ 0 | w ≥ 0 + **stop limit** |
| Priority | FIFO queue | Min-heap `(dist, node)` | Layered relax k+1 times |
| State | `(r,c)` or `(node)` | `(dist, node)` | `(city, stops_used)` |
| Grid? | Yes | Yes (Min Effort) | No (flight graph) |

If edges have **weights** and no stop constraint → Day 19. If **at most K edges** → Day 20 Bellman-Ford layers.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "network delay" / "minimum time" / "signal reaches all nodes" | Dijkstra from source; answer = max dist |
| "minimum cost path" / "weighted shortest" | Dijkstra `(dist, node)` |
| "maximum probability" / "multiply edge chances" | Modified Dijkstra — max product |
| "minimum steps" / "unweighted" | **BFS** — not Dijkstra |
| "at most K stops" / "K flights" | **Day 20** — not plain Dijkstra |

**Keywords:** `min-heap` · `(dist, node)` · `relax` · `stale skip` · `dist[u]+w` · `non-negative`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Using a queue instead of heap on weighted graph | Must pop minimum dist first |
| Forgetting `if d > dist[u]: continue` | Essential stale-entry guard |
| Initializing dist wrong for max-probability | Start `prob[src] = 1.0`, not 0 |
| Using Dijkstra with negative edge weights | Bellman-Ford or SPFA instead |
| Not building adjacency with weights | `adj[u].push((v, w))` before heap loop |

### 10. Recognition drill

Read this problem aloud:

> *"Given a weighted directed graph and source node k, return the time for a signal to reach all nodes, or -1 if impossible."*

Before coding, say:

> *"Dijkstra: dist[k]=0, min-heap (dist, node), relax neighbors, stale skip. Answer = max(dist[1..n]). Not BFS — edges have travel times."*

---

*The heap picks the cheapest frontier. First quest: Network Delay Time #743. →*
