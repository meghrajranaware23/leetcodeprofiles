<!-- hand-authored -->
# 📝 Level-Order Patterns

> **Day 9** · Level-Order Patterns · 10 XP · 15 min read

---

Day 3 taught the BFS skeleton: queue, level-size loop, enqueue children. Today you **vary what you record** at each level — last node seen, zigzag direction, index positions — without changing the core *"process one level at a time"* engine.

> **Link to Day 3 (E-Rank):** Same queue template from [Level Order Traversal](../03-2-quest-level-order.md). Today adds per-level logic on top.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**BFS template variations** — outer `while` queue not empty; inner loop `for sz = q.size()` processes exactly one level; customize the inner body.

- **Level snapshot** — capture first, last, or all nodes at each depth
- **Direction alternation** — deque + flip push/pop side each level
- **Indexed BFS** — assign position `i` or `i*2`, `i*2+1` for width problems

### 2. Simple explanation

BFS is a **wave** spreading left to right. Each wave is one level. The inner loop drains the current wave before the next begins — that's how you know you're done with level `d` and can record its answer.

Right-side view? Remember the **last** node you dequeue at each level. Zigzag? Alternate whether you read from the front or back of a deque.

### 3. Visual — BFS level-by-level (Day 3 recap)

```
        1
       / \
      2   3
     / \    \
    4   5    6

Queue waves:

Wave 0:  [1]           → process → enqueue 2, 3
Wave 1:  [2, 3]        → process → enqueue 4, 5, 6
Wave 2:  [4, 5, 6]     → process → done

Inner loop: for i in 0..sz-1 guarantees one wave = one level.
```

### 4. Visual — Right Side View: last per level

```
        1                 Level 0: last = 1
       / \
      2   3               Level 1: process 2, then 3 → last = 3
     / \    \
    4   5    6             Level 2: process 4, 5, 6 → last = 6

Answer: [1, 3, 6]

At each level loop:
  for i = 0 .. sz-1:
    node = q.pop()
    if i == sz - 1:   ← rightmost in this wave
      res.add(node.val)
    enqueue children left, then right
```

DFS pre-order-right also works, but BFS "last of level" is the direct read.

### 5. Visual — Zigzag: deque direction flip

```
        3
       / \
      9   20
         /  \
        15   7

Level 0 (L→R): dequeue front → [3]           output: [3]
Level 1 (R→L): dequeue back  → [20, 9]       output: [20, 9]
Level 2 (L→R): dequeue front → [15, 7]       output: [15, 7]

leftToRight = true:
  pop front, push children to back (left, then right)

leftToRight = false:
  pop back, push children to front (right, then left)

Toggle leftToRight after each level.
```

### 6. The universal template

```
q = [root]
while q not empty:
    sz = len(q)
    level_result = []
    for i in 0 .. sz-1:
        node = dequeue (front or back — zigzag)
        // customize: record if i==sz-1, append to level, etc.
        enqueue children (order depends on zigzag direction)
    finalize level (append, toggle direction)
return result
```

| Variation | Inner-loop tweak |
|---|---|
| Right side view | `if i == sz-1: record node.val` |
| Zigzag | Deque + alternate pop/push ends |
| Max width (test) | Track index per node; width = right_idx - left_idx + 1 |

### 7. Why DFS sometimes fails or overcomplicates

| Approach | Problem |
|---|---|
| DFS with depth map for right view | Works but less intuitive than "last of BFS wave" |
| Single queue without level-size loop | Can't distinguish level boundaries |
| Reverse entire result array for zigzag | Wasteful — direction flip at enqueue/dequeue is O(1) per node |
| Recursion with level index | Valid but BFS is the natural fit for "each level" |

When the problem says **"each level"**, hear **BFS**.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "right side view" / "visible from right" | BFS last per level |
| "zigzag" / "spiral" level order | Deque direction alternation |
| "each level" / "level order" | BFS + level-size loop (Day 3) |
| "bottom row" / "leftmost at depth" | BFS first per level |
| "maximum width" | BFS + index tracking (D-Rank test) |

**Keywords:** `q.size()` · `i == sz-1` · `deque` · `leftToRight` · `level`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| No inner level-size loop | Can't isolate "last of level" |
| Enqueue null nodes | Skip — only push existing children |
| Zigzag: always pop front | Alternate pop front vs pop back |
| Zigzag: wrong child push order on reverse level | Push right then left to front |
| Mixing BFS level logic with DFS path state | Level = horizontal wave, not root-to-leaf |

### 10. Recognition drill

Read this problem aloud:

> *"Return the values of nodes you can see ordered from top to bottom from the right side."*

Before coding, say:

> *"BFS level loop. At each level, the last node dequeued is the answer. i == sz-1 → record. Same skeleton as Day 3 level order."*

---

*Same BFS engine as Day 3 — new per-level rules. First quest: right side view. →*
