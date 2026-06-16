<!-- hand-authored -->
# ✅ Day 23 Checkpoint

> **Top-Down DP** · 2 quests completed · ⭐ 105 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Key mechanic |
|---|---|---|
| "maximum" + take/skip along array | `rob(i)` linear memo | `max(a+b, c)` at each index |
| "how many ways" + process string left-to-right | `decode(i)` count memo | Sum branches; memo on `i` |
| Leading `'0'` in decode / digit string | Early return 0 | Before any recursive branch |
| Two-digit decode 10–26 | Optional second branch | Rejects `01`–`09` |
| Same suffix from different paths | Index memo (Day 21 bridge) | Cache at `memo[i]` |
| Word Break bool (Day 21) | Same skeleton | Different return: max or count |

### 🧠 Quick Recognition Test

1. *"Max money robbing non-adjacent houses"* → **`rob(i) = max(nums[i]+rob(i+2), rob(i+1))`**. Memo on `i`.

2. *"Count string decodings A=1..Z=26"* → **`decode(i)`**. Guard `'0'`. Base `i==n→1`. Sum 1-digit + 2-digit.

3. *"Can string be segmented by dictionary?"* → **Day 21 bool memo.** Not today's combine — but same index key.

4. *"Climbing stairs — how many ways?"* → **Fibonacci-style count memo.** Like decode without the `'0'` guard.

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Delete and Earn — pick numbers, can't pick adjacent values in the sorted unique array."*

Which pattern? **`rob(i)` on compressed value buckets.** Same take/skip recurrence after grouping equal values.

**Scenario 2:** *"Count ways to tile a 2×n board with 1×2 dominoes."*

Which pattern? **Count memo on width index.** `ways(i) = ways(i-1) + ways(i-2)` — Fibonacci, not decode branches.

**Scenario 3:** *"Minimum cost to climb stairs — pay nums[i] to step from i."*

Which pattern? **Min memo, not max.** `min(nums[i]+climb(i+1), nums[i]+climb(i+2))` — same index skeleton, different combine.

> **Answer key:** Scenarios 1 and 3 → linear index memo (max/min). Scenario 2 → count memo with Fibonacci recurrence.

---

## ⚠ Common Mistakes

1. **House Robber greedy** — Local max fails; need full suffix `rob(i)`.
2. **Decode base `i==n` returns 0** — Empty suffix = 1 valid completion.
3. **Missing `'0'` guard** — Lets invalid paths contribute to count.
4. **Two-digit check only `<= 26`** — Must also require `>= 10`.
5. **No memo lookup at start of dfs** — Overlap recomputation → TLE.

---

## 🏋️ Mini Challenge

Write from memory:

```
rob(i):   base, two branches, max combine, memo
decode(i): base, '0' guard, 1-digit + 2-digit, sum combine, memo
```

Trace `decode(0)` on `"12"` — should get 2 paths. Trace `rob(0)` on `[1,2,3,1]` — should get 4.

> 💡 **Self-check:** Does your decode function return 0 for `"0"` and `"06"` before recursing?

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [House Robber #198](https://leetcode.com/problems/house-robber/) | Medium | Linear memo — max |
| [Decode Ways #91](https://leetcode.com/problems/decode-ways/) | Medium | Linear memo — count + `'0'` guard |
| [House Robber II #213](https://leetcode.com/problems/house-robber-ii/) | Medium | Two linear runs (circle) |

---

## 🔭 A-Rank Preview

Day 24 looks like DFS on a grid again — but the problems hide **backtracking** inside optimization and counting. Path Max Gold collects loot then unmarks; Unique Paths III counts Hamiltonian-style walks. Same mark/unmark rhythm as Day 16, new success conditions.

---

*Day 23 complete. Tomorrow: backtracking in disguise on the grid. →*
