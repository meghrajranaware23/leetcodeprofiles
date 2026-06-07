# ✅ Day 1 Checkpoint

> **Array Traversal** · 2 quests completed · ⭐ 30 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Before you move on, practice **hearing the signal** in each phrase below:

| When you see... | Think... | Why |
|---|---|---|
| "in-place" / "without extra space" | Read-write pointer | Must modify array without copying |
| "remove" / "filter elements" | Read-write pointer with a condition | Keep some, discard others |
| "maintain relative order" | Forward traversal with write pointer | Backward would scramble order |
| "merge from the end" | Backward traversal | Avoid overwriting unprocessed data |
| "sorted array + unique" | Read-write pointer comparing adjacent | Sorted = duplicates are neighbors |

### 🧠 Quick Recognition Test

Read each mini-problem. Which pattern fires first?

1. *"Move all negative numbers to the front in-place"* → **Read-write pointer** (partition by sign)
2. *"Remove all instances of val from sorted array"* → **Read-write pointer** (same as Remove Element)
3. *"Check if array is palindrome"* → **Two pointers from both ends** (Day 2 preview)

---

## 🎯 Transfer to Unseen Problems

You've seen Move Zeroes and Remove Duplicates. Can you recognize the read-write pattern on problems you've never studied?

**Scenario 1:** *"Given a sorted array, remove all duplicates so each element appears at most once. Return the new length. Modify in-place."*

Which pattern? **Read-write pointer with adjacent compare.** Sorted → duplicates are neighbors → compare `nums[read]` with `nums[write]`, advance write only on change.

**Scenario 2:** *"Given an array and a value `val`, remove all instances of `val` in-place. Return how many elements remain. Order of remaining elements must stay the same."*

Which pattern? **Read-write pointer with a keep condition.** Same skeleton as Move Zeroes — keep when `nums[read] != val`, write forward.

**Scenario 3:** *"Move all negative numbers to the beginning and all positive numbers to the end, in-place. Relative order within each group must be preserved."*

Which pattern? **Read-write pointer (partition).** Forward scan: write pointer marks the next slot for a negative; swap or copy when you find one. Positives naturally trail behind.

> **Answer key:** All three → read-write pointer. The *condition* changes (non-zero, unique value, not val, negative) — the two-pointer structure does not.

---

## ⚠ Common Mistakes

1. **Off-by-one errors** — Use `< n` not `<= n` for 0-indexed arrays. The last valid index is `n - 1`.

2. **Modifying while iterating** — Without a separate write pointer, you'll skip elements. Always use read/write pointers for in-place modification.

3. **Missing edge cases** — Always test with: empty array `[]`, single element `[x]`, all same values, already solved input.

4. **Returning wrong value** — For "return new length" problems, the answer is `write + 1` (the write pointer is 0-indexed).

---

## 🏋️ Mini Challenge

### [Remove Element #27](https://leetcode.com/problems/remove-element/)

**[→ Try Remove Element on LeetCode](https://leetcode.com/problems/remove-element/)**

Given an array and a value, remove all instances of that value in-place. Return the new length.

```
Input:  nums = [3, 2, 2, 3], val = 3
Output: 2, nums = [2, 2, ...]
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "remove all instances of val" | Filter in-place |
| "in-place" | Read-write pointer |
| "return new length" | Write pointer + 1 |

**Before you code:** *"This is Move Zeroes with a different keep condition — keep when `nums[read] != val`."*

> 💡 **Hint:** Same read-write pointer pattern. The write pointer advances only when `nums[read] != val`.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Merge Sorted Array #88](https://leetcode.com/problems/merge-sorted-array/) | Easy | Backward traversal |
| [Duplicate Zeros #1089](https://leetcode.com/problems/duplicate-zeros/) | Easy | Backward fill after counting |
| [Plus One #66](https://leetcode.com/problems/plus-one/) | Easy | Backward traversal with carry |
| [Squares of a Sorted Array #977](https://leetcode.com/problems/squares-of-a-sorted-array/) | Easy | Two pointers from both ends |

---

*Day 1 complete! Tomorrow: strings are just arrays with a restricted alphabet. →*
