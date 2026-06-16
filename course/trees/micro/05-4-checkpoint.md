<!-- hand-authored -->
# ✅ Day 5 Checkpoint

> **Tree Comparison** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 5 is **⇄ side-by-side recursion** — parallel vs mirror pairing. Practice hearing the signal:

| When you see... | Think... | Why |
|---|---|---|
| "same tree" / "identical" | Parallel `(p.left,q.left)`, `(p.right,q.right)` | Corresponding nodes |
| "symmetric" / "mirror of itself" | Mirror `(a.left,b.right)`, `(a.right,b.left)` | Cross pairing |
| "two roots" / two trees | Two-parameter DFS | Side-by-side compass |
| "subtree of another tree" | Search + parallel same() | #572 test pattern |
| "both null" | true | Empty matches empty |
| "one null" | false | Shape mismatch |
| "corresponding" | Parallel | Not cross |
| "reflection across center" | Mirror | Left vs right subtree |

### 🧠 Quick Recognition Test

Read each mini-problem. Which Day 5 pattern fires first?

1. *"Check if trees p and q are identical"* → **Parallel** — L-L, R-R
2. *"Check if tree is symmetric"* → **Mirror** — L-R, R-L
3. *"same(p.left, q.left) && same(p.right, q.right)"* → **Same Tree #100**
4. *"mirror(a.left, b.right) && mirror(a.right, b.left)"* → **Symmetric #101**

---

## 🎯 Transfer to Unseen Problems

You've mastered Same Tree and Symmetric Tree. Can you wire pairing correctly on variants?

**Scenario 1:** *"Is subRoot a subtree of root?"*

Which pattern? **DFS search on root** + call **parallel same()** when roots align. OR at each node.

**Scenario 2:** *"Merge two binary trees by adding values at corresponding nodes."*

Which pattern? **Parallel walk** — `(p.left,q.left)`, `(p.right,q.right)` — but build new nodes instead of `&&`.

**Scenario 3:** *"Check if tree B is mirror of tree A (two separate trees)."*

Which pattern? **Mirror pairing on two roots** — same as symmetric helper, both trees external.

> **Answer key:** Name **which child pairs with which** before coding. Parallel vs mirror is one line difference.

---

## ⚠ Common Mistakes

1. **Mirror pairing in Same Tree** — Left must match left, not right.

2. **Parallel pairing in Symmetric** — Must cross: left vs opposite right.

3. **Compare root to itself for symmetric** — Start with `mirror(root.left, root.right)`.

4. **Ignore null structure** — `[1,2]` vs `[1,null,2]` must be false.

5. **Serialize instead of recurse** — Misses interview-expected two-pointer template.

---

## 🏋️ Mini Challenge

### [Subtree of Another Tree #572](https://leetcode.com/problems/subtree-of-another-tree/)

**[→ Try Subtree on LeetCode](https://leetcode.com/problems/subtree-of-another-tree/)**

Check if `subRoot` is a subtree of `root` (same structure and values).

```
Input:  root = [3,4,5,1,2],  subRoot = [4,1,2]
Output: true
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "subtree of another tree" | Search main + parallel same() |
| "same structure and values" | Reuse Same Tree #100 logic |
| Two trees | Side-by-side at candidate roots |

**Before you code:** When do you call `same(root, subRoot)` vs recurse into `root.left`?

> 💡 **Hint:** At every node: `same(root, sub) || dfs(root.left, sub) || dfs(root.right, sub)`.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Same Tree #100](https://leetcode.com/problems/same-tree/) | Easy | Parallel pairing |
| [Symmetric Tree #101](https://leetcode.com/problems/symmetric-tree/) | Easy | Mirror pairing |

---

*Day 5 complete! E-Rank tests next — prove the full compass. →*
