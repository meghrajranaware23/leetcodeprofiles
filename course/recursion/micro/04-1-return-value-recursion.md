<!-- hand-authored -->
# 📝 Bottom-Up Return Recursion

> **Day 4** · Bottom-Up Returns · 10 XP · 10 min read

---

Days 1–3 shrunk a structure and combined results. Today the combine step has a specific direction: **answers flow upward from the leaves**.

You recurse **down** to children you can't simplify further. Each frame **waits**. When both sub-calls return, you **aggregate** their answers into one value and pass it to your parent. Nothing important is decided on the way down — the work happens on the way **up**.

> **Preview contrast (Day 5):** Today = *returns bubble up*. Tomorrow = *state travels down* (remaining target, valid range bounds). Same tree, opposite data flow.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Bottom-up return recursion** — the recursive call produces the answer; the current frame only combines child results.

- **Base case** — leaf or empty subtree → return a direct value (`0`, `true`, a single node)
- **Recursive case** — `leftAns = solve(left)`, `rightAns = solve(right)`, return `combine(leftAns, rightAns)`
- **Trust** — you don't pass a running total down; children return everything you need

### 2. Simple explanation

You're the manager of a small team (left and right subtree). You don't do the front-line work. You ask each report: *"What's your number?"* When both reply, you add or compare and report **your** number upward.

The CEO (root caller) gets the final answer only after the whole tree has reported bottom-up.

### 3. Visual walkthrough — depth bubbling up

```
Tree:     3
         / \
        9   20
           /  \
          15   7

maxDepth(3):
  wait for maxDepth(9)  and  maxDepth(20)

maxDepth(9):  no children → return 1
maxDepth(20):
  wait for maxDepth(15)=1, maxDepth(7)=1
  return 1 + max(1,1) = 2

Back at root:
  return 1 + max(1, 2) = 3  ✓

RETURNS (bubble upward):
  leaves → 1
  node 20 → 2
  node 9  → 1
  root 3  → 3
```

### 4. How the pattern works

```
function solve(node):
    if node is null:
        return base_value          // empty → 0 depth, true for "same empty"
    left  = solve(node.left)
    right = solve(node.right)
    return combine(node, left, right)
```

**Parallel recursion** (two trees): same shape, recurse both sides in lockstep — `isSame(p.left,q.left) && isSame(p.right,q.right)`.

### 5. What problem does this solve?

| Problem family | Combine step on return |
|---|---|
| Max / min depth | `1 + max(left, right)` |
| Same tree | `&&` of left and right boolean results |
| Balanced tree | `abs(leftH - rightH) <= 1` |
| Diameter / max path | `max` of child contributions |
| Count nodes | `1 + leftCount + rightCount` |

### 6. Why bottom-up beats top-down here

| Top-down attempt | Problem |
|---|---|
| Pass `currentDepth` down for max depth | Works, but you track redundant state — depth is defined by returns |
| Global variable updated in DFS | Hidden state; harder to reason about |
| BFS level count | Valid iterative approach, but misses the recursive aggregation template |
| Check same tree by comparing values only at root | Misses subtrees — need parallel recursion |

For **max depth** and **same tree**, the question is *"What do my subtrees tell me?"* — not *"What do I carry downward?"*

### 7. The key observation

**If the problem asks for a property of the whole tree expressible from child properties, think bottom-up.** The root's answer is a pure function of child answers (plus maybe the current node).

Day 5 flips this: when the question is *"Does any downward path satisfy X?"* or *"Sum nodes in range [L,H]"*, you **push constraints down** instead.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "maximum / minimum depth" | `1 + max/min` of child depths |
| "same tree" / "symmetric" | Parallel recursion, `&&` |
| "height of tree" | Bottom-up height bubble |
| "count nodes / leaves" | Sum counts from children |
| "return int/bool from tree" | Likely bottom-up unless path needs remainder state |

**Keywords:** `return` · `left` · `right` · `max(` · `&&` · `null → 0 or true`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forgetting `null → 0` for depth | Empty subtree contributes 0, not 1 |
| Using `+` instead of `max` for depth | Depth is longest path, not sum of branches |
| Checking only root values (same tree) | Must recurse **both** children in parallel |
| Passing depth counter down (when returns suffice) | Prefer bottom-up for aggregate tree metrics |
| Confusing with Day 5 path problems | Path sum needs **remaining target** down — not today's pattern |

### 10. Recognition drill

Read this problem aloud:

> *"Given two binary trees, check if they are the same."*

Before coding, say:

> *"Bottom-up bool. Base: both null → true; one null or val mismatch → false. Else return isSame(left-left) && isSame(right-right)."*

---

*Returns bubble up from the leaves. First quest: how deep does the tree go? →*
