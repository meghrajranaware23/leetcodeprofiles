<!-- hand-authored -->
# ⚔ E-Rank Test — Problem 1

> [Range Sum Query - Immutable #303](https://leetcode.com/problems/range-sum-query-immutable/) · Easy · 100 XP

---

You've completed your E-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Range Sum Query - Immutable on LeetCode](https://leetcode.com/problems/range-sum-query-immutable/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. The array never changes; queries repeat. Ask: *"What can I precompute once?"*

---

## The Problem

See the full problem statement on LeetCode: **[Range Sum Query - Immutable #303](https://leetcode.com/problems/range-sum-query-immutable/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Prefix accumulation** — cousin of tabulation, not classic "choices at each step" DP. You build a table once, answer queries in O(1).

**Hint 1:** Define `prefix[i]` = sum of `nums[0..i-1]` (or sum of first i elements). `prefix[0] = 0`.

**Hint 2:** Build in constructor: `prefix[i+1] = prefix[i] + nums[i]` — one left-to-right pass (Day 3 fill order).

**Hint 3:** Query `[left, right]` inclusive: `prefix[right+1] - prefix[left]`. No loop per query.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Prefix Sum Preprocessing (E-Rank tabulation cousin)

**How to identify from the statement:**
- Array **immutable** — build once, many queries
- Range sum repeated — O(1) per query after O(n) build
- Not overlapping subproblems — no memo on a recurrence tree

**How a strong solver thinks before coding:**
1. *"Many queries → precompute."*
2. *"prefix[i] = cumulative sum — Day 3 bottom-up on one dimension."*
3. *"Range sum = difference of two prefix values."*
4. *"Not Fib, not Kadane — still table-filling mindset."*

**E-Rank connection:** Day 3 tabulation taught **fill left-to-right**; prefix array is the simplest "dp" table where `prefix[i]` depends on `prefix[i-1]`.

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Sum left..right per query** | O(n) per query — TLE with many queries |
| **Recompute from scratch each time** | Ignores immutability |
| **Prefix array once** | O(n) build + O(1) query ✓ |

**The insight:** Classic DP overlap isn't here — but **precomputed cumulative state** is the same engineering instinct as tabulation.

---

## 🎯 Transfer to Unseen Problems

*"Static array, many range aggregate queries (sum, min with sparse table, etc.)."*

If data doesn't change → **preprocess a table** in O(n) or O(n log n), query fast.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Fill the DP table for the given example. Trace which cells each cell depends on. Then implement the transition.

### C++
```cpp
class NumArray {
    vector<int> prefix;
public:
    NumArray(vector<int>& nums) {
        prefix.resize(nums.size() + 1, 0);
        for (int i = 0; i < (int)nums.size(); i++)
            prefix[i + 1] = prefix[i] + nums[i];
    }
    int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
};
```

### Python
```python
class NumArray:
    def __init__(self, nums: List[int]):
        self.prefix = [0]
        for num in nums:
            self.prefix.append(self.prefix[-1] + num)
    def sumRange(self, left: int, right: int) -> int:
        return self.prefix[right + 1] - self.prefix[left]
```

### Java
```java
class NumArray {
    int[] prefix;
    public NumArray(int[] nums) {
        prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++)
            prefix[i + 1] = prefix[i] + nums[i];
    }
    public int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
}
```

**Complexity:** O(n) build time · O(1) query time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Immutable + many queries"** → Precompute prefix — not classic recurrence DP.
- **"prefix[i+1]-prefix[left]"** → Same tabulation instinct as Day 3.
- **"Constructor = fill table; sumRange = read answer cell"** → Framework checklist applies.
- **"Not every E-Rank problem is Fib"** → Pattern recognition over memorization.

---

*1 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class NumArray {
    vector<int> prefix;
public:
    NumArray(vector<int>& nums) {
        prefix.resize(nums.size() + 1, 0);
        for (int i = 0; i < (int)nums.size(); i++)
            prefix[i + 1] = prefix[i] + nums[i];
    }
    int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
};
```

### Python
```python
class NumArray:
    def __init__(self, nums: List[int]):
        self.prefix = [0]
        for num in nums:
            self.prefix.append(self.prefix[-1] + num)
    def sumRange(self, left: int, right: int) -> int:
        return self.prefix[right + 1] - self.prefix[left]
```

### Java
```java
class NumArray {
    int[] prefix;
    public NumArray(int[] nums) {
        prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++)
            prefix[i + 1] = prefix[i] + nums[i];
    }
    public int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
}
```

**Complexity:** O(n) build time · O(1) query time · O(n) space
