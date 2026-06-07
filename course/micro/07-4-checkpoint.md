# ✅ Day 7 Checkpoint

> **Multi-Pointer** · 2 quests completed · ⭐ 50 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Before you move on, practice **hearing the signal** in each phrase below:

| When you see... | Think... | Why |
|---|---|---|
| "all unique triplets" / "three numbers sum to" | Fix one + left/right two-pointer | Reduces k-sum to sorted pair search |
| "sort 0s, 1s, 2s" / "three colors" | Dutch National Flag (low/mid/high) | Three-way in-place partition |
| "in-place" + small fixed value set | Multi-pointer partition | Counting works, but pointers are O(1) space |
| "closest sum to target" (k numbers) | Same 3Sum skeleton + track best | Inner loop identical, different exit condition |
| "partition into three groups" | low / mid / high boundaries | Each pointer owns a zone invariant |
| "skip duplicates" after sorting | Advance while equal at i, left, right | Uniqueness requires dedup at every level |

### 🧠 Quick Recognition Test

Read each mini-problem. Which pattern fires first?

1. *"Find all unique quadruplets summing to target"* → **Fix two + two-pointer** (4Sum — nested 3Sum)
2. *"Sort an array of -1, 0, and +1 only"* → **Dutch National Flag** (same as Sort Colors)
3. *"Move all 0s to front, 1s to middle, 2s to end in one pass"* → **Dutch National Flag**

---

## 🎯 Transfer to Unseen Problems

You've seen 3Sum and Sort Colors. Can you recognize multi-pointer patterns on problems you've never studied?

**Scenario 1:** *"Given a sorted array, find two numbers that sum to target. Return their indices (1-indexed)."*

Which pattern? **Two pointers from both ends** (Two Sum II — E-Rank preview). Sorted → left/right converge. 3Sum adds an outer `i` loop on top of this.

**Scenario 2:** *"Given an array with n integers in range [0, n], sort it in O(n) without extra space."*

Which pattern? **Cycle sort or counting** — not Dutch flag (domain is 0..n, not three values). Recognize when three-way partition applies vs. when counting/cycle sort is better.

**Scenario 3:** *"Partition array so all elements less than pivot are left, equal in middle, greater on right."*

Which pattern? **Dutch National Flag generalized** — same low/mid/high logic with pivot value as the "middle" bucket.

> **Answer key:** Scenario 1 → two-pointer (inner engine of 3Sum). Scenario 2 → counting/cycle sort (not three colors). Scenario 3 → Dutch flag variant.

---

## ⚠ Common Mistakes

1. **Forgetting to sort before 3Sum** — Two-pointer only works on sorted arrays. Unsorted input → sort first.

2. **Duplicate triplets** — Skip equal values at `i`, and after finding a valid pair, skip equal `left` and `right` neighbors before moving on.

3. **Advancing `mid` after high swap in Dutch flag** — The element swapped from `high` to `mid` is unprocessed. Re-examine it.

4. **Wrong loop condition** — Dutch flag uses `while mid <= high`, not `mid < high`. The last unknown element must be classified.

5. **Off-by-one on 3Sum outer loop** — Loop `i` only to `n - 3` (need at least two elements after `i` for left/right).

---

## 🏋️ Mini Challenge

### [3Sum Closest #16](https://leetcode.com/problems/3sum-closest/)

**[→ Try 3Sum Closest on LeetCode](https://leetcode.com/problems/3sum-closest/)**

Given an array `nums` and an integer `target`, find three integers in `nums` such that the sum is closest to `target`. Return that sum. Each input has exactly one answer.

```
Input:  nums = [-1, 2, 1, -4], target = 1
Output: 2   (sum -1 + 2 + 1 = 2, closest to 1)

Input:  nums = [0, 0, 0], target = 1
Output: 0
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "three integers" / "sum closest to target" | Fix one + two-pointer (3Sum family) |
| "closest" not "exact" | Track `best` distance; don't stop at first match |
| unsorted input | Sort first — same as 3Sum |

**Before you code:** *"This is 3Sum without collecting triplets — fix `i`, sweep left/right, update closest sum."*

> 💡 **Hint:** Initialize `closest = nums[0] + nums[1] + nums[2]`. Inner loop: if `|sum - target| < |closest - target|`, update. Move left/right by comparing sum to target (same as 3Sum).

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [4Sum #18](https://leetcode.com/problems/4sum/) | Medium | Fix two + two-pointer |
| [3Sum Smaller #259](https://leetcode.com/problems/3sum-smaller/) | Medium | Fix one + count pairs |
| [Partition Labels #763](https://leetcode.com/problems/partition-labels/) | Medium | Greedy boundaries (related) |
| [Sort Array By Parity II #922](https://leetcode.com/problems/sort-array-by-parity-ii/) | Easy | Two-pointer placement |

---

*Day 7 complete! Tomorrow: fast and slow pointers — cycle detection on arrays. →*
