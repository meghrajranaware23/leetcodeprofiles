<!-- hand-authored -->
# 📝 Graph DFS with Memoization

> **Day 26** · DFS + Memoization · ★★★★★ · 20 XP · 15 min read

---

Day 26 pairs **DFS with memo** on a **DAG implied by problem structure** — and **BFS for bottleneck timing** on trees. Two different tools; both avoid redundant work.

> **Quest 1:** Matrix where edges go to **strictly larger** values → implicit DAG → longest path via `dp[r][c]`.  
> **Quest 2:** Tree idle time → BFS distances from server 0, then per-node **bottleneck** math on retransmissions.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

| Technique | Graph shape | State | Recurrence |
|---|---|---|---|
| **DFS + memo on DAG** | Directed edges to increasing cells | `dp[r][c]` = LIP from (r,c) | `1 + max dfs(neighbors with greater value)` |
| **Tree BFS + bottleneck** | Undirected tree, root 0 | `dist[i]` from BFS | Per leaf: last resend time + round-trip |

### 2. Simple explanation

**Longest increasing path (#329):** From each cell, you may walk to a neighbor with **strictly higher** value. No cycles possible — values strictly increase along any walk. So the grid is a **DAG** (each cell points to larger neighbors). `dfs(r,c)` with memo returns longest path **starting** at (r,c). Answer = max over all starts.

**Network idle (#2039):** Server 0 sends messages; node `i` retransmits every `patience[i]` seconds until it gets a reply. BFS gives one-way delay `dist[i]`. Round-trip = `2*dist[i]`. Last unnecessary send before reply arrives at `((roundTrip-1)/patience[i])*patience[i]`. Network idle when **last message of all nodes** has returned — take **max** over nodes, then +1.

### 3. Visual — matrix DAG (decreasing forbidden)

```
Matrix:
  1  3
  2  4

Edges (only to strictly larger):
  1→3, 1→2, 2→4, 3→4

dfs(1)=1+max(dfs(3),dfs(2))=1+max(2,2)=3
Path: 1→3→4 or 1→2→4  length 3

No cycle: 4 has no larger neighbor → base 1
```

**Why DAG:** edge (r,c)→(nr,nc) requires `mat[nr][nc] > mat[r][c]` — can't return.

### 4. Visual — tree idle bottleneck

```
dist from 0 via BFS:
  node 0:0, node 1:1, node 2:2

Node 2, patience=3:
  roundTrip = 4
  lastSend = ((4-1)/3)*3 = 3
  finishes at 3+4 = 7

Answer = max over all non-root nodes, then +1
```

Each node is independent after BFS — **bottleneck** = max finish time.

### 5. DFS + memo template (matrix DAG)

```
function dfs(r, c):
    if dp[r][c]: return dp[r][c]
    best = 1
    for each neighbor (nr,nc) in bounds:
        if mat[nr][nc] > mat[r][c]:
            best = max(best, 1 + dfs(nr, nc))
    dp[r][c] = best
    return best

answer = max dfs(r,c) over all cells
```

No global `visited` during recursion — memo handles overlap. Increasing constraint prevents cycles.

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| **DFS without memo on matrix** | Same cell recomputed exponentially |
| **BFS for longest path** | Longest ≠ shortest; need DAG DP |
| **Allow equal-value moves** | Cycles possible — breaks DAG |
| **Simulate every message event** | O(dist·patience) — bottleneck formula is O(n) |
| **Dijkstra on tree for idle** | Unweighted tree BFS suffices |

### 7. Day 26 vs Day 14 DAG

| | **Day 14 — Topo / ancestors** | **Day 26 — Matrix LIP** |
|---|---|---|
| DAG source | Explicit prerequisites | **Implicit** from value order |
| Order | Kahn / topo | DFS memo — no topo needed |
| Goal | Reachability / min cover | Longest path length |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "Longest increasing path" in matrix | DFS + memo, only greater neighbors |
| "Strictly increasing" | DAG — no cycle check needed |
| "Network idle" / "patience" / "last reply" | BFS dist + bottleneck max |
| "Tree" + "time until quiet" | Not Dijkstra — unit edges |
| "Shortest path in matrix" | **BFS** — opposite objective |

**Keywords:** `mat[nr][nc] > mat[r][c]` · `dp[r][c]` · `2*dist[i]` · `patience[i]` · `max bottleneck`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Use visited set that blocks memo reuse | Memo replaces visited on DAG |
| Allow 4 dirs to equal or smaller | Strict `>` only |
| Forget max over all starting cells | Any cell can start LIP |
| Off-by-one on idle answer `+1` | Problem wants first idle **second** |
| Integer division for lastSend | `((rt-1)/p)*p` pattern |

### 10. Recognition drill

Read this problem aloud:

> *"Find longest path in matrix where each step moves to a strictly higher cell value."*

Before coding, say:

> *"Implicit DAG — dfs+memo from every cell, edge if neighbor value greater. NOT BFS. NOT plain grid flood."*

---

*Memo on increasing DAG; bottleneck on tree BFS. First quest: longest path matrix. →*
