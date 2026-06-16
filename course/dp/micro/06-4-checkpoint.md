<!-- hand-authored -->
# ✅ Day 6 Checkpoint

> **Take or Skip** · 2 quests completed · ⭐ 55 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 6 is **1D take/skip** — `max(dp[i-1], dp[i-2] + val)`, filled left-to-right.

| When you see... | Think... | Why |
|---|---|---|
| "non-adjacent maximum sum" | Take/skip 1D | Two branches, jump 2 on take |
| "rob houses" (linear) | `prev2` / `prev1` rolling | House Robber template |
| "delete v, lose v±1" | **Compress to earn[v]** first | Delete and Earn disguise |
| "how many ways to decode" | **Day 7** — sum branches | Count, not max |
| "minimum path in grid" | **Day 8** — min on 2D | Cost, not take/skip |

### 🧠 Quick Recognition Test

1. *"Max sum, no two adjacent in array"* → **dp[i] = max(dp[i-1], dp[i-2]+nums[i])**
2. *"Delete all 3s and can't pick 2 or 4"* → **earn[3]+=3 each time, robber on earn[]**
3. *"Pick items with weight limit W"* → **Knapsack (later rank)** — not pure take/skip
4. *"Count ways to partition string"* → **Day 7 sum** — not Day 6 max

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Given scores on a row of booths, maximize points without visiting neighboring booths."*

Which pattern? **Take/skip 1D** — identical to House Robber.

**Scenario 2:** *"Pick integers; picking x removes all x and forbids x-1 and x+1; maximize sum of picked values."*

Which pattern? **Freq compress → take/skip** — Delete and Earn shape.

**Scenario 3:** *"Maximum product of a subarray."*

Which pattern? **Not Day 6** — Day 9 dual `(maxProd, minProd)` for sign flips.

> **Answer key:** Day 6 = **max** on a line with **i-2** on take. Always ask: is the objective max, min, or count?

---

## ⚠ Common Mistakes

1. **Take branch uses dp[i-1]** — Adjacency means `dp[i-2] + val`.
2. **Skipping freq compression** — Value-adjacency problems need `earn[]` bucketing.
3. **Confusing with counting DP** — Day 7 uses `+`; Day 6 uses `max`.
4. **Drawing full binary trees** — The 1D table replaces the tree; fill by hand once.
5. **Wrong answer index** — Rolling `prev1` at end, or `dp[n-1]` if tabulating in-place.

---

## 🏋️ Mini Challenge

### Related LeetCode Practice

Pick one problem from today's pattern family and solve it on LeetCode without looking at the walkthrough.

**Before you code:** Write the 1D recurrence. Mark skip vs take. Then code `prev2`/`prev1`.

> 💡 **Hint:** If values not indices matter, compress first.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [House Robber #198](https://leetcode.com/problems/house-robber/) | Medium | Take/Skip DP |
| [Delete and Earn #740](https://leetcode.com/problems/delete-and-earn/) | Medium | House Robber in Disguise |

---

*Day 6 complete! Tomorrow: counting — sum branches, not take/skip. →*
