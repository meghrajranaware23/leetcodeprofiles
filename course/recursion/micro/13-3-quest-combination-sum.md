<!-- hand-authored -->
# ⚔ Quest: Combination Sum

> **Day 13** · [Combination Sum #39](https://leetcode.com/problems/combination-sum/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Combination Sum on LeetCode](https://leetcode.com/problems/combination-sum/)**

> ⚔ **Hunter's rule:** The critical question: after including `candidates[i]`, do you recurse with `i` or `i+1`? Draw the tree for `[2,3,6], target=7`.

---

## The Problem

Given an array of **distinct** integers `candidates` and a `target`, return all unique combinations where the chosen numbers sum to `target`. The **same number may be used unlimited times**. Two combinations are unique by the multiset of elements — `[2,2,3]` not `[2,3,2]`.

```
Input:  candidates = [2, 3, 6, 7], target = 7
Output: [[2,2,3], [7]]

Input:  candidates = [2, 3, 5], target = 8
Output: [[2,2,2,2], [2,3,3], [3,5]]
```

---

## 💡 Hints

**Hint 1:** Start-index prevents reordering — same as Combinations (#77).

**Hint 2:** At index `i`, two branches:
- **Include** `candidates[i]`: push, recurse with **same `i`** (reuse allowed), pop
- **Exclude** `candidates[i]`: recurse with `i + 1`

**Hint 3:** Base cases: `rem == 0` → record. `rem < 0` or `i == n` → return.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Combination Sum — Include (stay at i) / Exclude (i+1)

| Branch | Next index | Meaning |
|---|---|---|
| Include c[i] | `i` | Reuse same candidate |
| Exclude c[i] | `i + 1` | Move to next candidate |

This is **not** Subsets (#78) — subsets always advance `j+1` after include. Here include **stays** at `i`.

**How a strong solver thinks before coding:**
1. *"Combo with reuse → include keeps i, exclude uses i+1."*
2. *"Start index → no [3,2,2]."*
3. *"Prune when rem < 0."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Always i+1 after include** | Can't reuse — misses `[2,2,3]` |
| **Permutation-style used[]** | Generates `[2,3,2]` duplicate combos |
| **Generate all, filter by sum** | Wasteful; pruning at source is cleaner |

---

## 🔗 Same Pattern, Other Problems

| Problem | Change |
|---|---|
| [Combination Sum II #40](https://leetcode.com/problems/combination-sum-ii/) | Single-use + dedup (Day 15) |
| [Combination Sum III #216](https://leetcode.com/problems/combination-sum-iii/) | Fixed k digits 1-9 (Day 15) |
| [Combination Sum IV #377](https://leetcode.com/problems/combination-sum-iv/) | Count orderings — different problem (DP) |

---

## 📖 Walkthrough

`candidates = [2,3,6,7], target = 7`:

```
dfs(i=0, rem=7, [])
  include 2: dfs(i=0, rem=5, [2])
    include 2: dfs(i=0, rem=3, [2,2])
      include 2: rem=1 — prune (rem < 0 path dead)
      exclude 2→i=1: dfs(i=1, rem=3, [2,2])
        include 3: rem=0 → record [2,2,3] ✓
    exclude 2→i=1: ...
  exclude 2→i=1: ...
  ...
  i=3 include 7: rem=0 → record [7] ✓
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
        dfs(c, i, rem - c[i], path, res);
        path.pop_back();
        dfs(c, i + 1, rem, path, res);
    }
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
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
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        res = []
        def dfs(i, rem, path):
            if rem == 0: res.append(list(path)); return
            if i == len(candidates) or rem < 0: return
            path.append(candidates[i])
            dfs(i, rem - candidates[i], path)
            path.pop()
            dfs(i + 1, rem, path)
        dfs(0, target, [])
        return res
```

### Java
```java
class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(candidates, 0, target, new ArrayList<>(), res);
        return res;
    }
    private void dfs(int[] c, int i, int rem, List<Integer> path, List<List<Integer>> res) {
        if (rem == 0) { res.add(new ArrayList<>(path)); return; }
        if (i == c.length || rem < 0) return;
        path.add(c[i]);
        dfs(c, i, rem - c[i], path, res);
        path.remove(path.size() - 1);
        dfs(c, i + 1, rem, path, res);
    }
}
```

**Complexity:** O(2^target) time · O(target) space
---

## 💭 What Should Have Clicked in Your Mind?

- **Include → stay at `i`** → Unlimited reuse.
- **Exclude → `i+1`** → Standard forward advance.
- **Day 11 push/pop** → Only the include branch pushes.

> 🎯 **Pattern Unlocked:** Unlimited Reuse Combinations

---

*Both quests complete. Head to the checkpoint. →*
