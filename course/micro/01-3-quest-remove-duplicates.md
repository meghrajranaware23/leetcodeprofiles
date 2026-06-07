# ⚔ Quest: Remove Duplicates from Sorted Array

> **Day 1** · [Remove Duplicates from Sorted Array #26](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Remove Duplicates on LeetCode](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given a sorted array `nums`, remove the duplicates **in-place** so that each element appears only once. Return the number of unique elements.

```
Input:  [1, 1, 2]
Output: 2, nums = [1, 2, ...]

Input:  [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
Output: 5, nums = [0, 1, 2, 3, 4, ...]
```

---

## 💡 Hints

The array is already sorted, so duplicates are always adjacent. Which pattern from the concept lesson lets you filter elements in-place?

The write pointer should only advance when you see a *new* value — compare `nums[read]` with `nums[write]`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Read-Write Pointer with Adjacent Comparison (Sorted Array)

**How to identify this from the problem statement:**
- "sorted array" + "remove duplicates" → duplicates are **always adjacent** — no hash set needed
- "in-place" + "return new length" → classic read-write pointer output
- "each element appears at most once" → write pointer advances only on **value change**

| Keyword / phrase | What it signals |
|---|---|
| "sorted" | Compare neighbors, not all pairs |
| "remove duplicates in-place" | Read-write pointer |
| "return the new length" | Write pointer + 1 is the answer |
| "relative order preserved" | Forward-only scan |

**Why this pattern works:** Sorting guarantees duplicates sit next to each other. You only need to ask: *"Is this value different from the last one I kept?"*

**How a strong solver thinks before coding:**
1. *"Sorted + unique → compare nums[read] vs nums[write]."*
2. *"Write pointer starts at 0; read starts at 1."*
3. *"Return write + 1 — not write."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Hash set to track seen values** | Works logically, but violates "in-place" — O(n) extra space |
| **Nested loops comparing every pair** | O(n²) — sorted array makes this unnecessary |
| **Build a new array of unique values** | Violates in-place; you must modify the original |
| **Sort then dedupe** | Array is already sorted — redundant work |

**The insight brute force misses:** Sorting guarantees duplicates are **neighbors**. You only need to ask *"Is this different from the last value I kept?"* — one forward pass, no set, no second array.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Move Zeroes #283](https://leetcode.com/problems/move-zeroes/) | Keep non-zeros | Read-write with condition |
| [Remove Element #27](https://leetcode.com/problems/remove-element/) | Keep when `!= val` | Read-write with condition |
| [Remove Duplicates II #80](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/) | Allow at most 2 copies | Read-write + compare `nums[write-1]` |

Same skeleton as Move Zeroes — only the keep condition changes.

---

## 📖 Walkthrough

Use the **read-write pointer pattern** again — but this time, the write pointer advances only when we see a *new* value.

```
[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
 w
 r

r=0: arr[0]=0, same as arr[w]=0 → skip
r=1: arr[1]=0, same as arr[w]=0 → skip
r=2: arr[2]=1, different! → w++, arr[w]=1
     [0, 1, 1, 1, 1, 2, 2, 3, 3, 4]
         w        r

r=3: arr[3]=1, same → skip
r=4: arr[4]=1, same → skip
r=5: arr[5]=2, different! → w++, arr[w]=2
     [0, 1, 2, 1, 1, 2, 2, 3, 3, 4]
            w              r

...continue until r reaches end

Result: [0, 1, 2, 3, 4, ...], return w+1 = 5
```

> 💡 **The insight:** Because the array is sorted, we only need to compare `nums[read]` with `nums[write]`. If they differ, it's a new unique value.

---

## Solution

### C++
```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;
        int write = 0;
        for (int read = 1; read < nums.size(); read++) {
            if (nums[read] != nums[write]) {
                write++;
                nums[write] = nums[read];
            }
        }
        return write + 1;
    }
};
```

### Python
```python
class Solution:
    def removeDuplicates(self, nums: list[int]) -> int:
        if not nums:
            return 0
        write = 0
        for read in range(1, len(nums)):
            if nums[read] != nums[write]:
                write += 1
                nums[write] = nums[read]
        return write + 1
```

### Java
```java
class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int write = 0;
        for (int read = 1; read < nums.length; read++) {
            if (nums[read] != nums[write]) {
                write++;
                nums[write] = nums[read];
            }
        }
        return write + 1;
    }
}
```

**Complexity:** O(n) time · O(1) space

---

## 💭 What Should Have Clicked in Your Mind?

- **"Sorted array"** → I don't need a hash set. Adjacent comparison is enough.
- **"Remove duplicates in-place"** → Same read-write pattern as Move Zeroes, but the condition is `nums[read] != nums[write]`.
- **"Return length"** → The write pointer tracks the last valid index; answer is `write + 1`.

The pattern isn't "Remove Duplicates" — it's **read-write pointer with a keep/discard condition**. Once you see that, this problem takes 2 minutes.

> 🎯 **Pattern Unlocked:** Read-write pointer with a condition check. The write pointer only advances when we find something worth keeping — the core idea behind all in-place filtering.

---

*Two quests complete! Time for your Day 1 checkpoint. →*
