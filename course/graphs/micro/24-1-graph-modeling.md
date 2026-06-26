<!-- hand-authored -->
# 📝 Building Graphs from Non-Graph Inputs

> **Day 24** · Graph Modeling · 20 XP · 15 min read

---

Not every problem hands you `n` nodes and an edge list. Day 24 teaches **graph construction** — recognize hidden nodes and edges, build adjacency, then run the right traversal.

Today's two quests:
1. **Geometric overlap graph** — bombs detonate each other if centers within combined radius → build directed edges, DFS components.
2. **Tree return-cost DFS** — collect apples on a tree rooted at 0 → post-order decides whether subtrees need a round-trip.

> **Not Day 23:** No implicit BFS on words or squares. You **materialize** the graph (or tree) first, then traverse.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Graph modeling from domain data:**

| Input shape | Node | Edge rule | Then |
|---|---|---|---|
| **Points + radius** | Each bomb index | `i → j` if bomb `i`'s blast reaches bomb `j` | DFS/BFS from each start; max component size |
| **Tree + flags** | Tree node | Given undirected tree edges | DFS: return `(hasAppleInSubtree, tripCost)` |

Step zero is always: *"What are my nodes? What makes two nodes connected?"*

### 2. Simple explanation

**Detonate bombs:** Bomb A triggers B if B's center lies inside A's explosion circle — distance ≤ `rA + rB`. That is a **directed** edge A→B (A detonating can chain to B). Build adjacency by checking all pairs (n ≤ 1000). Run DFS from each bomb as potential first detonation; count reachable bombs.

**Collect apples:** You start at node 0. Walking an edge costs 1 second each way. Only visit subtrees that contain at least one apple. DFS returns whether the subtree has any apple and how many edge-crossings are needed. If child subtree has apples → pay `2` (go there and return) plus child's cost.

### 3. Visual — bomb overlap graph

```
Bomb 0: (0,0) r=2    Bomb 1: (3,0) r=2
dist = 3, r0+r1 = 4  → 3 ≤ 4  → edge 0→1 AND 1→0? 

Check: can 0 trigger 1? dist(0,1) ≤ r0 → NO (3 > 2)
       can 0 trigger 1? dist ≤ r0+r1 → YES for chain detonation

LC rule: i triggers j if j's center in i's blast:
  dist(i,j) ≤ radius[i]

    [0] ----blast----> [1]
         (directed if in range)

DFS from 0: {0,1,...}  count = component size
Try each bomb as starter; take max.
```

Use **long long** for squared distances to avoid overflow.

### 4. Visual — tree return-cost DFS

```
Tree rooted at 0, apples at {1, 4}

        0
       / \
      1*  2
         / \
        3  4*

dfs(1): has apple → return (1, 0)  // just pick apple, no extra trip counted at leaf
dfs(4): (1, 0)
dfs(3): (0, 0)  // no apples below
dfs(2): child 3 empty, child 4 has apple
        → need 2 steps to visit 4 subtree + dfs(4).second

Combine at 0: sum trips for children with non-zero apple count.
Each such child adds +2 (down and back on that edge).
```

### 5. What problem does this solve?

| Problem family | Build | Traverse |
|---|---|---|
| Chain reactions / overlap | Geometric adjacency | DFS/BFS per source |
| Collect items on tree | Tree adjacency | Post-order DFS |
| Network from coordinates | Threshold distance edges | UF or BFS |
| Equations a/b=k | Weighted edges | DFS multiply (Day 16) |

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| **Simulate blast waves without graph** | Hard to track chain — graph DFS is clean |
| **Visit every node on tree regardless** | Waste 2·edge on empty subtrees |
| **Undirected edge for bomb trigger** | Direction matters: i triggers j if j in i's range |
| **Float distance compare** | Use squared integers: `dx²+dy² ≤ (r1+r2)²` |
| **BFS when only max component needed** | DFS from each start works; same O(n²) build |

### 7. Day 24 vs earlier ranks

| | **Day 5 — Components** | **Day 24 — Modeling** |
|---|---|---|
| Graph given | Yes | **You build it** |
| Edge rule | Explicit list | Geometry or tree semantics |
| Goal | Count components | Max chain or min walk cost |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "Detonate / chain reaction / within radius" | Pairwise overlap → directed graph |
| "Collect all apples / return to start" | Tree DFS, skip empty subtrees |
| "Minimum time on tree" | Edge cost × 2 per visited subtree branch |
| "Points in plane" + connectivity | O(n²) edge build |
| "Shortest path" on built graph | BFS/Dijkstra after modeling |

**Keywords:** `build adjacency` · `overlap check` · `subtree return cost` · `directed chain` · `post-order`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Wrong detonation rule (sum radii vs radius[i] only) | Read LC: j detonates if dist ≤ **r_i** |
| Integer overflow in dist² | Cast to long long |
| Count 1 for visiting apple node round-trip | Leaf with apple needs 0 extra beyond path |
| Forget +2 when child subtree has apples | Go down edge and return |
| Build graph but use grid BFS | These are abstract/index graphs |

### 10. Recognition drill

Read this problem aloud:

> *"Given bomb positions and radii, detonating one bomb triggers all bombs in its range recursively — find maximum detonation count."*

Before coding, say:

> *"Build directed graph: edge i→j if dist(i,j) ≤ r_i. DFS from each bomb; max reachable size. NOT grid. NOT word BFS."*

---

*Build the graph first, then traverse. First quest: bomb chain reaction. →*
