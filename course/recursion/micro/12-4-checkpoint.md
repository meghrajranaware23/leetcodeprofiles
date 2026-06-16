<!-- hand-authored -->
# ✅ Day 12 Checkpoint

> **Permutations** · 2 quests completed · ⭐ 80 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | vs Day 11 |
|---|---|---|
| "all permutations" / "all arrangements" | `used[]` + push/pop | Day 11: start index |
| "order matters" | Pick any unused element | Day 11: forward-only |
| "unique permutations" + duplicates | Sort + `!used[i-1]` skip | Day 11: `j > start` skip |
| "all subsets" / "combinations" | Start index (Day 11/13) | Not used[] |

### 🧠 Quick Recognition Test

1. *"All permutations of [1,2,3]"* → **`used[]` tree.** Record at leaves. 3! = 6.

2. *"All subsets of [1,2,3]"* → **Start index (Day 11).** Record at every node. 2³ = 8.

3. *"Unique permutations of [1,1,2]"* → **Permutations II.** Sort + skip when `nums[i]==nums[i-1] && !used[i-1]`.

4. *"Combine 4 numbers from 1..n"* → **Day 13 preview.** Start index + fixed count k.

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Generate all anagrams of a string."*

Permutation of characters — `used[]` or swap-based. Same tree.

**Scenario 2:** *"Assign n people to n seats."*

Bijection = permutation. Track which people/seats are used.

**Scenario 3:** *"Pick k elements from n where order doesn't matter."*

Combination (Day 13) — start index, **not** used[].

> **Answer key:** Order matters → permutations. Order irrelevant → combinations/subsets.

---

## ⚠ Common Mistakes

1. **Start index on permutations** — Misses half the orderings.
2. **Only popping path, not unmarking used** — Element stuck as "used."
3. **Subsets dedup on permutations** — Wrong guard; need `!used[i-1]`.
4. **Recording partial paths** — Permutations are full-length only.

---

## 🏋️ Mini Challenge

Without looking: write the permutation dfs signature and the twin-undo lines from memory.

Then state the one-line dedup for Permutations II.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Permutations #46](https://leetcode.com/problems/permutations/) | Medium | used[] push/pop |
| [Permutations II #47](https://leetcode.com/problems/permutations-ii/) | Medium | sort + !used[i-1] |

---

*Day 12 complete. Tomorrow: combinations — start index returns, with a reuse twist. →*
