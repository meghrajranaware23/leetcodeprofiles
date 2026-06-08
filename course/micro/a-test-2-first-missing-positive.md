# ⚔ A-Rank Test — Problem 2

> [First Missing Positive #41](https://leetcode.com/problems/first-missing-positive/) · **Hard** · 250 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open First Missing Positive on LeetCode](https://leetcode.com/problems/first-missing-positive/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real LeetCode practice. No peeking until you've genuinely tried.

> 🔥 **Hard with O(1) extra space.** This combines **in-place hashing** (index-as-key) with **cyclic sort** thinking — values belong at `index = value - 1`.

---

## The Problem

Given an unsorted integer array `nums`, return the **smallest positive integer** that is not present in `nums`.

You must implement an algorithm that runs in **O(n)** time and uses **O(1)** auxiliary space.

```
Input:  nums = [1, 2, 0]
Output: 3
Explanation: The numbers in the range [1, 2] are in nums. Since 3 is missing, return 3.

Input:  nums = [3, 4, -1, 1]
Output: 2

Input:  nums = [7, 8, 9, 11, 12]
Output: 1
```

---

## 💡 Hints

> 🎯 **What's being tested:** In-place hashing / cyclic sort — use the array itself as a hash table where `nums[i]` should live at index `nums[i] - 1`.

**Hint 1 — Bound the answer:** The missing positive is always in `[1, n + 1]` where `n = len(nums)`. If all of `1..n` appear, the answer is `n + 1`. Ignore zeros, negatives, and values > n — they can't be the first missing positive.

**Hint 2 — Index-as-key:** For each value `v` in `1..n`, its **correct home** is index `v - 1`. If `nums[i]` is in range and `nums[i] != nums[nums[i] - 1]`, swap `nums[i]` with `nums[nums[i] - 1]` and repeat at index `i` without advancing.

**Hint 3 — Cyclic sort loop:** This is cyclic sort restricted to positive integers ≤ n. Each swap places at least one value in its final position. Total swaps ≤ n → O(n) time.

**Hint 4 — Scan for first mismatch:** After placement, scan `i` from `0` to `n - 1`. If `nums[i] != i + 1`, return `i + 1`. If all match, return `n + 1`.

**Hint 5 — Pattern combination:** This fuses **hash-set thinking** (which values exist?) with **in-place array manipulation** (E-Rank read-write pointer) and **cyclic sort** (each value has one destination). No extra memory — the array is the hash table.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** In-Place Hashing / Cyclic Sort (index-as-key)

| Clue in the problem | What it signals |
|---|---|
| "first missing positive" | Answer in `[1, n+1]` — pigeonhole on array indices |
| O(n) time **and** O(1) space | No hash set allowed — use the array as the table |
| unsorted integers, positives matter | Place value `v` at index `v - 1` |
| Hard + tight constraints | Cyclic sort / in-place hashing — not sort + scan |
| values can be negative or huge | Filter by range `1..n` during placement |

**How to identify from the statement:** "Find missing/smallest X in O(1) space" on an array → **index-as-key cyclic sort**. Value `v` maps to index `v - 1`; scan for first index where `nums[i] != i + 1`.

**How a strong solver thinks before coding:**
1. *"Answer is in [1, n+1] — only n slots matter."*
2. *"Can't use a hash set — array IS the set."*
3. *"Swap nums[i] to nums[i]-1 until nums[i] is out of range or already placed."*
4. *"Scan for first i where nums[i] != i+1."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Sort, scan from 1 upward** | O(n log n) time — violates O(n) requirement |
| **Hash set of all values** | O(n) space — violates O(1) auxiliary space |
| **Boolean array of size n** | O(n) extra space — same violation |
| **Swap without while-loop at index i** | Skip misplaced values — single pass isn't enough |
| **Place values > n at index 0** | Pollutes valid positions — ignore out-of-range values instead |

**The insight brute force misses:** Indices `0..n-1` are n pigeonholes for values `1..n`. Placing each value at `index = value - 1` turns the array into a presence table with zero extra memory.

---

## 🎯 Transfer to Unseen Problems

Can you spot in-place hashing on unfamiliar wording?

**Scenario 1:** *"Given an array of n integers in range [1, n], find all integers that appear twice (O(1) extra space)."*

Which pattern? **In-place marking / cyclic sort** (A-Rank). Negate `nums[abs(nums[i]) - 1]` or use swap-to-place — index-as-key without extra memory.

**Scenario 2:** *"Given an unsorted array, find the first missing positive — you may use O(n) extra space."*

Which pattern? **Hash set** (E-Rank Day 4). Simpler when space isn't constrained — insert all positives, scan from 1.

**Scenario 3:** *"Given an array, sort it in O(n) when values are in range [1, n] with duplicates allowed."*

Which pattern? **Cyclic sort** (A-Rank). Same swap-to-correct-index mechanic — each value has exactly one slot (handle duplicates by stopping when `nums[i] == nums[nums[i]-1]`).

> **Answer key:** Scenario 1 → in-place marking (index-as-key). Scenario 2 → hash set (when space is free). Scenario 3 → cyclic sort. Signal: **"O(1) space + find missing/duplicate in range [1,n]"** → cyclic sort / in-place hashing.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

### Step-by-Step Walkthrough

```
nums = [3, 4, -1, 1]   (n = 4)
```

| Step | i | nums[i] | Action | Array after |
|------|---|---------|--------|-------------|
| 1 | 0 | 3 | swap with index 2 → nums[2]=-1 | `[-1, 4, 3, 1]` |
| 2 | 0 | -1 | out of range, i++ | `[-1, 4, 3, 1]` |
| 3 | 1 | 4 | out of range (> n), i++ | `[-1, 4, 3, 1]` |
| 4 | 2 | 3 | already at index 2, i++ | `[-1, 4, 3, 1]` |
| 5 | 3 | 1 | swap with index 0 → nums[0]=-1 | `[1, 4, 3, -1]` |
| 6 | 0 | 1 | already at index 0 | `[1, 4, 3, -1]` |
| 7 | 1 | 4 | out of range, i++ | `[1, 4, 3, -1]` |
| 8 | 3 | -1 | out of range | `[1, 4, 3, -1]` |

**Scan:** index 0 → `nums[0]=1` ✓, index 1 → `nums[1]=4 ≠ 2` → **return 2** ✓

```
nums = [7, 8, 9, 11, 12]   (n = 5)
```

All values > 5 — nothing placed in `[1..5]`. Scan: index 0 → `7 ≠ 1` → **return 1** ✓

### Placement loop

```text
for i in 0..n-1:
  while 1 <= nums[i] <= n and nums[i] != nums[nums[i] - 1]:
    swap(nums[i], nums[nums[i] - 1])

for i in 0..n-1:
  if nums[i] != i + 1: return i + 1
return n + 1
```

### C++
```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            while (nums[i] >= 1 && nums[i] <= n && nums[i] != nums[nums[i] - 1])
                swap(nums[i], nums[nums[i] - 1]);
        }
        for (int i = 0; i < n; i++)
            if (nums[i] != i + 1) return i + 1;
        return n + 1;
    }
};
```

### Python
```python
class Solution:
    def firstMissingPositive(self, nums: list[int]) -> int:
        n = len(nums)
        for i in range(n):
            while 1 <= nums[i] <= n and nums[i] != nums[nums[i] - 1]:
                target = nums[i] - 1
                nums[i], nums[target] = nums[target], nums[i]
        for i in range(n):
            if nums[i] != i + 1:
                return i + 1
        return n + 1
```

### Java
```java
class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            while (nums[i] >= 1 && nums[i] <= n && nums[i] != nums[nums[i] - 1]) {
                int target = nums[i] - 1;
                int tmp = nums[i];
                nums[i] = nums[target];
                nums[target] = tmp;
            }
        }
        for (int i = 0; i < n; i++)
            if (nums[i] != i + 1) return i + 1;
        return n + 1;
    }
}
```

**Complexity:** O(n) time · O(1) extra space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"O(1) space + find missing in range"** → Array is the hash table — index `v-1` stores value `v`.
- **"Cyclic sort"** → While-loop swap at each index until `nums[i]` is out of range or already placed.
- **"Pattern combination"** → Hash-set logic (presence check) + in-place swap (E-Rank) + bounded pigeonhole (answer in `[1, n+1]`).

This is A-Rank synthesis without a new algorithm — you combine constraints (time, space) with index-as-key thinking. The Hard label is the tight bound, not exotic math.

---

*Problem 2 complete. Proceed to Problem 3. →*
