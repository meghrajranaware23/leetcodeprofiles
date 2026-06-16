<!-- hand-authored -->
# ⚔ Quest: Combination Sum III

> **Day 15** · [Combination Sum III #216](https://leetcode.com/problems/combination-sum-iii/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Combination Sum III on LeetCode](https://leetcode.com/problems/combination-sum-iii/)**

> ⚔ **Hunter's rule:** Combinations (#77) + a sum target. Two counters must both hit zero: `k` and `n`.

---

## The Problem

Find all valid combinations of **exactly k** numbers chosen from `1` to `9` such that they sum to `n`. Each number used at most once.

```
Input:  k = 3, n = 7
Output: [[1,2,4]]

Input:  k = 3, n = 9
Output: [[1,2,6], [1,3,5], [2,3,4]]

Input:  k = 4, n = 1
Output: []
```

---

## 💡 Hints

**Hint 1:** Same start-index loop as Combinations (#77): loop `i` from `start` to `9`.

**Hint 2:** Pass **both** remaining count and remaining sum: `dfs(k-1, n-i, i+1, path)`.

**Hint 3:** Record when `k == 0 && n == 0`. Prune when `k == 0 || n <= 0` (without both zero).

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Fixed-Count Combinations + Target Sum

| Dimension | Combinations #77 | Combination Sum III |
|---|---|---|
| Stop condition | `path.size() == k` | `k == 0 && n == 0` |
| Extra constraint | None | Sum must equal n |
| Pruning | Optional | `n <= 0` early exit |

**How a strong solver thinks before coding:**
1. *"C(9,k) with filter sum==n — prune early."*
2. *"Decrement k and n together on each pick."*
3. *"Start index — digits always increasing."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check all C(9,k) without sum prune** | Works but slower — prune when n drops below minimum possible |
| **Record when n==0 only** | Wrong-size combos slip through |
| **Allow reuse** | Violates problem — distinct digits 1-9 |

---

## 🔗 Same Pattern, Other Problems

| Problem | Twist |
|---|---|
| [Combinations #77](https://leetcode.com/problems/combinations/) | No sum constraint |
| [Combination Sum III #216](https://leetcode.com/problems/combination-sum-iii/) | k + sum |
| [Combination Sum #39](https://leetcode.com/problems/combination-sum/) | Reuse allowed, no fixed k |

---

## 📖 Walkthrough

`k=3, n=7`:

```
dfs(k=3, n=7, start=1, [])
  i=1: dfs(2, 6, 2, [1])
    i=2: dfs(1, 4, 3, [1,2])
      i=3: dfs(0, 1, 4, [1,2,3]) → k==0 but n==1 → no record
      i=4: dfs(0, 0, 5, [1,2,4]) → k==0 && n==0 → record ✓
```

Only `[1,2,4]` works for k=3, n=7.

---

## Solution

### C++
```cpp
class Solution {
    void dfs(int k, int n, int start, vector<int>& path, vector<vector<int>>& res) {
        if (k == 0 && n == 0) { res.push_back(path); return; }
        if (k == 0 || n <= 0) return;
        for (int i = start; i <= 9; i++) {
            path.push_back(i);
            dfs(k - 1, n - i, i + 1, path, res);
            path.pop_back();
        }
    }
public:
    vector<vector<int>> combinationSum3(int k, int n) {
        vector<vector<int>> res;
        vector<int> path;
        dfs(k, n, 1, path, res);
        return res;
    }
};
```

### Python
```python
class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        res = []
        def dfs(start, k, rem, path):
            if k == 0 and rem == 0: res.append(list(path)); return
            if k == 0 or rem <= 0: return
            for i in range(start, 10):
                path.append(i); dfs(i + 1, k - 1, rem - i, path); path.pop()
        dfs(1, k, n, [])
        return res
```

### Java
```java
class Solution {
    public List<List<Integer>> combinationSum3(int k, int n) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(k, n, 1, new ArrayList<>(), res);
        return res;
    }
    private void dfs(int k, int n, int start, List<Integer> path, List<List<Integer>> res) {
        if (k == 0 && n == 0) { res.add(new ArrayList<>(path)); return; }
        if (k == 0 || n <= 0) return;
        for (int i = start; i <= 9; i++) {
            path.add(i);
            dfs(k - 1, n - i, i + 1, path, res);
            path.remove(path.size() - 1);
        }
    }
}
```

**Complexity:** O(C(9,k)) time · O(k) space
---

## 💭 What Should Have Clicked in Your Mind?

- **Combinations #77 + sum** → Two counters, one loop.
- **k==0 && n==0** → Both constraints satisfied simultaneously.
- **1..9, no reuse** → Standard start index.

> 🎯 **Pattern Unlocked:** Fixed Count Combinations

---

*Both quests complete. Head to the checkpoint. →*
