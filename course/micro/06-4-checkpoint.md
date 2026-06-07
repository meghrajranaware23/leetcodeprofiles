# ✅ Day 6 Checkpoint

> **Converging Two Pointers** · 2 quests completed · ⭐ 35 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Before you move on, practice **hearing the signal** in each phrase below:

| When you see... | Think... | Why |
|---|---|---|
| "sorted" + "two sum" / "pair adds to target" | Converging pointers (pair-sum mode) | Order tells you which pointer to move |
| "1-indexed" + sorted | Two Sum II variant | Return `[L+1, R+1]` |
| "maximum area" / "container" / "most water" | Converging pointers (optimization mode) | Track best; move shorter boundary |
| "two pointers from both ends" | Converging skeleton | `while left < right` |
| "palindrome" / "reads same backward" | Converging compare (Day 2) | Same skeleton, compare not sum |
| "unsorted" + "two sum" + need indices | Hash map (Day 4) | Sorting loses original positions |
| "three numbers sum to zero" | Fix one + converge on rest | 3Sum preview (Day 9) |

### 🧠 Quick Recognition Test

Read each mini-problem. Which pattern fires first?

1. *"Sorted array, find two numbers summing to target, return 1-indexed positions"* → **Converging pair-sum** (L++/R-- on sum compare)
2. *"Array of bar heights, find max water between any two bars"* → **Converging optimization** (move shorter line)
3. *"Check if string is palindrome, ignoring case and punctuation"* → **Converging compare + skip** (Day 2)
4. *"Unsorted array, two numbers sum to target, return original indices"* → **Hash map complement** (Day 4)

---

## 🎯 Transfer to Unseen Problems

You've studied Two Sum II and Container With Most Water. Can you recognize converging pointers on problems you've never walked through?

**Scenario 1:** *"Given a sorted array and a target, return whether any two distinct elements sum to exactly `target` (boolean, not indices)."*

Which pattern? **Converging pair-sum.** Identical move rule to Two Sum II — return `true` on match instead of indices. O(n) time, O(1) space.

**Scenario 2:** *"Given an array of positive integers, find the longest span between two equal values where every element between them is strictly smaller than both endpoints."*

Which pattern? **Converging from both ends toward a center peak** — related family, but the signal is "two boundaries enclosing a region." Start wide, move the side that can't improve the constraint.

**Scenario 3:** *"Given a sorted array, find two numbers whose sum is closest to (but not exceeding) `target`."*

Which pattern? **Converging pair-sum with tracking.** Same L/R movement, but track the best sum seen so far instead of requiring an exact match.

> **Answer key:** Scenarios 1 and 3 → pair-sum converge with sum compare. Scenario 2 → converging boundaries with a custom move rule. The *move condition* changes — the two-pointer structure does not.

---

## ⚠ Common Mistakes

1. **Wrong pointer on sum compare** — Sum too small → `left++`. Sum too big → `right--`. Reversing this skips the answer.

2. **0-indexed vs 1-indexed** — Two Sum II returns `[left+1, right+1]`. Forgetting `+1` fails every test.

3. **Moving the taller line in Container With Most Water** — Always move the shorter side. The taller side might still pair with a future inward line.

4. **Using converging pointers when indices must be original** — If the array isn't sorted and you can't reorder, use a hash map (Day 4). Don't sort and converge unless the problem allows it.

5. **`left <= right` instead of `left < right`** — Using the same index twice creates invalid pairs. Keep strict inequality.

---

## 🏋️ Mini Challenge

### [Valid Palindrome II #680](https://leetcode.com/problems/valid-palindrome-ii/)

**[→ Try Valid Palindrome II on LeetCode](https://leetcode.com/problems/valid-palindrome-ii/)**

Given a string, return `true` if it can be a palindrome after **deleting at most one** character.

```
Input:  "aba"    → true   (already a palindrome)
Input:  "abca"   → true   (delete 'c' or 'b')
Input:  "abc"    → false  (no single deletion fixes it)
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "palindrome" | Converging compare from both ends (Day 2) |
| "delete at most one character" | On mismatch, branch: skip left **or** skip right |
| "return true/false" | Two-pointer scan with one allowed repair |

**Before you code:** *"Standard palindrome compare with L and R. On first mismatch, try `L+1, R` OR `L, R-1` — if either sub-range is a palindrome, return true."*

> 💡 **Hint:** This is Day 2's Valid Palindrome with a single escape hatch. The converging skeleton is identical; you add one recursive or helper check on mismatch.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Two Sum II #167](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) | Easy-Medium | Pair-sum converge |
| [Squares of a Sorted Array #977](https://leetcode.com/problems/squares-of-a-sorted-array/) | Easy | Converge from both ends (E-Rank revisit) |
| [3Sum #15](https://leetcode.com/problems/3sum/) | Medium | Sort + fix one + converge |
| [Trapping Rain Water #42](https://leetcode.com/problems/trapping-rain-water/) | Hard | Converge + max height tracking |

---

*Day 6 complete! Tomorrow: read-write pointers on unsorted data — the pursuit continues. →*
