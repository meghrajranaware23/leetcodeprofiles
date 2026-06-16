<!-- hand-authored -->
# 📝 Constrained Shortest Path

> **Day 20** · Shortest Path Variants · ★★★★☆ · 25 XP · 15 min read

---

Day 19 Dijkstra finds the cheapest route with no extra rules. Today the shortest-path template gains **constraints**: minimize the worst edge on a grid path, or find cheapest flight cost with **at most K stops**. Same relaxation instinct — different state and stopping condition.

> **Preview contrast (Day 19 vs Day 20):** Day 19 = one `dist[node]`, heap by total cost. Day 20 = either **grid effort** (Dijkstra on cells) or **(city, stops)** layers where plain Dijkstra's "visited once" breaks down.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

Two variants today:

**A. Grid Dijkstra (Min Effort)** — cells are nodes; edge cost = height difference; path cost = **max edge on path** (minimize that bottleneck).

**B. K-stop shortest path (Cheapest Flights)** — state is `(city, stops_used)`; relax in **k+1 layers** (Bellman-Ford style) because Dijkstra can't mark a node "done" after one visit — a cheaper path may arrive with more stops.

| Variant | State | Relax rule |
|---|---|---|
| Min Effort | `(effort, r, c)` on grid | `ne = max(eff, abs(h[r][c]-h[nr][nc]))` |
| K Flights | `dist[city]` per layer | Repeat k+1 times: `tmp[v] = min(tmp[v], dist[u]+w)` |

### 2. Simple explanation

**Min Effort:** Hiking between peaks — your fatigue is the **steepest single step** on the trail, not the sum of steps. Dijkstra still works: heap ordered by current max-step-so-far; first time you pop the bottom-right cell, that's your answer.

**K Flights:** Airlines limit layovers. A cheap route through Denver with 2 stops might beat a direct expensive flight — so you can't freeze a city's cost after one visit. Instead, run "one stop layer" at a time: after layer i, you've used at most i edges. Copy `dist` to `tmp` each layer so one layer doesn't cascade within itself.

### 3. Visual — grid effort Dijkstra

```
heights:     dist effort to reach:
1 2 3        0  1  2
2 4 3   →    1  2  2
3 2 1        2  2  1

From (0,0): heap (0,0,0)
Move right: effort = max(0,|1-2|)=1
Move down: effort = max(0,|1-2|)=1
Path to (2,2): minimize max single-step climb
```

### 4. Visual — K flights layered relax

```
src=0, dst=3, k=1 (at most 1 stop = at most 2 edges)

Layer 0: dist[0]=0, rest INF
Layer 1: relax all flights once → maybe reach dst with 1 edge
Layer 2: would need 2 stops — k=1 allows only k+1=2 edge relax rounds

Key: tmp = dist.copy() each round — prevents using 2 new edges in one layer
```

### 5. The universal template

**Grid effort (Dijkstra):**
```
push (0, src_r, src_c); dist[src]=0
while heap:
    (eff, r, c) = pop
    if (r,c) is target: return eff
    if eff > dist[r][c]: continue
    for neighbor (nr, nc):
        ne = max(eff, abs(heights[r][c] - heights[nr][nc]))
        if ne < dist[nr][nc]: update + push
```

**K stops (Bellman-Ford layers):**
```
dist[src] = 0
repeat k+1 times:
    tmp = dist.copy()
    for each flight (u, v, w):
        if dist[u] + w < tmp[v]: tmp[v] = dist[u] + w
    dist = tmp
return dist[dst] or -1
```

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| BFS on grid for effort | Edge weights vary — need Dijkstra |
| Plain Dijkstra on K flights | Marks node visited too early — misses cheaper path with extra stop |
| DFS all paths with stop count | Exponential |
| Sum heights instead of max edge | Wrong metric for Min Effort |
| One Bellman-Ford pass without tmp copy | Paths use multiple edges in one "stop layer" |

**The insight:** Bottleneck paths → Dijkstra with custom edge cost. Stop limits → layered relax, not single-pass Dijkstra.

### 7. Day 20 vs Day 19 — the contrast

| | **Day 19 Dijkstra** | **Day 20 Min Effort** | **Day 20 K Flights** |
|---|---|---|---|
| Graph | Explicit weighted | Implicit grid | Directed flights |
| Cost | Sum of weights | Max edge on path | Sum of prices |
| Heap? | Yes `(dist, node)` | Yes `(effort, r, c)` | No — BF layers |
| Extra state | None | Cell coordinates | Stop count via layers |
| When | Non-negative sum | Minimize bottleneck | At most K edges |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "minimum effort" / "minimum maximum difference" on grid | Grid Dijkstra — max edge cost |
| "at most K stops" / "K layovers" / "K flights" | Bellman-Ford k+1 layers |
| "shortest path" unweighted | BFS — not today |
| "network delay" no stop limit | Day 19 Dijkstra |
| "negative edge weight" | Bellman-Ford full V rounds |

**Keywords:** `max edge relax` · `grid Dijkstra` · `k+1 layers` · `tmp = dist.copy()` · `(city, stops)`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Using BFS for Min Effort | Weighted bottleneck → heap |
| Standard Dijkstra on #787 | Need layered Bellman-Ford |
| Forgetting tmp copy in K flights | Without copy, one layer chains multiple hops |
| `k` vs number of edges | k stops = at most k+1 edges — loop k+1 times |
| Early return on grid before pop target | Pop `(eff,r,c)` when `(r,c)` is destination |

### 10. Recognition drill

Read this problem aloud:

> *"Find the cheapest price from src to dst with at most k stops."*

Before coding, say:

> *"Not Day 19 Dijkstra — stop constraint. Bellman-Ford: k+1 rounds, tmp=dist each round, relax all flights. Contrast Day 19 where one dist[node] is enough."*

---

*Constraints change the state — not the relax idea. First quest: Path With Minimum Effort #1631. →*
