<!-- hand-authored -->
# ⚔ Quest: Combination Sum II

> **Day 15** · [Combination Sum II #40](https://leetcode.com/problems/combination-sum-ii/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Combination Sum II on LeetCode](https://leetcode.com/problems/combination-sum-ii/)**

> ⚔ **Hunter's rule:** Start from Combination Sum (#39). Two changes: single-use (always i+1) and dedup (Day 11). This problem appears on the C-Rank test.

---

## The Problem

Given candidates (may contain duplicates) and a target, find all unique combinations where candidates sum to target. **Each candidate used at most once.**

```
Input:  candidates = [10,1,2,7,6,1,5], target = 8
Output: [[1,1,6], [1,2,5], [1,7], [2,6]]

Input:  candidates = [2,5,2,1,2], target = 5
Output: [[1,2,2], [5]]
```

---

## 💡 Hints

**Hint 1:** **Sort** candidates first (Day 11 dedup requires adjacent duplicates).

**Hint 2:** At index `i`: include → `dfs(i+1, rem-c[i])` with push/pop. **Not** `dfs(i,...)` — no reuse.

**Hint 3:** Before exclude branch: `while (i+1 < n && c[i+1]==c[i]) i++`, then `dfs(i+1, rem)`. Skips duplicate "don't take" branches.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Single-Use Combination Sum + Sort-and-Skip Dedup

| vs Combination Sum #39 | Change |
|---|---|
| Include → `dfs(i, ...)` | Include → **`dfs(i+1, ...)`** |
| No dedup | Sort + while-skip |
| Distinct candidates | Duplicates possible |

**How a strong solver thinks before coding:**
1. *"Day 13 minus reuse plus Day 11 dedup."*
2. *"Two calls: include (i+1), exclude (skip dupes then i+1)."*
3. *"Record when rem==0."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Combination Sum #39 template unchanged** | Reuse creates wrong combos; duplicates in output |
| **Generate all, dedup with set** | Works but explores duplicate branches |
| **No sort** | while-skip never groups duplicates |

---

## 🔗 Same Pattern, Other Problems

| Problem | Key difference |
|---|---|
| [Combination Sum #39](https://leetcode.com/problems/combination-sum/) | Unlimited reuse |
| [Combination Sum II #40](https://leetcode.com/problems/combination-sum-ii/) | Single use + dedup |
| [Subsets II #90](https://leetcode.com/problems/subsets-ii/) | Same dedup, no target |

---

## 📖 Walkthrough

Sorted `candidates = [1,1,2,5,6,7,10], target = 8`:

```
dfs(i=0, rem=8, [])
  include c[0]=1: dfs(i=1, rem=7, [1])
    include c[1]=1: dfs(i=2, rem=6, [1,1])
      include c[2]=2: ... 
      include c[4]=6: rem=0 → record [1,1,6] ✓
    ...
  after exclude path at i=0: skip duplicate 1s with while
```

---

## Solution

### C++
```cpp
class Solution {
    void dfs(vector<int>& c, int i, int rem, vector<int>& path, vector<vector<int>>& res) {
        if (rem == 0) { res.push_back(path); return; }
        if (i == (int)c.size() || rem < 0) return;
        path.push_back(c[i]);
        dfs(c, i + 1, rem - c[i], path, res);
        path.pop_back();
        while (i + 1 < (int)c.size() && c[i + 1] == c[i]) i++;
        dfs(c, i + 1, rem, path, res);
    }
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        vector<vector<int>> res;
        vector<int> path;
        dfs(candidates, 0, target, path, res);
        return res;
    }
};
```

### Python
```python
class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        res = []
        def dfs(i, rem, path):
            if rem == 0: res.append(list(path)); return
            if i == len(candidates) or rem < 0: return
            path.append(candidates[i])
            dfs(i + 1, rem - candidates[i], path)
            path.pop()
            while i + 1 < len(candidates) and candidates[i + 1] == candidates[i]: i += 1
            dfs(i + 1, rem, path)
        dfs(0, target, [])
        return res
```

### Java
```java
class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        List<List<Integer>> res = new ArrayList<>();
        dfs(candidates, 0, target, new ArrayList<>(), res);
        return res;
    }
    private void dfs(int[] c, int i, int rem, List<Integer> path, List<List<Integer>> res) {
        if (rem == 0) { res.add(new ArrayList<>(path)); return; }
        if (i == c.length || rem < 0) return;
        path.add(c[i]);
        dfs(c, i + 1, rem - c[i], path, res);
        path.remove(path.size() - 1);
        while (i + 1 < c.length && c[i + 1] == c[i]) i++;
        dfs(c, i + 1, rem, path, res);
    }
}
```

**Complexity:** O(2^n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **No reuse** → Always `i+1` on include — unlike #39.
- **Day 11 dedup returns** → Sort + while-skip between branches.
- **C-Rank test preview** → You'll see this again untimed.

> 🎯 **Pattern Unlocked:** Single-Use with Dedup

---

*One quest down. Next: exactly k digits from 1–9. →*
