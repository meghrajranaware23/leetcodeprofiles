<!-- hand-authored -->
# ✅ Day 27 Checkpoint

> **Interview Simulation** · 2 quests completed · ⭐ 120 XP earned

---

## ⏱ Timed Recognition — 30 Seconds Per Problem

Set a timer. Read each statement **once**. Say the memo type aloud before looking at the answer.

| # | Problem statement (one line) | Your answer (cover right column) |
|---|---|---|
| 1 | Count **ordered** sequences from nums summing to target, reuse allowed | **Ordered combo — 1D memo on target** |
| 2 | Can nums split into two subsets with **equal sum**? | **0/1 subset — 2D memo on (i, rem)** |
| 3 | How many **unordered** combos sum to target, reuse allowed | **Start-index backtracking (#39) — NOT #377** |
| 4 | Can you form target by picking each element **once**? | **0/1 subset — include OR skip** |
| 5 | Count ways to decode a digit string | **1D index memo (#91) — linear, not combo** |

**Pass:** 4/5 correct in under 2.5 minutes total.

---

## 🔍 Side-by-Side Memo Cheat Sheet

| Signal | Combination Sum IV #377 | Partition Equal Subset #416 |
|---|---|---|
| Order matters? | **Yes** | No |
| Reuse elements? | **Yes** | No (once each) |
| Return type | Count (sum) | Boolean (OR) |
| Memo key | `target` (1D) | `(index, rem)` (2D) |
| Recursive shape | `for x: dfs(t-x)` | `include OR skip` |
| Early exit | `t < 0 → 0` | `sum % 2 → false` |

### 🧠 Quick Contrast Test

1. *"nums=[1,2], target=3, order matters"* → **377: 2 ways** ([1,2] and [2,1])
2. *"nums=[1,2], can partition equally?"* → **416: false** (total=3, odd)
3. *"Same nums, target=3, order does NOT matter"* → **NOT #377** — use start-index combo or coin change variant

---

## 🎯 Transfer Under Time Pressure

**Scenario 1:** Interviewer says *"Given coins and amount, find minimum coins needed."*

Which pattern? **1D target DP** — but **min**, not count. Order doesn't matter. Not #377 (count ordered), not #416 (boolean).

**Scenario 2:** *"Assign +/- to each number to reach target 0."*

Which pattern? **0/1 subset variant (#494)** — same `(index, rem)` 2D memo shape as #416, different combine.

**Scenario 3:** *"Count permutations of nums that sum to target."*

Which pattern? **Ordered combo (#377)** — identical template to today's quest 1.

> **Interview key:** Read "order" and "reuse" first. They decide 1D vs 2D before you write code.

---

## ⚠ Common Interview Mistakes

1. **Start-index combo on #377** — Misses order. Loop all nums instead.
2. **1D target memo on #416** — Can't enforce single-use. Need index dimension.
3. **Sum vs OR** — Count problems sum children; boolean problems OR children.
4. **Skip odd-sum check on #416** — `total % 2 != 0` → false in O(1).
5. **Confuse #377 title with #39** — "Combination" in name ≠ same template.

---

## 🏋️ Timed Mini Challenge

**Round 1 (2 min):** Read Combination Sum IV statement. Write function signature + memo key only.

**Round 2 (2 min):** Read Partition Equal Subset Sum statement. Write function signature + memo key only.

**Round 3 (10 min):** Implement whichever problem you got wrong — no hints.

**Pass criteria:** Correct memo dimension on Round 1 & 2. Working code on Round 3.

---

## 📚 Practice Queue

| Problem | Difficulty | Memo Type |
|---|---|---|
| [Combination Sum IV #377](https://leetcode.com/problems/combination-sum-iv/) | Medium | 1D target (ordered) |
| [Partition Equal Subset Sum #416](https://leetcode.com/problems/partition-equal-subset-sum/) | Medium | 2D (i, rem) (0/1 subset) |

---

*Day 27 complete! Tomorrow: recursive synthesis continues. →*
