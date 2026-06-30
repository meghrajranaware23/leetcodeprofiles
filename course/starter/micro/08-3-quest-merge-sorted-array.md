<!-- hand-authored -->
# ⚔ Quest: Merge Sorted Array

> **Day 8** · [Merge Sorted Array #88](https://leetcode.com/problems/merge-sorted-array/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Merge Sorted Array on LeetCode](https://leetcode.com/problems/merge-sorted-array/)**

> ⚔ **Mentor's rule:** Attempt 5 min first. After editorial: one journal sentence — why forward merge fails.

---

## The Problem

Merge `nums2` into `nums1` in-place. `nums1` has size `m+n` with first `m` elements filled.

**Example:** `nums1 = [1,2,3,0,0,0], m=3`, `nums2 = [2,5,6], n=3` → `[1,2,2,3,5,6]`

---

## 💡 Hints

1. Forward merge overwrites unmerged data — editorial often merges from **end**
2. Three pointers: `i=m-1`, `j=n-1`, `k=m+n-1`
3. Place larger at `nums1[k]`, decrement
4. Trace Example on paper backward

---

## Solution

### C++
```cpp
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int i = m - 1, j = n - 1, k = m + n - 1;
        while (j >= 0) {
            if (i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
            else nums1[k--] = nums2[j--];
        }
    }
};
```

### Python
```python
class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        i, j, k = m - 1, n - 1, m + n - 1
        while j >= 0:
            if i >= 0 and nums1[i] > nums2[j]:
                nums1[k] = nums1[i]; i -= 1
            else:
                nums1[k] = nums2[j]; j -= 1
            k -= 1
```

### Java
```java
class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int i = m - 1, j = n - 1, k = m + n - 1;
        while (j >= 0) {
            if (i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
            else nums1[k--] = nums2[j--];
        }
    }
}
```

**Complexity:** O(m+n) time · O(1) space
---

## 💭 What a Mentor Would Tell You

- *"Backward merge was the editorial insight — I wrote one sentence why forward fails."*
- *"Three pointers from the end — `i`, `j`, `k` — trace on paper before coding."*
- *"Editorial protocol: idea only, close tab, re-solve tomorrow."*

> 🎯 **Skill practiced:** Approach Comparison

---

*Two quests down. Move to today's checkpoint. →*
