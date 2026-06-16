<!-- hand-authored -->
# ✅ Day 17 Checkpoint

> **Pruning Strategies** · 2 quests completed · ⭐ 70 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Key mechanic |
|---|---|---|
| "assign + or -" / "sign before each" | Sign-choice tree | Two branches per index; memo `(i, sum)` |
| "partition into k equal subsets" | K-bucket fill | `target = sum/k`, overflow prune |
| "equal sum groups" | Bucket assignment | Skip duplicate empty buckets |
| combination sum + every element used | Not skip/include | All elements appear — different branches |
| "how many expressions" to target | Count + memo | Add subtree counts at each node |

### 🧠 Quick Recognition Test

1. *"Assign + or - to reach target — count ways"* → **Sign-choice dfs.** `dfs(i+1, sum-nums[i]) + dfs(i+1, sum+nums[i])`. Memo.

2. *"Split array into 4 groups with equal sum"* → **K-bucket backtrack.** `sum % k` check. Sort desc. Overflow prune.

3. *"Pick subset summing to target (some unused OK)"* → **Day 13 subset/combo sum** — include/exclude, not sign-choice.

4. *"Place queens so none attack"* → **Day 18** — board constraints, not bucket fill.

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Given nums, can you partition into two subsets with equal sum?"*

Which pattern? **2-bucket special case of #698**, or subset-sum DP (#416). Check `sum % 2 == 0`, target = sum/2.

**Scenario 2:** *"Stick lengths — can you form a square using every stick exactly once?"*

Which pattern? **4-bucket fill (Matchsticks #473).** Same overflow prune and empty-bucket skip; k=4 fixed.

**Scenario 3:** *"Count ways to reach target by adding/subtracting each number exactly once."*

Which pattern? **Target Sum template exactly.** Memo on `(index, running_sum)`.

> **Answer key:** Scenarios 2–3 → Day 17 family. Scenario 1 → k=2 variant (Day 17 or DP).

---

## ⚠ Common Mistakes

1. **Include/exclude on Target Sum** — Every element gets a sign; no "skip element" branch.
2. **Forgetting `sum % k != 0`** — Instant false on k-subsets; don't enter dfs.
3. **No undo on bucket assignment** — `sides[j]` stays polluted for sibling branches.
4. **Skipping sort on k-subsets** — Large numbers first prune impossible partitions earlier.
5. **Labeling buckets distinctly** — Skip `sides[j]==sides[j-1]` when both empty.

---

## 🏋️ Mini Challenge

Solve [Partition Equal Subset Sum #416](https://leetcode.com/problems/partition-equal-subset-sum/) mentally: what is `k`? What is `target`? Name the two pruning rules from today's k-bucket template that still apply.

> 💡 **Answer:** k=2, target=sum/2. Overflow prune (`sides[j]+num > target`) and skip duplicate empty buckets. (Or use 1D DP — both valid.)

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Target Sum #494](https://leetcode.com/problems/target-sum/) | Medium | Sign-choice + memo |
| [Partition to K Equal Sum Subsets #698](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/) | Medium | K-bucket overflow prune |

---

*Day 17 complete. Tomorrow: board constraints — row-by-row queens and cell-by-cell Sudoku. →*
