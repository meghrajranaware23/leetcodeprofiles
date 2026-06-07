# ✅ Day 1 Checkpoint

> **Array Traversal** · 2 quests completed · ⭐ 30 XP earned

---

## 🔍 Pattern Signals

| When you see... | Think... |
|---|---|
| "in-place" / "without extra space" | Read-write pointer |
| "remove" / "filter elements" | Read-write pointer with a condition |
| "maintain relative order" | Forward traversal with write pointer |
| "merge from the end" | Backward traversal |
| "sorted array + unique" | Read-write pointer comparing adjacent |

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
