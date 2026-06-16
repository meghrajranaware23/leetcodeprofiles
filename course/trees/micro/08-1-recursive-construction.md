<!-- hand-authored -->
# 📝 Recursive Construction: Building Trees

> **Day 8** · Tree Construction · ★★★☆☆ · 10 XP · 15 min read

---

You've traversed trees and measured them. Today you **build** them — from two traversal arrays that describe the same tree in different orders. The root's identity is pinned by **preorder** (first) or **postorder** (last); **inorder** tells you exactly where to split left from right.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Recursive construction** — pick root from one array, find it in inorder, split into left/right segments, recurse on each half.

- **Preorder + Inorder** — root = `pre[0]`; inorder split → left segment, right segment
- **Inorder + Postorder** — root = `post[pe]` (last); same split, build **right subtree first** (reverse construction)
- **Hash map** — `inorder value → index` for O(1) root lookup

### 2. Simple explanation

Inorder is a **cut line**: everything left of the root belongs in the left subtree; everything right belongs in the right subtree. Preorder tells you *who* the root is (always first). Postorder tells you *who* the root is (always last) — then you work backward.

Each recursive call shrinks three windows: preorder bounds, inorder bounds, (and postorder bounds for variant 2).

### 3. Visual — Preorder + Inorder: root = pre[0], split inorder

```
preorder:  [3, 9, 20, 15, 7]
inorder:   [9, 3, 15, 20, 7]

Step 1: root = pre[0] = 3
        find 3 in inorder at index 1

inorder:   [9 | 3 | 15, 20, 7]
            ↑       ↑
          left    right
          size=1  size=2

Step 2: build left  from pre[1..1],   in[0..0]   → node 9
        build right from pre[2..4],   in[2..4]   → subtree 20

Result:
        3
       / \
      9   20
         /  \
        15   7

pre[0]=root → leftSize = k - is → left gets pre[1..1+leftSize-1]
```

### 4. Visual — Inorder + Postorder: reverse construction

```
inorder:   [9, 3, 15, 20, 7]
postorder: [9, 15, 7, 20, 3]

Step 1: root = post[pe] = post[4] = 3
        find 3 in inorder at index 1

inorder:   [9 | 3 | 15, 20, 7]
rightSize = ie - k = 4 - 1 = 2

Step 2: build RIGHT first (postorder reads root last → process right before left)
        right: in[2..4], post[2..3]  → subtree 20
        left:  in[0..0], post[0..0]  → node 9

Same tree — construction order reversed, split logic identical.
```

### 5. The universal templates

**Preorder + Inorder:**
```
root = pre[ps]
k = index of root in inorder
leftSize = k - is
root.left  = build(pre, ps+1, ps+leftSize,     in, is, k-1)
root.right = build(pre, ps+leftSize+1, pe,    in, k+1, ie)
```

**Inorder + Postorder:**
```
root = post[pe]
k = index of root in inorder
rightSize = ie - k
root.right = build(in, k+1, ie, post, pe-rightSize, pe-1)
root.left  = build(in, is, k-1, post, ps, pe-rightSize-1)
```

Base case: `ps > pe` or `is > ie` → `null`.

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| Try every node as root, check if traversals match | O(n²) or worse — ignores inorder split structure |
| Linear scan for root in inorder each call | O(n²) total — hash map fixes to O(n) |
| Wrong segment sizes after split | Off-by-one on leftSize / rightSize corrupts entire tree |
| Same build order for pre+in and in+post | Postorder variant must build **right before left** |

### 7. The key observation

**Inorder is the partition key.** Preorder/postorder only tell you the root; inorder tells you how big each child subtree is. `leftSize = k - is` (pre+in) or `rightSize = ie - k` (in+post).

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "construct from preorder and inorder" | Root = pre[0], split inorder |
| "construct from inorder and postorder" | Root = post[last], build right first |
| "unique binary tree" | Deterministic split — no ambiguity |
| "build binary tree" + two arrays | Hash inorder indices, recurse on ranges |
| "serialize / deserialize" | Often same divide-and-conquer skeleton |

**Keywords:** `pre[0]` · `post[pe]` · `leftSize` · `rightSize` · `idx map` · `split inorder`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Off-by-one in preorder segment for right child | Right starts at `ps + leftSize + 1` |
| Building left before right in postorder variant | Postorder: right subtree first |
| O(n) scan for root in inorder | Precompute `value → index` hash map |
| Empty check wrong (`ps >= pe` vs `ps > pe`) | Use `ps > pe` for zero-length segment |
| Forgetting leftSize = k - is | Size of left = elements before root in inorder |

### 10. Recognition drill

Read this problem aloud:

> *"Construct a binary tree from preorder and inorder traversal arrays."*

Before coding, say:

> *"Root = pre[ps]. Map inorder. k = idx[root]. leftSize = k - is. Left = pre[ps+1..ps+leftSize], right = rest. Base: ps > pe → null."*

---

*Two arrays, one split line. First quest: preorder meets inorder. →*
