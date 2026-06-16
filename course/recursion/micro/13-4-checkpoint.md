<!-- hand-authored -->
# ✅ Day 13 Checkpoint

> **Combinations** · 2 quests completed · ⭐ 80 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Index on include |
|---|---|---|
| "k numbers from 1..n" | Start index, record at size k | `i + 1` |
| "combination sum" + reuse | Include/exclude branches | **`i` (reuse)** |
| "each candidate once" | Day 15 — always `i+1` | `i + 1` |
| "all permutations" | Day 12 — used[] | N/A |

### 🧠 Quick Recognition Test

1. *"Combine 4 choose 2"* → **Combinations #77.** Start index, record at k.

2. *"Sum to 7, reuse candidates"* → **Combination Sum #39.** Include→`i`, exclude→`i+1`.

3. *"Sum to 7, each candidate once, may have dupes"* → **Day 15 #40.** Sort + skip + only `i+1`.

4. *"All permutations"* → **Day 12.** Not start index.

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Coin change: list all combos of coins summing to amount, unlimited coins."*

Combination Sum template — include stays at coin index.

**Scenario 2:** *"Pick 3 numbers from 1-9 that sum to 15."*

Combination Sum III (Day 15) — fixed k + target + start index.

**Scenario 3:** *"How many ways to make change (order matters)?"*

**Not** this pattern — that's DP / permutation count (#377).

---

## ⚠ Common Mistakes

1. **`i+1` on include when reuse allowed** — Breaks Combination Sum.
2. **used[] for combos** — Unnecessary; start index is cleaner.
3. **Recording partial paths in Combinations** — Only size k counts.
4. **Confusing combo sum with combo sum IV** — Order matters vs doesn't.

---

## 🏋️ Mini Challenge

State aloud the two recursive calls for Combination Sum at index `i`.

> **Answer:** `dfs(i, rem - c[i])` after push, then `dfs(i+1, rem)` for exclude.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Combinations #77](https://leetcode.com/problems/combinations/) | Medium | start index, size k |
| [Combination Sum #39](https://leetcode.com/problems/combination-sum/) | Medium | include→i, exclude→i+1 |

---

*Day 13 complete. Tomorrow: partition strings into valid segments. →*
