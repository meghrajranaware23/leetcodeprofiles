<!-- hand-authored -->
# 📝 BFS: Level-Order Traversal

> **Day 3** · BFS Level-Order · ★★☆☆☆ · 10 XP · 10 min read

---

Your mission today: **learn breadth-first search on trees** — the first time this pack goes **wide before deep**. No DFS descent. No inorder/preorder. Just a **queue** that processes one **level** at a time.

---

## Part 1 — The Queue Processes Levels

### 1. What is BFS on a tree?

**Breadth-first search** visits nodes **level by level**: all nodes at depth `d` before any node at depth `d+1`.

Tool: a **FIFO queue**.
- Enqueue children left-to-right
- Dequeue from the front
- Snapshot queue size to know where one level ends

This is the **↔ Across** compass direction from Day 1 — information spreads level by level, not up from leaves or down a single spine.

### 2. Visual — queue levels (no DFS)

Same tree for all of Day 3:

```
        3
       / \
      9  20
        /  \
       15   7
```

**Queue state after each level batch:**

```
Start:     queue = [3]

Level 0:   process [3]           → output level 0: [3]
           enqueue children       → queue = [9, 20]

Level 1:   process [9, 20]       → output level 1: [9, 20]
           enqueue children       → queue = [15, 7]

Level 2:   process [15, 7]       → output level 2: [15, 7]
           no children            → queue = []

Full level-order: [[3], [9, 20], [15, 7]]
```

**Read it as:** `[3] → [9, 20] → [15, 7]`

Each bracket is one queue snapshot at the **start** of a level loop. That is the BFS mental model — not recursion down a branch.

### 3. The level-loop skeleton

```python
queue = [root]
while queue:
    level_size = len(queue)      # freeze level boundary
    level = []
    for _ in range(level_size):
        node = queue.pop_front()
        level.append(node.val)
        if node.left:  queue.push(node.left)
        if node.right: queue.push(node.right)
    record(level)
```

**Why `level_size = len(queue)`?** Newly enqueued children belong to the **next** level — don't process them in the current loop.

### 4. BFS vs DFS — when to pick BFS

| Signal in problem | Pick |
|---|---|
| "level order" / "each level" / "by row" | **BFS** |
| "right side view" / "average of levels" | **BFS** |
| "minimum depth to leaf" (sometimes) | BFS finds nearest leaf first |
| "inorder" / "preorder" / named DFS order | DFS (Day 2) |
| "max depth" / combine from children | ↑ Bottom-up DFS (Day 1, 4) |

Day 3 owns **anything about levels as horizontal slices**.

### 5. Pattern signals — Day 3 only

| When the problem says… | Think… |
|---|---|
| "level order traversal" | BFS queue + level batch |
| "return nodes row by row" | `for _ in range(len(q))` |
| "average of each level" | BFS + sum/count per level |
| "nodes at depth k" | BFS until level k |
| "rightmost node per level" | BFS; last in batch |
| "zigzag level order" (preview) | BFS + alternate direction |
| "shortest path in unweighted tree" | BFS finds closest first |
| "across" / "horizontal" | Queue, not recursion down |

**Keywords:** `queue` · `level` · `BFS` · `len(q)` · `level order` · `breadth-first`

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| DFS + track depth manually | Works but error-prone; BFS is natural |
| Process queue without level_size | Mixes levels — wrong grouping |
| Recursion pretending to be BFS | Harder to batch by level |
| Stack (LIFO) instead of queue | Becomes DFS, not level-order |
| Store entire tree then group by depth | O(n) extra pass when one BFS pass suffices |

### 7. Common beginner mistakes

| Mistake | Fix |
|---|---|
| No `level_size` snapshot | Children enqueued mid-loop bleed into current level |
| Empty tree crash | `if not root: return []` |
| Using DFS for "each level" | Read the level signal — use queue |
| Forgetting to enqueue null-safe | Only push non-null children |
| Confusing BFS depth with max depth | BFS **finds** levels; Day 1 **combines** depth from below |

### 8. Bridge from Day 2

Day 2: **when** you record during DFS (inorder/preorder).  
Day 3: **which nodes** you batch together — all nodes at the same depth in one queue generation.

Same tree `[3,9,20,15,7]`:
- Preorder DFS: `[3, 9, 20, 15, 7]` (one flat list, depth-first)
- BFS levels: `[[3], [9, 20], [15, 7]]` (grouped by depth)

Different question → different tool.

### 9. Recognition drill — today's quests

**Quest 1 — Level Order #102:**
> *"BFS queue. Snapshot `len(q)` per level. Output `[[3], [9,20], [15,7]]`."*

**Quest 2 — Average of Levels #637:**
> *"Same BFS skeleton. Sum values in each batch, divide by batch size."*

---

*You see the queue levels. Quest 1 collects them into a 2D list. →*
