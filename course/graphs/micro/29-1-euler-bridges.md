<!-- hand-authored -->
# 📝 Euler Paths and Bridges

> **Day 29** · Advanced Graph Algorithms · ★★★★★ · 25 XP · 18 min read

---

Days 1–27 mostly ask *"visit nodes."* Day 29 asks *"consume edges."* Two classic **edge-centric DFS** patterns:

1. **Hierholzer's algorithm** — find an Eulerian trail (use every directed edge exactly once), building the route with a **post-order edge stack**.
2. **Tarjan's bridges** — find edges whose removal disconnects the graph, using **discovery time** and **low-link** values on a DFS tree.

Both are **recursive DFS with backtracking logic** — not BFS, not level-order, not wavefront expansion. Trace them on paper with an **edge stack** (Hierholzer) or **disc/low timestamps** (Tarjan).

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

| Algorithm | Question | Core mechanism | Today's quest |
|---|---|---|---|
| **Hierholzer** | Use every directed edge once; lex-smallest route | DFS eats edges; push node on stack when stuck; reverse | Reconstruct Itinerary #332 |
| **Tarjan bridges** | Which edges are critical (no alternate route)? | DFS tree + `low[u]` = earliest reachable ancestor | Critical Connections #1192 |

**Hierholzer insight:** You're not finding shortest anything — you're **deleting edges as you walk**. When a node has no outgoing edges left, append it to the route (post-order). Reverse at the end.

**Tarjan insight:** Edge `(u,v)` is a bridge if `low[v] > disc[u]` — v's subtree cannot reach u or anything above u except through `(u,v)`.

### 2. Simple explanation — Hierholzer's edge stack

Imagine airport tickets as **directed edges**. You must use every ticket exactly once starting at JFK. At each airport, take the **lexicographically smallest** unused outgoing flight (multiset / sorted adjacency).

Walk until stuck (no flights left). **Backtrack:** the airport where you got stuck goes on a stack. Continue unwinding — the final route is the stack reversed.

You're always going **deeper along an unused edge**, then recording nodes when you **run out of edges** — classic post-order on edges, not nodes.

### 3. Visual — Hierholzer trace (edge stack)

```
Tickets (directed):
  JFK → MUC, JFK → SFO
  MUC → LHR, LHR → SFO, SFO → SAN

Adj (sorted): JFK→{MUC,SFO}, MUC→{LHR}, LHR→{SFO}, SFO→{SAN}

visit(JFK):
  take MUC (smallest) → visit(MUC):
    take LHR → visit(LHR):
      take SFO → visit(SFO):
        take SAN → visit(SAN): no edges → push SAN
      no edges → push SFO
    no edges → push LHR
  still JFK edges? take SFO → ... (already used path)
  no edges → push JFK

route stack (before reverse): [SAN, SFO, LHR, MUC, SFO, JFK]
reverse → [JFK, MUC, LHR, SFO, SAN]  ✓
```

**Key:** `while adj[u] not empty: pick edge, erase it, visit(v)`. When loop ends, `route.push_back(u)`.

### 4. Simple explanation — Tarjan low-link bridges

Run DFS from any node. Assign increasing **discovery time** `disc[u]`. **`low[u]`** = earliest `disc` reachable from u's subtree (via tree edges + back edges).

For tree edge `(u → v)` (v is child):
- After processing v: `low[u] = min(low[u], low[v])`
- **Bridge test:** if `low[v] > disc[u]`, edge `(u,v)` is critical — v cannot "escape" to u's ancestors without using this edge.

For back edge `(u → v)` where v is already visited and v ≠ parent: `low[u] = min(low[u], disc[v])`.

### 5. Visual — Tarjan bridge trace

