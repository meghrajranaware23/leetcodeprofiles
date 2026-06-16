<!-- hand-authored -->
# ✅ Day 4 Checkpoint

> **Bottom-Up Returns** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Before you move on, practice **hearing the signal** in each phrase below:

| When you see... | Think... | Why |
|---|---|---|
| "maximum / minimum depth" | `1 + max/min(left, right)` | Child depths aggregate upward |
| "same tree" / "identical structure" | Parallel recursion + `&&` | Both subtrees must agree |
| "count nodes / leaves" | `1 + left + right` | Sum bubbles up |
| "balanced?" / "height" | Bottom-up height + compare | Parent decides from child reports |
| "return int/bool from subtree" | Bottom-up (Day 4) | Answer built **after** child calls |

### 🧠 Quick Recognition Test

Read each mini-problem. Which pattern fires first?

1. *"Maximum depth of a binary tree"* → **Bottom-up** — `1 + max(children)`
2. *"Check if two trees are identical"* → **Parallel bottom-up** — `&&` on aligned pairs
3. *"Does any root-to-leaf path sum to target?"* → **Not Day 4** — pass **remaining sum down** (Day 5)
4. *"Sum all nodes in BST range [L, R]"* → **Not pure bottom-up** — prune with **bounds down** (Day 5)

---

## 🎯 Transfer to Unseen Problems

You've studied depth and same-tree. Can you recognize bottom-up returns on unseen problems?

**Scenario 1:** *"Return the number of leaf nodes in a binary tree."*

Which pattern? **Bottom-up sum.** Base: null → 0. Leaf → 1. Internal → `left + right`.

**Scenario 2:** *"Determine if a binary tree is height-balanced (heights of subtrees differ by at most 1)."*

Which pattern? **Bottom-up height with sentinel.** Return -1 if unbalanced; else `1 + max(leftH, rightH)`.

**Scenario 3:** *"Find if a tree has a root-to-leaf path with sum equal to target."*

Which pattern? **Day 5 — top-down.** Pass `target - node.val` to children; check at leaves. Returns alone don't know the path prefix.

> **Answer key:** Scenarios 1–2 = bottom-up (returns up). Scenario 3 = state down — preview of tomorrow.

---

## ⚠ Common Mistakes

1. **`null → 0` forgotten for depth** — Empty subtree has depth 0; current node adds the level.

2. **Using sum instead of max for depth** — Depth follows one branch, not both added together.

3. **Same tree: comparing cross subtrees** — `(p.left, q.right)` checks symmetry, not equality.

4. **Mixing Day 4 and Day 5** — If the problem needs a **running remainder** or **search bounds**, pass parameters down; don't force bottom-up.

5. **Global flag instead of return** — Works for same-tree, but returning bool teaches cleaner composition.

---

## 🏋️ Mini Challenge

### [Same Tree #100](https://leetcode.com/problems/same-tree/) — parallel trace

Trace on paper (no code):

```
p:    1           q:    1
     /                   \
    2                     2
```

List each `(p node, q node)` pair visited. Where does the answer become false?

**Before you code:** Say *"both null true, one null false, vals match then parallel &&"* out loud.

> 💡 **Hint:** Root values match, but `isSame(2, null)` on the left-right pair fails.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Maximum Depth of Binary Tree #104](https://leetcode.com/problems/maximum-depth-of-binary-tree/) | Easy | Bottom-up depth bubble |
| [Same Tree #100](https://leetcode.com/problems/same-tree/) | Easy | Parallel `&&` |
| [Minimum Depth of Binary Tree #111](https://leetcode.com/problems/minimum-depth-of-binary-tree/) | Easy | Bottom-up with `min` |
| [Balanced Binary Tree #110](https://leetcode.com/problems/balanced-binary-tree/) | Easy | Bottom-up height check |

---

*Day 4 complete! Tomorrow: **state travels down** the tree — returns up vs parameters down. →*
