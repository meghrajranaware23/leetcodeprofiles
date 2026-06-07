# ⚔ Quest: Two Sum II

> **Day 6** · [Two Sum II #167](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) · Easy-Medium · 15 XP · 12 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Two Sum II on LeetCode](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given a **1-indexed** array of integers `numbers` that is sorted in **non-decreasing order**, find two numbers such that they add up to `target`. Return the indices `[index1, index2]` where `index1 < index2`. Exactly one solution exists.

```
Input:  numbers = [2, 7, 11, 15], target = 9
Output: [1, 2]   (numbers[0] + numbers[1] = 2 + 7 = 9)

Input:  numbers = [2, 3, 4], target = 6
Output: [1, 3]   (2 + 4 = 6)

Input:  numbers = [-1, 0], target = -1
Output: [1, 2]
```

---

## 💡 Hints

You solved Two Sum with a hash map on Day 4. This array is **sorted** — can you hunt the complement without extra space?

Place one pointer at the start and one at the end. Compare `numbers[left] + numbers[right]` to `target`. The sorted order tells you which pointer to move.

Remember: return **1-indexed** positions, not 0-indexed.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Converging Two Pointers (Pair-Sum on Sorted Data)

**How to identify this from the problem statement:**
- "sorted in non-decreasing order" → order is guaranteed → converging pointers beat hash map
- "two numbers add up to target" → same complement instinct as Day 4 Two Sum
- "1-indexed" → classic Two Sum II variant — return `[left+1, right+1]`
- "exactly one solution" → return immediately on match — no need to collect all pairs

| Keyword / phrase | What it signals |
|---|---|
| "sorted" / "non-decreasing" | Converging pointers — move based on sum vs target |
| "two sum" / "add up to target" | Pair-sum mode |
| "1-indexed" | Return `left+1, right+1` |
| "O(1) extra space" (implicit) | Hash map works but pointers are cleaner on sorted input |

**Why this pattern works:** When the sum is too small, every pair involving the current left value with indices ≤ right−1 is also too small — so advancing `left` is safe. When the sum is too big, shrinking `right` is safe for the symmetric reason.

**How a strong solver thinks before coding:**
1. *"Sorted + pair sum → Day 6 converging pointers, not Day 4 hash map."*
2. *"L at 0, R at n−1. Compare sum to target."*
3. *"Too small → L++. Too big → R--. Match → return 1-indexed."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Nested loops checking every pair** | O(n²) — converging pointers reduce to O(n) |
| **Hash map (Day 4 approach)** | Works, but ignores sorted order — O(n) extra space when O(1) suffices |
| **Binary search for complement of each element** | O(n log n) — worse than O(n) two-pointer scan |
| **Returning 0-indexed indices** | Wrong answer format — off-by-one on output |

**The insight brute force misses:** Sorted order **is** the lookup structure. You don't need to remember past elements — the right pointer already represents the best candidate from the high end, and the left pointer from the low end.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Two Sum #1](https://leetcode.com/problems/two-sum/) | Unsorted → hash map instead | Same complement hunt, different tool |
| [3Sum #15](https://leetcode.com/problems/3sum/) | Three numbers, fix one + converge on rest | Pair-sum mode on sorted tail (Day 9) |
| [4Sum #18](https://leetcode.com/problems/4sum/) | Four numbers | Two nested fixes + converge (C-Rank) |
| [Valid Palindrome #125](https://leetcode.com/problems/valid-palindrome/) | Compare chars, not sums | Same `while L < R` skeleton (Day 2) |

If you recognized Two Sum II, you've unlocked the sorted-array branch of the Two Sum family.

---

## 📖 Walkthrough

`numbers = [1, 2, 3, 4, 6], target = 6`

```
Start:  [1,  2,  3,  4,  6]
         L               R

L=0, R=4: 1 + 6 = 7 > 6  → sum too big → R--

        [1,  2,  3,  4,  6]
         L           R

L=0, R=3: 1 + 4 = 5 < 6  → sum too small → L++

        [1,  2,  3,  4,  6]
             L       R

L=1, R=3: 2 + 4 = 6 == 6 ✓
         → return [1+1, 3+1] = [2, 4]
```

> 💡 **The insight:** Each pointer moves at most `n` times total. You never re-check a pair you've already eliminated. That's why it's O(n), not O(n²).

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int left = 0, right = numbers.size() - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) {
                return {left + 1, right + 1};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return {};
    }
};
```

### Python
```python
class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        left, right = 0, len(numbers) - 1
        while left < right:
            total = numbers[left] + numbers[right]
            if total == target:
                return [left + 1, right + 1]
            elif total < target:
                left += 1
            else:
                right -= 1
        return []
```

### Java
```java
class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) {
                return new int[]{left + 1, right + 1};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return new int[]{};
    }
}
```

**Complexity:** O(n) time · O(1) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Sorted array + two sum"** → Hash map from Day 4 is optional. Converging pointers are the intended tool.
- **"1-indexed output"** → My pointers are 0-indexed internally — add 1 before returning.
- **"Sum too small"** → Only moving `left` can increase the sum while keeping a valid pair structure.
- **"This is Two Sum with training wheels off"** → Same complement goal, but the array order does the bookkeeping.

If you reached for a hash map first, that's not wrong — but the breakthrough is recognizing **when sorted order upgrades your tool choice**.

> 🎯 **Pattern Unlocked:** Converging two pointers for pair-sum on sorted data. The move rule is dictated by comparing the current sum to the target.

---

*Pair-sum mode mastered. Next: optimization mode — maximize area, not find a target. →*
