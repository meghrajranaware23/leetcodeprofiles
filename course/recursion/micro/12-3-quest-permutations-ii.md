<!-- hand-authored -->
# ⚔ Quest: Permutations II

> **Day 12** · [Permutations II #47](https://leetcode.com/problems/permutations-ii/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Permutations II on LeetCode](https://leetcode.com/problems/permutations-ii/)**

> ⚔ **Hunter's rule:** Solve Permutations (#46) mentally, then ask: *where would `[1,1,2]` and `[1,1,2]` duplicate?* Dedup from Day 11 adapts — but the guard changes.

---

## The Problem

Given a collection of numbers that **might contain duplicates**, return all possible **unique** permutations.

```
Input:  nums = [1, 1, 2]
Output: [[1,1,2], [1,2,1], [2,1,1]]

Input:  nums = [1, 2, 3]
Output: [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
```

Without dedup, two identical `[1,1,2]` permutations would appear — swapping which `1` came first doesn't create a new arrangement.

---

## 💡 Hints

**Hint 1:** **Sort** `nums` so duplicates are adjacent (same as Subsets II, Day 11).

**Hint 2:** In the loop, skip index `i` when:
```
i > 0 && nums[i] == nums[i-1] && !used[i-1]
```

**Hint 3:** Read the guard aloud: *"Skip this duplicate if its left twin hasn't been used yet at this level."* That means the earlier identical choice wasn't taken — using this one repeats a sibling subtree.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Permutation Backtracking + Used-Aware Dedup

| Dedup context | Skip rule |
|---|---|
| Subsets II (Day 11) | `j > start && nums[j] == nums[j-1]` |
| Permutations II (Day 12) | `i > 0 && nums[i]==nums[i-1] && !used[i-1]` |

Why different? Subsets track **position in array** (start index). Permutations track **which slots are filled** (used[]). The `!used[i-1]` condition ensures we only use the second `1` after the first `1` is already in the path — preventing duplicate orderings at the same tree level.

**How a strong solver thinks before coding:**
1. *"Permutations II = Permutations + sort + one skip."*
2. *"NOT the subsets skip — need !used[i-1]."*
3. *"Trace [1,1,2]: second 1 at level 0 is skipped; under path [1,...] the second 1 is valid."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Generate all, dedup with set** | Works but explores duplicate branches |
| **Subsets II skip (`j > start`)** | Wrong guard — permutations don't use start index |
| **`nums[i]==nums[i-1]` without `!used[i-1]`** | Over-prunes — kills valid permutations |
| **No sort** | Duplicate values not adjacent — skip never fires |

---

## 🔗 Same Pattern, Other Problems

| Problem | Dedup variant |
|---|---|
| [Permutations II #47](https://leetcode.com/problems/permutations-ii/) | `!used[i-1]` |
| [Subsets II #90](https://leetcode.com/problems/subsets-ii/) | `j > start` (Day 11) |
| [Combination Sum II #40](https://leetcode.com/problems/combination-sum-ii/) | while-loop skip (Day 15) |

**Dedup family cheat sheet:** always **sort first**, then skip duplicate **siblings** — the exact guard depends on whether you use start index or used[].

---

## 📖 Walkthrough

`nums = [1, 1, 2]` sorted:

```
Level 0 choices:
  i=0: pick nums[0]=1  → explore ...
  i=1: nums[1]==nums[0] AND !used[0]? used[0]=false → SKIP ✓
  (If we didn't skip: two identical root branches)

Under path [1]:
  i=1: pick second 1 → valid → [1,1,2], [1,2,1]

Under path [2]:
  i=0, i=1: pick either 1 → [2,1,1]
```

Three unique permutations — not six.

---

## Solution

### C++
```cpp
class Solution {
    void dfs(vector<int>& nums, vector<int>& path, vector<bool>& used, vector<vector<int>>& res) {
        if (path.size() == nums.size()) { res.push_back(path); return; }
        for (int i = 0; i < (int)nums.size(); i++) {
            if (used[i] || (i > 0 && nums[i] == nums[i - 1] && !used[i - 1])) continue;
            used[i] = true; path.push_back(nums[i]);
            dfs(nums, path, used, res);
            path.pop_back(); used[i] = false;
        }
    }
public:
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        vector<int> path;
        vector<bool> used(nums.size());
        dfs(nums, path, used, res);
        return res;
    }
};
```

### Python
```python
class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        def dfs(path, used):
            if len(path) == len(nums):
                res.append(list(path)); return
            for i, x in enumerate(nums):
                if used[i] or (i and nums[i] == nums[i - 1] and not used[i - 1]): continue
                used[i] = True; path.append(x)
                dfs(path, used)
                path.pop(); used[i] = False
        dfs([], [False] * len(nums))
        return res
```

### Java
```java
class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        dfs(nums, new ArrayList<>(), new boolean[nums.length], res);
        return res;
    }
    private void dfs(int[] nums, List<Integer> path, boolean[] used, List<List<Integer>> res) {
        if (path.size() == nums.length) { res.add(new ArrayList<>(path)); return; }
        for (int i = 0; i < nums.length; i++) {
            if (used[i] || (i > 0 && nums[i] == nums[i - 1] && !used[i - 1])) continue;
            used[i] = true; path.add(nums[i]);
            dfs(nums, path, used, res);
            path.remove(path.size() - 1); used[i] = false;
        }
    }
}
```

**Complexity:** O(n · n!) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **Same skeleton as #46** → Sort + one guard.
- **`!used[i-1]`** → The permutation-specific dedup — not the subsets skip.
- **Day 11 dedup philosophy** → Sort, skip duplicate siblings — guard adapts to state model.

> 🎯 **Pattern Unlocked:** Permutation with Dedup

---

*Both quests complete. Head to the checkpoint. →*
