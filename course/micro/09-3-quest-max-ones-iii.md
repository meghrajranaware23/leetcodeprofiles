# ⚔ Quest: Max Consecutive Ones III

> **Day 9** · [Max Consecutive Ones III #1004](https://leetcode.com/problems/max-consecutive-ones-iii/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Max Consecutive Ones III on LeetCode](https://leetcode.com/problems/max-consecutive-ones-iii/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given a binary array `nums` and an integer `k`, return the **maximum number of consecutive 1's** in the array if you can flip at most `k` 0's to 1's.

```
Input:  nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], k = 2
Output: 6
        (flip nums[3] and nums[4] → six consecutive 1's)

Input:  nums = [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], k = 3
Output: 10
```

---

## 💡 Hints

Reframe: find the **longest subarray** containing at most `k` zeros. That's a fixed-budget window — expand right, and when zeros exceed `k`, shrink from the left.

Count zeros inside the window. When `zeroCount > k`, advance `left` and decrement the count until valid again.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Fixed-Budget Sliding Window (Enter/Exit with a Counter)

**How to identify this from the problem statement:**
- "maximum consecutive 1's" with "flip at most k 0's" → longest window with ≤ k zeros
- binary array → count 0's in window, not a full sum
- window size varies, but the **constraint** is fixed (k zeros) — expand/shrink within budget

| Keyword / phrase | What it signals |
|---|---|
| "flip at most k" / "at most k replacements" | Window constraint: count of bad elements ≤ k |
| "maximum consecutive" / "longest subarray" | Track max window size while valid |
| binary array (0s and 1s) | Count zeros (or ones) in window |

**Why this pattern works:** As `right` expands, zeros may exceed `k`. Shrink `left` until the window is valid again. Each element enters and exits at most once — O(n).

**How a strong solver thinks before coding:**
1. *"Flip k zeros → longest subarray with ≤ k zeros."*
2. *"Expand right, count zeros, shrink left when zeroCount > k."*
3. *"Track max window length, not max sum."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try every subarray, count zeros, check ≤ k** | O(n²) — doesn't scale to n = 10⁵ |
| **Flip every combination of k zeros** | Exponential — k can be large |
| **Greedy: flip nearest zero without window tracking** | Local flips miss globally optimal windows |

**The insight brute force misses:** The answer is a **contiguous window** where at most `k` elements are zeros. Track that window with two pointers — when it becomes invalid, shrink from the left instead of restarting.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Max Consecutive Ones III #1004](https://leetcode.com/problems/max-consecutive-ones-iii/) | Count zeros ≤ k | Budget window with counter |
| [Max Consecutive Ones #485](https://leetcode.com/problems/max-consecutive-ones/) | No flips allowed (k = 0) | Simple running count of 1's |
| [Longest Repeating Character Replacement #424](https://leetcode.com/problems/longest-repeating-character-replacement/) | Replace chars, not flip bits | Window size − max freq ≤ k |
| [Grumpy Bookstore Owner #1052](https://leetcode.com/problems/grumpy-bookstore-owner/) | Fixed window size k | Enter/exit on satisfaction gain |

This problem bridges fixed-window thinking (Day 9) and variable-window mechanics (Day 10). The constraint is a budget, not a fixed length.

---

## 📖 Walkthrough

```
nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],  k = 2

right=0: [1]           zeros=0  len=1  max=1
right=3: [1,1,1,0]     zeros=1  len=4  max=4
right=4: [1,1,1,0,0]   zeros=2  len=5  max=5
right=5: [1,1,1,0,0,0] zeros=3  → shrink left
  left=1: [1,1,0,0,0]  zeros=3  → shrink
  left=2: [1,0,0,0]    zeros=3  → shrink
  left=3: [0,0,0]      zeros=3  → shrink
  left=4: [0,0]        zeros=2  len=2
right=9: window grows to [0,0,1,1,1,1] zeros=2 len=6  max=6 ✓
```

> 💡 **The insight:** You're not literally flipping — you're finding the longest span coverable by ≤ k flips. Count zeros; shrink when the budget breaks.

---

## Solution

### C++
```cpp
class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        int left = 0, zeroCount = 0, maxLen = 0;

        for (int right = 0; right < (int)nums.size(); right++) {
            if (nums[right] == 0) zeroCount++;          // ENTER

            while (zeroCount > k) {
                if (nums[left] == 0) zeroCount--;       // EXIT
                left++;
            }
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
```

### Python
```python
class Solution:
    def longestOnes(self, nums: list[int], k: int) -> int:
        left = zero_count = max_len = 0

        for right in range(len(nums)):
            if nums[right] == 0:
                zero_count += 1                       # ENTER

            while zero_count > k:
                if nums[left] == 0:
                    zero_count -= 1                   # EXIT
                left += 1

            max_len = max(max_len, right - left + 1)

        return max_len
```

### Java
```java
class Solution {
    public int longestOnes(int[] nums, int k) {
        int left = 0, zeroCount = 0, maxLen = 0;

        for (int right = 0; right < nums.length; right++) {
            if (nums[right] == 0) zeroCount++;          // ENTER

            while (zeroCount > k) {
                if (nums[left] == 0) zeroCount--;       // EXIT
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}
```

**Complexity:** O(n) time · O(1) space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Flip at most k zeros"** → Longest subarray with ≤ k zeros. Budget window.
- **Binary array** → Count zeros in window, not a running sum.
- **Expand right, shrink left when invalid** → Day 10 preview, but the counter mechanic is pure Day 9 enter/exit.
- **"I don't need to try every flip combination"** → The window either fits in k flips or it doesn't.

If you tried every subarray and counted zeros each time, you found O(n²). The signal was "longest contiguous with at most k bad elements" — that's a sliding window with a counter.

> 🎯 **Pattern Unlocked:** Budget-constrained window — track bad-element count, shrink when count > k.

---

*Next: checkpoint — prove you can spot fixed-window signals on your own. →*
