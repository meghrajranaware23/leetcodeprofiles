<!-- hand-authored -->
# ✅ Day 16 Checkpoint

> **Sequence DP Variants** · 2 quests completed · ⭐ 80 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 16 = **sequence variants** — direction states or sort + chain. Bridges Day 12 LIS.

| When you see... | Think... | Why |
|---|---|---|
| "wiggle" / "alternating up down" | `up` / `down` scalars | #376 |
| "pair chain" / `[a,b]` intervals | Sort by end, `start > end` | #646 |
| "longest increasing subsequence" | **Day 12** plain LIS | Single direction |
| "uncrossed lines" | **Day 13** LCS | Two arrays |
| "palindromic subsequence" | **Day 15** LPS | Interval palindrome |

### 🧠 Quick Recognition Test

1. *"Longest wiggle subsequence"* → **up=down+1 on rise, down=up+1 on fall** (#376)
2. *"Max chain of pairs with start > prev end"* → **Sort by end, greedy** (#646)
3. *"LIS in one array"* → **Day 12** — `dp[i]` or tails
4. *"Non-overlapping intervals max count"* → **Same as pair chain** — sort by end

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Minimum number of intervals to remove to make rest non-overlapping."*

Which pattern? **Sort by end, greedy** — same as #646; answer = `n - max_chain`.

**Scenario 2:** *"Longest alternating subsequence with strict increase then decrease..."*

Which pattern? **Wiggle** — directional states on one array.

**Scenario 3:** *"Longest increasing subsequence of pairs (a,b) with a increasing and b increasing."*

Which pattern? **Sort + LIS** — Day 12 on one coordinate after sort, or 2D LIS variant.

> **Answer key:** Wiggle = direction memory. Intervals = sort by end + chain. Plain monotone = Day 12.

---

## ⚠ Common Mistakes

1. **up = up+1 on rise** — Must be `up = down + 1`.
2. **Sort pairs by start** — Chain greedy needs **end** sort.
3. **start >= end for chain** — Problem uses **strict** `start > prev_end`.
4. **Plain LIS on wiggle** — Alternation breaks single-direction DP.
5. **O(n²) pair DP when greedy works** — Sort + scan suffices for #646.

---

## 🏋️ Mini Challenge

**[Non-overlapping Intervals #435](https://leetcode.com/problems/non-overlapping-intervals/)** — how does max chain from #646 relate to min removals?

> 💡 **Hint:** `removals = n - max_chain` after sort-by-end greedy.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Wiggle Subsequence #376](https://leetcode.com/problems/wiggle-subsequence/) | Medium | Directional Subsequence DP |
| [Maximum Length of Pair Chain #646](https://leetcode.com/problems/maximum-length-of-pair-chain/) | Medium | Interval Selection DP |

---

*Day 16 complete! C-Rank test ahead — synthesize grid, LIS, LCS, and prefix patterns. →*
