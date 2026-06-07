# ⚔ Quest: 3Sum

> **Day 7** · [3Sum #15](https://leetcode.com/problems/3sum/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open 3Sum on LeetCode](https://leetcode.com/problems/3sum/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an integer array `nums`, return all unique triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.

The solution set must not contain duplicate triplets.

```
Input:  nums = [-1, 0, 1, 2, -1, -4]
Output: [[-1, -1, 2], [-1, 0, 1]]

Input:  nums = [0, 1, 1]
Output: []
```

---

## 💡 Hints

Brute force uses three nested loops — O(n³) and duplicate nightmares. Sort the array first.

Fix the first element at index `i`, then run **Two Sum II** (left/right pointers) on the subarray starting at `i + 1`. Skip duplicate values at `i`, `left`, and `right`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Multi-Pointer — Fix One + Two-Pointer Sweep (3Sum)

**How to identify this from the problem statement:**
- "three numbers sum to zero" → reduce to: fix one, find a **pair** in the rest
- "all unique triplets" → sort + skip duplicates at every level
- brute force O(n³) → sort enables O(n²) with two pointers

| Keyword / phrase | What it signals |
|---|---|
| "triplets" / "three numbers" | Fix outer index + inner two-pointer |
| "unique" / "no duplicate triplets" | Sort, then skip equal neighbors |
| "sum to zero" (or any target) | Compare `nums[i] + nums[left] + nums[right]` to target |
| unsorted input | Sort first — two-pointer needs order |

**Why this pattern works:** Sorting makes the inner search monotonic: too small → `left++`, too big → `right--`. Fixing `i` ensures each triplet is found once; duplicate skips prevent repeats.

**How a strong solver thinks before coding:**
1. *"Three numbers → fix one, Two Sum on the remainder."*
2. *"Unique triplets → sort, skip dupes at i, left, right."*
3. *"O(n log n) sort + O(n²) sweep — beats O(n³)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Three nested loops** | O(n³); hard to deduplicate triplets |
| **Hash set of triplets** | Still O(n²) pairs + messy dedup; sort+skip is cleaner |
| **Two pointers without sorting** | Moving left/right doesn't monotonically adjust sum |
| **Skip duplicates only at `i`** | Same pair with different left/right dupes still repeats |

**The insight brute force misses:** You don't need to try every `(i, j, k)`. Sort, fix `i`, and the inner two-pointer **walks the remaining array once per `i`** — with duplicate skips baked in.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [3Sum Closest #16](https://leetcode.com/problems/3sum-closest/) | Track closest sum, not exact zero | Fix one + two-pointer |
| [4Sum #18](https://leetcode.com/problems/4sum/) | Fix two outer, two-pointer inner | Multi-pointer nesting |
| [Sort Colors #75](https://leetcode.com/problems/sort-colors/) | Three-way partition | Dutch flag (next quest) |

If you recognized 3Sum, the checkpoint's 3Sum Closest is the same skeleton with a "best so far" variable.

---

## 📖 Walkthrough

Sort: `[-4, -1, -1, 0, 1, 2]`

```
Fix i=0 (val=-4):  left=1, right=5
  -4 + (-1) + 2 = -3 < 0  → left++
  -4 + 0 + 2 = -2 < 0     → left++
  -4 + 1 + 2 = -1 < 0     → left++  (left >= right, stop)

Fix i=1 (val=-1):  left=2, right=5
  -1 + (-1) + 2 = 0  ✓  → [-1, -1, 2]
  skip dup left/right, continue...
  -1 + 0 + 1 = 0  ✓  → [-1, 0, 1]

Fix i=2 (val=-1): skip duplicate at i

Fix i=3 (val=0):  left=4, right=5
  0 + 1 + 2 = 3 > 0  → right--  (done)

Result: [[-1,-1,2], [-1,0,1]]
```

> 💡 **The insight:** After finding a valid triplet, advance `left` and `right` **and** skip past equal values — otherwise the same triplet appears again.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> result;
        int n = nums.size();

        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            int left = i + 1, right = n - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    result.push_back({nums[i], nums[left], nums[right]});
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return result;
    }
};
```

### Python
```python
class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        nums.sort()
        result = []

        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue

            left, right = i + 1, len(nums) - 1
            while left < right:
                total = nums[i] + nums[left] + nums[right]
                if total == 0:
                    result.append([nums[i], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left + 1]:
                        left += 1
                    while left < right and nums[right] == nums[right - 1]:
                        right -= 1
                    left += 1
                    right -= 1
                elif total < 0:
                    left += 1
                else:
                    right -= 1

        return result
```

### Java
```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> result = new ArrayList<>();

        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            int left = i + 1, right = nums.length - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return result;
    }
}
```

**Complexity:** O(n²) time · O(1) extra space (excluding output and sort stack)

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Three numbers sum to target"** → Fix one, Two Sum II on the rest.
- **"All unique triplets"** → Sort first. Skip duplicates at `i`, `left`, and `right`.
- **"This is Two Sum + one outer loop"** → Same family as Day 4's complement hunt, but on a sorted slice.

If you tried three nested loops first, that's the expected trap. The breakthrough is **decomposing k-sum into (k−2) fixed anchors + two-pointer**.

> 🎯 **Pattern Unlocked:** Fix-one + two-pointer sweep. Sort enables monotonic search; duplicate skips ensure uniqueness.

---

*One quest down. Next: three pointers, one pass, three colors. →*
