<!-- hand-authored -->
# 📝 Tree Properties via Recursion

> **Day 4** · Tree Properties · 10 XP · 10 min read

---

Your mission today: **extend bottom-up recursion beyond raw depth** — check structural properties (balanced?) and exploit **complete-tree shape** for faster counting. Same ↑ compass as Day 1 Max Depth, but with **early exit** and **O(log n) math**.

---

## Part 1 — Properties Bubble Up (With Smarts)

### 1. Day 1 vs Day 4 — same direction, harder questions

| | Day 1 Max Depth #104 | Day 4 today |
|---|---|---|
| Question | "How deep?" | "Is it balanced?" / "How many nodes?" |
| Combine | `1 + max(L, R)` | height + check, or `1 + count` |
| Early exit? | No — need full depth | **Yes** — imbalance propagates failure |
| Structure hint | Any binary tree | Complete tree → math shortcut |

Both use **↑ bottom-up**: children report; parent combines. Day 4 adds **sentinel returns** and **shape-aware optimization**.

### 2. Balanced tree — height with early exit (#110)

A tree is **balanced** if every node's left and right subtree heights differ by at most 1.

**Naive:** compute height separately at every node → O(n²).  
**Smart:** one postorder pass returns height, but **propagate failure** when `|L − R| > 1`.

```
height(node):
    if null: return 0
    L = height(left)
    R = height(right)
    if |L - R| > 1: mark FAIL (or return -1 sentinel)
    return 1 + max(L, R)
```

Once a subtree is imbalanced, ancestors don't need precise height — answer is already false.

**Contrast Day 1 depth:** Max Depth always combines fully. Balanced needs **check at combine time**.

### 3. Complete tree counting — O(log² n) insight (#222)

A **complete** binary tree fills levels left-to-right — no gaps until the last row.

**Key observation:** Walk left spine → `leftHeight`. Walk right spine → `rightHeight`.

```
If leftHeight == rightHeight:
    Perfectly filled through bottom → nodes = 2^h - 1   (math, stop recursing)

Else:
    Last level partial → 1 + count(left) + count(right)
```

Each mismatch cuts problem size in half → **O(log² n)** instead of O(n) visit every node.

**Contrast Day 1 depth:** Max Depth visits every node. Complete-tree count **skips** whole perfect subtrees with one formula.

### 4. Visual — balanced check on small tree

```
        3
       / \
      9  20
        /  \
       15   7

heights bubble up:
  15 → 1,  7 → 1,  9 → 1
  20 → 1 + max(1,1) = 2   |1-1| ≤ 1 ✓
  3  → 1 + max(1,2) = 3   |1-2| ≤ 1 ✓  → balanced
```

Imbalanced example — stop early when diff > 1 at any node.

### 5. Pattern signals — Day 4 only

| When the problem says… | Think… |
|---|---|
| "balanced binary tree" | ↑ height + abs diff check; early exit |
| "height difference at most 1" | Combine at parent, not separate passes |
| "complete binary tree" + count | Left/right spine heights; `2^h - 1` shortcut |
| "count nodes" + complete guarantee | O(log² n) recursion |
| "return -1 sentinel" | Propagate failure up without extra pass |
| "every node" property check | Bottom-up, not BFS levels |
| "perfect binary tree" (related) | Both spines equal → full formula |
| "subtree height" reuse | Same bubble as Max Depth + predicate |

**Keywords:** `balanced` · `complete` · `height` · `sentinel` · `2^h - 1` · `early exit`

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| **Recompute height at every node independently** | O(n²) on skewed trees |
| **BFS to check balance** | Awkward; height diff is recursive |
| **Visit all n nodes on complete tree** | Misses `2^h - 1` shortcut |
| **Global flag without height return** | Still need one pass — combine smartly |
| **Confuse depth (Day 1) with balance** | Depth = max; balance = compare both sides |

### 7. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Two separate height functions | One DFS returns height + checks diff |
| Forgetting one-child nodes in min depth (test preview) | Different guard than max depth |
| Using BFS for balance | Property is recursive on subtrees |
| `2^h` off-by-one | Full level count = `2^h - 1` nodes |
| No early exit on imbalance | Return sentinel immediately |

### 8. Bridge from Day 1 and Day 3

- **Day 1:** ↑ `1 + max(L,R)` — always finish both subtrees.
- **Day 3:** ↔ BFS levels — horizontal, not property bubble.
- **Day 4:** ↑ same bubble, but **predicate at combine** (balanced) or **shape math** (complete count).

### 9. Recognition drill — today's quests

**Quest 1 — Balanced #110:**
> *"↑ Return height; if |L−R|>1 fail. One pass, early exit."*

**Quest 2 — Count Complete #222:**
> *"Compare left/right spine heights. Equal → `2^h−1`. Else split."*

---

*You extend the depth bubble. Quest 1 checks balance on the way up. →*
