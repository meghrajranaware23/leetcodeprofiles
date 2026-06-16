<!-- hand-authored -->
# ✅ Day 15 Checkpoint

> **Combination Sum Variants** · 2 quests completed · ⭐ 85 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Include index | Dedup |
|---|---|---|
| Combination sum, unlimited reuse (#39) | Stay at `i` | None |
| Combination sum, single use (#40) | **`i + 1`** | Sort + while-skip |
| Exactly k digits sum to n (#216) | `i + 1` | Not needed (1-9 unique) |
| Subsets with duplicates (#90) | `j + 1` | `j > start` skip |

### 🧠 Quick Recognition Test

1. *"Sum to target, reuse allowed"* → **#39: include→i.**

2. *"Sum to target, each once, duplicates in array"* → **#40: include→i+1, sort, while-skip.**

3. *"3 numbers 1-9 sum to 15"* → **#216: dfs(k-1, n-i, i+1).**

4. *"All subsets with duplicates"* → **Day 11: j>start skip — different structure.**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Coin change combos, each coin once, infinite supply types but one coin each pick."*

Combination Sum II structure — single use per index, not unlimited.

**Scenario 2:** *"Pick 4 cards summing to 24 from 1-13 deck."*

Fixed k + target + start index — prune when sum exceeds 24.

---

## ⚠ Common Mistakes

1. **dfs(i,...) on include for #40** — Reintroduces reuse.
2. **Forgetting sort before while-skip** — Dedup fails.
3. **n==0 without k==0 in #216** — Wrong-length combos.
4. **Confusing #40 with #39** — Read "each once" carefully.

---

## 🏋️ Mini Challenge

From memory: write Combination Sum II's two dfs calls and the while-skip line.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Combination Sum II #40](https://leetcode.com/problems/combination-sum-ii/) | Medium | single use + dedup |
| [Combination Sum III #216](https://leetcode.com/problems/combination-sum-iii/) | Medium | k + sum |

---

*Day 15 complete. Tomorrow: backtracking meets grids. →*
