<!-- hand-authored -->
# ✅ Day 11 Checkpoint

> **The Backtracking Template** · 2 quests completed · ⭐ 75 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Key mechanic |
|---|---|---|
| "all subsets" / "power set" | Start-index backtracking | Record path at every node; push/pop |
| "duplicates" in subset/combo problems | Sort + skip same at level | `j > start && nums[j]==nums[j-1]` |
| "generate all" + forward-only picks | push → dfs → pop | Never reuse earlier indices |
| linear "factorial" / "reverse" | **Not** backtracking | Return-value recursion — no shared path |

### 🧠 Quick Recognition Test

1. *"Return all subsets of a unique array"* → **Start-index subset backtracking.** Record every node. Loop from `start`, recurse `j+1`, pop.

2. *"Return all subsets — array may have duplicates"* → **Same + sort + skip.** One guard in the loop.

3. *"Compute n factorial recursively"* → **Linear recursion.** No path, no pop. (Day 1–10 territory.)

4. *"Return all permutations"* → **Not today's pattern** — tomorrow (Day 12): `used[]` tree, pick any unused element.

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Given nums, find all subsets whose sum equals target."*

Which pattern? **Subset backtracking + pruning.** Same push/pop loop; skip branches when running sum exceeds target. Record at leaves only (when sum == target).

**Scenario 2:** *"Given nums with duplicates, list all unique subsets."*

Which pattern? **Subsets II template exactly.** Sort, skip duplicate siblings.

**Scenario 3:** *"Given a string, generate all permutations of its characters."*

Which pattern? **Day 12 preview — permutation backtracking.** Pick unused chars with `used[]`; don't use start index.

> **Answer key:** Scenarios 1–2 → Day 11 family. Scenario 3 → Day 12 (order matters → no start index).

---

## ⚠ Common Mistakes

1. **Using return-value recursion** — Backtracking mutates `path`; combine happens by recording, not returning.
2. **Forgetting `path.pop()`** — Sibling branches inherit stale choices.
3. **Recording only at leaves (subsets)** — Empty subset `[]` lives at the root recording.
4. **`j > 0` instead of `j > start` for dedup** — Prunes valid deeper picks.
5. **Skipping sort before dedup** — Adjacent duplicate check fails.

---

## 🏋️ Mini Challenge

Re-solve Subsets (#78) from memory in under 5 minutes. Say aloud at each line: *choose, explore, unchoose*.

Then modify mentally: *what one line do you add for duplicates?*

> 💡 **Answer:** `sort(nums)` + `if (j > i && nums[j] == nums[j-1]) continue;`

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Subsets #78](https://leetcode.com/problems/subsets/) | Medium | push/pop, start index |
| [Subsets II #90](https://leetcode.com/problems/subsets-ii/) | Medium | sort + skip dedup |

---

*Day 11 complete. Tomorrow: order matters — permutations and the `used[]` tree. →*
