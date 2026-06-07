# ⚔ Quest: Sort Colors

> **Day 7** · [Sort Colors #75](https://leetcode.com/problems/sort-colors/) · Medium · 12 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Sort Colors on LeetCode](https://leetcode.com/problems/sort-colors/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an array `nums` with `n` objects colored red, white, or blue (represented as `0`, `1`, and `2`), sort them **in-place** so that objects of the same color are adjacent, in order `0`, `1`, `2`.

You must solve it without using the library's sort function — one pass preferred.

```
Input:  nums = [2, 0, 2, 1, 1, 0]
Output: [0, 0, 1, 1, 2, 2]

Input:  nums = [2, 0, 1]
Output: [0, 1, 2]
```

---

## 💡 Hints

Counting sort (count 0s, 1s, 2s, rewrite) works in two passes — but the interview wants **one pass, O(1) space**.

Think **Dutch National Flag**: three pointers define three zones. `mid` scans the unknown region; swap 0s to the front, 2s to the back, leave 1s in the middle.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Multi-Pointer — Dutch National Flag (Three-Way Partition)

**How to identify this from the problem statement:**
- "sort 0s, 1s, 2s" / "three colors" → exactly three buckets
- "in-place" / "one pass" → no extra array; three pointers maintain zones
- small fixed domain (3 values) → counting works, but Dutch flag is the elegant O(n) one-pass

| Keyword / phrase | What it signals |
|---|---|
| "0, 1, 2" / "three colors" | Dutch National Flag |
| "in-place" / "without library sort" | Pointer partition, not `sort()` |
| "one pass" | Single scan with low/mid/high |
| "maintain relative order" (not here) | Dutch flag doesn't preserve order — problem doesn't require it |

**Why this pattern works:** Three invariants hold at all times:
- `[0 .. low-1]` = all 0s
- `[low .. mid-1]` = all 1s
- `[high+1 .. n-1]` = all 2s
- `[mid .. high]` = unprocessed

Each swap shrinks the unknown zone.

**How a strong solver thinks before coding:**
1. *"Three values, in-place → Dutch National Flag."*
2. *"low/mid/high — same family as Move Zeroes, but three buckets."*
3. *"Don't advance mid after swapping with high — re-examine new value."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Library sort** | O(n log n) — problem asks for O(n) one-pass |
| **Two-pass counting** | Works but not one pass; misses the pointer technique |
| **Two-pointer (like Move Zeroes)** | Only partitions into two groups — can't place 1s in the middle |
| **Advancing `mid` after high swap** | Skips unexamined element pulled from the back |

**The insight brute force misses:** You don't need to know final positions upfront. Maintain **three zone boundaries** and swap each element into its correct region as `mid` walks forward.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Move Zeroes #283](https://leetcode.com/problems/move-zeroes/) | Two groups (non-zero / zero) | Read-write variant of partition |
| [3Sum #15](https://leetcode.com/problems/3sum/) | Search, not partition | Multi-pointer (previous quest) |
| [Wiggle Sort II #324](https://leetcode.com/problems/wiggle-sort-ii/) | Median + three-way split | Dutch flag as sub-step (C-Rank) |

Sort Colors is the canonical three-pointer partition — the template for any "split into k groups in one pass" problem with small k.

---

## 📖 Walkthrough

`nums = [2, 0, 2, 1, 1, 0]` — start `low=0, mid=0, high=5`

```
Step 1: mid=0, val=2 → swap(mid, high), high--
        [0, 0, 2, 1, 1, 2]   low=0, mid=0, high=4  (mid stays — new val at mid)

Step 2: mid=0, val=0 → swap(low, mid), low++, mid++
        [0, 0, 2, 1, 1, 2]   low=1, mid=1, high=4

Step 3: mid=1, val=0 → swap(low, mid), low++, mid++
        [0, 0, 2, 1, 1, 2]   low=2, mid=2, high=4

Step 4: mid=2, val=2 → swap(mid, high), high--
        [0, 0, 1, 1, 2, 2]   low=2, mid=2, high=3

Step 5: mid=2, val=1 → mid++
        [0, 0, 1, 1, 2, 2]   low=2, mid=3, high=3

Step 6: mid=3, val=1 → mid++
        mid > high → done ✓
```

> 💡 **The insight:** Only advance `mid` when you see a `1`, or after swapping a `0` forward. When you swap a `2` to the back, the new value at `mid` hasn't been classified yet.

---

## Solution

### C++
```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int low = 0, mid = 0, high = nums.size() - 1;

        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums[low], nums[mid]);
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums[mid], nums[high]);
                high--;
            }
        }
    }
};
```

### Python
```python
class Solution:
    def sortColors(self, nums: list[int]) -> None:
        low, mid, high = 0, 0, len(nums) - 1

        while mid <= high:
            if nums[mid] == 0:
                nums[low], nums[mid] = nums[mid], nums[low]
                low += 1
                mid += 1
            elif nums[mid] == 1:
                mid += 1
            else:
                nums[mid], nums[high] = nums[high], nums[mid]
                high -= 1
```

### Java
```java
class Solution {
    public void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;

        while (mid <= high) {
            if (nums[mid] == 0) {
                int temp = nums[low];
                nums[low] = nums[mid];
                nums[mid] = temp;
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                int temp = nums[mid];
                nums[mid] = nums[high];
                nums[high] = temp;
                high--;
            }
        }
    }
}
```

**Complexity:** O(n) time · O(1) space

---

## 💭 What Should Have Clicked in Your Mind?

- **"Three values, in-place, one pass"** → Dutch National Flag — not generic sort.
- **"Move Zeroes had two zones"** → This has three: 0s front, 1s middle, 2s back.
- **"Swap with high but don't mid++"** → The pulled-in element might be 0, 1, or 2 — must re-check.

If you used counting sort, that's valid — but the interview pattern is **three coordinated pointers maintaining invariants**.

> 🎯 **Pattern Unlocked:** Dutch National Flag — low/mid/high partition. One scan, O(1) space, three groups.

---

*Two quests down. Checkpoint time — can you spot multi-pointer signals on new problems? →*
