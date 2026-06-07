# ⚔ Quest: Move Zeroes

> **Day 1** · [Move Zeroes #283](https://leetcode.com/problems/move-zeroes/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Move Zeroes on LeetCode](https://leetcode.com/problems/move-zeroes/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an integer array `nums`, move all `0`s to the end while maintaining the relative order of non-zero elements. Do this **in-place**.

```
Input:  [0, 1, 0, 3, 12]
Output: [1, 3, 12, 0, 0]
```

---

## 💡 Hints

Which pattern from the concept lesson applies here? The array needs in-place modification — think read-write pointers.

If you're stuck after 5 minutes: the write pointer marks where the next non-zero should go. Non-zeros swap forward; zeros accumulate at the end naturally.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Read-Write Pointer (In-Place Rearrangement)

**How to identify this from the problem statement:**
- "Move all 0s to the end" → you're **filtering and repositioning** elements, not counting them
- "in-place" → no extra array allowed → you need two indices: one to read, one to write
- "maintain relative order of non-zero elements" → forward pass only (read-write moves left to right)

| Keyword / phrase | What it signals |
|---|---|
| "move … to the end" | Partition the array with a write boundary |
| "in-place" | Read-write pointer, O(1) space |
| "maintain relative order" | Single forward scan — don't sort |
| "without making a copy" | Same as in-place — confirms read-write |

**Why this pattern works:** The write pointer always marks the boundary between "kept elements" and "unprocessed zone." Non-zeros get written to the front; zeros naturally fall behind without explicit tracking.

**How a strong solver thinks before coding:**
1. *"In-place + reorder → read-write pointer from Day 1."*
2. *"Write pointer = count of non-zeros seen so far."*
3. *"One forward pass — O(n) time, O(1) space."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **New array:** copy non-zeros, append zeros | Violates "in-place" — O(n) extra space |
| **For each zero, swap with next non-zero (nested loops)** | O(n²) — each zero may trigger a full re-scan |
| **Count zeros, fill from end in second pass** | Works, but two passes when one suffices; easy to get indices wrong |

**The insight brute force misses:** You don't need to track zeros at all. Just **write non-zeros forward** — zeros end up at the tail automatically.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Remove Element #27](https://leetcode.com/problems/remove-element/) | Keep when `!= val` | Read-write with condition |
| [Remove Duplicates #26](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) | Keep when value changes | Read-write + adjacent compare |
| [Sort Colors #75](https://leetcode.com/problems/sort-colors/) | Three groups (D-Rank) | Read-write variant (Dutch flag) |

If you recognized Move Zeroes, you already have the skeleton for half of Day 1's practice queue.

---

## 📖 Walkthrough

Use the **read-write pointer pattern**. The write pointer marks where the next non-zero should go. Swap non-zeros forward, and zeros accumulate at the end naturally.

```
Initial:    [0, 1, 0, 3, 12]
             w
             r

r=0: arr[0]=0 → skip
            [0, 1, 0, 3, 12]
             w     r

r=1: arr[1]=1 → swap(arr[0], arr[1]) → w++
            [1, 0, 0, 3, 12]
                w     r

r=2: arr[2]=0 → skip
            [1, 0, 0, 3, 12]
                w        r

r=3: arr[3]=3 → swap(arr[1], arr[3]) → w++
            [1, 3, 0, 0, 12]
                   w         r

r=4: arr[4]=12 → swap(arr[2], arr[4]) → w++
            [1, 3, 12, 0, 0]  ✓
```

> 💡 **The insight:** When `write == read` (no zeros yet), the swap is a no-op. The pattern handles this naturally — no special cases needed.

---

## Solution

### C++
```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int write = 0;
        for (int read = 0; read < nums.size(); read++) {
            if (nums[read] != 0) {
                swap(nums[write], nums[read]);
                write++;
            }
        }
    }
};
```

### Python
```python
class Solution:
    def moveZeroes(self, nums: list[int]) -> None:
        write = 0
        for read in range(len(nums)):
            if nums[read] != 0:
                nums[write], nums[read] = nums[read], nums[write]
                write += 1
```

### Java
```java
class Solution {
    public void moveZeroes(int[] nums) {
        int write = 0;
        for (int read = 0; read < nums.length; read++) {
            if (nums[read] != 0) {
                int temp = nums[write];
                nums[write] = nums[read];
                nums[read] = temp;
                write++;
            }
        }
    }
}
```

**Complexity:** O(n) time · O(1) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"In-place rearrangement"** → I can't use a second array. I need read + write pointers.
- **"Move zeros to the end, keep order"** → Forward scan: write non-zeros to the front, skip zeros.
- **"This is the same family as Remove Element and Remove Duplicates"** → One pattern, many problems.

If you tried nested loops or a new array first, that's fine — but the breakthrough is **recognizing the pattern family**, not memorizing this one solution.

> 🎯 **Pattern Unlocked:** Read-write pointer for in-place element rearrangement. The write pointer defines the boundary between "processed" and "unprocessed."

---

*One quest down. The next one introduces an elegant trick. →*
