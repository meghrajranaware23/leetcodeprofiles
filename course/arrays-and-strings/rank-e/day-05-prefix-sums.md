---
# ⚔ Day 5: Prefix Sums — Unlocking Range Queries

**Rank:** E-Rank | **XP:** 100 | **Time:** 60 min

---

## 🎯 Mission

Prefix sums transform O(n) range queries into O(1) lookups. This pattern is the gateway from E-Rank thinking to D-Rank mastery.

## 📝 Concept

Every time you find yourself summing a subarray inside a loop — stop. You're doing redundant work. Prefix sums exist to eliminate exactly this waste.

### What Is a Prefix Sum Array?

A prefix sum array is a precomputed array where each element at index `i` stores the sum of all elements from the original array from index `0` up to `i-1`. Once built, you can answer any "what's the sum from index L to R?" question in constant time.

Given an array `nums` of length `n`, you build a prefix array `prefix` of length `n + 1`:

```
prefix[0] = 0
prefix[1] = nums[0]
prefix[2] = nums[0] + nums[1]
prefix[i] = nums[0] + nums[1] + ... + nums[i-1]
```

Here's the construction visualized:

```
nums:     [ 2,  4,  1,  3,  5 ]
index:      0   1   2   3   4

Step-by-step prefix construction:

prefix[0] = 0                              →  0
prefix[1] = 0 + nums[0] = 0 + 2           →  2
prefix[2] = 2 + nums[1] = 2 + 4           →  6
prefix[3] = 6 + nums[2] = 6 + 1           →  7
prefix[4] = 7 + nums[3] = 7 + 3           → 10
prefix[5] = 10 + nums[4] = 10 + 5         → 15

prefix:   [ 0,  2,  6,  7, 10, 15 ]
index:      0   1   2   3   4   5
```

Notice: `prefix` has length `n + 1`, and `prefix[0] = 0` always. This extra zero is not a quirk — it's essential for clean range queries.

### The Range Sum Formula

To get the sum of elements from index `L` to `R` (inclusive):

```
sum(L, R) = prefix[R + 1] - prefix[L]
```

Why does this work? `prefix[R + 1]` contains the sum of elements `0..R`. Subtracting `prefix[L]` removes elements `0..L-1`. What remains is exactly the sum of elements `L..R`.

```
nums:     [ 2,  4,  1,  3,  5 ]
prefix:   [ 0,  2,  6,  7, 10, 15 ]

Query: sum(1, 3) — sum of nums[1] + nums[2] + nums[3]

  prefix[4] - prefix[1]
  = 10 - 2
  = 8  ✓  (4 + 1 + 3 = 8)

Visually:

  prefix[4] = nums[0] + nums[1] + nums[2] + nums[3]
            = 2 + 4 + 1 + 3 = 10

  prefix[1] = nums[0]
            = 2

  Difference = nums[1] + nums[2] + nums[3] = 8
```

### 1-Indexed vs 0-Indexed Conventions

There are two common conventions, and confusing them causes the majority of prefix sum bugs:

**Convention A (0-indexed prefix, length n+1):**
```
prefix[0] = 0
prefix[i] = prefix[i-1] + nums[i-1]
sum(L, R) = prefix[R+1] - prefix[L]
```

**Convention B (1-indexed prefix, same length n):**
```
prefix[0] = nums[0]
prefix[i] = prefix[i-1] + nums[i]
sum(L, R) = prefix[R] - prefix[L-1]  (need special case when L = 0)
```

Convention A is superior because it never needs a special case. The extra `prefix[0] = 0` handles the edge case where `L = 0` naturally. Use Convention A. Always.

### Prefix Sums for Counting

Prefix sums aren't just for addition. You can build a prefix count array where each element tracks the running count of some property.

For example, given a binary array `[1, 0, 1, 1, 0, 1]`, you can build a prefix count of 1s:

```
nums:          [ 1,  0,  1,  1,  0,  1 ]
prefix_ones:   [ 0,  1,  1,  2,  3,  3,  4 ]

"How many 1s between index 2 and 5?"
prefix_ones[6] - prefix_ones[2] = 4 - 1 = 3  ✓
```

This idea generalizes to counting characters, counting even numbers, counting elements satisfying any condition — if you can reduce it to a running total, prefix sums apply.

### Running Sum as a Special Case

The "running sum" you've seen in easy problems (LeetCode #1480) is literally just a prefix sum where you overwrite the original array. When someone asks "return the running sum of an array," they're asking you to build a prefix sum in-place.

### The Prefix Sum + Hash Map Combo

Here's where prefix sums go from useful to devastating.

