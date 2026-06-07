# ⚔ Quest: Range Sum Query

> **Day 5** · LeetCode #303 · Easy · 10 min

---

## The Mission

Given an integer array `nums`, handle multiple queries: calculate the sum of elements between indices `left` and `right` inclusive.

```
nums = [-2, 0, 3, -5, 2, -1]
sumRange(0, 2) → 1    (-2 + 0 + 3)
sumRange(2, 5) → -1   (3 + -5 + 2 + -1)
sumRange(0, 5) → -3   (entire array)
```

> 🤔 **Before you scroll:** If you just loop from left to right for each query, that's O(n) per query. With many queries, this adds up. Can you precompute something?

---

## Approach

Build a prefix sum array once. Every query becomes a single subtraction:

```
nums:    [-2,  0,  3, -5,  2, -1]
prefix:  [ 0, -2, -2,  1, -4, -2, -3]

sumRange(0, 2) = prefix[3] - prefix[0] = 1 - 0 = 1       ✓
sumRange(2, 5) = prefix[6] - prefix[2] = -3 - (-2) = -1   ✓
sumRange(0, 5) = prefix[6] - prefix[0] = -3 - 0 = -3      ✓
```

> 💡 **The insight:** O(n) preprocessing, then **O(1) per query** forever. This is the power of precomputation.

---

## Solution

### C++
```cpp
class NumArray {
    vector<int> prefix;
public:
    NumArray(vector<int>& nums) {
        int n = nums.size();
        prefix.resize(n + 1, 0);
        for (int i = 0; i < n; i++)
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
    def __init__(self, nums: list[int]):
        n = len(nums)
        self.prefix = [0] * (n + 1)
        for i in range(n):
            self.prefix[i + 1] = self.prefix[i] + nums[i]

    def sumRange(self, left: int, right: int) -> int:
        return self.prefix[right + 1] - self.prefix[left]
```

### Java
```java
class NumArray {
    private int[] prefix;
    public NumArray(int[] nums) {
        int n = nums.length;
        prefix = new int[n + 1];
        for (int i = 0; i < n; i++)
            prefix[i + 1] = prefix[i] + nums[i];
    }
    public int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
}
```

**Complexity:** O(n) build · O(1) per query · O(n) space

> 🎯 **Pattern Unlocked:** Prefix sum precomputation for O(1) range queries. The formula `prefix[R+1] - prefix[L]` will become muscle memory.

---

*Next: the most important technique in E-Rank — prefix sums meet hash maps. →*
