<!-- hand-authored -->
# ✅ Day 7 Checkpoint

> **Bottom-Up DFS** · 2 quests completed · ⭐ 55 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 7 is **returns up + global cross-subtree** — paths may bend at any node.

| When you see... | Think... | Why |
|---|---|---|
| "diameter" / "longest path between nodes" | Return height, global `l+r` | Cross-subtree through current node |
| "maximum path sum" (any path) | Return one-branch gain, global `val+l+r` | Parent uses one side only |
| "may start/end at any node" | Bottom-up global | Not root-to-leaf (Day 6) |
| "root-to-leaf path sum" | **Day 6** — not today | Prefix flows down |
| negative node values + max path | `max(0, dfs(child))` | Skip losing branches |

### 🧠 Quick Recognition Test

1. *"Diameter of binary tree"* → **Bottom-up global** — return height, `ans = max(ans, l+r)`
2. *"Max path sum anywhere in tree"* → **Bottom-up path opt** — global both branches, return one
3. *"All paths summing to target root-to-leaf"* → **Day 6 top-down** — not Day 7
4. *"Maximum depth"* → **Pure bottom-up return** — no global needed

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Find the longest univalue path (same value edges)."*

Which pattern? **Dual-role dfs + global.** Return longest same-value chain upward; global tracks best through node.

**Scenario 2:** *"Binary tree cameras — minimum cameras to cover all nodes."*

Which pattern? **Advanced bottom-up** (later rank) — returns encode coverage state; same upward flow idea.

**Scenario 3:** *"Check if path sum equals target from root to leaf."*

Which pattern? **Day 6 top-down remainder** — NOT Day 7. No global, no cross-subtree combine.

> **Answer key:** Scenarios 1–2 = bottom-up with global or state returns. Scenario 3 = Day 6 contrast.

---

## ⚠ Common Mistakes

1. **Returning `l + r` to parent** — Parent extends one branch: `val + max(l,r)`.
2. **Skipping global update** — Cross-subtree winner never reaches `ans`.
3. **Using top-down for bent paths** — 15→20→7 can't be seen from root-only descent.
4. **Forgetting `max(0, child)` on negative trees** — Losing subtree should be skippable.
5. **Confusing diameter edges vs height** — Diameter = `l+r`; height return = `1+max(l,r)`.

---

## 🏋️ Mini Challenge

### [Longest Univalue Path #687](https://leetcode.com/problems/longest-univalue-path/)

**[→ Try Longest Univalue Path on LeetCode](https://leetcode.com/problems/longest-univalue-path/)**

Find longest path where all nodes have the same value — same dual-role skeleton as diameter.

**Before you code:** Say return vs global aloud. Trace a 3-node same-value chain.

> 💡 **Hint:** Return = longest same-value arm upward. Global = left arm + right arm (if values match).

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Diameter of Binary Tree #543](https://leetcode.com/problems/diameter-of-binary-tree/) | Easy | Bottom-Up with Global Update |
| [Binary Tree Maximum Path Sum #124](https://leetcode.com/problems/binary-tree-maximum-path-sum/) | Hard | Bottom-Up Path Optimization |

---

*Day 7 complete! Tomorrow: build trees from two traversal arrays. →*
