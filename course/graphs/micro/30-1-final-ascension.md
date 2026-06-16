<!-- hand-authored -->
# 📝 The Final Ascension

> **Day 30** · The Final Ascension · ★★★★★ · 25 XP · 18 min read

---

Twenty-nine days. One graph. Today's concept is the **Pattern Decision Tree** — the capstone flowchart that routes any new graph problem to the right template from Days 1–29. Today's quests are **bitmask visit-all-nodes BFS** (#847) and **dual Union-Find edge ordering** (#1579) — two capstone patterns that look unrelated until you run the decision tree.

This is not new theory. It is **Graph Legend synthesis**.

---

## Part 1 — The Capstone Pattern Decision Tree

### 1. The master flowchart

When a new graph problem lands, run this tree **before** coding:

```
                         NEW GRAPH PROBLEM
                                │
              ┌─────────────────┴─────────────────┐
              │ Is input a GRID / MATRIX / implicit │
              │ cell graph?                         │
              └─────────────────┬─────────────────┘
                           YES  │  NO
                                ↓
              ┌─────────────────────────────┐
              │ GRID BRANCH (Days 4–8, 28)  │
              └─────────────┬───────────────┘
                            │
         ┌──────────────────┼──────────────────┐
         ↓                  ↓                  ↓
  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
  │ Multi-source│   │ Shortest path│   │ Threshold /  │
  │ BFS from    │   │ (r,c,steps)  │   │ multi-state  │
  │ all sources │   │ Days 6, 8    │   │ Day 28       │
  │ Day 6       │   │              │   │ binsearch+   │
  └─────────────┘   └──────────────┘   │ BFS or (r,c,k)│
         │                  │          └──────────────┘
         ↓                  ↓                  │
  ┌─────────────┐   ┌──────────────┐          │
  │ Boundary /  │   │ Obstacles /  │          │
  │ outside-in  │   │ 0-1 BFS cost │          │
  │ Day 7       │   │ S-Test #1368 │          │
  └─────────────┘   └──────────────┘          │
                            │                  │
              (NO — explicit / abstract graph) ─┤
                                                ↓
              ┌─────────────────────────────┐
              │ Need SHORTEST path / min    │
              │ steps / min cost?           │
              └─────────────┬───────────────┘
                       YES  │  NO
                            ↓
         ┌──────────────────┼──────────────────┐
         ↓                  ↓                  ↓
  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
  │ Unweighted  │   │ Weighted     │   │ Constrained  │
  │ BFS         │   │ Dijkstra     │   │ Day 20       │
  │ Days 2, 8   │   │ Day 19       │   │ K stops /    │
  │             │   │              │   │ min effort   │
  └─────────────┘   └──────────────┘   └──────────────┘
                            │
         ┌──────────────────┼──────────────────┐
         ↓                  ↓                  ↓
  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
  │ State-space │   │ Bitmask BFS  │   │ 0-1 BFS      │
  │ (config)    │   │ (node, mask) │   │ deque        │
  │ Days 10, 23 │   │ Day 30 #847  │   │ S-Test #1368 │
  └─────────────┘   └──────────────┘   └──────────────┘
                            │
                       NO ──┤
                            ↓
              ┌─────────────────────────────┐
              │ CONNECTIVITY / components / │
              │ merge groups?               │
              └─────────────┬───────────────┘
                       YES  │  NO
                            ↓
         ┌──────────────────┼──────────────────┐
         ↓                  ↓                  ↓
  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
  │ DFS/BFS     │   │ Union-Find   │   │ Dual UF /    │
  │ component   │   │ Days 17–18   │   │ offline sort │
  │ Day 5       │   │              │   │ Day 30 #1579 │
  └─────────────┘   └──────────────┘   │ S-Test #1697 │
                                       └──────────────┘
                            │
                       NO ──┤
                            ↓
              ┌─────────────────────────────┐
              │ DIRECTED graph structure?   │
              │ (DAG, cycles, order)        │
              └─────────────┬───────────────┘
                       YES  │  NO
                            ↓
         ┌──────────────────┼──────────────────┐
         ↓                  ↓                  ↓
  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
  │ Cycle detect│   │ Topological  │   │ Reachability │
  │ Day 11      │   │ Kahn Day 12  │   │ closure Day 15│
  └─────────────┘   └──────────────┘   └──────────────┘
                            │
                       NO ──┤
                            ↓
              ┌─────────────────────────────┐
              │ Structure / special walk?   │
              └─────────────┬───────────────┘
                       YES  │  NO
                            ↓
         ┌──────────────────┼──────────────────┐
         ↓                  ↓                  ↓
  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
  │ Bipartite   │   │ MST / min    │   │ Euler trail  │
  │ 2-color     │   │ connect Day21│   │ Hierholzer   │
  │ Day 13      │   │              │   │ Day 29 #332  │
  └─────────────┘   └──────────────┘   └──────────────┘
         │                  │                  │
         ↓                  ↓                  ↓
  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
  │ Bridges     │   │ Graph reduce │   │ Tree post-   │
  │ Tarjan D29  │   │ peel / ratio │   │ order agg    │
  │ #1192       │   │ Day 16       │   │ S-Test #2477 │
  └─────────────┘   └──────────────┘   └──────────────┘
```

### 2. Route to the right day

| Problem shape | Reach for | Example days |
|---|---|---|
| Build adjacency from edges | Graph mental model | 1 |
| Level-by-level / shortest unweighted | BFS queue | 2, 8 |
| Flood fill / explore all reachable | DFS stack | 3 |
| Grid as graph, 4-directional | Grid traversal | 4 |
| Count islands / components | DFS/BFS restart | 5 |
| Multi-source simultaneous BFS | Queue all sources | 6 |
| From boundary inward / enclaves | Boundary DFS | 7 |
| `(r,c,steps)` shortest path | BFS with distance | 8 |
| Directed edges / reorder routes | Direction-aware DFS | 9 |
| Abstract config strings / locks | State-space BFS | 10, 23 |
| Cycle in directed graph | 3-color / DFS | 11 |
| Topological order / safe states | Kahn's in-degree | 12 |
| Two groups / odd cycle | Bipartite 2-color | 13 |
| DAG sources/sinks / min vertices | DAG reasoning | 14 |
| Transitive closure / can reach? | Reachability | 15 |
| Leaf peel / weighted ratio graph | Graph reduction | 16 |
| Dynamic connectivity / merge | Union-Find | 17, 18 |
| Weighted shortest path | Dijkstra | 19 |
| At most K edges / min effort | Constrained shortest | 20 |
| Min cost connect all | MST Kruskal | 21 |
| Combine 2+ techniques | Multi-technique | 22 |
| Word ladder / implicit neighbors | Advanced state BFS | 23 |
| Build graph from non-graph input | Graph modeling | 24 |
| Count paths / mod ways | Dijkstra + counting | 25 |
| Longest path on DAG / memo DFS | DFS memo | 26 |
| Pick between patterns | Multi-pattern synthesis | 27 |
| Binary search answer + BFS / `(r,c,k)` | Threshold / 3D state | 28 |
| Euler trail / bridges | Hierholzer / Tarjan | 29 |
| Visit all nodes shortest / dual UF | Bitmask BFS / edge order | 30 |

### 3. Today's two capstone patterns

**Shortest Path Visiting All Nodes #847** — **bitmask BFS** `(node, mask)`:

```
Multi-source BFS from every node i with mask = (1 << i)
State: (u, mask, dist)
Neighbor v: nmask = mask | (1 << v)
Goal: nmask == (1 << n) - 1  → return dist + 1
Visited: dist[u][mask] — same node, different mask = different state
```

You must visit **every** node at least once — the bitmask records which nodes have been seen. Same node with different masks are different BFS states (cousin of Day 28's `(r,c,k)`).

**Remove Max Edges #1579** — **dual Union-Find Alice/Bob**:

```
Two UF structures: alice (type 1 edges), bob (type 2 edges)
Process edges in order:
  1. Type 3 (both): try unite on BOTH; count if either succeeds
  2. Type 1: alice.unite only
  3. Type 2: bob.unite only
Answer = total edges - used; -1 if either not fully connected
```

Greedy edge order: shared type-3 edges first maximize reuse, then single-type edges fill each player's connectivity.

### 4. The Graph Legend workflow

Every S-Rank interview problem:

1. **Draw** — sketch nodes, edges, or grid
2. **Route** — run the decision tree → name the day/pattern
3. **Trace** — one example on paper (BFS layers, disc/low, or UF unions)
4. **Code** — template first, special cases second
5. **Prune** — can a state dimension be dropped? (bitmask only if n ≤ 12–20)

> 💡 **The S-Rank skill:** Draw the graph first. Name the pattern second. Code third.

### 5. Full pack map — where you learned each branch

```
Days  1–2:  adjacency model + BFS wavefront
Days  3–4:  DFS deep dive + grid-as-graph
Days  5–6:  connected components + multi-source BFS
Days  7–8:  boundary DFS + shortest path (r,c,steps)
Days  9–10: directed traversal + state-space BFS
Days 11–12: cycle detection + Kahn topological sort
Days 13–15: bipartite + DAG analysis + reachability
Days 16–18: graph reduction + Union-Find + UF applications
Days 19–20: Dijkstra + constrained shortest path
Days 21–22: MST + multi-technique combos
Days 23–24: implicit graph BFS + modeling from input
Days 25–26: path counting + DFS memo on graphs
Days 27–28: pattern synthesis + threshold / 3D state BFS
Days 29–30: Euler/bridges + capstone bitmask / dual UF
S-Test:     0-1 BFS (#1368), offline UF (#1697), tree agg (#2477)
```

### 6. Common capstone mistakes

| Mistake | Pattern | Fix |
|---|---|---|
| Visit All Nodes: BFS with visited[] only | Day 30 | Need `(node, mask)` — bitmask state |
| Visit All Nodes: single-source from 0 | Day 30 | Multi-source from every node with its bit set |
| Remove Edges: one UF for all types | Day 30 | Separate alice/bob; type 3 updates both |
| Remove Edges: process type 1 before type 3 | Day 30 | Type 3 first — shared edges are most valuable |
| Skip decision tree, guess BFS | All days | Route first — weighted vs unweighted vs state |
| Hierholzer for shortest path | Day 29 vs 8 | Edge consumption ≠ min hops |

### 7. Recognition drill — capstone edition

Read each problem. Route through the tree:

> *"Shortest path that visits every node at least once."*
>
> → **Bitmask BFS.** Day 30. State `(u, mask)`. Multi-source init.

> *"Remove max edges but Alice and Bob each stay connected."*
>
> → **Dual UF greedy order.** Day 30. Type 3 → type 1 → type 2.

> *"Minimum cost to fix arrows so a valid path exists."*
>
> → **0-1 BFS deque.** S-Test #1368. Free edge front, paid back.

> *"Does path exist using only edges shorter than limit?"*
>
> → **Offline sort + UF.** S-Test #1697. Process edges by weight.

> *"Minimum fuel for all cities to report to capital."*
>
> → **Tree post-order subtree count.** S-Test #2477. `(sub+seats-1)/seats` per edge.

---

*You have the full decision tree. Quest 1: Visit All Nodes — bitmask BFS from every start. →*
