<!-- hand-authored -->
# ⚔ Quest: Combinations

> **Day 13** · [Combinations #77](https://leetcode.com/problems/combinations/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Combinations on LeetCode](https://leetcode.com/problems/combinations/)**

> ⚔ **Hunter's rule:** This is Day 11 subsets with a size gate. Draw pairs for `n=4, k=2` — confirm `[2,1]` never appears.

---

## The Problem

Given two integers `n` and `k`, return all possible combinations of `k` numbers chosen from the range `[1, n]`.

```
Input:  n = 4, k = 2
Output: [[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]

Input:  n = 1, k = 1
Output: [[1]]
```

---

## 💡 Hints

**Hint 1:** Same start-index loop as Subsets (#78). Difference: record **only** when `path.size() == k`.

**Hint 2:** Loop `i` from `start` to `n`. Push `i`, recurse with `start = i + 1`, pop.

**Hint 3:** Optional prune: if remaining slots `(k - path.size()) > (n - i + 1)`, stop early — not required for AC.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Start-Index Combinations (fixed size k)

| vs Day 11 Subsets | Change |
|---|---|
| Record at every node | Record only when `path.size() == k` |
| Any subset size | Exactly k elements |
| Same start index | Same push/pop |

**How a strong solver thinks before coding:**
1. *"C(n,k) = subsets filtered by size."*
2. *"Start index prevents [2,1]."*
3. *"Base case: path.size()==k → record."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Permutations then filter** | `[1,2]` and `[2,1]` both appear — duplicate combos |
| **Record at every node** | Outputs `[1]`, `[1,2,3]` — wrong sizes |
| **used[] array** | Works but unnecessary — start index is simpler |

---

## 🔗 Same Pattern, Other Problems

| Problem | Twist |
|---|---|
| [Combination Sum #39](https://leetcode.com/problems/combination-sum/) | Target + reuse same index |
| [Combination Sum III #216](https://leetcode.com/problems/combination-sum-iii/) | k numbers 1-9 summing to n (Day 15) |
| [Subsets #78](https://leetcode.com/problems/subsets/) | All sizes, not fixed k |

---

## 📖 Walkthrough

`n=4, k=2`:

```
dfs(start=1, path=[])
  i=1: push 1 → dfs(2, [1])
         i=2: push 2 → [1,2] size==2 → record ✓
         i=3: push 3 → [1,3] → record ✓
         i=4: push 4 → [1,4] → record ✓
  i=2: push 2 → dfs(3, [2])
         i=3: [2,3] ✓
         i=4: [2,4] ✓
  i=3: [3,4] ✓

6 combinations = C(4,2)
```

---

## Solution

### C++
```cpp
class Solution {
    void dfs(int n, int k, int start, vector<int>& path, vector<vector<int>>& res) {
        if ((int)path.size() == k) { res.push_back(path); return; }
        for (int i = start; i <= n; i++) {
            path.push_back(i);
            dfs(n, k, i + 1, path, res);
            path.pop_back();
        }
    }
public:
    vector<vector<int>> combine(int n, int k) {
        vector<vector<int>> res;
        vector<int> path;
        dfs(n, k, 1, path, res);
        return res;
    }
};
```

### Python
```python
class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        res = []
        def dfs(start, path):
            if len(path) == k:
                res.append(list(path)); return
            for i in range(start, n + 1):
                path.append(i); dfs(i + 1, path); path.pop()
        dfs(1, [])
        return res
```

### Java
```java
class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(n, k, 1, new ArrayList<>(), res);
        return res;
    }
    private void dfs(int n, int k, int start, List<Integer> path, List<List<Integer>> res) {
        if (path.size() == k) { res.add(new ArrayList<>(path)); return; }
        for (int i = start; i <= n; i++) {
            path.add(i);
            dfs(n, k, i + 1, path, res);
            path.remove(path.size() - 1);
        }
    }
}
```

**Complexity:** O(C(n,k) · k) time · O(k) space
---

## 💭 What Should Have Clicked in Your Mind?

- **Day 11 skeleton** → Same loop; gate recording on `path.size()==k`.
- **Start index** → Combos, not permutations.
- **C(n,k) count** → Prune optionally when not enough numbers remain.

> 🎯 **Pattern Unlocked:** Start-Index Combinations

---

*One quest down. Next: reuse the same candidate index. →*
