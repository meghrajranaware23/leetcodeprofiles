<!-- hand-authored -->
# ✅ Day 21 Checkpoint

> **String Transformation DP** · 2 quests completed · ⭐ 120 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 21 = **2D prefix grid** on two strings. Bridge **C13 LCS** — same table, different recurrence.

| When you see... | Think... | Why |
|---|---|---|
| "edit distance" insert/delete/replace | `1+min(up,left,diag)` | #72 |
| "min ASCII delete sum" | delete-only, weighted | #712 |
| "longest common subsequence" | **C13** max(up,left) | Not min |
| "stock hold/sold/rest" | **Day 20** | Not string grid |
| "knapsack capacity" | **Days 17–19** | Not prefix grid |

### 🧠 Quick Recognition Test

1. *"Min ops word1→word2, all ops cost 1"* → Edit distance, base row/col = indices.
2. *"Min ASCII deleting to equalize strings"* → Match diag; else min delete s1 or s2 with ASCII.
3. *"Max length common subsequence"* → **C13** — match +1, else max.
4. *"Cooldown after sell"* → **Day 20** state machine.

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Minimum deletions (count, not ASCII) to make strings equal."*

What's the state? **Same grid;** answer relates to LCS: `m + n - 2·LCS`. Or run delete-only with cost 1.

**Scenario 2:** *"One insert/delete/replace costs 1 — transform A to B."*

What's the state? **`dp[i][j]` min ops** — #72 template.

**Scenario 3:** *"Two strings — maximize matching chars without edits."*

What's the state? **C13 `dp[i][j]`** — max not min.

> **Answer key:** Two strings + **min cost** → edit family. Two strings + **max keep** → LCS.

---

## ⚠ Common Mistakes

1. **LCS max on edit problem** — Mismatch needs **min** of three.
2. **Replace in #712** — Delete-only — two branches.
3. **Wrong base row** — #712 uses **ASCII prefix sums**, not just indices.
4. **Stock diagram on string day** — 2D grid only.
5. **Index off-by-one** — `dp[i]` uses `s[i-1]`.

---

## 🏋️ Mini Challenge

For `s1="cat"`, `s2="cut"`: fill edit-distance grid to 3×3 by hand. Then fill delete-ASCII grid (only delete branches).

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Edit Distance #72](https://leetcode.com/problems/edit-distance/) | Medium | Classic String Transformation DP |
| [Minimum ASCII Delete Sum for Two Strings #712](https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/) | Medium | Cost-Weighted LCS Variant |

---

*Day 21 complete! Tomorrow: counting structures — Catalan and order. →*
