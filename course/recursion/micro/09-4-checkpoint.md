<!-- hand-authored -->
# ✅ Day 9 Checkpoint

> **Tree Recursion** · 2 quests completed · ⭐ 55 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 9 **consolidates tree DFS** — modify structure (invert) or paired compare (symmetric). Links to E-Rank Days 4–5.

| When you see... | Think... | Why |
|---|---|---|
| "invert" / "mirror" tree | Postorder swap | Swap left↔right after child calls |
| "symmetric" / mirror of self | `mirror(a,b)` helper | Cross-child pairing |
| "swap children" | Local modify at node | After subtrees processed |
| `a.left` vs `b.right` | Mirror wiring | Not parallel Same-Tree compare |
| null node base | Return null / true | Stops recursion |
| "binary tree" structural | Tree DFS | Not index/array recursion |

### 🧠 Quick Recognition Test

1. *"Invert binary tree"* → **Postorder swap** — recurse, then swap
2. *"Is tree symmetric?"* → **Mirror helper** — cross pairs
3. *"Same tree?" (Day 4)* → **Parallel pairs** — `a.left,b.left`
4. *"Max depth?" (Day 4)* → **Bottom-up** — `1+max(left,right)`

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Check if two trees are mirrors of each other."*

Which pattern? **Mirror helper** — same as Symmetric but `mirror(root1, root2)` on two roots. Cross wiring.

**Scenario 2:** *"Flip a binary tree upside down (parent becomes child)."*

Which pattern? **Postorder rewire** — local pointer surgery after children (like Flatten Tree Day 10).

**Scenario 3:** *"Diameter of binary tree — longest path between any two nodes."*

Which pattern? **Day 4 bottom-up** — combine left depth + right depth at each node. Not Day 9 modify.

> **Answer key:** Scenarios 1–2 use **paired or postorder tree recursion** from today. Scenario 3 is Day 4 aggregate.

---

## ⚠ Common Mistakes

1. **Symmetric: compare left with left** — Cross: `a.left` with `b.right`.

2. **Invert: swap only root's children** — Must visit every node.

3. **Forget null base** — `invert(null)` → null; `mirror(null,null)` → true.

4. **Symmetric: OR instead of AND** — Both cross pairs must hold.

5. **Confuse invert with symmetric** — Invert mutates; symmetric only checks.

---

## 🏋️ Mini Challenge

### [Same Tree #100](https://leetcode.com/problems/same-tree/)

**[→ Try Same Tree on LeetCode](https://leetcode.com/problems/same-tree/)**

Given two binary trees, check if they are the same.

```
Input:  p = [1,2,3], q = [1,2,3]
Output: true
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "same structure and values" | Paired recursion on two nodes |
| compare two trees | Helper `same(a,b)` — parallel not cross |
| Day 4 bottom-up boolean | `&&` on both child pairs |

**Before you code:** Contrast with Symmetric — here `same(a.left,b.left)` and `same(a.right,b.right)`.

> 💡 **Hint:** Day 4 pattern — mirror helper is the cross-wired cousin of Same Tree.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Invert Binary Tree #226](https://leetcode.com/problems/invert-binary-tree/) | Easy | Postorder modification |
| [Symmetric Tree #101](https://leetcode.com/problems/symmetric-tree/) | Easy | Mirror recursion |
| [Same Tree #100](https://leetcode.com/problems/same-tree/) | Easy | Paired parallel compare |

---

*Day 9 complete! Tomorrow: helper functions with bounds and postorder rewiring. →*
