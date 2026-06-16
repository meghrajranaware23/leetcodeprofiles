<!-- hand-authored -->
# ✅ Day 25 Checkpoint

> **Multi-Dimensional State DP** · 2 quests completed · ⭐ 115 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 25 = **extra state dimensions** beyond simple `(i,j)` — but NOT knapsack.

| When you see... | Think... | Why |
|---|---|---|
| "word chain" / "predecessor by one letter" | Sort by length + map | #1048 |
| "delete one char" backward | pred lookup in hash map | LIS on strings |
| "out of boundary" / "maxMove" | `(row,col)` + step loop | #576 |
| "paths leaving grid" | ans += exits, not dp[end] | Opposite of #62 |
| "knapsack" / "capacity W" | **Day 17** | Wrong pattern |

### 🧠 Quick Recognition Test

1. *"Longest chain where each word adds one letter?"* → **Sort by length**, `dp[w]`, pred = delete one char.
2. *"Paths leaving m×n grid in exactly N moves?"* → **dp grid + move loop**, out-of-bounds → ans.
3. *"LIS on an array?"* → **Day 12** — numeric, no string deletion.
4. *"0/1 knapsack with weight limit?"* → **Day 17** — take/skip, not Day 25.

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Longest chain of strings where each is subsequence of next by one insertion."*

Which pattern? Same as #1048 — sort by length, backward deletion lookup.

**Scenario 2:** *"Probability knight stays on board after k moves."*

Which pattern? Same `(row,col,steps)` rolling — but accumulate **inside** not exits (#688).

**Scenario 3:** *"Max value with weight capacity W."*

Which day? **Day 17 knapsack** — NOT Day 25 multi-dimensional state.

> **Answer key:** String chain = sort+LIS map. Boundary = grid+steps. Knapsack = Day 17.

---

## ⚠ Common Mistakes

1. **Knapsack for string chain** — No weights; predecessor string lookup.
2. **Skip length sort** — Predecessors won't be in map yet.
3. **Return dp inside grid for #576** — Answer is exit count `ans`.
4. **Forget mod on boundary paths** — ans grows huge.
5. **Confuse with unique paths #62** — That stays inside to corner; #576 counts exits.

---

## 🏋️ Mini Challenge

**words = ["a","b","ab","abc"]** — longest chain length?

> 💡 **Hint:** a→ab→abc (3) or b→ab→abc (3). Answer: 3.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Longest String Chain #1048](https://leetcode.com/problems/longest-string-chain/) | Medium | Sort + Subsequence DP |
| [Out of Boundary Paths #576](https://leetcode.com/problems/out-of-boundary-paths/) | Medium | 3D State Grid DP |

---

*Day 25 complete! Tomorrow: pattern synthesis. →*
