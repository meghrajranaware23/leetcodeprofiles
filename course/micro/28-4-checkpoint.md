# ✅ Day 28 Checkpoint

> **Multi-Pattern Array Synthesis** · 2 quests completed · ⭐ 125 XP earned

---

## 🔍 Pattern Signals — Combination Recognition Drill

S-Rank checkpoints test **which patterns stack**, not which pattern alone applies.

| When you see... | Combine... | Why |
|---|---|---|
| "max in each sliding window of size k" | Fixed window (Day 9) + decreasing deque (Day 17) | Frame slides; deque answers range-max without rescan |
| "shortest subarray, sum ≥ k, negatives OK" | Prefix sum (Day 5) + increasing deque (Day 17) + shrink (Day 10) | Prefix for sum; deque for best left; shrink for min length |
| "shortest subarray, sum ≥ k, all positive" | Variable window alone (Day 10) | Running sum is monotonic — no prefix/deque needed |
| "subarray sum equals k" | Prefix sum + hash map (Day 5) | Exact match — not deque |
| "max AND min in same sliding window" | Two deques OR multiset (Day 17 × 2) | Each extremum needs its own monotone structure |
| rescan k elements per window | Missing deque | O(n×k) brute force — synthesis target is O(n) |
| running sum shrink with negatives | Wrong tool | Prefix difference required |

### 🧠 Quick Recognition Test

1. *"Return max in every window of size 500"* → **Fixed window + decreasing deque (#239)**
2. *"Shortest subarray sum at least 1e9, array has negatives"* → **Prefix + increasing deque + shrink (#862)**
3. *"Minimum size subarray sum ≥ target, all positive"* → **Variable window only (#209, Day 10)**
4. *"Longest subarray where max − min ≤ limit"* → **Variable window + max deque + min deque (#1438)**

---

## 🎯 Transfer to Unseen Problems

You've studied Sliding Window Maximum and Shortest Subarray Sum ≥ K. Can you name the pattern **combination** on problems you've never walked through?

**Scenario 1:** *"Given an array, find the longest subarray where the maximum minus minimum is at most limit."*

Which combination? **Variable window (Day 10) + two monotonic deques (Day 17)** — one decreasing for max, one increasing for min. Shrink left while `max − min > limit`.

**Scenario 2:** *"Given positive integers, find the shortest subarray with sum at least k."*

Which combination? **Variable window alone (Day 10)** — no deque needed. Positives make running sum monotonic.

**Scenario 3:** *"Given an array (with negatives), count subarrays with sum exactly k."*

Which combination? **Prefix sum + hash map (Day 5)** — not deque. Exact count, not shortest length.

> **Answer key:** Scenario 1 → window + dual deque (#1438). Scenario 2 → Day 10 only (#209). Scenario 3 → prefix + map (#560).

---

## ⚠ Common Mistakes

1. **One-pattern thinking** — Seeing "sliding window" and stopping. Ask: *what query inside the window needs O(1)?* → deque.

2. **Running sum on #862** — Day 10 shrink requires positive elements. Negatives → prefix sums.

3. **Values in deque instead of indices** — Can't evict when index leaves window or compare prefix at positions.

4. **Wrong deque order** — Decreasing for max; increasing for smallest prefix (best left boundary).

5. **Forgetting prefix[0] = 0** — Subarrays starting at index 0 need the empty-prefix left boundary.

---

## 🏋️ Mini Challenge

### [Longest Continuous Subarray With Absolute Diff ≤ Limit #1438](https://leetcode.com/problems/longest-continuous-subarray-with-absolute-difference-less-than-or-equal-to-limit/)

**[→ Try on LeetCode](https://leetcode.com/problems/longest-continuous-subarray-with-absolute-difference-less-than-or-equal-to-limit/)**

Given an array `nums` and integer `limit`, return the **length of the longest subarray** where `|max − min| ≤ limit`.

```
Input:  nums = [8, 2, 4, 7], limit = 4
Output: 2
        ([2, 4] has max−min = 2 ≤ 4)

Input:  nums = [10, 1, 2, 4, 7, 2], limit = 5
Output: 4
        ([2, 4, 7, 2])

Input:  nums = [4, 2, 2, 2, 4, 4, 2, 2], limit = 0
Output: 3
        ([2, 2, 2])
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "longest subarray" | Variable window — maximize length |
| "absolute difference ≤ limit" | Need max AND min in current window |
| "continuous subarray" | Expand right, shrink left |
| Hard + range constraint | Day 10 frame + Day 17 deque × 2 |

**Before you code:** *"Expand right. Track max (decreasing deque) and min (increasing deque). While max − min > limit, shrink left and evict stale indices from both deques. Track max length."*

> 💡 **Hint:** Two deques of indices — `maxDq` decreasing, `minDq` increasing. Pop front of each when `nums[front] < nums[left]` after advancing left. Valid when `nums[maxDq[0]] − nums[minDq[0]] ≤ limit`.

---

## 📚 Practice Queue

| Problem | Difficulty | Pattern Combination |
|---|---|---|
| [Longest Continuous Subarray With Absolute Diff ≤ Limit #1438](https://leetcode.com/problems/longest-continuous-subarray-with-absolute-difference-less-than-or-equal-to-limit/) | Medium | Variable window + dual deque |
| [Shortest Subarray with Sum at Least K #862](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/) | Hard | Prefix + deque + shrink |
| [Sliding Window Maximum #239](https://leetcode.com/problems/sliding-window-maximum/) | Hard | Fixed window + deque |
| [Minimum Size Subarray Sum #209](https://leetcode.com/problems/minimum-size-subarray-sum/) | Medium | Variable window only (positive) |
| [Subarray Sum Equals K #560](https://leetcode.com/problems/subarray-sum-equals-k/) | Medium | Prefix + hash map (contrast) |

---

*Day 28 complete! Tomorrow: array techniques transfer to strings. →*
