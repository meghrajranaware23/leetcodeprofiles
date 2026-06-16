<!-- hand-authored -->
# 📝 Advanced BFS: Tree as Graph

> **Day 22** · Advanced BFS · ★★★★☆ · 25 XP · 15 min read

---

Day 3 BFS tracked **level waves**. Day 17 tracked **first node per level** or **columns**. Today BFS carries **relationship metadata** — `(node, parent, depth)` — to answer cousin queries and **deepest level sums**. Parent pointers are explicit in the queue; that's new versus Day 17's view-only tagging.

> **Link (Day 3 / Day 9):** Same FIFO engine from [BFS Level-Order](../03-1-bfs-level-order.md) and [Level-Order Patterns](../09-1-bfs-variations.md). Today adds **parent + depth** fields to each queue entry.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**BFS with (node, parent, depth) metadata** — enrich queue entries:

| Problem | Queue entry | Answer logic |
|---|---|---|
| **Cousins #993** | `(node, parent, depth)` | Same depth, different parent |
| **Deepest Leaves Sum #1302** | Standard BFS levels | Sum last level entirely |

### 2. Simple explanation

**Cousins:** Two nodes are cousins if they share the **same depth** but **different parents**. BFS naturally assigns depth level-by-level. Store parent when enqueueing children so you can compare `(depth, parent)` for targets x and y.

**Deepest sum:** Same level-end loop as Day 17 — but instead of one first node, **add every value** in the final wave.

### 3. Visual — BFS queue with (node, parent, depth)

```
Tree:        1
            / \
           2   3
          / \
         4   5

Find if 4 and 5 are cousins? (No — same parent 2)

BFS queue entries:

Start: (1, null, 0)

Level 1 enqueue:
  (2, 1, 1)   (3, 1, 1)

Level 2 enqueue:
  (4, 2, 2)   (5, 2, 2)

When node.val == x: record (parent=2, depth=2)
When node.val == y: record (parent=2, depth=2)

Same depth ✓ but same parent ✗ → siblings, not cousins

COUSINS = same depth AND parent different
```

**Alternative:** DFS passing `(parent, depth)` — equivalent; B-Rank concept emphasizes queue form.

### 4. Visual — Deepest level sum (Day 9 / Day 17 link)

```
        1
       / \
      2   3
     / \   \
    4   5   6

Level sums during BFS:

Level 0: sum = 1
Level 1: sum = 2+3 = 5
Level 2: sum = 4+5+6 = 15  ← answer

Each level batch:
  level_sum = 0
  for each node in wave: level_sum += val
  overwrite res = level_sum
Last res = deepest level total
```

Same inner loop as [Right Side View Day 9](../09-2-quest-right-side-view.md) — aggregate whole level instead of last node.

### 5. The universal template

**BFS parent + depth:**
```
q.push({root, nullptr, 0})
while q not empty:
    for sz = q.size():
        (node, par, d) = q.pop()
        if node.val == x: save (par, d)
        if node.val == y: save (par, d)
        if node.left:  q.push({left,  node, d+1})
        if node.right: q.push({right, node, d+1})
return xDepth==yDepth && xPar != yPar
```

**Deepest level sum:**
```
while q not empty:
    level_sum = 0
    for sz = q.size():
        node = q.pop()
        level_sum += node.val
        enqueue children
    res = level_sum
return res
```

| Problem | Pattern | vs Day 17 |
|---|---|---|
| Cousins #993 | Parent + depth tracking | **NEW** parent in queue |
| Deepest Leaves Sum #1302 | Level sum accumulation | Like bottom-left but sum all |

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| Compare depth via DFS without parent | Siblings vs cousins confusion |
| Store full ancestor lists | O(h) per node wasteful |
| Deepest sum: DFS max depth then re-walk | Two passes — one BFS suffices |
| Cousins: only compare depth | Must also check different parent |
| Ignore parent when depth matches | Siblings at same depth aren't cousins |

### 7. Day 22 vs Day 17 — what's new

| | **Day 17** | **Day 22** |
|---|---|---|
| Queue carries | `(node, col)` or node only | `(node, parent, depth)` |
| Question | View / projection | Relationship / level aggregate |
| Parent info | Not needed | **Required** for cousins |
| Deepest level | First node only (#513) | Sum all nodes (#1302) |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "cousins" / "same depth" + "different parent" | BFS/DFS with parent track |
| "deepest leaf" / "deepest level sum" | BFS level accumulation |
| "distance from root" per node | Depth in queue |
| "siblings vs cousins" | Parent comparison |
| "last level" aggregate | Day 9 level loop |

**Keywords:** `(node, parent, depth)` · `level_sum` · `same depth` · `different parent`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Cousins: depth only | Also require different parent |
| Forgetting root's parent = null | Root has no parent — not cousin with depth-1 nodes incorrectly |
| Deepest sum: not resetting sum each level | `level_sum = 0` at batch start |
| Confusing siblings with cousins | Same parent → siblings |
| Using Day 17 first-node for sum | Sum **all** nodes in last wave |

### 10. Recognition drill

Read this problem aloud:

> *"Two nodes are cousins if they are at the same depth but have different parents."*

Before coding, say:

> *"BFS (node, parent, depth). Record parent+depth for x and y. Answer: same depth, different parent."*

---

*Parent-aware BFS and deepest level sums. First quest: cousins. →*
