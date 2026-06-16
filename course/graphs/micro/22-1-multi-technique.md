<!-- hand-authored -->
# 📝 Multi-Technique Combination

> **Day 22** · Combined Graph Techniques · ★★★★☆ · 25 XP · 15 min read

---

B-Rank closes by **combining** tools you've built: UF for component sizes with a counting formula, and **state BFS** where the visited key is `(node, lastColor)` — a direct bridge to Day 10 state-space BFS, applied on an explicit graph with an alternating constraint.

> **Preview contrast (plain BFS vs state BFS):** Day 8 BFS visits each cell once. Day 22 alternating-colors BFS visits each `(node, color)` once — same queue skeleton, richer state. Day 10 Open Lock used string states; here the state is `(node, lastEdgeColor)`.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Technique A — Component size math (UF):**
- Union all edges → count nodes per root
- Unreachable pairs across components: for size `c`, contribute `c × (n − c)`; divide by 2

**Technique B — BFS with state `(node, lastColor)`:**
- `dist[node][color]` — shortest steps arriving at node with last edge color 0=red, 1=blue
- Queue `(node, prevColor, steps)`; start `(0, -1, 0)` so first edge any color
- Skip edge if `edgeColor == prevColor` (must alternate)
- Answer per node: `min(dist[i][0], dist[i][1])` or -1

### 2. Simple explanation

**Unreachable pairs:** In a disconnected graph, a node in a size-3 component can't reach any of the n−3 nodes outside. That's 3×(n−3) ordered pairs — but each unordered pair counted twice, so sum `c×(n−c)` over roots and halve.

**Alternating colors:** You're walking a graph but can't take two same-color edges in a row. "Where am I?" isn't enough — you need "where am I **and** what color did I arrive on?" Two visits to node 5 are different if you arrived on red vs blue. BFS layers still give shortest path.

### 3. Visual — component size formula

```
n=6, components: {0,1,2} size 3, {3,4} size 2, {5} size 1

Component A: 3 × (6−3) = 9
Component B: 2 × (6−2) = 8
Component C: 1 × (6−1) = 5
Sum = 22; divide by 2 → 11 unreachable pairs
```

### 4. Visual — BFS state (node, lastColor)

```
Node 0, start prev=-1 (any color ok)
Red edge 0→1: dist[1][0]=1, queue (1,0,1)
From 1 red: can't take red again; blue 1→2: dist[2][1]=2

dist[i] = min path ending red, min path ending blue
Node unreachable on both → -1
```

### 5. The universal template

**Component pairs:**
```
UF union all edges
for i in 0..n-1: size[find(i)]++
ans = sum(c * (n - c) for c in sizes) / 2
```

**Alternating BFS (Day 10 bridge):**
```
dist[n][2] = -1; queue (0, -1, 0); dist[0][0]=dist[0][1]=0
while queue:
    (u, prev, d) = pop
    for (v, color) in adj[u]:
        if color == prev: continue
        if dist[v][color] == -1:
            dist[v][color] = d + 1
            push (v, color, d+1)
ans[i] = min(dist[i][0], dist[i][1]) with -1 handling
```

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| O(n²) check reachability per pair | UF + formula is O(E · α(n)) |
| BFS visiting each node once (no color) | Misses alternating constraint |
| DFS for shortest alternating path | BFS guarantees minimum steps |
| Count pairs without halving | Double-counts (a,b) and (b,a) |
| Treat red and blue graphs separately | Must alternate — need paired state |

**The insight:** Counting across components → algebra on UF sizes. Path with extra constraint → enlarge BFS state like Day 10.

### 7. Day 22 vs Day 10 vs Day 17

| | **Day 17 UF** | **Day 10 State BFS** | **Day 22 Combined** |
|---|---|---|---|
| Example | Cycle edge | Open Lock `(string)` | Alternating `(node, color)` |
| Question | Same component? | Min steps to target config | Unreachable pairs / alt path |
| Key | find/union | visited[state] | size formula / dist[node][2] |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "unreachable pairs of nodes" | UF + `Σ c×(n−c)/2` |
| "alternating colors" / "alternate red and blue" | BFS `(node, lastColor)` |
| "shortest path" + extra side constraint | State BFS — Day 10 pattern |
| "count connected components" only | UF or DFS — no formula needed |
| "minimum steps" unweighted + constraint | BFS not Dijkstra |

**Keywords:** `component size` · `c×(n−c)/2` · `(node, color)` · `dist[n][2]` · `prevColor` · `Day 10 bridge`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forgetting to divide pair sum by 2 | Each unordered pair counted twice |
| BFS with only `visited[node]` | Track `dist[node][0]` and `dist[node][1]` separately |
| Allowing same-color consecutive edges | Skip when `edgeColor == prevColor` |
| Starting without prev=-1 | Need first edge unrestricted |
| Using UF for alternating paths | Need BFS — path depends on edge sequence |

### 10. Recognition drill

Read this problem aloud:

> *"Return the shortest alternating path from node 0 to every node, or -1 if none exists."*

Before coding, say:

> *"State BFS like Day 10: state is (node, lastColor), not node alone. Queue (u, prev, d); skip same color; answer min of two colors per node."*

---

*UF counts groups; state BFS counts steps with memory. First quest: Count Unreachable Pairs #2316. →*
