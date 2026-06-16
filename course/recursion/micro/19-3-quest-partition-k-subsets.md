<!-- hand-authored -->
# ⚔ Quest: Partition to K Subsets (Revisited)

> **Day 19** · [Partition to K Equal Sum Subsets #698](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Partition to K Equal Sum Subsets on LeetCode](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/)**

> ⚔ **Hunter's rule:** You saw this on Day 17. Today, solve it again from memory after Matchsticks — the code should be nearly identical. Trace bucket add/undo on paper.

---

## The Problem

Given an integer array `nums` and an integer `k`, return `true` if it is possible to divide `nums` into `k` non-empty subsets whose sums are all equal.

```
Input:  nums = [4,3,2,3,5,2,1], k = 4
Output: true
Explanation: [5,1], [4,2], [3,3], [2,2]

Input:  nums = [1,2,3,4], k = 3
Output: false
```

Each number must appear in exactly one subset.

---

## 💡 Hints

**Same skeleton as Matchsticks to Square** — only `k` is a parameter now.

**Hint 1:** `target = sum(nums) / k`. Early exit if `sum % k != 0`.

**Hint 2:** Sort `nums` descending. Same sorted-sticks prune as the square quest.

**Hint 3:** `sides = [0] * k`. Loop `j in 0..k-1`, skip overflow and duplicate buckets.

**Hint 4:** If you solved #473 five minutes ago, change `4` to `k` — that's the entire diff.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Sorted Pruning Partition (general k-bucket)

| Clue in the problem | What it signals |
|---|---|
| "partition into k subsets" | k buckets, parameter k |
| "equal sum" | target = total/k |
| "each number once" | Assign every element — index-based dfs |
| Revisit after #473 | Same code, k not hardcoded |

**Why this pattern works:** Identical to Day 17 and today's Matchsticks quest. The revisit cements the pattern — you should not re-derive from scratch.

**How a strong solver thinks before coding:**
1. *"I know this — k buckets, sort desc, dfs(i, sides)."*
2. *"Pre-check sum % k."*
3. *"Overflow + duplicate-bucket prune in the loop."*
4. *"Matchsticks was k=4; this is the general form."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Generate all k-way splits** | Exponential with no overflow prune |
| **k nested subset-sum loops** | Ensuring disjoint subsets is messy |
| **Memo on (i, sides) without bucket dedup** | Still explores symmetric bucket orderings |
| **Re-solving from scratch each time** | You already have the template — reuse it |
| **Ascending sort** | Defers failure; sorted desc is standard for this family |

**The insight brute force misses:** After Matchsticks #473, this problem is the **same function** with `k` as input. Recognition > re-derivation.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Matchsticks to Square #473](https://leetcode.com/problems/matchsticks-to-square/) | k fixed at 4 | Today's quest 1 |
| [Partition Equal Subset Sum #416](https://leetcode.com/problems/partition-equal-subset-sum/) | k=2, DP also works | Special case of k-bucket |
| [Fair Distribution of Cookies #2305](https://leetcode.com/problems/fair-distribution-of-cookies/) | Minimize max load | Bucket dfs, different objective |

---

## 📖 Walkthrough

`nums = [4,3,2,3,5,2,1]`, k=4, sorted desc `[5,4,3,3,2,2,1]`, target=5. One valid partition: `[5], [4,1], [3,2], [3,2]`. DFS with pruning discovers it via bucket assignment — the exact tree is long, so trace the smaller case first:

`nums = [2,2,2,2]`, k=4, target=2:

```
  num=2 → bucket0: [2,0,0,0]
    num=2 → bucket1: [2,2,0,0]   (skip bucket0 — would overflow)
      num=2 → bucket2: [2,2,2,0]
        num=2 → bucket3: [2,2,2,2] ✓
```

Duplicate-bucket skip in action with `nums = [1,1,1,1]`, k=2, target=2:
```
i=0, num=1: bucket0 → [1,0]
  i=1, num=1: bucket0 → [2,0] ✓ base reached for first two
  OR bucket1 → [1,1] but skip bucket1 when sides[1]==sides[0]==0 at i=0
```

> 💡 **The insight:** Day 17 introduced this. Day 19 Matchsticks special-cased k=4. Now the general form should be muscle memory.

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

- **"Identical to Matchsticks"** → replace `4` with `k`.
- **"Day 17 déjà vu"** → that's the point; pattern recognition is the skill.
- **"Sorted desc + duplicate bucket skip"** → non-negotiable pruning pair.
- **"Not subset backtracking"** → every number assigned, not included/excluded.

If this felt easier than quest 1, good — the square framing was training wheels for the general k case.

> 🎯 **Pattern Unlocked:** Sorted Pruning Partition

---

*Both quests complete. Head to the checkpoint. →*