The question "how many subarrays have sum equal to K?" seems like it needs O(n²) brute force. But there's an O(n) solution using this key insight:

If `prefix[j] - prefix[i] = K`, then the subarray from index `i` to `j-1` sums to K.

Rearranging: `prefix[i] = prefix[j] - K`.

So at each index `j`, you ask: "have I seen a prefix sum equal to `prefix[j] - K` before?" A hash map tracking prefix sum frequencies gives you the answer in O(1).

This technique appears in LeetCode #560, #525, #930, #974, and dozens more. Master it today.

## 🔍 Pattern Recognition

**When to use this pattern:**
- The problem asks for the sum (or count) of a contiguous subarray
- You need to answer multiple range queries on a static array
- The brute force involves summing the same elements repeatedly
- You need to find subarrays with a specific sum/property
- The problem involves cumulative properties (count, product, XOR)
- You want to check if any subarray satisfies a condition involving totals

**Keywords in interview questions:**
- "subarray sum"
- "range query" or "sum between indices"
- "cumulative" or "running total"
- "contiguous subarray with sum K"
- "number of subarrays"
- "pivot index" or "equilibrium point"
- "sum of elements between two indices"

**Common traps:**
- Off-by-one errors in the range formula — this is the #1 source of bugs
- Forgetting `prefix[0] = 0` — without it, subarrays starting at index 0 break
- Using prefix sums when the array is modified between queries (use a Fenwick tree instead)
- Not recognizing that prefix XOR works the same way as prefix sum (XOR is its own inverse)
- Overflow: prefix sums of large arrays with large values can overflow 32-bit integers

**What beginners miss:**
- Prefix sums can be built for any associative operation with an inverse: addition, XOR, even multiplication (with care for zeros)
- The hash map combo isn't a separate pattern — it's a direct consequence of the subtraction property `prefix[j] - prefix[i] = K`
- You can use prefix sums on 2D grids too (2D prefix sums), which solves problems like "sum of submatrix" in O(1) per query
- The difference array is the inverse of prefix sums — knowing both unlocks range update operations
- Prefix sums can be applied to strings: prefix frequency arrays let you answer "how many 'a's between index L and R?" in O(1)

**How stronger coders think:**
- They build prefix sums instinctively as a preprocessing step before even reading the queries
- They immediately recognize "subarray sum = K" as a prefix sum + hash map problem, never brute force
- They see prefix sums as a special case of the more general "precomputation to trade space for time" principle
- When they see range queries, they ask: "Is the array static?" If yes → prefix sum. If updates happen → segment tree or BIT
- They think in terms of `prefix[j] - prefix[i]` as representing "the subarray from i to j-1" — this reframing is key
- They know that prefix sum + hash map is the backbone behind problems like Contiguous Array, Subarray Sums Divisible by K, and even some DP transitions

## 💻 Code Example 1: Range Sum Query - Immutable (LeetCode #303)

**Problem:** Given an integer array `nums`, handle multiple queries of the following type: calculate the sum of the elements between indices `left` and `right` inclusive.

```
Input:  nums = [-2, 0, 3, -5, 2, -1]
Query:  sumRange(0, 2) → 1   (-2 + 0 + 3)
Query:  sumRange(2, 5) → -1  (3 + -5 + 2 + -1)
Query:  sumRange(0, 5) → -3  (-2 + 0 + 3 + -5 + 2 + -1)
```

**ASCII Walkthrough — Building the Prefix Array:**

```
nums:     [ -2,  0,  3, -5,  2, -1 ]
index:       0   1   2   3   4   5

Building prefix (length = 7):
┌─────────────────────────────────────────────────┐
│ prefix[0] = 0                         →   0     │
│ prefix[1] = 0 + (-2)                  →  -2     │
│ prefix[2] = -2 + 0                    →  -2     │
│ prefix[3] = -2 + 3                    →   1     │
│ prefix[4] = 1 + (-5)                  →  -4     │
│ prefix[5] = -4 + 2                    →  -2     │
│ prefix[6] = -2 + (-1)                 →  -3     │
└─────────────────────────────────────────────────┘

prefix:   [  0, -2, -2,  1, -4, -2, -3 ]
index:       0   1   2   3   4   5   6

sumRange(0, 2) = prefix[3] - prefix[0] = 1 - 0 = 1        ✓
sumRange(2, 5) = prefix[6] - prefix[2] = -3 - (-2) = -1   ✓
sumRange(0, 5) = prefix[6] - prefix[0] = -3 - 0 = -3      ✓
```

### C++

