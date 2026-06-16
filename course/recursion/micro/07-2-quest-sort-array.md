<!-- hand-authored -->
# ⚔ Quest: Sort an Array

> **Day 7** · [Sort an Array #912](https://leetcode.com/problems/sort-an-array/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Sort an Array on LeetCode](https://leetcode.com/problems/sort-an-array/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the split tree for `[5,2,4,1]`. The hints below are for *after* your attempt.

---

## The Problem

Given an array of integers `nums`, sort the array in **ascending order** and return it. You must solve it in **O(n log n)** time.

```
Input:  nums = [5, 2, 3, 1]
Output: [1, 2, 3, 5]

Input:  nums = [5, 1, 1, 2, 0, 0]
Output: [0, 0, 1, 1, 2, 5]
```

---

## 💡 Hints

Which pattern from today's concept applies? **Merge sort recursion** — split at mid, sort both halves, merge.

If you're stuck after 5 minutes: base case is one element (`lo >= hi`). Combine is the merge loop comparing two fronts.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Merge Sort Recursion

**How to identify this from the problem statement:**
- "Sort array" + O(n log n) → merge sort is the classic recursive sort
- Implicit **split at midpoint** → two equal-ish subarrays
- **Combine** step merges two sorted halves into one

| Keyword / phrase | What it signals |
|---|---|
| "sort" / "ascending order" | Merge or quicksort D&C |
| "O(n log n)" required | Merge sort fits |
| "divide" / split array | `mid`, recurse `[lo,mid]` and `[mid+1,hi]` |
| "merge" / combine halves | Two-pointer merge into temp |

**Why this pattern works:** Sorted arrays merge in O(n). Two levels of log n splits → O(n log n) total.

**How a strong solver thinks before coding:**
1. *"Base: lo >= hi — subarray of size 0 or 1 is sorted."*
2. *"Recurse both halves before merge — they must be sorted first."*
3. *"Merge: compare fronts, write smaller, advance pointer."*
4. *"Reuse one temp array sized n."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Bubble / insertion sort** | O(n²) — fails time requirement |
| **Sort only left, forget right** | Half unsorted — merge can't fix arbitrary order |
| **Merge without temp buffer** | Shifting in-place during merge is O(n²) |
| **Built-in sort in interview** | Misses the D&C lesson — know merge skeleton |

**The insight brute force misses:** Sorting is **combine-heavy**. Children must return fully sorted halves; merge is linear glue.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Sort an Array #912](https://leetcode.com/problems/sort-an-array/) | Full array sort | Split, sort, merge |
| [Merge k Sorted Lists #23](https://leetcode.com/problems/merge-k-sorted-lists/) | Many lists | Merge pairs recursively |
| [Count of Smaller Numbers After Self #315](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) | Merge with counting | Merge step records cross pairs |
| [Reverse Pairs #493](https://leetcode.com/problems/reverse-pairs/) | Similar merge count | D&C + merge variant |

---

## 📖 Walkthrough

`nums = [5, 2, 4, 1]` — indices 0..3:

```
SPLIT TREE:

       sort(0,3)
      /        \
 sort(0,1)   sort(2,3)
  /    \      /    \
[5]   [2]  [4]   [1]

MERGE UP:

merge(0,1): [5],[2] → compare 5>2 → [2,5]
merge(2,3): [4],[1] → [1,4]
merge(0,3): [2,5] + [1,4]
  i→2 j→1: pick 1 → [1]
  i→2 j→4: pick 2 → [1,2]
  i→5 j→4: pick 4 → [1,2,4]
  i→5 done: append 5 → [1,2,4,5] ✓
```

Merge frame detail `[2,5]` + `[1,4]`:

```
tmp:  [2,5,1,4]  (copy slice)
i=0→2, j=2→1, k=0
  tmp[0]=2 vs tmp[2]=1 → nums[0]=1, j++
  tmp[0]=2 vs tmp[3]=4 → nums[1]=2, i++
  tmp[1]=5 vs tmp[3]=4 → nums[2]=4, j++
  append 5 → nums[3]=5
```

> 💡 **The insight:** Recursion sorts; merge **combines**. Never merge before children return.

---

## Solution

### C++
```cpp
class Solution {
    void merge(vector<int>& a, int lo, int mid, int hi, vector<int>& tmp) {
        int i = lo, j = mid + 1, k = lo;
        while (i <= mid && j <= hi)
            tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++];
        while (i <= mid) tmp[k++] = a[i++];
        while (j <= hi) tmp[k++] = a[j++];
        for (int t = lo; t <= hi; t++) a[t] = tmp[t];
    }
    void sort(vector<int>& a, int lo, int hi, vector<int>& tmp) {
        if (lo >= hi) return;
        int mid = lo + (hi - lo) / 2;
        sort(a, lo, mid, tmp);
        sort(a, mid + 1, hi, tmp);
        merge(a, lo, mid, hi, tmp);
    }
public:
    vector<int> sortArray(vector<int>& nums) {
        vector<int> tmp(nums.size());
        sort(nums, 0, nums.size() - 1, tmp);
        return nums;
    }
};
```

### Python
```python
class Solution:
    def sortArray(self, nums: List[int]) -> List[int]:
        def merge(lo, mid, hi):
            tmp = nums[lo:hi + 1]
            i, j, k = 0, mid - lo + 1, lo
            while i <= mid - lo and j <= hi - lo:
                if tmp[i] <= tmp[j]:
                    nums[k] = tmp[i]; i += 1
                else:
                    nums[k] = tmp[j]; j += 1
                k += 1
            while i <= mid - lo:
                nums[k] = tmp[i]; i += 1; k += 1
            while j <= hi - lo:
                nums[k] = tmp[j]; j += 1; k += 1
        def sort(lo, hi):
            if lo >= hi: return
            mid = (lo + hi) // 2
            sort(lo, mid); sort(mid + 1, hi); merge(lo, mid, hi)
        sort(0, len(nums) - 1)
        return nums
```

### Java
```java
class Solution {
    public int[] sortArray(int[] nums) {
        int[] tmp = new int[nums.length];
        sort(nums, 0, nums.length - 1, tmp);
        return nums;
    }
    private void sort(int[] a, int lo, int hi, int[] tmp) {
        if (lo >= hi) return;
        int mid = lo + (hi - lo) / 2;
        sort(a, lo, mid, tmp);
        sort(a, mid + 1, hi, tmp);
        merge(a, lo, mid, hi, tmp);
    }
    private void merge(int[] a, int lo, int mid, int hi, int[] tmp) {
        int i = lo, j = mid + 1, k = lo;
        while (i <= mid && j <= hi) tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++];
        while (i <= mid) tmp[k++] = a[i++];
        while (j <= hi) tmp[k++] = a[j++];
        for (int t = lo; t <= hi; t++) a[t] = tmp[t];
    }
}
```

**Complexity:** O(n log n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Sort in O(n log n)"** → Merge sort D&C — split, sort halves, merge.
- **"Base: one element"** → `lo >= hi` return immediately.
- **"Merge compares two sorted fronts"** → Two pointers, write to temp, copy back.
- **"Two recursive calls"** → Both halves must be sorted before combine.

If you tried bubble sort first, that's fine — the breakthrough is **split tree + merge combine** on paper.

> 🎯 **Pattern Unlocked:** Merge sort divide-and-conquer — split at mid, conquer both halves, merge sorted results.

---

*One quest down. Next: max subarray with a cross-midpoint combine. →*
