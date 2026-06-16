<!-- hand-authored -->
# ✅ Day 5 Checkpoint

> **Top-Down State** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Before you move on, practice **hearing the signal** in each phrase below:

| When you see... | Think... | Why |
|---|---|---|
| "root-to-leaf path" + target | Top-down remainder | Budget consumed per edge |
| "has path sum" / "exists" | Pass `target - val`; `||` | One winning path enough |
| "range [low, high]" on BST | Bounded DFS + prune | Order skips whole subtrees |
| "remaining" / "budget" / "prefix" | Parameter going **down** | Not Day 4's child reports |
| "validate BST" | Top-down `(min, max)` window | Each node tightens bounds for kids |

### 🧠 Quick Recognition Test

Read each mini-problem. Which pattern fires first?

1. *"Does any root-to-leaf path equal target sum?"* → **Top-down remainder** — check at leaf only
2. *"Sum BST nodes in [low, high]"* → **Bounded prune** — skip left if `val <= low`
3. *"Maximum depth of binary tree"* → **Day 4 bottom-up** — `1 + max(children)`, no downward state
4. *"Count all nodes in tree"* → **Day 4 bottom-up** — `1 + left + right`

---

## 🎯 Transfer to Unseen Problems

You've studied path sum and range sum. Can you tell top-down from bottom-up on unseen problems?

**Scenario 1:** *"Return all root-to-leaf paths where sum equals target."*

Which pattern? **Top-down remainder + backtracking.** Same as Path Sum, but collect path at leaves; backtrack after each child call.

**Scenario 2:** *"Determine if a binary tree is a valid BST."*

Which pattern? **Top-down valid range.** Pass `(minAllowed, maxAllowed)`; at each node tighten to `(min, node.val)` and `(node.val, max)` for children.

**Scenario 3:** *"Find the diameter of a binary tree (longest path between any two nodes)."*

Which pattern? **Mostly bottom-up (Day 4).** Each node combines left/right **heights** returned from children; diameter is max of `leftH + rightH` across nodes.

> **Answer key:** Scenarios 1–2 = state down (Day 5). Scenario 3 = aggregate up (Day 4).

---

## ⚠ Common Mistakes

1. **Path sum: success at internal nodes** — Only leaves confirm equality with remaining target.

2. **Path sum: bottom-up subtree totals** — Subtree sum from below ≠ a single root-to-leaf path.

3. **BST prune: wrong skip direction** — Too small → skip **left**; too large → skip **right**.

4. **Using `&&` instead of `||` for path existence** — Any one valid path suffices.

5. **Day 4 vs Day 5 confusion** — Depth/same-tree/count → returns up. Path/range/validate → state down.

---

## 🏋️ Mini Challenge

### [Range Sum of BST #938](https://leetcode.com/problems/range-sum-of-bst/) — prune trace

Trace which nodes you **visit** vs **skip** for:

```
        20
       /  \
     10    30
    /  \
   5   15

low = 10, high = 20
```

Mark an ✂️ on pruned subtrees. What sum do you get?

**Before you code:** Say *"in range add; val > low go left; val < high go right"* out loud.

> 💡 **Hint:** Node 5's entire left/right may still be visited from 10, but from 5 you skip left (5 < 10). Node 30: skip right subtree entirely if only left child exists — here 30 not in range unless 10≤30≤20 fails — 30 > 20, skip right of 20's children appropriately.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Path Sum #112](https://leetcode.com/problems/path-sum/) | Easy | Top-down remainder |
| [Range Sum of BST #938](https://leetcode.com/problems/range-sum-of-bst/) | Easy | BST bounded prune |
| [Path Sum II #113](https://leetcode.com/problems/path-sum-ii/) | Medium | Remainder + path backtrack |
| [Validate Binary Search Tree #98](https://leetcode.com/problems/validate-binary-search-tree/) | Medium | Top-down (min, max) window |

---

## 🔁 Day 4 ↔ Day 5 Cheat Sheet

| | **Day 4 — Bottom-Up** | **Day 5 — Top-Down** |
|---|---|---|
| **Data flow** | Returns bubble **up** | Parameters flow **down** |
| **Typical question** | "How big / same / count?" | "Any path / in range / valid?" |
| **Combine** | `max`, `+`, `&&` of child returns | `||`, prune, then `+` sums |
| **Hero problems** | Max depth, Same tree | Path sum, Range sum BST |

---

*Day 5 complete! You can now choose: aggregate from children, or carry state downward. →*
