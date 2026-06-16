<!-- hand-authored -->
# 📝 Recursion on Trees (Consolidation)

> **Day 9** · Postorder Swap · Mirror Pairs · ★★★☆☆ · 15 XP · 15 min read

---

Your mission today: **consolidate tree recursion** from E-Rank Days 4–5. You already know bottom-up returns (depth, same tree) and top-down state (path sum, BST range). Today you **modify structure** — swap children in postorder, and compare **mirror pairs** across subtrees.

---

## Part 1 — Tree Recursion Skeleton

### 1. What is tree recursion?

At each node:

- **Base** — `node == null` → return sentinel (`null`, `true`, `0`)
- **Recurse** — call on left and right children (smaller subtrees)
- **Combine** — swap, compare mirrors, or aggregate child results

Trees are recursion-native: each child is a smaller copy of the problem.

### 2. Link to E-Rank Days 4–5

| Day | Pattern | Example | Data flow |
|---|---|---|---|
| **Day 4** | Bottom-up return | Max Depth #104, Same Tree #100 | Children report up; parent combines |
| **Day 5** | Top-down state | Path Sum #112, Range Sum BST #938 | Bounds/target passed down |
| **Day 9** | Structural modify + mirror | Invert #226, Symmetric #101 | Postorder swap; paired-node compare |

Invert Tree is **void/postorder modify** — children processed, then swap at current node.

Symmetric Tree is **paired recursion** — not `left` vs `left`, but `left` vs **right mirror**.

### 3. Visual — invert postorder swap

```
Tree before:     4
                / \
               2   7
              / \ / \
             1  3 6  9

CALL ORDER (postorder-style — recurse then swap at node):

invert(4):  recurse invert(7) first in code... 
  (Python one-liner: invert right, invert left, assign)

After invert(4):
        4
       / \
      7   2
     / \ / \
    9  6 3  1

At each node: left subtree already inverted, right already inverted → swap pointers.
```

C++ order: recurse left, recurse right, **then** `swap(left, right)`.

### 4. Visual — symmetric mirror compare

```
Symmetric tree:     1
                   / \
                  2   2
                 / \ / \
                3  4 4  3

mirror(2, 2): val match ✓
  mirror(2.left=3, 2.right=4)?  3≠4 → false

For valid symmetric:
mirror(a,b):
  both null → true
  one null or vals differ → false
  mirror(a.left, b.right) AND mirror(a.right, b.left)
```

**Mirror rule:** outer pair `(a.left, b.right)` and inner pair `(a.right, b.left)`.

### 5. The universal templates

**Postorder modify (invert):**
```
function invert(node):
    if !node: return null
    invert(node.left)
    invert(node.right)
    swap(node.left, node.right)
    return node
```

**Mirror pair (symmetric):**
```
function mirror(a, b):
    if !a && !b: return true
    if !a || !b || a.val != b.val: return false
    return mirror(a.left, b.right) && mirror(a.right, b.left)
```

### 6. Why brute force fails

| Approach | Problem |
|---|---|
| **BFS level-order invert** | Works but misses recursive structure lesson |
| **Compare left with left for symmetry** | Wrong pairing — symmetry is cross-subtree |
| **Swap before recursing children** | May double-swap or confuse order — follow postorder |
| **Iterative without stack mental model** | Hard to verify mirror logic |

### 7. Pattern signals for Day 9

| When the problem says… | Think… |
|---|---|
| "invert" / "mirror" tree | Swap left/right at each node |
| "symmetric" / "mirror image" | Helper comparing two nodes cross-wise |
| "postorder" modification | Recurse children, then local swap/rewire |
| "binary tree" + structural change | Tree DFS, not array index |

**Keywords:** `invert` · `mirror` · `postorder` · `swap` · `symmetric` · `paired recursion`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| `mirror(a.left, b.left)` | Cross: `a.left` with `b.right` |
| Swap before child invert | Children swap again — messy; use postorder |
| Forget null base on invert | `if !node return null` |
| Symmetric: only check root children once | Full recursive mirror on all pairs |
| Confuse invert with symmetric | Invert **changes** tree; symmetric **checks** structure |

### 9. Recognition drill

Read this problem aloud:

> *"Invert a binary tree."*

Before coding, say:

> *"Base: null. Recurse both subtrees. Swap left/right. Return root. Same skeleton as Day 4 depth, but modify instead of aggregate."*

---

*You link Days 4–5 to structural tree work. First quest: invert. →*
