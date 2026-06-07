# ⚔ D-Rank Test — Problem 1

> [3Sum Closest #16](https://leetcode.com/problems/3sum-closest/) · Medium · 100 XP

---

You've completed 5 days of pointer training. Now prove your builder skills.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open 3Sum Closest on LeetCode](https://leetcode.com/problems/3sum-closest/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real LeetCode practice. No peeking until you've genuinely tried.

---

## The Problem

Given an integer array `nums` and an integer `target`, return the **sum of the three integers** in `nums` whose sum is **closest to** `target`. You may assume each input has exactly one solution.

```
Input:  nums = [-1, 2, 1, -4], target = 1
Output: 2
Explanation: The sum closest to 1 is 2 (-1 + 2 + 1 = 2).

Input:  nums = [0, 0, 0], target = 1
Output: 0
Explanation: The sum closest to 1 is 0 (0 + 0 + 0 = 0).
```

---

## 💡 Hints

> 🎯 **What's being tested:** Multi-pointer technique (Day 7) — sort first, fix one element, then use opposite-end two pointers on the remainder.

Sort the array. For each index `i`, run converging two pointers on `i+1` and `n-1`. Track the sum closest to `target`. Move `left` if sum is too small, `right` if too large.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Sort + Fix-One + Opposite-End Two Pointers (Day 6 + Day 7)

| Clue in the problem | What it signals |
|---|---|
| "three integers" / "triplet" | Multi-pointer — fix one, search pair for the rest |
| "closest to target" | Track best candidate, not exact match |
| unsorted array with sum constraint | Sort first to enable two-pointer movement |
| "sum" of multiple elements | Pointer convergence replaces nested loops |
| exactly one solution | No tie-breaking edge cases on output |

**How to identify from the statement:** "Three numbers" + "closest sum" = **3Sum family**. The only difference from classic 3Sum is you track the minimum distance to target instead of collecting exact zeros.

**How a strong solver thinks before coding:**
1. *"Three numbers → sort, fix i, two pointers on the rest."*
2. *"Closest, not exact → maintain a running best, compare abs differences."*
3. *"Sum too small → move left up. Too large → move right down."*
4. *"If sum == target, return immediately — can't get closer."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Three nested loops checking every triplet** | O(n³) — re-walks the same pairs for every anchor |
| **Two nested loops + hash map for third** | O(n²) — works but misses the two-pointer O(n²) with O(1) extra space |
| **Two pointers without sorting** | Pointers can't move directionally — you don't know which way to advance |
| **Sort but scan linearly for the other two** | O(n³) — sorting helps only if paired with converging pointers |

**The insight brute force misses:** After sorting, fixing `nums[i]` reduces the problem to **Two Sum II on the sorted remainder**. Opposite-end pointers eliminate the inner loop — each pointer moves at most n times across all iterations.

---

## 🎯 Transfer to Unseen Problems

Can you spot the fix-one + two-pointer combo without the word "closest"?

**Scenario 1:** *"Given a sorted array, find two numbers that sum to target. Return their indices."*

Which pattern? **Opposite-end two pointers** (Day 6). Two numbers, sorted data — pure converging pointers, no outer loop needed.

**Scenario 2:** *"Given an array, return all unique triplets that sum to zero."*

Which pattern? **Sort + fix-one + two pointers** (Day 7). Same skeleton as 3Sum Closest — collect matches instead of tracking closest.

**Scenario 3:** *"Given four integers in an array, find a quadruplet summing to target."*

Which pattern? **Fix-two + two pointers** (Day 7 extension). Two outer loops, two pointers on the remainder — O(n³) instead of O(n⁴).

> **Answer key:** All three → multi-pointer family. "Two numbers on sorted" = Day 6 only. "Three or more" = fix outer element(s), two pointers inside. The *closest vs exact* distinction changes the exit condition, not the skeleton.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

### Walkthrough

Sort the array. For each index `i`, run converging two pointers on `i+1` and `n-1`. Track the sum closest to `target`.

```
nums = [-1, 2, 1, -4], target = 1
sorted: [-4, -1, 1, 2]

i=0 (-4): left=1(-1), right=3(2)
  sum = -4 + (-1) + 2 = -3  → closest = -3
  sum < target → left++

  sum = -4 + 1 + 2 = -1  → closest = -1 (|−1−1| = 2 < |−3−1| = 4)
  sum < target → left++

i=1 (-1): left=2(1), right=3(2)
  sum = -1 + 1 + 2 = 2  → closest = 2 (|2−1| = 1 < |−1−1| = 2) ✓

Answer: 2
```

### C++
```cpp
class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        int closest = nums[0] + nums[1] + nums[2];
        for (int i = 0; i < n - 2; i++) {
            int left = i + 1, right = n - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (abs(sum - target) < abs(closest - target))
                    closest = sum;
                if (sum < target) left++;
                else if (sum > target) right--;
                else return sum;
            }
        }
        return closest;
    }
};
```

### Python
```python
class Solution:
    def threeSumClosest(self, nums: list[int], target: int) -> int:
        nums.sort()
        n = len(nums)
        closest = nums[0] + nums[1] + nums[2]
        for i in range(n - 2):
            left, right = i + 1, n - 1
            while left < right:
                total = nums[i] + nums[left] + nums[right]
                if abs(total - target) < abs(closest - target):
                    closest = total
                if total < target:
                    left += 1
                elif total > target:
                    right -= 1
                else:
                    return total
        return closest
```

### Java
```java
class Solution {
    public int threeSumClosest(int[] nums, int target) {
        Arrays.sort(nums);
        int n = nums.length;
        int closest = nums[0] + nums[1] + nums[2];
        for (int i = 0; i < n - 2; i++) {
            int left = i + 1, right = n - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (Math.abs(sum - target) < Math.abs(closest - target))
                    closest = sum;
                if (sum < target) left++;
                else if (sum > target) right--;
                else return sum;
            }
        }
        return closest;
    }
}
```

**Complexity:** O(n²) time · O(1) extra space (sorting may use O(log n) stack)

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Three integers"** → Multi-pointer. Fix one, two-pointer the rest.
- **"Closest to target"** → Track best candidate with `abs(sum - target)`, not exact match.
- **"I studied 3Sum on Day 7"** → Same skeleton — only the exit condition changes.

If you tried brute force first, sort + two pointers cuts O(n³) to O(n²). That's the D-Rank upgrade.

---

*1 of 3 test problems. Continue to the next. →*
