<!-- hand-authored -->
# ⚔ Quest: Subsets II

> **Day 11** · [Subsets II #90](https://leetcode.com/problems/subsets-ii/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Subsets II on LeetCode](https://leetcode.com/problems/subsets-ii/)**

> ⚔ **Hunter's rule:** Run Subsets (#78) first mentally, then ask: *where would duplicates create twin branches?* The hints below are for *after* your attempt.

---

## The Problem

Given an integer array `nums` that **may contain duplicates**, return all possible subsets. The solution set must **not** contain duplicate subsets. Each element may appear at most once in a subset.

```
Input:  nums = [1, 2, 2]
Output: [[], [1], [1,2], [1,2,2], [2], [2,2]]

Input:  nums = [0]
Output: [[], [0]]
```

Without dedup, `[1,2,2]` would produce two copies of `[2]` — one from each `2`.

---

## 💡 Hints

Same push/pop skeleton as Subsets (#78). Two additions:

**Hint 1:** **Sort** `nums` first so duplicates are adjacent.

**Hint 2:** In the loop, skip index `j` when `j > i && nums[j] == nums[j-1]`. The first `2` at each level is valid; the second `2` at the **same level** duplicates a subtree already explored.

**Hint 3:** Draw the tree for `[1,2,2]` sorted. Mark which branches are pruned by the skip.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Subset Backtracking + Sort-and-Skip Dedup

| Clue in the problem | What it signals |
|---|---|
| "may contain duplicates" | Sort + skip same value at same level |
| "must not contain duplicate subsets" | Dedup at generation time, not filter after |
| same as subsets otherwise | Identical push/pop skeleton |

**Why `j > i` (not `j > 0`):** At depth with `start=i`, siblings are indices `i, i+1, ...`. Skipping `nums[j]==nums[j-1]` when `j>i` removes duplicate **sibling** picks. When recursion goes deeper (`start=j+1`), the second `2` is the only option — still valid.

**How a strong solver thinks before coding:**
1. *"Subsets II = Subsets + sort + one if-statement."*
2. *"Skip duplicate siblings — not duplicate values globally."*
3. *"Trace [1,2,2]: second 2 at root level is skipped; second 2 under [1] is valid."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Generate all subsets, dedup with a set** | Works but explores duplicate branches wastefully |
| **`j > 0` skip condition** | Also skips valid picks at deeper levels — wrong answer |
| **No sort before skip** | `nums[j]==nums[j-1]` never triggers for scattered duplicates |
| **Use a visited set per level** | Overcomplicated — sort+skip is O(1) per check |

**The insight brute force misses:** After sorting, duplicate subtrees are always caused by picking the **same value twice at the same tree level**. One line prunes them all.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Dedup rule |
|---|---|---|
| [Subsets II #90](https://leetcode.com/problems/subsets-ii/) | Subsets + duplicates | `j > start && nums[j]==nums[j-1]` |
| [Combination Sum II #40](https://leetcode.com/problems/combination-sum-ii/) | Target sum, single-use | Same skip between include/skip branches (Day 15) |
| [Permutations II #47](https://leetcode.com/problems/permutations-ii/) | Order matters, used[] | `!used[i-1]` variant (Day 12) |

Memorize **sort + skip-same at same level** today — you'll reuse it throughout C-Rank.

---

## 📖 Walkthrough

`nums = [1, 2, 2]` after sorting:

```
dfs(i=0, path=[])
  record []
  j=0: pick 1 → [1] → ... → [1,2], [1,2,2]
  j=1: pick 2 → [2] → ... → [2,2]
  j=2: SKIP (2==2 and j>0)     ← duplicate sibling pruned

Without skip at j=2: [2] would be recorded twice
```

> 💡 **The insight:** Dedup is not a separate algorithm — it's one guard in the same push/pop loop.

---

## Solution

### C++
```cpp
class Solution {
    void dfs(vector<int>& nums, int i, vector<int>& path, vector<vector<int>>& res) {
        res.push_back(path);
        for (int j = i; j < (int)nums.size(); j++) {
            if (j > i && nums[j] == nums[j - 1]) continue;
            path.push_back(nums[j]);
            dfs(nums, j + 1, path, res);
            path.pop_back();
        }
    }
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        vector<int> path;
        dfs(nums, 0, path, res);
        return res;
    }
};
```

### Python
```python
class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        def dfs(i, path):
            res.append(list(path))
            for j in range(i, len(nums)):
                if j > i and nums[j] == nums[j - 1]: continue
                path.append(nums[j]); dfs(j + 1, path); path.pop()
        dfs(0, [])
        return res
```

### Java
```java
class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        dfs(nums, 0, new ArrayList<>(), res);
        return res;
    }
    private void dfs(int[] nums, int i, List<Integer> path, List<List<Integer>> res) {
        res.add(new ArrayList<>(path));
        for (int j = i; j < nums.length; j++) {
            if (j > i && nums[j] == nums[j - 1]) continue;
            path.add(nums[j]);
            dfs(nums, j + 1, path, res);
            path.remove(path.size() - 1);
        }
    }
}
```

**Complexity:** O(n · 2^n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Same skeleton as Subsets"** → Sort + one skip line is the only delta.
- **`j > i && nums[j]==nums[j-1]`** → Skip duplicate siblings, not all duplicate values.
- **Dedup at source** → Cheaper than generate-then-filter.

> 🎯 **Pattern Unlocked:** Sort-and-Skip Dedup

---

*Both quests complete. Head to the checkpoint. →*
