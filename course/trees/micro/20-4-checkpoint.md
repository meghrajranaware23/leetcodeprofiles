<!-- hand-authored -->
# ✅ Day 20 Checkpoint

> **Tree DP** · 2 quests completed · ⭐ 130 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 20 is **postorder state pairs** and **direction tracking**.

| When you see... | Think... | Why |
|---|---|---|
| "rob tree" / no adjacent robbed | `(rob, skip)` postorder | #337 |
| "cannot rob parent and child" | Rob uses child skip branches | Tree adjacency |
| "zigzag" / alternate direction | `(l, r)` state down | #1372 |
| "house robber" linear array | **Recursion #198** | Not tree — rolling vars |
| "max path sum any route" | **Day 7** global | No alternation |

### 🧠 Quick Recognition Test

1. *"Max loot on tree, no parent-child both robbed"* → **Rob/skip pairs**
2. *"Longest alternating left-right path"* → **Direction state**
3. *"House robber on street (array)"* → **#198** — index DP
4. *"Camera coverage min count"* → **B-Rank test** — 3-state postorder

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Paint tree nodes — parent/child cannot same color, maximize value."*

Which pattern? **Multi-state postorder** — similar to rob/skip with color dimension.

**Scenario 2:** *"Longest path with at most one direction change."*

Which pattern? **Extended direction state** — more than binary zigzag.

**Scenario 3:** *"Rob only leaf nodes on tree."*

Which pattern? **Different constraint** — not standard #337 pairs.

> **Answer key:** Scenario 1 closest to Day 20 postorder; 2 extends direction DP.

---

## ⚠ Common Mistakes

1. **Rob/skip: robbing child when parent robbed** — Use child's **skip** only.
2. **Returning single int from dfs on #337** — Need pair.
3. **Zigzag: not resetting opposite direction** — `(r+1, 0)` on left go.
4. **Confusing edges vs nodes count** — #1372 counts edges.
5. **Applying #198 formula directly on tree** — Need postorder pairs.

---

## 🏋️ Mini Challenge

On a 5-node tree, compute `(rob, skip)` at every node by hand. Then trace longest zigzag on the same tree with `(l,r)` updates.

**Before coding:** State the #198 vs #337 difference in one sentence.

> 💡 **Hint:** #198 = linear index; #337 = tree postorder pairs.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [House Robber III #337](https://leetcode.com/problems/house-robber-iii/) | Medium | Tree DP Rob/Skip |
| [Longest ZigZag Path in a Binary Tree #1372](https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/) | Medium | Direction State DP |

---

*Day 20 complete! Tomorrow: subtree aggregation patterns. →*
