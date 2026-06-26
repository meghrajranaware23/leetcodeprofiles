<!-- hand-authored -->
# 📝 Same Tree & Subtree Patterns

> **Day 5** · Tree Comparison · 10 XP · 10 min read

---

Your mission today: **walk two trees at once** — the **⇄ Side-by-side** compass. Same Tree compares `(p, q)` in parallel. Symmetric Tree compares **mirror pairs** `(left, right)`. One table. Two pairings. Don't mix them up.

---

## Part 1 — Parallel vs Mirror

### 1. Two trees, two pairing rules

| Pattern | Pairing at each step | Combine with |
|---|---|---|
| **Parallel (Same Tree #100)** | `(p.left, q.left)` and `(p.right, q.right)` | `&&` |
| **Mirror (Symmetric #101)** | `(a.left, b.right)` and `(a.right, b.left)` | `&&` |

Both start with: values match **and** both recursive calls succeed.

### 2. Contrast table — the Day 5 anchor

| | Same Tree `(p, q)` | Symmetric `(a, b)` |
|---|---|---|
| **Question** | Are two trees identical? | Is one tree mirror of itself? |
| **Roots compared** | `p` vs `q` (two inputs) | `left` vs `right` (one tree's children) |
| **Left pairing** | `p.left` ↔ `q.left` | `a.left` ↔ `b.right` |
| **Right pairing** | `p.right` ↔ `q.right` | `a.right` ↔ `b.left` |
| **Null base** | Both null → true; one null → false | Same |
| **Typical call** | `same(p, q)` | `mirror(root.left, root.right)` |

**Same skeleton, different wiring.** Wrong pairing = right algorithm for wrong problem.

### 3. Visual — Same Tree parallel walk

```
Tree p:     1          Tree q:     1
           / \                    / \
          2   3                  2   3

Compare (1,1) ✓
  Compare (2,2) ✓     ← left with left
  Compare (3,3) ✓     ← right with right
→ true
```

### 4. Visual — Symmetric mirror walk

```
        1
       / \
      2   2
     / \ / \
    3  4 4  3

mirror(2_left, 2_right):
  values 2 == 2 ✓
  mirror(3, 3)   ← left of a vs right of b
  mirror(4, 4)   ← right of a vs left of b
→ true
```

If you paired left-left in symmetric, you'd reject valid mirror trees.

### 5. Universal parallel skeleton

```python
def parallel(a, b):
    if not a or not b:
        return a is b          # both null → true
    if a.val != b.val:
        return False
    return combine_recursions(a, b)   # && both calls
```

**Same Tree combine:**
`parallel(a.left, b.left) and parallel(a.right, b.right)`

**Mirror combine:**
`parallel(a.left, b.right) and parallel(a.right, b.left)`

### 6. Pattern signals — Day 5 only

| When the problem says… | Think… |
|---|---|
| "same tree" / "identical" | Parallel `(p.left,q.left)`, `(p.right,q.right)` |
| "symmetric" / "mirror of itself" | Mirror cross pairing |
| "subtree of another tree" (test preview) | Parallel check + search main tree |
| "two roots" / "two trees" | Two-pointer recursion |
| "corresponding nodes" | Parallel, not mirror |
| "flip left-right reflection" | Mirror pairing |
| "return true/false" | Short-circuit `&&` on mismatch |
| "null handling" | Both null true; one null false |

**Keywords:** `parallel` · `mirror` · `same tree` · `symmetric` · `p.left/q.left` · `a.left/b.right`

### 7. Why brute force fails

| Brute force | Problem |
|---|---|
| **Serialize both trees, compare strings** | O(n) extra space; misses structural insight |
| **Flatten to lists, compare** | Loses null structure in some encodings |
| **Mirror pairing for Same Tree** | Rejects identical trees with same shape |
| **Parallel pairing for Symmetric** | Misses cross reflection |
| **Iterative without stack** | Possible but recursion mirrors logic cleanly |

### 8. Bridge from Days 1–4

- **Day 1 ↑:** one tree, combine from children
- **Day 2:** visit order on one tree
- **Day 3 ↔:** BFS levels
- **Day 5 ⇄:** **two cursors** on two subtrees — compare, don't aggregate height

Subtree of Another Tree (#572, E-Rank test) = **search** main tree + **parallel same** at each candidate root.

### 9. Recognition drill — today's quests

**Quest 1 — Same Tree #100:**
> *"Parallel: `(p.left,q.left)` AND `(p.right,q.right)`. Values match at every step."*

**Quest 2 — Symmetric #101:**
> *"Mirror: `(a.left,b.right)` AND `(a.right,b.left)`. Start with root's two children."*

---

*You know the pairing table. Quest 1: are p and q identical? →*
