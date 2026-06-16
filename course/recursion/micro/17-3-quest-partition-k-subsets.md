<!-- hand-authored -->
# ⚔ Quest: Partition to K Equal Sum Subsets

> **Day 17** · [Partition to K Equal Sum Subsets #698](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Partition to K Equal Sum Subsets on LeetCode](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/)**

> ⚔ **Hunter's rule:** Compute `target = sum/k` first. Trace placing `[4,3,2,3,5,2,1]` into 4 buckets on paper. Mark every overflow prune.

---

## The Problem

Given an integer array `nums` and an integer `k`, return `true` if it is possible to divide this array into **k non-empty subsets** whose sums are all **equal**.

```
Input:  nums = [4, 3, 2, 3, 5, 2, 1], k = 4
Output: true
Explanation: [5], [1,4], [2,3], [2,3]
```

```
Input:  nums = [1, 2, 3, 4], k = 3
Output: false
```

**Constraints:** `1 <= k <= nums.length <= 16`, `0 < nums[i] < 10000`

---

## 💡 Hints

**Hint 1:** If `sum % k != 0`, return false immediately — equal integer partitions are impossible.

**Hint 2:** `target = sum / k`. Maintain `k` bucket sums in array `sides[]`. Place `nums[i]` into bucket `j`, recurse on `i+1`.

**Hint 3:** Prune: `if (sides[j] + nums[i] > target) continue` — never explore an overflowing bucket.

**Hint 4:** Skip duplicate empty buckets: `if (j > 0 && sides[j] == sides[j-1]) continue` — buckets are unlabeled.

**Hint 5:** Sort `nums` descending — fail fast on large numbers that cannot fit.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** K-Bucket Assignment with Target-Sum Pruning

**How to identify this from the problem statement:**
- "Divide into k subsets" / "equal sums" → k buckets each capped at `target`
- Boolean existence, not enumeration → return true on first valid fill
- Each element used exactly once → forward index `i`, no reuse

| Keyword / phrase | What it signals |
|---|---|
| "partition into k subsets" | Bucket assignment backtracking |
| "equal sum" / "same sum" | `target = total / k` |
| "non-empty subsets" | Each bucket must reach exactly `target` at end |
| "can you divide" | Early false if `sum % k != 0` |
| combination sum + k groups | Day 13 sum tracking, but k parallel buckets |

**Why this pattern works:** Placing one element per recursive level keeps state small: `(i, sides[])`. Overflow prune and empty-bucket dedup cut most of the `k^n` tree.

**How a strong solver thinks before coding:**
1. *"sum % k → impossible? return false."*
2. *"Sort descending, target = sum/k, sides[k] = {0}."*
3. *"For each bucket j: if overflow skip; if duplicate empty skip."*
4. *"Choose → sides[j]+=nums[i] → dfs(i+1) → undo."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Assign each element to bucket 0..k-1 blindly** | `O(k^n)` — no overflow prune |
| **Generate all subsets of size n/k, repeat k times** | Ordering and overlap — hard to enforce disjoint cover |
| **Label buckets distinctly without skip-dedup** | Same partition explored k! times |
| **Place smallest numbers first** | Large late numbers fail after deep search — sort desc instead |
| **Greedy: always fill lowest bucket** | Greedy placement can fail when backtracking needed |

**The insight brute force misses:** Prune when `sides[j] + nums[i] > target`, skip symmetric empty buckets, and sort large-first to kill impossible branches at the root.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Partition to K Equal Sum Subsets #698](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/) | k buckets | Overflow prune + bucket dedup |
| [Partition Equal Subset Sum #416](https://leetcode.com/problems/partition-equal-subset-sum/) | k=2 special case | Subset-sum DP or 2-bucket backtrack |
| [Matchsticks to Square #473](https://leetcode.com/problems/matchsticks-to-square/) | k=4 fixed | Same bucket template (Day 19) |
| [Combination Sum #39](https://leetcode.com/problems/combination-sum/) | One target, reuse | Single-bucket sum (Day 13) |

If you recognized k-bucket fill, you already have the skeleton for matchsticks and partition variants later in B-Rank.

---

## 📖 Walkthrough

`nums = [4, 3, 2, 3, 5, 2, 1], k = 4, target = 5` (sorted desc: `[5,4,3,3,2,2,1]`):

```
sides = [0,0,0,0]

Place 5 → sides[0]=5  (full bucket 0)
Place 4 → sides[1]=4
Place 3 → sides[1]=7 > 5 ✗ PRUNE
         sides[2]=3
Place 3 → sides[2]=6 > 5 ✗
         sides[3]=3
Place 2 → sides[1]=4+2=6 ✗
         sides[2]=3+2=5 ✓  (bucket 2 full)
Place 2 → sides[1]=4+2=6 ✗
         sides[3]=3+2=5 ✓  (bucket 3 full)
Place 1 → sides[1]=4+1=5 ✓  (bucket 1 full)

All sides == 5 → return true
```

Skip-dedup example — `sides = [0,0,0,0]`, placing first element:

```
Try j=0: sides[0]=4  → explore
Try j=1: sides[1]==sides[0]==0 → SKIP (same as j=0)
Try j=2: skip (empty duplicate)
Try j=3: skip (empty duplicate)
```

> 💡 **The insight:** Combination sum finds **one** group summing to target. This finds **k disjoint groups** each summing to target — same overflow prune, multiplied buckets.

---

## Solution

### C++
```cpp
class Solution {
    bool dfs(vector<int>& nums, vector<int>& sides, int i, int target) {
        if (i == (int)nums.size()) {
            for (int s : sides) if (s != target) return false;
            return true;
        }
        for (int j = 0; j < (int)sides.size(); j++) {
            if (sides[j] + nums[i] > target) continue;
            if (j > 0 && sides[j] == sides[j - 1]) continue;
            sides[j] += nums[i];
            if (dfs(nums, sides, i + 1, target)) return true;
            sides[j] -= nums[i];
        }
        return false;
    }
public:
    bool canPartitionKSubsets(vector<int>& nums, int k) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum % k) return false;
        sort(nums.rbegin(), nums.rend());
        vector<int> sides(k);
        return dfs(nums, sides, 0, sum / k);
    }
};
```

### Python
```python
class Solution:
    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
        total = sum(nums)
        if total % k: return False
        target = total // k
        nums.sort(reverse=True)
        sides = [0] * k
        def dfs(i):
            if i == len(nums):
                return all(s == target for s in sides)
            for j in range(k):
                if sides[j] + nums[i] > target: continue
                if j and sides[j] == sides[j - 1]: continue
                sides[j] += nums[i]
                if dfs(i + 1): return True
                sides[j] -= nums[i]
            return False
        return dfs(0)
```

### Java
```java
class Solution {
    public boolean canPartitionKSubsets(int[] nums, int k) {
        int sum = 0;
        for (int x : nums) sum += x;
        if (sum % k != 0) return false;
        int target = sum / k;
        Integer[] boxed = new Integer[nums.length];
        for (int i = 0; i < nums.length; i++) boxed[i] = nums[i];
        Arrays.sort(boxed, Collections.reverseOrder());
        for (int i = 0; i < nums.length; i++) nums[i] = boxed[i];
        return dfs(nums, new int[k], 0, target);
    }
    private boolean dfs(int[] nums, int[] sides, int i, int target) {
        if (i == nums.length) {
            for (int s : sides) if (s != target) return false;
            return true;
        }
        for (int j = 0; j < sides.length; j++) {
            if (sides[j] + nums[i] > target) continue;
            if (j > 0 && sides[j] == sides[j - 1]) continue;
            sides[j] += nums[i];
            if (dfs(nums, sides, i + 1, target)) return true;
            sides[j] -= nums[i];
        }
        return false;
    }
}
```

**Complexity:** O(k · 2^n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"k equal subsets"** → `target = sum/k`. If indivisible, done — false.
- **"Combination sum, but k times"** → k bucket sums instead of one running `rem`.
- **"Bucket would exceed target"** → continue — same prune instinct as `rem < 0` on Day 13.
- **"Empty buckets look the same"** → skip when `sides[j] == sides[j-1]`.
- **"Undo after dfs"** → `sides[j] -= nums[i]` — classic choose/explore/unchoose.

If you tried greedy fill-lowest-bucket first, that's fine — the breakthrough is **backtracking with overflow prune and bucket dedup**, not a one-pass heuristic.

> 🎯 **Pattern Unlocked:** K-bucket assignment — place, prune overflow, skip duplicate empties, undo.

---

*Both quests complete. Head to the checkpoint. →*
