<!-- hand-authored -->
# 📝 Multi-Hop Reachability

> **Day 15** · Graph Reachability · 15 XP · 15 min read

---

**Reachability:** can you get from A to B following edges? One hop is easy; **multi-hop** (transitive) reachability asks about paths of any length. Precompute a **reachability matrix** or closure, then answer queries in O(1).

Second flavor today: a **tree-shaped DAG** (each node has one parent) — time bubbles **down** the hierarchy. Inform employees: max depth path sum, not BFS levels.

> **Contrast (Day 14):** Day 14 listed ancestors per node. Day 15 **precomputes** reachability for batch queries, and handles **weighted tree propagation**.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

Two reachability modes:

| Mode | Structure | Technique |
|---|---|---|
| **Transitive closure** | General DAG, many queries | DFS from each node → `reach[u][v]` |
| **Tree-DAG time bubble** | Single parent per node | DFS/postorder: `time[u] = informTime[u] + max(child times)` |

### 2. Simple explanation

**Transitive closure:** "Is B a prerequisite of A (directly or indirectly)?" Run DFS from every course; mark everything reachable. Store in a boolean matrix. Each query is one lookup.

**Tree-DAG inform:** The CEO calls direct reports sequentially (each call takes `informTime[manager]`). Sub-managers run their subtrees in parallel. Total time = longest root-to-leaf **weighted** path where edge weight = manager's inform time.

### 3. Visual — transitive closure

```
Prereqs: 2→3, 2→4, 3→5, 4→5

    2 → 3 → 5
    └──→ 4 → 5

reach[2][*]: 3✓ 4✓ 5✓
reach[3][5]: ✓   (3 before 5)
reach[4][5]: ✓

Query (5,2): is 2 prereq of 5? → reach[2][5] = true
Query (5,4): reach[4][5] = true
Query (3,4): reach[4][3] = false
```

### 4. Visual — tree-DAG time bubble

```
        head (inform=1)
       /    \
   mgr A(2)  mgr B(1)
   /          \
 emp(0)      emp(0)

Time from head:
  Path head→A→emp: 1 + 2 + 0 = 3
  Path head→B→emp: 1 + 1 + 0 = 2
  Answer: max = 3  (parallel subtrees → take longest)
```

### 5. What problem does this solve?

| Problem family | Technique |
|---|---|
| "Is X ancestor of Y?" queries | Transitive closure |
| Prerequisite batch queries | Precompute reach matrix |
| Org-tree notification time | Weighted DFS max path |
| Loud and Rich (C-test) | DAG DFS + memo — variant |

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| BFS per query | O(Q · (V+E)) — precompute once |
| Floyd-Warshall on large sparse DAG | O(V³) — DFS per node often better for sparse |
| BFS levels for inform time | Ignores parallel subtrees — need max child path |
| Sum all inform times | Overcounts — subtrees run in parallel |

### 7. Day 15 vs Day 14

| | **Day 14** | **Day 15** |
|---|---|---|
| Output | List ancestors per node | Boolean queries / max time |
| Queries | One-shot build | Many lookups → precompute |
| Tree case | General DAG DFS | Single-parent weighted bubble |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "is u prerequisite of v" (many queries) | Transitive closure |
| "direct or indirect prerequisite" | Multi-hop reachability |
| "time to inform all employees" | Tree DAG, max child path + informTime |
| "manager hierarchy" | Build parent→children adj |

**Keywords:** `reachability` · `transitive closure` · `reach[u][v]` · `inform time` · `max subtree`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| BFS per query on Course Schedule IV | Precompute reach matrix |
| Sum inform times on all nodes | Max over root-to-leaf weighted paths |
| Reversing query (u,v) vs (v,u) | Read: is u before v? → reach[u][v] |
| Forgetting parallel subtrees | Return max, not sum, of child times |

### 10. Recognition drill

Read this problem aloud:

> *"Given prerequisites and queries `[u, v]`, return whether u is a prerequisite of v (direct or indirect)."*

Before coding, say:

> *"Build prereq graph → DFS from each node marking reach → answer queries from reach[u][v]."*

**Not** Kahn peel per query. **Not** bipartite. **Transitive closure.**

---

*Precompute reachability; bubble time down trees. First quest: Course Schedule IV. →*