```
Graph:  0 — 1 — 2
        |       |
        3       4

DFS from 0:
  disc/low: 0:(1,1)
  → 1:(2,2) → 2:(3,3) → 4:(4,4)  backtrack
  low[2]=4, low[1]=2
  edge (1,2): low[2]=4 > disc[1]=2 → NOT bridge (2-4 path exists via... wait)

Better example — chain 0-1-2-3:
  0:(1,1) → 1:(2,2) → 2:(3,3) → 3:(4,4)
  Backtrack: low[3]=4, low[2]=3
  (2,3): low[3]=4 > disc[2]=3 → BRIDGE
  (1,2): low[2]=3 > disc[1]=2 → BRIDGE
  (0,1): low[1]=2 > disc[0]=1 → BRIDGE

Each edge in a chain is a bridge.
```

### 6. The universal templates

**Hierholzer:**
```
build adj with multiset (sorted) per node
route = []

function visit(u):
    while adj[u] not empty:
        v = smallest remaining neighbor
        remove edge u→v
        visit(v)
    route.append(u)

visit(start)
return reverse(route)
```

**Tarjan bridges:**
```
timer = 0
disc[], low[] initialized 0

function dfs(u, parent):
    disc[u] = low[u] = ++timer
    for v in adj[u]:
        if disc[v] == 0:                    // tree edge
            dfs(v, u)
            low[u] = min(low[u], low[v])
            if low[v] > disc[u]:
                bridges.add({u, v})
        else if v != parent:                // back edge
            low[u] = min(low[u], disc[v])
```

### 7. Why brute force fails

| Brute force | Problem |
|---|---|
| Try all permutations of edges (itinerary) | Factorial — Hierholzer is O(E log E) |
| BFS for Euler trail | Wrong tool — must consume edges, not level-expand |
| Greedy BFS lex path for #332 | Uses edges multiple times or skips some |
| Remove edges one-by-one to test connectivity | O(E²) — Tarjan is O(V+E) |
| Tarjan without back-edge update | Misses low-link propagation through cycles |

**The insight:** Edge problems need **edge deletion (Hierholzer)** or **low-link DFS (Tarjan)** — not visited-node BFS.

### 8. Day 29 vs neighbors

| | **Day 3 DFS** | **Day 11 Cycle** | **Day 29 Hierholzer** | **Day 29 Tarjan** |
|---|---|---|---|---|
| Goal | Visit nodes | Detect cycle | Use every edge once | Find critical edges |
| Edge handling | Traverse | Color states | **Delete on use** | Tree vs back edge |
| Output | Connected set | bool | Route order | Bridge list |
| Structure | visited[] | 3-color | Post-order stack | disc/low |

### 9. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "use all tickets / all edges exactly once" | Hierholzer — edge stack |
| "reconstruct itinerary" / "lexicographically smallest" | Hierholzer + sorted adjacency |
| "critical connection" / "if removed, graph disconnects" | Tarjan bridges |
| "bridge" / "articulation" in undirected graph | Tarjan low-link |
| "shortest path" / "minimum steps" | **Not Day 29** — BFS/Dijkstra |

**Keywords:** `edge stack` · `erase edge` · `disc` · `low` · `low[v] > disc[u]` · `post-order route`

### 10. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Using BFS for itinerary | Hierholzer DFS — consume edges |
| Not removing used edges in Hierholzer | Infinite loop — erase from multiset |
| Wrong sort order (asc vs desc) | #332 wants lex **smallest** — sort ascending (or max-heap pop) |
| Tarjan: treat tree edge to parent as back edge | Skip when `v == parent` |
| Tarjan: compare low[v] with disc[u] for back edges | Back edges update `low[u]` with `disc[v]`, not low[v] |
| Forgetting to DFS all components | Run dfs from every unvisited node for bridges |

### 11. Recognition drill

Read this problem aloud:

> *"Given airline tickets, reconstruct the itinerary using all tickets exactly once, starting at JFK, lex smallest."*

Before coding, say:

> *"Hierholzer: multiset adj, visit(u) eats edges, push u when stuck, reverse route. Not BFS."*

Read this one:

> *"Find all critical connections — edges whose removal increases connected components."*

Before coding, say:

> *"Tarjan bridges: disc/low DFS. Bridge when low[v] > disc[u] on tree edge. O(V+E)."*

---

*Edge-centric DFS — not wavefront. Quest 1: Reconstruct Itinerary with Hierholzer's stack. →*
