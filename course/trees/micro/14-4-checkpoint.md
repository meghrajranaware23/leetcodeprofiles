<!-- hand-authored -->
# ✅ Day 14 Checkpoint

> **Path Problems** · 2 quests completed · ⭐ 80 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 14 is **any-start downward paths** — prefix map vs bottom-up arms.

| When you see... | Think... | Why |
|---|---|---|
| "count paths with sum k" + any start | Prefix-sum hashmap + backtrack | O(n) not O(n²) |
| "path sum root-to-leaf only" | **Day 6** top-down remainder | Not prefix map |
| "longest same-value path" | Bottom-up (leftArm, rightArm) + global | Cross-subtree through node |
| "maximum path sum anywhere" | **Day 7** global val+l+r | Weighted, not same-value |
| "list all paths" | Backtrack path list | Count vs collect |

### 🧠 Quick Recognition Test

1. *"Count downward paths summing to 8, any start"* → **Prefix map** — `cnt[sum-target]`, backtrack
2. *"Longest path where all nodes equal"* → **Univalue arms** — global left+right
3. *"Does root-to-leaf path sum to target?"* → **Day 6** — remainder down, no map
4. *"Diameter of tree"* → **Day 7** — height return + global l+r

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Count paths with product equal to k (all positive values)."*

Which pattern? **Log-transform or different technique** — prefix product map possible if no zeros; not identical to sum.

**Scenario 2:** *"Longest path with alternating odd/even values."*

Which pattern? **Bottom-up state returns** — each node returns longest alternating arm; global merge similar to univalue.

**Scenario 3:** *"Subarray sum equals k on array."*

Which pattern? **Same prefix map** as Path Sum III — linear version without backtrack (no branching).

> **Answer key:** Scenario 3 is the array twin of #437. Scenario 1 needs care with zeros.

---

## ⚠ Common Mistakes

1. **Missing `cnt[0]=1`** — Paths starting at current node won't count.
2. **No prefix map backtrack** — Over-count across branches.
3. **Univalue: return sum of arms to parent** — Return tuple; parent picks one side.
4. **Confusing Path Sum III with Path Sum II** — III counts any downward; II lists root-to-leaf.
5. **int overflow on prefix sums** — Use long for negative-heavy trees.

---

## 🏋️ Mini Challenge

### [Binary Tree Maximum Path Sum #124](https://leetcode.com/problems/binary-tree-maximum-path-sum/)

**[→ Try on LeetCode](https://leetcode.com/problems/binary-tree-maximum-path-sum/)**

Day 7 global pattern — compare to univalue: same dual-role, different combine (max of weighted arms, clamp negatives).

**Before you code:** Say global vs return aloud. How does `max(0, child)` differ from univalue's equality check?

> 💡 **Hint:** Return best one-branch gain; global = `val + left + right` with clamp.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Path Sum III #437](https://leetcode.com/problems/path-sum-iii/) | Medium | Prefix Sum on Trees |
| [Longest Univalue Path #687](https://leetcode.com/problems/longest-univalue-path/) | Medium | Bottom-Up Path Length |

---

*Day 14 complete! Tomorrow: coordinate traversals — columns and boundaries. →*
