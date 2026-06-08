# ✅ Day 17 Checkpoint

> **Monotonic Stack Fundamentals** · 2 quests completed · ⭐ 80 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| "next greater" / "next smaller" / "nearest larger to the right" | Monotonic stack (decreasing or increasing) | Stack holds unresolved indices in sorted order |
| "number of days until warmer" | Decreasing stack + distance | Next greater; answer = `i - popped` |
| "circular array" + next greater | 2n scan with `% n` | Second lap resolves wrap-around |
| "return -1 if no greater exists" | Unpopped indices after scan | No resolver found → default -1 or 0 |
| "for each element, find first that breaks monotonicity" | Stack pop on violation | Pop records the boundary |
| store values on stack | Store **indices** instead | Need index for distance and `nums[j]` lookup |
| nested right-scan per index | Monotonic stack O(n) | Each index pushed/popped once |

### 🧠 Quick Recognition Test

1. *"Days until a warmer temperature for each day"* → **Decreasing stack, distance = i − j (#739)**
2. *"Next greater in a circular array"* → **2n modulo scan, return value (#503)**
3. *"Next greater element of nums1[i] in nums2"* → **Stack on nums2, hash map lookup (#496)**
4. *"Stock span — consecutive days price ≤ today"* → **Decreasing stack, span = i − stack.top() (#901)**

---

## 🎯 Transfer to Unseen Problems

You've studied Daily Temperatures and Next Greater Element II. Can you recognize monotonic stack thinking on problems you've never walked through?

**Scenario 1:** *"Given an array, for each element find the next smaller element to the right. Return -1 if none."*

Which pattern? **Increasing monotonic stack.** Pop when `nums[i] < nums[stack.top()]`; assign `answer[popped] = nums[i]`. Mirror image of next greater.

**Scenario 2:** *"Given heights of bars in a histogram, find the largest rectangle area."*

Which pattern? **Monotonic increasing stack — Day 18 preview.** When a shorter bar arrives, pop taller bars and compute area with popped bar as height. Width extends to current index and previous stack top.

**Scenario 3:** *"Given an array, find how many elements to the right are smaller than the current element."*

Which pattern? **Monotonic stack variant with counting.** Increasing stack; on push, count elements popped (they're smaller than current). Or merge-tree — but stack works for adjacent comparisons.

> **Answer key:** Scenario 1 → increasing stack (next smaller). Scenario 2 → histogram rectangle (#84, tomorrow). Scenario 3 → stack with pop-count. Signal: **"nearest element satisfying a comparison"** → monotonic stack.

---

## ⚠ Common Mistakes

1. **Wrong stack direction** — Next **greater** → decreasing stack (pop when current is larger). Next **smaller** → increasing stack.

2. **Storing values instead of indices** — You need the index for distance (`i - j`) and to read `nums[j]` after pops.

3. **Forgetting the circular second lap** — Single pass misses wrap answers. Scan `2n` with `% n`, push only when `i < n`.

4. **Distance vs value** — Daily Temperatures returns days (`i - j`). Next Greater returns `nums[j]`. Same pop, different assignment.

5. **Not initializing defaults** — Unpopped indices need `0` (temperatures) or `-1` (next greater). Initialize the answer array accordingly.

---

## 🏋️ Mini Challenge

### [Next Greater Element I #496](https://leetcode.com/problems/next-greater-element-i/)

**[→ Try Next Greater Element I on LeetCode](https://leetcode.com/problems/next-greater-element-i/)**

`nums1` is a subset of `nums2`. For each `nums1[i]`, find the next greater element in `nums2`. Return -1 if none.

```
Input:  nums1 = [4, 1, 2], nums2 = [1, 3, 4, 2]
Output: [-1, 3, -1]
        (4 has no greater; 1 → 3; 2 has no greater)

Input:  nums1 = [2, 4], nums2 = [1, 2, 3, 4]
Output: [3, -1]
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "next greater element in nums2" | Decreasing stack on nums2 |
| "nums1 is subset of nums2" | Hash map: value → next greater answer |
| "return -1 if none" | Default -1; unpopped stay -1 |

**Before you code:** *"Run the Day 17 decreasing stack on nums2. Record each value's next greater in a hash map. Answer nums1 by map lookup."*

> 💡 **Hint:** Process nums2 left to right with a decreasing stack. When you pop `j`, set `map[nums2[j]] = nums2[i]`. After the scan, iterate nums1 and look up each value in the map (default -1).

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Next Greater Element I #496](https://leetcode.com/problems/next-greater-element-i/) | Easy | Stack + hash map lookup |
| [Online Stock Span #901](https://leetcode.com/problems/online-stock-span/) | Medium | Decreasing stack, span |
| [Sum of Subarray Minimums #907](https://leetcode.com/problems/sum-of-subarray-minimums/) | Medium | Previous + next smaller |
| [132 Pattern #456](https://leetcode.com/problems/132-pattern/) | Medium | Monotonic stack variant |
| [Remove K Digits #402](https://leetcode.com/problems/remove-k-digits/) | Medium | Monotonic increasing, greedy pop |

---

*Day 17 complete! Tomorrow: histograms, rectangles, and trapped water — the stack goes 2D. →*
