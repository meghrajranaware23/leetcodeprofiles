<!-- hand-authored -->
# ✅ Day 6 Checkpoint

> **Top-Down DFS** · 2 quests completed · ⭐ 50 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 6 is **state down the tree** — root-to-leaf threads, not subtree aggregation.

| When you see... | Think... | Why |
|---|---|---|
| "root-to-leaf path" | Top-down DFS | Prefix only known on descent |
| "all paths" / "return list of paths" | Top-down + backtrack | push → recurse → pop |
| "path sum equals target" | Remainder downward | `rem -= val` at each step |
| "digits form a number" | `cur * 10 + val` | Accumulate top-down |
| "diameter" / "max path anywhere" | **Day 7** — not today | Paths bend — need bottom-up global |

### 🧠 Quick Recognition Test

1. *"Find all root-to-leaf paths summing to target"* → **Top-down + backtrack** (Path Sum II)
2. *"Sum all root-to-leaf numbers formed by digits"* → **Top-down accumulation** (×10 + val)
3. *"Maximum depth of binary tree"* → **Day 4 bottom-up** — not Day 6
4. *"Does any root-to-leaf path equal target?"* → **Top-down remainder** (Day 5) — no backtrack unless collecting

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Given a binary tree, return all root-to-leaf paths as strings like '1->2->3'."*

Which pattern? **Top-down accumulation + leaf record.** Build string or pass prefix down; save at leaves. D-Rank test #257.

**Scenario 2:** *"Count root-to-leaf paths where sum equals k."*

Which pattern? **Top-down remainder.** Same as Path Sum but count instead of collect — no backtrack if passing count up, or top-down with counter.

**Scenario 3:** *"Find the longest path between any two nodes (diameter)."*

Which pattern? **Day 7 bottom-up global** — NOT Day 6. Path doesn't have to start at root.

> **Answer key:** Scenarios 1–2 = state down. Scenario 3 = returns up + global — the Day 6 vs Day 7 split.

---

## ⚠ Common Mistakes

1. **Forgetting `path.pop()` after recursion** — Sibling branches inherit wrong prefix.
2. **Saving path reference without copy** — Use `path[:]` or `new ArrayList<>(path)`.
3. **Checking target at internal nodes** — Leaf-only for exact root-to-leaf sum.
4. **Using bottom-up `max(left, right)` for path problems** — Wrong direction for root-to-leaf.
5. **Confusing accumulation with backtrack** — Only need pop when sharing a mutable path list.

---

## 🏋️ Mini Challenge

### [Path Sum III #437](https://leetcode.com/problems/path-sum-iii/)

**[→ Try Path Sum III on LeetCode](https://leetcode.com/problems/path-sum-iii/)**

Count paths with sum k — paths may start **anywhere** (not just root). Harder than Day 6 — needs prefix map, not pure top-down from root only.

**Before you code:** Say why pure Day 6 top-down from root isn't enough. (Hint: path can start at internal nodes.)

> 💡 **Hint:** Day 6 template + prefix-sum map — stretch goal for after D-Rank test.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Path Sum II #113](https://leetcode.com/problems/path-sum-ii/) | Medium | Top-Down with Backtracking |
| [Sum Root to Leaf Numbers #129](https://leetcode.com/problems/sum-root-to-leaf-numbers/) | Medium | Top-Down Accumulation |

---

*Day 6 complete! Tomorrow: returns bubble up — and globals capture bent paths. →*
