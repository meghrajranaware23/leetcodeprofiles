<!-- hand-authored -->
# ⚔ Quest: Subsets

> **Day 11** · [Subsets #78](https://leetcode.com/problems/subsets/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Subsets on LeetCode](https://leetcode.com/problems/subsets/)**

> ⚔ **Hunter's rule:** Draw the decision tree for `[1,2,3]`. Mark every `path.push` and `path.pop`. The hints below are for *after* your attempt.

---

## The Problem

Given an integer array `nums` of **unique** elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.

```
Input:  nums = [1, 2, 3]
Output: [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]

Input:  nums = [0]
Output: [[], [0]]
```

---

## 💡 Hints

This is the **pure push/pop template** from today's concept — no dedup needed because elements are unique.

**Hint 1:** Maintain a `path` vector and a `start` index. At every call, **record the current path** (even if empty).

**Hint 2:** Loop `j` from `start` to `n-1`. Push `nums[j]`, recurse with `start = j + 1` (only pick forward), then pop.

**Hint 3:** The empty subset `[]` appears when you record at the root before any picks.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Start-Index Subset Backtracking (push/pop skeleton)

| Clue in the problem | What it signals |
|---|---|
| "all subsets" / "power set" | Record path at every node, not just leaves |
| unique elements | No sort/dedup needed |
| order within subset doesn't matter | Forward-only `start` index — never revisit earlier indices |

**Why this pattern works:** Each recursive level picks the next element from a forward range. Push/pop ensures sibling branches don't share state.

**How a strong solver thinks before coding:**
1. *"All subsets → backtracking, not return-value recursion."*
2. *"Record path immediately on entry — empty subset counts."*
3. *"Loop from start, recurse with j+1, pop after dfs."*
4. *"Trace [1,2,3] on paper — 8 nodes, 8 subsets."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Bitmask 0..2^n-1** | Works for subsets but doesn't teach the backtracking skeleton used in later days |
| **Nested loops by subset size** | Ugly to code; hard to add constraints (sum, count, dedup) |
| **Record only at leaves** | Misses `[]` and intermediate subsets |
| **Forget path.pop()** | `[1]` leaks into the branch that should produce `[2]` |

**The insight brute force misses:** Subsets is the **simplest push/pop loop**. Master it here — permutations, combinations, and partition all extend this skeleton.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Subsets II #90](https://leetcode.com/problems/subsets-ii/) | Duplicates — add sort + skip | push → dfs → pop |
| [Combinations #77](https://leetcode.com/problems/combinations/) | Fixed size k — record only when `path.size()==k` | start index loop |
| [Letter Case Permutation #784](https://leetcode.com/problems/letter-case-permutation/) | String index instead of array | push → dfs → pop |

---

## 📖 Walkthrough

Trace `nums = [1, 2, 3]`:

```
dfs(start=0, path=[])
  record []                          ← empty subset
  j=0: push 1 → dfs(start=1, [1])
         record [1]
         j=1: push 2 → dfs(start=2, [1,2])
                record [1,2]
                j=2: push 3 → dfs(start=3, [1,2,3])
                       record [1,2,3]
                       (no j in range) → pop 3
                pop 2
         j=2: push 3 → dfs(start=3, [1,3])
                record [1,3]
                pop 3
         pop 1
  j=1: push 2 → ... produces [2], [2,3]
  j=2: push 3 → ... produces [3]
```

Every `push` has a matching `pop`. Eight recorded paths → eight subsets.

> 💡 **The insight:** The code is the paper trace. Three lines in the loop: push, dfs, pop.

---

## Solution

### C++
```cpp
class Solution {
    void dfs(vector<int>& nums, int i, vector<int>& path, vector<vector<int>>& res) {
        res.push_back(path);
        for (int j = i; j < (int)nums.size(); j++) {
            path.push_back(nums[j]);
            dfs(nums, j + 1, path, res);
            path.pop_back();
        }
    }
public:
    vector<vector<int>> subsets(vector<int>& nums) {
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
    def subsets(self, nums: List[int]) -> List[List[int]]:
        res = []
        def dfs(i, path):
            res.append(list(path))
            for j in range(i, len(nums)):
                path.append(nums[j]); dfs(j + 1, path); path.pop()
        dfs(0, [])
        return res
```

### Java
```java
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(nums, 0, new ArrayList<>(), res);
        return res;
    }
    private void dfs(int[] nums, int i, List<Integer> path, List<List<Integer>> res) {
        res.add(new ArrayList<>(path));
        for (int j = i; j < nums.length; j++) {
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

- **"All subsets"** → Record path at every node, not just leaves.
- **"push → dfs → pop"** → The C-Rank backtracking skeleton starts here.
- **"start index"** → Only pick forward — `[2,1]` never appears.
- **No dedup needed** → Elements are unique; Subsets II adds sort + skip tomorrow in the same day.

> 🎯 **Pattern Unlocked:** Start-Index Subset Backtracking

---

*One quest down. Next: duplicates enter the picture. →*
