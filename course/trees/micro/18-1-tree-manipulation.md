<!-- hand-authored -->
# 📝 Tree Manipulation: Merge & Transform

> **Day 18** · Tree Manipulation · 25 XP · 15 min read

---

Day 5 compared trees in parallel; Day 12 walked BSTs in inorder. Today you **build** and **rewrite** trees — merge two structures node-by-node, or walk a BST backward to accumulate a running sum. Same recursive trust: handle the current pair of nodes, delegate subtrees.

> **Contrast (Day 5):** Same Tree checks equality. Today **constructs** a new merged tree or **mutates** values in-place.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Parallel merge + reverse inorder transform** — two techniques:

| Technique | Input | Action |
|---|---|---|
| **Parallel merge** | Two roots `t1`, `t2` | If both exist: sum vals, merge lefts and rights |
| **Reverse inorder** | BST root | Visit right → node → left; carry running `total` |

### 2. Simple explanation

**Merge (#617):** Two trees are overlays. Where both have a node, add values and recurse on both left pairs and both right pairs. Where only one exists, that subtree becomes the result branch.

**Greater Tree (#538):** Inorder on a BST visits values ascending. **Reverse** inorder visits descending — largest first. A running sum of "everything already visited (all larger values)" replaces each node's value.

### 3. Visual — Parallel merge (t1, t2)

```
t1:     1          t2:   2              merged:
       / \               / \                  3
      3   2             1   3               / \
                                           4   5

At (1, 2): val = 1+2 = 3
  merge(3, 1) → left child val 4
  merge(2, 3) → right child val 5

PARALLEL SKELETON:
  if !t1: return t2
  if !t2: return t1
  t1.val += t2.val
  t1.left  = merge(t1.left,  t2.left)
  t1.right = merge(t1.right, t2.right)
  return t1
```

### 4. Visual — Reverse inorder running sum

```
BST:        4
           / \
          2   6
         / \ / \
        1  3 5  7

Reverse inorder visit order: 7 → 6 → 5 → 4 → 3 → 2 → 1

total starts 0:
  visit 7: total=7,   node→7
  visit 6: total=13,  node→13
  visit 5: total=18,  node→18
  visit 4: total=22,  node→22
  visit 3: total=25,  node→25
  visit 2: total=27,  node→27
  visit 1: total=28,  node→28

Each node becomes sum of itself + all nodes visited before (all larger in BST).
```

### 5. The universal template

**Parallel merge:**
```
function merge(t1, t2):
    if t1 is null: return t2
    if t2 is null: return t1
    t1.val += t2.val
    t1.left  = merge(t1.left,  t2.left)
    t1.right = merge(t1.right, t2.right)
    return t1
```

**Reverse inorder (global or ref total):**
```
total = 0
function dfs(node):
    if node is null: return
    dfs(node.right)
    total += node.val
    node.val = total
    dfs(node.left)
```

| Problem | Pattern | Key idea |
|---|---|---|
| Merge Trees #617 | Parallel merge | Null absorbs other tree |
| Greater Tree #538 | Reverse inorder | Right before left; running sum |

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| Flatten both trees to arrays, merge, rebuild | O(n) extra space + loses structure |
| Preorder merge without null handling | Can't overlay mismatched shapes |
| Normal inorder for Greater Tree | Visits smaller first — wrong accumulation order |
| BFS merge level-by-level | Harder pointer wiring; DFS parallel is natural |
| Copy t2 into new nodes always | Problem allows reuse of t1 nodes |

### 7. Bridge — Day 5 parallel recursion

If you completed **Day 5 Same Tree / Symmetric Tree**, parallel merge is the **construction** version:

| Day 5 | Day 18 |
|---|---|
| Compare `a.val == b.val` | Combine `a.val += b.val` |
| Both null → true | Either null → return other |
| Two pointers `(a, b)` | Same two-pointer skeleton |

Same side-by-side recursion — different combine at each frame.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "merge two binary trees" | Parallel merge, null fallback |
| "sum overlapping nodes" | In-place on t1 |
| "BST" + "greater than all nodes to right" | Reverse inorder |
| "convert / transform in place" | Often one-pass DFS with global state |
| "two roots" | Parallel recursion |

**Keywords:** `merge(t1,t2)` · `reverse inorder` · `running total` · `right first`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Creating new node every step for merge | Reuse t1 when possible |
| Forgetting `if !t1 return t2` | Unbalanced trees — one side null |
| Inorder left-first for #538 | **Right → node → left** |
| Passing total by value in strict languages | Use member variable or reference |
| Merge on non-aligned nodes | Always merge `(t1.left, t2.left)` pairs |

### 10. Recognition drill

Read this problem aloud:

> *"Merge two binary trees by adding overlapping nodes."*

Before coding, say:

> *"Parallel merge: null returns other tree. Both exist: add vals, merge lefts, merge rights. O(n) single pass."*

---

*Build and transform. First quest: parallel merge. →*
