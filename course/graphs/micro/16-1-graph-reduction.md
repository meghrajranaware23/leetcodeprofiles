<!-- hand-authored -->
# 📝 Graph Transformation

> **Day 16** · Graph Reduction · 15 XP · 15 min read

---

Some problems don't ask you to traverse — they ask you to **shrink** the graph until structure reveals itself. **Leaf peeling:** repeatedly remove degree-1 nodes layer by layer until ≤2 nodes remain — those are the tree centers (MHT). **Weighted graph build:** equations like `a/b = k` become directed edges `a→b` weight k and `b→a` weight 1/k; query by walking/multiplying.

> **Contrast (Day 12):** Kahn peels in-degree 0 on directed graphs. Today: peel **leaves** (degree 1) on **undirected** trees, and **build** weighted graphs from algebraic constraints.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

Two reduction techniques:

| Technique | Graph | Operation |
|---|---|---|
| **Leaf-peel layers** | Undirected tree/graph | Queue deg==1, remove layer, decrement neighbors |
| **Division graph build** | Weighted directed | a/b=k → edge a→b weight k, b→a weight 1/k; DFS query multiply |

### 2. Simple explanation

**Leaf peeling (MHT):** Long paths have useless outer nodes. Strip all leaves simultaneously — like peeling an onion. Repeat until 1 or 2 nodes remain. Those are the optimal roots for minimum height tree.

**Division graph:** `A/B = 2` means "A is twice B" — walk A→B multiplying by 2. Reverse edge B→A carries 1/2. Query `X/Y`? DFS from X to Y multiplying edge weights. Unknown variable → -1.

### 3. Visual — leaf-peel layers

```
Tree:  1 — 2 — 3 — 4 — 5 — 6 — 7

Layer 0 leaves: {1, 7}     rem=7
Layer 1 leaves: {2, 6}     rem=5
Layer 2 leaves: {3, 5}     rem=3
Layer 3 leaves: {4}        rem=1... wait rem>2 stop

Actually rem>2:
Start deg: 1,2,2,2,2,2,1
Peel {1,7} → deg(2)=1, deg(6)=1
Peel {2,6} → ...
Centers: {4} or {3,4} depending on n

n=6: 1—2—3—4—5—6
Peel 1,6 → peel 2,5 → remain {3,4} ✓
```

### 4. Visual — division graph

```
Equations: a/b=2, b/c=3

Graph:
  a ──2──→ b ──3──→ c
  a ←─1/2─ b ←─1/3─ c

Query a/c: dfs(a,c) = 2 × 3 = 6
Query c/a: dfs(c,a) = 1/3 × 1/2 = 1/6
Query x/y (unknown): -1
```

### 5. What problem does this solve?

| Problem family | Technique |
|---|---|
| Minimum height trees | Leaf-peel to centers |
| Evaluate division | Build weighted graph + DFS |
| Tree diameter (related) | Two BFS or leaf peel variant |
| Network flow (future) | Different reduction |

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| Try every node as MHT root, BFS height | O(n²) — peel is O(n) |
| Algebraically solve each query independently | Doesn't connect transitive equations |
| Peel one leaf at a time (not layer) | Still works but slower constant |
| Undirected edge for a/b=k only one way | Must add reverse edge 1/k |

### 7. Day 16 vs Day 12

| | **Day 12 Kahn** | **Day 16 Leaf Peel** |
|---|---|---|
| Graph | Directed | Undirected |
| Remove | in-degree 0 | degree 1 |
| Goal | Topological order | Tree centers |
| Layers | Peel sources | Peel leaves simultaneously |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "minimum height tree" / "tree center" | Leaf-peel layers |
| "a/b=k" equations | Build a→b weight k, b→a weight 1/k |
| "evaluate query X/Y" | DFS multiply path weights |
| "undirected tree" + "optimal root" | Peel, not try-all-roots |

**Keywords:** `leaf peel` · `degree 1` · `center` · `weighted edge` · `a/b=k` · `multiply path`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Peel one leaf at a time without layer batching | Process entire frontier per round |
| Single directed edge for a/b=k | Add reverse with 1/k |
| Try all roots for MHT | Leaf peel to 1-2 centers |
| Sum edge weights on division query | Multiply along path |
| n=1 edge case for MHT | Return [0] immediately |

### 10. Recognition drill

Read this problem aloud:

> *"Given equations like `A/B=2` and queries `X/Y`, return X/Y or -1 if undefined."*

Before coding, say:

> *"Build weighted adj: A→B weight 2, B→A weight 0.5. Query: DFS from X to Y multiplying weights."*

**Not** Kahn. **Not** 2-color. **Weighted graph build + path multiply.**

---

*Peel leaves to the center; build division graphs for queries. First quest: MHT. →*