```cpp
class NumArray {
    vector<int> prefix;
public:
    // Build prefix sum array in O(n)
    NumArray(vector<int>& nums) {
        int n = nums.size();
        prefix.resize(n + 1, 0);         // prefix[0] = 0
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }

    // Answer range sum queries in O(1)
    int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
};
```

### Python

```python
class NumArray:
    def __init__(self, nums: list[int]):
        # Build prefix sum array in O(n)
        n = len(nums)
        self.prefix = [0] * (n + 1)      # prefix[0] = 0
        for i in range(n):
            self.prefix[i + 1] = self.prefix[i] + nums[i]

    def sumRange(self, left: int, right: int) -> int:
        # Answer range sum queries in O(1)
        return self.prefix[right + 1] - self.prefix[left]
```

### Java

```java
class NumArray {
    private int[] prefix;

    // Build prefix sum array in O(n)
    public NumArray(int[] nums) {
        int n = nums.length;
        prefix = new int[n + 1];          // prefix[0] = 0
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }

    // Answer range sum queries in O(1)
    public int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
}
```

### Why This Works

You precompute all cumulative sums once. Every future query becomes a single subtraction. This is the fundamental trade-off of prefix sums: O(n) preprocessing to make unlimited queries O(1).

### Complexity Analysis

- **Time:** O(n) for construction, O(1) per query
- **Space:** O(n) for the prefix array

---

## 💻 Code Example 2: Subarray Sum Equals K (LeetCode #560)

**Problem:** Given an integer array `nums` and an integer `k`, return the total number of subarrays whose sum equals `k`.

This problem is a rite of passage. It separates prefix sum users from prefix sum masters.

**Key Insight:** A subarray `nums[i..j]` has sum K if and only if `prefix[j+1] - prefix[i] = K`. Rearranging: we need `prefix[i] = prefix[j+1] - K`. At each position, count how many previous prefix sums equal the current prefix minus K.

**ASCII Walkthrough:**

```
nums = [1, 1, 1],  k = 2

Step-by-step:
┌────────────────────────────────────────────────────────────────┐
│ Initialize: count = 0, curr_sum = 0, map = {0: 1}             │
│                                                                │
│ i=0: curr_sum = 0+1 = 1                                       │
│      need = 1 - 2 = -1                                        │
│      map[-1]? NO → count stays 0                               │
│      map = {0:1, 1:1}                                          │
│                                                                │
│ i=1: curr_sum = 1+1 = 2                                       │
│      need = 2 - 2 = 0                                         │
│      map[0]? YES, freq=1 → count = 0+1 = 1                    │
│      map = {0:1, 1:1, 2:1}                                    │
│                                                                │
│ i=2: curr_sum = 2+1 = 3                                       │
│      need = 3 - 2 = 1                                         │
│      map[1]? YES, freq=1 → count = 1+1 = 2                    │
│      map = {0:1, 1:1, 2:1, 3:1}                               │
│                                                                │
│ Answer: 2                                                      │
│ Subarrays: [1,1] (index 0-1), [1,1] (index 1-2)              │
└────────────────────────────────────────────────────────────────┘
```

### C++

```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        // Map: prefix_sum → how many times we've seen it
        unordered_map<int, int> prefix_count;
        prefix_count[0] = 1;  // Empty prefix has sum 0 (handles subarrays starting at index 0)

        int curr_sum = 0;
        int count = 0;

        for (int num : nums) {
            curr_sum += num;                       // Running prefix sum
            int need = curr_sum - k;               // What prefix sum would make a valid subarray?
            if (prefix_count.count(need)) {
                count += prefix_count[need];       // Found that many valid subarrays ending here
            }
            prefix_count[curr_sum]++;              // Record current prefix sum
        }

        return count;
    }
};
```

### Python

```python
class Solution:
    def subarraySum(self, nums: list[int], k: int) -> int:
        # Map: prefix_sum → how many times we've seen it
        prefix_count = {0: 1}  # Empty prefix has sum 0

        curr_sum = 0
        count = 0

        for num in nums:
            curr_sum += num                        # Running prefix sum
            need = curr_sum - k                    # What prefix sum would complete a valid subarray?
            count += prefix_count.get(need, 0)     # Add count of matching prefix sums
            prefix_count[curr_sum] = prefix_count.get(curr_sum, 0) + 1  # Record current prefix

        return count
```

### Java

```java
class Solution {
    public int subarraySum(int[] nums, int k) {
        // Map: prefix_sum → how many times we've seen it
        Map<Integer, Integer> prefixCount = new HashMap<>();
        prefixCount.put(0, 1);  // Empty prefix has sum 0

        int currSum = 0;
        int count = 0;

        for (int num : nums) {
            currSum += num;                                        // Running prefix sum
            int need = currSum - k;                                // What prefix sum would work?
            count += prefixCount.getOrDefault(need, 0);            // Count matching prefixes
            prefixCount.put(currSum, prefixCount.getOrDefault(currSum, 0) + 1);  // Record
        }

        return count;
    }
}
```

