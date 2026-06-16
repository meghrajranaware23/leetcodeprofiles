<!-- hand-authored -->
# 📝 BST Augmentation & Iterator Patterns

> **Day 23** · BST Augmentation · ★★★★☆ · 20 XP · 15 min read

---

Days 11–12 read and modify BSTs with inorder. Today you **stream** sorted order on demand — lazy inorder with a stack — and answer **navigation queries** (closest value, successor) without full traversals. These patterns extend the C-Rank [BST Iterator #173](https://leetcode.com/problems/binary-search-tree-iterator/) and Day 12 inorder early-stop into A-Rank augmentation.

> **Contrast (Day 12):** Yesterday = kth-smallest with counter. Today = **iterator class** + **BST-guided walks** that exploit ordering for O(h) answers.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**BST augmentation via inorder machinery + ordered walks:**

| Technique | Core idea | Space |
|---|---|---|
| Lazy inorder iterator | Stack of left spines; each `next()` = one inorder step | O(h) |
| Closest value walk | Descend toward target; update best candidate each step | O(1) |
| Inorder successor | Case split: right subtree min OR ancestor from search path | O(h) |

### 2. Simple explanation

**Lazy inorder (C-Rank #173 / Day 12 iterative):** Don't flatten the tree. Push every left child onto a stack until you hit null — that's the **left spine** to the next smallest unvisited node. `next()` pops the top (visit it), then pushes the left spine of its **right** child. Same order as recursive inorder, one node per call, amortized O(1).

**Closest value:** BST ordering means the answer lives on the search path. Walk toward `target`; at each node, if this value is closer than your best, update. Go left if target is smaller, right if larger. No backtracking needed.

**Inorder successor:** The next node after `p` in sorted order is either:
- **Case A — `p` has a right subtree:** leftmost node in right subtree (one left walk)
- **Case B — no right subtree:** lowest ancestor for which `p` is in the **left** subtree (the walk you'd take searching for `p+ε`)

The iterative successor walk unifies both: when `p.val < root.val`, record `root` as candidate and go left; else go right.

### 3. Visual — Lazy inorder iterator

```
BST:        7
           / \
          3   15
         / \    \
        1   4    20

Constructor: pushLeft(7) → stack [7, 3, 1]

next(): pop 1 → pushLeft(1.right=null) → return 1
next(): pop 3 → pushLeft(4) → stack [7, 3, 4] → return 3
next(): pop 4 → return 4
next(): pop 7 → pushLeft(15, 20) → return 7
...

Each node pushed once, popped once → amortized O(1) per next().
Same skeleton as Day 12 kth-smallest — but caller drives pace, no k-stop.
```

### 4. Visual — Closest value early-exit walk

```
BST:        4
           / \
          2   6
         / \ / \
        1  3 5  7

target = 3.7

Step at 4: closest=4, 3.7 < 4 → go left
Step at 2: closest=2, |2-3.7|=1.7 < |4-3.7|=0.3? No, 4 closer... wait:
  |4-3.7| = 0.3, |2-3.7| = 1.7 → keep closest=4, go right (3.7 > 2)
Step at 3: |3-3.7| = 0.7 < 0.3? No — keep 4... actually |3-3.7|=0.7 > 0.3, keep 4, go right
Step at null from 3 → return 4

target = 3.2:
  At 4: closest=4, go left
  At 2: |2-3.2|=1.2, go right
  At 3: |3-3.2|=0.2 < 0.8 → closest=3, go right → null
  Return 3 ✓

  ┌──────────────────────────────────────────────┐
  │  Always update closest on current node       │
  │  Then: target < val → left, else → right     │
  │  O(h) — never visit off-path nodes           │
  └──────────────────────────────────────────────┘
```

### 5. Visual — Successor case split

```
BST:        15
           /  \
          6    18
         / \  / \
        3  7 17 20
           \
            8

Case A — successor of 7 (has right child 8):
  Leftmost of right subtree: 8 ✓

Case B — successor of 8 (no right child):
  Search-path walk for 8:
    15: 8 < 15 → res=15, go left
     6: 8 > 6  → go right
     7: 8 > 7  → go right
     8: found
  res = 15? No — 8's successor is not 15.
  
  Correct Case B: ancestor where node is in LEFT subtree.
  From 8: parent 7 (8 is right child — not candidate)
           parent 6 (8 is in right subtree — not candidate)
           parent 15 (8 is in left subtree) → successor = 15? 
  
  Inorder of tree: 3,6,7,8,15,17,18,20 → successor of 8 is 15 ✓

Unified walk (p=8):
  15: p<15 → res=15, left
   6: p>6  → right
   7: p>7  → right
   8: p==8 → right (not left branch)
  return res=15 ✓
```

### 6. The universal template

**Lazy inorder iterator:**
```
pushLeft(node):
    while node: stack.push(node); node = node.left

constructor: pushLeft(root)

next():
    node = stack.pop()
    pushLeft(node.right)
    return node.val

hasNext(): return !stack.empty()
```

**Closest value:**
```
closest = root.val
while root:
    if |root.val - target| < |closest - target|: closest = root.val
    root = root.left if target < root.val else root.right
return closest
```

**Inorder successor (iterative):**
```
res = null
while root:
    if p.val < root.val: res = root; root = root.left
    else: root = root.right
return res   // handles Case B; Case A found via right-subtree min variant
```

### 7. Why brute force fails

| Brute force | Problem |
|---|---|
| Inorder to array, then query | O(n) space — iterator needs O(h) |
| Full inorder for closest / successor | O(n) when O(h) walk suffices |
| DFS without BST ordering | Misses the one-path guarantee |
| Re-traverse from root each `next()` | O(n) per call vs amortized O(1) |

**The insight:** BST structure **is** a sorted index with O(h) navigation. Augmentation = reuse inorder order without materializing it.

### 8. Day 23 vs Day 12 vs C-Rank

| | **Day 12** | **C-Rank #173** | **Day 23** |
|---|---|---|---|
| Inorder | Early-stop at k | Stream all via `next()` | Iterator + navigation queries |
| Goal | kth value | Design class | Closest, successor |
| Stack | Same left-spine trick | Same | Same + ordered walks |

### 9. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "BST iterator" / "next() smallest" | Lazy inorder stack |
| "closest value to target" | Walk + track best on path |
| "inorder successor/predecessor" | Case split or unified search walk |
| "average O(1) next()" | Amortized stack push/pop |
| "without full traversal" | BST ordering → one path |

**Keywords:** `pushLeft` · `left spine` · `res = root when p < root.val` · `update closest` · `O(h)`

### 10. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Flatten BST to array in constructor | O(n) space — use stack |
| Closest: stop when diff increases | Must walk full path — closer node may be above |
| Successor: always go to right child | Only Case A — Case B needs ancestor |
| Forgetting to push left spine after pop | `next()` skips subtree values |
| Confusing predecessor with successor | Predecessor: mirror (go right, track, else left) |

### 11. Recognition drill

Read this problem aloud:

> *"Design a BST iterator with next() and hasNext() in O(h) space."*

Before coding, say:

> *"pushLeft in constructor. next() = pop, pushLeft(right), return val. Day 12 inorder without k-stop — C-Rank #173 skeleton."*

---

*Stream sorted order; walk the BST for closest and successor. First quest: closest value. →*
