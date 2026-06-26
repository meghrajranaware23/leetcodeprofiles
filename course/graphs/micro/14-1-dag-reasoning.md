<!-- hand-authored -->
# 📝 DAG Source/Sink Analysis

> **Day 14** · DAG Reasoning · 15 XP · 15 min read

---

A **DAG** (Directed Acyclic Graph) has no cycles — so structure is meaningful. **Sources** have in-degree 0 (nothing points in). **Sinks** have out-degree 0. Today: count sources to cover everything, and accumulate **ancestors** along a topological order.

> **Contrast (Day 11–12):** You learned to detect cycles and peel order. Today the graph is **guaranteed acyclic** — exploit source/sink structure directly.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**DAG structural reasoning** — two core moves:

| Move | Rule | Example |
|---|---|---|
| **Count in-degree-0 nodes** | Every node with an incoming edge needs a source ancestor — only in-degree-0 nodes can start chains | Min vertices to reach all |
| **Topo ancestor accumulation** | Process in topological order; ancestors(v) = {v's parents} ∪ ⋃ ancestors(parent) | All ancestors in DAG |

### 2. Simple explanation

**Minimum sources:** To reach node `v`, something must eventually reach its first predecessor. Only nodes with **no incoming edges** can start a walk — they're mandatory starting points. Count them.

**Ancestor accumulation:** In a DAG, if you process parents before children (topo order), when you arrive at `v`, all ancestors of its parents are already known — merge them into `v`'s set.

### 3. Visual — in-degree-zero sources

```
Edges: 0→1, 0→2, 1→3, 2→3, 4→5

    0 ──→ 1 ──→ 3
    └──→ 2 ──→ 3

    4 ──→ 5

in-degree 0: {0, 4}  ← minimum vertices to reach all
```

Only 0 can reach {1,2,3}; only 4 can reach 5. No node covers both components' unreachable-from-other starts.

### 4. Visual — topo ancestor accumulation

```
Topo order: 0, 1, 2, 3  (edges 0→1, 0→2, 1→3, 2→3)

Process 0: anc[0] = {}
Process 1: anc[1] = {0}
Process 2: anc[2] = {0}
Process 3: anc[3] = {0,1,2}  (merge anc[1] ∪ anc[2] ∪ {1,2})
```

### 5. What problem does this solve?

| Problem family | DAG technique |
|---|---|
| Min vertices to reach all nodes | List all in-degree-0 nodes |
| All ancestors of each node | DFS from each node, or topo merge |
| Longest path in DAG | Topo + relax (future ranks) |
| Reachability queries (Day 15) | Precompute ancestor matrix |

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| BFS from every node to find min sources | O(n · (V+E)) — in-degree-0 is O(V+E) one pass |
| Store all paths to ancestors | Exponential path count |
| Ignore DAG guarantee | General graphs need different tools |
| Sort nodes arbitrarily | Ancestor merge requires valid topo order |

### 7. Day 14 vs Day 11–13

| | **Day 11–12** | **Day 14** |
|---|---|---|
| Cycle? | Maybe — must check | No — DAG given |
| Focus | Cycle / order | Structure (sources, ancestors) |
| Tool | Kahn / 3-color | In-degree scan, ancestor DFS/topo |
| Graph type | General directed | Acyclic directed |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "directed acyclic graph" / "DAG" | No cycle check needed |
| "minimum nodes to reach all" | Count in-degree 0 |
| "all ancestors of each node" | DFS per source or topo accumulation |
| "smallest set of starting points" | Sources only |

**Keywords:** `DAG` · `in-degree 0` · `source` · `ancestor` · `topological` · `accumulate`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| BFS from all nodes for min sources | Just scan indeg==0 |
| Including self in ancestor list | Problem defines ancestors as proper predecessors |
| Processing child before parent in merge | Topo order: parents first |
| Forgetting disconnected DAG components | Each component has its own sources |

### 10. Recognition drill

Read this problem aloud:

> *"Given a DAG with n nodes, find the minimum number of starting vertices so that every vertex is reachable from at least one chosen start."*

Before coding, say:

> *"DAG → count nodes with in-degree 0. Each is an mandatory start for its reachable subtree."*

**Not** Kahn peel for cycle. **Not** 2-color. **In-degree-zero scan.**

---

*Sources cover; topo accumulates. First quest: minimum vertices. →*
