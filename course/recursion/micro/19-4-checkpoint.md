<!-- hand-authored -->
# ✅ Day 19 Checkpoint

> **Partition Problems** · 2 quests completed · ⭐ 70 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Key mechanic |
|---|---|---|
| "form a square" / "four equal sides" | 4-bucket partition | k=4, target = sum/4 |
| "partition into k equal subsets" | General k-bucket | Same dfs, k parameter |
| "assign each element to a group" | Bucket loop at index i | Not include/exclude |
| "equal sum" + use all elements | Pre-check sum % k | target = sum/k |
| Day 17 #698 revisit | Same code again | Recognition, not re-derivation |

### 🧠 Quick Recognition Test

1. *"Matchsticks to square"* → **4-bucket dfs.** Sort desc. Skip `sides[j]==sides[j-1]`. Overflow prune.

2. *"Partition array into 3 equal-sum subsets"* → **k=3 bucket assignment.** Identical skeleton.

3. *"Generate all subsets of an array"* → **Day 11 — wrong tool.** Include/exclude, not bucket assign.

4. *"Target sum with + and - signs"* → **Day 17 sign-choice.** Two branches per index, not k buckets.

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Can you split an array into two groups with equal sum?"*

Which pattern? **k=2 bucket partition** (or DP subset-sum #416). Same target = sum/2 check. Bucket dfs works; DP is O(n·sum) alternative.

**Scenario 2:** *"Distribute cookies into k jars, minimize the maximum cookies any child gets."*

Which pattern? **Bucket assignment family (#2305).** Same loop over jars; optimize max load instead of boolean all-equal.

**Scenario 3:** *"Partition string into palindrome substrings."*

Which pattern? **Day 14 string partition — not today.** Cut string segments, not assign numbers to buckets.

> **Answer key:** Scenarios 1–2 → bucket assignment. Scenario 3 → string backtracking.

---

## ⚠ Common Mistakes

1. **Subset include/exclude on partition problems** — Every element must land in a bucket.
2. **Forgetting duplicate-bucket skip** — Symmetric partitions explored k! times.
3. **Ascending sort on sticks/nums** — Descending sort fails fast on large values.
4. **Skipping sum % k guard** — Wastes full DFS when partition is impossible.
5. **Treating buckets as labeled** — Bucket 0 and bucket 1 are interchangeable when sums match.

---

## 🏋️ Mini Challenge

From memory, write the bucket dfs loop (5 lines) for Matchsticks #473. Then change `4` to `k` for #698.

Say aloud: *"overflow prune, duplicate skip, add, recurse, undo."*

> 💡 **Self-check:** Does your loop have `if j > 0 && sides[j] == sides[j-1]: continue`?

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Matchsticks to Square #473](https://leetcode.com/problems/matchsticks-to-square/) | Medium | 4-bucket partition |
| [Partition to K Equal Sum Subsets #698](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/) | Medium | General k-bucket |
| [Fair Distribution of Cookies #2305](https://leetcode.com/problems/fair-distribution-of-cookies/) | Medium | Bucket assign + minimize max |

---

*Day 19 complete. Tomorrow: insert operators into digit strings — the multiply carry trick. →*
