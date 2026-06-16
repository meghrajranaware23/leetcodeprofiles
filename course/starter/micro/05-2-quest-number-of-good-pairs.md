<!-- hand-authored -->
# ⚔ Quest: Number of Good Pairs

> **Day 5** · [Number of Good Pairs #1512](https://leetcode.com/problems/number-of-good-pairs/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

**[→ Open Number of Good Pairs on LeetCode](https://leetcode.com/problems/number-of-good-pairs/)**

> ⚔ **5-minute timer.** Write brute force on paper first.

---

## The Problem

Pair `(i,j)` is good if `nums[i] == nums[j]` and `i < j`. Return count.

**Example 1:** `nums = [1,2,3,1,1,3]` → `4`

**Example 2:** `nums = [1,1,1,1]` → `6`

**Example 3:** `nums = [1,2,3]` → `0`

**Constraints:** `1 <= nums.length <= 100` — brute force O(n²) fits

---

## 💡 Hints

1. **Brute force:** nested loops, count pairs where `nums[i]==nums[j]` and `i<j`
2. Trace Example 1: pairs at indices (0,3), (0,4), (3,4), (2,5) → 4
3. Example 2: four 1s → C(4,2) = 6 pairs
4. Optimize later: track counts as you scan (optional after brute force AC)

---

## 📖 Walkthrough — Example 1

```
nums = [1,2,3,1,1,3]
index:  0 1 2 3 4 5

Equal pairs (i<j):
(0,3) both 1
(0,4) both 1
(3,4) both 1
(2,5) both 3
→ 4 pairs
```

**Plain English (brute force):** Try every pair; count matches.

---

## Solution

### C++
```cpp
class Solution {
public:
    int numIdenticalPairs(vector<int>& nums) {
        unordered_map<int,int> cnt;
        long long ans = 0;
        for (int n : nums) {
            ans += cnt[n];
            cnt[n]++;
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def numIdenticalPairs(self, nums: List[int]) -> int:
        cnt = {}
        ans = 0
        for n in nums:
            ans += cnt.get(n, 0)
            cnt[n] = cnt.get(n, 0) + 1
        return ans
```

### Java
```java
class Solution {
    public int numIdenticalPairs(int[] nums) {
        Map<Integer, Integer> cnt = new HashMap<>();
        int ans = 0;
        for (int n : nums) {
            ans += cnt.getOrDefault(n, 0);
            cnt.put(n, cnt.getOrDefault(n, 0) + 1);
        }
        return ans;
    }
}
```

**Complexity:** O(n) time · O(n) space
---

## 💭 What a Mentor Would Tell You

- *"I double-looped first — it worked. Then I saw the count pattern."*
- *"Brute force AC today is a win; I'll optimize on review."*

> 🎯 **Skill practiced:** Brute Force First

---

*One quest down. The next one builds on this skill. →*