### Why This Works

Instead of checking all O(n²) subarrays, you recognize that a subarray sum equals K when two prefix sums differ by K. A hash map lets you look up matching prefix sums in O(1). The initialization `{0: 1}` is critical — it accounts for subarrays that start at index 0 (where the entire prefix sum itself equals K).

This is arguably the most important single technique you'll learn in E-Rank. Variations of this exact approach solve at least a dozen LeetCode problems.

### Complexity Analysis

- **Time:** O(n) — single pass with O(1) hash map operations
- **Space:** O(n) — hash map stores at most n+1 distinct prefix sums

## ⚠️ Common Mistakes

1. **Off-by-one errors in the range formula** — The formula `prefix[R+1] - prefix[L]` assumes a 0-indexed `nums` array and a prefix array of length `n+1` starting with `prefix[0] = 0`. If you use `prefix[R] - prefix[L-1]`, you need a special case when `L = 0` because `prefix[-1]` doesn't exist. Pick one convention and stick with it. Convention A (`prefix[R+1] - prefix[L]`) is cleaner and less error-prone.

2. **Not handling subarrays starting at index 0** — In the prefix sum + hash map pattern, the initialization `{0: 1}` is not optional. Without it, any subarray from index 0 to some index j where the total sum equals K will be missed entirely. Think about it: if `curr_sum == k` at some point, then `need = curr_sum - k = 0`. If `0` isn't in your hash map, you won't count this valid subarray. This is the most common bug in LeetCode #560 submissions.

3. **Forgetting that prefix sums don't work with sliding window for negative numbers** — Sliding window assumes that growing the window increases the sum and shrinking it decreases the sum. With negative numbers, this assumption breaks. Prefix sum + hash map handles negative numbers correctly. If the array has negative values and the problem asks about subarray sums, reach for prefix sum + hash map, not sliding window.

4. **Integer overflow in prefix sums** — If the array contains values up to 10⁹ and has up to 10⁵ elements, the prefix sum can reach 10¹⁴, which overflows a 32-bit integer. Use `long long` in C++ or `long` in Java. Python handles big integers natively.

5. **Confusing prefix sum with cumulative frequency** — A prefix count array counts occurrences, while a prefix sum array adds values. The formula is identical, but the semantics differ. When a problem asks "how many elements between L and R satisfy condition X," build a prefix count array where each element is 0 or 1 based on the condition.

## 🏋️ Mini Challenge

**Problem:** Find the Pivot Index (LeetCode #724)

Given an array of integers `nums`, find the pivot index. The pivot index is the index where the sum of all elements strictly to the left equals the sum of all elements strictly to the right. If no such index exists, return -1.

Example: `nums = [1, 7, 3, 6, 5, 6]` → Output: `3` (Left sum = 1+7+3 = 11, Right sum = 5+6 = 11)

**Hint:** The total sum minus the left sum minus the current element gives the right sum. You only need one pass after computing the total.

**Expected approach:** Compute total sum first. Then iterate left to right, maintaining a running left sum. At each index, check if `left_sum == total - left_sum - nums[i]`. If yes, return that index. Time O(n), Space O(1).

## 📚 Practice Problems

| Problem | Difficulty | Platform | Key Pattern |
|---------|-----------|----------|-------------|
| [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) | Medium | LeetCode #238 | Prefix/suffix products |
| [Contiguous Array](https://leetcode.com/problems/contiguous-array/) | Medium | LeetCode #525 | Prefix sum + hash map (transform 0→-1) |
| [Subarray Sums Divisible by K](https://leetcode.com/problems/subarray-sums-divisible-by-k/) | Medium | LeetCode #974 | Prefix sum mod K + hash map |
| [Find Pivot Index](https://leetcode.com/problems/find-pivot-index/) | Easy | LeetCode #724 | Prefix sum left vs right |
| [Range Sum Query 2D - Immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/) | Medium | LeetCode #304 | 2D prefix sums (stretch goal) |
| [Binary Subarrays With Sum](https://leetcode.com/problems/binary-subarrays-with-sum/) | Medium | LeetCode #930 | Prefix sum + hash map on binary array |

---

> **E-Rank Day 5 Complete.** You now command prefix sums — one of the most versatile precomputation patterns in competitive programming. The prefix sum + hash map combo alone will carry you through dozens of interview problems. Tomorrow: the E-Rank Test. Prove what you've learned.
