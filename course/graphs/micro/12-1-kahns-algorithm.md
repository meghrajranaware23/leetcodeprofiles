<!-- hand-authored -->
# 📝 Kahn's Algorithm

> **Day 12** · Topological Sort Applications · ★★★☆☆ · 15 XP · 15 min read

---

Day 11 asked *"is there a cycle?"* with 3-color DFS and previewed Kahn's peel. Today Kahn is the **main tool**: maintain an in-degree table, queue every node with in-degree 0, pop and decrement neighbors. Stalled peel = cycle. Same skeleton, two directions: **forward** (sources first) and **reverse** (sinks first).

> **Contrast (Day 11):** Yesterday you learned to *see* cycles with gray DFS. Today you *operate* on the graph by peeling — no recursion stack, just a queue and an in-degree array.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Kahn's algorithm** — iterative topological sort via in-degree peeling:

```
1. Compute indeg[v] for all v
2. Queue every v with indeg[v] == 0
3. While queue not empty:
     u = pop
     for each v in adj[u]:
         if --indeg[v] == 0: push v
4. Processed count == n ? success : cycle
```

| Variant | Start nodes | Decrement | Finds |
|---|---|---|---|
| **Forward Kahn** | in-degree 0 (sources) | out-neighbors' in-deg | Safe order / recipes |
| **Reverse Kahn** | out-degree 0 (sinks) | in-neighbors' out-deg | Safe states |

### 2. Simple explanation

Think of dependencies as locks. In-degree = number of locks still closed on a node. A node with in-degree 0 is **unlocked** — do it now. Each completion unlocks dependents (decrement their in-degree). If locks remain when no node is unlocked, something circular is holding them shut.

**Reverse peel (Eventual Safe States):** Flip the question — which nodes *always* lead to a dead end? Start from nodes with no outgoing edges (out-degree 0), peel backward. Nodes that survive the reverse peel are safe.

### 3. Visual walkthrough — in-degree table peel

```
Recipe graph (ingredient → recipe):

  flour ──→ bread
  yeast ──→ bread
  bread ──→ sandwich

indeg: flour=0, yeast=0, bread=2, sandwich=1
Queue: [flour, yeast]

Pop flour  → indeg[bread]=1
Pop yeast  → indeg[bread]=0 → push bread
Pop bread  → indeg[sandwich]=0 → push sandwich
Pop sandwich → done, 4/4 ✓
```

### 4. Reverse peel — safe states

```
Graph:  0 → 1 → 2 → 3
        ↑__________|   (cycle 0-1-2)

outdeg: 0→1, 1→1, 2→1, 3→0
Reverse queue: [3]  (sinks)

Peel 3 → safe
Peel 2 (outdeg→0 after 3 removed) → safe? 
... nodes in cycle never reach outdeg 0 → NOT safe
```

### 5. What problem does this solve?

| Problem family | Kahn variant |
|---|---|
| Course ordering | Forward — sources first |
| Recipe / craft chains | Forward — supplies as initial indeg-0 |
| Eventual safe states | Reverse — sinks first |
| Minimum height trees (Day 16) | Peel leaves (degree-1) — cousin idea |

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| 3-color DFS when you need the order | Works for cycle but order needs postorder reverse |
| Recompute in-degree from scratch each step | O(n²) — decrement in place is O(E) |
| BFS without indeg tracking | Can't tell when a node becomes ready |
| Forward peel for safe states | Must reverse edges / track out-degree |

### 7. Day 12 vs Day 11

| | **Day 11** | **Day 12** |
|---|---|---|
| Primary tool | 3-color DFS + Kahn preview | Kahn as main engine |
| Cycle signal | Gray neighbor | Peel count < n |
| Applications | Course schedule | Safe states, recipes |
| Edge direction tricks | Standard prereq | Reverse graph for sinks |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "dependencies unlock over time" | Forward Kahn |
| "all paths lead to terminal node" | Reverse Kahn on out-degree |
| "ingredients / supplies available" | Supplies = indeg-0 seeds |
| "eventual safe" / "always terminates" | Reverse peel from sinks |

**Keywords:** `in-degree` · `queue` · `peel` · `decrement` · `reverse graph` · `out-degree`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Pushing neighbor before indeg hits 0 | Only enqueue when `--indeg[v] == 0` |
| Forgetting to build adjacency list | Prereq → edge direction first |
| Using forward Kahn for safe states | Reverse edges; peel out-degree 0 |
| Not seeding all indeg-0 nodes initially | Scan entire array before loop |

### 10. Recognition drill

Read this problem aloud:

> *"Given a directed graph, return all nodes from which every path eventually reaches a node with no outgoing edges."*

Before coding, say:

> *"Reverse Kahn — build reverse adjacency, track out-degree, queue sinks (outdeg 0), peel backward marking safe."*

**Not** 3-color DFS. **Not** bipartite. **Reverse in-degree peel.**

---

*Kahn peels forward and backward. First quest: eventual safe states. →*
